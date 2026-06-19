import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yük operasyonlarına destek",
  roleSlug: "ustagemici",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Usta Gemici (AB), yük operasyonlarında güverte ekibinin uygulayıcı gücüdür; ambar kapağı (hatch cover) açma/kapama, yük bağlama-emniyete alma (lashing/securing), ambar temizliği ve hazırlığı, tank sounding'leri ve draft (su çekimi) okumalarına destek verir. Bu işler doğrudan can güvenliği, gemi stabilitesi ve yükün limana sağlam ulaşmasıyla ilgilidir; yanlış lashing veya hatalı draft okuması ciddi kaza ve ticari zarar doğurur. Bu bölüm; hatch cover operasyonlarının güvenli yürütülmesini, lashing ekipmanı ve CSS Code esaslarını, ambar hazırlığı ve temizlik standartlarını, draft survey ve sounding desteğini, güverte üstü yük emniyetini ve tipik kaza derslerini AB perspektifinden adım adım açıklar.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes and Oil Fuels",
    "IMO CSS Code — Code of Safe Practice for Cargo Stowage and Securing (Res. A.714(17))",
    "Cargo Securing Manual (CSM) — geminin onaylı bağlama el kitabı",
    "IMSBC Code — International Maritime Solid Bulk Cargoes Code",
    "ICS/OCIMF/ISGOTT — tanker yük operasyonları için (uygun gemilerde)",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "P&I Club Loss Prevention — lashing failure ve cargo damage vakaları",
    "SOLAS Chapter II-1 — stabilite ve draft/load line gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. Yük Operasyonunda AB'nin Rolü ve Hazırlık",
      lead: `AB, yük operasyonunda reis (bosun) ve güverte zabitinin (Chief Officer / Cargo Officer) talimatı altında çalışır; karar vermez ama operasyonun saha güvenliğinden doğrudan sorumludur.`,
      sections: [
        {
          subheading: "1.1 Operasyon öncesi brifing ve görev dağılımı",
          paragraphs: [
            `Her yük operasyonu öncesi tool-box talk (saha brifingi) yapılır; güverte zabiti yük planını, sırayı, açılacak ambarları, lashing gereksinimini ve tehlikeleri açıklar. AB bu brifingde kendi görevini, kullanılacak ekipmanı ve acil durumda yapacağını net olarak öğrenir. Brifing olmadan operasyona başlanmaz.`,
            `Görev dağılımında winch/vinç operatörü, hatch cover kumandasını kullanan, lashing yapan ve haberleşmeyi yürüten kişiler belirlenir. AB genellikle birden fazla rolde görev alır; ancak aynı anda hem makine kumanda hem yük altında çalışma gibi çelişen görevler verilmez. İletişim el telsizi veya el işaretleriyle sürdürülür.`,
          ],
          bullets: [
            `Operasyon öncesi tool-box talk zorunlu`,
            `Yük planı, sıra ve tehlikeler açıklanır`,
            `Görevler net dağıtılır, çelişen görev verilmez`,
            `İletişim telsiz/el işareti ile sürekli tutulur`,
          ],
        },
        {
          subheading: "1.2 PPE ve risk değerlendirmesi",
          paragraphs: [
            `AB; baret, çelik burunlu bot, eldiven, koruyucu gözlük ve göreve göre yüksek görünürlüklü yelek kullanır. Tahıl/maden gibi tozlu yüklerde toz maskesi, gürültülü ortamda kulaklık eklenir. Tehlikeli yüklerde (IMDG/IMSBC sınıflı) ek önlemler ve özel PPE devreye girer; AB bunları reisten öğrenir.`,
            `İşe başlamadan önce risk değerlendirmesi gözden geçirilir: düşme, ezilme, sıkışma, kayma, gerilen ekipmanın kopması ve atmosfer riskleri değerlendirilir. Ambara inilecekse atmosfer testi ve enclosed space prosedürü ayrıca devreye girer; AB izinsiz ambara/tanka inmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ambar = potansiyel kapalı mekan",
              text: `Kapalı veya yetersiz havalandırılmış ambar, kapalı mekan (enclosed space) sayılabilir; bazı yükler oksijeni tüketir veya zehirli/yanıcı gaz açığa çıkarır. Atmosfer testi yapılmadan ve izin alınmadan asla ambara inilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Hatch Cover (Ambar Kapağı) Operasyonları",
      sections: [
        {
          subheading: "2.1 Hatch cover tipleri ve açma/kapama disiplini",
          paragraphs: [
            `Modern kuru yük gemilerinde folding (katlanır), side-rolling (yana kayan) ve pontoon (kaldırılan blok) tipi hatch cover'lar yaygındır. Her tip kendine özgü hidrolik/mekanik kumanda ve emniyet pimi sistemine sahiptir. AB, kapağın açılması öncesi cleat (kelepçe), wedge ve emniyet kilitlerinin tamamen söküldüğünü teyit eder; aksi halde hidrolik zorlanır ve hasar/çatışma oluşur.`,
            `Açma/kapama sırasında kapağın hareket yolu (hareket sahası) boşaltılır; kimse kapak altında veya hareket hattında durmaz. Side-rolling kapaklarda ray üzerinde takoz/engel olmamalı, pontoon kapaklarda kreyn/forklift operasyonu koordineli yürütülmelidir. Kapak hareket ederken AB gözcü olarak tehlikeyi izler ve gerekirse operatörü "stop" ile durdurur.`,
          ],
          table: {
            caption: `Yaygın Hatch Cover Tipleri ve Dikkat Noktaları`,
            headers: ["Tip", "Çalışma Şekli", "Kritik Kontrol"],
            rows: [
              ["Folding", "Hidrolik katlanır", "Cleat/wedge sökülmüş mü, zincir/hidrolik sağlam mı"],
              ["Side-rolling", "Ray üzerinde yana kayar", "Ray temiz, takoz yok, kilit açık mı"],
              ["Pontoon", "Kreynle kaldırılan blok", "Kaldırma noktaları, kreyn koordinasyonu"],
              ["Stacking/folding kombine", "Karma sistem", "Sıra doğru mu, emniyet pimleri"],
            ],
          },
        },
        {
          subheading: "2.2 Sızdırmazlık (weathertightness) ve lastik bakımı",
          paragraphs: [
            `Hatch cover'ın su geçirmezliği, geminin denize elverişliliğinin temel unsurudur; ambara giren su yükü bozar ve stabiliteyi tehlikeye atar. AB, kapama sonrası lastik conta (rubber packing), drenaj kanalları (drain channel), compression bar ve cleat'lerin doğru oturduğunu kontrol eder. Eski/ezilmiş lastik, paslı compression bar ve tıkalı drenaj sızıntı yapar.`,
            `Su geçirmezlik kontrolünde tebeşir testi (chalk test), hortum testi (hose test) veya ultrasonik test kullanılır; AB bu testlere destek verir, lastik ve bar yüzeylerini temiz tutar. Tespit edilen kusurlar reise/zabite raporlanır ve kayda geçer.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS — denize elverişlilik",
              text: `Ambar kapaklarının weathertight (hava/su sızdırmaz) olması yasal bir gerekliliktir. Sızdıran kapak hem yük hasarına hem de su almasına yol açarak gemiyi tehlikeye atar; kapama sonrası kontrol ihmal edilemez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Lashing ve Securing (Yük Bağlama-Emniyete Alma)",
      lead: `Yükün hareket etmesi (shifting) stabiliteyi bozar, hasara ve devrilmeye yol açar. CSS Code ve geminin onaylı Cargo Securing Manual'i lashing'in temelini oluşturur.`,
      sections: [
        {
          subheading: "3.1 Lashing ekipmanı ve doğru uygulama",
          paragraphs: [
            `Lashing'te lashing rod, turnbuckle (germe vidası), zincir, lashing belt/web, shackle (kilit), twist-lock ve cone (konteynerde) kullanılır. AB, ekipmanın MSL (Maximum Securing Load) ve SWL (Safe Working Load) değerini aşmadan, doğru açıyla ve simetrik olarak bağlar. Aşınmış, çatlamış veya deforme ekipman kullanılmaz; ayıklanır.`,
            `Doğru lashing açısı kritiktir: çok dik veya çok yatay bağlama, ekipmanın etkinliğini düşürür. Turnbuckle'lar yükün oturmasıyla gevşeyebileceğinden seferin başında ve gerektikçe yeniden gerilir (re-lashing). AB, sefer boyunca lashing kontrolünü reisin programına göre yapar ve gevşeyenleri sıkar.`,
          ],
          table: {
            caption: `Lashing Ekipmanı ve Kullanım Notları`,
            headers: ["Ekipman", "İşlev", "Dikkat"],
            rows: [
              ["Lashing rod/zincir", "Yükü güverteye bağlar", "MSL aşılmaz, açı doğru"],
              ["Turnbuckle", "Gerginlik ayarı", "Sefer boyu yeniden gerilir"],
              ["Twist-lock / cone", "Konteyner kilidi", "Tam kilitlendiği teyit edilir"],
              ["Shackle / D-ring", "Bağlantı noktası", "Pim sağlam, çatlak yok"],
              ["Web/belt lashing", "Hassas yük bağlama", "Aşınma/kesik kontrolü"],
            ],
          },
        },
        {
          subheading: "3.2 CSS Code ve Cargo Securing Manual'e uyum",
          paragraphs: [
            `Her gemi, bayrak devleti/klas onaylı bir Cargo Securing Manual taşır; bu el kitabı hangi yükün nasıl, kaç lashing ile bağlanacağını belirler. AB, kendi pratiğine değil, bu onaylı plana göre çalışır. Standart dışı veya ağır/yüksek yüklerde zabit özel lashing planı verir.`,
            `Açık güvertede taşınan yükler (konteyner, kereste, boru, proje yükü) deniz hareketlerinin (rolling/pitching) yüksek ivmelerine maruz kalır; bu nedenle ekstra lashing ve düzenli kontrol gerektirir. Kötü hava beklentisinde reis ek lashing turu planlar; AB bu turu emniyetli koşulda (güverteye çıkış riskliyse zabit kararıyla) uygular.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: kayan yük, kaybedilen denge",
              text: `Birçok kaza, yetersiz veya gevşeyen lashing nedeniyle yükün kayması (cargo shift) ile başladı; gemi bir bordaya yattı, bazıları battı. Ders: lashing 'bir kez bağlanıp unutulan' değil, sefer boyu izlenen ve yeniden gerilen bir görevdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Ambar Temizliği ve Yük Hazırlığı",
      sections: [
        {
          subheading: "4.1 Yük öncesi ambar hazırlığı",
          paragraphs: [
            `Yeni yük öncesi ambar; önceki yük artıklarından, pas, su, yağ ve kötü kokudan temizlenir. Temizlik standardı yüke bağlıdır: tahıl/gıda yükü "grain clean" veya "hospital clean" gerektirirken, hurda demir daha düşük standartla yüklenebilir. AB, istenen temizlik seviyesini reisten öğrenir ve ona göre süpürme, yıkama, kurutma yapar.`,
            `Temizlik sonrası ambar kuru ve kokusuz olmalı; bilge kuyuları (bilge well) temizlenir, süzgeçler (strum box) kontrol edilir, sintine tahliyesinin çalıştığı doğrulanır. Yüke zarar verebilecek çıkıntılar, keskin yüzeyler ve önceki lashing artıkları temizlenir. Tespit edilen yapısal hasar (delik, ezik, paslı bölge) zabite raporlanır.`,
          ],
          bullets: [
            `Temizlik standardı yüke göre belirlenir (grain/hospital clean vb.)`,
            `Ambar kuru, kokusuz ve artıksız olmalı`,
            `Bilge well ve strum box temizlenir, sintine test edilir`,
            `Yapısal hasar zabite raporlanır`,
          ],
        },
        {
          subheading: "4.2 Havalandırma ve nem (sweat) yönetimine destek",
          paragraphs: [
            `Bazı yüklerde "kargo terlemesi" (cargo sweat) ve "gemi terlemesi" (ship sweat) nem hasarı yaratır; çiğ noktası (dew point) farkına göre ambar havalandırması açılır/kapanır. Bu karar zabitindir; AB, ventilatör kapaklarının açılması/kapanması, vent fanlarının çalıştırılması gibi fiziksel işleri uygular ve kayıtlara destek verir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Draft Okuma ve Sounding Desteği",
      sections: [
        {
          subheading: "5.1 Draft (su çekimi) okuma tekniği",
          paragraphs: [
            `Draft survey ve yükleme/boşaltma kontrolü için baş (forward), kıç (aft) ve orta (midship) draft işaretleri okunur. AB, draft marklarını dalga/çalkantı ortasındaki ortalama su seviyesinden, mümkünse bottan veya pilot ladder'dan güvenli konumda okur. Okuma metrik (m) veya feet olarak, mark düzenine göre yapılır.`,
            `Trim (baş-kıç farkı) ve list (yatıklık) draft farkından anlaşılır; yüklemede istenen trim sağlanana kadar draft izlenir. AB okumayı net ve doğru bildirir; tahmini değil gerçek okuma verir, çünkü kötü okuma yanlış yük hesabı (cargo quantity) ve stabilite hatasına yol açar.`,
          ],
          table: {
            caption: `Draft / Trim Temel Kavramları`,
            headers: ["Terim", "Anlamı", "Önemi"],
            rows: [
              ["Forward draft", "Baş su çekimi", "Trim ve yük dağılımı"],
              ["Aft draft", "Kıç su çekimi", "Pervane/dümen daldırması"],
              ["Mean draft", "Ortalama draft", "Toplam deplasman tahmini"],
              ["Trim", "Baş-kıç draft farkı", "Sevk verimi, manevra"],
              ["List", "Sancak/iskele yatıklık", "Stabilite uyarısı"],
            ],
          },
        },
        {
          subheading: "5.2 Tank sounding ve ullage desteği",
          paragraphs: [
            `Sounding, tank içindeki sıvı yüksekliğini (balast, yakıt, tatlı su) ölçer; ullage ise tank tavanından sıvı yüzeyine olan boşluğu ölçer (tankerde yaygın). AB, sounding tape (şerit metre + ağırlık) veya elektronik gauge ile ölçüm yapar, su/yakıt arayüzünü "water finding paste" ile kontrol eder ve değeri kaydeder.`,
            `Sounding sırasında tank kapağı/ölçüm boşluğu açıldığında parlama/gaz riski (özellikle yakıt/tanker) ve düşme riski oluşur; AB topraklama, anti-statik ve PPE kurallarına uyar. Ölçülen değerler zabite iletilir, sintine/balast operasyonlarının doğruluğunu teyit eder. Yanlış sounding, taşma (overflow) veya kirliliğe yol açabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Su bulma macunu ile teyit",
              text: `Yakıt veya yük tankında dipte su olup olmadığını anlamak için sounding ağırlığına su-bulma macunu sürülür; macun su ile temas edince renk değiştirir. Bu basit kontrol, su kirliliği ve hesap hatasını erken yakalar.`,
            },
            {
              type: "warning",
              title: "Tanker sounding'de parlama riski",
              text: `Petrol tankerinde sounding/ullage açıklığı statik elektrik ve gaz boşalması riski taşır; topraklama, bekleme süresi ve anti-statik ekipman kuralları ISGOTT gereğince titizlikle uygulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Güverte Üstü Yük Emniyeti ve Çevre Koruma",
      sections: [
        {
          subheading: "6.1 Güverte üstü yükün sefer boyu izlenmesi",
          paragraphs: [
            `Güverte üstünde taşınan konteyner, kereste, boru, makine veya proje yükü; deniz hareketleri, su darbesi (green water) ve rüzgâr yüküyle sınanır. AB, reisin belirlediği aralıklarla lashing turunu yapar, gevşeyen turnbuckle'ları sıkar ve hasar/kayma belirtisini raporlar. Kötü havada güverteye çıkış riskliyse kontrol zabit kararıyla, can güvenliği önceliğiyle yapılır.`,
            `Yükün gemi yapısına (deck fitting, lashing point) verdiği yük takip edilir; aşırı zorlanma noktaları, çatlayan kaynak veya deforme olan fitting raporlanır. Güverte üstü yük aynı zamanda kaçış yollarını, sintine kanallarını ve emniyet ekipmanı erişimini engellememelidir.`,
          ],
        },
        {
          subheading: "6.2 Kirliliğin önlenmesi ve döküntü kontrolü",
          paragraphs: [
            `Yük operasyonunda dökülen tahıl, toz, hidrolik yağı veya kimyasal hem güvenlik hem çevre riskidir. MARPOL kapsamında denize yük artığı/kimyasal döküntüsü yasaktır; güvertede biriken artık denize süpürülmez, toplanır. AB, scupper tıpalarını (scupper plug) yağlı operasyonlarda takar, döküntüyü emici ile temizler ve raporlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL — döküntü yasağı",
              text: `Yük artığı, yağ veya kimyasalın denize bırakılması MARPOL ile yasaktır. Güvertede scupper tıpaları takılı tutulur, döküntü toplanır; çevre kirliliği ağır ceza ve gemi tutulması (detention) sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Lashing ve hatch cover kaynaklı vakalar",
          paragraphs: [
            `Sık görülen hatalar: cleat/wedge sökülmeden kapak açmaya zorlamak (hidrolik hasarı), yetersiz/asimetrik lashing, sefer ortasında re-lashing yapılmaması ve gevşek turnbuckle. Bu hatalar yük kaybı, gemi hasarı ve liman kontrolünde (PSC) tutulma ile sonuçlanır.`,
            `Konteyner gemilerinde twist-lock'un tam kilitlenmediğinin fark edilmemesi, kötü havada konteyner yığını çökmesine yol açmıştır. AB, her kilidin oturduğunu fiziksel olarak teyit etmeli, "muhtemelen kilitlenmiştir" varsayımından kaçınmalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: gevşeyen turnbuckle zinciri",
              text: `Bir sefer ortasında re-lashing atlanınca turnbuckle'lar gevşedi, kötü havada konteyner yığını yana kaydı ve birkaç ünite denize düştü. Ders: lashing kontrolü program dahilinde, özellikle kötü hava öncesi tekrarlanmalıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Draft/sounding ve temizlik hataları",
          paragraphs: [
            `Yanlış draft okuması yük miktarı uyuşmazlığına (cargo claim) ve stabilite hatasına; yetersiz ambar temizliği yük kontaminasyonu ve reddine yol açar. AB, okumaları dürüst ve doğru bildirmeli, temizlik standardını yüke göre tam karşılamalıdır. "Yaklaşık" okuma ve "yeterince temiz" varsayımı pahalı sonuçlar doğurur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Yük operasyonu destek checklist'i",
          bullets: [
            `Operasyon öncesi tool-box talk yapıldı, görevim net mi?`,
            `Doğru PPE ve risk değerlendirmesi tamam mı?`,
            `Hatch cover açma öncesi cleat/wedge/kilit söküldü mü, hareket sahası boş mu?`,
            `Kapama sonrası sızdırmazlık (lastik, drenaj, compression bar) kontrol edildi mi?`,
            `Lashing CSM/CSS Code'a uygun, simetrik ve MSL içinde mi?`,
            `Sefer boyu re-lashing programı uygulanıyor mu?`,
            `Ambar temizliği yük standardına uygun, bilge/strum box temiz mi?`,
            `Draft ve sounding okumaları doğru, dürüst ve raporlandı mı?`,
            `Scupper tıpaları takılı, döküntü toplandı mı (MARPOL)?`,
          ],
          paragraphs: [
            `Yük operasyonlarına destek, AB'nin denizcilik ustalığının somut göründüğü alandır: doğru açıyla atılan bir lashing, sızdırmazlığı sağlanmış bir kapak, dürüst okunan bir draft ve standardına uygun temizlenmiş bir ambar; yükün limana sağlam ulaşmasını, geminin dengeli kalmasını ve mürettebatın güvende olmasını sağlar. Bu işlerde acele ve varsayım pahalıdır; disiplin, kontrol ve dürüst raporlama ise hem yükü hem gemiyi korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
