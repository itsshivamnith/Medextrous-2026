// components/GalleryPhoto.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export type GalleryItem = {
  src: string;
  caption: string;
  rotate: number;
};

// ─── Unique per-tile style configs (10 tiles) ────────────────────────────────
const TILE_STYLES = [
  { accent: "#60a5fa", label: "blue",   glow: "rgba(96,165,250,0.35)"  },
  { accent: "#a78bfa", label: "violet", glow: "rgba(167,139,250,0.35)" },
  { accent: "#34d399", label: "emerald",glow: "rgba(52,211,153,0.35)"  },
  { accent: "#f472b6", label: "pink",   glow: "rgba(244,114,182,0.35)" },
  { accent: "#fbbf24", label: "amber",  glow: "rgba(251,191,36,0.35)"  },
  { accent: "#38bdf8", label: "sky",    glow: "rgba(56,189,248,0.35)"  },
  { accent: "#fb7185", label: "rose",   glow: "rgba(251,113,133,0.35)" },
  { accent: "#a3e635", label: "lime",   glow: "rgba(163,230,53,0.35)"  },
  { accent: "#e879f9", label: "fuchsia",glow: "rgba(232,121,249,0.35)" },
  { accent: "#2dd4bf", label: "teal",   glow: "rgba(45,212,191,0.35)"  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
const Lightbox = ({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  const style = TILE_STYLES[index % TILE_STYLES.length];

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ background: "rgba(4,2,18,0.92)", backdropFilter: "blur(20px)" }}
    >
      {/* glow behind image */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: style.accent }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl"
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* image */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            maxHeight: "75vh",
            border: `1px solid ${style.accent}30`,
            boxShadow: `0 0 60px ${style.glow}, 0 40px 80px rgba(0,0,0,0.7)`,
          }}
        >
          <img
            src={items[index].src}
            alt={items[index].caption}
            className="w-full h-full object-contain"
            style={{ maxHeight: "75vh", background: "#000" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/image.png"; }}
          />
          {/* corner accent lines */}
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none" style={{ borderTop: `2px solid ${style.accent}`, borderLeft: `2px solid ${style.accent}`, borderRadius: "8px 0 0 0" }} />
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{ borderTop: `2px solid ${style.accent}`, borderRight: `2px solid ${style.accent}`, borderRadius: "0 8px 0 0" }} />
          <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" style={{ borderBottom: `2px solid ${style.accent}`, borderLeft: `2px solid ${style.accent}`, borderRadius: "0 0 0 8px" }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none" style={{ borderBottom: `2px solid ${style.accent}`, borderRight: `2px solid ${style.accent}`, borderRadius: "0 0 8px 0" }} />
        </div>

        {/* caption + counter */}
        <div className="mt-4 flex items-center justify-between w-full px-1">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: style.accent, fontFamily: "'DM Sans', sans-serif" }}>
            {items[index].caption}
          </p>
          <span className="text-xs tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', sans-serif" }}>
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {/* nav buttons */}
        <div className="flex items-center gap-4 mt-5">
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={onPrev}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${style.accent}40` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke={style.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={onNext}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${style.accent}40` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke={style.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Single Gallery Tile ──────────────────────────────────────────────────────
const GalleryTile = ({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) => {
  const style = TILE_STYLES[index % TILE_STYLES.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? style.accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 20px 60px ${style.glow}, 0 0 0 1px ${style.accent}20`
          : "0 8px 32px rgba(0,0,0,0.4)",
        background: "#050310",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* index badge */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center gap-1.5"
        style={{ opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s" }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.accent }} />
        <span
          className="text-[9px] tracking-[0.3em] font-bold"
          style={{ color: style.accent, fontFamily: "'Orbitron', sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* image */}
      <div className="overflow-hidden w-full">
        <motion.img
          src={item.src}
          alt={item.caption}
          className="w-full h-auto block"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: 120, objectFit: "cover", display: "block" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/image.png"; }}
        />
      </div>

      {/* gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(5,3,16,0.92) 0%, rgba(5,3,16,0.3) 45%, transparent 75%)`,
        }}
      />

      {/* accent color sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 0.07 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: style.accent }}
      />

      {/* bottom caption row */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10">
        {/* accent line */}
        <motion.div
          className="h-px mb-2"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ background: `linear-gradient(to right, ${style.accent}, transparent)` }}
        />
        <motion.p
          className="text-[10px] font-semibold tracking-[0.22em] uppercase"
          animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.3 }}
          style={{ color: style.accent, fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.caption}
        </motion.p>
      </div>

      {/* expand icon on hover */}
      <motion.div
        className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
        style={{ background: `${style.accent}20`, border: `1px solid ${style.accent}50` }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 4V1H4M6 1H9V4M9 6V9H6M4 9H1V6" stroke={style.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

// ─── Main GalleryGrid ─────────────────────────────────────────────────────────
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const slides = items.slice(0, 10);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((p) => p !== null ? (p - 1 + slides.length) % slides.length : 0);
  const nextLightbox = () => setLightboxIndex((p) => p !== null ? (p + 1) % slides.length : 0);

  // Distribute into 3 columns for masonry on desktop
  const cols: GalleryItem[][] = [[], [], []];
  const colIndices: number[][] = [[], [], []];
  slides.forEach((item, i) => {
    const col = i % 3;
    cols[col].push(item);
    colIndices[col].push(i);
  });

  return (
    <>
      <style>{`
        .gallery-grid-wrapper {
          width: 100%;
        }
        /* Desktop: 3-col masonry */
        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }
        /* Tablet: 2 cols */
        @media (max-width: 900px) {
          .gallery-masonry {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        /* Mobile: 1 col */
        @media (max-width: 540px) {
          .gallery-masonry {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
        .gallery-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .gallery-col { gap: 12px; }
        }
        @media (max-width: 540px) {
          .gallery-col { gap: 10px; }
        }
      `}</style>

      <div className="gallery-grid-wrapper">
        {/* header row */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(to bottom, #60a5fa, #a78bfa)" }} />
            <span
              className="text-[10px] tracking-[0.4em] uppercase font-bold"
              style={{ color: "rgba(96,165,250,0.7)", fontFamily: "'Orbitron', sans-serif" }}
            >
              Gallery
            </span>
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(96,165,250,0.2), transparent)" }} />
          <span
            className="text-[9px] tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', sans-serif" }}
          >
            {String(slides.length).padStart(2, "0")} frames
          </span>
        </motion.div>

        {/* masonry grid */}
        <div className="gallery-masonry">
          {[0, 1, 2].map((colIdx) => (
            // On mobile/tablet only render columns that exist in new layout
            <div key={colIdx} className="gallery-col">
              {cols[colIdx].map((item, rowIdx) => {
                const globalIndex = colIndices[colIdx][rowIdx];
                return (
                  <GalleryTile
                    key={globalIndex}
                    item={item}
                    index={globalIndex}
                    onClick={() => openLightbox(globalIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={slides}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── GalleryPhoto — single card (backward compat) ────────────────────────────
export const GalleryPhoto = ({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick?: () => void;
}) => (
  <GalleryTile item={item} index={index} onClick={onClick ?? (() => {})} />
);