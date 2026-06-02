import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowRightLeft, Radio, Server, Laptop, RefreshCw, HelpCircle } from "lucide-react";

type HandshakeStep = "IDLE" | "SYN_SENT" | "SYN_ACK_RECEIVED" | "ESTABLISHED";

export default function InteractiveHandshake() {
  const [step, setStep] = useState<HandshakeStep>("IDLE");
  const [clientSeq, setClientSeq] = useState(100);
  const [serverSeq, setServerSeq] = useState(500);
  const [logs, setLogs] = useState<string[]>(["Connection ready. Client in CLOSED state. Server of port 80/TCP in LISTEN state."]);

  const resetSimulator = () => {
    const randomClient = Math.floor(Math.random() * 500) + 100;
    const randomServer = Math.floor(Math.random() * 800) + 500;
    setClientSeq(randomClient);
    setServerSeq(randomServer);
    setStep("IDLE");
    setLogs(["Connection ready. Client in CLOSED state. Server of port 80/TCP in LISTEN state."]);
  };

  const handleNextStep = () => {
    if (step === "IDLE") {
      setStep("SYN_SENT");
      setLogs((prev) => [
        ...prev,
        `[Step 1] Client sends SYN packet. Seq = ${clientSeq}, Control Bit = SYN. state: SYN_SENT.`,
      ]);
    } else if (step === "SYN_SENT") {
      setStep("SYN_ACK_RECEIVED");
      setLogs((prev) => [
        ...prev,
        `[Step 2] Server receives SYN. Returns SYN-ACK packet. Seq = ${serverSeq}, Ack = ${clientSeq + 1}, Control Bits = SYN, ACK. state: SYN_RCVD.`,
      ]);
    } else if (step === "SYN_ACK_RECEIVED") {
      setStep("ESTABLISHED");
      setLogs((prev) => [
        ...prev,
        `[Step 3] Client receives SYN-ACK. Returns final ACK. Seq = ${clientSeq + 1}, Ack = ${serverSeq + 1}, Control Bit = ACK. state: ESTABLISHED!`,
        "Handshake completed! 3-way synchronization verified. Full-duplex byte stream established.",
      ]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-hover relative overflow-hidden" id="tcp-simulator">
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Mini Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
            <ArrowRightLeft className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-white">TCP 3-Way Handshake</h3>
            <p className="text-xs text-slate-400 font-sans">Interactive Network Protocol Simulator</p>
          </div>
        </div>
        <button
          onClick={resetSimulator}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset State
        </button>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Client node */}
        <div className="md:col-span-4 flex flex-col items-center p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl relative">
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${step === "ESTABLISHED" ? "bg-emerald-400 animate-ping" : step !== "IDLE" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
            <span className="text-[10px] text-slate-400 font-mono">
              {step === "IDLE" ? "CLOSED" : step === "SYN_SENT" ? "SYN_SENT" : step === "SYN_ACK_RECEIVED" ? "SYN_SENT" : "ESTABLISHED"}
            </span>
          </div>
          <Laptop className="w-12 h-12 text-violet-400 mb-2 mt-4" />
          <p className="font-display font-medium text-slate-200 text-sm">Client Agent</p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">IP: 192.168.1.15</p>
          
          <div className="mt-4 w-full bg-slate-900 border border-slate-800/50 rounded p-2.5 font-mono text-[11px]">
            <div className="text-slate-400 flex justify-between">
              <span>ISN (Initial):</span>
              <span className="text-violet-300 font-semibold">{clientSeq}</span>
            </div>
            <div className="text-slate-400 flex justify-between mt-1">
              <span>Current Seq:</span>
              <span className="text-white">
                {step === "IDLE" ? "-" : step === "SYN_SENT" ? clientSeq : clientSeq + 1}
              </span>
            </div>
            <div className="text-slate-400 flex justify-between mt-1">
              <span>Expected Ack:</span>
              <span className="text-violet-400">
                {step === "ESTABLISHED" ? serverSeq + 1 : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic connection path */}
        <div className="md:col-span-4 flex flex-col items-center justify-center min-h-[140px] relative px-4">
          <div className="w-full border-t-2 border-dashed border-slate-800 relative flex justify-center py-2">
            
            {/* Flying Packet Animation */}
            <AnimatePresence mode="wait">
              {step === "SYN_SENT" && (
                <motion.div
                  key="syn-packet"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-3.5 bg-violet-600/95 text-white font-mono text-[9px] px-2.5 py-1 rounded-full shadow-lg shadow-violet-500/10 border border-violet-400/30 flex items-center gap-1"
                >
                  <Radio className="w-3 h-3 animate-pulse" />
                  SYN [Seq={clientSeq}]
                </motion.div>
              )}

              {step === "SYN_ACK_RECEIVED" && (
                <motion.div
                  key="syn-ack-packet"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-3.5 bg-emerald-600/95 text-white font-mono text-[9px] px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/10 border border-emerald-400/30 flex items-center gap-1"
                >
                  <Radio className="w-3 h-3 animate-pulse" />
                  SYN-ACK [Seq={serverSeq}, Ack={clientSeq + 1}]
                </motion.div>
              )}

              {step === "ESTABLISHED" && (
                <motion.div
                  key="ack-packet"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, step: 0.5 }}
                  className="absolute -top-3.5 bg-indigo-600/95 text-white font-mono text-[9px] px-2.5 py-1 rounded-full shadow-lg shadow-indigo-500/10 border border-indigo-400/30 flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3" />
                  ACK [Seq={clientSeq + 1}, Ack={serverSeq + 1}]
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="text-slate-600 font-mono text-[10px] uppercase tracking-wider select-none">
              {step === "ESTABLISHED" ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Active Connection
                </span>
              ) : (
                "Data Pipe Link"
              )}
            </div>
          </div>
        </div>

        {/* Server node */}
        <div className="md:col-span-4 flex flex-col items-center p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl relative">
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${step === "ESTABLISHED" ? "bg-emerald-400 animate-ping" : step === "SYN_ACK_RECEIVED" ? "bg-amber-400 animate-pulse" : "bg-sky-400/70"}`} />
            <span className="text-[10px] text-slate-400 font-mono">
              {step === "IDLE" ? "LISTEN" : step === "SYN_SENT" ? "SYN_RCVD" : step === "SYN_ACK_RECEIVED" ? "SYN_RCVD" : "ESTABLISHED"}
            </span>
          </div>
          <Server className="w-12 h-12 text-emerald-400 mb-2 mt-4" />
          <p className="font-display font-medium text-slate-200 text-sm">Server (Port 80)</p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">IP: 10.0.0.2</p>

          <div className="mt-4 w-full bg-slate-900 border border-slate-800/50 rounded p-2.5 font-mono text-[11px]">
            <div className="text-slate-400 flex justify-between">
              <span>ISN (Initial):</span>
              <span className="text-emerald-300 font-semibold">{serverSeq}</span>
            </div>
            <div className="text-slate-400 flex justify-between mt-1">
              <span>Received Client Seq:</span>
              <span className="text-white">
                {step !== "IDLE" ? clientSeq : "-"}
              </span>
            </div>
            <div className="text-slate-400 flex justify-between mt-1">
              <span>Outbound Seq:</span>
              <span className="text-emerald-400">
                {step === "SYN_ACK_RECEIVED" || step === "ESTABLISHED" ? serverSeq : "-"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Simulator Control Area */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-slate-950/50 p-4 border border-slate-800/60 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-400 max-w-md">
          <HelpCircle className="w-4 h-4 text-violet-400 shrink-0" />
          <span>
            {step === "IDLE" && "Click Synchronize to initiate packet flow and synchronize sequence numbers from the Client."}
            {step === "SYN_SENT" && "Client has sent the SYN flag. Trigger Server Response to reply with a synchronized SYN-ACK response."}
            {step === "SYN_ACK_RECEIVED" && "Server acknowledged your sequence number. Hit Ack Completion to dispatch the final handshake ACK."}
            {step === "ESTABLISHED" && "Handshake complete! TCP state machine is fully connected, ready to stream secure application data."}
          </span>
        </div>

        {step !== "ESTABLISHED" ? (
          <button
            onClick={handleNextStep}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium rounded-lg text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {step === "IDLE" && "Step 1: Send SYN"}
            {step === "SYN_SENT" && "Step 2: Reply SYN-ACK"}
            {step === "SYN_ACK_RECEIVED" && "Step 3: Dispatch ACK"}
          </button>
        ) : (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 self-center">
            <ShieldCheck className="w-4 h-4" /> Ready for Traffic
          </div>
        )}
      </div>

      {/* System output logs */}
      <div className="mt-5 border border-slate-800/60 rounded-lg overflow-hidden bg-slate-950">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-[10px] text-slate-500 font-mono tracking-wider uppercase flex justify-between items-center">
          <span>Simulation Event Logger</span>
          <span className="text-[9px] lowercase px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">active</span>
        </div>
        <div className="p-3.5 font-mono text-xs max-h-[140px] overflow-y-auto space-y-2 text-slate-300 no-scrollbar">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-violet-500 select-none">&gt;</span>
              <p className={index === logs.length - 1 ? "text-slate-100 font-medium" : "text-slate-400"}>
                {log}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
