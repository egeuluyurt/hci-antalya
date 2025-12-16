"use client";
import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_ID = "G-XXXXXXXXXX"; // Buraya Google'dan aldığın kodu yapıştıracağız

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script id="ga-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}