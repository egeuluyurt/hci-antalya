"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// RESİMLER (Senin istediğin sırayla)
const TAB_IMAGES = [
    "/images/macro-fiber.jpg",         // 1. Sekme
    "/images/polymer-stress-test.png", // 2. Sekme
    "/images/xray-slipper.jpg"         // 3. Sekme
];

const CONTENT = {
    TR: {
        tabs: ["TEKSTİL & YIKAMA", "ENERJİ & TESİSAT", "KONFOR STANDARDI"],
        data: [
            {
                label: "LİF_DEFORMASYON_ANALİZİ",
                title: "HAVLULARINIZ NEDEN ERİYOR?",
                p1_head: "YIKAMA KİMYASALLARI",
                p1_desc: "Çamaşırhaneler daha hızlı beyazlatmak için ağır asit kullanıyor olabilir. Lif analizinde tekstilin kimyasal yanıklarını ve ömrünün %40 kısaldığını kanıtlıyoruz.",
                p2_head: "GSM (GRAMAJ) KAÇAĞI",
                p2_desc: "Tedarikçiniz 500gsm havlu faturası kesip 420gsm ürün mü yolluyor? Her yıkamada hafifleyen değil, baştan eksik gelen ürünü yakalıyoruz.",
                overlay: { top: "LİF_HASARI", val: "KRİTİK SEVİYE" }
            },
            {
                label: "TERMODİNAMİK_KİREÇ_TARAMASI",
                title: "GİZLİ ENERJİ CANAVARI",
                p1_head: "ISITICI DİRENCİ",
                p1_desc: "Oteldeki kettle ve rezistanslar neden sık bozuluyor? Antalya'nın kireçli suyu, cihazların içinde yalıtkan bir katman oluşturur ve %35 fazla elektrik harcatır. Bunu görüntülüyoruz.",
                p2_head: "İZOLASYON KAÇAĞI",
                p2_desc: "Odalar soğumuyor mu? Pencerelerden veya borulardan kaçan enerjiyi termal analizle (ısı haritası) tespit edip faturanızı düşürüyoruz.",
                overlay: { top: "ENERJİ_KAYBI", val: "%35 YÜKSEK" }
            },
            {
                label: "YAPISAL_BÜTÜNLÜK_TESTİ",
                title: "'LÜKS' OTEL, 'UCUZ' HİS?",
                p1_head: "TERLİK MUKAVEMETİ",
                p1_desc: "Misafiriniz duştan çıkınca terliği parçalanıyor mu? İç yapı röntgeniyle, dikişsiz ve tutkalsız üretilen 'kağıt' terlikleri tespit ediyoruz. Puanınız düşmesin.",
                p2_head: "PLASTİK ORANI",
                p2_desc: "Doğal içerik diye satılan ürünlerin ne kadarının petrol türevi olduğunu analiz ediyor, markanızın 'Sürdürülebilir' imajını koruyoruz.",
                overlay: { top: "YAPI_KALİTESİ", val: "DÜŞÜK" }
            }
        ]
    },
    EN: {
        tabs: ["TEXTILE & LAUNDRY", "ENERGY & PLUMBING", "COMFORT STANDARD"],
        data: [
            {
                label: "FIBER_DECAY_ANALYSIS",
                title: "WHY ARE TOWELS DISSOLVING?",
                p1_head: "LAUNDRY CHEMICALS",
                p1_desc: "Laundries use harsh acids for speed. We prove chemical burns on fibers that reduce lifespan by 40%. Stop throwing money away.",
                p2_head: "GSM (WEIGHT) FRAUD",
                p2_desc: "Did you pay for 500gsm but receive 420gsm? We detect textiles that are delivered underweight from day one.",
                overlay: { top: "FIBER_DAMAGE", val: "CRITICAL" }
            },
            {
                label: "THERMAL_SCALE_SCAN",
                title: "THE HIDDEN ENERGY MONSTER",
                p1_head: "HEATER RESISTANCE",
                p1_desc: "Why do kettles break? Limescale creates an insulating layer, forcing devices to burn 35% more electricity. We visualize this blockage.",
                p2_head: "INSULATION LEAK",
                p2_desc: "Rooms won't cool down? We use thermal analysis to find energy escaping from windows/pipes, cutting your bills.",
                overlay: { top: "ENERGY_LOSS", val: "35% HIGH" }
            },
            {
                label: "STRUCTURAL_INTEGRITY",
                title: "LUXURY HOTEL, CHEAP FEEL?",
                p1_head: "SLIPPER DURABILITY",
                p1_desc: "Do slippers tear after one shower? We X-ray internal structures to catch cheap, glueless production before guests complain.",
                p2_head: "PLASTIC CONTENT",
                p2_desc: "We analyze how much 'petroleum' is in your so-called natural products, protecting your sustainable brand image.",
                overlay: { top: "BUILD_QUALITY", val: "LOW" }
            }
        ]
    },
    DE: {
        tabs: ["TEXTIL & WÄSCHE", "ENERGIE & SANITÄR", "KOMFORT STANDARD"],
        data: [
            {
                label: "FASERZERFALL_ANALYSE",
                title: "WARUM LÖSEN SICH HANDTÜCHER AUF?",
                p1_head: "WASCHEMIKALIEN",
                p1_desc: "Wäschereien nutzen harte Säuren. Wir beweisen chemische Verbrennungen, die die Lebensdauer um 40% verkürzen.",
                p2_head: "GSM-GEWICHTSBETRUG",
                p2_desc: "Bezahlen Sie für 500gsm, erhalten aber 420gsm? Wir entdecken zu leichte Lieferungen sofort.",
                overlay: { top: "FASERSCHADEN", val: "KRITISCH" }
            },
            {
                label: "THERMISCHE_KALK_ANALYSE",
                title: "DAS ENERGIE-MONSTER",
                p1_head: "HEIZWIDERSTAND",
                p1_desc: "Warum gehen Wasserkocher kaputt? Kalk erhöht den Stromverbrauch um 35%. Wir machen diese Blockade sichtbar.",
                p2_head: "ISOLATIONSLÜCKE",
                p2_desc: "Zimmer kühlen nicht? Wir finden Energieverluste durch thermische Analyse und senken Ihre Rechnung.",
                overlay: { top: "ENERGIEVERLUST", val: "35% HOCH" }
            },
            {
                label: "STRUKTURINTEGRITÄT",
                title: "LUXUSHOTEL, BILLIGES GEFÜHL?",
                p1_head: "PANTOFFEL-HALTBARKEIT",
                p1_desc: "Reißen Pantoffeln sofort? Wir röntgen die Struktur, um Billigproduktion zu entlarven, bevor Gäste sich beschweren.",
                p2_head: "PLASTIKGEHALT",
                p2_desc: "Wir analysieren den wahren Plastikgehalt in 'natürlichen' Produkten und schützen Ihr Image.",
                overlay: { top: "QUALITÄT", val: "NIEDRIG" }
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

                        {/* 1. GÖRSEL ALANI */}
                        {/* 'overflow-hidden' ekledik ki çizgi dışarı taşmasın */}
                        <div className="relative w-full h-full bg-black/50 overflow-hidden">

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

                                    {/* Scan Grid Efekti */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />
                                </motion.div>
                            </AnimatePresence>

                            {/* --- GARANTİ ÇÖZÜM: ÇİZGİ ARTIK DIŞARIDA VE BAĞIMSIZ --- */}
                            {/* Bu çizgi artık resmin yüklenmesini beklemez, hep çalışır */}
                            <motion.div
                                animate={{ top: ["-10%", "110%"] }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 0
                                }}
                                className="absolute left-0 w-full h-[2px] bg-[#00FF41] shadow-[0_0_20px_#00FF41] z-20 pointer-events-none"
                            />
                            {/* ----------------------------------------------------- */}

                        </div>

                        {/* VERİ ETİKETLERİ */}
                        <div className="absolute top-6 left-6 z-30">
                            <div className="text-[9px] text-gray-400 font-mono tracking-widest bg-black/80 px-2 py-1 uppercase border border-[#00FF41]/30">
                                {currentData.overlay.top}
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 z-30 text-right">
                            <div className="text-[9px] text-gray-400 font-mono tracking-widest mb-1 bg-black/80 inline-block px-1">ANALYSIS_RESULT</div>
                            <div className="text-xl text-[#00FF41] font-bold font-mono bg-black/80 px-2 py-1 inline-block uppercase border border-[#00FF41]/50">
                                {currentData.overlay.val}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}