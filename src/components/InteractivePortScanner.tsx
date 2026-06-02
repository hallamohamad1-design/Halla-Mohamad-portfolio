import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, Cpu, RefreshCw } from "lucide-react";

interface PortScanItem {
  port: number;
  service: string;
  status: "OPEN" | "CLOSED" | "FILTERED";
  threat: "low" | "medium" | "high" | "safe";
  description: string;
  vulnerability?: string;
}

const PORT_PRESETS = {
  web_server: [
    { port: 22, service: "SSH", status: "CLOSED", threat: "safe", description: "Secure Shell closed. Remote terminal disabled." },
    { port: 80, service: "HTTP", status: "OPEN", threat: "low", description: "Unencrypted standard web server endpoint." },
    { port: 443, service: "HTTPS", status: "OPEN", threat: "safe", description: "Secure SSL encrypted web endpoint." },
    { port: 3306, service: "MySQL", status: "FILTERED", threat: "medium", description: "Database accessible only from whitelisted IPs." },
    { port: 8080, service: "HTTP-ALT", status: "OPEN", threat: "high", description: "Development Tomcat/Node web server active." },
  ] as PortScanItem[],
  iot_router: [
    { port: 21, service: "FTP", status: "OPEN", threat: "high", description: "Anonymous FTP server with read permissions active!" },
    { port: 22, service: "SSH", status: "OPEN", threat: "medium", description: "SSH daemon running. Default credentials check advised." },
    { port: 23, service: "Telnet", status: "OPEN", threat: "high", description: "Cleartext Telnet admin access. Extremely high exploit vector!" },
    { port: 80, service: "HTTP", status: "OPEN", threat: "medium", description: "Router admin login console exposed." },
    { port: 554, service: "RTSP", status: "CLOSED", threat: "safe", description: "Streaming Protocol closed." },
  ] as PortScanItem[],
  custom_host: [
    { port: 25, service: "SMTP", status: "CLOSED", threat: "safe", description: "Simple Mail Transfer protocol disabled." },
    { port: 53, service: "DNS", status: "FILTERED", threat: "low", description: "Domain name resolution filtered behind cluster." },
    { port: 80, service: "HTTP", status: "CLOSED", threat: "safe", description: "HTTP traffic closed." },
    { port: 443, service: "HTTPS", status: "OPEN", threat: "safe", description: "Client landing portal securely hosted." },
    { port: 3000, service: "ViteDev", status: "OPEN", threat: "low", description: "Dev server exposed. Port whitelisted for testing environments." },
  ] as PortScanItem[],
};

export default function InteractivePortScanner() {
  const [ip, setIp] = useState("192.168.1.1");
  const [preset, setPreset] = useState<"web_server" | "iot_router" | "custom_host">("web_server");
  const [isScanning, setIsScanning] = useState(false);
  const [currentScanIndex, setCurrentScanIndex] = useState(-1);
  const [scannedPorts, setScannedPorts] = useState<PortScanItem[]>([]);
  const [activeConsoleLog, setActiveConsoleLog] = useState<string[]>([]);

  const startScan = async () => {
    setIsScanning(true);
    setScannedPorts([]);
    setCurrentScanIndex(-1);
    
    const logs = [
      `Initializing port-scan query against target IP: ${ip}`,
      `Parsing default service ports (TCP/IP socket protocol hierarchy)...`,
      `Establishing socket synchronization boundaries...`,
    ];
    
    // Simulate interactive scanner outputs
    setActiveConsoleLog([logs[0]]);
    await new Promise((r) => setTimeout(r, 400));
    setActiveConsoleLog((prev) => [...prev, logs[1]]);
    await new Promise((r) => setTimeout(r, 400));
    setActiveConsoleLog((prev) => [...prev, logs[2]]);
    await new Promise((r) => setTimeout(r, 400));

    const selectedPreset = PORT_PRESETS[preset];
    
    for (let i = 0; i < selectedPreset.length; i++) {
      setCurrentScanIndex(i);
      const portItem = selectedPreset[i];
      
      setActiveConsoleLog((prev) => [
        ...prev,
        `Probing TCP Port ${portItem.port} (${portItem.service})... Send SYN packet.`,
      ]);
      
      await new Promise((r) => setTimeout(r, 650));
      
      let statusLog = "";
      if (portItem.status === "OPEN") {
        statusLog = `[SUCCESS] Port ${portItem.port}: SYN-ACK received. Socket State: OPEN.`;
      } else if (portItem.status === "FILTERED") {
        statusLog = `[TIMEOUT] Port ${portItem.port}: No response. Whitelist/Firewall check detected. Socket State: FILTERED.`;
      } else {
        statusLog = `[REFUSED] Port ${portItem.port}: RST received. Socket State: CLOSED.`;
      }
      
      setActiveConsoleLog((prev) => [...prev, statusLog]);
      setScannedPorts((prev) => [...prev, portItem]);
    }

    setActiveConsoleLog((prev) => [
      ...prev,
      `Scan query complete. Target report processed. Checked ${selectedPreset.length} sockets.`,
    ]);
    setIsScanning(false);
  };

  const threatColor = (threat: string) => {
    switch (threat) {
      case "high":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "low":
        return "text-sky-400 bg-sky-500/10 border-sky-500/20";
      default:
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-hover relative overflow-hidden" id="port-scanner">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-white">Interactive Port Scanner</h3>
            <p className="text-xs text-slate-400 font-sans">Security Analysis & Socket Tracer</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 text-xs font-mono">Target preset:</span>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value as any)}
            disabled={isScanning}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-50"
          >
            <option value="web_server">Production Server</option>
            <option value="iot_router">Vulnerable Router</option>
            <option value="custom_host">Secure Sandbox</option>
          </select>
        </div>
      </div>

      {/* Target input console */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        <div className="md:col-span-8 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-[11px] font-mono text-emerald-500/70 select-none">ip_addr://</span>
            </div>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              disabled={isScanning}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-20 pr-4 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent select-all transition-all disabled:opacity-75"
            />
          </div>
          <button
            onClick={startScan}
            disabled={isScanning}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-medium rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                Scan Target
              </>
            )}
          </button>
        </div>

        <div className="md:col-span-4 flex items-center justify-end">
          <div className="text-right text-[11px] text-slate-500 font-mono">
            {isScanning ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Cpu className="w-3 h-3 animate-spin" /> Active Probing Sockets
              </span>
            ) : (
              <span>Ready. Selected {PORT_PRESETS[preset].length} key sockets.</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal logs panel */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800/80 p-4 font-mono text-xs text-slate-300 relative">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
            </div>
            <span className="text-[9px] text-slate-500">tracer_node.log</span>
          </div>

          <div className="space-y-2 h-[220px] overflow-y-auto no-scrollbar pb-2">
            {activeConsoleLog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <Terminal className="w-8 h-8 opacity-40 mb-1" />
                <p className="text-[10px]">Execute scan query above to trigger traces.</p>
              </div>
            ) : (
              activeConsoleLog.map((log, i) => (
                <div key={i} className="flex gap-1.5 text-[11px] leading-relaxed">
                  <span className="text-emerald-500 select-none">#</span>
                  <span className={i === activeConsoleLog.length - 1 ? "text-emerald-300" : "text-slate-400"}>
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scan Results Board */}
        <div className="lg:col-span-7 bg-slate-950/60 rounded-xl border border-slate-800 p-4 font-sans text-slate-300">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider flex items-center justify-between">
            <span>Scan Diagnostics Readout</span>
            {scannedPorts.length > 0 && (
              <span className="text-[10px] text-slate-500 font-mono font-normal">
                {scannedPorts.filter((p) => p.status === "OPEN").length} open ports detected
              </span>
            )}
          </div>

          <div className="space-y-3 h-[220px] overflow-y-auto no-scrollbar pr-1">
            {scannedPorts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 border border-dashed border-slate-800/80 rounded-lg">
                <ShieldCheck className="w-10 h-10 text-emerald-500/30" />
                <p className="text-xs">No host diagnostics currently active</p>
              </div>
            ) : (
              scannedPorts.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.port}
                  className="bg-slate-900 border border-slate-800/50 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-semibold text-white">Port {item.port}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-1.5 py-0.2 rounded">
                          {item.service}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 justify-between md:justify-end">
                    {/* Status badges */}
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-medium border ${
                        item.status === "OPEN"
                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                          : item.status === "FILTERED"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          : "text-slate-400 bg-slate-800 border-transparent"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Threat indicator */}
                    <span
                      className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-medium border ${threatColor(
                        item.threat
                      )}`}
                    >
                      {item.threat === "high" ? "Critical Risk" : item.threat === "medium" ? "Risk Advisory" : item.threat === "low" ? "Standard Asset" : "Secure System"}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
