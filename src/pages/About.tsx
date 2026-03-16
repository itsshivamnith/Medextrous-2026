import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Timeline from "@/components/Timeline";

const images = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.jpg",
  "/assets/gallery/g4.jpg",
];

export const PageHeading = ({ title }: { title: string }) => (
  <motion.div
    className="flex flex-col items-center gap-3 mb-16"
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-4 w-full max-w-xs">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
      <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: "#60a5fa" }}>
        Medextrous
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/50" />
    </div>
    <h1
      className="text-4xl md:text-6xl font-black tracking-tight text-center"
      style={{
        WebkitTextStroke: "1.5px #1d4ed8",
        color: "#60a5fa",
        textShadow: "0 0 30px rgba(96,165,250,0.25), 0 2px 8px rgba(0,0,0,0.8)",
      }}
    >
      {title}
    </h1>
    <div className="flex items-center gap-2">
      <div className="w-8 h-px bg-blue-400/40 rounded" />
      <div className="w-2 h-2 rounded-full bg-blue-400/60" />
      <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded" />
      <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
      <div className="w-8 h-px bg-cyan-400/40 rounded" />
    </div>
  </motion.div>
);

// ─── Cinematic 4-image carousel ───────────────────────────────────────────────
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + images.length) % images.length);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slideVariants = {
    enter: (dir: number) => ({
      clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      scale: 1.06, opacity: 0.5,
    }),
    center: { clipPath: "inset(0 0% 0 0%)", scale: 1, opacity: 1 },
    exit: (dir: number) => ({
      clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      scale: 0.97, opacity: 0.5,
    }),
  };

  return (
    <>
      {/* Responsive style: 4:3 on mobile (tall enough), 16:7 on desktop */}
      <style>{`
        .carousel-wrap {
          aspect-ratio: 4 / 3;
        }
        @media (min-width: 640px) {
          .carousel-wrap {
            aspect-ratio: 16 / 7;
          }
        }
      `}</style>

      {/* Outer glow frame — equal padding on both sides */}
      <div
        className="relative w-full px-0"
        style={{
          filter: "drop-shadow(0 0 40px rgba(59,130,246,0.15)) drop-shadow(0 32px 64px rgba(0,0,0,0.6))",
        }}
      >
        {/* Accent glow bar above */}
        <motion.div
          className="w-3/4 mx-auto h-px mb-0 rounded-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(96,165,250,0.5), rgba(99,102,241,0.4), transparent)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Main carousel */}
        <div
          className="carousel-wrap relative w-full rounded-2xl overflow-hidden bg-black"
          style={{
            border: "1px solid rgba(96,165,250,0.14)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* ── Slides ── */}
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/image.png"; }}
              />

              {/* Cinematic vignette layers */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.08) 45%, transparent 70%)" }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%)" }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.3) 100%)" }} />

              {/* Slide info bottom-left */}
              <motion.div
                className="absolute bottom-10 left-5 sm:bottom-12 sm:left-8 z-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-px w-4" style={{ background: "rgba(96,165,250,0.7)" }} />
                  <span
                    className="text-[8px] sm:text-[10px] tracking-[0.38em] uppercase"
                    style={{ color: "rgba(96,165,250,0.65)", fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </span>
                </div>
                {/* Animated accent underline */}
                <motion.div
                  className="h-px rounded-full"
                  style={{ background: "linear-gradient(to right, #60a5fa, transparent)" }}
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* ── Prev / Next ── */}
          <button
            onClick={prev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M8 1.5L3 6L8 10.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M4 1.5L9 6L4 10.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── Desktop thumbnails (bottom-right) ── */}
          <div className="hidden sm:flex absolute bottom-4 right-5 z-20 gap-1.5 items-end">
            {images.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: i === current ? 68 : 48,
                  height: i === current ? 46 : 34,
                  borderRadius: 7,
                  overflow: "hidden",
                  flexShrink: 0,
                  border: i === current
                    ? "1.5px solid rgba(96,165,250,0.85)"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: i === current
                    ? "0 0 14px rgba(96,165,250,0.45), 0 4px 12px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                <img
                  src={src} alt=""
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: i === current ? "brightness(1)" : "brightness(0.45) saturate(0.7)" }}
                />
              </motion.button>
            ))}
          </div>

          {/* ── Mobile dot indicators (centered bottom) ── */}
          <div className="flex sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? 24 : 6,
                  height: 4,
                  borderRadius: 99,
                  background: i === current ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.18)",
                  border: "none", padding: 0,
                  position: "relative", overflow: "hidden",
                  transition: "width 0.3s ease",
                }}
              >
                {i === current && !paused && (
                  <motion.div
                    key={`dot-${current}`}
                    className="absolute inset-0 rounded-full origin-left"
                    style={{ background: "#60a5fa" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                )}
                {i === current && paused && (
                  <div className="absolute inset-0 rounded-full bg-blue-400" />
                )}
              </button>
            ))}
          </div>

          {/* ── Progress line ── */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background: "rgba(255,255,255,0.04)" }}>
            {!paused && (
              <motion.div
                key={`prog-${current}`}
                className="h-full"
                style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            )}
          </div>

          {/* ── Pause pill ── */}
          <AnimatePresence>
            {paused && (
              <motion.div
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-0.5 h-2.5 rounded-full bg-white/40" />
                </div>
                <span className="text-[8px] tracking-[0.25em] uppercase text-white/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>paused</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Corner brackets ── */}
          <div className="absolute top-3 left-3 w-5 h-5 pointer-events-none"
            style={{ borderTop: "1.5px solid rgba(96,165,250,0.5)", borderLeft: "1.5px solid rgba(96,165,250,0.5)", borderRadius: "5px 0 0 0" }} />
          <div className="absolute top-3 right-3 w-5 h-5 pointer-events-none"
            style={{ borderTop: "1.5px solid rgba(96,165,250,0.3)", borderRight: "1.5px solid rgba(96,165,250,0.3)", borderRadius: "0 5px 0 0" }} />
          <div className="absolute bottom-6 left-3 w-5 h-5 pointer-events-none sm:bottom-3"
            style={{ borderBottom: "1.5px solid rgba(99,102,241,0.4)", borderLeft: "1.5px solid rgba(99,102,241,0.4)", borderRadius: "0 0 0 5px" }} />
        </div>

        {/* Accent glow bar below */}
        <motion.div
          className="w-2/3 mx-auto h-px mt-0 rounded-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.35), rgba(96,165,250,0.3), transparent)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </>
  );
};

// ─── About page ───────────────────────────────────────────────────────────────
const About = () => (
  <div className="pb-16 relative overflow-hidden pt-6">
    <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
      <PageHeading title="About Us" />

      {/* Carousel */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroCarousel />
      </motion.div>

      {/* ── Mobile / Tablet ── */}
      <div className="flex flex-col gap-8 lg:hidden mb-16">
        <ScrollRevealCard direction="left" delay={0}>
          <ContentCard title="Our History">
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              Team MEDextrous represents the Department of Mechanical Engineering, NIT Hamirpur in NIMBUS,
              the college's annual technical fest, since 2010. The team plays a pivotal role in NIMBUS,
              believing that excellence is an art won by training and habituation.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mt-3">
              MEDextrous has been organizing events that involve leveraging the basics of engineering to
              make efficient use of available resources. It provides a platform for brilliant minds to
              showcase their innovative ideas.
            </p>
          </ContentCard>
        </ScrollRevealCard>
        <ScrollRevealCard direction="right" delay={0.05}><ImageCard src="/assets/gallery/g4.jpg" /></ScrollRevealCard>
        <ScrollRevealCard direction="left" delay={0.05}>
          <ContentCard title="Our Vision">
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.
              And when there is a will, there is a way.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mt-3">
              We strive to transform engineering concepts into real-world applications, shaping the future with
              innovation and excellence in every project we undertake.
            </p>
          </ContentCard>
        </ScrollRevealCard>
        <ScrollRevealCard direction="right" delay={0.05}><ImageCard src="/assets/gallery/g2.jpg" /></ScrollRevealCard>
      </div>

      {/* ── Desktop: Diagonal layout ── */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-10 mb-24">
        <div className="flex flex-col gap-10">
          <ScrollRevealCard direction="left" delay={0}>
            <ContentCard title="Our History">
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify">
                Team MEDextrous represents the Department of Mechanical Engineering, NIT Hamirpur in NIMBUS,
                the college's annual technical fest, since 2010. The team plays a pivotal role in NIMBUS,
                believing that excellence is an art won by training and habituation.
              </p>
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify mt-4">
                MEDextrous has been organizing events that involve leveraging the basics of engineering to
                make efficient use of available resources. It provides a platform for brilliant minds to
                showcase their innovative ideas.
              </p>
            </ContentCard>
          </ScrollRevealCard>
          <div className="mt-10">
            <ScrollRevealCard direction="left" delay={0.1}><ImageCard src="/assets/gallery/g4.jpg" /></ScrollRevealCard>
          </div>
        </div>
        <div className="flex flex-col gap-10 mt-20">
          <ScrollRevealCard direction="right" delay={0.1}><ImageCard src="/assets/gallery/g2.jpg" /></ScrollRevealCard>
          <ScrollRevealCard direction="right" delay={0.15}>
            <ContentCard title="Our Vision">
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify">
                The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.
                And when there is a will, there is a way.
              </p>
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify mt-4">
                We strive to transform engineering concepts into real-world applications, shaping the future with
                innovation and excellence in every project we undertake.
              </p>
            </ContentCard>
          </ScrollRevealCard>
        </div>
      </div>

      {/* ── Timeline ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-bold text-xl lg:text-2xl text-white/90 mb-3 tracking-tight">Our Journey</h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded" />
      </motion.section>
      <Timeline />
    </div>
  </div>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ScrollRevealCard = ({ children, direction, delay }: {
  children: React.ReactNode; direction: "left" | "right"; delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>
);

const ContentCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    className="rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
      backdrop-blur-2xl border border-slate-700/40 shadow-2xl group relative overflow-hidden
      transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1"
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
    <div className="absolute top-8 bottom-8 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent rounded-full" />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    <div className="relative z-10 p-8 lg:p-10">
      <div className="flex items-start gap-4 mb-5">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-400/25 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
        </div>
        <div>
          <h2 className="font-black text-2xl lg:text-3xl text-white tracking-tight leading-tight">{title}</h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mt-2" />
        </div>
      </div>
      {children}
    </div>
  </motion.div>
);

const ImageCard = ({ src }: { src: string }) => (
  <div className="h-72 lg:h-80 rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl relative group">
    <img
      src={src}
      alt="Medextrous"
      className="w-full h-full object-cover brightness-75 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700"
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/image.png"; }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12), transparent 60%)" }}
    />
    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg" />
  </div>
);

export default About;