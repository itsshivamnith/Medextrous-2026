// Team.tsx
import { motion } from 'framer-motion';
import TeamSlider from '@/components/TeamSlider';

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const Team = () => {
  return (
    <motion.div {...pageTransition} className="pt-6 pb-20">
      <div className="container mx-auto px-4">

        {/* PageHeading */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-16"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: '#60a5fa' }}>
              Medextrous
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight text-center"
            style={{
              WebkitTextStroke: '1.5px #1d4ed8',
              color: '#60a5fa',
              textShadow: '0 0 30px rgba(96,165,250,0.25), 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            Our Team
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-blue-400/40 rounded" />
            <div className="w-2 h-2 rounded-full bg-blue-400/60" />
            <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded" />
            <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
            <div className="w-8 h-px bg-cyan-400/40 rounded" />
          </div>
          <motion.p
            className="text-sm text-slate-400 max-w-lg mx-auto text-center mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Meet the passionate engineers driving innovation at Medextrous.
          </motion.p>
        </motion.div>

        <TeamSlider />
      </div>
    </motion.div>
  );
};

export default Team;