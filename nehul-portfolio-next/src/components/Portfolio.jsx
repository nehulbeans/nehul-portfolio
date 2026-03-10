"use client";

import { useEffect, useRef, useState } from "react";
import TopNavigation from "./Navigation/TopNavigation";
import BottomNavigation from "./Navigation/BottomNavigation";
import ProfileCard from "./ProfileCard/ProfileCard";
import HeroSection from "./Sections/HeroSection";
import CardsSection from "./Sections/CardsSection";
import ExperienceSection from "./Sections/ExperienceSection";
import ProjectsSection from "./Sections/ProjectsSection";
import SkillsSection from "./Sections/SkillsSection";
import ResearchSection from "./Sections/ResearchSection";
import AwardsSection from "./Sections/AwardsSection";
import ResumeSection from "./Sections/ResumeSection";
import PhotographySection from "./Sections/PhotographySection";
import ContactSection from "./Sections/ContactSection";
import Footer from "./UI/Footer";

export default function Portfolio() {
  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    research: useRef(null),
    awards: useRef(null),
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

  return (
    <div className="min-h-screen bg-white dark:bg-custom-bg text-gray-900 dark:text-white font-poppins transition-colors duration-300">
      {/* Navigation */}
      <TopNavigation
        sectionRefs={sectionRefs}
        scrollToSection={scrollToSection}
      />
      <BottomNavigation
        sectionRefs={sectionRefs}
        scrollToSection={scrollToSection}
        showBottomNav={showBottomNav}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-16 mx-auto">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <ProfileCard />
          </div>

          {/* Main Content Area */}
          <div className="lg:w-2/3 lg:pl-4">
            <HeroSection sectionRef={sectionRefs.home} />
            <CardsSection
              scrollToSection={scrollToSection}
              sectionRefs={sectionRefs}
            />
            <ExperienceSection sectionRef={sectionRefs.experience} />
            <ProjectsSection sectionRef={sectionRefs.projects} />
            <SkillsSection sectionRef={sectionRefs.skills} />
            <ResearchSection sectionRef={sectionRefs.research} />
            <AwardsSection sectionRef={sectionRefs.awards} />
            <ResumeSection sectionRef={sectionRefs.resume} />
            <PhotographySection sectionRef={sectionRefs.photography} />
            <ContactSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
