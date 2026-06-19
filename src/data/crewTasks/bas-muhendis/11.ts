import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Baş Mühendis gece talimatları (Chief Engineer night orders)",
  roleSlug: "bas-muhendis",
  taskIndex: 11,
  estimatedPages: 23,
  intro: `Baş Mühendis (Chief Engineer) gece talimatları, Kaptanın köprüdeki "night orders" pratiğinin makine departmanındaki karşılığıdır. Baş Mühendis, gece vardiyasını yöneten Üçüncü/Dördüncü Mühendis için beklenen riskleri, kritik parametre eşiklerini, özel bakım görevlerini ve hangi durumda uyandırılması gerektiğini yazılı olarak bildirir. Bu bölüm; gece talimatlarının amacını, yapısını, karar yetki sınırlarını, "call the Chief" kriterlerini ve UMS gemilerdeki uygulamasını detaylı ele alır.`,
  sources: [
    "STCW Bölüm A-VIII/2 — Watchkeeping principles",
    "ISM Code — Eleman 5 (Master's responsibility) ve Eleman 7 (Operations)",
    "IACS / Class — UMS (Unmanned Machinery Space) gereklilikleri",
    "OCIMF TMSA — Element 3 (Personnel) ve Element 6A (Navigation/Engine watch)",
    "Bridge/Engine Resource Management (BRM/ERM) prensipleri",
    "Company SMS — Watch handover ve night order prosedürleri",
    "MAIB / TSB kaza raporları — Engine watch human factor analizleri",
  ],
  chapters: [
    {
      heading: "1. Gece Talimatlarının Amacı ve Felsefesi",
      lead: `Gece talimatları, deneyimli Baş Mühendis'in bilgisini ve önceliklerini geceye taşıyan bir köprüdür; vardiya zabitinin yalnız kalmasını önler.`,
      sections: [
        {
          subheading: "1.1 Neden gece talimatı?",
          paragraphs: [
            `Gece, makine dairesinin en kırılgan zamanıdır: ekip küçülür, yorgunluk artar, bir hatanın fark edilmesi gecikebilir. Baş Mühendis gece talimatlarıyla, vardiya zabitine o gece için neye dikkat edeceğini, hangi riskleri beklediğini ve sınırlarının ne olduğunu net bildirir.`,
            `Bu pratik, vardiya zabitinin karar yetki sınırını netleştirir ve önlenebilir büyük arızaların raporlanmadan büyümesini engeller. Yazılı talimat, sözlü brifingin unutulan kısımlarını telafi eder ve denetimde kanıt oluşturur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Köprü night orders ile paralellik",
              text: `Kaptanın köprüde her gece imzalı night order yazması yaygın bir iyi uygulamadır. Makine tarafında aynı disiplin; gece zabitine yön verir, beklentiyi netleştirir ve sorumluluğu paylaşır.`,
            },
          ],
        },
        {
          subheading: "1.2 ERM (Engine Resource Management) bağlamı",
          paragraphs: [
            `Gece talimatları, Engine Resource Management felsefesinin parçasıdır: kaynakların (insan, ekipman, bilgi) etkin kullanımı ve net iletişim. Baş Mühendis, otoritesini kullanırken ekibi karar alma sürecine dahil eder ve "speak up" kültürünü destekler.`,
            `İyi bir gece talimatı tek yönlü emir değil; vardiya zabitinin gözlemlerini ve endişelerini Baş Mühendis'e iletmesini de teşvik eden çift yönlü bir iletişim aracıdır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Gece Talimatının Yapısı ve İçeriği",
      sections: [
        {
          subheading: "2.1 Standart bölümler",
          paragraphs: [
            `İyi yapılandırılmış bir gece talimatı; geminin durumunu (seyir/manevra/liman), o gece izlenecek özel ekipmanları, beklenen riskleri, planlı görevleri ve "call the Chief" kriterlerini içerir. Net, kısa ve eyleme dönük olmalıdır.`,
            `Baş Mühendis, o geceye özgü bağlamı (örneğin ECA yaklaşımı, kötü hava, devam eden bir arıza takibi, yeni binmiş bir junior zabit) talimata yansıtır. Şablon talimat değil, o geceye özel talimat etkilidir.`,
          ],
          table: {
            caption: `Gece talimatı standart içerik başlıkları`,
            headers: ["Bölüm", "İçerik", "Amaç"],
            rows: [
              ["Durum özeti", "Seyir/liman, hava, ETA", "Bağlam"],
              ["İzlenecek ekipman", "Şüpheli/kritik makineler", "Odak"],
              ["Parametre eşikleri", "Alarm/uyarı limitleri", "Erken müdahale"],
              ["Planlı görevler", "Sounding, transfer, test", "Görev netliği"],
              ["Call-out kriterleri", "Beni ne zaman uyandır", "Yetki sınırı"],
            ],
          },
        },
        {
          subheading: "2.2 Kritik parametre eşikleri",
          paragraphs: [
            `Baş Mühendis, o gece özellikle izlenmesi gereken parametreleri ve eşik değerlerini açıkça yazar: örneğin "ME exhaust sıcaklık farkı 40 °C'yi aşarsa beni ara", "stern tube oil tank seviyesi düşerse haber ver", "jenerator yük dengesizliği X'i geçerse müdahale et".`,
            `Bu somut eşikler, vardiya zabitinin "normal sapma" ile "müdahale gerektiren durum" arasını ayırt etmesini kolaylaştırır ve geç müdahaleyi önler.`,
          ],
          bullets: [
            "ME exhaust gas spread / Pmax sapma eşiği",
            "Jacket water / LO sıcaklık ve basınç limitleri",
            "Generator yük ve frekans/voltaj toleransı",
            "Stern tube / sump seviye değişim eşiği",
            "Bilge seviye ve OWS davranışı",
          ],
        },
      ],
    },
    {
      heading: "3. Karar Yetki Sınırları",
      sections: [
        {
          subheading: "3.1 Vardiya zabitinin bağımsız yetkisi",
          paragraphs: [
            `Gece talimatı, vardiya zabitinin hangi kararları tek başına alabileceğini netleştirir: rutin standby pompa devreye alma, küçük ayar, normal transfer. Bu yetki, zabitin deneyim seviyesine göre Baş Mühendis tarafından kalibre edilir.`,
            `Junior bir zabit için sınırlar daha dar tutulur ve "şüphede kal ve ara" ilkesi vurgulanır. Deneyimli bir İkinci/Üçüncü Mühendis için daha geniş bağımsızlık tanınır. Talimat, bu farkı açıkça yansıtmalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Belirsiz yetki, arızayı büyüttü",
              text: `Bir gemide gece zabiti, generator'da yükselen yatak sıcaklığını "Baş Mühendis'i bu saatte rahatsız etmemek için" raporlamadı ve müdahale etmedi; sabaha bearing hasar gördü. Net call-out kriteri ve "şüphede ara" kültürü olsaydı arıza küçükken durdurulurdu.`,
            },
          ],
        },
        {
          subheading: "3.2 \"Call the Chief\" kriterleri",
          paragraphs: [
            `Gece talimatının en kritik bölümü, Baş Mühendis'in hangi durumlarda uyandırılacağını net tanımlamasıdır. Bu kriterler tereddüde yer bırakmamalı: emniyet/kirlilik riski, kritik alarm, beklenmedik parametre, herhangi bir şüphe.`,
            `"Şüphedeysen, ara" altın kuraldır. Baş Mühendis, gereksiz uyandırılmaktan rahatsızlık duymadığını ve geç haber verilmesinin çok daha kötü olduğunu ekibe net iletmelidir.`,
          ],
          bullets: [
            "Herhangi bir kritik alarm veya otomatik slowdown/shutdown",
            "Yangın, su alma, yakıt/yağ kaçağı veya kirlilik riski",
            "Ana makine veya kritik yardımcı ekipman güç kaybı",
            "Beklenmedik veya açıklanamayan parametre değişimi",
            "Herhangi bir tereddüt — şüphedeysen ara",
          ],
        },
      ],
    },
    {
      heading: "4. UMS Gemilerde Gece Talimatları",
      sections: [
        {
          subheading: "4.1 Unmanned machinery space disiplini",
          paragraphs: [
            `UMS (E0) sınıflı gemilerde makine dairesi gece vardiyasız çalışır; duty engineer çağrı sistemiyle sorumludur. Bu durumda gece talimatı, duty engineer'in rounds disiplinini, alarm cevap sürelerini ve UMS koşullarının sağlandığını teyit etmesini içerir.`,
            `Baş Mühendis, UMS'e geçiş ön koşullarının (alarmlar çalışır, dead-man alarm aktif, standby ekipman hazır) her gece sağlandığını talimatla pekiştirir. Bir alarmın susturulup unutulması ölümcül risktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alarm susturma riski",
              text: `UMS'te bir alarmın acknowledged edilip sebebinin giderilmemesi veya kalıcı inhibit edilmesi, gerçek bir tehlikenin gözden kaçmasına yol açar. Gece talimatı, inhibit/override'ların kayıt altına alınmasını ve Baş Mühendis onayını şart koşar.`,
            },
          ],
        },
        {
          subheading: "4.2 Duty engineer rounds ve dead-man alarm",
          paragraphs: [
            `Duty engineer, gece periyodik rounds yapar ve makine dairesinde çalışırken dead-man alarm (engineer's safety) sistemini aktive eder. Bu sistem, zabit belirli sürede yanıt vermezse köprüyü uyarır.`,
            `Gece talimatı, rounds sıklığını ve özellikle dikkat edilecek noktaları belirtir. Baş Mühendis, UMS'in "kimse yok" değil "uzaktan izleniyor ve hazır müdahale var" anlamına geldiğini vurgular.`,
          ],
        },
      ],
    },
    {
      heading: "5. Özel Görevler ve Planlı İşler",
      sections: [
        {
          subheading: "5.1 Gece yürütülen rutin görevler",
          paragraphs: [
            `Gece vardiyasında tank sounding, yakıt/yağ transferi, separator temizliği, FW üretim takibi ve generator changeover gibi görevler planlanır. Baş Mühendis, bunların hangi sırayla ve hangi dikkatle yapılacağını talimatta belirtir.`,
            `Özellikle yakıt transferi gibi taşma (overflow) riski taşıyan işler, gece dikkatle ve eşik uyarılarıyla yönetilir. Talimat, taşmayı önleyici kontrolleri (seviye izleme, valf teyidi) hatırlatır.`,
          ],
        },
        {
          subheading: "5.2 Devam eden arıza takibi",
          paragraphs: [
            `Eğer gündüzden devam eden bir sorun (örneğin izlenen bir yatak sıcaklığı, geçici onarım, trend yükselişi) varsa, gece talimatı bunu özel olarak işaretler ve izleme talimatı verir.`,
            `Bu süreklilik, sorunun gece gözden kaçmasını ve büyümesini önler. Baş Mühendis, takip edilen kalemleri ve müdahale eşiklerini net yazar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Handover ile entegrasyon",
              text: `Gece talimatı, vardiya devir-teslimi (handover) ile birlikte okunmalıdır. Devreden zabitin notları, gece talimatının somut bağlamını oluşturur; ikisi birbirini tamamlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. İletişim, Emniyet Kültürü ve Belgeleme",
      sections: [
        {
          subheading: "6.1 \"Speak up\" kültürü",
          paragraphs: [
            `Etkili gece talimatı, otoriteyle birlikte açık iletişimi teşvik eder. Vardiya zabiti, gözlemlerini ve endişelerini çekinmeden iletebilmelidir. Baş Mühendis'in geç haberden değil, geç müdahaleden rahatsız olduğu kültürü kurulur.`,
            `Hiyerarşi, emniyet-kritik bilginin yukarı akmasını engellememelidir. Birçok makine kazası, junior zabitin "rahatsız etmeme" kaygısıyla sustuğu durumlardan doğmuştur.`,
          ],
        },
        {
          subheading: "6.2 Yazılı kayıt ve imza",
          paragraphs: [
            `Gece talimatları imzalı bir defterde veya dijital sistemde tutulur; vardiya zabiti okuduğunu imzalar. Bu kayıt, hem iletişimi belgeler hem de denetimlerde (vetting/PSC) departman disiplininin kanıtıdır.`,
            `Baş Mühendis, talimatların düzenli, okunaklı ve eyleme dönük olmasını sağlar. Belirsiz veya genel talimatlar amaca hizmet etmez; somutluk esastır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Denetimde gece talimatı",
              text: `Vetting ve iç denetimlerde, düzenli ve somut tutulan gece talimatları; güçlü bir watchkeeping ve ERM kültürünün kanıtı olarak olumlu değerlendirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sık Hatalar ve İyi Uygulamalar",
      sections: [
        {
          subheading: "7.1 Kaçınılması gereken hatalar",
          paragraphs: [
            `Sık hatalar; her gece aynı kopyala-yapıştır talimat yazmak, eşik değerleri belirsiz bırakmak, call-out kriterlerini atlamak ve junior zabitin deneyim seviyesini hesaba katmamaktır. Bu hatalar talimatı işlevsizleştirir.`,
            `Bir diğer hata, talimatı sadece bir formalite gibi görüp gerçek riskleri yansıtmamaktır. Talimat, o geceye dair gerçek düşüncenin ürünü olmalıdır.`,
          ],
        },
        {
          subheading: "7.2 İyi uygulamalar",
          paragraphs: [
            `İyi uygulamalar; talimatı o geceye özgü yazmak, somut eşik vermek, call-out kriterlerini net belirtmek, junior zabite ekstra rehberlik sağlamak ve "şüphede ara" kültürünü pekiştirmektir.`,
            `Baş Mühendis ayrıca sabah, gece boyunca olanları gözden geçirir ve gerekirse geri bildirim verir; bu döngü, gece operasyonunu sürekli iyileştirir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "8.1 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, etkili bir gece talimatının unsurlarını özetler.`,
          ],
          bullets: [
            "Talimat o geceye özgü mü (kopyala-yapıştır değil)?",
            "Geminin durumu ve beklenen riskler net belirtildi mi?",
            "İzlenecek kritik ekipman ve parametre eşikleri yazıldı mı?",
            "\"Call the Chief\" kriterleri tereddüde yer bırakmıyor mu?",
            "Vardiya zabitinin yetki sınırı deneyimine göre kalibre edildi mi?",
            "Planlı görevler ve devam eden arıza takibi işaretlendi mi?",
            "UMS ön koşulları ve dead-man alarm vurgulandı mı?",
            "Talimat imzalandı ve kayıt altına alındı mı?",
            "Handover notlarıyla tutarlı mı?",
            "Sabah gözden geçirme ve geri bildirim yapılıyor mu?",
          ],
        },
        {
          subheading: "8.2 Sonuç",
          paragraphs: [
            `Baş Mühendis gece talimatları, küçük bir doküman ama büyük bir emniyet aracıdır. Net eşikler, açık yetki sınırları ve güçlü bir "şüphede ara" kültürü; gecenin sessiz saatlerinde önlenebilir arızaların büyümesini durdurur. İyi bir gece talimatı, Baş Mühendis'in deneyimini ve önceliklerini geceye taşıyan görünmez bir gözcüdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
