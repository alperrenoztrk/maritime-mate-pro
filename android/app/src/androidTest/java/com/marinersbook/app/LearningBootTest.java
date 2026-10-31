package com.marinersbook.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import android.content.Context;
import android.os.SystemClock;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.InputStream;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Tests the actual packaged Capacitor WebView, including with device networking disabled. */
@RunWith(AndroidJUnit4.class)
public class LearningBootTest {
    private String evaluate(ActivityScenario<MainActivity> scenario, String script) throws Exception {
        CountDownLatch completed = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>();
        scenario.onActivity(activity -> activity.getBridge().getWebView().evaluateJavascript(
            script, value -> { result.set(value); completed.countDown(); }));
        assertTrue("WebView callback timed out", completed.await(10, TimeUnit.SECONDS));
        return result.get();
    }
    private void awaitTrue(ActivityScenario<MainActivity> scenario, String script) throws Exception {
        long deadline = SystemClock.elapsedRealtime() + 60000;
        while (SystemClock.elapsedRealtime() < deadline) {
            if ("true".equals(evaluate(scenario, script))) return;
            SystemClock.sleep(250);
        }
        throw new AssertionError("Packaged WebView did not reach expected state: " + script);
    }
    @Test
    public void checkedLearningCopyIsPackaged() throws Exception {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertEquals("com.marinersbook.app", context.getPackageName());
        try (InputStream stream = context.getAssets().open("public/locales/shared/learning-guide.en.json")) {
            java.io.ByteArrayOutputStream bytes = new java.io.ByteArrayOutputStream();
            byte[] buffer = new byte[8192];
            int count;
            while ((count = stream.read(buffer)) != -1) bytes.write(buffer, 0, count);
            JSONObject copy = new JSONObject(bytes.toString("UTF-8"));
            assertEquals("Apply the principle", copy.getString("Apply the principle"));
            assertTrue("Checked learning copy is missing", copy.length() > 1000);
        }
    }
    @Test
    public void nativeBootAuthAndStorageSurviveRecreation() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            awaitTrue(scenario, "Boolean(window.Capacitor && window.Capacitor.isNativePlatform() && document.querySelector('#root')?.children.length)");
            evaluate(scenario, "history.pushState({}, '', '/auth'); window.dispatchEvent(new PopStateEvent('popstate')); true");
            awaitTrue(scenario, "Boolean(document.querySelector('input[type=email]') && document.querySelector('input[type=password]'))");
            evaluate(scenario, "localStorage.setItem('learning-device-smoke', 'retained'); true");
            scenario.recreate();
            awaitTrue(scenario, "Boolean(window.Capacitor && document.querySelector('#root')?.children.length)");
            assertEquals("\"retained\"", evaluate(scenario, "localStorage.getItem('learning-device-smoke')"));
            evaluate(scenario, "localStorage.removeItem('learning-device-smoke'); true");
            assertEquals("true", evaluate(scenario, "location.hostname === 'localhost'"));
        }
    }
    /**
     * Offline storage acceptance for the native WebView: reader progress and
     * typography preferences must survive an Android activity recreation.
     * This does not assert that auth-protected lessons work without login.
     */
    @Test
    public void localReaderProgressAndPreferencesSurviveOfflineRecreation() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            awaitTrue(scenario, "Boolean(window.Capacitor && window.Capacitor.isNativePlatform() && document.querySelector('#root')?.children.length)");
            evaluate(scenario, "localStorage.setItem('mariners-book:regulation-page:instrumentation', 'chapter-2'); localStorage.setItem('mariners-book:reader-font-scale', '1.2'); true");
            scenario.recreate();
            awaitTrue(scenario, "Boolean(window.Capacitor && window.Capacitor.isNativePlatform() && document.querySelector('#root')?.children.length)");
            assertEquals("\"chapter-2\"", evaluate(scenario, "localStorage.getItem('mariners-book:regulation-page:instrumentation')"));
            assertEquals("\"1.2\"", evaluate(scenario, "localStorage.getItem('mariners-book:reader-font-scale')"));
            evaluate(scenario, "localStorage.removeItem('mariners-book:regulation-page:instrumentation'); localStorage.removeItem('mariners-book:reader-font-scale'); true");
        }
    }

}
