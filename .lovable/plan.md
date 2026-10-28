# Ayrı "Exercises" düğmelerini kaldır

Dersin içindeki Lessons / Calculation / Formulas / Exercises sekmeleri aynen kalacak. Yalnızca diğer yerlerdeki ayrı "Exercises" girişleri kalkacak:

1. **Learn sayfası > Practical:** "Exercises" satırı kaldırılır (Exam Preparation kalır).
2. **Ana ekran simgeleri:** "Exercises" simgesi kaldırılır.
3. **Library (All resources) > Practice:** "Exercises" bağlantısı kaldırılır.

Eski bağlantılar ve kayıtlı yer imleri bozulmasın diye `/exercises` sayfası silinmez, sadece menülerden çıkar.

## Teknik
- `src/pages/curriculum/LessonsLibraryPage.tsx` (satır ~62), `src/components/home/AppIconGrid.tsx` (satır 29), `src/data/libraryResourceLinks.ts` (satır 38) girdileri silinir; kullanılmayan ikon importları temizlenir.
- `CourseSectionTabs.tsx` dokunulmaz.
- Library link testi çalıştırılır, 375px Playwright ile Learn ve ana ekran kontrol edilir.
