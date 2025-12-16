"use client";
import { useState, useEffect } from "react";
import { Database, Search, ArrowRight, Globe, Thermometer, Activity, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { reports } from "@/lib/data"; // DATA IMPORTU

export default function ArchiveIndex() {
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) setLang(savedLang);
  }, []);

  // İkon seçici fonksiyon
  const getIcon = (vector: string) => {
    if (vector.includes("THERMAL")) return <Thermometer size={16} />;
    if (vector.includes("OPEX")) return <ShieldAlert size={16} />;
    return <Activity size={16} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-20 font-mono">
      {/* BAŞLIK BÖLÜMÜ */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-3 text-[#00FF41] mb-4">
          <Database size={20} />
          <span className="text-xs tracking-[0.5em] font-bold uppercase italic">// GLOBAL_INTELLIGENCE_DATABASE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">FORENSIC ARCHIVE</h1>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="FILTER_BY_VECTOR_OR_ID..."
              className="w-full bg-[#151922] border border-[#2A3241] p-4 pl-12 text-xs outline-none focus:border-[#00FF41] transition-colors uppercase text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 border border-[#2A3241] px-3 py-2">
            <Globe size={12} />
            <span>ACTIVE_LANGUAGE: {lang}</span>
          </div>
        </div>
      </div>

      {/* VERİTABANI LİSTESİ */}
      <div className="max-w-6xl mx-auto border border-[#2A3241] bg-[#151922]/30">
        <div className="grid grid-cols-4 p-4 border-b border-[#2A3241] text-[10px] text-gray-600 uppercase font-bold tracking-widest hidden md:grid italic">
          <span>REPORT_ID</span>
          <span>VECTOR_CLASSIFICATION</span>
          <span>SUBJECT_ANALYSIS</span>
          <span className="text-right">ACTION</span>
        </div>

        {reports.filter(r => {
          const title = (r.content as any)[lang]?.title || r.title;
          return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.id.toLowerCase().includes(searchTerm.toLowerCase())
        }).map((rpt, idx) => (
          <Link
            key={idx}
            href={`/archive/${rpt.id}`} // DİNAMİK LİNK
            className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#2A3241] items-center hover:bg-[#00FF41]/5 transition-all group"
          >
            <span className="text-[#00FF41] text-xs font-bold mb-2 md:mb-0 italic uppercase">{rpt.id.toUpperCase()}</span>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 md:mb-0">
              {getIcon(rpt.vector)}
              <span className="uppercase">{rpt.vector}</span>
            </div>
            <span className="text-white text-xs font-bold uppercase tracking-tight mb-4 md:mb-0 italic">
              {(rpt.content as any)[lang]?.title || rpt.title}
            </span>
            <div className="flex justify-end">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 group-hover:text-white transition-colors italic font-bold">
                OPEN_FILE <ArrowRight size={14} className="text-[#00FF41]" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-12 text-[8px] text-gray-700 uppercase tracking-[0.3em] italic font-bold">
        SECURE ACCESS PROTOCOL ACTIVE ● TOTAL RECORDS: {reports.length} ● Location: Berlin_Central_Server
      </div>
    </div>
  );
}