// Project visual replaced with CSS-only animated shapes — no Three.js crash risk
const Project3DVisual = ({ index }: { index: number }) => {
  const gradients = [
    "from-blue-500/20 to-cyan-500/5",
    "from-purple-500/20 to-pink-500/5",
    "from-cyan-500/20 to-blue-500/5",
    "from-amber-500/20 to-orange-500/5",
  ];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
      <div className={`w-full h-full bg-gradient-to-br ${gradients[index % gradients.length]}`} />
    </div>
  );
};

export default Project3DVisual;
