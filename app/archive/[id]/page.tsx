"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import LeadForm from "@/components/LeadForm"; // <--- 1. IMPORT ETTİK

const TRANSLATIONS = {
  TR: {
    back: "[ SİSTEM_KÖKÜNE_DÖN ]",
    tag: "// ADLİ_İSTİHBARAT_RAPORU",
    classification: "Sınıflandırma",
    origin: "Kaynak",
    subject: "Konu",
    status: "Durum",
    status_val: "● ERİŞİME_AÇIK_ÖZET",
    summary_title: "[ 01_YÖNETİCİ_ÖZETİ ]",
    summary_text: "Bu vaka dosyası, endüstriyel operasyonlarda gözden kaçan mikroskobik deformasyonların yıllık bütçe üzerindeki etkisini analiz eder.",
    matrix_title: "[ 02_FİNANSAL_ETKİ_MATRİSİ ]",
    locked_title: "VERİ_ERİŞİMİ_KİLİTLİ",
    locked_desc: "Tam maliyet analizi ve çözüm metodolojisi sadece yetkili personel içindir.",
    btn: "TAM RAPOR İÇİN ERİŞİM TALEP ET"
  },
  EN: {
    back: "[ BACK_TO_SYSTEM_ROOT ]",
    tag: "// FORENSIC_INTEL_REPORT",
    classification: "Classification",
    origin: "Origin",
    subject: "Subject",
    status: "Status",
    status_val: "● DECLASSIFIED_BRIEF",
    summary_title: "[ 01_EXECUTIVE_SUMMARY ]",
    summary_text: "This case file analyzes the impact of microscopic deformations overlooked in industrial operations on the annual budget.",
    matrix_title: "[ 02_FINANCIAL_IMPACT_MATRIX ]",
    locked_title: "DATA_ACCESS_LOCKED",
    locked_desc: "The full cost analysis and engineering methodology is for authorized personnel only.",
    btn: "REQUEST ACCESS FOR FULL REPORT"
  },
  DE: {
    back: "[ ZURÜCK_ZUM_SYSTEMSTAMM ]",
    tag: "// FORENSISCHER_INTEL_BERICHT",
    classification: "Klassifizierung",
    origin: "Herkunft",
    subject: "Betreff",
    status: "Status",
    status_val: "● FREIGEGEBENE_ZUSAMMENFASSUNG",
    summary_title: "[ 01_ZUSAMMENFASSUNG ]",
    summary_text: "Diese Falldatei analysiert die Auswirkungen mikroskopischer Verformungen auf das Jahresbudget.",
    matrix_title: "[ 02_FINANZIELLE_AUSWIRKUNGSMATRIX ]",
    locked_title: "DATENZUGRIFF_GESPERRT",
    locked_desc: "Die vollständige Kostenanalyse und Methodik ist nur für autorisiertes Personal bestimmt.",
    btn: "ZUGRIFF AUF VOLLSTÄNDIGEN BERICHT ANFORDERN"
  }
};

export default function ArchiveDetail() {
  const params = useParams();
  const id = params.id as string;
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
  const [isFormOpen, setIsFormOpen] = useState(false); // <--- 2. STATE EKLEDİK

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">

      {/* 3. FORM BİLEŞENİNİ SAYFAYA KOYDUK */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        reportId={id ? id.toUpperCase() : "UNKNOWN"}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/archive" className="flex items-center gap-2 text-[#00FF41] text-[10px] mb-12 hover:opacity-70">
          <ArrowLeft size={14} /> {t.back}
        </Link>

        <div className="border border-[#2A3241] p-8 bg-[#151922]/50 backdrop-blur-sm relative">
          <div className="text-[10px] text-[#00FF41] mb-2 font-bold tracking-[0.3em]">{t.tag}</div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-6">CASE_{id ? id.toUpperCase() : "LOADING"}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] border-t border-[#2A3241] pt-6 uppercase font-bold tracking-widest italic">
            <div><span className="text-gray-600 block">{t.classification}</span><span className="text-white">TOP_SECRET</span></div>
            <div><span className="text-gray-600 block">{t.origin}</span><span className="text-white">BERLIN_LABS</span></div>
            <div><span className="text-gray-600 block">{t.subject}</span><span className="text-white">NECROSIS</span></div>
            <div><span className="text-gray-600 block">{t.status}</span><span className="text-[#00FF41] animate-pulse">{t.status_val}</span></div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div className="p-8 border-l border-[#2A3241]">
            <h2 className="text-[#00FF41] text-xs font-bold mb-4 uppercase tracking-widest italic">{t.summary_title}</h2>
            <p className="text-sm leading-relaxed text-gray-400 italic">{t.summary_text}</p>
          </div>

          <div className="relative group">
            <div className="p-8 border border-[#2A3241] bg-black/40 blur-[12px] select-none italic">
              <h2 className="text-[#00FF41] text-xs font-bold mb-4">{t.matrix_title}</h2>
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 w-3/4 rounded" />
                <div className="h-4 bg-gray-800 w-1/2 rounded" />
                <div className="h-20 bg-gray-900 w-full rounded" />
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]">
              <div className="bg-[#151922] border border-[#00FF41] p-8 text-center max-w-sm shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                <Lock size={32} className="text-[#00FF41] mx-auto mb-4 animate-bounce" />
                <h3 className="text-white font-bold mb-2 uppercase tracking-tighter italic">{t.locked_title}</h3>
                <p className="text-[10px] text-gray-500 mb-6 leading-relaxed italic">{t.locked_desc}</p>

                {/* 4. BUTONU FORM'U AÇACAK ŞEKİLDE GÜNCELLEDİK */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-[#00FF41] text-black font-bold py-3 text-[10px] uppercase hover:bg-white transition-all italic tracking-widest"
                >
                  {t.btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}