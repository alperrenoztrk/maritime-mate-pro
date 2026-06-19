import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Hazırlık bildirisi (NOR) ve yük belgeleri yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 11,
  estimatedPages: 24,
  intro: `Birinci Zabit, geminin ticari operasyonundaki kritik belgeleri hazırlayan ve imzalayan kişidir. Notice of Readiness (NOR), geminin yükleme/boşaltmaya hazır olduğunun charterer veya terminal operatörüne resmi bildirimidir; zamanlaması charter party kapsamında laytime ve demurrage hesabını doğrudan etkiler. Statement of Facts (SoF) tüm port operasyonunu kayıt altına alır; Mate's Receipt kargo miktarını ve görünür durumunu teyit eder; şüpheli yük için Letter of Protest düzenlenir. Bu belgelerdeki bir hata, şirkete on binlerce dolar kaybettirebilir. Bu bölüm, Birinci Zabit'in ticari/hukuki belge yönetimini açıklar.`,
  sources: [
    "Charter Party Forms (GENCON, ASBATANKVOY, NYPE, BALTIME)",
    "Hague-Visby Rules (Carriage of Goods by Sea)",
    "Laytime Definitions for Charter Parties 2013 (BIMCO/CMI/FONASBA/INTERCARGO)",
    "ISGOTT 6 — Documentation",
    "SOLAS VI/2 — Cargo Information & VGM (SOLAS amendment 2016)",
    "BIMCO Standard Documentary Clauses",
    "P&I Club Loss Prevention Guidance (Mate's Receipt, B/L clausing)",
    "IMSBC / IMDG Code — Cargo Declarations",
  ],
  chapters: [
    {
      heading: "1. Charter Party ve Ticari Çerçeve",
      lead: `Belgeleri doğru hazırlamak için Birinci Zabit önce taşıma sözleşmesinin temel kavramlarını bilmelidir.`,
      sections: [
        {
          subheading: "1.1 Charter party türleri",
          paragraphs: [
            `Bir geminin ticari kullanımı charter party (C/P) ile düzenlenir. Voyage charter'da gemi belirli bir sefer için, time charter'da belirli bir süre için kiralanır; bareboat charter'da gemi tamamen kiracıya geçer. NOR, laytime ve demurrage kavramları özellikle voyage charter'da kritiktir çünkü liman zamanı maliyeti taraflar arasında bu belgelerle paylaşılır.`,
            `Yaygın C/P formları: kuru yükte GENCON, tankerde ASBATANKVOY, time charter'da NYPE/BALTIME. Birinci Zabit, geçerli C/P'nin NOR şartlarını, laytime başlangıç koşullarını ve özel maddelerini (rider clauses) bilmelidir; çünkü bunlar belge zamanlamasını belirler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Laytime ve demurrage",
              text: `Laytime, charterer'a yükleme/boşaltma için tanınan süredir. Bu süre aşılırsa demurrage (gemi sahibine ödenen gecikme bedeli) işler; erken bitirilirse despatch (charterer'a iade) doğabilir. NOR ve SoF, bu hesabın temel belgeleridir.`,
            },
          ],
        },
        {
          subheading: "1.2 Birinci Zabit'in ticari rolü",
          paragraphs: [
            `Birinci Zabit, denizci olmasının yanında geminin ticari çıkarlarının saha temsilcisidir. Doğru ve zamanında belge, demurrage gelirini güvence altına alır ve haksız claim'lere karşı gemiyi korur. Hatalı veya geç belge, şirketi mahkemede savunmasız bırakır. Bu yüzden belge titizliği, denizcilik becerisi kadar önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Notice of Readiness (NOR)",
      sections: [
        {
          subheading: "2.1 NOR'un koşulları ve zamanlaması",
          paragraphs: [
            `NOR, geminin yüke/boşaltmaya fiilen ve hukuken hazır olduğunu (physically and legally ready) bildirir. Gemi, doğru rıhtıma/demir yerine varmış, gerekli serbest pratika ve gümrük formalitelerini tamamlamış ve hold/tank'ları hazır olmalıdır. Bu koşullar sağlanmadan verilen NOR geçersiz (invalid) sayılır ve laytime başlamaz; bu da demurrage kaybına yol açar.`,
            `NOR verilme yeri (berth, anchorage, "Whether In Berth Or Not — WIBON") ve verilme şekli (yazılı, e-posta, mektup, telgraf) C/P'de tanımlıdır. Birinci Zabit, NOR'u C/P'nin tam şartlarına uygun olarak hazırlar, zaman damgası ile verir ve teslim kanıtını saklar.`,
          ],
          table: {
            caption: `NOR Geçerlilik Koşulları`,
            headers: ["Koşul", "Açıklama", "Sağlanmazsa"],
            rows: [
              ["Arrived ship", "Doğru yer/rıhtım/anchorage'a varış", "NOR geçersiz"],
              ["Physical readiness", "Hold/tank hazır, gemi yüke uygun", "NOR geçersiz"],
              ["Legal readiness", "Free pratique, gümrük, evrak tamam", "NOR geçersiz"],
              ["Tendering", "C/P'ye uygun yer/şekil/saatte", "Laytime gecikir"],
            ],
          },
        },
        {
          subheading: "2.2 NOR ile ilgili sık uyuşmazlıklar",
          paragraphs: [
            `NOR uyuşmazlıkları laytime davalarının çoğunu oluşturur. "Geminin gerçekten hazır olmadığı halde NOR verilmesi", "free pratique alınmadan tender", veya "yanlış yerde tender" gibi durumlar NOR'u geçersiz kılar. Birinci Zabit, NOR vermeden önce tüm hazırlık koşullarını teyit eder; "NOR tendered without prejudice" ibaresi bazı C/P'lerde kullanılır ama her zaman koruma sağlamaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Erken/geçersiz NOR riski",
              text: `Gemi hazır değilken verilen NOR, laytime'ı başlatmaz ve gemi sahibine demurrage kaybettirir. Çoğu C/P, geçersiz bir NOR'un otomatik olarak yenilenmediğini kabul eder; yeni geçerli bir NOR gerekir. NOR şartları titizlikle teyit edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Statement of Facts (SoF)",
      sections: [
        {
          subheading: "3.1 SoF'un içeriği ve önemi",
          paragraphs: [
            `Statement of Facts, port operasyonunun kronolojik kaydıdır: gemi varışı, NOR tendering ve acceptance, demir/yanaşma saatleri, operasyon başlangıç-bitiş, vardiya değişimleri, draft survey, hava bekletmeleri, ekipman arızaları ve tüm duraklamalar. Demurrage/laytime hesabı doğrudan SoF'tan yapılır; bu yüzden her olay gerçek zamanlı ve doğru kaydedilmelidir.`,
            `Birinci Zabit SoF'u hazırlar; terminal/agent ile birlikte imzalanır. Taraflar arasında zaman kaydında anlaşmazlık çıkarsa, "remarks" bölümüne çekince konur. SoF'taki bir saatlik hata, demurrage hesabında binlerce dolar fark yaratabilir.`,
          ],
        },
        {
          subheading: "3.2 Time sheet ve laytime hesabı",
          paragraphs: [
            `SoF'tan türetilen time sheet, laytime'ın nasıl tükendiğini gösterir: hangi süreler laytime'a sayıldı, hangileri istisna (excepted period — örn. hava, ekipman arızası) olarak hariç tutuldu. Birinci Zabit, laytime'a sayılmaması gereken duraklamaların (charterer/terminal kaynaklı) doğru kaydedildiğinden emin olur; bu, demurrage gelirini korur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gerçek zamanlı kayıt",
              text: `SoF'taki her olay yaşandığı anda kaydedilmelidir; sonradan hatırlamaya çalışmak hata ve uyuşmazlık doğurur. Hava bekletme, ekipman arızası ve charterer kaynaklı gecikmeler özellikle net kaydedilmelidir çünkü laytime hesabını doğrudan etkiler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Mate's Receipt ve Bill of Lading",
      sections: [
        {
          subheading: "4.1 Mate's Receipt ve kargo durumu teyidi",
          paragraphs: [
            `Mate's Receipt (MR), yükün gemiye fiilen alındığını ve "apparent order and condition" (görünür durumunu) belgeleyen dahili kayıttır. Birinci Zabit, yüklenen kargonun miktarını (draft survey/tally ile) ve durumunu kontrol eder. Yükte görünür hasar, ıslaklık, paslanma veya eksiklik varsa MR'ye uygun çekince (clausing/remarks) yazar.`,
            `MR üzerinden Bill of Lading hazırlandığı için, MR'deki durum tespiti doğrudan B/L'ye yansır. Hasarı kaydetmemek, gemiyi/şirketi o hasardan sorumlu tutar. Bu yüzden Birinci Zabit'in titiz kargo muayenesi hukuki koruma açısından kritiktir.`,
          ],
        },
        {
          subheading: "4.2 Clean vs claused Bill of Lading",
          paragraphs: [
            `Bill of Lading, yükün taşınmak üzere alındığını gösteren ve mülkiyet/taşıma belgesi işlevi gören temel evraktır. "Clean B/L", yükün kusursuz alındığını; "claused (dirty) B/L" ise çekince içeren durumu gösterir. Hasarlı yük için clean B/L imzalamak (genelde shipper baskısıyla, letter of indemnity karşılığı) ciddi P&I riskidir ve dolandırıcılık sayılabilir.`,
            `Birinci Zabit, MR'deki çekincelerin B/L'ye doğru yansımasını izler. Hague-Visby Rules, taşıyanın sorumluluğunu ve çekince hakkını düzenler. Yanlış clean B/L, taşıyanı yükün gerçek durumundan sorumlu kılar ve büyük claim'lere yol açar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Hague-Visby Rules & B/L clausing",
              text: `Taşıyan, yükün apparent order and condition'ını doğru beyan etmekle yükümlüdür. Görünür kusur varken clean B/L vermek, taşıyanı sonradan o kusurdan sorumlu tutar. P&I kulüpleri, hasarlı yük için clean B/L verilmesine karşı kesin uyarır.`,
            },
            {
              type: "example",
              title: "Vaka — letter of indemnity tuzağı",
              text: `Paslı çelik yükü için shipper, clean B/L karşılığında letter of indemnity (LOI) sundu. Yük varışta hasarlı çıkınca alıcı dava açtı; çoğu yargı LOI'yi dolandırıcılık temelinde geçersiz saydı ve gemi/şirket sorumlu tutuldu. Ders: gerçek durumu yansıtan claused B/L tek güvenli yoldur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Letter of Protest (LOP)",
      sections: [
        {
          subheading: "5.1 LOP'un amacı ve kullanımı",
          paragraphs: [
            `Letter of Protest, gemi adına bir durumun resmi olarak protesto edilmesi/kayda geçirilmesidir. Birinci Zabit; yavaş loading/discharge rate, ekipman arızası, kargo miktarı uyuşmazlığı (gemi figure vs shore figure), kontamine/hasarlı yük, kötü hold hazırlığı talebi veya haksız bekletme gibi durumlarda LOP düzenler. LOP, ileride çıkacak claim'de delil oluşturur.`,
            `LOP, ilgili tarafa (terminal, charterer, surveyor) sunulur; imzalamayı reddederse "received but refused to sign" notuyla kayda alınır. Zamanında düzenlenmemiş protesto, sonradan ileri sürülen iddiayı zayıflatır; bu yüzden olay anında LOP yazmak önemlidir.`,
          ],
        },
        {
          subheading: "5.2 Tipik LOP durumları",
          paragraphs: [
            `En sık LOP konuları: ship/shore figure farkı (özellikle tankerlerde ullage/quantity uyuşmazlığı), slow rate, terminal ekipman arızası, hava bekletmesi, yük kondisyonu ve geç berthing. Birinci Zabit her biri için ayrı, tarihli ve net LOP düzenler. Karşı taraf da gemiye LOP verebilir; bunlar da kayda alınır ve cevaplanır.`,
          ],
          table: {
            caption: `Yaygın Letter of Protest Durumları`,
            headers: ["Durum", "LOP Kime", "Amaç"],
            rows: [
              ["Slow loading/discharge rate", "Terminal/Charterer", "Demurrage delili"],
              ["Ship/shore quantity farkı", "Terminal/Surveyor", "Miktar uyuşmazlığı kaydı"],
              ["Ekipman arızası", "Terminal", "Laytime istisnası delili"],
              ["Hasarlı/kontamine yük", "Shipper/Terminal", "Sorumluluk reddi"],
              ["Geç berthing/bekletme", "Agent/Charterer", "Bekleme süresi kaydı"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. VGM, Manifest ve Kargo Beyanları",
      sections: [
        {
          subheading: "6.1 VGM ve cargo information",
          paragraphs: [
            `SOLAS VI/2 (2016 değişikliği), konteynerlerin doğrulanmış brüt ağırlığının (Verified Gross Mass — VGM) yüklemeden önce bildirilmesini zorunlu kılar; VGM'siz konteyner yüklenmez. Birinci Zabit, VGM verisinin stowage/stabilite hesabıyla tutarlılığını kontrol eder. Yanlış beyan edilen ağırlık, stabilite ve mukavemet hesabını bozar (MSC Napoli 2007 vakası kötü ağırlık beyanını gösterdi).`,
            `Shipper, yük hakkında doğru bilgi (IMSBC group, IMDG class, MSDS, stowage factor) vermekle yükümlüdür. Birinci Zabit bu bilgilerin tamlığını ve manifest ile uyumunu denetler; eksik/yanlış bilgi yüklemeyi durdurur.`,
          ],
        },
        {
          subheading: "6.2 Cargo manifest ve gümrük belgeleri",
          paragraphs: [
            `Cargo manifest, liman ve gümrük otoriteleri için yükün resmi dökümüdür. Birinci Zabit, manifest ile fiilen yüklenen/boşaltılan yük arasındaki uyumu kontrol eder; tutarsızlık gümrük sorununa ve cezaya yol açar. Dangerous Goods manifest ayrı tutulur ve köprüüstünde bulundurulur.`,
          ],
        },
      ],
    },
    {
      heading: "7. Belge Arşivi ve Hukuki Hazırlık",
      sections: [
        {
          subheading: "7.1 Belge saklama ve düzeni",
          paragraphs: [
            `Tüm ticari belgeler (NOR, SoF, time sheet, MR, B/L kopyaları, LOP, manifest, draft survey raporları) sistematik arşivlenir ve şirkete iletilir. Bir laytime/demurrage uyuşmazlığı yıllar sonra mahkemeye taşınabilir; o gün düzenlenen belgeler tek savunma hattıdır. Birinci Zabit kayıtların eksiksiz, imzalı ve tarihli olmasını sağlar.`,
          ],
        },
        {
          subheading: "7.2 Şirket ve agent koordinasyonu",
          paragraphs: [
            `Birinci Zabit, NOR ve SoF'u zamanında agent ve şirkete iletir; demurrage hesabı operatör/charterer departmanınca yapılır. Belgelerdeki belirsizlikler için şirketten talimat istenir. Hukuki açıdan kritik durumlarda (büyük hasar, claim) P&I kulübü devreye girer; Birinci Zabit delil ve kayıtları korur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "P&I ve delil koruma",
              text: `Büyük bir kargo claim'inde P&I sürveyörü ve avukatı için en değerli şey gemideki ham kayıtlardır: fotoğraflar, draft survey, LOP'lar, SoF. Bunları değiştirmeden, eksiksiz saklamak Birinci Zabit'in sorumluluğudur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in belge checklist'i",
          bullets: [
            `Gemi fiziken ve hukuken hazır mı, NOR C/P şartlarına uygun mu?`,
            `NOR teslim zamanı ve şekli kanıtlı kaydedildi mi?`,
            `SoF gerçek zamanlı, tüm duraklamalar ve istisnalar ile dolduruldu mu?`,
            `Time sheet'te laytime istisnaları doğru işlendi mi?`,
            `Mate's Receipt yük durumunu doğru yansıtıyor, çekince var mı?`,
            `B/L, MR ile tutarlı; hasarlı yük için clean B/L'den kaçınıldı mı?`,
            `Gereken her durum için LOP zamanında düzenlendi mi?`,
            `VGM/manifest/DG beyanları tam ve tutarlı mı?`,
            `Tüm belgeler imzalı, tarihli ve arşive iletildi mi?`,
          ],
          paragraphs: [
            `Yük belgeleri yönetimi, denizcilik ile ticaret hukukunun kesiştiği bir alandır. Birinci Zabit'in bir imzası veya bir saatlik kayıt hatası, şirkete on binlerce dolar kazandırabilir veya kaybettirebilir. Başarı; charter party'yi anlamak, belgeleri gerçek zamanlı ve doğru düzenlemek ve gemiyi haksız claim'lere karşı kayıtlarla korumaktan gelir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
