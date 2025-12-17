"use client";
import { useState, useEffect } from "react";
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

    // Dili değiştiren ve sayfayı yenileyen fonksiyon
    const changeLanguage = (newLang: "EN" | "DE" | "TR") => {
        setLang(newLang);
        localStorage.setItem("language", newLang);
        // Dil değişince tüm site (Arşiv dahil) anında güncellenir
        window.location.reload();
    };

    // İŞTE YENİ "PATRON YAKALAYAN" VURUCU DİL
    const dict = {
        EN: {
            status: "SYSTEM_ONLINE",
            title: "TURN HIDDEN",
            subtitle: "COSTS TO PROFIT",
            desc: "Stop the money vanishing into thin air every day. Detect invisible leaks in energy and operations with Berlin precision.",
            cta1: "CALCULATE MY LOSS",
            cta2: "HOW IT WORKS"
        },
        DE: {
            status: "SYSTEM_BEREIT",
            title: "VERSTECKTE KOSTEN",
            subtitle: "IN GEWINN WANDELN",
            desc: "Stoppen Sie das Geld, das jeden Tag verschwindet. Erkennen Sie unsichtbare Lecks mit Berliner Präzision.",
            cta1: "VERLUST BERECHNEN",
            cta2: "WIE ES FUNKTIONIERT"
        },
        TR: {
            status: "SİSTEM_AKTİF",
            // BURASI DEĞİŞTİ: Çok daha vurucu ve merak uyandırıcı
            title: "GİZLİ GİDERLERİ",
            subtitle: "KARA ÇEVİRİN",
            desc: "Otelinizde her gün havaya savrulan parayı durdurun. Enerji ve operasyonel kaçakları Berlin altyapısıyla bulun, ne kadar tasarruf edebileceğinizi hemen görün.",
            cta1: "ZARARIMI HESAPLA", // "Denetim" yerine "Zarar" kelimesi tetikleyicidir
            cta2: "SİSTEMİ İNCELE"
        }
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
                                onClick={() => changeLanguage(l)}
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
                        {content.status} • V2.5
                    </h2>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-white">
                    {content.title} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">{content.subtitle}</span>
                </h1>

                <p className="font-mono text-gray-400 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
                    {content.desc}
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    {/* Diagnostic Linki - Yeni Sekmede Açar */}
                    <Link
                        href="/diagnostic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto"
                    >
                        <button
                            className="bg-white text-black px-8 py-4 font-bold font-mono hover:bg-[#00FF41] transition-colors flex items-center gap-2 w-full justify-center shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_40px_rgba(0,255,65,0.6)]"
                        >
                            <Terminal size={18} />
                            {'>_'} {content.cta1}
                        </button>
                    </Link>

                    <Link href="/documentation" className="border border-gray-700 text-gray-400 px-8 py-4 font-mono hover:border-white hover:text-white transition-colors flex items-center gap-2 group w-full md:w-auto justify-center">
                        <FileText size={18} className="group-hover:text-[#00FF41] transition-colors" />
                        {content.cta2}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}