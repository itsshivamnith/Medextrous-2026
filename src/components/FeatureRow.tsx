import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Wrench, Users } from 'lucide-react';

const iconMap = { Calendar, Wrench, Users };

interface FeatureRowProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  num: string;
  index: number;
  isLast: boolean;
}

export const FeatureRow = ({ title, description, icon, link, num, index, isLast }: FeatureRowProps) => {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={link}
        className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 md:py-7 md:px-6 rounded-2xl md:rounded-none overflow-hidden transition-all duration-400"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(96,165,250,0.1)',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, rgba(96,165,250,0.07) 0%, rgba(99,102,241,0.04) 60%, transparent 100%)',
          }}
        />
        <div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-gradient-to-b from-blue-400/0 via-blue-400 to-blue-400/0 transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{ height: '65%' }}
        />
        <span
          className="absolute top-4 right-4 md:static md:flex-shrink-0 text-xs font-black tabular-nums md:w-8"
          style={{ fontFamily: "'Orbitron', sans-serif", color: 'rgba(96,165,250,0.25)' }}
        >
          {num}
        </span>
        <div
          className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.25)]"
          style={{ border: '1px solid rgba(96,165,250,0.2)', background: 'rgba(96,165,250,0.06)' }}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#60a5fa' }} />
        </div>
        <div className="flex-1 min-w-0 pr-8 md:pr-0">
          <h3
            className="text-base md:text-xl font-black tracking-wide mb-1 text-white/80 group-hover:text-white transition-colors duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {title}
          </h3>
          <p
            className="text-xs md:text-sm text-white/35 group-hover:text-white/50 transition-colors duration-300 leading-relaxed max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {description}
          </p>
        </div>
        <div
          className="self-start md:self-auto flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-400 group-hover:border-blue-400/50 group-hover:text-blue-200 group-hover:bg-blue-400/10"
          style={{
            color: 'rgba(96,165,250,0.5)',
            borderColor: 'rgba(96,165,250,0.15)',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Explore
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
      {!isLast && (
        <div
          className="hidden md:block w-full h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.12), transparent)' }}
        />
      )}
    </motion.div>
  );
};

export default FeatureRow;