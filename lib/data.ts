// lib/data.ts - SİTENİN TEK GERÇEK VERİ KAYNAĞI

export interface ReportContent {
    title: string;
    summary: string;
    fullContent: string;
    story?: { head: string; text: string }[];
    download_text?: string;
}

export interface Report {
    id: string;
    vector: string;
    iconType: "THERMOMETER" | "ACTIVITY" | "SHIELD" | "ALERT";
    status: "CRITICAL" | "STABLE" | "MONITORING" | "URGENT";
    loss: string;
    content: {
        TR: ReportContent;
        EN: ReportContent;
        DE: ReportContent;
    };
}

// DİKKAT: 'export const reports' olarak dışarı aktarıyoruz!
export const reports: Report[] = [
    {
        id: "rpt-7702-ant",
        vector: "ENERJİ_KAYBI",
        iconType: "THERMOMETER",
        status: "CRITICAL",
        loss: "$118,400",
        content: {
            TR: {
                title: "ISITMA SİSTEMİNDE GİZLİ %35 KAYIP",
                summary: "Kireçli suyun kazanlarda oluşturduğu doğal izolasyon, enerji faturanızı %35 şişiriyor.",
                download_text: "KİREÇ ÖNLEYİCİ TEKNİK ŞARTNAME",
                fullContent: "",
                story: [
                    { head: "ŞİKAYET", text: "5 yıldızlı tesis, doluluk aynı olmasına rağmen enerji faturasında %30 artış bildirdi." },
                    { head: "HCI TESPİTİ", text: "Kazan rezistanslarında 3mm kireç tabakası tespit edildi. Bu tabaka ısıyı hapsediyordu." },
                    { head: "SONUÇ", text: "Sistem suyu ısıtmak için %35 fazla elektrik harcıyordu. Ekipman ömrü 8 aya düştü." }
                ]
            },
            EN: {
                title: "HIDDEN 35% LOSS IN HEATING",
                summary: "Limescale acts as insulation in boilers, inflating energy bills by 35%.",
                download_text: "ANTI-SCALE TECHNICAL SPEC",
                fullContent: "",
                story: [
                    { head: "THE COMPLAINT", text: "5-star resort reported 30% energy bill surge despite stable occupancy." },
                    { head: "HCI DETECTION", text: "3mm limescale layer found on heating elements, blocking heat transfer." },
                    { head: "THE VERDICT", text: "System burned 35% more power. Asset lifespan dropped to 8 months." }
                ]
            },
            DE: {
                title: "VERSTECKTER 35% ENERGIEVERLUST",
                summary: "Kalkablagerungen erhöhen die Energiekosten um 35%.",
                download_text: "ANTI-KALK SPEZIFIKATION",
                fullContent: "",
                story: [
                    { head: "DIE BESCHWERDE", text: "Hotel meldet 30% Anstieg der Energiekosten." },
                    { head: "HCI-ERKENNUNG", text: "3mm Kalkschicht auf Heizelementen entdeckt." },
                    { head: "DAS URTEIL", text: "System verbrauchte 35% mehr Strom." }
                ]
            }
        }
    },
    {
        id: "rpt-4409-ber",
        vector: "TEKSTİL_HASARI",
        iconType: "ACTIVITY",
        status: "URGENT",
        loss: "$42,200",
        content: {
            TR: {
                title: "HAVLULARIN ÖMRÜNÜ YARIYA İNDİREN HATA",
                summary: "Yanlış yıkama kimyasalları havlu liflerini yakıyor, ömrü 120 yıkamadan 45'e düşürüyor.",
                download_text: "DOĞRU YIKAMA FORMÜLÜ",
                fullContent: "",
                story: [
                    { head: "ŞİKAYET", text: "Havlular sezon ortasında grileşiyor ve yırtılıyordu." },
                    { head: "HCI TESPİTİ", text: "Lif analizinde kimyasal yanıklar görüldü. Yasaklı klor kullanımı tespit edildi." },
                    { head: "SONUÇ", text: "Tekstil bütçesi gereksiz yere iki katına çıktı." }
                ]
            },
            EN: {
                title: "THE MISTAKE HALVING TOWEL LIFESPAN",
                summary: "Wrong chemicals burn towel fibers, reducing lifespan from 120 to 45 washes.",
                download_text: "CORRECT WASH FORMULA",
                fullContent: "",
                story: [
                    { head: "THE COMPLAINT", text: "Towels were turning grey and tearing mid-season." },
                    { head: "HCI DETECTION", text: "Chemical burns detected on fibers due to banned chlorine." },
                    { head: "THE VERDICT", text: "Textile budget doubled unnecessarily." }
                ]
            },
            DE: {
                title: "FEHLER HALBIERT HANDTUCH-LEBENSDAUER",
                summary: "Falsche Chemikalien zerstören Handtuchfasern.",
                download_text: "WASCHFORMEL HERUNTERLADEN",
                fullContent: "",
                story: [
                    { head: "DIE BESCHWERDE", text: "Handtücher wurden grau und rissen." },
                    { head: "HCI-ERKENNUNG", text: "Chemische Verbrennungen durch Chlor entdeckt." },
                    { head: "DAS URTEIL", text: "Textilbudget verdoppelte sich." }
                ]
            }
        }
    },
    {
        id: "rpt-1205-ist",
        vector: "OPERASYON_VERİMSİZLİĞİ",
        iconType: "SHIELD",
        status: "MONITORING",
        loss: "$15,800",
        content: {
            TR: {
                title: "TEMİZLİK SÜRESİNİ UZATAN TUZAK",
                summary: "Yanlış yüzey temizleyici kullanımı kromu aşındırıyor, temizlik süresini oda başı 4 dk uzatıyor.",
                download_text: "VERİMLİ KİMYASALLAR LİSTESİ",
                fullContent: "",
                story: [
                    { head: "ŞİKAYET", text: "Banyo temizliği çok uzun sürüyor, lekeler çıkmıyordu." },
                    { head: "HCI TESPİTİ", text: "Ucuz temizleyici yüzeyleri aşındırıp kiri hapsediyordu." },
                    { head: "SONUÇ", text: "Günde 33 saatlik iş gücü kaybı (4 ekstra personel maliyeti)." }
                ]
            },
            EN: {
                title: "THE TRAP DOUBLING CLEANING TIME",
                summary: "Wrong cleaners corrode chrome, adding 4 mins to cleaning time per room.",
                download_text: "EFFICIENT CHEMICALS LIST",
                fullContent: "",
                story: [
                    { head: "THE COMPLAINT", text: "Cleaning took too long, stains persisted." },
                    { head: "HCI DETECTION", text: "Cheap cleaner corroded surfaces, trapping dirt." },
                    { head: "THE VERDICT", text: "33 hours of labor lost daily." }
                ]
            },
            DE: {
                title: "REINIGUNGSZEIT VERDOPPELT",
                summary: "Falsche Reiniger korrodieren Chrom.",
                download_text: "EFFIZIENTE CHEMIKALIEN",
                fullContent: "",
                story: [
                    { head: "DIE BESCHWERDE", text: "Reinigung dauerte zu lange." },
                    { head: "HCI-ERKENNUNG", text: "Billigreiniger beschädigten Oberflächen." },
                    { head: "DAS URTEIL", text: "33 Stunden Arbeitsverlust pro Tag." }
                ]
            }
        }
    }
];