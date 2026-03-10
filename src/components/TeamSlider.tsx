// TeamSlider.tsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamCard from './TeamCard';
import teamData from '../data/team.json';

interface TeamMember {
  name: string;
  linkedin: string;
  image: string;
}

const yearOrder = ['year4', 'year3', 'year2', 'year1'];
const yearLabels: Record<string, string> = {
  year4: 'Final Year',
  year3: '3rd Year',
  year2: '2nd Year',
  year1: '1st Year',
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const TeamSlider = () => {
  const isMobile = useIsMobile();
  const cardsPerSlide = isMobile ? 1 : 3;

  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>({
    year4: 0, year3: 0, year2: 0, year1: 0,
  });
  const [directions, setDirections] = useState<Record<string, number>>({
    year4: 1, year3: 1, year2: 1, year1: 1,
  });
  const [isPaused, setIsPaused] = useState(false);

  const getTotalSlides = useCallback((year: string) => {
    const members = teamData[year as keyof typeof teamData] as TeamMember[];
    return Math.ceil(members.length / cardsPerSlide);
  }, [cardsPerSlide]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndices(prev => {
        const updated = { ...prev };
        yearOrder.forEach(year => {
          const total = Math.ceil(
            (teamData[year as keyof typeof teamData] as TeamMember[]).length / cardsPerSlide
          );
          updated[year] = (prev[year] + 1) % total;
        });
        return updated;
      });
      setDirections(prev => {
        const updated = { ...prev };
        yearOrder.forEach(year => { updated[year] = 1; });
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, cardsPerSlide]);

  const goTo = (year: string, index: number) => {
    const dir = index > currentIndices[year] ? 1 : -1;
    setDirections(prev => ({ ...prev, [year]: dir }));
    setCurrentIndices(prev => ({ ...prev, [year]: index }));
  };

  const go = (year: string, dir: number) => {
    const total = getTotalSlides(year);
    const next = (currentIndices[year] + dir + total) % total;
    setDirections(prev => ({ ...prev, [year]: dir }));
    setCurrentIndices(prev => ({ ...prev, [year]: next }));
  };

  return (
    <div
      className="w-full py-8 space-y-20 max-w-6xl mx-auto px-4 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {yearOrder.map((yearSection) => {
        const members = teamData[yearSection as keyof typeof teamData] as TeamMember[];
        const currentIndex = currentIndices[yearSection];
        const totalSlides = Math.ceil(members.length / cardsPerSlide);
        const visibleMembers = members.slice(
          currentIndex * cardsPerSlide,
          currentIndex * cardsPerSlide + cardsPerSlide
        );
        const dir = directions[yearSection];

        return (
          <motion.section
            key={yearSection}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            {/* Year heading */}
            <motion.div className="text-center mb-10">
              <div className="flex items-center gap-4 justify-center mb-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/40" />
                <h2
                  className="text-3xl md:text-4xl font-black tracking-tight"
                  style={{
                    WebkitTextStroke: '1px #1d4ed8',
                    color: '#60a5fa',
                    textShadow: '0 0 20px rgba(96,165,250,0.2)',
                  }}
                >
                  {yearLabels[yearSection]}
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/40" />
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-6 h-px bg-blue-400/40 rounded" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                <div className="w-10 h-px bg-gradient-to-r from-blue-400/50 to-cyan-400/50 rounded" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                <div className="w-6 h-px bg-cyan-400/40 rounded" />
              </div>
            </motion.div>

            {/* Slider */}
            <div className="relative">

              {/* Prev / Next arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={() => go(yearSection, -1)}
                    className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20
                      w-9 h-9 rounded-full border border-white/15 bg-slate-900/80 backdrop-blur
                      flex items-center justify-center text-white/60 hover:text-white
                      hover:border-blue-400/40 hover:bg-slate-800/90 transition-all duration-300 shadow-lg"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => go(yearSection, 1)}
                    className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20
                      w-9 h-9 rounded-full border border-white/15 bg-slate-900/80 backdrop-blur
                      flex items-center justify-center text-white/60 hover:text-white
                      hover:border-blue-400/40 hover:bg-slate-800/90 transition-all duration-300 shadow-lg"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`${yearSection}-${currentIndex}`}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid gap-6 ${
                    isMobile
                      ? 'grid-cols-1 max-w-sm mx-auto'
                      : 'grid-cols-3 max-w-5xl mx-auto'
                  }`}
                >
                  {visibleMembers.map((member, index) => (
                    <TeamCard
                      key={`${yearSection}-${member.name}-${index}`}
                      member={member}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              {totalSlides > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(yearSection, i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'w-6 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-md'
                          : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
};

export default TeamSlider;