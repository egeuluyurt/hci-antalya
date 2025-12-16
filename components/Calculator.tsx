"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
  const [rooms, setRooms] = useState(200);
  const [formState, setFormState] = useState<"idle" | "processing" | "success">("idle");
  
  const savings = (rooms * 450).toLocaleString("en-US");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("processing");
    // Bekleme süresi animasyonu
    setTimeout(() => {
      setFormState("success");
    }, 2500);
  };

  return (
    <section id="audit-engine" className="py-24 px-6 bg-[#0B0E14] border-b border-[#2A3241] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151922_1px,transparent_1px),linear-gradient(to_bottom,#151922_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* SOL PANEL */}
        <div className="bg-[#151922] border border-[#2A3241] p-8 lg:p-12 relative group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF41] to-transparent opacity-50" />
           <h3 className="font-mono text-[#00FF41] mb-8 flex items-center gap-2">
             <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
             INPUT_PARAMETERS
           </h3>
           <div className="space-y-12">
             <div>
               <label className="font-mono text-xs text-gray-500 mb-4 block">TOTAL_ASSET_VOLUME</label>
               <input 
                 type="range" 
                 min="50" 
                 max="1000" 
                 step="10"
                 value={rooms}
                 onChange={(e) => setRooms(Number(e.target.value))}
                 className="w-full h-2 bg-[#0B0E14] appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00FF41] [&::-webkit-slider-thumb]:rounded-full"
               />
               <div className="mt-4 font-mono text-4xl text-white">
                 {rooms} <span className="text-sm text-gray-600">UNITS</span>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-8 border-t border-[#2A3241] pt-8">
               <div>
                 <div className="font-mono text-[10px] text-gray-500 mb-1 tracking-widest">INDUSTRY_BASELINE</div>
                 <div className="font-mono text-gray-400 text-sm flex flex-col">
                    <span>MARKET_STANDARD_COMPOUND</span>
                    <span className="text-[10px] opacity-50">(RAPID_DEGRADATION)</span>
                 </div>
               </div>
               <div>
                 <div className="font-mono text-[10px] text-gray-500 mb-1 tracking-widest">HCI_PROJECTION</div>
                 <div className="font-mono text-[#00FF41] text-sm flex flex-col">
                    <span>ENGINEERED_MATRIX</span>
                    <span className="text-[10px] opacity-70">✓ (HIGH_DURABILITY)</span>
                 </div>
               </div>
             </div>
             {/* DÜZELTME: Özel karakter kullanımı güvenli hale getirildi */}
             <div className="bg-red-500/5 border border-red-500/20 p-4 rounded text-[10px] font-mono text-gray-400">
               <span className="text-red-500 font-bold block mb-1">LAB_NOTE:</span>
               Standard density substrates typically suffer <span className="text-white">&gt;35% structural collapse</span> (compression set) under cyclic operational stress, leading to premature asset replacement.
             </div>
           </div>
        </div>

        {/* SAĞ PANEL: FORM VE SONUÇ EKRANI */}
        <div className="bg-black border border-[#2A3241] relative flex flex-col justify-center overflow-hidden min-h-[500px]">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 opacity-30 blur-md select-none pointer-events-none">
             <div className="text-gray-500 font-mono text-sm mb-2">POTENTIAL_OPEX_RECOVERY</div>
             <div className="text-8xl font-black text-[#00FF41]">€{savings}</div>
             <div className="text-gray-500 font-mono text-xs mt-4">ANNUAL_PROJECTION</div>
          </div>

          <div className="relative z-10 w-full h-full bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
              
              {formState === "idle" && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full max-w-sm"
                >
                  <div className="text-center mb-6">
                    <div className="inline-block border border-[#00FF41]/50 text-[#00FF41] font-mono text-[10px] tracking-widest px-3 py-1 mb-4 bg-[#00FF41]/10">
                      ⚠ REPORT_LOCKED
                    </div>
                    <h3 className="text-white font-bold text-xl tracking-tight">REQUEST CUSTOM ANALYSIS</h3>
                    <p className="text-gray-500 text-xs mt-2 font-mono">
                      Submit your volume data for a specific financial projection.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div><input required type="text" placeholder="AUTHORIZED_PERSONNEL_NAME" className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700" /></div>
                    <div><input required type="tel" placeholder="SECURE_LINE (Intl. Format: +XX...)" className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700" /></div>
                    <div><input required type="email" placeholder="CORPORATE_EMAIL_ID" className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700" /></div>
                    <div className="relative">
                      <select className="w-full bg-[#0f1219] border border-[#2A3241] text-gray-400 p-4 font-mono text-xs focus:border-[#00FF41] outline-none appearance-none cursor-pointer">
                        <option value="">SELECT_SECURITY_CLEARANCE_LEVEL</option>
                        <option value="GM">General Manager (Level 5)</option>
                        <option value="PURCHASING">Procurement Director (Level 4)</option>
                        <option value="HK">Executive Housekeeper (Level 3)</option>
                        <option value="OTHER">Operations (Level 2)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">▼</div>
                    </div>
                    <button type="submit" className="w-full bg-[#00FF41] text-black font-bold font-mono py-4 hover:bg-white transition-colors tracking-widest text-xs mt-4">&gt; REQUEST_PROJECTION</button>
                  </form>
                </motion.div>
              )}

              {formState === "processing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-12 h-12 border-2 border-[#2A3241] border-t-[#00FF41] rounded-full animate-spin mx-auto mb-6" />
                  <div className="font-mono text-[#00FF41] text-xs animate-pulse">UPLOADING_DATA... <br/>QUEUING_FOR_REVIEW</div>
                </motion.div>
              )}

              {/* SONUÇ EKRANI */}
              {formState === "success" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center w-full max-w-md"
                >
                   <div className="font-mono text-[#00FF41] text-[10px] mb-6 border border-[#00FF41] inline-block px-3 py-1">
                     DATA_RECEIVED
                   </div>
                   <div className="mb-8 relative">
                     <p className="font-mono text-gray-500 text-[10px] mb-2 uppercase tracking-widest">Projected Case Volume</p>
                     <div className="text-7xl font-black text-white tracking-tighter">
                       {rooms}
                     </div>
                     <p className="font-mono text-[#00FF41] text-[10px] mt-2 bg-[#00FF41]/10 inline-block px-2 py-1">UNITS_UNDER_REVIEW</p>
                   </div>
                   <div className="bg-[#151922] p-6 border-l-2 border-[#00FF41] text-left">
                     <p className="text-white text-sm font-mono mb-3 font-bold">
                       <span className="text-[#00FF41] mr-2">✓</span> 
                       CASE FILE #9281 QUEUED.
                     </p>
                     <p className="text-gray-500 text-xs font-mono leading-relaxed mb-4">
                       Your simulation data has been uploaded to the Regional Audit Team.
                     </p>
                     <div className="text-[10px] text-gray-400 border-t border-[#2A3241] pt-3 mt-3">
                        {/* DÜZELTME: >> yerine &gt;&gt; kullandık */}
                        <p className="mb-1"><span className="text-[#00FF41]">&gt;&gt;</span> STATUS: Pending Human Analysis.</p>
                        <p><span className="text-[#00FF41]">&gt;&gt;</span> ETA: Due to high demand, expect auditor contact within <span className="text-white font-bold">5-7 business days</span>.</p>
                     </div>
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}