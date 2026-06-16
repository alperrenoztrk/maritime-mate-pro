import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Muster list ve emergency station readiness",
  roleSlug: "ucuncu-zabit",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Üçüncü Zabit (Safety Officer) için muster list (toplanma/görev listesi), acil durum organizasyonunun anayasasıdır: kimin hangi acil durumda, hangi istasyonda, hangi görevi yapacağını isim isim belirler. Bu görev kâğıdı asmakla bitmez; her mürettebatın kendi station'ını ve görevini ezbere bilmesini, ilgili ekipmanı (portable VHF, EPIRB/SART, first-aid party malzemesi, boundary cooling hortumları) tanımasını ve gerçek bir abandon ship, fire veya man-overboard senaryosunda saniyeler içinde doğru yere ulaşmasını sağlamayı kapsar. Panoda asılı ama içselleştirilmemiş bir muster list, acilde işe yaramayan ölü bir kâğıttır.`,
  sources: [
    "SOLAS Chapter III/8 — Muster list and emergency instructions",
    "SOLAS Chapter III/37 — Muster list, emergency instructions and alarms",
    "SOLAS Chapter III/19 — Emergency training and drills",
    "LSA Code (International Life-Saving Appliance Code, Res. MSC.48(66))",
    "IMO Res. A.1218(33) — IMO Survey Guidelines (HSSC)",
    "STCW Code Section A-VI/1 — Familiarization and basic safety training",
    "ISM Code (Res. A.741(18)) — Emergency preparedness, madde 8",
    "Company SMS — Station Bill / Emergency Organization Manual",
  ],
  chapters: [
    {
      heading: "1. Muster List'in İşlevi ve Yasal Çerçevesi",
      lead: `Muster list, geminin acil durum organizasyonunu tek bir belgede toplar; Safety Officer bu belgenin güncelliğinden ve sahadaki karşılığından sorumludur.`,
      sections: [
        {
          subheading: "1.1 Muster list nedir, ne içerir",
          paragraphs: [
            `SOLAS III/8 ve III/37, muster list'in yolculuktan önce hazırlanmasını ve gemide görünür yerlere (köprüüstü, makine kontrol odası, mürettebat yaşam mahalleri) asılmasını zorunlu kılar. Liste; general alarm ve abandon ship sinyallerinin detayını, alarm duyulduğunda her kişinin yapacağı işi, muster station'ları, su geçirmez kapı/yangın kapısı/valf kapatma görevlilerini ve survival craft ile fire-fighting ekipmanının hazırlanmasından sorumlu kişileri açıkça gösterir.`,
            `Muster list, kaptanın yokluğunda kimin yetkili olacağını ve LSA/radyo ekipmanının kullanımından sorumlu kişileri de tanımlar. Safety Officer, listenin gemideki güncel personel mevcuduyla birebir eşleştiğini sürekli kontrol eder; personel değişiminde (crew change) liste anında güncellenmelidir, aksi halde acilde "görevsiz" veya "iki kez görevli" kişiler doğar.`,
          ],
          bullets: [
            `General alarm: yedi kısa + bir uzun düdük/zil sinyali tarifi`,
            `Her acil durum için ayrı görev dağılımı (fire, abandon, MOB, flooding)`,
            `Survival craft komutanı ve yardımcısı atamaları`,
            `Watertight/fire door, valf ve havalandırma kapatma görevlileri`,
            `Telsiz operatörü ve distress ekipmanı taşıma görevlisi`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/37 — Muster list içeriği",
              text: `Muster list; alarm sinyallerinin detayını, muster station'lara gidiş emrini, her mürettebatın görevini ve survival craft ile fire-fighting appliance hazırlığını içermek zorundadır. Kaptanın yerine geçecek substitute (yedek) kişiler de belirtilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Station bill ile bireysel görev kartları",
          paragraphs: [
            `Muster list (genel) ile bireysel station card (kamara kapısına asılan kişisel kart) birbirini tamamlar. Station card, her mürettebata kendi muster station'ını, abandon ship görevini, taşıyacağı ekipmanı ve hangi survival craft'a binmesi gerektiğini hatırlatır. Safety Officer, her kamarada güncel station card bulunduğunu denetler.`,
            `Görev kartları kişiye özel ve dilden bağımsız (sembol destekli) hazırlanır; çok uluslu mürettebatta IMO standart sembolleri (Res. A.760(18)) ve geminin çalışma dili kullanılır. Yeni personel gemiye katıldığında station card hemen düzenlenir ve safety familiarization sürecinde teslim edilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Acil Durum Türleri ve Görev Dağılımı",
      sections: [
        {
          subheading: "2.1 Abandon ship organizasyonu",
          paragraphs: [
            `Abandon ship (gemiyi terk) senaryosunda muster list, her görevi tek tek atar: filika komutanı (genelde zabit), motor sorumlusu, painter/halat görevlisi, embarkation ladder ve davit operatörü, portable VHF getiren, EPIRB ve SART alan, ek battaniye/su/ration taşıyan, yaralı taşıma ekibi ve baş sayımı (head count) yapan kişi. Safety Officer, bu zincirin hiçbir halkasının boş kalmamasını sağlar.`,
            `Kritik ekipmanın taşınması isim isim atanır: EPIRB ve SART'ı bracket'inden alacak kişi, portable GMDSS VHF'leri getirecek kişi ve ek pyrotechnics/su/ration getirecek kişi önceden bellidir. Bir gerçek terk durumunda "EPIRB'i kim aldı?" sorusunun cevabı önceden verilmiş olmalıdır.`,
          ],
          table: {
            caption: `Abandon Ship — Tipik Görev Dağılımı (Örnek Station Bill)`,
            headers: ["Görev", "Sorumlu (örnek)", "Taşıdığı/Yaptığı", "Yedek"],
            rows: [
              ["Filika komutanı", "İkinci Zabit", "Komuta, head count", "Birinci Zabit"],
              ["Motor/release", "Yağcı", "Motor start, hook", "Lostromo"],
              ["Distress ekipmanı", "Üçüncü Zabit", "EPIRB + SART + VHF", "Telsiz operatörü"],
              ["Yaralı taşıma", "Aşçı + 1", "First-aid party", "Kamarot"],
              ["Ek malzeme", "Gemici", "Su, battaniye, ration", "Yağcı yard."],
            ],
          },
        },
        {
          subheading: "2.2 Yangın ve flooding organizasyonu",
          paragraphs: [
            `Fire senaryosunda muster list; fire party leader (genelde Birinci Zabit veya Safety Officer), nozzle man, hose handler, boundary cooling ekibi, BA (breathing apparatus) ekibi ve makine dairesi boundary cooling koordinatörünü tanımlar. Köprüüstü kontrol takımı havalandırmayı, yakıt valflerini (quick-closing) ve emergency shut-off'ları yönetir.`,
            `Flooding/collision senaryosunda watertight kapı kapatma, draught/list izleme, balast/bilge pompalama ve damage control malzemesi (cement box, wooden plugs, shoring) hazırlığı görevleri atanır. Safety Officer, bu görevlerin drill'lerde pratik edildiğini ve ilgili ekipmanın erişilebilir olduğunu doğrular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İki kez atanmış / hiç atanmamış görev",
              text: `Crew change sonrası en sık hata, ayrılan kişinin görevinin yeni gelene devredilmemesi veya bir kişiye çakışan iki kritik görev (örn. hem filika komutanı hem distress ekipmanı taşıyıcısı) verilmesidir. Acilde bu çakışma görevin yapılmamasına yol açar.`,
            },
          ],
        },
        {
          subheading: "2.3 Man-overboard (MOB) organizasyonu",
          paragraphs: [
            `MOB senaryosunda muster list; gözcü (kazazedeyi sürekli işaret eden kişi), MOB marker/lifebuoy bırakan, rescue boat ekibi (komutan, motor, dümen), köprüüstü manevra takımı ve haberleşme görevlisini atar. Rescue boat ekibinin önceden belirlenmiş ve eğitimli olması, kurtarmanın altın dakikalarında belirleyicidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Alarm Sinyalleri ve Haberleşme",
      sections: [
        {
          subheading: "3.1 General alarm ve abandon ship sinyalleri",
          paragraphs: [
            `General emergency alarm, en az yedi kısa ve onu takip eden bir uzun düdük/zil sinyalidir; gemi genelinde tüm yaşam ve çalışma mahallerinde duyulabilir olmalıdır. Bu sinyal "muster station'a git" anlamına gelir; abandon ship kararı ise kaptan tarafından sözlü emir (PA/telsiz) ile verilir, ayrı bir otomatik sinyali yoktur.`,
            `Safety Officer, general alarm sisteminin tüm noktalarda (kamara, koridor, makine dairesi, açık güverte) yeterli desibelde duyulduğunu periyodik test eder. Makine dairesi gibi yüksek gürültülü bölgelerde sesli alarma ek olarak görsel (flashing) alarm bulunmalıdır.`,
          ],
          table: {
            caption: `Acil Durum Sinyalleri Özeti`,
            headers: ["Durum", "Sinyal", "Anlamı", "Sonraki adım"],
            rows: [
              ["General emergency", "≥7 kısa + 1 uzun", "Muster station'a git", "Görev kartına göre hareket"],
              ["Abandon ship", "Kaptan sözlü emri", "Gemiyi terk et", "Survival craft embark"],
              ["Fire", "Sürekli zil + PA", "Yangın istasyonu", "Fire party teşkili"],
              ["Man overboard", "3 uzun düdük + PA", "MOB pozisyonu", "Rescue boat hazırlığı"],
            ],
          },
        },
        {
          subheading: "3.2 PA, talkback ve haberleşme zinciri",
          paragraphs: [
            `Acil durumda emir zinciri ve haberleşme yolu önceden tanımlanır: köprüüstü (kaptan/OOW) komuta merkezidir; muster station ve fire party ile haberleşme portable VHF veya talkback ile sağlanır. Safety Officer, portable VHF'lerin şarjlı, kanalların doğru ayarlı ve yeterli sayıda (her party'ye en az bir) olduğunu kontrol eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Haberleşme provası",
              text: `Drill'lerde sadece fiziksel hareketi değil, telsiz haberleşmesini de prova edin. "Köprüüstü, fire party 1, yangın kontrol altında" gibi standart rapor cümleleri önceden belirlenir; acilde panikle uzun, anlaşılmaz mesajların önüne geçilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Emergency Station Readiness Denetimi",
      sections: [
        {
          subheading: "4.1 Muster station'ların fizikî hazırlığı",
          paragraphs: [
            `Her muster station; aydınlatmalı, IMO sembolleriyle işaretli, serbest erişilebilir ve yeterli alana sahip olmalıdır. Safety Officer rutin safety round'larda muster station'a giden kaçış yollarının kapalı/dolu olmadığını, emergency lighting ve photoluminescent işaretlerin çalıştığını ve station'da yedek can yeleği bulunduğunu kontrol eder.`,
            `Embarkation deck (binme güvertesi) özel önem taşır: filika ve sal önü boş, davit alanı malzemesiz, embarkation ladder hazır ve güverte kaymaya karşı güvenli olmalıdır. Bu alanların depo gibi kullanılması, gerçek acilde ölümcül gecikmelere yol açar.`,
          ],
          bullets: [
            `Muster station işaretli, aydınlatmalı, serbest erişilebilir`,
            `Kaçış yolları (escape routes) açık, photoluminescent işaretli`,
            `Yedek can yeleği muster station'da hazır`,
            `Embarkation deck boş, ladder hazır, davit erişilebilir`,
            `Portable VHF, megafon, head count listesi station'da`,
          ],
        },
        {
          subheading: "4.2 Personel hazırlığı ve baş sayımı (head count)",
          paragraphs: [
            `Readiness'ın insan ayağı, her mürettebatın kendi station'ını ve görevini bilmesidir. Safety Officer, drill'lerde ve günlük temasta rastgele kişilere "muster station'ın nerede, görevin ne, hangi filikaya biniyorsun" diye sorarak bilgiyi taze tutar. Head count (mevcut sayım) için güncel crew list ve passenger list (varsa) her muster station'da bulunur.`,
            `Baş sayımı, terk kararında kimsenin geride kalmamasını güvenceye alan kritik adımdır. Sorumlu kişi, kendi station'ındaki herkesi listeden işaretler ve eksik varsa derhal köprüüstüne bildirir; arama-kurtarma bu bilgiye göre yönlendirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: eksik head count",
              text: `Bir gerçek tahliyede, baş sayımının düzgün yapılmaması nedeniyle makine dairesinde kalan iki kişinin eksikliği geç fark edildi. Ders: head count, ezberlenmiş bir rutin olmalı; her station sorumlusu listesini fiziksel olarak işaretlemeli ve "tamam/eksik" raporunu köprüüstüne net iletmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Çok Uluslu Mürettebat ve Dil Sorunu",
      sections: [
        {
          subheading: "5.1 Çalışma dili ve sembol kullanımı",
          paragraphs: [
            `SOLAS, geminin bir çalışma dili (working language) belirlemesini ve muster list ile emergency instruction'ların bu dilde (gerekirse ek dilde) yazılmasını ister. Çok uluslu mürettebatta Safety Officer, talimatların herkesçe anlaşıldığını teyit eder; gerekirse IMO standart sembolleri ve resimli talimatlarla dil engelini aşar.`,
            `Familiarization sırasında dilden kaynaklı yanlış anlamalar erkenden tespit edilir. Bir mürettebatın talimatı "okuyor görünmesi" yeterli değildir; gerçekten anladığı, station'ı pratik olarak göstermesiyle doğrulanır.`,
          ],
        },
        {
          subheading: "5.2 Yolcu gemilerinde ek gereklilikler",
          paragraphs: [
            `Yolcu gemilerinde muster organizasyonu, yolcuların yönlendirilmesini de kapsar: muster drill yolculuk başında yapılır, yolcu can yeleği giyme noktaları işaretlenir ve marshalling (yönlendirme) görevlileri atanır. Safety Officer, yolcu sayım sisteminin ve özel ihtiyaç sahibi yolcular için planın hazır olduğunu denetler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Drill ile Muster List'in Sınanması",
      sections: [
        {
          subheading: "6.1 Drill'in muster organizasyonunu test etmesi",
          paragraphs: [
            `SOLAS III/19 gereği abandon ship ve fire drill'leri ayda en az bir kez yapılır; her drill, muster list'in sahadaki karşılığını sınar. Safety Officer; drill'de muster süresini ölçer, görevsiz/şaşkın kalan kişileri not eder, çakışan görevleri tespit eder ve muster list'i bu bulgulara göre revize eder.`,
            `Drill, sadece "yapıldı" damgası için değil, organizasyondaki zayıf halkayı bulmak için yapılır. Geç toplanan bir bölüm, bulunamayan bir ekipman veya bilinmeyen bir görev, gerçek acilden önce drill'de yakalanmalı ve düzeltilmelidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19 — Drill periyodu",
              text: `Her mürettebat üyesi ayda en az bir abandon ship ve bir fire drill'e katılmalıdır. Crew'un %25'inden fazlası bir önceki aydaki drill'e katılmamışsa, yeni personel gemiye katıldıktan sonra 24 saat içinde drill yapılmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Drill sonrası muster list güncellemesi",
          paragraphs: [
            `Her drill sonrası debrief'te ortaya çıkan organizasyon hataları, muster list ve station card revizyonuna yansıtılır. Safety Officer, değişiklikleri tüm kopyalarda (panodaki list, kamara kartları, köprüüstü ve MCR kopyaları) eşzamanlı günceller; eski versiyonun sahada kalması karışıklık yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "7. PSC ve Survey Açısından Muster Readiness",
      sections: [
        {
          subheading: "7.1 Denetçinin tipik kontrolleri",
          paragraphs: [
            `PSC ve flag/class survey'de denetçi, muster list'in güncel, doğru asılı ve crew mevcuduyla tutarlı olduğunu kontrol eder; ardından sahaya iner: rastgele bir mürettebata "muster station'ın nerede, görevin ne, rescue boat motoru nasıl çalışır" diye sorar. Kâğıt mükemmel ama insan bilmiyorsa bulgu çıkar.`,
            `En sık deficiency'ler: güncel olmayan muster list (ayrılan personel hâlâ listede), çakışan/eksik görev atamaları, çalışma diliyle uyumsuz talimat, station card'ı olmayan personel ve drill kayıtlarıyla muster list arasında tutarsızlık. Safety Officer bu noktaları proaktif denetler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Self-audit: \"3 kişiye sor\"",
              text: `PSC öncesi kendi denetiminizi yapın: farklı departmanlardan üç kişiye station'ını ve görevini sorun, station card'larını kontrol edin, muster list'i güncel crew list'le karşılaştırın. Çakışma veya boşluk varsa survey'den önce düzeltin.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Safety Officer muster readiness kontrol listesi",
          bullets: [
            `Muster list güncel crew mevcuduyla birebir uyumlu mu, ayrılan kişi listeden çıktı mı?`,
            `Her kritik görev (filika komutanı, distress ekipmanı, head count) atanmış ve yedeği var mı?`,
            `Çakışan veya boş görev var mı (bir kişi iki kritik görevde değil)?`,
            `Tüm kamaralarda güncel station card asılı mı?`,
            `General alarm her noktada yeterli desibelde, görsel alarm (gürültülü bölge) çalışıyor mu?`,
            `Muster station'lar işaretli, aydınlatmalı, erişilebilir; embarkation deck boş mu?`,
            `Portable VHF, megafon, head count listesi station'larda hazır mı?`,
            `Son drill bulguları muster list'e yansıtıldı, tüm kopyalar güncel mi?`,
          ],
          paragraphs: [
            `Muster list'in başarısı, hiçbir acil durum yaşanmadığında görünmez kalır; ama gerçek bir terk, yangın veya MOB anında mürettebatın hayatı, tam da bu listenin sahadaki karşılığına — herkesin yerini ve görevini refleksle bilmesine — bağlıdır. Panoda asılı kâğıt başlangıçtır; "herkes station'ını biliyor, ekipman taşınıyor, head count tam" demek görevin tamamlanmış halidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
