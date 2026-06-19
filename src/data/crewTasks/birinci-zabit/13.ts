import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Enclosed Space Entry Permit yönetimi ve atmosfer testi",
  roleSlug: "birinci-zabit",
  taskIndex: 13,
  estimatedPages: 24,
  intro: `Cargo hold, ballast tank, void space, cofferdam, pump room ve duct keel gibi alanlara giriş, IMO Resolution A.1050(27) çerçevesinde sadece Birinci Zabit imzalı Enclosed Space Entry Permit ile yapılır. O₂ (en az %19.5, en fazla %23.5), LEL/HC, H₂S ve CO ölçümleri kalibre cihazla yapılır; havalandırma yeterliliği, rescue plan ve standby kişi atanır. Test cihazlarının kalibrasyon sertifikası bir yılı aşmamalıdır. Kapalı alan girişi, denizcilikte en çok ölümlü kazaya yol açan işlerden biridir ve kurbanların çoğu kurtarmaya giren kişilerdir. Bu bölüm, Birinci Zabit'in kapalı alan giriş yönetimi metodolojisini açıklar.`,
  sources: [
    "IMO Resolution A.1050(27) — Revised Recommendations for Entering Enclosed Spaces",
    "SOLAS III/19 — Enclosed Space Entry and Rescue Drills",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) Ch.15",
    "ISGOTT 6 — Enclosed Space Entry",
    "IMO MSC.1/Circ.1485 — Atmosphere Testing Instrument",
    "OSHA Confined Space Standards (referans)",
    "P&I Club Loss Prevention — Enclosed Space Fatalities",
    "Company SMS — Permit to Work System",
  ],
  chapters: [
    {
      heading: "1. Kapalı Alan Tehlikesi ve Tanım",
      lead: `Kapalı alan girişi, görünmeyen atmosfer tehlikeleri nedeniyle denizciliğin en sinsi ölümcül riskidir.`,
      sections: [
        {
          subheading: "1.1 Enclosed space tanımı",
          paragraphs: [
            `Enclosed space (kapalı alan), sınırlı giriş/çıkışı olan, sürekli havalandırılmayan ve sürekli çalışma için tasarlanmamış alandır. Gemide bunlar; cargo hold, ballast/yakıt/yağ tankları, void space, cofferdam, duct keel, pump room, chain locker, sewage tank ve benzeri alanlardır. Bu alanların atmosferi gözle değerlendirilemez; oksijensiz veya zehirli olabilir.`,
            `Tehlike sinsidir çünkü atmosfer normal görünür ama öldürücüdür. Oksijen eksikliği (paslanma, kargo off-gassing veya inert gas nedeniyle) bilinç kaybını saniyeler içinde getirir. Kurban düştüğünde, hazırlıksız kurtarmaya koşan ikinci, üçüncü kişi de aynı atmosferde ölür; "multiple fatality" örüntüsü bu işin imzasıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çoklu ölüm örüntüsü",
              text: `Kapalı alan kazalarında ölenlerin çoğu, ilk kurbanı kurtarmaya hazırlıksız atılan kişilerdir. ASLA hava test edilmeden ve uygun ekipman olmadan kapalı alana girilmez; bir arkadaşı kurtarmak için bilinçsizce dalmak, ikinci cenaze demektir.`,
            },
          ],
        },
        {
          subheading: "1.2 Atmosfer tehlikelerinin kaynakları",
          paragraphs: [
            `Oksijen eksikliği: çelik paslanması (oksijen tüketir), kargo oksidasyonu/off-gassing (örn. çelik, kömür, tarım ürünleri), inert gas ve mikrobiyal aktivite. Toksik gazlar: H₂S (çürüyen organik madde, slop), CO (eksik yanma, self-heating kargo), kargo buharları (VOC). Yanıcı gazlar: hidrokarbon buharı (tanker), metan. Birinci Zabit, alanın önceki kullanımına göre hangi tehlikenin olası olduğunu öngörür.`,
          ],
        },
      ],
    },
    {
      heading: "2. Enclosed Space Entry Permit Sistemi",
      sections: [
        {
          subheading: "2.1 Permit'in amacı ve Birinci Zabit'in rolü",
          paragraphs: [
            `Enclosed Space Entry Permit, girişin tüm güvenlik koşullarının sağlandığını belgeleyen ve girişe izin veren resmi bir kontrol aracıdır. A.1050(27) ve şirket SMS'i, bu permit'in yetkili kişi (genelde Birinci Zabit) tarafından imzalanmasını şart koşar. Permit, hangi alana, ne süreyle, hangi kişilerce ve hangi koşullarda girileceğini tanımlar.`,
            `Birinci Zabit, permit imzalamadan önce atmosfer testi sonuçlarını, havalandırmayı, rescue düzenini, haberleşmeyi ve PPE'yi bizzat doğrular. Permit, belirli bir süre için geçerlidir ve koşullar değişirse (vardiya, atmosfer) yenilenir. İmza, sorumluluğu üstlenmek demektir; rutin bir formalite değildir.`,
          ],
          bullets: [
            `Girilecek alan ve işin tanımı`,
            `Atmosfer testi sonuçları (O₂, LEL, H₂S, CO) ve zaman`,
            `Havalandırma durumu ve sürekliliği`,
            `Standby kişi ve rescue planı ataması`,
            `Haberleşme yöntemi ve PPE gereksinimi`,
            `Geçerlilik süresi ve yenileme koşulu`,
          ],
        },
        {
          subheading: "2.2 Risk assessment ve toolbox meeting",
          paragraphs: [
            `Permit öncesi, işe özgü risk assessment yapılır: alanın geçmiş kullanımı, olası tehlikeler, gerekli ekipman ve acil durum senaryosu değerlendirilir. Toolbox meeting ile girecek ekip ve standby personel görevlerini, tehlikeleri ve acil durum planını gözden geçirir. Birinci Zabit bu briefingi yönetir; herkesin "kapalı alan kuralını" anladığından emin olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO Res. A.1050(27)",
              text: `Revize tavsiyeler; risk assessment, yetkili kişi tarafından izin, atmosfer testi, sürekli havalandırma, standby kişi ve rescue düzenlemesini zorunlu kılar. SOLAS III/19 ayrıca düzenli enclosed space entry ve rescue drill ister.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Atmosfer Testi ve Ölçüm",
      sections: [
        {
          subheading: "3.1 Ölçüm sırası ve eşik değerler",
          paragraphs: [
            `Atmosfer testi belirli sırayla yapılır: önce oksijen (%19.5-23.5 aralığında olmalı), sonra yanıcı gaz (LEL <%1, hidrokarbon), sonra toksik gazlar (H₂S, CO). Ölçüm, kalibre ve sertifikalı çoklu-gaz dedektörü ile yapılır. Test, alana girmeden önce, farklı seviyelerden (üst, orta, dip — gazlar yoğunluğa göre tabakalanır) ve uzaktan (remote probe) alınır.`,
            `Birinci Zabit, ölçüm sonuçlarını permit'e kaydeder. Değerler güvenli aralıkta değilse giriş yasaktır; havalandırma sürdürülür ve yeniden ölçülür. Giriş sonrası, içeride sürekli izleme (personal monitor) yapılır çünkü atmosfer değişebilir.`,
          ],
          table: {
            caption: `Kapalı Alan Atmosfer Eşik Değerleri`,
            headers: ["Parametre", "Güvenli Değer", "Tehlike"],
            rows: [
              ["Oksijen (O₂)", "%19.5 - 23.5", "<%19.5 boğulma, >%23.5 yangın riski"],
              ["Yanıcı gaz (LEL)", "< %1 LEL", "Patlama riski"],
              ["Hidrojen sülfür (H₂S)", "< 5 ppm (TWA)", "Toksik, koku yanıltıcı"],
              ["Karbon monoksit (CO)", "< 30 ppm (TWA)", "Toksik, kokusuz"],
            ],
          },
        },
        {
          subheading: "3.2 Cihaz kalibrasyonu ve bump test",
          paragraphs: [
            `Çoklu-gaz dedektörlerinin kalibrasyon sertifikası bir yılı aşmamalı; düzenli (her kullanım öncesi) bump test (bilinen gazla fonksiyon testi) yapılmalıdır. Kalibre olmayan veya bump test yapılmamış cihaz, yanlış güvenli okuma vererek ölüme yol açar. Birinci Zabit, cihaz kayıtlarını ve kalibrasyon geçerliliğini kontrol eder.`,
            `Sensörlerin ömrü sınırlıdır (özellikle elektrokimyasal H₂S/CO sensörleri); süresi geçmiş sensör değiştirilir. Yedek cihaz ve yedek pil hazır bulundurulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bump test alışkanlığı",
              text: `Her giriş öncesi bump test, cihazın gaza tepki verdiğini saniyeler içinde doğrular. Kalibrasyon geçerli olsa bile sensör arızalanmış olabilir; bump test bu ölümcül boşluğu kapatır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Havalandırma ve Erişim Hazırlığı",
      sections: [
        {
          subheading: "4.1 Sürekli mekanik havalandırma",
          paragraphs: [
            `Kapalı alan, giriş öncesi ve giriş süresince sürekli mekanik havalandırma (forced ventilation) ile temiz hava beslemelidir. Doğal havalandırma yetersizdir. Havalandırma, alanın tüm köşelerine ulaşmalı (ölü bölge kalmamalı) ve kesilirse giriş derhal durdurulmalıdır. Birinci Zabit havalandırma yeterliliğini ölçüm ile teyit eder; havalandırma "atmosfer güvenli kalsın" diye sürdürülür.`,
          ],
        },
        {
          subheading: "4.2 Aydınlatma, erişim ve izolasyon",
          paragraphs: [
            `Alan, ex-proof (yanıcı gaz riski varsa) aydınlatma ile aydınlatılır. Giriş/çıkış yolları açık ve güvenli olmalı; merdiven/iskele sağlamlığı kontrol edilir. Tehlikeli sistemler (boru hatları, pompa, ısıtma) izole edilir/kilitlenir (lock-out tag-out) ki içeri kimyasal/sıvı/buhar girişi olmasın. Birinci Zabit bu izolasyonları doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "5. Standby Kişi, Haberleşme ve Rescue Planı",
      sections: [
        {
          subheading: "5.1 Standby kişi ve sürekli haberleşme",
          paragraphs: [
            `Giriş süresince, giriş ağzında bir standby (attendant) kişi sürekli bulunur; içerideki ekiple kesintisiz haberleşir (telsiz, ses, görsel veya halat işareti). Standby kişi ASLA içeri girmez; sorun olursa alarm verir ve rescue ekibini çağırır. İçeri tek başına dalarak ikinci kurban olmak, kapalı alan ölümlerinin ana nedenidir.`,
            `Haberleşme yöntemi önceden kararlaştırılır ve test edilir. İçerideki personel düzenli "all OK" sinyali verir; sinyal kesilirse acil durum prosedürü başlar. Birinci Zabit, standby kişinin görevini tam anladığından emin olur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Standby kişi içeri girmez",
              text: `Standby kişinin tek görevi dışarıda kalıp izlemek ve alarm vermektir. İçeride biri düşerse, standby kişi rescue ekibini ve SCBA'yı bekler; kendisi dalarsa ölür. Bu kural istisnasızdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Rescue ekipmanı ve tatbikat",
          paragraphs: [
            `Rescue planı; SCBA (Self-Contained Breathing Apparatus), rescue harness, kaldırma sistemi (tripod/winch), resuscitation ekipmanı ve ilk yardımı içerir. Bu ekipman giriş ağzında hazır bulundurulur. SOLAS III/19, düzenli (en az iki ayda bir, gemiye göre) enclosed space entry ve rescue drill'i zorunlu kılar; Birinci Zabit bu tatbikatları organize eder, gerçekçi senaryolarla uygular ve kaydeder.`,
            `Tatbikatlar, kurtarmanın hızlı ve doğru yapılmasını sağlar; gerçek kazada saniyeler hayat kurtarır. Tatbikatta tespit edilen eksikler düzeltilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — kurtarmaya giden kurban",
              text: `Bir gemide ballast tanka giren tayfa oksijen eksikliğinden düştü; arkadaşı SCBA'sız kurtarmaya daldı ve o da öldü. Soruşturma: atmosfer test edilmemiş, standby kişi yok, rescue planı uygulanmamıştı. Ders: kural ihlali çoklu ölüm getirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Özel Alanlar ve Ek Tehlikeler",
      sections: [
        {
          subheading: "6.1 Tanker pump room ve kargo tankları",
          paragraphs: [
            `Tanker pump room ve kargo tankları, hidrokarbon buharı ve oksijen eksikliği açısından yüksek risklidir. Inert gas ile doldurulmuş tank tamamen oksijensizdir; gas-free certificate alınmadan giriş yasaktır. ISGOTT, tanker kapalı alan girişinde ek prosedürler (gas-freeing, sürekli izleme) tanımlar. Birinci Zabit, kargo officer ile koordineli bu koşulları sağlar.`,
          ],
        },
        {
          subheading: "6.2 Hold, void ve self-heating kargo etkisi",
          paragraphs: [
            `Self-heating kargo (kömür, DRI) bulunan hold/void'da O₂ tükenmesi ve CO/metan birikimi olur. Cargo declaration'a göre Birinci Zabit, bu alanların hangi tehlikeyi taşıdığını öngörür ve giriş öncesi mutlaka ölçüm yapar. "Boş görünen" bir hold bile önceki kargo nedeniyle ölümcül atmosfere sahip olabilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Kayıt ve Sürekli İyileştirme",
      sections: [
        {
          subheading: "7.1 Permit ve ölçüm kayıtları",
          paragraphs: [
            `Her enclosed space entry permit, atmosfer ölçüm sonuçları, cihaz kalibrasyon kaydı, standby atama ve giriş/çıkış zamanları ile arşivlenir. Bu kayıtlar PSC, vetting ve kaza soruşturmasında en sık incelenenlerdendir. Birinci Zabit, kayıtların eksiksiz ve gerçeği yansıttığından emin olur.`,
          ],
        },
        {
          subheading: "7.2 Near-miss ve kültür",
          paragraphs: [
            `Kapalı alan ile ilgili near-miss'ler (örn. cihaz arızası, havalandırma kesintisi) raporlanır ve analiz edilir. Birinci Zabit, "kapalı alana asla test etmeden girilmez" kültürünü sürekli pekiştirir. Bu kültür, tek bir disiplin sapmasının ölüm getirdiği bir alanda hayati önemdedir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kültür her şeydir",
              text: `Kapalı alan emniyeti ekipmandan çok kültürdür. "Hızlı bir bakış için girivereyim" mentalitesi öldürür. Her giriş, istisnasız, permit + test + standby + rescue düzeni ile yapılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in kapalı alan checklist'i",
          bullets: [
            `Risk assessment ve toolbox meeting yapıldı mı?`,
            `Atmosfer O₂ (%19.5-23.5), LEL, H₂S, CO güvenli mi?`,
            `Ölçüm cihazı kalibre (≤1 yıl) ve bump test yapıldı mı?`,
            `Sürekli mekanik havalandırma çalışıyor mu?`,
            `Tehlikeli sistemler izole/kilitli mi (LOTO)?`,
            `Standby kişi atandı ve içeri girmeyeceğini biliyor mu?`,
            `Kesintisiz haberleşme test edildi mi?`,
            `SCBA, rescue harness, kaldırma sistemi giriş ağzında hazır mı?`,
            `Permit yetkili (Birinci Zabit) tarafından imzalandı mı?`,
            `Tüm ölçüm ve permit kayıtları dokümante edildi mi?`,
          ],
          paragraphs: [
            `Kapalı alan girişi, kurallara harfiyen uyulduğunda güvenli, en küçük sapmada ölümcül bir operasyondur. Birinci Zabit'in başarısı; her girişte permit-test-standby-rescue zincirini eksiksiz uygulamak, cihazların güvenilirliğini sağlamak ve ekibe "asla test etmeden girme, asla kurtarmaya bilinçsizce dalma" kültürünü kazandırmaktır. Bu disiplin, doğrudan hayat kurtarır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
