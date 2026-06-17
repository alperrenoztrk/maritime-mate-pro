import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bunker, transfer ve sintine operasyonlarına saha desteği",
  roleSlug: "yagci-fitter",
  taskIndex: 7,
  estimatedPages: 26,
  intro: `Yakıt alımı (bunker), tankerlar arası/iç transfer ve sintine (bilge) operasyonları, makine dairesinin hem operasyonel hem de çevresel açıdan en hassas işleridir; küçük bir hata büyük bir kirlilik, ceza veya yangına dönüşebilir. Yağcı/Fitter; bunker sırasında manifold ve tank gözcülüğü, numune (sample) alımına yardım, scupper (güverte tahliye deliği) kontrolü, drip tray boşaltma ve SOPEP malzeme hazırlığını; FO/DO transferinde tank seviye gözlemi ve valf operasyonunu; bilge transfer ve sludge işlemlerinde OWS (Oily Water Separator) başında bekleme, by-pass alarm dinleme ve ORB kaydına gözlem desteğini yürütür. Bu bölüm bu üç operasyonu MARPOL ekseninde adım adım açıklar.`,
  sources: [
    "MARPOL Annex I — Oil pollution prevention, Oil Record Book Part I",
    "MARPOL Annex VI — Bunker Delivery Note (BDN) ve sample saklama",
    "MARPOL Annex I Reg. 14 — 15 ppm bilge separator ve OCM/OMD",
    "SOPEP — Shipboard Oil Pollution Emergency Plan",
    "ISGOTT (bunker/transfer güvenlik prensipleri)",
    "ISO 8217 — Marine fuel specifications",
    "ICS Engine-Room Procedures Guide / Bunkering checklist",
    "Company SMS — Bunkering, transfer ve bilge operations procedures",
  ],
  chapters: [
    {
      heading: "1. Operasyonların MARPOL Çerçevesi",
      lead: `Yakıt ve yağlı suyla yapılan her işlem, MARPOL'ün gözü altındadır. Denize bir damla yağ bile gitmemesi temel kuraldır; kayıtlar ise bu disiplinin kanıtıdır.`,
      sections: [
        {
          subheading: "1.1 Kirlilik riski ve sıfır tolerans",
          paragraphs: [
            `Bunker, transfer ve bilge operasyonları yağlı sıvılarla yapıldığından deniz kirliliği riskinin en yüksek olduğu işlerdir. MARPOL Annex I, makine dairesi kaynaklı yağ kirliliğini sıkı kurallarla yasaklar; denize verilebilecek bilge suyunun yağ içeriği 15 ppm'i (parts per million) geçemez ve bu ancak onaylı separator + 15 ppm alarmıyla yapılır.`,
            `Yağcı, bu operasyonlarda "sıfır kirlilik" hedefiyle çalışır: her flanş, her hortum, her valf bir kaçak noktasıdır. Drip tray, scupper tıkaçları ve SOPEP malzemesi önceden hazırlanır. Küçük bir taşma (overflow) veya sızıntı bile derhal raporlanır ve toplanır; gizlenmez.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — 15 ppm sınırı",
              text: `Makine dairesi bilge suyu, ancak onaylı oily water separator ve 15 ppm monitör/alarm kullanılarak ve özel alan dışında, yola devam ederken denize verilebilir. 15 ppm aşıldığında deşarj otomatik durur. "Magic pipe" ile yasadışı deşarj ağır para ve hapis cezası getirir.`,
            },
          ],
        },
        {
          subheading: "1.2 Oil Record Book ve kayıt disiplini",
          paragraphs: [
            `Tüm yağ ile ilgili işlemler (bunker alımı, iç transfer, bilge deşarjı, sludge bertarafı, incineration) Oil Record Book (ORB) Part I'e standart kodlarla, zamanında ve doğru kaydedilir. ORB, PSC ve flag state denetiminde en sık incelenen belgedir; tank seviyeleri, miktarlar ve zamanlar tutarlı olmalıdır.`,
            `Yağcı, kayıtları bizzat tutmasa da operasyon verilerini (başlangıç/bitiş zamanı, alınan miktar, tank seviyeleri, alarm olayları) doğru gözlemleyip mühendise iletir; bu veriler ORB'ye işlenir. Yanlış veya sonradan toplu doldurulan ORB, sahtecilik sayılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Bunker Operasyonu: Hazırlık",
      sections: [
        {
          subheading: "2.1 Pre-bunker hazırlık ve checklist",
          paragraphs: [
            `Bunker öncesi kapsamlı hazırlık yapılır: bunker planı (hangi tanka ne kadar, sıralama), tank seviyeleri ve boş kapasite (ullage) doğrulaması, hava firar (vent) borularının açıklığı, manifold bağlantı kontrolü, scupper'ların tıkanması, drip tray'lerin yerleştirilmesi ve SOPEP malzemesinin hazır bulundurulması. Ship-Shore (veya ship-barge) Safety Checklist doldurulur ve haberleşme/acil durdurma (emergency stop) sinyali kararlaştırılır.`,
            `Yağcı, scupper tıkaçlarının (deck scupper plugs) takılı olduğunu doğrular; olası bir güverte dökülmesinin denize gitmesini bu tıkaçlar önler. Manifold çevresine drip tray konur, absorban malzeme ve kürek/bez hazırlanır. Bunker sigara/açık alev yasağı ve "B flag" (bravo) çekilir.`,
          ],
          bullets: [
            `Bunker planı ve tank ullage/boş kapasite doğrula`,
            `Vent borularını ve overflow alarmını kontrol et`,
            `Scupper'ları tıka (deck scupper plugs)`,
            `Manifolda drip tray + absorban + SOPEP malzeme koy`,
            `Ship-Shore Safety Checklist ve emergency stop sinyali`,
            `Manifold flanş bağlantısı sağlam, doğru reducer/conta`,
          ],
        },
        {
          subheading: "2.2 SOPEP ve dökülme hazırlığı",
          paragraphs: [
            `SOPEP (Shipboard Oil Pollution Emergency Plan) lokeri; absorban ped/yastık, kürek, bez, plastik torba, dağıtıcı (uygunsa) ve uyarı malzemesi içerir. Bunker öncesi bu malzeme manifold yakınına taşınır. Dökülme olursa plan derhal devreye sokulur: kaynağı durdur, yayılmayı sınırla, topla ve raporla (kaptan, terminal, liman otoritesi).`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOPEP — Dökülme müdahalesi",
              text: `Her gemi onaylı bir SOPEP taşır ve dökülme malzemesi hazır bulundurur. Denize en küçük yağ dökülmesinde bile plan devreye sokulur ve liman/kıyı devleti derhal bilgilendirilir. Geç veya gizlenmiş bildirim cezayı katlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bunker Operasyonu: İcra ve Gözcülük",
      sections: [
        {
          subheading: "3.1 Manifold ve tank gözcülüğü",
          paragraphs: [
            `Bunker başlarken düşük debiyle (slow rate) başlanır; bağlantıların sızdırmazlığı ve doğru tanka akış doğrulandıktan sonra debi artırılır. Yağcı, manifold başında durarak flanş, hortum ve valf bağlantılarını sürekli gözler; en ufak terleme/sızıntıda haber verir. Ayrı bir kişi tank seviyelerini (sounding/ullage veya seviye göstergesi) izler.`,
            `Tank dolmaya yaklaştığında "topping off" aşamasında debi düşürülür; overflow (taşma) riski en yüksek bu andadır. Hava firar borularından yakıt püskürmesi taşma işaretidir ve derhal durdurma gerektirir. Tank %90-95 (üretici/şirket limiti) dolunca durulur ve sıradaki tanka geçilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Topping off — taşmanın en kritik anı",
              text: `Tank dolmaya yaklaşırken debi mutlaka düşürülür ve seviye yakından izlenir. Vent'ten yakıt fışkırması = taşma. Bu anda gecikme, güverteye ve denize yakıt dökülmesi demektir. Emergency stop sinyali ezbere bilinmeli, tereddütsüz verilmelidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Numune (sample) alımına yardım",
          paragraphs: [
            `Bunker sırasında, MARPOL Annex VI ve şirket prosedürü gereği temsil edici yakıt numunesi (genelde manifoldda continuous drip sampler ile) alınır. Bu mühürlü numune (MARPOL sample) saklanır ve gerekirse uyuşmazlıkta laboratuvar analizine gönderilir. Bunker Delivery Note (BDN) ile birlikte kayıt altına alınır.`,
            `Yağcı, numune şişelerinin temiz olmasına, doğru etiketlenmesine ve mühürlenmesine yardım eder. Numune, yakıt kalitesinin (ISO 8217 uyumu, kükürt içeriği) ve teslim edilen miktarın kanıtıdır; off-spec yakıt iddiasında bu numune belirleyicidir.`,
          ],
          table: {
            caption: `Bunker Sırasında İzlenen Kritik Noktalar`,
            headers: ["Nokta", "Ne İzlenir", "Tepki"],
            rows: [
              ["Manifold flanş", "Sızıntı, terleme", "Debi düşür/durdur, raporla"],
              ["Tank seviyesi", "Dolum hızı, ullage", "Topping off'ta debi düşür"],
              ["Vent borusu", "Yakıt püskürmesi", "Taşma — derhal durdur"],
              ["Scupper / güverte", "Birikme, dökülme", "Topla, SOPEP, raporla"],
              ["Sample / BDN", "Numune + belge", "Mühürle, sakla, kaydet"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. FO/DO İç Transfer Operasyonları",
      sections: [
        {
          subheading: "4.1 Tank-içi transfer ve valf operasyonu",
          paragraphs: [
            `İç transfer; storage tanktan settling tanka, settling'ten service tanka veya tanklar arası yakıt aktarımıdır. Yağcı, mühendis talimatıyla doğru valfleri açar/kapatır (line-up), transfer pompasını çalıştırır ve hem boşalan hem dolan tankın seviyesini gözler. Yanlış valf hattı (line-up hatası) yanlış tanka transfer veya overflow yaratabilir.`,
            `Transfer boyunca tank seviyeleri sürekli izlenir; hedef seviyeye yaklaşıldığında transfer durdurulur. Settling ve service tanklar genelde yüksek/düşük seviye alarmlıdır; alarm çaldığında müdahale edilir. Boşalan tankın tamamen boşalıp pompanın boşa çalışması (hava emmesi) önlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Valf hattını (line-up) iki kez kontrol et",
              text: `Transfer öncesi açtığın ve kapattığın valfleri, hattı izleyerek iki kez doğrula. Tek bir kapalı kalmış basma valfi pompayı zorlar; tek bir açık kalmış valf yanlış tanka veya overflow'a yol açar. "Açtım sanıyordum" en sık transfer hatasıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Yakıt ayrımı ve uyumluluk",
          paragraphs: [
            `Farklı bunker partileri (özellikle farklı tedarikçi/farklı tip) karıştırıldığında uyumsuzluk (incompatibility) çamur çökelmesine ve purifier/filtre tıkanmasına yol açabilir. Mümkünse partiler ayrı tanklarda tutulur; karıştırma zorunluysa uyumluluk testi yapılır. ECA bölgesi için düşük kükürtlü yakıt ayrı service tankta hazır tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "5. Sintine (Bilge) Operasyonları ve OWS",
      sections: [
        {
          subheading: "5.1 Oily Water Separator (OWS) operasyonu",
          paragraphs: [
            `Makine dairesinde biriken yağlı sintine suyu, doğrudan denize verilemez; önce Oily Water Separator (OWS / 15 ppm bilge separator) ile işlenir. OWS, suyu yağdan ayırır ve çıkan suyun yağ içeriğini Oil Content Monitor (OCM / 15 ppm alarm) sürekli ölçer. 15 ppm aşılırsa üç-yollu valf otomatik olarak deşarjı bilge tankına geri yönlendirir (denize değil).`,
            `Yağcı, OWS başında bekleyerek operasyonu izler: separator'ın doğru çalıştığını, 15 ppm alarmının aktif ve by-pass edilmediğini, üç-yollu valfin doğru konumda olduğunu doğrular. Ayrılan yağ sludge/atık yağ tankına gider. Operasyon yalnızca izin verilen koşullarda (özel alan dışı, yolda) yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "15 ppm alarmı ve üç-yollu valf by-pass edilmez",
              text: `OWS'in 15 ppm monitörünü veya üç-yollu valfini by-pass etmek (örneğin temiz suyla kandırmak veya valfi manuel kilitlemek) ciddi bir suçtur. Bu "magic pipe" düzeneği, tespit edildiğinde gemiye ve kişilere büyük para ve hapis cezası getirir. Sistem her zaman olması gerektiği gibi çalışmalıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Bilge transfer ve sludge yönetimi",
          paragraphs: [
            `Sintine kuyuları, holding/bilge tankına transfer edilir; buradan OWS ile işlenir veya sahil tesisine teslim edilir. Sludge (purifier çamuru, atık yağ) ayrı tankta toplanır ve incinerator'da yakılır ya da shore reception facility'ye verilir. Her transfer ORB'ye işlenir; tank seviyeleri tutarlı olmalıdır.`,
            `Yağcı, bilge ve sludge seviyelerini izler, tanklar dolmadan mühendise haber verir ve OWS/incinerator operasyonuna saha desteği verir. Bilge suyuna yağ dışı atık (deterjan, kimyasal) karışması OWS verimini bozar; bu yüzden kimyasalların sintineye dökülmesi önlenir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Scupper, Drip Tray ve Dökülme Önleme",
      sections: [
        {
          subheading: "6.1 Scupper tıkaçları ve güverte savunması",
          paragraphs: [
            `Güverte tahliye delikleri (scupper), normalde yağmur/deniz suyunu denize atar; ama bunker/transfer sırasında olası bir dökülmenin denize gitmesini önlemek için tıkanır (scupper plug). Tıkaçlar operasyon boyunca takılı kalır ve biriken sıvı izlenir; yağmur biriktiğinde temiz su kontrollü boşaltılır.`,
            `Drip tray (damlama tepsisi), manifold ve bağlantı noktalarının altına yerleştirilerek küçük sızıntıları yakalar. Yağcı, drip tray'leri düzenli kontrol eder ve içeriğini sludge/atık tankına boşaltır (asla denize/sintineye değil).`,
          ],
        },
        {
          subheading: "6.2 Dökülme anında müdahale",
          paragraphs: [
            `Güverteye dökülme olursa: önce kaynağı durdur (emergency stop), sonra yayılmayı sınırla (absorban set, scupper'ların tıkalı olduğunu doğrula), topla ve raporla. Denize ulaşan en küçük yağ bile SOPEP devreye sokularak ve liman otoritesi bilgilendirilerek yönetilir. Panik değil prosedür esastır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Tıkalı scupper denizi kurtardı",
              text: `Bir bunker operasyonunda topping off sırasında küçük bir overflow güverteye yakıt taşırmış; ancak scupper'lar önceden tıkalı olduğu için yakıt denize gitmemiş, güvertede toplanıp SOPEP malzemesiyle temizlenmiştir. Olay raporlanmış, kirlilik önlenmiştir. Basit bir tıkacın takılı olması, büyük bir cezayı ve çevre felaketini önlemiştir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Güvenlik: Yangın, Gaz ve Statik Elektrik",
      sections: [
        {
          subheading: "7.1 Yangın ve gaz riski",
          paragraphs: [
            `Yakıt operasyonlarında yanıcı buhar birikebilir; özellikle hafif distilatlarda (MGO/DO) parlama noktası düşüktür. Bunker boyunca açık alev/sigara yasağı uygulanır, sıcak çalışma yapılmaz, havalandırma sağlanır. Manifold çevresinde uygun yangın söndürücü hazır bulundurulur.`,
            `Yağcı, yakıt buharı kokusu veya gaz alarmı durumunda derhal haber verir. Pompa odası ve kapalı transfer alanlarında gaz birikimi tehlikelidir; bu alanlara giriş gaz testi ve havalandırma gerektirir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISGOTT — Bunker/transfer güvenliği",
              text: `Yakıt transfer operasyonlarında güvenli iletişim, emergency stop prosedürü, statik elektrik kontrolü, sızdırmazlık ve yangın hazırlığı esastır. Ship-Shore Safety Checklist her operasyonda doldurulur ve teyit edilir.`,
            },
          ],
        },
        {
          subheading: "7.2 Statik elektrik ve topraklama",
          paragraphs: [
            `Akan yakıt statik elektrik üretir; uygun yapılmazsa kıvılcım ve tutuşma riski doğar. Hortum bağlantılarında izolasyon flanşı/bonding pratiği şirket prosedürüne göre uygulanır, başlangıçta düşük debi statik birikimi azaltır. Yağcı, bu önlemlerin uygulandığını gözler.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt, Belgeler ve Denetim",
      sections: [
        {
          subheading: "8.1 BDN, ORB ve tutarlılık",
          paragraphs: [
            `Bunker Delivery Note (BDN), alınan yakıtın miktarını, tipini ve kükürt içeriğini belgeler; MARPOL Annex VI gereği saklanır. ORB Part I ise tüm yağ işlemlerini kaydeder. Tank seviyeleri, alınan/transfer edilen miktarlar ve deşarj kayıtları birbiriyle tutarlı olmalıdır; denetimde çelişki "şüpheli kayıt" olarak değerlendirilir.`,
            `Yağcı, gözlemlediği operasyon verilerini doğru raporlayarak kayıtların gerçeği yansıtmasını sağlar. Sahte/tutarsız kayıt, en ağır PSC bulgularından biridir ve gemiyi tutturabilir.`,
          ],
        },
        {
          subheading: "8.2 OWS kayıtları ve denetim hazırlığı",
          paragraphs: [
            `OWS deşarjları, 15 ppm alarm olayları ve OCM kalibrasyon kayıtları tutulur; PSC bu sistemi sıkı denetler. OWS'in çalışırlığı, alarmın aktifliği, üç-yollu valfin doğru fonksiyonu ve sızdırmazlık kontrol edilir. By-pass izi (gizli hortum/flanş) aranan başlıca bulgudur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Magic pipe — ağır yaptırım",
              text: `OWS'i veya 15 ppm sistemini atlayan herhangi bir düzenek (magic pipe) tespit edildiğinde milyonlarca dolarlık ceza, geminin tutulması ve sorumlu kişilere hapis cezası gündeme gelir. ABD'de USCG bu konuda son derece serttir. Doğru çalışan sistem, hem çevreyi hem mürettebatı korur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve İyi Uygulamalar",
      sections: [
        {
          subheading: "9.1 Sık yapılan hatalar",
          paragraphs: [
            `En yaygın hatalar: scupper'ı tıkamayı unutmak, topping off'ta debiyi geç düşürmek, valf hattını yanlış kurmak (yanlış tanka/overflow), drip tray'i geç boşaltmak ve OWS alarmını "arıza" sanıp by-pass etmek. Bir de küçük dökülmeyi raporlamayıp gizlemeye çalışmak — bu, küçük bir olayı büyük bir suça çevirir.`,
            `İletişim kopukluğu da tehlikelidir; manifold ile kontrol odası/terminal arasında net ve sürekli iletişim olmadan emergency stop gecikir. Yağcı, iletişim cihazını (UHF) yanında bulundurur ve sinyalleri ezbere bilir.`,
          ],
        },
        {
          subheading: "9.2 İyi uygulama prensipleri",
          paragraphs: [
            `İyi bir operasyon: kapsamlı hazırlık (checklist, scupper, drip tray, SOPEP), düşük debiyle başlama, sürekli gözcülük, topping off'ta dikkat, dürüst kayıt ve her sapmanın anında raporlanmasıdır. "Acele etme, gözünü ayırma, gizleme" üç temel ilkedir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gözünü manifolddan ayırma",
              text: `Bunker/transfer sırasında gözcünün dikkati hayati önemdedir. Telefonla oyalanmak, başka işe dalmak veya postunu terk etmek, taşma/sızıntının fark edilmeden büyümesine yol açar. Operasyon bitene kadar gözcü görevde ve uyanıktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın bunker/transfer/bilge checklist'i",
          bullets: [
            `Bunker planı, tank ullage ve overflow alarmları kontrol edildi mi?`,
            `Scupper'lar tıkalı, drip tray ve SOPEP malzeme hazır mı?`,
            `Ship-Shore Safety Checklist ve emergency stop sinyali kararlaştırıldı mı?`,
            `Düşük debiyle başlandı, bağlantı sızdırmazlığı doğrulandı mı?`,
            `Topping off'ta debi düşürüldü, seviye yakından izlendi mi?`,
            `MARPOL sample alındı, mühürlendi ve BDN ile kaydedildi mi?`,
            `Transfer valf hattı (line-up) iki kez doğrulandı mı?`,
            `OWS çalışıyor, 15 ppm alarm aktif, üç-yollu valf doğru mu?`,
            `Drip tray içeriği sludge tankına boşaltıldı (denize/sintineye değil) mi?`,
            `Tüm işlemler doğru gözlemlenip ORB kaydı için mühendise iletildi mi?`,
          ],
          paragraphs: [
            `Bunker, transfer ve sintine operasyonları, dikkatin bir an bile gevşemediği işlerdir. Doğru hazırlık, sürekli gözcülük, dürüst kayıt ve "sıfır kirlilik" disiplini; hem gemiyi büyük cezalardan hem de denizi kirlilikten korur. İyi bir Yağcı, scupper tıkacını unutmayan, topping off'ta gözünü manifolddan ayırmayan ve hiçbir alarmı by-pass etmeyen kişidir. Burada saklamak yoktur; sadece doğru yapmak ve doğru kaydetmek vardır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
