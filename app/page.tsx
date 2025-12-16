// 1. ADIM: Oyuncuları Çağırıyoruz (Import Kısmı)
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import ExplodedView from "@/components/ExplodedView";
import AuditScope from "@/components/AuditScope"; // <--- BAK BURASI YENİ GELDİ (Eski ProductModules gitti)

export default function Home() {
  return (
    // 2. ADIM: Sitenin Ana Kutusu (Arka plan siyah, yazılar beyaz)
    <main className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden">
      
      {/* ÜST MENÜ (HEADER) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/80 backdrop-blur-md font-mono text-xs text-[#00FF41]">
          <span>HCI_SYSTEM_V1.0</span>
          <span className="animate-pulse">● SYSTEM_STATUS: ONLINE</span>
          <span>LOC: GLOBAL_OPERATIONS</span> 
      </header>

      {/* 3. ADIM: Sahne Sıralaması */}
      
      <Hero />           {/* 1. Sırada: Giriş Animasyonu */}
      
      <ExplodedView />   {/* 2. Sırada: Yeşil Lazerli Terlik */}
      
      <AuditScope />     {/* 3. SIRADA: YENİ VERİ TERMİNALİ (Eski katalog kalktı, bu geldi) */}
      
      <Calculator />     {/* 4. Sırada: Hesap Makinesi */}
      
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