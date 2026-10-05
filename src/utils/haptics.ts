type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

export const isHapticsEnabled = (): boolean => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return true;
  }
  const val = localStorage.getItem('vibration_enabled');
  if (val === null) {
    localStorage.setItem('vibration_enabled', 'true');
    return true;
  }
  return val !== 'false';
};

export const setHapticsEnabled = (enabled: boolean): void => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem('vibration_enabled', enabled ? 'true' : 'false');
  }
};

const vibrate = (pattern: number | number[] = 40): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  if (!isHapticsEnabled()) {
    return false;
  }
  if (!('vibrate' in navigator) || typeof navigator.vibrate !== 'function') {
    return false;
  }
  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
};

export const hapticFeedback = {
  light: (): boolean => vibrate(40),
  medium: (): boolean => vibrate(40),
  heavy: (): boolean => vibrate(40),
  selection: (): boolean => vibrate(40),
  success: (): boolean => vibrate(40),
  warning: (): boolean => vibrate(40),
  error: (): boolean => vibrate(40),
  trigger: (type: HapticType = 'light'): boolean => {
    switch (type) {
      case 'light': return hapticFeedback.light();
      case 'medium': return hapticFeedback.medium();
      case 'heavy': return hapticFeedback.heavy();
      case 'selection': return hapticFeedback.selection();
      case 'success': return hapticFeedback.success();
      case 'warning': return hapticFeedback.warning();
      case 'error': return hapticFeedback.error();
      default: return hapticFeedback.light();
    }
  }
};

export default hapticFeedback;
