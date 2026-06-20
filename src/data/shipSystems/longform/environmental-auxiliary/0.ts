import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Balast Suyu Yönetim Sistemi (BWMS)",
  sectionId: "environmental-auxiliary",
  topicIndex: 0,
  estimatedPages: 25,
  intro: `Balast suyu yönetim sistemi (BWMS), gemilerin denge ve trim için aldığı/bıraktığı balast suyuyla istilacı türlerin (zararlı sucul organizma ve patojen) bir ekosistemden diğerine taşınmasını önleyen, BWM Convention (D-2 standardı) gereği zorunlu çevre sistemidir. Bu bölüm; balast sisteminin (pompa, tank, hat) temelini ve BWM Sözleşmesini (D-1 değişim / D-2 arıtma), arıtma teknolojilerini (filtrasyon + UV, filtrasyon + elektroklorinasyon), tip onayı ve numune (sampling) gereksinimini, operasyon ve kayıt (Ballast Water Record Book) ile bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "IMO Ballast Water Management Convention (BWM) — D-1/D-2",
    "IMO BWMS Code (tip onayı)",
    "USCG Ballast Water Discharge Standard",
    "Üretici el kitapları (Alfa Laval PureBallast, Optimarin)",
  ],
  chapters: [
    {
      heading: "1. Balast Sistemi ve Sözleşme",
      sections: [
        {
          subheading: "1.1 Balast neden alınır?",
          paragraphs: [
            `Balast suyu; yüksüz/kısmen yüklü gemide draft, trim, stabilite, mukavemet (hull stress) ve pervane batışı için alınır/bırakılır. Ancak bu su, alındığı limandaki organizmaları içerir ve boşaltıldığı yere taşır. BWM Convention bu biyolojik kirliliği önlemeyi hedefler.`,
          ],
          bullets: [
            `Balast: stabilite/trim/mukavemet için zorunlu`,
            `Su içindeki organizmalar yeni ortama taşınır`,
            `BWMS bu organizmaları arıtır/öldürür`,
          ],
        },
        {
          subheading: "1.2 D-1 ve D-2 standardı",
          paragraphs: [
            `D-1 (ballast water exchange) açık denizde su değişimini; D-2 (performance standard) ise boşaltılan suda canlı organizma sayısını belirli sınırların altına indirmeyi öngörür. Geçiş süreci tamamlandığında tüm gemiler D-2'yi (yani onaylı BWMS) sağlamak zorundadır.`,
          ],
          table: {
            headers: ["Standart", "Yöntem", "Durum"],
            rows: [
              ["D-1", "Açık denizde su değişimi", "Geçici/eski"],
              ["D-2", "Onaylı BWMS ile arıtma", "Nihai zorunlu"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Arıtma Teknolojileri",
      sections: [
        {
          subheading: "2.1 Filtrasyon + UV",
          paragraphs: [
            `Yaygın bir yaklaşım: alımda filtrasyon (büyük organizma/sediment tutma) + UV ışınlama (DNA hasarıyla üremeyi engelleme). Kimyasal kalıntı bırakmaz, deşarjda nötralizasyon gerektirmez; ancak bulanık suda UV verimi düşer ve yüksek güç gerektirir.`,
          ],
        },
        {
          subheading: "2.2 Filtrasyon + elektroklorinasyon",
          paragraphs: [
            `Alternatif: filtrasyon + elektroklorinasyon/kimyasal (in-line aktif madde üretimi). Güçlü arıtma sağlar fakat deşarj öncesi kalıntı (TRO — Total Residual Oxidant) nötralizasyonu ve izleme gerekir. Soğuk/düşük tuzlulukta verim değişir.`,
          ],
          table: {
            headers: ["Teknoloji", "Avantaj", "Dikkat"],
            rows: [
              ["Filtre + UV", "Kalıntısız, basit deşarj", "Bulanık suda verim, güç"],
              ["Filtre + elektroklorinasyon", "Güçlü arıtma", "TRO nötralizasyon/izleme"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Operasyon ve Uyum",
      sections: [
        {
          subheading: "3.1 Tip onayı ve numune",
          paragraphs: [
            `BWMS, IMO BWMS Code'a göre tip onaylı olmalıdır. Liman devleti, deşarj suyundan numune (sampling) alıp D-2 uyumunu denetleyebilir. Operasyon parametreleri (debi, UV/TRO dozu) onay limitleri içinde tutulmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Ballast Water Record Book",
              text: `Her balast alımı, arıtması ve deşarjı Ballast Water Record Book'a kaydedilir; PSC denetiminde bu kayıt ve sistem fonksiyonu kontrol edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; otomatik filtre geri yıkama (backflush) ve eleman kontrolü, UV lamba ömrü/şeffaflık veya elektroklorinasyon hücre temizliği, TRO/sensör kalibrasyonu ve debi/basınç izlemeyi kapsar. Sensör arızası uyum kaydını geçersiz kılabilir.`,
          ],
          bullets: [
            `Filtre backflush ve eleman temizliği`,
            `UV lamba/quartz veya hücre temizliği`,
            `TRO/sensör kalibrasyonu`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Filtre sık tıkanıyor", "Yüksek sediment/su kalitesi", "Backflush ayarı, debi düşür"],
              ["UV verimi düşük", "Lamba ömrü/quartz kirli", "Lamba/quartz değişimi"],
              ["TRO sınır dışı", "Doz/nötralizasyon", "Doz ayarı, nötralizasyon kontrol"],
              ["Sistem by-pass uyarısı", "Sensör/akış arızası", "Sensör kontrol, uyum kaydı"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
