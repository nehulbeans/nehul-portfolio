"use client";

import { useEffect } from "react";
import { ArrowUpRight, Camera, Instagram } from "lucide-react";
import { instaPosts } from "../data/portfolioData";

function getPostUrl(post) {
  return typeof post === "string" ? post : post.url;
}

function getPostId(url) {
  return url.match(/instagram\.com\/(p|reel|tv)\/([^/?]+)/)?.[2] || url;
}

export default function PhotographySection({ sectionRef }) {
  useEffect(() => {
    const scriptId = "instagram-embed-script";

    const processEmbeds = () => {
      window.instgrm?.Embeds?.process();
    };

    if (document.getElementById(scriptId)) {
      processEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  // Duplicate slides for a seamless auto-scrolling loop.
  const slides = [...instaPosts, ...instaPosts];

  return (
    <section
      ref={sectionRef}
      id="photography"
      className="mb-20"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[2.65rem] font-bold leading-[0.95] lg:text-8xl">
            PICTURE THIS...
            <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
              Literally!
            </span>
          </h2>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            I don't just code... :P
          </p>
        </div>

        <span className="hidden items-center gap-2 pb-1 font-mono text-[10px] tracking-[0.16em] text-zinc-400 sm:flex">
          <Camera size={14} />
          nehulscapes
        </span>
      </div>

      <div className="relative">
        {/* Soft edge fade keeps the moving track integrated with the page */}
        <div
          aria-hidden="true"
          className="photo-carousel-fade photo-carousel-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-8"
        />
        <div
          aria-hidden="true"
          className="photo-carousel-fade photo-carousel-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-8"
        />

        <div className="group overflow-hidden">
          <div className="photo-carousel-track flex w-max gap-4 py-2">
            {slides.map((post, index) => {
              const url = getPostUrl(post);
              const postId = getPostId(url);
              const isDuplicate = index >= instaPosts.length;

              return (
                <a
                  key={`${postId}-${index}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={isDuplicate}
                  tabIndex={isDuplicate ? -1 : 0}
                  className="photo-carousel-card group/card relative h-[300px] w-[235px] shrink-0 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900 sm:h-[350px] sm:w-[270px]"
                >
                  <blockquote
                    className="instagram-media !m-0 !min-w-0 !w-full"
                    data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                    data-instgrm-version="14"
                    style={{
                      background: "transparent",
                      border: 0,
                      margin: 0,
                      padding: 0,
                      width: "100%",
                      minWidth: 0,
                      height: "100%",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/card:opacity-90" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-white">
                      <Instagram size={14} />
                      view on Instagram
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/card:opacity-100">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <a
          href="https://www.instagram.com/nehulscapes/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-orange-500 dark:text-zinc-400"
        >
          <Instagram size={15} />
          more frames on Instagram
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
