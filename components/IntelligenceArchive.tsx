"use client";
import { useState, useEffect } from "react";
import { Activity, ArrowRight, ShieldAlert, Thermometer, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { reports } from "@/lib/data"; // <-- YENİ VERİTABANINI İÇERİ ALDIK

const TRANSLATIONS = {
  TR: {
    section_tag: "// KRİTİK_UYARILAR",
    section_title: "TESPİT EDİLEN MALİYET KAÇAKLARI",
    btn_text: "TÜM ZARAR RAPORLARINI GÖR [ >>> ]",
    loss_label: "BU HATANIN YILLIK BEDELİ",
  },
  EN: {
    section_tag: "// CRITICAL_ALERTS",
    section_title: "DETECTED FINANCIAL LEAKS",
    btn_text: "VIEW ALL LOSS REPORTS [ >>> ]",
    loss_label: "ANNUAL COST OF THIS ERROR",
  },
  DE: {
    section_tag: "// KRITISCHE_WARNUNGEN",
    section_title: "ERKANNTE FINANZLECKS",
    btn_text: "ALLE VERLUSTBERICHTE ANSEHEN [ >>> ]",
    loss_label: "JÄHRLICHE KOSTEN DIESES FEHLERS",
  }
};

export default function IntelligenceArchive() {
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");

  // Dil ayarını localStorage'dan çek
  useEffect(() => {
    const checkLang = () => {
      const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
      if (savedLang && savedLang !== lang) {
        setLang(savedLang);
      }
    };
    // Sürekli kontrol (diğer componentlerden değişim olursa yakalamak için)
    const interval = setInterval(checkLang, 100);
    return () => clearInterval(interval);
  }, [lang]);

  const t = TRANSLATIONS[lang];

  // Vektör türüne göre doğru ikonu seçen fonksiyon
  const getIcon = (vector: string) => {
    if (vector.includes("THERMAL") || vector.includes("ENERGY")) return <Thermometer size={18} className="text-red-500" />;
    if (vector.includes("MOLECULAR") || vector.includes("NECROSIS")) return <Activity size={18} className="text-lime-500" />;
    if (vector.includes("OPEX") || vector.includes("SURGE")) return <ShieldAlert size={18} className="text-orange-500" />;
    return <AlertTriangle size={18} className="text-gray-500" />;
  };

  // Durum (Status) rengini belirleyen fonksiyon
  const getStatusColor = (status: string) => {
    if (status === "CRITICAL" || status === "URGENT") return "text-red-500";
    if (status === "STABLE" || status === "COMMON") return "text-lime-500";
    return "text-orange-500";
  };

  return (
    <section className="py-24 bg-[#0B0E14] border-t border-[#2A3241]">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- BAŞLIK ALANI --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="border-l-2 border-[#00FF41] pl-6">
            <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-2 uppercase italic font-bold">
              {t.section_tag}
            </h2>
            <p className="text-white text-3xl font-black tracking-tighter uppercase italic">
              {t.section_title}
            </p>
          </div>

          <Link
            href="/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 font-mono text-[10px] hover:text-[#00FF41] transition-colors tracking-widest border border-gray-800 px-4 py-2 hover:border-[#00FF41]"
          >
            {t.btn_text}
          </Link>
        </div>

        {/* --- BENTO GRID (DİNAMİK LİSTE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* reports dizisini map ile dönüyoruz */}
          {reports.map((rpt, idx) => {
            // Aktif dile göre içeriği seçiyoruz
            const content = rpt.content[lang];

            return (
              <Link
                key={rpt.id}
                href={`/archive/${rpt.id}`} // ARTIK DOĞRU ID'YE GİDİYOR
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#151922] border border-[#2A3241] p-6 group relative overflow-hidden flex flex-col justify-between min-h-[250px] hover:border-[#00FF41] transition-colors ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  {getIcon(rpt.vector)}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[9px] text-[#00FF41] bg-[#00FF41]/5 px-2 py-1 border border-[#00FF41]/20 uppercase">
                      DOSYA: {rpt.id}
                    </span>
                    <span className={`font-mono text-[8px] tracking-widest ${getStatusColor(rpt.status)}`}>
                      [{rpt.status}]
                    </span>
                  </div>

                  <div className="font-mono text-[9px] text-gray-500 mb-1 tracking-tighter uppercase">
                    SEBEP: {rpt.vector}
                  </div>
                  <h3 className="text-white font-bold text-xl group-hover:text-[#00FF41] transition-colors leading-tight mb-4 uppercase italic tracking-tighter">
                    {content.title}
                  </h3>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-6">
                  <div>
                    <div className="text-[9px] font-mono text-gray-600 uppercase mb-1">{t.loss_label}</div>
                    <div className="text-2xl font-black text-white group-hover:text-red-500 transition-colors font-mono">
                      {rpt.loss}
                    </div>
                  </div>
                  <div className="bg-[#0B0E14] p-3 text-[#00FF41] group-hover:bg-[#00FF41] group-hover:text-black transition-all border border-[#2A3241]">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}