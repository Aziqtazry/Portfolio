const baseUrl = import.meta.env.BASE_URL;

export const projects = [
  {
    name: 'MyMeds',
    description: 'A mobile medication reminder application built with Flutter and Firebase.',
    image: `${baseUrl}assets/MyMeds.png`,
    imageAlt: 'MyMeds mobile application screen',
    href: `${baseUrl}project-mymeds.html`
  },
  {
    name: 'Speech Tracker',
    description: 'A low-powered device that tracks targeted words and notifies the user through WhatsApp.',
    image: `${baseUrl}assets/Speech%20Tracker.png`,
    imageAlt: 'Speech Tracker project screen',
    href: `${baseUrl}project-speechtracker.html`
  },
  {
    name: 'GestureMouse',
    description: 'A computer vision project using MediaPipe to detect hand gestures and operate a mouse.',
    placeholderIcon: 'fas fa-hand-pointer',
    href: `${baseUrl}project-gesturemouse.html`
  }
];
