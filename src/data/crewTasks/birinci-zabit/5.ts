import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ISM Safety Officer görevleri",
  roleSlug: "birinci-zabit",
  taskIndex: 5,
  estimatedPages: 24,
  intro: `Birinci Zabit, çoğu gemide ISM kapsamında atanmış Safety Officer'dır. Bu rol; safety committee toplantılarını organize etmek, near-miss ve safety observation kartlarını toplamak ve analiz etmek, düzeltici/önleyici aksiyonları (CAPA) takip etmek, drill programını yürütmek ve internal audit bulgularına yanıt hazırlayarak şirket DPA'sına raporlamaktır. Bu bölüm, ISM Code'un sahaya nasıl yansıdığını ve emniyet kültürünün nasıl ölçülüp geliştirildiğini açıklar.`,
  sources: [
    "ISM Code (International Safety Management Code)",
    "SOLAS Chapter IX — Management for the Safe Operation of Ships",
    "ILO/IMO Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "OCIMF SIRE / TMSA — Management Self-Assessment",
    "IMO MSC-MEPC.7/Circ.8 — Guidance on near-miss reporting",
    "STCW Code — Safety familiarization and training",
    "Company Safety Management System (SMS) Manual",
    "MARPOL / SOLAS drill ve eğitim gereksinimleri",
  ],
  chapters: [
    {
      heading: "1. ISM Code ve Safety Officer'ın Yeri",
      lead: `ISM Code, gemiyi "kağıt üzerinde güvenli" değil, "kanıtlanabilir biçimde güvenli" yönetmeyi şart koşar.`,
      sections: [
        {
          subheading: "1.1 SMS yapısı ve roller",
          paragraphs: [
            `ISM Code, şirketin bir Safety Management System (SMS) kurmasını ve gemide uygulamasını zorunlu kılar. Sistemin sahadaki ana aktörleri; Kaptan (ISM'de en üst gemi otoritesi), Designated Person Ashore (DPA) ve gemideki Safety Officer'dır. Safety Officer genelde Birinci Zabit'tir ve emniyet sistemini "yaşatan" kişidir.`,
            `Safety Officer, denetleyici değil kolaylaştırıcıdır. Görevi; tehlikeleri görünür kılmak, raporlamayı teşvik etmek, aksiyonları takip etmek ve emniyet performansını ölçülebilir kılmaktır. Suçlama kültürü (blame culture) yerine "just culture" oluşturmak temel hedeftir; aksi halde raporlama durur ve riskler gizlenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Element 1.2.2 — Safety objectives",
              text: `Şirket; güvenli uygulamalar oluşturmak, tüm tanımlı risklere karşı önlem almak ve sürekli iyileştirme sağlamakla yükümlüdür. Safety Officer bu hedeflerin gemideki ölçüm noktasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Document of Compliance ve SMC",
          paragraphs: [
            `Şirket DOC (Document of Compliance), gemi ise SMC (Safety Management Certificate) taşır. Bu sertifikalar periyodik ve ara denetimlerle (audit) doğrulanır. Safety Officer, gemideki kayıt ve uygulamaların denetim için her an hazır olmasını sağlar; eksik kayıt non-conformity (uygunsuzluk) yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Safety Committee Toplantıları",
      sections: [
        {
          subheading: "2.1 Toplantı organizasyonu",
          paragraphs: [
            `Safety committee, Kaptan başkanlığında, tüm departman temsilcileri (zabitan, makine, güverte tayfa, ikmal) ile düzenli (genelde aylık) toplanır. Birinci Zabit gündemi hazırlar: önceki aksiyonların durumu, dönem içi near-miss/kaza, drill sonuçları, PSC/vetting bulguları, çalışan önerileri.`,
            `Toplantı tutanağa geçer; her aksiyon için sorumlu kişi ve hedef tarih atanır. Tutanak DPA'ya gönderilir ve bir sonraki toplantıda açık maddeler takip edilir. Toplantı bir formalite değil, sahanın sesinin yönetime ulaştığı kanaldır.`,
          ],
          table: {
            caption: `Safety Committee Standart Gündemi`,
            headers: ["Madde", "İçerik", "Sorumlu"],
            rows: [
              ["Açılış / önceki aksiyonlar", "Açık aksiyon takibi", "Safety Officer"],
              ["Olaylar", "Near-miss, kaza, yangın, kirlilik", "İlgili departman"],
              ["Drill / eğitim", "Yapılan tatbikat değerlendirmesi", "Safety Officer"],
              ["Denetim bulguları", "PSC, vetting, internal audit", "Kaptan"],
              ["Öneriler", "Mürettebat önerileri", "Tüm ekip"],
              ["Kapanış", "Yeni aksiyon + sorumlu + tarih", "Kaptan"],
            ],
          },
        },
        {
          subheading: "2.2 Katılımın sağlanması",
          paragraphs: [
            `İyi bir komite, sadece zabitanın konuştuğu değil, en kıdemsiz tayfanın da fikir verebildiği ortamdır. Birinci Zabit; korkusuz konuşmayı teşvik eder, "aptalca soru yoktur" ilkesini uygular ve gelen önerileri ciddiye alarak en az birini uygulamaya koyar. Uygulanan öneri, katılımı en çok artıran faktördür.`,
          ],
        },
      ],
    },
    {
      heading: "3. Near-Miss Raporlama Sistemi",
      sections: [
        {
          subheading: "3.1 Near-miss kültürü",
          paragraphs: [
            `Near-miss (ramak kala), yaralanma/hasar oluşturmamış ama oluşturabilecek olaydır. Heinrich/Bird piramidi; her ağır kaza altında onlarca near-miss ve yüzlerce güvensiz davranış olduğunu gösterir. Near-miss'leri toplamak, kazayı önlemenin en ucuz yoludur.`,
            `Safety Officer, near-miss raporlamasını teşvik eder ve raporlayanı asla cezalandırmaz. Aksine düşük raporlama, "her şey yolunda" değil "sorunlar gizleniyor" anlamına gelir. Hedef, yüksek near-miss raporu + düşük gerçek kaza kombinasyonudur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Raporlama eşiği düşük tutulur",
              text: `"Bu rapor edilecek kadar önemli mi?" sorusunun cevabı her zaman "evet"tir. Anonim/basit form, kısa metin ve hızlı geri bildirim, raporlama oranını yükseltir.`,
            },
            {
              type: "reference",
              title: "MSC-MEPC.7/Circ.8",
              text: `IMO, near-miss raporlamasını emniyet kültürünün temel göstergesi olarak tanımlar ve şirketlere yapılandırılmış bir sistem önerir.`,
            },
          ],
        },
        {
          subheading: "3.2 Safety observation kartları",
          paragraphs: [
            `Safety observation (BBS — Behaviour Based Safety) kartları, güvenli ve güvensiz davranışları anlık kaydeder. Safety Officer kartları toplar, trend analizi yapar (örn. tekrarlayan PPE eksikliği, aynı bölgede kayma riski) ve hedefli müdahale planlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Olay Araştırması ve Kök Neden Analizi",
      sections: [
        {
          subheading: "4.1 Investigation süreci",
          paragraphs: [
            `Bir kaza/near-miss sonrası olay araştırılır. Süreç; kanıt toplama (foto, tanık ifadesi, kayıt), zaman çizelgesi oluşturma, kök neden analizi (5 Why, fishbone, TRIPOD) ve düzeltici/önleyici aksiyon belirlemeyi içerir. Amaç suçlu bulmak değil, sistemdeki açığı kapatmaktır.`,
            `Yüzeysel neden ("dikkatsizlik") yeterli değildir; "neden dikkatsiz davranıldı?" sorusuyla derine inilir. Yorgunluk, yetersiz eğitim, eksik prosedür, kötü tasarım gibi latent (gizli) faktörler ortaya çıkarılır. Bu, gerçek önlemenin tek yoludur.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: tekrarlayan el yaralanması",
              text: `Bir gemide aynı vinç bakımında üç ay içinde iki el yaralanması oldu. 5 Why analizi; eldiven tipinin işe uygun olmadığını ve prosedürün el pozisyonunu belirtmediğini gösterdi. Aksiyon: doğru eldiven + güncellenmiş JSA. Tekrar yaşanmadı.`,
            },
          ],
        },
        {
          subheading: "4.2 CAPA takibi",
          paragraphs: [
            `Düzeltici (corrective) aksiyon mevcut sorunu giderir; önleyici (preventive) aksiyon benzerinin oluşmasını engeller. Her aksiyon SMART tanımlanır (sorumlu, tarih, ölçülebilir sonuç). Safety Officer açık aksiyonları takip eder; kapanmayan aksiyon denetimde tekrarlayan bulgu yaratır.`,
          ],
          table: {
            caption: `Kök Neden Analizi Araçları`,
            headers: ["Araç", "Kullanım", "Güçlü Yön"],
            rows: [
              ["5 Why", "Basit, hızlı olaylar", "Uygulaması kolay"],
              ["Fishbone (Ishikawa)", "Çok faktörlü olaylar", "Kategorize eder"],
              ["TRIPOD Beta", "Karmaşık kazalar", "Latent faktör bulur"],
              ["Bowtie", "Risk barriyer analizi", "Önleyici/azaltıcı ayrımı"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Drill ve Eğitim Programı",
      sections: [
        {
          subheading: "5.1 Zorunlu tatbikatlar",
          paragraphs: [
            `SOLAS, çeşitli tatbikatları zorunlu kılar: abandon ship ve fire drill (her ay; mürettebat değişiminde 24 saat içinde), enclosed space rescue (iki ayda bir), steering gear test, pollution/SOPEP drill. Safety Officer drill takvimini tutar, senaryoları çeşitlendirir ve gerçekçi kılar.`,
            `Drill bir "kutu işaretleme" değildir; her tatbikat değerlendirilir, eksikler kayda geçer ve bir sonraki için ders çıkarılır. Senaryolar rutinleşmemeli; gece tatbikatı, farklı yangın noktası, "kayıp adam" varyasyonları gerçek hazırlığı test eder.`,
          ],
          table: {
            caption: `Temel Drill Sıklıkları (SOLAS)`,
            headers: ["Drill", "Sıklık", "Not"],
            rows: [
              ["Abandon ship", "Aylık", "Crew değişiminde 24 saat içinde"],
              ["Fire drill", "Aylık", "Farklı senaryolar"],
              ["Enclosed space rescue", "2 ayda bir", "SOLAS III/19"],
              ["Steering gear", "Limana giriş öncesi", "Test ve değişim"],
              ["SOPEP / kirlilik", "Periyodik (SMS)", "Sahil bildirimi dahil"],
            ],
          },
        },
        {
          subheading: "5.2 Familiarization",
          paragraphs: [
            `Yeni gelen her personel, görevine başlamadan önce gemiye familiarize edilir: kaçış yolları, alarm sinyalleri, muster station, PPE konumu, kişisel kurtarma ekipmanı kullanımı. Safety Officer bu sürecin kaydını tutar; eksik familiarization PSC'de detention sebebi olabilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Internal Audit ve DPA Raporlaması",
      sections: [
        {
          subheading: "6.1 Internal audit bulguları",
          paragraphs: [
            `Şirket SMS'i periyodik internal audit yapar. Bulgular; non-conformity (NC), observation veya improvement olarak sınıflanır. Safety Officer, bulguya kök neden analiziyle yanıt hazırlar, düzeltici aksiyonu tanımlar ve kanıtla kapatır. Yüzeysel cevap ("personel uyarıldı") bulguyu kapatmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Major non-conformity",
              text: `ISM'de major NC, ciddi güvenlik/çevre tehdidi veya sistematik başarısızlıktır ve SMC'yi tehlikeye atabilir. Acil düzeltici aksiyon ve DPA koordinasyonu gerektirir.`,
            },
          ],
        },
        {
          subheading: "6.2 DPA ile iletişim",
          paragraphs: [
            `DPA, gemi ile şirketin en üst yönetimi arasında doğrudan bağdır ve gemi-kıyı arasında ISM'in "köprü" rolünü üstlenir. Safety Officer, emniyet performansı, açık aksiyonlar ve kaynak ihtiyacını DPA'ya raporlar. DPA'ya erişim hiçbir engelle kısıtlanamaz; bu ISM'in temel güvencesidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Emniyet Performansının Ölçülmesi",
      sections: [
        {
          subheading: "7.1 KPI ve trend analizi",
          paragraphs: [
            `Emniyet performansı; LTIF (Lost Time Injury Frequency), TRCF (Total Recordable Case Frequency), near-miss/observation sayısı, drill tamamlanma oranı ve açık aksiyon sayısı gibi göstergelerle izlenir. Safety Officer trendleri analiz eder ve safety committee'de sunar.`,
            `Lagging indicators (kaza sonrası) tek başına yetmez; leading indicators (near-miss, observation, eğitim) geleceğe dönük erken uyarı verir. İyi bir sistem her ikisini de izler ve dengeler.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Safety Officer kontrol listesi",
          bullets: [
            `Safety committee toplantısı yapıldı, tutanak ve aksiyonlar kayıtlı mı?`,
            `Near-miss / observation kartları toplandı ve analiz edildi mi?`,
            `Açık CAPA aksiyonları takip ediliyor ve kapatılıyor mu?`,
            `Drill takvimi güncel, son drill değerlendirildi mi?`,
            `Yeni personel familiarization tamamlandı mı?`,
            `Internal audit / PSC bulgularına kök neden yanıtı verildi mi?`,
            `Emniyet KPI'ları izleniyor ve trend raporlanıyor mu?`,
            `DPA'ya raporlama yapıldı, kaynak ihtiyaçları iletildi mi?`,
          ],
          paragraphs: [
            `Safety Officer rolü, gemideki emniyet kültürünün nabzıdır. Birinci Zabit burada sadece kayıt tutmaz; tehlikeyi görünür kılan, raporlamayı teşvik eden ve sistemin açıklarını kapatan kişidir. Güçlü bir emniyet kültürü, en iyi tek "ekipman"dan daha çok hayat kurtarır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
