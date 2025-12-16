"use client";
import { useState, useEffect } from "react";
import { Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { reports } from "@/lib/data";

export default function IntelligenceArchive() {
    const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang) setLang(savedLang);
    }, []);

    // Safety check: ensure reports exist
    const featuredReports = reports ? reports.slice(0, 3) : [];

    return (
        <section className="py-24 bg-[#0B0E14] border-t border-[#2A3241]">
            <div className="max-w-6xl mx-auto px-6">

                {/* BAŞLIK ALANI */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="border-l-2 border-[#00FF41] pl-6">
                        <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-2 uppercase italic font-bold">
                            // INTELLIGENCE_FEED_V.2.0
                        </h2>
                        <p className="text-white text-3xl font-black tracking-tighter uppercase italic">
                            LATEST FORENSIC FINDINGS
                        </p>
                    </div>

                    <Link
                        href="/archive"
                        className="text-gray-600 font-mono text-[10px] hover:text-[#00FF41] transition-colors tracking-widest border border-gray-800 px-4 py-2 hover:border-[#00FF41]"
                    >
                        ENTER_ARCHIVE_DATALINK [ &gt;&gt;&gt; ]
                    </Link>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {featuredReports.map((rpt, idx) => (
                        <Link
                            key={idx}
                            href={`/archive/${rpt.id}`}
                            className={`bg-[#151922] border border-[#2A3241] p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px] hover:border-[#00FF41] transition-colors ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Activity size={18} />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-mono text-[9px] text-[#00FF41] bg-[#00FF41]/5 px-2 py-1 border border-[#00FF41]/20 uppercase">
                                        ID: {rpt.id.toUpperCase()}
                                    </span>
                                    <span className={`font-mono text-[8px] tracking-widest ${rpt.status === 'CRITICAL' ? 'text-red-500' : 'text-gray-500'}`}>
                                        [{rpt.status}]
                                    </span>
                                </div>

                                <div className="font-mono text-[9px] text-gray-500 mb-1 tracking-tighter uppercase">
                                    VECTOR: {rpt.vector}
                                </div>
                                <h3 className="text-white font-bold text-xl group-hover:text-[#00FF41] transition-colors leading-tight mb-4 uppercase italic tracking-tighter">
                                    {rpt.content[lang]?.title || rpt.title}
                                </h3>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/5 pt-6">
                                <div>
                                    <div className="text-[9px] font-mono text-gray-600 uppercase mb-1">ESTIMATED ANNUAL LOSS</div>
                                    <div className="text-2xl font-black text-white group-hover:text-red-500 transition-colors font-mono">
                                        {rpt.loss}
                                    </div>
                                </div>
                                <div className="bg-[#0B0E14] p-3 text-[#00FF41] group-hover:bg-[#00FF41] group-hover:text-black transition-all border border-[#2A3241]">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}