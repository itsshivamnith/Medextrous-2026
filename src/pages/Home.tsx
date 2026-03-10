// Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Wrench, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { Counter } from "@/components/Counter";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { CoordinatorCard } from "@/components/CoordinatorCard";
import { features, stats, galleryItems, coordinators } from "@/data/homeData";

const iconMap = { Calendar, Wrench, Users };

if (typeof document !== "undefined") {
  const l = document.createElement("link");
  l.href =
    "https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
}

const Home = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-24">
        {/* logos */}
        <motion.div
          className="flex items-center justify-center gap-5 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="w-14 h-14 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-2xl font-black"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#818cf8" }}
          >
            M
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div
            className="w-14 h-14 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-xs font-bold text-center leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#60a5fa" }}
          >
            NIT
            <br />
            HMR
          </div>
        </motion.div>

        {/* heading */}
        <motion.h1
          className="font-black tracking-tight mb-4 leading-none"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            WebkitTextStroke: "2px #1d4ed8",
            color: "#60a5fa",
            textShadow:
              "0 0 60px rgba(96,165,250,0.3), 0 0 120px rgba(99,102,241,0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          MEDextrous
        </motion.h1>

        {/* scan line */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-indigo-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <div className="h-px w-48 bg-gradient-to-r from-indigo-400/60 to-blue-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-400/60" />
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-white/40 tracking-[0.2em] uppercase mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mechanical Engineering Society · NIT Hamirpur
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/team">Meet Team</Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-20 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </div>
    </section>

    {/* ══ ABOUT STRIP ════════════════════════════════════════════════════════ */}
    <section className="py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-xl md:text-3xl font-light text-white/55 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          We are the engineers of tomorrow —{" "}
          <span style={{ color: "#818cf8" }} className="font-semibold">
            designing, building
          </span>{" "}
          and{" "}
          <span style={{ color: "#60a5fa" }} className="font-semibold">
            innovating
          </span>{" "}
          at the intersection of mechanics and technology.
        </motion.p>
      </div>
    </section>

   {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
<section className="py-24 relative">
  {/* ambient glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[600px] h-48 rounded-full bg-indigo-600/8 blur-[80px]" />
  </div>

  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((s, i) => {
        const accents = ['#6366f1', '#818cf8', '#60a5fa', '#a78bfa'];
        const glows   = [
          'rgba(99,102,241,0.15)',
          'rgba(129,140,248,0.15)',
          'rgba(96,165,250,0.15)',
          'rgba(167,139,250,0.15)',
        ];
        const color = accents[i % accents.length];
        const glow  = glows[i % glows.length];

        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="relative group"
          >
            {/* card glow behind */}
            <div
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"
              style={{ background: `linear-gradient(135deg, ${color}40, ${color}20)` }}
            />

            <div
              className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* top accent line — full width, unique color per card */}
              <motion.div
                className="absolute top-0 left-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
                initial={{ width: '0%', left: '50%' }}
                whileInView={{ width: '100%', left: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
              />

              {/* watermark icon behind number */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '7rem',
                  fontWeight: 900,
                  color,
                  opacity: 0.04,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                }}
              >
                {s.suffix || '#'}
              </div>

              {/* arc ring */}
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
                  {/* track */}
                  <circle cx="48" cy="48" r="42" fill="none"
                    stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                  {/* fill arc */}
                  <motion.circle
                    cx="48" cy="48" r="42" fill="none"
                    stroke={color} strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * 0.15 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.12 + 0.2, ease: 'easeOut' }}
                    style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                  />
                </svg>

                {/* number inside ring */}
                <div className="relative flex flex-col items-center">
                  <span
                    className="text-3xl md:text-4xl font-black leading-none"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color,
                      textShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
                    }}
                  >
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </div>
              </div>

              {/* label */}
              <span
                className="text-xs tracking-[0.3em] uppercase font-semibold"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </span>

              {/* bottom inner glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${glow}, transparent)` }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

    {/* ══ WHAT WE DO ═════════════════════════════════════════════════════════ */}
    <section className="py-24">
      <div className="container mx-auto px-4">
        <PageHeading title="What We Do" />

        <div className="flex flex-col">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  to={f.link}
                  className="group relative flex items-center gap-8 py-8 px-6 overflow-hidden transition-all duration-500"
                  style={{
                    borderBottom:
                      i < features.length - 1
                        ? "1px solid transparent"
                        : "none",
                    borderImage:
                      "linear-gradient(to right, transparent, rgba(99,102,241,0.2), transparent) 1",
                  }}
                >
                  {/* row hover bg sweep */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(99,102,241,0.06) 0%, rgba(96,165,250,0.04) 50%, transparent 100%)",
                    }}
                  />

                  {/* left accent bar */}
                  <div
                    className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-indigo-500/0 via-indigo-400 to-indigo-500/0 transition-all duration-500"
                    style={{
                      height: "0%",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const parent = el.closest("a");
                      if (!parent) return;
                      parent.addEventListener("mouseenter", () => {
                        el.style.height = "70%";
                        el.style.top = "15%";
                        el.style.transform = "none";
                      });
                      parent.addEventListener("mouseleave", () => {
                        el.style.height = "0%";
                        el.style.top = "50%";
                        el.style.transform = "translateY(-50%)";
                      });
                    }}
                  />

                  {/* giant watermark number */}
                  <span
                    className="absolute right-8 text-[7rem] font-black leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: "#818cf8",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {f.num}
                  </span>

                  {/* icon box */}
                  <div
                    className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                    style={{
                      border: "1px solid rgba(99,102,241,0.2)",
                      background: "rgba(99,102,241,0.06)",
                      boxShadow: "0 0 0 0 rgba(99,102,241,0)",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(99,102,241,0.5)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 0 20px rgba(99,102,241,0.2)";
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(99,102,241,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(99,102,241,0.2)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 0 0 0 rgba(99,102,241,0)";
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(99,102,241,0.06)";
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#818cf8" }} />
                  </div>

                  {/* small index */}
                  <span
                    className="flex-shrink-0 text-xs font-black tabular-nums"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: "rgba(99,102,241,0.3)",
                    }}
                  >
                    {f.num}
                  </span>

                  {/* text block */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-xl md:text-2xl font-black tracking-wide mb-1.5 text-white/85 group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-sm text-white/35 group-hover:text-white/50 transition-colors duration-300 leading-relaxed max-w-lg"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {f.description}
                    </p>
                  </div>

                  {/* explore pill */}
                  <div
                    className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-400"
                    style={{
                      color: "rgba(129,140,248,0.6)",
                      borderColor: "rgba(99,102,241,0.15)",
                      background: "transparent",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.color = "#e0e7ff";
                      el.style.borderColor = "rgba(99,102,241,0.5)";
                      el.style.background = "rgba(99,102,241,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.color = "rgba(129,140,248,0.6)";
                      el.style.borderColor = "rgba(99,102,241,0.15)";
                      el.style.background = "transparent";
                    }}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>

                {/* row separator */}
                {i < features.length - 1 && (
                  <div
                    className="w-full h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(99,102,241,0.15), transparent)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ══ GALLERY ════════════════════════════════════════════════════════════ */}
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-700/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-700/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4">
        <PageHeading title="Gallery" />
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "120px",
          }}
        >
          {galleryItems.map((item, i) => (
            <GalleryPhoto key={i} item={item} index={i} />
          ))}
        </div>
        <motion.p
          className="text-center text-xs tracking-[0.3em] uppercase mt-12 text-white/15"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Moments from the machine room
        </motion.p>
      </div>
    </section>

    {/* ══ CLUB COORDINATORS ══════════════════════════════════════════════════ */}
    <section className="py-28 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />
      </div>
      <div className="container mx-auto px-4">
        <PageHeading title="Club Coordinators" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {coordinators.map((c, i) => (
            <CoordinatorCard key={c.name} {...c} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>

    {/* ══ FOOTER CTA ═════════════════════════════════════════════════════════ */}
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#4f46e5" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to engineer the future?
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-black mb-8"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#e0e7ff",
            textShadow: "0 0 40px rgba(99,102,241,0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join MEDextrous
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/team">
              Get Involved <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </motion.div>
);

export default Home;
