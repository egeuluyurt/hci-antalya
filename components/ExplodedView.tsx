"use client";
import { useState, useEffect } from "react"; // State ve Effect eklendi
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- SOYUT GÖRSELLEŞTİRME BİLEŞENLERİ ---

// 1. Fiber (Tekstil) Görselleştirmesi
const FiberViz = () => {
  const grid = Array(100).fill(0);
  return (
    <div className="w-full h-full relative bg-[#0B0E14] border border-[#00FF41]/30 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1),transparent_70%)]" />
      <h4 className="font-mono text-[#00FF41] text-xs mb-4">// TENSILE_STRENGTH_SIMULATION</h4>
      <div className="grid grid-cols-10 gap-1 h-[80%]">
        {grid.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.1, 0.5],
              backgroundColor: i % 7 === 0 ? "#00FF41" : "#151922"
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1
            }}
            className="rounded-sm border border-[#00FF41]/20"
          />
        ))}
      </div>
      <motion.div
        className="absolute w-full h-[2px] bg-[#00FF41] shadow-[0_0_20px_#00FF41] opacity-50 z-20 top-0 left-0"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      />
    </div>
  );
};

// 2. Kimyasal (Compound) Görselleştirmesi - İSİM DÜZELTİLDİ
const CompoundViz = () => {
  const metrics = [
    { label: "MOLECULAR_STABILITY", value: "99.9%", target: 99 },
    { label: "TOXIC_RESIDUE", value: "NONE", target: 100 },
    { label: "PH_BALANCE", value: "5.5", target: 55 },
  ];

  return (
    <div className="w-full h-full relative bg-[#0B0E14] border border-[#00FF41]/30 p-8 flex flex-col justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
      <h4 className="font-mono text-[#00FF41] text-xs mb-8 relative z-10">// CHEMICAL_COMPOSITION_LAB</h4>

      <div className="space-y-8 relative z-10">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between font-mono text-xs text-gray-400 mb-2">
              <span>{m.label}</span>
              <span className="text-[#00FF41]">{m.value}</span>
            </div>
            <div className="h-2 bg-[#151922] overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.target}%` }}
                transition={{ duration: 1.5, delay: 0.2 * i, ease: "easeOut" }}
                className="h-full bg-[#00FF41] relative"
              >
                <div className="absolute right-0 top-0 h-full w-[2px] bg-white animate-pulse" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ExplodedView() {
  const [activeTab, setActiveTab] = useState<"polymers" | "fibers" | "compounds">("polymers");
  const [lang, setLang] = useState("EN");

  // Dili Hafızadan Dinle (Senin Sistemle Uyumlu)
  useEffect(() => {
    const checkLang = () => {
      const savedLang = localStorage.getItem("language") || "EN";
      if (savedLang !== lang) setLang(savedLang);
    };
    const interval = setInterval(checkLang, 100);
    return () => clearInterval(interval);
  }, [lang]);

  const modules = {
    polymers: {
      id: "01",
      label: "POLYMER_PHYSICS",
      title: lang === "TR" ? "KİNETİK YÜK SÖNÜMLEME" : lang === "DE" ? "KINETISCHE LASTDÄMPFUNG" : "KINETIC LOAD DAMPING",
      desc: lang === "TR" ? "Dikey stres altında viskoelastik reaksiyon analizi. Ayakkabı, yatak ve ergonomik mobilyalarda malzeme yorgunluğunu önlemek için kinetik enerji dağılımını ölçüyoruz." : "Analyzing viscoelastic reaction under vertical stress. We measure kinetic energy dissipation to prevent material fatigue in footwear, mattresses, and ergonomic furniture.",
      spec: lang === "TR" ? "YOĞUNLUK_KALİBRASYONU" : "DENSITY_CALIBRATION",
      specDesc: lang === "TR" ? "Moleküler yoğunluk doğrulaması. Düşük yoğunluk, insan ağırlığı altında hızlı deformasyona yol açar." : "Verifying molecular density. Sub-optimal density leads to rapid deformation in guest-facing assets under human weight loads.",
      type: "image",
      image: "/images/polymer-stress-test.png",
      fig: "FIG 1.0 // STRUCTURAL_LOAD_FEED"
    },
    fibers: {
      id: "02",
      label: "FIBER_ARCH",
      title: lang === "TR" ? "GERİLME DİRENCİ MATRİSİ" : lang === "DE" ? "ZUGFESTIGKEITSMATRIX" : "TENSILE STRENGTH MATRIX",
      desc: lang === "TR" ? "Aşınma direnci ve lif bütünlüğü ölçümü. Endüstriyel yıkamaya maruz kalan üniforma ve çarşaf gibi ürünlerin ömrünü uzatmak için kritiktir." : "Measuring abrasion resistance and fiber integrity. Critical for extending the lifecycle of high-stress items like staff uniforms and industrial-wash linens.",
      spec: lang === "TR" ? "NEFES_ALABİLİRLİK_ENDEKSİ" : "BREATHABILITY_INDEX",
      specDesc: lang === "TR" ? "Konforu maksimize etmek için doku üzerinden termodinamik hava akışını hesaplıyoruz." : "Calculating thermodynamic airflow through the weave to maximize comfort in guest textiles and staff apparel.",
      type: "viz_fiber",
      fig: "FIG 2.1 // WEAVE_SCAN"
    },
    compounds: {
      id: "03",
      label: "BIO_COMPOUNDS",
      title: lang === "TR" ? "MOLEKÜLER GÜVENLİK" : lang === "DE" ? "MOLEKULARE SICHERHEIT" : "MOLECULAR SAFETY",
      desc: lang === "TR" ? "Tehlikeli bileşenler için spektroskopik tarama. Kozmetik ve temizlik kimyasallarında tam dermatolojik güvenlik sağlıyoruz." : "Spectroscopic screening for hazardous volatile organic compounds (VOCs). Ensuring absolute dermatological safety in cosmetics and housekeeping chemicals.",
      spec: lang === "TR" ? "BOZUNMA_ORANI" : "DECOMPOSITION_RATE",
      specDesc: lang === "TR" ? "Tek kullanımlık ürünlerin biyobozunur timeline'ını doğrulayarak Global Green Star protokollerine uyum sağlıyoruz." : "Verifying the biodegradation timeline of all single-use amenities to ensure compliance with Global Green Star protocols.",
      type: "viz_compound",
      fig: "FIG 3.4 // CHEM_DATA"
    }
  };

  const data = (modules as any)[activeTab];

  return (
    <section className="min-h-screen border-y border-[#2A3241] bg-[#0B0E14] grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative text-white">

      {/* SOL TARAF: KONTROL PANELİ */}
      <div className="p-12 lg:p-24 flex flex-col justify-center relative z-20">

        <div className="flex gap-4 mb-12 border-b border-[#2A3241] pb-4 flex-wrap">
          {(Object.keys(modules) as Array<keyof typeof modules>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`font-mono text-xs tracking-widest px-4 py-2 border transition-all duration-300 ${activeTab === key
                  ? "border-[#00FF41] text-[#00FF41] bg-[#00FF41]/10"
                  : "border-transparent text-gray-600 hover:text-white"
                }`}
            >
              {modules[key].label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab + lang}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[#00FF41] text-xs mb-4 block">
            // LAB_MODULE_{data.id}
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter text-white uppercase">
            {data.title}
          </h2>
          <div className="space-y-10">
            <div className="group">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-xs text-gray-500">PARAM_A</span>
                <h3 className="font-mono text-lg text-white group-hover:text-[#00FF41] transition-colors uppercase">
                  {lang === "TR" ? "ANALİZ_KAPSAMI" : "SCOPE_OF_ANALYSIS"}
                </h3>
              </div>
              <p className="text-sm text-gray-400 pl-8 border-l border-gray-800 ml-2 leading-relaxed">
                {data.desc}
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-xs text-gray-500">PARAM_B</span>
                <h3 className="font-mono text-lg text-white group-hover:text-[#00FF41] transition-colors uppercase">
                  {data.spec}
                </h3>
              </div>
              <p className="text-sm text-gray-400 pl-8 border-l border-gray-800 ml-2 leading-relaxed">
                {data.specDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SAĞ TARAF: GÖRSEL ALANI */}
      <div className="relative flex items-center justify-center bg-black min-h-[500px] overflow-hidden p-8 lg:p-16">
        <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
          <Image
            src="/images/tech-bg.jpg"
            alt="Tech Background"
            fill
            className="object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 w-full h-full max-w-[600px] max-h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              {/* GÖRSEL TİPİNE GÖRE İÇERİK SEÇİMİ */}

              {data.type === 'image' && (
                <div className="relative w-full h-full mix-blend-screen">
                  <Image src={data.image} alt="Structure Analysis" fill className="object-contain" />
                  <motion.div
                    className="absolute w-full h-[2px] bg-[#00FF41] shadow-[0_0_20px_#00FF41] opacity-50 z-20 top-0 left-0"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  />
                </div>
              )}

              {data.type === 'viz_fiber' && <FiberViz />}

              {data.type === 'viz_compound' && <CompoundViz />}

            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#00FF41] border border-[#00FF41]/30 px-4 py-2 bg-black/50 backdrop-blur-md z-30 uppercase tracking-widest">
          {data.fig}
        </div>
      </div>
    </section>
  );
}