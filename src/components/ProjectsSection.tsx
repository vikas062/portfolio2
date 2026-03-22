import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Info, Github, ExternalLink, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Project3DVisual from "./Project3DVisual";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CrimeIntel System",
    subtitle: "Real-Time Graph-Based Crime Risk Intelligence",
    description: "Built dynamic crime networks, detect risk spikes, predict arrest probability, identify safest paths, and generate real-time threat scoring.",
    features: ["Graph Engine", "Feature Engineering", "ML Risk Prediction"],
    tech: ["Python", "FastAPI", "Machine Learning", "React"],
    github: "https://github.com/Kriti-kumari221/CrimeIntel",
    demo: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    infoText: "AI-Powered Geo-Threat Analysis",
    color: "primary" as const,
  },
  {
    title: "Smart Placement Tracker",
    subtitle: "Full Stack Application",
    description: "A comprehensive platform to track and manage student placements, analyze hiring trends, and streamline the recruitment process.",
    features: ["Placement Analytics", "Student Dashboard", "Recruiter Portal"],
    tech: ["Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/Kriti-kumari221/Smart-Placement-Tracker",
    demo: "https://smart-placement-tracker-silk.vercel.app/",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    infoText: "Complete Placement Ecosystem",
    color: "primary" as const,
  },
  {
    title: "AI NutriCare",
    subtitle: "Contribution: Full Stack AI",
    description: "An AI-based nutrition recommendation system generating personalized diet plans.",
    features: ["AI diet recommendations", "Health suggestions", "Interactive web interface"],
    tech: ["Python", "Machine Learning", "React", "FastAPI"],
    github: "https://github.com/PriceOptima-SpringBoard/AI-NutriCare/tree/Kriti-AI-NutriCare",
    demo: "https://ai-nutricare-frontend.vercel.app",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
    infoText: "Machine learning integration pipeline active",
    color: "primary" as const,
  },
  {
    title: "Sentiment Analysis",
    subtitle: "NLP & Deep Learning",
    description: "An intelligent platform that performs real-time sentiment extraction from textual data using advanced NLP techniques.",
    features: ["Natural Language Processing", "Real-time Text Analysis", "Neural Network Model"],
    tech: ["Python", "NLP", "TensorFlow", "React", "Scikit-Learn"],
    github: "https://github.com/Kriti-kumari221/NLP/tree/main/Sentiment_Analysis",
    demo: "https://nlp-one-gilt.vercel.app/",
    image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80",
    infoText: "Deep learning model for behavioral analytics",
    color: "secondary" as const,
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(".projects-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      const cards = gsap.utils.toArray(".project-card-wrapper");
      cards.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedIndex]);

  return (
    <section id="projects" className="section-padding relative bg-background py-20 md:py-32 overflow-hidden" ref={containerRef}>
      {/* Ambient background glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-blue)/0.2) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-purple)/0.2) 0%, transparent 70%)" }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">

        {/* Premium Header */}
        <div className="projects-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative">
            {/* Glowing orb behind title */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <p className="text-foreground/50 font-mono text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-foreground/30"></span> Featured Work
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
              Selected <span className="text-foreground/60 italic">Projects</span>
            </h2>
            {/* Gradient underline */}
            <div className="mt-4 w-20 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }} />
          </div>
          <p className="text-foreground/60 text-lg md:text-xl max-w-lg tracking-wide leading-relaxed font-light border-l border-foreground/10 pl-6">
            A showcase of comprehensive software architectures, machine learning models, and fully-deployed applications built to solve complex problems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <div key={project.title} className="project-card-wrapper">
              <ProjectCard
                project={project}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <ExpandedProjectView
            project={projects[expandedIndex]}
            index={expandedIndex}
            onClose={() => setExpandedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: typeof projects[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-container-${index}`}
      className="bg-foreground/[0.02] card-shimmer backdrop-blur-md rounded-[2.5rem] overflow-hidden cursor-pointer group flex flex-col h-full border border-foreground/10 shadow-2xl shadow-transparent hover:shadow-primary/5 hover:border-foreground/20 hover:-translate-y-2 relative transition-all duration-500"
      onClick={onToggle}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
    >
      {/* Decorative Glow on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px] scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100"></div>

      {/* Top Image area */}
      <motion.div
        className="w-full h-72 md:h-80 bg-foreground/5 relative overflow-hidden"
        layoutId={`card-image-container-${index}`}
      >
        {/* 3D Visual Background */}
        <Project3DVisual index={index} />
        
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-10 opacity-70 group-hover:opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70 z-20" />

        {/* Floating tech tags on the image */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20 pointer-events-none">
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-background/50 backdrop-blur-md rounded-full border border-foreground/10 text-foreground/80">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content area */}
      <motion.div
        className="px-8 pb-10 pt-8 flex-1 flex flex-col relative z-20"
        layoutId={`card-content-${index}`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <motion.h3 layoutId={`title-${index}`} className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {project.title}
          </motion.h3>
          <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
            <ExternalLink size={18} className="transform -translate-y-[1px] translate-x-[1px]" />
          </div>
        </div>

        <motion.p layoutId={`subtitle-${index}`} className="font-mono text-sm tracking-widest uppercase text-foreground/50 mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-primary" /> {project.subtitle}
        </motion.p>

        <motion.p layoutId={`desc-${index}`} className="text-foreground/70 text-lg leading-relaxed mb-8 flex-1">
          {project.description}
        </motion.p>

        <motion.div layoutId={`info-row-${index}`} className="flex items-center gap-3 pt-6 border-t border-foreground/10 mt-auto">
          <Info className="w-5 h-5 flex-shrink-0 text-primary" />
          <p className="text-sm text-foreground/60">{project.infoText}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ExpandedProjectView = ({
  project,
  index,
  onClose
}: {
  project: typeof projects[0],
  index: number,
  onClose: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden p-4 md:p-8"
    >
      <motion.div
        layoutId={`card-container-${index}`}
        className="relative w-full max-w-7xl min-h-[90vh] bg-foreground/[0.03] border border-foreground/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl shadow-black/50"
      >
        <button
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[999] group flex items-center gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-2xl border border-white/20 text-white transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold font-mono">Close</span>
          <span className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <span className="text-sm md:text-base leading-none transform transition-transform duration-500 group-hover:rotate-90">×</span>
          </span>
        </button>

        {/* Central visual header - Made more compact */}
        <div className="relative w-full h-[35vh] md:h-[40vh] flex items-center justify-center z-10 overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            layoutId={`card-image-container-${index}`}
          >
            <motion.img
              src={project.image}
              className="absolute inset-0 w-full h-full object-cover"
              alt={project.title}
            />
            {/* Elegant fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>

          {/* Overlay Typography */}
          <div className="absolute inset-0 flex items-center justify-center z-20 p-8 pointer-events-none text-center pt-24">
            <motion.h2
              layoutId={`title-${index}`}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter drop-shadow-2xl"
            >
              {project.title}
            </motion.h2>
          </div>
        </div>

        {/* Content Details - Reduced padding */}
        <div className="relative z-20 flex-1 bg-background px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">

          {/* Left Description Column */}
          <div className="md:w-1/2">
            <motion.div layoutId={`subtitle-${index}`} className="font-mono text-sm tracking-widest uppercase text-primary mb-8 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-primary/50" /> {project.subtitle}
            </motion.div>
            <motion.p layoutId={`desc-${index}`} className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed mb-12">
              {project.description}
            </motion.p>

            {/* Key Features List */}
            <div className="space-y-4 mb-12">
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6">Key Capabilities</h4>
              {project.features.map(feature => (
                <div key={feature} className="flex items-center gap-4 text-foreground/80 border-b border-foreground/5 pb-4">
                  <Sparkles size={16} className="text-primary/70" /> {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Tech & Actions Column */}
          <div className="md:w-1/2 md:border-l border-foreground/10 md:pl-12 lg:pl-24 flex flex-col h-full">

            <div className="mb-12">
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map(t => (
                  <span key={t} className="px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/[0.02] text-foreground/80 font-mono text-sm tracking-widest uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <motion.div layoutId={`info-row-${index}`} className="mb-auto">
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4">Project Note</h4>
              <p className="text-foreground/70 flex items-center gap-3">
                <Info size={18} className="text-primary" /> {project.infoText}
              </p>
            </motion.div>

            {/* Launch Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 bg-foreground/[0.02] p-6 rounded-[2rem] border border-foreground/5">
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 bg-foreground text-background px-8 py-5 rounded-2xl font-medium text-center hover:scale-[1.02] hover:shadow-2xl transition-all flex items-center justify-center gap-3 tracking-wide">
                  Launch Live App <span>↗</span>
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-background hover:bg-foreground/[0.05] border border-foreground/10 text-foreground px-8 py-5 rounded-2xl font-medium text-center transition-all flex items-center justify-center gap-3 tracking-wide">
                  <Github size={20} /> View Source
                </a>
              )}
            </div>

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectsSection;
