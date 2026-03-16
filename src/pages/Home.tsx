import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

import { PageHeading } from '@/components/PageHeading';
import { AboutSnippet } from '@/components/AboutSnippet';
import { Counter } from '@/components/Counter';
import { GalleryGrid } from '@/components/GalleryPhoto';
import { CoordinatorCard } from '@/components/CoordinatorCard';
import { FacultyInchargeCard } from '@/components/FacultyInchargeCard';
import { Particle } from '@/components/Particle';
import { GridLines } from '@/components/GridLines';
import { HeroLogos } from '@/components/HeroLogos';
import { HeroBadge } from '@/components/HeroBadge';
import { HeroScrollIndicator } from '@/components/HeroScrollIndicator';
import { StatCard } from '@/components/StatCard';
import { FeatureRow } from '@/components/FeatureRow';

import { features, stats, coordinators, facultyIncharge } from '@/data/homeData';

if (typeof document !== 'undefined') {
  const l = document.createElement('link');
  l.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap';
  l.rel = 'stylesheet';
  document.head.appendChild(l);
}

const galleryItems = [
  { src: '/assets/gallery/g1.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g2.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g3.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g4.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g5.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g6.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g7.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g8.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g9.jpg', caption: '', rotate: 0 },
  { src: '/assets/gallery/g10.jpg', caption: '', rotate: 0 },
];

const PARTICLES = [
  { delay: 0,   x: '15%', size: 3, duration: 8  },
  { delay: 2,   x: '35%', size: 2, duration: 11 },
  { delay: 1,   x: '55%', size: 4, duration: 9  },
  { delay: 3,   x: '72%', size: 2, duration: 13 },
  { delay: 0.5, x: '88%', size: 3, duration: 10 },
  { delay: 4,   x: '25%', size: 2, duration: 12 },
  { delay: 1.5, x: '65%', size: 3, duration: 9  },
  { delay: 2.5, x: '45%', size: 2, duration: 14 },
];

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[140px]" />
        </div>

        <GridLines />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 pointer-events-none opacity-20">
          <div className="w-8 h-8 border-t border-l border-blue-400/60" />
        </div>
        <div className="absolute top-8 right-8 pointer-events-none opacity-20">
          <div className="w-8 h-8 border-t border-r border-blue-400/60" />
        </div>
        <div className="absolute bottom-8 left-8 pointer-events-none opacity-20">
          <div className="w-8 h-8 border-b border-l border-indigo-400/60" />
        </div>
        <div className="absolute bottom-8 right-8 pointer-events-none opacity-20">
          <div className="w-8 h-8 border-b border-r border-indigo-400/60" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 text-center pt-24"
        >
          <HeroLogos />
          <HeroBadge />

          {/* Heading */}
          <motion.h1
            className="font-black tracking-tight mb-2 leading-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              WebkitTextStroke: '2px #1d4ed8',
              color: '#60a5fa',
              textShadow: '0 0 60px rgba(96,165,250,0.3), 0 0 120px rgba(99,102,241,0.15)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            MEDextrous
          </motion.h1>

          {/* Scan line */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
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
            className="text-sm md:text-base text-white/25 max-w-sm mx-auto leading-relaxed mb-10 tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Engineering innovation through design, builds & collaboration
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/team">Meet Team</Link>
            </Button>
          </motion.div>

          <HeroScrollIndicator />

          
        </motion.div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-48 rounded-full bg-indigo-600/8 blur-[80px]" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ═════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <PageHeading title="What We Do" />
          <div className="flex flex-col gap-3 md:gap-0">
            {features.map((f, i) => (
              <FeatureRow
                key={f.title}
                {...f}
                index={i}
                isLast={i === features.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
      
      <AboutSnippet />


       {/* ══ CLUB COORDINATORS ══════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4">
          <PageHeading title="Faculty In-charge" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <FacultyInchargeCard designation={facultyIncharge.designation} department={facultyIncharge.department} key={facultyIncharge.name} {...facultyIncharge} delay={0} />
          </div>
        </div>
      </section>
      
      
      {/* ══ GALLERY ════════════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-700/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-700/5 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4">
          <PageHeading title="Gallery" />
          <GalleryGrid items={galleryItems} />
          <motion.p
            className="text-center text-xs tracking-[0.3em] uppercase mt-8 text-white/15"
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
            style={{ color: '#4f46e5' }}
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
              color: '#e0e7ff',
              textShadow: '0 0 40px rgba(99,102,241,0.2)',
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
};

export default Home;