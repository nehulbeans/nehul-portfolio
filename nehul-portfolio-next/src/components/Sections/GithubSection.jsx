"use client";
import { useEffect, useRef, useState } from "react";
import { Github } from "lucide-react";

const USERNAME = "nehulbeans";

function calcStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else if (i === days.length - 1) continue; // today may not be counted yet
    else break;
  }
  return streak;
}

export default function GithubSection() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => (d.contributions?.length ? setData(d) : setError(true)))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (data && scrollRef.current)
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  const days = data?.contributions ?? [];
  const best = days.reduce((m, d) => Math.max(m, d.count), 0);
  const pad = days.length
    ? new Date(days[0].date + "T00:00:00Z").getUTCDay() // 0 = Sunday
    : 0;
  const cells = [...Array(pad).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);

  return (
    <section id="github" className="mb-16 px-4">
      <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-12">
        MY GITHUB
        <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
          CONTRIBUTIONS
          <span className="inline-block ml-2">🌱</span>
        </span>
      </h2>

      <div className="bg-gray-100 dark:bg-zinc-900/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-orange-500/10 transition-shadow duration-300">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold hover:text-orange-500 transition-colors"
          >
            <Github className="w-5 h-5" />@{USERNAME}
          </a>

          {data && (
            <div className="flex gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-semibold">
                {data.total} contributions
              </span>
              <span className="px-3 py-1 rounded-full bg-lime-400 text-zinc-900 font-semibold">
                {calcStreak(days)} day streak
              </span>
              <span className="hidden sm:inline px-3 py-1 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300">
                best day: {best}
              </span>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Couldn't load the graph right now.{" "}
            <a
              className="text-orange-500 underline"
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View it on GitHub
            </a>
          </p>
        )}

        {!data && !error && (
          <div className="h-[120px] rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse" />
        )}

        {data && (
          <>
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hidden pb-2">
              <div
                className="grid gap-[3px] min-w-[640px] w-full"
                style={{
                  gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                  gridTemplateRows: "repeat(7, auto)",
                  gridAutoFlow: "column",
                }}
                onMouseLeave={() => setHover(null)}
              >
                {cells.map((d, i) =>
                  d ? (
                    <div
                      key={d.date}
                      onMouseEnter={() => setHover(d)}
                      className="gh-cell aspect-square w-full rounded-[3px] hover:scale-125 hover:ring-1 hover:ring-orange-400 transition-transform"
                      style={{
                        backgroundColor: `var(--gh-${d.level})`,
                        animationDelay: `${Math.floor(i / 7) * 12}ms`,
                      }}
                    />
                  ) : (
                    <div key={`pad-${i}`} className="aspect-square w-full" />
                  ),
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-zinc-400 min-h-[20px]">
              <span>
                {hover
                  ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${new Date(hover.date).toDateString()}`
                  : "Hover a square for details"}
              </span>
              <div className="flex items-center gap-1">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <span
                    key={l}
                    className="w-[11px] h-[11px] rounded-[3px] inline-block"
                    style={{ backgroundColor: `var(--gh-${l})` }}
                  />
                ))}
                More
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
