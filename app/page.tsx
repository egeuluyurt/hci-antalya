"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe } from "lucide-react"; // İkon için
import Hero from "@/components/Hero";
import WhyAudit from "@/components/WhyAudit";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope";
import IntelligenceArchive from "@/components/IntelligenceArchive";

export default function Home() {
  const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");
  const [isMounted, setIsMounted] = useState(false);

  // 1. Sayfa yüklenince hafızadaki dili oku
  useEffect(() => {
    setIsMounted(true); // Hidrasyon hatasını önlemek için
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) {
      setActiveLang(savedLang);
    }
  }, []);

  // 2. Dil Değiştirme Fonksiyonu (Sayfayı yeniler)
  const switchLanguage = (lang: "TR" | "EN" | "DE") => {
    localStorage.setItem("language", lang);
    window.location.reload(); // En temiz yöntem: Sayfayı yenile ki her parça yeni dili duysun
  };

  // Çeviriler (Sadece Header için)
  const headerTexts = {
    TR: { loc: "BERLİN_MERKEZ", status: "SİSTEM_AKTİF", archive: "[ ARŞİV ]" },
    EN: { loc: "BERLIN_HQ", status: "SYSTEM_ONLINE", archive: "[ ARCHIVE ]" },
    DE: { loc: "BERLIN_ZENTRALE", status: "SYSTEM_BEREIT", archive: "[ ARCHIV ]" }
  };

  const t = headerTexts[activeLang];

  if (!isMounted) return null; // Sayfa yüklenmeden yanlış içerik gösterme

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden font-sans">

      {/* --- SABİT ANA HEADER (DİL SEÇİCİLİ) --- */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/90 backdrop-blur-md font-mono text-[10px] md:text-xs">
        
        {/* SOL: LOGO VE ARŞİV */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <span className="text-[#00FF41] font-bold tracking-widest">HCI_SYSTEM_V2.5</span>
          
          <Link 
            href="/archive" 
            target="_blank" 
            className="border-l border-[#2A3241] pl-6 text-white hover:text-[#00FF41] transition-colors cursor-pointer font-bold tracking-widest"
          >
            {t.archive}
          </Link>
        </div>

        {/* SAĞ: DİL SEÇİCİ VE DURUM */}
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          
          {/* DİL BUTONLARI */}
          <div className="flex items-center gap-2 bg-black border border-[#2A3241] px-3 py-1 rounded-full">
            <Globe size={12} className="text-gray-500" />
            {(["EN", "DE", "TR"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`px-2 py-0.5 transition-all rounded ${
                  activeLang === lang 
                    ? "bg-[#00FF41] text-black font-bold" 
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-gray-500">
             <span className="animate-pulse text-[#00FF41]">● {t.status}</span>
             <span>LOC: {t.loc}</span>
          </div>
        </div>
      </header>

      {/* --- İÇERİK BİLEŞENLERİ --- */}
      {/* Hero artık kendi navbarını göstermeyecek çünkü yukarıdaki fixed header işi devraldı */}
      <Hero />
      <WhyAudit />
      <ExplodedView />
      <AuditScope />
      <IntelligenceArchive /> 

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-[#2A3241] bg-black font-mono text-[10px] md:text-xs text-gray-500">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-white mb-4 italic tracking-widest">HCI_BERLIN_LABS</h4>
            <p>Torstraße 177, 10115 Berlin</p>
          </div>
          <div className="md:text-right">
            <p className="mb-2">SECURE_CHANNEL:</p>
            <a href="mailto:audit@hci-berlin.com" className="text-[#00FF41] hover:underline tracking-tighter">
              audit@hci-berlin.com
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-white/5 text-center opacity-30 uppercase">
          © 2025 HCI Berlin Audit Laboratory - Secure Access Protocol
        </div>
      </footer>
    </main>
  );
}