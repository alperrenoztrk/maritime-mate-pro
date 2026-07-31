import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate DP retrofit, midlife upgrade ve sınıf yükseltme",
  shipType: "offshore",
  dept: "makine",
  opIndex: 16,
  estimatedPages: 20,
  intro: `Bridge Mate mimarisinin dağıtık yapısı, sistemi retrofit ve modernizasyona elverişli kılar; aynı donanım modülleri farklı sınıflarda kullanıldığı için yükseltme çoğu zaman yeni tip donanım değil, aynı tip donanımdan daha fazlası anlamına gelir. Ancak bu teknik kolaylık, sertifikasyon ve yedeklilik zincirinin kendiliğinden korunacağı anlamına gelmez. Bu bölüm, yükseltme projesinin makine ve sınıf boyutunu ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate JX / DP 0 Brochure (MT-SAL-0005 v2.0)",
    "marine-technologies.com — refit ve midlife upgrade bilgileri",
    "IMCA M103",
    "IMCA M166",
  ],
  chapters: [
    {
      heading: "1. Retrofit ve Midlife Upgrade",
      sections: [
        {
          subheading: "1.1 Neden kolay",
          paragraphs: [
            `Arayüz ünitesinin tasarımı, Bridge Mate sistemini tüm ekipman sınıflarında retrofit ve modernizasyon için uygun kılar. Kompakt tasarım ve dağıtık mimari, mevcut gemilerde kablolama işini sınırlı tutar.`,
            `Mevcut gemilerde MT, DP, köprüüstü entegrasyonu ve itici kontrol sistemlerini retrofit eder. Midlife upgrade tipik olarak kontrol bilgisayarlarının, operatör istasyonlarının, ağ switch'lerinin ve yazılımın değiştirilmesini içerirken mevcut IO kabinleri ve kablolama altyapısı korunur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `Midlife upgrade kapsamı — kontrol bilgisayarı, operatör istasyonu, ağ switch'i ve yazılım değişirken IO kabinleri ve kablolamanın korunması — marine-technologies.com proje bilgilerinde belirtilmiştir.`,
            },
          ],
        },
        {
          subheading: "1.2 Kapsam belirleme",
          table: {
            headers: ["Bileşen", "Midlife upgrade'de", "Doğrulama"],
            rows: [
              ["Kontrol bilgisayarları", "Değişir", "Yeni FMEA testi"],
              ["Operatör istasyonları", "Değişir", "HMI eğitimi + kabul testi"],
              ["Ağ switch'leri", "Değişir", "Topoloji ve kol ayrımı"],
              ["Yazılım", "Değişir", "Sürüm kaydı + trials"],
              ["IO kabinleri", "Korunur", "Durum ve kapasite kontrolü"],
              ["Kablolama", "Korunur", "İzolasyon ve sonlandırma testi"],
            ],
          },
        },
        {
          subheading: "1.3 Korunan altyapının riski",
          callouts: [
            {
              type: "warning",
              title: "Eski kablo, yeni sistem",
              text: `Korunan eski kablolamanın izolasyon direnci ve sonlandırma durumu ayrıca doğrulanmalıdır. Yeni ve hızlı bir kontrol katmanı, yaşlanmış bir kablo altyapısı üzerinde aralıklı (intermittent) arızalar üretebilir; bunlar teşhisi en zor arıza tipidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Sınıf Yükseltme",
      lead: `Yükseltme, aynı donanım ailesinden ünite eklenerek yapılır; ancak her sınıf kendi yapısal koşullarını da getirir.`,
      sections: [
        {
          subheading: "2.1 Yükseltme yolu",
          paragraphs: [
            `Bridge Mate JX sistemi DP 0'a kolayca yükseltilebilir; çünkü itici ve sensör kablolaması ile arayüzü her iki sistemde aynıdır. Benzer biçimde bir DP 0 sistemi, artan yedeklilik için aynı donanım bileşenlerinden daha fazlası eklenerek üst sınıfa yükseltilebilir. DP 1'den DP 2'ye yükseltme de kolay bir süreçtir; her iki sistem tipinde aynı donanım modülleri kullanılır, yalnızca ünite sayısı farklıdır.`,
          ],
          bullets: [
            `JX → DP 0: kablolama ve arayüz aynı kalır`,
            `DP 0 → üst sınıf: aynı bileşenlerden ekleme`,
            `DP 1 → DP 2: üç kontrol bilgisayarı, ilave operatör istasyonu, ekipman başına ayrı IO, yedekli çift ağ`,
          ],
        },
        {
          subheading: "2.2 DP 3'ün yapısal koşulu",
          paragraphs: [
            `DP 3 hedefleniyorsa iş yalnızca elektrik ve otomasyon işi değildir. Class 3 gereklerini karşılamak üzere bir kontrol bilgisayarının, bir operatör istasyonunun ve bir sensör IO ünitesinin yerleştirileceği, fiziksel olarak ayrı ve yangına dayanıklı bir kompartıman gerekir. Üçüncü operatör istasyonu ve üçüncü IO seti için yerleşim değişikliği erken projelendirilmelidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yapısal iş erken planlanır",
              text: `Ayrı kompartıman, kablo güzergâhı ayrımı ve yangın bütünlüğü gemi yapısını ilgilendirir. Bu kalemler proje takviminin en uzun süreli işleridir; elektrik montajıyla aynı anda başlatılamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Sertifikasyon ve Ara Dönem Yönetimi",
      sections: [
        {
          subheading: "3.1 FMEA ve trials zinciri",
          paragraphs: [
            `Yükseltme sonrası FMEA revizyonu, proving trials ve class survey zinciri iş bitmeden planlanmalıdır. Donanım ve yazılım değişiklikleri eski FMEA'nın failure mode varsayımlarını geçersiz kılabilir; bu nedenle revizyon bir formalite değil teknik bir yeniden değerlendirmedir.`,
          ],
          bullets: [
            `FMEA revizyonu kapsamı ve sorumlusu belirlendi mi?`,
            `Proving trials programı sınıfla mutabık mı?`,
            `Test için gerekli saha/hava penceresi planlandı mı?`,
            `Kabul kriterleri yazılı mı?`,
            `Yazılım sürüm kaydı tutuluyor mu?`,
          ],
        },
        {
          subheading: "3.2 Ara dönemde gemi hangi sınıfta?",
          callouts: [
            {
              type: "warning",
              title: "Yükseltme sırasında sınıf düşer",
              text: `Yükseltme sırasında gemi beyan edilen DP sınıfında olmayabilir. Bu dönemde görev kabulü kısıtlanmalı, geçerli kısıtlar ASOG'a işlenmeli ve müşteriye yazılı olarak bildirilmelidir.`,
            },
          ],
          bullets: [
            `Ara dönemde geçerli fiili DP sınıfı belirlendi mi?`,
            `Kısıtlar ASOG'a işlendi mi?`,
            `Müşteri ve saha otoritesi bilgilendirildi mi?`,
            `Kabul edilebilir görev listesi daraltıldı mı?`,
          ],
        },
        {
          subheading: "3.3 Devreye alma sonrası",
          paragraphs: [
            `Yeni sistemin devreye alınması, ekibin onu tanıması anlamına gelmez. Operatör istasyonu ve HMI değiştiyse DPO'lar için tanıma eğitimi ve familiarization kaydı gereklidir; makine tarafında da yeni arıza teşhis akışlarının öğrenilmesi gerekir.`,
          ],
          bullets: [
            `DPO familiarization kaydı tamamlandı mı?`,
            `Makine ekibi yeni teşhis akışını biliyor mu?`,
            `Yedek parça listesi yeni donanıma göre güncellendi mi?`,
            `Uzaktan erişim/servis kanalı test edildi mi?`,
            `Return-to-service testi ve bağımsız doğrulama yapıldı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
