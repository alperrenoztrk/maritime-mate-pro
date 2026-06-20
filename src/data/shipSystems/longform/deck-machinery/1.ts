import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Yük Vinçleri ve Kaldırma Kapasitesi",
  sectionId: "deck-machinery",
  topicIndex: 1,
  estimatedPages: 24,
  intro: `Gemi yük vinçleri (deck/cargo cranes ve derik sistemleri), limanın kreni olmayan veya gemi kendi yükünü elleçlemek zorunda olduğu durumlarda kargoyu güvenli biçimde kaldıran, döndüren ve indiren güç makineleridir. SWL (Safe Working Load), yük momenti, devirme stabilitesi ve sapan/blok donanımı bu sistemin emniyetinin temelidir. Bu bölüm; vinç tiplerini (knuckle/box boom, derik, jib crane), kaldırma kapasitesi ve yarıçap-yük (load-radius) ilişkisini, hidrolik tahrik ve emniyet kilitlerini, periyodik test ve sertifikasyonu (LOLER/ILO 152) ve kaldırma operasyonunun pratik yönetimini mühendislik derinliğinde ele alır.`,
  sources: [
    "ILO Convention 152 — Occupational Safety (Dock Work)",
    "SOLAS Ch. VI — Cargo securing",
    "Cargo Gear Register / Chain Register sertifikasyonu",
    "Lloyd's Register / DNV Lifting Appliance kuralları",
    "Üretici el kitapları (MacGregor, Liebherr, TTS)",
  ],
  chapters: [
    {
      heading: "1. Vinç Tipleri ve Donanım",
      sections: [
        {
          subheading: "1.1 Derik (derrick) ve modern vinç",
          paragraphs: [
            `Klasik derik sistemi (union purchase/yumako), iki derik kolunun sabit konumlarda halatlarla yükü taşıması esasına dayanır; ucuz ama yavaş ve sınırlıdır. Modern gemi vinçleri ise döner kuleli (slewing) hidrolik jib/knuckle boom kreni olup tek operatörle hızlı ve hassas elleçleme sağlar.`,
          ],
          bullets: [
            `Box/jib boom: tek parça bom, geniş erişim`,
            `Knuckle boom: katlanır bom, dar alanda esneklik`,
            `Provizyon/stores krenleri: küçük SWL, ikmal için`,
          ],
        },
        {
          subheading: "1.2 Halat, blok ve sapan donanımı",
          paragraphs: [
            `Kaldırma donanımı; tel halat (wire rope), blok (block/sheave), kanca (hook), sapan (sling), kilit (shackle) ve döner (swivel) elemanlarından oluşur. Her elemanın kendi SWL'i vardır ve zincirdeki en zayıf eleman tüm sistemin limitini belirler.`,
          ],
        },
      ],
    },
    {
      heading: "2. Kaldırma Kapasitesi ve Load-Radius İlişkisi",
      sections: [
        {
          subheading: "2.1 SWL ve yük momenti",
          paragraphs: [
            `SWL (Safe Working Load), vincin emniyetle kaldırabileceği maksimum yüktür. Ancak SWL sabit değildir: yarıçap (radius) arttıkça devirici moment artar, kaldırılabilir yük azalır. Yük momenti (M = Yük × Yarıçap) vincin tasarım momentini aşamaz.`,
          ],
          table: {
            headers: ["Yarıçap (m)", "İzin verilen yük (t)", "Moment (t·m)"],
            rows: [
              ["8", "36", "288"],
              ["16", "18", "288"],
              ["24", "12", "288"],
              ["28", "10.3", "288"],
            ],
            caption: "Örnek load chart: sabit moment, artan yarıçapta azalan yük",
          },
        },
        {
          subheading: "2.2 Stabilite ve heel etkisi",
          paragraphs: [
            `Ağır kaldırmada yük gemi merkezinden uzaklaştıkça gemiyi yatıran (heel) bir moment doğar; bu durum hem gemi stabilitesini hem de vincin yarıçapını etkiler. Heavy lift operasyonlarında balast düzenlemesi ve liste kontrolü zorunludur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "List etkisi",
              text: `Gemi listliyken vincin gerçek yarıçapı değişir ve load chart geçersiz olabilir. Ağır kaldırmadan önce gemi düz (upright) trim ile ayarlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hidrolik Tahrik ve Emniyet Sistemleri",
      sections: [
        {
          subheading: "3.1 Hareket eksenleri ve kontrol",
          paragraphs: [
            `Vinç üç temel hareketi yapar: hoisting (kaldırma/indirme), luffing (bom açısı), slewing (döndürme). Her hareket hidrolik silindir veya motorla tahrik edilir ve joystick ile orantılı (proportional) kontrol edilir.`,
          ],
        },
        {
          subheading: "3.2 Emniyet kilitleri",
          paragraphs: [
            `Modern vinçlerde yük momenti sınırlayıcı (overload/moment limiter), hız sınırlama, hortum patlama valfi (hose burst valve) ve acil durdurma bulunur. Yük SWL'i aştığında sistem otomatik durur.`,
          ],
          bullets: [
            `Overload cut-off: SWL aşımında kaldırmayı durdurur`,
            `Hose burst valve: hortum patlarsa yükü tutar`,
            `Slewing limit & emergency stop`,
            `Anti-two-block: bloğun kuleye çarpmasını önler`,
          ],
        },
      ],
    },
    {
      heading: "4. Test, Sertifikasyon ve Bakım",
      sections: [
        {
          subheading: "4.1 Proof load testi ve register",
          paragraphs: [
            `Kaldırma donanımı periyodik olarak proof load (SWL üstü test yükü) ile test edilir ve "Register of Lifting Appliances and Cargo Handling Gear" (cargo gear register) içinde belgelenir. Yetkili kişi (competent person) muayenesi ILO 152 gereğidir.`,
          ],
          table: {
            headers: ["İşlem", "Periyot", "Belge"],
            rows: [
              ["Yetkili muayene", "12 ay", "Cargo gear register"],
              ["Proof load testi", "5 yıl (veya tamir sonrası)", "Test sertifikası"],
              ["Görsel kontrol", "Kullanım öncesi", "Operatör kaydı"],
            ],
          },
        },
        {
          subheading: "4.2 Tipik arızalar",
          paragraphs: [`Saha arızaları ve müdahale:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Kaldırma yavaş/güçsüz", "Hidrolik basınç düşük", "Pompa/relief valf kontrolü"],
              ["Yük kayması (drift)", "İç sızıntı, valf arızası", "Yön valfi ve silindir keçesi"],
              ["Halatta çatlak/tel kopması", "Yorulma, aşınma", "Halatı kriterlere göre değiştir"],
              ["Slewing takılıyor", "Yatak/dişli aşınması", "Slew bearing greslenmesi/kontrolü"],
            ],
          },
          callouts: [
            {
              type: "tip",
              title: "Halat ret kriteri",
              text: `Bir adım (lay) içinde belirli sayıda tel kopması veya çap incelmesi halatın derhal değişimini gerektirir; üretici/klas kriterleri esastır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
