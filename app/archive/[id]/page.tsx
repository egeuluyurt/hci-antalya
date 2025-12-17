"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Lock, Download, AlertTriangle, FileX } from "lucide-react";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { reports } from "@/lib/data";

export default function ArchiveDetail() {
  const params = useParams();
  const id = params.id as string;
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language");
    if (savedLang === "TR" || savedLang === "EN" || savedLang === "DE") {
      setLang(savedLang);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const newLang = localStorage.getItem("language");
      if (newLang === "TR" || newLang === "EN" || newLang === "DE") {
        setLang(newLang);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Poll for same-window changes from header
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) return null;

  // FIND REPORT
  const currentReport = reports.find((r) => r.id === id);

  // 404 ERROR HANDLING
  if (!currentReport) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center text-center p-6 border-t border-red-900 font-sans">
        <FileX size={64} className="text-red-500 mb-6 opacity-50" />
        <h1 className="text-white text-3xl font-black mb-2 tracking-tighter uppercase italic">DOSYA BULUNAMADI / FILE NOT FOUND</h1>
        <p className="text-gray-500 font-mono text-xs mb-8 uppercase">
          ID: "{id}"
          <br />
          STATUS: MISSING_OR_CORRUPTED
        </p>
        <Link href="/archive" className="bg-[#00FF41] text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors font-mono">
          RETURN TO ARCHIVE
        </Link>
      </div>
    );
  }

  const content = currentReport.content[lang];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-300 font-sans p-6 md:p-12 relative overflow-hidden">

      <LeadForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} reportId={id} />

      <div className="max-w-3xl mx-auto relative z-10 pt-10">
        <Link href="/archive" className="inline-flex items-center gap-2 text-[#00FF41] text-xs font-mono mb-8 hover:opacity-70 transition-opacity uppercase tracking-widest">
          <ArrowLeft size={14} /> {lang === "TR" ? "ARŞİVE DÖN" : lang === "DE" ? "ZURÜCK ZUM ARCHIV" : "BACK TO ARCHIVE"}
        </Link>

        {/* HEADER */}
        <div className="mb-12 border-b border-[#2A3241] pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20 tracking-widest uppercase font-mono">
              {currentReport.id}
            </span>
            <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">
              {currentReport.vector}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 uppercase italic tracking-tighter">
            {content.title}
          </h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            {content.summary}
          </p>
        </div>

        {/* STORY (BLOG STYLE) */}
        {content.story && (
          <div className="space-y-12">
            {content.story.map((item, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-[#2A3241]">
                <span className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0B0E14] border-2 border-[#2A3241] rounded-full"></span>
                <h3 className="text-[#00FF41] font-mono text-xs font-bold tracking-widest mb-2 uppercase">
                  // 0{idx + 1} {item.head}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TOTAL LOSS BOX */}
        <div className="mt-16 bg-[#151922] border border-red-900/30 p-8 rounded-lg flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-full"><AlertTriangle size={24} /></div>
            <div>
              <div className="text-xs text-gray-500 font-mono mb-1 uppercase tracking-widest">
                {lang === "TR" ? "TOPLAM MALİYET ETKİSİ" : lang === "DE" ? "GESAMTKOSTEN" : "TOTAL COST IMPACT"}
              </div>
              <div className="text-2xl font-bold text-white font-mono tracking-tighter">{currentReport.loss}</div>
            </div>
          </div>
        </div>

        {/* SECURE PROTOCOL (CTA) */}
        <div className="mt-12 p-1 bg-gradient-to-r from-[#00FF41] via-green-800 to-[#0B0E14] rounded-xl">
          <div className="bg-[#0B0E14] p-8 rounded-lg text-center">
            <h3 className="text-white font-bold text-xl mb-2 uppercase italic tracking-wide">
              {lang === "TR" ? "BU SORUN SİZDE DE VAR MI?" : lang === "DE" ? "HABEN SIE DIESES PROBLEM?" : "DO YOU HAVE THIS PROBLEM?"}
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
              {lang === "TR" ? "Tam dosyayı ve çözüm reçetesini indirin." : lang === "DE" ? "Laden Sie die vollständige Datei herunter." : "Download the full file and solution recipe."}
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-3 bg-[#00FF41] text-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors rounded shadow-[0_0_20px_rgba(0,255,65,0.3)]"
            >
              <Download size={18} />
              {content.download_text || "DOWNLOAD REPORT"}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
              <Lock size={12} /> SECURE PROTOCOL
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}