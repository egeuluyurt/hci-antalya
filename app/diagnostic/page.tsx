import DiagnosticEngine from '@/components/DiagnosticEngine';
import Link from 'next/link';

export default function DiagnosticPage() {
    return (
        <main className="min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center p-6 relative">
            {/* Sol Üst Geri Dönüş Butonu */}
            <div className="absolute top-10 left-10">
                <Link href="/" className="text-slate-500 text-[10px] tracking-widest uppercase hover:text-lime-400 transition-colors font-mono">
          // BACK_TO_DASHBOARD
                </Link>
            </div>

            {/* Bizim devasa motorumuz burada çalışacak */}
            <DiagnosticEngine />
        </main>
    );
}