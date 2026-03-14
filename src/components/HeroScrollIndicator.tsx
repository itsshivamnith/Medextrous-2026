import { motion } from 'framer-motion';

export const HeroScrollIndicator = () => (
  <motion.div
    className="mt-20 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
  >
    <span
      className="text-[9px] tracking-[0.4em] uppercase"
      style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Sans', sans-serif" }}
    >
      scroll
    </span>
    <motion.div
      className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <motion.div
        className="w-1 h-1.5 rounded-full"
        style={{ background: 'rgba(96,165,250,0.6)' }}
        animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  </motion.div>
);

export default HeroScrollIndicator;