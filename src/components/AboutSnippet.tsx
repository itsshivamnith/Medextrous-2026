import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeading } from '@/components/PageHeading';

const sections = [
  {
    tag: 'Our History',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.15)',
    border: 'rgba(96,165,250,0.3)',
    paragraphs: [
      "Team MEDextrous represents the Department of Mechanical Engineering, NIT Hamirpur in NIMBUS, the college's annual technical fest, since 2010. The team plays a pivotal role in NIMBUS, believing that excellence is an art won by training and habituation.",
      "MEDextrous has been organizing events that involve leveraging the basics of engineering to make efficient use of available resources. It provides a platform for brilliant minds to showcase their innovative ideas.",
    ],
  },
  {
    tag: 'Our Vision',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.15)',
    border: 'rgba(34,211,238,0.3)',
    paragraphs: [
      "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice. And when there is a will, there is a way.",
      "We strive to transform engineering concepts into real-world applications, shaping the future with innovation and excellence in every project we undertake.",
    ],
  },
];

export const AboutSnippet = () => (
  <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>

    {/* Background orbs */}
    <div style={{
      position: 'absolute', top: '30%', left: '20%',
      width: 400, height: 300, borderRadius: '50%',
      background: 'rgba(79,70,229,0.06)', filter: 'blur(100px)', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: '20%', right: '15%',
      width: 300, height: 200, borderRadius: '50%',
      background: 'rgba(34,211,238,0.04)', filter: 'blur(80px)', pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>

      <PageHeading title="About Us" />

      {/* Cards grid */}
      <div
        className="about-snippet-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}
      >
        <style>{`
          @media (max-width: 768px) {
            .about-snippet-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {sections.map((section, si) => (
          <motion.div
            key={section.tag}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: si * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            style={{
              borderRadius: 24,
              border: '1px solid rgba(71,85,105,0.4)',
              background: 'linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,41,59,0.6), rgba(2,6,23,0.95))',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top shimmer sweep */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: si * 0.15 + 0.2 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(to right, transparent, ${section.color}, transparent)`,
                transformOrigin: 'left',
                opacity: 0.5,
              }}
            />

            {/* Animated corner — top left */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              whileInView={{ width: 36, height: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.15 + 0.3 }}
              style={{
                position: 'absolute', top: 0, left: 0,
                borderTop: `1.5px solid ${section.color}80`,
                borderLeft: `1.5px solid ${section.color}80`,
                borderRadius: '24px 0 0 0',
              }}
            />

            {/* Animated corner — bottom right */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              whileInView={{ width: 36, height: 36 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.15 + 0.35 }}
              style={{
                position: 'absolute', bottom: 0, right: 0,
                borderBottom: `1.5px solid ${section.color}80`,
                borderRight: `1.5px solid ${section.color}80`,
                borderRadius: '0 0 24px 0',
              }}
            />

            {/* Hover glow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at top left, ${section.glow}, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Card content */}
            <div style={{ padding: '2rem' }}>

              {/* Tag row */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: si * 0.15 + 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}
              >
                {/* Pulsing dot */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: si * 0.5 }}
                  style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: section.color,
                    boxShadow: `0 0 8px ${section.color}, 0 0 16px ${section.glow}`,
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontWeight: 700, color: section.color,
                  padding: '3px 10px', borderRadius: 999,
                  border: `1px solid ${section.border}`,
                  background: section.glow,
                }}>
                  {section.tag}
                </span>
              </motion.div>

              {/* Paragraphs */}
              <div style={{ paddingLeft: '1rem', borderLeft: `2px solid ${section.border}` }}>
                {section.paragraphs.map((para, pi) => (
                  <motion.p
                    key={pi}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: si * 0.15 + pi * 0.12 + 0.3 }}
                    style={{
                      color: pi === 0 ? 'rgba(203,213,225,0.85)' : 'rgba(148,163,184,0.65)',
                      fontSize: '0.88rem',
                      lineHeight: 1.9,
                      margin: pi > 0 ? '0.75rem 0 0' : 0,
                      textAlign: 'justify',
                    }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Bottom shimmer */}
            <div style={{
              position: 'absolute', bottom: 0, left: 24, right: 24, height: 1,
              background: 'linear-gradient(to right, transparent, rgba(71,85,105,0.2), transparent)',
            }} />
          </motion.div>
        ))}
      </div>

      {/* Explore button — below cards, full width */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Link
          to="/about"
          className="group relative flex items-center gap-4 md:gap-8 py-5 px-6 overflow-hidden transition-all duration-400"
          style={{
            borderRadius: 16,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(96,165,250,0.1)',
            textDecoration: 'none',
            display: 'flex',
          }}
        >
          {/* Hover background sweep */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, rgba(96,165,250,0.07) 0%, rgba(99,102,241,0.04) 60%, transparent 100%)',
            }}
          />

          {/* Left blue accent line on hover */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-gradient-to-b from-blue-400/0 via-blue-400 to-blue-400/0 transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{ height: '65%' }}
          />

          {/* Icon box */}
          <div
            className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.25)]"
            style={{
              border: '1px solid rgba(96,165,250,0.2)',
              background: 'rgba(96,165,250,0.06)',
            }}
          >
            <ArrowRight className="w-5 h-5" style={{ color: '#60a5fa' }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              className="text-base md:text-lg font-black tracking-wide mb-0.5 text-white/80 group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Our Full Story
            </h3>
            <p
              className="text-xs text-white/35 group-hover:text-white/50 transition-colors duration-300 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Mechanical Engineering Club · NIT Hamirpur
            </p>
          </div>

          {/* Explore pill */}
          <div
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-400 group-hover:border-blue-400/50 group-hover:text-blue-200 group-hover:bg-blue-400/10"
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
      </motion.div>

    </div>
  </section>
);

export default AboutSnippet;