export default function HeroSection({ sectionRef }) {
  return (
    <section ref={sectionRef} id="home" className="mb-16">
      <h1 className="text-5xl text-center lg:text-[7.5rem] lg:text-left font-extrabold mb-6">
        Hi! I'm Nehul
        <span className="text-3xl text-center text-gray-500 dark:text-zinc-500 block lg:leading-[4.5rem] lg:text-[4.6rem] lg:text-left mt-2">
          Curiosity is My Jam!
        </span>
      </h1>
      <p className="text-gray-600 dark:text-zinc-400 text-base lg:md:text-xl max-w-3xl text-center lg:text-left px-4 lg:p-0">
        I make machines think, drink too much coffee, and pretend i have
        my life together. curiosity is my fuel, and i turn "what ifs"
        into "nailed it!" (most of the time). powered by bad jokes, big
        ideas, and way too much caffeine.
      </p>
    </section>
  );
}
