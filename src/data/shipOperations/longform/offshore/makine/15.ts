import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate IO ünitesi, yedekli çift ağ ve control-power mimarisi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 15,
  estimatedPages: 20,
  intro: `Bridge Mate mimarisinin ayırt edici unsuru, DP gemileri için özel tasarlanmış bağımsız IO ünitesidir. Bu üniteler ekipmanın yanına yerleştirilerek kablolamayı azaltır; ancak yedekliliğin gerçekten var olup olmadığı, ünitelerin gruplandırılmasına, ağ kollarının güzergâhına ve control power beslemesinin bağımsızlığına bağlıdır. Bu bölüm, makine tarafında bu üç katmanın nasıl doğrulandığını ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate JX / DP 0 Brochure (MT-SAL-0005 v2.0)",
    "IMCA M103",
    "IMCA M166 (FMEA Management)",
    "Vessel FMEA ve tek hat şemaları",
  ],
  chapters: [
    {
      heading: "1. Dağıtık IO Ünitesi",
      sections: [
        {
          subheading: "1.1 Konsept",
          paragraphs: [
            `Dağıtık operatör istasyonları ve DP kontrol bilgisayarlarına ek olarak, Bridge Mate sistemi DP gemilerinde kullanılmak üzere özel tasarlanmış bağımsız bir IO ünitesine dayanan dağıtık itici ve sensör arayüz üniteleri içerir. Her arayüz ünitesi, arayüzlenecek iticilerin, referans sistemlerinin ve sensörlerin yakınına yerleştirilebilir.`,
            `JX ve DP 0 sistemlerinde de aynı düzen geçerlidir: IO donanımı, arayüzlendiği itici, dümen, makine ve sensörlerin yakınına konularak kablolama ve montaj maliyetleri düşürülür.`,
          ],
        },
        {
          subheading: "1.2 Sınıfa göre IO dağılımı",
          table: {
            headers: ["Seviye", "IO düzeni"],
            rows: [
              ["DP 1", "Sensör, PRS, güç kaynağı ve iticiler için ayrı üniteler"],
              ["DP 2", "Her sensör seti, her PRS, güç kaynağı ve her itici için ayrı ünite"],
              ["DP 3", "Bileşen arayüzü için üç set; biri ayrı yangına dayanıklı kompartımanda"],
            ],
          },
        },
        {
          subheading: "1.3 Yoğunlaşma riski",
          callouts: [
            {
              type: "warning",
              title: "Az kablo, yoğun ünite",
              text: `Kablolamanın azalması, aynı IO ünitesine bağlı ekipmanlarda yoğunlaşma yaratır. Bir ünitenin kaybının hangi ekipman grubunu düşüreceği tek tek değerlendirilmeli ve FMEA'deki yedek grup sınırlarıyla karşılaştırılmalıdır.`,
            },
          ],
          bullets: [
            `IO ünitesi–ekipman tahsis listesi güncel tutulur`,
            `Her ünitenin ait olduğu yedek grup belgelidir`,
            `Ünite kaybı senaryosu FMEA testlerinde kanıtlanır`,
            `Aynı üniteye bağlı iki "yedek" sensör gerçek yedeklilik sayılmaz`,
          ],
        },
      ],
    },
    {
      heading: "2. Yedekli Çift Ağ",
      lead: `DP 2 konfigürasyonunda tüm modüller yedekli, çift bir ağ üzerinden birbirine bağlanır. Bu yedekliliğin gerçek olması, kolların fiziksel ayrımına bağlıdır.`,
      sections: [
        {
          subheading: "2.1 Fiziksel ayrım",
          paragraphs: [
            `İki ağ kolunun fiziksel olarak ayrı güzergâhtan geçtiği ve tek bir yangın veya su basması olayında birlikte kaybedilmediği doğrulanmalıdır. Bu, çift ağ yedekliliğinin kâğıt üzerinde mi yoksa sahada mı var olduğunu belirleyen temel kontroldür.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aynı kanaldan geçen çift ağ",
              text: `Ağ kollarının aynı kablo kanalından geçmesi, çift ağ yedekliliğini kâğıt üzerinde bırakır. Tek bir yangın, su veya mekanik hasar iki kolu birden koparır ve sistem tasarlanan yedekliliğe sahip olmaz.`,
            },
          ],
          bullets: [
            `İki kolun güzergâhı ayrı mı, plan üzerinde izlendi mi?`,
            `Ortak geçiş noktaları (penetrasyon, kanal) tespit edildi mi?`,
            `Yangın bölmesi geçişlerinde ayrım korunuyor mu?`,
            `Kol kaybı testi yapıldı ve sonucu kayıtlı mı?`,
          ],
        },
        {
          subheading: "2.2 Değişiklik yönetimi",
          paragraphs: [
            `Ağ switch'i, IP adresleme ve konfigürasyon değişiklikleri kontrollü değişiklik yönetimi altında tutulmalıdır. Küçük görünen bir switch değişimi, farkında olunmadan iki kolu tek bir cihaza bağımlı hale getirebilir.`,
          ],
          bullets: [
            `Değişiklik talebi yazılı ve onaylı mı?`,
            `Etkilenen yedek grup analiz edildi mi?`,
            `Değişiklik sonrası FMEA etkisi değerlendirildi mi?`,
            `Topoloji çizimi güncellendi mi?`,
            `Yazılım/firmware sürümü kayda alındı mı?`,
          ],
        },
      ],
    },
    {
      heading: "3. Control Power ve UPS",
      sections: [
        {
          subheading: "3.1 Bağımsızlık",
          paragraphs: [
            `DP bilgisayarları, operatör istasyonları, konum referans sistemleri ve sensörlerin kesintisiz ve birbirinden bağımsız control power kaynakları doğrulanmalıdır. Bridge Mate mimarisinde her IO ünitesinin besleme kaynağı, tek hat şemasından çıkarılarak yedek gruplarla eşleştirilir.`,
          ],
          bullets: [
            `Her IO ünitesinin besleme kaynağı belgeli mi?`,
            `Besleme, ünitenin ait olduğu yedek grupla tutarlı mı?`,
            `İki yedek grup arasında gizli besleme köprüsü var mı?`,
            `UPS çıkış devreleri ayrı ve etiketli mi?`,
          ],
        },
        {
          subheading: "3.2 Batarya otonomisi",
          callouts: [
            {
              type: "warning",
              title: "Beyan edilen otonomi",
              text: `UPS batarya kapasitesi gerçek yük altında test edilmeden, beyan edilen otonomi süresi güvenilir değildir. Yaşlanmış bataryalar etiket değerinin çok altında süre verebilir ve blackout sonrası kontrol sistemini erken kaybettirir.`,
            },
          ],
          bullets: [
            `Deşarj testi periyodu PMS'de tanımlı mı?`,
            `Test gerçek yükle mi yapılıyor?`,
            `Ölçülen süre gereksinimi karşılıyor mu?`,
            `Batarya değişim tarihi ve seri numarası kayıtlı mı?`,
          ],
        },
        {
          subheading: "3.3 Blackout senaryosunda davranış",
          paragraphs: [
            `Kısmi veya tam blackout sırasında DP kontrol katmanının ayakta kalması, kontrollü recovery'nin ön koşuludur. Kontrol sistemi güç kaybederse, güç geri geldiğinde sistem yeniden başlatma süresi kadar daha kör kalınır ve mevki kaybı büyür.`,
          ],
          bullets: [
            `Blackout'ta hangi DP bileşeni ne kadar süre ayakta kalır?`,
            `Yeniden başlatma sırası ve süresi belgeli mi?`,
            `Recovery sonrası PRS ve sensör geri alma sırası tanımlı mı?`,
            `Senaryo yıllık trials kapsamında test edildi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
