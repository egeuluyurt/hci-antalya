"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export default function Header() {
    const [activeLang, setActiveLang] = useState<"TR" | "EN" | "DE">("EN");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedLang = localStorage.getItem("language") as "TR" | "EN" | "DE";
        if (savedLang) {
            setActiveLang(savedLang);
        }
    }, []);

    const switchLanguage = (lang: "TR" | "EN" | "DE") => {
        localStorage.setItem("language", lang);
        window.location.reload();
    };

    const headerTexts = {
        TR: { loc: "BERLİN_MERKEZ", status: "SİSTEM_AKTİF", archive: "[ ARŞİV ]" },
        EN: { loc: "BERLIN_HQ", status: "SYSTEM_ONLINE", archive: "[ ARCHIVE ]" },
        DE: { loc: "BERLIN_ZENTRALE", status: "SYSTEM_BEREIT", archive: "[ ARCHIV ]" }
    };

    const t = headerTexts[activeLang];

    if (!isMounted) return null;

    return (
        <header className="fixed top-0 left-0 w-full z-[9999] pointer-events-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b border-[#2A3241] bg-[#0B0E14]/90 backdrop-blur-md font-mono text-[10px] md:text-xs">

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                <span className="text-[#00FF41] font-bold tracking-widest">HCI_SYSTEM_V2.5</span>

                <Link
                    href="/archive"
                    className="border-l border-[#2A3241] pl-6 text-white hover:text-[#00FF41] transition-colors cursor-pointer font-bold tracking-widest"
                >
                    {t.archive}
                </Link>
            </div>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
                {/* LANGUAGE SWITCHER */}
                <div className="flex items-center gap-2 bg-black border border-[#2A3241] px-3 py-1 rounded-full">
                    <Globe size={12} className="text-gray-500" />
                    {(["EN", "DE", "TR"] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => switchLanguage(lang)}
                            className={`px-2 py-0.5 transition-all rounded ${activeLang === lang
                                    ? "bg-[#00FF41] text-black font-bold"
                                    : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4 text-gray-500">
                    <span className="animate-pulse text-[#00FF41]">● {t.status}</span>
                    <span>LOC: {t.loc}</span>
                </div>
            </div>
        </header>
    );
}
