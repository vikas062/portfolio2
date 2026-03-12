import { useEffect, useRef, useState } from "react";
import { Terminal, Compass, Trophy, BrainCircuit, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    phase: "01",
    title: "How It Started",
    subtitle: "The Beginning",
    icon: Terminal,
    color: "text-blue-600 dark:text-blue-400",
    bgAccent: "bg-blue-600/10 dark:bg-blue-400/20",
    glowLight: "shadow-blue-500/30",
    description: "Started my journey as a 12th pass student writing my very first 'hello world' code. The thrill of making a computer execute my logic sparked an obsession that led me to Computer Science at Lovely Professional University, mastering Python, Java, and C++.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80",
    imgClass: "object-cover",
  },
  {
    phase: "02",
    title: "Beyond the Screen",
    subtitle: "Exploration & Growth",
    icon: Compass,
    color: "text-emerald-600 dark:text-emerald-400",
    bgAccent: "bg-emerald-600/10 dark:bg-emerald-400/20",
    glowLight: "shadow-emerald-500/30",
    description: "I realized growth happens outside the comfort zone. I joined tech clubs to explore communication and leadership, and kept active by playing badminton. This balance helped me approach complex algorithms with a clear and focused mind.",
    image: "/activity.png",
    imgClass: "object-contain bg-foreground/5 p-4",
  },
  {
    phase: "03",
    title: "The Hackathon Rush",
    subtitle: "Building & Impact",
    icon: Trophy,
    color: "text-orange-600 dark:text-orange-400",
    bgAccent: "bg-orange-600/10 dark:bg-orange-400/20",
    glowLight: "shadow-orange-500/30",
    description: "Stepping into hackathons changed everything. Surrounded by innovators, I began building real-world applications under pressure. From nutrition engines to deadlock detection systems, I deployed code that made a real impact.",
    image: "/hackthon.png",
    imgClass: "object-contain bg-foreground/5 p-4",
  },
  {
    phase: "04",
    title: "Engineering Intelligence",
    subtitle: "The Future",
    icon: BrainCircuit,
    color: "text-purple-600 dark:text-purple-400",
    bgAccent: "bg-purple-600/10 dark:bg-purple-400/20",
    glowLight: "shadow-purple-500/30",
    description: "Today, I am dedicated to deep learning and scalable intelligent systems. I am combining my full-stack development skills with modern machine learning architectures to engineer a beautiful, impactful coding journey.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    imgClass: "object-cover",
  },
];

const StorytellingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !rightRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the right panel using GSAP.
      // Because the right column starts at the very top of the section
      // (the header is inside the left column now), the pin offset is correct.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: rightRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Activate the correct chapter based on scroll position
      const sections = gsap.utils.toArray(".story-text-section");
      sections.forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Progress bar animation
      gsap.to(".progress-line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-background text-foreground pt-0 pb-20 md:pb-32"
    >
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none transform translate-x-1/3 -translate-y-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3 opacity-30" />

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row relative z-10">

        {/* ── LEFT: Header + Scrollable Chapters ── */}
        <div className="w-full md:w-1/2 px-4 md:pl-20 md:pr-12 relative">

          {/* Section Header — lives inside the left column */}
          <div className="text-left pt-20 md:pt-24 mb-10 md:mb-14">
            <p className="text-foreground/60 font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
              <Sparkles size={16} className="text-primary/60" />
              Personal Evolution
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5">
              The <span className="text-primary/80 italic font-medium">Story</span> So Far
            </h2>
            <p className="text-foreground/60 text-base md:text-lg font-light max-w-md leading-relaxed">
              Tracing the path from a curious student to an engineer dedicated to solving complex problems through code and intelligence.
            </p>
          </div>

          {/* Vertical Timeline Track */}
          <div className="absolute left-[38px] md:left-[80px] top-0 bottom-0 w-[2px] bg-foreground/10 hidden md:block">
            <div className="progress-line-fill w-full bg-gradient-to-b from-primary via-blue-500 to-purple-500 h-0" />
          </div>

          {/* Chapters */}
          {chapters.map((chapter, i) => {
            const isActive = activeIndex === i;
            const Icon = chapter.icon;

            return (
              <div
                key={i}
                className={`story-text-section min-h-[42vh] flex flex-col justify-center relative pl-0 md:pl-32 transition-all duration-700 ${
                  isActive ? "opacity-100" : "opacity-20 translate-y-6"
                }`}
              >
                {/* Timeline Node */}
                <div
                  className={`hidden md:flex absolute left-[-16px] md:left-[56px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 ${
                    isActive
                      ? `border-primary bg-background shadow-xl ${chapter.glowLight}`
                      : "border-foreground/10 bg-background"
                  } items-center justify-center z-10 transition-all duration-500`}
                >
                  {isActive ? (
                    <div className={`w-10 h-10 rounded-full ${chapter.bgAccent} flex items-center justify-center`}>
                      <Icon size={18} className={chapter.color} />
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-foreground/10" />
                  )}
                </div>

                <div className={`transition-all duration-700 transform ${isActive ? "translate-y-0" : "translate-y-4"}`}>
                  <span
                    className={`inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase ${
                      isActive ? chapter.color : "text-foreground/40"
                    } mb-6 px-5 py-2 rounded-full border ${
                      isActive ? `border-current ${chapter.bgAccent}` : "border-foreground/10"
                    } w-fit transition-all duration-500 shadow-sm`}
                  >
                    <Icon size={14} /> Phase {chapter.phase}
                  </span>

                  <p className={`text-base font-mono tracking-[0.2em] uppercase mb-3 ${isActive ? "text-foreground/80" : "text-foreground/30"}`}>
                    {chapter.subtitle}
                  </p>

                  <h3 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight ${isActive ? "text-foreground" : "text-foreground/20"}`}>
                    {chapter.title}
                  </h3>

                  <p className={`text-lg md:text-xl font-normal leading-relaxed max-w-lg ${isActive ? "text-foreground/90" : "text-foreground/20"}`}>
                    {chapter.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT: Pinned Image Panel ── */}
        {/* This div starts at the very top of the section so GSAP pin offset = 0 */}
        <div className="hidden md:block w-1/2">
          <div
            ref={rightRef}
            className="w-full h-screen flex items-center justify-center py-10 px-8 lg:px-12"
          >
            {/* Image Frame */}
            <div className="w-full h-[65vh] relative rounded-[3rem] overflow-hidden bg-foreground/[0.03] border border-foreground/10 shadow-2xl p-4 backdrop-blur-md">

              {/* Inner image switcher */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden shadow-inner bg-background/50">
                {chapters.map((chapter, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeIndex === i
                        ? "opacity-100 z-10 scale-100 rotate-0"
                        : "opacity-0 z-0 scale-110 rotate-2"
                    }`}
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className={`w-full h-full ${chapter.imgClass} transition-transform duration-[6s] ease-out ${
                        activeIndex === i ? "scale-105" : "scale-120"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                    <div className={`absolute inset-0 ${chapter.bgAccent} mix-blend-overlay opacity-30 pointer-events-none`} />

                    <div className="absolute bottom-10 left-10 z-20">
                      <p className={`font-mono text-xs tracking-[0.5em] uppercase ${chapter.color} mb-3 font-bold`}>
                        0{i + 1} / 04
                      </p>
                      <h4 className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-sm tracking-tight">
                        {chapter.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative dots */}
              <div className="absolute top-10 right-10 flex gap-3 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StorytellingSection;
