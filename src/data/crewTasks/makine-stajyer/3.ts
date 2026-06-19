import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Training Record Book (TRB) yönetimi",
  roleSlug: "makine-stajyer",
  taskIndex: 3,
  estimatedPages: 24,
  intro: `Training Record Book (TRB), makine stajyerinin gemide geçirdiği eğitim sürecini STCW Bölüm A-III/1 yeterlilik alanları çerçevesinde belgeleyen resmi kayıt defteridir. TRB; her görevi, gözlemi, eğitim modülünü ve değerlendirmeyi yapılandırılmış biçimde içerir ve eğitmen mühendisin (training officer) imzasıyla onaylanır. Tamamlanmış bir TRB, OOW (Officer of the Watch — Machinery) yeterlilik sınavına girebilmenin yasal ön koşuludur; eksik veya usulsüz doldurulmuş bir TRB staj döneminin tanınmamasına ve sınav hakkının ertelenmesine yol açabilir. Bu bölüm, TRB'nin yapısını, günlük doldurma disiplinini, onay sürecini ve idare denetimindeki kanıt değerini adım adım açıklar.`,
  sources: [
    "STCW Convention & Code — Chapter III, Regulation III/1 ve Table A-III/1",
    "STCW Code Section A-I/6 — Training and assessment",
    "STCW Code Section A-I/14 — Responsibilities of companies",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "ISM Code — Element 6 (Resources and Personnel)",
    "IMO/ILO/ISF onaylı Engine Cadet Training Record Book örnekleri",
    "Bayrak idaresi (Flag State) deniz hizmeti ve TRB yönergeleri",
    "Reeds Engineering Knowledge for Marine Engineers",
  ],
  chapters: [
    {
      heading: "1. TRB'nin Amacı ve Yasal Statüsü",
      lead: `TRB, bir hatıra defteri değil; STCW yeterlilik sisteminin temel kanıt belgesidir. Stajyerin sınava girme hakkı bu deftere bağlıdır.`,
      sections: [
        {
          subheading: "1.1 TRB neden zorunludur",
          paragraphs: [
            `STCW Bölüm A-III/1, makine vardiya mühendisi olabilmek için yapılandırılmış (structured) bir gemide eğitim programının tamamlanmasını şart koşar. Bu programın uygulandığının ve değerlendirildiğinin kanıtı TRB'dir. İdare (administration / flag state), adayın yeterlilik belgesini ancak onaylı bir TRB ve geçerli deniz hizmeti ile birlikte düzenler.`,
            `TRB; eğitim kuruluşu (akademi/MET institution), şirket ve gemi arasında köprü kuran bir belgedir. Akademide alınan teorik bilginin gemide pratiğe dönüştüğünü, her yetkinlik alanının fiilen uygulandığını ve yetkili bir mühendis tarafından değerlendirildiğini gösterir. Bu nedenle TRB "okul ile gemi arasındaki sözleşme" olarak da görülür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-I/6 — Eğitim ve değerlendirme",
              text: `Eğitim ve değerlendirme; nitelikli, yapılandırılmış ve izlenebilir olmalıdır. Değerlendiriciler uygun seviyede yeterli ve görevlendirilmiş kişiler olmalıdır. TRB, bu yapılandırılmış sürecin somut kaydıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 TRB ve sertifika zinciri",
          paragraphs: [
            `OOW (Engine) yeterlilik belgesine giden yolda üç kanıt zinciri vardır: (1) onaylı deniz hizmeti süresi (Sea Service), (2) tamamlanmış TRB, (3) zorunlu kurslar (firefighting, survival, medical first aid, security awareness vb.) ve sonunda yeterlilik sınavı. TRB bu zincirin orta halkasıdır; eksikse diğer halkalar yeterli olmaz.`,
            `Stajyer, TRB'yi sınav dosyasının çekirdeği olarak görmelidir. İdare denetiminde "kaç ay denizde kaldın" sorusunun yanıtı Sea Service belgesinde, "ne öğrendin ve kanıtın ne" sorusunun yanıtı ise TRB'dedir. İkisi birbirini tamamlar.`,
          ],
          table: {
            caption: `OOW (Engine) Yeterliliğine Giden Kanıt Zinciri`,
            headers: ["Kanıt", "Neyi belgeler", "Onaylayan"],
            rows: [
              ["Sea Service Certificate", "Deniz hizmeti süresi", "Kaptan"],
              ["TRB", "Yetkinlik kazanımı", "Eğitmen mühendis (C/E)"],
              ["Kurs sertifikaları", "Zorunlu STCW kursları", "Onaylı eğitim merkezi"],
              ["Sağlık raporu", "Deniz görevine uygunluk", "Onaylı doktor"],
              ["Sınav", "Teorik/sözlü yeterlilik", "İdare/sınav kurulu"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. TRB'nin Yapısı ve Bölümleri",
      sections: [
        {
          subheading: "2.1 Tipik TRB bölümleri",
          paragraphs: [
            `Standart bir Engine Cadet TRB; kişisel bilgiler, gemi kayıt sayfaları (vessel record / particulars), aşinalık (familiarization) kontrol listeleri, yetkinlik görev kayıtları (task record), gözetmen değerlendirme sayfaları ve özet onay bölümlerinden oluşur. Her gemiye çıkışta gemi bilgileri (tip, tonaj, ana makine, sınıf) ilgili sayfaya işlenir.`,
            `TRB'nin kalbi, STCW Table A-III/1 yetkinlik alanlarını gemi görevlerine bağlayan task record bölümüdür. Burada her görev için "ne yapıldı, ne zaman, hangi yetkinliğe karşılık geliyor, eğitmen değerlendirmesi" alanları doldurulur. Familiarization bölümü ise gemiye ilk çıkışta tamamlanır ve emniyet/çıkış/ekipman tanıtımını belgeler.`,
          ],
          bullets: [
            `Kişisel bilgiler ve discharge book/cüzdan referansları`,
            `Gemi kayıt sayfaları (her gemi için ayrı)`,
            `Aşinalık (familiarization) kontrol listeleri`,
            `Yetkinlik görev kayıtları (task record sayfaları)`,
            `Aylık ilerleme ve gözetmen değerlendirme sayfaları`,
            `Eğitmen ve kaptan onay/imza bölümleri`,
          ],
        },
        {
          subheading: "2.2 STCW A-III/1 yetkinlik alanlarının TRB'ye yansıması",
          paragraphs: [
            `Table A-III/1 dört ana fonksiyon altında yetkinlik tanımlar: Marine Engineering, Electrical/Electronic and Control Engineering, Maintenance and Repair, ve Controlling Operation of the Ship and Care for Persons on Board. TRB görevleri bu fonksiyonlara dağıtılır; stajyer her fonksiyonda yeterli kanıt biriktirmelidir.`,
            `Örneğin "Maintain a safe engineering watch" yetkinliği vardiya katılım kayıtlarıyla, "Operate main and auxiliary machinery" yetkinliği sistem operasyon gözlemleriyle, "Maintenance and repair of shipboard machinery" yetkinliği bakım katılım kayıtlarıyla doldurulur. Stajyer hangi görevin hangi yetkinliği beslediğini bilerek defterini dengeli ilerletir.`,
          ],
          table: {
            caption: `Table A-III/1 Fonksiyonları ve TRB Görev Örnekleri`,
            headers: ["Fonksiyon", "Örnek yetkinlik", "Besleyen TRB görevi"],
            rows: [
              ["Marine Engineering", "Vardiya tutma", "Gözetimli vardiya katılımı"],
              ["Marine Engineering", "Ana/yardımcı makine işletimi", "Sistem start/stop gözlemi"],
              ["Electrical/Control", "Elektrik sistem izleme", "Switchboard/AMS gözlemi"],
              ["Maintenance/Repair", "Bakım ve onarım", "Pompa/valf overhaul desteği"],
              ["Controlling Operation", "Yangın/emniyet", "Tatbikat ve emniyet eğitimi"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Günlük Doldurma Disiplini",
      lead: `TRB sefer sonunda toplu doldurulan bir defter değildir. Günlük, somut ve zamanında doldurulmalıdır.`,
      sections: [
        {
          subheading: "3.1 Aynı gün kaydı ilkesi",
          paragraphs: [
            `Bir görev yapıldığı gün TRB'ye işlenmelidir. Bellek tazeyken yazılan kayıt; tarih, ekipman, yapılan işlem ve öğrenilen ders açısından doğru olur. Haftalar sonra toplu yazılan kayıtlar belirsiz, genel ve kanıt değeri zayıf olur; eğitmen mühendis de bu tür kayıtları onaylamakta zorlanır.`,
            `Stajyer, her vardiya veya bakım işi sonrası birkaç dakika ayırarak görevi kaydeder: hangi sistem, hangi işlem, gözlemler, kullanılan alet, dikkat edilen emniyet noktası. Bu disiplin hem TRB'yi besler hem de stajyerin kendi öğrenme günlüğü işlevi görür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "TRB için günlük 10 dakika",
              text: `Deneyimli stajyerler her gün sabit bir vakti (örneğin vardiya sonrası) TRB'ye ayırır. Günlük 10 dakika, sefer sonunda haftalarca süren ve kalitesiz kalan toplu doldurmadan çok daha değerlidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Etkili bir görev kaydının anatomisi",
          paragraphs: [
            `İyi bir TRB kaydı şu sorulara yanıt verir: Ne yapıldı? Hangi ekipman/sistem üzerinde? Hangi prosedür izlendi? Hangi emniyet önlemi alındı? Ne öğrenildi? "Pompaya baktım" değil, "No.2 transfer pompasının mekanik salmastra değişimine eğitmen gözetiminde yardım ettim; LOTO uygulandı, eski salmastra çıkarıldı, yeni gasket kesildi" şeklinde somut olmalıdır.`,
            `Kaydın sahte veya abartılı olmaması esastır. Stajyerin fiilen katılmadığı bir işi TRB'ye yazması ciddi bir disiplin ihlalidir; sözlü sınavda da bu görevler sorgulanır ve yüzeysel kayıtlar açığa çıkar. TRB, stajyerin gerçek yetkinliğinin aynasıdır.`,
          ],
          bullets: [
            `Tarih ve gemi adı net olmalı`,
            `İlgili STCW yetkinlik alanı/görev numarası belirtilmeli`,
            `Yapılan işlem somut ve doğrulanabilir olmalı`,
            `Alınan emniyet önlemleri (LOTO/PTW vb.) not edilmeli`,
            `Öğrenilen ders bir-iki cümleyle özetlenmeli`,
          ],
        },
      ],
    },
    {
      heading: "4. Eğitmen Mühendis Onay Süreci",
      sections: [
        {
          subheading: "4.1 Eğitmen mühendisin rolü",
          paragraphs: [
            `Gemide TRB sürecinden sorumlu kişi genellikle Başmühendis (Chief Engineer) veya görevlendirdiği kıdemli mühendistir (training officer). Eğitmen, stajyerin kayıtlarını okur, görevin gerçekten yapıldığını ve uygun seviyede gerçekleştiğini doğrular, gerekirse düzeltme ister ve uygun bulduğu kayıtları imzalar.`,
            `Onay sadece bir imza atma işlemi değildir; eğitmen, stajyerin yetkinliğini gözlemleyerek bir değerlendirme yapar. "Yapabilir mi, anladı mı, emniyetli mi çalışıyor?" sorularına yanıt arar. Bu nedenle stajyer, kayıtlarını düzenli aralıklarla (örneğin haftalık) imzaya sunmalı, sefer sonuna bırakmamalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-I/14 — Şirket sorumluluğu",
              text: `Şirket, gemide görevlendirilen personelin uygun eğitim ve aşinalık aldığından emin olmakla yükümlüdür. Yapılandırılmış gemide eğitim programının uygulanması ve TRB'nin onaylanması bu sorumluluğun parçasıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Düzenli imza ve geri bildirim ritmi",
          paragraphs: [
            `İdeal pratik, haftalık veya iki haftalık imza döngüsüdür. Bu ritimde eğitmen, taze kayıtları değerlendirir ve stajyere gelişim alanlarını gösterir. Sefer sonuna biriken yüzlerce kaydı toplu imzalamak hem eğitmeni zorlar hem de değerlendirmenin kalitesini düşürür.`,
            `Stajyer, her imza turunu bir geri bildirim fırsatına çevirmelidir: "Hangi yetkinlikte zayıfım, bir sonraki ay neye odaklanmalıyım?" Bu sorular, TRB'yi pasif bir kayıttan aktif bir gelişim aracına dönüştürür ve eğitmenle mentor ilişkisini güçlendirir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Aşinalık (Familiarization) Kayıtları",
      sections: [
        {
          subheading: "5.1 Gemiye ilk çıkışta tamamlananlar",
          paragraphs: [
            `Her yeni gemiye çıkışta TRB'nin familiarization bölümü öncelikli olarak doldurulur. Bu bölüm; emniyet ekipmanı yerleri, çıkış yolları (escape routes), muster station, can yeleği/dalış elbisesi yerleri, emniyet alarm sinyalleri, makine dairesi acil durdurma butonları ve kapalı alan giriş noktalarını kapsar. ISM Code, gemiye katılan her personelin görev öncesi aşinalık almasını şart koşar.`,
            `Aşinalık sadece bir kutu işaretleme egzersizi değildir; stajyerin ileride bağımsız hareket edebilmesi için geminin "haritasını" beynine yüklemesidir. Stajyer, gözü kapalı çıkış yolunu bulabilecek, acil durdurma butonunun yerini bilecek düzeye gelmelidir.`,
          ],
          bullets: [
            `Çıkış yolları ve acil aydınlatma`,
            `Muster station ve can kurtarma ekipmanı yerleri`,
            `Emniyet alarm sinyalleri ve anlamları`,
            `Makine dairesi emergency stop ve quick closing valve yerleri`,
            `Yangın söndürme istasyonları ve fixed sistem release noktaları`,
            `Kapalı alan giriş noktaları ve riskler`,
          ],
        },
        {
          subheading: "5.2 Aşinalığın TRB'deki kanıt değeri",
          paragraphs: [
            `PSC (Port State Control) ve şirket denetimlerinde, mürettebatın gemiye aşina olup olmadığı sorgulanır. TRB'deki imzalı familiarization kaydı, stajyerin bu eğitimi aldığının belgesidir. Eksik aşinalık kaydı hem denetimde bulgu hem de gerçek bir acil durumda ölümcül risk oluşturur.`,
            `Stajyer, gemi değişikliklerinde (yeni gemiye geçiş) familiarization'ı tekrar tamamlamayı unutmamalıdır. Her geminin yerleşimi, ekipmanı ve prosedürleri farklıdır; önceki gemiden gelen aşinalık yenisine otomatik aktarılmaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Denetimde aşinalık sorgusu",
              text: `Bir PSC denetiminde subay, stajyere "en yakın can salının yerini ve bırakma prosedürünü" sorar. Stajyer doğru yanıt verir ve TRB'deki imzalı familiarization kaydını gösterir. Bu, hem bireysel hazırlığın hem de gemideki eğitim kültürünün kanıtı sayılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Yetkinlik Dengesi ve Boşluk Yönetimi",
      sections: [
        {
          subheading: "6.1 Dengeli kanıt biriktirme",
          paragraphs: [
            `TRB'nin yaygın bir zaafı, bazı yetkinliklerin aşırı, bazılarının ise eksik doldurulmasıdır. Stajyer her gün vardiyaya gidiyorsa "watchkeeping" kaydı dolar ama "maintenance and repair" veya "electrical systems" zayıf kalabilir. Stajyer, defterindeki boşlukları periyodik olarak gözden geçirmeli ve eksik alanlara yönelmelidir.`,
            `Pratik yöntem, aylık bir öz-değerlendirme yapmaktır: hangi STCW fonksiyonu yeterince kanıtlandı, hangisi geride kaldı? Geride kalan alan için eğitmen mühendisten fırsat istenir ("önümüzdeki bakım planında elektrik panosu işine katılabilir miyim?"). Bu proaktif yaklaşım, sefer sonunda büyük boşluklarla kalmayı önler.`,
          ],
          table: {
            caption: `Aylık TRB Boşluk Analizi Örneği`,
            headers: ["Fonksiyon", "Durum", "Sonraki ay hedefi"],
            rows: [
              ["Watchkeeping", "Yeterli kanıt", "Sürdür"],
              ["Maintenance/Repair", "Eksik", "2 bakım işine katıl"],
              ["Electrical/Control", "Çok eksik", "Switchboard turu + 1 görev"],
              ["Fuel/LO systems", "Orta", "Purifier operasyonu gözle"],
              ["Safety/Emergency", "Yeterli", "Bir sonraki tatbikatı kaydet"],
            ],
          },
        },
        {
          subheading: "6.2 Birden fazla gemi ve süreklilik",
          paragraphs: [
            `Staj birden fazla gemide tamamlanabilir. Her gemi kayıt sayfası ayrı doldurulsa da yetkinlik kanıtları tek defterde birikir. Stajyer, gemi değiştirirken bir önceki gemideki boşluğu yenisinde kapatmayı planlamalıdır; örneğin önceki gemide tanker yakıt sistemi öğrenilmediyse yeni gemide bu fırsata öncelik verilir.`,
            `TRB'nin fiziksel güvenliği de süreklilik için kritiktir. Defter ıslanmamalı, kaybolmamalı ve sayfaları yırtılmamalıdır. Birçok stajyer, doldurulmuş sayfaların fotoğraf/tarama yedeğini alır; orijinal kaybolursa onaylı kayıtların izi kalır. Yine de resmi geçerlilik ıslak imzalı orijinaldedir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "TRB kaybı staj kaybıdır",
              text: `Kaybolan veya tahrip olan TRB, içindeki imzalı yetkinlik kanıtlarının yeniden üretilememesi nedeniyle staj döneminin büyük kısmının tanınmamasına yol açabilir. Defteri kuru, güvenli bir yerde sakla ve düzenli dijital yedek al.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. TRB ve Deniz Hizmeti Belgesinin İlişkisi",
      sections: [
        {
          subheading: "7.1 İki belgenin tamamlayıcılığı",
          paragraphs: [
            `Sea Service Certificate "ne kadar süre denizde kaldın" sorusunu, TRB ise "bu sürede ne öğrendin ve kanıtın ne" sorusunu yanıtlar. İdare, sınav başvurusunda her ikisini birlikte ister. Sadece deniz hizmeti süresi yeterli değildir; o sürede yapılandırılmış eğitimin tamamlandığı TRB ile kanıtlanmalıdır.`,
            `Stajyer, iki belgenin tarihlerinin tutarlı olmasına dikkat etmelidir: TRB'deki görev tarihleri, Sea Service'te belgelenen gemideki bulunma dönemiyle örtüşmelidir. Tutarsız tarihler denetimde sorgulanır ve belge geçerliliğini zedeler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: Sea Service Certificate",
              text: `Deniz hizmeti süresinin belgelenmesi için "Deniz hizmet belgesi (Sea Service Certificate) ve sertifika süreci" bölümüne bakınız. TRB ile Sea Service birlikte sınav dosyasını oluşturur.`,
            },
          ],
        },
        {
          subheading: "7.2 Sınav öncesi son kontrol",
          paragraphs: [
            `Sınav başvurusundan önce stajyer, TRB'yi baştan sona gözden geçirir: tüm zorunlu yetkinlikler kanıtlandı mı, tüm sayfalar imzalı mı, familiarization bölümleri her gemi için tamam mı, eğitmen ve kaptan onayları mevcut mu? Bu son kontrol, başvurunun eksik belge nedeniyle reddedilmesini önler.`,
            `İdarelerin TRB tamamlanma kriterleri farklılık gösterebilir; bayrak devleti yönergesi mutlaka okunur. Bazı idareler belirli görevlerin minimum tekrar sayısını ister, bazıları her fonksiyonda asgari kanıt arar. Stajyer, kendi bayrağının özel gerekliliklerini sefer başında öğrenmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Yaygın Hatalar ve Doğru Pratikler",
      sections: [
        {
          subheading: "8.1 Sık yapılan hatalar",
          paragraphs: [
            `En sık hata, TRB'yi sefer sonuna kadar boş bırakıp toplu doldurmaya çalışmaktır. Bu, hem kalitesiz hem de eğitmen tarafından onaylanması zor kayıtlar üretir. İkinci hata, görevleri belirsiz ve genel yazmaktır ("makineye baktım"); üçüncüsü ise yetkinlik dengesini gözetmeden sadece kolay ulaşılan görevleri kaydetmektir.`,
            `Dördüncü ciddi hata, fiilen yapılmamış işi TRB'ye yazmaktır. Bu, hem disiplin ihlali hem de sözlü sınavda açığa çıkacak bir risktir. TRB stajyerin dürüstlüğünün de testidir; abartılı bir defter, sınav görüşmesinde güvensizlik yaratır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte/abartılı kayıt riski",
              text: `Yapılmamış görevi TRB'ye yazmak veya yetkinliği abartmak, sözlü sınavda yüzeysel bilgiyle yakalanmaya yol açar ve adayın güvenilirliğini zedeler. Dürüst ve somut kayıt, en güçlü sınav hazırlığıdır.`,
            },
          ],
        },
        {
          subheading: "8.2 Doğru pratiklerin özeti",
          paragraphs: [
            `Doğru pratik şudur: günlük ve somut kayıt, haftalık imza ritmi, aylık boşluk analizi, dengeli yetkinlik dağılımı, her yeni gemide familiarization tekrarı ve defterin fiziksel güvenliği. Bu disiplinleri benimseyen stajyer, sefer sonunda eksiksiz ve güçlü bir TRB ile sınav dosyasına hazır olur.`,
            `TRB ayrıca stajyerin kariyer boyu sürecek bir öğrenme alışkanlığının ilk adımıdır. Sistematik kayıt, gözlem keskinliği ve öz-değerlendirme; ileride OOW, sonra Second/Chief Engineer olacak mühendisin temel meslek disiplinidir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Stajyerin TRB kontrol listesi",
          bullets: [
            `Görevleri aynı gün, somut ve yetkinlik alanına bağlı kaydettim mi?`,
            `Familiarization bölümünü her yeni gemide tamamladım mı?`,
            `Kayıtları haftalık olarak eğitmen mühendise imzalattım mı?`,
            `Aylık boşluk analizi yapıp eksik yetkinliklere yöneldim mi?`,
            `STCW A-III/1 fonksiyonlarının hepsinde dengeli kanıt var mı?`,
            `TRB tarihleri Sea Service belgesiyle tutarlı mı?`,
            `Kaptan/eğitmen onayları ve imzaları eksiksiz mi?`,
            `Defterin fiziksel güvenliğini sağlayıp dijital yedek aldım mı?`,
          ],
          paragraphs: [
            `TRB yönetimi, makine stajyerinin sertifika yolculuğundaki en somut sorumluluğudur. İyi yönetilen bir defter, sadece sınav hakkını güvence altına almakla kalmaz; stajyerin gerçek yetkinliğini, dürüstlüğünü ve meslek disiplinini de belgeler. Günlük doldurma disiplini, dengeli yetkinlik kanıtı ve düzenli onay; eksiksiz bir TRB'nin üç temel taşıdır. Bu defteri ihmal eden stajyer, denizde geçirdiği değerli ayların kanıtsız kalması riskiyle karşı karşıyadır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
