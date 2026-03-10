import { research } from "../data/portfolioData";

export default function ResearchSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="research" className="mb-16">
      <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-6">
        RESEARCH &
        <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
          PUBLICATIONS 📚
        </span>
      </h2>
      <div className="grid gap-4">
        {research.map((item, index) => {
          const isClickable = !!item.link;
          return (
            <a
              key={index}
              href={item.link || "#"}
              target={isClickable ? "_blank" : "_self"}
              rel={isClickable ? "noopener noreferrer" : ""}
              className={
                isClickable
                  ? "cursor-pointer"
                  : "cursor-default pointer-events-none"
              }
            >
              <div
                className={`bg-gray-50 dark:bg-custom-bg rounded-2xl p-6 border-none dark:border-none transition-colors group ${isClickable ? "hover:bg-gray-100 dark:hover:bg-grey-bg" : ""}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    {isClickable && (
                      <span className="text-gray-500 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
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
                    )}
                  </div>
                  <p className="text-orange-500 font-medium">{item.role}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-zinc-400 mt-2 pt-2 border-t border-gray-200 dark:border-zinc-800">
                    <span>{item.publisher}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
