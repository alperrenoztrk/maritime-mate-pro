# GLOSSARY.md — Çekirdek denizcilik sözlüğü

Tek doğru kaynak (single source of truth). Kural: denizcilik terimleri kelime
kelime çevrilmez; burada olmayan terim `[?? TERİM: …]` diye işaretlenir ve
kullanıcıya sorulur. Eksik olabilir, yanlış olamaz. Yeni terim eklemeden önce
kullanıcının onayı alınır.

Kaynak: kullanıcının CLAUDE.md metnindeki çekirdek sözlük (Ekim 2026).

## Komut fiilleri (jenerik fiil değildir)

| Türkçe | İngilizce | Not |
|---|---|---|
| viya / viyalamak | Steady (up) | Rotayı sabit tut; "calm down" değil |
| alabanda | Hard over (Hard a-port / Hard a-starboard) | Tam dümen; "broadside" değil |
| funda (demir) | Let go (the anchor) | "fondue" değil |
| vira | Heave up / Weigh anchor; halatta Heave in | "turn", "veer" değil |
| laçka | Slack away / Pay out | Fiil; sıfat "slack" değil |
| aganta | Hold on / Hold | |
| abosa / vira abosa | Avast heaving | |
| mola / mola al | Let go (the line) | |
| fora | Let go / loose / set | |
| mayna | Lower (away) | |
| tornistan / tornista | Astern | "return", "U-turn" değil |
| kavanço | Gybe / wear | |

## Dümen komutları (Helm orders, IMO SMCP)

| Türkçe | İngilizce |
|---|---|
| Viya | Steady |
| Viya böyle / Böyle tut | Steady as she goes |
| Dümen ortala / Ortala | Midships |
| İskele beş / on / on beş / yirmi | Port five / ten / fifteen / twenty |
| Sancak beş / on / on beş / yirmi | Starboard five / ten / fifteen / twenty |
| Alabanda iskele | Hard a-port |
| Alabanda sancak | Hard a-starboard |
| Karşıla | Meet her |
| İskeleye düşme | Nothing to port |
| Sancağa düşme | Nothing to starboard |
| Dümeni elden bırakma / viya tut | Keep her steady |

## Makine telgraf komutları (Engine telegraph)

| Türkçe | İngilizce |
|---|---|
| Pruva pek yavaş yol | Dead slow ahead |
| Pruva yavaş yol | Slow ahead |
| Pruva yarım yol | Half ahead |
| Pruva tam yol | Full ahead |
| Stop / Stop makine | Stop engine |
| Tornista pek yavaş | Dead slow astern |
| Tornista yavaş / yarım / tam | Slow / Half / Full astern |
| Makine vardiya / hazır makine | Stand by engine |
| Makine ile işiniz bitti (F.W.E.) | Finished with engine |

## Demir komutları (Anchor)

| Türkçe | İngilizce |
|---|---|
| Demir vardiya / demire bekle | Stand by (the) anchor |
| Funda demir / İskele funda | Let go (the) anchor / Let go port anchor |
| Demiri yürüt (laçka ederek) | Walk back the anchor |
| Vira demir / Vira | Heave up / Weigh anchor |
| Apiko | Up and down |
| Demir vira oldu / demir kalktı | Anchor's aweigh |
| Demir tuttu | Brought up / anchor holding |
| Zincir ne tarafa gidiyor? | How is the chain leading? |

## Halat / palamar komutları (Mooring)

| Türkçe | İngilizce |
|---|---|
| Volta et / bağla | Make fast |
| Laçka et / kaçır | Slack away / Pay out |
| Vira / al | Heave in |
| Aganta | Hold on / Hold |
| Abosa / vira abosa | Avast heaving |
| Mola / mola al | Let go (the line) |
| Teke düşür | Single up |
| Geriye vira / sıkıştır | Heave taut |

## Genel / yelken kökenli terimler

| Türkçe | İngilizce |
|---|---|
| İskele | Port (left) |
| Sancak | Starboard (right) |
| Pruva | Bow / ahead |
| Kıç / pupa | Stern / astern |
| Fora | Let go / loose / set |
| Mayna et | Lower (away) |
| Faça et | Back (the sail) / heave to |
| Orsa | Luff / close to wind |
| Kavanço | Gybe / wear |

## Bilinen makine çevirisi hataları

| Terim | Yanlış (MT çıktısı) | Doğru |
|---|---|---|
| Viya / viyalamak | "calm down", "make it steady", "via" | Steady (up) |
| Alabanda | "broadside", "all over" | Hard over (full rudder) |
| Funda (demir) | "fondue", "found" | Let go (anchor) |
| Vira | "turn", "veer" | Heave / weigh |
| Laçka | "slack" (sıfat) | Slack away / pay out (fiil) |
| Aganta | (boş bırakılır) | Hold on / avast |
| Tornistan | "return", "U-turn" | Astern |

Uygulamadaki otomatik kontroller: `scripts/i18n/sense-error-rules.mjs`
(bağ → vineyard, demir → iron, kıç → vücut, cardinal → kuş/kardinal vb.) ve
`supabase/functions/_shared/englishMaritimeTerminology.ts` (İngilizce kurallar).

## Onay bekleyen

| Türkçe | Önerilen | Durum |
|---|---|---|
| Zamanla boylam | Longitude from Time | [?? TERİM: Zamanla boylam] — kullanıcı onayı bekliyor |
