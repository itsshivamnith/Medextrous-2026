// components/GalleryPhoto.tsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type GalleryItem = {
  src: string;
  caption: string;
  rotate: number;
};

// ─── Cinematic Gallery Slideshow ──────────────────────────────────────────────
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const total = Math.min(items.length, 8);
  const slides = items.slice(0, total);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 2500);
    return () => clearInterval(t);
  }, [next, paused]);

  // Wipe/reveal transition — horizontal clip-path
  const variants = {
    enter: (dir: number) => ({
      clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      opacity: 0.5,
      scale: 1.04,
    }),
    center: {
      clipPath: "inset(0 0% 0 0%)",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      opacity: 0.5,
      scale: 0.98,
    }),
  };

  return (
    <div
      className="relative w-full mx-auto overflow-hidden rounded-3xl"
      style={{
        height: "min(52vw, 580px)",
        border: "1px solid rgba(96,165,250,0.12)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.03)",
        background: "#000",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mobile: match About page — 4:3 ratio, max 260px */}
      <style>{`
        @media (max-width: 639px) {
          .gallery-viewer {
            height: auto !important;
            aspect-ratio: 4 / 3 !important;
            max-height: 260px !important;
          }
        }
      `}</style>

      <div className="gallery-viewer relative w-full h-full overflow-hidden rounded-3xl">

        {/* ── Slides ── */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].src}
              alt={slides[current].caption}
              className="w-full h-full object-contain"
              style={{ background: "#000" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/image.png";
              }}
            />

            {/* Dark vignette bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
              }}
            />

            {/* Top vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%)",
              }}
            />

            {/* Caption — animates in after slide lands */}
            <motion.div
              className="absolute bottom-12 left-5 right-16 md:bottom-14 md:left-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="h-px w-5"
                  style={{ background: "rgba(96,165,250,0.65)" }}
                />
                <span
                  className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase"
                  style={{
                    color: "rgba(96,165,250,0.65)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
              <p
                className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/70"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {slides[current].caption}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev button ── */}
        <button
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
          onClick={prev}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 1.5L3 6L8 10.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Next button ── */}
        <button
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
          onClick={next}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 1.5L9 6L4 10.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Dot/bar indicators ── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative overflow-hidden rounded-full transition-all duration-400 focus:outline-none"
              style={{
                width: i === current ? 28 : 6,
                height: 4,
                background:
                  i === current
                    ? "rgba(96,165,250,0.35)"
                    : "rgba(255,255,255,0.18)",
                border: "none",
                padding: 0,
              }}
            >
              {/* Timer fill on active */}
              {i === current && !paused && (
                <motion.div
                  key={`fill-${current}`}
                  className="absolute inset-0 rounded-full origin-left"
                  style={{ background: "#60a5fa" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              )}
              {i === current && paused && (
                <div className="absolute inset-0 rounded-full bg-blue-400" />
              )}
            </button>
          ))}
        </div>

        {/* ── Bottom progress line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-20">
          {!paused && (
            <motion.div
              key={`progress-${current}`}
              className="h-full"
              style={{
                background: "linear-gradient(to right, #3b82f6, #06b6d4)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          )}
        </div>

        {/* ── Pause pill ── */}
        <AnimatePresence>
          {paused && (
            <motion.div
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex gap-0.5 items-center">
                <div className="w-0.5 h-2.5 rounded-full bg-white/45" />
                <div className="w-0.5 h-2.5 rounded-full bg-white/45" />
              </div>
              <span
                className="text-[9px] tracking-[0.25em] uppercase text-white/35"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                paused
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── GalleryPhoto — single card (kept for any backward-compat usage) ──────────
export const GalleryPhoto = ({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick?: () => void;
}) => (
  <motion.div
    className="relative group cursor-pointer rounded-2xl overflow-hidden"
    style={{
      border: "1px solid rgba(96,165,250,0.1)",
      background: "#000",
      breakInside: "avoid",
    }}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
  >
    <img
      src={item.src}
      alt={item.caption}
      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/assets/image.png";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
      <p
        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-blue-200/80"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {item.caption}
      </p>
    </div>
  </motion.div>
);