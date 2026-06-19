import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Tank temizliği ve butterworth operasyonları (tankerde)",
  roleSlug: "ustagemici",
  taskIndex: 9,
  estimatedPages: 26,
  intro: `Tankerde Usta Gemici (AB), tank temizliği ve butterworth operasyonlarının saha uygulayıcısıdır; crude oil washing (COW), butterworth (su ile) tank yıkama ve gas freeing operasyonları, denizciliğin en yüksek patlama, statik elektrik ve zehirlenme riski taşıyan işleridir. AB; atmosfer testleri tamamlanmadan ve izin verilmeden tanka GİRMEZ, statik elektrik riskine karşı uygun (anti-statik) PPE kullanır, yıkama makinesi ve hortum bağlantılarını topraklar (bonding/earthing) ve inert gaz seviyesini (tank içi oksijenin güvenli sınırın, tipik olarak %8 hacmin altında tutulması; bazı uygulamalarda hedef daha düşük) sürekli izler. Bu bölüm; tank temizliği tehlikelerini, inert gaz sistemini (IGS), COW ve butterworth prosedürünü, statik elektrik ve topraklama disiplinini, gas freeing ve tanka güvenli girişi, atmosfer izlemeyi ve tipik kaza derslerini ISGOTT esaslarıyla adım adım açıklar.`,
  sources: [
    "ISGOTT — International Safety Guide for Oil Tankers and Terminals (en güncel baskı)",
    "SOLAS Chapter II-2 — Inert Gas Systems ve tanker yangın güvenliği",
    "MARPOL Annex I — Crude Oil Washing (COW) ve slop yönetimi",
    "IMO Crude Oil Washing Systems (Revised) ve COW operations and equipment manual",
    "IMO Resolution A.1050(27) — Entering Enclosed Spaces aboard Ships",
    "OCIMF / ICS yayınları — tank cleaning ve static electricity rehberleri",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "Geminin IG ve Tank Cleaning prosedürleri (SMS) + tanker safety management",
  ],
  chapters: [
    {
      heading: "1. Tank Temizliği Tehlikeleri ve AB'nin Rolü",
      lead: `Tank temizliği; yanıcı buhar, statik elektrik, zehirli gaz ve oksijensizlik tehlikelerinin bir arada bulunduğu, en küçük ihmalin patlamaya yol açabildiği bir operasyondur.`,
      sections: [
        {
          subheading: "1.1 Temel tehlikeler",
          paragraphs: [
            `Yük tanklarında hidrokarbon buharı (HC) yanıcı/patlayıcı bir atmosfer oluşturur; ham petrol ayrıca zehirli hidrojen sülfür (H₂S) ve benzen gibi maddeler içerebilir. Tank temizliği bu buharı serbest bırakır ve statik elektrik yükü oluşturur. Yanlış yönetildiğinde tutuşma kaynağı (statik kıvılcım) + yanıcı atmosfer + oksijen üçlüsü patlamaya yol açar.`,
            `Bu nedenle tankerlerde temel strateji, yanma üçgeninin "oksijen" ayağını kontrol etmektir: inert gaz ile tank atmosferinin oksijen oranı yanmayı destekleyemeyecek seviyeye (tipik olarak %8 hacmin altı) düşürülür. AB, neden inert atmosferde çalışıldığını ve bu dengeyi bozacak her hatanın (hava girişi, statik kıvılcım) ölümcül olabileceğini anlamalıdır.`,
          ],
          table: {
            caption: `Tank Temizliğinde Birleşen Tehlikeler`,
            headers: ["Tehlike", "Kaynak", "Sonuç"],
            rows: [
              ["Yanıcı HC buharı", "Yük artığı, yıkama", "Patlama/yangın"],
              ["Statik elektrik", "Akan sıvı, su jeti, mist", "Tutuşma kıvılcımı"],
              ["Zehirli gaz (H₂S/benzen)", "Ham petrol", "Zehirlenme"],
              ["Oksijensizlik", "İnert gaz", "Boğulma (girişte)"],
              ["Oksijen girişi", "Kaçak/hava", "İnert ortam bozulur, patlama riski"],
            ],
          },
        },
        {
          subheading: "1.2 AB'nin görevi ve sınırı",
          paragraphs: [
            `AB; güverte üstü işlemleri (butterworth makinesi açma/kapama, hortum bağlama, kapak/manhole yönetimi, topraklama, atmosfer ölçümü desteği) sorumlu zabitin (Chief Officer) talimatı ve gözetimi altında yürütür. Operasyon planı, sıralama ve onay zabittedir; AB planı uygular ve sapma/anormallik gördüğünde derhal raporlar.`,
            `AB, atmosfer testleri tamamlanıp giriş izni verilmeden tanka asla girmez; inert tank oksijensizdir ve içinde zehirli/yanıcı gaz olabilir. Tank temizliği "acele edilemez, kısayol kabul etmez" bir iştir; her adım ISGOTT ve geminin prosedürüne göre yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İnert tank = oksijensiz + zehirli",
              text: `İnert gaz ile doldurulmuş tank, oksijensiz ve potansiyel zehirli bir kapalı mekandır. Atmosfer testi, gas freeing ve giriş izni olmadan ASLA girilmez; içeri başını uzatmak bile ölümcüldür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İnert Gaz Sistemi (IGS) ve Atmosfer Kontrolü",
      sections: [
        {
          subheading: "2.1 İnert gazın amacı ve oksijen sınırı",
          paragraphs: [
            `İnert gaz sistemi (IGS), baca gazını işleyerek (veya inert gaz jeneratörü ile) düşük oksijenli gaz üretir ve yük tanklarına basar; amaç tank atmosferindeki oksijeni yanmayı desteklemeyecek seviyeye düşürmektir. SOLAS ve ISGOTT, yük tankı atmosferindeki oksijenin hacmen %8'in altında tutulmasını gerektirir; COW yapılacaksa oksijen genelde daha düşük (örn. ≤%5) hedeflenir ki yıkama statik riskine rağmen güvenli kalsın.`,
            `AB, tankın "inert", "gas-free" veya "non-inert" durumunu karıştırmamalıdır; bu durumlar farklı önlemler gerektirir. İnert tank oksijensiz olduğundan girilmez; gas-free (havalandırılmış ve test edilmiş) tank ise giriş için uygun hale gelebilir. Atmosfer durumu sürekli izlenir ve kaydedilir.`,
          ],
          table: {
            caption: `Tank Atmosfer Durumları (özet)`,
            headers: ["Durum", "Oksijen / İçerik", "Giriş?"],
            rows: [
              ["İnert", "O₂ < %8 (COW için ≤%5)", "HAYIR (oksijensiz)"],
              ["COW sırasında", "Düşük O₂, sürekli izleme", "HAYIR"],
              ["Gas freeing süreci", "Havalandırılıyor, geçiş", "HAYIR (tamamlanmadan)"],
              ["Gas-free / test edildi", "O₂ ~%20.9, HC/zehirli güvenli", "İzinle EVET"],
              ["Non-inert (riskli)", "Yanıcı aralık olabilir", "Çok tehlikeli"],
            ],
          },
        },
        {
          subheading: "2.2 IGS izleme ve arıza durumu",
          paragraphs: [
            `IGS; oksijen analizörü, basınç göstergeleri, deck water seal (geri tepme önleyici su contası) ve alarmlarla donatılır. AB, güverte üstü IGS göstergelerini izlemeye destek verir; oksijen yükselirse, basınç düşerse veya alarm çalarsa operasyon durdurulur ve zabite bildirilir. IGS arızası, yanıcı atmosfer oluşma riski demektir; COW/yıkama derhal durdurulur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS / ISGOTT — inert atmosfer",
              text: `Tankerlerde yük tankı atmosferinin inert (O₂ < %8) tutulması ve COW'un düşük oksijenli ortamda yapılması zorunludur. IGS arızasında yıkama durdurulur; oksijen sınırı aşılırsa patlama riski doğar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Crude Oil Washing (COW) Operasyonu",
      lead: `COW, ham petrolün kendisini yıkama sıvısı olarak kullanarak tank duvarındaki tortuyu çözer; hem temizlik hem yük geri kazanımı sağlar, ancak inert ortam ve sıkı kontrol gerektirir.`,
      sections: [
        {
          subheading: "3.1 COW prensibi ve ön koşullar",
          paragraphs: [
            `COW'da sabit veya taşınabilir yıkama makineleri, basınçlı ham petrolü tank yüzeyine püskürterek tortuyu (clingage) çözer ve pompalanabilir hale getirir; bu hem boşaltma verimini artırır hem de slop (atık) miktarını azaltır (MARPOL Annex I gereği). COW yalnızca tank inert (düşük oksijenli) iken ve IGS düzgün çalışırken yapılır.`,
            `Ön koşullar: oksijen sınırının (ör. ≤%5) doğrulanması, IGS'nin tam çalışması, yıkama hattının ve makinelerin test edilmesi, hidrokarbon kaçağı kontrolü ve görev brifingi. AB, makinelerin doğru sırada devreye alınmasına, hortum/hat bağlantılarına ve sızdırmazlık kontrolüne destek verir. Onaylı COW manuelindeki program (program of washing) takip edilir.`,
          ],
          bullets: [
            `COW ham petrolü yıkama sıvısı olarak kullanır`,
            `Yalnızca inert (düşük O₂) tankta ve çalışan IGS ile yapılır`,
            `Oksijen ≤%5 (tipik) doğrulanmadan başlanmaz`,
            `Onaylı COW manueli ve programı takip edilir`,
          ],
        },
        {
          subheading: "3.2 COW sırasında izleme ve durdurma kriterleri",
          paragraphs: [
            `COW boyunca oksijen seviyesi, IGS basıncı, hat basıncı ve kaçaklar sürekli izlenir. Oksijen yükselirse, IGS arızalanırsa, kaçak/yangın belirtisi olursa veya hava girişi şüphesi doğarsa operasyon DERHAL durdurulur. AB, anormallik (basınç düşmesi, koku, ses) gördüğünde beklemeden raporlar; saniyeler önemlidir.`,
            `COW sonrası tank tortusu azalmış olur; ancak tank hâlâ inert ve hidrokarbonludur, girilemez. Tanka giriş için ayrı bir gas freeing ve test süreci gerekir. AB, COW bitti diye tankı "temiz/güvenli" saymaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: statik kıvılcım ve patlama",
              text: `Geçmişte birkaç VLCC, COW/yıkama sırasında inert ortam yeterince sağlanmadan su yıkaması yapılması ve statik kıvılcım nedeniyle patladı. Bu kazalar, inert gaz sisteminin ve COW kurallarının zorunlu hale gelmesinin nedenidir. Ders: inert ortam ve statik kontrolü pazarlık konusu değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Statik Elektrik ve Topraklama (Bonding/Earthing)",
      sections: [
        {
          subheading: "4.1 Statik yükün oluşumu ve riski",
          paragraphs: [
            `Akan sıvı, su jeti, buhar/mist ve hareket eden parçacıklar statik elektrik yükü biriktirir; bu yük boşalırken (kıvılcım) yanıcı atmosferi tutuşturabilir. Özellikle su ile yıkama (butterworth) statik açısından ham petrolden daha risklidir, çünkü su damlacıkları/mist yüksek yük taşır. Bu yüzden su yıkaması inert tank dışında veya kontrolsüz yapılmaz.`,
            `AB, statik riskini azaltmak için: tüm iletken ekipmanı (yıkama makinesi, hortum nozülü, ölçüm cihazı) gemi yapısına topraklar (bonding), sounding/ölçüm sırasında bekleme süresine (relaxation/settling time) uyar ve serbest düşen jet/sıçramayı önler. Anti-statik (iletken) PPE ve ekipman kullanılır; sentetik, yük tutan giysi/araç kullanılmaz.`,
          ],
          table: {
            caption: `Statik Kontrol Önlemleri`,
            headers: ["Önlem", "Amaç", "Uygulama"],
            rows: [
              ["Bonding/earthing", "Yük boşalmasını güvenli yapar", "Makine/hortum/cihazı gemiye topla"],
              ["Settling/relaxation time", "Yükün dağılmasını bekle", "Ölçümden önce bekle"],
              ["Anti-statik PPE", "Kişisel yük birikimini önle", "İletken bot/giysi"],
              ["Mist/jet kontrolü", "Yük üretimini azalt", "Serbest düşen jeti önle"],
              ["İnert ortam", "Tutuşmayı imkansız kıl", "O₂ < sınır"],
            ],
          },
        },
        {
          subheading: "4.2 Topraklama disiplini ve yasak araçlar",
          paragraphs: [
            `Tanka indirilen her metal cisim (sounding ağırlığı, ölçüm cihazı, lamba) topraklanır veya onaylı anti-statik tipte olur; topraklanmamış iletken cisim "izole" kalır ve statik kıvılcım kaynağı olur. Cep telefonu, fotoğraf makinesi, sertifikasız el feneri ve kıvılcım yapan araçlar tehlikeli bölgede yasaktır; sadece Ex (patlamaya dayanıklı) sertifikalı ekipman kullanılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Su yıkaması statik açısından en riskli",
              text: `Butterworth (su) yıkaması, su mist'i nedeniyle yüksek statik yük üretir; bu yüzden yalnızca inert (oksijensiz) tankta yapılır. İnert olmayan tankta kontrolsüz su yıkaması, statik kıvılcım + yanıcı atmosfer ile patlamaya yol açar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Gas Freeing ve Tanka Güvenli Giriş",
      sections: [
        {
          subheading: "5.1 Gas freeing süreci",
          paragraphs: [
            `Tanka giriş gerekiyorsa (inspeksiyon, onarım), tank önce gas-free hale getirilir: hidrokarbon buharı havalandırma ile güvenli seviyeye düşürülür, oksijen normale (%20.9) getirilir ve zehirli gaz (H₂S/benzen) güvenli sınıra iner. Bu geçiş "inertten havaya" kontrollü yapılır; ara aşamada (purging) tehlikeli yanıcı aralıktan geçilmemesine dikkat edilir. Süreç zabit kontrolünde, fanlar/eductor'larla yürütülür.`,
            `AB, gas freeing'in fiziksel işlerini (vent açma, fan çalıştırma, kapak yönetimi) yapar ama tankı "gas-free" ilan etme yetkisi sorumlu zabittedir ve yalnızca doğrulanmış atmosfer testiyle verilir. Tek noktadan değil farklı seviyelerden test yapılır; bazı gazlar tabanda birikir.`,
          ],
          bullets: [
            `Gas freeing: HC buharı ve oksijen güvenli seviyeye getirilir`,
            `Yanıcı aralıktan kontrollü geçilir (purging)`,
            `Atmosfer farklı seviyelerden test edilir`,
            `"Gas-free" ilanı yalnızca sorumlu zabite aittir`,
          ],
        },
        {
          subheading: "5.2 Enclosed space entry permit ile giriş",
          paragraphs: [
            `Tank gas-free ve test edilmiş olsa bile, giriş bir kapalı mekan girişidir: entry permit, atmosfer testi (O₂/LEL/zehirli), sürekli havalandırma, dışarıda standby (lifeline + iletişim) ve kurtarma düzeni şarttır. AB içeri girecekse kişisel gaz monitörü taşır, standby ise dışarıdan izler ve acil durumda 'önce alarm, sonra SCBA + ekip' protokolünü uygular.`,
            `Tank dibinde kalan tortu/slop oksijen tüketmeye veya gaz açığa çıkarmaya devam edebilir; bu yüzden atmosfer giriş süresince izlenir. Çalışma sırasında değer bozulursa derhal çıkılır. AB, "bir kez test edildi, güvenli" yanılgısına düşmez.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kapalı mekan kuralları geçerli",
              text: `Gas-free tank dahi kapalı mekandır; enclosed space entry prosedürü (permit, sürekli atmosfer izleme, standby, kurtarma hazırlığı) eksiksiz uygulanır. Tortu/slop gaz üretmeye devam edebilir, atmosfer giriş boyunca izlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Çevre, Slop Yönetimi ve Kayıt",
      sections: [
        {
          subheading: "6.1 MARPOL ve slop/atık yönetimi",
          paragraphs: [
            `Tank yıkama suyu ve tortu (slop), petrol içerdiğinden denize boşaltılamaz; MARPOL Annex I, COW ile slop azaltımını, slop tankında toplamayı, yağ-su ayrımını ve uygun tahliye/teslim kurallarını belirler. Yağ Kayıt Defteri (Oil Record Book) tüm yıkama, slop transferi ve tahliye işlemlerinin kaydedildiği yasal belgedir. AB, bu operasyonların fiziksel işlerine destek verir ve döküntü/kaçağı önler.`,
            `Güvertede scupper tıpaları (scupper plug) takılı tutulur ki olası döküntü denize gitmesin; döküntü emici ile toplanır. Deniz/hava kirliliği (VOC emisyonu dahil) önlenir; liman/terminal kurallarına uyulur. Çevre ihlali ağır ceza ve gemi tutulması sebebidir.`,
          ],
        },
        {
          subheading: "6.2 Permit, kayıt ve iletişim",
          paragraphs: [
            `Tank temizliği, COW ve giriş işlemleri ilgili permit'ler (hot work yoksa bile entry/COW permit) ve kayıtlarla yürütülür; ship-shore safety checklist (terminalde) ve IG/COW kayıtları tutulur. AB, kendi görevini permit kapsamında bilir, telsizle (Ex sertifikalı) zabit/pompa kontrolüyle iletişimi sürdürür ve her anormalliği raporlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — slop ve ORB",
              text: `Tank yıkama suyu/tortusu denize boşaltılamaz; slop toplanır ve Oil Record Book'a kaydedilir. COW, MARPOL gereği hem temizlik hem kirlilik azaltımı sağlar. Çevre kuralı ihlali ağır yaptırım doğurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 İnert ortam ve statik ihmalleri",
          paragraphs: [
            `En ölümcül hatalar: oksijen sınırı doğrulanmadan yıkamaya başlamak, IGS arızasında operasyona devam etmek, ekipmanı topraklamadan kullanmak ve su yıkamasını inert olmayan tankta yapmak. Tarihteki büyük tanker patlamaları (birkaç VLCC dahil) bu hataların birleşiminden kaynaklandı ve IG/COW kurallarının doğmasına yol açtı.`,
            `AB, "muhtemelen güvenlidir" varsayımının tankerlerde ölümcül olduğunu bilir; her değer ölçülür, her bağlantı topraklanır ve her şüphe operasyonu durdurur. Bu işte sabır ve disiplin, hızdan kıymetlidir.`,
          ],
        },
        {
          subheading: "7.2 Giriş ve atmosfer hataları",
          paragraphs: [
            `İnert tanka izinsiz baş uzatma, gas-free sayılan tankta atmosferi sürekli izlememe ve standby'sız giriş, tankerlerdeki kapalı mekan ölümlerinin nedenleridir. AB, tank temizliğinin sonunda dahi tankı bir kapalı mekan olarak ele almalı ve giriş kurallarını eksiksiz uygulamalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: gas-free sanılan tankta zehirlenme",
              text: `Yetersiz havalandırılmış, dipte slop kalan bir tank 'gas-free' kabul edildi; giren personel dipte biriken gazdan zehirlendi. Ders: atmosfer farklı seviyelerden test edilir, giriş boyunca sürekli izlenir, slop'lu dip her zaman şüpheyle ele alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Tank temizliği / COW checklist'i",
          bullets: [
            `İlgili permit ve ship-shore checklist tamam, görevim net mi?`,
            `Tank inert mi, oksijen sınırı (COW için ≤%5) doğrulandı mı?`,
            `IGS düzgün çalışıyor, oksijen/basınç sürekli izleniyor mu?`,
            `Yıkama makinesi/hortum/cihazlar topraklandı (bonding) mı?`,
            `Su yıkaması yalnızca inert tankta mı yapılıyor?`,
            `Settling/relaxation süresine ve anti-statik PPE'ye uyuldu mu?`,
            `Anormallikte (O₂ artışı, IGS arıza, kaçak) durdurma kriterini biliyor muyum?`,
            `Giriş gerekiyorsa gas-free + entry permit + standby + sürekli izleme var mı?`,
            `Slop/yıkama suyu MARPOL'e uygun toplandı, ORB kaydedildi mi?`,
            `Telefon/kıvılcım yapan araç yasak; sadece Ex ekipman mı kullanılıyor?`,
          ],
          paragraphs: [
            `Tankerde tank temizliği ve butterworth operasyonları, denizciliğin en az hata kaldıran işidir; çünkü burada yanlış bir adım sadece bir kişiyi değil, tüm gemiyi yok edebilir. AB'nin değeri; inert ortamı, topraklamayı, atmosfer izlemeyi ve giriş kurallarını istisnasız uygulamasında ve en küçük anormallikte operasyonu durduracak disipline sahip olmasındadır. Bu işte ustalık, hızda değil; her ölçümü, her topraklamayı ve her permit şartını ciddiye alan sarsılmaz dikkattedir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
