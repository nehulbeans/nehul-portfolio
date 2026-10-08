import { ArrowUpRight, BriefcaseBusiness, CircleDot } from "lucide-react";
import { experience } from "../data/portfolioData";

export default function ExperienceSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="experience" className="mb-20">
      <h2 className="mb-10 text-center text-5xl font-bold lg:text-left lg:text-8xl">
        PROFESSIONAL
        <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
          PLOT TWISTS
        </span>
      </h2>

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute bottom-4 left-[18px] top-4 w-px bg-zinc-200 dark:bg-zinc-800 sm:left-[22px]" />

        <div className="space-y-5">
          {experience.map((item, index) => {
            const isCurrent = item.period?.toLowerCase().includes("present");

            return (
              <a
                key={item.company}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="experience-entry group relative block pl-12 sm:pl-16"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 transition-colors duration-200 group-hover:border-coral-300 group-hover:text-coral-500 dark:border-zinc-800 dark:bg-custom-bg dark:text-zinc-500 sm:h-11 sm:w-11">
                  {isCurrent ? (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chartreuse-400 opacity-40 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-chartreuse-400" />
                    </span>
                  ) : (
                    <CircleDot size={17} strokeWidth={1.7} />
                  )}
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-gray-50 p-5 transition-colors duration-200 group-hover:bg-coral-50 dark:bg-zinc-900/60 dark:group-hover:bg-zinc-900 sm:p-6">
                  {/* Very subtle corner accent */}
                  <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-coral-500/[0.045] transition-transform duration-300 group-hover:scale-125" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/[0.04] dark:bg-zinc-800 dark:ring-white/[0.05]">
                        <img
                          src={item.logo}
                          alt={`${item.company} logo`}
                          className="h-full w-full object-contain"
                          draggable="false"
                          onContextMenu={(event) => event.preventDefault()}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-lg font-semibold leading-tight text-zinc-900 transition-colors duration-200 group-hover:text-coral-500 dark:text-white sm:text-xl">
                            {item.company}
                          </h3>

                          {isCurrent && (
                            <span className="rounded-full bg-chartreuse-400 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-zinc-900">
                              now
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 group-hover:bg-coral-500 group-hover:text-white">
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </span>
                  </div>

                  <div className="relative mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <ul className="space-y-3">
                      {item.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                        >
                          <span
                            className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full ${
                              isCurrent ? "bg-chartreuse-400" : "bg-coral-500"
                            }`}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
