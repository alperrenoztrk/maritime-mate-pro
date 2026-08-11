// IALA Deniz Şamandıralama Sistemi (IALA Maritime Buoyage System).
//
// Tek kaynak: /navigation/buoyage referans sayfası bu dosyadan beslenir.
//
// Sistemin kritik noktası, aynı rengin bölgeye göre farklı tarafı işaret
// etmesidir. Bu yüzden veri modeli lateral işaretleri Bölge A ve Bölge B için
// AYRI AYRI tutar; arayüz bölge anahtarıyla ikisini yan yana gösterebilsin
// diye. "Kırmızı iskelede kalır" cümlesi bir renk bilgisi değil, yalnızca
// Bölge A'da geçerli bir geçiş talimatıdır.
//
// 2006'da sisteme eklenen Acil Batık İşaretleme Şamandırası (Emergency Wreck
// Marking Buoy) dahildir; yeni bir batık tespit edildiğinde harita ve seyir
// ihbarları güncellenene kadar kullanılan geçici işarettir.

import isolatedDangerImage from "@/assets/navigation/isolated-danger-mark.svg";
import safeWaterImage from "@/assets/navigation/safe-water-mark.svg";

export type BuoyCategory = "lateral" | "cardinal" | "isolated" | "safeWater" | "special" | "wreck";

/** IALA bölgeleri: lateral işaretlerin renkleri bölgeye göre yer değiştirir. */
export type IalaRegion = "A" | "B";

export interface BuoyMark {
  id: string;
  category: BuoyCategory;
  /** Kart başlığı. */
  title: string;
  /** Yalnız lateral işaretlerde dolu: işaret hangi bölgede bu görünümdedir. */
  region?: IalaRegion;
  /** Gövde rengi ve deseni. */
  colour: string;
  /** Şamandıranın biçimi (silindirik/konik/sütun/bikonik vb.). */
  shape: string;
  /** Tepe işareti (topmark) — yoksa null. */
  topmark: string | null;
  /** Işık rengi ve karakteri. */
  light: string;
  /** Denizciye verdiği talimat — asıl öğrenilmesi gereken kısım. */
  instruction: string;
  /** Sahada işe yarayan ek not / hatırlatma. */
  note?: string;
}

/**
 * Diyagram kategoriye bağlıdır, işarete değil: tek bir levha o kategorinin
 * bütün varyantlarını birlikte gösterir. Bu yüzden görsel bölüm başlığında
 * bir kez basılır — kart başına konsaydı aynı levha lateralde sekiz kez
 * tekrar ederdi.
 */
export const BUOY_CATEGORY_LABELS: Record<
  BuoyCategory,
  { title: string; description: string; image?: string; imageAlt?: string }
> = {
  lateral: {
    title: "Lateral (Yanal) İşaretler",
    description:
      "Bir kanalın veya geçiş hattının kenarlarını tarif eder; emniyetli suyu çizgisel olarak tanımlar. Renk anlamı IALA bölgesine göre TERSTİR — önce hangi bölgede olduğunuzu bilmeniz gerekir.",
    image: "/diagrams/navigation/iala-lateral-marks.svg",
    imageAlt: "IALA lateral marks for Region A and Region B side by side",
  },
  cardinal: {
    title: "Kardinal İşaretler",
    description:
      "Kanal kenarı anlatmaz; bir tehlikenin çevresinde emniyetli suyun HANGİ YÖNDE olduğunu söyler. Her iki IALA bölgesinde de aynıdır.",
    image: "/diagrams/seamanship/kardinal-samandiralar.svg",
    imageAlt: "North, east, south and west cardinal marks with their topmarks and colour bands",
  },
  isolated: {
    title: "İzole Tehlike İşareti",
    description:
      "Çevresinde dolaşılabilir su bulunan tekil bir tehlikenin (kaya, batık, sığlık) üzerine veya hemen yanına konur.",
    image: isolatedDangerImage,
    imageAlt: "Isolated danger mark with two black spheres as its topmark",
  },
  safeWater: {
    title: "Emniyetli Su İşareti",
    description:
      "Çevresi emniyetli su olan bir noktayı gösterir: kanal orta hattı, yaklaşım (landfall) noktası veya ayrım hattı. 'Doğru yerdeyim' teyidi verir.",
    image: safeWaterImage,
    imageAlt: "Safe water mark with red and white vertical stripes and a single red sphere topmark",
  },
  special: {
    title: "Özel İşaretler",
    description:
      "Seyir emniyetinden çok özel amaçlı bir alanı belirtir: kablo sahası, atış alanı, ölçüm noktası, yarış parkuru, ODAS.",
  },
  wreck: {
    title: "Acil Batık İşareti (EWMB)",
    description:
      "2006'da sisteme eklendi. Yeni tespit edilmiş, henüz haritaya ve seyir ihbarlarına işlenmemiş bir batığı geçici olarak işaretler.",
  },
};

export const BUOY_CATEGORY_ORDER: BuoyCategory[] = [
  "lateral",
  "cardinal",
  "isolated",
  "safeWater",
  "special",
  "wreck",
];

export const BUOY_MARKS: BuoyMark[] = [
  // ─── Lateral — Bölge A ────────────────────────────────────────────────────
  {
    id: "lateral-a-port",
    category: "lateral",
    region: "A",
    title: "İskele İşareti — Bölge A",
    colour: "Kırmızı",
    shape: "Silindirik (can), sütun veya spar",
    topmark: "Tek kırmızı silindir (can)",
    light: "Kırmızı; her karakter olabilir (Fl R, Q R, Oc R, LFl R…)",
    instruction:
      "Limana/kanala girerken (yön akıntı ve kanal yönüyle tanımlanır) bu işaret İSKELE tarafınızda kalmalıdır.",
    note: "Bölge A'ya Avrupa, Afrika, Asya'nın büyük bölümü ve Avustralya dahildir — Türkiye Bölge A'dadır.",
  },
  {
    id: "lateral-a-starboard",
    category: "lateral",
    region: "A",
    title: "Sancak İşareti — Bölge A",
    colour: "Yeşil",
    shape: "Konik, sütun veya spar",
    topmark: "Tek yeşil koni, ucu yukarı",
    light: "Yeşil; her karakter olabilir",
    instruction: "Limana/kanala girerken bu işaret SANCAK tarafınızda kalmalıdır.",
  },
  {
    id: "lateral-a-pref-stbd",
    category: "lateral",
    region: "A",
    title: "Tercihli Kanal Sancakta — Bölge A",
    colour: "Kırmızı, üzerinde geniş yeşil yatay bant",
    shape: "Silindirik (can), sütun veya spar",
    topmark: "Tek kırmızı silindir",
    light: "Kırmızı, kompozit grup çakar: Fl (2+1) R",
    instruction:
      "Kanal ikiye ayrılıyor. ANA (tercihli) kanal sancağınızda kalıyor; işareti iskelenizde bırakarak ana kanalda kalırsınız.",
    note: "Gövde rengi HANGİ tarafta bırakılacağını, bant rengi ise tercihli kanalın yönünü söyler.",
  },
  {
    id: "lateral-a-pref-port",
    category: "lateral",
    region: "A",
    title: "Tercihli Kanal İskelede — Bölge A",
    colour: "Yeşil, üzerinde geniş kırmızı yatay bant",
    shape: "Konik, sütun veya spar",
    topmark: "Tek yeşil koni, ucu yukarı",
    light: "Yeşil, kompozit grup çakar: Fl (2+1) G",
    instruction: "Ana kanal iskelenizde kalıyor; işareti sancağınızda bırakırsınız.",
  },

  // ─── Lateral — Bölge B ────────────────────────────────────────────────────
  {
    id: "lateral-b-port",
    category: "lateral",
    region: "B",
    title: "İskele İşareti — Bölge B",
    colour: "Yeşil",
    shape: "Silindirik (can), sütun veya spar",
    topmark: "Tek yeşil silindir (can)",
    light: "Yeşil; her karakter olabilir",
    instruction: "Limana/kanala girerken bu işaret İSKELE tarafınızda kalmalıdır.",
    note: "Bölge B: Kuzey ve Güney Amerika, Japonya, Kore ve Filipinler. Renkler Bölge A'nın tam tersidir.",
  },
  {
    id: "lateral-b-starboard",
    category: "lateral",
    region: "B",
    title: "Sancak İşareti — Bölge B",
    colour: "Kırmızı",
    shape: "Konik, sütun veya spar",
    topmark: "Tek kırmızı koni, ucu yukarı",
    light: "Kırmızı; her karakter olabilir",
    instruction: "Limana/kanala girerken bu işaret SANCAK tarafınızda kalmalıdır.",
    note: "Amerika'da denizcilerin ezberi 'red right returning' — dönüşte kırmızı sancakta.",
  },
  {
    id: "lateral-b-pref-stbd",
    category: "lateral",
    region: "B",
    title: "Tercihli Kanal Sancakta — Bölge B",
    colour: "Yeşil, üzerinde geniş kırmızı yatay bant",
    shape: "Silindirik (can), sütun veya spar",
    topmark: "Tek yeşil silindir",
    light: "Yeşil, kompozit grup çakar: Fl (2+1) G",
    instruction: "Ana kanal sancağınızda kalıyor; işareti iskelenizde bırakırsınız.",
  },
  {
    id: "lateral-b-pref-port",
    category: "lateral",
    region: "B",
    title: "Tercihli Kanal İskelede — Bölge B",
    colour: "Kırmızı, üzerinde geniş yeşil yatay bant",
    shape: "Konik, sütun veya spar",
    topmark: "Tek kırmızı koni, ucu yukarı",
    light: "Kırmızı, kompozit grup çakar: Fl (2+1) R",
    instruction: "Ana kanal iskelenizde kalıyor; işareti sancağınızda bırakırsınız.",
  },

  // ─── Kardinal işaretler ───────────────────────────────────────────────────
  {
    id: "cardinal-north",
    category: "cardinal",
    title: "Kuzey Kardinal",
    colour: "Üstte siyah, altta sarı (S/Sa)",
    shape: "Sütun (pillar) veya spar",
    topmark: "İki siyah koni, ikisi de YUKARI bakar (▲▲)",
    light: "Beyaz — VQ veya Q (kesintisiz hızlı/çok hızlı çakar)",
    instruction: "Tehlikenin KUZEYİNDEN geçin.",
    note: "Tepe işaretindeki konilerin yönü, siyah bandın konumunu da verir: koniler yukarı → siyah üstte.",
  },
  {
    id: "cardinal-east",
    category: "cardinal",
    title: "Doğu Kardinal",
    colour: "Siyah, ortada geniş sarı bant (S/Sa/S)",
    shape: "Sütun (pillar) veya spar",
    topmark: "İki siyah koni, tabanları birbirine bakar (▲▼)",
    light: "Beyaz — VQ (3) 5s veya Q (3) 10s",
    instruction: "Tehlikenin DOĞUSUNDAN geçin.",
    note: "Üçlü grup = doğu. Tepe işareti yumurta/fıçı biçimi hatırlatır.",
  },
  {
    id: "cardinal-south",
    category: "cardinal",
    title: "Güney Kardinal",
    colour: "Üstte sarı, altta siyah (Sa/S)",
    shape: "Sütun (pillar) veya spar",
    topmark: "İki siyah koni, ikisi de AŞAĞI bakar (▼▼)",
    light: "Beyaz — VQ (6) + LFl 10s veya Q (6) + LFl 15s",
    instruction: "Tehlikenin GÜNEYİNDEN geçin.",
    note: "Altılı gruptan sonraki UZUN çakar, altıncı ile yedinciyi ayırt etmek için konmuştur; güneyin imzasıdır.",
  },
  {
    id: "cardinal-west",
    category: "cardinal",
    title: "Batı Kardinal",
    colour: "Sarı, ortada geniş siyah bant (Sa/S/Sa)",
    shape: "Sütun (pillar) veya spar",
    topmark: "İki siyah koni, uçları birbirine bakar — 'kadeh' (▼▲)",
    light: "Beyaz — VQ (9) 10s veya Q (9) 15s",
    instruction: "Tehlikenin BATISINDAN geçin.",
    note: "Kadeh (wineglass) biçimi batıyı hatırlatır; dokuzlu grup batının imzasıdır.",
  },

  // ─── İzole tehlike ────────────────────────────────────────────────────────
  {
    id: "isolated-danger",
    category: "isolated",
    title: "İzole Tehlike İşareti",
    colour: "Siyah, üzerinde bir veya daha fazla geniş kırmızı yatay bant",
    shape: "Sütun (pillar) veya spar",
    topmark: "İki siyah küre, düşey olarak üst üste",
    light: "Beyaz — Fl (2)",
    instruction:
      "Tam üzerinde durduğu tehlikeden uzak durun; çevresindeki su dolaşılabilir.",
    note: "İki küre ↔ iki çakar: tepe işareti ile ışık karakteri birbirini doğrular. Emniyetli taraf, yerel derinlik ve draft ile birlikte seçilir.",
  },

  // ─── Emniyetli su ─────────────────────────────────────────────────────────
  {
    id: "safe-water",
    category: "safeWater",
    title: "Emniyetli Su İşareti",
    colour: "Kırmızı-beyaz dikey şeritli",
    shape: "Küresel, sütun veya spar",
    topmark: "Tek kırmızı küre (sütun/spar biçiminde)",
    light: "Beyaz — Iso, Oc, LFl 10s veya Mo(A) (● ▬)",
    instruction:
      "Çevresi emniyetli sudur; üzerinden veya yakınından geçilebilir. Kanal orta hattını ya da yaklaşım noktasını gösterir.",
    note: "Mo(A) ışık karakteri mors 'A' harfidir: kısa-uzun. Landfall şamandıralarında sık görülür.",
  },

  // ─── Özel işaret ──────────────────────────────────────────────────────────
  {
    id: "special",
    category: "special",
    title: "Özel İşaret",
    colour: "Sarı",
    shape: "İsteğe bağlı — ancak seyir işaretleriyle karışmamalı",
    topmark: "Tek sarı X (çarpı) işareti",
    light: "Sarı — Fl Y, Fl (4) Y, Mo(A) Y gibi, seyir işaretleriyle karışmayan karakterde",
    instruction:
      "Seyir tehlikesi bildirmez; özel amaçlı bir alanın sınırını gösterir. Harita ve seyir ihbarlarından o alanın ne olduğunu okuyun.",
    note: "Kablo/boru hattı, atık boşaltma sahası, askeri atış alanı, ölçüm cihazı (ODAS), yarış parkuru, akvakültür sahası.",
  },

  // ─── Acil batık işareti ───────────────────────────────────────────────────
  {
    id: "emergency-wreck",
    category: "wreck",
    title: "Acil Batık İşaretleme Şamandırası (EWMB)",
    colour: "Eşit sayıda mavi ve sarı DİKEY şerit (en az 4, en fazla 8 şerit)",
    shape: "Sütun (pillar) veya spar",
    topmark: "Dik duran sarı haç (+)",
    light: "Dönüşümlü mavi ve sarı — Al Oc BuY 3s (1 sn mavi, 0.5 sn karanlık, 1 sn sarı, 0.5 sn karanlık)",
    instruction:
      "Yeni tespit edilmiş ve henüz haritaya işlenmemiş bir batığı işaretler. İşaretten uzak durun; geçiş için haritaya değil, seyir ihbarına ve VTS bilgisine güvenin.",
    note: "2006'da IALA sistemine eklendi. Geçicidir: batık haritaya ve Notice to Mariners'a işlenip kalıcı işaretleme yapıldığında kaldırılır. Mavi-sarı renk çifti başka hiçbir IALA işaretinde kullanılmaz — bu yüzden karıştırılması güçtür.",
  },
];

export const buoysByCategory = (category: BuoyCategory, region?: IalaRegion) =>
  BUOY_MARKS.filter(
    (mark) => mark.category === category && (!region || !mark.region || mark.region === region),
  );

/** Haritada ve fener listesinde geçen ışık karakteri kısaltmaları. */
export interface LightCharacter {
  code: string;
  name: string;
  description: string;
}

export const LIGHT_CHARACTERS: LightCharacter[] = [
  { code: "F", name: "Sabit (Fixed)", description: "Kesintisiz, sabit şiddette yanar." },
  { code: "Fl", name: "Çakar (Flashing)", description: "Işıklı süre karanlıktan KISADIR; dakikada 50'den az çakış." },
  { code: "LFl", name: "Uzun çakar (Long-flashing)", description: "Tek çakışın süresi 2 saniye veya daha uzundur." },
  { code: "Q", name: "Hızlı çakar (Quick)", description: "Dakikada 50-79 çakış. Kardinal işaretlerin temelidir." },
  { code: "VQ", name: "Çok hızlı çakar (Very quick)", description: "Dakikada 80-159 çakış." },
  { code: "UQ", name: "Ultra hızlı çakar", description: "Dakikada 160 ve üzeri çakış." },
  { code: "Iso", name: "Eşit aralıklı (Isophase)", description: "Işıklı ve karanlık süreler EŞİTTİR." },
  { code: "Oc", name: "Örtmeli (Occulting)", description: "Işıklı süre karanlıktan UZUNDUR — Fl'nin tersi." },
  { code: "Mo", name: "Mors", description: "Işık, bir mors harfini yanıp sönerek gösterir; ör. Mo(A) = ● ▬." },
  { code: "Al", name: "Dönüşümlü (Alternating)", description: "Renk değiştirerek yanar; ör. Al WR." },
  { code: "Dir", name: "Yönlü (Directional)", description: "Dar bir sektörde belirli bir hattı tarif eder." },
];
