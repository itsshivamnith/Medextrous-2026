import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
}

const COLORS = [
  'rgba(96, 165, 250,',   // blue-400
  'rgba(147, 197, 253,',  // blue-300
  'rgba(34, 211, 238,',   // cyan-400
  'rgba(59, 130, 246,',   // blue-500
  'rgba(186, 230, 253,',  // blue-200
];

const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -200, y: -200 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Spawn 3 particles per move
      for (let i = 0; i < 3; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          alpha: 1,
          size: Math.random() * 5 + 2,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          color,
        });
      }

      // Cap particles
      if (particles.current.length > 120) {
        particles.current = particles.current.slice(-120);
      }
    };

    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cursor dot
      const grd = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 10
      );
      grd.addColorStop(0, 'rgba(147, 197, 253, 0.95)');
      grd.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(186, 230, 253, 1)';
      ctx.fill();

      // Draw & update particles
      particles.current = particles.current.filter(p => p.alpha > 0.02);

      for (const p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.alpha * 2);
        glow.addColorStop(0, `${p.color} ${p.alpha})`);
        glow.addColorStop(1, `${p.color} 0)`);
        ctx.fillStyle = glow;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.88;
        p.size *= 0.97;
      }

      animFrame.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Cursor;