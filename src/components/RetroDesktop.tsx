import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  Terminal,
  Gamepad2,
  Search,
  Settings,
  User,
  X,
  Minus,
  Maximize2,
  Play,
  Volume2,
  RefreshCw,
  Sliders,
  Calendar,
  ChevronRight,
  ExternalLink,
  Github,
  Figma,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Link2,
  Monitor,
  Heart,
  Palette,
  VolumeX,
  Check,
  Send,
  HelpCircle
} from "lucide-react";
import { Project, Experience, Education } from "../types";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
}

interface RetroDesktopProps {
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: any[];
  onExitToModern?: () => void;
}

export default function RetroDesktop({
  projects,
  experiences,
  educations,
  certifications,
  onExitToModern
}: RetroDesktopProps) {
  // Desktop Wallpapers selection
  const wallpapers = [
    { id: "classic", name: "Teal 95", className: "bg-[#008080]" },
    { id: "darkSpace", name: "Space Graphite", className: "bg-slate-950 bg-grid-pattern" },
    { id: "cyberpunk", name: "Neon Twilight", className: "bg-gradient-to-tr from-indigo-950 via-slate-950 to-violet-950" },
    { id: "royal", name: "Egypt Gold", className: "bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900" }
  ];
  const [currentWallpaper, setCurrentWallpaper] = useState(wallpapers[2]); // Default Neon Twilight

  // System sounds configurations
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Clock state
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple Beep synthesizer for classic keypress/win triggers
  const playRetroBeep = (freq = 440, duration = 0.08, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context block
    }
  };

  // Window instances management
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "bio", title: "bio_notepads.txt", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 40, y: 40 },
    { id: "projects", title: "Project Explorer", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 100, y: 70 },
    { id: "arcade", title: "Vodex Vibes Studio Cabinet", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11, x: 150, y: 60 },
    { id: "search", title: "Search Results Viewer", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 220, y: 80 },
    { id: "terminal", title: "System Command Shell (aest.sh)", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 12, x: 80, y: 120 },
    { id: "settings", title: "Control Panel Preferences", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 280, y: 160 }
  ]);

  const [topZIndex, setTopZIndex] = useState(20);

  // Search Results States
  const [terminalSearchQuery, setTerminalSearchQuery] = useState("");
  const [terminalSearchResults, setTerminalSearchResults] = useState<Project[]>([]);

  // Open a specific window and bring to front
  const openWindow = (id: string) => {
    playRetroBeep(587, 0.12, "triangle"); // e5 classic sound
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        return { ...win, isOpen: true, isMinimized: false, zIndex: nextZ };
      }
      return win;
    }));
  };

  // Close window instance
  const closeWindow = (id: string) => {
    playRetroBeep(392, 0.08, "triangle"); // g4 note
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isOpen: false };
      }
      return win;
    }));
  };

  // Minimize window instance
  const minimizeWindow = (id: string) => {
    playRetroBeep(220, 0.05, "sine");
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isMinimized: true };
      }
      return win;
    }));
  };

  // Bring specified window instance to focus front
  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        if (win.isMinimized) {
          playRetroBeep(523, 0.07, "sine");
        }
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        return { ...win, isMinimized: false, zIndex: nextZ };
      }
      return win;
    }));
  };

  // Toggle maximize
  const toggleMaximize = (id: string) => {
    playRetroBeep(659, 0.09, "sine");
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isMaximized: !win.isMaximized };
      }
      return win;
    }));
  };

  // Drag handles helper (simple click offset tracking)
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    focusWindow(id);
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    setDraggedId(id);
    setDragOffset({
      x: e.clientX - win.x,
      y: e.clientY - win.y
    });
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent) => {
      if (!draggedId) return;
      setWindows(prev => prev.map(win => {
        if (win.id === draggedId) {
          return {
            ...win,
            x: Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x)),
            y: Math.max(60, Math.min(window.innerHeight - 200, e.clientY - dragOffset.y))
          };
        }
        return win;
      }));
    };

    const handleDragEnd = () => {
      setDraggedId(null);
    };

    if (draggedId) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [draggedId, dragOffset]);

  // Start menu overlay toggling
  const [isStartOpen, setIsStartOpen] = useState(false);


  // -------------------------------------------------------------
  // PAINT CANVAS ENGINE DECOMMISSIONED FOR PROFESSIONAL TERMINAL SCANNER
  // -------------------------------------------------------------


  // -------------------------------------------------------------
  // TERMINAL ENGINE COMMAND PROCESSOR
  // -------------------------------------------------------------
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "HallaOS Command Framework [v1.5.0]",
    "System online. Type 'help' or search about projects/anything to open a dynamic tab.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalLogsEndRef = useRef<HTMLDivElement | null>(null);

  const processTerminalCommand = () => {
    const inputCleaned = terminalInput.trim();
    if (!inputCleaned) return;

    const lowerInput = inputCleaned.toLowerCase();
    const newLogs = [...terminalLogs, `guest@halla-pc:~$ ${terminalInput}`];

    let cmd = lowerInput;
    let queryParam = "";

    if (lowerInput.startsWith("search ")) {
      cmd = "search";
      queryParam = inputCleaned.substring(7).trim();
    } else if (!["help", "bio", "about", "skills", "gpa", "contact", "matrix", "clear"].includes(lowerInput)) {
      cmd = "search";
      queryParam = inputCleaned;
    }

    switch (cmd) {
      case "help":
        newLogs.push(
          "Available microkernel commands:",
          "  help           Display this routine support index.",
          "  search <query> Deep-scan and match portfolio assets.",
          "  bio / about    Print Halla's high-fidelity biography.",
          "  skills         List engineered technical stack capabilities.",
          "  gpa            Print academic statistics records.",
          "  contact        Output secure network channels (phone & mail).",
          "  matrix         Trigger scrolling vector digital rains.",
          "  clear          Clean current CLI socket log buffers.",
          "  *(Type anything else to search and auto-open as another tab!)"
        );
        playRetroBeep(784, 0.05, "sine");
        break;
      case "bio":
      case "about":
        newLogs.push(
          "Candidate Profile: Halla Mohamed Abd Elmoniem",
          "Curriculum Focus: AI Engineer & Modern Front Architecture Enthusiast.",
          "Engineering Core: Synthesizing deep neural architectures and state",
          "management layers with pristine, minimal, human-centric layouts.",
          "District Node: Luxor, Egypt."
        );
        playRetroBeep(698, 0.06, "triangle");
        break;
      case "skills":
        newLogs.push(
          "ENGINEERED STACK PROFILE:",
          "  AI & ML Systems: Python, Deep Learning neural pathways, NTI heuristics.",
          "  Front Architecture: React, Framer Motion, HTML5, CSS layout grids.",
          "  Networking Stack: TCP Handshaking algorithms, CLI scanning.",
          "  Local Tooling: LaTeX layouts representation, micro-controllers C++."
        );
        playRetroBeep(659, 0.05, "triangle");
        break;
      case "gpa":
        newLogs.push(
          "ACADEMIC NODE EXCELLENCE STATUS [CURRENT]:",
          "  University: Arab Academy for Science & Technology (AASTMT)",
          "  Current Cumulative Metric: 3.96 / 4.0 GPA",
          "  Rank Class: High Honor List",
          "  Major Core: Computer Science & Algorithmic Heuristics."
        );
        playRetroBeep(880, 0.09, "sine");
        break;
      case "contact":
        newLogs.push(
          "SECURE COMMS NETWORKS:",
          "  Network Mail Server: hallamohamad1@gmail.com",
          "  Digital cellular: (+2) 01015886528",
          "  Location Tag: Luxor, Egypt.",
          "  Fidelity Index: Direct response SLA < 4 hours."
        );
        break;
      case "matrix":
        newLogs.push(
          "10100101 11001010 01101110 10101000 11000011",
          "00101100 PORT_SCANNER_SECURE CORE_ONLINE_NODE_LIVE",
          "11100010 SYSTEM READY TO RECEIVE INTEGRATED SCAN SOCKETS",
          "01010101 HALLA_MEMBER_GRADUATE_OPTIMIZED_GPA_3.96"
        );
        playRetroBeep(987, 0.15, "sawtooth");
        break;
      case "search":
        const matches = projects.filter(p => 
          p.title.toLowerCase().includes(queryParam.toLowerCase()) ||
          p.description.toLowerCase().includes(queryParam.toLowerCase()) ||
          p.tech.some(t => t.toLowerCase().includes(queryParam.toLowerCase())) ||
          p.category.toLowerCase().includes(queryParam.toLowerCase())
        );

        setTerminalSearchQuery(queryParam);
        setTerminalSearchResults(matches);
        
        newLogs.push(
          `System scan: indexing database for "${queryParam}"...`
        );

        if (matches.length > 0) {
          newLogs.push(
            `Successfully matched ${matches.length} matching candidate projects.`,
            `Spawning interactive 'Search Results Viewer' container window...`
          );
        } else {
          newLogs.push(
            `Scanning completed: 0 direct matches found in portfolio.`,
            `Suggestions:`,
            ` - Type "port" to check out the Network Port Scanner`,
            ` - Type "mind" to review Mind 2 Mind wellness hub`,
            ` - Type "delay" to test the hardware DSP simulator`,
            ` - Type "vibes" to access Vodex Vibes interactive stream`
          );
        }

        // Open search results window
        setTimeout(() => {
          openWindow("search");
        }, 300);

        // Try to trigger external browser tab ONLY if a project match is indeed found and has a live link
        try {
          if (matches.length > 0 && matches[0].links.live) {
            window.open(matches[0].links.live, "_blank");
            newLogs.push(`Browser Node: Loaded live demo link for "${matches[0].title}" in another tab.`);
          }
        } catch (e) {
          // block bypass
        }
        playRetroBeep(700, 0.1, "triangle");
        break;
      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        newLogs.push(`Command '${cmd}' unrecognized. Dial 'help' for routine guides.`);
        playRetroBeep(150, 0.2, "sawtooth");
    }

    newLogs.push("");
    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  useEffect(() => {
    if (terminalLogsEndRef.current) {
      terminalLogsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);


  return (
    <div className={`w-full min-h-[580px] lg:h-[720px] ${currentWallpaper.className} p-4 relative overflow-hidden select-none border-4 border-slate-900 rounded-3xl shadow-2xl transition-all duration-300 font-mono`}>
      
      {/* Grid line effect overlay for absolute retro vibes */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03] z-50" />

      {/* Retro PC Display glass highlight glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none z-40" />

      {/* Primary OS Workspace Area */}
      <div className="w-full h-full pb-14 relative z-10 flex flex-col justify-start items-start gap-4 content-start flex-wrap">
        
        {/* DESKTOP SHORTCUT ICONS CONTAINER */}
        <div 
          onClick={() => openWindow("bio")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-110 transition-transform">
            <User className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Halla_Bio
          </span>
        </div>

        <div 
          onClick={() => openWindow("projects")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
            <Folder className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Work_Folder
          </span>
        </div>

        <div 
          onClick={() => openWindow("arcade")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-rose-600/30 border border-rose-500/30 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform relative">
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <Gamepad2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Vodex_Vibes
          </span>
        </div>

        <div 
          onClick={() => openWindow("search")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Search_OS
          </span>
        </div>

        <div 
          onClick={() => openWindow("terminal")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 border border-slate-500/40 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Core_Shell
          </span>
        </div>

        <div 
          onClick={() => openWindow("settings")}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Preferences
          </span>
        </div>

        <div 
          onClick={() => { playRetroBeep(880, 0.1, "triangle"); if (onExitToModern) onExitToModern(); }}
          className="flex flex-col items-center justify-center p-2.5 w-20 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/15 cursor-pointer text-center group transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
            <Monitor className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight mt-1.5 drop-shadow-sm leading-tight truncate w-full">
            Modern_CV
          </span>
        </div>

        {/* -------------------------------------------------------------
            FLOATING DRAG-COMPLIANT WINDOW MODALS CONTAINER
            ------------------------------------------------------------- */}
        <AnimatePresence>
          {windows.map((win) => {
            if (!win.isOpen || win.isMinimized) return null;
            return (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, scale: 0.9, y: win.y + 20 }}
                animate={{ opacity: 1, scale: 1, y: win.y }}
                exit={{ opacity: 0, scale: 0.9, y: win.y + 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  zIndex: win.zIndex,
                  position: win.isMaximized ? "absolute" : "absolute",
                  left: win.isMaximized ? 0 : win.x,
                  top: win.isMaximized ? 0 : win.y,
                  width: win.isMaximized ? "100%" : "auto",
                  height: win.isMaximized ? "calc(100% - 44px)" : "auto",
                  minWidth: win.isMaximized ? "auto" : "320px",
                }}
                className={`flex flex-col border-2 border-slate-900 bg-slate-900 shadow-2xl rounded-xl overflow-hidden`}
              >
                {/* Vintage Chrome OS Title Header Bar */}
                <div
                  onMouseDown={(e) => handleDragStart(win.id, e)}
                  className={`px-3 py-2 flex items-center justify-between cursor-move text-xs font-bold font-sans bg-gradient-to-r ${
                    draggedId === win.id
                      ? "from-violet-700 to-indigo-700 text-white"
                      : "from-slate-800 to-slate-900 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {win.id === "bio" && <User className="w-3.5 h-3.5 text-violet-400" />}
                    {win.id === "projects" && <Folder className="w-3.5 h-3.5 text-emerald-400" />}
                    {win.id === "arcade" && <Gamepad2 className="w-3.5 h-3.5 text-rose-400" />}
                    {win.id === "search" && <Search className="w-3.5 h-3.5 text-violet-400" />}
                    {win.id === "terminal" && <Terminal className="w-3.5 h-3.5 text-slate-400" />}
                    {win.id === "settings" && <Settings className="w-3.5 h-3.5 text-blue-400" />}
                    <span className="font-mono text-[11px] font-semibold">{win.title}</span>
                  </div>

                  {/* Window Control Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => minimizeWindow(win.id)}
                      className="w-4 h-4 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => toggleMaximize(win.id)}
                      className="w-4 h-4 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
                    >
                      <Maximize2 className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => closeWindow(win.id)}
                      className="w-4.5 h-4.5 rounded-md bg-rose-600/30 hover:bg-rose-600 flex items-center justify-center text-rose-400 hover:text-white transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                {/* MODAL CLIENT AREA INTERNALS */}
                <div 
                  onClick={() => focusWindow(win.id)}
                  className="p-4 bg-slate-950 font-sans text-xs text-slate-200 overflow-y-auto"
                  style={{
                    height: win.isMaximized ? "100%" : win.id === "arcade" ? "450px" : win.id === "search" ? "380px" : "320px",
                    width: win.isMaximized ? "100%" : win.id === "arcade" ? "620px" : win.id === "projects" || win.id === "search" ? "520px" : "380px",
                  }}
                >
                  {/* CASE 1: BIOGRAPHY TEXT FILE NOTEPAD */}
                  {win.id === "bio" && (
                    <div className="space-y-4">
                      <div className="border-b border-slate-900 pb-2">
                        <p className="text-[10px] text-slate-500 font-mono tracking-wider">FILE: C:\HALLA_INFO\BIO_NOTEPADS.TXT</p>
                        <p className="text-[10px] text-slate-500 font-mono">ENCODING: UTF-8 / SHA-X</p>
                      </div>
                      <p className="font-semibold text-white text-sm">
                        Hello, World! I am Halla Mohamed Abd Elmoniem.
                      </p>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        I am currently studying Computer Science at Arab Academy for Science, Technology & Maritime Transport (AASTMT) with an Excellent track GPA of <strong>3.96/4.0</strong>.
                      </p>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        My primary career drive has been designing robust Machine Learning structures with elegant, eye-comfortable layouts. I have structured video tutorial files for curricula as content interns and studied digital conversion security loops in formal bank networks.
                      </p>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1 font-mono text-[10px]">
                        <span className="text-violet-400 block font-bold uppercase">System Profile Specifications</span>
                        <div>● Location node: Luxor, Egypt</div>
                        <div>● Active credentials: Python, ML Neural modules, TCP, React</div>
                        <div>● Design standard: Zero clutter bento interfaces</div>
                      </div>
                      <div className="pt-2 border-t border-slate-900 flex justify-end gap-2">
                        <span className="text-[10px] text-slate-500 font-mono italic">Chars: 588 | Lines: 12</span>
                      </div>
                    </div>
                  )}

                  {/* CASE 2: PROJECT WORK EXPLORER */}
                  {win.id === "projects" && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        To match JoanRamosRefusta's desktop folder design, click any folder node item below to preview active metadata and deployment link channels:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {projects.map((proj) => (
                          <div 
                            key={proj.id} 
                            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 p-3 rounded-xl space-y-2 group transition-all"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[9px] font-mono bg-violet-600/15 border border-violet-500/20 px-1.5 py-0.5 rounded text-violet-400 uppercase font-semibold">
                                {proj.category}
                              </span>
                              <div className="flex items-center gap-1 text-slate-500">
                                {proj.links.live && (
                                  <a href={proj.links.live} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Live demo">
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                                {proj.links.github && (
                                  <a href={proj.links.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Repository file">
                                    <Github className="w-3 h-3" />
                                  </a>
                                )}
                                {proj.links.figma && (
                                  <a href={proj.links.figma} target="_blank" rel="noreferrer" className="hover:text-violet-400 text-slate-500 transition-colors" title="Figma design file">
                                    <Figma className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-white tracking-tight text-xs group-hover:text-violet-400 transition-colors">
                                {proj.title}
                              </h4>
                              <p className="text-[10.5px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                                {proj.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-800 text-[9px] text-slate-500 font-mono">
                              {proj.tech.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CASE 3: VODEX VIBES GAME INTERACTIVE CONSOLE */}
                  {win.id === "arcade" && (
                    <div className="flex flex-col h-full font-sans bg-slate-950 text-slate-100 rounded-lg p-3 relative overflow-hidden">
                      {/* Top status bar */}
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-900 pb-2 shrink-0">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>VODEX_SYSTEM_CONNECTED</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-violet-400 font-bold">MODE: FULL INTERACTIVE STREAM</span>
                        </div>
                      </div>

                      {/* Interactive frame or launcher card */}
                      <div className="grow bg-slate-900 border border-slate-800 rounded-lg relative flex flex-col items-center justify-center overflow-hidden my-2 group min-h-[220px]">
                        {/* Elegant custom loader backdrop */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_100%)] pointer-events-none" />
                        
                        {/* High fidelity interactive iframe */}
                        <iframe 
                          src="https://vodex-vibes-stack-db213139.vercel.app/"
                          title="Vodex Vibes Studio Stack"
                          className="w-full h-full border-0 bg-slate-950 z-10"
                          referrerPolicy="no-referrer"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>

                      {/* Footer console action toolbar */}
                      <div className="flex justify-between items-center text-[11px] font-mono border-t border-slate-900 pt-2 shrink-0">
                        <span className="text-slate-500">🎮 Play directly in the console space</span>
                        
                        <a 
                          href="https://vodex-vibes-stack-db213139.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded flex items-center gap-1 hover:shadow-lg transition-all"
                        >
                          <span>Open in New Tab</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* CASE 4: DYNAMIC SEARCH PREVIEW TAB */}
                  {win.id === "search" && (
                    <div className="space-y-4 font-sans text-xs text-slate-200">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="text-[10px] text-slate-500 font-mono">SEARCH ENGINE CLIENT v1.2</span>
                        <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">Query: "{terminalSearchQuery || 'None'}"</span>
                      </div>
                      
                      {!terminalSearchQuery ? (
                        <div className="text-center py-10 text-slate-400 space-y-3">
                          <Search className="w-8 h-8 text-slate-500 mx-auto opacity-40" />
                          <p className="font-mono text-[11px]">System is idle. Type query directly into command terminal to begin scanning catalog.</p>
                        </div>
                      ) : terminalSearchResults.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 space-y-3 font-mono">
                          <p className="text-xs font-bold text-rose-400">Zero Local Matches Found</p>
                          <p className="text-[10px] text-slate-400 leading-relaxed">No matching projects matched "{terminalSearchQuery}". All searches are restricted to local portfolio products.</p>
                          
                          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-left space-y-2 mt-2">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Suggested Project Keywords:</span>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <button 
                                onClick={() => {
                                  const matches = projects.filter(p => p.title.toLowerCase().includes("port"));
                                  setTerminalSearchQuery("port");
                                  setTerminalSearchResults(matches);
                                }}
                                className="text-left text-violet-400 hover:text-violet-300 transition-colors bg-slate-950 p-1.5 rounded border border-slate-800/60"
                              >
                                🔍 "port" (Port Scanner)
                              </button>
                              <button 
                                onClick={() => {
                                  const matches = projects.filter(p => p.title.toLowerCase().includes("mind"));
                                  setTerminalSearchQuery("mind");
                                  setTerminalSearchResults(matches);
                                }}
                                className="text-left text-violet-400 hover:text-violet-300 transition-colors bg-slate-950 p-1.5 rounded border border-slate-800/60"
                              >
                                🎯 "mind" (Wellness Hub)
                              </button>
                              <button 
                                onClick={() => {
                                  const matches = projects.filter(p => p.title.toLowerCase().includes("delay"));
                                  setTerminalSearchQuery("delay");
                                  setTerminalSearchResults(matches);
                                }}
                                className="text-left text-violet-400 hover:text-violet-300 transition-colors bg-slate-950 p-1.5 rounded border border-slate-800/60"
                              >
                                🎛️ "delay" (DSP Audio)
                              </button>
                              <button 
                                onClick={() => {
                                  const matches = projects.filter(p => p.title.toLowerCase().includes("vibes"));
                                  setTerminalSearchQuery("vibes");
                                  setTerminalSearchResults(matches);
                                }}
                                className="text-left text-violet-400 hover:text-violet-300 transition-colors bg-slate-950 p-1.5 rounded border border-slate-800/60"
                              >
                                📻 "vibes" (Vodex Studio)
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-400 font-mono">Indexed matches returned below:</p>
                          <div className="space-y-3">
                            {terminalSearchResults.map((proj) => (
                              <div key={proj.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 hover:border-violet-500/40 transition-colors">
                                <div className="flex justify-between items-center gap-2">
                                  <h4 className="font-bold text-white text-xs">{proj.title}</h4>
                                  <div className="flex gap-1.5">
                                    {proj.links.live && (
                                      <a 
                                        href={proj.links.live} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-[10px] font-mono text-emerald-400 hover:text-emerald-350 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                                      >
                                        <span>Demo</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                    {proj.links.github && (
                                      <a 
                                        href={proj.links.github} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-[10px] font-mono text-pink-400 hover:text-pink-350 flex items-center gap-1 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20"
                                      >
                                        <span>Code</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                    {proj.links.figma && (
                                      <a 
                                        href={proj.links.figma} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-[10px] font-mono text-violet-400 hover:text-violet-350 flex items-center gap-1 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20"
                                      >
                                        <span>Design</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed">{proj.description}</p>
                                <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-900 text-[9px] text-slate-500 font-mono">
                                  {proj.tech.map((t, idx) => (
                                    <span key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASE 5: SYSTEM TERMINAL COMMAND CONSOLE */}
                  {win.id === "terminal" && (
                    <div className="flex flex-col h-full font-mono text-[10.5px]">
                      <div className="grow overflow-y-auto space-y-1.5 pr-1 font-mono text-emerald-400">
                        {terminalLogs.map((log, idx) => (
                          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                            {log}
                          </div>
                        ))}
                        <div ref={terminalLogsEndRef} />
                      </div>

                      <div className="flex items-center gap-1.5 border-t border-slate-900 pt-2 shrink-0">
                        <span className="text-violet-400 font-bold shrink-0">guest@halla-pc:~$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && processTerminalCommand()}
                          className="grow bg-transparent border-none outline-none focus:ring-0 p-0 text-white font-mono text-[11px]"
                          placeholder="Type 'help' ..."
                          autoFocus
                        />
                        <button
                          onClick={processTerminalCommand}
                          className="text-violet-400 hover:text-violet-300 p-1 active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CASE 6: PREFERENCES CONTROL PANEL */}
                  {win.id === "settings" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-bold leading-normal text-xs uppercase flex items-center gap-1.5">
                          <Palette className="w-4 h-4 text-violet-400" />
                          Change Desktop Wallpaper
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Customize the vintage workstation workspace canvas theme:</p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {wallpapers.map((w) => (
                            <button
                              key={w.id}
                              onClick={() => {
                                playRetroBeep(440, 0.08, "sine");
                                setCurrentWallpaper(w);
                              }}
                              className={`p-2.5 rounded-xl border flex flex-col justify-between text-left transition-all ${
                                currentWallpaper.id === w.id
                                  ? "border-violet-500 bg-violet-600/10 text-white font-bold"
                                  : "border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              <div className={`w-full h-8 rounded-md mb-2 ${w.className}`} />
                              <span className="text-[10px] truncate">{w.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-900 pt-3 space-y-3">
                        <h4 className="text-white font-bold leading-normal text-xs uppercase flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-emerald-400" />
                          Audio and Sound Preferences
                        </h4>
                        
                        <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                          <div>
                            <span className="text-[10.5px] text-white block">Acoustic Synthesizer Audio</span>
                            <span className="text-[9.5px] text-slate-400">Play vintage sine chip chimes during click routines</span>
                          </div>
                          
                          <button
                            onClick={() => {
                              const next = !soundEnabled;
                              setSoundEnabled(next);
                              if (next) {
                                setTimeout(() => playRetroBeep(659, 0.15, "triangle"), 10);
                              }
                            }}
                            className={`p-2.5 rounded-xl border cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 ${
                              soundEnabled
                                ? "bg-emerald-600 border-emerald-500 text-white"
                                : "bg-slate-950 border-slate-800 text-slate-500"
                            }`}
                          >
                            {soundEnabled ? (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold">ON</span>
                              </>
                            ) : (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span className="text-[10px]">MUTED</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

      {/* -------------------------------------------------------------
          BOTTOM SYSTEM TASKBAR & START BAR PRESETS
          ------------------------------------------------------------- */}
      <div className="absolute bottom-3 left-3 right-3 h-11 bg-slate-900/90 backdrop-blur-md rounded-xl border-2 border-slate-800/80 flex items-center justify-between px-3 z-50">
        
        {/* START BUTTON BUTTON */}
        <div className="relative">
          <button
            onClick={() => {
              playRetroBeep(493, 0.08, "triangle");
              setIsStartOpen(!isStartOpen);
            }}
            className="h-7 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold sm:tracking-wide flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
          >
            <div className="w-4 h-4 bg-white/20 rounded-md flex items-center justify-center text-[10px]">H</div>
            <span>Start</span>
          </button>

          {/* Expanded Win95 Retro Start Menu popup */}
          <AnimatePresence>
            {isStartOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsStartOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: -4, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute bottom-9 left-0 w-56 rounded-xl border-2 border-slate-800 bg-slate-900 p-2.5 shadow-2xl z-40 text-xs font-sans text-slate-200 space-y-1"
                >
                  <div className="px-2 py-1.5 border-b border-slate-800 text-slate-400 text-[10px] font-mono tracking-wider uppercase">
                    Halla's Retro OS Portal
                  </div>
                  
                  <button
                    onClick={() => { setIsStartOpen(false); openWindow("bio"); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-violet-400" />
                    <span>Halla Mohamed Bio</span>
                  </button>

                  <button
                    onClick={() => { setIsStartOpen(false); openWindow("projects"); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2"
                  >
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Workspace</span>
                  </button>

                  <button
                    onClick={() => { setIsStartOpen(false); openWindow("arcade"); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2"
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Vodex Vibes Studio</span>
                  </button>

                  <button
                    onClick={() => { setIsStartOpen(false); openWindow("search"); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5 text-violet-400" />
                    <span>Search Engine OS</span>
                  </button>

                  <button
                    onClick={() => { setIsStartOpen(false); openWindow("terminal"); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2"
                  >
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span>Command Line CLI</span>
                  </button>

                  <button
                    onClick={() => { setIsStartOpen(false); if (onExitToModern) onExitToModern(); }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-white/5 active:bg-violet-600 text-white flex items-center gap-2 border-t border-slate-800 mt-1 pt-2"
                  >
                    <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-cyan-300">Modern Glass CV</span>
                  </button>

                  <div className="pt-2 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
                    Halla Mohamed • Excellent GPA 3.96
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* SYSTEM TASKBAR CHROME MINIMIZED ICONS (Middle row) */}
        <div className="flex items-center gap-1.5 px-3 overflow-x-auto grow max-w-sm hidden sm:flex">
          {windows.map((win) => {
            if (!win.isOpen) return null;
            return (
              <button
                key={win.id}
                onClick={() => {
                  if (win.isMinimized) {
                    focusWindow(win.id);
                  } else {
                    minimizeWindow(win.id);
                  }
                }}
                className={`h-7 px-2.5 rounded-lg text-[10px] font-sans font-bold flex items-center gap-1.5 transition-all text-left truncate active:scale-95 cursor-pointer max-w-[120px] ${
                  win.isMinimized
                    ? "bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300"
                    : "bg-slate-800 border border-slate-700 text-white hover:bg-slate-750"
                }`}
              >
                {win.id === "bio" && <User className="w-3 h-3 text-violet-400 shrink-0" />}
                {win.id === "projects" && <Folder className="w-3 h-3 text-emerald-400 shrink-0" />}
                {win.id === "arcade" && <Gamepad2 className="w-3 h-3 text-rose-400 shrink-0" />}
                {win.id === "search" && <Search className="w-3 h-3 text-violet-400 shrink-0" />}
                {win.id === "terminal" && <Terminal className="w-3 h-3 text-slate-400 shrink-0" />}
                {win.id === "settings" && <Settings className="w-3 h-3 text-blue-400 shrink-0" />}
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>

        {/* SYSTEM PREFERENCES TRAY (Right indicators) */}
        <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <span className="text-white font-bold tracking-tight shrink-0">{time || "00:00:00"}</span>
        </div>

      </div>

    </div>
  );
}
