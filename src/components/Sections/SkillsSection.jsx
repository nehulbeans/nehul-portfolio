import { skills } from "../data/portfolioData";

export default function SkillsSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="skills" className="mb-20">
      <div className="mb-9 flex items-end justify-between gap-4">
        <h2 className="text-center text-5xl font-bold lg:text-left lg:text-8xl">
          MY SKILLS &
          <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
            TOOLKIT
            <span className="ml-2 inline-block">🛠️</span>
          </span>
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const ischartreuse = index === 1 || index === 4 || index === 7;

          return (
            <article
              key={skill.name}
              className="skill-tile group relative min-h-[142px] overflow-hidden rounded-3xl bg-gray-50 p-4 transition-colors duration-200 hover:bg-coral-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 sm:min-h-[170px] sm:p-5"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-black/[0.04] transition-colors duration-200 group-hover:ring-coral-500/30 dark:bg-zinc-800 dark:ring-white/[0.05]">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="h-full w-full object-contain"
                  draggable="false"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </div>

              <div className="relative mt-5">
                <h3 className="text-base font-semibold leading-tight transition-colors duration-200 group-hover:text-coral-500 sm:text-lg">
                  {skill.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {skill.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">

        <span>Learning in public, building in production.</span>
      </div>
    </section>
  );
}
