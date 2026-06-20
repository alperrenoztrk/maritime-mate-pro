import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Hatch Cover (Ambar Kapağı) Sistemi",
  sectionId: "cargo-systems",
  topicIndex: 3,
  estimatedPages: 23,
  intro: `Kuru yük (dökme/genel kargo/konteyner) gemilerinde ambar kapağı sistemi, yükü deniz suyundan koruyan ve geminin su geçirmezliğini sağlayan kargo-kritik donanımdır. Kapak sızdırmazlığı, ıslanan yükten kaynaklı stabilite kaybı ve kargo hasarını önler. Bu bölüm; kapak tiplerini (side-rolling, folding, pontoon) ve kargo elleçleme ile ilişkisini, sızdırmazlık (compression bar/conta) ve cleat sistemini, su geçirmezlik testlerini (hortum/ultrasonik), konteyner gemilerinde kapak üstü istifleme ve lashing'i, drenaj ve coaming bütünlüğünü ve bakım/arızayı kargo perspektifinden ele alır.`,
  sources: [
    "ICLL 1966 — weathertight integrity",
    "SOLAS Ch. VI & XII — bulk carrier safety",
    "IACS UR S21/S21A — hatch cover loads",
    "P&I Club cargo hold/hatch survey guides",
  ],
  chapters: [
    {
      heading: "1. Kapak Tipleri ve Kargo İlişkisi",
      sections: [
        {
          subheading: "1.1 Tipler ve elleçleme",
          paragraphs: [
            `Dökme yük gemilerinde side-rolling (yana kayan) kapak geniş ambar ağzı sağlar ve grab/elleçleme için tam açıklık verir. Konteyner gemilerinde pontoon (lift-away) kapaklar vinçle kaldırılır ve üzerine konteyner istiflenir. Genel kargoda folding kapak yaygındır.`,
          ],
          bullets: [
            `Side-rolling: dökme yük, geniş açıklık`,
            `Pontoon/lift-away: konteyner, üstü istiflenir`,
            `Folding: genel kargo, hızlı açma`,
          ],
        },
      ],
    },
    {
      heading: "2. Sızdırmazlık ve Cleat",
      sections: [
        {
          subheading: "2.1 Compression bar ve conta",
          paragraphs: [
            `Su geçirmezlik, coaming üzerindeki compression bar'ın kapak çevresindeki conta lastiğine sürekli ve düzgün batmasıyla (set-down) sağlanır. Cleat/quick-acting mandallar paneli coaming'e bastırır. Set-down izi kesintisiz olmalı; ezik/yağlı conta sızdırır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Chalk/UV test izi",
              text: `Compression bar'a tebeşir sürülüp kapatılırsa, contadaki sürekli iz set-down kalitesini gösterir; kesik iz sızıntı noktasını işaret eder.`,
            },
          ],
        },
        {
          subheading: "2.2 Drenaj ve non-return",
          paragraphs: [
            `Conta kanalında biriken su, drenaj kanalı ve non-return (çek) valf üzerinden dışarı atılır. Non-return tıkalı veya ters takılıysa su ambara girer. Coaming bütünlüğü ve korozyon kontrolü sızdırmazlığın temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Konteyner İstifleme ve Test",
      sections: [
        {
          subheading: "3.1 Kapak üstü konteyner ve lashing",
          paragraphs: [
            `Konteyner gemilerinde pontoon kapakları üzerinde konteyner istiflenir; kapak, konteyner ayak yükünü (stack load) taşıyacak mukavemette olmalıdır. Twistlock ve lashing donanımı konteynerleri kapağa ve birbirine sabitler; kapak fitting'leri hasarsız olmalıdır.`,
          ],
        },
        {
          subheading: "3.2 Su geçirmezlik testi",
          paragraphs: [
            `Hortum testi (kapalı kapağa basınçlı su) klasik yöntemdir; yük varken ultrasonik test (içeride verici, dışarıda alıcı tarama) tercih edilir. Test, conta hattı boyunca sızıntı noktalarını bulur.`,
          ],
          table: {
            headers: ["Test", "Avantaj", "Sınır"],
            rows: [
              ["Hortum", "Basit, doğrudan", "Yük varken zor"],
              ["Ultrasonik", "Yük varken, noktasal", "Cihaz/eğitim"],
              ["Chalk", "Set-down gösterir", "Sızdırmazlık kanıtı değil"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; conta esneklik/değişim, compression bar düzgünlük, drenaj non-return temizliği, cleat ayarı, tekerlek/ray ve hidrolik kontrolünü kapsar. Conta kalıcı ezilirse değiştirilir.`,
          ],
          bullets: [
            `Conta set-down izi sürekli olmalı`,
            `Drenaj non-return valf temiz/açık`,
            `Coaming korozyon ve deformasyon`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Ambara su girişi", "Conta ezik, drenaj tıkalı", "Conta + drenaj bakımı"],
              ["Kapak sıkışıyor", "Ray/tekerlek/hidrolik", "Ray temizliği, hidrolik kontrol"],
              ["Cleat sıkmıyor", "Aşınma/ayar", "Cleat ayarı/değişimi"],
              ["Düzensiz set-down", "Coaming deformasyonu", "Coaming düzeltme"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
