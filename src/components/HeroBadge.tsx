import { motion } from 'framer-motion';

export const HeroBadge = () => (
  <motion.div
    className="flex justify-center mb-6"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-semibold border"
      style={{
        color: 'rgba(96,165,250,0.7)',
        borderColor: 'rgba(96,165,250,0.15)',
        background: 'rgba(96,165,250,0.05)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#60a5fa' }} />
      Departmental Club of Mechanical Engineering
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#60a5fa' }} />
    </span>
  </motion.div>
);

export default HeroBadge;