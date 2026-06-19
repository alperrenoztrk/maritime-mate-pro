import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Sıcak çalışma ve izole çalışma kurallarına uyum",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 4,
  estimatedPages: 24,
  intro: `Makine dairesinde yapılan kaynak, taşlama, kesim gibi sıcak çalışmalar (hot work) ve dönen/enerjili ekipman üzerindeki bakımlar, gemideki en yüksek riskli işlerin başında gelir. Üçüncü/Dördüncü Mühendis bu işlerin permit-to-work sistemi içinde, LOTO (Lock Out – Tag Out) ve enclosed space entry prosedürleriyle güvenli biçimde yürütülmesinin sahadaki uygulayıcısıdır. Bu bölüm; risk değerlendirmesi, izolasyon, atmosfer testi ve yangın gözetimi adımlarını ISM Code ve SOLAS II-2 çerçevesinde açıklar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire protection, detection and extinction",
    "ISM Code — Safety Management System (permit-to-work, risk assessment)",
    "ISGOTT 6 — Hot work & enclosed space entry (tankerler)",
    "IMO Resolution A.1050(27) — Revised recommendations for entering enclosed spaces",
    "OCIMF / INTERTANKO hot work guidelines",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
  ],
  chapters: [
    {
      heading: "1. Sıcak Çalışmanın Tanımı ve Risk Çerçevesi",
      sections: [
        {
          subheading: "1.1 Hot work nedir, neden kritiktir?",
          paragraphs: [
            `Sıcak çalışma; açık alev, kıvılcım veya yüzey sıcaklığını tutuşma noktasına çıkarabilecek her işlemi kapsar: elektrik ark kaynağı, oksi-asetilen kesme, taşlama, matkap, sıcak raspa. Makine dairesi; yakıt, yağ buharı, sıcak yüzeyler ve sınırlı havalandırma nedeniyle bu işler için doğası gereği tehlikeli bir ortamdır.`,
            `Üçüncü/Dördüncü Mühendis, işin "rutin" görünmesinin tehlikeyi azaltmadığını bilir. Geçmişteki birçok makine dairesi yangını, izinsiz veya gözetimsiz yapılan kısa bir taşlama işinden çıkan kıvılcımın yağ emdirmiş bezi veya sintine kalıntısını tutuşturmasıyla başlamıştır.`,
          ],
          bullets: [
            `Açık alev / kaynak / kesim işleri`,
            `Taşlama, zımpara, kıvılcım üreten mekanik işler`,
            `Tutuşturucu yüzey sıcaklığı oluşturan işlemler`,
            `Yakıt/yağ tankı sınırına bitişik bölgelerde çalışma`,
          ],
        },
        {
          subheading: "1.2 Permit-to-work zorunluluğu",
          paragraphs: [
            `Hiçbir sıcak çalışma, geçerli bir Hot Work Permit olmadan başlatılamaz. Permit; işi, yerini, zaman penceresini, alınan tedbirleri ve onaylayan zabiti (genellikle Baş Mühendis ve/veya Kaptan) kayıt altına alır. Üçüncü/Dördüncü Mühendis permit şartlarının sahada fiilen sağlandığını doğrular.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code & SOLAS II-2",
              text: `Sıcak çalışma, şirket SMS'inde tanımlı permit-to-work sistemine tabidir. Tanker ve yakın tank sınırlarında ISGOTT ek şartları (gas-free sertifikası, sürekli gaz izleme) uygulanır. Permit'siz hot work, ISM non-conformity ve ciddi yangın riskidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Risk Değerlendirmesi ve İş Öncesi Planlama",
      sections: [
        {
          subheading: "2.1 Risk assessment / JSA hazırlığı",
          paragraphs: [
            `Her sıcak çalışma öncesinde bir risk değerlendirmesi (Risk Assessment) veya iş güvenliği analizi (Job Safety Analysis) yapılır. Tehlikeler tek tek listelenir, olasılık/şiddet matrisine göre derecelendirilir ve her tehlike için kontrol tedbiri belirlenir. Üçüncü/Dördüncü Mühendis formun doldurulmasına bizzat katkı verir ve sahadaki gerçekle örtüştüğünü teyit eder.`,
            `Hiyerarşik kontrol uygulanır: önce işi ortadan kaldırmak (örn. parçayı atölyeye/güverteye taşıyıp orada işlemek) veya ikame etmek, mümkün değilse mühendislik tedbirleri (ekran, havalandırma), idari tedbirler (permit, fire watch) ve son olarak KKD (PPE) devreye girer.`,
          ],
          table: {
            caption: "Tipik hot work tehlikeleri ve kontrol tedbirleri",
            headers: ["Tehlike", "Sonuç", "Kontrol tedbiri"],
            rows: [
              ["Kıvılcım sıçraması", "Yangın", "Çevre temizliği, ekran, yanıcıların kaldırılması"],
              ["Yanıcı gaz/buhar", "Patlama", "Atmosfer testi, gas-free, sürekli izleme"],
              ["Sıcak yüzey", "Temas yanığı", "Soğutma, işaretleme, KKD"],
              ["Duman/kaynak gazı", "Boğulma/zehirlenme", "Lokal havalandırma, solunum koruması"],
              ["Elektrik çarpması", "Yaralanma", "Topraklama, izolasyon, kuru zemin"],
            ],
          },
        },
        {
          subheading: "2.2 Toolbox talk ve ekip brifingi",
          paragraphs: [
            `İş başlamadan önce işi yapacak ekip, fire watch ve gözetmen mühendis kısa bir toolbox talk yapar: işin sırası, kim ne yapacak, acil durumda kim ne yapacak, en yakın yangın söndürücü/hortum nerede, kaçış yolu nasıl. Bu kısa konuşma çoğu kazayı önleyen en pratik adımdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. LOTO (Lock Out – Tag Out) Uygulaması",
      sections: [
        {
          subheading: "3.1 Enerji izolasyonunun mantığı",
          paragraphs: [
            `Dönen veya enerjili ekipman üzerinde çalışmadan önce tüm enerji kaynakları (elektrik, hidrolik, pnömatik, basınçlı akışkan, potansiyel/yerçekimi) güvenli biçimde izole edilir ve beklenmedik biçimde devreye girmesi engellenir. Lock Out fiziksel kilitle, Tag Out ise uyarı etiketiyle yapılır.`,
            `Üçüncü/Dördüncü Mühendis; breaker'ı açar, kilitler, etiketler ve mümkünse "try-out" ile (start denemesi) ekipmanın gerçekten enerjisiz olduğunu doğrular. Stop valve'ler kapatılıp kilitlenir, basınç boşaltılır, "stored energy" (akümülatör, basınçlı hat, yay) güvenli hale getirilir.`,
          ],
          bullets: [
            `Tanımla: hangi enerji kaynakları var?`,
            `Kapat: ekipmanı normal prosedürle durdur`,
            `İzole et: breaker/valf kapat ve kilitle`,
            `Etiketle: kim, neden, ne zaman`,
            `Boşalt: basınç/elektrik artık enerjiyi boşalt`,
            `Doğrula: try-out ile sıfır enerjiyi teyit et`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek kilit – tek anahtar",
              text: `İş üzerinde çalışan kişinin kilidini sadece o kişi açabilir. Birden çok kişi çalışıyorsa çoklu kilit (lock box) kullanılır. Başkasının kilidini açmak, en ağır güvenlik ihlallerinden biridir ve ölümle sonuçlanabilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Yaygın hatalar",
          paragraphs: [
            `En sık görülen hatalar: yalnızca lokal stop'a güvenip breaker'ı izole etmemek, stored energy'yi boşaltmamak, try-out yapmamak ve vardiya değişiminde devralan ekibin izolasyonu doğrulamaması. Üçüncü/Dördüncü Mühendis bu adımları atlamaz; "acelesi var" baskısı izolasyonu gevşetmenin gerekçesi olamaz.`,
          ],
        },
      ],
    },
    {
      heading: "4. Enclosed Space Entry Desteği",
      sections: [
        {
          subheading: "4.1 Atmosfer testi ve giriş izni",
          paragraphs: [
            `Sintine kuyusu, tank, kofferdam, çift dip, boyler, ana makine karteri gibi kapalı alanlara giriş, ayrı bir enclosed space entry permit gerektirir. Girişten önce ve giriş süresince atmosfer test edilir: oksijen (%20.9 hedef), yanıcı gaz (LEL %0), toksik gazlar (H2S, CO). Üçüncü/Dördüncü Mühendis test cihazının kalibrasyonlu olduğunu doğrular ve ölçümlere yardımcı olur.`,
            `Giriş süresince kapı/menhol başında bir standby/watchman bulunur, sürekli haberleşme sağlanır ve kurtarma planı hazır tutulur. Çoğu kapalı alan ölümü, alarm vermeden gelen düşük oksijen veya zehirli gaz nedeniyle, "yardım edeyim" diyerek hazırlıksız giren ikinci kişiyle katlanarak artar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO Res. A.1050(27) & SOLAS III/19",
              text: `Kapalı alan girişleri için yazılı izin, atmosfer testi, standby personel ve yıllık enclosed space rescue tatbikatı zorunludur. Sıcak çalışma kapalı alanda yapılacaksa hem entry hem hot work permit birlikte gerekir.`,
            },
          ],
        },
        {
          subheading: "4.2 Hot work + enclosed space kombinasyonu",
          paragraphs: [
            `Bir tank veya kapalı alanda sıcak çalışma yapılacaksa risk katlanır: hem atmosferin gas-free olması hem de kaynak/kesim duman ve gazının sürekli havalandırma ile uzaklaştırılması gerekir. Bitişik tank ve boru hatlarının da yanıcı kalıntıdan arındırılmış olması doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Yangın Gözetimi (Fire Watch) ve Söndürme Hazırlığı",
      sections: [
        {
          subheading: "5.1 Fire watch görevi",
          paragraphs: [
            `Her sıcak çalışmada, işi yapan kişiden ayrı bir fire watch (yangın gözcüsü) bulunur. Görevi; kıvılcımların düştüğü bölgeyi, gizli boşlukları ve bitişik bölmeleri sürekli izlemek, ilk müdahale ekipmanını elinin altında tutmaktır. Gözcü, iş bittikten sonra da en az 30-60 dakika (şirket prosedürüne göre) gözetime devam eder; çünkü için için yanan tutuşma gecikmeli alev verebilir.`,
          ],
          bullets: [
            `Çalışma alanında ve bitişik bölmelerde portatif söndürücü hazır`,
            `Yangın hortumu basınçlı ve uzanır durumda`,
            `Yanıcı malzeme/yağlı bez kaldırılmış, zemin temiz`,
            `Sintine kuru ve yağdan arındırılmış`,
          ],
        },
        {
          subheading: "5.2 İş bitişi ve alan teslimi",
          paragraphs: [
            `İş tamamlanınca ekipman soğutulur, alan kontrol edilir, fire watch süresi tamamlanır ve permit "kapatılır". Üçüncü/Dördüncü Mühendis alanın temiz, söndürme ekipmanının yerine konmuş ve LOTO izolasyonunun ancak iş tamamen bittiğinde kaldırılmış olduğunu doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "6. Kişisel Koruyucu Donanım (KKD)",
      sections: [
        {
          subheading: "6.1 Hot work için PPE seti",
          paragraphs: [
            `Sıcak çalışmada standart KKD; kaynak maskesi/koyu camlı siperlik, yanmaz eldiven, deri önlük/tulum, çelik burunlu ayakkabı, kulak koruyucu ve gerektiğinde solunum koruması içerir. Taşlamada yüz siperi ve toz maskesi şarttır. KKD'nin hasarsız ve işe uygun olduğu her seferinde kontrol edilir.`,
          ],
          table: {
            caption: "İş türüne göre KKD",
            headers: ["İş", "Göz/yüz", "El/vücut", "Solunum"],
            rows: [
              ["Ark kaynağı", "Kaynak maskesi", "Deri eldiven+önlük", "Duman maskesi/lokal egzoz"],
              ["Oksi-kesim", "Koyu gözlük", "Yanmaz eldiven", "Lokal havalandırma"],
              ["Taşlama", "Yüz siperi+gözlük", "Eldiven", "Toz maskesi"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Gözetimsiz taşlamadan çıkan makine dairesi yangını",
          paragraphs: [
            `Birçok makine dairesi yangını soruşturmasında ortak payda; permit'siz veya fire watch'suz yapılan kısa bir taşlama/kaynak işidir. Kıvılcım, görünmeyen bir sintine kalıntısını veya yağ emdirmiş yalıtımı tutuşturmuş, alev fark edildiğinde büyümüştür. Ders: hiçbir sıcak çalışma "küçük" değildir; permit, izolasyon ve fire watch pazarlık konusu olamaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Gecikmeli tutuşma",
              text: `İş bittikten sonra söndürücüyü kaldırıp alandan ayrılmak yaygın bir hatadır. Yalıtım malzemesi için için yanıp dakikalar-saatler sonra alev verebilir; bu yüzden fire watch süresi iş bittikten sonra da sürer.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Sıcak/izole çalışma öncesi son kontrol",
          bullets: [
            `Hot work / enclosed space permit onaylı ve geçerli mi?`,
            `Risk assessment / JSA yapıldı, toolbox talk verildi mi?`,
            `LOTO uygulandı, try-out ile sıfır enerji doğrulandı mı?`,
            `Atmosfer testi yapıldı (O2/LEL/toksik) ve izleniyor mu?`,
            `Çevre yanıcılardan temizlendi, sintine kuru mu?`,
            `Fire watch atandı, söndürücü/hortum hazır mı?`,
            `İşe uygun KKD giyildi mi?`,
            `İş sonrası fire watch süresi tamamlanıp permit kapatıldı mı?`,
          ],
          paragraphs: [
            `Üçüncü/Dördüncü Mühendis için sıcak ve izole çalışma güvenliği, prosedüre disiplinli bağlılıkla kazanılan bir alışkanlıktır. Tek bir atlanan adım — boşaltılmamış basınç, doğrulanmamış izolasyon, kaldırılan fire watch — onlarca doğru adımı geçersiz kılabilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
