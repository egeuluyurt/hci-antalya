"use client";
import { useState, useEffect } from "react";
import { Activity, ArrowRight, ShieldAlert, Thermometer } from "lucide-react";
import Link from "next/link";

const TRANSLATIONS = {
    TR: {
        section_tag: "// İSTİHBARAT_AKIŞI_V.2.0",
        section_title: "SON ADLİ BULGULAR",
        btn_text: "ARŞİV VERİTABANINA GİR [ >>> ]",
        loss_label: "ÖNLENEBİLİR YILLIK KAYIP",
        reports: [
            {
                id: "RPT-7702-ANT",
                vector: "ISI_KAYBI",
                title: "KİREÇLENME KAYNAKLI ENERJİ İSRAFI",
                loss: "$118,400",
                status: "KRİTİK",
                icon: <Thermometer size={18} className="text-red-500" />
            },
            {
                id: "RPT-4409-BER",
                vector: "KİMYASAL_YIPRANMA",
                title: "TEKSTİL ÜRÜNLERİNDE ERKEN ÇÜRÜME",
                loss: "$42,200",
                status: "STABİL",
                icon: <Activity size={18} className="text-lime-500" />
            },
            {
                id: "RPT-1205-IST",
                vector: "MALİYET_KAÇAĞI",
                title: "ISITICILARDA PERFORMANS DÜŞÜKLÜĞÜ",
                loss: "$15,800",
                status: "İZLENİYOR",
                icon: <ShieldAlert size={18} className="text-orange-500" />
            }
        ]
    },
    EN: {
        section_tag: "// INTELLIGENCE_FEED_V.2.0",
        section_title: "LATEST FORENSIC FINDINGS",
        btn_text: "ENTER_ARCHIVE_DATALINK [ >>> ]",
        loss_label: "ESTIMATED ANNUAL LOSS",
        reports: [
            {
                id: "RPT-7702-ANT",
                vector: "THERMAL_LOSS",
                title: "ENERGY WASTE DUE TO CALCIFICATION",
                loss: "$118,400",
                status: "CRITICAL",
                icon: <Thermometer size={18} className="text-red-500" />
            },
            {
                id: "RPT-4409-BER",
                vector: "CHEMICAL_DAMAGE",
                title: "PREMATURE TEXTILE DEGRADATION",
                loss: "$42,200",
                status: "STABLE",
                icon: <Activity size={18} className="text-lime-500" />
            },
            {
                id: "RPT-1205-IST",
                vector: "OPEX_SURGE",
                title: "PERFORMANCE DROP IN HEATERS",
                loss: "$15,800",
                status: "MONITORING",
                icon: <ShieldAlert size={18} className="text-orange-500" />
            }
        ]
    },
    DE: {
        section_tag: "// NACHRICHTEN_FEED_V.2.0",
        section_title: "AKTUELLE FORENSIK-ERGEBNISSE",
        btn_text: "ARCHIV-DATENLINK EINGEBEN [ >>> ]",
        loss_label: "GESCHÄTZTER JÄHRLICHER VERLUST",
        reports: [
            {
                id: "RPT-7702-ANT",
                vector: "WÄRMEVERLUST",
                title: "ENERGIEVERSCHWENDUNG DURCH VERKALKUNG",
                loss: "$118,400",
                status: "KRITISCH",
                icon: <Thermometer size={18} className="text-red-500" />
            },
            {
                id: "RPT-4409-BER",
                vector: "CHEMISCHER_SCHADEN",
                title: "VORZEITIGER TEXTILVERSCHLEISS",
                loss: "$42,200",
                status: "STABIL",
                icon: <Activity size={18} className="text-lime-500" />
            },
            {
                id: "RPT-1205-IST",
                vector: "KOSTENANSTIEG",
                title: "LEISTUNGSABFALL BEI HEIZGERÄTEN",
                loss: "$15,800",
                status: "ÜBERWACHUNG",
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