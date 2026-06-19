import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte düzeni ve temizlik",
  roleSlug: "ustagemici",
  taskIndex: 6,
  estimatedPages: 23,
  intro: `Usta Gemici (AB), güverte alanlarının temiz, düzenli ve güvenli tutulmasının sorumlusudur; bu görev kozmetik değil, doğrudan can güvenliği ve denize elverişlilik konusudur. Açık ve engelsiz kaçış yolları, erişilebilir emniyet ekipmanı, çalışan drenaj kanalları, scupper'lar ve freeing port'lar; bir kazada hayatta kalma farkını yaratır. Dağınık güverte kayma/takılma/düşme kazalarına, tıkalı scupper güverte üstü su birikmesine ve stabilite riskine, kapalı kaçış yolu ise yangında ölüme yol açar. Bu bölüm; güverte düzeni ve "iyi denizcilik" (good housekeeping) ilkesini, kaçış yolu ve ekipman erişimini, drenaj/scupper/freeing port yönetimini, kayma-takılma risk kontrolünü ve düzenli temizlik programını AB perspektifinden adım adım açıklar.`,
  sources: [
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — housekeeping",
    "SOLAS Chapter II-2 — kaçış yolları ve yangın güvenliği",
    "International Load Line Convention — freeing port ve drenaj gereklilikleri",
    "MARPOL Annex I/V — döküntü ve atık yönetimi, scupper kontrolü",
    "ISM Code — emniyet yönetimi ve düzen (housekeeping)",
    "MLC 2006 — çalışma ortamı sağlık ve güvenliği",
    "P&I / IMCA Loss Prevention — slip/trip/fall vakaları",
    "Geminin Planned Maintenance System (PMS) — güverte bakım programı",
  ],
  chapters: [
    {
      heading: "1. Güverte Düzeni ve 'İyi Denizcilik' İlkesi",
      lead: `Düzenli güverte, güvenli güvertedir. Good housekeeping (iyi düzen), kazaların büyük kısmını kaynağında önleyen en temel emniyet uygulamasıdır.`,
      sections: [
        {
          subheading: "1.1 Housekeeping neden can güvenliğidir?",
          paragraphs: [
            `Güvertedeki dağınık halat, takım, hortum, döküntü ve gereksiz malzeme; kayma, takılma ve düşme (slip, trip, fall) kazalarının başlıca nedenidir. Bu kazalar denizcilikte iş günü kaybının ve yaralanmaların önemli kısmını oluşturur. AB, her işten sonra alanı toplayarak, malzemeyi yerine koyarak ve döküntüyü temizleyerek bu riski kaynağında ortadan kaldırır.`,
            `Düzen aynı zamanda acil duruma hazırlık demektir: yangın, su alma veya tahliye anında engelsiz güverte hızlı ve güvenli hareketi sağlar. Dağınık güverte hem rutinde kaza üretir hem de kriz anında kaçışı ve müdahaleyi engeller. Bu yüzden housekeeping bir "temizlik işi" değil, sürekli bir emniyet disiplinidir.`,
          ],
          bullets: [
            `Dağınık güverte = kayma/takılma/düşme riski`,
            `Düzen, acil durumda hızlı/güvenli hareket sağlar`,
            `Her işten sonra alan toplanır, malzeme yerine konur`,
            `Housekeeping sürekli bir emniyet disiplinidir`,
          ],
        },
        {
          subheading: "1.2 Malzeme istifleme ve sabitleme",
          paragraphs: [
            `Güvertede bırakılan boya kutusu, takım, halat tamburu ve ekipman; deniz hareketlerinde kayıp tehlikeli hale gelmesin diye sabitlenir (lashing/securing). Sabitlenmemiş ağır malzeme, gemi yalpaladığında ezilme/çarpma kazası yapar veya denize kayar. AB, kullanılmayan her ekipmanı uygun yere kaldırır veya sabitler.`,
            `İstifleme yaparken kaçış yolları, kapılar, emniyet ekipmanı ve manevra istasyonları (mooring station, fire station) açık tutulur. Hiçbir malzeme can simidi, yangın söndürücü, hortum kutusu veya acil çıkış önüne konmaz. AB, "geçici" diye bıraktığı malzemenin bile riske dönüşebileceğini bilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COSWP — housekeeping",
              text: `COSWP, güvertede iyi düzenin sürdürülmesini, malzemenin sabitlenmesini ve geçiş yollarının açık tutulmasını emniyet gerekliliği olarak tanımlar. Düzensizlik, slip/trip/fall kazalarının önlenebilir nedenidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kaçış Yolları ve Emniyet Ekipmanı Erişimi",
      sections: [
        {
          subheading: "2.1 Kaçış yollarının açık tutulması",
          paragraphs: [
            `Kaçış yolları (escape routes), koridorlar, acil çıkış kapıları ve merdivenler her zaman açık, engelsiz ve işaretli tutulur. AB, kaçış yoluna bırakılmış malzemeyi derhal kaldırır; çünkü yangında dumanla dolan koridorda en küçük engel bile ölümcül gecikme yaratır. Acil çıkış kapıları kilitlenmez, önü kapatılmaz.`,
            `Kaçış aydınlatması (escape lighting, low-location lighting) ve yön işaretleri görünür ve çalışır olmalıdır; üzeri boya/malzeme ile kapatılmaz. AB, arızalı kaçış aydınlatmasını veya silinmiş işareti raporlar. Tatbikatlarda kaçış yolları fiziksel olarak kontrol edilir; engel bulunursa giderilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kaçış yolu kutsaldır",
              text: `Hiçbir gerekçeyle (geçici depolama, boya işi, tadilat) kaçış yolu, acil çıkış veya merdiven kapatılmaz. Yangın/duman anında saniyeler hayat kurtarır; tıkalı bir kaçış yolu ölümle sonuçlanabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Emniyet ekipmanına erişimin korunması",
          paragraphs: [
            `Yangın söndürücü, hortum kutusu (fire station), can simidi, EEBD, ilk yardım dolabı ve acil durum durdurma butonlarının önü her zaman açık tutulur. AB, bu noktaların önüne malzeme istiflenmesini engeller ve istiflenmişse kaldırır. Erişilemeyen bir emniyet ekipmanı, gerçek anda yok hükmündedir.`,
            `Emniyet ekipmanı işaretleri (levha, fosforlu yön okları) görünür ve temiz tutulur; üzeri boya/kir ile kapatılmaz. AB, güverte boyama/temizlik işlerinde bu işaretlere ve ekipmana zarar vermemeye dikkat eder, gerekirse maskeleyerek korur.`,
          ],
          bullets: [
            `Söndürücü, hortum, simit, EEBD, ilk yardım önü açık`,
            `Acil durdurma butonlarına erişim engellenmez`,
            `Emniyet işaretleri görünür ve temiz tutulur`,
            `Boyama/temizlikte ekipman korunur`,
          ],
        },
      ],
    },
    {
      heading: "3. Drenaj, Scupper ve Freeing Port Yönetimi",
      lead: `Güverteye gelen su, drenaj kanalları, scupper'lar ve freeing port'lar yoluyla hızla boşalmalıdır; tıkanıklık su birikmesine, ağırlığa ve stabilite riskine yol açar.`,
      sections: [
        {
          subheading: "3.1 Scupper ve drenaj kanallarının açık tutulması",
          paragraphs: [
            `Scupper'lar (güverte tahliye delikleri) ve drenaj kanalları (waterway/gutterway), güverteye gelen yağmur, deniz suyu ve yıkama suyunun hızla denize/sintineye boşalmasını sağlar. AB, bu kanalları yaprak, pas, boya artığı, halat ve döküntüden temizler. Tıkalı scupper, güverte üstünde su birikmesine ve donma/kayma riskine yol açar.`,
            `Yağlı operasyonlarda (yakıt ikmali, makine işi) scupper'lara tıpa (scupper plug) takılır ki olası döküntü denize gitmesin (MARPOL). Operasyon bitince ve döküntü temizlendikten sonra tıpalar çıkarılır; takılı unutulmuş tıpa, sonraki yağmur/dalga suyunun birikmesine yol açar. AB bu döngüyü dikkatle yönetir.`,
          ],
          table: {
            caption: `Drenaj Elemanları ve İşlevleri`,
            headers: ["Eleman", "İşlevi", "Tıkalı/Hatalı Olursa"],
            rows: [
              ["Scupper", "Güverte suyunu boşaltır", "Su birikir, kayma/donma"],
              ["Scupper plug", "Yağlı işte döküntüyü tutar", "Unutulursa su birikir"],
              ["Waterway/gutter", "Suyu scupper'a yönlendirir", "Tıkanırsa su yayılır"],
              ["Freeing port", "Yalpa güvertesi suyunu atar", "Tıkalı → güverte su altı"],
              ["Sintine süzgeci (strum)", "Sintineyi pompaya verir", "Tıkalı → su tahliye edilemez"],
            ],
          },
        },
        {
          subheading: "3.2 Freeing port'ların işlevi ve serbestliği",
          paragraphs: [
            `Freeing port'lar, gemi bordasındaki menteşeli kapaklardır; güverteye dolan denizin (green water) hızla dışarı atılmasını sağlar. Yalpa güvertesinde (well deck) biriken su, gemiyi ağırlaştırıp serbest yüzey etkisiyle stabiliteyi tehlikeye atar; freeing port bunu önler. AB, freeing port kapaklarının serbest hareket ettiğini, paslı/sıkışmış olmadığını ve bağlanıp kapatılmadığını kontrol eder.`,
            `Freeing port'lar kesinlikle bağlanmaz, tıkanmaz veya kalıcı kapatılmaz; aksi halde güverteye dolan su boşalamaz ve gemi tehlikeye girer. AB, sıkışan menteşeyi yağlar, paslananı raporlar ve önlerini malzemeyle kapatmaz. Bu küçük kapaklar, kötü havada geminin denge sigortasıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: tıkalı freeing port ve su yükü",
              text: `Tıkanmış veya bağlanmış freeing port'lar nedeniyle yalpa güvertesinde biriken su, serbest yüzey etkisiyle stabiliteyi bozmuş ve bazı gemilerin alabora olmasına katkıda bulunmuştur. Ders: freeing port asla bağlanmaz/tıkanmaz, serbest hareketi düzenli kontrol edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kayma-Takılma-Düşme Riskinin Kontrolü",
      sections: [
        {
          subheading: "4.1 Zemin koşulları ve yürüme güvenliği",
          paragraphs: [
            `Yağ, gres, su, buz, gevşek halat ve dökülmüş malzeme güverteyi kaygan ve tehlikeli yapar. AB, döküntüyü hemen temizler, ıslak/yağlı zemini işaretler ve kaymaz yüzey (anti-slip) gereken yerlerde aşınmış kaplamayı raporlar. Buzlanan güverte kışın ölümcül kayma riski yaratır; tuz/kum serpme ve buz kırma yapılır.`,
            `Yürüme yolları, geçiş güvertesi (fore-aft passage), korkuluk (railing) ve emniyet halatları (life line) sağlam ve sürekli tutulur. AB, gevşek/kopuk korkuluğu, eksik emniyet halatını ve açık kalmış güverte ağzını (manhole, deck opening) derhal işaretler ve raporlar. Açık bir güverte ağzı, düşme ve hatta enclosed space kazası riskidir.`,
          ],
          bullets: [
            `Yağ/su/döküntü hemen temizlenir, ıslak zemin işaretlenir`,
            `Buzlu güvertede tuz/kum serpilir, buz kırılır`,
            `Korkuluk ve emniyet halatları sağlam tutulur`,
            `Açık güverte ağzı işaretlenir ve raporlanır`,
          ],
        },
        {
          subheading: "4.2 Aydınlatma ve görünürlük",
          paragraphs: [
            `Yetersiz aydınlatma, gece güverte çalışmasında ve geçişlerinde kaza riskini artırır. AB, arızalı güverte aydınlatmasını raporlar, gece çalışmasında taşınabilir lamba kullanır ve görüş engellerini (buhar, duman) dikkate alır. Yüksek görünürlüklü PPE, başkalarınca fark edilmeyi ve manevra alanlarında güvenliği artırır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Üç temas noktası kuralı",
              text: `Merdiven ve dik geçişlerde 'üç temas noktası' (iki el bir ayak ya da iki ayak bir el) kuralına uyulur; ellerde malzeme taşımak yerine omuz çantası/halatla taşıma tercih edilir. Bu basit kural düşme kazalarını ciddi oranda azaltır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Düzenli Temizlik ve Bakım Programı",
      sections: [
        {
          subheading: "5.1 Günlük ve periyodik temizlik rutinleri",
          paragraphs: [
            `Güverte temizliği reisin yönettiği günlük/haftalık programa göre yapılır: tuz birikiminin yıkanması (özellikle sefer sonrası ve boya öncesi), döküntü temizliği, drenaj kontrolü ve genel düzen. Deniz tuzu, korozyonu hızlandırdığından açık güverte ekipmanı tatlı su ile yıkanır. AB, programı uygular ve tamamladığını raporlar.`,
            `Temizlik kimyasalları (deterjan, yağ çözücü) kullanılırken üretici talimatına ve güvenlik bilgi formuna (SDS) uyulur; uygun eldiven/gözlük takılır ve kimyasal denize boşaltılmaz. Yıkama suyu yağ/kimyasal içeriyorsa MARPOL'e uygun toplanır. AB, çevre kurallarını temizlik rutininin parçası sayar.`,
          ],
        },
        {
          subheading: "5.2 Düzen ve bakımın PMS ile bağlantısı",
          paragraphs: [
            `Güverte düzeni, geminin Planned Maintenance System (PMS) ve bakım programıyla iç içedir; temizlik sırasında fark edilen pas, çatlak, kopuk korkuluk ve arızalı ekipman bakım sistemine raporlanır. AB, "sadece temizleyen" değil, aynı zamanda kusur tespit eden bir gözlemcidir; erken raporlanan küçük kusur büyük bakım maliyetini önler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Temizlik = erken kusur tespiti",
              text: `Güverteyi temizlerken AB, pas başlangıcını, çatlağı, gevşek bağlantıyı ve arızalı ekipmanı en önce fark eden kişidir. Bu gözlemlerin raporlanması, PMS kapsamında küçük sorunların büyümeden giderilmesini sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "6.1 Düzen ve drenaj ihmalleri",
          paragraphs: [
            `En sık hatalar: scupper plug'ın takılı unutulması (su birikmesi), freeing port'un bağlanması/tıkanması, kaçış yolunun geçici malzeme ile kapatılması ve döküntünün "sonra temizleriz" diye bırakılması. Bu ihmaller hem rutin kazalara hem de kötü havada ciddi stabilite/su alma riskine yol açar.`,
            `Slip/trip/fall kazalarının çoğu önlenebilirdi: dökülen yağın hemen temizlenmesi, gevşek halatın toplanması ve ıslak zeminin işaretlenmesi yeterliydi. AB, "küçük" görünen düzensizliğin gerçek bir yaralanmaya dönüşebileceğini bilerek hareket eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scupper plug'ı çıkarmayı unutma",
              text: `Yağlı operasyon sonrası takılı kalan scupper plug, sonraki yağmur/dalga suyunun güvertede birikmesine ve kayma/donma riskine yol açar. Operasyon ve temizlik bitince tıpalar mutlaka çıkarılmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Emniyet ekipmanı ve işaret hataları",
          paragraphs: [
            `Emniyet ekipmanı önünün malzeme ile kapatılması, işaretlerin boya/kir ile örtülmesi ve kaçış aydınlatmasının arızalı bırakılması; gerçek acilde hayati gecikme yaratır. AB, temizlik ve boyama işlerinde emniyet ekipmanını ve işaretlerini koruyup, erişimi her zaman açık tutmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Güverte düzeni ve temizlik checklist'i",
          bullets: [
            `Güverte dağınıklıktan arındı, malzeme yerine konup sabitlendi mi?`,
            `Kaçış yolları, kapılar ve merdivenler açık ve işaretli mi?`,
            `Emniyet ekipmanının (söndürücü, simit, EEBD) önü açık mı?`,
            `Scupper ve drenaj kanalları temiz, tıkanıklık yok mu?`,
            `Scupper plug'lar operasyon sonrası çıkarıldı mı?`,
            `Freeing port'lar serbest, bağlı/tıkalı değil mi?`,
            `Yağ/su/buz temizlendi, ıslak/kaygan zemin işaretlendi mi?`,
            `Korkuluk, emniyet halatı sağlam; açık güverte ağzı işaretli mi?`,
            `Fark edilen pas/çatlak/arıza PMS'e raporlandı mı?`,
          ],
          paragraphs: [
            `Güverte düzeni ve temizlik, denizciliğin en az fark edilen ama en çok hayat kurtaran görevlerindendir. Açık bir kaçış yolu, çalışan bir scupper, serbest bir freeing port ve temiz bir güverte; rutinde kazaları önler, krizde hayatta kalmayı sağlar. AB'nin değeri, "her şey yolundayken" görünmez kalan ama bir yangında, bir fırtınada ya da bir kayma anında geminin ve mürettebatın sigortası olan bu sürekli, sessiz disiplinde yatar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
