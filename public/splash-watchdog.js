/**
 * Splash bekçisi.
 *
 * Splash ekranı index.html içinde statik olarak duruyor ve yalnızca
 * `src/main.tsx` sonuna kadar çalışırsa kaldırılıyor. Uygulama paketi herhangi
 * bir nedenle çalışmazsa (bayat index.html eski asset hash'lerini isterse,
 * chunk 404 dönerse, eski bir Android WebView modern sözdizimini çözemezse ya
 * da CSP script'i engellerse) kullanıcı sonsuza kadar splash ekranında kalır ve
 * hiçbir geri bildirim almaz. Bu dosya o durumu yakalayıp kurtarma seçenekleri
 * sunar.
 *
 * Neden ayrı bir dosya ve neden `type="module"` değil:
 *  - Üretim CSP'si (bkz. vite.config.ts) inline script'i engeller; `'self'`
 *    kaynaklı harici dosya serbesttir.
 *  - Klasik script olarak yüklendiği için uygulamanın modül paketini çökerten
 *    hatalardan (module/dynamic import desteği, sözdizimi) etkilenmez.
 */
(function () {
  "use strict";

  // Normal açılış ~4.2sn (splash animasyonu) sürüyor. Yavaş cihazlarda ilk
  // render'a pay bırakmak için bunun çok üstünde bir eşik kullanılır.
  var BOOT_TIMEOUT_MS = 15000;
  var RECOVERY_ID = "splash-watchdog-recovery";

  function appMounted() {
    var root = document.getElementById("root");
    return !!root && root.childElementCount > 0;
  }

  function removeSplash() {
    var splash = document.getElementById("splash-root");
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
  }

  function button(label, onClick) {
    var el = document.createElement("button");
    el.type = "button";
    el.textContent = label;
    el.style.cssText =
      "display:block;width:100%;margin:8px 0 0;padding:12px 16px;border-radius:10px;" +
      "border:1px solid rgba(218,165,32,.55);background:rgba(218,165,32,.12);color:#f2d98a;" +
      "font:600 15px/1.3 Inter,system-ui,-apple-system,sans-serif;cursor:pointer;";
    el.addEventListener("click", onClick);
    return el;
  }

  function line(text, style) {
    var el = document.createElement("p");
    el.textContent = text;
    el.style.cssText = style;
    return el;
  }

  /**
   * Servis çalışanını ve tüm önbellekleri temizleyip yeniden yükler. Bayat bir
   * index.html'in artık var olmayan asset'leri istemesi durumunda kullanıcının
   * uygulamayı silip yeniden kurmadan kurtulabildiği tek yol budur.
   */
  function hardReset(btn) {
    btn.disabled = true;
    btn.textContent = "Temizleniyor… / Clearing…";

    // Promise'i olmayan çok eski WebView'lerde temizlik yapılamaz; en azından
    // önbellek atlatmalı yeniden yükleme dene.
    if (typeof Promise === "undefined") {
      window.location.replace(window.location.pathname + "?reload=" + Date.now());
      return;
    }

    var jobs = [];
    if ("serviceWorker" in navigator) {
      jobs.push(
        navigator.serviceWorker
          .getRegistrations()
          .then(function (regs) {
            return Promise.all(regs.map(function (r) { return r.unregister(); }));
          })
          .catch(function () {})
      );
    }
    if (window.caches && caches.keys) {
      jobs.push(
        caches
          .keys()
          .then(function (keys) {
            return Promise.all(keys.map(function (k) { return caches.delete(k); }));
          })
          .catch(function () {})
      );
    }

    Promise.all(jobs).then(function () {
      // Sorgu parametresi, HTTP önbelleğindeki bayat index.html'i atlatır.
      window.location.replace(
        window.location.pathname + "?reload=" + Date.now()
      );
    });
  }

  function showRecovery() {
    if (document.getElementById(RECOVERY_ID) || appMounted()) return;

    removeSplash();

    var overlay = document.createElement("div");
    overlay.id = RECOVERY_ID;
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;" +
      "padding:24px;box-sizing:border-box;background:radial-gradient(ellipse at 50% 40%,#0a2a55 0%,#041530 55%,#020a14 100%);" +
      "font-family:Inter,system-ui,-apple-system,sans-serif;";

    var card = document.createElement("div");
    card.style.cssText = "max-width:340px;width:100%;text-align:center;";

    card.appendChild(
      line(
        "Uygulama başlatılamadı",
        "margin:0;color:#fff;font:700 19px/1.3 inherit;"
      )
    );
    card.appendChild(
      line(
        "The app failed to start",
        "margin:6px 0 0;color:rgba(255,255,255,.55);font:400 14px/1.4 inherit;"
      )
    );
    card.appendChild(
      line(
        "Bağlantınızı kontrol edip yeniden deneyin. Sorun sürerse önbelleği temizleyin.",
        "margin:16px 0 20px;color:rgba(255,255,255,.72);font:400 14px/1.55 inherit;"
      )
    );

    card.appendChild(
      button("Yeniden dene / Retry", function () {
        window.location.reload();
      })
    );
    var resetBtn = button("Önbelleği temizle / Clear cache", function () {
      hardReset(resetBtn);
    });
    card.appendChild(resetBtn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Uygulama geç de olsa açılırsa (çok yavaş cihaz) uyarıyı kendiliğinden
    // kaldır; bekçi yanlış alarm verdiğinde kullanıcıyı engellemesin.
    var poll = setInterval(function () {
      if (!appMounted()) return;
      clearInterval(poll);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 500);
  }

  // Uygulamanın giriş script'i yüklenemezse (404 / ağ hatası) zaman aşımını
  // beklemeden göster. Kaynak hataları balonlaşmadığı için capture aşaması şart.
  window.addEventListener(
    "error",
    function (event) {
      var el = event.target;
      if (el && el.tagName === "SCRIPT" && el.src && !appMounted()) {
        showRecovery();
      }
    },
    true
  );

  setTimeout(function () {
    if (!appMounted()) showRecovery();
  }, BOOT_TIMEOUT_MS);
})();
