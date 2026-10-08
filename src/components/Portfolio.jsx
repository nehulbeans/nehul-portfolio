import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Home,
  Briefcase,
  Folder,
  Wrench,
  File,
  Mail,
  Layers,
  Box,
  ArrowRight,
  Download,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";

const Portfolio = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "light" || (savedTheme === null && !prefersDark)) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    resume: useRef(null),
    photography: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const navLinks = [
    {
      title: "Home",
      href: "#home",
      icon: <Home size={20} />,
      ref: sectionRefs.home,
    },
    {
      title: "Experience",
      href: "#experience",
      icon: <Briefcase size={20} />,
      ref: sectionRefs.experience,
    },
    {
      title: "Projects",
      href: "#projects",
      icon: <Folder size={20} />,
      ref: sectionRefs.projects,
    },
    {
      title: "Skills",
      href: "#skills",
      icon: <Wrench size={20} />,
      ref: sectionRefs.skills,
    },
    {
      title: "Resume",
      href: "#resume",
      icon: <File size={20} />,
      ref: sectionRefs.resume,
    },
  ];

  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const topNav = document.getElementById("top-nav");
      if (!topNav) return;

      const rect = topNav.getBoundingClientRect();
      setShowBottomNav(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skillTags = [
    "Machine Learning",
    "Data",
    "Cloud",
    "DevOps",
    "Backend",
    "Mobile",
  ];

  const experience = [
    {
      company: "Grafieks - SDE Intern",
      link: "https://www.grafieks.com/",
      logo: "/company-logo/grafieks-logo.png",
      points: [
        "developing end-to-end features for Grafieks' BI platform in GoLang, including calculated fields and pivot heatmaps",
        "leading full-stack development from frontend to deployment, optimizing data processing and performance.",
      ],
      period: "Feb 2025 - Present",
    },
    {
      company: "Upsurge Labs - Ml & Backend Development Intern",
      link: "https://upsurge.io",
      logo: "/company-logo/upsurge-logo.png",
      points: [
        "took cosmo (cosmoflow.ai) from an idea to internal beta, with autonomous web navigation and image element detection powered by open-source models.",
        "built seamless data pipelines and llm workflows that plugged right into cosmo's interface.",
        "crafted rest api integrations and database microservices for lemmebuild (lemmebuild.com), a low-code paas platform designed to simplify life (and coding)",
      ],
      period: "Aug 2024 - Nov 2024",
    },
  ];

  const projects = [
    {
      title: "Robotic Arm RL",
      description:
        "Making a two-segment robotic arm stand and balance at 90 degrees in simulation using Reinforcement Learning",
      image: "/project-logo/rob.jpg",
      link: "https://github.com/whonehuljain/roboticArm_RL",
    },
    {
      title: "Adv. Library Management System",
      description:
        "Built and deployed secure RESTful APIs with advanced analytics for book management, users, borrowing, and fines using PostgreSQL (Prisma) and Render.",
      image: "/project-logo/adv-lib.webp",
      link: "https://github.com/whonehuljain/adv-library-ms",
    },
    {
      title: "Babelfish.db",
      description: "Your universal translator for human-to-database chats",
      image: "/project-logo/babelfish.jpg",
      link: "https://babelfish-db.vercel.app/",
    },
    {
      title: "Fnalyze",
      description:
        "Predicting Formula 1 Driver Standings with Machine Learning",
      image: "/project-logo/f1.jpg",
      link: "https://github.com/whonehuljain/F1nalyze",
    },
    {
      title: "MediMate",
      description: "AI Health Assistant and Disease Prediction System",
      image: "/project-logo/medimate.webp",
      link: "https://github.com/whonehuljain/medimate",
    },
    {
      title: "Text-to-Animation",
      description:
        "Leveraged LLMs and 3brown1blue's python library, Manim to create captivating animations from mere prompts. Project is not public for now on github.",
      image: "/project-logo/tta.png",
      link: "https://github.com/whonehuljain/text-to-animation",
    },
  ];

  const skills = [
    {
      name: "GoLang",
      icon: "🐹",
      description:
        "Concurrency so easy, even a gopher can do it! Fast, clean, and built for scale.",
      logo: "/skill-logo/gopher-logo.png",
    },
    {
      name: "Kubernetes",
      icon: "⎈",
      description:
        "Why ship one app when you can orchestrate a fleet? Containers, meet your captain!",
      logo: "/skill-logo/kubernetes-logo.svg",
    },
    {
      name: "Python",
      icon: "🐍",
      description:
        "Every coder's best friend – easy to learn, harder to put down!",
      logo: "/skill-logo/python-logo.png",
    },
    {
      name: "TensorFlow",
      icon: "🧠",
      description:
        "Sometimes, it's not just about the code, it's about the data!",
      logo: "/skill-logo/tf-logo.png",
    },
    {
      name: "Django",
      icon: "dj",
      description: "Why's there a 'D' if it's just gonna be silent?",
      logo: "/skill-logo/django-logo.png",
    },
    {
      name: "AWS",
      icon: "☁️",
      description:
        "Badal bahut important hai! ☁️, but dude check those AWS bills!",
      logo: "/skill-logo/aws-logo.png",
    },
    {
      name: "Flutter",
      icon: "📱",
      description: "What? I heard you need an Android dev!?",
      logo: "/skill-logo/flutter-logo.png",
    },
    {
      name: "Java",
      icon: "☕",
      description:
        "The OG grandparent of programming languages, but still getting the job done! Old is turly gold!",
      logo: "/skill-logo/java-logo.png",
    },
    {
      name: "JavaScript",
      icon: "JS",
      description: "Coz, who needs sleep when you can have endless debugging!?",
      logo: "/skill-logo/js-logo.svg",
    },
    {
      name: "Figma",
      icon: "🎨",
      description: "Coz, Aesthetics Matter!!",
      logo: "/skill-logo/figma-logo.png",
    },
  ];

  const resumeUrl =
    "https://drive.google.com/file/d/1tMi40TVuKpwlUmtukdFu-iLoyj1r2-5o/preview";

  const instaPosts = [
    "https://www.instagram.com/p/C6mVrpRSTgI",
    "https://www.instagram.com/p/C0rTTzOvLge",
    "https://www.instagram.com/p/C-QLVRsPABH",
    "https://www.instagram.com/p/Cygda02vhuw",
  ];

  useEffect(() => {
    const loadInstagramEmbed = () => {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    const cleanup = loadInstagramEmbed();
    return cleanup;
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (isSubmitted) {
      timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-custom-bg text-gray-900 dark:text-white font-poppins transition-colors duration-300">
      {/* Navigation Bar */}
      <>
        {/* Original Top Navigation */}
        <nav id="top-nav" className="flex justify-center py-4">
          <div className="bg-gray-100 dark:bg-grey-bg rounded-xl mt-4 px-6 py-3.5 flex gap-6 items-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative nav-icon">
                <button
                  onClick={() => scrollToSection(link.ref)}
                  className="text-gray-700 dark:text-white hover:text-orange-500 transition-colors"
                  type="button"
                >
                  {link.icon}
                </button>
                <div className="nav-tooltip">{link.title}</div>
              </div>
            ))}

            {/* Subtle Separator */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Theme Toggle Icon */}
            <div className="relative nav-icon">
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-white hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    size={20}
                    className={`absolute inset-0 transition-all duration-500 ${
                      darkMode
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-180 scale-0"
                    }`}
                  />
                  <Moon
                    size={20}
                    className={`absolute inset-0 transition-all duration-500 ${
                      darkMode
                        ? "opacity-0 rotate-180 scale-0"
                        : "opacity-100 rotate-0 scale-100"

                    }`}
                  />
                </div>
              </button>
              <div className="nav-tooltip">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
            showBottomNav
              ? "opacity-90 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none"
          }`}
        >
          <div className="bg-gray-100 dark:bg-grey-bg rounded-xl px-6 py-3.5 flex gap-6 shadow-lg shadow-black/50 items-center">
            {navLinks.map((link) => (
              <div key={`bottom-${link.href}`} className="relative nav-icon">
                <button
                  onClick={() => scrollToSection(link.ref)}
                  className="text-gray-700 dark:text-white hover:text-orange-500 transition-colors"
                  type="button"
                >
                  {link.icon}
                </button>
                <div className="nav-tooltip">{link.title}</div>
              </div>
            ))}

            {/* Subtle Separator */}
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600"></div>

            {/* Theme Toggle Icon */}
            <div className="relative nav-icon">
              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-white hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    size={20}
                    className={`absolute inset-0 transition-all duration-500 ${
                      darkMode
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-180 scale-0"
                    }`}
                  />
                  <Moon
                    size={20}
                    className={`absolute inset-0 transition-all duration-500 ${
                      darkMode
                        ? "opacity-0 rotate-180 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                </div>
              </button>
              <div className="nav-tooltip">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-16 mx-auto">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div
                className="relative w-full cursor-pointer group"
                onClick={handleFlip}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Shadow Element */}
                <div
                  className="absolute -inset-4 rounded-2xl opacity-75 blur-xl animate-pulse"
                  style={{
                    background: darkMode
                      ? "linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))"
                      : "linear-gradient(45deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05))",
                    transform: "translateZ(-10px)",
                    transition: "all 500ms ease-in-out",
                  }}
                />

                <div
                  className="w-full transition-transform duration-500 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                  }}
                >
                  {/* Front of the card */}
                  <div
                    className="w-full bg-white dark:bg-white rounded-2xl px-4 p-12 shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0px)",
                    }}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="relative mb-3">
                        <img
                          src="/profile.JPG"
                          alt="Profile"
                          className="w-64 h-72 rounded-2xl object-cover"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                      <h1 className="text-2xl font-bold text-black mb-0">
                        Nehul Jain
                      </h1>
                      <p className="text-zinc-600 font-medium mb-5">
                        i do stuff! still figuring out my life!
                      </p>
                      <div className="flex space-x-8">
                        <a
                          href="https://www.linkedin.com/in/whonehuljain/"
                          className="text-orange-500 hover:text-zinc-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          <Linkedin size={20} />
                        </a>
                        <a
                          href="https://github.com/whonehuljain"
                          className="text-orange-500 hover:text-zinc-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href="https://x.com/whonehuljain"
                          className="text-orange-500 hover:text-zinc-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          <Twitter size={20} />
                        </a>
                        <a
                          href="https://www.instagram.com/nehulscapes"
                          className="text-orange-500 hover:text-zinc-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          <Instagram size={20} />
                        </a>
                        <a
                          href="mailto:work.nehul@gmail.com"
                          className="text-orange-500 hover:text-zinc-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleLinkClick}
                        >
                          <Mail size={20} />
                        </a>
                      </div>
                      <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
                        {skillTags.map((skill) => (
                          <span
                            key={skill}
                            className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back of the card */}
                  <div
                    className="absolute top-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-purple-900 rounded-2xl px-4 py-6 shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(0px)",
                    }}
                  >
                    <div className="flex flex-col h-full text-white">
                      <h2 className="text-2xl font-bold mb-2 text-center">
                        Behind the Code
                      </h2>

                      {/* Current Status */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Currently...
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-200 dark:text-indigo-200">
                              Reading:
                            </span>
                            <span className="text-white">The Sentinel</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-200 dark:text-indigo-200">
                              Learning:
                            </span>
                            <span className="text-white">
                              Embedded C for Robotics
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="text-blue-200 dark:text-indigo-200">
                              Building:
                            </span>
                            <span className="text-white">
                              Something Cool 🤫
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quote of the Day */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <span className="text-3xl text-blue-300 dark:text-indigo-300">
                            ❝
                          </span>
                          <div>
                            <p className="text-sm italic text-blue-100 dark:text-indigo-100">
                              Can't complain about how much is on my plate when
                              the goal was to eat!
                            </p>
                            <p className="text-xs text-blue-300 dark:text-indigo-300 mt-1">
                              ~ Unknown (probably me)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Music Section */}
                      <div className="mt-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl pt-3 px-0">
                          <div className="flex items-center gap-2 mb-2 pl-3">
                            <span>🎵</span>
                            <h3 className="text-sm font-medium">
                              Music gets me going...
                            </h3>
                          </div>
                          <iframe
                            src="https://open.spotify.com/embed/playlist/4sJkkhN7A94nrnlyBiNPzu"
                            width="100%"
                            height="80"
                            frameBorder="0"
                            allow="encrypted-media"
                            className="rounded-lg"
                            title="whispered confessions playlist"
                          ></iframe>
                        </div>
                      </div>

                      {/* Flip Back Indicator */}
                      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-blue-200 dark:text-indigo-200">
                        <ArrowRight size={14} className="rotate-180" />
                        <span>Flip back to professional mode :p</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-2/3 lg:pl-4">
            {/* Hero Section */}
            <section ref={sectionRefs.home} id="home" className="mb-16">
              <h1 className="text-5xl text-center lg:text-[7.5rem] lg:text-left font-extrabold mb-6">
                Hi! I'm Nehul
                <span className="text-3xl text-center text-gray-500 dark:text-zinc-500 block lg:leading-[4.5rem] lg:text-[4.6rem] lg:text-left mt-2">
                  Curiosity is My Jam!
                </span>
              </h1>
              <p className="text-gray-600 dark:text-zinc-400 text-base lg:md:text-xl max-w-3xl text-center lg:text-left px-4 lg:p-0">
                I make machines think, drink too much coffee, and pretend i have
                my life together. curiosity is my fuel, and i turn "what ifs"
                into "nailed it!" (most of the time). powered by bad jokes, big
                ideas, and way too much caffeine.
              </p>
            </section>

            {/* Cards Section */}
            <section className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Professional Plot Twists Card */}
                <button type="button" style={{ all: "unset" }}>
                  <div
                    onClick={() => scrollToSection(sectionRefs.experience)}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-transparent rounded-3xl opacity-50">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "url(\"data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 100 100 C 150 50, 250 50, 300 100 C 350 150, 350 250, 300 300 C 250 350, 150 350, 100 300 C 50 250, 50 150, 100 100' fill='none' stroke='%23ff5722' stroke-width='2' opacity='0.2'/%3E%3C/svg%3E\")",
                          backgroundSize: "cover",
                        }}
                      />
                    </div>
                    <div className="relative bg-orange-500 rounded-3xl p-8 transition-transform duration-300 group-hover:-translate-y-1">
                      <Layers className="w-12 h-12 mb-4 text-white" />
                      <h3 className="text-2xl font-bold text-white mb-4">
                        PROFESSIONAL
                        <br />
                        PLOT TWISTS
                      </h3>
                      <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-white" />
                    </div>
                  </div>
                </button>

                {/* Featured Projects Card */}
                <button type="button" style={{ all: "unset" }}>
                  <div
                    onClick={() => scrollToSection(sectionRefs.projects)}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400/30 to-transparent rounded-3xl opacity-50">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "url(\"data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 50 200 L 150 100 L 250 200 L 350 100' fill='none' stroke='%2384cc16' stroke-width='2' opacity='0.2'/%3E%3C/svg%3E\")",
                          backgroundSize: "cover",
                        }}
                      />
                    </div>
                    <div className="relative bg-lime-400 rounded-3xl p-8 transition-transform duration-300 group-hover:-translate-y-1">
                      <Box className="w-12 h-12 mb-4 text-zinc-900" />
                      <h3 className="text-2xl font-bold text-zinc-900">
                        FEATURED PROJECTS
                        <br />
                        (the hall of fame :p)
                      </h3>
                      <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-zinc-900" />
                    </div>
                  </div>
                </button>
              </div>
            </section>

            {/* Experience Section */}
            <section
              ref={sectionRefs.experience}
              id="experience"
              className="mb-20"
            >
              <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-6">
                PROFESSIONAL
                <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                  PLOT TWISTS
                </span>
              </h2>

              <div className="grid gap-4">
                {experience.map((exp) => (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={exp.company}
                  >
                    <div className="bg-gray-50 dark:bg-custom-bg rounded-2xl p-6 border-none dark:border-none hover:bg-gray-100 dark:hover:bg-grey-bg transition-all duration-200 group relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-[20%] overflow-hidden flex items-center justify-center">
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain"
                                draggable="false"
                                onContextMenu={(e) => e.preventDefault()}
                              />
                            </div>
                            <h3 className="text-2xl font-semibold">
                              {exp.company}
                            </h3>
                          </div>
                          <div className="text-gray-600 dark:text-zinc-400 space-y-2">
                            {exp.points.map((point, index) => (
                              <p key={index} className="flex items-start">
                                <span className="mr-2">-</span>
                                <span>{point}</span>
                              </p>
                            ))}
                          </div>
                          {exp.period && (
                            <p className="text-gray-500 dark:text-zinc-500 mt-4 text-sm">
                              {exp.period}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-500 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="rotate-45"
                          >
                            <path
                              d="M2.66669 13.3333L13.3334 2.66666M13.3334 2.66666H5.33335M13.3334 2.66666V10.6667"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section ref={sectionRefs.projects} id="projects" className="mb-16">
              <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-6">
                FEATURED
                <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                  PROJECTS
                </span>
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={project.title}
                  >
                    <div className="bg-gray-50 dark:bg-custom-bg rounded-2xl p-6 border-none dark:border-none hover:bg-gray-100 dark:hover:bg-grey-bg transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-16 rounded-[20%]"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-zinc-400">
                            {project.description}
                          </p>
                        </div>
                        <span className="text-gray-500 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="rotate-45"
                          >
                            <path
                              d="M2.66669 13.3333L13.3334 2.66666M13.3334 2.66666H5.33335M13.3334 2.66666V10.6667"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section
              ref={sectionRefs.skills}
              id="skills"
              className="mb-16 px-4"
            >
              <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-12">
                MY SKILLS &
                <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                  TOOLKIT
                  <span className="inline-block ml-2"> 🛠️</span>
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-4 bg-gray-100 dark:bg-zinc-900/50 rounded-xl p-4 hover:bg-gray-200 dark:hover:bg-zinc-800/50 transition-all duration-300 group"
                  >
                    {/* Logo Section */}
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-full h-full object-contain"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-xl mb-1 group-hover:text-orange-500 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resume Section */}
            <section
              ref={sectionRefs.resume}
              id="resume"
              className="min-h-fit flex flex-col px-4 py-8 mb-16 lg:py-16 max-w-6xl mx-auto"
            >
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold">
                  RESUME
                </h2>
                <p className="text-gray-500 dark:text-zinc-500 text-xl font-medium mt-2 text-center lg:text-left">
                  A movie (starring me :P)
                </p>
              </div>

              <div className="flex-grow flex flex-col items-center lg:items-start">
                {/* Download Button */}
                <div className="mb-4 text-center lg:text-left">
                  <a
                    href={"/Nehul_Jain_Resume.pdf"}
                    download="Nehul_Jain_Resume.pdf"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>

                {/* PDF Viewer Container */}
                <div className="w-full max-w-4xl h-[49vh] lg:h-[60vh] bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-300 dark:border-zinc-800">
                  <iframe
                    src={resumeUrl}
                    title="Nehul's resume"
                    className="w-full h-full"
                    style={{
                      border: "none",
                    }}
                  >
                    <p className="text-red-500">
                      Sorry, could not load the resume. Please download the PDF!
                      <a href={resumeUrl} className="text-orange-500 ml-2">
                        Download PDF
                      </a>
                    </p>
                  </iframe>
                </div>
              </div>
            </section>

            {/* Photography Section */}
            <section
              ref={sectionRefs.photography}
              id="photography"
              className="mb-16"
            >
              <h2 className="text-[2.8rem] leading-none lg:text-8xl font-bold mb-6">
                PICTURE THIS...
                <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                  Literally!
                </span>
              </h2>
              <p className="text-gray-500 dark:text-zinc-500 font-medium block text-xl mb-10">
                I don't just code... :P
              </p>

              <div className="overflow-x-auto scrollbar-hidden group">
                <div className="flex animate-infinite-scroll group-hover:pause gap-4 w-max">
                  {/* First set of images */}
                  {instaPosts.map((post, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-none w-80 h-96 bg-gray-200 dark:bg-zinc-800 rounded-lg border border-gray-300 dark:border-zinc-700 overflow-hidden"
                    >
                      <div className="w-full h-full flex justify-center">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-captioned
                          data-instgrm-permalink={`${post}/?utm_source=ig_embed&utm_campaign=loading`}
                          data-instgrm-version="14"
                          style={{
                            background: "#FFF",
                            border: "0",
                            borderRadius: "12px",
                            margin: "0",
                            padding: "0",
                            maxWidth: "540px",
                            minWidth: "326px",
                            width: "calc(100% - 2px)",
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {instaPosts.map((post, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-none w-80 h-96 bg-gray-200 dark:bg-zinc-800 rounded-lg border border-gray-300 dark:border-zinc-700 overflow-hidden"
                    >
                      <div className="w-full h-full flex justify-center">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-captioned
                          data-instgrm-permalink={`${post}/?utm_source=ig_embed&utm_campaign=loading`}
                          data-instgrm-version="14"
                          style={{
                            background: "#FFF",
                            border: "0",
                            borderRadius: "12px",
                            margin: "0",
                            padding: "0",
                            maxWidth: "540px",
                            minWidth: "326px",
                            width: "calc(100% - 2px)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16 w-full">
              <div className="bg-gray-50 dark:bg-custom-bg rounded-3xl px-0 pt-10 lg:px-0">
                {!isSubmitted ? (
                  <div className="w-full">
                    <h2 className="text-5xl lg:text-8xl font-bold mb-4">
                      LET'S WORK
                      <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                        TOGETHER
                      </span>
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-500 font-medium text-xl mb-6">
                      Let's catch up for a coffee? ☕️ (virtually probably?)
                    </p>
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500 dark:text-zinc-500">
                            Name
                          </label>
                          <input
                            type="text"
                            name="user_name"
                            required
                            placeholder="Your Name"
                            className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-zinc-500">
                            Email
                          </label>
                          <input
                            type="email"
                            name="user_email"
                            required
                            placeholder="Your Email"
                            className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 dark:text-zinc-500">
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          placeholder="Your Message"
                          rows={4}
                          className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-400">
                        I've received your message and will get back to you
                        soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-zinc-800 py-6 text-center text-gray-500 dark:text-zinc-500">
        Made with ❤️ by Nehul
      </footer>
    </div>
  );
};

export default Portfolio;
