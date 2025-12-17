"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyAudit from "@/components/WhyAudit";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope";
import IntelligenceArchive from "@/components/IntelligenceArchive";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden font-sans pt-20">

      {/* 1. YENİ HEADER Component'ini ekledik */}
      <Header />

      {/* --- SAYFA İÇERİĞİ --- */}
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