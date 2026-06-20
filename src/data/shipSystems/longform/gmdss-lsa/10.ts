import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Rescue Boat ve Fast Rescue Boat (FRB)",
  sectionId: "gmdss-lsa",
  topicIndex: 10,
  estimatedPages: 22,
  intro: `Kurtarma botu (rescue boat), denize düşen kişiyi (man overboard) kurtarmak ve can sallarını toplayıp yönlendirmek için hızlı denize indirilip geri alınabilen özel bir can kurtarma aracıdır; Fast Rescue Boat (FRB) ise yüksek hızlı, manevra kabiliyeti yüksek versiyonudur ve özellikle ro-ro yolcu gemilerinde zorunludur. Bu bölüm; rescue boat ile lifeboat farkını, FRB tasarımı ve tahrikini (outboard/water-jet), hızlı indirme/geri alma davitini ve kötü havada operasyonu, MOB müdahale prosedürünü, ekip eğitimi gereksinimini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. III — rescue boats & fast rescue boats",
    "LSA Code — rescue boat requirements",
    "IMO Res. — FRB on ro-ro passenger ships",
    "Üretici el kitapları (FRB/davit)",
  ],
  chapters: [
    {
      heading: "1. Rescue Boat vs Lifeboat",
      sections: [
        {
          subheading: "1.1 Farklı amaç",
          paragraphs: [
            `Lifeboat gemiyi terk etmek (çok kişiyi uzaklaştırmak) içindir; rescue boat ise aktif kurtarma — denize düşen kişiye yetişme ve salları toplama — içindir. Bu yüzden rescue boat hızlı, manevra kabiliyeti yüksek ve kolay/çabuk indirilebilir olmalıdır. Bazı gemilerde bir lifeboat aynı zamanda rescue boat olarak onaylıdır.`,
          ],
          bullets: [
            `Lifeboat: terk + uzaklaşma (kapasite)`,
            `Rescue boat: hız + manevra (kurtarma)`,
            `FRB: yüksek hız, ro-ro yolcuda zorunlu`,
          ],
        },
      ],
    },
    {
      heading: "2. FRB Tasarımı ve İndirme",
      sections: [
        {
          subheading: "2.1 Tahrik ve hız",
          paragraphs: [
            `FRB genelde sertgövde-şişme (RIB) yapıdadır; outboard motor veya su jeti (water-jet) ile tahrik edilir. Su jeti sığ su ve insan kurtarmada pervane yaralanma riskini azaltır. FRB yüksek hız (kötü havada manevra) ve kendini düzeltme (self-righting) yeteneğine sahip olmalıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Su jeti güvenliği",
              text: `Su jeti, denizdeki kişinin yakınında pervane kesiği riskini ortadan kaldırır; FRB'lerde sıkça tercih edilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Hızlı indirme/geri alma",
          paragraphs: [
            `FRB davit'i, botu kötü havada bile hızlı indirip — kritik olarak — gemi seyrederken/dalgada hızla geri alabilmelidir. Constant tension/şok yutan winch sistemi, geri almada bot ile gemi arasındaki ani yük farkını sönümler. Geri alma, MOB müdahalesinin en zor ve tehlikeli kısmıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geri alma riski",
              text: `FRB'yi dalgalı denizde geri alırken ani gerilme/şok yük ekibi ve botu tehlikeye atar; constant-tension davit ve eğitimli ekip şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. MOB Müdahale ve Ekip",
      sections: [
        {
          subheading: "3.1 Man overboard prosedürü",
          paragraphs: [
            `MOB durumunda: alarm + can simidi/duman atma, manevra (Williamson/Anderson turn) ile dönüş, gözcü ataması, rescue boat hazırlığı ve indirme, kişiyi alma ve gemiye geri dönme adımları uygulanır. Su sıcaklığı düşükse hipotermi nedeniyle zaman kritiktir; hızlı müdahale hayat kurtarır.`,
          ],
          bullets: [
            `Alarm + işaret (can simidi/duman)`,
            `Dönüş manevrası + gözcü`,
            `Rescue boat indir → kişiyi al → geri dön`,
          ],
        },
        {
          subheading: "3.2 Ekip eğitimi",
          paragraphs: [
            `Rescue boat/FRB ekibi düzenli eğitim ve tatbikat yapar; SOLAS, FRB için özel eğitimli ekip ve periyodik denize indirme/manevra tatbikatı ister. Soğuk su koruyucu giysi (immersion/exposure suit) ekipte bulunur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "FRB tatbikatı",
              text: `FRB ekibi, mümkün olduğunca her ay denize indirme ve manevra tatbikatı yapar; bu, kötü havada gerçek müdahale için yeterliliği korur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; motor/su jeti çalıştırma testi, yakıt ve batarya, şişme tüp basıncı/hasar (RIB), davit winch ve constant-tension sistemi, release ve donanım kontrolünü kapsar. Bot daima hazır ve hızlı indirilebilir durumda tutulur.`,
          ],
          bullets: [
            `Motor/su jeti haftalık çalıştırma`,
            `RIB tüp basıncı ve hasar kontrolü`,
            `Davit constant-tension fonksiyon testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Motor çalışmıyor", "Yakıt/batarya/buji", "Yakıt-batarya kontrol, servis"],
              ["RIB tüpü sönük", "Sızıntı/valf", "Tüp tamir/şişirme"],
              ["Davit yavaş/geri almıyor", "Winch/constant-tension", "Winch ve sistem bakımı"],
              ["Release/halat sorunu", "Mekanizma/aşınma", "Release ve halat kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
