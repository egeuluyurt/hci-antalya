"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WhyAudit from "@/components/WhyAudit";
import Calculator from "@/components/Calculator";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope";

export default function Home() {
  const [activeLang, setActiveLang] = useState("EN");

  // Global dil takibi: Footer ve Header'daki statik metinler için
  useEffect(() => {
    const checkLang = () => {
      const savedLang = localStorage.getItem("language") || "EN";
      if (savedLang !== activeLang) setActiveLang(savedLang);
    };
    const interval = setInterval(checkLang, 100);
    return () => clearInterval(interval);
  }, [activeLang]);

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden">

      {/* ÜST MENÜ (HEADER) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/80 backdrop-blur-md font-mono text-[10px] md:text-xs text-[#00FF41]">
        <span>HCI_SYSTEM_V2.5</span>
        <span className="animate-pulse hidden md:inline">● SYSTEM_STATUS: ONLINE</span>
        <span>LOC: {activeLang === "TR" ? "BERLIN_MERKEZ" : "BERLIN_GLOBAL"}</span>
      </header>

      {/* İÇERİK AKIŞI */}
      <Hero />

      {/* İkna Edici Bölüm */}
      <WhyAudit />

      {/* Teknik Analiz */}
      <ExplodedView />

      {/* Denetim Detayları */}
      <AuditScope />

      {/* Hesap Makinesi */}
      <div id="audit-engine">
        <Calculator />
      </div>

      {/* ALT BİLGİ (FOOTER) */}
      <footer className="py-12 px-6 border-t border-[#2A3241] bg-black font-mono text-[10px] md:text-xs text-gray-500">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-white mb-4 italic tracking-widest">HCI_BERLIN_LABS</h4>
            <p>Torstraße 177, 10115 Berlin</p>
            <p>
              {activeLang === "TR" ? "Bölge: EMEA & Global Merkez" :
                activeLang === "DE" ? "Region: EMEA & Globales Hub" :
                  "Region: EMEA & Global Hub"}
            </p>
          </div>
          <div className="md:text-right">
            <p className="mb-2">
              {activeLang === "TR" ? "İLETİŞİM_PROTOKOLÜ:" : "CONTACT_PROTOCOL:"}
            </p>
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