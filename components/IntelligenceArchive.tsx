"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Thermometer, ArrowRight } from "lucide-react";
import Link from "next/link";

const TRANSLATIONS = {
  TR: {
    section_tag: "// İSTİHBARAT_ARŞİVİ_V.2.0",
    section_title: "GÜNCEL ADLİ BULGULAR",
    view_all: "TÜM VERİTABANINA ERİŞİN _>",
    loss_label: "Tahmini Yıllık Kayıp",
    access_granted: "ERİŞİM_ONAYLANDI",
    reports: [
      { id: "RPT-7702-ANT", vector: "TERMAL_KAYIP", title: "KALSİYUM-KARBONAT KAYNAKLI LİF PARÇALANMASI", loss: "$118,400", status: "KRİTİK", icon: <Thermometer size={18} className="text-red-500" />, size: "md:col-span-2" },
      { id: "RPT-4409-BER", vector: "MOLEKÜLER_NEKROZ", title: "KALINTI KİMYASAL OKSİDASYONU", loss: "$42,200", status: "STABİL", icon: <Activity size={18} className="text-lime-500" />, size: "md:col-span-1" },
      { id: "RPT-1205-IST", vector: "OPEX_ARTISI", title: "SU ISITICI SİSTEMLERİNDE TERMODİNAMİK PARAZİTİZM", loss: "$15,800", status: "İZLENİYOR", icon: <ShieldAlert size={18} className="text-orange-500" />, size: "md:col-span-1" }
    ]
  },
  EN: {
    section_tag: "// INTELLIGENCE_ARCHIVE_V.2.0",
    section_title: "LATEST FORENSIC FINDINGS",
    view_all: "ACCESS_FULL_DATABASE _>",
    loss_label: "Estimated Annual Loss",
    access_granted: "ACCESS_GRANTED",
    reports: [
      { id: "RPT-7702-ANT", vector: "THERMAL_LOSS", title: "CALCIUM-CARBONATE INDUCED FIBER SHEARING", loss: "$118,400", status: "CRITICAL", icon: <Thermometer size={18} className="text-red-500" />, size: "md:col-span-2" },
      { id: "RPT-4409-BER", vector: "MOLECULAR_NECROSIS", title: "RESIDUAL CHEMICAL OXIDATION", loss: "$42,200", status: "STABLE", icon: <Activity size={18} className="text-lime-500" />, size: "md:col-span-1" },
      { id: "RPT-1205-IST", vector: "OPEX_SURGE", title: "THERMODYNAMIC PARASITISM IN KETTLE SYSTEMS", loss: "$15,800", status: "MONITORING", icon: <ShieldAlert size={18} className="text-orange-500" />, size: "md:col-span-1" }
    ]
  },
  DE: {
    section_tag: "// INTELLIGENZ_ARCHIV_V.2.0",
    section_title: "AKTUELLE FORENSIK-ERGEBNISSE",
    view_all: "GESAMTE DATENBANK ANZEIGEN _>",
    loss_label: "Geschätzter Jährlicher Verlust",
    access_granted: "ZUGRIFF_GEWÄHRT",
    reports: [
      { id: "RPT-7702-ANT", vector: "THERMISCHER_VERLUST", title: "KALZIUMKARBONAT-INDUZIERTE FASERZERSTÖRUNG", loss: "$118,400", status: "KRITISCH", icon: <Thermometer size={18} className="text-red-500" />, size: "md:col-span-2" },
      { id: "RPT-4409-BER", vector: "MOLEKULARE_NEKROSE", title: "RÜCKSTÄNDIGE CHEMISCHE OXIDATION", loss: "$42,200", status: "STABIL", icon: <Activity size={18} className="text-lime-500" />, size: "md:col-span-1" },
      { id: "RPT-1205-IST", vector: "OPEX_ANSTIEG", title: "THERMODYNAMISCHER PARASITISMUS IN WASSERKOCHERN", loss: "$15,800", status: "ÜBERWACHUNG", icon: <ShieldAlert size={18} className="text-orange-500" />, size: "md:col-span-1" }
    ]
  }
};

export default function IntelligenceArchive() {
    const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang) setLang(savedLang);
    }, []);

    const t = TRANSLATIONS[lang];

    return (
        <section className="py-24 bg-[#0B0E14] border-t border-[#2A3241]">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* BAŞLIK */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="border-l-2 border-[#00FF41] pl-6">
                        <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-2 uppercase italic font-bold">
                            {t.section_tag}
                        </h2>
                        <p className="text-white text-3xl font-black tracking-tighter uppercase italic">
                            {t.section_title}
                        </p>
                    </div>
                    <Link href="/archive" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-mono text-[10px] hover:text-[#00FF41] transition-colors tracking-widest border border-gray-800 px-4 py-2 hover:border-[#00FF41]">
                        {t.view_all}
                    </Link>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {t.reports.map((rpt, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ scale: 0.99 }}
                            className={`bg-[#151922] border border-[#2A3241] p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px] ${rpt.size}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                {rpt.icon}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-mono text-[9px] text-[#00FF41] bg-[#00FF41]/5 px-2 py-1 border border-[#00FF41]/20 uppercase">
                                        ID: {rpt.id}
                                    </span>
                                    <span className={`font-mono text-[8px] tracking-widest ${rpt.status === 'KRİTİK' || rpt.status === 'CRITICAL' || rpt.status === 'KRITISCH' ? 'text-red-500' : 'text-gray-500'}`}>
                                        [{rpt.status}]
                                    </span>
                                </div>

                                <div className="font-mono text-[9px] text-gray-500 mb-1 tracking-tighter uppercase">
                                    VECTOR: {rpt.vector}
                                </div>
                                <h3 className="text-white font-bold text-xl group-hover:text-[#00FF41] transition-colors leading-tight mb-4 uppercase italic tracking-tighter">
                                    {rpt.title}
                                </h3>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/5 pt-6">
                                <div>
                                    <div className="text-[9px] font-mono text-gray-600 uppercase mb-1">{t.loss_label}</div>
                                    <div className="text-2xl font-black text-white group-hover:text-red-500 transition-colors font-mono">
                                        {rpt.loss}
                                    </div>
                                </div>
                                <Link 
                                    href={`/archive/${rpt.id.toLowerCase()}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="bg-[#0B0E14] p-3 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all border border-[#2A3241]"
                                >
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}