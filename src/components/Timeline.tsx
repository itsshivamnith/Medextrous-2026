import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Star } from 'lucide-react';

const achievements = [
  { title: '2nd Runner Up', event: 'NIMBUS 2025', icon: Trophy, tier: 'silver' },
  { title: 'Best Project Execution', event: 'NIMBUS 2023', icon: Trophy, tier: 'gold' },
  { title: 'Best Project Execution', event: 'NIMBUS 2021', icon: Trophy, tier: 'gold' },
  { title: 'Best Event Award',       event: 'NIMBUS 2019', icon: Award,  tier: 'silver' },
  { title: 'Best Departmental Team', event: 'NIMBUS 2018', icon: Medal,  tier: 'gold' },
  { title: 'Best Event Award',       event: 'NIMBUS 2016', icon: Award,  tier: 'silver' },
  { title: 'Best Event Award',       event: 'NIMBUS 2015', icon: Award,  tier: 'silver' },
  { title: 'Best Event Award',       event: 'NIMBUS 2014', icon: Award,  tier: 'silver' },
  { title: 'Best Departmental Team', event: 'NIMBUS 2012', icon: Medal,  tier: 'gold' },
  { title: 'Best Departmental Team', event: 'NIMBUS 2011', icon: Medal,  tier: 'gold' },
  { title: 'Best Departmental Team', event: 'NIMBUS 2010', icon: Medal,  tier: 'gold' },
];

const Timeline = () => {
  return (
    <div>

      {/* ── Section Heading ── */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-500/50" />
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: '#fbbf24' }}>
            Achievements
          </span>
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-500/50" />
        </div>

        <h2
          className="text-4xl md:text-6xl font-black tracking-tight text-center"
          style={{
            WebkitTextStroke: '1.5px #92400e',
            color: '#fbbf24',
            textShadow: '0 0 30px rgba(251,191,36,0.25), 0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Our Achievements
        </h2>

        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-yellow-400/40 rounded" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-16 h-px bg-gradient-to-r from-yellow-400/60 to-amber-400/60 rounded" />
          <div className="w-2 h-2 rounded-full bg-amber-400/60" />
          <div className="w-8 h-px bg-amber-400/40 rounded" />
        </div>
      </motion.div>

      {/* ── Timeline style list ── */}
      <div className="relative">

        {/* Center vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent md:-translate-x-px" />

        <div className="flex flex-col gap-10">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            const isGold = item.tier === 'gold';
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card */}
                <div className={`flex-1 pl-12 md:pl-0 ${
                  isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block max-w-md w-full"
                  >
                    <div className={`
                      relative rounded-2xl border p-5 overflow-hidden
                      backdrop-blur-xl transition-all duration-300
                      ${isGold
                        ? 'border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/10'
                        : 'border-blue-400/25 hover:border-blue-400/45 hover:shadow-lg hover:shadow-blue-500/10'
                      }
                    `}
                    style={{
                      background: isGold
                        ? 'linear-gradient(135deg, rgba(120,53,15,0.2) 0%, rgba(15,15,30,0.92) 60%)'
                        : 'linear-gradient(135deg, rgba(30,58,138,0.2) 0%, rgba(15,15,30,0.92) 60%)',
                    }}
                    >
                      {/* Top shimmer */}
                      <div className={`absolute top-0 left-4 right-4 h-px ${
                        isGold
                          ? 'bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent'
                      }`} />

                      {/* Corner glow */}
                      <div
                        className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-15"
                        style={{ background: isGold ? '#f59e0b' : '#3b82f6' }}
                      />

                      <div className={`flex items-center gap-3 mb-2 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}>
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                          ${isGold
                            ? 'bg-yellow-500/15 border border-yellow-500/30'
                            : 'bg-blue-500/15 border border-blue-400/30'
                          }
                        `}>
                          <Icon className={`w-4 h-4 ${isGold ? 'text-yellow-400' : 'text-blue-400'}`} />
                        </div>
                        <span className={`font-black text-xl ${isGold ? 'text-yellow-400' : 'text-blue-400'}`}
                          style={{
                            WebkitTextStroke: isGold ? '1px #92400e' : '1px #1d4ed8',
                            textShadow: isGold
                              ? '0 0 12px rgba(251,191,36,0.3)'
                              : '0 0 12px rgba(96,165,250,0.3)',
                          }}
                        >
                          {item.event}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Dot */}
                <div className={`
                  absolute left-4 md:left-1/2 -translate-x-1/2 z-10 mt-3
                  w-3 h-3 rounded-full ring-4 ring-slate-900
                  ${isGold
                    ? 'bg-yellow-400 shadow-md shadow-yellow-400/50'
                    : 'bg-blue-400 shadow-md shadow-blue-400/50'
                  }
                `} />

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Timeline;