export const experience = [
  {
    company: "Grafieks - SDE Intern",
    link: "https://www.grafieks.com/",
    logo: "/company-logo/grafieks-logo.png",
    points: [
      "Developing end-to-end features for Grafieks' BI platform in GoLang, including cloud runtime environments and calculated fields.",
      "Built and deployed Kubernetes-based infrastructure for container orchestration, including private registry setup with TLS authentication and multi-node cluster configuration.",
      "Leading full-stack development from design to deployment, managing cloud infrastructure, data processing pipelines, and DevOps automation.",
    ],
    period: "Feb 2025 - Present",
  },
  {
    company: "Upsurge Labs - ML & Backend Intern",
    link: "https://upsurge.io",
    logo: "/company-logo/upsurge-logo.png",
    points: [
      "Enhanced Cosmo's (cosmoflow.ai) web navigation and ML workflows using open-source models.",
      "Built REST APIs and database CRUD microservices for LemmeBuild's low-code platform to simplify life and coding.",
    ],
    period: "Aug 2024 - Nov 2024",
  },
];

export const projectIconNames = {
  image: "file-image",
  formula: "chart-no-axes-combined",
  library: "library-big",
  database: "database-zap",
  health: "heart-pulse",
  robotics: "bot",
  animation: "sparkles",
  multicloud: "cloud-cog",
};

export const projects = [
  {
    title: "MultiCloud PaaS Platform",
    description:
      "A Go-based platform for multi-cloud deployment and infrastructure management. It provides scalable workflows for deploying, operating, and managing applications across multiple cloud providers.",
    image: "/project-logo/multicloud-paas-platform.png",
    link: "https://github.com/nehulbeans/multicloud-paas-platform",
    icon: projectIconNames.multicloud,
    type: "Cloud / Go",
    accent: "orange",
    cta: "explore the platform",
  },
  {
    title: "Image Metadata Editor",
    description:
      "A Go-based CLI tool for bulk image metadata editing. It corrects EXIF timestamps, preserves sequential time shifts, and extracts dates from filenames automatically.",
    image: "project-logo/metadata-editor.png",
    link: "https://github.com/nehulbeans/metadata-editor",
    icon: projectIconNames.image,
    type: "CLI / Go",
    accent: "orange",
    cta: "inspect the metadata",
  },
  {
    title: "F1nalyze",
    description:
      "A predictive model for Formula 1 driver positions using regression, with extensive exploratory analysis and feature engineering. Ranked 23rd among 76 participants and outperformed 95 of 188 submissions in a Kaggle datathon.",
    image: "project-logo/f1.jpg",
    link: "https://github.com/nehulbeans/F1nalyze",
    icon: projectIconNames.formula,
    type: "ML / Python",
    accent: "lime",
    cta: "predict the podium",
  },
  {
    title: "Adv. Library Management System",
    description:
      "A library management platform with REST APIs, borrowing workflows, fine tracking, advanced analytics, PostgreSQL, Prisma, and secure authentication. Deployed on Render.",
    image: "project-logo/adv-lib.webp",
    link: "https://github.com/nehulbeans/adv-library-ms",
    icon: projectIconNames.library,
    type: "API / PostgreSQL",
    accent: "orange",
    cta: "open the library",
  },
  {
    title: "BabelFish.DB",
    description:
      "A natural-language interface for conversational database queries. It infers database schemas and automates query generation so people can explore complex data without writing SQL manually.",
    image: "project-logo/babelfish.jpg",
    link: "https://babelfish-db.vercel.app",
    icon: projectIconNames.database,
    type: "AI / Databases",
    accent: "lime",
    cta: "talk to the database",
  },
  {
    title: "MediMate",
    description:
      "An ML-powered healthcare assistant with disease prediction, medicine availability tracking, and a vernacular AI assistant. Built with Django, Scikit-learn, and WebRTC.",
    image: "project-logo/medimate.webp",
    link: "https://github.com/nehulbeans/medimate",
    icon: projectIconNames.health,
    type: "ML / Django",
    accent: "orange",
    cta: "meet MediMate",
  },
  {
    title: "Robotic Arm RL",
    description:
      "A reinforcement-learning experiment that teaches a two-segment robotic arm to stand and balance at 90 degrees inside a simulation environment.",
    image: "project-logo/rob.jpg",
    link: "https://github.com/nehulbeans/roboticArmRL",
    icon: projectIconNames.robotics,
    type: "RL / Simulation",
    accent: "lime",
    cta: "watch it balance",
  },
  {
    title: "Text-to-Animation",
    description:
      "An experiment that uses an LLM and the 3Blue1Brown Manim library to turn natural-language prompts into explainable mathematical animations.",
    image: "project-logo/tta.png",
    link: "https://github.com/nehulbeans/text-to-animation",
    icon: projectIconNames.animation,
    type: "LLM / Manim",
    accent: "orange",
    cta: "animate an idea",
  },
];

export const skills = [
  {
    name: "GoLang",
    icon: "🐹",
    description:
      "Concurrency so easy, even a gopher can do it! Fast, clean, and built for scale.",
    logo: "/skill-logo/gopher-logo.png",
  },
  {
    name: "Kubernetes & Docker",
    icon: "⎈",
    description:
      "Orchestrating containerized fleets, setting up TLS registries, and managing multi-node clusters.",
    logo: "/skill-logo/kubernetes-logo.svg",
  },
  {
    name: "Python",
    icon: "🐍",
    description:
      "Powering ML workflows, data pipelines, and intelligent backends.",
    logo: "/skill-logo/python-logo.png",
  },
  {
    name: "AWS & Cloud",
    icon: "☁️",
    description:
      "Architecting scalable cloud infrastructure, EC2, S3, and serverless deployments.",
    logo: "/skill-logo/aws-logo.png",
  },
  {
    name: "Machine Learning",
    icon: "🧠",
    description:
      "Scikit-learn, LangChain, TensorFlow & PyTorch. Turning raw data into predictive intelligence.",
    logo: "/skill-logo/tf-logo.png",
  },
  {
    name: "Django & FastAPI",
    icon: "dj",
    description:
      "Building robust, lightning-fast REST APIs and backend microservices.",
    logo: "/skill-logo/django-logo.png",
  },
  {
    name: "JavaScript/TypeScript",
    icon: "JS",
    description:
      "Full-stack agility from Express and Node.js to React and Next.js.",
    logo: "/skill-logo/js-logo.svg",
  },
  {
    name: "PostgreSQL & Prisma",
    icon: "🗄️",
    description:
      "Designing reliable database schemas, ORM integrations, and complex query optimizations.",
    logo: "/skill-logo/postgres-logo.png",
  },
];

export const skillTags = [
  "GoLang",
  "Cloud & DevOps",
  "Kubernetes",
  "Machine Learning",
  "Data Pipelines",
  "Backend Architecture",
];

export const research = [
  {
    title:
      "Hybrid Quantum-Classical Learning Architectures for 6G/7G Edge Intelligence",
    role: "Book Chapter Co-author",
    link: "https://link.springer.com/chapter/10.1007/978-981-95-1683-4_14",
    publisher: "Springer",
    date: "Jan 2026",
  },
  {
    title:
      "Quantum Convolutional Neural Networks for Intelligent Spectrum Management in 6G/7G",
    role: "Book Chapter Co-author",
    link: "https://link.springer.com/chapter/10.1007/978-981-95-1683-4_15",
    publisher: "Springer",
    date: "Jan 2026",
  },
];

export const awards = [
  {
    title: "First Prize Winner - Jugaad Hacks",
    description:
      "Led team to victory by building an AI-powered spoken language tool for immersive language learning and practicing.",
    date: "Feb 2024",
    certificate: "/certificate/jugaad_hacks.jpg",
  },
  {
    title: "Runner-Up - Data-Vizard Hackathon",
    description:
      "Awarded 2nd place among 40+ teams for data-driven insights and exceptional visualization techniques.",
    date: "Mar 2024",
    certificate: "/certificate/data_vizard.jpg",
  },
  {
    title: "Top 5%ile - Adobe GenSolve Hackathon",
    description:
      "Recognized for innovative problem-solving and successfully clearing Round 1.",
    date: "Aug 2024",
    certificate: "/certificate/adobe_gensolve_r1.jpg",
  },
];

export const instaPosts = [
  "https://www.instagram.com/p/C6mVrpRSTgI",
  "https://www.instagram.com/p/DWwGuPymG68",
  "https://www.instagram.com/p/C0rTTzOvLge",
  "https://www.instagram.com/p/C-QLVRsPABH",
  "https://www.instagram.com/p/Cygda02vhuw",
];

export const resumeUrl =
  "https://drive.google.com/file/d/1_-lzVJHe7EXlPs33HoqIykDYSb0U9MFx/preview";
