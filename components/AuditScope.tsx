"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuditScope() {
    const [lang, setLang] = useState("EN");

    // Dil Hafızasını Dinle
    useEffect(() => {
        const checkLang = () => {
            const savedLang = localStorage.getItem("language") || "EN";
            if (savedLang !== lang) setLang(savedLang);
        };
        const interval = setInterval(checkLang, 100);
        return () => clearInterval(interval);
    }, [lang]);

    const dict = {
        TR: {
            title: "TAM_SPEKTRUM",
            subtitle: "DENETİM",
            desc: "Sadece ürünleri kontrol etmiyoruz. Tüm buklet tedarik mimarinizin finansal ve operasyonel etkilerini denetliyoruz.",
            status: "SİSTEM_KONTROLÜ_AKTİF",
            scopes: [
                { id: "01", title: "GİZLİ_OPEX_TESPİTİ", desc: "CPOR sapmalarını analiz eder ve yetkisiz stok tüketimini belirlemek için envanter küçülme oranlarını hesaplar." },
                { id: "02", title: "SORUMLULUK_RİSK_MATRİSİ", desc: "Islak yüzey sürtünme katsayıları ve alerjen tarama protokolleri aracılığıyla misafir güvenliğini denetler." },
                { id: "03", title: "ENERJİ_TÜKETİM_ANALİZİ", desc: "Çamaşırhane verimliliğini optimize etmek için tekstil kurutma döngüleri ile faturalar arasındaki korelasyonu hesaplar." },
                { id: "04", title: "DUYUSAL_MARKA_UYUMU", desc: "Ürün dokunsal geri bildirimi ile otelin yıldız derecelendirmesi arasındaki uyumu denetleyerek marka standartlarını korur." },
                { id: "05", title: "LOJİSTİK_HACİM_METRİKLERİ", desc: "Ambalaj yoğunluğunu analiz ederek metreküp başına stok tutma maliyetlerini optimize eder." },
                { id: "06", title: "TEDARİK_ZİNCİRİ_GECİKMESİ", desc: "Sezonluk talep sırasında stoksuz kalmayı önlemek için tampon stok senaryoları oluşturur." }
            ]
        },
        EN: {
            title: "FULL_SPECTRUM",
            subtitle: "DIAGNOSTICS",
            desc: "We don't just check products. We audit the financial and operational impact of your entire amenity procurement architecture.",
            status: "LIVE_SYSTEM_CHECK",
            scopes: [
                { id: "01", title: "PHANTOM_OPEX_DETECTION", desc: "Analyzes CPOR (Cost Per Occupied Room) deviations and calculates inventory shrinkage rates to identify unauthorized asset depletion." },
                { id: "02", title: "LIABILITY_RISK_MATRIX", desc: "Quantifies litigation risk via wet-surface friction coefficients and dermatological allergen screening protocols to ensure guest safety." },
                { id: "03", title: "ENERGY_CONSUMPTION_AUDIT", desc: "Calculates the direct correlation between textile drying cycles and utility bills (kWh & Water) to optimize laundry operation efficiency." },
                { id: "04", title: "SENSORY_BRAND_ALIGNMENT", desc: "Audits the alignment between amenity haptic feedback and the hotel's star-rating positioning to ensure brand equity protection." },
                { id: "05", title: "LOGISTICS_VOLUME_METRICS", desc: "Optimizes stock holding costs per cubic meter (m³) by analyzing packaging density and warehouse utilization metrics." },
                { id: "06", title: "SUPPLY_CHAIN_LATENCY", desc: "Generates buffer stock scenarios to prevent 'Out-of-Stock' events during peak seasonal demand, ensuring operational continuity." }
            ]
        },
        DE: {
            title: "VOLLSPEKTRUM",
            subtitle: "DIAGNOSE",
            desc: "Wir prüfen nicht nur Produkte. Wir auditieren die finanziellen und operativen Auswirkungen Ihrer gesamten Beschaffungsarchitektur.",
            status: "SYSTEMCHECK_AKTIV",
            scopes: [
                { id: "01", title: "PHANTOM_OPEX_ERKENNUNG", desc: "Analysiert CPOR-Abweichungen und berechnet Inventurschwundraten zur Identifizierung unbefugter Bestandsentnahmen." },
                { id: "02", title: "HAFTUNGSRISIKOMATRIX", desc: "Quantifiziert das Prozessrisiko durch Reibungskoeffizienten und dermatologische Screening-Protokolle." },
                { id: "03", title: "ENERGIEVERBRAUCHS_AUDIT", desc: "Berechnet die Korrelation zwischen Textiltrocknungszyklen und Nebenkosten zur Optimierung der Wäschereieffizienz." },
                { id: "04", title: "SENSORISCHE_MARKENAUSRICHTUNG", desc: "Prüft die Übereinstimmung zwischen haptischem Feedback und der Sternebewertung des Hotels." },
                { id: "05", title: "LOGISTIK_VOLUMEN_METRIKEN", desc: "Optimiert die Lagerhaltungskosten pro Kubikmeter (m³) durch Analyse der Verpackungsdichte." },
                { id: "06", title: "LIEFERKETTEN_LATENZ", desc: "Erstellt Pufferbestands-Szenarien, um Out-of-Stock-Events bei saisonaler Spitzennachfrage zu verhindern." }
            ]
        }
    };

    const content = (dict as any)[lang] || dict.EN;

    // İkon Yollarını Orijinal Kodundaki Gibi Statik Tutuyoruz
    const iconPaths: Record<string, string> = {
        "01": "/images/icon-opex.png",
        "02": "/images/icon-risk.png",
        "03": "/images/icon-energy.png",
        "04": "/images/icon-brand.png",
        "05": "/images/icon-logistics.png",
        "06": "/images/icon-supply.png"
    };

    return (
        <section className="py-24 px-6 bg-[#0B0E14] border-b border-[#2A3241]">
            <div className="max-w-6xl mx-auto">

                {/* Başlık Grubu */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase">
                            {content.title} <br /> <span className="text-[#00FF41]">{content.subtitle}</span>
                        </h2>
                        <p className="font-mono text-xs text-gray-500 max-w-md italic">
                            {content.desc}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#151922] px-4 py-2 border border-[#2A3241] rounded-full">
                        <div className="relative">
                            <span className="w-2 h-2 bg-[#00FF41] rounded-full absolute animate-ping"></span>
                            <span className="w-2 h-2 bg-[#00FF41] rounded-full relative block"></span>
                        </div>
                        <span className="font-mono text-[10px] text-gray-400">
                            {content.status}
                        </span>
                    </div>
                </div>

                {/* 6'lı Matris Izgarası */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.scopes.map((scope: any) => (
                        <div
                            key={scope.id}
                            className="bg-[#0f1219] border border-[#2A3241] p-6 hover:border-[#00FF41] hover:bg-[#151922] transition-all duration-300 group cursor-default"
                        >
                            <div className="flex justify-between items-start mb-6">
                                {/* GÖRSEL ALANI */}
                                <div className="relative w-16 h-16 bg-black border border-[#2A3241] rounded overflow-hidden group-hover:border-[#00FF41]/50 transition-colors">
                                    <Image
                                        src={iconPaths[scope.id]}
                                        alt={scope.title}
                                        fill
                                        className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[#00FF41]/0 group-hover:bg-[#00FF41]/10 transition-colors" />
                                </div>

                                <span className="font-mono text-[10px] text-gray-600 group-hover:text-[#00FF41]">
                                    MOD_{scope.id}
                                </span>
                            </div>

                            <h3 className="font-mono text-sm font-bold text-white mb-3 tracking-wide">
                                {scope.title.replace(/_/g, " ")}
                            </h3>

                            <p className="text-xs text-gray-400 leading-relaxed font-mono italic">
                                {scope.desc}
                            </p>

                            {/* Alt Çizgi Animasyonu */}
                            <div className="w-full h-[1px] bg-[#2A3241] mt-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[#00FF41] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}