"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  FileText,
  LoaderCircle,
  Maximize2,
  X,
} from "lucide-react";

const pdfUrl = "/Nehul_Jain_Resume.pdf";

export default function ResumeSection({ sectionRef }) {
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleBackdropClick = (event) => {
    if (event.target.id === "resume-modal-backdrop") {
      closeModal();
    }
  };

  return (
    <>
      <section ref={sectionRef} id="resume" className="mb-20">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-center text-5xl font-bold lg:text-left lg:text-8xl">
              RESUME
            </h2>

            <p className="mt-2 text-center text-base text-zinc-500 dark:text-zinc-400 lg:text-left lg:text-xl">
              a movie (starring me :P)
            </p>
          </div>


        </div>

        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-500 text-white">
                <FileText size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                  Nehul Jain — Resume
                </p>

                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Backend · cloud infrastructure · system design
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-coral-300 hover:text-coral-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <Maximize2 size={14} strokeWidth={1.8} />
                open
              </button>

              <a
                href={pdfUrl}
                download="Nehul_Jain_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-coral-600"
              >
                <Download size={14} strokeWidth={1.8} />
                download
              </a>
            </div>
          </div>

          {/* Compact PDF stage */}
          <div className="relative h-[455px] bg-[#d8d5cf] sm:h-[600px] sm:p-1 dark:bg-[#11100f]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.08)_0.7px,transparent_0.7px)] bg-[size:14px_14px] opacity-25 dark:opacity-10" />

            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-zinc-500 dark:text-zinc-400">
                <LoaderCircle size={22} className="animate-spin text-coral-500" />
                <span className="text-sm">opening résumé…</span>
              </div>
            )}

            <div className="relative mx-auto h-full max-w-[900px] overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
              <iframe
                src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                title="Nehul Jain resume"
                onLoad={() => setLoaded(true)}
                className={`h-full w-full transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ border: "none" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-zinc-200 bg-white px-5 py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 sm:px-6">
          </div>
        </div>
      </section>

      {/* Full-screen in-page resume modal */}
      {isModalOpen && (
        <div
          id="resume-modal-backdrop"
          role="presentation"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl dark:bg-zinc-900"
          >
            {/* Modal toolbar */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-coral-500 text-white">
                  <FileText size={17} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                    Nehul Jain — Resume
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    focus mode
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="Nehul_Jain_Resume.pdf"
                  className="hidden items-center gap-2 rounded-full bg-coral-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-coral-600 sm:inline-flex"
                >
                  <Download size={14} strokeWidth={1.8} />
                  download
                </a>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close resume preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-coral-500 hover:text-white dark:text-zinc-400"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* Modal PDF stage */}
            <div className="min-h-0 flex-1 bg-[#d8d5cf] p-2 dark:bg-[#11100f] sm:p-3">
              <div className="h-full overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                <iframe
                  src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=0`}
                  title="Nehul Jain resume full preview"
                  className="h-full w-full"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
