'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './Calculator';

const TRANSLATIONS = {
    TR: {
        protocol: "DENETİM SORUSU",
        yes: "EVET (Maalesef Var)",
        no: "HAYIR (Sorun Yok)",
        complete: "SONUÇ: İŞLETMENİZ CİDDİ PARA KAYBEDİYOR",
        mandate: "KURTARMA PLANINI GÖR",
        description: "Aşağıdaki rakam, sadece kireç ve yanlış kimyasal kullanımı yüzünden her yıl çöpe attığınız paradır. Bu parayı kasanızda tutabilirsiniz.",
        calcTitle: "// KAÇ ODA İŞLETİYORSUNUZ?",
        finishBtn: "ZARARIMI HESAPLA",
        btnLocked: "DETAYLI RAPOR İÇİN FORMU DOLDURUN",
        questions: [
            { id: 'S-01', text: "Misafirleriniz havluların sertliğinden veya kokusundan hiç şikayet etti mi?", impact: 63617, vector: 'Müşteri Kaybı Riski' },
            { id: 'S-02', text: "Kettle veya su ısıtıcılarınız çok sık bozuluyor veya kireç tutuyor mu?", impact: 152500, vector: 'Gereksiz Enerji Faturası' },
            { id: 'S-03', text: "Housekeeping ekibi banyoları temizlerken kireci sökmekte zorlanıyor mu?", impact: 46800, vector: 'Fazla Mesai ve İşçilik' },
            { id: 'S-04', text: "Duş başlıkları ve musluklar parlaklığını çabuk yitiriyor mu?", impact: 900000, vector: 'Demirbaş Yenileme Maliyeti' }
        ]
    },
    EN: {
        protocol: "AUDIT CHECK",
        yes: "YES (Detected)",
        no: "NO (Clear)",
        complete: "AUDIT COMPLETE: FINANCIAL LEAK DETECTED",
        mandate: "VIEW RECOVERY PLAN",
        description: "This figure represents the annual money lost due to inefficiencies. You can keep this money in your pocket.",
        calcTitle: "// ENTER ROOM COUNT",
        finishBtn: "CALCULATE LOSS",
        btnLocked: "REQUEST REPORT TO UNLOCK",
        questions: [
            { id: 'Q-01', text: "Do guests ever complain about towel hardness or smell?", impact: 63617, vector: 'Guest Churn Risk' },
            { id: 'Q-02', text: "Do kettles or heaters break down frequently due to scale?", impact: 152500, vector: 'Energy Waste' },
            { id: 'Q-03', text: "Does staff struggle to remove limescale from bathrooms?", impact: 46800, vector: 'Labor Overtime' },
            { id: 'Q-04', text: "Do faucets lose their shine quickly?", impact: 900000, vector: 'Asset Replacement Cost' }
        ]
    },
    DE: {
        protocol: "PRÜFUNG",
        yes: "JA",
        no: "NEIN",
        complete: "ERGEBNIS: FINANZIELLER VERLUST ERKANNT",
        mandate: "RETTUNGSPLAN ANSEHEN",
        description: "Diese Zahl stellt das jährliche Geld dar, das verloren geht.",
        calcTitle: "// ZIMMERANZAHL EINGEBEN",
        finishBtn: "VERLUST BERECHNEN",
        btnLocked: "BERICHT ANFORDERN",
        questions: [
            { id: 'F-01', text: "Beschweren sich Gäste über harte Handtücher?", impact: 63617, vector: 'Kundenverlustrisiko' },
            { id: 'F-02', text: "Verkalken Wasserkocher schnell?", impact: 152500, vector: 'Energieverschwendung' },
            { id: 'F-03', text: "Hat das Personal Probleme mit Kalkentfernung?", impact: 46800, vector: 'Arbeitszeitverlust' },
            { id: 'F-04', text: "Verlieren Armaturen schnell ihren Glanz?", impact: 900000, vector: 'Austauschkosten' }
        ]
    }
};

export default function DiagnosticEngine() {
    const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");
    const [step, setStep] = useState(0);
    const [totalLoss, setTotalLoss] = useState(0);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang && TRANSLATIONS[savedLang]) {
            setActiveLang(savedLang);
        }
    }, []);

    const t = TRANSLATIONS[activeLang];
    const current = t.questions[step];

    const processAnswer = (isPositive: boolean) => {
        if (isPositive && current) setTotalLoss(prev => prev + current.impact);
        if (step < t.questions.length - 1) setStep(prev => prev + 1);
        else setShowCalculator(true);
    };

    const finalizeAudit = () => {
        if (!isDataSubmitted) return;
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
                                <span>{t.protocol} {step + 1}/4</span>
                                <span className="text-[#00FF41]">{current.vector}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl text-white font-light leading-snug">{current.text}</h2>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <button onClick={() => processAnswer(true)} className="px-10 py-4 bg-lime-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">{t.yes}</button>
                                <button onClick={() => processAnswer(false)} className="px-10 py-4 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-slate-500 transition-colors">{t.no}</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {showCalculator && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <h3 className="text-[#00FF41] font-mono text-[10px] tracking-[0.3em] text-center uppercase">{t.calcTitle}</h3>
                        <Calculator activeLang={activeLang} onDataSuccess={() => setIsDataSubmitted(true)} />
                        <div className="flex justify-center pt-6">
                            <button onClick={finalizeAudit} disabled={!isDataSubmitted} className={`px-12 py-5 text-xs font-bold uppercase tracking-widest transition-all ${isDataSubmitted ? "bg-white text-black hover:bg-lime-400 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-gray-900 text-gray-600 cursor-not-allowed opacity-50 border border-gray-800"}`}>{isDataSubmitted ? t.finishBtn : t.btnLocked}</button>
                        </div>
                    </motion.div>
                )}

                {showResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 space-y-6">
                        <h3 className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase underline underline-offset-8">{t.complete}</h3>
                        <div className="text-6xl md:text-7xl text-lime-400 font-bold tabular-nums tracking-tighter">${totalLoss.toLocaleString()} <span className="text-lg ml-2 opacity-50 font-light">USD / YIL</span></div>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">{t.description}</p>
                        <div className="pt-8 text-center flex justify-center">
                            <button className="px-12 py-5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]">{t.mandate}</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}