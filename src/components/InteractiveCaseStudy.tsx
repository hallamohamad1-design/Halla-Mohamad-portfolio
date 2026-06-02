import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout, Palette, Copy, Check, ToggleLeft, ToggleRight, Sparkles, User, Lightbulb, Compass } from "lucide-react";

type CaseStudyTab = "overview" | "wireframe" | "style_guide" | "personas";

export default function InteractiveCaseStudy() {
  const [activeTab, setActiveTab] = useState<CaseStudyTab>("overview");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isHiFi, setIsHiFi] = useState(true);

  const colors = [
    { name: "Nebula Dark", hex: "#030712", tailwind: "bg-slate-950", use: "App Canvas Background" },
    { name: "Ethereal Amethyst", hex: "#a78bfa", tailwind: "bg-violet-400", use: "Accent & Positive Emotions" },
    { name: "Calming Coral", hex: "#fca5a5", tailwind: "bg-red-300", use: "Interactive Triggers & Hearts" },
    { name: "Serene Mint", hex: "#86efac", tailwind: "bg-emerald-300", use: "Health states & Safe boundaries" },
    { name: "Slate Border", hex: "#1e293b", tailwind: "bg-slate-800", use: "Borders, Cards & Dividers" },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-hover relative overflow-hidden" id="uiux-case-study">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Suggestion / Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium rounded-full mb-4">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        Suggested Interactive Case Study
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-white">AuraCare UX Case Study</h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            AI-Driven Mental Health Tracking Platform & Design System
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 border border-slate-800/80 rounded-xl">
          {(["overview", "style_guide", "wireframe", "personas"] as CaseStudyTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-violet-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels with AnimatePresence */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {/* OVERVIEW PANEL */}
          {activeTab === "overview" && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <div className="flex gap-3 bg-slate-950/60 p-4 border border-slate-800/80 rounded-xl">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-slate-200 text-sm">The Core Problem</h4>
                    <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                      Mental health tracking apps often feel cold, clinical, or overly complex, which discourages long-term habit formation in users experiencing emotional distress.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-slate-950/60 p-4 border border-slate-800/80 rounded-xl">
                  <Compass className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-slate-200 text-sm">The Creative Solution</h4>
                    <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                      AuraCare uses AI matching and natural language analytics to decode daily raw journal snippets, reflecting mental biomes into fluid colors and interactive wellness suggestions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Project Design Parameters</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      Platform: Mobile iOS/Android optimized
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      UI Paradigm: Minimal dark glassmorphism
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      Tech Alignment: AI Inference API for Sentiment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      Key Design System Goal: Reduce visual clutter
                    </li>
                  </ul>
                </div>
                <div className="mt-4 p-3 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-mono rounded-lg">
                  💡 UX Principle: Calm Tech. Interfaces should act as supportive scaffolding, not attention-seeking alarms.
                </div>
              </div>
            </motion.div>
          )}

          {/* STYLE GUIDE */}
          {activeTab === "style_guide" && (
            <motion.div
              key="style-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Palette Overview */}
              <div>
                <h4 className="font-display text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-violet-400" />
                  Interactive Calm Palette (Hover to Copy Hex)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => handleCopyHex(color.hex)}
                      className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex flex-col items-center cursor-pointer group hover:bg-slate-900 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg ${color.tailwind} mb-2 flex items-center justify-center relative shadow-inner`}>
                        <div className="absolute inset-x-0 inset-y-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/40 rounded-lg transition-opacity">
                          {copiedColor === color.hex ? (
                            <Check className="w-4 h-4 text-emerald-300" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-200 text-center line-clamp-1">{color.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">{color.hex}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Design tokens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Typography Tokens</h4>
                  <div className="space-y-3 font-display">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">Heading 1 Display (Space Grotesk)</span>
                      <p className="text-xl font-bold text-white tracking-tight mt-0.5">Mind Balance</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">Body Regular (Inter)</span>
                      <p className="text-xs text-slate-300 font-sans leading-normal mt-0.5">
                        Your heart rate is balanced. Take high-density steps to maintain stability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">System Compositions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0" />
                      <p className="text-xs text-slate-300">Glass Panel: Blur 16px, background white (opacity 0.05), border tint.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                      <p className="text-xs text-slate-300">Shadow depth: Ambient ring 0 4px 30px rgba(0, 0, 0, 0.4).</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* WIREFRAME VS HI-FI TOGGLE */}
          {activeTab === "wireframe" && (
            <motion.div
              key="wireframe-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Live Interactive Switch */}
              <div className="flex items-center gap-3 mb-6 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
                <span className={`text-xs font-medium font-mono ${!isHiFi ? "text-violet-400" : "text-slate-400"}`}>
                  LO-FI WIREFRAME (Structure)
                </span>
                <button
                  type="button"
                  onClick={() => setIsHiFi(!isHiFi)}
                  className="text-violet-500 focus:outline-none cursor-pointer"
                >
                  {isHiFi ? (
                    <ToggleRight className="w-10 h-10" />
                  ) : (
                    <ToggleLeft className="w-10 h-10" />
                  )}
                </button>
                <span className={`text-xs font-medium font-mono ${isHiFi ? "text-emerald-400 animate-pulse" : "text-slate-400"}`}>
                  HI-FI PROTOTYPE (Visualized)
                </span>
              </div>

              {/* Mock Device Container */}
              <div className="w-full max-w-sm rounded-[32px] border-4 border-slate-800 bg-slate-950 overflow-hidden relative shadow-2xl relative min-h-[340px] flex flex-col justify-between">
                
                {/* Camera Notch placeholder */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-10" />

                <div className="p-6 pt-10 flex-1 flex flex-col justify-between">
                  {/* Dynamic Device screen */}
                  <AnimatePresence mode="wait">
                    {isHiFi ? (
                      /* HIGH FIDELITY RENDER */
                      <motion.div
                        key="hifi-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        {/* Upper row info */}
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Welcome Resident</p>
                            <h5 className="font-display font-bold text-white text-base">Halla Mohamed</h5>
                          </div>
                          <span className="p-1.5 bg-violet-500/10 rounded-full text-violet-400 text-xs font-mono font-medium border border-violet-500/20">
                            98% Calm
                          </span>
                        </div>

                        {/* Interactive Widget */}
                        <div className="bg-gradient-to-br from-violet-600/10 via-slate-900 to-slate-900 border border-violet-500/20 p-4 rounded-2xl relative overflow-hidden backdrop-blur-md">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[11px] font-mono text-violet-400 font-semibold uppercase tracking-wider">Aura Analytics</span>
                            <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
                          </div>
                          <p className="text-white text-sm font-display font-medium">Emotional Biome: Deep Cosmos</p>
                          <p className="text-[11px] text-slate-400 mt-1">Excellent mood stability. Suggested activity is micro-breathing loops.</p>
                          
                          {/* Mini Mood Chart mockup with vector layout */}
                          <div className="mt-4 flex items-end justify-between h-14 px-1 gap-1.5 border-b border-dashed border-slate-800 pb-1">
                            <div className="flex-1 bg-violet-600/30 border-t border-violet-400/50 rounded h-[40%] animate-pulse" />
                            <div className="flex-1 bg-violet-600/40 border-t border-violet-400/50 rounded h-[65%] animate-pulse" />
                            <div className="flex-1 bg-violet-600/60 border-t border-violet-400/80 rounded h-[90%]" />
                            <div className="flex-1 bg-emerald-500/50 border-t border-emerald-400/80 rounded h-[75%] animate-pulse" />
                            <div className="flex-1 bg-emerald-500/20 border-t border-emerald-400/40 rounded h-[45%]" />
                          </div>
                          <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-1">
                            <span>08:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                          </div>
                        </div>

                        {/* Trigger Action */}
                        <button className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/10 active:scale-95 transition-all cursor-pointer">
                          Trigger AI Deep Breath Now
                        </button>
                      </motion.div>
                    ) : (
                      /* LOW FIDELITY WIREFRAME */
                      <motion.div
                        key="lofi-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4 font-mono text-slate-500 text-[11px]"
                      >
                        {/* Upper row info placeholder */}
                        <div className="flex justify-between items-center border border-dashed border-slate-700/60 p-2 rounded">
                          <div>
                            <p className="text-[9px] uppercase tracking-wider">[USER_METRICS]</p>
                            <h5 className="font-bold text-slate-300 uppercase">Halla Mohamed</h5>
                          </div>
                          <span className="px-1.5 py-0.5 border border-dashed border-slate-600 text-slate-400 text-[10px]">
                            [STABILITY_SCORE: 98]
                          </span>
                        </div>

                        {/* Chart Wireframe Placeholder */}
                        <div className="border border-dashed border-slate-700/80 p-3 rounded-lg flex flex-col justify-between h-[155px] relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] uppercase tracking-widest text-slate-600 select-none">
                            [WIDGET: GRAPH_CANVAS_01]
                          </div>
                          
                          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                            <span>[UI_GROUP: META]</span>
                            <span>[IP_NODE]</span>
                          </div>

                          {/* Placeholder wireframe line */}
                          <div className="w-full h-8 bg-zinc-900 border border-dashed border-zinc-700 relative flex items-center justify-center">
                            <span className="text-[8px] text-zinc-500">[BOX: CHART_SIMULATOR]</span>
                          </div>

                          <div className="flex justify-between text-[8px] text-zinc-500 pt-1">
                            <span>[X: T-0H]</span>
                            <span>[X: T-12H]</span>
                          </div>
                        </div>

                        {/* Button Wireframe Placeholder */}
                        <div className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-center text-slate-400 uppercase select-none text-[10px]">
                          [ACTION_BUTTON: AI_BREATH_TRIGGER]
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* USER PERSONAS */}
          {activeTab === "personas" && (
            <motion.div
              key="personas-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-violet-400 font-semibold text-sm">
                    SK
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-semibold text-slate-200">Sami K. (Sami, 23)</h5>
                    <p className="text-[10px] text-violet-400 font-mono">CS Major, Luxor</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  <strong>Pain Points:</strong> Easily overwhelmed by rigid calendar interfaces and clinical diagnosis grids.
                  <br />
                  <strong>Need:</strong> Minimalistic visual triggers aligned with warm, relaxing, personalized gamified systems.
                </p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 font-semibold text-sm">
                    FD
                  </div>
                  <div>
                    <h5 className="font-display text-sm font-semibold text-slate-200">Farida D. (Farida, 31)</h5>
                    <p className="text-[10px] text-emerald-400 font-mono">UI Designer, Cairo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  <strong>Pain Points:</strong> Finds traditional journaling layouts flat, demanding constant type entry.
                  <br />
                  <strong>Need:</strong> Floating visual tags and gesture controls that translate emotion summaries instantly.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
