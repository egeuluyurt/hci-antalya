// lib/data.ts

export const reports = [
    {
        id: "rpt-7702-ant",
        vector: "THERMAL_LOSS",
        status: "CRITICAL",
        date: "2025-06-15",
        location: "ANTALYA_SAHA_LAB",
        title: "CALCIUM-CARBONATE INDUCED FIBER SHEARING",
        loss: "$118,400",
        content: {
            TR: {
                title: "KALSİYUM-KARBONAT KAYNAKLI LİF PARÇALANMASI",
                summary: "Bölgedeki sert suyun (kireç) endüstriyel yıkama süreçlerinde pamuk lifleri üzerinde oluşturduğu mikroskobik kristalleşme, havlu ömrünü %40 azaltmaktadır.",
                fullContent: `
          <h3 class="text-[#00FF41] font-mono text-sm tracking-widest mb-4 mt-8">// 01. MİKROSKOBİK ANALİZ</h3>
          <p class="mb-6 leading-relaxed text-gray-300">
            Antalya bölgesindeki 14 tesisten alınan numunelerde, liflerin iç yapısında kalsiyum birikintileri tespit edildi. Bu birikintiler, kurutma sırasında 'bıçak etkisi' yaratarak lifleri içeriden kesiyor.
          </p>
          <div class="text-center border-t border-b border-[#00FF41]/30 py-6 mb-8">
            <span class="block text-gray-500 text-xs tracking-[0.5em] mb-2">YILLIK TAHMİNİ KAYIP</span>
            <span class="text-5xl md:text-6xl font-black text-[#00FF41] tracking-tighter">$118,400</span>
          </div>
        `
            },
            EN: {
                title: "CALCIUM-CARBONATE INDUCED FIBER SHEARING",
                summary: "Microscopic crystallization caused by hard water during industrial washing cycles reduces towel lifespan by 40%.",
                fullContent: `
           <h3 class="text-[#00FF41] font-mono text-sm tracking-widest mb-4 mt-8">// 01. MICROSCOPIC ANALYSIS</h3>
           <p class="mb-6 leading-relaxed text-gray-300">
             Calcium deposits have been detected within the internal structure of fibers in samples from 14 facilities. These deposits create a 'knife effect' during drying, shearing the fibers from the inside.
           </p>
           <div class="text-center border-t border-b border-[#00FF41]/30 py-6 mb-8">
            <span class="block text-gray-500 text-xs tracking-[0.5em] mb-2">ESTIMATED ANNUAL LOSS</span>
            <span class="text-5xl md:text-6xl font-black text-[#00FF41] tracking-tighter">$118,400</span>
          </div>
        `
            },
            DE: {
                title: "KALZIUMKARBONAT-INDUZIERTE FASERZERSTÖRUNG",
                summary: "Mikroskopische Kristallisation durch hartes Wasser verkürzt die Lebensdauer von Handtüchern um 40%.",
                fullContent: `<p class="text-gray-300">Deutsche Übersetzung wird geladen...</p>`
            }
        }
    },
    {
        id: "rpt-4409-ber",
        vector: "MOLECULAR_NECROSIS",
        status: "STABLE",
        date: "2024-11-20",
        location: "BERLIN_CENTRAL",
        title: "RESIDUAL CHEMICAL OXIDATION",
        loss: "$42,200",
        content: {
            TR: {
                title: "KALINTI KİMYASAL OKSİDASYONU",
                summary: "Çarşaf yüzeylerinde kalan deterjan artıkları, insan teriyle reaksiyona girerek 'sarı leke' oluşumunu hızlandırıyor.",
                fullContent: `<p class="text-gray-300">Detaylı kimyasal analiz verileri...</p>`
            },
            EN: {
                title: "RESIDUAL CHEMICAL OXIDATION",
                summary: "Detergent residues on sheet surfaces react with human sweat, accelerating 'yellow stain' formation.",
                fullContent: `<p class="text-gray-300">Detailed chemical analysis data...</p>`
            },
            DE: {
                title: "RÜCKSTÄNDIGE CHEMISCHE OXIDATION",
                summary: "Waschmittelrückstände reagieren mit menschlichem Schweiß und beschleunigen die Bildung gelber Flecken.",
                fullContent: `<p class="text-gray-300">Inhalt...</p>`
            }
        }
    },
    {
        id: "rpt-1205-ist",
        vector: "OPEX_SURGE",
        status: "MONITORING",
        date: "2024-10-05",
        location: "ISTANBUL_UNIT",
        title: "THERMODYNAMIC PARASITISM IN KETTLE SYSTEMS",
        loss: "$15,800",
        content: {
            TR: {
                title: "SU ISITICI SİSTEMLERİNDE TERMODİNAMİK PARAZİTİZM",
                summary: "Oda içi kettle rezistanslarındaki kireçlenme, suyu kaynatma süresini %30 uzatarak enerji faturasını şişiriyor.",
                fullContent: `<p class="text-gray-300">Enerji verimlilik raporu...</p>`
            },
            EN: {
                title: "THERMODYNAMIC PARASITISM IN KETTLE SYSTEMS",
                summary: "Limescale on in-room kettle heating elements extends boiling time by 30%, inflating energy bills.",
                fullContent: `<p class="text-gray-300">Energy efficiency report...</p>`
            },
            DE: {
                title: "THERMODYNAMISCHER PARASITISMUS",
                summary: "Kalkablagerungen verlängern die Kochzeit um 30% und erhöhen die Energiekosten.",
                fullContent: `<p class="text-gray-300">Inhalt...</p>`
            }
        }
    },
    {
        id: "ant-2025-09",
        vector: "REVENUE_NECROSIS",
        status: "CRITICAL",
        date: "2025-06-15",
        location: "ANTALYA_PILOT",
        title: "THE $900,000 SENSORY EROSION",
        loss: "$900,000",
        content: {
            TR: {
                title: "THE $900,000 SENSORY EROSION & REVENUE NECROSIS",
                summary: "Antalya 5 Yıldız segmentinde yapılan denetimler, yıllık 900.000 USD tutarında gizli kayba yol açıyor.",
                fullContent: `
          <h3 class="text-[#00FF41] font-mono text-sm tracking-widest mb-4 mt-8">// 01. EXECUTIVE SUMMARY</h3>
          <p class="mb-6 leading-relaxed text-gray-300">
            Otellerin operasyonel döngülerindeki bir mühendislik hatası yüzünden yıllık <span class="text-[#00FF41] font-bold text-lg">$900,000</span> tutarında bir özkaynak erimesi yaşanıyor.
          </p>
          <div class="bg-[#151922] p-4 border-l-2 border-red-500 mb-6">
              <strong class="text-white block mb-1">Cationic Saponification Failure:</strong>
              Sabun ve kalsiyum birleşerek çözünmeyen bir film tabakası oluşturur.
          </div>
        `
            },
            EN: {
                title: "THE $900,000 SENSORY EROSION",
                summary: "Hidden asset retention loss of $900,000 annually due to water chemistry mismatch.",
                fullContent: `<p class="text-gray-300">Full English report content...</p>`
            },
            DE: {
                title: "DIE $900.000 SENSORISCHE EROSION",
                summary: "Versteckter Verlust von 900.000 $.",
                fullContent: `<p class="text-gray-300">Inhalt...</p>`
            }
        }
    }
];