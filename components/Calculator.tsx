"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Calculator() {
  const [rooms, setRooms] = useState(200);
  const [formState, setFormState] = useState<"idle" | "processing" | "success">("idle");
  const [lang, setLang] = useState("EN");

  // Dil Hafızasını Dinle
  useEffect(() => {
    const checkLang = () => {
      const savedLang = localStorage.getItem("language") || "EN";
      if (savedLang !== lang) setLang(savedLang);
    };
    const interval = setInterval(checkLang, 100);
    return () => clearInterval(interval);
  }, [lang]);

  const dict = {
    TR: {
      input_title: "GİRDİ_PARAMETRELERİ",
      volume_label: "TOPLAM_VARLIK_HACMİ",
      units: "ADET",
      baseline: "SEKTÖR_ORTALAMASI",
      standard: "STANDART_PAZAR_BİLEŞENİ",
      degradation: "(HIZLI_DEFORMASYON)",
      projection: "HCI_PROJEKSİYONU",
      engineered: "MÜHENDİSLİK_MATRİSİ",
      durability: "✓ (YÜKSEK_DAYANIKLILIK)",
      lab_note: "Standart yoğunluktaki malzemeler, döngüsel operasyonel stres altında genellikle %35'ten fazla yapısal çökme yaşar ve bu da varlıkların vaktinden önce değiştirilmesine neden olur.",
      recovery_label: "POTANSİYEL_OPEX_GERİ_KAZANIMI",
      annual: "YILLIK_PROJEKSİYON",
      report_locked: "⚠ RAPOR_KİLİTLİ",
      request_title: "ÖZEL ANALİZ TALEP EDİN",
      request_desc: "Spesifik bir finansal projeksiyon için hacim verilerinizi gönderin.",
      ph_name: "YETKİLİ_PERSONEL_ADI",
      ph_phone: "GÜVENLİ_HAT (Uluslararası Format: +90...)",
      ph_email: "KURUMSAL_E-POSTA_KİMLİĞİ",
      select_level: "GÜVENLİK_YETKİ_SEVİYESİ_SEÇİN",
      levels: ["Genel Müdür (Seviye 5)", "Satın Alma Direktörü (Seviye 4)", "Kat Hizmetleri Müdürü (Seviye 3)", "Operasyon (Seviye 2)"],
      btn_request: "> PROJEKSİYON_TALEP_ET",
      uploading: "VERİ_YÜKLENİYOR... KUYRUĞA_ALINIYOR",
      received: "VERİ_ALINDI",
      case_file: "✓ DOSYA #9281 KUYRUĞA ALINDI.",
      success_desc: "Simülasyon verileriniz Bölge Denetim Ekibine yüklenmiştir.",
      status_note: "DURUM: İnsan Analizi Bekleniyor.",
      eta_note: "TAHMİNİ SÜRE: Yoğun talep nedeniyle 5-7 iş günü içinde iletişime geçilecektir."
    },
    EN: {
      input_title: "INPUT_PARAMETERS",
      volume_label: "TOTAL_ASSET_VOLUME",
      units: "UNITS",
      baseline: "INDUSTRY_BASELINE",
      standard: "MARKET_STANDARD_COMPOUND",
      degradation: "(RAPID_DEGRADATION)",
      projection: "HCI_PROJECTION",
      engineered: "ENGINEERED_MATRIX",
      durability: "✓ (HIGH_DURABILITY)",
      lab_note: "Standard density substrates typically suffer >35% structural collapse (compression set) under cyclic operational stress, leading to premature asset replacement.",
      recovery_label: "POTENTIAL_OPEX_RECOVERY",
      annual: "ANNUAL_PROJECTION",
      report_locked: "⚠ REPORT_LOCKED",
      request_title: "REQUEST CUSTOM ANALYSIS",
      request_desc: "Submit your volume data for a specific financial projection.",
      ph_name: "AUTHORIZED_PERSONNEL_NAME",
      ph_phone: "SECURE_LINE (Intl. Format: +XX...)",
      ph_email: "CORPORATE_EMAIL_ID",
      select_level: "SELECT_SECURITY_CLEARANCE_LEVEL",
      levels: ["General Manager (Level 5)", "Procurement Director (Level 4)", "Executive Housekeeper (Level 3)", "Operations (Level 2)"],
      btn_request: "> REQUEST_PROJECTION",
      uploading: "UPLOADING_DATA... QUEUING_FOR_REVIEW",
      received: "DATA_RECEIVED",
      case_file: "✓ CASE FILE #9281 QUEUED.",
      success_desc: "Your simulation data has been uploaded to the Regional Audit Team.",
      status_note: "STATUS: Pending Human Analysis.",
      eta_note: "ETA: Due to high demand, expect auditor contact within 5-7 business days."
    },
    DE: {
      input_title: "EINGABEPARAMETER",
      volume_label: "GESAMT_BESTANDSVOLUMEN",
      units: "EINHEITEN",
      baseline: "BRANCHENSTANDARD",
      standard: "MARKT_STANDARDKOMPONENTE",
      degradation: "(SCHNELLER_VERSCHLEISS)",
      projection: "HCI_PROGNOSE",
      engineered: "ENGINEERED_MATRIX",
      durability: "✓ (HOHE_LANGLEBIGKEIT)",
      lab_note: "Substrate mit Standarddichte erleiden bei zyklischer Belastung oft einen strukturellen Zusammenbruch von >35%, was zu vorzeitigem Austausch führt.",
      recovery_label: "POTENZIELLE_OPEX_RÜCKGEWINNUNG",
      annual: "JÄHRLICHE_PROGNOSE",
      report_locked: "⚠ BERICHT_GESPERRT",
      request_title: "INDIVIDUELLE ANALYSE ANFORDERN",
      request_desc: "Senden Sie Ihre Daten für eine spezifische Finanzprognose.",
      ph_name: "NAME_DER_AUTORISIERTEN_PERSON",
      ph_phone: "SICHERE_LEITUNG (Intl. Format: +XX...)",
      ph_email: "UNTERNEHMENS_EMAIL_ID",
      select_level: "SICHERHEITSSTUFE_WÄHLEN",
      levels: ["Geschäftsführer (Stufe 5)", "Einkaufsleiter (Stufe 4)", "Hausdame (Stufe 3)", "Betrieb (Stufe 2)"],
      btn_request: "> PROGNOSE_ANFORDERN",
      uploading: "DATEN_WERDEN_HOCHGELADEN...",
      received: "DATEN_EMPFANGEN",
      case_file: "✓ FALLAKTE #9281 EINGEREIHT.",
      success_desc: "Ihre Simulationsdaten wurden an das regionale Audit-Team übertragen.",
      status_note: "STATUS: Wartet auf menschliche Analyse.",
      eta_note: "VORAUSSICHTLICHE DAUER: Kontakt innerhalb von 5-7 Werktagen."
    }
  };

  const current = (dict as any)[lang] || dict.EN;
  const savings = (rooms * 450).toLocaleString("en-US");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("processing");

    // Form verilerini topluyoruz
    const formData = {
      name: (e.target as any)[0].value,
      phone: (e.target as any)[1].value,
      email: (e.target as any)[2].value,
      level: (e.target as any)[3].value,
      rooms: rooms
    };

    try {
      // Senin kopyaladığın URL'yi buraya ekledim
      await fetch("https://script.google.com/macros/s/AKfycbxoK48LUS-TeARqkz0oIncLcvFrQjW-U2US1CFsb5zGI6Q5XxOPbZ0RLJbOPAmXgmZ6LA/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      setFormState("success");
    } catch (error) {
      console.error("Hata:", error);
      setFormState("idle");
      alert("Bağlantı hatası oluştu.");
    }
  };

  return (
    <section id="audit-engine" className="py-24 px-6 bg-[#0B0E14] border-b border-[#2A3241] relative overflow-hidden text-white">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151922_1px,transparent_1px),linear-gradient(to_bottom,#151922_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* SOL PANEL */}
        <div className="bg-[#151922] border border-[#2A3241] p-8 lg:p-12 relative group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF41] to-transparent opacity-50" />
           <h3 className="font-mono text-[#00FF41] mb-8 flex items-center gap-2 uppercase">
             <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
             {current.input_title}
           </h3>
           <div className="space-y-12">
             <div>
               <label className="font-mono text-xs text-gray-500 mb-4 block uppercase tracking-widest">{current.volume_label}</label>
               <input 
                 type="range" min="50" max="1000" step="10" value={rooms}
                 onChange={(e) => setRooms(Number(e.target.value))}
                 className="w-full h-2 bg-[#0B0E14] appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00FF41] [&::-webkit-slider-thumb]:rounded-full"
               />
               <div className="mt-4 font-mono text-4xl text-white">
                 {rooms} <span className="text-sm text-gray-600 uppercase tracking-widest">{current.units}</span>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-8 border-t border-[#2A3241] pt-8">
               <div>
                 <div className="font-mono text-[10px] text-gray-500 mb-1 tracking-widest uppercase">{current.baseline}</div>
                 <div className="font-mono text-gray-400 text-sm flex flex-col">
                    <span className="uppercase">{current.standard}</span>
                    <span className="text-[10px] opacity-50 uppercase">{current.degradation}</span>
                 </div>
               </div>
               <div>
                 <div className="font-mono text-[10px] text-gray-500 mb-1 tracking-widest uppercase">{current.projection}</div>
                 <div className="font-mono text-[#00FF41] text-sm flex flex-col">
                    <span className="uppercase">{current.engineered}</span>
                    <span className="text-[10px] opacity-70 uppercase">{current.durability}</span>
                 </div>
               </div>
             </div>
             <div className="bg-red-500/5 border border-red-500/20 p-4 rounded text-[10px] font-mono text-gray-400">
               <span className="text-red-500 font-bold block mb-1 uppercase tracking-widest">LAB_NOTE:</span>
               {current.lab_note}
             </div>
           </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="bg-black border border-[#2A3241] relative flex flex-col justify-center overflow-hidden min-h-[500px]">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 opacity-30 blur-md select-none pointer-events-none">
             <div className="text-gray-500 font-mono text-sm mb-2 uppercase tracking-widest">{current.recovery_label}</div>
             <div className="text-8xl font-black text-[#00FF41]">€{savings}</div>
             <div className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.3em]">{current.annual}</div>
          </div>

          <div className="relative z-10 w-full h-full bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
              
              {formState === "idle" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm">
                  <div className="text-center mb-6">
                    <div className="inline-block border border-[#00FF41]/50 text-[#00FF41] font-mono text-[10px] tracking-widest px-3 py-1 mb-4 bg-[#00FF41]/10 uppercase">
                      {current.report_locked}
                    </div>
                    <h3 className="text-white font-bold text-xl tracking-tight uppercase">{current.request_title}</h3>
                    <p className="text-gray-500 text-xs mt-2 font-mono uppercase tracking-tighter italic">{current.request_desc}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input required type="text" placeholder={current.ph_name} className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700 uppercase" />
                    <input required type="tel" placeholder={current.ph_phone} className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700 uppercase" />
                    <input required type="email" placeholder={current.ph_email} className="w-full bg-[#0f1219] border border-[#2A3241] text-white p-4 font-mono text-xs focus:border-[#00FF41] outline-none transition-colors placeholder:text-gray-700 uppercase" />
                    <div className="relative">
                      <select required className="w-full bg-[#0f1219] border border-[#2A3241] text-gray-400 p-4 font-mono text-xs focus:border-[#00FF41] outline-none appearance-none cursor-pointer uppercase">
                        <option value="">{current.select_level}</option>
                        {current.levels.map((lvl: string, idx: number) => (
                          <option key={idx} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-[8px]">▼</div>
                    </div>
                    <button type="submit" className="w-full bg-[#00FF41] text-black font-bold font-mono py-4 hover:bg-white transition-colors tracking-widest text-xs mt-4 uppercase italic">{current.btn_request}</button>
                  </form>
                </motion.div>
              )}

              {formState === "processing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-12 h-12 border-2 border-[#2A3241] border-t-[#00FF41] rounded-full animate-spin mx-auto mb-6" />
                  <div className="font-mono text-[#00FF41] text-xs animate-pulse uppercase tracking-[0.2em] leading-loose">{current.uploading}</div>
                </motion.div>
              )}

              {formState === "success" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full max-w-md">
                   <div className="font-mono text-[#00FF41] text-[10px] mb-6 border border-[#00FF41] inline-block px-3 py-1 uppercase tracking-[0.3em]">
                     {current.received}
                   </div>
                   <div className="mb-8 relative">
                     <p className="font-mono text-gray-500 text-[10px] mb-2 uppercase tracking-widest">Projected Case Volume</p>
                     <div className="text-7xl font-black text-white tracking-tighter">{rooms}</div>
                     <p className="font-mono text-[#00FF41] text-[10px] mt-2 bg-[#00FF41]/10 inline-block px-2 py-1 tracking-widest uppercase">UNITS_UNDER_REVIEW</p>
                   </div>
                   <div className="bg-[#151922] p-6 border-l-2 border-[#00FF41] text-left">
                     <p className="text-white text-sm font-mono mb-3 font-bold uppercase tracking-tighter">
                       <span className="text-[#00FF41] mr-2">✓</span> {current.case_file}
                     </p>
                     <p className="text-gray-500 text-xs font-mono leading-relaxed mb-4 italic">
                       {current.success_desc}
                     </p>
                     <div className="text-[10px] text-gray-400 border-t border-[#2A3241] pt-3 mt-3 font-mono">
                        <p className="mb-1"><span className="text-[#00FF41]">&gt;&gt;</span> {current.status_note}</p>
                        <p><span className="text-[#00FF41]">&gt;&gt;</span> {current.eta_note}</p>
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