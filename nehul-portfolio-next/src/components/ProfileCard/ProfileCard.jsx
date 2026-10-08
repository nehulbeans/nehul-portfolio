"use client";

import { useState } from "react";
import {
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  RotateCw,
  Twitter,
} from "lucide-react";
import { skillTags } from "../data/portfolioData";
import ProfileCardBack from "./ProfileCardBack";

const MAX_TAGS = 6;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nehuljainn", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/nehulbeans", icon: Github },
  { label: "X", href: "https://x.com/nehuljainn", icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/nehulscapes", icon: Instagram },
  {
    label: "Google Scholar",
    href: "https://scholar.google.co.uk/citations?user=C2BuLKcAAAAJ&hl=en",
    icon: GraduationCap,
  },
  { label: "Email", href: "mailto:work.nehul@gmail.com", icon: Mail },
];

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = (event) => {
    event?.stopPropagation();
    setIsFlipped((value) => !value);
  };

  const stop = (event) => event.stopPropagation();

  return (
    <div className="profile-card-wrap lg:sticky lg:top-8">
      <div
        className="profile-card group relative w-full cursor-pointer"
        onClick={flipCard}
        style={{ perspective: "1300px" }}
      >
        <div className="profile-card-shadow" />

        <div
          className="relative h-[590px] w-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT */}
          <article className="profile-card-side absolute inset-0 overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f8f7f3] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
            <div className="profile-paper pointer-events-none absolute inset-0 opacity-60" />

            <div className="relative flex h-full flex-col">
              {/* Photo */}
              <div className="relative min-h-0 flex-1">
                <div className="absolute -inset-1 rotate-[1.5deg] rounded-[22px] bg-coral-500/20 transition-transform duration-500 group-hover:rotate-[3deg]" />
                <div className="relative h-full overflow-hidden rounded-[20px] border-4 border-white bg-zinc-200 shadow-md">
                  <img
                    src="/profile.JPG"
                    alt="Nehul Jain"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    draggable="false"
                    onContextMenu={(event) => event.preventDefault()}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="mt-5 text-center">
                <h1 className="text-[28px] font-extrabold leading-none tracking-[-0.05em] text-zinc-950">
                  Nehul Jain<span className="text-coral-500">.</span>
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                  i do stuff! still figuring out my life!
                </p>
              </div>

              {/* Links */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={stop}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-coral-500 transition-all hover:-translate-y-0.5 hover:bg-coral-500 hover:text-white"
                  >
                    <Icon size={17} strokeWidth={1.9} />
                  </a>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {skillTags.slice(0, MAX_TAGS).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Flip hint */}
              <button
                type="button"
                onClick={flipCard}
                className="mx-auto mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 transition-colors hover:text-coral-500"
              >
                <RotateCw size={12} />
                flip for off-duty me
              </button>
            </div>
          </article>

          {/* BACK */}
          <ProfileCardBack onFlip={flipCard} />
        </div>
      </div>
    </div>
  );
}
