import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Mutfak yangın emniyeti",
  roleSlug: "asci",
  taskIndex: 5,
  estimatedPages: 25,
  intro: `Gemi mutfağı (galley), gemideki en yüksek yangın riski taşıyan mahallerden biridir: açık alev, sıcak yüzeyler, kızgın yağ, biriken davlumbaz yağı ve elektrik bir aradadır. Aşçı, bu riski yöneten ilk hat olarak galley fire suppression system'in (genellikle wet chemical) çalışmasını, mutfak tipi (Class F/K) söndürücünün konumunu ve kullanımını, yağ yangını müdahale prosedürünü, havalandırma damperlerini ve fire blanket kullanımını bilmek zorundadır. Bu bölüm; mutfak yangınının kimyası, önleme, söndürme ekipmanı, otomatik sistem, acil durum prosedürü ve SOLAS/FSS Code çerçevesini adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire Protection, Detection and Extinction",
    "FSS Code — Fire Safety Systems Code (fixed extinguishing & detection)",
    "IMO — Fire safety in galleys and exhaust ducts guidance",
    "NFPA 96 — Ventilation Control & Fire Protection of Commercial Cooking",
    "Manufacturer's Manual — Galley Wet Chemical Suppression System",
    "STCW — Basic safety training (fire prevention & firefighting, A-VI/1)",
    "MLC 2006 — Standard A3.2 (galley safety & hygiene)",
  ],
  chapters: [
    {
      heading: "1. Mutfak Yangınının Kimyası ve Risk Kaynakları",
      lead: `Doğru müdahale, yangın türünü doğru tanımakla başlar.`,
      sections: [
        {
          subheading: "1.1 Yangın sınıfları ve galley'deki karşılığı",
          paragraphs: [
            `Yangınlar yakıtına göre sınıflandırılır ve her sınıf farklı söndürücü ister. Galley'de en kritik olanı pişirme yağ ve donyağ yangınıdır; bu Avrupa standardında Class F, Amerikan standardında Class K olarak adlandırılır. Bunun yanında katı yakıt (Class A — ekmek, ahşap, kağıt), elektrik kaynaklı (E) ve gazlı (Class C/B) yangın riskleri de bulunur. Aşçı, hangi söndürücünün hangi yangına uygun olduğunu refleks düzeyinde bilmelidir.`,
            `Pişirme yağı yangını özellikle tehlikelidir çünkü yağ çok yüksek sıcaklıkta tutuşur (tutuşma noktasının üstünde) ve sadece alevi söndürmek yetmez; yağın yeniden tutuşmasını (re-ignition) önlemek için yüzeyin sıcaklığını da düşürmek gerekir. Wet chemical (ıslak kimyasal) sistemler tam da bu nedenle galley için standart kabul edilir: saponifikasyon (yağ + alkali → sabunsu örtü) ile hem söndürür hem yeniden tutuşmayı engeller.`,
          ],
          table: {
            caption: `Yangın Sınıfları ve Galley'de Uygun Söndürücü`,
            headers: ["Sınıf", "Yakıt", "Uygun Söndürücü"],
            rows: [
              ["A", "Katı (ekmek, kağıt, ahşap)", "Su, köpük, ABC kuru kimyasal"],
              ["B", "Yanıcı sıvı (alkol, çözücü)", "Köpük, CO2, kuru kimyasal"],
              ["F (K)", "Pişirme yağı / donyağı", "Wet chemical, fire blanket"],
              ["Elektrik (E)", "Enerjili ekipman", "CO2, kuru kimyasal (su YOK)"],
              ["Gaz", "LPG/doğalgaz", "Gaz kes, kuru kimyasal"],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Yağ yangınına su = patlama",
              text: `Kızgın yağa atılan su anında buharlaşıp genleşir, alevi tavana fışkırtır ve patlamalı bir ateş topu yaratır. Galley yangınlarında en ölümcül hata budur.`,
            },
          ],
        },
        {
          subheading: "1.2 Galley risk kaynakları",
          paragraphs: [
            `Başlıca risk kaynakları: aşırı ısınan/gözetimsiz fritöz, ocak üzerinde unutulan yağ, davlumbaz ve egzoz kanalında biriken yağ, hasarlı/aşırı yüklü elektrik tesisatı, gaz kaçağı ve dökülen yanıcı sıvılardır. Davlumbaz kanalı yağı özellikle sinsidir; birikmiş yağ bir kez tutuştuğunda yangını galley dışına, kanal boyunca yayabilir. Bu yüzden temizlik (bkz. mutfak düzeni görevi) doğrudan bir yangın önleme tedbiridir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Gözetimsiz fritöz",
              text: `Aşçının kısa süreliğine galley'den ayrıldığı sırada termostatı arızalı fritöz aşırı ısınıp tutuştu. Ders: fritöz asla gözetimsiz bırakılmaz; emniyet kesicisi düzenli test edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Yangın Önleme (İlk ve En Önemli Savunma)",
      sections: [
        {
          subheading: "2.1 Operasyonel önlemler",
          paragraphs: [
            `Yangının en iyi yönetimi çıkmadan önlenmesidir. Aşçı; fritözü asla gözetimsiz bırakmaz, yağ seviyesini ve sıcaklığını kontrol eder, ocak çevresini yağdan temizler, yanıcı maddeleri (kağıt, plastik, yağlı bez) sıcak yüzeylerden uzak tutar. Pişirme bitince ocak/fırın/fritöz kapatıldığından emin olunur; vardiya sonu galley kapatma kontrolü bir rutindir.`,
            `Davlumbaz filtresi haftalık, kanal dönemsel olarak yağdan arındırılır. Elektrik ekipmanının kablo/fiş bütünlüğü kontrol edilir, priz aşırı yüklenmez. Gazlı sistemlerde kaçak kontrolü ve kullanım sonrası ana vana kapatma uygulanır. Bu rutinler basit ama yangın istatistiğini en çok düşüren tedbirlerdir.`,
          ],
          bullets: [
            `Fritöz asla gözetimsiz bırakılmaz, sıcaklık izlenir`,
            `Davlumbaz filtresi haftalık, kanal dönemsel yağ alımı`,
            `Yanıcı maddeler sıcak yüzeylerden uzak`,
            `Vardiya sonu: tüm pişirme ekipmanı kapalı mı kontrolü`,
            `Hasarlı elektrik ekipmanı kullanılmaz, gaz vanası kapatılır`,
          ],
        },
        {
          subheading: "2.2 Algılama ve erken uyarı",
          paragraphs: [
            `Galley, SOLAS II-2 kapsamında yangın algılama sistemine bağlıdır; ısı/duman dedektörleri köprüüstüne alarm verir. Aşçı, bu dedektörlerin pişirme dumanıyla yanlış alarm vermemesi için doğru havalandırmayı sağlar ama dedektörleri asla kapatmaz/örtmez. Erken algılama, küçük bir yangının büyümeden söndürülmesinin anahtarıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — algılama ve müdahale",
              text: `Gemi, yangın algılama ve söndürme sistemleriyle donatılmalı ve bunlar çalışır durumda tutulmalıdır. Dedektörleri devre dışı bırakmak ciddi bir emniyet ihlalidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Galley Fire Suppression System (Wet Chemical)",
      sections: [
        {
          subheading: "3.1 Sistemin çalışma prensibi",
          paragraphs: [
            `Modern gemi galley'lerinde fritöz ve pişirme hattı üzerine sabit bir wet chemical (ıslak kimyasal) söndürme sistemi kurulur. Sistem; nozulları yağ yüzeyine, ocaklara ve davlumbaz/kanal girişine yönlendirir. Aktive olduğunda ıslak kimyasal ajan, yağ üzerinde saponifikasyon yoluyla buhar geçirmez bir sabunsu örtü oluşturur; bu hem oksijeni keser hem yüzeyi soğutur ve yeniden tutuşmayı önler.`,
            `Sistem otomatik (ısı algılayıcı fuse/link erirse) veya manuel (pull station) tetiklenebilir. Tetiklendiğinde tipik olarak gaz/elektrik beslemesini de otomatik keser (interlock) ve davlumbaz fanı/damper konfigürasyonunu güvenli duruma getirir. Aşçı, manuel tetikleme noktasının (pull station) konumunu ve nasıl çekileceğini bilmek zorundadır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Manuel pull station'ı tanı",
              text: `Otomatik tetikleme gecikirse ya da gözünün önünde başlayan yangında, manuel pull station'ı çekmek saniyeler kazandırır. Konumu ve çekme yönü ezbere bilinmelidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Bakım, test ve tetikleme sonrası",
          paragraphs: [
            `Wet chemical sistemi periyodik olarak yetkili servisçe kontrol edilir (nozul tıkanması, basınç, fuse/link bütünlüğü, ajan miktarı). Aşçı; nozulların yağ/kir ile tıkanmamasını sağlar, fuse link'lerin doğru sıcaklık derecesinde ve yağ filmiyle kaplanmamış olmasını kontrol eder. Sistem tetiklendikten sonra galley kullanılmaz; tüm yüzeyler temizlenir, sistem yetkili tarafından yeniden şarj edilir ve interlock'lar resetlenir.`,
          ],
          table: {
            caption: `Wet Chemical Sistem — Aşçının Kontrol Noktaları`,
            headers: ["Bileşen", "Kontrol", "Sıklık"],
            rows: [
              ["Nozul", "Tıkanma/yağ kaplaması yok", "Düzenli görsel"],
              ["Fuse / detector link", "Bütün, yağsız", "Düzenli görsel"],
              ["Manuel pull station", "Erişilebilir, engelsiz", "Her vardiya"],
              ["Basınç göstergesi", "Yeşil bölgede", "Düzenli görsel"],
              ["Tam test/şarj", "Yetkili servis", "Periyodik"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Taşınabilir Söndürücüler ve Fire Blanket",
      sections: [
        {
          subheading: "4.1 Class F/K söndürücü ve diğer tipler",
          paragraphs: [
            `Galley'de pişirme yağı yangını için Class F (K) wet chemical taşınabilir söndürücü bulundurulur ve konumu aşçı tarafından bilinir. Ayrıca elektrik kaynaklı yangın için CO2 söndürücü uygun konumda olur (yağ yangınına CO2 yetersiz/dağıtıcı olabilir). Aşçı, her söndürücünün hangi yangına uygun olduğunu ve PASS tekniğini (Pull-Aim-Squeeze-Sweep) bilir.`,
            `Söndürücülerin basınç göstergesi, mühür ve erişilebilirliği düzenli kontrol edilir; önleri engellenmez. Yanlış söndürücü seçimi (örn. yağa su bazlı veya elektrikli ekipmana su) yangını büyütür; bu yüzden seçim kritiktir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "PASS tekniği",
              text: `Pull (pimi çek) – Aim (alevin dibine nişan al) – Squeeze (kolu sık) – Sweep (yan yana süpür). Aleve değil yakıtın yüzeyine müdahale edilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Fire blanket (yangın battaniyesi) kullanımı",
          paragraphs: [
            `Küçük tencere/tava yağ yangınında fire blanket en hızlı ve güvenli müdahaledir: battaniye, elleri koruyacak şekilde tutulup yangının üzerine örtülerek oksijen kesilir. Battaniye yangının üstüne ATILMAZ, yavaşça örtülür ve ısı kaynağı (ocak) kapatılır; örtü, alev tamamen sönene ve yüzey soğuyana kadar (en az birkaç dakika) kaldırılmaz. Erken kaldırmak yeniden tutuşmaya yol açar.`,
            `Fire blanket galley'de erişilebilir, hızlı çekilebilir bir konumda (genelde kapı yakını duvarda) bulunur. Aşçı, battaniyenin konumunu ve çekme yönünü bilmeli, kullandıktan sonra (tek kullanımlık olanlar) yenisiyle değiştirmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Battaniyeyi erken kaldırma",
              text: `Yağ yangınında örtüyü erken kaldırmak, hava girişiyle yeniden tutuşmaya neden olur. Yüzey soğuyana kadar (birkaç dakika) örtü yerinde kalır ve ocak kapatılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Havalandırma, Damper ve Kanal Yönetimi",
      sections: [
        {
          subheading: "5.1 Damperlerin yangındaki rolü",
          paragraphs: [
            `Galley havalandırması yangını besleyen oksijeni ve kanaldaki yağı taşıdığı için yangın anında kritik öneme sahiptir. Galley egzoz kanalında ve besleme havasında yangın damperleri (fire dampers) bulunur; yangın halinde bunlar kapatılarak alevin/dumanın kanal boyunca yayılması ve oksijen beslemesi kesilir. Aşçı, damperlerin manuel kapatma noktalarını ve davlumbaz fanını durdurma yöntemini bilmek zorundadır.`,
            `Otomatik suppression sistemi tetiklendiğinde tipik olarak fan ve damperleri güvenli konuma getirir; ancak aşçı manuel müdahaleyi de bilmelidir. Yangın sırasında fanı durdurmak ve damperleri kapatmak, yangını galley içinde sınırlamanın temel adımıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — kanal ve damper",
              text: `Galley egzoz kanalları yağ birikimini önleyecek şekilde temizlenebilir olmalı ve yangın damperleriyle donatılmalıdır. Damperlerin işler durumda olması zorunludur.`,
            },
          ],
        },
        {
          subheading: "5.2 Kanal yangını ve yayılma kontrolü",
          paragraphs: [
            `Birikmiş yağ kanal içinde tutuşursa yangın doğrudan görünmez ve hızla yayılabilir; bu en tehlikeli galley yangını senaryolarından biridir. Müdahale; pişirmeyi durdurmak, suppression sistemini tetiklemek, fanı durdurup damperleri kapatmak ve gemi yangın ekibini (fire party) çağırmaktır. Kanal yangınına aşçı tek başına müdahale etmeye çalışmaz; alarm verir ve organize müdahaleye geçilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Acil Durum Prosedürü ve Müdahale Sırası",
      sections: [
        {
          subheading: "6.1 Yangın anında doğru sıra",
          paragraphs: [
            `Galley yangınında müdahale sırası nettir: 1) Isı kaynağını kes (ocak/fritöz/gaz kapat), 2) küçük ve kontrol edilebilirse uygun söndürücü/fire blanket ile derhal müdahale et, 3) alarm ver (yangın butonu/köprüüstü), 4) büyürse veya kontrolden çıkarsa suppression sistemini tetikle, fanı durdur, damperleri kapat ve galley'i tahliye et. Hayat her zaman ekipmandan önce gelir; kontrol edilemeyen yangında müdahale değil tahliye ve organize ekip müdahalesi esastır.`,
            `Aşçı, gemi acil durum planındaki (muster list) yangın görevini ve galley için tahliye yolunu bilir. STCW temel emniyet eğitimi (yangın önleme ve söndürme) tüm gemiadamları için zorunludur; aşçı periyodik yangın talimlerine (fire drill) katılır.`,
          ],
          bullets: [
            `1) Isı/gaz kaynağını kes`,
            `2) Küçükse uygun söndürücü / fire blanket ile müdahale`,
            `3) Alarm ver (yangın butonu / köprüüstü)`,
            `4) Büyürse suppression tetikle, fan dur, damper kapat`,
            `5) Galley'i tahliye et, organize fire party'ye bırak`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hayat ekipmandan önce gelir",
              text: `Kontrolden çıkan yangında kahramanlık yapılmaz. Alarm ver, tahliye et, kapıyı kapat (oksijeni kes), organize ekip müdahalesine geç.`,
            },
          ],
        },
        {
          subheading: "6.2 Talim, eğitim ve hazırlık",
          paragraphs: [
            `Düzenli fire drill'ler aşçının refleksini canlı tutar: söndürücü konumu, pull station, damper kapatma, fire blanket kullanımı. Aşçı, kendi mahallinin (galley) en yüksek risk noktası olduğunun bilinciyle hareket eder; talimlerde galley senaryosu ayrıca çalışılır. Eğitim ve hazırlık, gerçek bir yangında paniği eyleme dönüştüren tek şeydir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Galley yangın emniyeti checklist'i",
          bullets: [
            `Fritöz gözetimli, emniyet kesicisi çalışır durumda mı?`,
            `Davlumbaz filtresi/kanalı yağdan arındırıldı mı?`,
            `Wet chemical suppression nozulları açık, pull station erişilebilir mi?`,
            `Class F/K söndürücü ve CO2 yerinde, basınç yeşilde mi?`,
            `Fire blanket erişilebilir konumda ve kullanıma hazır mı?`,
            `Yangın damperi/fan durdurma noktaları biliniyor mu?`,
            `Yangın dedektörleri açık (asla örtülü/kapalı değil) mi?`,
            `Vardiya sonu tüm pişirme ekipmanı kapalı mı kontrolü yapıldı mı?`,
            `Aşçı muster list yangın görevini ve tahliye yolunu biliyor mu?`,
            `Son fire drill'e katılım sağlandı mı?`,
          ],
          paragraphs: [
            `Mutfak yangın emniyeti, aşçının en hayati sorumluluklarından biridir çünkü galley gemideki en yüksek yangın riskli mahaldir. Önleme (temizlik, gözetim, kapatma) birinci savunma; doğru söndürücü ve fire blanket bilgisi ikinci; otomatik suppression, damper kontrolü ve organize müdahale üçüncü hattır. Su ile yağ yangınına asla müdahale etmemek gibi temel refleksler, bir galley yangınını küçük bir olay ile felaket arasındaki farkı belirler.`,
          ],
        },
      ],
    },
  ],
};

export default content;
