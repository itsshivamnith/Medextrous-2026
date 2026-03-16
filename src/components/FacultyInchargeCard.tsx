// components/FacultyInchargeCard.tsx
import { motion } from 'framer-motion';
import { Linkedin, MapPin, BookOpen, Mail } from 'lucide-react';

interface FacultyInchargeCardProps {
  name: string;
  designation: string;
  department: string;
  email?: string;
  linkedin?: string;
  image: string;
  delay?: number;
}

export const FacultyInchargeCard = ({
  name, designation, department, email, linkedin, image, delay = 0,
}: FacultyInchargeCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -8 }}
    className="relative group w-[340px]"
  >
    {/* amber glow on hover */}
    <div
      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"
      style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(99,102,241,0.2))' }}
    />

    <div
      className="relative rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
    >
      {/* ── large rectangular image ── */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* gradient fade from bottom so name is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-[#07060f]/40 to-transparent" />

      

        {/* name overlaid at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
          <h3
            className="text-2xl font-black tracking-wide leading-tight"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: '#e0e7ff',
              textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 0 30px rgba(251,191,36,0.15)',
            }}
          >
            {name}
          </h3>
        </div>
      </div>

      {/* ── info + links below image ── */}
      <div className="px-6 pt-4 pb-6">

        {/* designation + department */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#fbbf24' }} />
            <span className="text-xs text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {designation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#6366f1' }} />
            <span className="text-xs text-white/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {department} · NIT Hamirpur
            </span>
          </div>
        </div>

        <div
          className="w-full h-px mb-5"
          style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.3), transparent)' }}
        />

        {/* action links */}
        <div className="flex items-center gap-3">
          {email && (
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-xs font-medium transition-all duration-300"
              style={{ color: '#fde68a', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(251,191,36,0.10)';
                el.style.borderColor = 'rgba(251,191,36,0.4)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </motion.a>
          )}
          {linkedin && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
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
        </div>
      </div>
    </div>
  </motion.div>
);

