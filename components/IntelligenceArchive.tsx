"use client";
import { useState, useEffect } from "react";
import { Activity, ArrowRight, ShieldAlert, Thermometer } from "lucide-react";
import Link from "next/link";

const TRANSLATIONS = {
  TR: {
    section_tag: "// KRİTİK_UYARILAR",
    section_title: "TESPİT EDİLEN MALİYET KAÇAKLARI",
    btn_text: "TÜM ZARAR RAPORLARINI GÖR [ >>> ]",
    loss_label: "BU HATANIN YILLIK BEDELİ",
    reports: [
      { 
        id: "VAKA-001", 
        vector: "ENERJİ_FATURASI", 
        title: "ISITMA SİSTEMLERİNDE GİZLİ %35 ENERJİ KAYBI", // Çok net bir acı noktası
        loss: "$118,400", 
        status: "ACİL_DURUM", 
        icon: <Thermometer size={18} className="text-red-500" /> 
      },
      { 
        id: "VAKA-002", 
        vector: "SATIN_ALMA_HATASI", 
        title: "HAVLULARIN ÖMRÜNÜ YARIYA İNDİREN YIKAMA HATASI", // Merak uyandırıcı
        loss: "$42,200", 
        status: "YAYGIN", 
        icon: <Activity size={18} className="text-lime-500" /> 
      },
      { 
        id: "VAKA-003", 
        vector: "PERSONEL_VERİMSİZLİĞİ", 
        title: "TEMİZLİK SÜRESİNİ UZATAN KİREÇ TUZAĞI", // Operasyonel verimlilik
        loss: "$15,800", 
        status: "GİZLİ_GİDER", 
        icon: <ShieldAlert size={18} className="text-orange-500" /> 
      }
    ]
  },
  EN: {
    section_tag: "// CRITICAL_ALERTS",
    section_title: "DETECTED FINANCIAL LEAKS",
    btn_text: "VIEW ALL LOSS REPORTS [ >>> ]",
    loss_label: "ANNUAL COST OF THIS ERROR",
    reports: [
      { 
        id: "CASE-001", 
        vector: "ENERGY_BILL", 
        title: "HIDDEN 35% ENERGY LOSS IN HEATING SYSTEMS", 
        loss: "$118,400", 
        status: "URGENT", 
        icon: <Thermometer size={18} className="text-red-500" /> 
      },
      { 
        id: "CASE-002", 
        vector: "PROCUREMENT_ERROR", 
        title: "THE WASHING MISTAKE HALVING TOWEL LIFESPAN", 
        loss: "$42,200", 
        status: "COMMON", 
        icon: <Activity size={18} className="text-lime-500" /> 
      },
      { 
        id: "CASE-003", 
        vector: "STAFF_INEFFICIENCY", 
        title: "THE LIMESCALE TRAP DOUBLING CLEANING TIME", 
        loss: "$15,800", 
        status: "HIDDEN_COST", 
        icon: <ShieldAlert size={18} className="text-orange-500" /> 
      }
    ]
  },
  DE: {
    section_tag: "// KRITISCHE_WARNUNGEN",
    section_title: "ERKANNTE FINANZLECKS",
    btn_text: "ALLE VERLUSTBERICHTE ANSEHEN [ >>> ]",
    loss_label: "JÄHRLICHE KOSTEN DIESES FEHLERS",
    reports: [
      { 
        id: "FALL-001", 
        vector: "ENERGIE_RECHNUNG", 
        title: "VERSTECKTER 35% ENERGIEVERLUST IN HEIZSYSTEMEN", 
        loss: "$118,400", 
        status: "DRINGEND", 
        icon: <Thermometer size={18} className="text-red-500" /> 
      },
      { 
        id: "FALL-002", 
        vector: "BESCHAFFUNGSFEHLER", 
        title: "WASCHFEHLER HALBIERT HANDTUCH-LEBENSDAUER", 
        loss: "$42,200", 
        status: "HÄUFIG", 
        icon: <Activity size={18} className="text-lime-500" /> 
      },
      { 
        id: "FALL-003", 
        vector: "PERSONAL_INEFFIZIENZ", 
        title: "KALKFALLE VERDOPPELT REINIGUNGSZEIT", 
        loss: "$15,800", 
        status: "VERSTECKTE_KOSTEN", 
        icon: <ShieldAlert size={18} className="text-orange-500" /> 
      }
    ]
  }
};

export default function IntelligenceArchive() {
    const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");

    useEffect(() => {
        const checkLang = () => {
            const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
            if (savedLang && savedLang !== lang) {
                setLang(savedLang);
            }
        };
        const interval = setInterval(checkLang, 100);
        return () => clearInterval(interval);
    }, [lang]);

    const t = TRANSLATIONS[lang];

    return (
        <section className="py-24 bg-[#0B0E14] border-t border-[#2A3241]">
            <div className="max-w-6xl mx-auto px-6">

                {/* BAŞLIK ALANI */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="border-l-2 border-[#00FF41] pl-6">
                        <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-2 uppercase italic font-bold">
                            {t.section_tag}
                        </h2>
                        <p className="text-white text-3xl font-black tracking-tighter uppercase italic">
                            {t.section_title}
                        </p>
                    </div>

                    <Link
                        href="/archive"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 font-mono text-[10px] hover:text-[#00FF41] transition-colors tracking-widest border border-gray-800 px-4 py-2 hover:border-[#00FF41]"
                    >
                        {t.btn_text}
                    </Link>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {t.reports.map((rpt, idx) => (
                        <Link
                            key={idx}
                            href={`/archive/${rpt.id.toLowerCase()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-[#151922] border border-[#2A3241] p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px] hover:border-[#00FF41] transition-colors ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                {rpt.icon}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-mono text-[9px] text-[#00FF41] bg-[#00FF41]/5 px-2 py-1 border border-[#00FF41]/20 uppercase">
                                        DOSYA: {rpt.id}
                                    </span>
                                    <span className={`font-mono text-[8px] tracking-widest ${rpt.status === 'ACİL_DURUM' || rpt.status === 'URGENT' || rpt.status === 'DRINGEND' ? 'text-red-500' : 'text-gray-500'}`}>
                                        [{rpt.status}]
                                    </span>
                                </div>

                                <div className="font-mono text-[9px] text-gray-500 mb-1 tracking-tighter uppercase">
                                    SEBEP: {rpt.vector}
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
                                <div className="bg-[#0B0E14] p-3 text-[#00FF41] group-hover:bg-[#00FF41] group-hover:text-black transition-all border border-[#2A3241]">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}