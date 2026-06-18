import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Denetim ve sörvey hazırlığı",
  roleSlug: "birinci-zabit",
  taskIndex: 9,
  estimatedPages: 24,
  intro: `Birinci Zabit, güverte departmanı açısından PSC (Port State Control), vetting, flag state ve klas denetimlerinin hazırlığından sorumludur. Bu sorumluluk; emniyet ekipman kayıtları, PMS logları, drill kayıtları, risk assessment arşivi ve çalışma izni dosyalarının denetim formatına uygun tutulmasını kapsar. Bir tutulma (detention) gemiyi günlerce limanda bekletir, şirkete itibar ve para kaybı yaşatır; bir vetting başarısızlığı charter kaybına yol açabilir. Bu bölüm, Birinci Zabit'in denetime hazır gemi kültürünü nasıl kurduğunu açıklar.`,
  sources: [
    "Paris MoU & Tokyo MoU PSC Procedures",
    "IMO Resolution A.1155(32) — Procedures for Port State Control",
    "OCIMF SIRE 2.0 Vetting Inspection Programme",
    "RightShip Inspection & Vetting Criteria",
    "ISM Code — Internal Audits & Management Review",
    "SOLAS Chapter I — Surveys and Certification",
    "STCW Code — Records and Familiarization",
    "Classification Society Survey Requirements (IACS)",
  ],
  chapters: [
    {
      heading: "1. Denetim Türleri ve Birinci Zabit'in Sorumluluğu",
      lead: `Gemi pek çok farklı denetimle karşılaşır; her birinin odağı ve formatı farklıdır.`,
      sections: [
        {
          subheading: "1.1 Denetim türlerine genel bakış",
          paragraphs: [
            `Gemi yaşamı boyunca çok katmanlı denetime tabidir: flag state (bayrak devleti) ve klas (class) sertifikasyon sörveyleri, PSC (liman devleti kontrolü), vetting (SIRE 2.0 tankerlerde, RightShip bulker'larda), ISM iç ve dış denetimi, ve charterer inspeksiyonları. Birinci Zabit, güverte ekipmanı, emniyet sistemleri ve dokümantasyon açısından tüm bunlara hazırlık yapar.`,
            `Her denetimin odak alanı farklıdır: PSC eksiklik (deficiency) ve detention'a odaklanır; vetting risk profilini ölçer; klas yapısal bütünlük ve sertifika geçerliliğini denetler. Birinci Zabit, hangi denetimin ne aradığını bilerek belge ve fiziki durumu hazırlar.`,
          ],
          table: {
            caption: `Başlıca Denetim Türleri ve Odak Alanları`,
            headers: ["Denetim", "Yapan", "Odak", "Sonuç"],
            rows: [
              ["PSC", "Liman devleti", "SOLAS/MARPOL/MLC uyumu", "Deficiency / Detention"],
              ["Vetting (SIRE 2.0)", "OCIMF üye şirket", "Operasyonel risk", "Observation / charter kararı"],
              ["Klas sörveyi", "Klas kuruluşu", "Yapısal bütünlük, sertifika", "Condition of Class"],
              ["Flag state", "Bayrak devleti", "Sertifikasyon, ISM", "Non-conformity"],
              ["ISM iç denetim", "Şirket/DPA", "SMS uygulaması", "NC / observation"],
            ],
          },
        },
        {
          subheading: "1.2 Hazır gemi (audit-ready) kültürü",
          paragraphs: [
            `En etkili hazırlık, denetimden günler önce panik temizliği değil, sürekli "audit-ready" çalışma kültürüdür. Birinci Zabit, kayıtların gerçek zamanlı tutulmasını, ekipmanın bakımlı olmasını ve ekibin prosedürleri bilmesini günlük rutine yerleştirir. Denetçi en çok "kayıt ile fiili durum arasındaki tutarlılığa" bakar.`,
            `Şirket genelde bir self-assessment checklist'i (PSC pre-arrival, vetting pre-vet) sağlar; Birinci Zabit bunu liman öncesi uygular ve eksikleri kapatır. Bu proaktif yaklaşım, denetim anındaki sürprizleri ortadan kaldırır.`,
          ],
        },
      ],
    },
    {
      heading: "2. PSC (Port State Control) Hazırlığı",
      sections: [
        {
          subheading: "2.1 PSC süreci ve hedefleme",
          paragraphs: [
            `PSC denetimleri Paris MoU, Tokyo MoU gibi bölgesel anlaşmalar altında yürür ve gemiler risk profiline (Ship Risk Profile) göre hedeflenir; yüksek riskli gemiler daha sık ve detaylı denetlenir. İlk PSC genel bir kontroldür; "clear grounds" (somut şüphe) bulunursa daha detaylı (more detailed) inspeksiyona dönüşür. Birinci Zabit, geminin risk profilini düşük tutacak temiz bir denetim geçmişi hedefler.`,
            `Sertifikaların geçerliliği, güverte emniyet ekipmanı, can kurtarma/yangın sistemleri, MARPOL kayıtları ve mürettebatın görev bilgisi PSC odağındadır. Eksiklikler "deficiency" olarak kaydedilir; ciddi olanlar detention'a yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Detainable deficiency",
              text: `Çalışmayan can kurtarma/yangın ekipmanı, geçersiz sertifika, ciddi yapısal sorun veya mürettebatın temel emniyet görevini bilmemesi detention sebebidir. Detention, geminin tüm eksiklikler giderilene kadar limandan ayrılamaması demektir.`,
            },
          ],
        },
        {
          subheading: "2.2 Sık görülen güverte bulguları ve önleme",
          paragraphs: [
            `Güverte tarafında en sık PSC bulguları: eksik/süresi geçmiş LSA-FFE ekipmanı, hatalı muster list, çalışmayan acil aydınlatma, hasarlı can salı serbest bırakma (hydrostatic release), kayıtlardaki tutarsızlık, kötü hold/güverte bakımı ve eksik çalışma izni dosyaları. Birinci Zabit bu kalemleri liman öncesi self-check ile kapatır.`,
            `Mürettebat "knowledge" testi de yapılır: denetçi rastgele bir tayfaya yangın istasyonunu, can salı bırakmayı veya enclosed space rescue'yu sorar. Bu yüzden familiarization ve drill kalitesi denetim sonucunu doğrudan etkiler.`,
          ],
          bullets: [
            `LSA/FFE servis tarihleri ve sertifikaları güncel mi?`,
            `Muster list, IMO işaretleri ve acil aydınlatma çalışıyor mu?`,
            `ORB/GRB/drill kayıtları tutarlı ve okunaklı mı?`,
            `Hold/güverte/hatch cover bakımlı görünüyor mu?`,
            `PTW ve risk assessment dosyaları erişilebilir mi?`,
          ],
        },
      ],
    },
    {
      heading: "3. Vetting (SIRE 2.0 ve RightShip) Hazırlığı",
      sections: [
        {
          subheading: "3.1 SIRE 2.0 yeni yaklaşımı",
          paragraphs: [
            `OCIMF SIRE 2.0, klasik checklist yerine risk-temelli, gemiye özgü sorularla (Core, Rotational, Campaign questions) çalışan dijital bir vetting sistemidir. Denetçi tablet üzerinden, hardware-human-process boyutlarını birlikte değerlendirir. Birinci Zabit'in tek tek prosedürleri "kâğıttan değil, uygulayarak" bildiğini göstermesi beklenir.`,
            `Vetting başarısı charterer'ın gemiyi kabulü için kritiktir; başarısız vetting, geminin charter dışı kalmasına yol açabilir. Bu yüzden tankerlerde vetting hazırlığı en yüksek öncelikli işlerdendir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SIRE 2.0 — insan faktörü",
              text: `SIRE 2.0, ekipmanın yanı sıra mürettebatın bilgisi ve davranışını da ölçer. Birinci Zabit, kendi alanındaki (mooring, cargo, LSA, enclosed space) prosedürleri sahada uygulayarak gösterebilmelidir; ezber yanıt yeterli değildir.`,
            },
          ],
        },
        {
          subheading: "3.2 RightShip ve dökme yük vetting",
          paragraphs: [
            `Bulker ve genel kargo tarafında RightShip inspeksiyonları yaygındır; gemi yaşı, geçmiş PSC kayıtları, kaza geçmişi ve fiziki durum bir risk skoru oluşturur. Birinci Zabit, güverte/hold bakımı, lashing ekipmanı durumu ve dokümantasyonu bu kriterlere göre hazır tutar.`,
            `Her iki sistemde de gözlem (observation) açılırsa, kök neden analizi ve düzeltici aksiyon (corrective action) ile kapatma süreci yürütülür. Birinci Zabit güverte kaynaklı gözlemlerin kapatılmasını koordine eder.`,
          ],
        },
      ],
    },
    {
      heading: "4. Klas ve Flag State Sörveyleri",
      sections: [
        {
          subheading: "4.1 Periyodik klas sörveyleri",
          paragraphs: [
            `Klas; annual, intermediate, special (5 yıllık) ve dry-dock sörveyleri ile geminin yapısal bütünlüğünü ve ekipmanını denetler. Güverte tarafında hatch cover ultrasonic test, hold yapısal muayenesi, mooring ekipmanı, vinç/derrick load test ve anchor/chain ölçümleri gündeme gelir. Birinci Zabit, sörvey öncesi ilgili alanları erişilebilir ve temiz hazırlar.`,
            `Condition of Class (CoC) açılırsa, belirtilen süre içinde giderilmesi zorunludur; aksi halde sertifika askıya alınır. Birinci Zabit güverte kaynaklı CoC'lerin takibini yapar.`,
          ],
        },
        {
          subheading: "4.2 Sertifika ve doküman yönetimi",
          paragraphs: [
            `Geminin tüm güverte ilgili sertifikaları (Safety Equipment, Load Line, sınıf sertifikası, hatch cover test raporları, LSA-FFE servis sertifikaları) geçerli ve denetime hazır olmalıdır. Birinci Zabit, sertifika geçerlilik takvimini izler ve süresi yaklaşanları zamanında yeniler. Tek bir süresi geçmiş sertifika ciddi bulgu yaratır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sertifika takvimi",
              text: `Tüm sertifika ve servis tarihlerini içeren bir takip tablosu tutmak (renk kodlu: yeşil-sarı-kırmızı) süresi yaklaşan kalemleri önceden görmeyi sağlar. PMS yazılımları genelde bu hatırlatmayı otomatik üretir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. ISM İç Denetim ve Düzeltici Aksiyon",
      sections: [
        {
          subheading: "5.1 İç denetim hazırlığı ve cevap",
          paragraphs: [
            `ISM iç denetimleri, şirketin SMS'inin gemide uygulandığını doğrular. Birinci Zabit, güverte prosedürlerinin (cargo, mooring, PTW, drill, çevre) SMS'e uygun yürütüldüğünü gösterir. Bulgular non-conformity (NC) veya observation olarak kaydedilir.`,
            `Açılan NC'ler için kök neden analizi yapılır, düzeltici aksiyon belirlenir ve kapatma kanıtı (kayıt, fotoğraf) dokümante edilir. Birinci Zabit güverte kaynaklı NC'lerin zamanında kapatılmasını ve DPA'ya raporlanmasını sağlar.`,
          ],
        },
        {
          subheading: "5.2 Bulgu trendi ve önleyici yaklaşım",
          paragraphs: [
            `Tekrarlayan bulgular sistemik sorun işaretidir. Birinci Zabit, geçmiş PSC/vetting/iç denetim bulgularını analiz ederek tekrarı önler; örneğin sürekli "lashing ekipmanı aşınmış" bulgusu, ekipman değişim politikasının gözden geçirilmesini gerektirir. Önleyici aksiyon (preventive action), reaktif düzeltmeden değerlidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — tekrarlayan bulgu",
              text: `Bir gemide üst üste iki PSC'de "muster list güncel değil" bulgusu açıldı. Kök neden: personel değişiminde güncelleme prosedürü yoktu. Çözüm: her crew change sonrası muster list güncelleme adımı SMS'e eklendi; bulgu bir daha tekrarlamadı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Dokümantasyon ve Kayıt Arşivi",
      sections: [
        {
          subheading: "6.1 Güverte kayıt sistemi",
          paragraphs: [
            `Birinci Zabit, güverte departmanının tüm kayıtlarını sistematik bir arşivde tutar: drill kayıtları (abandon ship, fire, enclosed space, oil spill), PMS iş emirleri, risk assessment'lar, PTW dosyaları, mooring/cargo kayıtları ve çevre defterleri. Denetçi herhangi bir kaydı dakikalar içinde istediğinde sunulabilmelidir.`,
            `Elektronik kayıt sistemleri (e-logbook, PMS yazılımı) artık yaygındır; ancak yedekleme ve denetçi erişimi önceden hazırlanmalıdır. Kayıtlar okunaklı, tarihli, imzalı ve tutarlı olmalıdır.`,
          ],
        },
        {
          subheading: "6.2 Drill ve familiarization kayıtları",
          paragraphs: [
            `SOLAS gereği drill'ler (abandon ship ve fire haftalık/aylık, enclosed space yıllık vb.) zamanında yapılır ve detaylı kaydedilir; senaryo, katılımcılar, süre, tespit edilen eksikler ve düzeltmeler yazılır. "Yapıldı" yazmak yetmez; denetçi kalite ve gerçekliği sorgular. Yeni gelen personelin familiarization kaydı da hazır olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Denetim Günü Yönetimi",
      sections: [
        {
          subheading: "7.1 Denetçiye eşlik ve iletişim",
          paragraphs: [
            `Denetim günü Birinci Zabit, denetçiye güverte alanlarında eşlik eder; profesyonel, açık ve savunmacı olmayan bir tavır sergiler. Sorulara dürüst yanıt verilir; bilinmeyen bir konuda "kontrol edip döneceğim" demek, yanlış bilgi vermekten iyidir. Tartışma değil, iş birliği yaklaşımı bulgu sayısını azaltır.`,
            `Bulgu açılırsa, denetçinin gerekçesi anlaşılır ve mümkünse anında düzeltilir (on-the-spot correction). Düzeltilemeyen bulgular için zaman çizelgeli aksiyon planı sunulur.`,
          ],
        },
        {
          subheading: "7.2 Denetim sonrası takip",
          paragraphs: [
            `Denetim raporundaki tüm bulgular kayıt altına alınır, düzeltici aksiyon planlanır ve kapatma kanıtı şirkete/denetçiye sunulur. Birinci Zabit, kapanmamış bulguların bir sonraki denetimde tekrar açılmaması için takibi titizlikle yapar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in denetim hazırlık checklist'i",
          bullets: [
            `Tüm güverte sertifikaları geçerli ve erişilebilir mi?`,
            `LSA/FFE envanter, servis tarihleri ve kayıtlar tam mı?`,
            `PMS iş emirleri güncel, gecikmiş bakım var mı?`,
            `Drill ve familiarization kayıtları kaliteli ve tarihli mi?`,
            `Risk assessment ve PTW dosyaları arşivde hazır mı?`,
            `ORB/GRB/sewage çevre kayıtları tutarlı mı?`,
            `Geçmiş bulgular kapatıldı ve kanıtlandı mı?`,
            `Mürettebat temel emniyet görevlerini biliyor mu (knowledge test)?`,
            `Hold/güverte/hatch cover fiziki durumu denetime hazır mı?`,
          ],
          paragraphs: [
            `Denetim hazırlığı, son dakika telaşıyla değil, her gün sürdürülen disiplinle başarılır. Birinci Zabit'in başarısı; gerçek zamanlı dürüst kayıt, bakımlı ekipman ve görevini bilen bir ekip ile gemiyi her an "audit-ready" tutmaktan gelir. Temiz bir denetim geçmişi, geminin ticari değerini ve şirketin itibarını doğrudan korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
