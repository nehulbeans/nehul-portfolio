"use client";

import { useState } from "react";
import {
  Award,
  Eye,
  Medal,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { awards } from "../data/portfolioData";

const awardIcons = [Trophy, Medal, Award];

function certificatePath(certificate) {
  if (!certificate) return "";

  if (certificate.startsWith("/")) return certificate;

  if (certificate.startsWith("certificate/")) {
    return `/${certificate}`;
  }

  return `/certificate/${certificate}`;
}

export default function AwardsSection({ sectionRef }) {
  const [selectedAward, setSelectedAward] = useState(null);

  const closeModal = () => setSelectedAward(null);

  const handleBackdropClick = (event) => {
    if (event.target.id === "certificate-modal-backdrop") {
      closeModal();
    }
  };

  return (
    <section ref={sectionRef} id="awards" className="mb-20">
      <div className="mb-9 flex items-end justify-between gap-4">
        <h2 className="text-center text-5xl font-bold lg:text-left lg:text-8xl">
          AWARDS
          <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
            ACHIEVEMENTS
          </span>
        </h2>

        <span className="hidden pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 sm:block">
          little wins, big smiles
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award, index) => {
          const Icon = awardIcons[index] || Sparkles;

          return (
            <article
              key={`${award.title}-${index}`}
              className="award-tile group relative flex min-h-[235px] flex-col overflow-hidden rounded-3xl bg-gray-50 p-5 transition-colors duration-200 hover:bg-orange-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
            >
              <span className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-orange-500/[0.04]" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition-colors duration-200 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 shadow-sm ring-1 ring-black/[0.04] dark:bg-zinc-800 dark:ring-white/[0.05]">
                  {award.date}
                </span>
              </div>

              <div className="relative mt-auto pt-8">
                <h3 className="text-lg font-semibold leading-snug text-zinc-900 transition-colors duration-200 group-hover:text-orange-500 dark:text-white">
                  {award.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {award.description}
                </p>

                {award.certificate && (
                  <button
                    type="button"
                    onClick={() => setSelectedAward(award)}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-orange-500 transition-colors hover:text-orange-600 dark:hover:text-orange-300"
                  >
                    <Eye size={14} strokeWidth={1.8} />
                    view certificate
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {selectedAward && (
        <div
          id="certificate-modal-backdrop"
          role="presentation"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedAward.title} certificate`}
            className="relative w-full max-w-5xl"
          >
            <div className="mb-3 flex items-center justify-between px-1 text-white">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                  Certificate
                </p>
                <p className="mt-1 text-sm font-medium">{selectedAward.title}</p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close certificate"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex max-h-[80vh] min-h-[300px] items-center justify-center overflow-auto rounded-2xl bg-zinc-100 p-3 shadow-2xl dark:bg-zinc-900 sm:p-5">
              <img
                src={certificatePath(selectedAward.certificate)}
                alt={`${selectedAward.title} certificate`}
                className="h-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                draggable="false"
                onContextMenu={(event) => event.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
