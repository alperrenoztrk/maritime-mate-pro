import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Şaft Hattı ve Güç Aktarma",
  sectionId: "main-engine",
  topicIndex: 2,
  estimatedPages: 24,
  intro: `Şaft hattı (shafting), ana makinenin ürettiği torku pervaneye ileten ve pervane itkisini gemi gövdesine aktaran döner güç aktarma sistemidir. Thrust shaft, intermediate shaft ve propeller (tail) shaft; yataklar (thrust block, intermediate bearing, stern tube bearing); sızdırmazlık (stern tube seal) ve hizalama (alignment) bu sistemin emniyetini belirler. Bu bölüm; şaft hattı bileşenlerini, thrust bloğun itki aktarımını, stern tube yağlama ve sızdırmazlık tiplerini, hizalama ve titreşim (whirling/torsional) konularını ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "IACS UR M68 — shafting & alignment",
    "Klas kuralları (DNV/LR) — propeller shaft survey",
    "Stern tube seal üretici el kitapları (Wärtsilä, Kemel)",
    "Pounder's Marine Diesel Engines",
  ],
  chapters: [
    {
      heading: "1. Bileşenler ve İtki Aktarımı",
      sections: [
        {
          subheading: "1.1 Şaft hattı elemanları",
          paragraphs: [
            `Şaft hattı, makineden pervaneye doğru sırayla: thrust shaft, intermediate shaft(lar) ve propeller (tail) shaft'tan oluşur. Aralarında flanşlı bağlantılar (coupling) bulunur. Tail shaft, stern tube içinden geçer ve pervaneyi taşır.`,
          ],
          bullets: [
            `Thrust shaft: itkiyi thrust bloğa taşır`,
            `Intermediate shaft: ara taşıma`,
            `Propeller/tail shaft: pervaneyi taşıyan dış şaft`,
          ],
        },
        {
          subheading: "1.2 Thrust block",
          paragraphs: [
            `Pervane itkisi (ileri/geri) şaft üzerinden thrust block'a (itki yatağı) gelir; thrust block bu eksenel kuvveti gemi gövdesine (seating) aktararak gemiyi ileri/geri hareket ettirir. Tilting-pad thrust yatakları yağ filmi üzerinde çalışır; sıcaklık ve yağ akışı izlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İtki nereye gider?",
              text: `Pervane gemiyi değil şaftı iter; itki thrust block üzerinden gövdeye aktarılır. Thrust block arızası gemiyi tahriksiz bırakır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Stern Tube: Yağlama ve Sızdırmazlık",
      sections: [
        {
          subheading: "2.1 Yağ vs su yağlamalı stern tube",
          paragraphs: [
            `Tail shaft, stern tube yatağında döner. Geleneksel sistem yağ yağlamalıdır (white metal yatak, gravity tank ile basınç). Çevreci alternatif su yağlamalı (composite/lignum vitae yatak) sistemdir; yağ kaçağı riskini ortadan kaldırır ama yatak aşınması farklı izlenir.`,
          ],
          table: {
            headers: ["Tip", "Yatak", "Avantaj/Dezavantaj"],
            rows: [
              ["Yağ yağlamalı", "White metal", "Düşük aşınma / sızıntı = kirlilik riski"],
              ["Su yağlamalı", "Composite/rubber", "Kirlilik yok / yatak aşınması fazla"],
            ],
          },
        },
        {
          subheading: "2.2 Stern tube seal",
          paragraphs: [
            `Stern tube seal (örn. lip seal/Simplex), şaft etrafından deniz suyu girişini ve yağ kaçışını önler. Çoklu lip ringler ile ara boşluklar yağla beslenir. Seal aşınması yağ kaçağı (deniz kirliliği) veya su girişi (yatak hasarı) doğurur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yağ kaçağı",
              text: `Stern tube seal sızıntısı stern tube yağının denize karışmasına (MARPOL ihlali) yol açabilir; gravity tank seviye düşüşü erken uyarıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hizalama ve Titreşim",
      sections: [
        {
          subheading: "3.1 Şaft hizalama (alignment)",
          paragraphs: [
            `Şaft hattı, gövde deformasyonu ve sıcaklığa rağmen yataklara dengeli yük binecek şekilde hizalanır (bearing reaction / sag & gap). Yanlış hizalama yatak aşırı yüklenmesi, ısınma ve titreşime yol açar. Hizalama tersanede ölçülür ve gerektiğinde sefer şartlarına göre doğrulanır.`,
          ],
        },
        {
          subheading: "3.2 Burulma ve eğilme titreşimi",
          paragraphs: [
            `Şaft hattının burulma (torsional) ve eğilme (whirling) doğal frekansları, motor devir aralığında rezonans yaratmamalıdır. Belirli devir bölgeleri yasak (barred speed range) olabilir; bu aralıkta sürekli çalışılmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Barred speed range",
              text: `Tachometer üzerinde işaretli yasak devir aralığında sürekli çalışmak burulma titreşimiyle şaft yorulmasına ve kırılmaya yol açabilir; hızla geçilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Muayene ve Arıza",
      sections: [
        {
          subheading: "4.1 Survey ve bakım",
          paragraphs: [
            `Tail shaft, klas tarafından periyodik survey'e (çekme veya yerinde izleme programı) tabidir. Stern tube yağ analizi (su/metal içeriği), seal kontrolü, yatak sıcaklığı ve şaft konum (poker gauge/wear down) ölçümü düzenli yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Stern tube yağ seviyesi düşüyor", "Seal aşınması", "Seal kontrol/değişim, kaçağı bul"],
              ["Yatak sıcaklığı yüksek", "Hizalama/yağ filmi", "Yağ akışı, hizalama kontrolü"],
              ["Aşırı titreşim", "Hizasızlık/dengesizlik", "Hizalama, pervane dengesi"],
              ["Wear-down artışı", "Stern bush aşınması", "Survey + yatak yenileme"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
