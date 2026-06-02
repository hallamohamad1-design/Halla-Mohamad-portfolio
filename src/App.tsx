import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Layers,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Clock,
  Code2,
  Cpu,
  ChevronRight,
  Info,
  Copy,
  Check,
  BrainCircuit,
  AppWindow,
  FileSpreadsheet,
  Link2,
  Database,
  Monitor,
  Radio
} from "lucide-react";

import InteractiveHandshake from "./components/InteractiveHandshake";
import InteractivePortScanner from "./components/InteractivePortScanner";
import InteractiveCaseStudy from "./components/InteractiveCaseStudy";
import InteractiveDSPDelay from "./components/InteractiveDSPDelay";
import Project3DCard from "./components/Project3DCard";
import HeroParticles from "./components/HeroParticles";
import RetroDesktop from "./components/RetroDesktop";
import { Project, Experience, Education } from "./types";

export default function App() {
  // Navigation & View switcher: "boot" | "retro" | "modern"
  const [viewMode, setViewMode] = useState<"boot" | "retro" | "modern">("boot");
  const [bootStep, setBootStep] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  // Navigation & Filtering Setup
  const [activeSandboxTab, setActiveSandboxTab] = useState<"handshake" | "scanner" | "case_study" | "dsp_delay">("case_study");
  const [projectFilter, setProjectFilter] = useState<"all" | "ai" | "uiux" | "networking" | "fullstack">("all");
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);

  // Profile Information
  const name = "Halla Mohamed";
  const fullName = "Halla Mohamed Abd Elmoniem";
  const title = "AI Engineer & UI/UX Enthusiast";
  const email = "hallamohamad1@gmail.com";
  const phone = "01015886528";
  const location = "Luxor, Egypt";

  // Mock static data aligned strictly with CV
  const experiences: Experience[] = [
    {
      role: "Content Developer Intern",
      company: "mResource",
      duration: "Recent Internship",
      highlights: [
        "Developed high-fidelity technical documentation using LaTeX with a deep focus on design-thinking layouts.",
        "Created instructional video notes and tutorial sequences to optimize learning curve parameters for technical curricula.",
        "Collaborated with cross-functional design thinkers to resolve user navigation and accessibility pain points."
      ],
    },
    {
      role: "Banking Intern",
      company: "Commercial International Bank (CIB)",
      duration: "Corporate Experience",
      highlights: [
        "Gained practical operational insights in customer-facing and backend corporate banking environments.",
        "Analyzed operational workflows to understand user journeys in digital-to-physical branch conversions."
      ],
    },
    {
      role: "Banking Intern",
      company: "Masr Bank",
      duration: "Corporate Experience",
      highlights: [
        "Studied retail banking transaction workflows and evaluated customer relationship management systems.",
        "Collaborated in evaluating security protocols and digital systems used in retail banking."
      ]
    }
  ];

  const educations: Education[] = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Arab Academy for Science, Technology & Maritime Transport (AASTMT)",
      duration: "Current Student (Excellent Track)",
      gpa: "GPA: 3.96 / 4.0",
      details: "Top percentile. Structured coursework in Artificial Intelligence, Deep Learning, Software Systems, and Computer Networks."
    }
  ];

  const certifications = [
    { name: "Machine Learning & Data Science Grant", provider: "Digital Egypt Pioneers Initiative (NTI)", desc: "Advanced data pipeline construction, statistical regressions, and neural networks." },
    { name: "UI/UX Design Specialist Curriculum", provider: "Microsoft Certification", desc: "User research, design validation, paper prototypes, and wireframe structuring." },
    { name: "Artificial Intelligence Fundamentals", provider: "Microsoft Certification", desc: "Core algorithms, clustering models, and search tree strategies." },
    { name: "Fundamentals of Computer Networking", provider: "CISCO/AASTMT", desc: "Routing protocols, state machines, packet transfer layers, and TCP/IP stack mapping." },
  ];

  const projects: Project[] = [
    {
      id: "ma5zany",
      title: "Ma5zany (Inventory Management System)",
      category: "fullstack",
      description: "An intelligent, barcode-integrated store, warehouse management, and instant-scan platform tailored for local Egypt SME warehouses.",
      detailedDescription: "Designed to replace sluggish manual entry operations, Ma5zany leverages a high-fidelity web scanner tool alongside an intuitive desktop database control dashboard. This bridges the gap between digital data automation and warehouse staff in regional trade.",
      tech: ["React", "Express", "Node.js", "Barcode Scan API", "Tailwind CSS"],
      links: {
        live: "https://ma5zany-final.vercel.app",
        github: "https://github.com/hallamohamad1-design/Ma5zany-final-",
        githubScanner: "https://github.com/Kero-George22/M5zany-newBranch"
      },
      features: [
        "Live mobile-to-desktop scanning socket sync.",
        "Optimized batch logging and inventory tracking.",
        "Beautiful dark-slate glassmorphism dashboard layout built for rapid warehouse environments."
      ],
      role: "Lead UI Engineer & System Architect"
    },
    {
      id: "civic",
      title: "Civic Public Reporter Platform",
      category: "fullstack",
      description: "A collaborative citizen engagement and community issue reporting console optimized for neighborhood service oversight.",
      detailedDescription: "Empowers local users in Egyptian municipalities to report structural visual faults (broken utility grids, water leaks, public safety hazards) with absolute geotag accuracy and automatic municipal routing.",
      tech: ["Node.js", "Express", "MongoDB", "Geotagging", "Railway Server"],
      links: {
        live: "https://civic-final-production-a84c.up.railway.app/",
        github: "https://github.com/hallamohamad1-design/civic-final",
      },
      features: [
        "Real-time geographical sorting pins.",
        "Multi-status ticket tracker (Open, Investigating, Resolved).",
        "Clean mobile-responsive portal design."
      ],
      role: "Backend Architect & UI Designer"
    },
    {
      id: "handshake",
      title: "TCP Three-Way Handshake Website",
      category: "networking",
      description: "Interactive visual tool engineered to simplify packet state synchronization algorithms for academy networks.",
      detailedDescription: "Synthesizes complex computer networking theory (SYN, SYN-ACK, ACK exchanges) into high-end intuitive graphics. Demonstrates the step-by-step lifecycle of connection flags and sequence tracking.",
      tech: ["React", "Framer Motion", "Fira Code", "CSS Animation Nodes"],
      links: {
        github: "https://github.com/hallamohamad1-design"
      },
      features: [
        "Live animated packet exchange simulations.",
        "Interactive state logging matching exact client/server sockets.",
        "Dynamic sequence/acknowledgement mathematical triggers."
      ],
      role: "Solo Creator & Design Originator"
    },
    {
      id: "port_scanner",
      title: "Port Scanner Web Application",
      category: "networking",
      description: "Web sandbox designed to inspect active network ports under standard TCP protocol configurations safely.",
      detailedDescription: "Engineered specifically to facilitate lightweight remote diagnostic inspections of active network nodes without heavy CLI tools. Features color-coded threat meters based on port exploit patterns.",
      tech: ["Python", "Flask", "React", "Socket Protocol Standards"],
      links: {
        github: "https://github.com/hallamohamad1-design"
      },
      features: [
        "Vulnerability threat matching system.",
        "Async network socket testing mockups.",
        "Console-styled logs for socket diagnostics."
      ],
      role: "Network Logic & Interface Designer"
    },
    {
      id: "delay_dsp",
      title: "Digital Physical Delay System",
      category: "uiux",
      description: "Cohesive hardware-software integration performing digital delayed feedback loops for audio signals.",
      detailedDescription: "Designed an interactive DSP schematic that controls direct electronic signals, feeding physical delays back into an elegant dashboard to visually trace digital signal outputs.",
      tech: ["Arduino C++", "Signal Processing Algorithms", "Python Control Hub"],
      links: {
        github: "https://github.com/hallamohamad1-design"
      },
      features: [
        "Hardware-software signal integration.",
        "Audio feedback visualizers on low-latency dashboard.",
        "Intuitive parameter dialing dials (Time, Feedback Gain)."
      ],
      role: "DSP System Programmer"
    },
    {
      id: "charity",
      title: "Charity Management Application",
      category: "ai",
      description: "Resource dashboard created in Python to distribute regional charity donations and map inventory supplies.",
      detailedDescription: "Incorporated simple heuristic scheduling algorithms to categorize priorities based on demographic needs and track contribution pools in local Egypt districts.",
      tech: ["Python", "SQL database", "Tkinter", "Heuristics Layout"],
      links: {
        github: "https://github.com/hallamohamad1-design"
      },
      features: [
        "Automated regional prioritizing grids.",
        "Simple donation ledger audit tracks.",
        "Quick responsive record indexing."
      ],
      role: "Data Modeler & Developer"
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopiedEmail(true);
    setTimeout(() => setIsCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setIsCopiedPhone(true);
    setTimeout(() => setIsCopiedPhone(false), 2000);
  };

  const filteredProjects = projectFilter === "all"
    ? projects
    : projects.filter(p => p.category === projectFilter);

  const biosLines = [
    "AWARDBIOS (C) 1995-2026 DIGITAL COSMOS SYSTEMS",
    "CPU: GENAI INFERENCE ENGINE CENTRAL PROCESSING BLOCK",
    "DRAM TEST: 3960KB (GPA 3.96 EXCELLENT CS TRACK STATUS DETECTED... OK)",
    "MOUNTING HARDWARE INTERRUPTS... OK (LUXOR, EGYPT NODE)",
    "INITIALIZING BARCODE API INTEGRATIONS... OK (MA5ZANY WAREHOUSE CORE)",
    "LOADING NEURAL NETWORKS... OK (CHARITY PRIORITY GRIDS)",
    "ESTABLISHING HIGH-FIDELITY WIREFRAME SYSTEM... OK (AURACARE INFRASTRUCTURE)",
    "SYNCING SOCKET SOCKET STATE FLAGS... OK",
    "VANTAGE WORKSTATION BOOT SEQUENCE COMPLETED."
  ];

  React.useEffect(() => {
    if (viewMode !== "boot") return;
    
    let timer: any;
    if (bootStep < biosLines.length) {
      timer = setTimeout(() => {
        setBootLogs(prev => [...prev, biosLines[bootStep]]);
        setBootStep(prev => prev + 1);
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [bootStep, viewMode]);

  if (viewMode === "boot") {
    return (
      <div className="min-h-screen bg-[#030208] text-[#33ff33] font-mono p-6 md:p-12 relative overflow-hidden flex flex-col justify-between selection:bg-[#33ff33] selection:text-black select-none">
        {/* Subtle scanline lines overlay */}
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.05] z-10" />
        
        <div className="max-w-2xl mx-auto w-full space-y-6 pt-12 relative z-20">
          <div className="flex items-center gap-3 border-b border-[#33ff33]/20 pb-4">
            <div className="w-10 h-10 rounded-lg bg-[#33ff33]/15 border border-[#33ff33]/30 flex items-center justify-center font-bold text-lg animate-pulse">
              H
            </div>
            <div>
              <h2 className="text-white font-bold tracking-tight text-sm uppercase">HALLA-MO-PC BIOS V4.96</h2>
              <p className="text-xs text-[#33ff33]/60">Vantage Workstation OS Loader</p>
            </div>
          </div>

          <div className="space-y-2 text-xs md:text-sm">
            {bootLogs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-[#33ff33]/40">[{index + 1}]</span>
                <span className="text-emerald-400 font-semibold">{log}</span>
              </div>
            ))}
            
            {bootStep < biosLines.length && (
              <div className="flex items-center gap-2">
                <span className="text-[#33ff33]/40">[{bootStep + 1}]</span>
                <span className="w-2 h-4 bg-[#33ff33] animate-pulse" />
              </div>
            )}
          </div>

          {bootStep >= biosLines.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 p-6 rounded-2xl bg-[#09080e] border border-[#33ff33]/20 space-y-5"
            >
              <p className="text-white font-bold uppercase text-[12px] tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#33ff33] animate-ping" />
                Select System Boot Mode:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setViewMode("retro")}
                  className="w-full p-4 rounded-xl border border-[#33ff33]/30 bg-[#33ff33]/5 hover:bg-[#33ff33]/15 text-[#33ff33] text-left transition-all active:scale-[0.98] cursor-pointer hover:border-[#33ff33] hover:shadow-[0_0_20px_rgba(51,255,51,0.25)] flex flex-col justify-between h-40"
                >
                  <div>
                    <span className="text-white font-bold block mb-1">Option A: Vintage OS Workstation</span>
                    <span className="text-[11px] text-[#33ff33]/80 leading-relaxed block">
                      An interactive retro computing suite featuring window systems, arcade cabinets, canva paint, custom terminal scripts, and customizable chassis themes.
                    </span>
                  </div>
                  <div className="text-xs font-bold font-mono text-[#33ff33]/50 flex items-center justify-between">
                    <span>Authentic 95-Style Desktop</span>
                    <span>BOOT &gt;</span>
                  </div>
                </button>

                <button
                  onClick={() => setViewMode("modern")}
                  className="w-full p-4 rounded-xl border border-[#33ff33]/30 bg-black hover:bg-zinc-900/60 text-[#33ff33] text-left transition-all active:scale-[0.98] cursor-pointer hover:border-[#33ff33] hover:shadow-[0_0_20px_rgba(51,255,51,0.15)] flex flex-col justify-between h-40"
                >
                  <div>
                    <span className="text-white font-bold block mb-1">Option B: Modern Glassmorphic CV Grid</span>
                    <span className="text-[11px] text-[#33ff33]/80 leading-relaxed block">
                      A high-fidelity modern developer portfolio layout. Sleek aesthetic tailored for rapid scanning of certificates, experiences, and structural academic projects.
                    </span>
                  </div>
                  <div className="text-xs font-bold font-mono text-[#33ff33]/50 flex items-center justify-between">
                    <span>Fluid Responsive Design</span>
                    <span>LOAD &gt;</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#33ff33]/10 max-w-2xl mx-auto w-full text-[10px] text-[#33ff33]/40 flex justify-between tracking-wider relative z-20">
          <span>PORTAL: SECURED LUXOR NODE 4.96</span>
          <span>CLICK SELECT OPTION TO CONTINUE</span>
        </div>
      </div>
    );
  }

  if (viewMode === "retro") {
    return (
      <div className="min-h-screen bg-[#030208] text-white p-0 m-0 select-none overflow-hidden h-screen w-screen">
        <RetroDesktop
          projects={projects}
          experiences={experiences}
          educations={educations}
          certifications={certifications}
          onExitToModern={() => setViewMode("modern")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-violet-600 selection:text-white bg-grid-pattern relative pb-16">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Modern High-End Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#030712]/75 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-display font-bold text-white shadow-lg shadow-violet-500/15">
              H
            </div>
            <div>
              <span className="font-display font-semibold text-sm tracking-tight text-white">{name}</span>
              <span className="hidden sm:inline text-slate-500 text-xs font-mono ml-2 border-l border-slate-800 pl-2">
                CV & Projects Portfolio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setViewMode("retro")}
              className="px-3.5 py-2 bg-[#8b5cf6]/10 hover:bg-[#8b5cf6]/20 text-[#8b5cf6] font-semibold border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/45 rounded-lg flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <Monitor className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
              <span>Launch Retro OS</span>
            </button>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Open to Positions
            </span>
            <a
              href="#contact"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-semibold transition-all hover:border-violet-500/40"
            >
              Contact Halla
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* HERO AREA (Bento Grid Main Intro) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="hero">
          {/* Main welcome card */}
          <div className="lg:col-span-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-850 p-6 md:p-8 rounded-2.5xl flex flex-col justify-between relative overflow-hidden group">
            <HeroParticles />
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Engineering the Future with AI & Human-Centered Design
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                  Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">{fullName}</span>
                </h1>
                <p className="font-semibold text-lg text-slate-300 font-sans mt-0.5">
                  {title}
                </p>
              </div>

              <p className="text-sm text-slate-400 font-sans max-w-xl leading-relaxed">
                Computer Science student at AASTMT with a stellar **3.96 GPA**. I orchestrate advanced Machine Learning algorithms built alongside intuitive, eye-safe, minimal UI/UX design structures.
              </p>
            </div>

            {/* Quick action buttons & meta */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="flex gap-4">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-600/10 transition-all cursor-pointer"
                >
                  {isCopiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Email Copied!
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      Copy Email
                    </>
                  )}
                </button>
                <a
                  href="#workbench"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 transition-all"
                >
                  Explore Interactive Demos
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {location}
              </div>
            </div>
          </div>

          {/* Side stats bento card */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2.5xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Academic Record</span>
                <p className="text-4xl font-display font-medium text-white mt-1">3.96 <span className="text-sm text-slate-500 font-sans">GPA</span></p>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-4 border-t border-slate-800/80 pt-2">
                Top track student at Arab Academy (AASTMT). Structured CS & AI core.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2.5xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-3 bg-violet-600/10 rounded-tl-xl text-violet-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Certifications</span>
                <p className="text-4xl font-display font-medium text-white mt-1">4 <span className="text-sm text-slate-500 font-sans">Active</span></p>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-4 border-t border-slate-800/80 pt-2">
                Specializations from Microsoft NTI under digital empowerment pioneers.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WORKBENCH (Interactive Tools Tabs Section) */}
        <section className="space-y-6" id="workbench">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-6 h-6 text-violet-400" />
                Interactive Engineering Sandbox
              </h2>
              <p className="text-sm text-slate-400 font-sans mt-0.5">
                Play with interactive, live-simulated versions of Halla's design paradigms and computer network code.
              </p>
            </div>

            {/* Sandbox switcher */}
            <div className="flex gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-xl max-w-max self-start">
              <button
                onClick={() => setActiveSandboxTab("case_study")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSandboxTab === "case_study" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AuraCare UX
              </button>
              <button
                onClick={() => setActiveSandboxTab("handshake")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSandboxTab === "handshake" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                TCP Handshake
              </button>
              <button
                onClick={() => setActiveSandboxTab("scanner")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSandboxTab === "scanner" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Port Scanner
              </button>
              <button
                onClick={() => setActiveSandboxTab("dsp_delay")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSandboxTab === "dsp_delay" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                DSP Synth
              </button>
            </div>
          </div>

          <div className="bg-slate-950/20 rounded-2.5xl">
            <AnimatePresence mode="wait">
              {activeSandboxTab === "handshake" && (
                <motion.div
                  key="handshake-pane"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractiveHandshake />
                </motion.div>
              )}
              {activeSandboxTab === "scanner" && (
                <motion.div
                  key="scanner-pane"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractivePortScanner />
                </motion.div>
              )}
              {activeSandboxTab === "case_study" && (
                <motion.div
                  key="casestudy-pane"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractiveCaseStudy />
                </motion.div>
              )}
              {activeSandboxTab === "dsp_delay" && (
                <motion.div
                  key="dspdelay-pane"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractiveDSPDelay />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* PORTFOLIO PROJECT SHOWCASE */}
        <section className="space-y-6" id="projects">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-white tracking-tight flex items-center gap-2">
                <Layers className="w-6 h-6 text-violet-400" />
                Core Project Portfolios
              </h2>
              <p className="text-sm text-slate-400 font-sans mt-0.5">
                Full-scale production deployments and design systems engineered to optimize real utility.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-xl relative">
              {(["all", "fullstack", "ai", "uiux", "networking"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer z-10 ${
                    projectFilter === cat
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="relative z-10">
                    {cat === "all" ? "All Work" : cat === "uiux" ? "UI/UX" : cat === "fullstack" ? "Full Stack" : cat}
                  </span>
                  {projectFilter === cat && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-violet-600 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <Project3DCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* WORK EXPERIENCE & EDUCATION TIMELINES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="history">
          
          {/* Work experience */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800/80 p-6 md:p-8 rounded-2.5xl space-y-6">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-violet-400" />
              Internships & Hands-on Work
            </h3>

            <div className="relative border-l border-slate-800 pl-5 space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.company + index} className="relative group">
                  {/* Timeline point */}
                  <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-950 group-hover:bg-violet-500 transition-colors" />
                  
                  <div>
                    <span className="text-[10px] text-violet-400 font-mono font-semibold uppercase bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/25">
                      {exp.duration}
                    </span>
                    <h4 className="font-display font-bold text-slate-200 text-base mt-2">{exp.role}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{exp.company}</p>
                    
                    <ul className="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2.5xl space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                Academy Education
              </h3>

              {educations.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-display font-bold text-slate-200 text-sm leading-snug">{edu.degree}</h4>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 shrink-0 self-start">
                      {edu.gpa}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{edu.institution}</p>
                  <p className="text-xs text-slate-500 font-mono">{edu.duration}</p>
                  {edu.details && (
                    <p className="text-xs text-slate-400 font-sans mt-2.5 leading-relaxed bg-[#030712] p-3 rounded-lg border border-slate-800 border-dashed">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2.5xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-3.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-violet-400" />
                  Technical Focus Certifications
                </h3>

                <div className="space-y-3 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                  {certifications.map((c, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-semibold text-slate-200 line-clamp-1">{c.name}</span>
                        <span className="text-[9px] text-slate-400 font-mono shrink-0 uppercase bg-slate-950 px-1.5 py-0.2 rounded">
                          {c.provider.split(" ").pop()}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-violet-600/10 border border-violet-500/10 text-[10.5px] text-violet-300 font-mono rounded-lg flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-violet-400 shrink-0" />
                <span>NTI ML Track Pioneers digital award recipient.</span>
              </div>
            </div>
          </div>

        </section>

        {/* CORE TECH CLUSTER BOARD */}
        <section className="bg-slate-900 border border-slate-800/80 p-6 md:p-8 rounded-2.5xl" id="skills">
          <div className="border-b border-slate-850 pb-4 mb-6">
            <h3 className="font-display font-bold text-xl text-white">Full-Stack Capability Architecture</h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">Selected framework competencies built through academic precision and Microsoft frameworks.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-3">
              <span className="text-[10px] text-violet-400 font-mono tracking-wider uppercase bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">AI & Engineering</span>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li>Python Scientific (Numpy, Pandas)</li>
                <li>Scikit-Learn Regression</li>
                <li>Neural Network architectures</li>
                <li>API proxy pipelines</li>
              </ul>
            </div>

            <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-3">
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">UI/UX Design</span>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li>Design Thinking workflow</li>
                <li>High-Fidelity Wireframes</li>
                <li>Interactive Design Tokens</li>
                <li>Figma Prototyping rules</li>
              </ul>
            </div>

            <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-3">
              <span className="text-[10px] text-indigo-400 font-mono tracking-wider uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">System Networks</span>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li>TCP/IP Socket structures</li>
                <li>Network scanning logic</li>
                <li>Latency analysis tools</li>
                <li>Security audit reports</li>
              </ul>
            </div>

            <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl space-y-3">
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase bg-slate-800 px-2 py-0.5 rounded">Core Frameworks</span>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li>React & TypeScript</li>
                <li>Express.js backend API</li>
                <li>Node runtime structures</li>
                <li>Tailwind CSS system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PERSISTENT CONTACT ELEMENT */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-805 p-6 md:p-8 rounded-2.5xl space-y-6 relative overflow-hidden" id="contact">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">Let's craft the future together</h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Based in Luxor, Egypt, but open to global remote internship programs, junior engineer roles, or joint research programs utilizing AI coupled with UI/UX Design methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            {/* Email contact chip */}
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Direct Email</span>
                  <p className="text-xs text-slate-200 mt-0.5 select-all truncate">{email}</p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy Email"
              >
                {isCopiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone contact chip */}
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Emergency Call</span>
                  <p className="text-xs text-slate-200 mt-0.5 select-all truncate">{phone}</p>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy Phone"
              >
                {isCopiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-12 border-t border-slate-900 pt-6 text-center text-[11px] text-slate-500 font-mono tracking-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© 2026 {fullName}. All portfolios updated securely.</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Systems compiled with</span>
          <span className="text-rose-500">❤️</span>
          <span>& AI Precision in Luxor</span>
        </div>
      </footer>
    </div>
  );
}
