// Skill visual replaced with CSS-only animated shapes — no Three.js crash risk
const Skill3DVisual = ({ index }: { index: number }) => {
  const colors = ["#a855f7", "#3b82f6", "#10b981", "#f97316"];
  const color = colors[index % colors.length];
  return (
    <div className="absolute top-0 right-0 w-48 h-48 z-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 70%)`,
          animation: `spin ${6 + index}s linear infinite`,
        }}
      />
    </div>
  );
};

export default Skill3DVisual;
