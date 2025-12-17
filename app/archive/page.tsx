"use client";
import { useState, useEffect } from "react";
import { Database, Search, ArrowRight, Globe, Thermometer, Activity, ShieldAlert, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { reports } from "@/lib/data";

const TRANSLATIONS = {
    TR: {
        tag: "// GLOBAL_INTELLIGENCE_DATABASE",
        title: "ADLİ ARŞİV",
        search_placeholder: "VEKTÖR VEYA ID İLE FİLTRELE...",
        lang_label: "AKTİF DİL",
        col_id: "RAPOR NO",
        col_vector: "VEKTÖR SINIFI",
        col_subject: "KONU ANALİZİ",
        col_action: "İŞLEM",
        open_file: "DOSYAYI AÇ",
        footer_text: "GÜVENLİ ERİŞİM PROTOKOLÜ AKTİF ● TOPLAM KAYIT:",
        footer_loc: "● KONUM: Berlin_Merkez_Sunucu"
    },
    EN: {
        tag: "// GLOBAL_INTELLIGENCE_DATABASE",
        title: "FORENSIC ARCHIVE",
        search_placeholder: "FILTER_BY_VECTOR_OR_ID...",
        lang_label: "ACTIVE_LANGUAGE",
        col_id: "REPORT_ID",
        col_vector: "VECTOR_CLASSIFICATION",
        col_subject: "SUBJECT_ANALYSIS",
        col_action: "ACTION",
        open_file: "OPEN_FILE",
        footer_text: "SECURE ACCESS PROTOCOL ACTIVE ● TOTAL RECORDS:",
        footer_loc: "● Location: Berlin_Central_Server"
    },
    DE: {
        tag: "// GLOBALE_INTELLIGENZ_DATENBANK",
        title: "FORENSISCHES ARCHIV",
        search_placeholder: "FILTER_NACH_VEKTOR_ODER_ID...",
        lang_label: "AKTIVE_SPRACHE",
        col_id: "BERICHT_NR",
        col_vector: "VEKTOR_KLASSIFIZIERUNG",
        col_subject: "THEMEN_ANALYSE",
        col_action: "AKTION",
        open_file: "DATEI_ÖFFNEN",
        footer_text: "SICHERER ZUGANGSPROTOKOLL AKTIV ● GESAMT:",
        footer_loc: "● Standort: Berlin_Zentralserver"
    }
};

export default function ArchiveIndex() {
    const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
    const [searchTerm, setSearchTerm] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("language");
        if (savedLang === "TR" || savedLang === "EN" || savedLang === "DE") {
            setLang(savedLang);
        }

        const handleStorageChange = () => {
            const newLang = localStorage.getItem("language");
            if (newLang === "TR" || newLang === "EN" || newLang === "DE") {
                setLang(newLang);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(handleStorageChange, 500);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const t = TRANSLATIONS[lang];

    const getIcon = (vector: string) => {
        if (vector.includes("THERMAL") || vector.includes("ENERJİ")) return <Thermometer size={16} className="text-red-500" />;
        if (vector.includes("OPEX") || vector.includes("OPERASYON") || vector.includes("SURGE")) return <ShieldAlert size={16} className="text-orange-500" />;
        if (vector.includes("MOLECULAR") || vector.includes("TEKSTİL") || vector.includes("NECROSIS")) return <Activity size={16} className="text-lime-500" />;
        return <AlertTriangle size={16} className="text-gray-500" />;
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-20 font-sans">
            {/* HERDER */}
            <div className="max-w-6xl mx-auto mb-16">
                <div className="flex items-center gap-3 text-[#00FF41] mb-4">
                    <Database size={20} />
                    <span className="text-xs tracking-[0.5em] font-bold uppercase italic font-mono">{t.tag}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 text-white">
                    {t.title}
                </h1>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    {/* SEARCH */}
                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                        <input
                            type="text"
                            placeholder={t.search_placeholder}
                            className="w-full bg-[#151922] border border-[#2A3241] p-4 pl-12 text-xs outline-none focus:border-[#00FF41] transition-colors uppercase text-white placeholder:text-gray-700 font-mono"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>
                    {/* LANGUAGE */}
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 border border-[#2A3241] px-3 py-2 font-mono uppercase">
                        <Globe size={12} />
                        <span>{t.lang_label}: <span className="text-[#00FF41]">{lang}</span></span>
                    </div>
                </div>
            </div>

            {/* LIST */}
            <div className="max-w-6xl mx-auto border border-[#2A3241] bg-[#151922]/30">
                <div className="grid grid-cols-4 p-4 border-b border-[#2A3241] text-[10px] text-gray-600 uppercase font-bold tracking-widest hidden md:grid italic font-mono">
                    <span>{t.col_id}</span>
                    <span>{t.col_vector}</span>
                    <span>{t.col_subject}</span>
                    <span className="text-right">{t.col_action}</span>
                </div>

                {reports.filter(r => {
                    const content = r.content[lang];
                    // SAFE ACCESS: Only check content.title. Removed r.title fallback.
                    const title = content?.title || "";
                    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.vector.toLowerCase().includes(searchTerm.toLowerCase());
                }).map((rpt, idx) => {
                    const content = rpt.content[lang];
                    return (
                        <Link
                            key={rpt.id}
                            href={`/archive/${rpt.id}`}
                            className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#2A3241] items-center hover:bg-[#00FF41]/5 transition-all group border-l-2 border-l-transparent hover:border-l-[#00FF41]"
                        >
                            <span className="text-[#00FF41] text-xs font-bold mb-2 md:mb-0 italic uppercase font-mono">{rpt.id}</span>
                            <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 md:mb-0 font-mono">
                                {getIcon(rpt.vector)}
                                <span className="uppercase">{rpt.vector}</span>
                            </div>
                            <span className="text-white text-xs font-bold uppercase tracking-tight mb-4 md:mb-0 italic">
                                {content?.title}
                            </span>
                            <div className="flex justify-end">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 group-hover:text-white transition-colors italic font-bold font-mono">
                                    {t.open_file} <ArrowRight size={14} className="text-[#00FF41] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* FOOTER */}
            <div className="max-w-6xl mx-auto mt-12 text-[8px] text-gray-700 uppercase tracking-[0.3em] italic font-bold font-mono">
                {t.footer_text} {reports.length} {t.footer_loc}
            </div>
        </div>
    );
}