const baseUrl = import.meta.env.BASE_URL;

export const projects = [
  {
    name: 'MyMeds',
    frequency: '88.1',
    category: 'Mobile development',
    terms: ['my meds', 'medication', 'reminders', 'caregiver', 'mobile', 'flutter', 'firebase', 'dart'],
    tools: ['Flutter', 'Dart', 'Firebase'],
    story: 'MyMeds began as a final-year capstone about missed medication. Reminders stay on until the patient marks a dose as taken, and a family member can check in through the caregiver dashboard.',
    features: [
      'Patients track prescriptions and mark doses as taken. Push reminders persist until a dose is recorded.',
      'Caregivers can monitor adherence remotely through their own dashboard.',
      'Large text and high-contrast controls make the mobile interface easier for older patients to use.'
    ],
    gallery: [{ src: `${baseUrl}assets/Mymeds-flowchart.png`, alt: 'MyMeds system flowchart' }],
    contribution: 'Aziq set up Firebase Authentication and Firestore, implemented persistent alerts with Firebase Cloud Messaging, designed the Flutter interface, and tested and deployed the app.',
    description: 'A mobile medication reminder application built with Flutter and Firebase.',
    image: `${baseUrl}assets/MyMeds.png`,
    imageAlt: 'MyMeds opening screen with a medication reminder bell',
    href: `${baseUrl}project-mymeds.html`
  },
  {
    name: 'Speech Tracker',
    frequency: '90.8',
    category: 'Embedded systems',
    terms: ['speech', 'iot', 'embedded', 'arduino', 'whatsapp', 'speechtracker', 'sensor', 'machine learning'],
    tools: ['Arduino', 'C/C++', 'sensors', 'machine learning'],
    story: 'Speech Tracker listens for target words on a low-powered device. It was built to help parents follow their children’s speech development, with visual feedback and progress updates sent through WhatsApp.',
    features: [
      'This final-year electronic engineering project was designed as a low-cost option for families with limited access to regular speech therapy.',
      'The device records audio and processes it locally with a trained model that classifies speech patterns.',
      'Children receive immediate visual feedback on clarity and volume. Parents receive progress updates through WhatsApp.'
    ],
    contribution: 'Through this final-year project, Aziq learned to deploy a model on a lightweight device, connect sensors for real-time data, and send updates using IoT communication protocols.',
    description: 'A low-powered device that tracks targeted words and notifies the user through WhatsApp.',
    image: `${baseUrl}assets/Speech%20Tracker.png`,
    imageAlt: 'Inside the Speech Tracker device, showing its speaker, voice recognition module and ESP32-S3',
    href: `${baseUrl}project-speechtracker.html`
  },
  {
    name: 'GestureMouse',
    frequency: '93.5',
    category: 'Computer vision',
    terms: ['gesture mouse', 'gestures', 'webcam', 'hand tracking', 'computer vision', 'mediapipe', 'opencv', 'pyautogui', 'python'],
    tools: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI'],
    story: 'A standard webcam becomes a mouse. MediaPipe tracks landmarks on the hand, the index finger steers the cursor, and combinations of fingers trigger clicks.',
    gallery: [
      { src: `${baseUrl}assets/GestureMouse-detection-1.png`, alt: 'GestureMouse detection example' },
      { src: `${baseUrl}assets/GestureMouse-detection-2.png`, alt: 'GestureMouse detection result' }
    ],
    image: `${baseUrl}assets/GestureMouse-hand-controller.png`,
    imageAlt: 'GestureMouse tracking hand landmarks',
    description: 'A computer vision project using MediaPipe to detect hand gestures and operate a mouse.',
    href: `${baseUrl}project-gesturemouse.html`
  },
  {
    name: 'Iotnect',
    frequency: '98.9',
    image: `${baseUrl}assets/iotnect-home.webp`,
    imageAlt: 'The Iotnect homepage with its purple plasma logo and particle wordmark',
    category: 'Company website & dashboard',
    description: 'A company website showcasing computer vision and IoT projects, alongside full-stack dashboard work.',
    story: 'Visitors can see how Iotnect’s computer vision products work before asking for a demo. The site introduces NeoVision and Neo Eagle, with a video walkthrough of NeoVision in action.',
    terms: ['company website', 'particle animation', 'webgl', 'neo eagle'],
    features: [
      'The opening screen draws the Iotnect name from particles and animates the logo with a WebGL plasma effect.',
      'Dedicated product sections lead visitors from a short introduction to the NeoVision video demo.',
      'The public site exports as static pages so it can run without an application server.'
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'OGL', 'WebGL'],
    contribution: 'I built the public website from scratch, including its animated opening. My separate dashboard work for Iotnect covered the frontend, backend and database.'
  },
  {
    name: 'MBS',
    frequency: '101.6',
    coverImage: `${baseUrl}assets/seremban-city-council.png`,
    image: `${baseUrl}assets/mbs-water-levels.webp`,
    imageAlt: 'MBS dashboard replay showing water readings and their historical trend',
    category: 'Municipal flood monitoring',
    description: 'A camera map for monitoring water levels in Seremban.',
    story: 'An operator scanning the Seremban map can see which camera locations need attention. Selecting a marker reveals the water status and the time of the reading, with camera footage available for a closer look.',
    terms: ['seremban', 'camera map', 'flood monitoring'],
    features: [
      'Rising water pulses yellow on the map. A danger reading pulses red. Under normal conditions the marker shows camera connectivity.',
      'Detection updates reach the dashboard over a WebSocket, keeping the map in step with incoming readings.',
      'FFmpeg and MediaMTX prepare camera feeds for browser playback. Operators can monitor several feeds together.'
    ],
    tools: ['Next.js', 'React', 'Leaflet', 'Supabase', 'FFmpeg', 'MediaMTX'],
    contribution: 'I built the map and dashboard interface and handled the backend and database behind the camera status and detection updates.'
  },
  {
    name: 'MBDK',
    frequency: '104.3',
    coverImage: `${baseUrl}assets/klang-royal-city-council.png`,
    image: `${baseUrl}assets/mbdk-klang-map.webp`,
    imageAlt: 'MBDK public map showing the Klang district boundary and two camera markers',
    imageCredit: { label: '© OpenStreetMap contributors', href: 'https://www.openstreetmap.org/copyright' },
    category: 'Smart city operations',
    description: 'A municipal monitoring platform with a public portal and role-based staff dashboards.',
    story: 'MBDK gives council staff different views of city operations. Management can review revenue and expenditure in the executive dashboard, while operations teams can use the command centre to review camera views.',
    terms: ['city portal', 'command centre', 'municipal finance'],
    features: [
      'The public portal and staff workspace have separate entry points. Management, enforcement and IT users see controls for their roles.',
      'Authorised staff enter revenue and expenditure records and export a report from the executive dashboard.',
      'The command-centre demo uses looping video in CCTV tiles and opens the selected camera in a larger view.'
    ],
    tools: ['React', 'Laravel', 'Leaflet'],
    contribution: 'I built MBDK end to end, from the public portal and staff interfaces to the backend and the finance record workflow.'
  },
  {
    name: 'Shimadzu',
    frequency: '107.0',
    coverImage: `${baseUrl}assets/shimadzu-logo.svg`,
    image: `${baseUrl}assets/shimadzu-inspection.webp`,
    imageAlt: 'Shimadzu inspection console with camera controls, a checklist and an event log',
    category: 'Workflow automation',
    story: 'Shimadzu’s production team can trace a daily total back to the jobs that produced it. The dashboard replaces the previous Power BI reporting workflow. A separate inspection screen pairs camera playback with a checklist and event log.',
    terms: ['power bi', 'automation', 'inspection', 'manual entry'],
    description: 'Aziq built the Shimadzu dashboard, automated manual entry and inspection, and replaced the previous Power BI workflow.',
    features: [
      'Filter imported work logs by date and station to compare production cycles, running time and idle time. Cycle counts and recorded quantities are shown separately.',
      'Follow the station timeline to individual job records, then export a report for the selected work.',
      'Start or stop inspection video, review checklist results and download a PDF with the operator, status and inspection time.'
    ],
    tools: ['Laravel', 'React', 'TypeScript'],
    contribution: 'I built the frontend, backend and database and automated steps in the manual entry and inspection workflow. I aligned the production metrics with the existing Power BI report so the team could keep using familiar measures.'
  }
];

export const frequencies = projects.map(({ frequency }) => frequency);
