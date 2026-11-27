const icons = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  back: <path d="M20 12H5m6-6-6 6 6 6" />,
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" />,
  external: <path d="M7 17 17 7M7 7h10v10" />,
  focus: <><path d="M9 4H4v5m11-5h5v5m0 6v5h-5m-11-5v5h5" /><circle cx="12" cy="12" r="2.5" /></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  library: <path d="M4 5v14M9 5v14m4-14v14m4-13 4 12" />,
  linkedin: <path d="M5 9h3v11H5zm1.5-5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM11 9h3v1.6c.5-1.1 1.7-1.8 3-1.8 2.4 0 3.5 1.5 3.5 4.4V20h-3v-6.2c0-1.5-.4-2.2-1.5-2.2-1.2 0-2 .9-2 2.6V20h-3Z" fill="currentColor" stroke="none" />,
  music: <path d="M10 17V6l10-2v11m-10 2c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2Zm10-2c0 1.1-1.3 2-3 2s-3-.9-3-2 1.3-2 3-2 3 .9 3 2Z" />,
  mute: <path d="M4 9v6h4l5 4V5L8 9H4Zm13 1 5 5m0-5-5 5" />,
  next: <path d="m6 5 10 7-10 7zM19 5h1v14h-1z" fill="currentColor" stroke="none" />,
  pause: <path d="M7 5h3v14H7zm7 0h3v14h-3z" fill="currentColor" stroke="none" />,
  play: <path d="m8 4 13 8-13 8z" fill="currentColor" stroke="none" />,
  previous: <path d="m18 5-10 7 10 7zM4 5h1v14H4z" fill="currentColor" stroke="none" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
  signal: <path d="M3 10v4m4-7v10m5-14v18m5-14v10m4-7v4" />,
  volume: <path d="M3 9v6h4l5 4V5L7 9H3Zm13-1a5 5 0 0 1 0 8m3-11a9 9 0 0 1 0 14" />
};

export default function PortfolioIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[name]}</svg>
  );
}
