import type { TopicDetailContent } from "@/data/navigationTopicContents";

// Bulut görselleri — Bulut Atlası (DetailedMeteorology) ile aynı asset seti
import cirrusImage from "@/assets/clouds/cirrus.jpg";
import cirrocumulusImage from "@/assets/clouds/cirrocumulus.jpg";
import cirrostratusImage from "@/assets/clouds/cirrostratus.jpg";
import altocumulusImage from "@/assets/clouds/altocumulus.jpg";
import altostratusImage from "@/assets/clouds/altostratus.jpg";
import nimbostratusImage from "@/assets/clouds/nimbostratus.jpg";
import stratusImage from "@/assets/clouds/stratus.jpg";
import stratocumulusImage from "@/assets/clouds/stratocumulus.jpg";
import fractusImage from "@/assets/clouds/fractus.jpg";
import cumulusImage from "@/assets/clouds/cumulus.jpg";
import cumulonimbusImage from "@/assets/clouds/cumulonimbus.jpg";
import mammatusImage from "@/assets/clouds/mammatus.jpg";
import arcusImage from "@/assets/clouds/arcus.jpg";
import tubaImage from "@/assets/clouds/tuba.jpg";
import lenticularisImage from "@/assets/clouds/lenticularis.jpg";
import virgaImage from "@/assets/clouds/virga.jpg";

export const meteorologyTopicContents: Record<string, TopicDetailContent> = {
  "Basınç merkezleri (alçak/yüksek)": {
    title: "Basınç Merkezleri (Alçak / Yüksek)",
    introduction:
      "Atmosferdeki hava hareketlerinin temel itici gücü basınç farklılıklarıdır. Alçak ve yüksek basınç merkezleri, rüzgâr rejimlerini, bulut oluşumunu, yağışı ve nihayetinde deniz durumunu doğrudan belirler. Bir seyir zabiti için basınç merkezlerini tanımak ve hareket yönlerini takip etmek, emniyetli rota planlamasının ön koşuludur.",
    sections: [
      {
        title: "Alçak Basınç Merkezleri (Siklon / Depresyon)",
        content:
          "Alçak basınç merkezi (siklon/depresyon), çevresindeki havadan daha düşük basınçlı bir bölgedir. **Mekanizma:** Yüzeyde hava merkeze doğru yakınsar (convergence) ve yükselmek zorunda kalır; yükselen hava adyabatik olarak soğur, içindeki su buharı yoğuşarak bulut ve yağış üretir. Bu yüzden alçak basınç; bulutlu, yağışlı, rüzgârlı 'kötü hava' ile özdeştir.\n\n**Dönüş yönü ve Coriolis:** Merkeze akmak isteyen havayı Coriolis kuvveti saptırır; denge kurulduğunda rüzgâr izobarlara neredeyse paralel eser. Kuzey yarımkürede alçak çevresinde dönüş **saat yönünün tersine (siklonik)**, güney yarımkürede saat yönündedir. Pratik karşılığı **Buys Ballot kuralıdır**: kuzey yarımkürede rüzgârı sırtınıza aldığınızda alçak basınç merkezi **solunuzdadır** (güney yarımkürede sağınızda).\n\n**Şiddet göstergesi — barometre:** Alçağın yaklaşması barometrede düzenli düşüşle görünür ve düşüş hızı şiddetin habercisidir: 3 saatte 3-5 hPa kayda değer, **saatte ≥ 1-2 hPa** düşüş hızla derinleşen tehlikeli bir sistem demektir. Derin bir alçak (ör. merkez < 980 hPa) geniş alanda fırtına rüzgârı, yüksek dalga ve kötü görüş üretir.\n\n**Gemide önemi:** Alçağın tahmini rotası, hızı ve derinliği rota planının stratejik girdisidir; geminin, sistemin seyredilemez (tehlikeli) yarımdairesine girmemesi için erken sapma kararı bu verilere dayanır (bkz. Tehlikeli/seyir yapılabilir yarım daire).",
      },
      {
        title: "Yüksek Basınç Merkezleri (Antisiklon)",
        content:
          "Yüksek basınç merkezi (antisiklon), çevre basınçtan daha yüksek bir bölgedir. **Mekanizma:** Üstten çöken (subsidence) hava yüzeye inerken adyabatik olarak **ısınır**, nispi nemi düşer ve bulutlar çözülür — bu yüzden yüksek basınç genelde açık, sakin havayla özdeştir. Merkeze yakın rüzgâr zayıftır.\n\n**Dönüş yönü:** Kuzey yarımkürede yüksek çevresinde rüzgâr **saat yönünde (antisiklonik)**, güneyde tersidir. Yüksek basınç sistemleri genelde yavaş hareket eder ya da yarı-kalıcı konumlarda oturur: **Azor, Sibirya, Pasifik Yükseği** gibi; bunlar mevsimsel rüzgâr ve rota rejimlerini (ör. muson) belirler.\n\n**Yanıltıcı yönleri:** 'Yüksek basınç = sakin deniz' her zaman doğru değildir. (1) Sistemin **kenarlarında** izobarlar sıkışabilir ve güçlü rüzgâr üretir. (2) Çöken hava bir **subsidans inversiyonu** oluşturur; bu sıcak-üstte/soğuk-altta tabaka, nemi ve kirliliği altta hapsederek **radyasyon sisi, pus ve düşük görüş** riski doğurur — özellikle gece/sabah ve karaya yakın sularda.\n\n**Gemide önemi:** Yüksek basınç egemenliği güverte operasyonları için elverişli bir hava 'penceresi' sunar; ancak sabah sisi ihtimali ve sistem kenarındaki gradyan, brifingde ayrıca değerlendirilir.",
      },
      {
        title: "Barometre Trend Analizi ve Operasyonel Karar",
        content:
          "Köprüüstünde basınç merkezlerini izlemenin temel aracı **barometre** (ve barografın çizdiği trend eğrisidir). Tek bir anlık değer az şey söyler; asıl bilgi **3 saatlik eğilimdedir (pressure tendency)** — hem yön (yükseliyor/düşüyor/duruyor) hem de biçim (düzenli, hızlanan, dalgalı).\n\n**Eşikler (pratik):**\n- 3 saatte **< 2 hPa** değişim: normal, günlük dalgalanma.\n- 3 saatte **2-4 hPa düşüş**: dikkat, bir sistem yaklaşıyor.\n- 3 saatte **> 5 hPa** (veya saatte ≥ 1-2 hPa) düşüş: hızlı derinleşen alçak/cephe; acil önlem.\n\n**Worked örnek:** 06:00'da 1012 hPa, 09:00'da 1006 hPa okundu → 3 saatte 6 hPa düşüş (2 hPa/saat). Bu hızlı bir derinleşmedir: güverte işleri durdurulur, bağlamalar kontrol edilir, alçağın yeri Buys Ballot ile kestirilip kaçınma rotası değerlendirilir.\n\n**Rutin:** Barometre trendi vardiya devir-tesliminde sözlü + yazılı aktarılır ve synoptik haritadaki merkez konumu/hız/yönüyle birlikte okunur. Not: Okumalar daima **deniz seviyesine indirgenmiş (MSLP)** ve alet düzeltmesi yapılmış olmalıdır; yoksa trend yanıltır.",
      },
    ],
    keyPoints: [
      "Alçak basınç: yükselen hava, bulut, yağış, kuvvetli rüzgâr riski.",
      "Yüksek basınç: inen hava, genelde açık hava ancak kenar gradyanları güçlü olabilir.",
      "Barometre trendi, anlık değerden daha önemli bir operasyonel göstergedir.",
      "Basınç merkezinin hareket yönü ve hızı, rota planlamasında stratejik bilgidir.",
    ],
  },

  "İzobar yapısı ve gradyan": {
    title: "İzobar Yapısı ve Basınç Gradyanı",
    introduction:
      "İzobarlar, synoptik haritalar üzerinde eş basınç noktalarını birleştiren eğrilerdir ve atmosferik akışın görsel haritasını oluşturur. İzobarların birbirine yakınlığı veya uzaklığı, rüzgâr hızının en temel göstergesidir. Bir denizci için izobar analizini hızlı ve doğru yapabilmek, köprüüstünde proaktif hava değerlendirmesi yapmanın ön koşuludur.",
    sections: [
      {
        title: "İzobar Kavramı ve Çizim Mantığı",
        content:
          "İzobarlar, deniz seviyesine indirgenmiş **eş-basınç** noktalarını birleştiren eğrilerdir ve genellikle **4 hPa aralıklarla** çizilir (1000, 1004, 1008, 1012...). Bir izobar üzerindeki tüm noktalar aynı MSLP değerine sahiptir; bu yüzden izobar haritası, arazi haritasındaki 'yükselti eğrileri' gibi okunur.\n\n**Şekilden çıkarım:** İzobarlar kapalı eğri oluşturduğunda bir **basınç merkezi** tanımlanır; en içteki kapalı eğri merkezin şiddetini verir. Düz ve paralel izobar bölgelerinde rüzgâr yönü/hızı nispeten homojendir; eğrilme, kıvrılma (oluk/**trough** veya sırt/**ridge**) ya da sıkışma olan yerlerde koşullar hızla değişir.\n\n**Kritik okuma — aralık = rüzgâr:** İzobar aralığının **darlığı** doğrudan rüzgâr şiddetini verir; sık izobar = güçlü gradyan = kuvvetli rüzgâr. Bu, bir sonraki bölümdeki gradyan-rüzgâr ilişkisinin görsel özüdür.\n\n**Gemide önemi:** Rota sık-izobarlı bir bölgeden geçiyorsa o sektöre tahmini varış zamanı hesaplanıp önceden hız/rota kararı verilir; izobar haritası bu yüzden yalnız 'bilgi' değil, bir planlama aracıdır.",
      },
      {
        title: "Basınç Gradyanı ve Rüzgâr İlişkisi",
        content:
          "Basınç gradyanı, birim mesafe başına basınç değişimidir (ör. hPa / 100 NM) ve rüzgârı 'iten' temel kuvvettir. Synoptik haritada iki izobar arası mesafe ne kadar kısaysa gradyan o kadar büyük, rüzgâr o kadar hızlıdır.\n\n**Geostrofik denge:** Serbest atmosferde rüzgâr, basınç gradyan kuvveti (PGF) ile Coriolis kuvvetinin dengesinden doğar ve izobarlara paralel eser (**geostrofik rüzgâr**). Coriolis enlemle arttığından, aynı gradyan düşük enlemde daha yüksek rüzgâr verir; ekvatora yakın enlemlerde geostrofik yaklaşım zayıflar (Coriolis → 0).\n\n**Yüzey düzeltmesi:** Yüzeye yakın sürtünme rüzgârı yavaşlatır ve izobardan **yüksek basınç tarafına** saptırır: karada ~%30-40 yavaşlama ve 20-30° sapma; **deniz üzerinde** sürtünme az olduğundan ~%10-20 yavaşlama ve 10-15° sapma olur. Bu yüzden deniz rüzgârı geostrofik değere daha yakındır.\n\n**Worked örnek (kaba):** İki 4 hPa'lık izobar deniz üzerinde 60 NM aralıkla ise gradyan güçlüdür ve orta enlemde ~30+ knot rüzgâra karşılık gelebilir; aynı izobarlar 300 NM aralıkla ise rüzgâr hafiftir (~10 kn). Kesin değer için haritanın enlemine göre geostrofik ölçek cetveli kullanılır.",
        formula: {
          text: "Geostrofik rüzgâr: Vg = (1 / (ρ · f)) · (ΔP / Δn),  f = 2Ω·sin(φ)",
          description:
            "ρ: hava yoğunluğu, f: Coriolis parametresi (φ enlem, Ω Dünya açısal hızı), ΔP/Δn: basınç gradyanı. Yüzeyde sürtünmeyle azalır ve izobardan yüksek basınç tarafına sapar.",
        },
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "Köprüüstünde izobar analizi yapılırken rota üzerindeki **sık-izobarlı bölgeler riskli sektör** olarak işaretlenir; bu sektörlere tahmini varış zamanı hesaplanır ve gerekirse hız/rota düzeltmesi planlanır. Pilot transferi, dar su geçişi ve güverte operasyonu gibi zamana duyarlı işler, güçlü gradyan dönemlerinden kaçınacak şekilde programlanır.\n\n**Gust (hamle) payı:** İzobardan okunan değer **ortalama** rüzgârdır; ani hamleler ortalamanın **1,3-1,5 katına** çıkabilir. Ortalama 30 kn okunuyorsa gust ~40-45 kn planlanmalıdır — güverte ekipmanı ve manevra bu tepe değere göre değerlendirilir.\n\n**Model kontrolü:** Tek bir haritaya güvenilmez; birden çok kaynak (farklı model çıktıları) karşılaştırılıp tutarsızlık kontrol edilir. İzobarlar hızla sıkışıyorsa sistem derinleşiyordur; erken hareket etmek geç kalmaktan iyidir.\n\n**Gemide önemi:** İzobar-rüzgâr çevirisi, köprüüstünde 'proaktif' hava değerlendirmesinin temelidir; resmî tahmin gelmeden önce bile haritadan yaklaşık rüzgârı okuyabilmek, vardiya zabitinin en değerli becerilerinden biridir.",
      },
    ],
    keyPoints: [
      "Sıkışık izobar = güçlü basınç gradyanı = yüksek rüzgâr hızı.",
      "Geostrofik rüzgâr, izobar aralığından hesaplanabilir ancak yüzey sürtünmesiyle %20–30 azalır.",
      "Rota üzerindeki yüksek gradyan bölgeleri erken tespit edilmeli ve ETA/operasyon planı revize edilmelidir.",
      "Gust faktörü ortalama rüzgârın 1.3–1.5 katına ulaşabilir.",
    ],
  },

  "Hava kütleleri ve kaynak bölgeler": {
    title: "Hava Kütleleri ve Kaynak Bölgeler",
    introduction:
      "Hava kütlesi, yatay düzlemde sıcaklık ve nem bakımından yaklaşık olarak homojen özellikler taşıyan büyük atmosfer hacmidir. Bir hava kütlesinin özellikleri kaynaklandığı bölgeye bağlıdır; hareket ettikçe geçtiği yüzeyin etkisiyle dönüşüme uğrar. Denizciler için hava kütlesi geçişleri, köprüüstünde beklenen sıcaklık, nem, görüş ve rüzgâr değişikliklerinin önceden tahmin edilmesini sağlar.",
    sections: [
      {
        title: "Hava Kütlesi Sınıflandırması",
        content:
          "Hava kütleleri iki temel eksende sınıflandırılır. **Enlem (sıcaklık):** kutupsal (P – polar) veya tropikal (T). **Kaynak yüzey (nem):** denizel (m – maritime, nemli) veya karasal (c – continental, kuru). Bu ikili, dört ana tipi verir: **cP** (karasal kutupsal), **mP** (denizel kutupsal), **cT** (karasal tropikal) ve **mT** (denizel tropikal). Uçlarda ayrıca **A** (Arktik) ve **E** (Ekvatoral) kütleler tanımlanır.\n\n**Karakter profilleri (denizcilik açısından kritik):**\n- **mT** (sıcak + nemli): stabil; stratus/adveksiyon **sisi** ve düşük görüş riski.\n- **cP** (soğuk + kuru): sıcak deniz üzerinde ısınınca instabil olur; kümülüs, sağanak ve **hamleli güçlü rüzgâr**.\n- **mP** (serin + nemli): değişken; kümülüs ve sağanak.\n- **cT** (sıcak + kuru): açık, kuru; toz/kum taşıyabilir.\n\n**Gemide önemi:** Kütlenin harfini bilmek, o bölgede sizi bekleyen görüş ve rüzgâr rejimini önceden söyler: mT = sise hazırlan; cP = deniz durumu bozulmasına ve bağlama kontrolüne hazırlan.",
      },
      {
        title: "Kütle Dönüşümü ve Stabilite Etkisi",
        content:
          "Bir hava kütlesi kaynak bölgesinden ayrılıp farklı sıcaklıktaki bir yüzey üzerinden geçtiğinde **dönüşür (modification)**; belirleyici olan, kütle ile altındaki yüzey arasındaki sıcaklık farkıdır.\n\n**Soğuk kütle → sıcak deniz:** Kütle **alttan ısınır**, alt hava hafifler ve yükselir → **instabil**. Sonuç: kümülüs/kümülonimbus, sağanak, iyi görüş ama hamleli rüzgâr ve olası fırtına hücreleri. (Anımsatıcı: 'soğuk hava sıcak su üstünde = kaynayan tencere'.)\n\n**Sıcak kütle → soğuk deniz:** Kütle **alttan soğur**, altta yoğun-soğuk bir tabaka oluşur → **stabil**. Sonuç: stratus, çisenti ve **adveksiyon sisi**; görüş dramatik düşer, rüzgâr genelde hafif ama görüş tehlikesi yüksektir.\n\n**İlke:** 'Alttan ısınan instabil (dikey bulut, sağanak); alttan soğuyan stabil (yatay bulut, sis).' Bu tek cümle, bir kütlenin rota üzerinde nasıl davranacağını kestirmenin anahtarıdır.\n\n**Gemide önemi:** Rotada hangi kütlenin hangi yüzeyi geçeceğini bilmek, sis mi yoksa sağanak/rüzgâr mı bekleneceğini önceden söyler ve prosedürler ona göre hazırlanır.",
      },
      {
        title: "Köprüüstü Uygulaması",
        content:
          "Sefer planlamasında baskın hava kütlesi tipi **rota brifingine** dahil edilir; çünkü her tip farklı bir emniyet önlemi gerektirir.\n\n**mT bölgeleri (sıcak-nemli):** Adveksiyon sisi riski yüksektir; geçiş saatleri, kısıtlı görüş prosedürü, radar/sis düdüğü ve gözcü düzeni önceden hazırlanır.\n\n**cP bölgeleri (soğuk-kuru, deniz üstünde instabil):** Konvektif rüzgâr ve deniz durumu bozulması beklenir; güverte emniyeti artırılır, **kargo/lashing kontrolleri** yapılır, ağır hava rutini gözden geçirilir.\n\n**Geçiş = cephe:** Hava kütlesi değişimi genellikle bir **cephe** geçişiyle olur; cephe öncesi ve sonrası koşullar ne kadar farklıysa geçiş o kadar şiddetlidir (bkz. Cephe tipleri). Vardiya zabitinin mevcut kütle tipini ve beklenen dönüşümü ekiple paylaşması, durumsal farkındalığı ve erken hazırlığı güçlendirir.",
      },
    ],
    keyPoints: [
      "Hava kütleleri kaynak bölgenin enlemine ve yüzey tipine göre sınıflandırılır.",
      "Soğuk kütle sıcak deniz üzerinde instabilite, sıcak kütle soğuk deniz üzerinde sis üretir.",
      "Kütle geçişleri genellikle cepheyle birlikte gerçekleşir ve ani hava değişimlerine neden olur.",
      "Sefer planlamasında baskın hava kütlesi tipi rota brifingine dahil edilmelidir.",
    ],
  },

  "Cephe tipleri ve geçiş etkileri": {
    title: "Cephe Tipleri ve Geçiş Etkileri",
    introduction:
      "Cephe, farklı özellikler taşıyan iki hava kütlesinin temas ettiği dar geçiş zonudur. Cephe geçişleri; rüzgâr yönü ve hızında ani değişim, yağış, görüş düşüklüğü ve dalga koşullarında bozulma gibi kritik hava olaylarının temel kaynağıdır. Köprüüstünde cephe tipini, hareket hızını ve geçiş zamanını doğru değerlendirmek, proaktif emniyet kararları almayı mümkün kılar.",
    sections: [
      {
        title: "Soğuk Cephe",
        content:
          "Soğuk cephe, ilerleyen **soğuk hava kütlesinin** önündeki sıcak havanın altına dik bir kama gibi girip onu **zorla yükseltmesiyle** oluşur. Bu dik kaldırma dar ama şiddetli bir konveksiyon bandı üretir; cephe genelde 30-50 km/h (bazen daha hızlı) ilerler.\n\n**Geçiş belirtileri (sırayla):** Yaklaşırken basınç hızla düşer; **kümülonimbus**, gök gürültülü sağanak ve ani rüzgâr **hamleleri** görülür. Kuzey yarımkürede rüzgâr geçişle birlikte **saat yönünde döner (veer)** — tipik olarak GB'den (SW) KB'ye (NW). Geçişten hemen sonra basınç **yükselir**, sıcaklık **düşer**, görüş açılır.\n\n**Anımsatıcı:** 'Soğuk cephe = kısa, sert, sonra berrak.' Rüzgârın veer etmesi + basıncın dip yapıp yükselmesi, cephenin tam üstünüzden geçtiğini gösterir.\n\n**Gemide önemi:** Deniz açısından en tehlikeli an, ani **rüzgâr şifti + dalga yönü değişimidir**; yeni yönden gelen dalgalar eskisiyle karışıp kısa süre kaotik (cross) deniz üretir. Squall (bora) hattı radar veya gözle önceden saptanıp hız/rota ile karşılanır.",
      },
      {
        title: "Sıcak Cephe",
        content:
          "Sıcak cephe, ilerleyen **sıcak hava kütlesinin** önündeki soğuk kütlenin üzerine **yavaşça tırmanmasıyla** oluşur. Eğimi yatık olduğundan bulut ve yağış geniş alana yayılır ve cephe soğuğa göre daha yavaş ilerler (15-30 km/h).\n\n**Geçiş belirtileri (uzun ön haber):** Bulut dizisi cephenin **500-1000 km önünden** başlar ve sırayla alçalır: **cirrus → cirrostratus → altostratus → nimbostratus**. Bu sıra klasik 'sıcak cephe yaklaşıyor' işaretidir. Yağış sürekli ve yaygındır; geçerken sıcaklık ve nem **artar**, rüzgâr kuzey yarımkürede yine döner (veer) ama daha yumuşak, basınç düşüşü yavaşlar/durur.\n\n**En kritik risk — görüş:** Sıcak-nemli hava soğuk deniz/zemin üzerine geldiğinden cephe hattı boyunca yaygın **adveksiyon sisi** ve düşük bulut oluşur; görüş dramatik düşer.\n\n**Gemide önemi:** Cirrus'un düzenli artışı + basıncın istikrarlı düşüşü, saatler öncesinden sıcak cephe (ve ardındaki olası alçak) uyarısıdır; görüş prosedürleri ve ETA revizyonu bu erken işaretle başlatılır.",
      },
      {
        title: "Oklüde Cephe ve Stasyoner Cephe",
        content:
          "**Oklüzyon**, hızlı ilerleyen soğuk cephenin öndeki yavaş sıcak cepheye **yetişmesiyle** oluşur; aradaki sıcak sektör yüzeyden yukarı **kaldırılıp koparılır**. Bu, depresyonun 'olgunlaşıp yaşlandığı' evredir. İki türü, yetişen soğuk havanın önündekine göre daha soğuk (**soğuk oklüzyon**) veya nispeten daha ılık (**sıcak oklüzyon**) olmasına göre ayrılır.\n\nOklüde cepheler hem soğuk hem sıcak cephe özelliklerini birlikte taşır: karışık bulut, uzun süreli yağış ve değişken rüzgâr. Depresyonun en derin ve rüzgârlı bölgesi genelde oklüzyon noktası (triple point) civarındadır.\n\n**Stasyoner cephe** ise iki kütlenin dengede olduğu, belirgin ilerlemesi olmayan cephedir; aynı bölgede **uzun süre** bulutlu-yağışlı hava üretir ve dalgalanarak yeni depresyonlar doğurabilir.\n\n**Gemide önemi:** Her iki tip de 'yavaş ama uzun süreli' kötü hava demektir; özellikle stasyoner cephenin **aniden harekete geçmesi** hızlı bir hava bozulmasına yol açar, bu yüzden hareketsiz görünen cephe de yakından izlenir.",
      },
      {
        title: "Operasyonel Karar ve Hazırlık",
        content:
          "Cephe geçişine hazırlık **sistematik** olmalıdır; sürpriz değil, saatler öncesinden okunabilen bir olaydır.\n\n**Zamanlama:** Cephenin tahmini geçiş anı rota planına işlenir ve bu andan **en az 2 saat önce** güverte emniyeti artırılır, dış operasyonlar durdurulur ya da hızlandırılıp bitirilir.\n\n**Rüzgâr şifti:** Kuzey yarımkürede geçişte rüzgâr **veer** eder (saat yönü); şiftin yönü ve büyüklüğü önceden hesaplanıp demir/manevra alternatifi ve olası bordalama açısı buna göre planlanır.\n\n**Görüş ve makine:** Görüş düşüklüğü bekleniyorsa **COLREG kısıtlı görüş** prosedürleri (Kural 19) aktive edilir; sis düdüğü, gözcü ve radar hazır tutulur. Makine dairesi hem düşük devir hem tam güç ihtiyacına karşı uyarılır. Geçiş sırasında radar, AIS ve görsel gözetleme sıklığı artırılır.\n\n**Gemide önemi:** Cephe, hava kütlesi değişiminin görünür sınırıdır; öncesi ve sonrası koşullar ne kadar farklıysa geçiş o kadar serttir — bu farkı önceden bilmek, 'tepki veren' değil 'önceden hazırlanan' bir köprüüstü demektir.",
      },
    ],
    keyPoints: [
      "Soğuk cephe hızlı, şiddetli ve dar bantlı; sıcak cephe yavaş, yaygın ve görüş düşürücüdür.",
      "Oklüde cephe karmaşık koşullar üretir; stasyoner cephe uzun süreli kötü hava kaynağıdır.",
      "Cephe geçiş zamanı rota planına işlenmeli, hazırlık en az 2 saat önceden başlamalıdır.",
      "Rüzgâr şifti, yağış tipi ve görüş değişimi birlikte değerlendirilmelidir.",
    ],
  },

  "Gerçek rüzgar ve görünen rüzgar": {
    title: "Gerçek Rüzgâr ve Görünen Rüzgâr",
    introduction:
      "Gemide ölçülen rüzgâr her zaman gerçek (true) rüzgâr değildir; geminin kendi hareketi ile gerçek rüzgârın vektörel bileşimi olan görünen (apparent) rüzgârdır. Bu ayrımı yapmadan alınan operasyonel kararlar — özellikle hız seçimi, manevra planı ve güverte çalışma emniyeti — hatalı sonuçlar doğurabilir.",
    sections: [
      {
        title: "Tanımlar ve Vektörel İlişki",
        content:
          "**Gerçek rüzgâr (True Wind, TW)** sabit bir referansa göre esen rüzgârdır; yönü ve hızı geminin hareketinden bağımsızdır. **Görünen rüzgâr (Apparent Wind, AW)** ise geminin hareket vektörü ile gerçek rüzgâr vektörünün **bileşkesidir** — yani gemide anemometrede fiilen ölçtüğünüz şeydir.\n\n**Vektör üçgeni:** Görünen rüzgâr = Gerçek rüzgâr + geminin ters yöndeki hareketi. Gemi rüzgâra doğru gidiyorsa görünen rüzgâr **hızı artar** ve yönü pruvaya yaklaşır; rüzgâr kıçtan estiğinde görünen rüzgâr **azalır**. Bu yüzden aynı gerçek rüzgâr, gemi hızına ve başına göre farklı 'görünür'.\n\n**Worked örnek:** Gemi 000° başla 15 kn gidiyor; gerçek rüzgâr tam baştan (000°) 20 kn. Görünen rüzgâr = 20 + 15 = **35 kn, baştan**. Aynı gemi rüzgârı tam kıçtan (180°) alsaydı görünen = 20 − 15 = **5 kn, kıçtan** — güvertede rüzgâr neredeyse yok gibi hissedilir, oysa gerçek rüzgâr hâlâ 20 kn'dir.\n\n**Gemide önemi:** Modern sistemler TW'yi otomatik hesaplar, ama sensör arızasında zabitin vektör üçgenini elle çözebilmesi hayatidir; yanlış rüzgâr, yanlış manevra ve yanlış operasyon limiti demektir.",
        formula: {
          text: "Baştan rüzgâr: AW = TW + Vgemi  |  Kıçtan rüzgâr: AW = TW − Vgemi  (yön farkı varsa vektörel/bileşen çözümü)",
          description:
            "AW görünen, TW gerçek rüzgâr, Vgemi gemi hızı. Anemometre AW ölçer; tüm operasyon limitleri TW cinsindendir.",
        },
      },
      {
        title: "Operasyonel Önem",
        content:
          "Liman yaklaşımı, manevra ve güverte operasyonlarında karar dayanağı **daima gerçek rüzgâr** olmalıdır. Pilot alma, helikopter operasyonu ve tanker manifold çalışma limitleri gerçek rüzgâra göre tanımlanır.\n\n**Tehlike — kıçtan rüzgârın gizlenmesi:** Rüzgâr kıçtan eserken görünen rüzgâr gerçekten çok daha düşük ölçülür (örnekte 5 kn'e karşı gerçek 20 kn). Anemometreyi ham okuyup 'rüzgâr yok' sanmak, güverte üzerindeki gerçek rüzgâr momentini ve dalga koşullarını **küçümsemeye** yol açar — özellikle yelken alanı büyük konteyner/RO-RO gemilerinde manevrada tehlikelidir.\n\n**Deniz durumu bağlantısı:** Dalga yüksekliği ve periyodu **gerçek** rüzgâra bağlı geliştiğinden, seakeeping ve rota kararları da TW'ye dayanmalıdır; görünen rüzgâra göre 'sakin' bir durum, gerçekte kabaran bir denizle birlikte olabilir.\n\n**Gemide önemi:** Operasyon limiti tablolarının hepsi TW cinsindendir; anemometre okumasını doğrudan limitle karşılaştırmak, gemi seyir hâlindeyken sistematik hata üretir.",
      },
      {
        title: "Hesaplama ve Doğrulama",
        content:
          "Otomatik TW hesabının doğruluğu üç girdiye bağlıdır: **heading (cayro)**, **hız (log/GPS SOG)** ve **anemometre kalibrasyonu**. Bunlardan biri hatalıysa gerçek rüzgâr çıktısı da hatalı olur — ve hata sessizdir; ekranda 'makul' bir sayı görünür.\n\n**Doğrulama yolları:** Zabit, hesaplanan TW'yi bağımsız gözlemle sağlamalıdır: bayrak ve flama, su yüzeyi belirtileri (kedi tırmığı, köpük çizgileri) ve **Beaufort** gözlemi. Bunlar hesapla çelişiyorsa bir sensör şüphelidir.\n\n**Kalibrasyon fırsatı:** Gemi **durduğunda veya çok düşük hızdayken** görünen rüzgâr ≈ gerçek rüzgârdır (gemi hız vektörü ≈ 0); bu an, anemometre ve sistem çıktısını karşılaştırıp kalibrasyonu kontrol etmek için idealdir.\n\n**Gemide önemi:** 'Cihaz söylüyor' yeterli değildir; TW çıktısı en az bir bağımsız gözlemle teyit edilmeden kritik manevra limiti olarak kullanılmaz.",
      },
    ],
    keyPoints: [
      "Anemometre görünen rüzgârı ölçer; operasyonel kararlar gerçek rüzgâra dayandırılmalıdır.",
      "Rüzgâr arkadan eserken gerçek rüzgâr görünenden önemli ölçüde yüksek olabilir.",
      "Sensör kalibrasyonu ve görsel doğrulama (Beaufort gözlemi) birlikte kullanılmalıdır.",
    ],
  },

  "Beaufort skalası uygulamaları": {
    title: "Beaufort Skalası Uygulamaları",
    introduction:
      "Beaufort skalası, rüzgâr hızını deniz yüzeyi belirtileriyle eşleştiren standart bir sınıflandırma sistemidir. Anemometre arızası, veri kesintisi veya enstrüman eksikliği durumunda bile denizcinin deniz durumunu standart bir dille ifade etmesini ve kayıt altına almasını sağlar.",
    sections: [
      {
        title: "Skalanın Yapısı",
        content:
          "Sir Francis Beaufort'un 1805'te geliştirdiği skala, **0 (sakin)** ile **12 (kasırga)** arasında 13 kademeden oluşur ve her kademe bir rüzgâr hızı aralığına ve **deniz yüzeyi görünümüne** karşılık gelir. Skalanın gücü, alet olmadan yalnız denize bakarak rüzgârı standart bir sayıyla ifade edebilmektir.\n\n**Kilit kademeler (denizcilikte):**\n- **F4** (11-16 kn): belirgin küçük dalgalar, yer yer beyaz köpük.\n- **F6** ('kuvvetli rüzgâr', 22-27 kn): büyük dalgalar, yaygın köpük — birçok küçük tekne için operasyon sınırı.\n- **F7** ('near gale', 28-33 kn): deniz kabarır, köpük rüzgâr yönünde çizgilenir.\n- **F8** ('gale/bora', 34-40 kn): resmî fırtına uyarısı eşiği.\n- **F10** (48-55 kn) ve üzeri: deniz beyaza keser, görüş serpinti/yağışla kısıtlanır.\n\n**Gemide önemi:** Anemometre arızası, veri kesintisi veya alet yokluğunda bile denizci, deniz görünümünden Beaufort kademesini kestirip kaydedebilir; bu, standart ve evrensel bir hava dilidir.",
        formula: {
          text: "Rüzgâr hızı ≈ 0,836 × B^(3/2) m/s   (B: Beaufort sayısı)",
          description:
            "Yaklaşık bağıntı; ör. B=8 → 0,836 × 8^1,5 ≈ 18,9 m/s ≈ 37 kn (F8 gale aralığı). Pratikte kademe, hızdan çok deniz görünümünden okunur.",
        },
      },
      {
        title: "Deniz Durumu (Sea State) ile İlişki",
        content:
          "Beaufort **rüzgâr hızını** sınıflar; ama dalga yüksekliği yalnız rüzgâr hızına değil, rüzgârın **esme süresine (duration)** ve üzerinden estiği açık deniz mesafesine (**fetch**) de bağlıdır. Bu yüzden aynı **F6**, kapalı bir körfezde küçük, geniş bir okyanusta çok daha büyük dalga üretir.\n\n**Fully developed sea:** Rüzgâr yeterince uzun süre ve yeterince uzun fetch üzerinde eserse deniz, o rüzgâr için ulaşabileceği en büyük hâle gelir ve artık büyümez. Kısa fetch/süre ise dalgayı sınırlar — bu yüzden yeni başlayan bir fırtınada rüzgâr sert ama deniz henüz 'gelişmemiş' olabilir.\n\n**Douglas skalası:** Dalga yüksekliğini ayrı sınıflandıran **Douglas Sea State** skalası Beaufort'la birlikte kullanılır; biri rüzgârı, diğeri denizi anlatır. Vardiya kayıtlarında ikisi de tutulur.\n\n**Gemide önemi:** 'F6 var' demek dalga hakkında tek başına yetmez; süre + fetch birlikte değerlendirilmeden deniz durumu ve gemi hareketi doğru öngörülemez.",
      },
      {
        title: "Köprüüstü Kullanımı",
        content:
          "Beaufort skalası; vardiya defteri, hava raporları ve kaptan brifinglerinde **standart referans** olarak kullanılır. Değeri, herkesin aynı deniz görünümünü aynı sayıyla ifade etmesini sağlamasıdır.\n\n**Zor koşullarda gözlem:** Gece ve yağışta görsel değerlendirme zorlaşır; bu durumda dalga sesi, serpinti/sıçrama karakteri ve **geminin kendi hareketleri** dolaylı gösterge olur. Deneyimli gözlemci bu ipuçlarını kademeye çevirir.\n\n**Operasyon limitleri:** Kreyn operasyonu, pilot transferi, supply boat yanaşması gibi işler genelde bir **Beaufort eşiğine** (ör. 'F5 üstünde durdur') bağlanır; bu yüzden kademe tutarlı okunmalıdır.\n\n**Gemide önemi:** Tutarsız Beaufort kayıtları önceki vardiyalarla karşılaştırmayı ve **trend takibini** bozar; kötüye giden bir deniz ancak tutarlı kayıtla erken fark edilir — standardize gözlem eğitimi bu yüzden önemlidir.",
      },
    ],
    keyPoints: [
      "Beaufort skalası 0–12 arasında rüzgâr hızını deniz yüzeyi belirtileriyle eşleştirir.",
      "Dalga yüksekliği ek olarak süre ve fetch'e bağlıdır; Beaufort tek başına dalga tahmini yapmaz.",
      "Operasyon limitleri genellikle Beaufort referansıyla tanımlanır.",
      "Tutarlı gözlem ve kayıt disiplini trend analizi için zorunludur.",
    ],
  },

  "Dalga yüksekliği ve periyot": {
    title: "Dalga Yüksekliği ve Periyot",
    introduction:
      "Dalga yüksekliği ve periyot, gemi hareketleri, yapısal yükler, kargo emniyeti ve mürettebat konforu üzerinde doğrudan belirleyici olan iki temel parametredir. Bu parametrelerin doğru değerlendirilmesi, rota optimizasyonu ve emniyet kararlarının kalitesini artırır.",
    sections: [
      {
        title: "Tanımlar",
        content:
          "Dalga yüksekliği (**H**), dalga çukurundan tepesine olan dikey mesafedir. Deniz durumu değerlendirmesinde **anlamlı dalga yüksekliği (Hs veya H₁/₃)** kullanılır: gözlenen en yüksek dalgaların **üçte birinin ortalaması**. Neden 'en yüksek üçte bir'? Çünkü bu değer, gözlemcinin gözünün algıladığı tipik büyük dalgalara karşılık gelir ve model/uydu verileri de bu tanımda verilir.\n\n**Periyot (T)**, ardışık iki dalga tepesinin aynı noktadan geçme süresidir (saniye). Derin suda dalga boyu (λ) ve faz hızı (c) doğrudan periyottan türer: **λ ≈ 1,56 · T²** (m) ve **c ≈ 1,56 · T** (m/s).\n\n**Worked örnek:** T = 10 s bir swell için λ ≈ 1,56 × 100 = **156 m**, hız c ≈ 1,56 × 10 = 15,6 m/s ≈ **30 kn**. Yani uzun periyotlu swell birçok gemiden hızlı ilerler — fırtına kendisi gelmeden onun swell'i limana ulaşır.\n\n**Kritik istatistik:** En büyük tek dalga, Hs'in ~1,8-2 katına ulaşabilir; 'anormal/rogue' dalga 2 katını aşar. Yani Hs = 4 m, ara sıra 7-8 m'lik bir dalga gelebilir demektir.",
        formula: {
          text: "Derin su: λ ≈ 1,56·T² (m),  c ≈ 1,56·T (m/s);  Hmax ≈ (1,8–2)·Hs",
          description:
            "T periyot (s), λ dalga boyu, c faz hızı, Hs anlamlı dalga yüksekliği. Ör. T=10 s → λ≈156 m, c≈30 kn.",
        },
      },
      {
        title: "Gemi Hareketlerine Etkisi",
        content:
          "Dalga periyodu, gemi hareketlerinin **karakterini** belirler. Kısa periyotlu dalgalar (4-7 s) hızlı, sert yalpa/baş-kıç vurma üretir; kargo kayması, yaralanma ve **slamming** hasarına yol açar. Uzun periyotlu swell (12-18 s) yavaş ama geniş açılı hareket ve **rezonans** riski taşır.\n\n**Karşılaşma periyodu (Te):** Geminin hissettiği periyot, dalga periyodu değil; gemi hızı ve rotasıyla değişen **karşılaşma periyodudur**. Dalgayı baştan alırken Te kısalır (hareket sertleşir), kıçtan alırken uzar (yumuşar).\n\n**Rezonans:** Geminin **doğal yalpa periyodu (Tφ)** ile Te örtüştüğünde yalpa hızla büyür (**senkron yalpa**); Te ≈ Tφ/2 olduğunda ise **parametrik yalpa** gelişir. İkisi de stabilite kaybına gidebilir.\n\n**Worked örnek:** Doğal yalpa periyodu Tφ = 12 s olan bir gemi, 12 s periyotlu swell'i **kemereden** alırsa Te ≈ 12 s = Tφ → senkron yalpa riski yüksektir. Çözüm: rota veya hızı değiştirerek Te'yi Tφ'den uzaklaştırmak.\n\n**Gemide önemi:** Dalga-baş açısı (encounter angle), bu risklerin temel kontrol değişkenidir; kaptan hız ve rotayı Te'yi tehlikeli örtüşmeden kaçıracak biçimde seçer (IMO MSC.1/Circ.1228).",
        formula: {
          text: "Te ≈ T / ( 1 − (V·cos μ)/c ) ;  Tehlike: Te ≈ Tφ (senkron) veya Te ≈ Tφ/2 (parametrik)",
          description:
            "Te karşılaşma periyodu, T dalga periyodu, V gemi hızı, μ dalga-baş açısı, c dalga hızı, Tφ doğal yalpa periyodu. Rota/hız değişimi Te'yi kaydırır.",
        },
      },
      {
        title: "Operasyonel Değerlendirme",
        content:
          "Hava rotalama (weather routing) kararlarında Hs ve **periyot birlikte** değerlendirilir; yalnız Hs'e bakmak yanıltır. Örneğin Hs = 3 m ama T = 6 s (dik, kısa dalga) bir bölge, Hs = 3,5 m ama T = 13 s (uzun swell) bir bölgeden daha sert gemi hareketi verebilir.\n\n**Kontrol değişkeni — Te:** Karşılaşma periyodu; dalga yönü + gemi rotası + hızla hesaplanır ve **rota/hız değişikliğiyle** yönetilir. Amaç, Te'yi geminin doğal yalpa periyodundan (ve onun yarısından) uzak tutmaktır.\n\n**Tehlikeli açılar:** **Quartering sea** (dalga kıç omuzluktan, ~120°-150°) koşullarında **broaching** (dümen dinlememe, ani savrulma) ve parametrik yalpa riski artar; bu aralık dikkatle izlenir. Takip eden denizde (following sea) hız fazlaysa gemi dalgayla 'sörf' yapıp kontrolü yitirebilir.\n\n**Gemide önemi:** IMO ağır hava rehberi (MSC.1/Circ.1228), tehlikeli senkron/parametrik yalpa ve broaching bölgelerinden kaçınmak için hız-rota diyagramları sunar; köprüüstü bu ilkeyi rota planına işler.",
      },
    ],
    keyPoints: [
      "Hs (anlamlı dalga yüksekliği) deniz durumu değerlendirmesinin standart ölçüsüdür.",
      "Periyot, gemi hareketlerinin şiddetini ve rezonans riskini belirler.",
      "Quartering sea (120°–150° dalga açısı) koşullarında broaching riski artar.",
      "Rota ve hız değişikliğiyle karşılaşma periyodu kontrol edilebilir.",
    ],
  },

  "Swell ve wind sea ayrımı": {
    title: "Swell ve Wind Sea Ayrımı",
    introduction:
      "Deniz yüzeyindeki dalgalar tek bir kaynaktan değil, birden fazla bileşenden oluşabilir. Yerel rüzgârın ürettiği wind sea ile uzak kaynaktan gelen swell birbirinden farklı karakteristiğe sahiptir. Bu ayrımı doğru yapmak, gemi hareketlerinin kaynağını anlamayı ve uygun operasyonel tedbirleri almayı mümkün kılar.",
    sections: [
      {
        title: "Wind Sea Karakteristiği",
        content:
          "**Wind sea**, o an esen yerel rüzgârın **aktif olarak ürettiği** dalgalardır. Rüzgâr yönüyle hemen hemen aynı doğrultuda ilerler; periyodu **kısa (3-8 s)**, formu düzensiz, tepeleri dik ve sivridir, sık sık kırılır (beyaz köpük).\n\n**Bağımlılık:** Wind sea'nin yüksekliği üç şeye bağlıdır — rüzgâr **hızı**, esiş **süresi (duration)** ve **fetch** (üzerinden estiği açık su mesafesi). Bu üçünden biri sınırlıysa deniz tam gelişemez.\n\n**Sönümlenme:** Rüzgâr durduğunda veya yön değiştirdiğinde wind sea hızla söner ya da düzenlenerek swell'e dönüşmeye başlar; yani wind sea 'canlı', rüzgâra bağlı bir denizdir.\n\n**Gemide önemi:** Wind sea, yerel rüzgârın anlık şiddetinin aynasıdır; dik ve düzensiz olması kısa periyotlu sert gemi hareketi ve güverteye su alma (slamming/serpinti) demektir.",
      },
      {
        title: "Swell Karakteristiği",
        content:
          "**Swell**, kaynağından (genelde yüzlerce, hatta binlerce mil ötedeki bir fırtına alanı) ayrılıp **yayılarak gelen** dalgalardır. Rüzgârdan kopmuştur; periyodu **uzun (10-20 s)**, formu düzgün ve sinüzoidaldir.\n\n**Az sönümlenme, uzun menzil:** Swell çok az enerji kaybederek büyük mesafe kat eder; bu yüzden **yerel rüzgâr sakin olsa bile** önemli yükseklikte swell gözlenebilir. Uzun periyodu nedeniyle hızlıdır (T=14 s → ~42 kn) ve fırtınanın 'ön habercisi' olarak fırtınadan önce gelir.\n\n**Cross swell:** Aynı anda farklı yönlerden gelen birden çok swell bileşeni olabilir; bunlar kesişince düzensiz, tehlikeli bir deniz ve ara sıra üst üste binen büyük dalga oluşur.\n\n**Gemide önemi:** Uzun swell geminin doğal yalpa periyoduna yakınsa (bkz. rezonans), sakin havada bile şiddetli yalpa üretir; 'rüzgâr yok ama gemi yalpalıyor' durumunun tipik nedeni swell'dir.",
      },
      {
        title: "Operasyonel Önemi",
        content:
          "**Kıyı ve liman kritikliği:** Sığ suya giren swell tabana sürtünüp yavaşlar ve dikleşerek yükselir (**shoaling**), sıralı büyük dalgalar üretir; liman girişi ve demirleme bundan doğrudan etkilenir.\n\n**Bağlama yükleri:** Uzun periyotlu swell, yanaşmış gemide ve iskele bağlantılarında **dinamik yükleri** artırır; geminin uzun-periyot sürüklenme/kafa vurma hareketi **palamar kopmasına (mooring failure)** yol açabilir — sakin görünen limanda bile.\n\n**Rotalama:** Açık denizde wind sea ve swell **ayrı ayrı** analiz edilmeden yapılan rotalama eksiktir; ikisinin yönü, yüksekliği ve periyodu farklıysa bileşke deniz karmaşıktır.\n\n**Kayıt disiplini:** Deniz durum raporunda wind sea ve swell **ayrı** belirtilir — her biri için yön + yükseklik + periyot. 'Deniz 3 m' demek yetmez; 'wind sea 2 m / NW / 6 s + swell 2,5 m / W / 13 s' gibi ikisi ayrı verilir.",
      },
    ],
    keyPoints: [
      "Wind sea yerel rüzgâra bağlı, kısa periyotlu ve düzensizdir.",
      "Swell uzak kaynaklı, uzun periyotlu ve çok az sönümlenerek yayılır.",
      "Yerel rüzgâr sakin olsa bile swell önemli dalga yüksekliğine ulaşabilir.",
      "Liman operasyonlarında swell kaynaklı dinamik yükler kritik risk faktörüdür.",
    ],
  },

  "Siklon yapısı ve gelişim evreleri": {
    title: "Tropikal Siklon Yapısı ve Gelişim Evreleri",
    introduction:
      "Tropikal siklonlar, sıcak okyanus yüzeylerinden enerji alarak gelişen, düşük basınç merkezli yoğun fırtına sistemleridir. Denizcilik açısından en tehlikeli hava olaylarından biridir; şiddetli rüzgâr, devasa dalgalar, fırtına kabarması ve görüş düşüklüğü ile can ve mal kaybına yol açabilir. Siklon evrelerini ve yapısını bilmek, kaçınma stratejisini belirlemede hayati önem taşır.",
    sections: [
      {
        title: "Oluşum Koşulları",
        content:
          "Tropikal siklon 'motoru' sıcak deniz suyudur; oluşabilmesi için birkaç koşulun **aynı anda** sağlanması gerekir:\n\n- **Sıcak deniz:** Yüzey sıcaklığı ≥ **26,5°C** ve bu sıcaklığın ~50 m derine kadar sürmesi (enerji deposu).\n- **Coriolis:** Ekvatordan en az ~5° enlem uzaklık; ekvatorda Coriolis ≈ 0 olduğundan dönme başlayamaz.\n- **Zayıf düşey rüzgâr kesmesi (wind shear):** Güçlü shear, gelişen kuleyi eğip dağıtır.\n- **Üst atmosferde diverjans (outflow):** Yükselen havanın tepeden boşalabilmesi gerekir; yoksa sistem 'tıkanır'.\n- **Nemli orta troposfer** ve başlangıç için bir tetik (easterly wave / tropik bozukluk).\n\n**Mevsim/coğrafya:** Bu koşullar en sık tropikal okyanuslarda **yaz-sonbahar** aylarında bir araya gelir. Enerji kaynağı, yükselen nemli havadaki su buharının yoğuşurken saldığı **gizli ısıdır (latent heat)**; bu yüzden sistem karaya çıkıp enerjisi kesilince hızla zayıflar.\n\n**Gemide önemi:** Rota bu havza ve mevsimlerden geçiyorsa, siklon sezonu risk değerlendirmesi sefer planına baştan konur; deniz yüzeyi sıcaklığı (SST) haritaları ve tropik bülten takibi zorunludur.",
      },
      {
        title: "Gelişim Evreleri",
        content:
          "Tropikal sistem, sürekli rüzgâr şiddetine göre dört evrede sınıflandırılır:\n\n- **(1) Tropikal Bozukluk:** organize olmamış konveksiyon, rüzgâr **< 34 kn**.\n- **(2) Tropikal Fırtına:** kapalı dolaşım, **34-47 kn**; bu evrede sisteme **isim** verilir.\n- **(3) Şiddetli Tropikal Fırtına:** **48-63 kn** (bazı havzalarda ayrı kategori).\n- **(4) Tropikal Siklon / Tayfun / Kasırga:** **≥ 64 kn**; belirgin bir **göz** oluşmuştur.\n\n**Havza adları aynı olayı anlatır:** Atlantik/Doğu Pasifik'te **hurricane**, Batı Pasifik'te **typhoon**, Hint/Güney Pasifik'te **cyclone** — hepsi ≥ 64 kn tropikal siklondur.\n\n**Şiddet skalası:** **Saffir-Simpson** (Kategori 1-5) kasırgayı rüzgâra göre sınıflar; **Kategori 5** > 137 kn'dir. 'Hızlı şiddetlenme' (rapid intensification: 24 saatte ≥ 30 kn artış) özellikle tehlikelidir, çünkü kaçınma penceresini aniden daraltır.\n\n**Gemide önemi:** Bültende sistemin evresi + trendi (güçleniyor/zayıflıyor) okunur; isimlendirme anı, sistemin artık ciddiye alınıp izlenmesi gereken eşiktir.",
      },
      {
        title: "Yapısal Öğeler",
        content:
          "Olgunlaşmış bir tropikal siklon, merkezden dışa doğru üç ana yapısal bölgeden oluşur. Merkezde, sistemin en düşük basıncının ölçüldüğü, rüzgârın zayıfladığı ve gökyüzünün kısmen açılabildiği göz (eye) bulunur; tipik çapı 20–60 km arasında değişir. Gözü çepeçevre saran eyewall (göz duvarı), dikine gelişmiş kümülonimbus bulutlarından oluşan bir halkadır ve sistemin en şiddetli rüzgârı ile en yoğun yağışı burada gözlenir. Eyewall'dan dışa doğru, merkeze sarmal biçimde kıvrılan spiral yağmur bantları yüzlerce kilometre uzanır; bantlar arasındaki nispeten sakin koridorlar yanıltıcıdır, her yeni bantla birlikte sağanak ve gust koşulları geri döner. Siklonun yüzey rüzgâr alanı çapı yüzlerce kilometre olabilir; sistemin ürettiği soluğan (swell) dalgaları ise bu alanın çok ötesine, binlerce kilometre uzağa ulaşarak siklonun ilk habercisi olur. Göz, eyewall ve spiral bantların ayrıntılı incelemesi ve köprüüstü uygulamaları, 'Siklonun gözü (eye) ve eyewall' konusunda ayrı olarak ele alınmıştır.",
        bulletPoints: [
          "Göz: en düşük basınç, zayıf rüzgâr, kısmen açık gökyüzü — yanıltıcı sakinlik.",
          "Eyewall: en şiddetli rüzgâr, en yoğun yağış, en dik basınç gradyanı.",
          "Spiral bantlar: sağanak ve gust taşıyan sarmal yağış hatları; aralarındaki sakin koridorlar geçicidir.",
          "Uzun periyotlu soluğan (swell), siklonun rüzgâr alanından çok önce gemiye ulaşan ilk işarettir.",
        ],
      },
    ],
    keyPoints: [
      "Deniz yüzeyi sıcaklığı ≥ 26.5°C ve düşük rüzgâr kesmesi oluşum ön koşuludur.",
      "Tropik bozukluktan kategori 5 kasırgaya kadar sistematik bir evreleme vardır.",
      "Eyewall en şiddetli koşulları barındırır; göz sakinliği yanıltıcıdır.",
      "Fırtına dalgaları rüzgâr alanının çok ötesine ulaşabilir.",
    ],
  },

  "Siklonun gözü (eye) ve eyewall": {
    title: "Siklonun Gözü (Eye), Eyewall ve Spiral Yağmur Bantları",
    introduction:
      "Tropikal siklonun gözü, atmosferdeki en çarpıcı ve aynı zamanda en yanıltıcı meteorolojik yapılardan biridir. Yüzlerce kilometre çaplı, yıkıcı bir fırtına sisteminin tam merkezinde rüzgârın durulduğu, gökyüzünün açılabildiği ve basıncın en düşük değerine indiği sakin bir bölge yer alır. Bu sakinlik pek çok denizciyi tarih boyunca ölümcül hatalara sürüklemiştir: göz geçicidir ve arkasından fırtınanın ikinci yarısı, ters yönden ve tam şiddetiyle gelir. Bu konu; gözün fiziğini, onu çevreleyen eyewall'un yapısını, eyewall yenilenme döngüsünü ve gözle karşılaşan bir geminin köprüüstünde alması gereken kararları ayrıntılı olarak inceler.",
    sections: [
      {
        title: "Gözün Tanımı ve Fiziksel Özellikleri",
        content:
          "Göz (eye), olgunlaşmış bir tropikal siklonun dönme merkezinde yer alan, yaklaşık dairesel biçimli sakin bölgedir. Tipik çapı 20–60 km arasındadır; ancak çok şiddetli, kompakt sistemlerde 8–10 km'ye kadar daralabilen 'iğne deliği' (pinhole) gözler ve zayıf ya da çok geniş sistemlerde 100 km'yi aşan gözler de gözlenmiştir. Genel kural olarak küçük ve keskin sınırlı bir göz, yoğunlaşmış ve şiddetli bir sisteme işaret eder. Göz içinde yüzey rüzgârı çoğunlukla 10–15 knotun altına düşer, yağış kesilir ve gökyüzü kısmen veya tamamen açılabilir; geceleyin yıldızlar, gündüz güneş görülebilir. Sistemin deniz seviyesindeki en düşük basıncı gözün merkezinde ölçülür; şiddetli kasırgalarda bu değer 950 hPa'nın, rekor sistemlerde 900 hPa'nın altına iner. Göz aynı zamanda sistemin 'sıcak çekirdeğidir' (warm core): çöken havanın sıkışarak ısınması nedeniyle göz içi, aynı yükseklikteki çevre atmosferden orta seviyelerde 5–10°C daha sıcaktır. Bu sıcak çekirdek, tropikal siklonu orta enlem alçak basınçlarından (soğuk çekirdekli sistemlerden) ayıran temel termodinamik özelliktir. Gözün içinden yukarıya bakıldığında, eyewall bulutlarının çepeçevre yükselen dev bir stadyum tribünü gibi görünmesi 'stadyum etkisi' (stadium effect) olarak adlandırılır.",
        bulletPoints: [
          "Tipik göz çapı 20–60 km; küçük ve keskin göz genellikle şiddetli sistem demektir.",
          "Göz merkezi = sistemin en düşük deniz seviyesi basıncı (şiddetli sistemlerde < 950 hPa).",
          "Göz içi rüzgâr çoğunlukla < 10–15 knot; yağış kesilir, gökyüzü açılabilir.",
          "Sıcak çekirdek: göz, çevresine göre orta seviyelerde 5–10°C daha sıcaktır.",
          "Stadyum etkisi: eyewall bulutları gözün içinden tribün gibi yükselerek görünür.",
        ],
      },
      {
        title: "Göz Neden Oluşur? Çöken Hava ve Dinamik Denge",
        content:
          "Gözün varlığı iki temel fiziksel mekanizmanın sonucudur. Birincisi dinamik dengedir: siklonun merkezine doğru sarmal biçimde akan hava, açısal momentumun korunumu gereği merkeze yaklaştıkça giderek hızlanır (buz patencisinin kollarını toplayınca hızlanması gibi). Belirli bir yarıçapta merkezkaç kuvveti, havayı içeri çeken basınç gradyan kuvvetini dengeler ve hava artık daha fazla merkeze sokulamaz; bu denge yarıçapı, eyewall'un iç sınırını ve dolayısıyla gözün boyutunu belirler. İçeri akan tüm nemli hava bu halka üzerinde şiddetle yükselmek zorunda kalır — eyewall'un dev kümülonimbus kulesi böyle beslenir. İkinci mekanizma çökme (subsidence) ile ilgilidir: eyewall içinde yükselip tepede dışa doğru boşalan havanın bir bölümü gözün içine döner ve orada aşağı doğru çöker. Çöken hava adyabatik olarak sıkışıp ısınır; ısınan havanın bağıl nemi düşer, bulutlar çözülür ve gökyüzü açılır. Bu, gözün hem açık hem de sıcak olmasının nedenidir. Göz, sistem tropikal fırtına şiddetini aşıp olgunlaşmaya başladığında (genellikle sürekli rüzgâr 64 knota yaklaşırken) uydu ve radar görüntülerinde belirginleşir; net ve simetrik bir gözün ortaya çıkması, sistemin güçlendiğinin en güvenilir işaretlerinden biridir.",
        bulletPoints: [
          "Açısal momentum korunumu: merkeze yaklaşan hava hızlanır, merkezkaç kuvveti içeri akışı bir halkada durdurur.",
          "Bu denge yarıçapı eyewall'un iç sınırını, yani gözün boyutunu belirler.",
          "Göz içinde çöken hava adyabatik ısınmayla bulutları çözer: açık gökyüzü ve sıcak çekirdek.",
          "Belirgin ve simetrik bir gözün oluşması, sistemin şiddetlendiğini gösterir.",
        ],
      },
      {
        title: "Eyewall: Sistemin En Şiddetli Bölgesi",
        content:
          "Eyewall (göz duvarı), gözü çepeçevre saran, 8–15 km yüksekliğe kadar dikine gelişmiş kümülonimbus bulutlarından oluşan halkadır ve tropikal siklonun tartışmasız en tehlikeli bölgesidir. Sistemin en yüksek sürekli rüzgârı, en şiddetli gust'ları, en yoğun yağışı ve en dik basınç gradyanı burada bulunur. Rüzgâr hızı gözün sakin merkezinden eyewall'a geçerken birkaç deniz mili içinde sıfıra yakın değerden 100 knotun üzerine fırlayabilir; hiçbir başka meteorolojik sistemde bu kadar keskin bir geçiş yoktur. Barometre, eyewall geçişi sırasında saatte 15–20 hPa gibi olağanüstü hızlarla düşebilir veya yükselebilir. Kuzey Yarım Küre'de en şiddetli rüzgâr genellikle eyewall'un sağ-ön çeyreğinde (sistemin hareket yönüne göre) bulunur; çünkü burada siklonun dönel rüzgârına sistemin ilerleme hızı da eklenir — bu, tehlikeli yarım daire kavramının mikro ölçekteki karşılığıdır. Eyewall altındaki deniz durumu tanımlanabilir sınırların ötesindedir: 15 metreyi aşan kaotik dalgalar, sürüklenen serpinti (spray) nedeniyle sıfıra inen görüş ve kıyı bölgelerinde fırtına kabarmasının (storm surge) en yüksek değerleri eyewall bölgesinde üretilir. Hiçbir ticari gemi eyewall koşullarında güvenle manevra yapamaz; tüm kaçınma stratejisinin amacı gemiyi bu halkadan mümkün olan en uzak mesafede tutmaktır.",
        bulletPoints: [
          "Eyewall = en yüksek rüzgâr + en yoğun yağış + en dik basınç gradyanı.",
          "Gözden eyewall'a geçişte rüzgâr birkaç mil içinde ~0'dan 100+ knota çıkabilir.",
          "Kuzey Yarım Küre'de en şiddetli sektör genellikle sağ-ön çeyrektir (dönel rüzgâr + ilerleme hızı).",
          "Fırtına kabarması ve en yüksek kaotik dalgalar eyewall bölgesinde üretilir.",
          "Kaçınma planlamasının tek amacı: eyewall'dan azami mesafeyi korumak.",
        ],
      },
      {
        title: "Eyewall Yenilenme Döngüsü (Eyewall Replacement Cycle)",
        content:
          "Şiddetli tropikal siklonlarda (genellikle Kategori 3 ve üzeri) sık gözlenen bir yapısal süreç, eyewall yenilenme döngüsüdür. Mevcut eyewall'un dışında, 50–100 km yarıçapta ikinci bir eş merkezli (concentric) eyewall halkası oluşur. Dış halka, iç eyewall'u besleyen nem ve momentum akışını keserek onu zayıflatır ve zamanla çökertir; ardından dış halka daralarak yeni eyewall hâline gelir. Döngü tipik olarak 12–36 saat sürer ve bu süre boyunca sistemin en yüksek rüzgâr hızı geçici olarak azalır. Ancak bu zayıflama denizciler için asla bir rahatlama işareti olarak okunmamalıdır; döngünün iki kritik operasyonel sonucu vardır. Birincisi, maksimum rüzgâr yarıçapı büyür: sistem tepe şiddetinden bir miktar kaybetse bile şiddetli rüzgâr alanı çok daha geniş bir alana yayılır, yani 'tehlikeli bölge' daralmaz, genişler. İkincisi, döngü tamamlandığında sistem sıklıkla yeniden hızla şiddetlenir. Uydu görüntülerinde gözün bulanıklaşması ve çift halka görünümü, tahmin merkezlerinin bültenlerinde 'eyewall replacement' ifadesi olarak yansır; rota planlaması yapan zabit bu ifadeyi gördüğünde CPA (en yakın geçiş mesafesi) hesabını genişleyen rüzgâr alanına göre revize etmelidir.",
        bulletPoints: [
          "Dış eş merkezli halka iç eyewall'u boğar ve onun yerini alır; döngü 12–36 saat sürer.",
          "Döngü sırasında tepe rüzgâr geçici azalır, ancak şiddetli rüzgâr alanı GENİŞLER.",
          "Döngü sonrasında sistem sıklıkla yeniden hızla şiddetlenir.",
          "Bültenlerde 'eyewall replacement' ifadesi görülünce CPA ve kaçınma mesafesi artırılmalıdır.",
        ],
      },
      {
        title: "Spiral Yağmur Bantları ve Dış Yapı",
        content:
          "Eyewall'dan dışa doğru, sistemin dönüş yönünde merkeze sarmal biçimde kıvrılan spiral yağmur bantları (spiral rain bands) uzanır. Her bant; sağanak yağış, ani rüzgâr artışları (squall), gök gürültülü fırtına ve zaman zaman hortum (waterspout/tornado) aktivitesi taşıyan konvektif bir hat gibidir. Bantlar radar ekranında merkeze kıvrılan parlak yay parçaları olarak belirir ve deneyimli bir gözlemci, bantların eğriliğinden siklon merkezinin kerterizini kabaca kestirebilir. Bantlar arasındaki koridorlarda yağış hafifler, rüzgâr nispeten düzenlenir ve gökyüzü kısmen açılabilir; bu aralıklar, kötüleşen koşullar içinde 'fırtına geçiyor' yanılgısı yaratabilir. Oysa gemi merkeze yaklaştıkça bantlar sıklaşır, aralar kısalır ve her yeni bant bir öncekinden daha şiddetli gelir. Bant geçişlerinde rüzgâr yönü ve hızı dakikalar içinde değişebileceğinden güverte operasyonları bu aldatıcı sakin aralıklara güvenilerek planlanmamalıdır. Sistemin en dış çevresinde ise yüksek bulutlar (sirüs kalkanı), giderek büyüyen uzun periyotlu soluğan ve basıncın günlük gelgit salınımını (diurnal variation) bozan düzenli düşüşü gözlenir; bunlar merkez daha yüzlerce mil uzaktayken siklonun yaklaştığını haber veren klasik erken işaretlerdir.",
        bulletPoints: [
          "Spiral bantlar: sağanak, squall ve hortum riski taşıyan konvektif hatlar.",
          "Radardaki bant eğriliği, merkezin kerterizi hakkında kaba fikir verir.",
          "Bantlar arası sakin koridorlar yanıltıcıdır; merkeze yaklaştıkça bantlar sıklaşır ve şiddetlenir.",
          "Uzak alandaki erken işaretler: sirüs kalkanı, büyüyen soluğan, basıncın diurnal ritmini bozan düşüş.",
        ],
      },
      {
        title: "Göz İçinde Deniz Durumu ve Yanıltıcı Sakinlik",
        content:
          "Gözün en sinsi tehlikesi, atmosferdeki sakinliğin denize yansımamasıdır. Rüzgâr durulsa da göz içindeki deniz, sistemin her yönünden üretilmiş dalgaların merkeze yakınsamasıyla oluşan tam anlamıyla kaotik bir 'çapraz deniz' (confused/pyramidal sea) durumundadır. Farklı yönlerden gelen dalga dizileri üst üste binerek piramit biçimli, dik ve öngörülemeyen dalgalar üretir; dalga yönünü kestirmek imkânsızdır çünkü dalgaları düzenleyecek rüzgâr yoktur. Bu koşullar geminin yalpa ve baş-kıç vurma hareketlerini senkronize olmayan, tahmin edilemeyen bir biçime sokar; parametrik yalpa dahil tehlikeli dinamik stabilite olayları için elverişli ortam oluşur. Tarihte pek çok gemi, rüzgârın kesilmesini fırtınanın bittiği sanarak göz içinde yara almış ya da fırtınanın ikinci yarısına hazırlıksız yakalanmıştır. Kritik gerçek şudur: göz geçişi sırasında rüzgâr, girmeden önceki yönün TERSİNDEN geri döner. Gözün çapı 30 km ve sistemin ilerleme hızı 15 knot ise sakin dönem yalnızca 30–60 dakika sürebilir; ardından karşı taraftaki eyewall, hiçbir kademeli artış olmaksızın tam şiddetle gelir. Barometre bu geçişte en düşük değerini okur; en düşük okuma 'merkez üzerimizde' demektir, 'tehlike geçti' demek değildir.",
        bulletPoints: [
          "Göz içinde deniz: her yönden yakınsayan dalgalarla piramidal/kaotik çapraz deniz.",
          "Rüzgâr olmadığından dalga düzeni yoktur; yalpa/baş-kıç hareketleri öngörülemez hâle gelir.",
          "Sakin dönem çoğunlukla 30–60 dakikadır; rüzgâr TERS yönden tam şiddetle geri döner.",
          "Barometrenin en düşük okuması merkez geçişini gösterir; tehlikenin bittiğini DEĞİL.",
        ],
      },
      {
        title: "Gözden Geçen Gemi: Köprüüstü Kararları",
        content:
          "Hiçbir kaçınma planı gözü hedeflemez; göz asla bir 'sığınak' değildir ve gemiyi göz içine sokmak, onu iki kez eyewall'dan geçirmek anlamına gelir. Ancak kaçınma manevrası geç kalmış ve gemi kendini göz içinde bulmuşsa, köprüüstünün bu kısa ve kritik zaman penceresini disiplinle kullanması gerekir. Öncelik sıralaması şöyledir: (1) Mevki, rüzgârın yeniden geleceği yön ve manevra planı güncellenir — çıkışta rüzgâr, girişteki yönün tersinden geleceği için gemi buna göre konumlandırılır; hedef, geminin seyir yapılabilir yarım daireye geçişini kolaylaştıracak rotadır. (2) Makine dairesi tam güç ve ani manevra ihtiyacına karşı uyarılır; yakıt devirdaim ve balast durumu kontrol edilir. (3) Kısa hasar değerlendirmesi yapılır; ancak kaotik deniz sürerken güverteye personel çıkarmak son derece risklidir ve ancak hayati bir emniyet gerekçesiyle, tam koruyucu donanım ve irtibat hattıyla düşünülebilir. (4) VHF/uydu üzerinden durum raporu ve gerekiyorsa SOLAS V/31 kapsamında tehlike hava raporu iletilir; göz içinden yapılan basınç ve konum gözlemi, tahmin merkezleri için istisnai değerde veridir. (5) Serdümen ve vardiya ekibi, çıkıştaki ani rüzgâr yüklenmesine karşı brife edilir. Radar bu süreçte hayati bir araçtır: eyewall, ekranda gözü çevreleyen yoğun eko halkası olarak izlenir; halkanın hareketi, merkezin ilerleme yönünü ve geminin göreli konumunu doğrudan gösterir.",
        bulletPoints: [
          "Göz bir sığınak DEĞİLDİR; göz geçişi eyewall'dan iki kez geçmek demektir.",
          "Çıkışta rüzgâr ters yönden geleceği için manevra planı sakin pencere içinde hazırlanır.",
          "Kaotik deniz sürerken güverteye personel çıkarmak ancak hayati gerekçeyle düşünülür.",
          "Göz içi basınç/konum raporu (SOLAS V/31) tahmin merkezleri için istisnai değerdedir.",
          "Radardaki eyewall eko halkası, merkezin hareketini ve geminin göreli konumunu izlemenin en pratik yoludur.",
        ],
      },
    ],
    keyPoints: [
      "Göz; çöken havanın adyabatik ısınmasıyla oluşan açık, sakin ve sıcak çekirdekli merkezdir — sakinliği geçici ve yanıltıcıdır.",
      "En düşük basınç gözde, en şiddetli rüzgâr ve yağış onu saran eyewall'dadır; geçiş birkaç mil içinde gerçekleşir.",
      "Küçük ve keskin göz şiddetli sistem işaretidir; belirgin gözün oluşması sistemin güçlendiğini gösterir.",
      "Eyewall yenilenme döngüsünde tepe rüzgâr geçici azalır ama şiddetli rüzgâr alanı genişler; kaçınma mesafesi artırılmalıdır.",
      "Göz içinde rüzgâr ~30–60 dakika durulur, deniz kaotik kalır ve rüzgâr ters yönden tam şiddetle geri döner.",
      "Göz asla sığınak değildir; tüm strateji eyewall'dan azami mesafeyi korumaya dayanır.",
    ],
  },

  "Tehlikeli/seyir yapılabilir yarım daire": {
    title: "Tehlikeli ve Seyir Yapılabilir Yarım Daire",
    introduction:
      "Tropikal siklonun hareket yönüne göre iki yarısı farklı risk seviyelerine sahiptir. Bu yarım daire kavramı, geminin siklona göre konumunu belirlemesini ve doğru kaçınma manevrası seçmesini sağlar. Yanlış yarım daire tespiti, gemiyi siklonun en şiddetli sektörüne sürükleyebilir.",
    sections: [
      {
        title: "Yarım Daire Tanımı",
        content:
          "Bir tropikal siklon hem döner hem de bir bütün olarak **ilerler**; bu iki hareketin toplandığı yarı, ayrıldığı yarıdan çok daha tehlikelidir.\n\n**Tehlikeli yarım daire (dangerous semicircle):** Kuzey yarımkürede siklonun **hareket yönünün sağı**. Burada dönel rüzgâra sistemin **ilerleme hızı eklenir** (toplam rüzgâr artar) ve rüzgâr, gemiyi siklonun **önündeki yola** doğru sürükler — yani merkeze bastırır. (Güney yarımkürede sol taraftır.)\n\n**Seyir yapılabilir yarım daire (navigable semicircle):** Kuzeyde **sol** taraf. Dönel rüzgârdan ilerleme hızı **çıkar** (net rüzgâr düşer) ve rüzgâr gemiyi siklonun **gerisine, yolundan uzağa** iter.\n\n**Worked örnek:** Dönel rüzgârı 60 kn, ilerleme hızı 15 kn bir siklonda tehlikeli yarıda yaklaşık **60 + 15 = 75 kn**, seyredilebilir yarıda **60 − 15 = 45 kn** hissedilir — aynı sistem, iki yanı arasında 30 kn fark. En kötü sektör **sağ-ön çeyrektir**.\n\n**Gemide önemi:** Hangi yarıda olduğunuzu erken bilmek kaçınma manevrasının yönünü belirler; yanlış tespit gemiyi en şiddetli sektöre sürükler.",
      },
      {
        title: "Konum Belirleme Yöntemleri",
        content:
          "Hangi yarım dairede olduğunuz, **rüzgâr yönünün zamanla nasıl değiştiğine** bakılarak bulunur (gemi sabit varsayımıyla):\n\n- **Rüzgâr saat yönünde dönüyorsa (veering)** → Kuzey yarımkürede **tehlikeli** yarım dairedesiniz.\n- **Rüzgâr saat tersine dönüyorsa (backing)** → **seyredilebilir** yarım dairedesiniz.\n- **Rüzgâr yönü sabit ama hız artıyor + basınç hızla düşüyorsa** → siklonun **yolunun tam üzerindesiniz** (en tehlikeli durum).\n\n**Buys Ballot ile merkez:** Kuzey yarımkürede rüzgârı sırtınıza alın; alçak basınç merkezi **solunuzda ve biraz önünüzde** (~100-125°) kalır. Böylece rüzgâr yönünden merkezin kabaca kerterizini çıkarırsınız.\n\n**Doğrulama:** Rüzgâr trendi + barometre trendi + swell yönü birlikte okunur; üçü tutarlıysa konum tahmini güvenilirdir.\n\n**Gemide önemi:** Bu tespit tek anlık gözlemle değil, **saatlik rüzgâr/basınç kaydının trendiyle** yapılır; tek okuma yanıltır.",
      },
      {
        title: "Kaçınma Stratejisi",
        content:
          "Kaçınma yönü, bulunduğunuz yarım daireye göre değişir (Kuzey yarımküre):\n\n- **Tehlikeli yarım dairede:** Rüzgârı **sancak baş omuzluğuna** alıp mümkün olan en iyi hızla uzaklaşın (rüzgâr veer ederken bu açıyı koruyun); amaç merkezden ve önündeki yoldan açılmaktır.\n- **Seyredilebilir yarım dairede:** Rüzgârı **sancak kıç omuzluğundan** alıp siklonun gerisine geçin.\n- **Tam yol üzerinde:** Rüzgârı sancak kıç omuzluğuna alıp **seyredilebilir (sol) yarıya** geçmeye çalışın, en yüksek pratik hızla.\n\n(Güney yarımkürede bu açılar iskele tarafına aynalanır.)\n\n**Zamanlama:** Manevranın etkinliği tümüyle **erken karara** bağlıdır; erken dönen gemi geniş manevra alanı bulur. Siklonun öngörülen yön/hızı ve gemi mevkisi sürekli güncellenir. 'Bekleyip görelim' en tehlikeli seçimdir — tropikal sistemde mesafe = emniyettir ve mesafe ancak erken hareketle kazanılır.",
        formula: {
          text: "1-2-3 Kuralı (emniyet yarıçapı): 24 saat → 100 NM, 48 saat → 200 NM, 72 saat → 300 NM",
          description:
            "Tahmini merkez konumunun etrafına bırakılan hata payı; CPA (en yakın geçiş mesafesi) bu yarıçapların dışında kalacak şekilde rota planlanır.",
        },
      },
    ],
    keyPoints: [
      "Tehlikeli yarım dairede translasyon + dönel rüzgâr birleşir; toplam rüzgâr artar.",
      "Rüzgâr yönü değişimi (veering/backing) yarım daire tespitinde temel göstergedir.",
      "Buys Ballot kuralı siklon merkezinin yönünü bulmada yardımcıdır.",
      "Erken kaçınma manevrası en etkili koruma yöntemidir.",
    ],
  },

  "Barometre ve rüzgarla konum tayini": {
    title: "Barometre ve Rüzgârla Konum Tayini",
    introduction:
      "Fırtına ve siklon durumlarında, geminin meteorolojik sisteme göre nispi konumunu belirlemek için barometre okumaları ve rüzgâr gözlemleri birlikte kullanılır. Bu yöntem, elektronik hava verilerinin ulaşmadığı veya güvenilirliğinin sorgulandığı durumlarda hayati bir yedek karar aracıdır.",
    sections: [
      {
        title: "Barometre Trend Analizi",
        content:
          "Elektronik hava verisi kesildiğinde veya güvenilmez olduğunda, **barometre + rüzgâr gözlemi** geminin fırtına sistemine göre yerini bulmanın yedek yöntemidir. Barometrede belirleyici olan anlık değer değil, **değişim hızıdır**.\n\n**Eşikler:** Normal günlük (diurnal) salınım ~1-2 hPa'dır; bunu **aşan** düzenli bir düşüş sistem habercisidir. **Saatte ≥ 1-2 hPa** düşüş yaklaşan ciddi bir alçak/siklon demektir.\n\n**En düşük okuma = en yakın geçiş:** Basınç düşerken sistem yaklaşır; **en düşük değer** merkezin en yakın noktadan geçtiği andır, ardından yükselir. Düşüş ve yükseliş sürelerinin karşılaştırılması sistemin geçiş hızı ve büyüklüğü hakkında fikir verir.\n\n**Gemide önemi:** Tropik kuşakta basınç normalde günde iki kez (~10 ve ~22 UTC tepe, ~04 ve ~16 dip) salınır; bu **diurnal ritmin belirgin biçimde bozulması**, uzaktaki bir tropik sistemin ilk sayısal işaretidir. Bu yüzden okuma daima düzeltilmiş ve ritim tanınmış olmalıdır.",
      },
      {
        title: "Rüzgâr Yönü ile Konum Belirleme",
        content:
          "**Buys Ballot kuralı** basit ama güçlüdür: Kuzey yarımkürede rüzgârı **sırtınıza** aldığınızda alçak basınç merkezi **solunuzda** (açık denizde ~90-125°) kalır; güney yarımkürede aynadır (sağınızda).\n\n**Merkezin kerterizi:** Bu kuralla rüzgâr yönünden merkezin kaba **kerterizini** çıkarırsınız. İki farklı zamanda alınan iki kerterizin **kesişimi**, merkezin konumunu ve rüzgâr trendiyle birlikte hareket yönünü verir.\n\n**Yaklaşıyor mu, uzaklaşıyor mu?** Rüzgâr **hızı artıyor + basınç düşüyorsa** sistem yaklaşıyor; rüzgâr **azalıyor + basınç yükseliyorsa** uzaklaşıyordur. Rüzgâr yönü **saat yönünde dönüyorsa (veering)** tehlikeli yarımdadasınız, **tersine (backing)** ise seyredilebilir yarımda.\n\n**Gemide önemi:** Bu üç gözlem — basınç, rüzgâr hızı, rüzgâr yön trendi — birlikte, hiçbir elektronik veri olmadan bile geminin sisteme göre konumunu ve kaçınma yönünü belirlemeye yeter; klasik denizciliğin can simididir.",
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "**Kayıt disiplini:** Vardiya zabiti saatlik (fırtına yakınında daha sık) barometre ve rüzgâr yön/hız kaydı tutar; bu veriler grafiğe dökülünce eğilim çıplak gözle görünür. Kaptan brifinglerinde trend sapmaları özellikle vurgulanır.\n\n**Doğrulama:** Elle çıkarılan konum tahmini, ulaşılabiliyorsa synoptik harita ve tropik bültenlerle **çapraz kontrol** edilir; ikisi çelişirse ihtiyatlı olan (daha erken kaçınma) tercih edilir.\n\n**Alet güvenilirliği:** Aneroid barometrenin **yükseklik ve alet düzeltmesi** doğrulanmış olmalıdır; kalibrasyonu kaymış bir barometrenin trendi de yanıltır. Barograf kaydı, trendin biçimini (hızlanma) okumanın en iyi yoludur.\n\n**Gemide önemi:** SOLAS V, gemilerin meteorolojik gözlem yapmasını ve tehlikeli hava bilgisini paylaşmasını öngörür; saatlik kaydınız hem kendi emniyetiniz hem de bölgedeki diğer gemiler ve tahmin merkezleri için değerli veridir.",
      },
    ],
    keyPoints: [
      "Barometre trendi anlık okumadan çok daha değerli operasyonel bilgidir.",
      "Buys Ballot kuralı ile alçak basınç merkezinin yönü belirlenebilir.",
      "Rüzgâr yönü değişim trendi (veering/backing) konumlama için kritiktir.",
      "Saatlik kayıt disiplini ve grafik takip standart prosedür olmalıdır.",
    ],
  },

  "Kaçınma manevrası prensipleri": {
    title: "Kaçınma Manevrası Prensipleri",
    introduction:
      "Tropikal siklon veya şiddetli fırtına karşısında doğru kaçınma manevrası, gemi ve mürettebat emniyetinin en kritik savunma hattıdır. Kaçınma stratejisi; siklonun konumuna, hareketine, geminin mevkiine ve performansına bağlı olarak belirlenmelidir.",
    sections: [
      {
        title: "Genel Prensipler",
        content:
          "Kaçınma manevrasının temel amacı, gemiyi siklonun en şiddetli bölgesinden **azami mesafede** tutmaktır; taktik ayrıntıdan önce gelen ilke **erken karardır**.\n\n**Erkenin değeri:** Siklondan 250 NM uzaktayken alınan 20°'lik bir kurs değişikliği, saatler içinde on millerce yanal açıklık kazandırır; aynı karar 50 NM mesafede alınırsa hem açıklık küçük kalır hem de gemi zaten şiddetli deniz içindedir ve manevra kabiliyeti düşmüştür. Mesafe ancak zamanla (erken kararla) satın alınır.\n\n**Planın girdileri:** Siklonun **öngörülen yolu (forecast track)**, **belirsizlik konisi (uncertainty cone)**, ilerleme hızı ve geminin gerçekçi (ağır havada azalan) hızı birlikte kullanılır. Rota, tahmini merkezin etrafındaki 1-2-3 emniyet yarıçapının (24s→100, 48s→200, 72s→300 NM) dışında kalacak biçimde kurulur.\n\n**Gemide önemi:** Tropikal sistemde 'bekle-gör' en pahalı seçimdir; her ertelenen saat, kazanılabilecek mesafeyi ve manevra seçeneklerini azaltır.",
      },
      {
        title: "Yarım Daireye Göre Manevra",
        content:
          "Manevra yönü, geminin hangi yarım dairede olduğuna bağlıdır (Kuzey yarımküre; güneyde iskeleye aynalanır):\n\n- **Tehlikeli yarım dairede:** Rüzgârı **sancak baş omuzluğuna** al, en yüksek **emniyetli** hızla siklondan aç; rüzgâr veer ederken bu açı korunur.\n- **Seyredilebilir yarım dairede:** Rüzgârı **sancak kıç omuzluğundan** alıp siklonun gerisine geç.\n- **Tam yol üzerinde:** Rüzgârı sancak kıç omuzluğuna alıp **seyredilebilir (sol) yarıya** kaç, azami pratik hızla.\n\n**Hız-emniyet dengesi:** 'En yüksek hız' değil, **en yüksek emniyetli hız** esastır. Aşırı hız baş denizde **slamming**, tekne kızaklarında aşırı yük ve yapısal hasar üretir; bazen doğru karar dalga yükünü azaltmak için **hızı düşürüp rota tutmaktır**. Deniz durumu, yük emniyeti ve makine kapasitesi sınırları gözetilir.\n\n**Gemide önemi:** Yanlış yarım daire tespiti gemiyi en kötü sektöre sürükler; manevra yönü rüzgâr trendi (veer/back) + Buys Ballot ile sürekli doğrulanır.",
      },
      {
        title: "BRM ve Ekip Koordinasyonu",
        content:
          "Kaçınma manevrası bireysel değil, **köprüüstü ekip** işidir (Bridge Resource Management). Kaptan kararı verir; ama vardiya zabiti, ikinci kaptan ve serdümenin durumsal farkındalığı sürekli tutulur — herkes 'neden bu rotadayız'ı bilmelidir.\n\n**Rol dağılımı:**\n- **Makine dairesi:** düşük devir ve tam güç taleplerine, ani manevraya hazır; yakıt devirdaim ve balast durumu kontrol edilir.\n- **Güverte:** dış kapak, lumbuz, hava firar ve **yük bağlamaları (lashing)** emniyete alınır; can emniyeti donanımı gözden geçirilir.\n- **Köprüüstü:** mevki ve siklonun yeri radar, AIS ve GPS ile sürekli teyit edilir; plan gerektiğinde güncellenir.\n\n**Kontrol listeleri:** Şirketin **heavy weather checklist**'i uygulanır; stres altında en çok atlanan adımlar (küçük ambar kapakları, personel hareket kısıtı, sabitlenmemiş ekipman) böylece unutulmaz.\n\n**Gemide önemi:** İyi BRM, tek kişinin hatasının kazaya dönüşmesini engeller; ağır havada iletişim kapalı-döngü (closed-loop) teyitle yürütülür.",
      },
    ],
    keyPoints: [
      "Erken kaçınma kararı en etkili koruma yöntemidir.",
      "Manevra stratejisi yarım daire konumuna göre belirlenir.",
      "Siklonun yolu ve belirsizlik konisi sürekli güncellenmelidir.",
      "BRM prensibiyle ekip koordinasyonu sağlanmalıdır.",
    ],
  },

  "Sis oluşum türleri": {
    title: "Sis Oluşum Türleri",
    introduction:
      "Sis, görüşün 1000 metrenin altına düşmesine neden olan, yüzeye yakın su damlacıklarından oluşan bir hava olayıdır. Denizde sis, çatışma riskinin en önemli nedenlerinden biridir. Sis türünü tanımak, süresini ve şiddetini öngörmeye yardımcı olarak köprüüstünde proaktif emniyet tedbirleri alınmasını sağlar.",
    sections: [
      {
        title: "Adveksiyon Sisi",
        content:
          "**Adveksiyon sisi**, sıcak-nemli havanın **soğuk bir yüzey üzerinden yatay hareketiyle** oluşur; hava alttan soğuyup çiğ noktasına inince yoğuşur. Denizcinin en sık ve en tehlikeli karşılaştığı sis türüdür.\n\n**Tipik senaryo:** Sıcak-nemli **mT** hava kütlesinin soğuk bir akıntı üzerinden geçmesi — Grand Banks (Labrador soğuk akıntısı), Japonya kuzey kıyıları (Oyashio), Kaliforniya kıyısı gibi. Bu yüzden soğuk-sıcak akıntı sınırları klasik sis kuşaklarıdır.\n\n**Ayırt edici özellikler:** 5-15 kn rüzgârda nem sürekli beslendiğinden **yoğun, geniş ve kalıcı** olur — gece-gündüz farkı gözetmez, **günlerce** sürebilir; kalınlığı birkaç yüz metreden 1-2 km'ye çıkar (yüksek köprüden bile üstü görülmez).\n\n**Erken işaret ve gemide önemi:** **Hava sıcaklığının deniz sıcaklığına (SST) yaklaşması ve çiğ noktası farkının küçülmesi** adveksiyon sisinin habercisidir; bu fark izlenerek sis, görüş düşmeden önce öngörülür.",
      },
      {
        title: "Radyasyon Sisi",
        content:
          "**Radyasyon sisi**, gece yüzeyin **radyasyonla soğuması** sonucu, yüzeye yakın hava katmanının çiğ noktasına inmesiyle oluşur. Esasen **karasal** bir olaydır (deniz geceleri fazla soğumaz), ama liman ve kıyı yakınında gemileri etkiler ve nehir/haliç ağızlarından denize taşınabilir.\n\n**Oluşum koşulları:** **Sakin, açık (bulutsuz) gece** + **çok hafif rüzgâr** (1-2 m/s). Rüzgâr yoksa çiy oluşur, sis oluşmaz; rüzgâr fazlaysa karışım sisi dağıtır — sadece dar bir 'hafif rüzgâr penceresi' sis üretir. Yüksek basınç (antisiklon) egemenliğinde tipiktir.\n\n**Ayırt edici özellikler:** Kalınlığı sınırlı (~100-300 m); gün doğup yüzey ısınınca genellikle **2-4 saatte çözülür**; yüksek köprü yapılarından üzeri görülebilir.\n\n**Gemide önemi:** Liman yaklaşımında sabahın erken saatlerinde radyasyon sisi beklenir; ETA bu çözülme saatine göre planlanabilir, ama sisin kalkacağına güvenip kör girmek yerine tedbir (radar, düşük hız) esastır.",
      },
      {
        title: "Buharlaşma Sisi ve Diğer Türler",
        content:
          "**Buharlaşma sisi (sea smoke / steam fog):** **Soğuk havanın sıcak su üzerinden** geçmesiyle oluşur — adveksiyonun tersi. Sıcak sudan buharlaşan nem, üstteki çok soğuk havada hemen yoğuşur ve deniz yüzeyinden yükselen buhar sütunları görünümü verir. Arktik sularda ve kışın iç denizlerde (soğuk hava dalgasında) tipiktir; kalınlığı sınırlı ama görüşü ciddi düşürür.\n\n**Frontal (cephe) sisi:** Sıcak cephe önünde, **ılık yağmurun altındaki soğuk havaya düşüp buharlaşması ve yoğuşmasıyla** oluşur; cephe hattı boyunca dar bir bantta görülür.\n\n**Orografik sis:** Nemli havanın bir **yükseltiye (ada, yarımada, sahil sırtı) çarpıp yükselerek soğumasıyla** oluşur; liman yaklaşımlarında ve dağlık kıyılarda karşılaşılır.\n\n**Gemide önemi:** Sis türünü tanımak süresini kestirmeyi sağlar — adveksiyon 'günlerce', radyasyon 'öğleye kadar', buharlaşma 'hava ısınınca' der. Süre tahmini, beklemek mi yoksa kısıtlı görüşte ilerlemek mi kararını besler.",
      },
      {
        title: "Köprüüstü Tedbirleri",
        content:
          "Sis (veya sis beklentisi) belirdiğinde **COLREG Kural 19 (kısıtlı görüşte seyir)** devreye girer ve tedbirler **görüş fiilen düşmeden önce** başlatılır:\n\n- **Emniyetli hız** (Kural 6) yeniden hesaplanıp düşürülür; makine manevraya hazır tutulur.\n- **Radar** koşula göre optimize edilir (gain, sea/rain clutter); ARPA ile CPA/TCPA izlenir.\n- **Ek gözcü** görevlendirilir; ses işaretleri (Kural 35) başlatılır; seyir fenerleri yakılır.\n- Kaptan bilgilendirilir; VTS/trafik bölgesinde iletişim artırılır.\n\n**Proaktif tetik:** Görüşün düşmesini beklemeyin; **hava sıcaklığı − çiğ noktası farkı** küçülüp SST'ye yaklaşıyorsa sis riski yüksektir. Bu üç değeri (SST, hava sıcaklığı, çiğ noktası) düzenli izlemek, sisi önceden görmenin sayısal yoludur.\n\n**Gemide önemi:** Kısıtlı görüş kazalarının çoğu 'geç tedbir'dendir; meteorolojik gösterge sisi işaret ettiğinde tedbir alınırsa gemi sise hazır girer.",
      },
    ],
    keyPoints: [
      "Adveksiyon sisi en yaygın deniz sisi türüdür; günlerce sürebilir.",
      "Radyasyon sisi karasal kökenlidir, güneşle çözülür; liman yakınlarını etkiler.",
      "Buharlaşma sisi soğuk hava-sıcak su etkileşiminde oluşur.",
      "Sis tedbirleri, görüş düşmeden önce meteorolojik göstergelere göre başlatılmalıdır.",
    ],
  },

  "Görüş sınıflandırması": {
    title: "Görüş Sınıflandırması",
    introduction:
      "Görüş mesafesi, deniz emniyetinde hız seçimi, çatışmadan kaçınma ve seyir planlaması kararlarını doğrudan etkileyen temel bir parametredir. Görüşün standart bir ölçek üzerinden sınıflandırılması, vardiya kayıtlarında ve raporlamalarda tutarlılık sağlar.",
    sections: [
      {
        title: "Meteorolojik Görüş Sınıfları",
        content:
          "Görüş, hava koşullarının seyre etkisini standart bir dille ifade eder. **WMO/IMO** ölçeği kabaca şöyledir:\n\n- **0-200 m:** yoğun sis (dense fog)\n- **200-500 m:** kalın sis (thick fog)\n- **500-1000 m:** sis (fog)\n- **1-2 km:** hafif sis (mist)\n- **2-5 km:** pus (haze)\n- **5-10 km:** orta görüş\n- **>10 km:** iyi görüş\n\n**COLREG'de eşik yoktur:** Görüşün 'kısıtlı (restricted)' sayılması için COLREG **sabit bir sayı vermez**; değerlendirme gemi tipine, hızına, trafik yoğunluğuna ve koşullara göre **zabitin takdirindedir**. Genel uygulamada **3-5 NM'nin altı** kısıtlı kabul edilir, ama yoğun trafikte daha geniş görüş bile 'kısıtlı' gibi yönetilebilir.\n\n**Gemide önemi:** Kısıtlı görüş bir 'an' değil bir 'karardır'; zabit bu kararı verdiği anda Kural 19 prosedürleri (hız, ses, gözcü, radar) başlar ve jurnale işlenir.",
      },
      {
        title: "Görüş Ölçümü ve Güçlükleri",
        content:
          "Denizde görüş çoğunlukla **gözle tahmin** edilir: bilinen mesafedeki nesneler (görülen/kaybolan gemiler, yapılar, **deniz ufku**) referans alınır. Ufuk çizgisinin seçilebildiği mesafe, göz yüksekliğine bağlı bir üst sınır verir.\n\n**Güçlükler:** Gece ve yağışta tahmin zorlaşır; ışıkların 'loom'u (haleleşmesi) yanıltır. Alçak açıda parlayan güneş veya sis içindeki parlaklık, görüşü olduğundan iyi/kötü gösterebilir. **Radar menzili ≠ optik görüş** — radar siste hedef görürken göz görmez.\n\n**Sensör sınırı:** Bazı gemilerde optik **görüş ölçer (visibility sensor)** vardır ama tek bir noktada örnekler ve **seyir yönündeki** koşulu tam yansıtmaz. Bu yüzden enstrüman verisi ile görsel gözlem **birlikte** değerlendirilir.\n\n**Gemide önemi:** Görüş hızla değişir (sis bankları); tek ölçüm değil **sürekli gözlem** esastır ve en kötü görülen değere göre tedbir alınır.",
      },
      {
        title: "Operasyonel Kararlar",
        content:
          "Görüş sınıfı; **hız, radar kullanımı, gözcü ve ses işareti** kararlarını doğrudan belirler. Görüş azaldıkça emniyetli hız düşürülür, radar/ARPA plotting sıklığı artar, ek gözcü konuşlandırılır ve durum jurnale işlenir.\n\n**Yüksek riskli alanlar:** Yoğun trafik ve **TSS (trafik ayırım düzeni)** bölgelerinde kısıtlı görüş riski **katlar**; bu alanlarda **VTS** ile iletişim artırılır, hız daha da ihtiyatlı seçilir ve manevra alanı önden planlanır.\n\n**Emniyetli hız ilkesi:** Kural 6'ya göre hız, 'görülen mesafe içinde durabilecek/kaçınabilecek' şekilde seçilir; kısıtlı görüşte bu çoğu zaman belirgin bir yavaşlama demektir. Radar kapsamı, hava/deniz durumu ve manevra kabiliyeti de hesaba katılır.\n\n**Gemide önemi:** Görüş tek başına değil, **trafik + su alanı + hız** ile birlikte değerlendirilir; 'iyi radarım var' hız düşürmemenin gerekçesi değildir — radar da sınırlıdır (kör sektör, küçük hedef).",
      },
    ],
    keyPoints: [
      "COLREG'de kısıtlı görüş için sabit bir eşik yoktur; değerlendirme koşullara bağlıdır.",
      "Genel uygulamada 3–5 deniz milinden az görüş kısıtlı kabul edilir.",
      "Enstrüman verisi ve görsel gözlem birlikte kullanılmalıdır.",
      "Kısıtlı görüşte hız, radar plotting sıklığı ve gözcü düzenlemesi gözden geçirilmelidir.",
    ],
  },

  "Kısıtlı görüşte seyir kuralları": {
    title: "Kısıtlı Görüşte Seyir Kuralları",
    introduction:
      "COLREG Kural 19, kısıtlı görüş koşullarında seyir eden gemiler için özel kurallar belirler. Bu kurallar, görsel temas olmadan çatışmadan kaçınmayı düzenler ve radar/AIS kullanımını ön plana çıkarır. Kısıtlı görüşte meydana gelen deniz kazalarının büyük çoğunluğu, bu kuralların yetersiz uygulanmasından kaynaklanır.",
    sections: [
      {
        title: "COLREG Kural 19 Temel İlkeleri",
        content:
          "**Kural 19**, birbirini **görmeyen** gemiler için geçerlidir (görüş içindeyken Kural 11-18 geçer). Tek başına işlemez; görüşten bağımsız kurallarla birlikte uygulanır: **Kural 5 (gözcü)**, **Kural 6 (emniyetli hız)**, **Kural 7 (çatışma riski tayini)**.\n\n**Temel gereklilikler:**\n- Her gemi **emniyetli hızda** seyreder; makineler **hemen manevraya hazır** tutulur.\n- **Yalnızca radarla** saptanan bir gemiyle çatışma riski varsa **erkenden ve belirgin** manevra yapılır.\n- Pruvasında bir geminin sis işaretini duyan ya da yakın karşılaşmayı önleyemeyen gemi **asgari hıza** iner; gerekirse **tümüyle durur**.\n\n**En kritik ilke:** Kısıtlı görüşte **'yol verme / yol tutma' (give-way/stand-on) ayrımı YOKTUR**; hiçbir gemi 'benim yolum var' diyemez. Her gemi kendi emniyetinden sorumludur ve gereğinde manevra eder.\n\n**Gemide önemi:** Bu ilke kavranmadan yapılan 'karşıdaki bana yol verir' beklentisi, kısıtlı görüş çarpışmalarının klasik nedenidir.",
      },
      {
        title: "Manevra Kısıtlamaları",
        content:
          "Kural 19(d), **yalnızca radarla** saptanan ve çatışma riski taşıyan bir hedefe karşı yapılacak manevraları sınırlar; amaç, radar görüntüsündeki belirsizlikte **yanlış tarafa dönmeyi** önlemektir:\n\n- **Kemere önünde (baş omuzlukta) olan hedefe** karşı — geçilen/geçen durumu dışında — **iskeleye dümen kırmaktan kaçının** (genelde sancağa dönün).\n- **Kemere veya kıçta olan hedefe** karşı **kıça doğru dönüşten kaçının** (hedefe doğru dönmeyin).\n\n**Neden:** Radarda hedefin niyeti/aspekti belirsizdir; bu iki kısıtlama, iki geminin aynı anda ters yöne dönüp kafa kafaya gelme olasılığını azaltır.\n\n**Her zaman geçerli seçenek — hız:** Hız azaltmak veya **tam durmak (all stop)** her koşulda yasaldır ve çoğu zaman en emniyetli manevradır; dönüş belirsizse önce hızı kes.\n\n**Gemide önemi:** Bu kısıtlamalar 'ezber' değil; ARPA'da CPA/TCPA ile birlikte, **erken ve belirgin (büyük)** bir manevrayla uygulanır — küçük, tereddütlü dümen değişimi karşı gemide okunmaz.",
      },
      {
        title: "Ses İşaretleri ve Ek Tedbirler",
        content:
          "**Kural 35**, kısıtlı görüşte ses işaretlerini zorunlu kılar (birbirini görmeyen gemiler için):\n\n- **Makineyle yol yapan gemi:** her 2 dakikada **1 uzun** düdük.\n- **Makinesi çalışır ama yol yapmayan (durgun) gemi:** her 2 dakikada **2 uzun** düdük (arası ~2 sn).\n- **Manevra kabiliyeti kısıtlı, kumandadan aciz, draftı kısıtlı, yelkenli, balıkçı, çeken/çekilen:** her 2 dakikada **1 uzun + 2 kısa**.\n- **Demirli gemi:** her dakika ~5 sn **hızlı çan**; >100 m'de baş çanı + kıç **gong**. Yaklaşana uyarı için 1 kısa-1 uzun-1 kısa verebilir.\n- **Karaya oturmuş gemi:** çan öncesi ve sonrası 3 ayrı, belirgin çan vuruşu.\n\n**Ek tedbirler:** Tüm **seyir fenerleri** yakılır, **AIS** durumu/statüsü kontrol edilir, gerekirse VHF ile uyarı yapılır, **VTS**'e uyulur.\n\n**Gemide önemi:** Ses işaretinin **zamanında ve doğru tipte** verilmesi hem emniyet hem **hukuki** yükümlülüktür; kaza soruşturmasında 'işaret verilmedi' ağır kusurdur. İşaretler ayrıca görülemeyen bir geminin varlığını ve türünü haber verir.",
      },
    ],
    keyPoints: [
      "Kısıtlı görüşte yol verme yükümlülüğü kavramı yoktur; her gemi kendi güvenliğinden sorumludur.",
      "İskele baş omuzluktaki hedefe iskeleye dönüş; kıçtaki hedefe kıça dönüş yapılmamalıdır.",
      "Ses işaretleri COLREG Kural 35'e göre zorunludur ve zamanında başlatılmalıdır.",
      "Hız azaltma her zaman geçerli bir manevra seçeneğidir.",
    ],
  },

  "Radar ve ses işaretleri": {
    title: "Radar ve Ses İşaretleri",
    introduction:
      "Kısıtlı görüş koşullarında radar ve ses işaretleri, çatışmadan kaçınmanın iki temel aracıdır. Radar hedef tespiti ve takibi sağlarken, ses işaretleri yakın mesafede konumsal farkındalık ve uyarı fonksiyonu görür. Bu iki aracın etkili kullanımı, kısıtlı görüşte emniyet seviyesini doğrudan belirler.",
    sections: [
      {
        title: "Radar Kullanımı ve Ayarlar",
        content:
          "Kısıtlı görüşte radar **birincil** hedef tespit aracıdır; ama ancak doğru ayarla işe yarar.\n\n**Ayarlar:** **Gain** (kazanç), **sea clutter** (deniz eko bastırma) ve **rain clutter** koşula göre elle optimize edilir. **Aşırı gain** küçük hedefi clutter'da boğar; **düşük gain** hedefi kaçırır. Ayarlar 'kur-unut' değildir; deniz/yağış değiştikçe elden geçirilir.\n\n**İki bant birlikte:** Mümkünse **X-band** (küçük hedef ve çözünürlük iyi) ve **S-band** (yağış clutter'ından az etkilenir, uzun menzil) **birlikte** kullanılır.\n\n**ARPA:** Tüm hedefler için **CPA (en yakın geçiş mesafesi)** ve **TCPA (kalan süre)** hesaplanır; kritik eşikler (tipik **CPA < 1-2 NM**) alarma bağlanır. Ama ARPA yalnızca 'takip edilen' hedefi hesaplar; plotting disiplini şarttır.\n\n**Gemide önemi:** Radar 'gördüm' demek 'güvendeyim' demek değildir; hedefin gerçek rotası ancak **ardışık plotting / ARPA vektörüyle** çıkar — tek bakış (özellikle kendi geminiz dönerken) aldatır.",
      },
      {
        title: "Radar Kör Sektörleri ve Sınırlamalar",
        content:
          "Radar her şeyi görmez; sınırları bilinmeden güvenilmez.\n\n**Kör sektörler:** Baca, direk, vinç, konteyner istifi gibi yapılar radar arkasında **kör sektörler** yaratır; bunlar köprüüstünde **işaretli** olmalı ve zabit tarafından bilinmelidir. Kör sektörde hedef görünmez — telafi için ikinci radar, **AIS** ve **gözcü** kullanılır; gerekirse periyodik olarak hafif kurs değişimiyle sektör taranır.\n\n**Küçük/zayıf hedefler:** Ahşap tekne, fiber sal, küçük balıkçı, buz parçası ve alçak hedefler zayıf yankı verir; **deniz clutter'ı** bunları maskeler. **Yağmur** hem hedefi gizler hem sahte eko üretir.\n\n**Sonuç:** Radar **tek** güvenilir kaynak sayılmaz; AIS, gözcü, ses işaretleri ve VHF ile **çoklu doğrulama** yapılır. AIS'in de sınırı vardır (her hedefte yok, konumda gecikme olabilir).\n\n**Gemide önemi:** 'Radarda temiz' ifadesi, kör sektör ve küçük hedef riski nedeniyle mutlak güvenlik anlamına gelmez; hız buna göre (ihtiyatlı) seçilir.",
      },
      {
        title: "Ses İşaretleri Detayı",
        content:
          "COLREG **Kural 33-35**, ses işaretlerinin donanımını ve kısıtlı görüşteki kullanımını düzenler. Kısa özet (Kural 35): yol yapan gemi 2 dk'da **1 uzun** (4-6 sn); duran gemi **2 uzun**; kısıtlı/aciz/yelkenli/balıkçı/çeken **1 uzun + 2 kısa**; çekilen (personelli) gemi çekenin ardından **1 uzun + 3 kısa**; demirli gemi dakikada **hızlı çan** (>100 m'de + gong).\n\n**İşlev:** Ses işareti; radar/AIS'in kaçırabileceği **yakın** ve görülemeyen bir geminin **varlığını, türünü ve kabaca durumunu** duyurur; radar tespitini tamamlar.\n\n**Kritik sınır — yön belirsizliği:** Siste ses **nereden geldiği güvenilir biçimde kestirilemez** (ses kırılması, gemi gürültüsü, rüzgâr). 'Düdüğü sancaktan duydum' diye manevra kurulmaz; düdük **uyarı** verir, **kerteriz** vermez. Pruva bölgesinden düdük duyulup yakın karşılaşma önlenemiyorsa gemi **asgari hıza iner / durur** (Kural 19(e)).\n\n**Gemide önemi:** İşaretlerin zamanında ve doğru tipte verilmesi hukuki zorunluluktur; ama başkasının işaretine **konum** verisi gibi güvenmek hatalıdır — teyit radar/AIS/gözcü ile yapılır.",
      },
    ],
    keyPoints: [
      "S-band ve X-band radar birlikte kullanılarak tespit kapasitesi artırılmalıdır.",
      "Radar kör sektörleri bilinmeli ve alternatif kaynaklarla telafi edilmelidir.",
      "ARPA alarm eşikleri (CPA/TCPA) mevcut koşullara uygun ayarlanmalıdır.",
      "Ses işaretleri COLREG'e göre gemi tipi ve durumuna uygun olarak verilmelidir.",
    ],
  },

  "Küresel akıntı sistemleri": {
    title: "Küresel Akıntı Sistemleri",
    introduction:
      "Okyanus akıntıları, rüzgâr, Coriolis kuvveti, yoğunluk farkları ve kıtasal kıyı çizgisinin etkileşimiyle oluşan büyük ölçekli su hareketleridir. Bu akıntıların bilinmesi, transoceanic seferlerde rota optimizasyonu, ETA doğruluğu ve yakıt verimliliği için stratejik öneme sahiptir.",
    sections: [
      {
        title: "Rüzgâr Kaynaklı Yüzey Akıntıları",
        content:
          "Kalıcı rüzgâr sistemleri (alizeler, batı rüzgârları) okyanus yüzeyinde sürekli akıntılar oluşturur. Ekman teorisine göre yüzey akıntısı rüzgâr yönünden sağa (Kuzey Yarım Küre) veya sola (Güney Yarım Küre) yaklaşık 45° saparak akar. Bu yüzey akıntıları birleşerek büyük ölçekli gyre (döngü) sistemleri oluşturur: Kuzey Atlantik Gyre (Gulf Stream – Kuzey Atlantik Akıntısı – Kanarya Akıntısı – Kuzey Ekvatoral Akıntısı), Güney Atlantik Gyre, Kuzey ve Güney Pasifik Gyre'ları, Hint Okyanusu döngüleri. Batı sınır akıntıları (Gulf Stream, Kuroshio) doğu sınır akıntılarından çok daha güçlü ve dardır.",
      },
      {
        title: "Termohalin Dolaşım",
        content:
          "Sıcaklık ve tuzluluk farkları tarafından yönlendirilen derin okyanus dolaşımıdır. Soğuk, tuzlu ve yoğun su kutup bölgelerinde dibe çökerek ekvator yönünde hareket eder; bu büyük ölçekli dolaşım, yüzey akıntılarını dolaylı olarak etkiler. Denizciler için doğrudan operasyonel etkisi yüzey akıntılarına göre sınırlıdır, ancak iklim değişikliği bağlamında akıntı rejimlerindeki uzun vadeli değişimleri anlamak için önemlidir.",
      },
      {
        title: "Operasyonel Planlama",
        content:
          "Rota planlamasında büyük akıntı sistemleri stratejik olarak kullanılır. Örneğin Kuzey Atlantik'te batıya giden gemiler Gulf Stream'in güney kenarına yönelirken, doğuya giden gemiler akıntıdan faydalanmak için kuzey kenarını tercih eder. Pilot chart'lar mevsimsel ortalama akıntı yönü ve hızını gösterir, ancak güncel uydu verileri ve oceanographic forecast'lar daha doğru bilgi sağlar. SOG ile STW arasındaki fark, akıntının gerçek etkisini gösterir ve düzenli olarak kontrol edilerek rota planına feedback sağlar.",
      },
    ],
    keyPoints: [
      "Kalıcı rüzgâr sistemleri büyük ölçekli gyre döngülerini oluşturur.",
      "Batı sınır akıntıları (Gulf Stream, Kuroshio) güçlü ve operasyonel etkisi yüksektir.",
      "Pilot chart + güncel uydu verisi birlikte kullanılmalıdır.",
      "SOG-STW farkı akıntı etkisinin gerçek zamanlı göstergesidir.",
    ],
  },

  "Set ve drift değerlendirmesi": {
    title: "Set ve Drift Değerlendirmesi",
    introduction:
      "Set (akıntı yönü) ve drift (akıntı hızı), geminin planlanan rotasından sapmasının temel nedenlerindendir. Bu sapmanın doğru ölçülmesi ve rota düzeltmesine yansıtılması, emniyetli ve verimli seyir için zorunludur.",
    sections: [
      {
        title: "Tanımlar ve Ölçüm",
        content:
          "Set, akıntının aktığı yöndür (derece cinsinden); drift, akıntının hızıdır (knot cinsinden). Geminin COG (course over ground) ile heading arasındaki fark ve SOG ile STW arasındaki fark, mevcut akıntı bilgisini verir. Bu değerler periyodik fix'lerle doğrulanır: DR (dead reckoning) pozisyonu ile fix pozisyonu arasındaki vektör farkı, o zaman aralığındaki set ve drift'i gösterir. GPS pozisyonlarının yüksek doğrulukta olması sayesinde, saatlik fix'lerle bile güvenilir akıntı bilgisi elde edilebilir.",
      },
      {
        title: "Vektörel Çözümleme",
        content:
          "Akıntılı seyirde CTS (course to steer) hesaplaması vektörel olarak yapılır. İstenen iz rotası (track), akıntı vektörü ve gemi hız vektörü bir üçgen oluşturur. Akıntı yönü ve hızı bilinen veya ölçülen değer olarak alınır; istenen iz üzerinde kalabilmek için dümen kursuna uygulanacak düzeltme bu üçgenden çıkarılır. Leeway (rüzgâr kayması) ayrı bir bileşendir ve akıntıyla karıştırılmamalıdır; özellikle yüksek freeboard'lu gemilerde leeway etkisi belirgin olabilir.",
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "Açık denizde set-drift değerleri her vardiya değişiminde güncellenir ve kaptan brifingine dahil edilir. Kıyı yakını ve pilotaj sularında fix sıklığı artırılır ve akıntı sapması sıkı limitlerle izlenir. Boğaz ve dar geçişlerde gelgit akıntısı baskın olduğundan, gelgit tablolarından hesaplanan akıntı değerleri de dikkate alınır. ECDIS üzerinde DR ile GPS pozisyonu karşılaştırılarak akıntı etkisi görsel olarak takip edilir. Set-drift bilgisi ETA hesaplamasını doğrudan etkiler; günlük noon report'ta akıntının rota ve hız üzerindeki etkisi ayrıca raporlanmalıdır.",
      },
    ],
    keyPoints: [
      "Set: akıntı yönü; drift: akıntı hızı. DR-fix farkı ile ölçülür.",
      "CTS hesabı, akıntı vektörü dahil edilerek yapılmalıdır.",
      "Leeway ve akıntı ayrı bileşenlerdir; birbirine karıştırılmamalıdır.",
      "Pilotaj sularında fix sıklığı ve akıntı takibi artırılmalıdır.",
    ],
  },

  "Akıntının ETA ve yakıta etkisi": {
    title: "Akıntının ETA ve Yakıta Etkisi",
    introduction:
      "Akıntı, geminin efektif hızını doğrudan etkiler. Karşı akıntı ETA'yı geciktirir ve yakıt tüketimini artırırken, yardımcı akıntı tersi etki yaratır. Akıntı etkisinin doğru hesaba katılması, ticari taahhütlerin yerine getirilmesi ve bunker yönetimi açısından kritiktir.",
    sections: [
      {
        title: "ETA Hesabında Akıntı Etkisi",
        content:
          "Geminin STW'si (speed through water) sabit tutulsa bile, karşı akıntı SOG'u (speed over ground) düşürür. Örneğin 14 knot STW ile seyreden ve 2 knot karşı akıntıya maruz kalan geminin SOG'u yaklaşık 12 knot olur. 1000 deniz millik bir seferde bu fark yaklaşık 12 saatlik ETA gecikmesine dönüşür. Sefer planı hazırlanırken, rota boyunca beklenen akıntı değerleri segmentlere bölünerek her segment için ayrı SOG hesaplanmalıdır. Güncel pilot chart verileri ve oşinografik tahminler kullanılarak en iyi, beklenen ve en kötü senaryo ETA'ları hesaplanır.",
      },
      {
        title: "Yakıt Tüketimi Üzerine Etkisi",
        content:
          "Karşı akıntı nedeniyle ETA'yı korumak için hız artırılması gerektiğinde, yakıt tüketimi dramatik şekilde artar — yakıt tüketimi yaklaşık olarak hızın küpüyle orantılıdır. 2 knot karşı akıntıyı telafi etmek için makine devrini artırmak, günlük yakıt tüketimini %30–50 artırabilir. Alternatif olarak, ETA gecikmesi kabul edilerek ekonomik hızda seyredilir ve yakıt tasarrufu sağlanır. Bu ticari karar, charter party koşullarına, liman slot zamanlarına ve bunker stoklarına bağlıdır. Yardımcı akıntıda ise ETA öne çekilir ve gereksiz yakıt tüketiminden kaçınmak için makine devri düşürülebilir (slow steaming).",
      },
      {
        title: "Raporlama ve Senaryo Planlaması",
        content:
          "Günlük noon report'ta, akıntının rota ve hız üzerindeki etkisi ayrı bir bölüm olarak raporlanmalıdır: planlanan SOG, gerçekleşen SOG, akıntı kaynaklı sapma ve tahmini kalan süre bilgileri verilir. Sefer öncesi en az üç senaryo (yardımcı akıntı, akıntısız, karşı akıntı) hazırlanmalı ve bunlara göre yakıt yeterliliği kontrol edilmelidir. Emniyet yakıt payı (bunker margin) hesaplanırken en kötü akıntı senaryosu dikkate alınmalıdır.",
      },
    ],
    keyPoints: [
      "2 knot karşı akıntı, 1000 NM seferde ~12 saat ETA gecikmesi yaratır.",
      "ETA korumak için hız artırmak yakıt tüketimini %30–50 artırabilir.",
      "Senaryo bazlı planlama (best/expected/worst) standart olmalıdır.",
      "Bunker emniyet payı en kötü akıntı senaryosuna göre hesaplanmalıdır.",
    ],
  },

  "Mevsimsel akıntı değişimleri": {
    title: "Mevsimsel Akıntı Değişimleri",
    introduction:
      "Okyanus akıntıları sabit değildir; mevsimsel rüzgâr değişimleri, monsun döngüleri ve yüzey sıcaklık dağılımı akıntıların yönünü ve hızını önemli ölçüde değiştirir. Bu değişimlerin önceden bilinmesi, uzun seferlerde rota ve zaman planlamasının kalitesini artırır.",
    sections: [
      {
        title: "Monsun Etkisi",
        content:
          "Hint Okyanusu'nda monsun rejimi, akıntı sistemini tamamen tersine çevirebilir. Güneybatı monsununda (Haziran–Eylül) Somalya Akıntısı kuzeye dönerken, kuzeydoğu monsununda (Aralık–Mart) güneye yönelir. Güneydoğu Asya denizlerinde de benzer mevsimsel değişimler görülür. Bu bölgelerde sefer planı yapan zabit, mevcut monsun döneminin akıntı rejimini pilot chart ve güncel oşinografik verilerden kontrol etmelidir.",
      },
      {
        title: "Diğer Mevsimsel Faktörler",
        content:
          "Gulf Stream ve Kuroshio gibi büyük akıntılar mevsimsel olarak güç ve pozisyon değiştirir. Gulf Stream'in kuzey sınırı yaz aylarında kuzeye kayar, kış aylarında güneye çekilir. Ekvatoral akıntılarda El Niño/La Niña döngüleri normal akıntı düzenini bozabilir. Arktik buz örtüsünün mevsimsel değişimi, kutup bölgelerindeki akıntı rotalarını etkiler. Bu değişimlerin ölçeği ve zamanlaması klimatolojik atlaslardan genel olarak bilinir, ancak yıllar arası varyasyon önemli olabilir.",
      },
      {
        title: "Operasyonel Sonuçlar",
        content:
          "Mevsimsel akıntı değişimi, özellikle aynı rota üzerinde farklı mevsimlerde yapılan seferlerde belirgin performans farkı yaratır. Geçmiş sefer verilerinin referans alınması yararlı olmakla birlikte, önceki seferin akıntı koşulları mevcut mevsime doğrudan uygulanamaz. Güncel uydu altimetre verileri ve oşinografik tahmin modelleri, mevsimsel klimatolojiden daha doğru bilgi sağlar. Sefer planında mevsimsel akıntı beklentisi ile güncel veri birlikte değerlendirilmeli, ETA ve yakıt hesapları buna göre revize edilmelidir.",
      },
    ],
    keyPoints: [
      "Hint Okyanusu'nda monsun akıntı yönünü tamamen değiştirir.",
      "Gulf Stream/Kuroshio pozisyon ve gücü mevsimsel olarak kayar.",
      "El Niño/La Niña döngüleri ekvatoral akıntı düzenini bozabilir.",
      "Güncel uydu verisi + mevsimsel klimatoloji birlikte kullanılmalıdır.",
    ],
  },

  "Synoptik harita sembolleri": {
    title: "Synoptik Harita Sembolleri",
    introduction:
      "Synoptik (durum) haritaları, belirli bir anda atmosferik koşulların standart sembollerle gösterildiği temel meteorolojik araçtır. Bu haritaları hızlı ve doğru okuyabilmek, köprüüstünde bağımsız hava değerlendirmesi yapmanın ön koşuludur.",
    sections: [
      {
        title: "Temel Semboller",
        content:
          "İzobarlar: sürekli eğriler, genellikle 4 hPa aralıkla, basınç değerleri üzerinde yazılıdır. Alçak basınç merkezi 'L' veya 'A' (Alçak), yüksek basınç merkezi 'H' veya 'Y' (Yüksek) ile gösterilir. Cepheler renkli çizgilerle belirtilir: soğuk cephe mavi üçgenlerle, sıcak cephe kırmızı yarım dairelerle, oklüde cephe her ikisinin birleşimiyle, stasyoner cephe karşılıklı üçgen ve yarım dairelerle gösterilir. Trough (oluk) kesik çizgiyle, ridge (sırt) zigzag çizgiyle temsil edilir.",
      },
      {
        title: "Rüzgâr Barb'ları ve İstasyon Modeli",
        content:
          "Rüzgâr barb'ı, istasyon noktasından estiği yöne doğru çizilen bir çubuktur. Kısa çizgi 5 knot, uzun çizgi 10 knot, bayrak (üçgen) 50 knot rüzgâr hızını temsil eder. İstasyon modeli (station plot) kompakt bir şekilde tek noktada şu bilgileri verir: rüzgâr yönü ve hızı, bulut örtüsü (çember doluluk oranı), sıcaklık, çiğ noktası, basınç ve basınç eğilimi. Bu modeli okuyabilmek, harita üzerinde herhangi bir noktanın mevcut koşullarını hızlıca değerlendirmeyi sağlar.",
      },
      {
        title: "Operasyonel Okuma ve Doğrulama",
        content:
          "Synoptik harita okunurken ilk kontrol, haritanın geçerlilik zamanıdır (UTC). Harita zamanı ile mevcut zaman arasındaki fark arttıkça güvenilirliği azalır. Rota üzerindeki kritik semboller (cephe konumları, sıkışık izobar bölgeleri, tropikal sistem pozisyonları) vardiya notlarına aktarılır ve ETA çizelgesiyle eşleştirilir. Birden fazla kaynak (NOAA, ECMWF, JMA, UK Met Office) karşılaştırılarak model tutarsızlıkları tespit edilir. Hava durumu faksı veya internet üzerinden alınan haritalar, NAVTEX ve SafetyNET uyarılarıyla çapraz kontrol edilir.",
      },
    ],
    keyPoints: [
      "İzobar aralığı ve cephe sembolleri synoptik okumada temel öğelerdir.",
      "Rüzgâr barb okuma ve istasyon modeli yorumlama pratik yapılmalıdır.",
      "Harita UTC zamanı ve güncelliği her zaman kontrol edilmelidir.",
      "Birden fazla kaynak karşılaştırması model hatalarını azaltır.",
    ],
  },

  "Cephe analizi ve hareket tahmini": {
    title: "Cephe Analizi ve Hareket Tahmini",
    introduction:
      "Cephe hareketinin doğru tahmini, rota üzerinde ne zaman hangi hava değişikliğinin karşılanacağını belirlemenin anahtarıdır. Ardışık synoptik haritaların karşılaştırılması ile cephe hızı, yönü ve şiddeti değerlendirilebilir.",
    sections: [
      {
        title: "Ardışık Harita Karşılaştırması",
        content:
          "Cephe hareket hızını tahmin etmek için ardışık iki synoptik haritada aynı cephenin konumu karşılaştırılır. İki harita arasındaki süre (genellikle 6 veya 12 saat) ve cephenin kat ettiği mesafe kullanılarak hareket hızı hesaplanır. Soğuk cepheler genellikle 25–40 knot, sıcak cepheler 15–25 knot hızla ilerler; ancak bu değerler büyük değişkenlik gösterebilir. Cephenin hareket yönü, arkasındaki hava kütlesinin baskı yönü ve üst seviye akışlarla belirlenir.",
      },
      {
        title: "Şiddet Değerlendirmesi",
        content:
          "Cephenin operasyonel etkisi, cephe boyunca sıcaklık kontrastına ve nem farkına bağlıdır. Büyük sıcaklık kontrastı güçlü konveksiyon, şiddetli yağış ve rüzgâr gustları üretir. Cephenin zayıflaması veya güçlenmesi, harita serisinden izlenebilir: izobar sıkışmasının artması güçlenmeyi, gevşemesi zayıflamayı işaret eder. Cephenin oklüzyona girmesi, yüzey etkisinin karmaşıklaşması ve genellikle zayıflamaya başlaması anlamına gelir.",
      },
      {
        title: "Operasyonel Zamanlama",
        content:
          "Cephenin tahmini geçiş zamanı, geminin mevcut rotası ve hızıyla birlikte değerlendirilerek karşılaşma zamanı ve yeri hesaplanır. Bu hesap, gerekirse rota veya hız değiştirerek cephe geçişini daha uygun bir zamanda veya konumda karşılamayı mümkün kılar. Mooring, kargo operasyonu, pilot alma gibi zamana hassas faaliyetler cephe geçiş tahminine göre programlanır. Plan tek bir tahmine kilitlenmemeli; cephe beklentiden hızlı veya yavaş ilerlemesi durumunda Plan B hazır tutulmalıdır.",
      },
    ],
    keyPoints: [
      "Ardışık haritalarla cephe hareket hızı hesaplanır.",
      "Cephe boyunca sıcaklık kontrastı, şiddeti belirler.",
      "Cephe geçiş zamanı rota/hız ile birlikte değerlendirilerek karşılaşma optimize edilebilir.",
      "Plan B her zaman hazır tutulmalıdır.",
    ],
  },

  "Rüzgar/deniz tahmini çıkarımı": {
    title: "Rüzgâr ve Deniz Tahmini Çıkarımı",
    introduction:
      "Synoptik haritadan rüzgâr ve deniz koşullarını çıkarabilmek, resmi tahmin alınamadığı veya tahminlerin yetersiz kaldığı durumlarda köprüüstünde bağımsız değerlendirme yapabilmenin temelidir. Bu beceri, deneyim ve teorik bilginin birleşimini gerektirir.",
    sections: [
      {
        title: "Rüzgâr Tahmini",
        content:
          "İzobar aralığından geostrofik rüzgâr hızı tahmin edilir. Genel kural olarak, 60° enlemde 5° boylam mesafede 4 hPa basınç farkı yaklaşık 20 knot geostrofik rüzgâra karşılık gelir; enlem azaldıkça aynı gradyan daha yüksek rüzgâr üretir. Yüzey rüzgârı, geostrofik değerin deniz üzerinde %70–80'i, kara üzerinde %50–60'ı kadardır. Rüzgâr yönü, izobar yönünden deniz üzerinde 10°–15°, kara üzerinde 25°–35° yüksek basınç tarafına sapar. Konvektif koşullarda (kümülonimbus, squall line) anlık gust değerleri ortalama rüzgârın 1.5–2 katına ulaşabilir.",
      },
      {
        title: "Deniz Durumu Tahmini",
        content:
          "Rüzgâr hızı belirlendikten sonra, rüzgârın esme süresi ve fetch mesafesi değerlendirilerek dalga gelişimi tahmin edilir. Tam gelişmiş denizde dalga yüksekliği yalnızca rüzgâr hızına bağlıdır. Ancak çoğu durumda deniz tam gelişmemiştir; fetch veya süre sınırlıdır. Pratik amaçla, rüzgâr hızı, esiş süresi ve fetch'in üçünden en küçüğü dalga gelişimini sınırlayan faktördür. Swell bileşeni bu hesaplamanın dışındadır ve ayrıca değerlendirilmelidir. Deniz durumu tahmini yapılırken yerel topografik etkiler (ada, burun, sığ su) dikkate alınmalıdır.",
      },
      {
        title: "Gözlem ile Doğrulama",
        content:
          "Haritadan çıkarılan tahminler, gemideki gerçek gözlemlerle sürekli karşılaştırılmalıdır. Tahmin ile gözlem arasındaki fark, ya harita analizinin ya da yerel koşulların standart dışı olduğunu gösterir. Her iki durumda da dikkat artırılmalıdır. Gözlem sapmalarının kaydedilmesi ve bir sonraki vardiyaya aktarılması, ekibin kolektif hava değerlendirmesini güçlendirir. Rota segmentlerine göre deniz durumu notu hazırlamak, sonraki seferlerde referans olarak kullanılabilir.",
      },
    ],
    keyPoints: [
      "Geostrofik rüzgâr izobar aralığından hesaplanır; yüzey rüzgârı bunun %70–80'idir.",
      "Dalga gelişimi rüzgâr hızı, süre ve fetch'in en küçüğüyle sınırlanır.",
      "Tahmin ile gözlem sürekli karşılaştırılmalıdır.",
      "Gust değerleri ortalama rüzgârın 1.5–2 katına ulaşabilir.",
    ],
  },

  "Rota üzerinde risk işaretleme": {
    title: "Rota Üzerinde Meteorolojik Risk İşaretleme",
    introduction:
      "Meteorolojik risklerin rota üzerinde sistematik olarak işaretlenmesi, ekip içinde ortak durum farkındalığı yaratır ve proaktif karar alma sürecini güçlendirir. Bu yaklaşım, BRM (Bridge Resource Management) prensipleriyle doğrudan örtüşür.",
    sections: [
      {
        title: "Risk Tanımlama ve Sınıflandırma",
        content:
          "Rota üzerinde meteorolojik risk değerlendirmesi, olasılık ve etki matrisine dayalı olarak yapılır. Her rota segmenti için beklenen hava koşulları, dalga yüksekliği, görüş, rüzgâr hızı ve akıntı parametreleri değerlendirilir. Risk seviyesi düşük (yeşil), orta (sarı), yüksek (kırmızı) olarak kodlanır. Tetikleyici limitler önceden tanımlanır: örneğin Force 7 üzeri rüzgâr, 4 m üzeri dalga yüksekliği veya 2 NM altı görüş gibi eşik değerler belirlenir.",
      },
      {
        title: "Görsel İşaretleme ve İletişim",
        content:
          "ECDIS üzerinde veya kağıt haritada riskli segmentler renk kodlarıyla işaretlenir. Her segment için tetikleyici limit değerleri, beklenen koşullar ve alternatif planlar (hız değişikliği, rota sapması, bekleme) yazılı olarak hazırlanır. Bu bilgiler vardiya devir tesliminde harita üzerinden brifing yapılarak aktarılır. Tüm ekibin aynı risk haritasını görmesi ve paylaşması, 'herkes aynı resme bakıyor' ilkesini hayata geçirir.",
      },
      {
        title: "Dinamik Güncelleme",
        content:
          "Risk haritası statik bir belge değildir; hava tahminleri güncellendikçe risk değerlendirmesi de revize edilir. Bir önceki değerlendirmeden bu yana meydana gelen değişiklikler (cephe hızı sapması, siklon yolunda kayma, beklenmeyen sis oluşumu vb.) risk haritasına yansıtılır. Güncelleme zamanları, önemli bir değişiklik olduğunda veya en azından vardiya başlangıcında yapılır. Risk işaretleme disiplini, kaptan ve zabitler arasında güven ortamı yaratır ve kritik kararlarda iletişim kalitesini artırır.",
      },
    ],
    keyPoints: [
      "Risk sınıflandırması olasılık-etki matrisine dayalıdır.",
      "Tetikleyici limitler (rüzgâr, dalga, görüş eşikleri) önceden tanımlanmalıdır.",
      "Risk haritası dinamiktir; hava güncellemeleriyle revize edilmelidir.",
      "Vardiya devrinde risk haritası üzerinden brifing BRM kalitesini artırır.",
    ],
  },
  "SOLAS V tehlike mesajları ve hava raporlama": {
    title: "SOLAS V: Tehlike Mesajları ve Meteorolojik Raporlama Yükümlülüğü",
    introduction:
      "SOLAS Bölüm V (Seyir Güvenliği), kaptana belirli tehlikeli hava ve seyir koşullarını yakındaki gemilere ve yetkili otoritelere bildirme yükümlülüğü getirir. Bu raporlar ücretsizdir ve denizde ortak güvenliğin temelini oluşturur. Ayrıca gemiler gönüllü gözlem (VOS) kapsamında düzenli hava raporu göndererek küresel tahmin ağına katkı sağlar.",
    sections: [
      {
        title: "Tehlike Mesajları (SOLAS V/31)",
        content:
          "Tehlikeli buz, tehlikeli terk edilmiş gemi (derelict) veya seyre doğrudan tehlike oluşturan başka bir engelle karşılaşan; tropikal fırtınaya rastlayan; üst yapılarda ağır buzlanmaya yol açan, fırtına şiddetinde rüzgârla birlikte donma altı hava sıcaklığı yaşayan; ya da hakkında fırtına ihbarı alınmamış 10 Bofor ve üzeri rüzgârla karşılaşan her geminin kaptanı, bu bilgiyi elindeki tüm imkânlarla yakındaki gemilere ve ilk ulaşabildiği yetkili makama iletmekle yükümlüdür.",
        image: "/diagrams/meteorology/solas-v-tehlike-mesajlari.svg",
        imageAlt: "SOLAS V/31 bildirilecek tehlikeler ve V/32 tropikal fırtına mesaj içeriği",
        bulletPoints: [
          "Tehlikeli buz / buzdağı.",
          "Tehlikeli terk edilmiş gemi (derelict) veya seyir engeli.",
          "Tropikal fırtına ile karşılaşma.",
          "Ağır buzlanmaya yol açan, fırtına rüzgârıyla birlikte donma altı sıcaklık.",
          "İhbar edilmemiş 10 Bofor ve üzeri rüzgâr.",
        ],
      },
      {
        title: "Mesaj İçeriği (SOLAS V/32)",
        content:
          "Tehlike mesajının formatı standarttır. Buz, derelict ve diğer doğrudan tehlikeler için: tehlikenin türü, mevkii ve gözlem zamanı (UTC) verilir. Tropikal fırtına için ek olarak: bir tropikal fırtına ile karşılaşıldığının beyanı; zaman/mevki (UTC); düzeltilmiş barometre basıncı ve 3 saatlik basınç eğilimi (tendency); gerçek rüzgâr yönü ve Bofor cinsinden şiddeti; deniz durumu ve ölü deniz (swell); geminin rota ve hızı bildirilir. Buzlanma riskinde hava/deniz sıcaklığı ve rüzgâr da eklenir. Mümkünse takip gözlemleri gönderilir.",
      },
      {
        title: "Sefer Planlaması ve Hava Servisleri (SOLAS V/34 ve V/5)",
        content:
          "SOLAS V/34, seferin uygun harita ve yayınlarla, IMO kılavuzları (Karar A.893(21)) doğrultusunda — güncel meteorolojik bilgi ve hava rotalaması (weather routing) dâhil — önceden planlanmasını gerektirir. SOLAS V/5 uyarınca Âkit Hükümetler meteorolojik servis ve uyarıları sağlar; gemiler Gönüllü Gözlem Gemileri (VOS) programı kapsamında düzenli hava gözlemi yapıp raporlayarak küresel tahmin doğruluğuna katkıda bulunur. Meteorolojik uyarılar (gale/storm warning) NAVTEX, SafetyNET ve telsiz yayınlarıyla alınır.",
      },
    ],
    keyPoints: [
      "SOLAS V/31: buz, derelict, tropikal fırtına, ağır buzlanma ve ihbarsız ≥10 Bofor rüzgâr bildirilmelidir.",
      "Tehlike mesajları ücretsizdir ve tüm imkânlarla derhâl iletilir.",
      "V/32: tropikal fırtına mesajında basınç + 3 saatlik eğilim, gerçek rüzgâr, deniz durumu, rota/hız bulunur.",
      "V/34 sefer planlaması hava bilgisini içerir; V/5 ile gemiler VOS kapsamında hava raporlar.",
    ],
  },

  "Bulut oluşumu ve sınıflandırma esasları": {
    title: "Bulut Oluşumu ve Sınıflandırma Esasları",
    introduction:
      "Bulutlar, atmosferdeki nem, sıcaklık ve dikey hareketin gökyüzüne yazılmış özetidir. Uydu ve model tahminlerinin bulunmadığı çağlarda denizciler hava değişimini yalnızca bulutları okuyarak tahmin ederdi; bugün de bulut gözlemi, köprüüstünde elektronik kaynaklardan bağımsız çalışan en hızlı ve en güvenilir yerel tahmin aracıdır. Bulutları doğru sınıflandırabilmek, hangi bulutun hangi hava sistemine işaret ettiğini bilmek demektir.",
    sections: [
      {
        title: "Bulut Nasıl Oluşur?",
        content:
          "Bulut, nemli havanın yükselerek soğuması ve içindeki su buharının yoğuşma çekirdekleri (deniz üzerinde çoğunlukla tuz aerosolleri) etrafında su damlacıklarına veya buz kristallerine dönüşmesiyle oluşur. Yükselen hava adyabatik olarak soğur; sıcaklık çiğ noktasına ulaştığında yoğuşma başlar ve bu seviye bulut tabanını belirler. Havayı yükselten dört temel mekanizma vardır: konveksiyon (güneşle veya sıcak deniz yüzeyiyle alttan ısınma), orografik yükselme (havanın dağ ya da yüksek kıyı hattına çarpıp tırmanması), cephesel yükselme (sıcak havanın soğuk kütle üzerinde yükselmesi) ve konverjans (yüzeyde birleşen hava akımlarının yukarı zorlanması). Hangi mekanizmanın etkin olduğu, oluşacak bulutun tipini de belirler: konveksiyon küme (kümülüform), geniş alanlı yavaş yükselme ise tabaka (stratiform) bulutları üretir.",
        image: cumulusImage,
        imageAlt: "Konvektif yükselme ile oluşan kümülüs bulutları",
      },
      {
        title: "WMO Sınıflandırması: 10 Ana Bulut Cinsi",
        content:
          "Bugün kullanılan sınıflandırma, Luke Howard'ın 1803'te önerdiği Latince adlandırmaya dayanır ve Dünya Meteoroloji Örgütü (WMO) tarafından 10 ana cins (genus) olarak standartlaştırılmıştır. Adlandırmada dört Latince kök kullanılır: cirrus (saçak/tüy), cumulus (küme/yığın), stratus (tabaka/örtü) ve nimbus (yağış getiren). Bu köklerin birleşimi bulutun hem görünüşünü hem karakterini tanımlar; örneğin nimbostratus 'yağış getiren tabaka bulutu', cirrocumulus 'yüksek seviyeli küçük kümecikler' anlamına gelir.",
        bulletPoints: [
          "Yüksek bulutlar: Cirrus (Ci), Cirrocumulus (Cc), Cirrostratus (Cs)",
          "Orta seviye bulutlar: Altocumulus (Ac), Altostratus (As), Nimbostratus (Ns)",
          "Alçak bulutlar: Stratus (St), Stratocumulus (Sc)",
          "Dikey gelişimli bulutlar: Cumulus (Cu), Cumulonimbus (Cb)",
        ],
      },
      {
        title: "Yükseklik Katları ve Kategoriler",
        content:
          "Bulutlar taban yüksekliğine göre üç kata ayrılır; orta enlemlerde yüksek bulutlar 6–13 km (buz kristali), orta seviye bulutlar 2–7 km (su damlacığı ve buz karışımı), alçak bulutlar 0–2 km (su damlacığı) bandında bulunur. Cumulus ve cumulonimbus ise tabanı alçak katta olmasına rağmen dikeyde birkaç katı birden aşabildiğinden ayrı bir 'dikey gelişimli' kategori olarak ele alınır; olgun bir Cb tropopoza (12 km ve üzeri) kadar uzanabilir. Synoptik hava raporlarında ve VOS gözlemlerinde bulutlar bu katlara karşılık gelen CH (yüksek), CM (orta) ve CL (alçak) kod rakamlarıyla raporlanır. Nimbostratus orta katta sınıflandırılır ancak tabanı çoğu zaman alçak kata sarkar.",
        image: cirrostratusImage,
        imageAlt: "Yüksek katta ince örtü halinde cirrostratus bulutu",
      },
      {
        title: "Köprüüstünde Bulut Gözlemi ve Raporlama",
        content:
          "Bulut gözlemi sistematik yapılmalıdır: toplam bulut örtüsü okta (gökyüzünün sekizde biri) cinsinden kaydedilir; 0 okta açık, 8 okta tamamen kapalı gökyüzünü ifade eder. Ardından her kattaki baskın bulut cinsi ve yaklaşık taban yüksekliği not edilir. Tek bir gözlemden çok, ardışık gözlemlerin gösterdiği eğilim değerlidir: bulutların alçalması, kalınlaşması ve türlerinin Ci→Cs→As→Ns sırasında değişmesi yaklaşan bir sıcak cephenin klasik imzasıdır; tersine bulutların yükselip parçalanması havanın düzeldiğini gösterir. Bulut gözlemi barometre eğilimi ve rüzgâr değişimiyle birlikte değerlendirildiğinde, köprüüstünde 12–24 saatlik güvenilir bir yerel tahmin üretir.",
      },
    ],
    keyPoints: [
      "Bulut, yükselen nemli havanın adyabatik soğuyup çiğ noktasında yoğuşmasıyla oluşur; yoğuşma seviyesi bulut tabanıdır.",
      "WMO sınıflandırması 10 ana cinsi dört Latince köke (cirrus, cumulus, stratus, nimbus) dayandırır.",
      "Taban yüksekliğine göre üç kat vardır: yüksek (6–13 km), orta (2–7 km), alçak (0–2 km); Cu/Cb dikey gelişimlidir.",
      "Bulut örtüsü okta ile raporlanır; ardışık gözlemlerdeki eğilim tek gözlemden daha değerlidir.",
    ],
  },

  "Yüksek bulutlar (Cirrus, Cirrocumulus, Cirrostratus)": {
    title: "Yüksek Bulutlar: Cirrus, Cirrocumulus, Cirrostratus",
    introduction:
      "Yüksek bulutlar 6–13 km bandında bulunur ve bu irtifadaki düşük sıcaklık nedeniyle tamamen buz kristallerinden oluşur. Kendileri yağış üretmez; asıl önemleri, yaklaşan bir sıcak cepheyi veya tropikal sistemi 24–48 saat önceden haber veren ilk işaretler olmalarıdır. Deniz üzerinde ufka kadar açık görüşle izlenebildiklerinden, denizci için en erken uyarı aracıdır.",
    sections: [
      {
        title: "Cirrus (Ci) — Saçak Bulutlar",
        content:
          "Cirrus, gökyüzünde ince beyaz tüyler, saçaklar veya at kuyruğu biçiminde görülen buz kristali bulutudur. Üst atmosferdeki güçlü rüzgârlar (jet stream) kristalleri sürükleyerek karakteristik çengel biçimini (cirrus uncinus, 'mares' tails') verir. Dağınık ve seyrek cirrus tek başına iyi havanın işaretidir; ancak batı ufkundan düzenli olarak çoğalan, kalınlaşan ve gökyüzünü kaplamaya başlayan cirrus, 24–48 saat içinde bir sıcak cephenin veya alçak basınç sisteminin yaklaştığını gösterir. Cirrus şeritlerinin hareket yönü, üst atmosfer akışının ve dolayısıyla yaklaşan sistemin geliş yönünün tahmininde kullanılır.",
        image: cirrusImage,
        imageAlt: "İnce beyaz saçaklar halinde cirrus bulutları",
      },
      {
        title: "Cirrocumulus (Cc) — Uskumru Gökyüzü",
        content:
          "Cirrocumulus, gölgesiz küçük beyaz taneler veya dalgacıklar halinde dizilmiş yüksek kümeciklerdir; görünümü balık puluna benzetildiği için denizcilikte 'uskumru gökyüzü' (mackerel sky) olarak bilinir. Yüksek seviyede türbülans ve nem artışının işaretidir; genellikle cirrus ve cirrostratus ile birlikte görülür ve yaklaşan cephe sisteminin habercisidir. 'Mackerel sky and mares' tails make lofty ships carry low sails' (uskumru gökyüzü ve at kuyrukları görüldüğünde yelken küçültülür) deyişi, bu bulutun 24–48 saat içinde bozacak havaya işaret ettiğini yüzyıllardır özetler. Kısa ömürlü bir bulut olduğundan görüldüğünde kaydedilmesi ve trendin izlenmesi gerekir.",
        image: cirrocumulusImage,
        imageAlt: "Balık pulu görünümünde cirrocumulus (uskumru gökyüzü)",
      },
      {
        title: "Cirrostratus (Cs) — Hale Yapan Örtü",
        content:
          "Cirrostratus, gökyüzünü süt beyazı ince bir tül gibi kaplayan buz kristali örtüsüdür. En ayırt edici özelliği, güneş veya ay etrafında 22 derecelik hale (halo) oluşturmasıdır; ışık, altıgen buz kristallerinde kırılarak bu halkayı üretir. Hale görülmesi klasik bir kötü hava işaretidir: cirrostratus örtüsü tipik olarak sıcak cephenin 500–1000 km önünde uzanır ve genellikle 12–36 saat içinde altostratus ve ardından nimbostratus yağışının geleceğini haber verir. 'Güneş halesi, fırtına habercisi' deyişi bu mekanizmaya dayanır. Cirrostratus kalınlaşıp alçalıyorsa cephe yaklaşıyor demektir; barometre eğilimi ile birlikte doğrulanmalıdır.",
        image: cirrostratusImage,
        imageAlt: "Güneş çevresinde hale oluşturan ince cirrostratus örtüsü",
      },
      {
        title: "Denizci Yorumu: Yüksek Bulut Sekansı",
        content:
          "Yüksek bulutların asıl değeri sekans halinde okunmasındadır. Ci→Cc→Cs sırasıyla çoğalan ve kalınlaşan yüksek bulutlar, klasik sıcak cephe yaklaşım dizisinin ilk perdesidir; devamında As ve Ns gelir. Bu sekans görüldüğünde 24–48 saatlik operasyon planı gözden geçirilir: uzun sürecek güverte işleri öne çekilir, açık deniz rotasında alternatif liman/demir yeri değerlendirilir ve hava raporu alma sıklığı artırılır. Tropikal bölgelerde ise olağan dışı yoğun ve düzenli cirrus yayılımı, uzaktaki bir tropikal siklonun çıkış bulutları (outflow) olabilir; barometredeki diurnal ritmin bozulmasıyla birlikte görülürse ciddiye alınmalıdır.",
      },
    ],
    keyPoints: [
      "Yüksek bulutlar (6–13 km) tamamen buz kristalidir; yağış üretmez ama 24–48 saat önceden hava değişimini haber verir.",
      "Çoğalan ve kalınlaşan cirrus, yaklaşan sıcak cephenin ilk işaretidir.",
      "Cirrocumulus 'uskumru gökyüzü' ve cirrostratus halesi klasik kötü hava habercileridir.",
      "Ci→Cs→As→Ns sekansı sıcak cephe yaklaşımının standart bulut dizisidir; barometre ile doğrulanır.",
    ],
  },

  "Orta seviye bulutlar (Altocumulus, Altostratus, Nimbostratus)": {
    title: "Orta Seviye Bulutlar: Altocumulus, Altostratus, Nimbostratus",
    introduction:
      "Orta seviye bulutlar 2–7 km bandında bulunur ve su damlacıkları ile buz kristallerinin karışımından oluşur. Yüksek bulutlar 'uzak haberci' ise orta seviye bulutlar 'yakın haberci'dir: gökyüzünde belirdiklerinde hava değişimi genellikle 12–24 saat mesafededir. Nimbostratus ise artık haberci değil, kötü havanın kendisidir.",
    sections: [
      {
        title: "Altocumulus (Ac) — Koyun Sürüsü",
        content:
          "Altocumulus, gri-beyaz yumak veya merdane biçiminde kümeciklerin oluşturduğu orta seviye bulutudur; görünümü koyun sürüsüne benzetilir. Cirrocumulus'tan ayırt etmenin pratik yolu boyuttur: altocumulus kümecikleri daha büyüktür ve belirgin gölgeleri vardır. Genel olarak kararsızlaşan bir orta atmosferi gösterir ve 24–48 saat içinde hava değişimine işaret edebilir. Özel bir alt türü olan altocumulus castellanus (kule biçiminde çıkıntılar yapan Ac) kritik bir uyarıdır: sabah saatlerinde görülmesi, orta atmosferin konvektif olarak kararsız olduğunu ve öğleden sonra oraj (gök gürültülü sağanak) gelişme olasılığının yüksek olduğunu gösterir.",
        image: altocumulusImage,
        imageAlt: "Koyun sürüsü görünümünde altocumulus kümecikleri",
      },
      {
        title: "Altostratus (As) — Buzlu Cam Örtüsü",
        content:
          "Altostratus, gökyüzünü mavimsi-gri düz bir örtü halinde kaplayan orta seviye tabaka bulutudur. Güneş bu örtünün ardından buzlu cam arkasındaymış gibi silik görünür; cirrostratus'tan farkı hale oluşturmaması ve cisimlerin gölge düşürmemesidir. Altostratus, yaklaşan sıcak cephe sekansında cirrostratus'tan sonraki halkadır: örtü kalınlaşıp alçaldıkça nimbostratus'a dönüşür ve sürekli yağış başlar. Altostratus görüldüğünde yağışa kalan süre tipik olarak 12 saatten azdır; güverte operasyonları ve açık ambar çalışmaları buna göre planlanmalı, barometredeki düşüş hızı yakından izlenmelidir.",
        image: altostratusImage,
        imageAlt: "Güneşi buzlu cam gibi silikleştiren altostratus örtüsü",
      },
      {
        title: "Nimbostratus (Ns) — Sürekli Yağış Bulutu",
        content:
          "Nimbostratus, koyu gri, kalın ve şekilsiz bir yağış bulutudur; tabanı yağışla birlikte 2 km'nin altına iner ve güneşi tamamen kapatır. Adındaki 'nimbus' kökü yağış getirdiğini söyler: saatlerce, bazen bir gün boyunca süren orta şiddette ve sürekli yağmur veya kar üretir. Cb sağanağından farkı yağışın karakteridir: Ns yağışı süreklidir ve ani rüzgâr değişimi içermez, Cb yağışı ise kısa, şiddetli ve gustludur. Denizci için Ns'nin asıl riski görüştür: yağış ve bulut tabanının alçalması görüşü 1–3 mile düşürebilir; bulut altında oluşan parçalı stratus fractus (scud) bulutları görüşü daha da kısıtlar. Ns hakimiyetinde kısıtlı görüş prosedürlerine hazır olunmalıdır.",
        image: nimbostratusImage,
        imageAlt: "Koyu gri, sürekli yağış bırakan nimbostratus tabakası",
      },
      {
        title: "Operasyonel Değerlendirme",
        content:
          "Orta seviye bulutlar görüldüğünde köprüüstü değerlendirmesi somutlaşır: altocumulus castellanus sabah görüldüyse öğleden sonra için konvektif hava (Cb, squall) hazırlığı yapılır; altostratus kalınlaşıyorsa 12 saat içinde sürekli yağış ve görüş kaybı beklenir; nimbostratus altında ise seyir feneri, radar ve ses işareti disiplinine geçilir. Bu katın bulutları cephe sisteminin konumunu da tarif eder: As/Ns kuşağı sıcak cephenin hemen önünde uzandığından, bu bulutların altına girildiğinde cephe geçişine (rüzgâr dönüşü, sıcaklık artışı, ardından sıcak sektör) saatler kalmış demektir.",
      },
    ],
    keyPoints: [
      "Orta seviye bulutlar (2–7 km) su ve buz karışımıdır; hava değişimini 12–24 saat önceden gösterir.",
      "Sabah görülen altocumulus castellanus, öğleden sonra oraj gelişimi için klasik uyarıdır.",
      "Altostratus kalınlaşıp alçalıyorsa 12 saat içinde sürekli yağış (Ns) beklenir.",
      "Nimbostratus sürekli yağış ve 1–3 mile düşen görüş demektir; kısıtlı görüş hazırlığı yapılır.",
    ],
  },

  "Alçak bulutlar (Stratus, Stratocumulus)": {
    title: "Alçak Bulutlar: Stratus, Stratocumulus",
    introduction:
      "Alçak bulutlar 0–2 km bandında bulunur ve tamamen su damlacıklarından oluşur. Seyir emniyetini en doğrudan etkileyen kategori budur: taban yüksekliği düşük olduğundan görüşü hızla kısıtlar, sisle iç içe geçer ve kıyı/liman operasyonlarını doğrudan etkiler. Şiddetli hava üretmezler; riskleri fırtına değil, görüştür.",
    sections: [
      {
        title: "Stratus (St) — Düz Gri Tabaka",
        content:
          "Stratus, gökyüzünü alçak, düz ve şekilsiz gri bir tabaka halinde kaplayan buluttur; tabanı çoğu zaman 500 metrenin altındadır ve yüzeye değdiğinde adı sise dönüşür — sis, yerdeki stratus'tan başka bir şey değildir. Deniz üzerinde en sık, sıcak ve nemli havanın soğuk deniz yüzeyi üzerine akmasıyla (adveksiyon) oluşur; bu nedenle adveksiyon sisi ile aynı koşulların ürünüdür. Yağış olarak yalnızca çise (drizzle) üretebilir. Denizci için kritik göstergedir: stratus tabanının alçalması sise geçişin habercisidir; görüş sürekli izlenmeli, sis işaretleri ve radar gözcülüğü hazır bulundurulmalıdır. Stabil hava kütlesinin (sıcak kütlenin soğuk deniz üzerinde soğuması) tipik bulutudur.",
        image: stratusImage,
        imageAlt: "Alçak ve düz gri tabaka halinde stratus bulutu",
      },
      {
        title: "Stratocumulus (Sc) — Yumrulu Tabaka",
        content:
          "Stratocumulus, gri-beyaz büyük yumrular ve merdaneler halinde, araları yer yer açık bir alçak tabaka bulutudur; dünyada en yaygın görülen bulut cinsidir ve özellikle okyanusların yüksek basınç bölgelerinde geniş alanlar kaplar. Genellikle kötü hava getirmez; en fazla hafif çise veya kısa süreli zayıf sağanak üretir. Meteorolojik anlamı gizlidir: Sc tabakası çoğu zaman bir sıcaklık inversiyonunun (yükselmeyi durduran kapak) altında oluşur. Bu kapak konveksiyonu bastırdığından hava kararlıdır; ancak aynı inversiyon nem ve pusun alt katmanda hapsolmasına yol açar, görüş orta seviyede kalır. Cumulus bulutlarının akşam saatlerinde yayılıp Sc'ye dönüşmesi normal ve zararsız bir günlük döngüdür.",
        image: stratocumulusImage,
        imageAlt: "Yumrulu gri-beyaz stratocumulus tabakası",
      },
      {
        title: "Stratus Fractus — Parçalanmış Kötü Hava Bulutları",
        content:
          "Fractus, stratus veya cumulus'un rüzgârla yırtılmış, düzensiz parçalar halindeki türüdür. Kötü hava sırasında Ns veya Cb tabanının altında hızla sürüklenen bu alçak parçalara denizcilikte 'scud' denir. Kendileri tehlike üretmez ama iki şeyi gösterir: alt katmanın neme doyduğunu ve yüzey rüzgârının kuvvetli olduğunu. Yağış bulutunun altında scud görülmesi, bulut tabanının pratikte daha da alçak olduğu ve görüşün aniden düşebileceği anlamına gelir. Fırtına sonrasında gökyüzünde kalan fractus parçaları ise sistemin geçtiğini ve havanın toparlanmakta olduğunu gösterir.",
        image: fractusImage,
        imageAlt: "Rüzgârla parçalanmış alçak fractus (scud) bulutları",
      },
      {
        title: "Görüş ve Seyir Etkisi",
        content:
          "Alçak bulut kategorisinin operasyonel özeti görüş yönetimidir. Stratus/sis koşulu geliştiğinde COLREG Kural 19 (kısıtlı görüşte seyir) uygulanır: emniyetli hıza inilir, makine manevraya hazır tutulur, sis işaretleri verilir, radar ve AIS gözcülüğü artırılır ve ilave gözcü konur. Kıyı seyrinde alçak bulut tabanı; fener ışıklarının erken kaybolması, radar ufkunun daralmaması ama görsel ufkun kapanması gibi asimetrik bir durum yaratır — görsel mevki koyma imkânı kaybolurken elektronik seyir sürer, bu nedenle mevki doğrulama disiplini önem kazanır. Helikopter operasyonları ve pilot alma-verme için bulut tavanı (ceiling) limitleri kontrol edilmelidir.",
      },
    ],
    keyPoints: [
      "Alçak bulutlar (0–2 km) su damlacığıdır; riskleri fırtına değil görüş kaybıdır.",
      "Stratus sisin bir üst basamağıdır; tabanının alçalması sise geçiş uyarısıdır.",
      "Stratocumulus genellikle zararsızdır ve inversiyon altındaki kararlı havayı gösterir.",
      "Yağış bulutu altındaki fractus (scud) parçaları, görüşün aniden düşebileceğinin işaretidir.",
    ],
  },

  "Dikey gelişimli bulutlar (Cumulus, Cumulonimbus)": {
    title: "Dikey Gelişimli Bulutlar: Cumulus, Cumulonimbus",
    introduction:
      "Dikey gelişimli bulutlar konveksiyonun ürünüdür: tabanları alçak katta olmasına rağmen yükselen sıcak hava ile dikeyde büyürler. Bu kategori, zararsız güzel hava kümülüsünden denizcinin karşılaşabileceği en tehlikeli bulut olan cumulonimbus'a uzanan tek bir gelişim çizgisidir; kritik beceri, bu çizginin hangi aşamasında olunduğunu tanımaktır.",
    sections: [
      {
        title: "Cumulus (Cu) — Güzel Hava Kümülüsü",
        content:
          "Cumulus, düz tabanlı, karnabahar görünümlü, keskin kenarlı beyaz küme bulutudur. Gündüz ısınmasıyla veya soğuk hava kütlesinin sıcak deniz üzerinden geçişiyle oluşan termaller üzerinde büyür. Yatay boyutu dikey boyutundan büyük olan dağınık kümülüs (cumulus humilis) 'güzel hava kümülüsü'dür: atmosferin hafif kararsız ama sağlıklı olduğunu, görüşün iyi ve havanın açık kalacağını gösterir. Ancak izlenmesi gereken şey dikey büyümedir: kümülüs kulesinin gün içinde boyunu aşarak yükselmesi (cumulus congestus / towering cumulus, TCu), atmosferin derin konveksiyona elverişli olduğunu ve 30–60 dakika içinde sağanak, birkaç saat içinde Cb gelişebileceğini haber verir.",
        image: cumulusImage,
        imageAlt: "Düz tabanlı, karnabahar görünümlü güzel hava kümülüsü",
      },
      {
        title: "Cumulonimbus (Cb) — Oraj Bulutu",
        content:
          "Cumulonimbus, tabanı deniz seviyesine yakın, tepesi tropopoza (12 km ve üzeri) ulaşabilen dev konvektif buluttur; tepesi buzlaşarak yassılaşır ve karakteristik örs (anvil) biçimini alır. Denizcinin karşılaşabileceği en tehlikeli buluttur ve tüm şiddetli hava olaylarını tek başına üretebilir: gök gürültüsü ve yıldırım, ani ve şiddetli sağanak, dolu, 50 knotu aşabilen gust'lar, mikropatlama (downburst) ve hortum/su hortumu. En kritik tehlike gust front'tur: Cb içindeki soğuk iniş akıntısı (downdraft) yüzeye çarpıp yayılır ve bulutun 10–15 mil önünde, yağış başlamadan önce ani rüzgâr şifti ve şiddetlenmesi yaratır. Rüzgâr yönü Cb yaklaşırken 180 dereceye kadar dönebilir. Cb'ler tek hücre halinde veya soğuk cephe önünde squall hattı olarak organize biçimde gelir.",
        image: cumulonimbusImage,
        imageAlt: "Örs biçimli tepesiyle olgun cumulonimbus (oraj bulutu)",
      },
      {
        title: "Cb Yaklaşırken Köprüüstü Tedbirleri",
        content:
          "Cb veya squall hattı yaklaşırken tedbirler yağış değil rüzgâr eksenlidir; çünkü ilk darbe gust front ile gelir. Radar, yağış hücrelerinin tespiti ve hareket vektörünün çıkarılması için etkin kullanılır (hücreler radarda parlak, yüksek yoğunluklu eko verir). Güvertedeki personel içeri alınır, bumbalar/kreynler emniyete alınır, açık ambar kapakları kapatılır. Rüzgârın aniden yön değiştirip şiddetleneceği varsayılarak geminin rüzgâr üstü/altı durumu değerlendirilir; demirde ise demir taraması riski için makine hazır bulundurulur. Yıldırım riski nedeniyle açık güvertede anten ve yüksek nokta çalışmaları durdurulur. Küçük hücreler görsel ve radar takibiyle rotadan taviz vermeden atlatılabilir; organize squall hattı ise hattın zayıf noktasından, mümkünse dik açıyla geçilir.",
        image: mammatusImage,
        imageAlt: "Cb örsü altında şiddetli türbülansı gösteren mammatus çıkıntıları",
      },
    ],
    keyPoints: [
      "Dağınık, basık kümülüs güzel hava işaretidir; dikeyde büyüyen kümülüs (TCu) sağanak ve Cb habercisidir.",
      "Cumulonimbus tüm şiddetli hava olaylarını üretir: yıldırım, dolu, 50+ knot gust, mikropatlama, su hortumu.",
      "İlk darbe gust front ile yağıştan önce gelir; rüzgâr 180° dönebilir ve aniden şiddetlenebilir.",
      "Cb yaklaşırken güverte emniyete alınır, radar ile hücre takibi yapılır; squall hattı dik açıyla geçilir.",
    ],
  },

  "Özel bulut formasyonları ve tehlike işaretleri": {
    title: "Özel Bulut Formasyonları ve Tehlike İşaretleri",
    introduction:
      "On ana bulut cinsinin dışında, belirli atmosfer koşullarında ortaya çıkan özel formasyonlar vardır. Bunların çoğu kısa ömürlüdür ama taşıdıkları mesaj nettir: şiddetli türbülans, ani rüzgâr, hortum riski veya güçlü üst rüzgârlar. Bu formasyonları tanımak, tehlikeyi dakikalar-saatler ölçeğinde önceden görmek demektir.",
    sections: [
      {
        title: "Mammatus — Torba Bulutlar",
        content:
          "Mammatus, bulut tabanından aşağı sarkan torba veya kese biçimli çıkıntılardır; en çarpıcı haliyle cumulonimbus örsünün altında görülür. Normal bulut tabanları yükselen havayla düz biçimlenirken, mammatus batan soğuk ve nemli havanın ürünüdür — yani atmosferin o katmanında güçlü iniş akıntıları ve şiddetli türbülans vardır. Mammatus görülmesi çoğu zaman yakınlarda olgun, güçlü bir Cb hücresi olduğu anlamına gelir; fırtınanın önünde de arkasında da görülebilir. Denizci için mesaj: bölgedeki konvektif sistem şiddetlidir, ani gust ve rüzgâr şifti riski yüksektir; sistem geçmiş görünse bile tedbir korunmalıdır.",
        image: mammatusImage,
        imageAlt: "Bulut tabanından sarkan torba biçimli mammatus çıkıntıları",
      },
      {
        title: "Arcus (Shelf Cloud) — Squall Hattının Ön Duvarı",
        content:
          "Arcus (raf bulutu), yaklaşan bir Cb veya squall hattının ön kenarında, alçak seviyede uzanan yatay merdane veya raf biçimli buluttur. Fırtınanın soğuk iniş akıntısının öndeki sıcak nemli havayı kaldırmasıyla oluşur; yani gust front'un görünür halidir. Ufukta koyu bir duvar gibi yaklaşan shelf cloud, dakikalar içinde ani rüzgâr artışı (tipik olarak 15 knottan 40+ knota), sert rüzgâr şifti ve ardından şiddetli sağanak geleceğinin kesin işaretidir. Görüldüğü anda güverte personeli içeri alınmalı, açık işler kesilmeli ve gemi gelecek rüzgâra göre hazırlanmalıdır; yelkenli ve küçük tekneler için bu görüntü acil yelken küçültme komutudur.",
        image: arcusImage,
        imageAlt: "Squall hattının önünde yatay raf biçimli arcus (shelf cloud)",
      },
      {
        title: "Tuba (Huni Bulutu) — Su Hortumu Habercisi",
        content:
          "Tuba, Cb veya güçlü TCu tabanından aşağı doğru uzanan dönen huni biçimli bulut çıkıntısıdır. Huni deniz yüzeyine ulaştığında su hortumu (waterspout) adını alır. Su hortumları özellikle sonbaharda, soğuk havanın hâlâ sıcak deniz üzerinden geçtiği dönemlerde (Akdeniz, Ege ve tropikal sular dahil) sık görülür. Çoğu su hortumu tornado şiddetinde olmasa da lokal olarak 40–60 knot dönel rüzgâr üretir ve küçük-orta tonajlı gemilerde güverte hasarı, filika ve anten kaybına yol açabilir. Tuba görüldüğünde hortumun hareket yönü kestirilerek dik açıyla uzaklaşılır; hortum geminin yoluna çıkarsa personel içeri alınır ve rüzgâr darbesine hazırlanılır.",
        image: tubaImage,
        imageAlt: "Bulut tabanından sarkan dönen huni biçimli tuba",
      },
      {
        title: "Lenticularis — Dağ Dalgası Bulutu",
        content:
          "Altocumulus lenticularis, mercek veya uçan daire biçimli, kenarları keskin, yerinde sabit duran buluttur. Güçlü rüzgârın dağ ya da yüksek ada üzerinden aşarken oluşturduğu duran hava dalgalarının tepesinde yoğuşur; bulut sabit görünse de içinden çok kuvvetli rüzgâr akar. Denizci için anlamı iki katmanlıdır: yüksek seviyelerde çok güçlü rüzgâr vardır ve dağlık kıyıların rüzgâr altısında şiddetli hamle rüzgârları (katabatik/dalga kaynaklı gust, rotor türbülansı) beklenmelidir. Dağlık kıyı seyrinde (fiyortlar, yüksek adalar, Cebelitarık benzeri geçitler) lenticularis görülmesi, ani ve şiddetli yerel rüzgâr riskine karşı uyarıdır; helikopter operasyonları için de türbülans işaretidir.",
        image: lenticularisImage,
        imageAlt: "Mercek biçimli, kenarları keskin lenticularis bulutu",
      },
      {
        title: "Virga — Yere Ulaşmayan Yağış",
        content:
          "Virga, bulut tabanından sarkan ancak yere/denize ulaşmadan buharlaşan yağış perdeleridir; bulutun altında gri saçaklar halinde görülür. Zararsız görünse de önemli bir dinamik uyarı taşır: yağışın kuru hava katmanında buharlaşması o katmanı hızla soğutur ve ağırlaşan hava şiddetli iniş akıntılarına (dry microburst) dönüşebilir. Yani virga, altındaki deniz yüzeyinde ani ve şiddetli, kısa süreli rüzgâr patlamaları olabileceğini gösterir. Konvektif bulutların altında yaygın virga görülüyorsa, görünürde yağış olmasa bile ani gust olasılığı hesaba katılmalı; pilot alma-verme ve vinç operasyonları gibi rüzgâra duyarlı işler bu hücrelerin geçişine göre zamanlanmalıdır.",
        image: virgaImage,
        imageAlt: "Bulut tabanından sarkıp yere ulaşmadan buharlaşan virga",
      },
    ],
    keyPoints: [
      "Mammatus şiddetli türbülans ve güçlü iniş akıntılarının işaretidir; yakınlarda kuvvetli Cb vardır.",
      "Arcus (shelf cloud) gust front'un görünür halidir: dakikalar içinde ani rüzgâr artışı ve şifti gelir.",
      "Tuba deniz yüzeyine ulaşırsa su hortumu oluşur; dik açıyla uzaklaşılır ve personel içeri alınır.",
      "Lenticularis güçlü üst rüzgârları ve dağlık kıyılarda ani hamle rüzgârı riskini, virga ise kuru mikropatlama olasılığını gösterir.",
    ],
  },
};
