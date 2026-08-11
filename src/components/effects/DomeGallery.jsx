import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

const DEFAULT_IMAGES = [
  { src: `${import.meta.env.BASE_URL}assets/MyMeds.png`, alt: 'MyMeds mobile application' },
  { src: `${import.meta.env.BASE_URL}assets/Speech%20Tracker.png`, alt: 'Speech Tracker project' },
  { src: `${import.meta.env.BASE_URL}assets/GestureMouse-hand-controller.png`, alt: 'GestureMouse hand controller detection' }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeAngle = (degrees) => ((degrees % 360) + 360) % 360;
const wrapAngleSigned = (degrees) => {
  const angle = (((degrees + 180) % 360) + 360) % 360;
  return angle - 180;
};

const getDataNumber = (element, name, fallback) => {
  const attribute = element.dataset[name] ?? element.getAttribute(`data-${name}`);
  const number = attribute == null ? Number.NaN : parseFloat(attribute);
  return Number.isFinite(number) ? number : fallback;
};

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = current;
  }
  return shuffled;
}

function buildItems(pool, segments) {
  const xColumns = Array.from({ length: segments }, (_, index) => -37 + index * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xColumns.flatMap((x, column) => {
    const ys = column % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  if (pool.length === 0) {
    return coords.map((coord) => ({ ...coord, src: '', alt: '' }));
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  let usedImages = shuffleItems(
    Array.from({ length: coords.length }, (_, index) => normalizedImages[index % normalizedImages.length])
  );

  for (let pass = 0; pass < 3; pass += 1) {
    for (let index = 1; index < usedImages.length; index += 1) {
      if (usedImages[index].src === usedImages[index - 1].src) {
        for (let swapIndex = index + 1; swapIndex < usedImages.length; swapIndex += 1) {
          if (usedImages[swapIndex].src !== usedImages[index].src) {
            const current = usedImages[index];
            usedImages[index] = usedImages[swapIndex];
            usedImages[swapIndex] = current;
            break;
          }
        }
      }
    }
  }

  return coords.map((coord, index) => ({
    ...coord,
    src: usedImages[index].src,
    alt: usedImages[index].alt
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120f17',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  autoRotate = false,
  autoRotateSpeed = -0.025,
  openedImageWidth = '250px',
  openedImageHeight = '350px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  enableImageViewer = true,
  imageFit = 'cover'
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const originalTilePositionRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const autoRotateRAF = useRef(null);
  const lastAutoRotateTimeRef = useRef(null);
  const isHoveringRef = useRef(false);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDegrees, yDegrees) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDegrees}deg) rotateY(${yDegrees}deg)`;
    }
  };

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const containerWidth = Math.max(1, width);
      const containerHeight = Math.max(1, height);
      const minDimension = Math.min(containerWidth, containerHeight);
      const maxDimension = Math.max(containerWidth, containerHeight);
      const aspect = containerWidth / containerHeight;
      let basis;

      switch (fitBasis) {
        case 'min':
          basis = minDimension;
          break;
        case 'max':
          basis = maxDimension;
          break;
        case 'width':
          basis = containerWidth;
          break;
        case 'height':
          basis = containerHeight;
          break;
        default:
          basis = aspect >= 1.3 ? containerWidth : minDimension;
      }

      let radius = basis * fit;
      radius = Math.min(radius, containerHeight * 1.35);
      radius = clamp(radius, minRadius, maxRadius);

      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--viewer-pad', `${Math.max(8, Math.round(minDimension * padFactor))}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius
  ]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoRotate) return undefined;

    const step = (timestamp) => {
      if (lastAutoRotateTimeRef.current == null) {
        lastAutoRotateTimeRef.current = timestamp;
      }

      const deltaSeconds = Math.min((timestamp - lastAutoRotateTimeRef.current) / 1000, 0.05);
      lastAutoRotateTimeRef.current = timestamp;

      const isPaused =
        isHoveringRef.current ||
        draggingRef.current ||
        focusedElRef.current ||
        inertiaRAF.current ||
        rootRef.current?.getAttribute('data-enlarging') === 'true';

      if (!isPaused) {
        const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed * deltaSeconds * 60);
        rotationRef.current = { x: rotationRef.current.x, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }

      autoRotateRAF.current = requestAnimationFrame(step);
    };

    autoRotateRAF.current = requestAnimationFrame(step);

    return () => {
      if (autoRotateRAF.current) {
        cancelAnimationFrame(autoRotateRAF.current);
      }
      autoRotateRAF.current = null;
      lastAutoRotateTimeRef.current = null;
    };
  }, [autoRotate, autoRotateSpeed]);

  const startInertia = useCallback(
    (velocityX, velocityY) => {
      const maxVelocity = 1.4;
      let vx = clamp(velocityX, -maxVelocity, maxVelocity) * 80;
      let vy = clamp(velocityY, -maxVelocity, maxVelocity) * 80;
      let frames = 0;
      const dampening = clamp(dragDampening ?? 0.6, 0, 1);
      const friction = 0.94 + 0.055 * dampening;
      const stopThreshold = 0.015 - 0.01 * dampening;
      const maxFrames = Math.round(90 + 270 * dampening);

      const step = () => {
        vx *= friction;
        vy *= friction;

        if ((Math.abs(vx) < stopThreshold && Math.abs(vy) < stopThreshold) || frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }

        frames += 1;
        const nextX = clamp(rotationRef.current.x - vy / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vx / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };

      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: event.clientX, y: event.clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;

        const dxTotal = event.clientX - startPosRef.current.x;
        const dyTotal = event.clientY - startPosRef.current.y;

        if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16) {
          movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);

        if (last) {
          draggingRef.current = false;
          const [velocityMagnitudeX, velocityMagnitudeY] = velocity;
          const [directionX, directionY] = direction;
          let velocityX = velocityMagnitudeX * directionX;
          let velocityY = velocityMagnitudeY * directionY;

          if (Math.abs(velocityX) < 0.001 && Math.abs(velocityY) < 0.001 && Array.isArray(movement)) {
            const [movementX, movementY] = movement;
            velocityX = clamp((movementX / dragSensitivity) * 0.02, -1.2, 1.2);
            velocityY = clamp((movementY / dragSensitivity) * 0.02, -1.2, 1.2);
          }

          if (Math.abs(velocityX) > 0.005 || Math.abs(velocityY) > 0.005) {
            startInertia(velocityX, velocityY);
          }
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  const openItemFromElement = useCallback(
    (element) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();

      const parent = element.parentElement;
      focusedElRef.current = element;

      const offsetX = getDataNumber(parent, 'offsetX', 0);
      const offsetY = getDataNumber(parent, 'offsetY', 0);
      const sizeX = getDataNumber(parent, 'sizeX', 2);
      const sizeY = getDataNumber(parent, 'sizeY', 2);
      const parentRotation = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRotation.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotateY = -(parentY + globalY) % 360;
      if (rotateY < -180) rotateY += 360;
      const rotateX = -parentRotation.rotateX - rotationRef.current.x;
      parent.style.setProperty('--rot-y-delta', `${rotateY}deg`);
      parent.style.setProperty('--rot-x-delta', `${rotateX}deg`);

      const reference = document.createElement('div');
      reference.className = 'item__image item__image--reference';
      reference.style.opacity = '0';
      reference.style.transform = `rotateX(${-parentRotation.rotateX}deg) rotateY(${-parentRotation.rotateY}deg)`;
      parent.appendChild(reference);

      const tileRect = reference.getBoundingClientRect();
      const mainRect = mainRef.current?.getBoundingClientRect();
      const frameRect = frameRef.current?.getBoundingClientRect();

      if (!mainRect || !frameRect || tileRect.width <= 0 || tileRect.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        reference.remove();
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = {
        left: tileRect.left,
        top: tileRect.top,
        width: tileRect.width,
        height: tileRect.height
      };
      element.style.visibility = 'hidden';

      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.position = 'absolute';
      overlay.style.left = `${frameRect.left - mainRect.left}px`;
      overlay.style.top = `${frameRect.top - mainRect.top}px`;
      overlay.style.width = `${frameRect.width}px`;
      overlay.style.height = `${frameRect.height}px`;
      overlay.style.opacity = '0';
      overlay.style.zIndex = '30';
      overlay.style.transformOrigin = 'top left';
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;

      const image = document.createElement('img');
      image.src = parent.dataset.src || element.querySelector('img')?.src || '';
      image.alt = element.getAttribute('aria-label') || '';
      overlay.appendChild(image);
      viewerRef.current.appendChild(overlay);

      const translateX = tileRect.left - frameRect.left;
      const translateY = tileRect.top - frameRect.top;
      const scaleX = tileRect.width / frameRect.width;
      const scaleY = tileRect.height / frameRect.height;
      overlay.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
        rootRef.current?.setAttribute('data-enlarging', 'true');
      });

      if (openedImageWidth || openedImageHeight) {
        const onFirstEnd = (event) => {
          if (event.propertyName !== 'transform') return;
          overlay.removeEventListener('transitionend', onFirstEnd);
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          overlay.style.left = `calc(50% - (${openedImageWidth} / 2))`;
          overlay.style.top = `calc(50% - (${openedImageHeight} / 2))`;
          overlay.style.width = openedImageWidth;
          overlay.style.height = openedImageHeight;
        };
        overlay.addEventListener('transitionend', onFirstEnd);
      }
    },
    [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, segments, unlockScroll]
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return undefined;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const element = focusedElRef.current;
      const overlay = viewerRef.current?.querySelector('.enlarge');
      if (!element || !overlay) return;

      const parent = element.parentElement;
      const reference = parent.querySelector('.item__image--reference');
      overlay.remove();
      reference?.remove();
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      element.style.visibility = '';
      focusedElRef.current = null;
      openingRef.current = false;
      rootRef.current?.removeAttribute('data-enlarging');
      document.body.classList.remove('dg-scroll-lock');
      scrollLockedRef.current = false;
    };

    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };

    scrim.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const onTileClick = useCallback(
    (event) => {
      if (!enableImageViewer) return;
      if (draggingRef.current || movedRef.current || performance.now() - lastDragEndAt.current < 80) return;
      openItemFromElement(event.currentTarget);
    },
    [enableImageViewer, openItemFromElement]
  );

  const handlePointerEnter = () => {
    isHoveringRef.current = true;
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock');
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        '--segments-x': segments,
        '--segments-y': segments,
        '--overlay-blur-color': overlayBlurColor,
        '--tile-radius': imageBorderRadius,
        '--enlarge-radius': openedImageBorderRadius,
        '--image-filter': grayscale ? 'grayscale(1)' : 'none',
        '--image-fit': imageFit,
        '--tile-cursor': enableImageViewer ? 'pointer' : 'grab'
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((item, index) => (
              <div
                key={`${item.x},${item.y},${index}`}
                className="item"
                data-src={item.src}
                data-offset-x={item.x}
                data-offset-y={item.y}
                data-size-x={item.sizeX}
                data-size-y={item.sizeY}
                style={{
                  '--offset-x': item.x,
                  '--offset-y': item.y,
                  '--item-size-x': item.sizeX,
                  '--item-size-y': item.sizeY
                }}
              >
                <div
                  className="item__image"
                  role={enableImageViewer ? 'button' : undefined}
                  tabIndex={enableImageViewer ? 0 : undefined}
                  aria-label={enableImageViewer ? item.alt || 'Open image' : item.alt}
                  onClick={enableImageViewer ? onTileClick : undefined}
                >
                  <img src={item.src} draggable={false} alt={item.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}

export default DomeGallery;
