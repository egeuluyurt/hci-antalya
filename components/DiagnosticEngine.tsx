'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './Calculator'; 

const TRANSLATIONS = {
  TR: {
    protocol: "PROTOKOL",
    yes: "EVET",
    no: "HAYIR",
    complete: "TEŞHİS TAMAMLANDI: OPERASYONEL NEKROZ TESPİT EDİLDİ",
    mandate: "MÜDAHALEYİ BAŞLAT (RECOVERY MANDATE)",
    description: "Bu rakam; tesisinizdeki termodinamik sızıntı, varlık nekrozu ve misafir sadakat kaybının yıllık toplamıdır.",
    calcTitle: "// TESİS KAPASİTE VERİLERİNİ GİRİNİZ",
    finishBtn: "ANALİZİ TAMAMLA",
    btnLocked: "ÖNCE PROJEKSİYON TALEP EDİN",
    questions: [
      { id: 'D-01', text: "Temiz ve kuru bir banyo havlusunu ön kolunuzun hassas iç kısmına sürttüğünüzde zımpara hissi veriyor mu?", impact: 63617, vector: 'Moleküler Nekroz' },
      { id: 'D-03', text: "Odadaki elektrikli su ısıtıcısının (kettle) rezistansında beyaz/gri bir kireç tabakası görüyor musunuz?", impact: 152500, vector: 'Termodinamik Parazitizm' },
      { id: 'D-04', text: "Sabunu suyla köpürtmeye çalıştığınızda zengin bir köpük yerine yapışkan, mat bir film mi oluşuyor?", impact: 900000, vector: 'Marka Değer Erozyonu' },
      { id: 'D-02', text: "Musluk diplerinde veya bağlantı noktalarında beyaz, sert kireç halkaları fark ediyor musunuz?", impact: 46800, vector: 'İşçilik Sürtünmesi' }
    ]
  },
  EN: {
    protocol: "PROTOCOL",
    yes: "YES / POSITIVE",
    no: "NO / NEGATIVE",
    complete: "DIAGNOSTIC COMPLETE: OPERATIONAL NECROSIS DETECTED",
    mandate: "INITIALIZE RECOVERY MANDATE",
    description: "This figure represents the annual total of thermodynamic leakage, asset necrosis, and guest loyalty loss in your facility.",
    calcTitle: "// ENTER FACILITY CAPACITY DATA",
    finishBtn: "COMPLETE ANALYSIS",
    btnLocked: "REQUEST PROJECTION TO UNLOCK",
    questions: [
      { id: 'D-01', text: "Does a clean, dry bath towel feel like mild sandpaper against the sensitive skin of your inner forearm?", impact: 63617, vector: 'Molecular Necrosis' },
      { id: 'D-03', text: "Is the heating element of the in-room electric kettle coated in a white/grey plaque (limescale)?", impact: 152500, vector: 'Thermodynamic Parasitism' },
      { id: 'D-04', text: "Does the bar soap create a slimy, flat film that is difficult to rinse instead of a rich foam?", impact: 900000, vector: 'Brand Equity Erosion' },
      { id: 'D-02', text: "Do you notice white, hard limescale rings at the base of faucets or connection points?", impact: 46800, vector: 'Labor Friction' }
    ]
  },
  DE: {
    protocol: "PROTOKOLL",
    yes: "JA / POSITIV",
    no: "NEIN / NEGATIV",
    complete: "DIAGNOSE ABGESCHLOSSEN: OPERATIVE NEKROSE ERKANNT",
    mandate: "WIEDERHERSTELLUNGSMANDAT STARTEN",
    description: "Diese Zahl entspricht der jährlichen Gesamtsumme aus thermodynamischen Leckagen, Anlagenekrose und Verlust der Gästetreue.",
    calcTitle: "// GEBEN SIE DIE ANLAGENKAPAZITÄTSDATEN EIN",
    finishBtn: "ANALYSE ABSCHLIESSEN",
    btnLocked: "PROGNOSE ANFORDERN ZUM FREISCHALTEN",
    questions: [
      { id: 'D-01', text: "Fühlt sich ein sauberes, trockenes Badetuch auf der empfindlichen Haut Ihres Unterarms wie Schmirgelpapier an?", impact: 63617, vector: 'Molekulare Nekrose' },
      { id: 'D-03', text: "Ist das Heizelement des Wasserkochers im Zimmer mit einer weiß/grauen Kalkschicht überzogen?", impact: 152500, vector: 'Thermodynamischer Parasitismus' },
      { id: 'D-04', text: "Erzeugt die Seife statt eines reichhaltigen Schaums einen schleimigen, flachen Film?", impact: 900000, vector: 'Markenerosion' },
      { id: 'D-02', text: "Bemerken Sie weiße, harte Kalkringe an Armaturen oder Anschlusspunkten?", impact: 46800, vector: 'Arbeitsreibung' }
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
                                <span>{t.protocol}: BERLIN_V4 / {current.id}</span>
                                <span>VECTOR: {current.vector}</span>
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
                                className={`px-12 py-5 text-xs font-bold uppercase tracking-widest transition-all ${
                                  isDataSubmitted 
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