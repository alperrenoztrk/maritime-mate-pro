import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "BNWAS (Bridge Navigational Watch Alarm System)",
  sectionId: "gmdss-lsa",
  topicIndex: 6,
  estimatedPages: 20,
  intro: `BNWAS (Bridge Navigational Watch Alarm System), köprüde nöbet tutan vardiya zabitinin uyanık ve görev başında olduğunu izleyen, zabit yanıt vermezse kademeli olarak kaptanı ve diğer zabitleri uyaran emniyet sistemidir; tek başına vardiyada uyuyakalma (incapacitation) kaynaklı kazaları önlemeyi hedefler. SOLAS bunu zorunlu kılar. Bu bölüm; BNWAS çalışma mantığını ve kademeli alarm zincirini, reset (dormant period) ve sensör girdilerini, operasyon modlarını (auto/manual/off) ve yetkilendirmeyi, otopilot ile ilişkisini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19 — BNWAS carriage",
    "IMO Res. MSC.128(75) — BNWAS performance",
    "Bridge Procedures Guide (ICS)",
    "Üretici el kitapları (BNWAS)",
  ],
  chapters: [
    {
      heading: "1. Çalışma Mantığı",
      sections: [
        {
          subheading: "1.1 Kademeli alarm zinciri",
          paragraphs: [
            `BNWAS belirli bir süre (dormant period, ayarlanabilir ~3-12 dk) boyunca zabitten bir reset (hareket/buton) bekler. Süre dolunca önce köprüde sesli/görsel uyarı verir; zabit yine yanıt vermezse kaptan ve yedek zabitlerin kamaralarında alarm çalar; en son tüm gemide genel uyarı verilebilir. Böylece zabitin durumu garanti altına alınır.`,
          ],
          table: {
            headers: ["Kademe", "Süre", "Aksiyon"],
            rows: [
              ["Dormant", "Ayarlı (3-12 dk)", "Sessiz, reset bekler"],
              ["Stage 1", "Süre sonu", "Köprüde uyarı (görsel→sesli)"],
              ["Stage 2", "+~15 sn", "Kaptan/yedek zabit kamarası"],
              ["Stage 3", "+~90 sn", "Gemi geneli ek personel"],
            ],
          },
        },
        {
          subheading: "1.2 Reset ve sensör",
          paragraphs: [
            `Reset, köprüdeki reset butonu veya hareket sensörleri (motion detector) ile yapılır; zabitin köprüde fiziksel varlığı algılanır. Reset köprü dışından yapılamaz; bu, başkasının uzaktan susturmasını önler.`,
          ],
        },
      ],
    },
    {
      heading: "2. Operasyon Modları",
      sections: [
        {
          subheading: "2.1 Auto, manual, off",
          paragraphs: [
            `BNWAS modları: Automatic (otopilot/seyirde otomatik devrede), Manual ON (sürekli açık) ve OFF. OFF ve dormant süre ayarı yalnızca kaptan yetkisindedir (şifre/anahtar korumalı); zabit keyfî kapatamaz. Genelde seyirde otomatik aktif olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Kaptan yetkisi",
              text: `BNWAS'ı kapatma ve dormant süre/modunu değiştirme yetkisi yalnızca kaptandadır; bu ayarlar şifre/anahtarla korunur ve keyfî değiştirilemez.`,
            },
          ],
        },
        {
          subheading: "2.2 Otopilot ilişkisi",
          paragraphs: [
            `BNWAS özellikle otopilotta (kimse aktif dümen tutmazken) önemlidir; çünkü zabit pasif izleme yaparken uyuyakalma riski artar. Sistem, otopilot devredeyken otomatik aktif olacak şekilde ayarlanabilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Bakım ve Arıza",
      sections: [
        {
          subheading: "3.1 Bakım ve test",
          paragraphs: [
            `Bakım; alarm kademelerinin fonksiyon testi, motion sensör/reset butonu, kamara alarm hoparlörleri ve güç beslemesi kontrolünü kapsar. Test, gerçek kademe zincirinin (köprü→kamara→gemi) çalıştığını doğrular.`,
          ],
          bullets: [
            `Kademeli alarm zinciri fonksiyon testi`,
            `Reset/motion sensör kontrolü`,
            `Kamara alarm hoparlör testi`,
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Kademe atlamıyor/çalmıyor", "Röle/hoparlör/kablo", "Kademe devresi testi"],
              ["Sürekli alarm/erken", "Dormant süre/sensör", "Süre ayarı, sensör kontrol"],
              ["Reset çalışmıyor", "Buton/motion sensör", "Buton/sensör değişimi"],
              ["Kapatılamıyor/açılamıyor", "Yetki/şifre", "Kaptan yetkisiyle ayar"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
