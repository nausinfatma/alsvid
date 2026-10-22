export interface Service {
  slug: string;
  path: string;
  title: string;
  summary: string;
  intro: string;
  points: string[];
  group: 'core' | 'bpo';
  image?: string;
  verified: boolean;
}

export interface Partner {
  name: string;
  role: string;
  logo: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}

export const site = {
  name: 'Alsvid Infocom Pvt Ltd',
  shortName: 'Alsvid Infocom',
  tagline: 'Expert IT Support and Training for Skill Development',
  lead: 'Alsvid Infocom empowers your growth with reliable IT services and comprehensive skill training tailored for India’s dynamic market.',
  description:
    'Alsvid Infocom Pvt Ltd is a dedicated Indian company supporting IT & IT-enabled services along with skill development training. We empower clients through robust IT support and comprehensive skill-building initiatives, fostering growth and expertise.',
  email: 'info@alsvidinfo.com',
  phone: '+91 9830032339',
  phoneDisplay: '+91 98300 32339',
  address: 'Narayanpur, P.O. Rajarhat-Gopalpur, Kolkata - 700136, West Bengal, INDIA',
  city: 'Kolkata, West Bengal',
  vision: "To be India's leading IT & skill development partner.",
  mission: 'Deliver quality IT support and skill training services that bridge education and employment.',
  values: 'Commitment to excellence, integrity, continuous learning, and client success.',
  socials: {
    facebook: 'https://facebook.com/AlsvidInfocon',
    linkedin: 'https://www.linkedin.com/company/alsvidinfocon/',
    instagram: 'https://instagram.com/alsvidinfocon',
    twitter: 'https://x.com/AlsvidInfocon',
    youtube: 'https://www.youtube.com/@AlsvidInfocon',
  },
};

export const whyChooseUs = [
  {
    num: '01',
    title: 'Trusted IT Help',
    desc: 'Reliable IT support services tailored specifically for your daily business needs and system stability.',
  },
  {
    num: '02',
    title: 'Skilled Training',
    desc: 'Certified training experts helping students and professionals stay competitive in modern IT technologies.',
  },
  {
    num: '03',
    title: 'Complete IT Care',
    desc: 'End-to-end technology solutions ensuring smooth, uninterrupted business operations and infrastructure.',
  },
  {
    num: '04',
    title: 'Skill Enhancement',
    desc: 'State-backed and industry-aligned development programs empowering youth with job-ready capabilities.',
  },
];

export const partners: Partner[] = [
  {
    name: 'Government of West Bengal',
    role: 'Skill Training Initiative Partner',
    logo: '/images/partners/chakra.jpg?v=20261022-2',
  },
  {
    name: 'Utkarsh Bangla',
    role: 'Flagship Skill Development Program',
    logo: '/images/partners/utkarsh-bangla.jpg',
  },
];

export const services: Service[] = [
  {
    slug: 'it-support',
    path: '/it-support',
    group: 'core',
    verified: true,
    title: 'IT Support',
    summary: 'Reliable IT support to keep your business running smoothly.',
    intro: 'Dependable technical support so your team spends its time on productive work, not broken systems.',
    image: '/images/services/it-support.webp',
    points: [
      'Helpdesk & round-the-clock troubleshooting',
      'Hardware diagnostics & system maintenance',
      'Network, server & firewall configuration',
      'Data backup, recovery & cybersecurity hygiene',
    ],
  },
  {
    slug: 'it-training',
    path: '/it-training',
    group: 'core',
    verified: true,
    title: 'IT Training',
    summary: 'Comprehensive IT training for skill enhancement and career growth.',
    intro: 'Practical, project-driven electrical and mechanical courses that build tangible skills learners can apply immediately on the job.',
    image: '/images/services/it-training.webp',
    points: [
      'Foundational & advanced software training',
      'Hands-on lab sessions and live coding projects',
      'Experienced instructors and dedicated mentors',
      'Industry-recognized certificates and placement assistance',
    ],
  },
  {
    slug: 'skill-development',
    path: '/skill-development',
    group: 'core',
    verified: true,
    title: 'Skill Development',
    summary: 'Skill development programs designed to boost your IT expertise.',
    intro: 'Structured, outcome-based initiatives bridging the gap between academic education and modern workplace demands.',
    image: '/images/services/skill-development.webp',
    points: [
      'Government-aligned curriculum (Utkarsh Bangla partner)',
      'Practical workplace readiness & soft skills',
      'Periodic benchmark assessments & feedback',
      'Direct interview preparation & industry connect',
    ],
  },
  {
    slug: 'solar-battery-ev-monitoring-software',
    path: '/solar-battery-ev-monitoring-software',
    group: 'core',
    verified: true,
    title: 'Solar, Battery & EV Monitoring Software',
    summary: 'Monitor solar generation, battery storage, and EV charging through clear operational views.',
    intro: 'Bring energy assets into one view with monitoring software that helps teams understand performance, review alerts, and follow energy flows.',
    image: '/images/services/solar-monitoring.jpg',
    points: [
      'Monitor solar generation, battery status, and EV charging activity',
      'Review alerts, availability, and energy performance trends',
      'Use role-based dashboards for operational visibility',
      'Plan reporting and data connections around compatible equipment',
    ],
  },
  {
    slug: 'electrical-design-engineering-software-services',
    path: '/electrical-design-engineering-software-services',
    group: 'core',
    verified: true,
    title: 'Electrical Design & Engineering Software Services',
    summary: 'Practical software support for electrical design workflows and engineering documentation.',
    intro: 'Support electrical teams with software setup and workflows for producing, coordinating, and maintaining clear engineering documents.',
    image: '/images/services/electrical-engineering.jpg',
    points: [
      'Set up software workflows for schematics and single-line diagrams',
      'Organize equipment schedules, drawing sets, and project documentation',
      'Coordinate revisions and shared engineering files',
      'Provide onboarding and workflow support for project teams',
    ],
  },
  {
    slug: 'electrical-asset-maintenance-management',
    path: '/electrical-asset-maintenance-management',
    group: 'core',
    verified: true,
    title: 'Electrical Asset & Maintenance Management',
    summary: 'Organize electrical assets, inspections, and maintenance activity in one clear workflow.',
    intro: 'Give maintenance teams a structured way to track electrical equipment, plan routine work, and keep service history accessible.',
    image: '/images/services/electrical-maintenance.jpg',
    points: [
      'Maintain searchable asset registers and equipment records',
      'Schedule inspections and preventive maintenance tasks',
      'Track work orders, service history, and follow-up actions',
      'Review asset condition and maintenance status across sites',
    ],
  },
  {
    slug: 'healthcare-bpo',
    path: '/bpo/healthcare',
    group: 'bpo',
    verified: true,
    title: 'Healthcare BPO',
    summary: 'Efficient patient support, billing, claims processing, and medical data management.',
    intro: 'Accurate and compliant back-office healthcare operations handled by specialized medical support agents.',
    points: [
      'Patient scheduling & empathetic helpdesk',
      'Medical billing and coding assistance',
      'Insurance claim processing & verification',
      'Secure Electronic Health Record (EHR) data management',
    ],
  },
  {
    slug: 'insurance-bpo',
    path: '/bpo/insurance',
    group: 'bpo',
    verified: true,
    title: 'Insurance BPO',
    summary: 'Streamlined policy management, claims processing, customer support, and risk assessment.',
    intro: 'Organized insurance operational pipelines from customer onboarding to rapid claims settlement.',
    points: [
      'Policy issuance, endorsements & renewals',
      'End-to-end claims adjudication & document intake',
      'Multichannel customer service & query resolution',
      'Underwriting support & risk assessment documentation',
    ],
  },
  {
    slug: 'education-bpo',
    path: '/bpo/education',
    group: 'bpo',
    verified: true,
    title: 'Education BPO',
    summary: 'Comprehensive student support, enrollment services, administration, and learning management solutions.',
    intro: 'Streamlined administrative support and learner guidance for academic institutions, ed-techs, and training centers.',
    points: [
      'Admissions guidance, student counseling & verification',
      'Academic records & transcript management',
      'Online LMS support & learner helpdesk',
      'Examination administration & fee collection management',
    ],
  },
];

export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Professional Services',
    to: '/professional-services',
    children: services.filter(s => s.group === 'core').map(s => ({ label: s.title, to: s.path })),
  },
  {
    label: 'BPO',
    to: '/bpo',
    children: services.filter(s => s.group === 'bpo').map(s => ({ label: s.title, to: s.path })),
  },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export const gallery: GalleryItem[] = [
  {
    src: '/images/gallery/gallery-1.webp',
    alt: 'Skill training session in progress at Alsvid Infocom',
    caption: 'Interactive Classroom Training',
  },
  {
    src: '/images/gallery/gallery-2.webp',
    alt: 'Computer lab and practical hands-on IT workshop',
    caption: 'Modern IT Computer Lab',
  },
  {
    src: '/images/gallery/gallery-3.webp',
    alt: 'Students collaborating on software projects',
    caption: 'Collaborative Learning & Mentorship',
  },
  {
    src: '/images/gallery/gallery-4.webp',
    alt: 'Workshop seminar and skill development conference',
    caption: 'Technical Seminars & Skill Workshops',
  },
  {
    src: '/images/gallery/gallery-5.webp',
    alt: 'Dedicated workstation area for IT and BPO operations',
    caption: 'BPO & Support Operations Center',
  },
];
