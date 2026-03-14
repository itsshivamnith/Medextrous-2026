import { motion } from 'framer-motion';

export const HeroLogos = () => (
  <motion.div
    className="flex items-center justify-center gap-8 mb-12"
    initial={{ opacity: 0, y: -24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Logo 1 — MEDextrous */}
    <motion.a
      href="/"
      target="_self"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <div
        className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.18) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(96,165,250,0.4) 60deg, transparent 120deg)',
          borderRadius: '18px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-400"
        style={{
          border: '1px solid rgba(96,165,250,0.25)',
          background: 'rgba(10,15,30,0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(96,165,250,0.08)',
        }}
      >
        <img
          src="/assets/logo1.png"
          alt="MEDextrous logo"
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-400 group-hover:scale-110 group-hover:brightness-125"
        />
      </div>
      <span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-70 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
        style={{ color: '#60a5fa', fontFamily: "'DM Sans', sans-serif" }}
      >
        MEDextrous
      </span>
    </motion.a>

    {/* Divider */}
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ background: 'rgba(99,102,241,0.5)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.div
        className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
    </div>

    {/* Logo 2 — NIT Hamirpur */}
    <motion.a
      href="https://festnimbus.nith.ac.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <div
        className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: 'conic-gradient(from 180deg, transparent 0deg, rgba(129,140,248,0.4) 60deg, transparent 120deg)',
          borderRadius: '18px',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-400"
        style={{
          border: '1px solid rgba(99,102,241,0.25)',
          background: 'rgba(10,15,30,0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
        }}
      >
        <img
          src="/assets/logo2.png"
          alt="NIT Hamirpur logo"
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-400 group-hover:scale-110 group-hover:brightness-125"
        />
      </div>
      <span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-70 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
        style={{ color: '#818cf8', fontFamily: "'DM Sans', sans-serif" }}
      >
    NIMBUS 2026
      </span>
    </motion.a>
  </motion.div>
);

export default HeroLogos;