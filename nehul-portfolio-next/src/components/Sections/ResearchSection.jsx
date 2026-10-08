import {
  ArrowUpRight,
  BookOpenCheck,
  ExternalLink,
  Orbit,
} from "lucide-react";
import { research } from "../data/portfolioData";

export default function ResearchSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="research" className="mb-20">
      <div className="mb-9 flex items-end justify-between gap-4">
        <h2 className="text-center text-5xl font-bold lg:text-left lg:text-8xl">
          RESEARCH
          <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
            PUBLICATIONS
          </span>
        </h2>

        <span className="hidden pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 sm:block">
          quantum · edge · intelligence
        </span>
      </div>

      <div className="grid gap-4">
        {research.map((item, index) => {
          const isClickable = Boolean(item.link);

          const content = (
            <article className="research-tile group relative overflow-hidden rounded-3xl bg-gray-50 p-5 transition-colors duration-200 hover:bg-coral-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 sm:p-6">
              <span className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-coral-500/[0.04]" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral-500/10 text-coral-500 transition-colors duration-200 group-hover:bg-coral-500 group-hover:text-white">
                  {index % 2 === 0 ? (
                    <Orbit size={21} strokeWidth={1.7} />
                  ) : (
                    <BookOpenCheck size={21} strokeWidth={1.7} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="max-w-2xl text-lg font-semibold leading-snug text-zinc-900 transition-colors duration-200 group-hover:text-coral-500 dark:text-white sm:text-xl">
                      {item.title}
                    </h3>

                    {isClickable && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors duration-200 group-hover:bg-coral-500 group-hover:text-white">
                        <ArrowUpRight size={16} strokeWidth={1.8} />
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-chartreuse-400 px-2.5 py-1 font-medium text-zinc-900">
                      {item.role}
                    </span>

                    <span className="text-zinc-400">at</span>

                    <span className="font-medium text-zinc-600 dark:text-zinc-300">
                      {item.publisher}
                    </span>

                    <span className="text-zinc-300 dark:text-zinc-700">•</span>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      {item.date}
                    </span>
                  </div>

                  {isClickable && (
                    <p className="mt-4 text-xs font-medium text-coral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      read publication <ExternalLink className="ml-1 inline" size={12} />
                    </p>
                  )}
                </div>
              </div>
            </article>
          );

          if (!isClickable) {
            return (
              <div key={`${item.title}-${index}`} className="cursor-default">
                {content}
              </div>
            );
          }

          return (
            <a
              key={`${item.title}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
