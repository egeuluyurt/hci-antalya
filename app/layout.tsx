import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Bileşenlerimizi import ediyoruz
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    // Tarayıcı sekmesinde ve Google'da görünecek profesyonel isim
    title: "HCI | Hospitality Cost Index - Berlin Audit Labs",
    description: "Enterprise-level procurement auditing and material science analysis for 5-star hospitality operations.",

    // Favicon ayarları (Senin public/favicon_io klasörüne göre düzenlendi)
    icons: {
        icon: [
            { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon_io/favicon.ico" },
        ],
        apple: "/favicon_io/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#0B0E14] text-white antialiased`}>

                {/* Google Analytics: Sitenin trafiğini ölçer */}
                <GoogleAnalytics />

                {/* JsonLd: AI botlarına ve Google'a kurumsal kimliğimizi anlatır */}
                <JsonLd />

                {/* Sayfa içerikleri burada yüklenir */}
                {children}

            </body>
        </html>
    );
}