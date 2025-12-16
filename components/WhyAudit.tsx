"use client";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Binary } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhyAudit() {
    // Sitenin genelinde kullanılan dili yakalamak için state
    const [activeLang, setActiveLang] = useState("EN");

    // Hero.tsx içindeki dil değişimini yakalamak için bir dinleyici kuruyoruz
    useEffect(() => {
        // Sayfa yüklendiğinde ve her saniye dili kontrol et (Senkronizasyon için)
        const checkLang = () => {
            const savedLang = localStorage.getItem("language") || "EN";
            if (savedLang !== activeLang) {
                setActiveLang(savedLang);
            }
        };

        const interval = setInterval(checkLang, 100); // Çok hızlı kontrol ederek "otomatik" hissi verir
        return () => clearInterval(interval);
    }, [activeLang]);

    const content = {
        TR: {
            title: "NEDEN HCI DENETİMİ?",
            sub: "Konaklama tedarik zincirine bilimsel yaklaşım.",
            items: [
                { t: "MATERYAL BÜTÜNLÜĞÜ", d: "Ürünlerin moleküler yapısını Berlin laboratuvarlarımızda test ediyoruz. Sadece 'iyi' olanı değil, en dayanıklı olanı seçiyoruz." },
                { t: "MALİYET GERİ KAZANIMI", d: "Satın alma süreçlerindeki gizli kayıpları %35'e varan oranlarda geri kazanıyoruz. Doğrudan kârlılık sağlıyoruz." },
                { t: "AI TAHMİNLEME", d: "Gelecek 24 ayın maliyet dalgalanmalarını yapay zeka algoritmalarımızla simüle ederek bütçenizi koruyoruz." }
            ]
        },
        EN: {
            title: "WHY HCI AUDIT?",
            sub: "Scientific approach to hospitality procurement.",
            items: [
                { t: "MATERIAL INTEGRITY", d: "We test the molecular structure of products in our Berlin laboratories to identify the most durable ones." },
                { t: "COST RECOVERY", d: "We recover hidden procurement leaks by up to 35%, directly enhancing your bottom-line profitability." },
                { t: "AI FORECASTING", d: "We simulate cost fluctuations for the next 24 months using AI algorithms to safeguard your budgets." }
            ]
        },
        DE: {
            title: "WARUM HCI AUDIT?",
            sub: "Wissenschaftlicher Ansatz für den Hoteleinkauf.",
            items: [
                { t: "MATERIALINTEGRITÄT", d: "Wir testen die Molekularstruktur von Produkten in unseren Berliner Labors auf maximale Langlebigkeit." },
                { t: "KOSTENRÜCKGEWINNUNG", d: "Wir decken versteckte Beschaffungsverluste von bis zu 35% auf ve verbessern Ihre Rentabilität." },
                { t: "KI-PROGNOSE", d: "Wir simulieren Kostenschwankungen für die nächsten 24 Monate mit KI-Algorithmen." }
            ]
        }
    };

    const current = content[activeLang as keyof typeof content] || content.EN;

    return (
        <section className="py-24 bg-[#0B0E14] border-b border-[#2A3241]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">
                        {current.title}
                    </h2>
                    <div className="h-1 w-20 bg-[#00FF41] mx-auto"></div>
                    <p className="text-gray-500 mt-6 font-mono text-xs uppercase tracking-[0.3em]">
                        {current.sub}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {current.items.map((item, index) => (
                        <div
                            key={index + activeLang}
                            className="p-8 bg-[#151922] border border-[#2A3241] hover:border-[#00FF41]/50 transition-all group relative overflow-hidden"
                        >
                            <div className="mb-6">
                                {index === 0 && <ShieldCheck className="text-[#00FF41]" size={32} />}
                                {index === 1 && <BarChart3 className="text-[#00FF41]" size={32} />}
                                {index === 2 && <Binary className="text-[#00FF41]" size={32} />}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">{item.t}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.d}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}