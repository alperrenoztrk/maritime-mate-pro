import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Tank Seviye Ölçüm ve İzleme Sistemleri",
  sectionId: "cargo-systems",
  topicIndex: 2,
  estimatedPages: 22,
  intro: `Tank seviye ölçüm sistemleri, kargo ve balast tanklarındaki sıvı seviyesini, hacmini ve (kargo tanklarında) ara yüzeyini güvenli ve doğru ölçerek yükleme/boşaltma kontrolü, overfill (taşma) önleme ve stabilite hesabı sağlar. UTI (Ullage-Temperature-Interface) cihazları, radar/float seviye verici ve high-level alarmlar bu sistemin parçalarıdır. Bu bölüm; ullage/sounding kavramını ve hacim hesabını, kapalı/kısıtlı ölçüm (closed/restricted gauging) gereksinimini, otomatik seviye sistemlerini (radar, float, capacitance), overfill ve high-high alarmı, sıcaklık ve interface ölçümünü ve bakım/arızayı ele alır.`,
  sources: [
    "ISGOTT 6th edition — gauging & measurement",
    "MARPOL / SOLAS — overfill protection",
    "IMO / OCIMF — closed gauging requirements",
    "Üretici el kitapları (Saab/Rosemount TankRadar, Honeywell)",
  ],
  chapters: [
    {
      heading: "1. Ullage ve Hacim",
      sections: [
        {
          subheading: "1.1 Ullage vs sounding",
          paragraphs: [
            `Sounding, tank dibinden sıvı yüzeyine olan mesafedir; ullage ise tankın tavanından (referans noktasından) sıvı yüzeyine olan boşluktur. Tanker operasyonunda genelde ullage ölçülür ve tank kapasite tablosu (calibration table) ile hacme çevrilir; sıcaklık düzeltmesi ile standart hacme (m³/bbl) ulaşılır.`,
          ],
          bullets: [
            `Ullage = tepe boşluğu (sıvı üstü)`,
            `Sounding = dipten sıvı yüksekliği`,
            `Kapasite tablosu ile hacme çevrilir`,
          ],
        },
        {
          subheading: "1.2 Sıcaklık ve interface",
          paragraphs: [
            `UTI cihazı tek ölçümde ullage, sıcaklık ve su/yağ ara yüzeyini (interface) verir; hacim sıcaklığa göre düzeltilir ve kargonun altındaki su (free water) belirlenir. Doğru sıcaklık, ticari hacim hesabının (custody transfer) temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Kapalı Ölçüm ve Otomatik Sistemler",
      sections: [
        {
          subheading: "2.1 Closed/restricted gauging",
          paragraphs: [
            `Petrol/kimyasal tankerlerde tank atmosferini açmadan ölçüm (closed gauging) zorunludur; aksi halde gaz salınımı ve patlayıcı atmosfer riski oluşur. Sabit (radar/float) sistemler kapalı ölçüm sağlar; UTI ise vapour lock valf üzerinden restricted gauging yapar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Açık ölçüm yasağı",
              text: `Inert/petrol tankında ullage kapağını tamamen açıp ölçüm yapmak (open gauging) genelde yasaktır; gaz çıkışı ve statik risk yaratır. Kapalı/kısıtlı yöntem kullanılır.`,
            },
          ],
        },
        {
          subheading: "2.2 Radar, float, capacitance",
          paragraphs: [
            `Otomatik seviye vericiler: radar (mikrodalga, temassız, doğru), float/şamandıra (mekanik), capacitance (kapasitif) ve hidrostatik basınç tipleri vardır. Veriler kargo kontrol odasındaki ekrana ve stabilite bilgisayarına gider; manuel UTI ile çapraz kontrol edilir.`,
          ],
          table: {
            headers: ["Tip", "Prensip", "Not"],
            rows: [
              ["Radar", "Mikrodalga yansıma", "Temassız, doğru"],
              ["Float", "Şamandıra konumu", "Mekanik, takılabilir"],
              ["Capacitance", "Dielektrik değişimi", "Kalıntıdan etkilenir"],
              ["Hidrostatik", "Basınç-yükseklik", "Yoğunluk bağımlı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Overfill Koruması",
      sections: [
        {
          subheading: "3.1 High ve high-high alarm",
          paragraphs: [
            `Yükleme sırasında taşmayı önlemek için bağımsız high-level ve high-high level alarmlar bulunur; high-high genelde otomatik kapama/ESD ile bağlantılıdır. Bu alarmlar ana seviye sisteminden bağımsız sensörlerle çalışmalı ki tek arıza taşmaya yol açmasın.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Topping-up dikkati",
              text: `Tank dolmaya yakın (topping-up) en yüksek taşma riski vardır; rate düşürülür, alarmlar aktif ve sürekli izlenir. Overfill = denize döküntü ve patlama riski.`,
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
            `Bakım; radar/float verici kalibrasyonu, alarm fonksiyon testi, UTI tape/sensör kontrolü ve vapour lock valf sızdırmazlığını kapsar. Otomatik ve manuel okumalar düzenli karşılaştırılır.`,
          ],
          bullets: [
            `High/high-high alarm fonksiyon testi`,
            `Otomatik vs manuel (UTI) çapraz kontrol`,
            `Vapour lock valf sızdırmazlığı`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Seviye yanlış/sabit", "Verici/float takılması", "Verici kontrol, manuel teyit"],
              ["Alarm çalışmıyor", "Sensör/devre", "Alarm testi ve onarım"],
              ["UTI hatalı interface", "Prob kirli/kalibrasyon", "Prob temizlik/kalibrasyon"],
              ["Radar parazitli okuma", "Köpük/türbülans", "Sakinleştirme borusu/ayar"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
