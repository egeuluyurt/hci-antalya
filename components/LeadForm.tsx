"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle, Loader2, Send } from "lucide-react";

interface LeadFormProps {
    isOpen: boolean;
    onClose: () => void;
    reportId: string;
}

export default function LeadForm({ isOpen, onClose, reportId }: LeadFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("SENDING");

        // SAHTE GÖNDERİM SİMÜLASYONU (Burayı sonra gerçek API'ye bağlarız)
        setTimeout(() => {
            setStatus("SUCCESS");
            // 2 saniye sonra formu kapat
            setTimeout(() => {
                onClose();
                setStatus("IDLE");
                setEmail("");
            }, 3000);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* ARKA PLAN KARARTMA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* FORM PENCERESİ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit z-50 p-6"
                    >
                        <div className="bg-[#0B0E14] border border-[#00FF41] p-8 relative shadow-[0_0_50px_rgba(0,255,65,0.1)]">

                            {/* KAPATMA BUTONU */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {status === "SUCCESS" ? (
                                // BAŞARILI DURUMU
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-[#00FF41]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FF41]"
                                    >
                                        <CheckCircle size={32} />
                                    </motion.div>
                                    <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-tight">Erişim Talebi Alındı</h3>
                                    <p className="text-gray-400 text-xs font-mono">
                                        Yetkilendirme kodu ve tam rapor şu adrese gönderildi:<br />
                                        <span className="text-[#00FF41]">{email}</span>
                                    </p>
                                </div>
                            ) : (
                                // FORM DURUMU
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex items-center gap-3 text-[#00FF41] mb-8 border-b border-[#2A3241] pb-4">
                                        <Lock size={18} />
                                        <span className="font-mono text-xs tracking-[0.2em] font-bold">GÜVENLİ ERİŞİM PROTOKOLÜ</span>
                                    </div>

                                    <div>
                                        <h3 className="text-white text-xl font-bold mb-2 uppercase italic">Tam Rapora Eriş</h3>
                                        <p className="text-gray-500 text-xs font-mono mb-6">
                                            <span className="text-[#00FF41]">DOSYA ID: {reportId}</span><br />
                                            Kurumsal e-posta adresinizi girerek şifrelenmiş PDF dosyasını talep edin.
                                        </p>

                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Kurumsal E-Posta</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="isim@sirketiniz.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-[#151922] border border-[#2A3241] text-white p-4 text-sm font-mono focus:border-[#00FF41] focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "SENDING"}
                                        className="w-full bg-[#00FF41] text-black font-bold py-4 text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        {status === "SENDING" ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                DOĞRULANIYOR...
                                            </>
                                        ) : (
                                            <>
                                                ERİŞİM TALEP ET <Send size={14} />
                                            </>
                                        )}
                                    </button>

                                    <div className="text-[9px] text-gray-600 text-center font-mono pt-4">
                    // BU İŞLEM HCI_BERLIN GİZLİLİK PROTOKOLÜNE TABİDİR.
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}