import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate operatör istasyonu, DP Chair ve MFW ile DP vardiyası",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 29,
  estimatedPages: 18,
  intro: `DP vardiyasının kalitesi, DPO'nun oturduğu yerden ne gördüğü ve neye ne kadar hızlı ulaşabildiğiyle doğrudan ilgilidir. Bridge Mate ailesi bu noktada üç farklı fiziksel çözüm sunar: klasik konsol, kompakt operatör istasyonu ve kol dayamasına gömülü ekranıyla DP Chair. Bu bölüm, istasyon tipinin vardiya düzenine, kontrol devrine ve gözcülüğe etkisini ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Chair Brochure (MT-SAL-0096 v1.0)",
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate IBS Brochure (MT-SAL-0001 v1.0)",
    "IMCA M117 (Training & Experience of DP Personnel)",
    "STCW Bölüm A-VIII/2",
  ],
  chapters: [
    {
      heading: "1. İstasyon Tipleri",
      sections: [
        {
          subheading: "1.1 Üç fiziksel çözüm",
          table: {
            headers: ["Tip", "Tanım", "Tipik kullanım"],
            rows: [
              ["Konsol versiyonu", "Geleneksel stand-alone DP konsolu", "Geniş köprüüstü, çok istasyonlu"],
              ["Compact operator station", "Kompakt gövdeli istasyon", "Dar alan, JX/DP 0 kurulumları"],
              ["DP Chair", "Kol dayamasında 15\" dokunmatik ekran", "Dar köprüüstü, kompakt ve düşük maliyetli çözüm"],
            ],
          },
        },
        {
          subheading: "1.2 DP Chair konsepti",
          paragraphs: [
            `Bridge Mate DP konsepti, yedeklilik ve ayrışma felsefelerini vurgulayan dağıtık mimariyi kullanarak ve kablo tesisatını en aza indirerek gemi operatörünün koltuğuna entegre edilebilir. DP Chair, koltuğun kol dayamasına yerleştirilmiş 15 inçlik dokunmatik monitör ile tam gemi kontrolünü operatörün parmaklarının ucuna getirir.`,
            `Manuel, joystick ve DP operasyonlarının tümü tek noktada toplanır. DP Chair, DP 1 ve DP 2 operatör istasyonları ile mevcuttur ve köprüüstündeki geleneksel stand-alone DP konsollarının yerini alabilir veya onları tamamlayabilir. Ayrıca özel bir DP operatör istasyonu ve köprüüstü uygulamaları için Multi-Function Workstation içeren koltuk konfigürasyonları da mevcuttur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `15 inç kol dayaması ekranı, DP 1/DP 2 operatör istasyonu seçeneği ve konsolu tamamlama/yerine geçme özelliği MT Bridge Mate DP Chair broşüründe (MT-SAL-0096 v1.0) belirtilmiştir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Vardiya Düzeni ve Kontrol Devri",
      lead: `Çok istasyonlu kurulumlarda en sık yaşanan sorun teknik değil organizasyoneldir: kimin komutta olduğunun belirsiz kalması.`,
      sections: [
        {
          subheading: "2.1 Komuttaki istasyon",
          paragraphs: [
            `DP 2 kurulumunda tipik olarak iki, DP 3'te en az üç operatör istasyonu bulunur. Her vardiya başında hangi istasyonun komutta olduğu ve kontrol devrinin nasıl yapıldığı açıkça teyit edilmelidir. Devir sırasında sözlü teyit ve log kaydı, sonradan yapılacak olay incelemesinde belirleyici olur.`,
          ],
          bullets: [
            `Komuttaki istasyon vardiya başında sesli teyit edilir`,
            `Kontrol devri iki kişi tarafından gözetlenir`,
            `Devir saati ve istasyon DP loguna işlenir`,
            `Kritik safhada (dalgıç suda, yük askıda) devir yapılmaz`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çelişkili komut",
              text: `Kontrol devri belirsiz kalırsa iki istasyondan çelişkili komut verilebilir. Bu, sistem arızası olmadan da mevki kaybına yol açabilen tipik bir insan faktörü senaryosudur.`,
            },
          ],
        },
        {
          subheading: "2.2 Devir teslim içeriği",
          paragraphs: [
            `DP vardiya devir teslimi, gemi ve sistem durumunun yanı sıra görev ve çevre durumunu da kapsar. Bridge Mate özelinde ek olarak istasyon konfigürasyonu ve aktif profil de aktarılır.`,
          ],
          bullets: [
            `Komuttaki istasyon ve aktif kontrol modu`,
            `Online kontrol bilgisayarı ve ağ kolu durumu`,
            `Seçili PRS seti ve son karşılaştırma sonuçları`,
            `Açık alarmlar, bastırılmış alarmlar ve bypass'lar`,
            `Aktif Captain mode profili ve ekran düzeni`,
            `Görev safhası, ASOG durumu ve çevresel eğilim`,
          ],
        },
      ],
    },
    {
      heading: "3. Ergonomi, Gözcülük ve Riskler",
      sections: [
        {
          subheading: "3.1 Yakınlık gözcülüğün yerini almaz",
          callouts: [
            {
              type: "warning",
              title: "Ekran içine gömülme",
              text: `Kompakt veya koltuk tipi istasyonda ekran ve joystick'e fiziksel yakınlık konforu artırır; ancak dışarı gözcülüğün yerini almaz. DP sistemi çatışmayı önleyen bir seyir sistemi değildir; COLREG ve köprüüstü gözcülüğü kesintisiz devam eder.`,
            },
          ],
        },
        {
          subheading: "3.2 Dokunmatik arayüz riski",
          paragraphs: [
            `Dokunmatik ekran, fiziksel butona kıyasla yanlış dokunma riski taşır — özellikle gemi hareketliyken. Bu nedenle kritik mod değişikliklerinin onay adımıyla yapılması ve operatörün komutu uygulamadan önce hedef değeri okuması genel DP uygulamasının parçasıdır.`,
          ],
          bullets: [
            `Kritik komutlarda onay adımını atlama`,
            `Hedef mevki/baş değerini uygulamadan önce oku`,
            `Deniz hareketliyken ekran girişini iki elle destekle`,
          ],
        },
        {
          subheading: "3.3 Multi-Function Workstation ile birlikte kullanım",
          paragraphs: [
            `Multi-Function Workstation'da DP dışındaki uygulamalar açıkken de DP gözetiminin kesintisiz sürdüğünden emin olunmalıdır. Ekran parlaklığı merkezi dimming ile gece görüşünü bozmayacak seviyeye ayarlanır; alarm sesi kısılmaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ekran düzeni disiplini",
              text: `DP gözetim ekranının her zaman görünür kalacağı sabit bir düzen belirleyin ve bu düzeni vardiya boyunca koruyun. Geçici olarak açılan bir uygulama, kapatıldığında eski düzenin geri geldiği kontrol edilmelidir.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
