import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "EEBD ve SCBA (Solunum Cihazları)",
  sectionId: "fire-safety",
  topicIndex: 7,
  estimatedPages: 22,
  intro: `Solunum koruma cihazları, dumanlı veya oksijensiz ortamda can güvenliğini sağlar. EEBD (Emergency Escape Breathing Device) yalnızca kaçış içindir; SCBA (Self-Contained Breathing Apparatus), yangın söndürme ve müdahale ekibinin (fire team) dumanlı mahalde çalışmasını sağlar. İkisi karıştırılmamalıdır: EEBD ile yangına müdahale edilmez. Bu bölüm; EEBD'nin amacını ve kullanım süresini, SCBA mimarisini (tüp, regülatör, maske, basınç göstergesi), yangın müdahale ekibi (fireman's outfit) donanımını, hava süresi yönetimi ve emniyet kuralını, SOLAS gereksinimlerini ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — fireman's outfit & EEBD",
    "FSS Code Ch. 3 — personal equipment",
    "IMO MSC.1/Circ.1081 — EEBD guidance",
    "EN 137 / EN 402 — SCBA & escape device",
  ],
  chapters: [
    {
      heading: "1. EEBD",
      sections: [
        {
          subheading: "1.1 Amaç ve sınır",
          paragraphs: [
            `EEBD, dumanlı/oksijensiz bir mahalden güvenli bölgeye kaçışı sağlayan, kısa süreli (tipik ≥10 dk) hava/oksijen sağlayan kaçış başlığıdır. Yangın söndürmek veya tehlikeli mahalle girmek için KULLANILMAZ; yalnızca dışarı çıkış içindir. Kullanımı basit, takması hızlıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "EEBD ile müdahale edilmez",
              text: `EEBD sadece kaçış cihazıdır; yangına müdahale, kurtarma veya kapalı mahalle giriş için asla kullanılmaz. Bu amaçlar için SCBA gereklidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Yerleşim",
          paragraphs: [
            `EEBD'ler; makine dairesi, yaşam mahalli ve kaçış yolları boyunca yeterli sayıda, görünür ve işaretli konumlarda bulundurulur. Sayıları ve yerleri fire control plan'da gösterilir. Eğitimde her mürettebat takma pratiği yapar.`,
          ],
        },
      ],
    },
    {
      heading: "2. SCBA",
      sections: [
        {
          subheading: "2.1 Bileşenler",
          paragraphs: [
            `SCBA; yüksek basınçlı hava tüpü (genelde ~6-9 L, ~300 bar), basınç düşürücü ve talep regülatörü (demand valve), tam yüz maskesi, sırt taşıyıcı ve basınç göstergesi ile düşük basınç düdüğünden (whistle) oluşur. Maske pozitif basınçlı tutularak duman sızması önlenir.`,
          ],
          table: {
            headers: ["Bileşen", "İşlev"],
            rows: [
              ["Hava tüpü", "Basınçlı temiz hava deposu"],
              ["Regülatör", "Basıncı solunabilir düzeye düşürür"],
              ["Tam yüz maske", "Sızdırmaz, pozitif basınç"],
              ["Manometre + düdük", "Kalan hava + düşük basınç uyarısı"],
            ],
          },
        },
        {
          subheading: "2.2 Hava süresi yönetimi",
          paragraphs: [
            `Tüpteki hava süresi, iş yüküne göre değişir; ağır eforla hızla tükenir. Ekip, dönüş için yeterli payı (genelde girişte kullanılanın yedeği) bırakmalı, düşük basınç düdüğü çalmadan çıkışa yönelmelidir. Giriş-çıkış kontrolü (entry control) ve haberleşme zorunludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Entry control",
              text: `Dumanlı mahalle SCBA ile giren ekip için dışarıda zaman/hava takibi yapan bir kontrolör bulunmalı; ekip asla tek başına ve takipsiz girmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Fireman's Outfit",
      sections: [
        {
          subheading: "3.1 Yangın müdahale donanımı",
          paragraphs: [
            `Yangın müdahale takımı (fireman's outfit); koruyucu giysi, baret, eldiven, çizme, can ipi (lifeline), el feneri, balta ve SCBA içerir. Gemide belirli sayıda tam takım, kolay erişilir ve dağıtılmış konumlarda bulundurulur. Düzenli kontrol ve eğitim şarttır.`,
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
            `Bakım; tüp basıncı kontrolü ve dolum, maske sızdırmazlık ve temizlik, regülatör fonksiyon testi, conta/kayış kontrolü ve EEBD son kullanma tarihi takibini kapsar. Kullanılan SCBA tüpü hemen doldurulur; cihazlar daima dolu/hazır tutulur.`,
          ],
          bullets: [
            `Tüp basıncı dolu (düzenli kontrol)`,
            `Maske sızdırmazlık testi`,
            `EEBD son kullanma tarihi takibi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Tüp basıncı düşük", "Sızıntı/kullanım", "Yeniden dolum, sızdırmazlık"],
              ["Maske sızdırıyor", "Conta/yüz teması", "Conta değişimi, fit testi"],
              ["Regülatör zor nefes", "Arıza/kirlilik", "Servis/değişim"],
              ["EEBD süresi dolmuş", "Yaşlanma", "Değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
