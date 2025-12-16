'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HCI Berlin Forensic Audit verileri [cite: 46, 79, 129, 211]
const FORENSIC_QUESTIONS = [
    {
        id: 'D-01',
        text: "Temiz ve kuru bir banyo havlusunu ön kolunuzun hassas iç kısmına sürttüğünüzde zımpara hissi veriyor mu?",
        impact: 63617, // Yıllık tekstil nekrozu kaybı [cite: 129, 131]
        vector: 'Molecular Necrosis'
    },
    {
        id: 'D-03',
        text: "Odadaki elektrikli su ısıtıcısının (kettle) rezistansında beyaz/gri bir tabaka (kireç) görüyor musunuz?",
        impact: 152500, // Toplam termodinamik enerji kaybı [cite: 87, 211]
        vector: 'Thermodynamic Parasitism'
    },
    {
        id: 'D-04',
        text: "Sabunu suyla köpürtmeye çalıştığınızda zengin bir köpük yerine yapışkan, mat bir film mi oluşuyor?",
        impact: 900000, // Sadakat kaybı ve marka erozyonu [cite: 166, 211]
        vector: 'Brand Equity Erosion'
    },
    {
        id: 'D-02',
        text: "Musluk diplerinde veya bağlantı noktalarında beyaz, sert kireç halkaları fark ediyor musunuz?",
        impact: 46800, // Yıllık ekstra temizlik işçiliği maliyeti [cite: 211]
        vector: 'Labor Friction'
    }
];

export default function DiagnosticEngine() {
    const [step, setStep] = useState(0);
    const [totalLoss, setTotalLoss] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const processAnswer = (isPositive: boolean) => {
        const currentQuestion = FORENSIC_QUESTIONS[step];

        if (isPositive && currentQuestion) {
            setTotalLoss(prev => prev + currentQuestion.impact);
        }

        if (step < FORENSIC_QUESTIONS.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const current = FORENSIC_QUESTIONS[step];

    return (
        <section className="max-w-4xl mx-auto my-20 p-1 bg-[#0A0A0A] border border-slate-800 relative overflow-hidden">
            {/* Scanning Beam [cite: 192] */}
            <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-lime-400 opacity-20 z-10 shadow-[0_0_15px_#CCFF00]"
            />

            <div className="p-12 relative z-20">
                {!showResult && current ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center text-[10px] tracking-[0.2em] text-slate-500 font-mono">
                                <span>PROTOCOL: BERLIN_V4 / {current.id}</span>
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
                                    POZİTİF / EVET
                                </button>
                                <button
                                    onClick={() => processAnswer(false)}
                                    className="px-10 py-4 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-slate-500 transition-colors"
                                >
                                    NEGATİF / HAYIR
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 space-y-6"
                    >
                        <h3 className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase underline underline-offset-8">
                            DIAGNOSTIC COMPLETE: OPERATIONAL NECROSIS DETECTED
                        </h3>
                        <div className="text-6xl md:text-7xl text-lime-400 font-bold tabular-nums tracking-tighter">
                            ${totalLoss.toLocaleString()}
                            <span className="text-lg ml-2 opacity-50 font-light">USD / YIL</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                            Bu rakam; tesisinizdeki termodinamik sızıntı, varlık nekrozu ve misafir sadakat kaybının yıllık toplamıdır.
                        </p>
                        <div className="pt-8 text-center flex justify-center">
                            <button className="px-12 py-5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                Müdahaleyi Başlat (Recovery Mandate)
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}