import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Scavenge ve under-piston bölge inspection",
  roleSlug: "ikinci-muhendis",
  taskIndex: 10,
  estimatedPages: 23,
  intro: `Büyük iki zamanlı ana makinelerin scavenge (süpürme havası) ve piston-altı bölgesi, motorun iç sağlığının doğrudan gözlemlenebildiği kritik bir alandır. İkinci Mühendis, belirli çalışma saatlerinde (genelde 500–1000 saatte bir) scavenge inspection programlar; piston crown karbon birikimi, ring durumu, liner aşınması ve cover alt yüzeyini gözlemler. Scavenge fire (süpürme bölgesi yangını) belirtisi ciddiye alınır ve hızlı müdahale gerektirir. Bu bölüm scavenge ve under-piston inspection'ı ele alır.`,
  sources: [
    "Üretici (MAN B&W / WinGD) scavenge inspection prosedürleri",
    "Scavenge fire önleme ve müdahale kılavuzları",
    "Cylinder condition monitoring",
    "PMS — scavenge inspection takvimi",
    "LOTO / enclosed space güvenlik prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Scavenge Inspection Neden Yapılır?",
      sections: [
        {
          subheading: "1.1 İçeriden teşhis",
          paragraphs: [
            `Scavenge port'tan yapılan inspection, motoru sökmeden iç durumu görmenin en pratik yoludur. Piston, ring ve liner durumu, deposit birikimi ve olası scavenge fire izleri burada gözlemlenir. İkinci Mühendis, bu düzenli kontrolle büyük arızaları erken yakalar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sökmeden gör",
              text: `Scavenge inspection, pahalı bir overhaul'a gerek kalmadan motorun iç sağlığını gösterir. Düzenli yapıldığında, küçük sorunlar büyümeden tespit edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İnceleme Noktaları",
      sections: [
        {
          subheading: "2.1 Piston, ring, liner, cover",
          paragraphs: [
            `İkinci Mühendis; piston crown karbon birikimini, ring durumunu (kırık, yapışma/collapse, serbest hareket), liner aşınması/scuffing'i ve cylinder cover alt yüzeyini gözlemler. Ring yapışması (sticking) hem performansı düşürür hem blow-by ile scavenge fire riskini artırır.`,
          ],
          table: {
            caption: "Scavenge inspection bulguları",
            headers: ["Gözlem", "Anlamı"],
            rows: [
              ["Aşırı karbon deposit", "Yanma/yağlama dengesizliği"],
              ["Ring yapışması/kırık", "Blow-by, scavenge fire riski"],
              ["Liner scuffing/glazing", "Aşınma/yağ filmi sorunu"],
              ["Yağ birikimi (scavenge box)", "Scavenge fire yakıtı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Scavenge Fire",
      sections: [
        {
          subheading: "3.1 Belirti ve müdahale",
          paragraphs: [
            `Scavenge box'ta biriken yağ/karbon, blow-by sıcak gazıyla tutuşabilir (scavenge fire). Belirtileri: ilgili ünitede scavenge sıcaklık artışı, sıcaklık alarmı, güç düşüşü ve bazen kabuk üzerinde lokal ısınma. Tespit halinde derhal yük azaltılır, ilgili silindir yağlaması ayarlanır, scavenge port kapatılır ve söndürme (fixed sistem/CO2) uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scavenge fire ciddiye alınır",
              text: `Scavenge sıcaklık artışı/alarmı asla göz ardı edilmez. Hızlı yük azaltma, hava girişini kısma ve söndürme; yangının yayılmasını ve büyük hasarı önler. Önleme ise düzenli scavenge box temizliğidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Önleme",
          paragraphs: [
            `Scavenge fire'ı önlemenin yolu; scavenge box'ı yağ/karbon birikiminden temiz tutmak, ring durumunu izlemek (blow-by'ı azaltmak) ve cylinder lubrication'ı doğru ayarlamaktır. Drain'lerin açık tutulması, biriken yağın boşalmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Güvenlik",
      sections: [
        {
          subheading: "4.1 LOTO ve sıcak yüzey",
          paragraphs: [
            `Scavenge inspection, motor durdurulmuş, soğutulmuş ve LOTO ile izole edilmiş halde yapılır; turning gear devrede ve kilitli olmalıdır. Sıcak yüzey ve dar alan riskine karşı uygun KKD ve dikkat gerekir. İzolasyon doğrulanmadan açma yapılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt ve Takip",
      sections: [
        {
          subheading: "5.1 Bulgu kaydı",
          paragraphs: [
            `Her inspection'ın bulguları (foto dahil) kaydedilir ve trend izlenir. Tekrarlayan bir bulgu (örn. belirli ünitede artan deposit), kök neden araştırmasını tetikler. İkinci Mühendis, bu kayıtlarla bakım kararlarını yönlendirir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Scavenge inspection kontrolü",
          bullets: [
            `Inspection PMS takvimine göre (çalışma saati) yapıldı mı?`,
            `Piston crown/ring/liner/cover durumu gözlemlendi mi?`,
            `Scavenge box yağ/karbon birikimi temizlendi, drain açık mı?`,
            `Scavenge fire belirtisi (sıcaklık/alarm) izleniyor mu?`,
            `Inspection LOTO/turning gear kilitli ve soğutulmuş halde mi yapıldı?`,
            `Bulgular kayıt altına alınıp trend izleniyor mu?`,
          ],
          paragraphs: [
            `Scavenge ve under-piston inspection, İkinci Mühendisin ana makinenin iç sağlığını sökmeden gözlemlediği değerli bir teşhis aracıdır. Düzenli inceleme, scavenge box temizliği ve scavenge fire belirtilerine hızlı müdahale; ana makineyi hem yangından hem büyük aşınma hasarından korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
