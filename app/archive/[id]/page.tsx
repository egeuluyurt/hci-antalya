// app/archive/[id]/page.tsx

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { reports } from "@/lib/data";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldAlert, Globe } from "lucide-react";

export default function ReportDetail() {
    const params = useParams();
    const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");

    // Dili LocalStorage'dan Çek
    useEffect(() => {
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang) setActiveLang(savedLang);
    }, []);

    // ID'ye göre raporu bul
    // params.id, klasör ismindeki [id]'den gelir
    const report = reports.find((r) => r.id === params.id);

    if (!report) {
        return (
            <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center text-gray-500 font-mono text-xs">
                ERROR_404: REPORT_NOT_FOUND_ON_SERVER
            </div>
        );
    }

    // Aktif dile göre içeriği seç, yoksa İngilizceye (EN) düş (Fallback)
    const content = (report.content as any)[activeLang] || (report.content as any)["EN"];

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white font-sans relative overflow-x-hidden selection:bg-[#00FF41] selection:text-black">

            {/* HEADER */}
            <div className="border-b border-[#2A3241] p-6 md:p-8 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-start">
                    <div>
                        <Link href="/archive" className="text-[10px] text-gray-500 hover:text-[#00FF41] mb-4 inline-flex items-center gap-2 transition-colors uppercase tracking-widest font-mono">
                            <ArrowLeft size={12} /> // RETURN_TO_DATABASE
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-black uppercase italic leading-tight text-white mb-2">
                            {content.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono tracking-widest uppercase text-gray-500">
                            <span className="text-[#00FF41]">ID: {report.id.toUpperCase()}</span>
                            <span className="flex items-center gap-1 text-red-500"><ShieldAlert size={10} /> {report.vector}</span>
                            <span>LOC: {report.location}</span>
                            <span className="border border-gray-800 px-2 py-0.5 rounded flex items-center gap-1 text-gray-400">
                                <Globe size={10} /> LANG: {activeLang}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT BODY */}
            <div className="max-w-4xl mx-auto p-6 md:p-12 relative">

                {/* EXECUTIVE SUMMARY (Açık Bölüm) */}
                <div className="mb-12 border-l-2 border-[#00FF41] pl-6 py-1">
                    <h3 className="text-[#00FF41] text-[10px] font-mono font-bold mb-2 tracking-[0.2em]">EXECUTIVE_SUMMARY</h3>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                        {content.summary}
                    </p>
                </div>

                {/* FULL CONTENT (HTML Render) */}
                <div className="prose prose-invert prose-p:text-gray-400 prose-headings:font-mono prose-headings:text-white max-w-none">
                    {/* HTML içeriklerini buraya güvenli şekilde basıyoruz */}
                    <div dangerouslySetInnerHTML={{ __html: content.fullContent }} />
                </div>

                {/* GATED CONTENT OVERLAY (Kilit ve Bulanıklık) */}
                <div className="relative mt-16 py-12 border-t border-[#2A3241] border-dashed">
                    <div className="bg-[#151922] border border-[#2A3241] p-8 text-center max-w-lg mx-auto relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50"></div>

                        <Lock size={32} className="text-[#00FF41] mx-auto mb-4" />
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">
                            {activeLang === "TR" ? "MÜDAHALE GEREKLİ" : "INTERVENTION REQUIRED"}
                        </h4>
                        <p className="text-gray-500 text-xs mb-6 font-mono">
                            {activeLang === "TR"
                                ? "Tam denetim raporuna erişmek ve otelinizin operasyonel verimlilik skorunu öğrenmek için."
                                : "To access the full audit report and discover your hotel's operational efficiency score."}
                        </p>

                        <a
                            href={`mailto:audit@hci-berlin.com?subject=AUDIT_REQUEST_FOR_${report.id.toUpperCase()}`}
                            className="inline-block bg-[#00FF41] text-black px-8 py-3 text-xs font-bold uppercase hover:bg-white transition-colors tracking-widest font-mono"
                        >
                            {activeLang === "TR" ? "> DENETİM TALEP ET" : "> REQUEST_IMMEDIATE_AUDIT"}
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}