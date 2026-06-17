import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yük operasyonlarında güverte desteği",
  roleSlug: "reis-bosun",
  taskIndex: 4,
  estimatedPages: 25,
  intro: `Reis (Bosun), yük operasyonlarında Birinci Zabit'in sahadaki sağ kolu ve güverte ekibinin operasyonel lideridir. Yük planını Birinci Zabit hazırlar; ancak hatch cover'ın güvenle açılıp kapanması, lashing/securing'in fiilen ve doğru yapılması, hold'ların yüke hazırlanması, sounding ve bilge kontrollerinin destek verilmesi sahada Reis'in elindedir. Bu bölüm; hatch cover operasyonları, lashing/securing pratiği, hold hazırlığı ve temizliği, sounding ve bilge desteği, güverte üzeri yük emniyeti ve operasyon güvenliğini detaylı olarak ele alır.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes",
    "CSS Code (Code of Safe Practice for Cargo Stowage and Securing)",
    "Cargo Securing Manual (CSM) — gemiye özel klas onaylı",
    "IMSBC Code — katı dökme yük taşımacılığı",
    "Code of Safe Working Practices (COSWP) — MCA",
    "OCIMF / Rightship — cargo & deck operation standards",
    "Thomas' Stowage and Cargo Work",
  ],
  chapters: [
    {
      heading: "1. Yük Operasyonunda Reis'in Rolü",
      lead: `Birinci Zabit planlar ve koordine eder; Reis sahada uygular ve denetler. Bu iş bölümü, güvenli ve verimli yük operasyonunun temelidir.`,
      sections: [
        {
          subheading: "1.1 Görev sınırı ve iletişim",
          paragraphs: [
            `Reis, yük operasyonu öncesi Birinci Zabit'ten talimatı alır: loading/discharging sırası, hangi hold/hatch'in ne zaman açılacağı, lashing planı, hold hazırlık seviyesi ve güvenlik kısıtları. Bu talimatları toolbox meeting'le ekibe aktarır ve operasyon boyunca duty officer ile telsiz iletişimini sürdürür.`,
            `Sahada bir sapma görülürse (ekipman arızası, lashing yetersizliği, beklenmedik su girişi, stevedore hatası) Reis derhal Birinci Zabit'i bilgilendirir. Sahanın gözü kulağı odur; rapor zinciri kesilirse operasyon güvenliği zayıflar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Reis sahanın gözüdür",
              text: `Köprüüstü ve kargo ofisi her şeyi göremez. Reis'in zamanında verdiği bir uyarı (örn. lashing gevşemesi, hatch seal sızıntısı) büyük hasarları önler. Şüphe varsa rapor et — geç kalan rapor, hasarın kendisidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Operasyon öncesi güvenlik kontrolü",
          paragraphs: [
            `Operasyon başlamadan Reis; PPE kontrolü (baret, emniyet ayakkabısı, eldiven, yüksek görünürlük yelek), aydınlatma, kaçış yolları, ekipman çalışırlığı ve stevedore ile etkileşim noktalarını gözden geçirir. Yük operasyonunda mürettebat ile sahil işçisi (stevedore) arasındaki koordinasyon kazaların önemli bir kaynağıdır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Hatch Cover Açma / Kapama Operasyonu",
      sections: [
        {
          subheading: "2.1 Hatch cover tipleri ve güvenli operasyon",
          paragraphs: [
            `Folding (katlanır), side-rolling (yana kayan), piggy-back ve pontoon tip hatch cover'lar farklı operasyon disiplini ister. Reis; açma/kapama öncesi cleat'lerin açıldığını, drainage kanallarının temiz olduğunu, raylarda engel olmadığını ve hidrolik sistemin hazır olduğunu doğrular.`,
            `Hatch cover operasyonu sırasında ezilme (crushing) ve düşme riski yüksektir. Hareket eden cover ile sabit yapı arasında hiçbir mürettebat bulunmamalı; "no-go zone" net belirlenmeli ve gözetim sağlanmalıdır. Cover hareket ederken altında veya yolunda kimse kalmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hatch cover = ezilme riski",
              text: `Hareket eden hatch cover, onlarca tonluk ağır bir kütledir. Hidrolik veya kayma sırasında pinch point'lerde el/ayak/gövde ezilmesi ölümlüdür. Cover hareket ederken hareket hattında ve altında asla durulmaz; operatör görüş ve iletişim altında çalışır.`,
            },
          ],
        },
        {
          subheading: "2.2 Sızdırmazlık ve weathertight bütünlük",
          paragraphs: [
            `Hatch cover'ın weathertight (su geçirmez) olması, hold içindeki yükü deniz suyundan korur. Reis; rubber gasket, compression bar, drainage channel ve non-return valve durumunu kontrol eder. Yüklü hold'a su girişi, yükün bozulması ve geminin stabilite/strenght sorunları açısından kritiktir.`,
            `Kapama sonrası compression mark (rubber'ın eşit baskı izi) kontrol edilir; eşit olmayan baskı, gasket veya bar ayar sorununa işaret eder. Cleating doğru ve sıkı yapılır; denizde gevşek cleat, kötü havada cover hasarı ve su girişi demektir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Lashing ve Securing Operasyonları",
      sections: [
        {
          subheading: "3.1 Cargo Securing Manual'e uyum",
          paragraphs: [
            `Her gemi, klas onaylı Cargo Securing Manual (CSM) taşır. Bu manuel; lashing ekipmanının MSL (Maximum Securing Load) değerlerini, onaylı lashing pattern'leri ve yöntemleri içerir. Reis, sahada uygulanan lashing'in bu manuele uygun olmasını sağlar; "doğaçlama" lashing kaza ve yük kaybı nedenidir.`,
            `Twist lock, lashing rod, turnbuckle, web/chain lashing, dunnage ve shoring; yük tipine göre seçilir ve doğru tork/gerilimle uygulanır. Reis, lashing tightness'ı (gerginlik) kontrol eder ve gevşek lashing'i derhal düzeltir.`,
          ],
          table: {
            caption: `Tipik Lashing Ekipmanı ve Kullanım Alanı`,
            headers: ["Ekipman", "Kullanım", "Kontrol Noktası"],
            rows: [
              ["Twist lock", "Container köşe birleşimi", "Kilit pozisyonu, aşınma"],
              ["Lashing rod + turnbuckle", "Container alt tier", "Gerginlik, diş hasarı"],
              ["Web lashing", "Ro-Ro / proje yükü", "Yırtık, gerginlik, ratchet"],
              ["Chain lashing", "Ağır yük, makine", "Kink, aşınma, kanca"],
              ["Dunnage / shoring", "Dökme/genel yük desteği", "Sağlamlık, oturma"],
            ],
          },
        },
        {
          subheading: "3.2 Lashing güvenliği ve ekip pratiği",
          paragraphs: [
            `Lashing işi, sırt-bel yaralanmaları, parmak ezilmeleri ve yüksekten düşme açısından risklidir. Reis; doğru kaldırma tekniği, lashing bridge'lerde harness kullanımı, ağır lashing rod taşıma için ekip çalışması ve uygun el aletini denetler. Lashing cage / platform üzerinde çalışırken düşme önlemi şarttır.`,
            `Sefer boyunca lashing rutin olarak kontrol edilir; özellikle kötü hava öncesi ve sonrası "lashing inspection" yapılır. Gevşeyen lashing yeniden gerdirilir. Reis, bu kontrollerin kayıtlarını tutar ve Birinci Zabit'e raporlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: lashing gevşemesi ve kötü hava",
              text: `Pasifik geçişlerinde container kayıplarının çoğu, kötü hava + yetersiz/gevşek lashing kombinasyonundan doğdu. Sefer öncesi sıkı lashing ve kötü hava öncesi yeniden kontrol, ekibin elindeki en güçlü önlemdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Cargo Hold Hazırlığı ve Temizliği Desteği",
      sections: [
        {
          subheading: "4.1 Hold hazırlık seviyeleri",
          paragraphs: [
            `Dökme yük gemilerinde hold hazırlığı; bir sonraki yüke ve charter şartına göre seviyelendirilir: load-ready (süpürme), shovel-clean, grain-clean, hospital-clean. Reis, hangi seviyenin istendiğini Birinci Zabit'ten alır ve ekibi buna göre yönetir.`,
            `Hold temizliği; süpürme, deniz suyu yıkama, tatlı su durulama, kurutma, koku giderme, paint touch-up ve bilge well temizliğini kapsar. Önceki yük artığı (taint), bir sonraki yükü kontamine edebilir; bu nedenle temizlik standartı titizdir.`,
          ],
          bullets: [
            `Load-ready: süpürme, görünür kalıntı yok`,
            `Shovel-clean: kürek temizliği, gözle temiz`,
            `Grain-clean: tahıl için kuru, kokusuz, paint hasarsız`,
            `Hospital-clean: hassas yükler için laboratuvar düzeyi`,
          ],
        },
        {
          subheading: "4.2 Hold içi çalışma güvenliği",
          paragraphs: [
            `Cargo hold, bir enclosed space'tir. Reis; hold'a giriş öncesi enclosed space entry permit, atmosfer ölçümü (O2, LEL, H2S, CO), havalandırma ve standby kişi gerekliliklerini sağlar. Hold ladder, aydınlatma ve kaçış yolu kontrol edilir.`,
            `Yıkama suyu ve kimyasal kullanımı, kayma ve solunum riski yaratır; uygun PPE ve havalandırma şarttır. Yıkama sonrası kullanılan suyun MARPOL kurallarına uygun tahliyesi (özellikle yük artığı içeriyorsa) Birinci Zabit koordinasyonunda yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hold = kapalı mekan",
              text: `Cargo hold'a giriş, enclosed space entry disiplini gerektirir. Atmosfer ölçümü yapılmadan, havalandırma sağlanmadan ve standby kişi atanmadan hold'a girilmez. "Sadece bakacağım" refleksi, ölümle sonuçlanan en yaygın hatadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Sounding, Ullage ve Bilge Kontrolü Desteği",
      sections: [
        {
          subheading: "5.1 Tank ve bilge sounding desteği",
          paragraphs: [
            `Reis ve güverte ekibi, ballast/freshwater/void space sounding'lerine ve hold bilge ölçümlerine destek verir. Sounding pipe head'lerin temiz ve açık olması, doğru sounding tape kullanımı ve ölçümün doğru kayda geçmesi önemlidir. Yanlış sounding, stabilite ve strenght hesaplarını bozar.`,
            `Hold bilge sounding'i, hold içine su girişinin erken işaretidir. Operasyon ve seyir sırasında düzenli bilge sounding ile artış tespit edilirse derhal Birinci Zabit ve köprüüstü uyarılır; bu, hatch seal sorunu veya gövde sızıntısının erken alarmıdır.`,
          ],
        },
        {
          subheading: "5.2 Bilge sistemi ve drainage",
          paragraphs: [
            `Bilge well'ler temiz tutulur; tıkalı strum box veya bilge suction, hold suyunun boşaltılamamasına yol açar. Reis, bilge well rose box ve non-return valve durumunu kontrol eder. Dökme yük gemilerinde bilge well'in yük artığıyla tıkanması, sounding ve drenajı imkansız kılar; bu hold güvenliği açısından kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Güverte Üzeri Yük ve Deck Cargo Emniyeti",
      sections: [
        {
          subheading: "6.1 On-deck yük emniyeti",
          paragraphs: [
            `Güverte üzeri yük (container, boru, proje yükü, kereste) deniz koşullarına doğrudan maruz kalır. Reis; lashing pattern'in doğru, dunnage'ın yeterli ve yük dağılımının plana uygun olmasını sahada denetler. Timber deck cargo gibi özel yüklerde TDC Code gereklilikleri uygulanır.`,
            `On-deck reefer container'ların plug bağlantısı, hava sirkülasyonu ve erişim yolu kontrol edilir. Güverte üzeri yük, kaçış yolları ve ekipman erişimini engellememelidir; bu, hem güvenlik hem denetim meselesidir.`,
          ],
        },
        {
          subheading: "6.2 Sefer boyunca izleme",
          paragraphs: [
            `Reis, hava elverdiğinde ve güvenliyse güverte üzeri yükün lashing durumunu periyodik kontrol eder. Kötü havada güverteye çıkmak tehlikelidir; bu yüzden kontroller hava penceresinde, gözetim ve harness ile yapılır. Gevşeyen lashing veya kayan yük derhal raporlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "CSS Code — securing arrangements",
              text: `CSS Code, yükün geminin tüm hareket koşullarında (roll, pitch, heave) emniyette kalmasını şart koşar. Lashing, gemiye özgü CSM'e uygun olmalı; ekstrem koşullar için Annex 13 hesabı esastır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Stevedore Koordinasyonu ve Hasar Önleme",
      sections: [
        {
          subheading: "7.1 Stevedore ile çalışma",
          paragraphs: [
            `Yük operasyonunda sahil işçileri (stevedore) güvertede çalışır. Reis; stevedore hareketlerini gözler, mürettebat ile stevedore çalışma alanlarının çakışmasını yönetir ve güvenlik kurallarına uyumu izler. Dil ve pratik farkları kaza riski yaratabilir; net işaretleme ve gözetim önemlidir.`,
          ],
        },
        {
          subheading: "7.2 Stevedore damage ve raporlama",
          paragraphs: [
            `Stevedore kaynaklı hasar (hatch cover, korkuluk, boya, ekipman) sık görülür. Reis, hasarı anında tespit eder, fotoğraflar ve Birinci Zabit'e raporlar; gerekirse stevedore damage report ve Letter of Protest düzenlenir. Zamanında belgelenmeyen hasar, sonradan gemi/şirket sorumluluğuna kalır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hasarı anında belgele",
              text: `Stevedore damage, oluştuğu an fotoğraflanmaz ve raporlanmazsa, terminal sorumluluğu reddedebilir. Reis'in zamanlı kaydı, şirketin tazminat hakkını korur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Operasyon Güvenliği ve Permit Sistemi",
      sections: [
        {
          subheading: "8.1 Permit-to-work ve risk değerlendirmesi",
          paragraphs: [
            `Yük operasyonunda bazı işler permit gerektirir: enclosed space entry (hold), working aloft (lashing bridge üst tier), working overside ve hot work. Reis, ekibin permit kapsamı dışına çıkmamasını saha gözetimiyle sağlar ve job-specific risk assessment'in uygulanmasını izler.`,
            `Yorgunluk yönetimi de operasyon güvenliğinin parçasıdır. Uzun liman operasyonlarında MLC dinlenme saatleri gözetilir; yorgun ekip, lashing ve hatch operasyonunda kaza riskini artırır.`,
          ],
        },
        {
          subheading: "8.2 Toolbox ve eğitim",
          paragraphs: [
            `Her vardiya/operasyon öncesi Reis, ekibe işin adımlarını, riskleri, ekipmanı ve acil durum prosedürünü anlatan toolbox meeting yapar. Genç tayfaya lashing tekniği, hatch operasyonu ve hold güvenliği pratik olarak öğretilir; bu eğitim deck training book'a kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Saha Senaryoları",
      sections: [
        {
          subheading: "9.1 Container gemisinde lashing sefer hazırlığı",
          paragraphs: [
            `Yükleme sonrası Reis, ekiple birlikte tüm bay'lerde lashing pattern'i kontrol eder: twist lock kilitli mi, lashing rod gergin mi, turnbuckle sıkı mı. Kötü hava beklenen sefer öncesi tüm lashing iki kez kontrol edilir ve kayıt tutulur. Sefer ortasında hava penceresinde tekrar inspection yapılır.`,
          ],
        },
        {
          subheading: "9.2 Bulker'da hold geçişi ve hazırlık",
          paragraphs: [
            `Coal boşaltması sonrası grain yükleme için hold; süpürme, deniz suyu yıkama, tatlı su durulama, kurutma ve koku/leke kontrolü ile hazırlanır. Reis, her hold'un enclosed space disiplinine uygun girilmesini, NCB veya surveyor inspection'a hazır olmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "10.1 Reis'in yük operasyonu checklist'i",
          bullets: [
            `Operasyon talimatı Birinci Zabit'ten alındı ve toolbox yapıldı mı?`,
            `Hatch cover açma/kapama güvenli, no-go zone net mi?`,
            `Hatch weathertight bütünlüğü (gasket, drainage) kontrol edildi mi?`,
            `Lashing CSM'e uygun, gergin ve kayıtlı mı?`,
            `Hold hazırlık seviyesi doğru, enclosed space disiplini sağlandı mı?`,
            `Sounding / bilge kontrolü yapıldı, anormallik raporlandı mı?`,
            `Güverte üzeri yük emniyetli ve erişim açık mı?`,
            `Stevedore damage tespit edilip belgelendi mi?`,
            `Permit'ler ve risk değerlendirmesi uygulandı mı?`,
            `Kötü hava öncesi lashing yeniden kontrol edildi mi?`,
          ],
          paragraphs: [
            `Yük operasyonunda Reis'in başarısı; planı sahada eksiksiz, güvenli ve zamanında uygulamasından gelir. Hatch'in su geçirmezliği, lashing'in sağlamlığı ve hold'un doğru hazırlığı; hem yükün hem ekibin hem de geminin emniyetini belirler. İyi bir reis, bir tek gevşek lashing'i bile gözünden kaçırmaz; çünkü denizde gevşek bırakılan, kötü havada kaybedilendir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
