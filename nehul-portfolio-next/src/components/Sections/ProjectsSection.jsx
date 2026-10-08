import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  CloudCog,
  DatabaseZap,
  FileImage,
  HeartPulse,
  LibraryBig,
  Sparkles,
} from "lucide-react";
import { projects } from "../data/portfolioData";

const iconMap = {
  "file-image": FileImage,
  "chart-no-axes-combined": ChartNoAxesCombined,
  "library-big": LibraryBig,
  "database-zap": DatabaseZap,
  "heart-pulse": HeartPulse,
  bot: Bot,
  sparkles: Sparkles,
  "cloud-cog": CloudCog,
};

const accentClasses = {
  coral: {
    icon: "bg-coral-500/10 text-coral-500 group-hover:bg-coral-500 group-hover:text-white",
    line: "bg-coral-500",
    cta: "text-coral-500",
  },
  chartreuse: {
    icon: "bg-chartreuse-400/15 text-chartreuse-600 group-hover:bg-chartreuse-400 group-hover:text-zinc-900",
    line: "bg-chartreuse-500",
    cta: "text-chartreuse-600 dark:text-chartreuse-400",
  },
};

function ProjectIcon({ project }) {
  const Icon = iconMap[project.icon] || Sparkles;
  const accent = accentClasses[project.accent] || accentClasses.coral;

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-200 ${accent.icon}`}
    >
      <Icon size={21} strokeWidth={1.7} />
    </div>
  );
}

export default function ProjectsSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="projects" className="mb-20">
      <h2 className="mb-10 text-center text-5xl font-bold lg:text-left lg:text-8xl">
        FEATURED
        <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
          PROJECTS
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => {
          const accent =
            accentClasses[project.accent] || accentClasses.coral;

          return (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tile group relative flex min-h-[270px] flex-col overflow-hidden rounded-3xl bg-gray-50 p-6 transition-colors duration-200 hover:bg-coral-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-4">
                <ProjectIcon project={project} />

                <span className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 group-hover:bg-coral-500 group-hover:text-white">
                  <ArrowUpRight size={17} strokeWidth={1.8} />
                </span>
              </div>

              <div className="mt-auto pt-10">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`h-px w-5 ${accent.line}`} />

                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-zinc-400">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold leading-tight text-zinc-900 transition-colors duration-200 group-hover:text-coral-500 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <p
                  className={`mt-5 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${accent.cta}`}
                >
                  {project.cta || "open the project"}{" "}
                  <span aria-hidden="true">↗</span>
                </p>
              </div>

              <span className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-coral-500/[0.04]" />
            </a>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/nehulbeans"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-coral-500 dark:text-zinc-400"
        >
          &amp; more stuff on GitHub
          <ArrowUpRight size={15} strokeWidth={1.8} />
        </a>
      </div>
    </section>
  );
}
