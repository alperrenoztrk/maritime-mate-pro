import { supabase } from "@/integrations/supabase/safeClient";

/**
 * Ders slaytları için seslendirme motoru.
 *
 * İki katman, tek arayüz:
 *  1) Cihaz TTS (Web Speech API) — birincil. Ücretsiz, çevrimdışı, anında.
 *     Uygulama diline uygun ERKEK ses otomatik seçilir; cihazda erkek ses yoksa
 *     o dilin sesi düşük perde (pitch) ile kullanılır.
 *  2) Bulut TTS (`lesson-tts` edge function) — yedek. Cihazda o dil için hiç ses
 *     yoksa veya speechSynthesis desteklenmiyorsa devreye girer; üretilen ses
 *     bellek + sessionStorage'da önbelleğe alınır.
 *
 * Oynatıcı hangi motorun çalıştığını bilmez; yalnızca `speak()` çağırır ve
 * `onEnd` bekler.
 */

export interface SpeakOptions {
  lang: string;
  rate?: number;
  voiceURI?: string | null;
  onEnd?: () => void;
  onError?: (reason: string) => void;
}

export interface Narrator {
  speak: (text: string, options: SpeakOptions) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSpeaking: () => boolean;
}

// ── Ses seçimi ────────────────────────────────────────────────────────────

/** Ad/voiceURI içinde geçtiğinde sesin erkek olduğunu gösteren ipuçları. */
const MALE_HINTS = [
  "male",
  "#male",
  "erkek",
  "man",
  "masculine",
  // Platform bazlı bilinen erkek ses adları
  "tolga",
  "ahmet",
  "burak",
  "david",
  "george",
  "mark",
  "daniel",
  "alex",
  "fred",
  "rishi",
  "oliver",
  "james",
  "diego",
  "jorge",
  "juan",
  "pablo",
  "stefan",
  "hans",
  "thomas",
  "yannick",
  "nicolas",
  "matteo",
  "cosimo",
  "luca",
  "joaquim",
  "felipe",
  "yuri",
  "pavel",
  "otoya",
  "hattori",
  "ichiro",
  "yunjae",
  "liang",
  "kangkang",
];

/** Kesinlikle kadın olan bilinen ses adları — erkek adayı sayılmaz. */
const FEMALE_HINTS = [
  "female",
  "#female",
  "kadın",
  "woman",
  "yelda",
  "seda",
  "filiz",
  "zira",
  "hazel",
  "samantha",
  "victoria",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "anna",
  "petra",
  "katja",
  "amelie",
  "audrey",
  "alice",
  "federica",
  "paulina",
  "monica",
  "luciana",
  "milena",
  "kyoko",
  "sora",
  "yuna",
  "tingting",
];

const containsHint = (haystack: string, hints: string[]) =>
  hints.some((hint) => haystack.includes(hint));

const baseLang = (lang: string) => lang.toLowerCase().split(/[-_]/)[0];

export interface VoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
  isMale: boolean;
}

/** Verilen dil için cihazda bulunan sesler; erkek olanlar önce. */
export const listVoicesForLanguage = (lang: string): VoiceOption[] => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const target = baseLang(lang);
  return window.speechSynthesis
    .getVoices()
    .filter((voice) => baseLang(voice.lang) === target)
    .map((voice) => {
      const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
      return {
        voiceURI: voice.voiceURI,
        name: voice.name,
        lang: voice.lang,
        isMale: containsHint(haystack, MALE_HINTS) && !containsHint(haystack, FEMALE_HINTS),
      };
    })
    .sort((a, b) => Number(b.isMale) - Number(a.isMale) || a.name.localeCompare(b.name));
};

/**
 * Dil için en uygun ERKEK sesi seçer. Erkek ses yoksa o dilin ilk sesini döner
 * (bu durumda çağıran taraf pitch'i düşürerek daha erkeksi bir ton elde eder).
 */
export const pickVoice = (
  lang: string,
  preferredURI?: string | null,
): { voice: SpeechSynthesisVoice | null; isMale: boolean } => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, isMale: false };
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return { voice: null, isMale: false };

  if (preferredURI) {
    const chosen = voices.find((v) => v.voiceURI === preferredURI);
    if (chosen) {
      const haystack = `${chosen.name} ${chosen.voiceURI}`.toLowerCase();
      return {
        voice: chosen,
        isMale: containsHint(haystack, MALE_HINTS) && !containsHint(haystack, FEMALE_HINTS),
      };
    }
  }

  const target = baseLang(lang);
  const sameLang = voices.filter((v) => baseLang(v.lang) === target);
  if (sameLang.length === 0) return { voice: null, isMale: false };

  const scored = sameLang
    .map((voice) => {
      const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
      const female = containsHint(haystack, FEMALE_HINTS);
      const male = containsHint(haystack, MALE_HINTS) && !female;
      let score = 0;
      if (male) score += 100;
      if (female) score -= 100;
      // Yerel (offline) sesler ağ gerektirmediği için tercih edilir.
      if (voice.localService) score += 10;
      if (voice.lang.toLowerCase() === lang.toLowerCase()) score += 5;
      return { voice, male, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  return { voice: best.voice, isMale: best.male };
};

/** Cihazda bu dil için hiç ses var mı? */
export const hasDeviceVoice = (lang: string): boolean => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const target = baseLang(lang);
  return window.speechSynthesis.getVoices().some((v) => baseLang(v.lang) === target);
};

/**
 * Chrome sesleri asenkron yükler; ilk çağrıda liste boş dönebilir.
 * `voiceschanged` olayını bekleyip listeyi hazır hale getirir.
 */
export const waitForVoices = (timeoutMs = 3000): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve();
    if (window.speechSynthesis.getVoices().length > 0) return resolve();

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.speechSynthesis.removeEventListener("voiceschanged", finish);
      resolve();
    };
    window.speechSynthesis.addEventListener("voiceschanged", finish);
    window.setTimeout(finish, timeoutMs);
  });

// ── Metin parçalama ───────────────────────────────────────────────────────

/**
 * Android/Chrome uzun `utterance`'ları sessizce kesiyor; metni cümle
 * sınırlarından ~200 karakterlik parçalara böleriz.
 */
const MAX_UTTERANCE_CHARS = 200;

const splitForSpeech = (text: string): string[] => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= MAX_UTTERANCE_CHARS) return [clean];

  const sentences = clean.match(/[^.!?;]+[.!?;]+(\s|$)|[^.!?;]+$/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const raw of sentences) {
    const sentence = raw.trim();
    if (!sentence) continue;
    if (sentence.length > MAX_UTTERANCE_CHARS) {
      if (current) {
        chunks.push(current);
        current = "";
      }
      // Tek cümle bile uzunsa boşluktan böl.
      const words = sentence.split(" ");
      let piece = "";
      for (const word of words) {
        if (`${piece} ${word}`.trim().length > MAX_UTTERANCE_CHARS) {
          if (piece) chunks.push(piece);
          piece = word;
        } else {
          piece = piece ? `${piece} ${word}` : word;
        }
      }
      if (piece) chunks.push(piece);
      continue;
    }
    if (!current) current = sentence;
    else if (`${current} ${sentence}`.length <= MAX_UTTERANCE_CHARS) current = `${current} ${sentence}`;
    else {
      chunks.push(current);
      current = sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

// ── Bulut TTS önbelleği ───────────────────────────────────────────────────

const CLOUD_CACHE_PREFIX = "marineExpert.tts.";
const cloudMemoryCache = new Map<string, string>();

const hashKey = (lang: string, text: string): string => {
  let hash = 0;
  const input = `${lang}|${text}`;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `${lang}_${input.length}_${(hash >>> 0).toString(36)}`;
};

const readCloudCache = (key: string): string | null => {
  const memory = cloudMemoryCache.get(key);
  if (memory) return memory;
  try {
    return sessionStorage.getItem(CLOUD_CACHE_PREFIX + key);
  } catch {
    return null;
  }
};

const writeCloudCache = (key: string, dataUrl: string) => {
  cloudMemoryCache.set(key, dataUrl);
  try {
    sessionStorage.setItem(CLOUD_CACHE_PREFIX + key, dataUrl);
  } catch {
    // Kota dolarsa bellek önbelleği yeterli.
  }
};

/** Bulut TTS'ten ses ister; base64 mp3 data URL döner. */
const fetchCloudAudio = async (text: string, lang: string): Promise<string | null> => {
  const key = hashKey(lang, text);
  const cached = readCloudCache(key);
  if (cached) return cached;

  const { data, error } = await supabase.functions.invoke("lesson-tts", {
    body: { text, lang, gender: "male" },
  });
  if (error || !data || typeof (data as { audio?: unknown }).audio !== "string") return null;

  const { audio, mimeType } = data as { audio: string; mimeType?: string };
  const dataUrl = `data:${mimeType || "audio/mpeg"};base64,${audio}`;
  writeCloudCache(key, dataUrl);
  return dataUrl;
};

// ── Narrator ──────────────────────────────────────────────────────────────

/**
 * Oynatıcının kullandığı tek seslendirme kontrolcüsü. Her oynatıcı örneği
 * kendi narrator'ını yaratır ve unmount'ta `stop()` çağırır.
 */
export const createNarrator = (): Narrator => {
  let cancelled = false;
  /** Aynı anda tek konuşma: eski çağrının callback'lerini susturmak için. */
  let runId = 0;
  let audio: HTMLAudioElement | null = null;
  let usingCloud = false;
  let watchdog: number | null = null;

  const clearWatchdog = () => {
    if (watchdog !== null) {
      window.clearInterval(watchdog);
      watchdog = null;
    }
  };

  const stopAll = () => {
    cancelled = true;
    runId += 1;
    clearWatchdog();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audio) {
      audio.pause();
      audio.src = "";
      audio = null;
    }
    usingCloud = false;
  };

  const speakWithDevice = (text: string, options: SpeakOptions, myRun: number): boolean => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    const { voice, isMale } = pickVoice(options.lang, options.voiceURI);
    if (!voice) return false;

    const chunks = splitForSpeech(text);
    if (chunks.length === 0) {
      options.onEnd?.();
      return true;
    }

    window.speechSynthesis.cancel();

    let index = 0;
    const speakNext = () => {
      if (cancelled || myRun !== runId) return;
      if (index >= chunks.length) {
        clearWatchdog();
        options.onEnd?.();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      index += 1;
      utterance.voice = voice;
      utterance.lang = voice.lang || options.lang;
      utterance.rate = options.rate ?? 1;
      // Erkek ses bulunamadıysa perdeyi düşürerek daha derin bir ton elde ederiz.
      utterance.pitch = isMale ? 1 : 0.8;
      utterance.onend = speakNext;
      utterance.onerror = (event) => {
        if (cancelled || myRun !== runId) return;
        // "interrupted"/"canceled" bizim durdurmamızdan gelir, hata değildir.
        if (event.error === "interrupted" || event.error === "canceled") return;
        clearWatchdog();
        options.onError?.(event.error || "speech-error");
        options.onEnd?.();
      };
      window.speechSynthesis.speak(utterance);
    };

    // Chrome masaüstü ~15 sn sonra sentezi sessizce duraklatıyor.
    clearWatchdog();
    watchdog = window.setInterval(() => {
      if (cancelled || myRun !== runId) return clearWatchdog();
      const synth = window.speechSynthesis;
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 10000);

    speakNext();
    return true;
  };

  const speakWithCloud = async (text: string, options: SpeakOptions, myRun: number) => {
    try {
      const dataUrl = await fetchCloudAudio(text, options.lang);
      if (cancelled || myRun !== runId) return;
      if (!dataUrl) {
        options.onError?.("tts-unavailable");
        options.onEnd?.();
        return;
      }
      usingCloud = true;
      audio = new Audio(dataUrl);
      audio.playbackRate = options.rate ?? 1;
      audio.onended = () => {
        if (cancelled || myRun !== runId) return;
        options.onEnd?.();
      };
      audio.onerror = () => {
        if (cancelled || myRun !== runId) return;
        options.onError?.("audio-error");
        options.onEnd?.();
      };
      await audio.play();
    } catch {
      if (cancelled || myRun !== runId) return;
      options.onError?.("tts-failed");
      options.onEnd?.();
    }
  };

  return {
    speak(text, options) {
      stopAll();
      cancelled = false;
      const myRun = runId;

      const clean = text.replace(/\s+/g, " ").trim();
      if (!clean) {
        options.onEnd?.();
        return;
      }

      if (speakWithDevice(clean, options, myRun)) return;
      void speakWithCloud(clean, options, myRun);
    },
    pause() {
      if (usingCloud) audio?.pause();
      else if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.pause();
      }
    },
    resume() {
      if (usingCloud) void audio?.play();
      else if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.resume();
      }
    },
    stop() {
      stopAll();
    },
    isSpeaking() {
      if (usingCloud) return !!audio && !audio.paused && !audio.ended;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
      return window.speechSynthesis.speaking;
    },
  };
};
