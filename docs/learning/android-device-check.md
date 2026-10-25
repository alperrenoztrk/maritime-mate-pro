# Android device acceptance

The `Android learning smoke` workflow builds an isolated native bundle and exercises the actual Capacitor WebView on an API 35 emulator with device Wi-Fi and mobile data disabled. It preserves JUnit/HTML evidence and a debug APK. Tests cover packaged learning copy, native bridge boot, auth-screen navigation and local storage across activity recreation. No real account, production backend, release signing or deployment is used.

Emulator coverage is distinct from physical-device sign-off. This workspace has no connected Android device, Android SDK, USB bus or KVM device. Browser viewport tests do not establish Android/WebView behavior.

Run the same instrumentation on a dedicated connected test device with Android SDK and Java 21:

```sh
npm ci
VITE_SUPABASE_URL=https://example.supabase.co VITE_SUPABASE_PUBLISHABLE_KEY=public-test-key VITE_ADS_ENABLED=false npm run build:native
npx cap sync android
./android/gradlew -p android installDebug
adb shell pm grant com.marinersbook.app android.permission.ACCESS_COARSE_LOCATION
adb shell pm grant com.marinersbook.app android.permission.ACCESS_FINE_LOCATION
./android/gradlew -p android connectedDebugAndroidTest
```

Disable device networking before execution for an offline run. The two permission commands grant foreground location on the dedicated test device so the home weather prompt cannot pause activity recreation. They do not test permission denial or grant flows. The test launches the app and temporarily writes/removes `learning-device-smoke` in localStorage; it does not clear app data or sign users out. Review `app/build/reports/androidTests/connected/debug/index.html`.

For physical release acceptance, record model, Android version, WebView provider/version and app commit, then verify:

- Cold start and restart, including offline startup after a prior successful login.
- Learning map → course → module → topic, hardware back and rapid repeated navigation.
- Applied example, incorrect answer, taught review and unchanged first-attempt score.
- Progress after process restart and isolation between two authorized test accounts.
- Two-device progress merging, offline edits and recovery after reconnection.
- Keyboard, rotation, accessibility text scaling and scrolling without clipped controls.

Physical acceptance remains pending until actually performed and evidence recorded. The isolated instrumentation does not test a production sign-in or cross-device synchronization.

The first emulator run ([40124374568](https://github.com/alperrenoztrk/maritime-mate-pro/actions/runs/40124374568)) passed the packaged-copy assertion, but activity recreation was blocked by the system location-permission dialog. Logcat confirmed `GrantPermissionsActivity`. The workflow now establishes the explicit permission precondition before instrumentation; the rerun result will be recorded after completion.
