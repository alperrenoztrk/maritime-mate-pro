import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Konşimento (Bill of Lading) imza yetkisi ve yük belgeleri",
  roleSlug: "kaptan",
  taskIndex: 12,
  estimatedPages: 24,
  intro: `Konşimento (Bill of Lading — B/L), denizcilik ticaretinin en kritik belgelerinden biridir: yükün teslim alındığının makbuzu, taşıma sözleşmesinin delili ve çoğu zaman malın mülkiyetini temsil eden kıymetli evraktır. Kaptanın B/L imzası şirketi hukuken bağlar; bu yüzden yükün miktarı ve görünür durumu (apparent order and condition) doğrulanmadan, şüpheli yük "clause" edilmeden imza atılmaz. Bu bölüm B/L ve ilgili yük belgelerini, kaptanın yetkisini ve riskleri ele alır.`,
  sources: [
    "Hague-Visby Rules — taşıyanın sorumluluk rejimi",
    "Deniz ticaret hukuku — Bill of Lading pratiği",
    "SOLAS Chapter VI — cargo information / VGM",
    "P&I Club kuralları — B/L ve letter of indemnity riskleri",
    "Mate's Receipt, NOR, Statement of Facts pratiği",
  ],
  chapters: [
    {
      heading: "1. Konşimentonun Üç İşlevi",
      sections: [
        {
          subheading: "1.1 Makbuz, sözleşme, kıymetli evrak",
          paragraphs: [
            `B/L üç temel işlev taşır: (1) yükün belirtilen durum ve miktarda teslim alındığının makbuzu, (2) taşıma sözleşmesinin delili, (3) malın teslimini temsil eden, ciro edilebilir kıymetli evrak. Bu üçlü işlev, B/L'yi imzalayan kaptanın beyanını son derece bağlayıcı kılar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İmza = beyan",
              text: `Clean B/L imzalamak, "yükü iyi ve belirtilen durumda aldım" beyanıdır. Yük gerçekte hasarlıysa, bu beyan taşıyanı (ve gemiyi) zarardan sorumlu kılabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İmza Öncesi Doğrulama",
      sections: [
        {
          subheading: "2.1 Apparent order and condition",
          paragraphs: [
            `Kaptan, B/L imzalanmadan önce yükün miktar ve görünür durumunun belgelere uygunluğunu kontrol ettirir. Birinci Zabit ve tally kayıtları, draft survey/ullage ölçümleri ve Mate's Receipt bu doğrulamanın temelidir. Görünür hasar, eksiklik veya uygunsuzluk varsa B/L "clause" edilir (kayıt düşülür).`,
          ],
          bullets: [
            `Miktar: tally / draft survey / ullage`,
            `Görünür durum: hasar, ıslaklık, kontaminasyon`,
            `Marka ve tanım uygunluğu`,
            `VGM ve gerekli yük bilgisi mevcut mu?`,
          ],
        },
        {
          subheading: "2.2 Clean vs claused B/L",
          paragraphs: [
            `Görünür kusur yoksa "clean" B/L imzalanır. Kusur varsa B/L üzerine durum yazılarak (claused/dirty) gerçek hâl belgelenir. Hasarlı yükü clean göstermek için baskı yapılması, ciddi bir hukuki ve etik tuzaktır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Letter of Indemnity tuzağı",
              text: `Hasarlı/şüpheli yük için "clean B/L imzala, biz tazmin ederiz" diyen Letter of Indemnity (LOI) genellikle P&I teminatı dışındadır ve hile sayılabilir. Kaptan gerçeği yansıtan B/L'den taviz vermez; LOI baskısında şirket/P&I'a danışır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Mate's Receipt ve B/L İlişkisi",
      sections: [
        {
          subheading: "3.1 Belge zinciri",
          paragraphs: [
            `Mate's Receipt, yükün gemiye fiilen alındığını ve kondisyonunu belgeleyen dahili kayıttır; B/L bu makbuza dayanarak düzenlenir. Mate's Receipt'teki "remark"lar (hasar notları), B/L'ye yansıtılmalıdır. Kaptan, bu zincirin tutarlı olduğunu denetler.`,
          ],
        },
      ],
    },
    {
      heading: "4. Diğer Yük Belgeleri",
      sections: [
        {
          subheading: "4.1 NOR, SOF, Manifest",
          paragraphs: [
            `Kaptan; Notice of Readiness (NOR — geminin yüke/boşaltmaya hazır olduğu bildirimi, laytime sayacını başlatır), Statement of Facts (SOF — operasyon zaman çizelgesi), Cargo Manifest ve ilgili gümrük belgelerini onaylar veya yetkilendirir. Bu belgeler demurrage ve ticari anlaşmazlıklarda delildir.`,
          ],
          table: {
            caption: "Başlıca yük belgeleri ve işlevi",
            headers: ["Belge", "İşlev"],
            rows: [
              ["Bill of Lading", "Makbuz + sözleşme + kıymetli evrak"],
              ["Mate's Receipt", "Yük teslim ve kondisyon kaydı"],
              ["NOR", "Hazır olma bildirimi, laytime başlangıcı"],
              ["Statement of Facts", "Operasyon zaman çizelgesi"],
              ["Cargo Manifest", "Resmi yük listesi (gümrük/liman)"],
            ],
          },
        },
        {
          subheading: "4.2 İmza yetkisinin devri",
          paragraphs: [
            `Bazı durumlarda B/L'yi acente "for and on behalf of the Master" imzalar; bu yetki ancak kaptanın/şirketin onayıyla ve verilen talimat çerçevesinde kullanılabilir. Kaptan, kendi adına imzalanan belgelerin doğruluğundan sorumludur.`,
          ],
        },
      ],
    },
    {
      heading: "5. Riskler ve Hile",
      sections: [
        {
          subheading: "5.1 Sahtecilik ve yanlış beyan",
          paragraphs: [
            `B/L'de tarih değiştirme (ante/post-dating), yanlış miktar/durum beyanı veya sahte belge düzenlenmesi ağır hukuki sonuçlar doğurur ve sigorta teminatını geçersiz kılabilir. Kaptan, ticari baskıya rağmen yalnızca gerçeği yansıtan belgeye imza atar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Yanlış tarihli B/L",
              text: `Yükleme penceresine sığdırmak için B/L'yi geriye tarihlemek (ante-dating) hiledir; ortaya çıktığında hem ticari hem cezai sorumluluk ve teminat kaybı getirir. Kısa vadeli kolaylık, uzun vadeli büyük risktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 B/L imza kontrolü",
          bullets: [
            `Yük miktarı (tally/draft) ve görünür durumu doğrulandı mı?`,
            `Mate's Receipt remark'ları B/L'ye yansıdı mı?`,
            `Hasar/şüphe varsa B/L clause edildi mi?`,
            `VGM ve gerekli yük bilgisi mevcut mu?`,
            `LOI baskısı varsa şirket/P&I'a danışıldı mı?`,
            `Tarih ve miktar gerçeğe uygun mu (ante/post-dating yok)?`,
            `NOR/SOF/Manifest tutarlı ve onaylı mı?`,
          ],
          paragraphs: [
            `Bill of Lading, kaptanın imzasının doğrudan şirketi bağladığı en ağır ticari belgedir. Yükü doğrulamadan, gerçeği clause etmeden ve baskıya teslim olmadan atılan dürüst bir imza; geminin hem ticari hem hukuki güvenliğini korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
