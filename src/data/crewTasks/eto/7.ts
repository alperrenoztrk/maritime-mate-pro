import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yedek parça ve kalibrasyon yönetimi",
  roleSlug: "eto",
  taskIndex: 7,
  estimatedPages: 23,
  intro: `Bir geminin elektrik/elektronik sistemlerinin sürekliliği, doğru yedek parçanın doğru anda hazır olmasına ve ölçüm cihazlarının güvenilir (kalibre) olmasına bağlıdır. Elektro-Teknik Zabit (ETO); elektronik yedek parça stoğunun (PCB, sigorta, röle, sensör, konnektör) yönetiminden, sınıf zorunlu kritik spare listesinin güncel tutulmasından, kalibrasyon sertifikalarının takibinden ve periyodik kalibrasyon planlamasından sorumludur. Bu bölüm, denizde tedarik gecikmesinin yüksek olduğu bir ortamda yedek parça ve kalibrasyon disiplinini somut yöntemlerle anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "ISM Code — bakım planlaması ve kritik ekipman yönetimi (Reg. 10)",
    "IACS UR ve sınıf kuralları — required spares & spare parts list",
    "SOLAS Chapter II-1 — kritik sistem yedek gereksinimleri",
    "ISO/IEC 17025 — kalibrasyon laboratuvarı yeterliliği (referans)",
    "ISO 9001 / kalite yönetim sistemi — kalibrasyon ve izlenebilirlik",
    "PMS yazılımı (AMOS, TM Master, ShipManager) kullanım pratiği",
    "Üretici (OEM) bakım el kitapları ve recommended spare parts listeleri",
  ],
  chapters: [
    {
      heading: "1. Yedek Parça Yönetiminin İlkeleri",
      lead: `Gemi, en yakın tedarikçiden günlerce uzakta olabilir; bu nedenle yedek parça yönetimi karada olmayan bir kritiklik taşır. ETO, "neye, ne kadar, nerede" sorularını sistematik yanıtlamalıdır.`,
      sections: [
        {
          subheading: "1.1 Kritiklik bazlı stok stratejisi",
          paragraphs: [
            `Tüm parçaları aynı miktarda stoklamak ne ekonomik ne de mümkündür. ETO, parçaları kritiklik ve tedarik süresine göre sınıflandırır: bir arızası gemiyi durduracak (örn. ana switchboard koruma rölesi, propulsion drive PCB'si) parçalar mutlaka stokta tutulur; kolay temin edilen ve düşük kritiklikli parçalar minimum seviyede tutulur.`,
            `Stok yönetimi minimum/maksimum seviye ve yeniden sipariş noktası (reorder point) ile yapılır. ETO, tüketim trendini izleyerek seviyeleri günceller; sık arızalanan bir bileşenin stok seviyesi artırılır. PMS yazılımı, kullanılan parçaların otomatik düşülmesi ve sipariş tetiklenmesi için kullanılır.`,
          ],
          table: {
            caption: `Yedek Parça Kritiklik Sınıflandırması`,
            headers: ["Sınıf", "Tanım", "Stok Politikası"],
            rows: [
              ["Kritik (A)", "Arızası gemiyi durdurur", "Daima stokta, yedekli"],
              ["Önemli (B)", "Arızası fonksiyon kaybı", "Min/max seviye korunur"],
              ["Standart (C)", "Kolay temin, düşük etki", "Minimum stok"],
              ["Sınıf zorunlu", "Klas/SOLAS gereği", "Liste sürekli tam tutulur"],
            ],
          },
        },
        {
          subheading: "1.2 Sınıf zorunlu (required) spare parts listesi",
          paragraphs: [
            `Sınıf kuruluşları ve SOLAS, belirli kritik sistemler için minimum yedek parça bulundurmayı zorunlu kılar. ETO, bu "required spares" listesinin sürekli tam olduğunu garanti eder; bir kalem kullanılınca derhal yeniden sipariş edilir. Eksik required spare, sınıf sörveyi veya PSC denetiminde bulgu (deficiency) oluşturur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code Reg. 10 — kritik ekipman",
              text: `ISM Code, kritik ekipman ve sistemlerin tanımlanmasını ve bunların ani arızasına karşı tedbir (yedek, alternatif düzenleme) alınmasını şart koşar. Kritik yedek parça listesinin güncelliği, SMS bakım yönetiminin denetlenen bir parçasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Elektronik Yedek Parça Kategorileri",
      sections: [
        {
          subheading: "2.1 PCB, modül ve kart yönetimi",
          paragraphs: [
            `Modern gemilerde otomasyon, drive ve haberleşme sistemleri PCB (baskılı devre kartı) ve modüllere dayanır. ETO, kritik kartların (controller CPU, I/O kartları, drive control board, AVR kartı) en az birer yedeğini stoklar. Kart değişimi genellikle parametre/yazılım yüklemesi gerektirir; ETO bu konfigürasyonları yedekler.`,
            `PCB'ler ESD (elektrostatik deşarj) ve neme duyarlıdır; bu yüzden antistatik poşette, kuru ve serin ortamda saklanır. ETO, depodaki kritik kartların durumunu periyodik kontrol eder ve uzun süre depoda bekleyen elektrolitik kapasitörlü kartlarda yaşlanma riskini gözetir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "ESD korumalı saklama",
              text: `PCB'leri her zaman antistatik (ESD) poşette saklayın ve kart elleçlerken ESD bileklik kullanın. Tek bir elektrostatik deşarj, hassas bir mikroişlemciyi görünmez şekilde zayıflatabilir ve montaj sonrası erken arızaya yol açabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Sigorta, röle, sensör ve konnektör",
          paragraphs: [
            `Sigortalar (fuse) doğru tip, akım ve kesme kapasitesiyle stoklanmalıdır; yanlış sigorta hem koruma sağlamaz hem de güvenlik riski yaratır. ETO, kullanılan tüm sigorta tiplerinin (hızlı/gecikmeli, HRC, semiconductor fuse) yeterli yedeğini tutar. Röleler, sensörler (basınç, sıcaklık, seviye, akım transformatörü) ve konnektörler de kritiklik bazında stoklanır.`,
            `ETO, sigorta ve koruma elemanlarının asla "üst değerle köprülenmemesi" ilkesini uygular; doğru yedek bulunmadığında geçici köprüleme yangın ve ekipman hasarına yol açar. Konnektörlerde, deniz ortamında korozyon nedeniyle yedek tutmak özellikle önemlidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış sigorta = koruma kaybı",
              text: `Bir sigortayı daha yüksek akım değerli veya farklı tipli biriyle değiştirmek koruma fonksiyonunu bozar ve felaketle sonuçlanabilir. Sigorta her zaman ORİJİNAL tip, akım ve kesme kapasitesiyle değiştirilmeli; doğru yedek stokta tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Stok Kayıt Sistemi ve PMS Entegrasyonu",
      sections: [
        {
          subheading: "3.1 PMS yazılımında parça takibi",
          paragraphs: [
            `Gemi Planlı Bakım Sistemi (PMS) yazılımı (AMOS, TM Master, ShipManager vb.), her ekipmana bağlı yedek parçaları, stok seviyelerini ve sipariş durumunu yönetir. ETO, bir parça kullanıldığında stoğu günceller; sistem reorder point'e ulaşınca sipariş talebi (requisition) oluşturur. Doğru ve güncel kayıt, gerçek stoğun fiziksel sayımla uyumlu olmasını sağlar.`,
            `ETO, periyodik fiziksel stok sayımı yaparak sistem-fiziksel uyumunu doğrular; uyumsuzluklar (kullanılıp düşülmemiş veya yanlış konumlanmış parça) düzeltilir. Parça konum kodları (raf/dolap numaraları) acil durumda hızlı erişim için kritiktir.`,
          ],
        },
        {
          subheading: "3.2 Sipariş, teslim ve depolama döngüsü",
          paragraphs: [
            `Yedek parça siparişi, tedarik süresini (lead time) ve gemi rotasını dikkate alır; uzun seferlerde parça liman uğraklarına denk getirilmelidir. ETO, kritik siparişleri öncelikli işaretler, teslim alınan parçaları kontrol eder (doğru parça, hasar, sertifika) ve uygun koşullarda depolar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Lead time ihmali kaynaklı gecikme",
              text: `Bir gemide kritik bir drive PCB'si arızalandı ancak stokta yedeği yoktu; parçanın 3 haftalık tedarik süresi ve uzak rota nedeniyle ilgili pompa haftalarca devre dışı kaldı. Ders: kritik PCB'ler lead time'ları nedeniyle MUTLAKA stokta tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kalibrasyon Yönetiminin Temelleri",
      sections: [
        {
          subheading: "4.1 Neden kalibrasyon? İzlenebilirlik kavramı",
          paragraphs: [
            `Kalibrasyon, bir ölçüm cihazının çıktısının bilinen bir referans standardıyla karşılaştırılıp sapmasının belirlenmesidir. Yanlış kalibre bir basınç sensörü veya gaz dedektörü, yanlış kararlara ve güvenlik riskine yol açar. ETO, kalibrasyonun ulusal/uluslararası standartlara izlenebilir (traceable) olmasını sağlar; sertifika bu izlenebilirlik zincirini belgeler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İzlenebilirlik (traceability)",
              text: `Geçerli bir kalibrasyon, kesintisiz bir karşılaştırma zinciri ile ulusal/uluslararası ölçüm standardına bağlanmalıdır. ISO/IEC 17025 akreditasyonuna sahip bir laboratuvardan alınan sertifika, bu izlenebilirliği güvence altına alır.`,
            },
          ],
        },
        {
          subheading: "4.2 Kalibrasyon gerektiren tipik cihazlar",
          paragraphs: [
            `ETO uhdesindeki birçok cihaz periyodik kalibrasyon gerektirir: gaz dedektörleri (oksijen, LEL, H2S, CO), basınç/sıcaklık/seviye transmitterleri, tachometer, tank radar/gauging, draft sensörleri, multimetre ve test cihazları, oily water separator 15 ppm bilge alarm cihazı, ve emisyon izleme ekipmanı. Her birinin kalibrasyon periyodu farklıdır.`,
          ],
          table: {
            caption: `Tipik Cihaz Kalibrasyon Periyotları (örnek)`,
            headers: ["Cihaz", "Tipik Periyot", "Kritiklik"],
            rows: [
              ["Gaz dedektörü (portable)", "Bump test günlük / kalibrasyon 6 ay", "Çok yüksek (can güvenliği)"],
              ["15 ppm bilge alarmı", "Üretici/sınıf gereği", "Yüksek (MARPOL)"],
              ["Basınç/sıcaklık transmitter", "1-2 yıl", "Orta-yüksek"],
              ["Multimetre / test cihazı", "1 yıl", "Orta (ölçüm güveni)"],
              ["Tank gauging / radar", "Sınıf gereği", "Yüksek (kargo)"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Kalibrasyon Planlaması ve Sertifika Takibi",
      sections: [
        {
          subheading: "5.1 Periyodik kalibrasyon planı",
          paragraphs: [
            `ETO, tüm kalibrasyon gerektiren cihazların envanterini ve son/önümüzdeki kalibrasyon tarihlerini PMS'te tutar. Sistem, yaklaşan kalibrasyonları otomatik uyarır; ETO, gemi rotası ve servis sağlayıcı erişimini dikkate alarak kalibrasyonları planlar. Süresi geçmiş kalibrasyon, denetimlerde bulgu oluşturur ve ölçümlerin geçerliliğini sorgulanabilir kılar.`,
            `Bazı kalibrasyonlar gemide (gaz dedektörü bump/kalibrasyon, multimetre karşılaştırma) yapılabilirken, diğerleri sertifikalı dış servis veya kara laboratuvarı gerektirir. ETO, gemide yapılabilecekler için kalibratör/referans gaz tüpü stoklar ve bunların da geçerlilik tarihini takip eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Referans standardın geçerliliği",
              text: `Gemide kalibrasyon yaparken kullanılan referans (kalibrasyon gazı, master gauge) kendisinin de geçerli sertifikası olmalıdır. Süresi geçmiş bir referans gaz tüpü ile yapılan kalibrasyon güvenilmezdir; tüp son kullanma tarihleri takip edilmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Sertifika arşivi ve denetime hazırlık",
          paragraphs: [
            `Kalibrasyon sertifikaları, denetimlerde (sınıf, PSC, şirket) talep edilir; ETO bunları düzenli, erişilebilir ve güncel bir arşivde tutar (dijital ve/veya basılı). Her sertifika cihazla eşleştirilir; sertifika numarası, kalibrasyon ve geçerlilik tarihleri kaydedilir. Eksik veya süresi geçmiş sertifika, denetimde olumsuz değerlendirilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Test ve Ölçüm Ekipmanı Yönetimi",
      sections: [
        {
          subheading: "6.1 ETO'nun temel test ekipmanı",
          paragraphs: [
            `ETO'nun doğru ve güvenilir ölçüm aletlerine sahip olması işinin temelidir: dijital multimetre, clamp meter, megger (insulation tester), voltage detector, termal kamera, kablo/iletkenlik test cihazı ve gerektiğinde secondary injection test seti. Bu cihazların doğruluğu, hem güvenlik hem de arıza teşhisi için kritiktir.`,
          ],
        },
        {
          subheading: "6.2 Cihaz bakımı ve doğrulama",
          paragraphs: [
            `Test cihazları da bakım ve doğrulama gerektirir: multimetre probları ve sigortaları, megger bataryası, voltage detector'ın prove-test fonksiyonu düzenli kontrol edilir. ETO, kritik ölçümlerde iki bağımsız cihazla çapraz kontrol yaparak (özellikle gerilimsizlik teyidinde) güveni artırır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Yedek parça ve kalibrasyon kontrol listesi",
          bullets: [
            `Kritik yedek parçalar (PCB, röle, sigorta) stokta ve doğru saklanıyor mu?`,
            `Sınıf zorunlu (required) spare listesi tam mı, kullanılan kalemler sipariş edildi mi?`,
            `PMS stok kayıtları fiziksel sayımla uyumlu mu, konum kodları doğru mu?`,
            `PCB'ler ESD poşette, kuru/serin ortamda mı?`,
            `Sigortalar orijinal tip/akım/kesme kapasitesiyle mi stoklanıyor?`,
            `Kalibrasyon gerektiren tüm cihazlar envanterde, tarihleri güncel mi?`,
            `Yaklaşan kalibrasyonlar planlandı, servis/rota uyumu sağlandı mı?`,
            `Kalibrasyon sertifikaları arşivde, geçerlilik tarihleri takipte mi?`,
            `Referans gaz/master gauge geçerlilik tarihi kontrol edildi mi?`,
            `ETO test ekipmanı (multimetre, megger, voltage detector) doğrulandı mı?`,
          ],
          paragraphs: [
            `Yedek parça ve kalibrasyon yönetimi, kriz anında değil, sakin günlerde kazanılan bir disiplindir: doğru parça doğru anda hazır olduğunda bir arıza saatler içinde çözülürken, eksik stok aynı arızayı günlere yayar. ETO'nun bu alandaki başarısı, plansız duruş süresinin kısalığı, denetimlerde temiz spare/kalibrasyon kayıtları ve her ölçümün güvenilir olmasıyla ölçülür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
