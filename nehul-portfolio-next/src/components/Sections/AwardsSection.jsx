"use client";

import { useState } from "react";
import { awards } from "../data/portfolioData";
import { Eye, X } from "lucide-react";

export default function AwardsSection({ sectionRef }) {
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on background click
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setSelectedCert(null);
    }
  };

  return (
    <section ref={sectionRef} id="awards" className="mb-16">
      <h2 className="text-5xl text-center lg:text-8xl lg:text-left font-bold mb-6">
        AWARDS &
        <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
          ACHIEVEMENTS 🏆
        </span>
      </h2>

      <div className="grid gap-4">
        {awards.map((award, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-custom-bg rounded-2xl p-6 border-none dark:border-none hover:bg-gray-100 dark:hover:bg-grey-bg transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <h3 className="text-xl font-semibold">{award.title}</h3>
                <span className="text-sm text-gray-700 dark:text-zinc-300 shrink-0 bg-gray-200 dark:bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
                  {award.date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-zinc-400 mt-2">
                {award.description}
              </p>

              {/* View Certificate Button */}
              {award.certificate && (
                <button
                  onClick={() => setSelectedCert(award.certificate)}
                  className="mt-3 flex items-center gap-2 w-fit text-sm font-medium text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Eye size={16} />
                  View Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors bg-black/50 p-2 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Certificate Image */}
            <img
              src={selectedCert}
              alt="Achievement Certificate"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
