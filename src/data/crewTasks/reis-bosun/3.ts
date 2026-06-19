import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte düzeni ve housekeeping",
  roleSlug: "reis-bosun",
  taskIndex: 3,
  estimatedPages: 24,
  intro: `Reis (Bosun), geminin açık güvertesinin "ev sahibi"dir. Housekeeping; sadece estetik bir temizlik meselesi değil, doğrudan can güvenliği, denetim hazırlığı ve operasyonel verimlilik meselesidir. Dağınık bir güverte; kayma-takılma-düşme kazalarının, tıkanmış kaçış yollarının, erişilemeyen yangın/can kurtarma ekipmanının ve PSC tutuklamalarının başlıca sebebidir. Bu bölüm; güverte düzeninin felsefesini, kayma-düşme risk kontrolünü, kaçış yollarının ve emniyet ekipmanı erişiminin korunmasını, depolama disiplinini, liman ve seyirde housekeeping önceliklerini ve denetim hazırlığını detaylı olarak ele alır.`,
  sources: [
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — MCA",
    "ISM Code — Element 7 (Shipboard Operations) ve 10 (Maintenance)",
    "SOLAS Chapter II-2 — Escape routes & fire safety",
    "SOLAS Chapter III — LSA erişimi ve muster düzeni",
    "TMSA Element 9 — Safety Management & housekeeping standards",
    "OCIMF / Rightship inspection checklist (deck condition)",
    "ILO MLC 2006 — Title 4 (sağlık, güvenlik, kaza önleme)",
  ],
  chapters: [
    {
      heading: "1. Housekeeping Felsefesi: Düzen, Güvenliğin Görünen Yüzüdür",
      lead: `Bir gemiye adım atan denetçi, ilk 5 dakikada güvertenin düzenine bakarak gemi yönetiminin kalitesi hakkında fikir edinir. Reis bu yüzden housekeeping'i "ilk izlenim" değil, sürekli bir disiplin olarak yönetir.`,
      sections: [
        {
          subheading: "1.1 Neden housekeeping bir güvenlik konusudur",
          paragraphs: [
            `Gemide meydana gelen yaralanmaların önemli bir kısmı "slip, trip and fall" (kayma, takılma, düşme) kaynaklıdır. Dağınık halat, açıkta bırakılmış el aleti, dökülmüş yağ-boya, gevşek güverte plakası ve tıkanmış geçit; hepsi düşük seviyeli ama yüksek frekanslı kaza nedenleridir. Reis'in housekeeping disiplini, bu kazaları kaynağında keser.`,
            `Düzen aynı zamanda acil durum hazırlığının ön koşuludur. Yangın çıktığında köpük monitörüne ulaşamamak, abandon ship anında muster station'a giden yolun tıkalı olması ya da can salına erişimi engelleyen istif, saniyelerin hayat kurtardığı anlarda felakete dönüşür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Reis'in kuralı: 'kaldırmadan bırakma'",
              text: `Bir iş bittiğinde kullanılan her alet, halat ve malzeme yerine konmadan ekip dağılmaz. "Sonra toplarız" zihniyeti, güvertede kalıcı dağınıklığın anasıdır. İş sonu 10 dakikalık toparlanma, ertesi gün 1 saatlik temizlikten ucuzdur.`,
            },
          ],
        },
        {
          subheading: "1.2 5S mantığının gemiye uyarlanması",
          paragraphs: [
            `Endüstriyel 5S yöntemi (Seiri-ayıkla, Seiton-düzenle, Seiso-temizle, Seiketsu-standartlaştır, Shitsuke-sürdür) güverteye birebir uygulanabilir. Reis, her depolama alanı için "neyin nereye ait olduğunu" sabitler; gölge panoları (shadow board) ile el aletlerinin yeri işaretlenir, eksik alet anında görülür.`,
            `Standartlaştırma; bir kişinin değil, ekibin ortak alışkanlığı haline gelmelidir. Reis, bir tayfa izinde veya değişimde olsa bile düzenin bozulmaması için "yer bilgisinin" herkeste olmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "2. Kayma, Takılma ve Düşme Risklerinin Kontrolü",
      sections: [
        {
          subheading: "2.1 Güverte yüzeyi ve yürüyüş yolları",
          paragraphs: [
            `Açık güvertede yağ, gres, boya, su ve özellikle buz; ana kayma nedenleridir. Reis, walkway'leri (yürüyüş yolları) öncelikli temiz tutar; soğuk iklimde anti-slip uygulaması, tuz serpme ve buz kırma planı yapar. Non-slip boya ve güverte üzeri kaymaz şeritler periyodik kontrol edilir.`,
            `Açıkta bırakılmış lashing malzemesi, hortum, kablo ve halat uçları en sık takılma nedenidir. Geçici olarak serilen hortum ve kablolar mümkünse asılır veya kenara, geçişi engellemeyecek şekilde toplanır; gerekirse uyarı bandı/koni ile işaretlenir.`,
          ],
          table: {
            caption: `Yaygın Güverte Tehlikeleri ve Kontrol Önlemleri`,
            headers: ["Tehlike", "Tipik Yer", "Sonuç", "Kontrol Önlemi"],
            rows: [
              ["Dökülen yağ/boya", "Makine kaportası, store önü", "Kayma, düşme", "Anında temizlik + emici malzeme"],
              ["Açık deck plate / manhole", "Hold çevresi, tank top", "Düşme, kırık", "Bariyer + işaret + asla gözetimsiz"],
              ["Gevşek lashing/halat", "Lashing bridge, mooring deck", "Takılma", "İş sonu toplama, asma"],
              ["Buz / kar", "Açık güverte, merdiven", "Kayma", "Tuz, buz kırma, anti-slip"],
              ["Yetersiz aydınlatma", "Geçit, ambar girişi", "Çarpma, düşme", "Lamba kontrolü, portatif ışık"],
            ],
          },
        },
        {
          subheading: "2.2 Açıklıklar, kapaklar ve dikey tehlikeler",
          paragraphs: [
            `Açık manhole, ullage port, sounding pipe kapağı, hold access ve guard rail eksikliği; ölümcül düşme riskleridir. Reis, açılan her açıklığın gözetim altında tutulmasını ve iş biter bitmez güvenli kapatılmasını sağlar. Gözetimsiz açık bırakılan bir manhole, gece karanlığında bir mürettebatın can kaybına yol açabilir.`,
            `Guard rail, stanchion, bulwark ve safety chain'lerin bütünlüğü periyodik kontrol edilir; eksik veya gevşek korkuluk derhal raporlanır ve geçici emniyet (uyarı, bariyer) alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gözetimsiz açık açıklık = ölüm tuzağı",
              text: `Hiçbir manhole, tank kapağı veya hold access; üzerine bariyer kurulmadan ve gözetim sağlanmadan açık bırakılmaz. Gece veya kötü görüş koşulunda gözetimsiz açıklık, en sık ölümlü düşme nedenlerinden biridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kaçış Yolları ve Acil Erişimin Korunması",
      sections: [
        {
          subheading: "3.1 Escape route disiplini",
          paragraphs: [
            `SOLAS Chapter II-2, kaçış yollarının her zaman açık ve engelsiz tutulmasını şart koşar. Reis, koridor, merdiven, kapı ve acil çıkışların önüne malzeme istiflenmemesini denetler. Bir yangında dumanla dolu bir koridorda tek metre fazla yol, hayatla ölüm arasındaki farktır.`,
            `Watertight ve fire door'ların serbest kapanmasını engelleyen takozlar (wedge), bağlamalar ve istif kaldırılır. "Hava aksın diye" açık wedge'lenmiş bir yangın kapısı, en sık denetim bulgularından biridir ve gemi güvenliğini doğrudan tehlikeye atar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Means of escape",
              text: `Kaçış yolları ve acil çıkışlar her zaman açık tutulmalıdır. Fire/watertight kapıların serbest çalışması engellenemez. PSC denetimlerinde tıkalı escape route, "detainable deficiency" olabilir.`,
            },
          ],
        },
        {
          subheading: "3.2 LSA, FFA ve emniyet ekipmanı erişimi",
          paragraphs: [
            `Can salları, can filikası, MOB botu, yangın hortumu kutuları, köpük monitörleri, taşınabilir yangın söndürücüler ve EEBD'lerin önü her zaman açık olmalıdır. Reis, bu ekipmanların çevresine asla istif yapılmamasını ve işaretlemenin (signage) görünür kalmasını sağlar.`,
            `Acil ekipman erişim yolları boyaması (genelde sarı işaretleme) ve ekipman lokasyon levhaları periyodik kontrol edilir; solmuş veya örtülmüş işaretler yenilenir. Muster station alanı her zaman boş ve erişilebilir tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "4. Malzeme Depolama ve İstif Disiplini",
      sections: [
        {
          subheading: "4.1 Güverte üzeri geçici istif kuralları",
          paragraphs: [
            `Bakım sırasında boya kutuları, tiner, halat makarası, lashing malzemesi gibi malzemeler geçici olarak güvertede bulunur. Reis bunların; lashing edilmiş (denizde kaymayacak), geçişi engellemeyen ve tehlikeli madde ise uygun ayrılmış şekilde istiflenmesini sağlar.`,
            `Denizde hiçbir gevşek malzeme güvertede bırakılmaz; bir bidon boya bile yalpayla fırlayıp yaralanmaya veya denize kayba yol açabilir. "Sea-fastening" (deniz sabitlemesi) iş bitiminin ayrılmaz parçasıdır.`,
          ],
        },
        {
          subheading: "4.2 Tehlikeli ve yanıcı malzeme yönetimi",
          paragraphs: [
            `Boya, tiner, gres, oksijen-asetilen tüpleri ve solvent gibi yanıcı/tehlikeli malzemeler; havalandırmalı, kıvılcımdan uzak, uygun depolarda tutulur. Açık güvertede gaz tüpleri dik ve emniyetli (zincir/kelepçe ile) sabitlenir; oksijen ve yakıt gazı tüpleri ayrı tutulur.`,
            `Paçavra ve solvent emmiş bezler; self-ignition (kendiliğinden tutuşma) riski nedeniyle metal kapaklı kutularda toplanır ve düzenli atılır. Bu, basit ama hayati bir housekeeping kuralıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: kendiliğinden tutuşan paçavralar",
              text: `Linseed oil veya bazı solventlerle ıslanmış paçavralar, bir köşede yığıldığında oksitlenme ısısıyla kendiliğinden tutuşabilir. Birçok gemi yangını, atılmamış paçavra yığınından başlamıştır. Çözüm: metal kapaklı kutu + düzenli boşaltma.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Drenaj, Su Tutma ve Kirlilik Önleme",
      sections: [
        {
          subheading: "5.1 Scupper, drain ve su birikimi yönetimi",
          paragraphs: [
            `Güverte üzeri su drenajı (scupper) tıkalı olduğunda su birikir; bu hem kayma riski hem de yük/store için hasardır. Reis, scupper'ların temiz ve serbest tutulmasını denetler. Ancak tanker/yük operasyonu sırasında kirlilik riskine karşı scupper plug'lar takılır; bu iki gerekliliğin dengesi durum bazında yönetilir.`,
            `Boya, yağ veya kimyasal döküntüsünün denize karışması ciddi bir MARPOL ihlalidir. Bakım sırasında scupper'lar tıkanır (plug + macun), iş bitince temizlenip kontrollü tahliye yapılır. Save-all tepsileri yağ/boya transferinde hazır bulundurulur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL — sıfır deşarj disiplini",
              text: `Güverteden denize bir damla boya, yağ veya kimyasal karışması raporlanabilir kirliliktir. Bakım işlerinde scupper plug, save-all ve emici malzeme zorunludur; döküntü anında SOPEP/SMPEP devreye girer.`,
            },
          ],
        },
        {
          subheading: "5.2 Atık ayrımı ve garbage management",
          paragraphs: [
            `MARPOL Annex V kapsamında güverte atıkları (plastik, metal, gıda, operasyonel atık) ayrı toplanır; Reis, güverte üzerindeki garbage station'ların düzenini ve doğru ayrımı denetler. Garbage Record Book girişleri için saha kayıtları tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Liman ve Seyirde Housekeeping Öncelikleri",
      sections: [
        {
          subheading: "6.1 Limanda housekeeping",
          paragraphs: [
            `Liman, denetimlerin (PSC, vetting, klas, terminal) en yoğun olduğu yerdir. Reis, varış öncesi güverteyi denetim hazır hale getirir: mooring deck düzeni, açık alanların temizliği, işaretlemelerin görünürlüğü ve ekipman erişimi. Limanda yapılan toz/gürültü işleri (chipping, grinding) sonrası anında toparlanma yapılır.`,
          ],
        },
        {
          subheading: "6.2 Seyirde housekeeping",
          paragraphs: [
            `Seyirde öncelik, denizde gevşek malzeme bırakmamak ve sea-fastening'dir. Kötü hava beklentisinde Reis, tüm açık güvertede "secure for sea" kontrolü yapar: lashing, store kapıları, hortum makaraları, gaz tüpleri ve güverte ekipmanı. Yalpa altında fırlayan bir nesne, hem yaralanma hem deniz kaybı hem de hasar yaratır.`,
            `Hava uygun olduğunda seyir, rutin temizlik ve düzenleme için fırsattır; ancak güvenlik (harness, hava penceresi, gözetim) liman koşullarına göre daha kısıtlıdır.`,
          ],
          table: {
            caption: `Liman vs Seyir Housekeeping Öncelik Karşılaştırması`,
            headers: ["Konu", "Limanda", "Seyirde"],
            rows: [
              ["Ana hedef", "Denetim hazırlığı + temizlik", "Sea-fastening + güvenlik"],
              ["Toz/gürültü işi", "Öncelikli", "Hava + gözetime bağlı"],
              ["Malzeme istifi", "Düzenli, görünür", "Lashing'li, minimum"],
              ["Risk vurgusu", "Slip/trip + erişim", "Yalpa, fırlayan nesne"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Aydınlatma, İşaretleme ve Görünürlük",
      sections: [
        {
          subheading: "7.1 Güverte aydınlatması",
          paragraphs: [
            `Yetersiz aydınlatma, gece operasyonlarında ve geçitlerde kaza riskini artırır. Reis, güverte lambalarının, geçit aydınlatmasının ve acil aydınlatmanın çalışırlığını rutin kontrol eder; arızalı lambaları raporlar. Mooring deck, access way ve store girişlerinin aydınlatması önceliklidir.`,
          ],
        },
        {
          subheading: "7.2 İşaretleme ve uyarı levhaları",
          paragraphs: [
            `Tehlike işaretleri, ekipman lokasyon levhaları, PPE zorunluluğu işaretleri ve yürüyüş yolu işaretlemeleri okunaklı ve görünür tutulur. Solmuş, paslı veya örtülmüş işaretler housekeeping kapsamında yenilenir. Görünür işaretleme, hem mürettebat hem ziyaretçi (pilot, surveyor, stevedore) güvenliği içindir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Denetim Hazırlığı (PSC, Vetting, Klas)",
      sections: [
        {
          subheading: "8.1 Denetçinin gözünden güverte",
          paragraphs: [
            `Denetçiler güvertede; temizlik, korkuluk bütünlüğü, kaçış yolu açıklığı, ekipman erişimi, işaretleme, drenaj ve genel bakım durumuna bakar. Reis, "denetçi gözüyle" düzenli bir self-inspection rutini uygular; bulduğu eksiklikleri Birinci Zabit'e raporlar ve giderir.`,
            `Housekeeping; tek başına bir tutuklama (detention) sebebi olmasa da, kötü genel görünüm denetçiyi "derinlemesine bak" moduna sokar ve başka bulguların önünü açar. İyi housekeeping ise denetimin tonunu olumlu belirler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Denetimden önce değil, her gün",
              text: `Sadece denetim öncesi yapılan büyük temizlik, sürdürülemez ve sahteliği bellidir. Gerçek standart, her günün rutini olan housekeeping'tir. En iyi gemiler, hiç haber verilmeden denetlenseler bile hazırdır.`,
            },
          ],
        },
        {
          subheading: "8.2 Self-inspection ve kayıt",
          paragraphs: [
            `Reis, haftalık güverte tur kayıtlarını (rounds) tutar; tespit edilen housekeeping eksiklikleri, alınan önlemler ve tamamlanma fotoğraflarıyla belgelenir. Bu kayıtlar ISM kapsamında "sürekli iyileştirme" kanıtıdır ve denetimde gemi yönetiminin disiplinini gösterir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Ekip Sorumluluğu ve Düzenin Sürdürülmesi",
      sections: [
        {
          subheading: "9.1 Sorumluluk alanı paylaşımı",
          paragraphs: [
            `Reis, güverteyi sorumluluk bölgelerine ayırır ve her tayfaya belli bir alanın düzeninden sorumluluk verir ("zone ownership"). Bu, dağınıklığın "herkesin işi, kimsenin işi" olma sorununu çözer. Sahiplik duygusu, sürdürülebilir düzenin temelidir.`,
          ],
        },
        {
          subheading: "9.2 Toolbox ve geri bildirim",
          paragraphs: [
            `Housekeeping; toolbox meeting'lerin sabit gündem maddesidir. Reis, iyi örnekleri över, eksiklikleri kişisel değil sistemsel olarak ele alır. Bir tayfa bir tehlike (örn. gevşek korkuluk) bildirdiğinde olumlu karşılanmalıdır; raporlama kültürü, düzenin ve güvenliğin garantisidir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "10.1 Reis'in günlük housekeeping checklist'i",
          bullets: [
            `Yürüyüş yolları ve geçitler açık, temiz ve kaymaz mı?`,
            `Kaçış yolları ve acil çıkışlar engelsiz mi?`,
            `LSA / FFA ekipmanına erişim açık, işaretleme görünür mü?`,
            `Açık manhole / açıklık var mı, varsa bariyer + gözetim mevcut mu?`,
            `Güverte üzeri malzeme istifi düzenli ve (denizde) lashing'li mi?`,
            `Yanıcı/tehlikeli malzeme uygun depolanmış, paçavralar metal kutuda mı?`,
            `Scupper / drain durumu operasyona uygun (plug/açık) mı?`,
            `Korkuluk, stanchion, safety chain bütün mü?`,
            `Aydınlatma çalışıyor, işaretleme okunaklı mı?`,
            `Atık ayrımı doğru, garbage station düzenli mi?`,
          ],
          paragraphs: [
            `Güverte housekeeping; gösteriş için değil, hayat için yapılır. Düzenli bir güverte; daha az kaza, daha hızlı acil müdahale, daha temiz denetim ve daha motive bir ekip demektir. Reis bu düzenin hem mimarı hem de bekçisidir; iyi bir reis'in gemisi, hiç haber verilmeden gelen bir denetçiyi bile her an karşılamaya hazırdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
