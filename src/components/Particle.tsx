import { motion } from 'framer-motion';

interface ParticleProps {
  delay: number;
  x: string;
  size: number;
  duration: number;
}

export const Particle = ({ delay, x, size, duration }: ParticleProps) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      background: 'radial-gradient(circle, rgba(96,165,250,0.6) 0%, transparent 70%)',
      filter: 'blur(1px)',
    }}
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.6, 0.6, 0] }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 4 + 2,
      ease: 'linear',
    }}
  />
);

export default Particle;