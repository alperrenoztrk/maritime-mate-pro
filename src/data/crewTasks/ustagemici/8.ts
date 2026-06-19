import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yüksekte ve overside çalışma",
  roleSlug: "ustagemici",
  taskIndex: 8,
  estimatedPages: 25,
  intro: `Usta Gemici (AB); direk (mast), baca (funnel), kargo vinçleri (cranes/derricks), ambar ağzı çerçevesi (hatch coaming) ve borda üstü (overside) gibi yüksek ve/veya denize açık alanlarda çalışır. Bu işler, denizcilikte ölümlü kazaların başında gelen düşme ve adam denize düşme (man overboard) risklerini taşır. Çalışma; Permit to Work'e bağlı yapılır, çift karabinalı (twin lanyard) emniyet kemeri doğru bağlanır, düşme durdurma (fall arrest) sistemi kullanılır, overside çalışmada can simidi + can halatı standby tutulur ve hava/deniz koşullarının uygunluğu zorunludur. Bu bölüm; yüksekte/overside çalışmanın risk değerlendirmesini, Permit to Work sistemini, fall arrest ve harness disiplinini, iskele/sandalye/bosun's chair ve overside donanımını, MOB hazırlığını ve tipik kaza derslerini AB perspektifinden adım adım açıklar.`,
  sources: [
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — working aloft and outboard",
    "ISM Code — Permit to Work ve risk değerlendirme sistemi",
    "SOLAS — man overboard ve kurtarma düzeni gereklilikleri",
    "ILO/MLC 2006 — çalışma ortamı sağlık ve güvenliği",
    "EN 361 / EN 354-355 — full body harness ve lanyard standartları (referans)",
    "IMCA / OCIMF Safety Flashes — working at height ve overside vakaları",
    "P&I Loss Prevention — fall from height ve MOB kaza analizleri",
    "Geminin SMS — Working Aloft / Overside prosedürleri ve permit formları",
  ],
  chapters: [
    {
      heading: "1. Yüksekte/Overside Çalışmada Risk ve AB'nin Rolü",
      lead: `Yüksekte ve overside çalışma, denizcilikte ölümlü kazaların başlıca kaynağıdır; bu nedenle hiçbir adım atlanamaz ve her iş izinle, kontrolle yürütülür.`,
      sections: [
        {
          subheading: "1.1 Tehlikenin doğası",
          paragraphs: [
            `Yüksekte çalışmada (working aloft) temel tehlike düşmedir: kayma, dengesizlik, ekipman arızası veya geminin yalpası kişiyi düşürebilir. Overside (borda üstü) çalışmada buna adam denize düşme (man overboard) eklenir; soğuk suya düşen kişi hipotermi ve boğulma riskiyle karşılaşır, ayrıca seyir halinde pervane riski vardır. Bu iki risk birleştiğinde, overside çalışma gemideki en tehlikeli operasyonlardan biri olur.`,
            `Ek tehlikeler: çalışılan ekipmanın enerjisi (dönen radar anteni, sıcak baca gazı, elektrik), düşen takım/malzemenin aşağıdakine çarpması, yorgunluk ve hava/deniz koşulları. AB, çalışmaya başlamadan tüm bu riskleri değerlendirir ve uygun önlem alınmadan asla yukarı/dışarı çıkmaz.`,
          ],
          bullets: [
            `Yüksekte: düşme riski (kayma, yalpa, ekipman arızası)`,
            `Overside: ek olarak man overboard, hipotermi, pervane riski`,
            `Dönen anten, sıcak baca, elektrik gibi enerji tehlikeleri`,
            `Düşen takım, yorgunluk ve hava/deniz koşulu riskleri`,
          ],
        },
        {
          subheading: "1.2 Çalışma öncesi koşul ve yetki kontrolü",
          paragraphs: [
            `Yüksekte/overside çalışma yalnızca yetkili ve fiziksel/psikolojik olarak uygun personelce yapılır; baş dönmesi/yükseklik korkusu olan veya yorgun kişi bu işe verilmez. Çalışma, gerekli izin (permit) alınmadan ve hava/deniz koşulu uygun olmadan başlatılmaz. AB, kendini uygun hissetmiyorsa bunu reise/zabite bildirmekle yükümlüdür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COSWP — working aloft & outboard",
              text: `COSWP, yüksekte ve borda üstü çalışmanın risk değerlendirmesi, permit, uygun harness/fall arrest ve gözcü ile yapılmasını gerektirir. Bu önlemler, düşme ve MOB ölümlerini önlemek için tasarlanmıştır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Permit to Work (Çalışma İzni) Sistemi",
      sections: [
        {
          subheading: "2.1 Permit'in amacı ve içeriği",
          paragraphs: [
            `Permit to Work, yüksek riskli işin tüm önlemleri alınmadan başlamamasını güvence altına alan yazılı kontrol sistemidir. Yüksekte/overside permit'i; iş tanımını, konumu, riskleri, alınan önlemleri (harness, fall arrest, MOB hazırlığı), enerji izolasyonunu (radar/anten kapatma, elektrik kesme), gözcü atamasını, süreyi ve onaylayan zabiti içerir.`,
            `Permit süreli ve şart bağlıdır; iş bitince veya koşullar değişince (hava bozması, deniz dalgalanması) iptal edilir. AB, permit olmadan veya şartları sağlanmadan işe başlamaz; permit, "kâğıt iş" değil, herkesin güvenliğinin teyididir. İş öncesi tool-box talk ile herkes rolünü ve acil durumu öğrenir.`,
          ],
          table: {
            caption: `Yüksekte/Overside Permit'te Aranan Önlemler`,
            headers: ["Önlem", "Amaç", "Kontrol"],
            rows: [
              ["Full body harness + twin lanyard", "Düşmeyi durdurma", "Sağlam, sertifikalı, doğru bağlı"],
              ["Fall arrest / sabit nokta", "Düşme enerjisini emme", "Sağlam anchor point"],
              ["Enerji izolasyonu", "Anten/elektrik/baca riski", "Radar OFF, kilitle-etiketle"],
              ["MOB donanımı (overside)", "Denize düşeni kurtarma", "Simit+halat, kurtarma teknesi"],
              ["Gözcü (standby)", "İzleme ve alarm", "Atanmış, dikkati dağılmaz"],
              ["Hava/deniz koşulu", "Güvenli çalışma penceresi", "Uygun, kötüleşirse dur"],
            ],
          },
        },
        {
          subheading: "2.2 Enerji izolasyonu (lock-out/tag-out)",
          paragraphs: [
            `Direk veya baca yakınında çalışırken radar anteni, telsiz vericileri, whistle (düdük) ve elektrikli ekipman enerjisi kapatılır, kilitlenir ve etiketlenir (lock-out/tag-out). Dönen radar anteni darbe; verici radyasyon; ani düdük şok yaratabilir. AB, izolasyonun yapıldığını köprüüstünden teyit ettirmeden çalışmaya başlamaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Radar/anten enerjisini kilitle",
              text: `Direk/baca çevresinde çalışmadan önce radar, telsiz vericisi ve düdük enerjisi mutlaka kapatılıp kilitlenir-etiketlenir. Dönen anten veya aniden çalan düdük, çalışanı dengeden edip düşürebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Düşme Durdurma: Harness ve Fall Arrest",
      lead: `Düşmeyi önlemenin temeli; doğru takılmış full body harness, twin lanyard ile sürekli bağlı kalma ve sağlam sabit noktalardır.`,
      sections: [
        {
          subheading: "3.1 Full body harness ve doğru bağlama",
          paragraphs: [
            `Yüksekte/overside çalışmada full body harness (tüm vücut emniyet kemeri) kullanılır; bel kemeri (waist belt) tek başına düşme durdurma için yeterli değildir çünkü düşmede iç organ ve omurga yaralanması yapar. AB, harness'i doğru takar: bacak ve göğüs kayışları sıkı, tokalar bağlı, sırt D-halkası (dorsal D-ring) iki kürek arası ortada. Gevşek harness, düşmede kişiyi kayıp çıkarabilir.`,
            `Harness ve lanyard kullanım öncesi kontrol edilir: kesik/aşınmış dokuma, çatlak/deforme toka ve karabina, paslı/kilitlenmeyen snap-hook varsa kullanılmaz. Şok yaşamış (bir düşmeyi durdurmuş) harness servis dışı bırakılır. Ekipman sertifikalı ve periyodik denetimli olmalıdır.`,
          ],
          bullets: [
            `Full body harness kullanılır; bel kemeri tek başına yetmez`,
            `Bacak/göğüs kayışları sıkı, dorsal D-ring iki kürek arası`,
            `Kesik/çatlak/aşınmış ekipman kullanılmaz`,
            `Şok yaşamış harness servis dışı bırakılır`,
          ],
        },
        {
          subheading: "3.2 Twin lanyard ile '100% tie-off' (sürekli bağlılık)",
          paragraphs: [
            `Çift karabinalı (twin/double lanyard) sistemin amacı, kişinin her an en az bir karabina ile sağlam noktaya bağlı kalmasıdır ("100% tie-off"). Konum değiştirirken bir karabina yeni noktaya takılır, ancak sonra diğeri sökülür; böylece bağlantı hiç kesilmez. Tek karabina ile çıkıp ara ara çözülmek, ölümcül düşme penceresi yaratır.`,
            `Lanyard mümkün olduğunca bel hizası veya üstündeki sabit noktaya (anchor point) bağlanır; bağlantı altta olursa düşme mesafesi (fall distance) artar ve daha yüksek darbe oluşur. Shock-absorbing (enerji emici) lanyard, düşme darbesini vücut için güvenli seviyeye düşürür. AB, sabit noktanın gerçekten yük taşıyabileceğini teyit eder; korkuluk/zayıf boru anchor olarak güvenilmez.`,
          ],
          table: {
            caption: `Fall Arrest Doğru/Yanlış Uygulama`,
            headers: ["Konu", "Doğru", "Yanlış (tehlikeli)"],
            rows: [
              ["Bağlılık", "Her an en az bir karabina bağlı", "Tek lanyard, ara ara çözülme"],
              ["Anchor noktası", "Sağlam, bel hizası/üstü", "Zayıf boru, ayak altı"],
              ["Lanyard tipi", "Enerji emici (shock-absorbing)", "Sert/kısa, yüksek darbe"],
              ["Kemer", "Full body harness", "Sadece bel kemeri"],
              ["Düşme mesafesi", "Hesaplanmış, yere çarpmaz", "Uzun düşme, zemine temas"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Erişim Donanımı: Bosun's Chair, Stage ve Overside Düzeni",
      sections: [
        {
          subheading: "4.1 Bosun's chair, stage ve halat kontrolü",
          paragraphs: [
            `Yüksekte/overside erişimde bosun's chair (denizci sandalyesi), stage (asma iskele platformu) veya iskele kullanılır. Kaldırma/taşıma halatı (gantline) ve emniyet halatı AYRI olmalı; biri kopsa diğeri tutsun. AB, halatların sağlamlığını, bağlantı düğümlerini/kilitlerini ve makara-blok donanımını kontrol eder. Halat keskin kenardan geçiyorsa kenar koruyucu (chafe guard) konur.`,
            `Bosun's chair'da çalışan kişi ayrıca harness + bağımsız fall arrest (ayrı emniyet halatına bağlı) kullanır; sandalye halatına güvenmek tek nokta arızası riskidir. Stage/iskele kurulumunda da bağımsız bir can halatı (independent lifeline) ve harness şarttır. AB, "iki bağımsız sistem" ilkesini her zaman uygular.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İki bağımsız sistem",
              text: `Asla tek halata/sisteme güvenme. Kaldırma halatı + bağımsız emniyet halatı (fall arrest); biri arızalansa diğeri hayatta tutar. Bosun's chair veya stage halatı koparsa, harness'e bağlı ayrı lifeline seni tutar.`,
            },
          ],
        },
        {
          subheading: "4.2 Takım emniyeti ve düşen cisim önleme",
          paragraphs: [
            `Yüksekte kullanılan takım (anahtar, fırça, boya, sökülen parça) bağlanır (tool lanyard) veya kapalı çantada taşınır; düşen bir cisim aşağıdaki kişiyi öldürebilir. Altta çalışma alanı boşaltılır, "düşen cisim" uyarısı ve gerekirse bariyer konur. AB, üstte çalışırken aşağıdaki ekibi düşünür; alttakiler baret takar ve hareket hattından uzak durur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Düşen takım öldürür",
              text: `Direkten düşen küçük bir anahtar bile aşağıdakini öldürebilir. Tüm takımlar tool lanyard ile bağlanır veya kapalı taşınır; altta kimse durmaz, alan boşaltılır ve uyarı verilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Adam Denize Düşme (MOB) Hazırlığı ve Hava Koşulu",
      sections: [
        {
          subheading: "5.1 Overside çalışmada MOB standby",
          paragraphs: [
            `Overside çalışmada, ışıklı can simidi + can halatı (lifebuoy with line) çalışma noktasının hemen yanında hazır bulundurulur; ayrıca kurtarma teknesi/MOB botu ekibi hazır olur. Kişi denize düşerse gözcü derhal simidi atar, "man overboard" diye bağırır, kişiyi gözden kaybetmeden takip eder ve köprüye haber verir. Seyir halinde overside çalışma genelde yapılmaz; demir/liman/durağan koşul tercih edilir.`,
            `Soğuk sularda düşen kişide hipotermi dakikalar içinde başlar; hızlı kurtarma hayatidir. AB, denize düşme anında ne yapılacağını ezbere bilir ve MOB donanımının yerini, çalışmadan önce teyit eder. Gece overside çalışma ek aydınlatma ve daha sıkı önlem gerektirir.`,
          ],
          table: {
            caption: `Overside Çalışmada MOB Hazırlığı`,
            headers: ["Unsur", "Gereklilik", "Amaç"],
            rows: [
              ["Işıklı can simidi + halat", "Çalışma yanında hazır", "Düşeni hızla tutmak"],
              ["Gözcü (standby)", "Sürekli izleme", "Anında alarm/atış"],
              ["Kurtarma teknesi/MOB botu", "Ekip hazır", "Sudan alma"],
              ["Can yeleği (gerektiğinde)", "Çalışanda", "Suda yüzdürme"],
              ["Seyir durumu", "Genelde durağan/demirde", "Pervane/akıntı riskini azaltma"],
            ],
          },
        },
        {
          subheading: "5.2 Hava/deniz koşulu ve çalışmanın durdurulması",
          paragraphs: [
            `Yüksekte/overside çalışma yalnızca uygun hava ve deniz koşulunda yapılır; artan rüzgâr, yağış, buzlanma, geminin yalpası veya görüş düşmesi çalışmanın derhal durdurulmasını gerektirir. AB veya gözcü koşulların bozulduğunu görürse işi durdurur; "az kaldı, bitirelim" mantığı kazaya davetiyedir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: kötüleşen havada devam",
              text: `Rüzgâr ve yalpa artarken 'iş bitsin' diye devam edilen bir overside çalışmada personel dengesini kaybedip denize düştü. Ders: koşul bozulduğunda iş hemen durdurulur; bitirme baskısı asla güvenliğin önüne geçmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "6.1 Harness ve bağlanma hataları",
          paragraphs: [
            `Düşme kazalarının ana nedenleri: harness'in hiç takılmaması veya gevşek takılması, twin lanyard yerine tek lanyard ile ara ara çözülme, zayıf/uygunsuz anchor noktası seçimi ve bel kemeriyle (full body yerine) çalışma. Bu hataların her biri, bir düşme anında ölüm veya ağır yaralanma demektir.`,
            `"Sadece kısa bir iş" veya "deneyimliyim, gerek yok" düşüncesiyle harness/permit atlanması, tecrübeli denizcilerin bile öldüğü kazalara yol açmıştır. AB, deneyimin önlemin yerini tutmadığını bilir; her yüksekte/overside iş tam donanımla yapılır.`,
          ],
        },
        {
          subheading: "6.2 Enerji, takım ve MOB ihmalleri",
          paragraphs: [
            `Radar/anten enerjisinin kilitlenmemesi, düşen takımın altta yaralanma yapması ve overside çalışmada MOB donanımının hazır olmaması; raporlanan ciddi kazaların nedenleri arasındadır. AB, enerji izolasyonunu teyit etmeli, takımları bağlamalı ve MOB hazırlığını çalışma öncesi kontrol etmelidir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Safety Flash'lardan ders",
              text: `IMCA ve P&I safety flash'ları, yüksekte/overside kazalarının neredeyse tamamının önlenebilir olduğunu gösterir: doğru harness, 100% tie-off, enerji izolasyonu, takım bağlama ve MOB hazırlığı. Bu derslerin paylaşılması yeni kazaları önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Yüksekte/overside çalışma checklist'i",
          bullets: [
            `Permit to Work alındı, tool-box talk yapıldı, rolüm net mi?`,
            `Fiziksel/psikolojik olarak uygunum, hava/deniz koşulu elverişli mi?`,
            `Full body harness doğru takıldı (kayışlar sıkı, dorsal D-ring ortada) mı?`,
            `Twin lanyard ile her an en az bir karabina bağlı (100% tie-off) mı?`,
            `Anchor noktası sağlam, lanyard enerji emici mi?`,
            `Erişimde iki bağımsız sistem (kaldırma + ayrı emniyet halatı) var mı?`,
            `Radar/anten/elektrik enerjisi kilitlenip etiketlendi mi?`,
            `Takımlar bağlandı, alttaki alan boşaltıldı, uyarı verildi mi?`,
            `Overside ise MOB donanımı (simit+halat, gözcü, MOB botu) hazır mı?`,
            `Koşul bozulursa işi durdurma kararını verebilir miyim?`,
          ],
          paragraphs: [
            `Yüksekte ve overside çalışma, AB'nin en yüksek riskli görevlerindendir ve burada hiçbir kısayol affedilmez. Doğru takılmış bir harness, hiç kesilmeyen bir bağlantı, kilitlenmiş bir radar, bağlanmış bir takım ve hazır bekleyen bir can simidi; bir denizcinin direkten ya da bordadan eve sağ dönmesi ile dönmemesi arasındaki farktır. AB'nin ustalığı, "her zaman tam donanım, asla acele, koşul bozulunca dur" disiplininde somutlaşır; çünkü düşme ve denize düşme, ikinci şans tanımayan kazalardır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
