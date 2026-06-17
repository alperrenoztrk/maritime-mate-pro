import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Filtre ve yağ değişimi işleri",
  roleSlug: "yagci-fitter",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Filtre ve yağ değişimi, makine dairesinin "kan dolaşımını" temiz tutan rutin ama hayati bir görevdir. Yağcı/Fitter; yakıt (FO/DO), yağlama yağı (LO) ve hava filtrelerinin diferansiyel basınç takibini, temizlenmesini veya değiştirilmesini, sirkülasyon yağı numunelerinin alınmasını, yağ seviyelerinin kontrol ve top-up edilmesini, purifier (separatör) operasyonuna saha desteğini ve sludge/atık yağ tankı yönetimini yürütür. Bu bölüm; filtre changeover prosedürünü, doğru yağ seçimini, numune alma tekniğini, MARPOL Annex I kapsamındaki atık yağ yönetimini ve bu işlerde sık yapılan hataları adım adım açıklar.`,
  sources: [
    "MARPOL Annex I — Oil Record Book Part I (Machinery Space Operations)",
    "ISO 4406 — Hydraulic fluid power, contamination coding",
    "ISO 3171 / ISO 4021 — Petroleum liquids sampling",
    "SOLAS Chapter II-2 — Fire safety (yakıt/yağ hatları ekranlama)",
    "MAN B&W / Wärtsilä Lubricating Oil Maintenance Guidelines",
    "Class Society Rules (DNV, ABS, LR) — PMS ve yağ analizi gereklilikleri",
    "ICS Engine-Room Procedures Guide",
    "Lubricant supplier condition-monitoring chart (TBN/viskozite/su)",
  ],
  chapters: [
    {
      heading: "1. Filtrasyonun Makine Sağlığındaki Rolü",
      lead: `Bir makinenin ömrü, içinden geçen yakıt ve yağın temizliğiyle doğru orantılıdır. Filtre, mikronluk partiküllerin yatakları, enjektörleri ve pompaları aşındırmasını önleyen son savunma hattıdır.`,
      sections: [
        {
          subheading: "1.1 Kontaminasyonun kaynakları ve sonuçları",
          paragraphs: [
            `Yakıt ve yağ sistemlerine kontaminasyon üç yoldan girer: dışarıdan (bunker sırasında alınan katı/su, hava emişi), içeriden (aşınma metali, conta artığı, pas) ve kimyasal bozunmadan (oksidasyon, termal degradasyon). Bu partiküller filtreyle yakalanmazsa enjektör nozzle aşınması, yatak çizilmesi, pompa çark erozyonu ve valf yapışması gibi pahalı arızalara yol açar.`,
            `Modern dizel makinelerde yatak boşlukları mikron mertebesindedir; 10-20 mikronluk bir partikül bile yağ filmini delip metal-metal temasına neden olabilir. Bu yüzden filtre mesh boyutu (örn. ME LO için 25-40 mikron, enjeksiyon hattı için daha ince) üretici spesifikasyonuna birebir uyularak seçilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temizlik = ömür",
              text: `Makine arızalarının büyük kısmı doğrudan ya da dolaylı olarak kontaminasyona bağlanır. Filtreyi vaktinde temizlemek/değiştirmek, en ucuz ve en etkili koruyucu bakımdır. Bir filtre kartuşunun maliyeti, bir yatak takımının maliyetinin yanında ihmal edilebilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Filtre tipleri ve yerleşimi",
          paragraphs: [
            `Gemi makine dairesinde duplex (çift kollu, kesintisiz changeover sağlayan), simplex (tek kollu), otomatik geri yıkamalı (auto-backwash), kendinden temizlemeli (self-cleaning) ve manyetik filtreler bulunur. Duplex filtreler ana yakıt/yağ hatlarında standarttır; bir kol temizlenirken diğeri devrede kalır ve makine durmaz.`,
            `Filtreler genelde pompa basma tarafında (fine filter) ve emiş tarafında (suction strainer / coarse filter) iki kademeli kurulur. Yağcı, her filtrenin yerini, mesh boyutunu, changeover kolunun yönünü ve drain/vent valflerini ezbere bilmelidir.`,
          ],
          table: {
            caption: `Tipik Filtre Tipleri ve Uygulama Alanları`,
            headers: ["Filtre Tipi", "Tipik Mesh", "Uygulama", "Bakım Şekli"],
            rows: [
              ["Duplex FO fine", "10 - 34 µm", "Enjeksiyon öncesi yakıt", "Changeover + manuel temizlik"],
              ["LO full-flow", "25 - 50 µm", "ME/AE yağlama hattı", "Changeover + kartuş değişim"],
              ["Auto-backwash", "6 - 60 µm", "Booster ünitesi", "Otomatik flush + izleme"],
              ["Suction strainer", "0.5 - 3 mm", "Pompa emişi (coarse)", "Periyodik söküp temizlik"],
              ["Air intake filter", "Panel/yağ banyolu", "T/C ve oda havası", "Yıkama / değişim"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Diferansiyel Basınç Takibi ve Tıkanma Yönetimi",
      sections: [
        {
          subheading: "2.1 DP göstergesinin okunması",
          paragraphs: [
            `Her ana filtrede bir diferansiyel basınç (DP) göstergesi vardır; filtre giriş ve çıkış basıncı arasındaki farkı gösterir. Temiz filtrede DP düşüktür; partikül biriktikçe DP yükselir. Üreticinin belirlediği eşik (örn. 0.8-1.5 bar) aşıldığında filtre temizlenir veya değiştirilir.`,
            `Yağcı, DP değerini her turda not eder ve trendini izler. Ani DP sıçraması (saatler içinde) genelde bunker sonrası kirli yakıt veya bir hat içi arıza işaretidir; yavaş yükselme ise normal birikme. Bypass valfi açıldığında filtre devre dışı kalır ve kirli akışkan makineye gider — bu durum asla normal sayılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yüksek DP'yi yok saymak",
              text: `DP eşik üstüne çıktığında müdahale edilmezse bypass valfi açılır ve filtrelenmemiş yakıt/yağ makineye dolar. Bu, enjektör tıkanmasından yatak hasarına kadar zincirleme arıza başlatır. DP alarmı asla "sonra bakarım" denilecek bir uyarı değildir.`,
            },
          ],
        },
        {
          subheading: "2.2 Duplex filtre changeover prosedürü",
          paragraphs: [
            `Changeover, makineyi durdurmadan yapılan kritik bir manevradır. Önce temizlenecek olmayan (yeni) kol vent edilerek hava alınır ve yavaşça hatla eşitlenir; ardından changeover kolu çevrilerek akış yeni kola yönlendirilir. Kirli kol izole edilir, basınç drain edilir, kapak açılır.`,
            `Kapak açılırken sıcak yakıt/yağ fışkırma riski vardır; bu yüzden basıncın tam boşaldığı doğrulanır, drip tray yerleştirilir ve uygun PPE (eldiven, gözlük) giyilir. Kartuş çıkarılır, içeriği gözlemlenir (metal talaşı, su, alışılmadık kalıntı mühendise raporlanır), yeni/temiz kartuş takılır, O-ring kontrol edilir ve kol "standby" konumuna bırakılır.`,
          ],
          bullets: [
            `Yeni kolu vent et, hatla eşitle (hava cebi bırakma)`,
            `Changeover kolunu yavaş ve tam çevir`,
            `Kirli kolu izole et, basıncı drain et, sıcaklığı kontrol et`,
            `Kartuşu çıkar, içeriği gözlemle ve raporla`,
            `Yeni kartuş + sağlam O-ring tak, sızdırmazlığı kontrol et`,
            `Kolu temiz/standby konumda bırak, kaydı tut`,
          ],
        },
      ],
    },
    {
      heading: "3. Yakıt Filtresi İşleri (FO/DO)",
      sections: [
        {
          subheading: "3.1 Ağır yakıt (HFO) filtreleme zorlukları",
          paragraphs: [
            `Ağır yakıt (HFO/RMG) yüksek viskoziteli ve kontaminasyon yüklüdür; cat fines (alüminyum-silikon parçacıkları), su, çamur ve asfalten içerir. Bu yüzden HFO sistemleri purifier + booster + ince filtre kombinasyonuyla korunur. Yağcı, HFO filtresini sökerken yakıtın ısıtılmış (60-90°C) ve viskoz olduğunu, soğuduğunda katılaşacağını bilir.`,
            `Cat fines özellikle tehlikelidir; enjeksiyon pompası ve nozzle yüzeylerini zımpara gibi aşındırır. Bunker spesifikasyonunda Al+Si değeri ISO 8217 limitine (60 mg/kg) yakınsa, purifier ve filtre bakımı sıklaştırılır. Filtre içeriğinde parlak kum benzeri parçacık görülürse mutlaka mühendise bildirilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISO 8217 — Yakıt spesifikasyonu",
              text: `Bunker yakıtı ISO 8217 kalite limitlerine uymalıdır; özellikle cat fines (Al+Si), su, kükürt ve viskozite değerleri kritiktir. Off-spec yakıt, purifier ve filtre yükünü katlar ve makine hasarına yol açar. Bunker sample her zaman saklanır.`,
            },
          ],
        },
        {
          subheading: "3.2 Marin gazyağı (MGO/DO) ve ECA geçişi",
          paragraphs: [
            `Emisyon Kontrol Alanlarına (ECA) girişte düşük kükürtlü yakıta (MGO veya VLSFO) geçilir. MGO daha temiz ve düşük viskoziteli olduğundan filtre yükü azalır; ancak yağlama özelliği düşüktür ve pompa/enjektör için lubricity katkısı gerekebilir. Yakıt geçişi (changeover) sırasında sıcaklık şoku ve viskozite düşüşü pompa sıkışmasına yol açabilir.`,
            `Yağcı, ECA geçişinde filtre DP'sini ve yakıt sıcaklığını yakından izler; ani viskozite değişimi conta sızıntısı veya pompa kavitasyonu yaratabilir. Geçiş kademeli yapılır (saatte birkaç derece), zaman ve pozisyon ORB/yakıt değişim defterine kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yağlama Yağı (LO) Filtreleme ve Değişimi",
      sections: [
        {
          subheading: "4.1 Full-flow ve bypass filtreleme",
          paragraphs: [
            `Yağlama sisteminde full-flow filtre tüm yağ debisini filtreler; bypass (kısmi akış) filtre ise yağın küçük bir kısmını sürekli ince filtreden geçirerek temiz tutar. Auto-backwash filtreler, backflush sırasında yakaladıkları kiri sludge tarafına atar; backflush sıklığı artıyorsa yağ kontaminasyonu artmış demektir.`,
            `LO kartuş değişiminde changeover yapılır, eski kartuş incelenir. Yatak metali (ak metal/babbitt, bronz, çelik) parçacığı görülmesi erken yatak aşınması işaretidir ve OMD/yağ analiziyle çapraz doğrulanır. Yağcı bu bulguyu fotoğraflar ve mühendise iletir.`,
          ],
        },
        {
          subheading: "4.2 Sistem yağı değişimi vs. yenileme (renewal)",
          paragraphs: [
            `Büyük iki zamanlı makinelerde sistem yağı (system oil) genelde tamamen değiştirilmez; sürekli purifier ile temizlenir ve top-up ile tazelenir. Yağ özellikleri (TBN, viskozite, su) analizle izlenir; sınırların dışına çıkarsa kısmi veya tam değişim planlanır. Dört zamanlı yardımcı makinelerde ise yağ daha sık tamamen değiştirilir (PMS saatine göre).`,
            `Yağ değişimi planlanırken eski yağın boşaltılması (drain), sistemin flush'lanması, yeni yağın doğru grade ve miktarda doldurulması ve seviye doğrulaması yapılır. Boşaltılan yağ asla sintineye gitmez; atık yağ/sludge tankına aktarılır ve ORB'ye işlenir.`,
          ],
          table: {
            caption: `Tipik LO Kondisyon İzleme Parametreleri`,
            headers: ["Parametre", "Normal", "Dikkat / Aksiyon", "Anlamı"],
            rows: [
              ["Viskozite (40°C)", "±%5 nominal", ">±%20", "Yakıt sulanması / oksidasyon"],
              ["Su içeriği", "<%0.2", ">%0.5", "Soğutma kaçağı / kondens"],
              ["TBN (system oil)", "Grade'e göre", "Hızlı düşüş", "Asit nötralizasyon tükenmesi"],
              ["Metal (Fe/Cu/Pb)", "Düşük/stabil", "Ani artış", "Yatak/segman aşınması"],
              ["Insolubles", "<%1", ">%2", "Kurum / kontaminasyon birikimi"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Yağ Numune Alma (LO Sampling)",
      sections: [
        {
          subheading: "5.1 Doğru numune alma tekniği",
          paragraphs: [
            `Yağ analizi ancak doğru alınmış numune kadar güvenilirdir. Numune, makine çalışırken ve yağ sıcakken, sistemin temsil edici bir noktasından (genelde sirkülasyon hattında özel sampling cock) alınır. Önce hat birkaç saniye flush edilir (durgun yağ atılır), ardından temiz numune şişesine doldurulur.`,
            `Numune şişesi temiz, kuru ve doğru etiketli olmalıdır: gemi adı, makine, tarih, çalışma saati, yağ grade, son top-up bilgisi. Kontaminasyona açık (kirli huni, ıslak şişe) numune yanlış sonuç verir ve gereksiz alarm/maliyet yaratır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISO 4021 / ISO 3171 — Numune alma",
              text: `Temsil edici numune, akan hattan ve uygun flush sonrası alınır. Durgun/dipte birikmiş yağdan alınan numune sistemin gerçek durumunu yansıtmaz. Numune kabı ve hat temizliği sonucu doğrudan etkiler.`,
            },
          ],
        },
        {
          subheading: "5.2 Analiz sonuçlarının yorumu ve trend",
          paragraphs: [
            `Laboratuvar raporunda viskozite, su, TBN, insolubles ve aşınma metalleri raporlanır. Tek bir değerden çok trend önemlidir; örneğin demir (Fe) değerinin numuneden numuneye sürekli yükselmesi, henüz alarm vermeyen bir aşınmanın habercisidir. Yağcı, sonuçları geçmiş raporlarla karşılaştırarak değişimi yakalar.`,
            `Onboard hızlı test kitleri (su tespiti için crackle test/hot plate, TBN için titrasyon kiti, su için Karl Fischer benzeri) acil değerlendirme sağlar; laboratuvar analizi ise kesin sonuç verir. İkisi birlikte kullanılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Hava Filtreleri ve Turboşarjer Bakımı Desteği",
      sections: [
        {
          subheading: "6.1 Türboşarjer hava emiş filtresi",
          paragraphs: [
            `Türboşarjer (T/C) emiş tarafındaki hava filtresi/susturucusu (air filter silencer), kompresör kanatlarını toz ve makine dairesi kirliliğinden korur. Kirli filtre hava debisini düşürür; bu da scavenge basıncını azaltır, egzoz sıcaklıklarını yükseltir ve yakıt verimini bozar. Filtre paneli periyodik yıkanır veya değiştirilir.`,
            `Yağcı, T/C filtresinin yağ banyolu (oil-bath) veya kuru tip olduğunu bilir; yağ banyolu tipte yağ seviyesi ve temizliği kontrol edilir. Filtre temizliği sırasında kompresör girişine yabancı cisim düşmemesine azami dikkat edilir.`,
          ],
        },
        {
          subheading: "6.2 Kontrol havası ve start havası filtreleri",
          paragraphs: [
            `Kontrol havası (control air) ve start havası sistemlerinde hava kurutucu (air dryer) ve filtreler bulunur; nem ve yağ buharını tutar. Nemli kontrol havası valf ve aktüatör arızasına, start havası tüplerinde korozyona yol açar. Hava tüplerinden günlük drenaj (drain) yapılarak yoğuşma suyu boşaltılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Günlük hava drenajı",
              text: `Start hava tüplerinden ve kompresör ara soğutucularından her gün drenaj yapın. Biriken su, hem korozyon hem de start sırasında hava-yakıt karışımıyla tehlikeli birikim yaratır. Basit bir drain valfi çevirmek büyük arızaları önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Purifier (Separatör) Operasyonuna Destek",
      sections: [
        {
          subheading: "7.1 Separatörün filtreleme zincirindeki yeri",
          paragraphs: [
            `Purifier (santrifüj separatör), filtreden önce gelen ana temizleme kademesidir; merkezkaç kuvvetiyle yakıt/yağdan su ve katı partikülleri ayırır. Filtreler purifier'ın kaçırdığı kalan kiri yakalar. Purifier verimi düşerse filtre yükü artar ve DP hızlı yükselir; bu yüzden ikisi birlikte değerlendirilir.`,
            `Yağcı, purifier'ın desludging (çamur atma) zamanlamasını, besleme sıcaklığını (HFO için ~98°C), gravity disc (dam ring) seçimini ve operating water sistemini izler. Detaylı separatör bakımı ayrı bir görevdir; burada Yağcı operasyonel destek ve günlük izleme yapar.`,
          ],
        },
        {
          subheading: "7.2 Su seal ve discharge gözlemi",
          paragraphs: [
            `Separatörde water seal (su contası) doğru kurulmamışsa yakıt/yağ overboard tarafına kaçar (oil loss) veya su yakıt tarafına geçer. Yağcı, sludge discharge'ın doğru renkte (koyu çamur) olduğunu, temiz yakıt/yağ kaybı olmadığını gözlemler ve sapmayı mühendise raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sludge, Atık Yağ ve MARPOL Yönetimi",
      sections: [
        {
          subheading: "8.1 Sludge ve atık yağ akışları",
          paragraphs: [
            `Filtre temizliği, purifier desludging, drip tray boşaltma ve yağ değişiminden çıkan atıklar sludge/atık yağ tankında toplanır. Bu akışkanlar MARPOL Annex I kapsamında "oily residue (sludge)" olarak sınıflanır ve denize atılamaz; sahil tesisine teslim (shore disposal) veya gemi insineratöründe yakılarak (incineration) bertaraf edilir.`,
            `Yağcı, her transfer ve bertaraf işlemini Oil Record Book Part I'e doğru kodlarla işlenmesi için mühendise raporlar; tank seviyeleri, transfer miktarları ve operasyon zamanları kayıt altına alınır. ORB tutarsızlıkları PSC'de en sık çıkan ve gemiyi tutturan bulgulardandır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — Oil Record Book",
              text: `Makine dairesi yağlı atık operasyonları (sludge transfer, incineration, shore disposal, bilge işlemleri) ORB Part I'e zamanında ve doğru kodlarla kaydedilmelidir. "Magic pipe" (yasadışı by-pass) ile yağlı su deşarjı ağır cezalar ve hapis getirir.`,
            },
          ],
        },
        {
          subheading: "8.2 Eski filtre ve kartuş bertarafı",
          paragraphs: [
            `Kullanılmış yağ/yakıt filtre kartuşları yağ emdirilmiş atıktır; gelişigüzel çöpe atılamaz. Yağı süzdürülür (sludge tankına), kartuş uygun şekilde paketlenir ve garbage/oily rag yönetimi kapsamında sahile teslim edilir. Yağlı bez (oily rag) ve eldivenler de kapalı metal kapta saklanır — kendiliğinden tutuşma (spontaneous combustion) riski vardır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yağlı bez yangını",
              text: `Yağa doymuş bez ve emici malzemeler, oksidasyon ısısıyla kendiliğinden tutuşabilir. Bunları açıkta veya plastik torbada biriktirmeyin; kapaklı metal "oily rag bin" kullanın ve düzenli boşaltın. Makine dairesi yangınlarının sessiz bir başlangıç noktasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sık Yapılan Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Tipik hatalar",
          paragraphs: [
            `En yaygın hata, changeover sırasında yeni kolu vent etmeden devreye almaktır; hava cebi yağ/yakıt basıncını düşürür ve makineyi riske atar. İkinci yaygın hata, O-ring/conta yenilenmeden kapak kapatmaktır; bu, sıcak yağ sızıntısı ve yangın riski yaratır. Üçüncüsü, yanlış grade yağ/yanlış mesh filtre kullanmaktır.`,
            `Numune alırken hattı flush etmemek, kirli şişe kullanmak veya etiketi yanlış doldurmak analiz sonucunu bozar ve yanlış kararlara yol açar. Boşaltılan yağı yanlışlıkla sintineye karıştırmak ise doğrudan MARPOL ihlalidir.`,
          ],
        },
        {
          subheading: "9.2 Vaka — Gözden kaçan cat fines",
          paragraphs: [
            `Bir gemide bunker sonrası purifier verimi düşmüş, Yağcı LO/FO filtre içeriğinde parlak kum benzeri parçacık fark etmiş ve mühendise bildirmiştir. Yapılan yakıt analizinde Al+Si değerinin yüksek olduğu (cat fines) görülmüş; purifier bakımı sıklaştırılmış, filtre changeover aralığı kısaltılmış ve enjeksiyon ekipmanı erken aşınmadan korunmuştur. Tespit edilmeseydi nozzle ve pompa erozyonu kaçınılmazdı.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Filtre içeriği bir teşhis aracıdır",
              text: `Çıkarılan her filtrenin içeriğine bakın: metal talaşı yatak aşınmasını, kum benzeri parçacık cat fines'i, su emülsiyonu soğutma kaçağını, jelimsi madde yakıt uyumsuzluğunu (incompatibility) işaret eder. Filtre, makinenin sağlık raporudur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın filtre ve yağ checklist'i",
          bullets: [
            `Tüm ana filtrelerin DP değeri okundu ve trend karşılaştırıldı mı?`,
            `Changeover doğru sırayla (vent → çevir → izole → drain) yapıldı mı?`,
            `Çıkarılan filtre/kartuş içeriği gözlemlendi ve raporlandı mı?`,
            `Yeni kartuş + sağlam O-ring takıldı, sızdırmazlık kontrol edildi mi?`,
            `LO numunesi doğru teknikle alındı ve doğru etiketlendi mi?`,
            `Yağ seviyeleri kontrol edildi, top-up doğru grade ile yapıldı mı?`,
            `Hava emiş ve kontrol havası filtreleri/drenajları kontrol edildi mi?`,
            `Boşaltılan yağ/sludge atık tankına gitti, sintineye karışmadı mı?`,
            `Eski kartuş ve yağlı bez güvenli (metal kap) saklandı mı?`,
            `Tüm işlemler mühendise raporlandı ve ORB/PMS kaydı için iletildi mi?`,
          ],
          paragraphs: [
            `Filtre ve yağ işleri tekrarlayan ama asla rutine bırakılmaması gereken görevlerdir. Disiplinli changeover, doğru numune alma, dikkatli içerik gözlemi ve titiz atık yönetimi; hem makineyi hem de çevreyi korur. İyi bir Yağcı, bir filtreyi sadece değiştiren değil, içinden ne çıktığını okuyup makinenin sağlığını teşhis eden kişidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
