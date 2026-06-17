import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Teknik kayıtlar ve sarf malzeme takibi",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 5,
  estimatedPages: 23,
  intro: `Makine dairesinin "hafızası" kayıtlardır. Üçüncü/Dördüncü Mühendis; engine room logbook'un vardiya bazlı doğru tutulmasından, PMS (Planned Maintenance System) iş emirlerinin kapatılmasından ve sarf malzeme (conta, o-ring, filtre, yağ) kullanımının raporlanmasından operasyonel olarak sorumludur. Doğru kayıt; arıza analizine, klas/PSC denetimine, yedek parça planlamasına ve bütçeye doğrudan etki eder. Bu bölüm kayıt disiplinini ve sarf takibini sistematik biçimde ele alır.`,
  sources: [
    "ISM Code — kayıt ve dokümantasyon gereklilikleri",
    "MARPOL Annex I — Oil Record Book Part I (makine dairesi)",
    "Class PMS / CMS (Continuous Machinery Survey) gereklilikleri",
    "Gemi PMS yazılımı (AMOS, TM Master, ShipManager vb.) prosedürleri",
    "MARPOL Annex VI — Bunker Delivery Note ve yakıt tüketim kayıtları",
  ],
  chapters: [
    {
      heading: "1. Engine Room Logbook",
      sections: [
        {
          subheading: "1.1 Vardiya kayıtlarının içeriği",
          paragraphs: [
            `Engine room logbook (veya elektronik eşdeğeri), her vardiyada makinelerin durumunu kayıt altına alır: ana makine devir/yük, yardımcı makine yükleri, sıcaklık ve basınçlar, tank seviyeleri, su üretimi, yakıt/yağ tüketimi ve gözlenen anormallikler. Üçüncü/Dördüncü Mühendis kendi vardiyasının verisini eksiksiz ve okunaklı işler.`,
            `Kayıt "gerçek zamanlı ve dürüst" olmalıdır. Sonradan hatırlanarak doldurulan veya "kopyala" değerlerle şişirilen loglar, arıza analizini imkânsız hale getirir ve denetimde güveni yıkar.`,
          ],
          bullets: [
            `Ana/yardımcı makine yük ve devirleri`,
            `Egzoz, soğutma suyu, yağ sıcaklık/basınçları`,
            `Servis ve depo tank seviyeleri`,
            `Fresh water generator üretimi`,
            `Anormal gözlem ve alınan aksiyon`,
          ],
        },
        {
          subheading: "1.2 Yasal kayıt defterleriyle ilişki",
          paragraphs: [
            `Engine room logbook, Oil Record Book Part I ile tutarlı olmalıdır. Sintine transferi, OWS (Oily Water Separator) çalışması, yağ transferi ve sludge işlemleri ORB'ye ayrıca işlenir; logbook'taki ham veri bu yasal kaydı destekler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — ORB Part I",
              text: `Makine dairesi yağ işlemleri (sintine, sludge, transfer, OWS) Oil Record Book'a zamanında ve doğru işlenmelidir. ORB tutarsızlıkları PSC'de en sık ceza ve gemi tutma sebeplerindendir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. PMS — Planlı Bakım Sistemi",
      sections: [
        {
          subheading: "2.1 İş emri (work order) döngüsü",
          paragraphs: [
            `PMS, her ekipman için üreticinin önerdiği bakım aralıklarını (çalışma saati veya takvim bazlı) iş emirlerine dönüştürür. Bakım yapıldığında iş emri; yapılan iş, kullanılan parça, ölçülen değerler (clearance, basınç) ve çalışma saati ile kapatılır. Üçüncü/Dördüncü Mühendis kendi sorumluluğundaki işlerin kayıtlarını zamanında ve eksiksiz işler.`,
            `Kapatılmayan veya geç kapatılan iş emirleri "overdue" listesine düşer. Aşırı overdue, hem klas CMS uyumunu hem PSC izlenimini bozar; bu yüzden bakım yapılır yapılmaz kayda geçirilir.`,
          ],
          table: {
            caption: "İş emri kapatırken kaydedilenler",
            headers: ["Alan", "Örnek veri"],
            rows: [
              ["Ekipman / pozisyon", "No.2 D/G yakıt enjektörü"],
              ["Çalışma saati", "12.480 h"],
              ["Yapılan iş", "Enjektör söküm, test, ayar"],
              ["Kullanılan parça", "Nozzle x6, o-ring set"],
              ["Ölçülen değer", "Açma basıncı 250 bar"],
            ],
          },
        },
        {
          subheading: "2.2 Klas CMS ile bağlantı",
          paragraphs: [
            `Continuous Machinery Survey (CMS) kapsamındaki ekipmanların açılış/ölçüm kayıtları, klas sörveyörünün survey kredisi vermesi için esastır. Düzgün PMS kaydı, survey'i kolaylaştırır ve gereksiz tekrar açımları önler.`,
          ],
        },
      ],
    },
    {
      heading: "3. Sarf Malzeme Takibi",
      sections: [
        {
          subheading: "3.1 Kullanım kaydı ve stok",
          paragraphs: [
            `Conta, o-ring, filtre, kayış, yağ, gres, kimyasal gibi sarf malzemelerin kullanımı kaydedilir ve stok güncellenir. Bu kayıt; tüketim hızını gösterir, minimum stok (ROB – Remaining On Board) altına düşen kalemleri tespit eder ve gereksiz fazla siparişi önler.`,
          ],
          bullets: [
            `Filtre ve eleman değişim kayıtları`,
            `Yağ/gres tüketimi (ekipman bazlı)`,
            `Kimyasal (soğutma suyu, boiler) dozaj kayıtları`,
            `Conta/o-ring/kayış stok hareketleri`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tüketim trendi",
              text: `Bir ekipmanın yağ veya filtre tüketiminde ani artış, çoğu zaman gizli bir arızanın (kaçak, aşınma, kontaminasyon) ilk işaretidir. Sarf kaydını sadece muhasebe değil, erken teşhis aracı olarak kullanın.`,
            },
          ],
        },
        {
          subheading: "3.2 Yedek parça ihtiyacının bildirimi",
          paragraphs: [
            `Minimum seviyenin altına düşen veya yaklaşan kalemler İkinci Mühendise (ve gerektiğinde Baş Mühendise) zamanında bildirilir. Bildirim; parça adı, IMPA/maker parça numarası, mevcut ROB, ihtiyaç miktarı ve aciliyet içerir. Geç bildirim, kritik bir yedeğin liman penceresinde tedarik edilememesine yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Veri Kalitesi ve Dürüstlük",
      sections: [
        {
          subheading: "4.1 Doğru veri neden hayati?",
          paragraphs: [
            `Makine kayıtları sadece geçmişi belgelemez; geleceği yönetir. Yanlış veya uydurma veri, hatalı bakım kararına, beklenmedik arızaya ve denetimde güven kaybına yol açar. Üçüncü/Dördüncü Mühendis, ölçülemeyen bir değeri tahminle doldurmaz; ölçer veya "ölçülemedi" notunu düşer.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Pencil-whipping",
              text: `Bakım yapılmadan iş emrini kapatmak veya log değerlerini gözü kapalı kopyalamak (pencil-whipping), ISM kültürünün en zararlı alışkanlığıdır. Bir gün gerçek bir arızayla karşılaşıldığında bu kayıtlar işe yaramaz hale gelir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Elektronik PMS Yazılımları",
      sections: [
        {
          subheading: "5.1 Yazılım kullanımı ve senkronizasyon",
          paragraphs: [
            `Modern gemilerde PMS, AMOS, TM Master veya benzeri yazılımlarla yürütülür ve veriler kıyı ofisiyle senkronize edilir. Üçüncü/Dördüncü Mühendis; iş emirlerini doğru ekipmana işlemeyi, çalışma saatlerini güncellemeyi ve senkronizasyon öncesi kayıtların tam olduğunu doğrulamayı öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Yakıt ve Yağ Kayıtları",
      sections: [
        {
          subheading: "6.1 ROB, tüketim ve bunker",
          paragraphs: [
            `Yakıt/yağ ROB değerleri, günlük tüketim ve bunker alımları düzenli kaydedilir. MARPOL Annex VI kapsamında Bunker Delivery Note (BDN) ve numune saklanır; CII/EEXI raporlaması için tüketim verisinin doğruluğu giderek daha kritik hale gelmiştir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Kaydedilmeyen aşınmanın bedeli",
          paragraphs: [
            `Bir yatak sıcaklığındaki kademeli yükselişin loglara işlenmemesi, eğilimin fark edilmeden büyümesine ve sonunda yatak hasarına yol açabilir. İyi tutulmuş bir trend kaydı, aynı arızayı haftalar önce öngörebilirdi. Kayıt disiplini, doğrudan makine sağlığıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Vardiya sonu kayıt kontrolü",
          bullets: [
            `Logbook tüm parametrelerle, okunaklı ve gerçek zamanlı dolduruldu mu?`,
            `Sintine/sludge/OWS işlemleri ORB'ye işlendi mi?`,
            `Tamamlanan PMS iş emirleri parça ve ölçümle kapatıldı mı?`,
            `Sarf kullanımı kaydedildi, stok güncellendi mi?`,
            `Minimum altına düşen yedekler üst mühendise bildirildi mi?`,
            `Yakıt/yağ ROB ve tüketim doğru mu?`,
          ],
          paragraphs: [
            `İyi bir mühendisin kayıtları, kendisi vardiyada olmasa bile makineyi anlatır. Üçüncü/Dördüncü Mühendis için titiz kayıt; hem profesyonel disiplinin hem de geminin teknik güvenliğinin temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
