import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Github, Link2, FileSpreadsheet, AppWindow, Code2, Terminal, Cpu, Database, ChevronRight } from "lucide-react";
import { Project } from "../types";

interface Project3DCardProps {
  project: Project;
  key?: string;
}

export default function Project3DCard({ project }: Project3DCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Calculate dynamic 3D scale, opacity, and tilt transformation as users scroll them into viewport
  const scrollScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.93, 1, 1, 0.95]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [10, 0, 0, -10]);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Core cursor calculation relative to card boundaries
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Dynamic 3D tilt levels (Max 14 degrees)
    const rotateX = ((mouseY - height / 2) / (height / 2)) * -14;
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 14;
    
    setRotate({ x: rotateX, y: rotateY });
    setSheen({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case "ma5zany":
        return <FileSpreadsheet className="w-5 h-5" />;
      case "civic":
        return <AppWindow className="w-5 h-5" />;
      case "handshake":
        return <Code2 className="w-5 h-5" />;
      case "port_scanner":
        return <Terminal className="w-5 h-5" />;
      case "delay_dsp":
        return <Cpu className="w-5 h-5" />;
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      ref={scrollRef}
      layout
      style={{
        perspective: 1000,
        scale: scrollScale,
        opacity: scrollOpacity,
        rotateX: scrollRotateX,
        transformStyle: "preserve-3d"
      }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="relative z-10"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.03)`
            : `rotateX(0deg) rotateY(0deg) scale(1)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="h-full bg-slate-900 border border-slate-800/80 rounded-2.5xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl hover:shadow-violet-500/5 select-none"
      >
        {/* Dynamic Light Sheen Overlay */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle 350px at ${sheen.x}px ${sheen.y}px, rgba(139, 92, 246, 0.15), transparent 85%)`
              : "none",
            transition: "opacity 0.2s ease-out",
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Outer Highlight top-line neon bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-30" />

        <div className="space-y-4" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start gap-3">
            <div>
              {/* Category tag badges */}
              <div className="flex gap-2 mb-2">
                <span className="text-[9px] uppercase tracking-wider font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 font-semibold">
                  {project.category === "fullstack"
                    ? "Full Stack API"
                    : project.category === "networking"
                    ? "System Networks"
                    : project.category === "ai"
                    ? "AI & ML System"
                    : "UI/UX Design"}
                </span>
                {project.role && (
                  <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {project.role}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-white leading-snug group-hover:text-violet-400 transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Float-separated Category Icon Indicator */}
            <div 
              style={{ transform: "translateZ(40px)" }}
              className="text-slate-600 group-hover:text-violet-400 transition-colors shrink-0"
            >
              {renderIcon(project.id)}
            </div>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {project.description}
          </p>

          <p className="text-[11.5px] text-slate-400 leading-normal">
            {project.detailedDescription}
          </p>

          {/* Detailed Features checklists */}
          {project.features && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Engine Deliverables</span>
              {project.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                  <ChevronRight className="w-3 h-3 text-violet-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech tags and actionable deployment buttons */}
        <div 
          style={{ transform: "translateZ(25px)" }}
          className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 z-30"
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/50">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-800 hover:border-violet-500/40 transition-all flex items-center gap-1.5 text-xs font-mono"
                title="Open Live Deployment"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-800 hover:border-violet-500/40 transition-all flex items-center gap-1.5 text-xs font-mono"
                title="Repository Code files"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            {project.links.githubScanner && (
              <a
                href={project.links.githubScanner}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg border border-slate-800 hover:border-violet-500/40 transition-all flex items-center gap-1.5 text-xs font-mono"
                title="Scanner Code Repository"
              >
                <Link2 className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                <span>Scanner</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
