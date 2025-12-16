"use client";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Binary } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhyAudit() {
    // Sayfadaki dil değişimini takip etmek için (Basit çözüm)
    const [activeLang, setActiveLang] = useState("EN");

    // LocalStorage veya URL'den dili kontrol edebiliriz ama 
    // en garanti yol sayfa üzerindeki değişiklikleri dinlemek
    useEffect(() => {
        const interval = setInterval(() => {
            const lang = localStorage.getItem("language") || "EN";
            setActiveLang(lang);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const content = {
        TR: {
            mainTitle: "NEDEN HCI DENETİMİ?",
            sub: "Konaklama tedarik zincirine bilimsel yaklaşım.",
            items: [
                { title: "MATERYAL BÜTÜNLÜĞÜ", desc: "Ürünlerin moleküler yapısını Berlin laboratuvarlarımızda test ediyoruz. Sadece 'iyi' olanı değil, 5 yıldızlı operasyona en dayanıklı olanı seçiyoruz." },
                { title: "MALİYET GERİ KAZANIMI", desc: "Satın alma süreçlerindeki gizli kayıpları %35'e varan oranlarda geri kazanıyoruz. Denetimlerimiz doğrudan kârlılık sağlar." },
                { title: "AI TAHMİNLEME", desc: "Gelecek 24 ayın maliyet dalgalanmalarını yapay zeka algoritmalarımızla simüle ederek bütçenizi koruma altına alıyoruz." }
            ]
        },
        EN: {
            mainTitle: "WHY HCI AUDIT?",
            sub: "Scientific approach to hospitality procurement.",
            items: [
                { title: "MATERIAL INTEGRITY", desc: "We test the molecular structure of products in our Berlin laboratories. We identify the most durable ones for 5-star operations." },
                { title: "COST RECOVERY", desc: "We recover hidden procurement leaks by up to 35%. Our audits directly enhance your bottom-line profitability." },
                { title: "AI FORECASTING", desc: "We simulate cost fluctuations for the next 24 months using AI algorithms to safeguard your future budgets." }
            ]
        },
        DE: {
            mainTitle: "WARUM HCI AUDIT?",
            sub: "Wissenschaftlicher Ansatz für den Hoteleinkauf.",
            items: [
                { title: "MATERIALINTEGRITÄT", desc: "Wir testen die Molekularstruktur von Produkten in unseren Berliner Labors. Wir identifizieren die langlebigsten Produkte." },
                { title: "KOSTENRÜCKGEWINNUNG", desc: "Wir decken versteckte Beschaffungsverluste von bis zu 35% auf. Unsere Audits verbessern direkt Ihre Rentabilität." },
                { title: "KI-PROGNOSE", desc: "Wir simulieren Kostenschwankungen für die nächsten 24 Monate mit KI-Algorithmen, um Ihre Budgets zu sichern." }
            ]
        }
    };

    const current = content[activeLang as keyof typeof content] || content.EN;

    return (
        <section className="py-24 bg-[#0B0E14] border-b border-[#2A3241]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white">
                        {activeLang !== "TR" ? "WHY " : ""}<span className="text-[#00FF41]">HCI</span> {activeLang === "TR" ? "DENETİMİ?" : "AUDIT?"}
                    </h2>
                    <div className="h-1 w-20 bg-[#00FF41] mx-auto"></div>
                    <p className="text-gray-500 mt-6 font-mono text-xs uppercase tracking-[0.3em]">
                        {current.sub}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {current.items.map((item, index) => (
                        <motion.div
                            key={index + activeLang}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="p-8 bg-[#151922] border border-[#2A3241] hover:border-[#00FF41]/50 transition-all group relative overflow-hidden"
                        >
                            <div className="mb-6 relative z-10">
                                {index === 0 && <ShieldCheck className="text-[#00FF41]" size={32} />}
                                {index === 1 && <BarChart3 className="text-[#00FF41]" size={32} />}
                                {index === 2 && <Binary className="text-[#00FF41]" size={32} />}
                            </div>
                            <h3 className="text-xl font-bold mb-4 relative z-10 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}