import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
    {
        title: "Supervised Machine Learning",
        subtitle: "Classification",
        description: "Successfully completed Supervised Machine Learning: Classification. An online course authorized by IBM and offered through Coursera.",
        features: ["Classification Algorithms", "Model Evaluation", "IBM Authorized"],
        tech: ["Coursera", "Machine Learning", "IBM"],
        link: "https://www.coursera.org/account/accomplishments/verify/HOI11K27OYP9",
        image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80",
        infoText: "Issued by IBM on Coursera",
    },
    {
        title: "Deep Learning for Developers",
        subtitle: "Course Completion Certificate",
        description: "Successfully completed the course Deep Learning for Developers. Validation of technical expertise in neural networks and deep learning.",
        features: ["Neural Networks", "Deep Learning Architectures", "Practical Applications"],
        tech: ["Infosys Springboard", "Deep Learning"],
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7331882914369994752/",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
        infoText: "Issued by Infosys Springboard",
    },
    {
        title: "Machine Learning Specialization",
        subtitle: "Advanced ML Specialization",
        description: "Deep foundational understanding of modern machine learning techniques.",
        features: ["Supervised Learning", "Unsupervised Learning", "Neural Networks"],
        tech: ["Stanford", "DeepLearning.AI"],
        link: "https://www.coursera.org/account/accomplishments/specialization/ADFTNZMHO196",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        infoText: "Issued by DeepLearning.AI / Stanford",
    },
    {
        title: "Recent Activity & Certifications",
        subtitle: "Continuous Learning",
        description: "Actively pursuing and completing multiple certifications to stay up-to-date with the latest in AI and Software Engineering.",
        features: ["Hackathons", "Continuous Learning", "Community Engagement"],
        tech: ["LinkedIn", "Professional Development"],
        link: "https://www.linkedin.com/in/kritikumari01/recent-activity/all/",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
        infoText: "View all on LinkedIn",
    }
];

const CertificatesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".cert-header",
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

            const cards = gsap.utils.toArray(".certificate-card-wrapper");
            cards.forEach((card: any, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power4.out",
                        delay: i * 0.1,
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
        <section id="certificates" className="section-padding relative bg-background py-20 md:py-32" ref={containerRef}>
            <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-12">
                <div className="cert-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="relative">
                        {/* Glowing orb behind title */}
                        <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                        <p className="text-foreground/50 font-mono text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-foreground/30"></span> Achievements
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                            Selected <span className="text-foreground/60 italic">Certificates</span>
                        </h2>
                    </div>
                    <p className="text-foreground/60 text-lg md:text-xl max-w-lg tracking-wide leading-relaxed font-light border-l border-foreground/10 pl-6">
                        Verified professional credentials validating deep expertise in Machine Learning, Software Development, and System Design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {certificates.map((cert, i) => (
                        <div key={cert.title} className="certificate-card-wrapper">
                            <CertificateCard
                                cert={cert}
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
                    <ExpandedCertificateView
                        cert={certificates[expandedIndex]}
                        index={expandedIndex}
                        onClose={() => setExpandedIndex(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const CertificateCard = ({
    cert,
    index,
    isExpanded,
    onToggle,
}: {
    cert: typeof certificates[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            layoutId={`cert-card-container-${index}`}
            className="bg-foreground/[0.02] backdrop-blur-md rounded-[2.5rem] overflow-hidden cursor-pointer group flex flex-col h-full border border-foreground/10 shadow-2xl shadow-transparent hover:shadow-primary/5 relative"
            onClick={onToggle}
            whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
        >
            {/* Decorative Glow on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-500/10 rounded-full blur-[120px] scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100"></div>


            {/* Top Image area */}
            <motion.div
                className="w-full h-64 md:h-72 bg-foreground/5 relative overflow-hidden"
                layoutId={`cert-card-image-container-${index}`}
            >
                <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-90 group-hover:opacity-100"
                    layoutId={`cert-card-image-${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />

                {/* Floating badge */}
                <div className="absolute top-6 left-6 p-2 bg-background/50 backdrop-blur-md rounded-xl border border-foreground/10 text-foreground/80 z-20">
                    <Award size={24} className="text-purple-400" />
                </div>
            </motion.div>

            {/* Content area */}
            <motion.div
                className="px-8 pb-10 pt-8 flex-1 flex flex-col relative z-20"
                layoutId={`cert-card-content-${index}`}
            >
                <div className="flex items-start justify-between gap-4 mb-4">
                    <motion.h3 layoutId={`cert-title-${index}`} className="text-3xl font-semibold tracking-tight leading-tight">
                        {cert.title}
                    </motion.h3>
                    <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                        <ExternalLink size={18} className="transform -translate-y-[1px] translate-x-[1px]" />
                    </div>
                </div>

                <motion.p layoutId={`cert-subtitle-${index}`} className="font-mono text-xs tracking-[0.2em] uppercase text-purple-400/80 mb-6 flex items-center gap-2">
                    {cert.subtitle}
                </motion.p>

                <motion.p layoutId={`cert-desc-${index}`} className="text-foreground/70 leading-relaxed mb-8 flex-1">
                    {cert.description}
                </motion.p>

                <motion.div layoutId={`cert-info-row-${index}`} className="flex items-center gap-3 pt-6 border-t border-foreground/10 mt-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                    <p className="text-sm font-mono tracking-wider text-foreground/50">{cert.infoText}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const ExpandedCertificateView = ({
    cert,
    index,
    onClose
}: {
    cert: typeof certificates[0],
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
                layoutId={`cert-card-container-${index}`}
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

                {/* Central visual header - more compact */}
                <div className="relative w-full h-[25vh] md:h-[30vh] flex items-center justify-center z-10 overflow-hidden bg-background">
                    <motion.div
                        className="w-full h-full relative"
                        layoutId={`cert-card-image-container-${index}`}
                    >
                        <motion.img
                            src={cert.image}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                            alt={cert.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay"></div>
                    </motion.div>

                    {/* Overlay Typography */}
                    <div className="absolute inset-0 flex items-end justify-start p-10 md:p-16 z-20 pointer-events-none">
                        <div className="max-w-4xl">
                            <motion.h2
                                layoutId={`cert-title-${index}`}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-2xl text-foreground"
                            >
                                {cert.title}
                            </motion.h2>
                        </div>
                    </div>
                </div>

                {/* Content Details - more compact */}
                <div className="relative z-20 flex-1 bg-background px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-8 lg:gap-16">

                    {/* Left Column */}
                    <div className="md:w-1/2">
                        <motion.div layoutId={`cert-subtitle-${index}`} className="font-mono text-sm tracking-widest uppercase text-purple-400 mb-8 flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-purple-400/50" /> {cert.subtitle}
                        </motion.div>
                        <motion.p layoutId={`cert-desc-${index}`} className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed mb-12">
                            {cert.description}
                        </motion.p>

                        <div className="space-y-4 mb-12">
                            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6">Core Competencies Verified</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cert.features.map(feature => (
                                    <div key={feature} className="flex items-center gap-3 text-foreground/80 bg-foreground/[0.02] p-4 rounded-xl border border-foreground/5">
                                        <Award size={16} className="text-purple-400" /> <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:w-1/2 md:border-l border-foreground/10 md:pl-12 lg:pl-24 flex flex-col h-full">

                        <div className="mb-12">
                            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6">Sponsoring Organizations</h4>
                            <div className="flex flex-wrap gap-4">
                                {cert.tech.map(t => (
                                    <span key={t} className="px-5 py-3 rounded-xl border border-foreground/10 bg-background text-foreground/80 font-mono text-sm tracking-widest uppercase shadow-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <motion.div layoutId={`cert-info-row-${index}`} className="mb-auto p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex items-start gap-4">
                            <div className="bg-purple-500/20 p-2 rounded-lg">
                                <Award size={24} className="text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-foreground font-medium mb-1 tracking-wide">Official Credential</h4>
                                <p className="text-foreground/60 text-sm">Validates completion and subject-matter expertise. {cert.infoText}.</p>
                            </div>
                        </motion.div>

                        {/* Verification Button */}
                        <div className="mt-12 pt-8 border-t border-foreground/10">
                            {cert.link && cert.link !== "#" && (
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="w-full bg-foreground text-background px-8 py-5 rounded-2xl font-medium text-center hover:scale-[1.02] hover:shadow-2xl transition-all flex items-center justify-center gap-3 tracking-wide">
                                    Verify Credential on Platform <span>↗</span>
                                </a>
                            )}
                        </div>

                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default CertificatesSection;
