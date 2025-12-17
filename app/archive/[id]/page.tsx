"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react"; // ShieldCheck ve Globe kullanılmadığı için çıkardım
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

const TRANSLATIONS = {
  TR: {
    back: "[ ANA EKRANA DÖN ]",
    tag: "// FİNANSAL_KAYIP_DOSYASI",
    classification: "Öncelik",
    origin: "Departman",
    subject: "Tespit",
    status: "Durum",
    status_val: "● AKTİF_GİDER_KAÇAĞI",
    summary_title: "[ 01_YÖNETİCİ_ÖZETİ ]",
    summary_text: "Bu dosya, işletme bütçesinde 'açıklanamayan gider' olarak görünen, ancak aslında yanlış malzeme ve ekipman kullanımı kaynaklı olan yıllık %12'lik nakit kaybını belgeler.",
    matrix_title: "[ 02_MALİYET_ETKİ_MATRİSİ ]",
    locked_title: "DETAYLI ANALİZ KİLİTLİ",
    locked_desc: "Bu kaybı nasıl önleyeceğinizi gösteren çözüm reçetesi ve tedarikçi kara listesi sadece yetkili erişimine açıktır.",
    btn: "ÇÖZÜM RAPORUNU İNDİR"
  },
  EN: {
    back: "[ BACK_TO_DASHBOARD ]",
    tag: "// FINANCIAL_LOSS_FILE",
    classification: "Priority",
    origin: "Department",
    subject: "Detection",
    status: "Status",
    status_val: "● ACTIVE_CASH_LEAK",
    summary_title: "[ 01_EXECUTIVE_SUMMARY ]",
    summary_text: "This file documents the 12% annual cash loss appearing as 'unexplained expenses', actually caused by incorrect material and equipment usage.",
    matrix_title: "[ 02_COST_IMPACT_MATRIX ]",
    locked_title: "DETAILED ANALYSIS LOCKED",
    locked_desc: "The solution recipe and supplier blacklist showing how to prevent this loss are for authorized access only.",
    btn: "DOWNLOAD SOLUTION REPORT"
  },
  DE: {
    back: "[ ZURÜCK_ZUM_DASHBOARD ]",
    tag: "// FINANZVERLUST_DATEI",
    classification: "Priorität",
    origin: "Abteilung",
    subject: "Erkennung",
    status: "Status",
    status_val: "● AKTIVES_GELDLECK",
    summary_title: "[ 01_ZUSAMMENFASSUNG ]",
    summary_text: "Diese Datei dokumentiert den jährlichen Geldverlust von 12%, der durch falsche Material- und Gerätenutzung verursacht wird.",
    matrix_title: "[ 02_KOSTEN_AUSWIRKUNGSMATRIX ]",
    locked_title: "DETAILLIERTE ANALYSE GESPERRT",
    locked_desc: "Das Lösungsrezept und die Lieferanten-Blacklist sind nur für autorisierten Zugriff verfügbar.",
    btn: "LÖSUNGSBERICHT HERUNTERLADEN"
  }
};

export default function ArchiveDetail() {
  const params = useParams();
  const id = params.id as string;
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = TRANSLATIONS[lang];

  // ID'ye göre dinamik başlık (Vaka-001 vb.)
  const displayId = id ? id.toUpperCase() : "VAKA-000";

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">
      
      {/* LEAD FORM (Kancayı buraya taktık) */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        reportId={displayId} 
      />

      {/* Arka Plan Deseni */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="flex items-center gap-2 text-[#00FF41] text-[10px] mb-12 hover:opacity-70 transition-opacity">
          <ArrowLeft size={14} /> {t.back}
        </Link>

        {/* ÜST BİLGİ KARTI */}
        <div className="border border-[#2A3241] p-8 bg-[#151922]/50 backdrop-blur-sm relative">
          <div className="text-[10px] text-[#00FF41] mb-2 font-bold tracking-[0.3em] uppercase">
            {t.tag}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-6">
            {displayId}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] border-t border-[#2A3241] pt-6 uppercase font-bold tracking-widest italic">
            <div>
              <span className="text-gray-600 block mb-1">{t.classification}</span>
              <span className="text-red-500">YÜKSEK_RİSK</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">{t.origin}</span>
              <span className="text-white">SATIN_ALMA</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">{t.subject}</span>
              <span className="text-white">GİZLİ_GİDER</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">{t.status}</span>
              <span className="text-[#00FF41] animate-pulse">{t.status_val}</span>
            </div>
          </div>
        </div>

        {/* İÇERİK ALANI */}
        <div className="mt-8 space-y-8">
          <div className="p-8 border-l-2 border-[#2A3241] bg-black/20">
            <h2 className="text-[#00FF41] text-xs font-bold mb-4 uppercase tracking-widest italic">
              {t.summary_title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 italic">
              {t.summary_text}
            </p>
          </div>

          {/* KİLİTLİ ALAN (Bulanık Efekt) */}
          <div className="relative group overflow-hidden border border-[#2A3241]">
            {/* Bulanık Arka Plan İçeriği */}
            <div className="p-8 bg-black/40 blur-[12px] select-none pointer-events-none opacity-50">
              <h2 className="text-[#00FF41] text-xs font-bold mb-4">{t.matrix_title}</h2>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between"><span className="bg-gray-800 text-transparent">Gider Kalemi A</span><span className="bg-gray-800 text-transparent">$12,000</span></div>
                <div className="flex justify-between"><span className="bg-gray-800 text-transparent">Operasyonel Kayıp</span><span className="bg-gray-800 text-transparent">$4,500</span></div>
                <div className="h-32 bg-gray-900 w-full rounded mt-4" />
              </div>
            </div>

            {/* Kilit Kutusu */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[4px] z-20">
              <div className="bg-[#0B0E14] border border-[#00FF41] p-8 text-center max-w-sm shadow-[0_0_50px_rgba(0,255,65,0.15)] relative">
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#00FF41]" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00FF41]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00FF41]" />

                <Lock size={32} className="text-[#00FF41] mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2 uppercase tracking-tighter italic">
                  {t.locked_title}
                </h3>
                <p className="text-[10px] text-gray-500 mb-6 leading-relaxed italic font-mono">
                  {t.locked_desc}
                </p>
                
                {/* BUTON: Formu Açar */}
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-[#00FF41] text-black font-bold py-4 text-[10px] uppercase hover:bg-white transition-colors tracking-widest shadow-[0_0_20px_rgba(0,255,65,0.4)]"
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