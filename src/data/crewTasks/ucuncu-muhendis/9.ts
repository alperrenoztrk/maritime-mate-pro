import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Hydraulic ve steering gear günlük kontrol",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 9,
  estimatedPages: 24,
  intro: `Dümen donanımı (steering gear), geminin manevra kabiliyetinin ve seyir emniyetinin doğrudan teminatıdır; arızası karaya oturma veya çatışmaya kadar gidebilen kritik bir olaydır. Bunun yanında güverte makineleri hidrolik üniteleri (ambar kapakları, vinçler, ırgat) de hidrolik sistemlere dayanır. Üçüncü/Dördüncü Mühendis; steering gear yağ seviyesi, kaçak, ram keçesi, hidrolik basınç ve acil dümen pompası testlerini, güverte hidrolik paketlerinin yağ/filtre durumunu günlük kontrol eder. Bu bölüm bu kontrolleri ve SOLAS test gereksinimlerini açıklar.`,
  sources: [
    "SOLAS Chapter V Regulation 26 — Steering gear testleri ve tatbikatları",
    "SOLAS Chapter II-1 Regulation 29 — Steering gear gereklilikleri",
    "Üretici steering gear / hidrolik sistem el kitapları",
    "Class kuralları — steering gear ve hidrolik sistem sörveyleri",
    "ISO temizlik sınıfları — hidrolik yağ kontaminasyon kontrolü",
  ],
  chapters: [
    {
      heading: "1. Steering Gear'ın Önemi",
      sections: [
        {
          subheading: "1.1 Neden kritik bir sistem?",
          paragraphs: [
            `Dümen donanımı arızası, geminin yön kontrolünü kaybetmesi anlamına gelir; dar sularda, trafikte veya manevrada bu felaketle sonuçlanabilir. Bu yüzden SOLAS, steering gear için yedeklilik (ana + yardımcı güç ünitesi), düzenli test ve acil dümen düzeneği şart koşar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/26 — testler",
              text: `Gemi limandan kalkmadan önceki 12 saat içinde steering gear test edilir (ana/yardımcı üniteler, uzaktan kumanda, dümen açı göstergesi, haberleşme). Ayrıca 3 ayda bir acil dümen tatbikatı yapılır ve kayda geçirilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Sistem tipleri",
          paragraphs: [
            `Çoğu ticari gemide elektro-hidrolik dümen donanımı bulunur: ram tipi (silindir-tiller) veya rotary vane. Hidrolik pompalar (genelde variable displacement) ram'i hareket ettirir; telemotor veya elektrik sinyaliyle köprüüstünden kumanda edilir. Üçüncü/Dördüncü Mühendis bu sistemin yağ, basınç ve mekanik durumunu izler.`,
          ],
        },
      ],
    },
    {
      heading: "2. Steering Gear Günlük Kontrolü",
      sections: [
        {
          subheading: "2.1 Yağ, kaçak ve keçe",
          paragraphs: [
            `Günlük kontrolde hidrolik yağ seviyesi (tank ve replenishing tank), ram/silindir keçelerinde kaçak, hortum/boru bağlantı sızıntıları ve genel temizlik bakılır. Ram keçesinden gelen kaçak hem yağ kaybı hem zeminde kayma/yangın riski; ayrıca sisteme hava girmesine ve performans düşüşüne yol açar.`,
          ],
          bullets: [
            `Hidrolik yağ seviyesi ve replenishing tank durumu`,
            `Ram keçesi ve silindir kaçak kontrolü`,
            `Hortum/boru/bağlantı sızıntıları`,
            `Çalışma basıncı ve relief valf davranışı`,
            `Anormal ses/titreşim, yağ sıcaklığı`,
          ],
        },
        {
          subheading: "2.2 Hidrolik basınç ve filtre",
          paragraphs: [
            `Sistem çalışma basıncı normal aralıkta olmalı; relief valf erken açıyorsa veya basınç dalgalanıyorsa pompa/valf sorunu olabilir. Filtre fark basıncı (ΔP) izlenir; yükselen ΔP tıkanmayı gösterir. Kirli hidrolik yağ, valf ve pompa aşınmasının en yaygın nedenidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temizlik = ömür",
              text: `Hidrolik sistemlerde arızaların büyük kısmı yağ kontaminasyonundan kaynaklanır. Yağ temizliği (filtrasyon, su/partikül kontrolü) steering gear ve güverte makineleri için en etkili önleyici bakımdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Acil Dümen ve Yedeklilik",
      sections: [
        {
          subheading: "3.1 Emergency steering pump testi",
          paragraphs: [
            `Acil dümen pompası ve lokal (steering gear room) kumanda düzeneği test edilir; köprüüstü ile steering gear room arasındaki haberleşme (telefon/telsiz) doğrulanır. Bir güç ünitesi arızasında ikinci ünitenin devreye girdiği ve dümenin gerekli sürede bordadan bordaya geçtiği teyit edilir.`,
          ],
          table: {
            caption: "SOLAS steering gear performans beklentisi (genel)",
            headers: ["Gereklilik", "Beklenti"],
            rows: [
              ["Hard-over to hard-over (ana)", "35°–35° geçişte ~28 sn (servis koşulunda)"],
              ["Kalkış öncesi test", "12 saat içinde, kayıtlı"],
              ["Acil dümen tatbikatı", "3 ayda bir, kayıtlı"],
              ["Güç ünitesi", "Ana + yardımcı (yedekli)"],
            ],
          },
        },
        {
          subheading: "3.2 Tatbikat ve kayıt",
          paragraphs: [
            `Acil dümen tatbikatında ekip, lokal kumanda ve haberleşmeyle dümeni yönetmeyi tatbik eder. Üçüncü/Dördüncü Mühendis tatbikata katılır, eksiklikleri raporlar ve testler logbook'a işlenir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Güverte Makineleri Hidrolik Paketleri",
      sections: [
        {
          subheading: "4.1 Ambar kapağı, vinç, ırgat",
          paragraphs: [
            `Ambar kapakları, krenler ve ırgat/güverte vinçleri hidrolik güç paketleriyle çalışır. Yağ seviyesi, filtre ΔP, kaçak ve basınç düzenli kontrol edilir. Bu sistemler yük operasyonu ve demir/halat işlerinde güverte ekibinin güvenliğini doğrudan etkiler.`,
          ],
          bullets: [
            `Hidrolik yağ seviyesi ve durumu`,
            `Filtre ΔP ve değişim takibi`,
            `Kaçak ve hortum/bağlantı kontrolü`,
            `Basınç ve valf çalışması`,
          ],
        },
      ],
    },
    {
      heading: "5. Arıza Belirtileri ve Müdahale",
      sections: [
        {
          subheading: "5.1 Tipik sorunlar",
          paragraphs: [
            `Yavaş dümen yanıtı, anormal ses, aşırı yağ sıcaklığı, basınç dalgalanması ve tekrarlayan kaçak başlıca belirtilerdir. Sistemde hava varsa havalandırma (bleeding) yapılır. Kapsam dışı veya emniyeti etkileyen bir belirtide iş durdurulur, köprüüstü ve Baş Mühendis bilgilendirilir; steering gear için "deneme yanılma" kabul edilemez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Manevra öncesi güvence",
              text: `Dümen donanımıyla ilgili herhangi bir şüphe, manevra/dar su geçişi öncesinde mutlaka köprüüstüne bildirilir. Steering gear güvenilirliği, seyir kararlarını doğrudan etkiler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Steering gear / hidrolik günlük kontrol",
          bullets: [
            `Steering gear yağ seviyesi ve replenishing tank normal mi?`,
            `Ram keçesi/silindir ve bağlantılarda kaçak var mı?`,
            `Çalışma basıncı ve filtre ΔP normal mi?`,
            `Acil dümen pompası ve lokal kumanda test edildi mi?`,
            `Köprüüstü–steering room haberleşmesi çalışıyor mu?`,
            `Kalkış öncesi (12 saat) test yapıldı ve kaydedildi mi?`,
            `Güverte hidrolik paketleri (kapak/vinç/ırgat) yağ/filtre/kaçak kontrolü?`,
          ],
          paragraphs: [
            `Steering gear, gemide "asla arıza vermemesi gereken" sistemlerin başında gelir. Üçüncü/Dördüncü Mühendisin günlük disiplinli kontrolü, SOLAS testlerinin ciddiyetle yapılması ve hidrolik yağ temizliği, bu kritik sistemin sessizce ama güvenle çalışmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
