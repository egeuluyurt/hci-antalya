export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#0B0E14] py-20 px-4 flex justify-center items-start">
      
      {/* A4 KAĞIT GÖRÜNÜMÜ */}
      <div className="bg-white text-black w-full max-w-[800px] min-h-[1000px] p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
        
        {/* Rapor Header */}
        <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
          <div>
            {/* BAŞLIK DEĞİŞTİ: Artık Sektör Analizi */}
            <h1 className="text-4xl font-bold tracking-tighter">INDUSTRY FAILURE ANALYSIS</h1>
            <p className="font-mono text-xs text-gray-500 mt-1">MATERIAL SCIENCE DIVISION / BERLIN LABS</p>
          </div>
          <div className="text-right font-mono text-xs">
            <p>DOC_ID: #REF-2025-EU</p>
            <p>DATE: 2025-12-16</p>
            {/* STATÜ DEĞİŞTİ: Genel Veri */}
            <p className="text-red-600 font-bold">DATA: REGIONAL_AGGREGATE</p>
          </div>
        </div>

        {/* 01. Executive Summary */}
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-2 border-l-4 border-black pl-3">01. SECTOR-WIDE DIAGNOSIS</h2>
          <p className="text-sm leading-relaxed text-gray-700 text-justify">
            {/* METİN DEĞİŞTİ: Kişisel değil, genel analiz */}
            This document outlines the <span className="font-bold">chronic material deficiencies</span> observed in 85% of standard hospitality procurement assets across the Mediterranean region. 
            Unless explicitly engineered, "Market Standard" supplies typically exhibit the following structural failures, resulting in avoidable OpEx leakage.
          </p>
        </div>

        {/* 02. Technical Specs Table */}
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-4 border-l-4 border-black pl-3">02. MARKET STANDARD vs. HCI BENCHMARK</h2>
          
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 font-mono text-xs uppercase">
              <tr>
                <th className="p-3 border border-gray-300">Asset Category</th>
                {/* SÜTUN DEĞİŞTİ: Senin malın değil, Yaygın Mal */}
                <th className="p-3 border border-gray-300 text-red-600">Common Market Standard (The Risk)</th>
                <th className="p-3 border border-gray-300 font-bold text-green-700">HCI Optimization Target</th>
                <th className="p-3 border border-gray-300 bg-green-50 text-green-900 font-bold">Projected Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              
              {/* SATIR 1: POLYMERS */}
              <tr>
                <td className="p-3 border border-gray-300 font-bold">
                  Polymer Substrates
                  <span className="block text-[10px] text-gray-500 font-normal">(Footwear / Wet Areas)</span>
                </td>
                <td className="p-3 border border-gray-300 text-gray-500">
                  Open-Cell Sponge
                  <span className="block text-[10px] text-red-500">High Water Absorption (Soggy)</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold">
                  Closed-Cell Hydrophobic
                  <span className="block text-[10px] text-green-600">DIN-51097 Anti-Slip Class B</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold text-green-700">Mitigate Slip/Fall Liability</td>
              </tr>

              {/* SATIR 2: FIBERS */}
              <tr>
                <td className="p-3 border border-gray-300 font-bold">
                  Fiber Architecture
                  <span className="block text-[10px] text-gray-500 font-normal">(Linens / Towels)</span>
                </td>
                <td className="p-3 border border-gray-300 text-gray-500">
                  Standard Cotton Loop
                  <span className="block text-[10px] text-red-500">High Lint Loss (&gt;15% per 50 wash)</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold">
                  Reinforced Micro-Matrix
                  <span className="block text-[10px] text-green-600">Low Lint Loss (&lt;3% per 50 wash)</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold text-green-700">Extend Asset Lifecycle +30%</td>
              </tr>

              {/* SATIR 3: COMPOUNDS */}
              <tr>
                <td className="p-3 border border-gray-300 font-bold">
                  Chemical Safety
                  <span className="block text-[10px] text-gray-500 font-normal">(Amenities)</span>
                </td>
                <td className="p-3 border border-gray-300 text-gray-500">
                  Generic Bulk Fill
                  <span className="block text-[10px] text-red-500">Non-EU Compliant Preservatives</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold">
                  EU REACH Certified
                  <span className="block text-[10px] text-green-600">Hypoallergenic & Paraben Free</span>
                </td>
                <td className="p-3 border border-gray-300 font-bold text-green-700">100% Audit Compliance</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 03. Financial Projection */}
        <div className="mt-8 mb-8">
           <h2 className="font-bold text-lg mb-4 border-l-4 border-black pl-3">03. BUDGET OPTIMIZATION MODEL</h2>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 border border-gray-200">
                 <h4 className="font-mono text-xs text-gray-500 mb-1">IF YOU USE MARKET STANDARDS</h4>
                 <p className="text-xl font-bold text-red-600">High Volatility</p>
                 <p className="text-[10px] text-gray-500 mt-2">Subject to inflation and rapid wear cycles.</p>
              </div>
              <div className="bg-[#00FF41]/10 p-4 border border-[#00FF41]/50">
                 <h4 className="font-mono text-xs text-green-800 mb-1">WITH HCI PROTOCOLS</h4>
                 <p className="text-xl font-bold text-green-700">Consolidated</p>
                 <p className="text-[10px] text-green-800 mt-2">Predicted stabilization of procurement frequency.</p>
              </div>
           </div>
        </div>

        {/* Conclusion Box */}
        <div className="mt-8 p-6 bg-gray-100 border-l-4 border-red-600">
           <h3 className="font-mono text-xs font-bold mb-2 text-red-600">AUDIT CONCLUSION:</h3>
           <p className="text-sm font-bold text-gray-800">
             If your current inventory matches the "Common Market Standard" outlined above, your operation is likely exposed to <span className="text-red-600">invisible liquidity leakage</span>. 
             We recommend a physical on-site audit to confirm specific variance levels.
           </p>
        </div>

        {/* Footer / Signature */}
        <div className="mt-20 pt-8 border-t border-gray-300 flex justify-between font-mono text-[10px] text-gray-400">
           <div>
             <p>APPROVED BY: DR. H. SCHMIDT</p>
             <p>HEAD OF AUDIT OPERATIONS</p>
           </div>
           <div className="text-right">
             <p>HCI BERLIN © 2025</p>
             <p>REFERENCE DOCUMENT #REF-2025</p>
           </div>
        </div>

        {/* Damga Efekti - Artık "TOP SECRET" değil, "REFERENCE" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[6px] border-gray-300 text-gray-300 text-7xl font-black opacity-20 rotate-[-15deg] p-4 pointer-events-none select-none">
          REFERENCE
        </div>

      </div>
    </div>
  );
}