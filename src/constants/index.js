import {
  enova,
  irontech,
  iron_school,
  logo,
  proxicon,
  ironSchoolIntro,
  ironSchoolAdmin1,
  ironSchoolAdmin2,
  ironSchoolAdmin3,
  ironSchoolAdmin4,
  ironSchoolAdmin5,
  ironSchoolAdmin6,
  ironSchoolAdmin7,
  ironSchoolAdmin8,
  ironSchoolMobile1,
  ironSchoolMobile2,
  ironSchoolMobile3,
  ironSchoolMobile4,
  ironSchoolMobile5,
  ironSchoolMobile6,
  ironSchoolMobile7,
  ironSchoolMobile8,
  ironSchoolMobile9,
  ironSchoolMobile10,
  ironSchoolMobile11,
  cobotList2,
  cobotContr,
  cobotContr2,
  cobotMoves,
  cobotSim,
  trajCr1,
  trajCr2,
  trajList,
  kpiMon,
  kpiMon2,
  usersManag,
  addUser,
  auth1,
  pdf1,
  reportPdf,
} from "../assets";

export const siteMeta = {
  firstName: "Dhia",
  lastName: "Mandhouj",
  fullName: "Dhia Eddine Mandhouj",
  role: "Full-Stack Developer",
  location: "Tunisia",
  timezone: "Africa/Tunis",
  email: "diamandouj@gmail.com",
  phone: "+216 53 368 171",
  phoneHref: "+21653368171",
  availability: "Open to new opportunities",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/dhia-eddine" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhia-eddine-mandhouj/",
  },
  { label: "Instagram", href: "https://www.instagram.com/dia_mandouj/" },
];

export const navLinks = [
  { id: "about", title: "About", index: "01" },
  { id: "experience", title: "Experience", index: "02" },
  { id: "stack", title: "Stack", index: "03" },
  { id: "work", title: "Work", index: "04" },
  { id: "contact", title: "Contact", index: "05" },
];

const services = [
  {
    index: "01",
    title: "Full-Stack Development",
    description:
      "End-to-end web platforms — from data model and API design to polished, production-ready interfaces.",
    keywords: ["NestJS", "PostgreSQL", "React", "Prisma"],
  },
  {
    index: "02",
    title: "Frontend Engineering",
    description:
      "Responsive, animated interfaces with careful attention to performance, detail, and interaction.",
    keywords: ["React", "Next.js", "Tailwind", "Three.js"],
  },
  {
    index: "03",
    title: "Backend & APIs",
    description:
      "Secure REST APIs, role-based access control, real-time WebSockets, and automated testing.",
    keywords: ["NestJS", "Python", "WebSockets", "JWT"],
  },
];

const stats = [
  { value: "2022", label: "Working since" },
  { value: "06", label: "Roles & internships" },
  { value: "02", label: "Featured case studies" },
  { value: "15+", label: "Technologies in play" },
];

// Names cycled through the scrolling tech marquee
const technologies = [
  "React",
  "TypeScript",
  "NestJS",
  "React Native",
  "Next.js",
  "Angular",
  "Vite",
  "Tailwind CSS",
  "Three.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "Playwright",
  "Python",
  "Java",
];

// Grouped, typographic view of the stack
const techGroups = [
  {
    index: "01",
    label: "Frontend",
    items: [
      "React",
      "React Native",
      "Next.js",
      "Angular",
      "JavaScript",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Material UI",
      "Three.js",
      "PWA",
      "i18n",
    ],
  },
  {
    index: "02",
    label: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "Django",
      "Spring Boot",
      "Python",
      "Java",
      "REST API Design",
      "WebSockets",
      "RBAC & JWT Auth",
    ],
  },
  {
    index: "03",
    label: "Data & Infra",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "IndexedDB",
      "Prisma ORM",
      "TypeORM",
      "Docker",
      "Docker Compose",
      "Nginx",
      "Git",
      "GitHub",
      "Service Workers",
      "Web Workers",
    ],
  },
  {
    index: "04",
    label: "Practices",
    items: [
      "Offline-First Architecture",
      "Integration Testing",
      "E2E Testing",
      "Playwright",
      "Selenium",
      "Cucumber",
      "Agile Scrum",
    ],
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Moonify-Tech",
    icon: iron_school,
    date: "Jan 2026 — Present",
    websiteLabel: "Iron School Website",
    websiteHref: "https://iron-school.com/en",
    points: [
      "Developed and maintained full-stack features across Iron School, a large modular school-management platform, using NestJS, Prisma ORM, PostgreSQL, React, and React Native.",
      "Extended and refactored domain models, Prisma schemas, database relations, migrations, DTOs, services, and controllers to support new platform requirements and improve maintainability.",
      "Worked across a multi-platform monorepo covering NestJS APIs, React admin dashboards, and a React Native mobile application, delivering new modules, bug fixes, UI improvements, and long-term maintenance enhancements.",
      "Designed secure RESTful APIs following NestJS best practices, implementing role-based access control (RBAC), data validation, relational queries, and reliable business logic across multiple platform domains.",
      "Built and improved admin interfaces for complex data workflows, including dynamic forms, tables, filters, CRUD screens, file handling, and API integrations.",
      "Wrote and maintained integration and end-to-end tests to improve system reliability, protect critical workflows, and ensure data consistency across full-stack components.",
      "Built Iron Timetable, an offline-first school timetable planning platform using React, TypeScript, Vite, TailwindCSS, Radix UI, and IndexedDB.",
      "Engineered a constraint-aware scheduling and validation system, and implemented features including drag-and-drop planning, slot resizing, unplaced-session analysis, undo/redo history, multi-project management, and JSON import/export workflows.",
      "Improved application responsiveness by using Web Workers for timetable generation, validation, and analysis, while adding PWA support, service workers, cross-tab synchronization, and multilingual support for languages with RTL compatibility.",
    ],
    project_d:
      "Iron School streamlines every aspect of school administration — from student management to parent communication — in one powerful platform.",
  },
  {
    title: "Full Stack Developer",
    company_name: "Enova Robotics",
    icon: enova,
    date: "Feb 2025 — Jun 2025",
    points: [
      "Developed a responsive web-based control application for the UR10e collaborative robot.",
      "Implemented real-time robot monitoring, 3D trajectory visualization, and multi-user management.",
      "Engineered an intuitive interface using Next.js, React, Tailwind CSS, and Three.js for seamless remote robot operation.",
      "Integrated NestJS, Python, and WebSockets on the backend for reliable industrial automation workflows.",
      "Strengthened security and quality with JWT authentication and automated testing (Selenium, Cucumber).",
    ],
    project_d:
      "A web control center for the UR10e cobot: real-time monitoring, 3D trajectory visualization, and multi-user management on a secure WebSocket backend.",
  },
  {
    title: "Backend Developer",
    company_name: "Proxym",
    icon: proxicon,
    date: "Sep 2024 — Oct 2024",
    points: [
      "Developed a data processing application using Spring Boot and Spring Batch for efficient handling of large datasets.",
      "Configured CSV processing pipelines to ensure robust batch execution and data integrity.",
      "Integrated REST APIs and PostgreSQL to support dynamic and reliable backend operations.",
      "Collaborated in a team environment using Docker and GitHub for versioning and deployment workflows.",
    ],
    project_d:
      "A scalable batch data-processing service built on Spring Boot, Spring Batch, and PostgreSQL.",
  },
  {
    title: "Full Stack Developer",
    company_name: "Freelance",
    icon: logo,
    date: "Mar 2024 — May 2024",
    points: [
      "Developed a data processing application using Spring Boot and Spring Batch for efficient handling of large datasets.",
      "Configured CSV processing pipelines to ensure robust batch execution and data integrity.",
      "Integrated REST APIs and PostgreSQL to support dynamic and reliable backend operations.",
      "Applied clean coding standards and best practices throughout the development process.",
    ],
    project_d:
      "A scalable data-processing application enabling CSV configuration, robust batch execution, and PostgreSQL-based operations.",
  },
  {
    title: "Backend Developer",
    company_name: "Iron Tech",
    icon: irontech,
    date: "Jul 2023 — Aug 2023",
    points: [
      "Developed a job assessment platform with a robust backend infrastructure.",
      "Facilitated seamless assessment tests and comprehensive administrative capabilities.",
      "Applied the adapter design pattern and followed Agile Scrum for project management.",
      "Participated in code reviews, providing constructive feedback to other developers.",
    ],
    project_d:
      "A job assessment platform enabling streamlined assessment tests and administration.",
  },
  {
    title: "Web Developer",
    company_name: "Enova Robotics",
    icon: enova,
    date: "Feb 2022 — Jun 2022",
    points: [
      "Built and maintained web applications using Angular and Django.",
      "Defined application constants — colors, spacing, radius, and sizes — for a consistent design system.",
      "Implemented responsive design, cross-browser compatibility, and Google Maps SDK integration.",
      "Consumed REST APIs and implemented a forgot-password flow.",
    ],
    project_d:
      "A monitoring dashboard for P-Guard (security robot) with on-demand reporting from laptop or mobile.",
  },
];

const projects = [
  {
    id: "iron-school",
    index: "01",
    name: "Iron School",
    tagline: "School Management Platform",
    year: "2026",
    role: "Full-Stack Development",
    description:
      "Iron School streamlines every aspect of school administration — from student management and parent communication to payroll, employee contracts, and payment tracking — all in one powerful platform. Built with NestJS, PostgreSQL, Prisma ORM, React, and React Native.",
    tags: [
      { name: "NestJS" },
      { name: "React" },
      { name: "React Native" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
    ],
    image: ironSchoolAdmin1,
    gallery: [
      ironSchoolIntro,
      ironSchoolAdmin1,
      ironSchoolAdmin2,
      ironSchoolAdmin3,
      ironSchoolAdmin4,
      ironSchoolAdmin5,
      ironSchoolAdmin6,
      ironSchoolAdmin7,
      ironSchoolAdmin8,
      ironSchoolMobile1,
      ironSchoolMobile2,
      ironSchoolMobile3,
      ironSchoolMobile4,
      ironSchoolMobile5,
      ironSchoolMobile6,
      ironSchoolMobile7,
      ironSchoolMobile8,
      ironSchoolMobile9,
      ironSchoolMobile10,
      ironSchoolMobile11,
    ],
    source_code_link: "https://iron-school.com/en",
    link_label: "Visit Website",
  },
  {
    id: "enova-robotics-cobot",
    index: "02",
    name: "UR10e Cobot Control",
    tagline: "Industrial Robot Interface",
    year: "2025",
    role: "Full-Stack Development",
    description:
      "Responsive web-based control application for the UR10e collaborative robot, featuring real-time monitoring, 3D trajectory visualization, and multi-user management. Built with Next.js, React, Tailwind CSS, and Three.js on the frontend, with a secure backend using NestJS, Python, WebSockets, and JWT authentication.",
    tags: [
      { name: "Next.js" },
      { name: "React" },
      { name: "NestJS" },
      { name: "Three.js" },
      { name: "Tailwind" },
    ],
    image: cobotSim,
    gallery: [
      cobotSim,
      cobotList2,
      cobotContr,
      cobotContr2,
      cobotMoves,
      trajCr1,
      trajCr2,
      trajList,
      kpiMon,
      kpiMon2,
      usersManag,
      addUser,
      auth1,
      pdf1,
      reportPdf,
    ],
  },
];

export { services, stats, technologies, techGroups, experiences, projects };
