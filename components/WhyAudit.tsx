"use client";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Binary } from "lucide-react";

export default function WhyAudit() {
  const reasons = [
    {
      icon: <ShieldCheck className="text-[#00FF41]" size={32} />,
      title: "MATERIAL INTEGRITY",
      desc: "We test the molecular structure of products in our Berlin laboratories. We identify not just the 'good' products, but the most durable ones for 5-star operations."
    },
    {
      icon: <BarChart3 className="text-[#00FF41]" size={32} />,
      title: "COST RECOVERY",
      desc: "We recover hidden procurement leaks by up to 35%. Our audits don't just provide data; they directly enhance your bottom-line profitability."
    },
    {
      icon: <Binary className="text-[#00FF41]" size={32} />,
      title: "AI FORECASTING",
      desc: "We simulate raw material and logistics cost fluctuations for the next 24 months using AI algorithms to safeguard your future budgets."
    }
  ];

  return (
    <section className="py-24 bg-[#0B0E14] border-b border-[#2A3241]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            WHY <span className="text-[#00FF41]">HCI</span> AUDIT?
          </h2>
          <div className="h-1 w-20 bg-[#00FF41] mx-auto"></div>
          <p className="text-gray-500 mt-6 font-mono text-xs uppercase tracking-[0.3em]">
            Scientific approach to hospitality procurement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 bg-[#151922] border border-[#2A3241] hover:border-[#00FF41]/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 text-[#00FF41]/5 font-mono text-6xl font-black group-hover:text-[#00FF41]/10 transition-colors">
                0{index + 1}
              </div>

              <div className="mb-6 relative z-10">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-4 relative z-10 tracking-tight">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10 font-sans italic">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
