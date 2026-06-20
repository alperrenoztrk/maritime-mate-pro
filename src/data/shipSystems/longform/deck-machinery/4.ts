import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Capstan ve Güverte Donanımları",
  sectionId: "deck-machinery",
  topicIndex: 4,
  estimatedPages: 22,
  intro: `Capstan (ırgat babası), bağlama ve elleçleme operasyonlarında halatı toplamak için kullanılan dikey eksenli döner tamburdur. Bitt (baba), fairlead (kılavuz makara/roller), pedestal roller, panama lead ve bollard gibi sabit güverte donanımları ise halatların yönlendirilmesi ve bağlanmasında çalışır. Bu bölüm; capstan'ın çalışma prensibini ve warping operasyonunu, sabit donanım elemanlarının fonksiyon ve SWL'lerini, fairlead açılarının halat ömrüne etkisini ve bu donanımların bakım/muayenesini ele alır.`,
  sources: [
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "ISO 3913 / ISO 13713 — bollards & fairleads",
    "SOLAS — mooring arrangement",
    "Üretici el kitapları (Hatlapa, Rolls-Royce)",
  ],
  chapters: [
    {
      heading: "1. Capstan Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Dikey tambur ve sürtünme",
          paragraphs: [
            `Capstan dikey eksende döner; halat tambura birkaç tur sarılır ve sürtünme ile tutulur (capstan effect). Operatör halatın boşunu (tail) çekerek sürtünmeyi kontrol eder; çektikçe halat toplanır, bıraktıkça kayar. Bu, halatı kalıcı sarmadan kontrollü çekiş sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Capstan etkisi",
              text: `Euler kapstan denklemi gereği tutma kuvveti tur sayısı ve sürtünme ile üstel artar; birkaç tur, küçük bir el kuvvetiyle büyük yük tutmayı sağlar.`,
            },
          ],
        },
        {
          subheading: "1.2 Warping operasyonu",
          paragraphs: [
            `Warping, gemiyi rıhtım boyunca halatlarla kaydırma işlemidir; capstan veya vinç drumu (warping drum/gypsy head) ile yapılır. Bağlama vinçleri genelde warp head ile donatılır; capstan bağımsız bir ünite olarak küçük tekneler ve özel gemilerde bulunur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Sabit Güverte Donanımları",
      sections: [
        {
          subheading: "2.1 Bitt, bollard ve fairlead",
          paragraphs: [
            `Bitt/bollard (baba), halatın volta edildiği (figure-of-eight) çift dikmedir; SWL'i halat MBL'i ile uyumlu olmalıdır. Fairlead (kılavuz), halatı doğru açıyla yönlendiren roller veya panama klüzdür. Pedestal roller halatı güverte üzerinde yatay yönlendirir.`,
          ],
          table: {
            headers: ["Eleman", "Görev", "Dikkat"],
            rows: [
              ["Bitt/Bollard", "Halatı volta etme", "SWL ve kaynak bütünlüğü"],
              ["Panama lead", "Halatı bordadan geçirme", "Keskin köşe halatı yıpratır"],
              ["Roller fairlead", "Sürtünmeyi azaltma", "Rulman/yatak greslemesi"],
              ["Pedestal roller", "Güvertede yönlendirme", "Dönme serbestliği"],
            ],
          },
        },
        {
          subheading: "2.2 Fairlead açısı ve halat ömrü",
          paragraphs: [
            `Halatın fairlead'den çıkış açısı (lead angle) ne kadar keskinse sürtünme ve aşınma o kadar fazladır. İdeal düzende halat fairlead'i mümkün olduğunca düz açıyla terk eder. Yanlış açı hem halatı yıpratır hem de vinç tamburunda düzensiz sarıma yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Roller dönmüyorsa",
              text: `Sıkışmış (dönmeyen) bir roller fairlead, halatı sürtünmeyle keser. Roller'ların serbest dönüşü düzenli kontrol edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Muayene",
      sections: [
        {
          subheading: "3.1 Donanım muayenesi",
          paragraphs: [
            `Sabit donanımın muayenesi; kaynak bölgelerinde çatlak, korozyon ve deformasyon kontrolünü, roller yataklarının greslenmesini ve keskinleşmiş yüzeylerin düzeltilmesini kapsar. SWL etiketleri okunur durumda olmalıdır.`,
          ],
          bullets: [
            `Bitt/bollard kaynak ve güverte bağlantısı çatlak kontrolü`,
            `Fairlead/roller serbest dönüş ve gres`,
            `Keskin/oluklanmış yüzeylerin taşlanması`,
            `SWL marka ve renk kodlarının korunması`,
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Capstan halatı tutmuyor/kayıyor", "Tambur yağlı/aşınmış, tur az", "Tamburu temizle, tur sayısını artır"],
              ["Roller dönmüyor", "Yatak korozyonu/gres yok", "Sök-temizle-gresle veya değiştir"],
              ["Halatta hızlı aşınma", "Keskin köşe, kötü lead açısı", "Yüzey düzelt, donanım yerleşimi"],
              ["Bitt çevresinde çatlak", "Aşırı yük, yorulma", "NDT ve onarım kaynağı"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
