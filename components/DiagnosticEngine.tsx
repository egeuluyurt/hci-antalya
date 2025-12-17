'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './Calculator';

const TRANSLATIONS = {
    TR: {
        protocol: "DENETİM ADIMI",
        yes: "EVET (Tespit Edildi)",
        no: "HAYIR (Temiz)",
        complete: "DENETİM TAMAMLANDI: KRİTİK MALİYET KAÇAĞI TESPİT EDİLDİ",
        mandate: "ÇÖZÜM RAPORU OLUŞTUR",
        description: "Bu rakam; tesisinizde kireçlenme, kimyasal aşınma ve verimsiz ekipman kullanımı nedeniyle havaya savrulan yıllık paradır.",
        calcTitle: "// TESİS KAPASİTESİNİ GİRİN",
        finishBtn: "KAYBI HESAPLA",
        btnLocked: "ÖNCE PROJEKSİYON TALEP EDİN",
        questions: [
            { id: 'D-01', text: "Yıkanmış temiz havlulara dokunduğunuzda sertlik veya zımpara hissi veriyor mu?", impact: 63617, vector: 'Tekstil Kimyasal Yıpranması' },
            { id: 'D-03', text: "Odadaki elektrikli su ısıtıcısının (kettle) rezistansında beyaz/gri bir kireç tabakası görüyor musunuz?", impact: 152500, vector: 'Enerji Verimsizliği' },
            { id: 'D-04', text: "Sabunu suyla köpürtmeye çalıştığınızda zengin bir köpük yerine yapışkan, mat bir film mi oluşuyor?", impact: 900000, vector: 'Müşteri Memnuniyeti Kaybı' },
            { id: 'D-02', text: "Musluk diplerinde veya duş başlıklarında beyaz kireç lekeleri görüyor musunuz?", impact: 46800, vector: 'Demirbaş Ömrü Kısalması' }
        ]
    },
    EN: {
        protocol: "AUDIT STEP",
        yes: "YES (Detected)",
        no: "NO (Clear)",
        complete: "AUDIT COMPLETE: CRITICAL FINANCIAL LEAK DETECTED",
        mandate: "GENERATE SOLUTION REPORT",
        description: "This figure represents the annual money lost due to calcification, chemical wear, and inefficient equipment usage.",
        calcTitle: "// ENTER HOTEL CAPACITY",
        finishBtn: "CALCULATE LOSS",
        btnLocked: "REQUEST PROJECTION TO UNLOCK",
        questions: [
            { id: 'D-01', text: "Do clean towels feel hard or like sandpaper to the touch?", impact: 63617, vector: 'Textile Chemical Degradation' },
            { id: 'D-03', text: "Is there visible limescale on the heating element of kettles?", impact: 152500, vector: 'Energy Inefficiency' },
            { id: 'D-04', text: "Does soap/shampoo lather poorly and leave a film?", impact: 900000, vector: 'Guest Satisfaction Loss' },
            { id: 'D-02', text: "Are there white scale deposits around faucets or showerheads?", impact: 46800, vector: 'Asset Lifespan Reduction' }
        ]
    },
    DE: {
        protocol: "PRÜFSCHRITT",
        yes: "JA (Erkannt)",
        no: "NEIN (Sauber)",
        complete: "AUDIT ABGESCHLOSSEN: KRITISCHES FINANZLECK ERKANNT",
        mandate: "LÖSUNGSBERICHT ERSTELLEN",
        description: "Diese Zahl stellt das jährliche Geld dar, das durch Verkalkung, chemischen Verschleiß und ineffiziente Nutzung verloren geht.",
        calcTitle: "// HOTELKAPAZITÄT EINGEBEN",
        finishBtn: "VERLUST BERECHNEN",
        btnLocked: "PROGNOSE ANFORDERN ZUM FREISCHALTEN",
        questions: [
            { id: 'D-01', text: "Fühlen sich saubere Handtücher hart oder wie Schmirgelpapier an?", impact: 63617, vector: 'Chemischer Textilverschleiß' },
            { id: 'D-03', text: "Gibt es sichtbare Kalkablagerungen in Wasserkochern?", impact: 152500, vector: 'Energieineffizienz' },
            { id: 'D-04', text: "Schäumt Seife/Shampoo schlecht und hinterlässt einen Film?", impact: 900000, vector: 'Verlust der Kundenzufriedenheit' },
            { id: 'D-02', text: "Gibt es weiße Kalkablagerungen an Wasserhähnen?", impact: 46800, vector: 'Verkürzung der Anlagenlebensdauer' }
        ]
    }
};

export default function DiagnosticEngine() {
    const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");
    const [step, setStep] = useState(0);
    const [totalLoss, setTotalLoss] = useState(0);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false); // Kilit state'i

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang && TRANSLATIONS[savedLang]) {
            setActiveLang(savedLang);
        }
    }, []);

    const t = TRANSLATIONS[activeLang];
    const current = t.questions[step];

    const processAnswer = (isPositive: boolean) => {
        if (isPositive && current) {
            setTotalLoss(prev => prev + current.impact);
        }

        if (step < t.questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setShowCalculator(true);
        }
    };

    const finalizeAudit = () => {
        if (!isDataSubmitted) return; // Güvenlik önlemi
        setShowCalculator(false);
        setShowResult(true);
    };

    return (
        <section className="max-w-4xl mx-auto my-20 p-1 bg-[#0A0A0A] border border-slate-800 relative overflow-hidden font-sans">
            <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-lime-400 opacity-20 z-10 shadow-[0_0_15px_#CCFF00]"
            />

            <div className="p-12 relative z-20">
                {!showCalculator && !showResult && current && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeLang}-${step}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-slate-500 font-mono">
                                <span>{t.protocol}: {current.id} / 04</span>
                                <span className="text-[#00FF41]">TANI: {current.vector}</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl text-white font-light leading-snug">
                                {current.text}
                            </h2>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <button
                                    onClick={() => processAnswer(true)}
                                    className="px-10 py-4 bg-lime-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                >
                                    {t.yes}
                                </button>
                                <button
                                    onClick={() => processAnswer(false)}
                                    className="px-10 py-4 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-slate-500 transition-colors"
                                >
                                    {t.no}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {showCalculator && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <h3 className="text-[#00FF41] font-mono text-[10px] tracking-[0.3em] text-center uppercase">
                            {t.calcTitle}
                        </h3>

                        {/* Calculator'a onDataSuccess prop'unu gönderdik */}
                        <Calculator
                            activeLang={activeLang}
                            onDataSuccess={() => setIsDataSubmitted(true)}
                        />

                        <div className="flex justify-center pt-6">
                            <button
                                onClick={finalizeAudit}
                                disabled={!isDataSubmitted}
                                className={`px-12 py-5 text-xs font-bold uppercase tracking-widest transition-all ${isDataSubmitted
                                        ? "bg-white text-black hover:bg-lime-400 cursor-pointer"
                                        : "bg-gray-900 text-gray-600 cursor-not-allowed opacity-50 border border-gray-800"
                                    }`}
                            >
                                {isDataSubmitted ? t.finishBtn : t.btnLocked}
                            </button>
                        </div>
                    </motion.div>
                )}

                {showResult && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 space-y-6"
                    >
                        <h3 className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase underline underline-offset-8">
                            {t.complete}
                        </h3>
                        <div className="text-6xl md:text-7xl text-lime-400 font-bold tabular-nums tracking-tighter">
                            ${totalLoss.toLocaleString()}
                            <span className="text-lg ml-2 opacity-50 font-light">USD / YIL</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                            {t.description}
                        </p>
                        <div className="pt-8 text-center flex justify-center">
                            <button className="px-12 py-5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                {t.mandate}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}