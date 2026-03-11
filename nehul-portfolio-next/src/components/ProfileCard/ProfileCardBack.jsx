"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Film,
  BookOpen,
  Music,
  Quote,
  ExternalLink,
} from "lucide-react";

export default function ProfileCardBack() {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [bookRes, movieRes] = await Promise.all([
          fetch("/api/reading"),
          fetch("/api/letterboxd"),
        ]);

        if (bookRes.ok) {
          const bookData = await bookRes.json();
          setBooks(bookData);
        }

        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setMovies(movieData);
        }
      } catch (err) {
        console.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div
      className="absolute top-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-purple-900 rounded-2xl px-4 py-6 shadow-2xl flex flex-col"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg) translateZ(0px)",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-white tracking-wide">
        Behind the Code
      </h2>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
        {/* Letterboxd Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-blue-200 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-2">
              <Film size={14} className="text-orange-400" />
              Recently Watched
            </h3>
            <a
              href="https://letterboxd.com/seasonsofnehul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
            >
              @seasonsofnehul <ExternalLink size={10} />
            </a>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                <div className="h-4 w-1/2 bg-white/20 rounded"></div>
              </div>
            ) : (
              movies.map((movie, idx) => (
                <div
                  key={idx}
                  className="border-b border-white/5 last:border-0 pb-2 last:pb-0"
                >
                  <a
                    href={movie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <p className="text-sm text-white font-medium group-hover:text-orange-300 transition-colors">
                      {movie.title}{" "}
                      <span className="text-white/50 text-xs font-normal">
                        ({movie.year})
                      </span>
                      <span className="text-orange-400 text-xs ml-2">
                        {movie.rating}
                      </span>
                    </p>
                    {movie.review && (
                      <p className="text-xs text-blue-100/80 italic mt-1 line-clamp-2 leading-snug">
                        "{movie.review}"
                      </p>
                    )}
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fable / Reading Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-blue-200 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={14} className="text-green-400" />
              Currently Reading
            </h3>
            <a
              href="https://fable.co/fabler/nehul-962688577407"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
            >
              Fable Profile <ExternalLink size={10} />
            </a>
          </div>

          <div className="space-y-2.5">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-full bg-white/20 rounded"></div>
                <div className="h-4 w-2/3 bg-white/20 rounded"></div>
              </div>
            ) : (
              books.map((book, idx) => (
                <a
                  key={idx}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 group"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-8 h-12 object-cover rounded shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium leading-tight truncate group-hover:text-green-300 transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-white/60 truncate mt-0.5">
                      {book.author}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Music Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Music size={14} className="text-blue-300" />
            <h3 className="text-xs font-medium text-blue-200 dark:text-indigo-200">
              On heavy rotation...
            </h3>
          </div>
          <iframe
            src="https://open.spotify.com/embed/playlist/4sJkkhN7A94nrnlyBiNPzu?theme=0"
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
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-blue-200 dark:text-indigo-200 shrink-0">
        <ArrowRight size={14} className="rotate-180" />
        <span>Flip back to professional mode</span>
      </div>
    </div>
  );
}
