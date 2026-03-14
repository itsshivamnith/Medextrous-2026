export const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={`v-${i}`}
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: `${(i + 1) * 12.5}%`,
          background: 'linear-gradient(to bottom, transparent, rgba(96,165,250,1), transparent)',
        }}
      />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={`h-${i}`}
        className="absolute left-0 right-0 h-px"
        style={{
          top: `${(i + 1) * 16.6}%`,
          background: 'linear-gradient(to right, transparent, rgba(96,165,250,1), transparent)',
        }}
      />
    ))}
  </div>
);

export default GridLines;