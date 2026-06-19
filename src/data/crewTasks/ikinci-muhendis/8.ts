import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Soğutma suyu analizi ve kimyasal dozajlama",
  roleSlug: "ikinci-muhendis",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Ana makine ve jeneratörlerin jacket cooling water (tatlı su soğutma) sistemi, motorun ısısını taşıyan ve liner/silindir korozyonunu önleyen kritik bir döngüdür. İkinci Mühendis, bu suyun kalitesini düzenli analiz etmekten ve kimyasal dozajlamadan sorumludur; nitrit, pH, klorür ve toplam sertlik kriter aralıklarında tutulmazsa corrosion inhibitor etkinliği düşer ve liner/cylinder cover'da korozyon başlar. Bu bölüm soğutma suyu analizi ve dozajlamayı ele alır.`,
  sources: [
    "Üretici (motor) soğutma suyu kalite spesifikasyonları",
    "Kimyasal tedarikçi (corrosion inhibitor/DCA) kılavuzları",
    "Soğutma suyu test kiti prosedürleri",
    "Shore-side laboratuvar analiz raporları",
    "PMS — su analizi takvimi",
  ],
  chapters: [
    {
      heading: "1. Soğutma Suyu Neden Şartlandırılır?",
      sections: [
        {
          subheading: "1.1 Korozyon ve birikim önleme",
          paragraphs: [
            `Şartlandırılmamış soğutma suyu, motor iç yüzeylerinde (liner, cylinder cover, soğutma kanalları) korozyon, kavitasyon hasarı ve mineral birikim (scale) yaratır. Corrosion inhibitor (DCA — nitrit bazlı vb.) bu hasarı önler. İkinci Mühendis, suyu doğru aralıkta tutarak motorun iç bütünlüğünü korur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Korozyon sessizdir",
              text: `Soğutma suyu kalitesi bozulduğunda hasar dışarıdan görünmez; liner ve cover içeriden korozyona uğrar ve sonunda kaçak/hasarla ortaya çıkar. Düzenli analiz, bu görünmez hasarı önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İzlenen Parametreler",
      sections: [
        {
          subheading: "2.1 Nitrit, pH, klorür, sertlik",
          paragraphs: [
            `İkinci Mühendis; nitrit (inhibitor seviyesi), pH (asitlik/alkalinite), klorür (deniz suyu kaçağı göstergesi) ve toplam sertliği test eder. Düşük nitrit korozyon koruması yetersiz demektir; yüksek klorür soğutucudan deniz suyu kaçağına işaret eder. Her parametre kriter aralığında tutulur.`,
          ],
          table: {
            caption: "Soğutma suyu parametreleri (kavramsal)",
            headers: ["Parametre", "Anlam", "Sapma riski"],
            rows: [
              ["Nitrit", "Inhibitor seviyesi", "Düşük → korozyon"],
              ["pH", "Asit/alkali denge", "Düşük → korozyon"],
              ["Klorür", "Deniz suyu kaçağı", "Yüksek → kaçak"],
              ["Sertlik", "Mineral içerik", "Yüksek → scale"],
            ],
          },
        },
        {
          subheading: "2.2 Klorür artışı = kaçak alarmı",
          paragraphs: [
            `Klorür değerinde ani artış, cooler'da bir deniz suyu kaçağına işaret eder ve araştırılır. Deniz suyu kaçağı hem korozyonu hızlandırır hem soğutma verimini düşürür; erken tespit büyük hasarı önler.`,
          ],
        },
      ],
    },
    {
      heading: "3. Test ve Dozajlama",
      sections: [
        {
          subheading: "3.1 Periyodik test",
          paragraphs: [
            `İkinci Mühendis, gemi test kiti ile düzenli (genelde haftalık) testler yapar ve sonuçları log'a kaydeder. Nitrit/inhibitor düşükse hesaplanan miktarda DCA/corrosion inhibitor ilave edilir. Aşırı dozaj da israf ve yan etki yaratabileceğinden doğru miktar önemlidir.`,
          ],
          bullets: [
            `Periyodik test (test kiti)`,
            `Sonuçları log'a kayıt`,
            `Hesaplanan inhibitor dozajı`,
            `Trend izleme (sapmayı erken yakala)`,
          ],
        },
        {
          subheading: "3.2 Shore-side laboratuvar",
          paragraphs: [
            `Gemi test kiti temel parametreleri verir; kapsamlı analiz için periyodik olarak shore-side laboratuvara numune gönderilir. Lab raporu, gemi testlerini doğrular ve daha ince sorunları (örn. mikrobiyolojik) ortaya çıkarır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kayıt ve Trend",
      sections: [
        {
          subheading: "4.1 Trend takibi",
          paragraphs: [
            `Sonuçların trendi, ani bir sapmadan (kaçak, dozaj hatası) daha çok bilgi verir. İkinci Mühendis, parametrelerin zaman içindeki seyrini izleyerek sorunları erken yakalar. Düzenli kayıt, hem bakım kararına hem denetime temel oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "5. Sistemle İlişki",
      sections: [
        {
          subheading: "5.1 Expansion tank ve makyaj suyu",
          paragraphs: [
            `Soğutma sistemine eklenen makyaj suyu (make-up) düşük klorürlü (genelde distile/evaporatör suyu) olmalı; aksi halde her ekleme klorür/sertlik yükler. İkinci Mühendis, make-up su kaynağını ve expansion tank seviyesini izler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Soğutma suyu kontrolü",
          bullets: [
            `Nitrit/pH/klorür/sertlik düzenli test ediliyor mu?`,
            `Sonuçlar log'a kaydedilip trend izleniyor mu?`,
            `Nitrit/inhibitor düşükse doğru dozaj yapıldı mı?`,
            `Klorür artışı (kaçak) araştırılıyor mu?`,
            `Make-up su düşük klorürlü mü?`,
            `Periyodik shore-side numune gönderiliyor mu?`,
          ],
          paragraphs: [
            `Soğutma suyu analizi ve dozajlama, İkinci Mühendisin motorun iç sağlığını "görünmeden" koruduğu bir disiplindir. Doğru su kimyası, erken kaçak tespiti ve trend takibi; liner/cover korozyonunu önleyerek ana makinenin ve jeneratörlerin uzun ömrünü güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
