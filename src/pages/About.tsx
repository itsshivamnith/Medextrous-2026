import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";

const images = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.jpg",
  "/assets/gallery/g4.jpg"
  
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
      <span
        className="text-xs tracking-[0.35em] uppercase font-semibold"
        style={{ color: "#60a5fa" }}
      >
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

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > currentImage ? 1 : -1);
    setCurrentImage(idx);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="pb-16 relative overflow-hidden pt-6">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <PageHeading title="About Us" />

        {/* ── Carousel Hero ── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative w-full mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            style={{ height: "min(52vw, 580px)" }}
          >
            {/* Mobile: fixed aspect ratio, shorter height */}
            <style>{`
              @media (max-width: 639px) {
                .hero-carousel {
                  height: auto !important;
                  aspect-ratio: 4 / 3;
                  max-height: 260px;
                }
              }
            `}</style>

            <div className="hero-carousel relative w-full h-full overflow-hidden rounded-3xl">

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex items-center justify-center bg-black"
                >
                  <img
                    src={images[currentImage]}
                    alt={`Slide ${currentImage + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/image.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? "w-6 h-2 bg-blue-400"
                        : "w-2 h-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 z-10">
                <motion.div
                  key={currentImage}
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile / Tablet ── */}
        <div className="flex flex-col gap-8 lg:hidden mb-16">
          <ScrollRevealCard direction="left" delay={0}>
            <ContentCard title="Our History">
              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                Team MEDextrous represents the Department of Mechanical
                Engineering, NIT Hamirpur in NIMBUS, the college's annual
                technical fest, since 2010. The team plays a pivotal role in
                NIMBUS, believing that excellence is an art won by training and
                habituation.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed text-justify mt-3">
                MEDextrous has been organizing events that involve leveraging
                the basics of engineering to make efficient use of available
                resources. It provides a platform for brilliant minds to
                showcase their innovative ideas.
              </p>
            </ContentCard>
          </ScrollRevealCard>

          <ScrollRevealCard direction="right" delay={0.05}>
            <ImageCard src="/assets/gallery/g4.jpg" />
          </ScrollRevealCard>

          <ScrollRevealCard direction="left" delay={0.05}>
            <ContentCard title="Our Vision">
              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                The capacity to learn is a gift; the ability to learn is a
                skill; the willingness to learn is a choice. And when there is a
                will, there is a way.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed text-justify mt-3">
                We strive to transform engineering concepts into real-world
                applications, shaping the future with innovation and excellence
                in every project we undertake.
              </p>
            </ContentCard>
          </ScrollRevealCard>

          <ScrollRevealCard direction="right" delay={0.05}>
            <ImageCard src="/assets/gallery/g2.jpg" />
          </ScrollRevealCard>
        </div>

        {/* ── Desktop: Diagonal layout ── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-10 mb-24">
          <div className="flex flex-col gap-10">
            <ScrollRevealCard direction="left" delay={0}>
              <ContentCard title="Our History">
                <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify">
                  Team MEDextrous represents the Department of Mechanical
                  Engineering, NIT Hamirpur in NIMBUS, the college's annual
                  technical fest, since 2010. The team plays a pivotal role in
                  NIMBUS, believing that excellence is an art won by training
                  and habituation.
                </p>
                <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify mt-4">
                  MEDextrous has been organizing events that involve leveraging
                  the basics of engineering to make efficient use of available
                  resources. It provides a platform for brilliant minds to
                  showcase their innovative ideas.
                </p>
              </ContentCard>
            </ScrollRevealCard>

            <div className="mt-10">
              <ScrollRevealCard direction="left" delay={0.1}>
                <ImageCard src="/assets/gallery/g4.jpg" />
              </ScrollRevealCard>
            </div>
          </div>

          <div className="flex flex-col gap-10 mt-20">
            <ScrollRevealCard direction="right" delay={0.1}>
              <ImageCard src="/assets/gallery/g2.jpg" />
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" delay={0.15}>
              <ContentCard title="Our Vision">
                <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify">
                  The capacity to learn is a gift; the ability to learn is a
                  skill; the willingness to learn is a choice. And when there is
                  a will, there is a way.
                </p>
                <p className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify mt-4">
                  We strive to transform engineering concepts into real-world
                  applications, shaping the future with innovation and
                  excellence in every project we undertake.
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
          <h2 className="font-bold text-xl lg:text-2xl text-white/90 mb-3 tracking-tight">
            Our Journey
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded" />
        </motion.section>
        <Timeline />
      </div>
    </div>
  );
};

const ScrollRevealCard = ({
  children,
  direction,
  delay,
}: {
  children: React.ReactNode;
  direction: "left" | "right";
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ContentCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className="rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
      backdrop-blur-2xl border border-slate-700/40 shadow-2xl
      group relative overflow-hidden transition-all duration-300
      hover:shadow-blue-500/10 hover:-translate-y-1"
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
          <h2 className="font-black text-2xl lg:text-3xl text-white tracking-tight leading-tight">
            {title}
          </h2>
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
      onError={(e) => {
        e.currentTarget.src = "/assets/image.png";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.12), transparent 60%)",
      }}
    />
    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg" />
  </div>
);

export default About;