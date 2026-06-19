import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Planned Maintenance System (PMS) yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 1,
  estimatedPages: 26,
  intro: `Baş Mühendis (Chief Engineer), geminin tüm makine ve yardımcı ekipmanlarının bakım takvimini Planned Maintenance System (PMS) üzerinden yönetmekle yükümlüdür. Bu sorumluluk; iş emirlerinin (work order) açılması ve onaylanması, kayıtların doğruluğunun denetlenmesi, bakımın sadece yazılım üzerinde değil sahada da fiilen yapıldığının teyidi ve bakım performansının KPI'larla izlenmesini kapsar. PMS kayıtları, klas (CMS) ve bayrak devleti survey'lerinde birincil kanıt belgesidir; eksik veya sahte kayıt geminin tutulmasına ve sınıf koşullarının askıya alınmasına yol açar. Bu bölüm, modern bir gemide PMS'in kurgusunu, denetimini ve sürekli iyileştirmesini detaylı olarak ele alır.`,
  sources: [
    "IACS UR Z18 — Maintenance and Inspection (Continuous Survey Machinery)",
    "ISM Code (International Safety Management) — Element 10: Maintenance of Ship and Equipment",
    "SOLAS Chapter II-1 Reg. 26-29 — Machinery installations",
    "Class Society Rules (DNV, LR, ABS, BV) — Survey arrangements",
    "OCIMF SIRE 2.0 / TMSA Element 6 — Maintenance and assurance",
    "Manufacturer Maintenance Manuals (MAN ES, WinGD, Wärtsilä, Alfa Laval)",
    "TMSA (Tanker Management and Self Assessment) Best Practice Guide",
  ],
  chapters: [
    {
      heading: "1. PMS'in Yasal Temeli ve Sınıf Bağlamı",
      lead: `PMS rastgele bir bakım listesi değil; ISM Code ve klas kurallarının zorunlu kıldığı, denetlenebilir ve izlenebilir bir sistemdir.`,
      sections: [
        {
          subheading: "1.1 ISM Code Element 10 yükümlülüğü",
          paragraphs: [
            `ISM Code'un 10. maddesi, şirketten geminin ve ekipmanlarının üreticinin gereklilikleri ile şirketin belirlediği standartlara uygun olarak bakımını yapacak prosedürler kurmasını ister. PMS, bu maddenin sahadaki uygulamasıdır. SMS (Safety Management System) içinde, hangi ekipmanın hangi periyotta, hangi prosedürle ve kim tarafından bakılacağı tanımlanır.`,
            `Element 10.3 ayrıca "kritik ekipman" (critical equipment) kavramını getirir; ani arızası tehlikeli duruma yol açabilecek ekipmanlar için ek koruyucu önlemler, yedeklilik (redundancy) ve fonksiyon testleri zorunludur. Baş Mühendis, makine dairesindeki kritik ekipman listesini güncel tutar ve bu ekipmanların testlerini ayrı bir takvimde izler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code 10.3 — Critical Equipment",
              text: `Aniden arızalandığında tehlikeli duruma yol açabilecek ekipman ve teknik sistemler tanımlanmalı; bu ekipmanların güvenilirliğini sağlamak için spesifik önlemler (düzenli test, yedeklilik) belirlenmelidir. Steering gear, main engine, generators, fire pumps tipik kritik ekipmandır.`,
            },
          ],
        },
        {
          subheading: "1.2 Continuous Survey Machinery (CMS) ile entegrasyon",
          paragraphs: [
            `Modern gemilerin çoğu klas tarafından 5 yıllık Continuous Survey of Machinery (CMS) döngüsünde yönetilir. Bu döngüde her makine kalemi 5 yıl içinde en az bir kez sörveye tabi tutulur; sörveylerin yaklaşık beşte biri her yıl tamamlanır. Onaylı PMS (Approved Planned Maintenance Scheme) sahibi gemilerde, belirli ekipmanların açılarak denetimi yerine Baş Mühendis'in (chief engineer survey) PMS kayıtları klas tarafından kabul edilir.`,
            `Bu ayrıcalık ciddi bir sorumluluk getirir: PMS kaydı geç, eksik veya tutarsız olursa klas o kalemi CMS'den çıkarıp fiziki sörveye geri çevirebilir; bu da plansız açma, gecikme ve maliyet demektir. Baş Mühendis, "PMS credit" alınan kalemlerin kayıtlarını surveyor titizliğinde tutar.`,
          ],
        },
      ],
    },
    {
      heading: "2. PMS Yazılım Mimarisi ve Veri Yapısı",
      sections: [
        {
          subheading: "2.1 Ekipman hiyerarşisi ve job kartları",
          paragraphs: [
            `PMS yazılımları (AMOS, ShipManager/StarIPS, BASSnet, Kaiko, TM Master, Mastery) ekipmanı hiyerarşik bir ağaçla modeller: gemi → sistem (örn. propulsion) → ana ekipman (main engine) → bileşen (fuel injector, exhaust valve) → job (overhaul). Her job kartı; periyot (saat-bazlı, takvim-bazlı veya condition-bazlı), gereken yedek parça, iş gücü, prosedür referansı ve emniyet uyarılarını içerir.`,
            `Saat-bazlı joblar running hours counter'a bağlıdır; örneğin ana makine fuel injector overhaul'ı 8.000 çalışma saatinde tetiklenir. Takvim-bazlı joblar tarihe bağlıdır (örn. life raft yıllık servis). Baş Mühendis, running hours'ın doğru girildiğini denetler; counter hatası tüm zincirin kaymasına yol açar.`,
          ],
          table: {
            caption: `Tipik PMS bakım periyodu kategorileri`,
            headers: ["Tip", "Tetikleyici", "Örnek", "Esneklik"],
            rows: [
              ["Saat-bazlı", "Running hours", "M/E injector overhaul (8000 h)", "+/- %10 (manual'a göre)"],
              ["Takvim-bazlı", "Tarih", "OWS test (aylık), LSA (yıllık)", "Kesin tarih"],
              ["Condition-bazlı", "Ölçüm/analiz", "Bearing renewal (vibration trend)", "Trend tetikli"],
              ["Calendar+Hour", "İkisi de", "LO renewal (3000 h veya 6 ay)", "Erken olan"],
            ],
          },
        },
        {
          subheading: "2.2 Senkronizasyon ve veri bütünlüğü",
          paragraphs: [
            `Gemi PMS veritabanı ile şirket (office) veritabanı düzenli olarak senkronize edilir (replikasyon). Baş Mühendis, senkronizasyon başarısını ve eksik kalan job'ları kontrol eder; senkron kopması, ofisteki superintendent'in eksik veri görmesine ve yanlış karar almasına yol açar. Job tamamlama kaydında actual hours, yedek parça tüketimi (ROB güncellemesi) ve "remarks" alanı eksiksiz doldurulur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geriye dönük (backdated) kayıt yasağı",
              text: `Yapılmamış bir bakımı "yapılmış" gibi geriye dönük işaretlemek (kayıt sahteciliği), ISM ihlali ve klas dolandırıcılığıdır. PSC ve vetting denetçileri spare parça tüketimi ile job kaydı arasındaki tutarsızlığı kolayca tespit eder. Sahte PMS kaydı geminin tutulmasına ve şirket DOC'unun riske girmesine yol açar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. İş Emri (Work Order) Yaşam Döngüsü",
      sections: [
        {
          subheading: "3.1 Açılış, planlama ve atama",
          paragraphs: [
            `Bir work order; PMS tarafından otomatik (due olduğunda) veya manuel (arıza/inspection bulgusu üzerine — corrective work order) açılır. Baş Mühendis haftalık planlama toplantısında o hafta due olan ve yaklaşan job'ları gözden geçirir; iş gücü, yedek parça mevcudiyeti, gemi operasyonu (limanda mı, seferde mi) ve emniyet riskine göre önceliklendirir.`,
            `İş, sorumlu mühendise atanır (örneğin generator overhaul İkinci Mühendis'e, separator bakımı Üçüncü Mühendis'e). Kritik veya enclosed space gerektiren işler için ayrı permit-to-work açılır ve risk assessment yapılır. Planlama, ana makine yükü ve seyir güvenliğini etkilemeyecek şekilde zamanlanır.`,
          ],
        },
        {
          subheading: "3.2 Yürütme, kayıt ve kapanış onayı",
          paragraphs: [
            `İş tamamlandığında sorumlu mühendis; bulguları (örn. liner aşınması ölçümü, ring uçuçluk açıklığı, clearance değerleri), kullanılan yedekleri, harcanan süreyi ve varsa anomalileri work order'a işler. Baş Mühendis bu kaydı denetler ve kapanışı onaylar (sign-off). Onay öncesi, ölçüm değerlerinin manual toleranslarına uygunluğu kontrol edilir; tolerans dışı bir değer varsa follow-up job açılır.`,
            `Baş Mühendis'in onayı sadece bir tıklama değil, kalite kapısıdır: ölçüm değeri mantıksızsa, fotoğraf yoksa veya remarks boşsa iş geri gönderilir. Bu disiplin, PMS'in "kâğıt üstünde değil, sahada" yapıldığının teminatıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Eksik kayıt PSC tutulması",
              text: `Bir bulk carrier PSC denetiminde, emergency fire pump'ın PMS'te "test edildi" göründüğü ama fiili çalıştırmada prime alamadığı tespit edildi. Sonuç: detention (gemi tutuldu), Major Non-Conformity ve şirket SMS'inin sahadaki uygulamasına dair denetçi şüphesi. Ders: PMS kaydı fonksiyon testini garanti etmez; fiili doğrulama şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Saha Doğrulaması: Kayıt ile Gerçeğin Uyumu",
      sections: [
        {
          subheading: "4.1 Baş Mühendis'in fiziki denetimleri",
          paragraphs: [
            `Baş Mühendis, PMS kayıtlarının sahaya yansımasını düzenli "walk-around" denetimleriyle teyit eder. Tamamlandı işaretli bir job'ın gerçekte yapılıp yapılmadığı; ekipmanın temizliği, conta/gasket yeniliği, yağ rengi, vida/somun emniyet tellerinin durumu ve genel kondisyondan anlaşılır. Bu denetim, ekibe "kayıt sahteciliği fark edilir" mesajını verir.`,
            `Özellikle kritik ekipmanlarda (steering gear, generators, fire/bilge pumps, emergency systems) test, sadece kayıt değil canlı fonksiyon doğrulaması ister: emergency generator'ın yük altında devreye girmesi, fire pump'ın basınç vermesi, bilge alarm'ın gerçek tetiklenmesi.`,
          ],
        },
        {
          subheading: "4.2 Spare parça tüketimi ile çapraz kontrol",
          paragraphs: [
            `Yapılan bir overhaul mutlaka yedek parça tüketir (gasket, o-ring, bearing, injector nozzle). PMS'te job "tamamlandı" ama ROB (Remaining On Board) hiç düşmemişse, iş büyük olasılıkla yapılmamıştır. Baş Mühendis bu çapraz kontrolü periyodik yapar; vetting ve klas denetçileri de aynı yöntemi kullanır.`,
          ],
          bullets: [
            `Job tamamlandı → ilgili yedek ROB'da düştü mü?`,
            `Çalışma saati job kapanışında counter ile tutarlı mı?`,
            `Ölçüm değerleri (clearance, deflection) manual toleransında mı?`,
            `Fotoğraf / inspection raporu eklendi mi?`,
            `Anomali varsa corrective job veya defect kaydı açıldı mı?`,
          ],
        },
      ],
    },
    {
      heading: "5. Erteleme (Deferral) ve Sapma Yönetimi",
      sections: [
        {
          subheading: "5.1 Job postponement prosedürü",
          paragraphs: [
            `Bir job; yedek parça gelmediği, hava/operasyon uygun olmadığı veya iş gücü yetersizliği nedeniyle due tarihinde yapılamayabilir. Bu durumda kontrolsüz gecikme yerine resmi deferral kaydı açılır: gerekçe, risk değerlendirmesi, geçici önlem (mitigation) ve yeni hedef tarih belgelenir. Kritik ekipman job'larının ertelenmesi şirket (superintendent) onayı gerektirir.`,
            `Sınıf kredisi (PMS credit) alınan kalemlerde, klas toleransının (genelde periyodun +%10 veya belirli ay) aşılması durumunda klas onayı (extension) alınmalıdır. Onaysız aşım, o kalemin CMS'den düşmesine yol açabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Overdue oranı bir KPI'dır",
              text: `Sağlıklı bir PMS'te overdue (geçmiş) ve due-soon job oranı düşük tutulur. TMSA ve vetting, overdue critical job sayısını performans göstergesi olarak izler. Hedef genelde kritik job'larda %0 overdue, toplamda <%5'tir.`,
            },
          ],
        },
        {
          subheading: "5.2 Condition-based maintenance'a geçiş",
          paragraphs: [
            `Sabit saat-bazlı bakım her zaman optimum değildir; iyi durumdaki bir bearing'i gereksiz değiştirmek hem maliyet hem arıza riski (montaj hatası) yaratır. Modern PMS, condition monitoring (vibration, yağ analizi, thermography, performance trend) verisini job tetikleyici olarak kullanır. Baş Mühendis, hangi ekipmanın CBM'e uygun olduğunu klas ve manufacturer onayıyla belirler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Performans İzleme ve KPI'lar",
      sections: [
        {
          subheading: "6.1 Bakım performans göstergeleri",
          paragraphs: [
            `Baş Mühendis, PMS sağlığını sayısal göstergelerle ofise raporlar. Bunlar; toplam due/completed/overdue job sayıları, kritik ekipman overdue, planlı-plansız bakım oranı (yüksek plansız oran, kötü güvenilirlik işaretidir), ortalama job tamamlama süresi ve yedek parça stok-out sayısıdır.`,
          ],
          table: {
            caption: `Örnek aylık PMS KPI tablosu`,
            headers: ["KPI", "Hedef", "Bu Ay", "Trend"],
            rows: [
              ["Toplam overdue job", "< %5", "%3.2", "İyileşiyor"],
              ["Kritik ekipman overdue", "0", "0", "Sabit"],
              ["Planlı / plansız oran", "> 80/20", "84/16", "İyileşiyor"],
              ["Senkron başarısı (ofis)", "%100", "%100", "Sabit"],
              ["Spare stock-out olayı", "< 3", "2", "Sabit"],
            ],
          },
        },
        {
          subheading: "6.2 Güvenilirlik ve kök-neden analizi",
          paragraphs: [
            `Tekrarlayan arızalar (örn. aynı pompa mekanik salmastrasının 3 ayda bir bozulması) PMS periyodunun veya prosedürünün yetersizliğine işaret eder. Baş Mühendis kök-neden analizi (RCA — 5 Why, fishbone) yapar; çözüm bazen periyodu kısaltmak, bazen yedek parça kalitesini yükseltmek, bazen montaj prosedürünü revize etmektir. Bu öğrenim, PMS job kartına geri işlenir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Yedek Parça ve Stok Entegrasyonu",
      sections: [
        {
          subheading: "7.1 Min/Max stok ve otomatik talep",
          paragraphs: [
            `PMS, spare parça modülüyle entegredir. Her kritik parça için minimum ve maksimum stok seviyeleri tanımlıdır; ROB minimuma düştüğünde sistem otomatik talep (requisition) önerir. Baş Mühendis, gelecek 3-6 ayda due olan job'ların yedek ihtiyacını "forward planning" ile öne çeker ve tek seferde toplu sipariş ile lojistik maliyeti düşürür.`,
            `MARPOL ve klas tarafından zorunlu kılınan minimum yedekler (örn. ana makine için bir takım fuel injection ekipmanı, exhaust valve spindle) her zaman bulundurulmalıdır. Bu kalemlerin stok-out olması doğrudan uygunsuzluktur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Survey ve Vetting'de PMS Kanıtı",
      sections: [
        {
          subheading: "8.1 Klas surveyor için hazırlık",
          paragraphs: [
            `CMS sörveyinde surveyor, kredi alınan kalemlerin job kayıtlarını, ölçüm değerlerini ve trend'lerini ister. Baş Mühendis; crank deflection ölçümleri, exhaust valve/piston overhaul raporları, T/C overhaul, safety device (overspeed trip, low LO pressure trip) test kayıtlarını dosyalı ve erişilebilir tutar. Eksik veya tutarsız kayıt, kalemin fiziki sörveye çevrilmesine yol açar.`,
          ],
        },
        {
          subheading: "8.2 PSC ve vetting beklentileri",
          paragraphs: [
            `PSC denetçisi PMS üzerinden emergency ve safety ekipmanının test kayıtlarına bakar; SIRE 2.0 / TMSA denetçisi ise sistemin bütünlüğünü, overdue critical job'ları ve kayıt-saha uyumunu sorgular. Baş Mühendis, PMS'i şeffaf ve dürüst tutarak bu denetimlerde gemiyi savunur; kapatılan bir job'un arkasında her zaman gerçek bir iş ve ölçülebilir kanıt olmalıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "TMSA Element 6",
              text: `Maintenance and assurance: şirketten ve gemiden, ekipman güvenilirliğini sağlayan, kritik ekipmanı önceliklendiren ve performansı ölçen bir bakım yönetim sistemi beklenir. PMS bu elemanın merkezidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sürekli İyileştirme ve Dijitalleşme",
      sections: [
        {
          subheading: "9.1 Geri besleme döngüsü",
          paragraphs: [
            `PMS statik değildir; her arıza, her yakın-kaçış (near-miss), her tekrarlayan problem job kartlarının ve periyotların revizyonu için girdidir. Baş Mühendis, gemiden ofise düzenli iyileştirme önerileri (periyot değişikliği, prosedür güncellemesi, yeni job) gönderir. Filo genelinde benzer ekipman arızaları, ofis tarafından tüm gemilere yansıtılır.`,
          ],
        },
        {
          subheading: "9.2 Sensör verisi ve predictive maintenance",
          paragraphs: [
            `Yeni nesil gemilerde sürekli sensör verisi (sıcaklık, basınç, vibration, yük) bulut tabanlı analitik platformlara akar; anomali tespitiyle arıza, gerçekleşmeden önce öngörülür. Bu, PMS'i takvim-tabanlıdan condition/predictive-tabanlıya taşır. Baş Mühendis bu verinin doğruluğunu, alarm eşiklerini ve sahadaki müdahaleyi sahiplenir; veri ne kadar zengin olursa olsun, nihai teknik karar mühendisindir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Baş Mühendis'in PMS denetim checklist'i",
          bullets: [
            `Bu hafta due ve yaklaşan job'lar gözden geçirildi ve önceliklendirildi mi?`,
            `Kritik ekipman overdue sayısı sıfır mı?`,
            `Tamamlanan job'larda ölçüm değerleri tolerans içinde ve kayıt dolu mu?`,
            `Job tamamlama ile spare ROB düşüşü tutarlı mı (çapraz kontrol)?`,
            `Running hours counter'lar doğru ve güncel mi?`,
            `Ertelenen job'lar resmi deferral + risk değerlendirmesi ile mi kapandı?`,
            `Sınıf kredisi alınan kalemlerin kayıtları surveyor titizliğinde mi?`,
            `Gemi-ofis senkronizasyonu başarılı ve eksik veri yok mu?`,
            `Fonksiyon testleri (emergency/safety) fiilen doğrulandı mı?`,
          ],
          paragraphs: [
            `PMS yönetiminde Baş Mühendis'in başarısı, bir yazılımı doldurmaktan ibaret değildir; bakımın gerçekten yapıldığını, doğru kaydedildiğini ve ekipmanın güvenilirliğini koruduğunu güvence altına almaktır. İyi yönetilen bir PMS; plansız arızayı, sörvey sürprizini ve detention riskini en aza indirir; geminin teknik onurunu ve şirketin denetim performansını koruyan görünmez ama belirleyici bir disiplindir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
