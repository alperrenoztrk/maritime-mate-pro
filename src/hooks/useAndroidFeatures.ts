import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useAndroidFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());

    if (Capacitor.isNativePlatform()) {
      // Status bar configuration
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#1e40af' });

      // Keyboard listeners
      let keyboardWillShowListener: any;
      let keyboardWillHideListener: any;

      const setupListeners = async () => {
        keyboardWillShowListener = await Keyboard.addListener('keyboardWillShow', () => {
          setKeyboardVisible(true);
        });

        keyboardWillHideListener = await Keyboard.addListener('keyboardWillHide', () => {
          setKeyboardVisible(false);
        });

        // NOTE: The Android hardware back button is intentionally NOT handled here.
        // It is owned exclusively by `useNavigationHierarchy` so the two layers
        // never race on the history stack (which used to cause the app to exit
        // after two back-presses). Do not re-add a `backButton` listener here.
      };

      setupListeners();

      return () => {
        keyboardWillShowListener?.remove();
        keyboardWillHideListener?.remove();
      };
    }
  }, []);

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      await Haptics.impact({ style });
    }
  };

  const hideKeyboard = async () => {
    if (isNative) {
      await Keyboard.hide();
    }
  };

  return {
    isNative,
    keyboardVisible,
    triggerHaptic,
    hideKeyboard
  };
};