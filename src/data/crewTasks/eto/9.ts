import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "VSAT ve uydu haberleşme sistemleri bakımı",
  roleSlug: "eto",
  taskIndex: 9,
  estimatedPages: 26,
  intro: `Modern gemilerde VSAT (Very Small Aperture Terminal) uydu haberleşmesi; operasyonel iletişim, seyir verisi, şirket raporlaması ve mürettebat refahı (internet) için omurga niteliğindedir. Elektro-Teknik Zabit (ETO); VSAT anteni ve stabilizasyon sistemi, modem/router/ağ anahtarları, gemi LAN/WLAN yönetimi, yedek bağlantı (Inmarsat, MF/HF) geçişi ve IT/siber güvenlik politikasının uygulanmasından sorumludur. Bu bölüm, ISM Code siber risk yönetimi gereklilikleri çerçevesinde uydu ve ağ sistemlerinin güvenilir işletimini ve arıza yönetimini somut prosedürlerle anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "IMO Resolution MSC-FAL.1/Circ.3 — Maritime cyber risk management",
    "IMO Resolution MSC.428(98) — cyber risk in safety management",
    "SOLAS Chapter IV — Radiocommunications (GMDSS yedek bağlamı)",
    "ITU-R / IMO — uydu haberleşme tahsis ve standartları",
    "BIMCO/ISO — Guidelines on Cyber Security Onboard Ships",
    "ISO/IEC 27001 — bilgi güvenliği yönetim sistemi (referans)",
    "VSAT/uydu servis sağlayıcı (OEM) bakım el kitapları",
  ],
  chapters: [
    {
      heading: "1. VSAT ve Gemi Haberleşme Mimarisi",
      lead: `Bir geminin bağlantısı, anten-modem-ağ-kullanıcı zincirinden oluşan katmanlı bir sistemdir. ETO bu zincirin her halkasını ve yedekleme mantığını bilmelidir.`,
      sections: [
        {
          subheading: "1.1 VSAT zinciri ve frekans bantları",
          paragraphs: [
            `VSAT sistemi; stabilize bir anten (ADE - Above Deck Equipment), kablolama, modem (BDE - Below Deck Equipment), router ve gemi ağına bağlanan switch'lerden oluşur. Uydu bağlantısı Ku-band veya Ka-band üzerinden yapılır; Ka-band daha yüksek hız sunar ancak yağmur sönümlemesine (rain fade) daha duyarlıdır. ETO, kullanılan bandı, hub/teleport'u ve servis planını bilir.`,
            `Anten, geminin yalpa/baş-kıç vurması (pitch/roll/yaw) sırasında uyduya kilitli kalmak için stabilizasyon (gyro/sensör tabanlı) ve uydu izleme (tracking) mekanizması içerir. ETO, antenin pointing doğruluğunu, blockage (baca/direk gölgesi) bölgelerini ve skew/polarizasyon ayarını izler.`,
          ],
          bullets: [
            `Anten (ADE): stabilizasyon + uydu izleme mekanizması`,
            `Modem (BDE): uydu link'i, IP yönlendirme`,
            `Router/firewall: ağ trafiği yönetimi, güvenlik`,
            `Switch/AP: gemi LAN ve WLAN dağıtımı`,
            `Yedek: Inmarsat FleetBroadband, MF/HF, GSM (limanda)`,
          ],
        },
        {
          subheading: "1.2 Sinyal kalitesi göstergeleri",
          paragraphs: [
            `ETO, link sağlığını anahtar metriklerle izler: sinyal seviyesi (signal strength), SNR/Es/No (sinyal-gürültü oranı), Tx/Rx data hızı ve packet loss. Düşen SNR; anten pointing kayması, hava (rain fade), blockage veya hub sorununu işaret eder. Bu metrikler modem web arayüzünden ve servis sağlayıcı portalından takip edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Baseline değerleri kaydedin",
              text: `Sistem iyi çalışırken sinyal seviyesi, SNR ve veri hızlarının baseline (normal) değerlerini kaydedin. Bir arıza anında mevcut değerleri baseline ile karşılaştırmak, sorunun antende mi, havada mı yoksa hub'da mı olduğunu hızlı ayırt etmeyi sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Anten ve Stabilizasyon Sistemi Bakımı",
      sections: [
        {
          subheading: "2.1 Stabilizasyon mekanizması ve izleme",
          paragraphs: [
            `Anten stabilizasyonu; jiroskoplar/IMU, motorlar (azimuth, elevation, cross-level) ve kontrol kartı ile gemi hareketini kompanse eder. ETO, motorların ve kayışların/dişlilerin sağlığını, jiro/sensör kalibrasyonunu ve antenin uyduyu kaybetmeden izlediğini kontrol eder. Aşınmış kayış veya arızalı motor, gemi hareketinde sinyal kaybına yol açar.`,
            `Antenin radome (koruyucu kubbe) bütünlüğü kritiktir; çatlak veya sızdıran radome içeri nem ve tuz alır, elektronik korozyona ve sinyal kaybına yol açar. ETO, radome conta ve cıvatalarını, dome iç nemini (kurutucu/heater varsa) periyodik kontrol eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Antende çalışma güvenliği",
              text: `Anten genellikle yüksek bir mevkide ve radyo frekans (RF) yayını yapan bir cihazdır. Bakım öncesi anten transmit modu kapatılmalı (RF maruziyet riski), yüksekte çalışma izni ve emniyet kemeri kullanılmalı, hareketli anten mekanizmasına karşı LOTO uygulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Kablolama, konnektör ve RF kayıpları",
          paragraphs: [
            `ADE-BDE arası RF/IF kabloları ve konnektörleri, deniz ortamında korozyon ve nem nedeniyle sinyal kaybı (insertion loss) yaratabilir. ETO, konnektör bağlantılarını, su yalıtımını ve kablo bütünlüğünü kontrol eder. Korozyonlu bir konnektör, kademeli sinyal düşüşünün sık görülen ve gözden kaçan nedenidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Modem, Router ve Ağ Ekipmanı",
      sections: [
        {
          subheading: "3.1 Modem (BDE) konfigürasyonu ve firmware",
          paragraphs: [
            `Modem, uydu link'ini kurar ve IP trafiğini yönetir; konfigürasyonu (uydu/transponder ayarları, IP planı, QoS) servis sağlayıcı tarafından sağlanır. ETO, modem konfigürasyonunu yedekler, firmware güncellemelerini kontrollü uygular ve modem log'larını arıza teşhisinde kullanır. Yanlış konfigürasyon link kaybına yol açar.`,
          ],
        },
        {
          subheading: "3.2 Router, switch ve QoS yönetimi",
          paragraphs: [
            `Gemi router'ı; operasyonel trafiği (köprü, makine, şirket) mürettebat internetinden ayırır ve sınırlı uydu bant genişliğini QoS (Quality of Service) ile önceliklendirir. ETO, kritik operasyonel trafiğin (raporlama, seyir verisi, e-posta) mürettebat akışına önceliklendirildiğini ve bant genişliği kotalarının uygulandığını yönetir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Bant genişliği tükenmesi",
              text: `Bir gemide mürettebat video akışı tüm uydu bant genişliğini tüketince operasyonel e-posta ve raporlama yavaşladı. Çözüm: QoS ile operasyonel VLAN'a öncelik verildi ve mürettebat ağına kota uygulandı. Ders: ağ segmentasyonu ve QoS hem performans hem güvenlik için şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Gemi Ağı (LAN/WLAN) Yönetimi",
      sections: [
        {
          subheading: "4.1 Ağ segmentasyonu ve VLAN'lar",
          paragraphs: [
            `Güvenli bir gemi ağı, fonksiyonlara göre segmentlere (VLAN) ayrılır: OT (köprü/makine kontrol), operasyonel IT (şirket/idari), mürettebat refah ağı ve misafir/yolcu ağı. ETO, bu segmentlerin birbirinden izole olduğunu ve aralarındaki geçişin firewall kurallarıyla kontrol edildiğini sağlar. Düz (flat) bir ağ, bir bölgedeki ihlalin tüm gemiye yayılmasına yol açar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Segmentasyon = sınırlama (containment)",
              text: `Ağ segmentasyonu, bir siber olayın etki alanını sınırlamanın en temel ve etkili yöntemidir. Mürettebat refah ağı, kritik OT sistemlerinden (ECDIS, propulsion control) mutlaka izole olmalı; bu, BIMCO siber güvenlik rehberlerinin temel önerisidir.`,
            },
          ],
        },
        {
          subheading: "4.2 WLAN güvenliği ve erişim kontrolü",
          paragraphs: [
            `WLAN (kablosuz ağ), kapsama ve güvenlik dengesi gerektirir. ETO; güçlü şifreleme (WPA2/WPA3), güçlü parolalar, gizli/ayrılmış SSID'ler ve misafir ağ izolasyonu uygular. Erişim noktalarının firmware'i güncel tutulur ve yetkisiz cihaz/erişim noktası (rogue AP) taraması yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Siber Güvenlik ve OT Koruması (ISM Bağlamı)",
      sections: [
        {
          subheading: "5.1 ISM Code siber risk yönetimi gereksinimleri",
          paragraphs: [
            `IMO Resolution MSC.428(98) ile geminin Güvenlik Yönetim Sistemi (SMS) siber risk yönetimini içermek zorundadır; MSC-FAL.1/Circ.3 ise riskleri tanımla-koru-tespit et-müdahale et-toparlan çerçevesini önerir. ETO, gemideki teknik siber kontrollerin uygulayıcısıdır: erişim kontrolü, güncelleme yönetimi, izleme ve olay müdahalesi.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MSC.428(98) & MSC-FAL.1/Circ.3",
              text: `Siber risk yönetimi, SMS'in zorunlu bir parçasıdır ve denetlenir. ETO, teknik kontrolleri (segmentasyon, USB kontrolü, güncelleme, log izleme) uygular ve siber olay müdahale planının teknik adımlarını yürütür.`,
            },
          ],
        },
        {
          subheading: "5.2 USB/taşınabilir medya ve güncelleme yönetimi",
          paragraphs: [
            `Taşınabilir medya (USB), gemiye zararlı yazılım girişinin en sık yoludur; özellikle servis teknisyeni laptopları ve harita güncelleme medyası risklidir. ETO, USB kullanımını politikayla sınırlar, kiosk/scanner ile tarama uygular ve OT sistemlerinde yetkisiz medyayı engeller. Firmware/yazılım güncellemeleri, kaynağı doğrulanmış ve mümkünse test edilmiş şekilde kontrollü uygulanır.`,
            `ETO, kritik sistemlerin yedeklerini (konfigürasyon, ECDIS harita, otomasyon parametreleri) düzenli alır; bir siber olay veya arıza sonrası hızlı toparlanmanın (recovery) anahtarı güncel yedeklerdir. Yedekler ağdan ayrı (offline) tutulur ki fidye yazılımından etkilenmesin.`,
          ],
          table: {
            caption: `Temel Siber Güvenlik Kontrolleri (ETO uygulaması)`,
            headers: ["Kontrol", "Amaç", "Uygulama"],
            rows: [
              ["Ağ segmentasyonu", "Olay sınırlama", "VLAN + firewall kuralları"],
              ["USB kontrolü", "Zararlı yazılım girişi engelleme", "Politika + tarama kiosk"],
              ["Erişim kontrolü", "Yetkisiz erişim engelleme", "Güçlü parola, rol bazlı yetki"],
              ["Güncelleme yönetimi", "Açıkları kapatma", "Doğrulanmış, kontrollü update"],
              ["Yedekleme (offline)", "Hızlı toparlanma", "Düzenli, ağdan ayrı yedek"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Yedek Bağlantı ve GMDSS Koordinasyonu",
      sections: [
        {
          subheading: "6.1 Yedek bağlantı geçiş prosedürleri",
          paragraphs: [
            `VSAT kesildiğinde, gemi alternatif bağlantıya geçer: Inmarsat FleetBroadband/Fleet Xpress (L-band, yağmura dayanıklı ama düşük hız), limanlarda GSM/4G ve acil durumda MF/HF. ETO, otomatik failover (least-cost/least-priority routing) yapılandırmasını yönetir ve manuel geçiş prosedürünü bilir; kritik operasyonel trafiğin kesintisiz devamı önceliktir.`,
          ],
        },
        {
          subheading: "6.2 GMDSS ile sınır ve koordinasyon",
          paragraphs: [
            `VSAT bir konfor/operasyonel sistem olsa da, GMDSS (can güvenliği haberleşmesi) ayrı, zorunlu ve sınıf onaylı bir sistemdir. ETO, VSAT bakımının GMDSS'i etkilememesini sağlar; GMDSS ekipmanının resmi bakımı genellikle telsiz operatörü/sertifikalı servis kapsamındadır, ancak ETO besleme ve anten altyapısında destek sağlar. İki sistemin sınırları net tutulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "VSAT ≠ GMDSS",
              text: `VSAT internet/operasyonel bağlantıdır; can güvenliği haberleşmesi GMDSS'e aittir. VSAT arızası bir acil durum değildir ama uzun kesinti operasyonel raporlamayı etkiler. GMDSS'in bağımsız ve her zaman çalışır durumda olması ayrı bir zorunluluktur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Arıza Teşhisi ve Servis Koordinasyonu",
      sections: [
        {
          subheading: "7.1 Sistematik arıza ayırma (troubleshooting)",
          paragraphs: [
            `Bir bağlantı kesintisinde ETO, sorunu katman katman daraltır: kullanıcı cihazı mı, gemi ağı/switch mi, router/firewall mı, modem mi, yoksa uydu link'i (anten/hava/hub) mi? Ping/traceroute, modem sinyal göstergeleri ve servis portalı kullanılarak arıza lokalize edilir. Sistematik yaklaşım, gereksiz müdahaleyi ve servis maliyetini önler.`,
          ],
        },
        {
          subheading: "7.2 Servis sağlayıcı ile teknik koordinasyon",
          paragraphs: [
            `Uydu hub'ı, beam tahsisi veya hesap sorunları geminin müdahale alanı dışındadır; ETO bu durumlarda servis sağlayıcıyla koordineli çalışır. ETO, sinyal değerlerini, log'ları ve yapılan adımları net iletir; bu, uzaktan teşhisi hızlandırır. Gerekirse remote support ile birlikte modem konfigürasyonu güncellenir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 VSAT ve ağ kontrol listesi",
          bullets: [
            `Anten sinyal seviyesi/SNR baseline ile uyumlu mu?`,
            `Stabilizasyon motorları, jiro ve radome bütünlüğü sağlam mı?`,
            `RF konnektörler korozyonsuz, su yalıtımı tam mı?`,
            `Modem konfigürasyonu yedeklendi, firmware güncel mi?`,
            `Router QoS ve bant genişliği önceliklendirmesi doğru mu?`,
            `Ağ VLAN segmentasyonu ve firewall kuralları uygulanıyor mu?`,
            `WLAN şifreleme/parola güçlü, rogue AP taraması yapıldı mı?`,
            `USB kontrolü, güncelleme ve offline yedekleme disiplini işliyor mu?`,
            `Yedek bağlantı (Inmarsat/MF-HF) failover test edildi mi?`,
            `GMDSS'in VSAT'tan bağımsızlığı ve sürekliliği teyit edildi mi?`,
          ],
          paragraphs: [
            `VSAT ve ağ yönetimi, ETO'nun rolünü geleneksel elektrikten modern IT/siber güvenliğe taşıyan alandır. Başarı; kesintisiz operasyonel bağlantı, gizliliği ve bütünlüğü korunan bir gemi ağı ve siber bir olayın etkisini sınırlayan sağlam segmentasyonla ölçülür. ETO, bu görünmez altyapıyı sağlıklı tutarak hem geminin dünyayla bağını hem de kritik kontrol sistemlerinin güvenliğini güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
