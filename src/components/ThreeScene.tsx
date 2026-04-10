// ThreeScene replaced with CSS-only animated section — no Three.js crash risk
const ThreeScene = () => {
  return (
    <section className="section-padding relative min-h-screen flex items-center justify-center bg-black overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: '0.7s' }} />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-left">
            <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-primary/50"></span> Neural Nexus
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              Interactive <br />
              <span className="text-gradient">3D Multiverse</span>
            </h2>
            <p className="text-xl text-white/40 max-w-xl font-light leading-relaxed mb-10">
              A spatial interpretation of my digital footprint. Explore the intersection of Artificial Intelligence, Data Engineering, and Creative Computing through this WebGL-powered ecosystem.
            </p>
            <div className="flex flex-wrap gap-6 text-white/30 font-mono text-xs tracking-widest uppercase items-center">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Engineering AI</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> Scalable Systems</span>
            </div>
          </div>

          <div className="w-full lg:w-3/5 h-[400px] md:h-[500px] relative group">
            <div className="absolute inset-0 bg-blue-500/10 rounded-[3rem] blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="h-full w-full glass-card rounded-[3rem] overflow-hidden border border-white/10 relative flex items-center justify-center bg-[#050505]">
              {/* CSS animated 3D-like shapes */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-40 h-40 border border-blue-500/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute w-60 h-60 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                <div className="absolute w-80 h-80 border border-cyan-500/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-2xl rotate-45 animate-pulse border border-white/10" />
              </div>
              <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeScene;
