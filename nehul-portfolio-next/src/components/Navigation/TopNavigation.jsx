"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Home,
  Moon,
  Package,
  Sun,
  Wrench,
} from "lucide-react";

const navLinks = [
  { title: "Home", refName: "home", icon: Home },
  { title: "Experience", refName: "experience", icon: BriefcaseBusiness },
  { title: "Projects", refName: "projects", icon: FolderKanban },
  { title: "Skills", refName: "skills", icon: Wrench },
  { title: "Research", refName: "research", icon: BookOpen },
  { title: "Awards", refName: "awards", icon: Award },
  { title: "Resume", refName: "resume", icon: FileText },
];

const pageLinks = [
  { title: "Things", pageName: "things", href: "/things", icon: Package },
];

const baseBtn =
  "nav-link group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition-colors duration-200 hover:bg-zinc-100 hover:text-coral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-coral-400";
const activeBtn = "bg-coral-500/10 text-coral-600 dark:bg-coral-500/10 dark:text-coral-400";

function NavInner({ Icon, title, active }) {
  return (
    <>
      <Icon size={17} strokeWidth={1.8} />
      <span className="nav-tooltip nav-tooltip-top">{title}</span>
      {active && (
        <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-coral-500" />
      )}
    </>
  );
}

export default function TopNavigation({
  sectionRefs = {},
  scrollToSection = () => {},
  darkMode,
  setDarkMode,
  currentPage = null, // e.g. "things" when rendered on a sub-page
}) {
  const [activeSection, setActiveSection] = useState("home");
  const isSubPage = Boolean(currentPage);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSubPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs, isSubPage]);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <nav
        id="top-nav"
        aria-label="Main navigation"
        className="nav-shell mx-auto flex w-fit max-w-full items-center gap-1 rounded-2xl border border-zinc-200/80 bg-white/85 p-1.5 shadow-lg shadow-black/[0.04] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:shadow-black/20"
      >
        <div className="scrollbar-hidden flex max-w-[calc(100vw-88px)] items-center gap-0.5 overflow-x-auto">
          {navLinks.map(({ title, refName, icon }) => {
            const active = !isSubPage && activeSection === refName;

            if (isSubPage) {
              return (
                <Link
                  key={refName}
                  href={refName === "home" ? "/" : `/#${refName}`}
                  aria-label={title}
                  className={baseBtn}
                >
                  <NavInner Icon={icon} title={title} active={false} />
                </Link>
              );
            }

            return (
              <button
                key={refName}
                type="button"
                onClick={() => scrollToSection(sectionRefs[refName])}
                aria-label={title}
                aria-current={active ? "location" : undefined}
                className={`${baseBtn} ${active ? activeBtn : ""}`}
              >
                <NavInner Icon={icon} title={title} active={active} />
              </button>
            );
          })}

          {pageLinks.map(({ title, pageName, href, icon }) => {
            const active = currentPage === pageName;
            return (
              <Link
                key={pageName}
                href={href}
                aria-label={title}
                aria-current={active ? "page" : undefined}
                className={`${baseBtn} ${active ? activeBtn : ""}`}
              >
                <NavInner Icon={icon} title={title} active={active} />
              </Link>
            );
          })}
        </div>

        <span className="mx-1 h-6 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
          title={`Switch to ${darkMode ? "light" : "dark"} theme`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition-colors duration-200 hover:bg-zinc-100 hover:text-coral-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-coral-400"
        >
          {darkMode ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
        </button>
      </nav>
    </header>
  );
}
