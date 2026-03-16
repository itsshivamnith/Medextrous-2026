// components/AboutSnippet.tsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeading } from '@/components/PageHeading';
import logo1 from '../../public/assets/logo1.png';

// ─── Responsive styles injected once ─────────────────────────────────────────
const styles = `
  .about-section {
    padding: 5rem 0;
    position: relative;
    overflow: hidden;
  }
  .about-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .about-visual-col {
      order: -1;
    }
    .about-visual-wrap {
      max-width: 320px !important;
      margin: 0 auto;
    }
    .about-title {
      font-size: clamp(2rem, 8vw, 3rem) !important;
    }
  }
  @media (max-width: 480px) {
    .about-section { padding: 3.5rem 0; }
    .about-inner { padding: 0 1rem; }
    .about-grid { gap: 2rem; }
    .about-visual-wrap {
      max-width: 280px !important;
    }
    .about-stats { gap: 1.25rem !important; }
  }

  /* CTA button */
  .about-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 14px 26px;
    border-radius: 14px;
    border: 1px solid rgba(96,165,250,0.22);
    background: rgba(96,165,250,0.05);
    color: rgba(148,187,252,0.85);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s, border-color 0.35s, box-shadow 0.35s;
  }
  .about-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(115deg, rgba(96,165,250,0.1), rgba(99,102,241,0.07));
    opacity: 0;
    transition: opacity 0.35s;
  }
  .about-cta:hover::before { opacity: 1; }
  .about-cta:hover {
    color: #bfdbfe;
    border-color: rgba(96,165,250,0.5);
    box-shadow: 0 0 32px rgba(96,165,250,0.18), 0 8px 28px rgba(0,0,0,0.35);
  }
  .about-cta .cta-icon {
    display: flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid rgba(96,165,250,0.25);
    background: rgba(96,165,250,0.08);
    transition: transform 0.3s, background 0.3s;
    flex-shrink: 0; position: relative; z-index: 1;
  }
  .about-cta:hover .cta-icon {
    transform: translateX(5px);
    background: rgba(96,165,250,0.18);
  }
  .cta-text { position: relative; z-index: 1; }

  /* Divider between stats */
  .stat-divider {
    width: 1px;
    height: 36px;
    background: linear-gradient(to bottom, transparent, rgba(96,165,250,0.2), transparent);
  }
`;

// ─── 3D Blueprint Visual ──────────────────────────────────────────────────────
const BlueprintVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [20, -20]), {
    stiffness: 160, damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-20, 20]), {
    stiffness: 160, damping: 24,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      className="about-visual-wrap relative w-full flex items-center justify-center"
      style={{ minHeight: 340, perspective: '1000px', maxWidth: 400 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ambient glow orbs — non-interactive */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)', filter: 'blur(30px)' }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 180, height: 180, background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)', filter: 'blur(20px)', transform: 'translate(40px, 30px)' }} />

      {/* 3D tilt container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: 320, height: 320 }}
        className="relative flex items-center justify-center"
      >
        <div style={{ width: 320, height: 320, position: 'relative', transformStyle: 'preserve-3d' }}>

          {/* Layer 1 — outermost card panel (deepest) */}
          <motion.div
            className="absolute inset-0 rounded-[40px]"
            style={{
              background: 'radial-gradient(ellipse at 48% 42%, rgba(25,52,90,0.6), rgba(10,16,38,0.95))',
              border: '1px solid rgba(96,165,250,0.1)',
              transform: 'translateZ(-36px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          />

          {/* Layer 2 — outer dashed orbit (slow clockwise) */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 268, height: 268,
              top: '50%', left: '50%',
              marginTop: -134, marginLeft: -134,
              border: '1px dashed rgba(96,165,250,0.18)',
              transform: 'translateZ(-18px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          />

          {/* Layer 3 — main large glowing circle */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 226, height: 226,
              top: '50%', left: '50%',
              marginTop: -113, marginLeft: -113,
              background: 'radial-gradient(ellipse at 40% 36%, rgba(59,130,246,0.48), rgba(30,58,138,0.28))',
              transform: 'translateZ(-8px)',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22,1,0.36,1] }}
          />

          {/* Layer 4 — inner counter-orbit */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 158, height: 158,
              top: '50%', left: '50%',
              marginTop: -79, marginLeft: -79,
              border: '1px dashed rgba(99,102,241,0.22)',
              transform: 'translateZ(0px)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />

          {/* Layer 5 — accent glow dots */}
          <div className="absolute rounded-full"
            style={{ width: 10, height: 10, top: 30, left: 46, background: 'rgba(129,140,248,0.75)', transform: 'translateZ(10px)', boxShadow: '0 0 10px rgba(129,140,248,0.9), 0 0 20px rgba(99,102,241,0.5)' }} />
          <div className="absolute rounded-full"
            style={{ width: 7, height: 7, bottom: 48, left: 26, background: 'rgba(96,165,250,0.65)', transform: 'translateZ(10px)', boxShadow: '0 0 8px rgba(96,165,250,0.8)' }} />
          <div className="absolute rounded-full"
            style={{ width: 5, height: 5, top: 58, right: 52, background: 'rgba(165,180,252,0.5)', transform: 'translateZ(10px)', boxShadow: '0 0 6px rgba(165,180,252,0.7)' }} />

          {/* Layer 5 — corner brackets */}
          <div className="absolute pointer-events-none"
            style={{ top: 18, left: 18, width: 26, height: 26, borderTop: '1.5px solid rgba(96,165,250,0.55)', borderLeft: '1.5px solid rgba(96,165,250,0.55)', borderRadius: '10px 0 0 0', transform: 'translateZ(12px)' }} />
          <div className="absolute pointer-events-none"
            style={{ bottom: 18, right: 18, width: 26, height: 26, borderBottom: '1.5px solid rgba(99,102,241,0.5)', borderRight: '1.5px solid rgba(99,102,241,0.5)', borderRadius: '0 0 10px 0', transform: 'translateZ(12px)' }} />
          <div className="absolute pointer-events-none"
            style={{ top: 18, right: 18, width: 16, height: 16, borderTop: '1px solid rgba(96,165,250,0.3)', borderRight: '1px solid rgba(96,165,250,0.3)', borderRadius: '0 10px 0 0', transform: 'translateZ(12px)' }} />
          <div className="absolute pointer-events-none"
            style={{ bottom: 18, left: 18, width: 16, height: 16, borderBottom: '1px solid rgba(99,102,241,0.3)', borderLeft: '1px solid rgba(99,102,241,0.3)', borderRadius: '0 0 0 10px', transform: 'translateZ(12px)' }} />

          {/* Layer 6 — MEDEXTROUS watermark */}
          <div className="absolute pointer-events-none"
            style={{
              bottom: 56, left: 0, right: 0, textAlign: 'center',
              fontSize: 7, letterSpacing: '0.42em', color: 'rgba(165,180,252,0.25)',
              fontFamily: "'Orbitron', sans-serif",
              transform: 'translateZ(12px)',
            }}>
            MEDEXTROUS
          </div>

          {/* Layer 7 — pulsing glow ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 124, height: 124,
              top: '50%', left: '50%',
              marginTop: -62, marginLeft: -62,
              transform: 'translateZ(22px)',
              borderRadius: '50%',
            }}
            animate={{
              boxShadow: [
                '0 0 0 2px rgba(99,102,241,0.28), 0 0 24px rgba(96,165,250,0.18), 0 0 0px rgba(96,165,250,0)',
                '0 0 0 2.5px rgba(99,102,241,0.7), 0 0 48px rgba(96,165,250,0.5), 0 0 80px rgba(99,102,241,0.2)',
                '0 0 0 2px rgba(99,102,241,0.28), 0 0 24px rgba(96,165,250,0.18), 0 0 0px rgba(96,165,250,0)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Layer 8 — outer rotating ring around logo */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 130, height: 130,
              top: '50%', left: '50%',
              marginTop: -65, marginLeft: -65,
              border: '1.5px solid rgba(96,165,250,0.35)',
              borderTopColor: 'rgba(99,102,241,0.7)',
              borderRightColor: 'rgba(96,165,250,0.2)',
              transform: 'translateZ(26px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Layer 8b — inner counter-rotating ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 122, height: 122,
              top: '50%', left: '50%',
              marginTop: -61, marginLeft: -61,
              border: '1px dashed rgba(165,180,252,0.25)',
              transform: 'translateZ(27px)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />

          {/* Layer 9 — logo1.png — centered with margin, 3D hover lift */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 108, height: 108,
              top: '50%', left: '50%',
              marginTop: -54, marginLeft: -54,
              transform: 'translateZ(34px)',
              padding: 4,
              background: 'radial-gradient(135deg, rgba(99,102,241,0.35), rgba(59,130,246,0.2))',
              boxShadow: '0 0 0 1.5px rgba(99,102,241,0.4)',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            whileHover={{
              scale: 1.18,
              z: 60,
              boxShadow: '0 0 0 2px rgba(96,165,250,0.9), 0 0 40px rgba(96,165,250,0.6), 0 20px 50px rgba(0,0,0,0.5)',
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* actual logo image with margin via padding on parent */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={logo1}
                alt="MEDextrous Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '50%' }}
              />
            </div>
            {/* gloss overlay */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.1), transparent 60%)' }} />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

// ─── AboutSnippet ─────────────────────────────────────────────────────────────
export const AboutSnippet = () => (
  <section className="about-section">
    <style>{styles}</style>

    {/* bg atmosphere */}
    <div className="absolute pointer-events-none"
      style={{ top: '20%', left: '-5%', width: 520, height: 400, borderRadius: '50%', background: 'rgba(59,130,246,0.04)', filter: 'blur(120px)' }} />
    <div className="absolute pointer-events-none"
      style={{ bottom: '5%', right: '-5%', width: 420, height: 320, borderRadius: '50%', background: 'rgba(99,102,241,0.05)', filter: 'blur(100px)' }} />

    <div className="about-inner relative">
      <PageHeading title="About Us" />

      <div className="about-grid">

        {/* ── LEFT: text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* title */}
          <h2
            className="about-title font-black tracking-tight leading-[1.08] mb-7"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}
          >
            <span style={{ color: 'rgba(224,231,255,0.92)' }}>Team</span>
            <br />
            <span style={{
              background: 'linear-gradient(110deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              MEDextrous
            </span>
          </h2>

          {/* para 1 */}
          <motion.p
            className="text-justify mb-5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              lineHeight: 1.95,
              color: 'rgba(203,213,225,0.72)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Since 2010, Team MEDextrous has proudly represented NIT Hamirpur's Department of
            Mechanical Engineering at NIMBUS — the college's annual technical fest. We believe
            excellence is an art won by training, habituation, and the relentless drive to push
            engineering beyond its known limits.
          </motion.p>

          {/* para 2 */}
          <motion.p
            className="text-justify mb-10"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              lineHeight: 1.95,
              color: 'rgba(148,163,184,0.6)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            Our vision is to transform engineering concepts into impactful real-world applications —
            creating a platform where brilliant minds showcase innovative ideas, and the willingness
            to learn becomes the foundation for lasting excellence and meaningful impact.
          </motion.p>

          {/* stats row */}
          <motion.div
            className="about-stats flex items-center mb-10"
            style={{ gap: '1.75rem' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.42 }}
          >
            {[
              { value: '14+', label: 'Years Active' },
              { value: 'NIMBUS', label: 'Annual Fest' },
              { value: 'NIT-H', label: 'Campus' },
            ].map((s, i) => (
              <>
                {i > 0 && <div key={`div-${i}`} className="stat-divider" />}
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      background: 'linear-gradient(120deg, #e0e7ff, #a5b4fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >{s.value}</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(148,163,184,0.4)',
                    }}
                  >{s.label}</span>
                </div>
              </>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.52 }}
          >
            <Link to="/about" className="about-cta">
              <span className="cta-text">Discover Our Story</span>
              <span className="cta-icon"><ArrowRight size={14} /></span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D visual ── */}
        <motion.div
          className="about-visual-col flex items-center justify-center"
          initial={{ opacity: 0, x: 36, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <BlueprintVisual />
        </motion.div>

      </div>
    </div>
  </section>
);

export default AboutSnippet;

