// 1. ADIM: Oyuncuları Çağırıyoruz (Import Kısmı)
import Hero from "@/components/Hero";
import WhyAudit from "@/components/WhyAudit"; // <--- YENİ: İkna edici bölüm buraya eklendi
import Calculator from "@/components/Calculator";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope";

export default function Home() {
  return (
    // 2. ADIM: Sitenin Ana Kutusu
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden">

      {/* ÜST MENÜ (HEADER) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/80 backdrop-blur-md font-mono text-xs text-[#00FF41]">
        <span>HCI_SYSTEM_V2.0</span>
        <span className="animate-pulse">● SYSTEM_STATUS: ONLINE</span>
        <span>LOC: BERLIN_GLOBAL</span>
      </header>

      {/* 3. ADIM: Sahne Sıralaması */}

      <Hero />           {/* 1. Sırada: Giriş Animasyonu */}

      <WhyAudit />       {/* 2. SIRADA: NEDEN BİZ? (Burcu'nun istediği ikna edici kısım) */}

      <ExplodedView />   {/* 3. Sırada: Yeşil Lazerli Teknik Görünüm */}

      <AuditScope />     {/* 4. Sırada: Veri Terminali */}

      <div id="audit-engine">
        <Calculator />   {/* 5. Sırada: Hesap Makinesi */}
      </div>

      {/* ALT BİLGİ (FOOTER) */}
      <footer className="py-12 px-6 border-t border-[#2A3241] bg-black font-mono text-xs text-gray-500">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-white mb-4">HCI_BERLIN_LABS</h4>
            <p>Torstraße 177, 10115 Berlin</p>
            <p>Region: EMEA & Global Hub</p>
          </div>
          <div className="text-right">
            <p className="mb-2">CONTACT_PROTOCOL:</p>
            <a href="mailto:audit@hci-berlin.com" className="text-[#00FF41] hover:underline">audit@hci-berlin.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}