import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP vardiyası ve devir teslimi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 10,
  estimatedPages: 18,
  intro: `DP vardiya değişimi, geminin mevkisini, sistem durumunu, görevi ve çevreyi eksiksiz aktarmayı gerektirir. Eksik devir, devralan DPO'nun kritik bir bypass'ı veya yaklaşan hava değişimini bilmeden operasyonu sürdürmesine yol açar. Bu bölüm handover içeriğini ve kritik safha kuralını ele alır.`,
  sources: [
    "IMCA M117 (DP Personnel Training)",
    "IMCA M103",
    "Vessel watchkeeping procedure",
  ],
  chapters: [
    {
      heading: "1. Devir İçeriği",
      sections: [
        {
          subheading: "1.1 Gemi ve sistem durumu",
          bullets: [
            `Mevki, baş, setpoint, watch circle, çevre ve beklenen hava-akıntı değişimi`,
            `Online DG, thruster, PRS, sensör, DP controller ve UPS durumu`,
            `CAMO/TAM, ASOG rengi, açık alarm/defect, bypass ve devam eden bakım`,
          ],
        },
        {
          subheading: "1.2 Görev ve çevre",
          bullets: [
            `Dalış, ROV, hat gerilimi, riser, gangway, hortum veya kaldırma durumu (görev merkezinden teyit)`,
            `Planlanan gemi/helikopter hareketleri, SIMOPS ve acil kaçış rotası`,
          ],
        },
      ],
    },
    {
      heading: "2. Kritik Safha Kuralı",
      sections: [
        {
          subheading: "2.1 Ne zaman devir yapılmaz",
          callouts: [
            {
              type: "warning",
              title: "Kritik anda devir yok",
              text: `Kritik yaklaşım, bağlantı, kaldırma veya arıza müdahalesi sırasında vardiya devri yapılmaz. DP konsolundaki DPO aynı anda başka idari görevle meşgul edilmez.`,
            },
          ],
          paragraphs: [
            `Devralan DPO sistemi anlayıp kabul ettikten sonra checklist karşılıklı imzalanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Handover son kontrol",
          bullets: [
            `Mevki/sistem/görev/çevre eksiksiz aktarıldı mı?`,
            `Açık alarm, defect ve bypass'lar açıklandı mı?`,
            `Kritik safhada değil mi?`,
            `DP handover checklist karşılıklı imzalandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
