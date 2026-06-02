import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Radio, Sliders, Activity, Sparkles, HelpCircle, RefreshCw, Zap } from "lucide-react";

interface EchoState {
  id: number;
  pitch: string;
  volume: number; // 0 to 1
  timeOffset: number; // ms
}

export default function InteractiveDSPDelay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthesizerType, setSynthesizerType] = useState<OscillatorType>("triangle");
  const [delayTime, setDelayTime] = useState(0.4); // 0.1s to 1.0s
  const [feedback, setFeedback] = useState(0.6); // 10% to 95%
  const [volume, setVolume] = useState(0.5); // 0 to 1
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [echoes, setEchoes] = useState<EchoState[]>([]);
  const [echoTimeline, setEchoTimeline] = useState<number[]>([]);
  
  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const feedbackGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const outputGainRef = useRef<GainNode | null>(null);

  // Pentatonic scale corresponding to C4, D4, E4, G4, A4, C5
  const keys = [
    { note: "C4", name: "Do", freq: 261.63, color: "from-violet-500 to-indigo-500 hover:shadow-violet-500/20" },
    { note: "D4", name: "Re", freq: 293.66, color: "from-indigo-500 to-blue-500 hover:shadow-indigo-500/20" },
    { note: "E4", name: "Mi", freq: 329.63, color: "from-blue-500 to-teal-500 hover:shadow-blue-500/20" },
    { note: "G4", name: "Sol", freq: 392.00, color: "from-teal-500 to-emerald-500 hover:shadow-emerald-500/20" },
    { note: "A4", name: "La", freq: 440.00, color: "from-emerald-500 to-amber-500 hover:shadow-emerald-500/20" },
    { note: "C5", name: "Do⁺", freq: 523.25, color: "from-amber-500 to-rose-500 hover:shadow-rose-500/20" },
  ];

  // Lazy initialize Audio Nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output volume gain
      const outputGain = ctx.createGain();
      outputGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      outputGain.connect(ctx.destination);
      outputGainRef.current = outputGain;

      // Delay Node
      const delayNode = ctx.createDelay(2.0);
      delayNode.delayTime.setValueAtTime(delayTime, ctx.currentTime);
      delayNodeRef.current = delayNode;

      // Feedback Gain Node
      const feedbackGain = ctx.createGain();
      feedbackGain.gain.setValueAtTime(feedback, ctx.currentTime);
      feedbackGainRef.current = feedbackGain;

      // Wire up delay node & feedback loops
      delayNode.connect(feedbackGain);
      feedbackGain.connect(delayNode); // feedback loop
      
      // Route delay outputs to master out
      delayNode.connect(outputGain);

      setIsAudioEnabled(true);
    } catch (e) {
      console.warn("Failed to initiate audio context", e);
    }
  };

  // Sync parameter alterations down to Web Audio nodes instantly
  useEffect(() => {
    if (delayNodeRef.current && audioCtxRef.current) {
      delayNodeRef.current.delayTime.setValueAtTime(delayTime, audioCtxRef.current.currentTime);
    }
  }, [delayTime]);

  useEffect(() => {
    if (feedbackGainRef.current && audioCtxRef.current) {
      feedbackGainRef.current.gain.setValueAtTime(feedback, audioCtxRef.current.currentTime);
    }
  }, [feedback]);

  useEffect(() => {
    if (outputGainRef.current && audioCtxRef.current) {
      outputGainRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Handle keypress triggering sounds & echo simulator visualizations
  const triggerNote = (freq: number, noteName: string) => {
    initAudio();

    const ctx = audioCtxRef.current;
    const master = outputGainRef.current;
    
    // Resume context if suspended (browser behavior)
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }

    // Add to UI states
    setActiveNotes((prev) => [...prev, noteName]);
    setTimeout(() => {
      setActiveNotes((prev) => prev.filter((n) => n !== noteName));
    }, 200);

    // Generate simulated visualization decay timeline
    const nowId = Date.now();
    const echoesArray: EchoState[] = [];
    let currentVol = 0.9;
    for (let i = 1; i <= 5; i++) {
      currentVol = currentVol * feedback;
      if (currentVol < 0.05) break;
      echoesArray.push({
        id: nowId + i,
        pitch: noteName,
        volume: currentVol * volume,
        timeOffset: i * delayTime * 1000,
      });
    }

    setEchoes((prev) => [...prev, ...echoesArray]);
    echoesArray.forEach((echo) => {
      setTimeout(() => {
        setEchoes((prev) => prev.filter((e) => e.id !== echo.id));
        // Softly animate feedback flash
        setEchoTimeline((prev) => [...prev, echo.volume]);
        setTimeout(() => {
          setEchoTimeline((prev) => prev.slice(1));
        }, 150);
      }, echo.timeOffset);
    });

    if (!ctx || !master || !delayNodeRef.current) return;

    // Build real Oscillator Node
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = synthesizerType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Dynamic ADSR envelope setup
    noteGain.gain.setValueAtTime(0.0, ctx.currentTime);
    noteGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.02); // transient attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35); // decay

    // Connect oscillator to both master out AND delay system
    osc.connect(noteGain);
    noteGain.connect(master);
    noteGain.connect(delayNodeRef.current);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-hover relative overflow-hidden" id="dsp-simulator">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Suggestion Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold rounded-full mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        DSP Audio Delay & Synthesizer Sandbox
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-white">Digital Physical Delay Simulator (delay_dsp)</h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            A real-time signal feedback path modeling audio delay lines using hardware-software simulation.
          </p>
        </div>

        {/* Sync state audio mode indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              initAudio();
              if (audioCtxRef.current) {
                if (audioCtxRef.current.state === "suspended") {
                  audioCtxRef.current.resume();
                }
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 border uppercase ${
              isAudioEnabled 
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" 
                : "bg-slate-950 text-slate-400 border-slate-800"
            }`}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Audio Engine: Live</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span>Tap keys to initialize Sound</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main DSP Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Signal chain controls on the left */}
        <div className="lg:col-span-4 space-y-4 bg-slate-950/40 p-4 border border-slate-800 rounded-xl">
          <div className="text-[10px] font-mono tracking-wider uppercase text-slate-500 flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <Sliders className="w-3.5 h-3.5 text-violet-400" />
            <span>Digital Signal parameters</span>
          </div>

          {/* Synth Select type */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] text-slate-400 font-mono">Analog Oscillator Wave:</span>
            <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 border border-slate-850 rounded-lg">
              {(["triangle", "sine", "sawtooth", "square"] as OscillatorType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSynthesizerType(type)}
                  className={`py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                    synthesizerType === type
                      ? "bg-violet-600 text-white font-bold"
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Delay Line Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-slate-400">Delay Time (s)</span>
              <span className="text-violet-400 font-bold">{delayTime.toFixed(2)}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.2"
              step="0.05"
              value={delayTime}
              onChange={(e) => setDelayTime(Number(e.target.value))}
              className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          {/* Feedback loop Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-slate-400">Feedback Echo Loop</span>
              <span className="text-emerald-400 font-bold">{(feedback * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.85"
              step="y.05"
              value={feedback}
              onChange={(e) => setFeedback(Number(e.target.value))}
              className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Output Level Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-slate-400">Output Gain (Volume)</span>
              <span className="text-slate-400">{(volume * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-slate-300"
            />
          </div>
        </div>

        {/* Oscilloscope Waveform simulator in the middle */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          
          {/* Wave and Delay visualization */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 h-44 relative flex flex-col justify-between overflow-hidden">
            
            {/* Background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Visualizer Header */}
            <div className="flex justify-between items-center font-mono text-[9px] text-slate-500 z-10">
              <span className="flex items-center gap-1.5 uppercase font-semibold">
                <Activity className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                Dual Oscilloscope (echo tracking)
              </span>
              <span>10.0ms / DIV</span>
            </div>

            {/* Simulated feedback Delay waves */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-32 opacity-80" viewBox="0 0 400 100">
                {/* Dry wave (Zero delay) */}
                <motion.path
                  d="M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.5"
                  animate={{
                    d: activeNotes.length > 0 
                      ? [
                          "M0,50 Q40,5 80,50 T160,50 T240,50 T320,50 T400,50",
                          "M0,50 Q40,95 80,50 T160,50 T240,50 T320,50 T400,50",
                          "M0,50 Q40,50 80,50 T160,50 T240,50 T320,50 T400,50"
                        ]
                      : "M0,50 Q40,50 80,50 T160,50 T240,50 T320,50 T400,50"
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />

                {/* Wet Echo Decay waves */}
                {echoTimeline.map((vol, index) => (
                  <motion.path
                    key={index}
                    d={`M0,50 Q40,${50 - (25 * vol)} 80,50 T160,50 T240,50 T320,50 T400,50`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1"
                    opacity={vol}
                    className="animate-pulse"
                  />
                ))}
              </svg>
            </div>

            {/* Echo Node list */}
            <div className="flex gap-1.5 flex-wrap z-10 overflow-hidden select-none max-h-16">
              <AnimatePresence>
                {echoes.map((echo) => (
                  <motion.div
                    key={echo.id}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 10 }}
                    className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] rounded-full flex items-center gap-1 shrink-0"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    <span>Echo ({echo.pitch}): -{((1 - echo.volume) * 100).toFixed(0)}dB</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-1.5 z-10">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Feedback gain coefficient: {feedback}
              </span>
              <span>Delay line memory state: stable</span>
            </div>
          </div>

          {/* Pentatonic Keys */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
              Play Dual Pitch Keys Matrix:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {keys.map((key) => {
                const isActive = activeNotes.includes(key.note);
                return (
                  <button
                    key={key.note}
                    onClick={() => triggerNote(key.freq, key.note)}
                    className={`p-3 rounded-xl border flex flex-col justify-between items-center text-center transition-all bg-gradient-to-b bg-slate-950 border-slate-800 ${key.color} shadow-lg relative overflow-hidden group select-none h-20 active:scale-95 cursor-pointer`}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`text-[10px] uppercase font-mono font-bold ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-350"}`}>
                      {key.note}
                    </span>
                    <span className="text-white text-base font-bold tracking-tight">
                      {key.name}
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono line-clamp-1 block">
                      {key.freq.toFixed(0)}Hz
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeCircle"
                        className="absolute inset-0 bg-white/10 pointer-events-none"
                        transition={{ type: "spring", damping: 15 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Instructional explanation banner */}
      <div className="mt-5 p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-start gap-2.5">
        <HelpCircle className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5" />
        <div className="text-[11px] font-sans text-slate-400 leading-relaxed">
          <strong>Signal Routing explanation:</strong> Sound is initiated from the oscillator, connected to a master output gain block, and simultaneously routed directly to a dynamic memory delay line. The output of the delay line is scaled by a multiplier feedback multiplier factor and fed directly back into itself, achieving cascading exponential echosevent decaying states in exact timing alignment.
        </div>
      </div>
    </div>
  );
}
