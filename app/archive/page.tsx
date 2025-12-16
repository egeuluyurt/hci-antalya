"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Search, ArrowRight, Activity, ShieldAlert, Thermometer, Globe } from "lucide-react";
import Link from "next/link";

const TRANSLATIONS = {
  TR: {
    db_tag: "// KÜRESEL_İSTİHBARAT_VERİTABANI",
    title: "Adli Arşiv",
    filter_placeholder: "VEKTÖR_VEYA_ID_İLE_FİLTRELE...",
    table_id: "Rapor_ID",
    table_vector: "Vektör_Sınıflandırması",
    table_subject: "Konu_Analizi",
    table_action: "Eylem",
    open_file: "DOSYAYI_AÇ",
    footer_note: "Güvenli Erişim Protokolü Aktif ● Toplam Kayıt:",
    reports: [
      { id: "RPT-7702-ANT", vector: "TERMAL_KAYIP", title: "KALSİYUM-KARBONAT KAYNAKLI LİF PARÇALANMASI", status: "KRİTİK", icon: <Thermometer size={16} /> },
      { id: "RPT-4409-BER", vector: "MOLEKÜLER_NEKROZ", title: "KALINTI KİMYASAL OKSİDASYONU", status: "STABİL", icon: <Activity size={16} /> },
      { id: "RPT-1205-IST", vector: "OPEX_ARTISI", title: "SU ISITICI SİSTEMLERİNDE TERMODİNAMİK PARAZİTİZM", status: "İZLENİYOR", icon: <ShieldAlert size={16} /> },
      { id: "RPT-9921-LON", vector: "VARLIK_DEFORMASYONU", title: "YÜKSEK BASINÇLI BUHARDA METALİK KOROZYON", status: "KRİTİK", icon: <Activity size={16} /> }
    ]
  },
  EN: {
    db_tag: "// GLOBAL_INTELLIGENCE_DATABASE",
    title: "Forensic Archive",
    filter_placeholder: "FILTER_BY_VECTOR_OR_ID...",
    table_id: "Report_ID",
    table_vector: "Vector_Classification",
    table_subject: "Subject_Analysis",
    table_action: "Action",
    open_file: "OPEN_FILE",
    footer_note: "Secure Access Protocol Active ● Total Records:",
    reports: [
      { id: "RPT-7702-ANT", vector: "THERMAL_LOSS", title: "CALCIUM-CARBONATE INDUCED FIBER SHEARING", status: "CRITICAL", icon: <Thermometer size={16} /> },
      { id: "RPT-4409-BER", vector: "MOLECULAR_NECROSIS", title: "RESIDUAL CHEMICAL OXIDATION", status: "STABLE", icon: <Activity size={16} /> },
      { id: "RPT-1205-IST", vector: "OPEX_SURGE", title: "THERMODYNAMIC PARASITISM IN KETTLE SYSTEMS", status: "MONITORING", icon: <ShieldAlert size={16} /> },
      { id: "RPT-9921-LON", vector: "ASSET_DECAY", title: "METALLIC CORROSION IN HIGH-PRESSURE STEAM", status: "CRITICAL", icon: <Activity size={16} /> }
    ]
  },
  DE: {
    db_tag: "// GLOBALE_INTELLIGENZ_DATENBANK",
    title: "Forensisches Archiv",
    filter_placeholder: "FILTERN_NACH_VEKTOR_ODER_ID...",
    table_id: "Bericht_ID",
    table_vector: "Vektor_Klassifizierung",
    table_subject: "Themen_Analyse",
    table_action: "Aktion",
    open_file: "DATEI_ÖFFNEN",
    footer_note: "Sicherer Zugriffsprotokoll Aktiv ● Datensätze Gesamt:",
    reports: [
      { id: "RPT-7702-ANT", vector: "THERMISCHER_VERLUST", title: "KALZIUMKARBONAT-INDUZIERTE FASERZERSTÖRUNG", status: "KRITISCH", icon: <Thermometer size={16} /> },
      { id: "RPT-4409-BER", vector: "MOLEKULARE_NEKROSE", title: "RÜCKSTÄNDIGE CHEMISCHE OXIDATION", status: "STABIL", icon: <Activity size={16} /> },
      { id: "RPT-1205-IST", vector: "OPEX_ANSTIEG", title: "THERMODYNAMISCHER PARASITISMUS IN WASSERKOCHERN", status: "ÜBERWACHUNG", icon: <ShieldAlert size={16} /> },
      { id: "RPT-9921-LON", vector: "ANLAGENZERFALL", title: "METALLKORROSION IN HOCHDRUCKDAMPF", status: "KRITISCH", icon: <Activity size={16} /> }
    ]
  }
};

export default function ArchiveIndex() {
  const [lang, setLang] = useState<"TR" | "EN" | "DE">("EN");
  const [searchTerm, setSearchTerm] = useState("");

  // Dil tercihini ana sayfadan çek
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) setLang(savedLang);
  }, []);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 md:p-20 font-mono">
      {/* BAŞLIK BÖLÜMÜ */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-3 text-[#00FF41] mb-4">
          <Database size={20} />
          <span className="text-xs tracking-[0.5em] font-bold uppercase italic">{t.db_tag}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">{t.title}</h1>
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* ARAMA ÇUBUĞU */}
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="text"
              placeholder={t.filter_placeholder}
              className="w-full bg-[#151922] border border-[#2A3241] p-4 pl-12 text-xs outline-none focus:border-[#00FF41] transition-colors uppercase"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* AKTİF DİL GÖSTERGESİ */}
          <div className="flex items-center gap-2 text-[10px] text-gray-500 border border-[#2A3241] px-3 py-2">
            <Globe size={12} />
            <span>ACTIVE_LANGUAGE: {lang}</span>
          </div>
        </div>
      </div>

      {/* VERİTABANI LİSTESİ */}
      <div className="max-w-6xl mx-auto border border-[#2A3241] bg-[#151922]/30">
        <div className="grid grid-cols-4 p-4 border-b border-[#2A3241] text-[10px] text-gray-600 uppercase font-bold tracking-widest hidden md:grid italic">
          <span>{t.table_id}</span>
          <span>{t.table_vector}</span>
          <span>{t.table_subject}</span>
          <span className="text-right">{t.table_action}</span>
        </div>

        {t.reports.filter(r => 
          r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          r.id.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((rpt, idx) => (
          <Link 
            key={idx} 
            href={`/archive/${rpt.id.toLowerCase()}`}
            className="grid grid-cols-1 md:grid-cols-4 p-6 border-b border-[#2A3241] items-center hover:bg-[#00FF41]/5 transition-all group"
          >
            <span className="text-[#00FF41] text-xs font-bold mb-2 md:mb-0 italic uppercase">{rpt.id}</span>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 md:mb-0">
              {rpt.icon}
              <span className="uppercase">{rpt.vector}</span>
            </div>
            <span className="text-white text-xs font-bold uppercase tracking-tight mb-4 md:mb-0 italic">{rpt.title}</span>
            <div className="flex justify-end">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 group-hover:text-white transition-colors italic font-bold">
                {t.open_file} <ArrowRight size={14} className="text-[#00FF41]" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER NOTU */}
      <div className="max-w-6xl mx-auto mt-12 text-[8px] text-gray-700 uppercase tracking-[0.3em] italic font-bold">
        {t.footer_note} {t.reports.length} ● Location: Berlin_Central_Server
      </div>
    </div>
  );
}