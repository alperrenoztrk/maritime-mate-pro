import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Lashing & Securing (Bağlama ve Sabitleme) Donanımı",
  sectionId: "cargo-systems",
  topicIndex: 4,
  estimatedPages: 24,
  intro: `Yük bağlama ve sabitleme (lashing & securing) donanımı, kargonun seyir boyunca gemi hareketleriyle (rolling/pitching) kaymasını, devrilmesini veya denize düşmesini önler. Konteyner gemilerinde twistlock/lashing rod/turnbuckle, dökme/genel kargoda lashing zinciri ve gergi, ro-ro'da lashing point ve web sling kullanılır. Bu bölüm; gemi hareketi kaynaklı kuvvetleri (atalet/ivme), konteyner bağlama donanımını ve CSM'i (Cargo Securing Manual), lashing kuvveti ve MSL kavramını, ağır hava ve istif kuralını, ro-ro lashing'ini ve donanım muayene/bakımını mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. VI & VII — cargo securing",
    "IMO CSS Code (Cargo Stowage & Securing)",
    "Cargo Securing Manual (gemi onaylı)",
    "IMO/ILO/UNECE CTU Code",
  ],
  chapters: [
    {
      heading: "1. Kuvvetler ve Temel İlke",
      sections: [
        {
          subheading: "1.1 Gemi hareketinin yarattığı kuvvetler",
          paragraphs: [
            `Yelpaze gibi yalpalama (roll), baş-kıç vurma (pitch) ve dikey ivme (heave), kargo üzerinde atalet kuvvetleri oluşturur; en kritik enine kuvvet roll kaynaklıdır. Lashing donanımı bu kuvvetleri karşılamalı, kargonun kaymasını ve devrilmesini engellemelidir. Kuvvet, ivme × kütle ile büyür.`,
          ],
          bullets: [
            `Roll → büyük enine kuvvet (en kritik)`,
            `Pitch/heave → boyuna/dikey kuvvet`,
            `Kuvvet ağırlık ve ivmeyle artar`,
          ],
        },
        {
          subheading: "1.2 MSL ve CSM",
          paragraphs: [
            `Her lashing elemanının MSL'i (Maximum Securing Load) vardır; çalışma yükü emniyet katsayısıyla sınırlanır. Geminin onaylı Cargo Securing Manual'ı (CSM), hangi donanımın nasıl kullanılacağını, istif düzenini ve hesabı tanımlar; bağlama CSM'e uygun yapılmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "CSM zorunluluğu",
              text: `SOLAS, standart konteyner dışı yükler için onaylı Cargo Securing Manual bulundurmayı ve bağlamanın bu kılavuza göre yapılmasını ister.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Konteyner Bağlama",
      sections: [
        {
          subheading: "2.1 Twistlock, lashing rod, turnbuckle",
          paragraphs: [
            `Konteynerler köşe kutularından twistlock ile birbirine ve gemiye kilitlenir; alt sıralar lashing rod ve turnbuckle (germe) ile lashing bridge/güverteye gerilir. İstif yüksekliği arttıkça üst konteynerlerin yükü ve devrilme riski artar; bu yüzden ağır konteynerler alta istiflenir.`,
          ],
          table: {
            headers: ["Eleman", "İşlev"],
            rows: [
              ["Twistlock", "Konteynerleri dikey kilitler"],
              ["Lashing rod", "Konteyneri güverteye bağlar"],
              ["Turnbuckle", "Lashing'i gerer/ayarlar"],
              ["Stacking cone", "İstif hizalama"],
            ],
          },
        },
        {
          subheading: "2.2 İstif ve ağırlık kuralı",
          paragraphs: [
            `Ağır altta, hafif üstte istif ilkesi devrilme momentini azaltır. Stack weight ve tier limitleri aşılmamalı; yanlış ağırlık beyanı (VGM hatası) istif planını ve emniyeti bozar. Lashing planı yazılımla (lashing computer) doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Ağır Hava ve Ro-Ro",
      sections: [
        {
          subheading: "3.1 Ağır hava önlemleri",
          paragraphs: [
            `Kötü hava beklentisinde rota/hız ayarı (weather routing), ek lashing kontrolü ve aşırı yalpadan kaçınma uygulanır. Aşırı GM (stiff ship) sert ve hızlı yalpa yaparak lashing'i zorlar; çok düşük GM ise tehlikeli yalpa periyodu yaratır. Lashing'ler seyir boyunca periyodik kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Parametrik rolling",
              text: `Konteyner gemilerinde belirli dalga/hız koşullarında ani büyük yalpa (parametric rolling) konteyner kaybına yol açabilir; hız/rota değişimiyle kaçınılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Ro-Ro lashing",
          paragraphs: [
            `Ro-ro gemilerinde araç/trailer'lar güverte lashing point'lerine web sling/zincir ve gergi ile bağlanır; tekerlek takozu (chock) eklenir. Bağlama açısı ve sayısı araç ağırlığına göre CSM'e uygun seçilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Muayene ve Bakım",
      sections: [
        {
          subheading: "4.1 Donanım muayenesi",
          paragraphs: [
            `Lashing donanımı; çatlak, deformasyon, korozyon ve aşınma için düzenli muayene edilir. Twistlock fonksiyonu, turnbuckle dişlisi ve lashing rod düzgünlüğü kontrol edilir. Hasarlı eleman derhal hizmet dışı bırakılır.`,
          ],
          bullets: [
            `Twistlock kilitleme/açma fonksiyonu`,
            `Turnbuckle diş ve gres`,
            `Çatlak/korozyonlu eleman = ret`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Twistlock kilitlenmiyor", "Mekanizma aşınması/kir", "Temizle/gresle veya değiştir"],
              ["Lashing gevşiyor", "Turnbuckle/conta, oturma", "Periyodik germe kontrolü"],
              ["Eleman çatlak/eğri", "Aşırı yük/yorulma", "Hizmet dışı, değiştir"],
              ["Konteyner kayması", "Yetersiz/yanlış lashing", "Plan ve donanımı CSM'e göre düzelt"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
