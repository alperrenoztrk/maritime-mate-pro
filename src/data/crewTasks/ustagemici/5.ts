import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "İskele ve erişim ekipmanlarının kurulumu",
  roleSlug: "ustagemici",
  taskIndex: 5,
  estimatedPages: 24,
  intro: `Usta Gemici (AB), gemiye güvenli erişimi sağlayan iskele (gangway), accommodation ladder ve pilot ladder gibi ekipmanların kurulumu, kullanımı ve toplanmasının saha uygulayıcısıdır. Güvenlik ağı, can simidi (heaving line ile), yeterli aydınlatma ve pilot boarding arrangement'ın SOLAS gerekliliklerine uygun hazırlanması doğrudan can güvenliğiyle ilgilidir; her yıl pilot ladder ve gangway kaynaklı düşme ve boğulma kazaları yaşanır. Bu bölüm; gangway ve accommodation ladder kurulumunu, pilot ladder ve combination arrangement gereksinimlerini (SOLAS V/23, IMO Res. A.1045(27)), emniyet donanımının (net, simit, ışık) hazırlanmasını, pilot transfer operasyonunu ve tipik kaza derslerini AB perspektifinden adım adım açıklar.`,
  sources: [
    "SOLAS Chapter V — Reg. 23, Pilot Transfer Arrangements",
    "IMO Resolution A.1045(27) — Pilot Transfer Arrangements",
    "IMO Resolution A.1108(31) ve ilgili güncellemeler — pilot ladder gereklilikleri",
    "ISO 799 — Ships and marine technology — Pilot ladders",
    "SOLAS Chapter II-1 / Load Line — gangway ve erişim donanımı genel gereklilik",
    "ILO/MLC 2006 — güvenli erişim (safe means of access)",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "ICS/IMPA — Pilot Boarding Arrangements poster ve rehberleri",
  ],
  chapters: [
    {
      heading: "1. Güvenli Erişim İlkesi ve AB'nin Rolü",
      lead: `Gemiye/gemiden güvenli erişim (safe means of access) yasal bir zorunluluktur; AB, erişim ekipmanını doğru kurar, denetler ve kullanan herkesin güvenliğini gözetir.`,
      sections: [
        {
          subheading: "1.1 Erişim ekipmanı türleri ve seçimi",
          paragraphs: [
            `Gemiye erişim; rıhtım yüksekliği, freeboard ve operasyona göre gangway (iskele), accommodation ladder (borda merdiveni) veya bunların kombinasyonu ile sağlanır. Pilot transferi için ise pilot ladder ve gerektiğinde combination arrangement (accommodation ladder + pilot ladder) kullanılır. AB, hangi ekipmanın hangi koşulda kullanılacağını reisten/zabitten öğrenir.`,
            `Erişim ekipmanı, güvenli açıyla, sağlam bağlanmış, kaymaz basamaklı ve uygun aydınlatmalı olmalıdır. Kurulum sonrası kullanılmadan önce AB ve zabit ekipmanı kontrol eder; gevşek bağlantı, çatlak basamak, eksik korkuluk veya yetersiz ışık varsa kullanılmaz. Erişim güvenliği "sonra düzeltiriz" konusu değildir.`,
          ],
          bullets: [
            `Güvenli erişim yasal zorunluluktur`,
            `Gangway, accommodation ladder, pilot ladder duruma göre seçilir`,
            `Kullanım öncesi zorunlu kontrol yapılır`,
            `Kusurlu ekipman kullanılmaz, raporlanır`,
          ],
        },
        {
          subheading: "1.2 Kurulum öncesi risk değerlendirmesi",
          paragraphs: [
            `Kurulum öncesi AB; düşme, ezilme, sıkışma, gerilen halatın kopması ve denize düşme risklerini değerlendirir. Yüksek/overside çalışma içeriyorsa emniyet kemeri (safety harness), can simidi + can halatı standby ve uygun hava/deniz koşulu gerekir. PPE (baret, eldiven, kaymaz bot, can yeleği gerektiğinde) eksiksiz kullanılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC / SOLAS — güvenli erişim",
              text: `MLC 2006 ve SOLAS, gemiye güvenli erişim sağlanmasını ve bu erişimin güvenlik ağı, korkuluk ve aydınlatma ile donatılmasını gerektirir. Eksik veya kusurlu erişim, liman kontrolünde (PSC) tutulma sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Gangway ve Accommodation Ladder Kurulumu",
      sections: [
        {
          subheading: "2.1 Gangway kurulumu ve emniyeti",
          paragraphs: [
            `Gangway, vinç/davit ile kaldırılıp rıhtıma/iskeleye uygun açıyla yerleştirilir. AB, gangway'in alt ucunun rıhtımda sağlam ve kaymayacak şekilde oturduğunu, tekerlek/destek ayağının düzgün çalıştığını ve gel-git/draft değişiminde gangway'in serbest hareket edebileceğini (sıkışmadan) kontrol eder. Korkuluk halatları/zincirleri her iki yanda gergin olmalıdır.`,
            `Gangway altına ve yanına düşmeyi önleyen güvenlik ağı (safety net) gerilir; ağ, rıhtım ile gemi arasındaki boşluğu kaplayacak genişlikte ve sağlam bağlanmış olmalıdır. Gel-git nedeniyle açının değişeceği unutulmamalı; gangway periyodik kontrol edilip ayarlanır. Aşırı dik veya yatay açı düşme riskini artırır.`,
          ],
          table: {
            caption: `Gangway / Accommodation Ladder Kontrol Noktaları`,
            headers: ["Kontrol", "Beklenen Durum", "Risk"],
            rows: [
              ["Açı / eğim", "Güvenli, yürünebilir eğim", "Çok dik → düşme"],
              ["Alt uç oturması", "Sağlam, kaymıyor", "Kayma → düşme"],
              ["Korkuluk/halat", "İki yanda gergin", "Boşluk → denize düşme"],
              ["Güvenlik ağı", "Boşluğu kapatıyor", "Eksik ağ → boğulma"],
              ["Aydınlatma", "Yeterli, gözü almıyor", "Karanlık → düşme"],
              ["Can simidi + halat", "Erişilebilir, hazır", "Yok → kurtarma gecikir"],
            ],
          },
        },
        {
          subheading: "2.2 Accommodation ladder (borda merdiveni)",
          paragraphs: [
            `Accommodation ladder, geminin bordasına monte, basamakları daima yatay kalacak şekilde tasarlanmış borda merdivenidir. AB, merdivenin alt platformunun (lower platform) güvenli açıda durduğunu, basamakların kaymaz ve sağlam olduğunu, korkulukların kurulu olduğunu kontrol eder. SWL (güvenli çalışma yükü) aşılmaz; aynı anda izin verilen kişi sayısına uyulur.`,
            `Vinçle indirme/kaldırmada halat, troley ve frenlerin sağlam çalıştığı doğrulanır; kişi merdiven üzerindeyken kesinlikle hareket ettirilmez. Combination arrangement'ta accommodation ladder ile pilot ladder birlikte kullanıldığında geçiş noktasının güvenliği özellikle önemlidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gel-git ve draft değişimini izle",
              text: `Yükleme/boşaltma sırasında draft değişir, gel-git rıhtım yüksekliğini değiştirir; gangway/accommodation ladder açısı buna göre sürekli ayarlanmazsa sıkışır veya tehlikeli eğime gelir. Periyodik kontrol şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Pilot Ladder ve SOLAS Gereklilikleri",
      lead: `Pilot transferi denizciliğin en riskli rutin operasyonlarındandır; pilot ladder'ın SOLAS V/23 ve A.1045(27)'ye birebir uygun kurulması hayatidir.`,
      sections: [
        {
          subheading: "3.1 Pilot ladder yapısı ve kurulum kuralları",
          paragraphs: [
            `Pilot ladder; sağlam yan halatlar (side ropes), kaymaz ve yatay duran basamaklar (steps) ve belirli aralıklarla dönmeyi önleyen geniş basamaklardan (spreader steps) oluşur. Basamaklar eşit aralıklı, çatlaksız ve boyasız (boya çatlağı gizler) olmalıdır. Ladder, geminin bordasına sağlam bağlanır; manrope (tutamak halatı) talep edildiğinde kurulur.`,
            `Pilot ladder'ın su seviyesinden istenen yüksekliğe (genelde pilot botu güvertesi hizası) ayarlanması gerekir; çok uzun/kısa ladder tehlikelidir. 9 metreden fazla tırmanış gerekiyorsa combination arrangement (accommodation ladder + pilot ladder) zorunludur. AB, kurulum sonrası ladder'ı görsel kontrol eder; eksik basamak, kopuk halat, gevşek bağlantı varsa kullanılmaz.`,
          ],
          table: {
            caption: `Pilot Ladder Temel Gereklilikleri (özet)`,
            headers: ["Unsur", "Gereklilik (özet)", "Kontrol"],
            rows: [
              ["Basamaklar", "Yatay, kaymaz, eşit aralıklı", "Çatlak/eksik yok"],
              ["Yan halatlar", "Sağlam, eşit gergin", "Aşınma/kopukluk yok"],
              ["Spreader step", "Dönmeyi önler, geniş", "Doğru konumda"],
              ["Tırmanış yüksekliği", ">9 m ise combination", "Doğru düzenleme"],
              ["Manrope", "Talep halinde kurulur", "Sağlam bağlı"],
              ["Bağlantı / securing", "Bordaya sağlam", "Gevşeklik yok"],
            ],
          },
        },
        {
          subheading: "3.2 Combination arrangement ve geçiş güvenliği",
          paragraphs: [
            `Combination arrangement'ta pilot ladder, accommodation ladder'ın alt platformuyla birleştirilir; pilot önce pilot ladder'a, sonra platforma çıkar. Geçiş noktası (transfer point) en kritik bölgedir: platform yatay, korkuluklu ve pilot ladder ile aynı hizada olmalı, geçişte boşluk/yükseklik farkı bulunmamalıdır. AB bu birleşimi kuralına uygun ayarlar.`,
            `Bütün düzenek, IMPA/SOLAS posterindeki şemaya uygun kurulmalı; pilot, güvenli olmayan bir düzenek gördüğünde transferi reddedebilir ve bu gemiyi geciktirir/raporlar. AB, "yaklaşık doğru" değil, şemaya birebir uygun kurulumu hedefler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/23 — pilot transfer düzeni",
              text: `Pilot transfer arrangement'ı SOLAS V/23 ve A.1045(27)'ye tam uymalıdır; basamak, yan halat, spreader, yükseklik ve combination kuralları bağlayıcıdır. Uygunsuz düzenek pilotun yaralanması/ölümü ve PSC tutulması riski taşır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Emniyet Donanımı: Net, Simit ve Aydınlatma",
      sections: [
        {
          subheading: "4.1 Can simidi, heaving line ve kurtarma hazırlığı",
          paragraphs: [
            `Erişim noktasında, ışıklı/dumanlı işaretli can simidi (lifebuoy with self-igniting light) ve buna bağlı heaving line (atma halatı) hazır bulundurulur. Pilot/personel denize düşerse, AB derhal simidi atar, gözle takip eder ve alarmı verir. Kurtarma teknesi/MOB botu hazır olmalı; gece transferinde projektör suyu aydınlatmaya hazır olur.`,
            `AB, denize düşme anında ne yapacağını ezbere bilmelidir: simit at, "man overboard" diye bağır, kişiyi gözden kaybetme, köprüye haber ver. Saniyeler hayat kurtarır; tereddüt ve yer arama (simit nerede?) gecikme yaratır, bu yüzden ekipman her zaman aynı, erişilebilir yerde hazır tutulur.`,
          ],
          bullets: [
            `Işıklı can simidi + heaving line erişim noktasında hazır`,
            `Denize düşmede: simit at, bağır, gözle takip, köprüye haber`,
            `Gece projektörü suyu aydınlatmaya hazır`,
            `Kurtarma teknesi/MOB botu standby`,
          ],
        },
        {
          subheading: "4.2 Aydınlatma ve gece transferi",
          paragraphs: [
            `Gangway, ladder ve pilot transfer noktası gece yeterince aydınlatılmalı; ancak ışık pilotun/personelin gözünü almayacak şekilde konumlandırılır. Pilot ladder bölgesi ışıklandırılırken ladder ve su yüzeyi görünür olmalı, gölge bırakılmamalıdır. Yedek aydınlatma (taşınabilir lamba) hazır tutulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Işığı doğru konumlandır",
              text: `Aydınlatma tırmananın gözünü almamalı; ladder ve su yüzeyini yandan/yukarıdan aydınlatan, gölge bırakmayan düzen tercih edilir. Gözü kamaştıran ışık, karanlıktan daha tehlikeli olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Pilot Transfer Operasyonunun Yürütülmesi",
      sections: [
        {
          subheading: "5.1 Transfer sırasında AB'nin görevi",
          paragraphs: [
            `Pilot biniş/inişinde AB; ladder bölgesinde durur, pilotun tırmanışını gözler, gerekirse manrope ve evrak çantası halatıyla yardım eder ve emniyet donanımını (simit, ışık) gözetir. Pilot tam güverteye çıkana/inip botuna geçene kadar dikkat kesilir. Pilotu karşılayan kişi onu güvenli yoldan köprüüstüne yönlendirir.`,
            `Transfer sırasında gemi hızı, rüzgâr ve dalga durumu önemlidir; köprü, pilot botuna rüzgâr altı (lee) tarafı oluşturacak şekilde manevra yapar. AB, ladder'ın bordaya çarpmaması, takılmaması ve botla gemi arasında sıkışma olmaması için durumu izler ve tehlikede köprüyü/zabiti uyarır.`,
          ],
        },
        {
          subheading: "5.2 Operasyon sonrası toplama ve bakım",
          paragraphs: [
            `Operasyon bitince pilot ladder dikkatlice toplanır, kuru ve havalandırılmış yerde, gerilmeden ve ezilmeden saklanır; ıslak/kıvrılmış saklamak halatı çürütür. AB, ladder'ı toplarken hasar (kopuk lif, çatlak basamak) kontrol eder ve bulduğu kusuru raporlar. Gangway/accommodation ladder güvenli konuma alınır ve kilitlenir.`,
            `Pilot ladder düzenli görsel ve periyodik denetimden geçer; eskimiş ladder servis dışı bırakılır. AB, ladder'ı temiz, boyasız ve etiketli (üretim/servis bilgisi) tutulmasına destek verir. Bakımsız bir pilot ladder ölümcül kazaların başlıca nedenidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Pilot ladder boyanmaz",
              text: `Pilot ladder'a boya sürmek basamak/halat çatlaklarını gizler ve kayganlaştırır; bu yüzden boyasız tutulur. Boyalı, ezilmiş veya ıslak saklanan ladder gizli kusur taşır ve aniden kopabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "6.1 Pilot ladder kaynaklı düşme vakaları",
          paragraphs: [
            `Pilot her yıl ladder kaynaklı kazalarda yaralanır veya hayatını kaybeder; başlıca nedenler: yanlış sabitleme (securing), eksik/kırık basamak, yanlış yükseklik, eksik combination düzeni ve kusurlu/yıpranmış ladder. Bu kazaların çoğu, kurulum kuralına birebir uyulsaydı önlenebilirdi.`,
            `IMPA/IMO posterindeki uyarılara rağmen "shackle ile basamak sabitleme", "uygun olmayan combination", "magnetic/manyetik takozla bağlama" gibi kurallara aykırı uygulamalar kazalara yol açmıştır. AB, gördüğü uygunsuzluğu düzeltmeli veya zabite raporlamalı; pilotun reddetme hakkı vardır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: kopan yan halat",
              text: `Yıpranmış ve görsel kontrolü ihmal edilmiş bir pilot ladder'ın yan halatı, pilot tırmanırken koptu ve pilot denize düştü. Ders: her kullanım öncesi pilot ladder görsel kontrolden geçmeli, kusurlu ladder kesinlikle kullanılmamalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Gangway ve emniyet donanımı ihmalleri",
          paragraphs: [
            `Güvenlik ağının eksik gerilmesi, can simidinin erişim noktasında bulunmaması, gel-git/draft değişiminin izlenmemesi ve yetersiz aydınlatma; gangway kaynaklı düşme ve boğulma kazalarının ana nedenleridir. AB, erişim noktasını tam donanımlı ve sürekli kontrol edilen bir alan olarak ele almalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Erişim ekipmanı kurulum checklist'i",
          bullets: [
            `Doğru erişim ekipmanı seçildi ve risk değerlendirildi mi?`,
            `Gangway açısı/oturması güvenli, korkuluk ve güvenlik ağı tam mı?`,
            `Accommodation ladder basamak/platform/korkuluk sağlam, SWL aşılmadı mı?`,
            `Pilot ladder SOLAS V/23'e uygun (basamak, yan halat, spreader, yükseklik) mi?`,
            `>9 m tırmanışta combination arrangement kuruldu mu?`,
            `Pilot ladder boyasız, çatlaksız, sağlam bağlı mı?`,
            `Işıklı can simidi + heaving line erişim noktasında hazır mı?`,
            `Aydınlatma yeterli ve gözü almıyor mu?`,
            `Operasyon sonrası ekipman kontrol edilip kuru saklandı mı?`,
          ],
          paragraphs: [
            `İskele ve erişim ekipmanlarının kurulumu, sıradan görünen ama ihmali doğrudan ölümle sonuçlanabilen bir görevdir. AB'nin disiplini; pilot ladder'ın her basamağını, gangway'in her korkuluğunu ve güvenlik ağının her bağını kuralına uygun kurmasında somutlaşır. Bir pilotun, bir personelin ya da bir misafirin gemiye güvenle çıkıp inmesi; AB'nin "yaklaşık değil, tam doğru" kurulum anlayışına bağlıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
