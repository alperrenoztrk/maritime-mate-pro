import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Anchor watch ve mooring watch nöbeti",
  roleSlug: "ustagemici",
  taskIndex: 10,
  estimatedPages: 22,
  intro: `Demirde (anchor) veya limanda bağlı (moored) iken gemi hareketsiz görünse de tehlike sürer: demir tarayabilir (dragging), halatlar gelgit/swell ile aşırı gerilebilir, çevre trafiği yaklaşabilir ve hava bozabilir. Usta gemici, anchor watch ve mooring watch nöbetinde belirli aralıklarla pozisyon, hava, trafik ve halat/demir durumunu kontrol eder, köprüüstüne raporlar ve drag anchor belirtilerini erken yakalar. Bu bölüm anchor/mooring watch nöbetini ele alır.`,
  sources: [
    "STCW — anchor/mooring watchkeeping",
    "COLREG — demirli/kısıtlı gemi kuralları ve fenerleri",
    "Code of Safe Working Practices (COSWP) — mooring",
    "OCIMF MEG4 — mooring güvenliği",
    "Şirket SMS — anchor watch prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Neden Nöbet Sürer?",
      sections: [
        {
          subheading: "1.1 Hareketsiz ama tehlikeli",
          paragraphs: [
            `Demirde veya rıhtımda gemi "park edilmiş" gibi görünse de, demir tarayabilir, halat kopabilir veya çevre koşulları aniden değişebilir. Anchor/mooring watch, bu sessiz tehlikeleri erken yakalamak için sürdürülen aktif bir gözetimdir. Usta gemici bu nöbetin ciddiyetini bilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Demir tarama (dragging)",
              text: `Tarayan bir demir, gemiyi sığlığa, başka bir gemiye veya kıyıya sürükleyebilir. Erken tespit (pozisyon değişimi, zincirde sarsıntı) felaketi önler; bu yüzden nöbet asla gevşetilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Anchor Watch Görevleri",
      sections: [
        {
          subheading: "2.1 Düzenli kontroller",
          paragraphs: [
            `Usta gemici belirli aralıklarla pozisyonu (köprüüstü göstergesi/transit/landmark), hava ve deniz durumunu, çevre trafiğini ve demir zincirinin gerginlik/yönünü kontrol eder ve köprüüstüne raporlar. Anormallik (pozisyon kayması, zincirde ani sarsıntı, yaklaşan gemi) derhal bildirilir.`,
          ],
          bullets: [
            `Pozisyon kontrolü (transit/landmark/ECDIS)`,
            `Hava, rüzgâr, deniz ve görüş`,
            `Çevre trafiği ve yaklaşan gemiler`,
            `Demir zinciri gerginliği ve yönü`,
          ],
        },
        {
          subheading: "2.2 Drag anchor belirtileri",
          paragraphs: [
            `Demir tarama belirtileri; pozisyonun rüzgâr/akıntı yönünde kaymaya başlaması, zincirin uzun gergin-sonra-gevşek (jerk) hareketi ve geminin beklenenden farklı salınımıdır. Usta gemici bu işaretleri tanır ve hemen köprüüstüne haber verir; gecikme telafisi olmayan sonuçlar doğurur.`,
          ],
          table: {
            caption: "Drag belirtisi → aksiyon",
            headers: ["Belirti", "Aksiyon"],
            rows: [
              ["Pozisyon kayması", "Köprüüstüne derhal rapor"],
              ["Zincirde jerk/sarsıntı", "Rapor, gözlemi sıklaştır"],
              ["Yaklaşan trafik", "Rapor, gözetim artır"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Mooring Watch Görevleri",
      sections: [
        {
          subheading: "3.1 Halat durumu ve gelgit",
          paragraphs: [
            `Limanda bağlı iken usta gemici halatların gerginliğini izler; gelgit (tide) ve swell halatları aşırı gerebilir veya gevşetebilir. Aşırı gergin halatlar, snap-back bölgesinden uzak durarak ve güvenli biçimde gevşetilir/ayarlanır. Gevşeyen halatlar gemiyi rıhtımdan açabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gelgiti önceden hesapla",
              text: `Yükselen/alçalan gelgit, saatler içinde halat gerginliğini büyük ölçüde değiştirir. Gelgit tablosuna göre halat ayarını önceden planlamak, ani aşırı gerginliği önler.`,
            },
          ],
        },
        {
          subheading: "3.2 Gangway ve çevre güvenliği",
          paragraphs: [
            `Mooring watch sırasında gangway güvenliği, yetkisiz giriş ve rıhtım/çevre durumu da gözetilir. Usta gemici, anormal bir durumu (halat aşınması, yangın, sızıntı, izinsiz kişi) köprüüstüne bildirir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Güvenlik: Snap-back",
      sections: [
        {
          subheading: "4.1 Gergin halatla çalışma",
          paragraphs: [
            `Halat ayarlarken usta gemici gergin hat üzerinde/önünde durmaz; snap-back bölgesinden uzak, kaçış yolu olan bir noktada konumlanır. KKD giyilir ve ani gerginlik değişimlerine karşı dikkatli olunur. Gergin halatla acele etmek ölümcül kazaya yol açabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kopan halat kırbaç gibidir",
              text: `Gergin bir halat koptuğunda büyük bir enerjiyle geri savrulur ve önündeki kişiyi öldürebilir. Halat ayarı her zaman snap-back bölgesinden uzak ve dikkatli yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Raporlama ve Kayıt",
      sections: [
        {
          subheading: "5.1 Köprüüstüne bildirim",
          paragraphs: [
            `Usta gemici, düzenli kontrollerini ve her anormalliği köprüüstüne net biçimde raporlar. Acil durumda (drag, kopma, yangın, yaklaşan tehlike) alarm verir. Doğru ve zamanında bildirim, nöbetin tüm değerini belirler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Anchor/mooring watch kontrolü",
          bullets: [
            `Pozisyon belirli aralıkla kontrol edilip raporlanıyor mu?`,
            `Hava, deniz ve çevre trafiği izleniyor mu?`,
            `Demir zinciri/ halat gerginliği ve durumu kontrol ediliyor mu?`,
            `Drag anchor belirtileri tanınıyor ve hemen bildiriliyor mu?`,
            `Gelgit/swell'e göre halat ayarı planlandı mı?`,
            `Halat ayarı snap-back bölgesinden uzak ve KKD ile mi yapılıyor?`,
            `Anormallikler köprüüstüne zamanında raporlanıyor mu?`,
          ],
          paragraphs: [
            `Anchor ve mooring watch, geminin hareketsiz göründüğü ama tehlikenin sürdüğü saatlerde emniyetin bekçisidir. Usta gemicinin düzenli kontrolleri, drag belirtilerini erken yakalaması ve snap-back bilinci; gemiyi demirde ve rıhtımda güvende tutar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
