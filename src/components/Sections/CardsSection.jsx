"use client";
import { useRef } from "react";
import { Layers, Box, ArrowRight } from "lucide-react";

function TiltCard({ onClick, bg, text, glow, children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * -8;
    const ry = (x / r.width - 0.5) * 8;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-3xl"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`relative group overflow-hidden rounded-3xl p-8 min-h-[220px] ${bg} ${text}
          transition-transform duration-200 ease-out active:scale-[0.98]
          shadow-lg ${glow}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
        {/* shine sweep */}
        <div className="pointer-events-none absolute -inset-y-4 -left-1/2 w-1/3 rotate-12 bg-white/25 blur-md -translate-x-full group-hover:translate-x-[450%] transition-transform duration-1000 ease-out" />
        {children}
      </div>
    </button>
  );
}

export default function CardsSection({ scrollToSection, sectionRefs }) {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TiltCard
          onClick={() => scrollToSection(sectionRefs.experience)}
          bg="bg-coral-500"
          text="text-white"
          glow="hover:shadow-coral-500/40 hover:shadow-2xl"
        >
          <Layers className="w-12 h-12 mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          <h3 className="text-2xl font-bold mb-2">
            PROFESSIONAL
            <br />
            PLOT TWISTS
          </h3>
          <p className="text-sm text-white/80">where the work happens →</p>
          <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:-rotate-45" />
        </TiltCard>

        <TiltCard
          onClick={() => scrollToSection(sectionRefs.projects)}
          bg="bg-chartreuse-400"
          text="text-zinc-900"
          glow="hover:shadow-chartreuse-400/40 hover:shadow-2xl"
        >
          <Box className="w-12 h-12 mb-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
          <h3 className="text-2xl font-bold mb-2">
            FEATURED PROJECTS
            <br />
            (the hall of fame :p)
          </h3>
          <p className="text-sm text-zinc-800/80">things I actually shipped →</p>
          <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:-rotate-45" />
        </TiltCard>
      </div>
    </section>
  );
}
