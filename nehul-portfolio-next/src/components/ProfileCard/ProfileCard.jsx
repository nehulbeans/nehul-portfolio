import { useState } from "react";
import {
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Mail,
  GraduationCap,
} from "lucide-react";
import { skillTags } from "../data/portfolioData";
import ProfileCardBack from "./ProfileCardBack";

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="sticky top-8">
      <div
        className="relative w-full cursor-pointer group"
        onClick={handleFlip}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shadow Element */}
        <div
          className="absolute -inset-4 rounded-2xl opacity-75 blur-xl animate-pulse"
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
            transform: "translateZ(-10px)",
            transition: "all 500ms ease-in-out",
          }}
        />

        <div
          className="w-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front of the card */}
          <div
            className="w-full bg-white dark:bg-white rounded-2xl px-4 p-12 shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(0px)",
            }}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="relative mb-3">
                <img
                  src="/profile.webp"
                  alt="Profile"
                  className="w-64 h-72 rounded-2xl object-cover"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <h1 className="text-2xl font-bold text-black mb-0">Nehul Jain</h1>
              <p className="text-zinc-600 font-medium mb-5">
                i do stuff! still figuring out my life!
              </p>
              <div className="flex space-x-8">
                <a
                  href="https://www.linkedin.com/in/nehuljainn/"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/nehulbeans"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://x.com/nehuljainn"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.instagram.com/nehulscapes"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://scholar.google.co.uk/citations?user=C2BuLKcAAAAJ&hl=en"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <GraduationCap size={22} />
                </a>
                <a
                  href="mailto:work.nehul@gmail.com"
                  className="text-orange-500 hover:text-zinc-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <Mail size={20} />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
                {skillTags.map((skill) => (
                  <span
                    key={skill}
                    className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ProfileCardBack />
        </div>
      </div>
    </div>
  );
}
