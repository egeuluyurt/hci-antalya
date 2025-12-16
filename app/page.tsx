"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import WhyAudit from "@/components/WhyAudit";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope";
import IntelligenceArchive from "@/components/IntelligenceArchive";

export default function Home() {
  const [activeLang, setActiveLang] = useState("EN");

  useEffect(() => {
    const checkLang = () => {
      const savedLang = localStorage.getItem("language") || "EN";
      if (savedLang !== activeLang) setActiveLang(savedLang);
    };
    const interval = setInterval(checkLang, 100);
    return () => clearInterval(interval);
  }, [activeLang]);

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden font-sans">

      {/* ÜST MENÜ (HEADER) */}
      <header className="fixed top-0 left-0 w-full z-[60] flex justify-between px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/80 backdrop-blur-md font-mono text-[10px] md:text-xs text-[#00FF41]">
        <div className="flex items-center gap-4">
          <span>HCI_SYSTEM_V2.5</span>

          {/* ARŞİV LİNKİ */}
          <Link
            href="/archive"
            className="border-l border-[#2A3241] pl-4 text-white hover:text-[#00FF41] transition-colors cursor-pointer"
          >
            {activeLang === "TR" ? "[ ARŞİV ]" : activeLang === "DE" ? "[ ARCHIV ]" : "[ ARCHIVE ]"}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <span className="animate-pulse hidden md:inline">● SYSTEM_STATUS: ONLINE</span>
          <span>LOC: {activeLang === "TR" ? "BERLIN_MERKEZ" : "BERLIN_GLOBAL"}</span>
        </div>
      </header>

      {/* İÇERİK AKIŞI */}
      <Hero />

      <WhyAudit />

      <ExplodedView />

      <AuditScope />

      {/* Veri tabanından gelen 3'lü kutu */}
      <IntelligenceArchive />

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