-- Stripe ödeme altyapısı kaldırıldı (supabase/functions/stripe-checkout silindi).
-- Bu migration `user_entitlements.platform` CHECK kısıtından 'stripe' değerini
-- düşürür; böylece şema yalnızca gerçekten desteklenen mağazaları kabul eder ve
-- ileride yanlışlıkla 'stripe' satırı yazılamaz.
--
-- 'app_store' bilinçli olarak korunuyor: iOS derlemesi mevcut, App Store satın
-- alma doğrulaması eklendiğinde bu değer kullanılacak.
--
-- Kısıt daraltıldığı için mevcut bir 'stripe' satırı migration'ı düşürürdü.
-- Uygulama kodu bu değeri hiçbir zaman yazmadı (silinen stripe-checkout
-- fonksiyonu user_entitlements tablosuna dokunmuyordu), ancak sessiz veri kaybı
-- yerine açık bir hata vermek için önce satır kontrolü yapılıyor.

DO $$
DECLARE
  v_stripe_rows BIGINT;
  v_constraint  TEXT;
BEGIN
  SELECT count(*) INTO v_stripe_rows
    FROM public.user_entitlements
    WHERE platform = 'stripe';

  IF v_stripe_rows > 0 THEN
    RAISE EXCEPTION
      'user_entitlements tablosunda platform=''stripe'' olan % satır var; kısıt daraltılmadan önce bu satırlar taşınmalı veya silinmeli.',
      v_stripe_rows;
  END IF;

  -- Kısıt tablo oluşturulurken satır içi (adsız) tanımlandı; adı Postgres
  -- tarafından üretildiği için ada güvenmek yerine platform sütununa ait tüm
  -- CHECK kısıtları taranıyor. Bu aynı zamanda migration'ı yeniden
  -- çalıştırılabilir (idempotent) kılar.
  FOR v_constraint IN
    SELECT conname
      FROM pg_constraint
      WHERE conrelid = 'public.user_entitlements'::regclass
        AND contype = 'c'
        AND pg_get_constraintdef(oid) ILIKE '%platform%'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.user_entitlements DROP CONSTRAINT %I',
      v_constraint
    );
  END LOOP;
END $$;

ALTER TABLE public.user_entitlements
  ADD CONSTRAINT user_entitlements_platform_check
  CHECK (platform IN ('google_play', 'app_store'));
