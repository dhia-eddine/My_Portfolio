import {
  frontend,
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  sql,
  tailwind,
  nodejs,
  mongodb,
  git,
  adobexd,
  java,
  enova,
  irontech,
  iron_school,
  logo,
  threejs,
  angular,
  django,
  python,
  nestjs,
  proxicon,
  ironSchoolOg,
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
  nx,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "Experience",
    title: "Experience",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "ANGULAR",
    icon: angular,
  },
  {
    name: "NESTJS",
    icon: nestjs,
  },
  {
    name: "django",
    icon: django,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },

  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "CSS 3",
    icon: css,
  },

  {
    name: "sql",
    icon: sql,
  },
  {
    name: "NX Monorepos",
    icon: nx,
  },

  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "java",
    icon: java,
  },
  {
    name: "python",
    icon: python,
  },
  {
    name: "HTML 5",
    icon: html,
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Moonify-Tech",
    icon: iron_school,
    iconBg: "#383E56",
    date: "01/2026 – Present",
    key_q: "Key Qualifications",
    points: [
      "Developing a payroll management system for Iron School platform, designing and implementing employee contracts, payslip generation, and payment tracking modules with full-stack solutions using Prisma ORM, PostgreSQL, NestJS, React.",
      "Performed ongoing maintenance, bug fixes, and feature development across a multi-platform monorepo (NestJS backend, React admin panel, React Native mobile app).",
      "Wroteandmaintained integration and end-to-end tests across full-stack components to ensure system reliability and data integrity.",
      "Architected RESTful API endpoints following NestJS best practices with role-based access control (RBAC), and built responsive admin interfaces using React.",
    ],
    project_d:
      "Iron School streamlines every aspect of school administration. From student management to parent communication, handle it all in one powerful platform.",
  },
  {
    title: "Full Stack",
    company_name: "Enova ROBOCTICS ",
    icon: enova,
    iconBg: "#E6DEDD" /*"#383E56"*/,
    date: "february 2025 - june 2025",
    key_q: "Key Qualifications",
    points: [
      "Developed a responsive and user-friendly web-based control application for the UR10e collaborative robot.",
      "Implemented real-time robot monitoring, 3D trajectory visualization, and multi-user management.",
      "Engineered an intuitive interface using Next.js, React.js, TailwindCSS, and Three.js for seamless remote robot operation.",
      "Integrated robust backend technologies including NestJS, Python, and WebSockets to ensure reliable industrial automation workflows.",
      "Enhanced system security and performance through JWT authentication and automated testing with Selenium and Cucumber.",
    ],
    project_d:
      "Developed a responsive web-based control application for the UR10e collaborative robot, featuring real-time monitoring, 3D trajectory visualization, multi-user management, and a modern interface built with Next.js, React.js, TailwindCSS, and Three.js, supported by a secure and reliable backend using NestJS, Python, WebSockets, and JWT authentication.",
  },
  {
    title: "Backend developer",
    company_name: "proxym",
    icon: proxicon,
    iconBg: "#383E56" /*"#383E56"*/,
    date: "september 2024 - octobre 2024",
    key_q: "Key Qualifications",
    points: [
      "Developed a responsive and user-friendly web-based control application for the UR10e collaborative robot.",
      "Implemented real-time robot monitoring, 3D trajectory visualization, and multi-user management.",
      "Engineered an intuitive interface using Next.js, React.js, TailwindCSS, and Three.js for seamless remote robot operation.",
      "Integrated robust backend technologies including NestJS, Python, and WebSockets to ensure reliable industrial automation workflows.",
      "Enhanced system security and performance through JWT authentication and automated testing with Selenium and Cucumber.",
    ],
    project_d:
      "Developed a responsive web-based control application for the UR10e collaborative robot, featuring real-time monitoring, 3D trajectory visualization, multi-user management, and a modern interface built with Next.js, React.js, TailwindCSS, and Three.js, supported by a secure and reliable backend using NestJS, Python, WebSockets, and JWT authentication.",
  },
  {
    title: "Full Stack",
    company_name: " ",
    icon: logo,
    iconBg: "#E6DEDD" /*"#383E56"*/,
    date: "Mars 2024 - May 2024",
    key_q: "Key Qualifications",
    points: [
      "Developed a data processing application using Spring Boot and Spring Batch for efficient handling of large datasets.",
      "Configured CSV processing pipelines to ensure robust batch execution and data integrity.",
      "Integrated REST APIs and PostgreSQL to support dynamic and reliable backend operations.",
      "Applied clean coding standards and best practices throughout the development process.",
      "Collaborated within a team environment while using Docker for containerization and GitHub for streamlined version control and deployment workflows.",
    ],
    project_d:
      "Developed a scalable data processing application using Spring Boot and Spring Batch, enabling efficient CSV configuration, robust batch execution, REST API integration, and PostgreSQL-based data operations, while leveraging Docker and GitHub to optimize deployment workflows and maintain system reliability.",
  },

  {
    title: "Backend developer",
    company_name: "IRON TECH",
    icon: irontech,
    iconBg: "#383E56" /*"#383E56"*/,
    date: "July 2023 - August 2023",
    key_q: "Key Qualifications",
    points: [
      "Developed a job assessment platform with a powerful backend infrastructure.",
      "Facilitated seamless assessment tests and comprehensive administrative capabilities.",
      "Apply adapter design pattern.",
      "Followed Agile Scrum methodology for project management and collaboration.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    project_d:
      "Engineered a job assessment platform with a robust backend infrastructure, enabling streamlined assessment tests and administrative capabilities.",
  },
  {
    title: "Web Developer",
    company_name: "Enova ROBOCTICS",
    icon: enova,
    iconBg: "#E6DEDD" /*"#383E56"*/,
    date: "February 2022 - june 2022",
    key_q: "Key Qualifications",
    points: [
      "Project initiation and planning.",
      "Developing and maintaining web applications using Angular, Django and other related technologies.",
      "Define application constants: colors, margins, paddings, border radius and sizes.",
      "Apply adapter design pattern.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Add google map developer SDK",
      "Consume APIs",
      "Implementing a forgot password",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    project_d:
      "Development of a Monitoring Dashboard for P-Guard (security robot), featuring the ability to monitor a selected robot and generate reports on-demand using a laptop or mobile device.",
  },
];

const projects = [
  {
    id: "iron-school",
    name: "Iron School – School Management Platform",
    description:
      "Iron School streamlines every aspect of school administration — from student management and parent communication to payroll, employee contracts, and payment tracking — all in one powerful platform. Built with NestJS, PostgreSQL, Prisma ORM, React, and React Native.",
    tags: [
      { name: "NestJS", color: "green-text-gradient" },
      { name: "React", color: "blue-text-gradient" },
      { name: "React Native", color: "blue-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "Prisma", color: "pink-text-gradient" },
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
    name: "Enova Robotics – UR10e Cobot Control",
    description:
      "Responsive web-based control application for the UR10e collaborative robot, featuring real-time monitoring, 3D trajectory visualization, and multi-user management. Built with Next.js, React.js, TailwindCSS, and Three.js on the frontend, with a secure backend using NestJS, Python, WebSockets, and JWT authentication.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "React", color: "blue-text-gradient" },
      { name: "NestJS", color: "green-text-gradient" },
      { name: "Three.js", color: "pink-text-gradient" },
      { name: "Tailwind", color: "pink-text-gradient" },
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

export { services, technologies, experiences, projects };
