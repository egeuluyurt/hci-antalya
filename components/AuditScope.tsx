"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const scopes = [
    {
        id: "01",
        title: "PHANTOM_OPEX_DETECTION",
        desc: "Analyzes CPOR (Cost Per Occupied Room) deviations and calculates inventory shrinkage rates to identify unauthorized asset depletion.",
        image: "/images/icon-opex.png",
        status: "CRITICAL"
    },
    {
        id: "02",
        title: "LIABILITY_RISK_MATRIX",
        desc: "Quantifies litigation risk via wet-surface friction coefficients and dermatological allergen screening protocols to ensure guest safety.",
        image: "/images/icon-risk.png",
        status: "MONITORING"
    },
    {
        id: "03",
        title: "ENERGY_CONSUMPTION_AUDIT",
        desc: "Calculates the direct correlation between textile drying cycles and utility bills (kWh & Water) to optimize laundry operation efficiency.",
        image: "/images/icon-energy.png",
        status: "ACTIVE"
    },
    {
        id: "04",
        title: "SENSORY_BRAND_ALIGNMENT",
        desc: "Audits the alignment between amenity haptic feedback and the hotel's star-rating positioning to ensure brand equity protection.",
        image: "/images/icon-brand.png",
        status: "ACTIVE"
    },
    {
        id: "05",
        title: "LOGISTICS_VOLUME_METRICS",
        desc: "Optimizes stock holding costs per cubic meter (m³) by analyzing packaging density and warehouse utilization metrics.",
        image: "/images/icon-logistics.png",
        status: "OPTIMIZED"
    },
    {
        id: "06",
        title: "SUPPLY_CHAIN_LATENCY",
        desc: "Generates buffer stock scenarios to prevent 'Out-of-Stock' events during peak seasonal demand, ensuring operational continuity.",
        image: "/images/icon-supply.png",
        status: "STABLE"
    }
];

export default function AuditScope() {
    return (
        <section className="py-24 px-6 bg-[#0B0E14] border-b border-[#2A3241]">
            <div className="max-w-6xl mx-auto">

                {/* Başlık Grubu */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
                            FULL_SPECTRUM <br /> <span className="text-[#00FF41]">DIAGNOSTICS</span>
                        </h2>
                        <p className="font-mono text-xs text-gray-500 max-w-md">
                            We don't just check products. We audit the financial and operational impact of your entire amenity procurement architecture.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#151922] px-4 py-2 border border-[#2A3241] rounded-full">
                        <div className="relative">
                            <span className="w-2 h-2 bg-[#00FF41] rounded-full absolute animate-ping"></span>
                            <span className="w-2 h-2 bg-[#00FF41] rounded-full relative block"></span>
                        </div>
                        <span className="font-mono text-[10px] text-gray-400">
                            LIVE_SYSTEM_CHECK
                        </span>
                    </div>
                </div>

                {/* 6'lı Matris Izgarası */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scopes.map((scope) => (
                        <div
                            key={scope.id}
                            className="bg-[#0f1219] border border-[#2A3241] p-6 hover:border-[#00FF41] hover:bg-[#151922] transition-all duration-300 group cursor-default"
                        >
                            <div className="flex justify-between items-start mb-6">

                                {/* GÖRSEL ALANI */}
                                <div className="relative w-16 h-16 bg-black border border-[#2A3241] rounded overflow-hidden group-hover:border-[#00FF41]/50 transition-colors">
                                    <Image
                                        src={scope.image}
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

                            <p className="text-xs text-gray-400 leading-relaxed font-mono">
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