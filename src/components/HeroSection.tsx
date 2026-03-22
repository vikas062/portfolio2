import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "@/assets/profile-photo.jpg";
import Background3D from "./Background3D";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([leftTextRef.current, subtitleRef.current], {
        opacity: 0, y: 40, x: 0, scale: 1, filter: "blur(0px)"
      });
      gsap.set(rightPanelRef.current, {
        opacity: 0, x: 60, filter: "blur(0px)"
      });
      gsap.set(imageContainerRef.current, {
        opacity: 0, scale: 0.85, rotation: 6, filter: "blur(0px)"
      });
      gsap.set(backgroundTextRef.current, {
        opacity: 0, scale: 1.1, filter: "blur(0px)"
      });

      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 }
      });

      entranceTl
        .to(backgroundTextRef.current, { opacity: 0.03, scale: 1, duration: 2 }, 0)
        .to(leftTextRef.current, { opacity: 1, y: 0 }, 0.3)
        .to(rightPanelRef.current, { opacity: 1, x: 0, duration: 1.4 }, 0.4)
        .to(imageContainerRef.current, { opacity: 1, scale: 1, rotation: 3, ease: "expo.out", duration: 1.8 }, 0.5)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1 }, 0.8);

      // Scroll pin only on desktop
      if (window.matchMedia("(min-width: 768px)").matches) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        scrollTl
          .fromTo(leftTextRef.current,
            { x: 0, opacity: 1, filter: "blur(0px)" },
            { x: "-20vw", opacity: 0, filter: "blur(20px)", ease: "none" }, 0)
          .fromTo(rightPanelRef.current,
            { x: 0, opacity: 1, filter: "blur(0px)" },
            { x: "20vw", opacity: 0, filter: "blur(20px)", ease: "none" }, 0)
          .fromTo(subtitleRef.current,
            { y: 0, opacity: 1 },
            { y: -80, opacity: 0, ease: "none" }, 0)
          .fromTo(imageContainerRef.current,
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            { scale: 3.5, opacity: 0, filter: "blur(30px)", ease: "power1.in" }, 0)
          .fromTo(backgroundTextRef.current,
            { scale: 1, opacity: 0.03 },
            { scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "none" }, 0);
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full bg-[hsl(var(--dark-section))] text-white overflow-hidden flex items-center justify-center m-0 p-0"
    >
      {/* ── 3D Background ── */}
      <Background3D />

      {/* ── Background Overlays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--dark-section))]" />
      </div>

      {/* ── Background Watermark Text ── */}
      <div
        ref={backgroundTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] font-black text-white leading-none tracking-tighter uppercase opacity-[0.03]">
          KRITI
        </span>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[1500px] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-28 gap-6 md:gap-0">

        {/* LEFT — Name & Info */}
        <div ref={leftTextRef} className="flex flex-col items-center md:items-start will-change-transform w-full md:w-auto">
          {/* Available badge */}
          <div className="flex items-center gap-2.5 mb-6 md:mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-blink" />
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/50">Available for Work</span>
          </div>

          <h1 className="text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] font-black leading-[0.82] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] uppercase">
            KRITI
          </h1>
          {/* KUMARI in stroke/outline style */}
          <h1
            className="text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] font-black leading-[0.82] tracking-tighter uppercase"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.25)", color: "transparent" }}
          >
            KUMARI
          </h1>

          <div className="mt-6 md:mt-12 space-y-3 pl-1 text-center md:text-left">
            <p className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-white/60 uppercase">
              Machine Learning Engineer
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-14 h-px bg-gradient-to-r from-white/40 to-transparent" />
              <p className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
                Deep Learning · Scalable Systems
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Photo + Skills */}
        <div ref={rightPanelRef} className="flex flex-col items-center md:items-end gap-8 md:gap-10 will-change-transform">

          {/* Profile photo with animated glow ring */}
          <div className="relative">
            {/* Outer spinning ring */}
            <div
              className="absolute inset-[-4px] rounded-[12%] animate-spin-slow pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, rgba(255,120,50,0.7) 20%, transparent 40%, rgba(130,60,255,0.5) 60%, transparent 80%, rgba(255,120,50,0.3) 100%)",
                borderRadius: "12%"
              }}
            />
            {/* Inner spinning ring (opposite direction) */}
            <div
              className="absolute inset-[-2px] rounded-[12%] animate-spin-reverse pointer-events-none"
              style={{
                background: "conic-gradient(from 180deg, transparent 0%, rgba(255,255,255,0.15) 25%, transparent 50%, rgba(255,255,255,0.08) 75%, transparent 100%)",
                borderRadius: "12%",
                filter: "blur(2px)"
              }}
            />
            {/* The actual photo */}
            <div
              ref={imageContainerRef}
              className="w-[50vw] h-[50vw] sm:w-[38vw] sm:h-[38vw] md:w-[26vw] md:h-[26vw] lg:w-[22vw] lg:h-[22vw] overflow-hidden flex-shrink-0 relative will-change-transform"
              style={{
                borderRadius: "12%",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 60px 120px -20px rgba(0,0,0,0.95), 0 0 80px rgba(255,100,30,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
                transform: "rotate(3deg)"
              }}
            >
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ borderRadius: "12%", border: "1px solid rgba(255,255,255,0.06)" }}
              />
              <img
                src={profilePhoto}
                alt="Kriti Kumari"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* Skill capsules */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 max-w-[300px] md:max-w-[380px]">
            {["TensorFlow", "PyTorch", "NLP", "React", "FastAPI", "Python"].map((skill, i) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-[9px] font-mono tracking-widest text-white/50 uppercase hover:text-white/90 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                style={{
                  borderRadius: "3px",
                  animationDelay: `${i * 0.1}s`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div
        ref={subtitleRef}
        className="absolute bottom-[6%] w-full max-w-[1500px] left-1/2 -translate-x-1/2 flex flex-row justify-between px-6 md:px-20 lg:px-28 text-white/30 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.5em] will-change-transform items-center"
      >
        <p className="hidden md:block tracking-[0.4em]">Engineering Intelligence</p>
        <div className="flex items-center gap-4">
          <div className="animate-bounce opacity-50">
            <ArrowDown size={12} className="text-white" />
          </div>
          <p className="tracking-[0.3em]">Scroll</p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
