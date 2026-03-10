// components/GalleryPhoto.tsx
import { motion } from 'framer-motion';

export type GalleryItem = {
  src: string;
  caption: string;
  rotate: number;
  col: string;
  row: string;
};

export const GalleryPhoto = ({ item, index }: { item: GalleryItem; index: number }) => (
  <motion.div
    className={`${item.col} ${item.row} relative group cursor-pointer`}
    initial={{ opacity: 0, y: 30, rotate: item.rotate }}
    whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: index * 0.055, ease: 'easeOut' }}
    whileHover={{ rotate: 0, scale: 1.03, zIndex: 50, transition: { duration: 0.3 } }}
    style={{ zIndex: 1 }}
  >
    <div
      className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.55), rgba(96,165,250,0.35))',
        filter: 'blur(8px)',
      }}
    />
    <div
      className="relative h-full rounded-lg overflow-hidden"
      style={{
        border: '5px solid rgba(255,255,255,0.07)',
        outline: '1px solid rgba(99,102,241,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        transition: 'outline-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.outlineColor = 'rgba(99,102,241,0.6)';
        el.style.boxShadow = '0 16px 48px rgba(99,102,241,0.22), 0 4px 24px rgba(0,0,0,0.6)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.outlineColor = 'rgba(99,102,241,0.15)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
      }}
    >
      <img
        src={item.src}
        alt={item.caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, pi) => (
        <div key={pi} className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
          style={{ background: 'rgba(165,180,252,0.25)', boxShadow: '0 0 4px rgba(99,102,241,0.4)' }} />
      ))}

      <div
        className="absolute top-3 left-3 text-[10px] font-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"
        style={{ fontFamily: "'Orbitron', sans-serif", color: '#818cf8' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-indigo-400" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#c7d2fe', fontFamily: "'DM Sans', sans-serif" }}>
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);