import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "İçme suyu ve gıda kalite kontrolü",
  roleSlug: "asci",
  taskIndex: 8,
  estimatedPages: 26,
  intro: `İçme suyu (potable water) ve gıdanın kalitesi, gemideki halk sağlığının iki temel direğidir; aşçı bu iki alanın saha takipçisidir. MLC 2006 Kural 3.2 ve WHO Guide to Ship Sanitation çerçevesinde içme suyunun klor rezidüel testi (genel hedef ≥0.2 mg/L), pH ve bakteriyolojik analiz gereklilikleri; soğuk depo, dondurucu ve kuru erzak deposu sıcaklıklarının günlük kayıt altına alınması (cold chain log); gıda numunesinin referans için saklanması (tipik olarak 48 saat) ve potable water tank kayıtları aşçının takibinde tutulur. Bu bölüm; su kalite kontrolünü, cold chain disiplinini, numune saklamayı ve kayıt/denetim zincirini adım adım açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 & Standard A3.2 (Food & Catering, drinking water)",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "WHO — Guidelines for Drinking-water Quality",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "FAO/WHO — HACCP principles & Critical Control Points",
    "IHR 2005 — Ship Sanitation Control Certificate",
    "ICMSF / food microbiology good practice (sampling & retention)",
  ],
  chapters: [
    {
      heading: "1. İçme Suyu (Potable Water) Sistemine Genel Bakış",
      lead: `Güvenli su, güvenli gıdanın ön koşuludur; ikisi ayrılmaz.`,
      sections: [
        {
          subheading: "1.1 Su kaynağı, üretim ve depolama",
          paragraphs: [
            `Gemide içme suyu ya limanda kıyıdan (shore bunkering) alınır ya da gemide deniz suyundan evaporatör/RO (ters ozmoz) ile üretilir. Her iki kaynak da içilebilir kaliteye getirilmeden potable water tanklarına alınmaz; kıyı suyu güvenilir bir hortum/bağlantıyla, üretilen su ise mineralizasyon ve dezenfeksiyon sonrası tanka verilir. Aşçı, su kalitesinin son kullanıcı (galley, mess) tarafında doğru olduğunu izleyen kişidir.`,
            `Potable water tankları yalnızca içme suyu için ayrılır; başka amaçla (balast, teknik) kullanılmaz, çapraz bağlantı (cross-connection) yapılmaz. Tanklar periyodik temizlenir, dezenfekte edilir ve geri akış (backflow) koruması sağlanır. Bu sistem genelde teknik ekibin işletmesindedir; aşçı kalite ve kayıt tarafında rol alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çapraz bağlantı = kirlenme riski",
              text: `İçme suyu hattının teknik/deniz suyu hattına bağlanması (cross-connection) veya geri akış, ciddi kontaminasyon ve salgın riski yaratır. Potable water sistemi her zaman izole ve geri akış korumalı olmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Aşçının su kalitesindeki rolü",
          paragraphs: [
            `Aşçı, gıda hazırlığında ve içme suyunda kullanılan suyun güvenli olduğunu sürekli izler; klor rezidüel testi, görünür/koku/tat kontrolü ve numune alımına destek bu sorumluluğun parçasıdır. Anormallik (renk, koku, düşük klor) durumunda derhal kaptanı ve teknik ekibi uyarır; gerekirse içme suyu kaynatılarak veya alternatif (şişe su) ile güvence altına alınır. Su kalitesi, gıda güvenliğinin ayrılmaz ön koşuludur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Klor Rezidüel, pH ve Bakteriyolojik Kontrol",
      sections: [
        {
          subheading: "2.1 Klor rezidüel (residual chlorine) testi",
          paragraphs: [
            `Dezenfekte edilen içme suyunda serbest klor kalıntısı (free residual chlorine), suyun dağıtım boyunca güvenli kaldığının pratik göstergesidir. WHO Guide to Ship Sanitation, dağıtım sisteminde genel olarak en az ~0.2 mg/L serbest klor rezidüeli önerir; bu seviye, tankla musluk arası olası kontaminasyona karşı bir tampondur. Aşçı/sorumlu personel, musluk noktalarından DPD test kiti ile düzenli klor ölçümü yapar ve kaydeder.`,
            `Klor çok düşükse dezenfeksiyon güvencesi kaybolur (super-chlorination/dozaj ayarı gerekir); aşırı yüksekse tat/koku sorunu olur. Ölçüm noktaları tankın en uzak/en olumsuz noktalarını da kapsamalı; sadece kaynağa bakmak yanıltıcıdır. Sapma durumunda teknik ekiple koordine edilip dozaj düzeltilir.`,
          ],
          table: {
            caption: `İçme Suyu Temel Parametre Hedefleri (Kılavuz)`,
            headers: ["Parametre", "Genel Hedef", "Yöntem / Not"],
            rows: [
              ["Serbest klor rezidüel", "≥ ~0.2 mg/L (dağıtımda)", "DPD test kiti, düzenli ölçüm"],
              ["pH", "Genelde ~6.5-8.5", "pH kiti / metre, klor etkinliği için"],
              ["Bulanıklık (turbidity)", "Düşük / berrak", "Görsel + gerekirse ölçüm"],
              ["Bakteriyolojik", "E. coli / koliform yok", "Periyodik laboratuvar/saha test"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "WHO — Ship Sanitation, su güvenliği",
              text: `Rehber, içme suyunun dağıtım sisteminde yeterli dezenfektan rezidüeli taşımasını, düzenli izlenmesini ve kayıt tutulmasını ister. Klor rezidüel, sahadaki en pratik güvenlik göstergesidir.`,
            },
          ],
        },
        {
          subheading: "2.2 pH ve bakteriyolojik analiz",
          paragraphs: [
            `pH, klorun dezenfeksiyon etkinliğini etkiler; çok yüksek pH'ta klorun öldürücü gücü düşer, bu yüzden pH genelde uygun bir aralıkta (kabaca 6.5-8.5) tutulur ve izlenir. Bakteriyolojik güvenlik için periyodik numuneler alınır; E. coli ve koliform bakteri varlığı fekal kontaminasyon işaretidir ve sıfır tolerans gerektirir. Bu numuneler saha kitleriyle veya akredite laboratuvar analiziyle değerlendirilir.`,
            `Pozitif bakteriyolojik sonuç ciddi bir bulgudur: su kaynağı izole edilir, super-chlorination/tank dezenfeksiyonu yapılır, tekrar test edilir ve temizlenene kadar alternatif güvenli su kullanılır. Tüm bu adımlar kayda geçirilir ve kaptana raporlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Koliform pozitif = derhal müdahale",
              text: `İçme suyunda koliform/E. coli tespiti fekal kontaminasyon demektir. Su izole edilir, alternatif kaynağa geçilir, sistem dezenfekte edilip yeniden test edilmeden tüketim sürdürülmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Cold Chain (Soğuk Zincir) Sıcaklık Kontrolü",
      sections: [
        {
          subheading: "3.1 Depo sıcaklıklarının günlük kaydı",
          paragraphs: [
            `Gıda güvenliğinin kalbi soğuk zincirdir: soğutucu (chiller, 0-4°C), dondurucu (-18°C ve altı) ve kuru erzak deposunun (serin, kuru) hedef sıcaklıkta tutulması zorunludur. Aşçı, bu sıcaklıkları günlük olarak (genelde günde en az bir-iki kez) okur ve cold chain log'a kaydeder. Kalibre bir termometre/sıcaklık göstergesi kullanılır; ekipmanın kendi göstergesi periyodik referans termometreyle doğrulanır.`,
            `Tehlikeli sıcaklık aralığı (kabaca 5-63°C arası "danger zone") bakterilerin hızla çoğaldığı bölgedir; soğutmanın bu aralığın altında tutulması, gıda kaynaklı hastalık riskini düşürür. Kapı açık kalması, aşırı dolum, conta hasarı veya arıza sıcaklığı yükseltir; aşçı bu sapmaları erken yakalar.`,
          ],
          table: {
            caption: `Cold Chain Hedef Sıcaklıkları ve Kayıt`,
            headers: ["Alan", "Hedef Sıcaklık", "Kayıt Sıklığı"],
            rows: [
              ["Soğutucu (chiller)", "0-4°C", "Günlük (en az 1-2 kez)"],
              ["Dondurucu (freezer)", "≤ -18°C", "Günlük"],
              ["Kuru erzak deposu", "Serin/kuru (~10-21°C)", "Düzenli kontrol"],
              ["Sıcak yemek (servise dek)", "≥ 63°C", "Servis öncesi kontrol"],
              ["Soğuk hazırlık", "< 5°C", "Hazırlık/servis kontrolü"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Danger zone (5-63°C)",
              text: `Bakteriler 5-63°C arasında hızla ürer. Soğuk gıda 5°C altında, sıcak gıda 63°C üstünde tutulur; bu aralıkta geçen süre minimize edilir. Sıcaklık kayıtları bunu kanıtlar.`,
            },
          ],
        },
        {
          subheading: "3.2 Sapma yönetimi ve düzeltici aksiyon",
          paragraphs: [
            `Kayıtta bir sapma (örn. soğutucu 4°C üstüne çıkmış) görüldüğünde aşçı düzeltici aksiyon başlatır: kapı/conta/dolum kontrolü, gerekirse ürünleri başka üniteye taşıma, arıza raporu ve etkilenen gıdanın değerlendirilmesi/imhası. Soğuk zincirin kırıldığı şüpheli ürün riske atılmaz. Bu aksiyonlar HACCP mantığındaki "kritik kontrol noktası" yönetiminin sahadaki uygulamasıdır (detay gıda güvenliği görevinde).`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kalibrasyonu unutma",
              text: `Termometre/gösterge kalibre değilse kayıt yanıltıcıdır. Periyodik olarak referans termometreyle doğrula; doğru ölçmeyen bir cihaz, güvenli olmayan gıdayı 'güvenli' gösterebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Gıda Numunesi Saklama (Reference/Retention Sample)",
      sections: [
        {
          subheading: "4.1 Numune saklama prensibi ve süre",
          paragraphs: [
            `İyi gemi catering pratiği ve birçok bayrak/şirket prosedürü, servis edilen ana öğünlerden referans numunesi saklanmasını öngörür: her ana yemekten temsili bir porsiyon (tipik olarak ~100 g civarı) etiketli, temiz kapta alınır ve soğutucuda referans için tipik olarak 48 saat saklanır. Olası bir gıda kaynaklı hastalık (food poisoning) şüphesinde bu numune, kaynağın tespiti için laboratuvara verilebilir.`,
            `Numune steril/temiz kaba alınır, üzerine yemek adı, tarih ve saat etiketlenir ve ayrı bir bölmede (çapraz bulaşmadan korunarak) saklanır. Süre dolunca güvenli şekilde imha edilir. Bu disiplin, bir salgın araştırmasında gemiyi hem korur (kanıt) hem de hızlı kök-neden analizi sağlar.`,
          ],
          table: {
            caption: `Gıda Numunesi Saklama — Pratik Standart`,
            headers: ["Konu", "Uygulama", "Amaç"],
            rows: [
              ["Hangi yemekler", "Servis edilen ana öğünler", "Olası kaynak izlenebilirliği"],
              ["Miktar", "~100 g temsili porsiyon", "Laboratuvar analizi için yeterli"],
              ["Saklama", "Etiketli, kapalı, ~0-4°C", "Çapraz bulaşmadan korunmuş"],
              ["Süre", "Tipik 48 saat", "Şikayet penceresi boyunca kanıt"],
              ["İmha", "Süre sonunda güvenli imha", "Atık akışına uygun bertaraf"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Numune sayesinde hızlı teşhis",
              text: `Birkaç mürettebatta mide rahatsızlığı görülünce saklanan 48 saatlik numuneler analiz edildi; kaynak tek bir partiyle sınırlandı ve yayılma önlendi. Numune saklama, salgın yönetiminin sessiz kahramanıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Gıda kaynaklı hastalık şüphesinde süreç",
          paragraphs: [
            `Birden fazla mürettebatta benzer belirtiler (ishal, kusma) görülürse gıda kaynaklı hastalık şüphesi devreye girer; aşçı kaptanı bilgilendirir, saklanan numuneler korunur, şüpheli ürün/parti izole edilir ve gerekirse telemedicine/liman sağlık otoritesiyle koordinasyon yapılır. Numune ve cold chain/temizlik kayıtları, kök-neden araştırmasının temel kanıtlarıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt Sistemi ve Denetime Hazırlık",
      sections: [
        {
          subheading: "5.1 Hangi kayıtlar tutulur",
          paragraphs: [
            `Aşçının tuttuğu/destek olduğu temel kayıtlar: içme suyu klor rezidüel ve test logları, potable water tank temizlik/dezenfeksiyon ve kalibrasyon kayıtları, cold chain (soğutucu/dondurucu/depo) sıcaklık logları, gıda numunesi saklama kaydı, temizlik ve pest control kayıtları. Bu kayıtlar düzenli, tarihli ve doğru tutulur; sonradan toplu doldurma değil, gerçek zamanlı kayıt esastır.`,
            `Kayıtlar, MLC 2006 denetimi, liman devlet kontrolü (PSC) ve liman sağlık otoritesi (Ship Sanitation) tarafından incelenir. İyi tutulmuş kayıt, gemiyi hem yasal olarak korur hem de bir sorun çıktığında hızlı teşhis sağlar.`,
          ],
          bullets: [
            `İçme suyu klor rezidüel / pH / bakteriyolojik test logları`,
            `Potable water tank temizlik, dezenfeksiyon, kalibrasyon kayıtları`,
            `Cold chain sıcaklık logları (soğutucu/dondurucu/depo)`,
            `Gıda numunesi saklama kaydı (48 saat)`,
            `Temizlik ve pest control kayıtları`,
          ],
        },
        {
          subheading: "5.2 MLC ve Ship Sanitation denetimi",
          paragraphs: [
            `MLC 2006, gıda ve içme suyu alanının düzenli denetlenmesini ve kayıtlanmasını ister; Ship Sanitation Control Certificate ise geminin halk sağlığı açısından uygunluğunu belgeler. Aşçı, bu kayıtların sürekli güncel ve denetime hazır olmasını sağlar. Eksik/sahte kayıt, ciddi bir uygunsuzluk olarak geminin tutulmasına yol açabilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MLC A3.2 + IHR 2005",
              text: `MLC 2006 gıda/su güvenliğini, IHR 2005 ise Ship Sanitation kontrolünü düzenler. İkisi birlikte içme suyu ve gıda kalite kayıtlarını denetlenebilir bir zincire bağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 İçme suyu ve gıda kalite checklist'i",
          bullets: [
            `İçme suyu klor rezidüeli ölçüldü (≥~0.2 mg/L) ve kaydedildi mi?`,
            `pH ve gerekiyorsa bakteriyolojik test yapıldı mı?`,
            `Potable water sistemi izole, geri akış korumalı mı?`,
            `Soğutucu 0-4°C, dondurucu ≤-18°C ölçülüp loglandı mı?`,
            `Termometre/gösterge kalibrasyonu doğrulandı mı?`,
            `Sıcaklık sapmasında düzeltici aksiyon alındı mı?`,
            `Ana öğünlerden 48 saatlik referans numune saklandı mı?`,
            `Su, cold chain, numune, temizlik kayıtları güncel mi?`,
            `Kayıtlar MLC / Ship Sanitation denetimine hazır mı?`,
          ],
          paragraphs: [
            `İçme suyu ve gıda kalite kontrolü, aşçının halk sağlığı bekçiliği rolünün özüdür. Klor rezidüel ve bakteriyolojik güvenliği izlemek, soğuk zinciri günlük kayıtlamak, gıda numunesini referans için saklamak ve tüm bunları denetlenebilir bir kayıt zincirine bağlamak; bir gıda/su kaynaklı salgını önlemenin ve çıktığında hızla yönetmenin tek güvenilir yoludur. Doğru tutulan kayıt, hem mürettebat sağlığının hem de geminin yasal korumasının sessiz temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
