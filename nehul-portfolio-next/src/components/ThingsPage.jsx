"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Coffee,
  Grid3x3,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Package,
  Server,
  Smartphone,
  Tablet,
} from "lucide-react";
import TopNavigation from "./Navigation/TopNavigation";
import Footer from "./UI/Footer";
import { things, thingsCategories, thingsIntro } from "./data/things";

const iconMap = {
  laptop: Laptop,
  mobile: Smartphone,
  server: Server,
  monitor: Monitor,
  keyboard: Keyboard,
  mouse: Mouse,
  headphones: Headphones,
  camera: Camera,
  grid: Grid3x3,
  tablet: Tablet,
  package: Package,
};

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/nehul";

function ThingItem({ item }) {
  const Icon = iconMap[item.icon] || Package;
  const isLink = Boolean(item.link);
  const Wrapper = isLink ? "a" : "div";
  const wrapperProps = isLink
    ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="thing-item group flex flex-col items-center text-center focus-visible:outline-none"
    >
      <div className="relative flex aspect-square w-full items-center justify-center">
        <span className="pointer-events-none absolute inset-6 rounded-full bg-coral-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

        {item.image ? (
          <img
            src={item.image.startsWith("/") ? item.image : `/${item.image}`}
            alt={item.name}
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="relative h-full w-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] dark:drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <div className="relative flex h-1/2 w-1/2 items-center justify-center rounded-3xl bg-gray-50 text-coral-500 transition-transform duration-300 group-hover:-translate-y-1.5 dark:bg-zinc-900/60">
            <Icon className="h-1/2 w-1/2" strokeWidth={1.4} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <h3 className="text-sm font-semibold leading-tight text-zinc-900 transition-colors duration-200 group-hover:text-coral-500 dark:text-white sm:text-base">
          {item.name}
        </h3>
        {isLink && (
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
            className="shrink-0 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-coral-500"
          />
        )}
      </div>

      {item.tag && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-zinc-400">
          {item.tag}
        </p>
      )}

      {item.category === "Wishlist" && (
        <span className="mt-2 inline-flex items-center rounded-full bg-chartreuse-400 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-zinc-900">
          wishlist
        </span>
      )}
    </Wrapper>
  );
}

export default function ThingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? things : things.filter((t) => t.category === active)),
    [active]
  );

  const counts = useMemo(() => {
    const c = { All: things.length };
    things.forEach((t) => {
      c[t.category] = (c[t.category] || 0) + 1;
    });
    return c;
  }, []);

  const wishlistCount = things.filter((t) => t.category === "Wishlist").length;

  return (
    <div className="min-h-screen bg-paper-bg text-zinc-900 transition-colors duration-300 dark:bg-custom-bg dark:text-white">
      <TopNavigation
        sectionRefs={{}}
        scrollToSection={() => {}}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage="things"
      />

      <main className="container mx-auto max-w-6xl px-4 pb-10 pt-12 lg:pt-16">
        <header className="mb-10">
          <h1 className="text-center text-5xl font-bold lg:text-left lg:text-8xl">
            {thingsIntro.title}
            <span className="block text-gray-500 dark:text-zinc-500 lg:text-7xl">
              {thingsIntro.subtitle}
              <span className="ml-2 inline-block text-coral-500">.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-center text-base text-gray-600 dark:text-zinc-400 lg:text-left lg:text-xl">
            {thingsIntro.tagline}
          </p>
        </header>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          {thingsCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-coral-500 bg-coral-500 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-coral-300 hover:text-coral-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {cat}
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? "text-white/70" : "text-zinc-400"
                  }`}
                >
                  {counts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ThingItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Buy me a coffee — shows on All and Wishlist views */}
        {(active === "All" || active === "Wishlist") && wishlistCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 flex flex-col items-center gap-3 text-center"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              chip in? :p
            </p>
            <a
              href={BUY_ME_A_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-600"
            >
              <Coffee size={16} strokeWidth={1.8} />
              buy me a coffee
            </a>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
