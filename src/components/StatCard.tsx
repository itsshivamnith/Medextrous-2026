import { motion } from 'framer-motion';
import { Counter } from '@/components/Counter';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  index: number;
}

const ACCENTS = ['#6366f1', '#818cf8', '#60a5fa', '#a78bfa'];
const GLOWS = [
  'rgba(99,102,241,0.15)',
  'rgba(129,140,248,0.15)',
  'rgba(96,165,250,0.15)',
  'rgba(167,139,250,0.15)',
];

export const StatCard = ({ label, value, suffix, index }: StatCardProps) => {
  const color = ACCENTS[index % ACCENTS.length];
  const glow = GLOWS[index % GLOWS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group"
    >
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
        <motion.div
          className="absolute top-0 left-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
          initial={{ width: '0%', left: '50%' }}
          whileInView={{ width: '100%', left: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
        />
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
          {suffix || '#'}
        </div>
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
            <motion.circle
              cx="48" cy="48" r="42" fill="none" stroke={color}
              strokeWidth="2" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * 0.15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: index * 0.12 + 0.2, ease: 'easeOut' }}
              style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
          </svg>
          <div className="relative flex flex-col items-center">
            <span
              className="text-3xl md:text-4xl font-black leading-none"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color,
                textShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
              }}
            >
              <Counter value={value} suffix={suffix} />
            </span>
          </div>
        </div>
        <span
          className="text-xs tracking-[0.3em] uppercase font-semibold"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${glow}, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;