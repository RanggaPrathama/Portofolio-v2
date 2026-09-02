import { Icons } from "@/components/icons";
import { HomeIcon, Code2Icon, Bot } from "lucide-react";

export const DATA = {
  name: "Rangga Prathama",
  initials: "RP",
  url: "https://rangga-dev.vercel.app",
  location: "Surabaya, Indonesia",
  locationLink: "https://www.google.com/maps/place/surabaya",
  description: "Fullstack Developer & AI Enthusiast",
  summary:
    "I'm a passionate problem-solver with a knack for picking up new tech fast. As an [Informatics Engineering student from Universitas Airlangga](/#education), I've spent my time not just in classrooms but also building real-world solutions through various freelance projects. I'm an experienced full-stack developer proficient in back-end technologies like **Golang, Laravel, and Node.js**, and front-end frameworks such as **React, Vue.js, HTML, CSS, and Tailwind**. I thrive on new challenges and am always eager to apply my skills in innovative ways.",
  avatarUrl: "/me.webp",
  skills: [
    "React",
    "Next.js",
    "Vue.js",
    "laravel",
    "Machine Learning",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: Code2Icon, label: "Projects" },
    { href: "/chatbot", icon: Bot, label: "Chatbot" },
  ],
  contact: {
    email: "ranggaprathama9@gmail.com",
    tel: "+111111",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/RanggaPrathama",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rangga-prathama-05a066291/",
        icon: Icons.linkedin,

        navbar: true,
      },
      // X: {
      //   name: "X",
      //   url: "",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      // Youtube: {
      //   name: "Youtube",
      //   url: "",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:ranggaprathama9@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "PT Qlcom Solusi Bisnis",
      href: "",
      badges: ["Full-time"],
      location: "Surabaya, Indonesia",
      title: "Full-Stack Developer",
      logoUrl: "/qlcom.jpeg",
      start: "Feb 2026",
      end: "Jul 2026",
      description:
        "Spearheaded technical coordination to build a scalable ERP solution, developing comprehensive modules for Purchasing, Inventory, Marketing, and Asset Management. Engineered a scalable full-stack architecture utilizing Express.js and Nuxt.js",
    },
    {
      company: "ERA REAL ESTATE",
      href: "",
      badges: ["Internship"],
      location: "Indonesia",
      title: "Backend & AI Engineer Intern",
      logoUrl: "/logoera.png",
      start: "Aug 2025",
      end: "Dec 2025",
      description:
        "Developed and maintained RESTful APIs for Single Sign-On (SSO) integration using Keycloak. Built and optimized backend APIs for the Human Resource Information System (HRIS). Designed and implemented AI-powered services based on Large Language Models (LLMs) to enable intelligent features and workflow automation.",
    },
    {
      company: "Airlangga University DSID",
      href: "https://unair.ac.id",
      badges: ["Internship"],
      location: "Surabaya, Indonesia",
      title: "Information Systems & Digitalization Intern",
      logoUrl: "/unair.png",
      start: "Jul 2024",
      end: "Jun 2025",
      description:
        "Spearheaded the development of 'Kampus Kita Mobile' utilizing Flutter. Engineered critical application features including a real-time QR Code attendance system, student academic modules, and a dynamic adaptive CV generation interface, while optimizing the underlying mobile API infrastructure.",
    },
    {
      company: "Airlangga University DIPP",
      href: "https://unair.ac.id",
      badges: ["Internship"],
      location: "Surabaya, Indonesia",
      title: "Innovation & Educational Development Intern",
      logoUrl: "/unair.png",
      start: "2023",
      end: "2024",
      description:
        "Successfully supported academic data management by ensuring timely and accurate RPS data input. Improved data accuracy and quality, contributing to a more efficient and reliable educational data processing workflow.",
    },
  ],

  education: [
    {
      school: "Airlangga University",
      href: "https://unair.ac.id",
      degree: "Bachelor's Degree in Informatics Engineering",
      logoUrl: "/unair.png",
      start: "2022",
      end: "2026",
      gpa: "3.8/4.0",
    },
  ],

  projects: [
    {
      title: "Enterprise Resource Planning (ERP) - Hutomo Group",
      href: "",
      dates: "2026",
      active: true,
      description:
        "Engineered a scalable full-stack Enterprise Resource Planning (ERP) system tailored for Hutomo Group to streamline complex corporate workflows. Spearheaded the development of comprehensive modules encompassing Purchasing, Inventory, Marketing, and Asset Management.",
      technologies: ["Express.js", "Nuxt.js", "Node.js", "PM2", "PostgreSQL"],
      links: [],
      images: ["/erp-1.png", "/erp-2.png"],
      video: "",
    },
    {
      title: "SIMEDI (Inventory Management Information System)",
      href: "",
      dates: "June 2024 - December 2024",
      active: true,
      description:
        "Contributed to a strategic digital transformation initiative through the development of SIMEDI, a tailored inventory management information system for PERUMDA Perkebunan Kahyangan, Jember. The application integrates end-to-end inventory processes, including stock tracking, logistics distribution, and real-time reporting, into a single efficient and user-centric platform. This project improves operational efficiency while promoting transparency and accountability in logistics governance within a regional state-owned enterprise (BUMD) environment.",
      technologies: ["Laravel", "Livewire", "MySQL"],
      links: [],
      images: ["/simedi.png"],
      video: "",
    },
    {
      title: "TBCARE (Tuberculosis Care Monitoring System)",
      href: "",
      dates: "2024",
      active: true,
      description:
        "Contributed to the development of TBCARE, a digital health monitoring solution designed to support interactive supervision between medical professionals and tuberculosis (TB) patients. The application focuses on improving medication adherence through features such as scheduled reminders, daily medication intake reporting, and remote monitoring by healthcare providers. TBCARE acts as a proactive system to reduce treatment failure caused by patient non-compliance while enabling more effective and continuous care coordination.",
      technologies: ["Laravel", "Filament", "PostgreSQL"],
      links: [],
      image: "/tbcare.png",
      images: [],
      video: "",
    },
    {
      title: "IURIS (Faculty Administrative Information System)",
      href: "",
      dates: "2024",
      active: true,
      description:
        "Contributed to the development of IURIS, an internal information system designed to support administrative and academic processes within the Faculty of Law, Universitas Airlangga. The platform digitizes and streamlines faculty-level services such as SKP submissions, deanery scheduling, document legalization requests, and other internal workflows specific to the Faculty of Law. By centralizing these services into a single system, IURIS improves operational efficiency, enhances transparency, and significantly reduces manual processing across departments.",
      technologies: ["Laravel", "Blade Templating", "Alpine.js", "PostgreSQL"],
      links: [],
      image: "/iuris.png",
      images: [],
      video: "",
    },

    {
      title: "Kampus Kita Mobile",
      href: "",
      dates: "2024",
      active: true,
      description:
        "Contributed to the development of Kampus Kita Mobile, a mobile application designed for Universitas Airlangga students to access and manage academic information throughout their study period. The application centralizes essential student data to support academic monitoring and daily campus activities, including class schedules, GPA (IPK) tracking, total credits (SKS) taken, and other academic-related information. By providing a single mobile platform, the app enhances accessibility and supports more efficient student self-management.",
      technologies: ["Flutter", "Dart"],
      links: [],
      image: "/kampus-kita.jpeg",
      images: [],
      video: "",
    },
    {
      title: "HRIS Backend API",
      href: "",
      dates: "2024",
      active: true,
      description:
        "Contributed to the development of a Human Resource Information System (HRIS) backend designed to support human resource management within the Ministry of Defense. The system centralizes and streamlines core HR processes to improve efficiency, transparency, and data consistency across organizational units. Key features include recruitment management, job promotion workflows, periodic performance reviews, and other personnel administration processes. The backend is built with a scalable and modular architecture, featuring secure authorization through Keycloak SSO to support complex HR workflows and controlled data access.",
      technologies: [
        "TypeScript",
        "Express.js",
        "GraphQL",
        "TypeORM",
        "Keycloak",
      ],
      links: [],
      images: ["/hris-backend.png", "/hris-backend-2.png"],
      video: "",
    },
    {
      title: "AI Service for HRIS Analytics",
      href: "",
      dates: "2024",
      active: true,
      description:
        "Developed an AI service powered by Large Language Models (LLMs) to support advanced analytics within an HRIS ecosystem. The system automates document understanding, personnel evaluation, and performance analysis using AI-driven insights. Key capabilities include LLM-based CV extraction, enabling structured analysis of candidate and personnel profiles by identifying strengths, competency gaps, and development areas. The service also supports personnel profiling for civil servants (ASN) by analyzing work outcomes over defined periods to uncover performance patterns, key achievements, and areas for improvement. Additionally, an OCR pipeline is integrated to extract structured text from scanned documents and images, enabling seamless downstream AI analysis.",
      technologies: ["Python", "FastAPI", "LLMs (Gemini Pro)", "PaddleOCR"],
      links: [],
      image: "/ai-service.png",
      images: [],
      video: "",
    },
  ],
  certifications: [
    {
      title: "Associate Data Scientist",
      dates: "June 2025 - June 2028",
      location: "Indonesia",
      description:
        "Completed the Associate Data Scientist program under the Digital Talent Scholarship (Vocational School Graduate Academy). The program covered practical data science skills such as data preprocessing, exploratory data analysis, basic machine learning, and applied Python for data-driven problem solving.",
      image: "/bnsp.jpeg",
      links: [],
    },
    {
      title: "Junior Web Programmer",
      dates: "August 2024 - August 2027",
      location: "Indonesia",
      description:
        "National professional certification issued by BNSP confirming competency in web development, including PHP programming, JavaScript, Laravel framework usage, and responsive UI development with Tailwind CSS.",
      image: "/bnsp.jpeg",
      links: [],
    },
    {
      title: "Ilmuwan Data Muda (Associate Data Scientist)",
      dates: "July 2025 - July 2028",
      location: "Indonesia",
      description:
        "Professional certification issued by Badan Nasional Sertifikasi Profesi (BNSP) validating foundational competencies in data science, including data analysis, data scraping, machine learning fundamentals, and Python-based data processing.",
      image: "/digital_talent.jpeg",
      links: [],
    },
  ],
} as const;
