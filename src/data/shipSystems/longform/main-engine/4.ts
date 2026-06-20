import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Dümen Sistemi ve Manevra",
  sectionId: "main-engine",
  topicIndex: 4,
  estimatedPages: 24,
  intro: `Dümen sistemi (steering gear), dümeni komut açısına çevirerek gemiye yön veren ve manevra kabiliyetini sağlayan emniyet-kritik makinedir. SOLAS, dümen donanımı için ana ve yardımcı (auxiliary) üniteler, hız ve açı gereksinimleri ile yedekli kontrol ister. Bu bölüm; dümen tiplerini (spade, semi-balanced, flap/Becker), hidrolik tahriki (ram/rotary vane), SOLAS performans gereksinimlerini (35°-35° süre, yedeklilik), kontrol ve geri besleme (telemotor/follow-up) sistemini, manevra etkilerini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-1 Reg. 29 & 30 — steering gear",
    "IACS UR — steering gear",
    "IMO performans testleri (rudder 35°-35° in 28 s)",
    "Üretici el kitapları (Rolls-Royce/Kongsberg, Frydenbø)",
  ],
  chapters: [
    {
      heading: "1. Dümen Tipleri ve Hidrolik Tahrik",
      sections: [
        {
          subheading: "1.1 Dümen tipleri",
          paragraphs: [
            `Dümen, dönme ekseni ile yüzey alanının dağılımına göre sınıflandırılır: dengeli (spade/balanced), yarı-dengeli (semi-balanced) ve dengesiz. Dengeli dümende eksen yüzeyi böler, böylece çevirme momenti (tork) azalır. Flap/Becker dümeni arka kanatçıkla yüksek yatma açısında ek kaldırma sağlar (yüksek manevra).`,
          ],
          bullets: [
            `Spade (dengeli): düşük tork, yaygın`,
            `Semi-balanced horn: korumalı, güçlü`,
            `Flap/Becker: yüksek manevra, liman gemileri`,
          ],
        },
        {
          subheading: "1.2 Hidrolik tahrik: ram ve rotary vane",
          paragraphs: [
            `Dümeni çeviren güç hidroliktir. Ram tipinde silindirler tiller'i (rudder kolu) iter; rotary vane tipinde rudder stock'a bağlı kanatlar basınçla döner. Pompalar (genelde değişken debili, iki adet) dümeni komut açısına sürer.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İki bağımsız güç ünitesi",
              text: `Tankerler ve büyük gemilerde iki bağımsız güç ünitesi şarttır; biri arızalansa diğeri dümeni çalıştırmaya devam eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. SOLAS Performans ve Yedeklilik",
      sections: [
        {
          subheading: "2.1 Hız ve açı gereksinimi",
          paragraphs: [
            `Ana dümen donanımı, gemi tam yüklü ve servis hızında iken dümeni bir bordadan 35°'den diğer bordada 30°'ye en fazla 28 saniyede çevirebilmelidir. Yardımcı donanım ise 15°-15°'yi 60 saniyede yapabilmelidir (yarı hızda). Bu kriterler manevra emniyetinin temelidir.`,
          ],
          table: {
            headers: ["Donanım", "Açı", "Süre", "Koşul"],
            rows: [
              ["Ana", "35° → 30°", "≤ 28 sn", "Tam yük, servis hızı"],
              ["Yardımcı", "15° → 15°", "≤ 60 sn", "Yarı hız (≥7 kn)"],
            ],
          },
        },
        {
          subheading: "2.2 Yedeklilik ve acil kontrol",
          paragraphs: [
            `Dümen kontrolü köprüden iki bağımsız sistemle yapılabilmeli; ana sistem arızasında köprüden yardımcıya geçilebilmeli ve dümen dairesinde yerel (acil) kontrol mevcut olmalıdır. Tankerlerde tek arızada dümen yeteneğinin sürmesi (single failure criteria) aranır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Manevra öncesi test",
              text: `SOLAS, limana giriş/çıkış ve dar suya girmeden önce (12 saat içinde) dümen donanımının test edilmesini ister; tüm güç üniteleri ve kontrol modları denenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol ve Manevra Etkileri",
      sections: [
        {
          subheading: "3.1 Telemotor ve follow-up",
          paragraphs: [
            `Köprüdeki dümen komutu, telemotor (eski hidrolik veya modern elektrik) ile dümen dairesine iletilir. Follow-up modda dümen komut açısında durur; non-follow-up modda buton basılı tutuldukça döner. Otopilot (autopilot) ise rota hatasına göre dümeni otomatik düzeltir.`,
          ],
        },
        {
          subheading: "3.2 Manevra etkileri",
          paragraphs: [
            `Dümen etkisi pervane akımına bağlıdır; pervane durunca dümen verimi düşer. Transverse thrust (pervane yan etkisi), pivot point ve advance/transfer gibi manevra parametreleri köprü ekibince bilinmelidir. Dümen açısı arttıkça stall (akım ayrılması) ve hız kaybı oluşur.`,
          ],
          bullets: [
            `Pervane akımı dümen etkisini güçlendirir`,
            `Aşırı açı = stall + hız kaybı`,
            `Pivot point dönüş davranışını belirler`,
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
            `Bakım; hidrolik yağ seviyesi/analizi, sızıntı kontrolü, ram/vane keçeleri, rudder stock yatağı ve carrier bearing, geri besleme bağlantısı ve emniyet/limit ayarlarını kapsar. Düzenli test ve alarm kontrolü zorunludur.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Dümen yavaş/yetersiz açı", "Pompa/basınç, hava", "Pompa kontrol, hidrolik purge"],
              ["Dümen komutu izlemiyor (hunting)", "Geri besleme/ayar", "Follow-up bağlantı/ayar"],
              ["Hidrolik sızıntı/seviye düşüşü", "Keçe/contalarda kaçak", "Keçe değişimi, kaçağı gider"],
              ["Köprü kontrolü yok", "Telemotor/elektrik", "Yardımcıya/yerel kontrole geç"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Acil müdahale",
              text: `Dümen donanımı köprüden yanıt vermezse derhal alternatif güç ünitesine/kontrol moduna geçilir ve gerekirse dümen dairesinde yerel kontrol uygulanır; köprü-makine iletişimi kritiktir.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
