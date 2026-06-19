import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Cybersecurity ve OT (Operational Technology) yönetimi",
  roleSlug: "eto",
  taskIndex: 11,
  estimatedPages: 26,
  intro: `Geminin seyir, makine ve kargo kontrol sistemleri (ECDIS, AMS, IAS, propulsion ve cargo control) giderek dijitalleşmiş ve birbirine bağlı hale gelmiştir; bu, siber riski operasyonel bir güvenlik konusuna dönüştürür. Elektro-Teknik Zabit (ETO); IMO Resolution MSC.428(98) gereğince SMS içinde tanımlanan siber risk yönetiminin teknik uygulayıcısıdır. OT ağ segmentasyonu, USB/taşınabilir medya kontrolü, yazılım/firmware güncelleme yönetimi, erişim kontrolü, izleme ve olay müdahalesi (incident response) ETO'nun sorumluluğundadır. Bu bölüm, sınıf cyber notation gereksinimleri çerçevesinde OT güvenliğini somut kontrollerle anlatır.`,
  sources: [
    "IMO Resolution MSC.428(98) — Maritime cyber risk in SMS",
    "IMO Resolution MSC-FAL.1/Circ.3 — Guidelines on maritime cyber risk management",
    "BIMCO/ICS — Guidelines on Cyber Security Onboard Ships",
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "ISO/IEC 27001 — bilgi güvenliği yönetim sistemi (referans)",
    "IEC 62443 — Industrial automation & control systems security (OT)",
    "NIST Cybersecurity Framework — Identify/Protect/Detect/Respond/Recover",
    "Sınıf cyber notation kılavuzları (DNV, LR, ABS, BV cyber secure)",
  ],
  chapters: [
    {
      heading: "1. Denizcilik Siber Riski ve Yasal Çerçeve",
      lead: `Gemi artık yüzen bir veri merkezi gibidir; köprüden makineye kadar sistemler ağ üzerinden konuşur. ETO bu dijital yüzeyin güvenliğinden teknik olarak sorumludur.`,
      sections: [
        {
          subheading: "1.1 IT ve OT ayrımı",
          paragraphs: [
            `IT (Information Technology) sistemleri veriyi yönetir: e-posta, idari yazılım, raporlama. OT (Operational Technology) sistemleri ise fiziksel süreçleri kontrol eder: ECDIS, IAS/AMS (otomasyon/alarm), propulsion control, steering, cargo control, balast. Bir IT ihlali veri kaybı yaratırken, bir OT ihlali doğrudan seyir/makine emniyetini tehdit eder; bu yüzden OT güvenliği can güvenliği meselesidir.`,
            `ETO, gemideki tüm OT varlıklarını ve bunların ağ bağlantılarını envanterler (asset inventory). Hangi sistemin hangi ağ segmentinde olduğu, dışarıyla (uydu, USB, servis laptopu) nasıl temas ettiği bilinmeden korunamaz. Bu envanter, risk değerlendirmesinin temelidir.`,
          ],
          table: {
            caption: `OT Sistemleri ve Siber Etki`,
            headers: ["Sistem", "Fonksiyon", "İhlal Etkisi"],
            rows: [
              ["ECDIS", "Elektronik seyir", "Yanlış konum/rota, karaya oturma"],
              ["IAS/AMS", "Otomasyon/alarm izleme", "Alarm kaybı, kör işletim"],
              ["Propulsion control", "Tahrik kontrolü", "Manevra/güç kaybı"],
              ["Cargo/ballast control", "Yük/balast", "Stabilite/kargo riski"],
              ["VDR", "Veri kaydedici", "Delil bütünlüğü kaybı"],
            ],
          },
        },
        {
          subheading: "1.2 MSC.428(98) ve SMS entegrasyonu",
          paragraphs: [
            `IMO Resolution MSC.428(98), geminin Güvenlik Yönetim Sistemi'nin (ISM Code uyarınca) siber risk yönetimini içermesini zorunlu kılar. MSC-FAL.1/Circ.3 ise NIST çerçevesine paralel beş fonksiyonu önerir: tanımla, koru, tespit et, müdahale et, toparlan. ETO, bu çerçevenin teknik kontrollerini uygular ve dokümante eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MSC.428(98) — zorunlu uyum",
              text: `Cyber risk yönetimi, SMS'in ayrılmaz bir parçası olarak ele alınmalı ve DOC/SMC denetimlerinde değerlendirilir. Geminin siber risk yönetimini SMS'inde ele almaması bir uygunsuzluk (non-conformity) oluşturur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. OT Ağ Segmentasyonu",
      sections: [
        {
          subheading: "2.1 Bölgeler (zones) ve geçişler (conduits)",
          paragraphs: [
            `IEC 62443 yaklaşımıyla OT ağı, güvenlik bölgelerine (zones) ayrılır ve bölgeler arası iletişim kontrollü geçitlerden (conduits/firewall) geçer. ETO; köprü OT (ECDIS, radar), makine OT (IAS, propulsion), cargo control, idari IT ve mürettebat refah ağını ayrı segmentlerde tutar. Kritik OT, internete doğrudan bağlanmaz; gerekli veri akışı sıkı kurallarla sınırlanır.`,
            `ETO, segmentler arası firewall kurallarını "varsayılan reddet" (default deny) ilkesiyle yapılandırır; yalnızca gerekli ve gerekçeli trafiğe izin verilir. Mürettebat refah ağından OT'ye geçiş engellenir. Bu mimari, bir segmentteki olayın diğerlerine yayılmasını (lateral movement) sınırlar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IEC 62443 — zones & conduits",
              text: `Endüstriyel kontrol sistemleri güvenliğinin temel ilkesi, sistemleri güvenlik seviyesine göre bölgelere ayırmak ve bölgeler arası iletişimi denetlenen geçitlerle sınırlamaktır. Bu yaklaşım gemi OT ağına doğrudan uygulanabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Uzaktan erişim (remote access) kontrolü",
          paragraphs: [
            `Üretici/servis sağlayıcıların uzaktan teşhis için OT'ye erişmesi yaygındır ancak büyük risktir. ETO, uzaktan erişimi kontrol altında tutar: yalnızca ihtiyaç anında etkinleştirilen, izlenen, kayıt altına alınan ve sonradan kapatılan bir erişim. Kalıcı açık bir uzaktan bağlantı, en tehlikeli saldırı yüzeylerinden biridir.`,
          ],
        },
      ],
    },
    {
      heading: "3. USB ve Taşınabilir Medya Kontrolü",
      sections: [
        {
          subheading: "3.1 Taşınabilir medya riski ve politika",
          paragraphs: [
            `USB bellekler ve harici diskler, OT sistemlerine zararlı yazılım girişinin en yaygın yoludur; özellikle ECDIS harita güncelleme medyası ve servis teknisyeni laptopları risklidir. ETO, taşınabilir medya kullanımını politikayla sınırlar: yalnızca onaylı, taranmış medya, yalnızca gerekli sistemlerde, kayıtlı şekilde kullanılır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Harita güncellemesi ile gelen zararlı yazılım",
              text: `Bir gemide ECDIS, enfekte bir USB ile yapılan harita güncellemesi sonrası anormal davrandı. İnceleme, medyanın bir kara bilgisayarında enfekte olduğunu gösterdi. Ders: tüm taşınabilir medya kullanım öncesi ayrı bir tarama kiosk'unda taranmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Tarama kiosk ve port USB scanner koordinasyonu",
          paragraphs: [
            `ETO, gemiye gelen tüm taşınabilir medyanın ağdan ayrı bir tarama istasyonunda (scanning kiosk) kontrol edilmesini sağlar. Bazı limanlarda port USB scanner sistemleri ile koordinasyon gerekir. OT sistemlerinde kullanılmayan USB portları fiziksel veya yazılımsal olarak devre dışı bırakılır; bu, en basit ve etkili kontrollerden biridir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yazılım ve Firmware Güncelleme Yönetimi",
      sections: [
        {
          subheading: "4.1 Güncelleme süreci ve doğrulama",
          paragraphs: [
            `Yazılım/firmware güncellemeleri güvenlik açıklarını kapatır ancak yanlış uygulanırsa OT sistemini bozabilir. ETO, güncellemeleri yalnızca güvenilir kaynaktan (üretici, dijital imza doğrulanmış), mümkünse kritik olmayan bir zamanda ve yedek alındıktan sonra uygular. Güncelleme öncesi/sonrası sistem davranışı doğrulanır.`,
            `ETO, kritik OT yazılımlarının sürüm envanterini ve bilinen açıkları (vulnerability) takip eder. ECDIS gibi tip onaylı sistemlerde güncellemeler üreticinin onaylı paketleriyle yapılır; gelişigüzel yama tip onayını ve güvenliği bozabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Önce yedek, sonra güncelle",
              text: `Hiçbir OT güncellemesi, geçerli ve test edilmiş bir yedek (konfigürasyon, harita, parametre) alınmadan yapılmamalıdır. Güncelleme beklenmedik sorun çıkarırsa, hızlı geri dönüş (rollback) ancak güncel bir yedekle mümkündür.`,
            },
          ],
        },
        {
          subheading: "4.2 Yama yönetimi ve sürüm kontrolü",
          paragraphs: [
            `ETO, hangi sistemin hangi yazılım/firmware sürümünde olduğunu kayıtlı tutar (configuration management). Bu envanter, yeni bir açık duyurulduğunda hangi gemi sistemlerinin etkilendiğini hızlı belirlemeyi sağlar. Yama uygulanamayan eski sistemler için telafi edici kontroller (ek segmentasyon, izleme) uygulanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Erişim Kontrolü ve Kimlik Yönetimi",
      sections: [
        {
          subheading: "5.1 Rol bazlı yetki ve parola hijyeni",
          paragraphs: [
            `ETO, OT/IT sistemlerinde rol bazlı erişim kontrolü uygular: her kullanıcı yalnızca görevinin gerektirdiği yetkiye sahip olur (least privilege). Paylaşılan/varsayılan hesaplar ve fabrika parolaları en büyük zafiyetlerdendir; ETO bunları değiştirir veya devre dışı bırakır ve güçlü, benzersiz parolalar uygular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Varsayılan parolalar değiştirilmeli",
              text: `Pek çok OT cihazı bilinen fabrika parolalarıyla gelir; bunlar internette belgelidir ve saldırı için ilk denenen şeydir. Devreye alımda tüm varsayılan/üretici parolaları değiştirin; değiştirilemeyenler için ek erişim sınırlaması uygulayın.`,
            },
          ],
        },
        {
          subheading: "5.2 Fiziksel erişim ve hesap yönetimi",
          paragraphs: [
            `Siber güvenlik fiziksel güvenlikle bütünleşir: kontrol panellerine, sunucu dolaplarına ve ağ ekipmanına fiziksel erişim yetkili kişilerle sınırlandırılır. ETO, ayrılan personelin hesaplarını derhal devre dışı bırakır ve periyodik hesap gözden geçirmesi yapar; aktif olmayan veya gereksiz hesaplar kapatılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. İzleme, Tespit ve Olay Müdahalesi",
      sections: [
        {
          subheading: "6.1 İzleme (detect) ve anomali tespiti",
          paragraphs: [
            `Bir siber olayı yönetmek için önce tespit etmek gerekir. ETO; log'ları (firewall, sunucu, OT cihaz), ağ trafiği anomalilerini ve antivirüs/EDR uyarılarını izler. OT'de beklenmedik trafik, yeni cihaz, anormal sistem davranışı veya başarısız oturum denemeleri uyarı işaretidir. Loglar düzenli ve değiştirilemez şekilde tutulur.`,
          ],
        },
        {
          subheading: "6.2 Incident response — müdahale ve toparlanma",
          paragraphs: [
            `Bir siber olayda ETO, olay müdahale planını uygular: etkilenen sistemi izole et (containment), kanıtı koru, etkiyi değerlendir, şirket/SMS prosedürüne göre raporla ve yedekten toparlan (recover). Kritik OT etkilendiğinde manuel/yedek işletim moduna geçiş (örn. ECDIS yedeği veya kağıt harita, manuel kontrol) hayati önem taşır.`,
            `ETO, müdahale sonrası kök neden analizi yapar ve dersleri SMS'e yansıtır. Düzenli siber tatbikatlar (örn. ECDIS kaybı senaryosu), ekibin gerçek bir olayda doğru refleks göstermesini sağlar. Toparlanma, ağdan ayrı (offline) tutulan güncel yedeklere dayanır.`,
          ],
          table: {
            caption: `Olay Müdahale Adımları (NIST/MSC-FAL.1/Circ.3 paralel)`,
            headers: ["Aşama", "ETO Aksiyonu"],
            rows: [
              ["Tespit", "Log/anomali/uyarı değerlendirme"],
              ["Sınırlama", "Etkilenen sistemi/segmenti izole et"],
              ["Müdahale", "Manuel/yedek moda geç, kanıt koru, raporla"],
              ["Toparlanma", "Offline yedekten geri yükle, doğrula"],
              ["Ders çıkarma", "Kök neden, SMS güncelleme, tatbikat"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Sınıf Cyber Notation ve Liman Koordinasyonu",
      sections: [
        {
          subheading: "7.1 Sınıf cyber notation gereksinimleri",
          paragraphs: [
            `Sınıf kuruluşları, gemiler için gönüllü/zorunlu cyber secure notation'lar sunar (DNV, LR, ABS, BV vb.); bunlar asset envanteri, segmentasyon, erişim kontrolü, izleme ve müdahale yeteneği için belirli olgunluk seviyeleri şart koşar. ETO, geminin tuttuğu notation'ın teknik gereksinimlerini karşılar ve sörveylere kanıt (politika, log, test kaydı) sağlar.`,
          ],
        },
        {
          subheading: "7.2 Liman ve şirket koordinasyonu",
          paragraphs: [
            `ETO, port USB scanner sistemleri, liman bilgi sistemleri ve şirket IT/SOC (Security Operations Center) ile koordinasyon kurar. Bir olay anında veya güncelleme/yapılandırma değişikliklerinde gemi-şirket koordinasyonu kritiktir. ETO, gemi tarafı teknik temas noktası olarak bu iletişimi yürütür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gemi-şirket SOC bağı",
              text: `Modern filolarda kıyıdaki güvenlik operasyon merkezi (SOC), gemi loglarını uzaktan izleyebilir. ETO, SOC ile düzenli iletişim kurarak uyarıları doğrular ve gemiye özel bağlam sağlar; bu, gerçek tehdit ile yanlış alarmı ayırmayı hızlandırır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Cybersecurity ve OT yönetimi kontrol listesi",
          bullets: [
            `OT varlık envanteri ve ağ haritası güncel mi?`,
            `OT/IT/mürettebat ağları segmentli, firewall "default deny" mi?`,
            `Uzaktan erişim sadece ihtiyaç anında, izlenen şekilde mi açılıyor?`,
            `Taşınabilir medya tarama kiosk'unda taranıyor, gereksiz USB portları kapalı mı?`,
            `Güncellemeler doğrulanmış kaynaktan, yedek alınarak mı uygulanıyor?`,
            `Yazılım/firmware sürüm envanteri ve açık takibi yapılıyor mu?`,
            `Varsayılan parolalar değişti, rol bazlı yetki ve least privilege uygulanıyor mu?`,
            `Loglar izleniyor, anomali tespiti ve uyarılar değerlendiriliyor mu?`,
            `Olay müdahale planı ve manuel/yedek işletim modu hazır mı?`,
            `Offline yedekler güncel, sınıf cyber notation gereksinimleri karşılanıyor mu?`,
          ],
          paragraphs: [
            `Siber güvenlik, ETO'nun en yeni ama hızla en kritik hale gelen sorumluluğudur; çünkü artık bir ECDIS veya propulsion control ihlali, bir yangın veya su alma kadar gerçek bir seyir emniyeti tehdididir. ETO'nun başarısı; sağlam segmentasyon, disiplinli medya/güncelleme/erişim kontrolü ve bir olay anında gemiyi manuel moda güvenle geçirebilen hazırlıkla ölçülür. Görünmez bu savunma katmanı, gemiyi dijital çağın risklerine karşı diri tutar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
