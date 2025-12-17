"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TRANSLATIONS = {
  TR: {
    tag: "MALZEME & KALİTE KONTROLÜ",
    title: "SATIN ALDIĞINIZ ÜRÜNLERİN İÇİNİ GÖRÜYORUZ",
    param1_title: "NEDEN ÇABUK ÇÖKÜYOR?", // Eski: Param_A Analiz Kapsamı
    param1_desc: "Koltuk, yatak ve mobilyalarınızın sünger kalitesini ve çökme direncini ölçüyoruz. Tedarikçinin vaat ettiği yıl kadar dayanıp dayanmayacağını size baştan söylüyoruz.",
    param2_title: "GİZLİ KALİTE TESTİ", // Eski: Yoğunluk Kalibrasyonu
    param2_desc: "Tedarikçinin '1. Sınıf' dediği malzeme gerçekten öyle mi? İç dolgu malzemelerinin yoğunluğunu analiz edip, parasını ödediğiniz kaliteyi alıp almadığınızı raporluyoruz."
  },
  EN: {
    tag: "MATERIAL & QUALITY CONTROL",
    title: "WE SEE INSIDE THE PRODUCTS YOU BUY",
    param1_title: "WHY DOES IT SAG SO FAST?",
    param1_desc: "We measure the foam quality and sag resistance of your furniture. We tell you upfront if it will last as long as the supplier promised.",
    param2_title: "HIDDEN QUALITY CHECK",
    param2_desc: "Is the material strictly 'First Class' as claimed? We analyze the density of internal fillings to report if you are getting the quality you paid for."
  },
  DE: {
    tag: "MATERIAL- & QUALITÄTSKONTROLLE",
    title: "WIR SEHEN IN IHRE PRODUKTE HINEIN",
    param1_title: "WARUM GIBT ES SO SCHNELL NACH?",
    param1_desc: "Wir messen die Schaumstoffqualität und Einsinkbeständigkeit Ihrer Möbel. Wir sagen Ihnen im Voraus, ob sie so lange halten, wie versprochen.",
    param2_title: "VERSTECKTE QUALITÄTSPRÜFUNG",
    param2_desc: "Ist das Material wirklich 'Erste Klasse'? Wir analysieren die Dichte der Innenfüllungen und berichten, ob Sie die bezahlte Qualität erhalten."
  }
};

export default function ExplodedView() {
  const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
    if (savedLang) {
      setActiveLang(savedLang);
    }
  }, []);

  const t = TRANSLATIONS[activeLang];

  return (
    <section className="min-h-screen bg-[#0B0E14] flex items-center justify-center py-20 border-t border-[#2A3241] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* SOL TARAF: METİN ALANI */}
        <div>
          {/* TAB MENÜSÜ GÖRÜNÜMÜ */}
          <div className="flex gap-8 mb-12 border-b border-[#2A3241] pb-4">
            <span className="text-[#00FF41] text-xs font-mono tracking-widest border-b-2 border-[#00FF41] pb-4">
              [{t.tag}]
            </span>
            <span className="text-gray-600 text-xs font-mono tracking-widest hidden md:inline-block">
              SUPPLIER_AUDIT
            </span>
            <span className="text-gray-600 text-xs font-mono tracking-widest hidden md:inline-block">
              ASSET_LIFESPAN
            </span>
          </div>

          <div className="mb-12">
            <h2 className="text-[#00FF41] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">
              // BERLIN_LAB_ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              {t.title}
            </h3>
          </div>

          <div className="space-y-12">
            {/* PARAMETRE A - ANLAŞILIR DİL */}
            <div className="relative pl-6 border-l border-[#2A3241]">
              <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
                <span className="text-[10px] text-gray-500 font-mono">01</span>
                {t.param1_title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-mono">
                {t.param1_desc}
              </p>
            </div>

            {/* PARAMETRE B - ANLAŞILIR DİL */}
            <div className="relative pl-6 border-l border-[#2A3241]">
              <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
                <span className="text-[10px] text-gray-500 font-mono">02</span>
                {t.param2_title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-mono">
                {t.param2_desc}
              </p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: GÖRSEL ALANI */}
        <div className="relative group">
          {/* Arka plan efekti */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF41] to-blue-600 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

          <div className="relative bg-[#151922] border border-[#2A3241] p-2">
            {/* GÖRSEL DEĞİŞTİRME ALANI: Kendi görselini buraya koyabilirsin */}
            <div className="aspect-square relative overflow-hidden bg-black">
              {/* Buraya uygun bir 'wireframe' veya 'x-ray' görseli çok yakışır */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-xs text-center p-8 border border-dashed border-gray-800">
                [ 3D MATERIAL SCAN VISUALIZATION ]
                <br />
                <span className="text-[#00FF41] mt-2 block">LOADING_ASSET...</span>
              </div>

              {/* Görselin varsa aşağıdaki Image componentini aktif et: */}
              {/* <Image src="/path-to-your-image.jpg" alt="Analysis" fill className="object-cover opacity-80" /> */}
            </div>

            {/* GÖRSEL ÜZERİ DATA KATMANLARI */}
            <div className="absolute top-8 right-8 text-right">
              <div className="text-[10px] text-gray-500 font-mono mb-1">DENSITY SCAN</div>
              <div className="text-2xl font-bold text-white font-mono">98.4%</div>
            </div>

            <div className="absolute bottom-8 left-8">
              <div className="text-[10px] text-gray-500 font-mono mb-1">STRUCTURAL INTEGRITY</div>
              <div className="flex gap-1">
                <div className="w-8 h-1 bg-[#00FF41]"></div>
                <div className="w-8 h-1 bg-[#00FF41]"></div>
                <div className="w-8 h-1 bg-[#00FF41]"></div>
                <div className="w-8 h-1 bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}