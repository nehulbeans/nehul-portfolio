"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Film,
  Music2,
  Quote,
  Star,
} from "lucide-react";

function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-black/10 dark:bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
        <div className="h-2 w-1/2 rounded bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200 dark:bg-white/10" />;
}

function Artwork({ src, alt, icon: Icon }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-12 w-12 shrink-0 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/5 text-coral-500 dark:bg-white/10 dark:text-coral-300">
      <Icon size={18} strokeWidth={1.7} />
    </div>
  );
}

function SectionHeader({ icon: Icon, label, href, color }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3
        className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] ${color}`}
      >
        <Icon size={14} />
        {label}
      </h3>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        aria-label={`Open ${label}`}
        className="text-zinc-400 transition-colors hover:text-coral-500 dark:text-zinc-500 dark:hover:text-coral-400"
      >
        <ExternalLink size={13} />
      </a>
    </div>
  );
}

function Rating({ rating }) {
  if (!rating) return null;

  return (
    <span className="inline-flex shrink-0 items-center gap-1 px-2 py-1 font-mono text-[15px] font-semibold text-white shadow-sm">
      {rating}
    </span>
  );
}

const titleClass =
  "truncate text-sm font-medium text-zinc-900 transition-colors group-hover:text-coral-500 dark:text-zinc-100 dark:group-hover:text-coral-300";

const subClass = "truncate text-xs text-zinc-500 dark:text-zinc-500";

export default function ProfileCardBack({ onFlip }) {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      try {
        const [booksRes, moviesRes, musicRes] = await Promise.all([
          fetch("/api/reading"),
          fetch("/api/letterboxd"),
          fetch("/api/lastfm/recent"),
        ]);

        if (cancelled) return;

        if (booksRes.ok) {
          const data = await booksRes.json();
          setBooks(Array.isArray(data) ? data : []);
        }

        if (moviesRes.ok) {
          const data = await moviesRes.json();
          setMovies(Array.isArray(data) ? data : []);
        }

        if (musicRes.ok) {
          setLastPlayed(await musicRes.json());
        }
      } catch (error) {
        console.error("Could not load profile activity:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  const track = lastPlayed?.track;

  return (
    <article
      className="profile-card-side absolute inset-0 overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f1efe8] p-6 text-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.14)] transition-colors duration-300 dark:border-white/10 dark:bg-[#20201e] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <div className="profile-back-texture pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
              Off the clock<span className="text-coral-500">.</span>
            </h2>
          </div>
        </div>

        <div className="my-5 h-px bg-zinc-300/70 dark:bg-white/10" />

        <div className="custom-scrollbar flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="space-y-5">
              <SkeletonRow />
              <Divider />
              <SkeletonRow />
              <Divider />
              <SkeletonRow />
            </div>
          ) : (
            <div className="space-y-5">
              {/* 1. READING */}
              <section>
                <SectionHeader
                  icon={BookOpen}
                  label="reading"
                  href="fable.co/fabler/nehul-962688577407"
                  color="text-chartreuse-600 dark:text-chartreuse-300"
                />

                {books.length > 0 ? (
                  <div className="space-y-3">
                    {books.slice(0, 2).map((book, index) => (
                      <a
                        key={`${book.title}-${index}`}
                        href={book.link || "https://fable.co/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="group flex items-center gap-3"
                      >
                        <Artwork
                          src={book.cover}
                          alt={book.title}
                          icon={BookOpen}
                        />

                        <div className="min-w-0">
                          <p className={titleClass}>{book.title}</p>
                          <p className={subClass}>{book.author}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">
                    Reading activity is unavailable.
                  </p>
                )}
              </section>

              <Divider />

              {/* 2. RECENTLY WATCHED */}
              <section>
                <SectionHeader
                  icon={Film}
                  label="recently watched"
                  href="https://letterboxd.com/seasonsofnehul/"
                  color="text-coral-600 dark:text-coral-300"
                />

                {movies.length > 0 ? (
                  <div className="space-y-3">
                    {movies.slice(0, 2).map((movie, index) => (
                      <a
                        key={`${movie.title}-${movie.year}-${index}`}
                        href={movie.link || "https://letterboxd.com/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="group block rounded-xl border border-transparent p-2.5 transition-colors hover:border-coral-500/15 hover:bg-coral-500/[0.05] dark:hover:bg-coral-500/[0.06]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className={titleClass}>{movie.title}</p>

                            {movie.year && (
                              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                {movie.year}
                              </p>
                            )}
                          </div>

                          <Rating rating={movie.rating} />
                        </div>

                        {movie.review && (
                          <div className="mt-2 flex gap-1.5">
                            <Quote
                              size={13}
                              className="mt-0.5 shrink-0 text-coral-500/70"
                            />

                            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {movie.review}
                            </p>
                          </div>
                        )}

                        <span className="mt-2 block text-[10px] font-medium text-coral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          read on Letterboxd ↗
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">
                    Film activity is unavailable.
                  </p>
                )}
              </section>

              <Divider />

              {/* 3. LAST PLAYED */}
              <section>
                <SectionHeader
                  icon={Music2}
                  label="last played"
                  href="https://www.last.fm/user/nehuljainn"
                  color="text-green-600 dark:text-green-300"
                />

                {track ? (
                  <a
                    href={track.url || "https://www.last.fm/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="group flex items-center gap-3"
                  >
                    <Artwork
                      src={track.albumImage}
                      alt={track.album || track.name}
                      icon={Music2}
                    />

                    <div className="min-w-0">
                      <p className={titleClass}>{track.name}</p>
                      <p className={subClass}>{track.artist}</p>

                      <p className="mt-1 text-[10px] text-green-600/80 dark:text-green-300/70">
                        {track.nowPlaying ? "playing now" : "recently played"}
                      </p>
                    </div>
                  </a>
                ) : (
                  <p className="text-xs leading-relaxed text-zinc-500">
                    Nothing played recently.
                  </p>
                )}
              </section>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFlip();
          }}
          className="mt-5 flex items-center gap-2 border-t border-zinc-300/70 pt-4 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors hover:text-coral-500 dark:border-white/10"
        >
          <ArrowLeft size={14} />
          back to profile
        </button>
      </div>
    </article>
  );
}
