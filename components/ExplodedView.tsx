"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// SENİN KLASÖR YAPINA GÖRE RESİMLER
const TAB_IMAGES = [
    "/images/polymer-stress-test.png", // 1. Sekme
    "/images/macro-fiber.jpg",         // 2. Sekme
    "/images/xray-slipper.jpg"         // 3. Sekme
];

const CONTENT = {
    TR: {
        tabs: ["KALİTE KONTROL", "TEDARİKÇİ DENETİMİ", "MALİYET ÖMRÜ"],
        data: [
            {
                label: "KALİTE_ANALİZİ",
                title: "MOBİLYALAR NEDEN ÇÖKÜYOR?",
                p1_head: "YOĞUNLUK TESTİ",
                p1_desc: "Satın aldığınız koltukların sünger yoğunluğunu ölçüyoruz. Tedarikçinin '1. Sınıf' dediği malzeme 6 ay sonra çökecek mi? Baştan tespit ediyoruz.",
                p2_head: "KİMYASAL DAYANIKLILIK",
                p2_desc: "Kumaş ve dolgu malzemesi otel trafiğine dayanıklı mı? Kimyasal stres testleriyle ürünün gerçek ömrünü hesaplıyoruz.",
                overlay: { top: "TARAMA_MODU", val: "YOĞUNLUK" }
            },
            {
                label: "TEDARİKÇİ_TARAMASI",
                title: "SİZE NE SATIYORLAR?",
                p1_head: "NUMUNE vs GERÇEK ÜRÜN",
                p1_desc: "Size gösterilen numune ile depoya inen ürün aynı mı? Laboratuvar taramasıyla tedarikçi kurnazlıklarını yakalıyoruz.",
                p2_head: "FATURA DOĞRULAMA",
                p2_desc: "Faturada 'Kaz Tüyü' yazıyor ama içinden sentetik elyaf mı çıkıyor? Malzeme sahteciliğini %100 oranında tespit ediyoruz.",
                overlay: { top: "MATERYAL_KODU", val: "SENTETİK" }
            },
            {
                label: "YATIRIM_RAPORU",
                title: "BU ÜRÜN NE KADAR DAYANIR?",
                p1_head: "AMORTİSMAN HESABI",
                p1_desc: "Bu mobilyayı şimdi almak mı karlı, yoksa 2 yıl sonra değiştirmek zorunda kalmak mı? Size net bir yatırım raporu sunuyoruz.",
                p2_head: "YENİLEME MALİYETİ",
                p2_desc: "Erken yıpranma yüzünden oluşacak döşeme ve tamir masraflarını bugünden raporluyor, bütçenizi koruyoruz.",
                overlay: { top: "ÖMÜR_TAHMİNİ", val: "2.5 YIL" }
            }
        ]
    },
    EN: {
        tabs: ["QUALITY CONTROL", "SUPPLIER AUDIT", "ASSET LIFESPAN"],
        data: [
            {
                label: "QUALITY_ANALYSIS",
                title: "WHY DOES FURNITURE SAG?",
                p1_head: "DENSITY TEST",
                p1_desc: "We measure foam density. Will the 'First Class' material collapse in 6 months? We detect it upfront.",
                p2_head: "CHEMICAL DURABILITY",
                p2_desc: "Is the fabric durable? We calculate true lifespan via stress tests.",
                overlay: { top: "SCAN_MODE", val: "DENSITY" }
            },
            {
                label: "SUPPLIER_AUDIT",
                title: "WHAT ARE THEY SELLING?",
                p1_head: "SAMPLE vs REALITY",
                p1_desc: "Is the delivered product the same as the sample? We catch supplier tricks.",
                p2_head: "INVOICE VERIFICATION",
                p2_desc: "Synthetic fiber instead of Goose Down? We detect material fraud 100%.",
                overlay: { top: "MATERIAL_CODE", val: "SYNTHETIC" }
            },
            {
                label: "ROI_REPORT",
                title: "HOW LONG WILL IT LAST?",
                p1_head: "DEPRECIATION",
                p1_desc: "Buy now or replace later? We provide a clear investment report.",
                p2_head: "REPLACEMENT COST",
                p2_desc: "We predict future repair costs today, protecting your budget.",
                overlay: { top: "LIFESPAN_EST", val: "2.5 YEARS" }
            }
        ]
    },
    DE: {
        tabs: ["QUALITÄTSKONTROLLE", "LIEFERANTEN AUDIT", "LEBENSDAUER"],
        data: [
            {
                label: "QUALITÄTSANALYSE",
                title: "WARUM GIBT MÖBEL NACH?",
                p1_head: "DICHTETEST",
                p1_desc: "Wir messen die Schaumstoffdichte. Bricht das Material zusammen? Wir erkennen es.",
                p2_head: "CHEMISCHE BESTÄNDIGKEIT",
                p2_desc: "Wir berechnen die wahre Lebensdauer durch Stresstests.",
                overlay: { top: "SCAN_MODUS", val: "DICHTE" }
            },
            {
                label: "LIEFERANTEN_AUDIT",
                title: "WAS WIRD VERKAUFT?",
                p1_head: "MUSTER vs REALITÄT",
                p1_desc: "Entspricht die Lieferung dem Muster? Wir decken Tricks auf.",
                p2_head: "RECHNUNGSPRÜFUNG",
                p2_desc: "Materialbetrug? Wir decken es zu 100% auf.",
                overlay: { top: "MATERIAL_CODE", val: "SYNTHETISCH" }
            },
            {
                label: "ROI_BERICHT",
                title: "WIE LANGE HÄLT ES?",
                p1_head: "ABSCHREIBUNG",
                p1_desc: "Ist der Kauf rentabel? Wir liefern einen klaren Bericht.",
                p2_head: "ERSATZKOSTEN",
                p2_desc: "Wir schützen Ihr Budget vor zukünftigen Kosten.",
                overlay: { top: "LEBENSDAUER", val: "2.5 JAHRE" }
            }
        ]
    }
};

export default function ExplodedView() {
    const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang && CONTENT[savedLang]) {
            setActiveLang(savedLang);
        }
    }, []);

    const t = CONTENT[activeLang];
    const currentData = t.data[activeTab];

    return (
        <section className="min-h-screen bg-[#0B0E14] flex items-center justify-center py-20 border-t border-[#2A3241] overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* SOL KOLON: İÇERİK */}
                <div>
                    {/* TAB MENÜSÜ */}
                    <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-12 border-b border-[#2A3241]">
                        {t.tabs.map((tabName, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`relative pb-4 text-[10px] md:text-xs font-mono tracking-widest transition-colors outline-none uppercase ${activeTab === index
                                        ? "text-[#00FF41] font-bold"
                                        : "text-gray-600 hover:text-white"
                                    }`}
                            >
                                {tabName}
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00FF41]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* İÇERİK ANİMASYONU */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">
                // {currentData.label}
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white leading-[1] tracking-tighter uppercase mb-8">
                                {currentData.title}
                            </h3>

                            <div className="space-y-10">
                                <div className="relative pl-6 border-l border-[#2A3241]">
                                    <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3 uppercase">
                                        <span className="text-[10px] text-gray-500 font-mono">01</span>
                                        {currentData.p1_head}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-mono">
                                        {currentData.p1_desc}
                                    </p>
                                </div>

                                <div className="relative pl-6 border-l border-[#2A3241]">
                                    <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3 uppercase">
                                        <span className="text-[10px] text-gray-500 font-mono">02</span>
                                        {currentData.p2_head}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-mono">
                                        {currentData.p2_desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* SAĞ KOLON: GÖRSEL EKRANI */}
                <div className="w-full aspect-square md:h-[500px] relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF41] to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

                    <div className="absolute inset-0 border border-[#2A3241] bg-[#151922] p-2 flex items-center justify-center overflow-hidden">

                        {/* GÖRSEL ALANI */}
                        <div className="relative w-full h-full bg-black/50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={TAB_IMAGES[activeTab]}
                                        alt={currentData.title}
                                        fill
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />

                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* VERİ ETİKETLERİ */}
                        <div className="absolute top-6 left-6 z-20">
                            <div className="text-[9px] text-gray-400 font-mono tracking-widest bg-black/60 px-2 py-1 uppercase">
                                {currentData.overlay.top}
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 z-20 text-right">
                            <div className="text-[9px] text-gray-400 font-mono tracking-widest mb-1">ANALYSIS_RESULT</div>
                            <div className="text-xl text-[#00FF41] font-bold font-mono bg-black/60 px-2 py-1 inline-block uppercase">
                                {currentData.overlay.val}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}