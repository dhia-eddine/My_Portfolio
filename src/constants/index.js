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
  logo,
  carrent,
  jobit,
  tripguide,
  threejs,
  angular,
  django,
  python,
  nestjs,
  proxicon
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
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
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "sql",
    icon: sql,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
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
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "adobexd",
    icon: adobexd,
  },
  {
    name: "java",
    icon: java,
  },
  {
    name: "python",
    icon: python,
  },
];

const experiences = [
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

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
