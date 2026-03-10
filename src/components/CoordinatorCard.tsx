// components/CoordinatorCard.tsx
import { motion } from 'framer-motion';
import { Linkedin, Instagram, MapPin, GraduationCap } from 'lucide-react';

interface CoordinatorCardProps {
  name: string;
  role: string;
  branch: string;
  year: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  delay?: number;
}

export const CoordinatorCard = ({
  name, role, branch, year, image, linkedin, instagram, delay = 0,
}: CoordinatorCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -8 }}
    className="relative group w-[340px]"
  >
    <div
      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"
      style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(96,165,250,0.2))' }}
    />

    <div
      className="relative rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
    >
      {/* portrait */}
      <div className="relative w-full h-80 overflow-hidden">
        <img src={image} alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-[#07060f]/30 to-transparent" />
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] tracking-[0.22em] uppercase font-semibold px-3 py-1.5 rounded-full border"
            style={{
              color: '#a5b4fc',
              borderColor: 'rgba(99,102,241,0.35)',
              background: 'rgba(15,12,40,0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {role}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="px-7 pt-5 pb-7">
        <h3
          className="text-2xl font-black tracking-wide mb-3"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#e0e7ff',
            textShadow: '0 0 20px rgba(165,180,252,0.2)',
          }}
        >
          {name}
        </h3>

        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6366f1' }} />
            <span className="text-xs text-white/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>{branch}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6366f1' }} />
            <span className="text-xs text-white/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>NIT Hamirpur · {year}</span>
          </div>
        </div>

        <div className="w-full h-px mb-6"
          style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.3), transparent)' }} />

        <div className="flex items-center gap-3">
          {linkedin && (
            <motion.a
              href={linkedin} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-xs font-medium transition-all duration-300"
              style={{ color: '#818cf8', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(99,102,241,0.12)';
                el.style.borderColor = 'rgba(99,102,241,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </motion.a>
          )}
          {instagram && (
            <motion.a
              href={instagram} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-xs font-medium transition-all duration-300"
              style={{ color: '#f0abfc', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(217,70,239,0.10)';
                el.style.borderColor = 'rgba(217,70,239,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </motion.a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);