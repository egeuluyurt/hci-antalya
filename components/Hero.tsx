"use client";
import { useState, useEffect } from "react"; // useEffect eklendi
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Terminal, Globe } from "lucide-react";

export default function Hero() {
    // Dil Durumu
    const [lang, setLang] = useState<"EN" | "DE" | "TR">("EN");

    // Sayfa ilk açıldığında varsa kayıtlı dili çek
    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "EN" | "DE" | "TR";
        if (savedLang) setLang(savedLang);
    }, []);

    // Dili hem state'e hem hafızaya yazan fonksiyon
    const changeLanguage = (newLang: "EN" | "DE" | "TR") => {
        setLang(newLang);
        localStorage.setItem("language", newLang); // WhyAudit burayı dinleyecek
    };

    const dict = {
        EN: { status: "SYSTEM_OPERATIONAL", title: "HOSPITALITY", subtitle: "COST INDEX", desc: "Precision auditing for the modern hotelier.", cta1: "INITIATE AUDIT", cta2: "VIEW AUDIT PROTOCOLS" },
        DE: { status: "SYSTEM_BEREIT", title: "GASTGEWERBE", subtitle: "KOSTENINDEX", desc: "Präzisionsprüfung für den modernen Hotelier.", cta1: "AUDIT STARTEN", cta2: "PROTOKOLLE ANSEHEN" },
        TR: { status: "SİSTEM_AKTİF", title: "KONAKLAMA", subtitle: "MALİYET ENDEKSİ", desc: "Modern otelciler için hassas denetim ve materyal analizi.", cta1: "DENETİMİ BAŞLAT", cta2: "PROTOKOLLERİ İNCELE" }
    };

    const content = dict[lang];

    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative border-b border-[#2A3241] overflow-hidden bg-[#0B0E14]">

            {/* --- NAVBAR --- */}
            <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00FF41] rounded-sm"></div>
                    <span className="font-mono text-white font-bold tracking-widest text-sm">HCI | BERLIN</span>
                </div>

                {/* DİL SEÇİCİ */}
                <div className="flex items-center gap-4 bg-[#151922] border border-[#2A3241] px-4 py-2 rounded-full">
                    <Globe size={14} className="text-gray-500" />
                    <div className="flex gap-2 font-mono text-xs">
                        {(["EN", "DE", "TR"] as const).map((l) => (
                            <button
                                key={l}
                                onClick={() => changeLanguage(l)} // Fonksiyon güncellendi
                                className={`transition-colors ${lang === l
                                    ? "text-[#00FF41] font-bold"
                                    : "text-gray-600 hover:text-white"
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03),transparent_70%)]" />

            <motion.div
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10 px-4"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse"></span>
                    <h2 className="font-mono text-[#00FF41] text-xs tracking-[0.2em]">
                        {content.status} • V2.4.0
                    </h2>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-white">
                    {content.title} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">{content.subtitle}</span>
                </h1>

                <p className="font-mono text-gray-400 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
                    {content.desc} <span className="text-white font-bold">Berlin Audit Labs</span> analytics.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => {
                            const element = document.getElementById('audit-engine');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white text-black px-8 py-4 font-bold font-mono hover:bg-[#00FF41] transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
                    >
                        <Terminal size={18} />
                        {'>_'} {content.cta1}
                    </button>

                    <Link href="/documentation" className="border border-gray-700 text-gray-400 px-8 py-4 font-mono hover:border-white hover:text-white transition-colors flex items-center gap-2 group w-full md:w-auto justify-center">
                        <FileText size={18} className="group-hover:text-[#00FF41] transition-colors" />
                        {content.cta2}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}