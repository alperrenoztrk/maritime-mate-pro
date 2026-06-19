import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Ağır hava (heavy weather) hazırlığı ve güverte emniyeti",
  roleSlug: "birinci-zabit",
  taskIndex: 10,
  estimatedPages: 25,
  intro: `Kötü hava öngörüldüğünde ya da seyir sırasında karşılaşıldığında güverte departmanının hazırlığını koordine etmek Birinci Zabit'in sorumluluğudur. Bu sorumluluk; hatch cover'ların sıkıca kapatılması ve cleating kontrolü, güverte üzeri tüm loose ekipmanın lashing'i, vinç kancalarının güvenceye alınması, gangway/pilot merdiveninin kaldırılması, freeing port ve scupper'ların serbestliğinin doğrulanması ile personelin güverte hareketini kısıtlayan emrin uygulanmasını kapsar. Ağır hava, su girişi, yük kayması, container kaybı ve mürettebat yaralanmasının en sık nedenidir; bu bölüm Birinci Zabit'in heavy weather hazırlık metodolojisini açıklar.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes (lashing)",
    "International Convention on Load Lines 1966/1988 (freeing ports, weathertight)",
    "CSS Code — Code of Safe Practice for Cargo Stowage and Securing",
    "IMO MSC.1/Circ.1228 — Avoidance of Dangerous Situations in Adverse Weather",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "Bridge Procedures Guide (ICS) — Heavy Weather Procedures",
    "Cargo Securing Manual (ship-specific)",
    "Thomas' Stowage and Cargo Work for Tomorrow's Mariners",
  ],
  chapters: [
    {
      heading: "1. Hava Tahmini ve Erken Hazırlık",
      lead: `Ağır hava hazırlığının ilk adımı, tehlikeyi yeterince önceden öngörmektir.`,
      sections: [
        {
          subheading: "1.1 Weather routing ve tahmin takibi",
          paragraphs: [
            `Birinci Zabit, köprüüstü ile koordineli olarak hava tahminlerini (NAVTEX, weather routing servisleri, GMDSS yayınları, gribler) izler ve ağır hava penceresini önceden belirler. Weather routing servisi (örn. tropikal siklon, derin alçak basınç sistemleri) önceden uyarı verir; bu sayede hazırlık sakin denizde, güvenle yapılır. Fırtına geldikten sonra güvertede çalışmak ölümcül risktir.`,
            `Tahmindeki dalga yüksekliği, periyot, swell yönü ve rüzgar şiddeti, geminin yük durumu (GM, freeboard) ile birlikte değerlendirilir. Birinci Zabit, mevcut lashing'in öngörülen koşullara yeterli olup olmadığını CSM hesaplarıyla kontrol eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Zamanında hazırlık",
              text: `Heavy weather hazırlığının altın kuralı: hazırlığı hava bozulmadan, deniz sakinken yap. Güverteye çıkıp lashing sıkmak için fırtınanın gelmesini beklemek, mürettebatı denize kaptırma riskine atmaktır.`,
            },
          ],
        },
        {
          subheading: "1.2 Kaptan koordinasyonu ve karar süreci",
          paragraphs: [
            `Birinci Zabit, hazırlık durumunu ve riskleri Kaptan'a raporlar. Rota değişikliği, hız azaltma (slow steaming/heave-to), liman barınması (port of refuge) veya bekleme kararları Kaptan tarafından alınır; Birinci Zabit güverte tarafındaki uygulamayı yürütür. MSC.1/Circ.1228, parametric/synchronous rolling ve broaching gibi tehlikeli durumlardan kaçınmak için hız/rota ayarını önerir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Hatch Cover ve Su Geçirmezlik",
      sections: [
        {
          subheading: "2.1 Hatch cover kapatma ve cleating",
          paragraphs: [
            `Bulk ve genel kargo gemilerinde hatch cover, geminin su girişine karşı birincil savunmasıdır. Birinci Zabit, tüm hatch cover'ların tam kapatıldığını, cleat'lerin (kapatma mandalları) bağlandığını ve cross-joint/peripheral seal'lerin (lastik contalar) sağlam olduğunu doğrular. Hasarlı veya ezilmiş conta, ağır havada hold flooding'e yol açar.`,
            `Hatch cover su geçirmezliği hose test veya ultrasonic test ile periyodik doğrulanır. Ağır hava öncesi, drainage non-return valve'lerin (drenaj çekvalfleri) çalıştığı ve compression bar'ların temas ettiği kontrol edilir. Çift kontrol, en sık görülen su girişi nedenini ortadan kaldırır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — hatch cover ve hold flooding",
              text: `Birçok bulk carrier kaybı, ağır havada zayıf/hasarlı hatch cover'dan giren suyun hold'u doldurması ve gemiyi batırmasıyla yaşandı (örn. çok sayıda capesize kaybı). Ders: hatch cover bütünlüğü ve cleating, ağır havada hayat-memat meselesidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Açıklıkların ve havalandırmaların kapatılması",
          paragraphs: [
            `Tüm weathertight ve watertight açıklıklar (kapaklar, ventilatörler, hava firarları, manhole, sounding pipe kapakları) ağır hava öncesi kapatılır ve dogged (kilitlenir). Ventilator'ların kapatılması özellikle önemlidir; açık ventilatör, üzerine binen dalga ile hold/store'a su alır. Birinci Zabit bu kapatmaları fiziken kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "3. Güverte Üstü Lashing ve Securing",
      sections: [
        {
          subheading: "3.1 Loose ekipmanın bağlanması",
          paragraphs: [
            `Güverte üzerindeki tüm hareketli/gevşek ekipman ağır havada ölümcül mermilere dönüşür. Birinci Zabit; pilot ladder, gangway, hortumlar, drum'lar, kaynak ekipmanı, store kapakları ve tüm loose item'ların lashing'ini denetler. Hiçbir şey "kendi ağırlığıyla durur" varsayılmaz; her şey sabitlenir.`,
            `Pilot/accommodation ladder ve gangway içeri alınır ve bağlanır; aksi halde dalga ile parçalanır ve gemi gövdesine zarar verir. Vinç (crane) kancaları parlatılır, jib güvenli pozisyona alınır ve sabitlenir.`,
          ],
          bullets: [
            `Pilot ladder, gangway içeri alınıp lashing edildi mi?`,
            `Vinç jib/kanca güvenli pozisyona alınıp bağlandı mı?`,
            `Hortum, drum, store kapağı gibi loose item'lar sabit mi?`,
            `Mooring line/teller drum üzerinde güvenli mi?`,
            `Lifeboat/liferaft güvenliği etkilenmeden korundu mu?`,
          ],
        },
        {
          subheading: "3.2 Yük lashing'inin yeniden değerlendirilmesi",
          paragraphs: [
            `Container, ro-ro, project cargo ve deck cargo lashing'i, öngörülen ağır hava ivmelerine göre CSM/CSS Code hesaplarıyla yeniden değerlendirilir. Gerekirse ek lashing eklenir ve mevcut lashing tightness (gerginlik) kontrol edilir; gevşeyen turnbuckle'lar sıkılır. Deniz tutması başladıktan sonra lashing kontrolü için güverteye çıkmak son derece tehlikelidir, bu yüzden hazırlık önceden tam yapılır.`,
            `Container gemilerinde parametric rolling riski varsa, lashing kuvvetleri çok artar; bu durumda hız/rota değişimi tek güvenli çözümdür. ONE Apus (2020) ve Maersk Essen (2021) gibi büyük container kayıpları, ağır hava + yetersiz lashing/securing kombinasyonundan kaynaklandı.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "CSS Code & CSM",
              text: `Lashing yeterliliği, Cargo Securing Manual ve CSS Code Annex 13 hesap yöntemleriyle doğrulanır. Beaufort 9 ve ötesi koşullarda transverse/longitudinal/vertical kuvvetlerin karşılanabildiği gösterilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Freeboard, Scupper ve Su Tahliyesi",
      sections: [
        {
          subheading: "4.1 Freeing port ve scupper serbestliği",
          paragraphs: [
            `Güverteye binen su hızla tahliye olmalıdır; aksi halde biriken su (water on deck) hem ağırlık hem serbest yüzey etkisiyle stabiliteyi tehlikeye atar. Birinci Zabit, freeing port'ların (bulwark açıklıkları) ve scupper'ların tıkalı olmadığını, freeing port kapaklarının (varsa) serbestçe açıldığını doğrular. Load Line Convention bunları zorunlu kılar.`,
            `Yük artığı, çöp, halat veya buz freeing port'u tıkayabilir; ağır hava öncesi temizlik yapılır. Tıkalı tahliye, ölümcül su birikmesine neden olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Load Line Convention — freeing ports",
              text: `Uluslararası Yükleme Sınırı Sözleşmesi, güverteye binen suyun hızlı tahliyesi için freeing port alanını ve serbest çalışmasını zorunlu kılar. Tıkalı veya bağlı freeing port ciddi bir emniyet ve mevzuat ihlalidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Buzlanma (icing) hazırlığı",
          paragraphs: [
            `Soğuk bölgelerde güverte üstü buzlanma (superstructure icing), ağırlık merkezini yükseltir ve stabiliteyi ciddi tehdit eder. Birinci Zabit, buz birikimini izler, buz kırma (de-icing) önlemlerini koordine eder ve freeing port'ların buzla tıkanmasını önler. Aşırı icing, balıkçı ve küçük gemilerde alabora nedenidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Personel Emniyeti ve Güverte Erişim Kısıtlaması",
      sections: [
        {
          subheading: "5.1 Güverte hareketini kısıtlama emri",
          paragraphs: [
            `Ağır hava başladığında Birinci Zabit (Kaptan onayıyla), güverteye çıkışı yasaklayan veya sıkı kısıtlayan emri verir ve uygular. Güverteye binen dalga (boarding sea/green water) bir insanı anında denize sürükleyebilir. Zorunlu olmadıkça hiç kimse açık güverteye çıkmaz; çıkılması gerekiyorsa lifeline (emniyet halatı), can yeleği ve refakatçi ile çıkılır.`,
            `İç koridorlarda ve kamaralarda da loose item'lar (mobilya, kayan ekipman) sabitlenir; mürettebata sert hareket beklemeleri ve tutunmaları söylenir. Yemekhane/mutfakta kayma ve yanık riski için önlem alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Güverteye çıkış = ölüm riski",
              text: `Ağır havada açık güverteye binen dalga (green water) bir insanı saniyeler içinde denize sürükler. Güverte erişimi zorunlu olmadıkça tamamen yasaklanır; mecbur kalınırsa lifeline + can yeleği + refakat şarttır.`,
            },
          ],
        },
        {
          subheading: "5.2 Sıkı kapatma ve iç emniyet",
          paragraphs: [
            `Tüm watertight kapılar kapatılır, accommodation girişleri dogged edilir. Köprüüstünde nöbet güçlendirilir; rotaya ve hıza ait kararlar sürekli gözden geçirilir. Birinci Zabit, hazırlık tamamlandığında köprüüstüne "güverte sea-secured" raporu verir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Manevra Tehlikeleri ve Stabilite",
      sections: [
        {
          subheading: "6.1 Parametric ve senkron yalpa",
          paragraphs: [
            `Belirli dalga periyotları geminin doğal yalpa periyoduna yakınsa, parametric rolling veya synchronous rolling oluşur; yalpa açısı tehlikeli seviyeye ulaşır, lashing kuvvetleri katlanır ve container/yük kaybı yaşanır. MSC.1/Circ.1228, bu durumlardan kaçınmak için karşılaşma periyodunu (encounter period) değiştirecek hız/rota ayarını önerir.`,
            `Broaching ve pooping (kıçtan dalga binmesi) takip eden denizde (following sea) tehlikelidir. Birinci Zabit, yük/lashing açısından bu risklere karşı hazır olur; nihai manevra kararı köprüüstündedir ancak güverte tarafının hazırlığı kritiktir.`,
          ],
        },
        {
          subheading: "6.2 Serbest yüzey ve slack tank yönetimi",
          paragraphs: [
            `Yarı dolu tanklardaki serbest yüzey etkisi (free surface effect), ağır havada efektif GM'yi düşürür ve stabiliteyi bozar. Birinci Zabit (balast yönetimiyle koordineli), tankların mümkünse press-up (tam dolu) veya boş tutulmasını sağlar; slack tank sayısı minimize edilir. Bu, ağır hava stabilitesinin sık ihmal edilen ama kritik bir parçasıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Slack tank azaltma",
              text: `Ağır hava öncesi yarı dolu (slack) tankları azaltmak free surface etkisini ve liste riskini düşürür. Balast tankları mümkünse press-up edilir veya boşaltılır; çoklu slack tank stabilite için tehlikelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Ağır Hava Sırası ve Sonrası",
      sections: [
        {
          subheading: "7.1 Fırtına sırasında izleme",
          paragraphs: [
            `Fırtına sürerken Birinci Zabit, güvenli noktalardan (köprüüstü, kapalı alanlar) yük/lashing durumunu, su girişini ve gemi davranışını izler. Lashing gevşemesi, hatch cover sızıntısı veya container hareketi tespit edilirse, müdahale ancak güvenli olduğunda ve Kaptan onayıyla yapılır; can riski taşıyan müdahaleden kaçınılır.`,
          ],
        },
        {
          subheading: "7.2 Hava düzeldikten sonra inspeksiyon",
          paragraphs: [
            `Hava sakinleştiğinde Birinci Zabit güverte inspeksiyonu yapar: hatch cover, lashing durumu, yük hasarı, su girişi, freeing port, deck ekipmanı kontrol edilir. Hasarlar fotoğraflanır, hold sounding alınır ve gerekli onarım/yeniden lashing yapılır. Yük hasarı varsa Letter of Protest ve hasar raporu hazırlanır.`,
          ],
          table: {
            caption: `Ağır Hava Sonrası İnspeksiyon Kalemleri`,
            headers: ["Alan", "Kontrol", "Aksiyon"],
            rows: [
              ["Hatch cover", "Conta, sızıntı, deformasyon", "Onarım / hold sounding"],
              ["Lashing", "Gevşeme, kopma, ekipman hasarı", "Yeniden sıkma / değişim"],
              ["Yük", "Kayma, hasar, kayıp", "Hasar raporu / LOP"],
              ["Freeing port/scupper", "Tıkanma, hasar", "Temizlik / onarım"],
              ["Deck ekipmanı", "Vinç, gangway, store", "Onarım / yerine alma"],
            ],
          },
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in heavy weather checklist'i",
          bullets: [
            `Hava tahmini takip edildi, hazırlık deniz sakinken yapıldı mı?`,
            `Tüm hatch cover kapalı, cleat ve conta kontrol edildi mi?`,
            `Ventilator/açıklıklar kapatılıp dogged edildi mi?`,
            `Güverte üstü tüm loose ekipman lashing edildi mi?`,
            `Pilot ladder/gangway içeri alındı, vinç güvenceye alındı mı?`,
            `Yük lashing'i CSM'e göre yeniden değerlendirildi/sıkıldı mı?`,
            `Freeing port ve scupper'lar serbest mi?`,
            `Slack tanklar minimize edildi, free surface yönetildi mi?`,
            `Güverte erişim kısıtlama emri verildi ve uygulandı mı?`,
            `Hava sonrası inspeksiyon ve hasar kaydı yapıldı mı?`,
          ],
          paragraphs: [
            `Ağır hava, denizciliğin en eski ve en ölümcül tehlikesidir. Birinci Zabit'in başarısı; tehlikeyi önceden öngörmek, hazırlığı sakin denizde tam yapmak, su girişini ve yük kaymasını önlemek ve en önemlisi mürettebatı güverteden uzak tutarak hiçbir hayatı riske atmamaktan geçer. İyi hazırlanmış bir gemi fırtınayı atlatır; hazırlıksız gemi haber olur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
