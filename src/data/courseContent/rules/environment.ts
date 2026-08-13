import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Çevre kuralları.
 *
 * İçerik src/pages/EmissionRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır. Sayfadaki iç içe (nested) alt bölümler, her biri
 * ayrı bir RuleSection olacak şekilde korunmuştur:
 *  - MARPOL Annex VI (Hava Kirliliği — SOx, NOx, enerji verimliliği)
 *  - BWM Convention (Balast Suyu)
 *  - MARPOL Annex I (Petrol Kirliliği)
 *  - MARPOL Annex V (Çöp)
 *  - IMO DCS ve Bölgesel MRV
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const environmentRules: RuleGroup[] = [
  {
    title: "MARPOL Annex VI - Hava Kirliliği",
    source: {
      code: "MARPOL Annex VI",
      detail: "Prevention of Air Pollution from Ships",
    },
    rules: [
      {
        subtitle: "Kükürt Limitleri (SOx)",
        content: [
          "Global kükürt limiti: %0.50 m/m (1 Ocak 2020'den itibaren)",
          "ECA bölgelerinde: %0.10 m/m",
          "Alternatif: Onaylı egzoz gazı temizleme sistemi (scrubber) kullanımı",
          "Yakıt değişim prosedürü: ECA'ya giriş/çıkışta kayıt tutulmalı",
        ],
      },
      {
        subtitle: "NOx Emisyon Seviyeleri",
        content: [
          "Tier I: 2000 öncesi inşa edilen gemiler",
          "Tier II: 2011 sonrası inşa edilen gemiler (global standart)",
          "Tier III: 2016 sonrası inşa, NECA bölgelerinde zorunlu",
          "Tier III, Tier I değerinin en az %80 altında olmalı",
        ],
      },
      {
        subtitle: "Energy Efficiency",
        content: [
          "EEDI: Yeni gemiler için zorunlu (2013+)",
          "EEXI: Mevcut gemiler için zorunlu (2023+)",
          "CII: Yıllık operasyonel rating (A-E), 2023+ zorunlu",
          "SEEMP: Tüm gemiler için gemi enerji verimliliği yönetim planı",
        ],
      },
    ],
  },
  {
    title: "BWM Convention - Balast Suyu",
    source: {
      code: "BWM Convention",
      detail: "Ballast Water Management Convention",
    },
    rules: [
      {
        subtitle: "D-1 Standardı (Değişim)",
        content: [
          "Karadan en az 200 deniz mili uzakta",
          "Su derinliği en az 200 metre",
          "Balast suyunun en az %95'i değiştirilmeli",
          "Yöntemler: Sıralı, akış-yoluyla veya seyreltme",
        ],
      },
      {
        subtitle: "D-2 Standardı (Arıtma)",
        content: [
          "Canlı organizma limitleri: <10 organizma ≥50μm/m³",
          "10-50μm aralığında: <10 organizma/ml",
          "Sistem IMO tip onaylı olmalı",
          "Ballast Water Record Book tutulmalı",
        ],
      },
    ],
  },
  {
    title: "MARPOL Annex I - Petrol Kirliliği",
    source: {
      code: "MARPOL Annex I",
      detail: "Prevention of Pollution by Oil",
    },
    rules: [
      {
        subtitle: "Sintine Suyu Deşarjı",
        content: [
          "Yağ içeriği 15 ppm'den az olmalı",
          "Onaylı yağ filtreleme ekipmanı kullanılmalı",
          "Otomatik durdurma sistemi aktif olmalı",
          "Özel alanlarda (Akdeniz, Baltık vb.) sıfır deşarj",
        ],
      },
      {
        subtitle: "Yük Tankı Yıkama",
        content: [
          "COW (Crude Oil Washing) prosedürleri",
          "Slop tankı yönetimi",
          "Load-on-top prosedürü",
          "Oil Record Book Part II kayıtları",
        ],
      },
    ],
  },
  {
    title: "MARPOL Annex V - Çöp",
    source: {
      code: "MARPOL Annex V",
      detail: "Prevention of Pollution by Garbage from Ships",
    },
    rules: [
      {
        subtitle: "Deşarj Yasakları",
        content: [
          "Plastik: Denize deşarj YASAK (her yerde)",
          "Yiyecek atıkları: Karadan 12+ nm (öğütülmüş: 3+ nm)",
          "Kargo artıkları: Karadan 12+ nm (zararsız maddeler)",
          "Özel alanlarda: Çoğu atık için sıfır deşarj",
        ],
      },
      {
        subtitle: "Kayıt ve Raporlama",
        content: [
          "Garbage Record Book zorunlu (400 GT+ gemiler)",
          "Atık yönetim planı mevcut olmalı",
          "Liman tesislerine teslim belgeleri saklanmalı",
          "Kayıtlar 2 yıl muhafaza edilmeli",
        ],
      },
    ],
  },
  {
    title: "IMO DCS ve Bölgesel MRV",
    source: {
      code: "IMO DCS / EU MRV",
      detail: "MARPOL Annex VI Reg. 22A; EU Regulation 2015/757",
    },
    rules: [
      {
        subtitle: "IMO DCS (Data Collection System)",
        content: [
          "5000 GT+ gemiler için zorunlu",
          "Yıllık yakıt tüketimi bildirimi",
          "Kat edilen mesafe ve denizde geçirilen saat",
          "SEEMP Part II dokümantasyonu",
        ],
      },
      {
        subtitle: "EU MRV Regulation",
        content: [
          "AB limanlarına uğrayan 5000 GT+ gemiler",
          "CO₂ emisyonları, yakıt tüketimi, mesafe",
          "Yıllık doğrulama ve raporlama",
          "Kamuya açık emisyon verileri",
        ],
      },
      {
        subtitle: "Uyarılar ve Önemli Notlar",
        content: [
          "CII D veya E derecesi alan gemiler 3 yıl içinde düzeltici aksiyon planı sunmalıdır.",
          "EEXI sertifikası olmayan gemiler 2023'ten itibaren sefer yapamaz.",
          "Yakıt değişim prosedürü ECA sınırından önce tamamlanmalı ve kayıt altına alınmalıdır.",
          "Scrubber kullanan gemilerin yıkama suyu deşarj limitleri için IMO MEPC.259(68) kararına bakınız.",
        ],
      },
    ],
  },
];
