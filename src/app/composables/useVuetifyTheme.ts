import {computed, ref, onMounted} from 'vue';
import {useTheme} from 'vuetify';

export function useVuetifyTheme() {
  const theme = useTheme();
  const currentMode = ref<'light' | 'dark' | 'system'>('system');

  const initializeThemeMode = () => {
    const savedTheme = localStorage.getItem('theme-mode') as
      | 'light'
      | 'dark'
      | 'system';
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      currentMode.value = savedTheme;
      if (savedTheme !== 'system') {
        theme.global.name.value = savedTheme;
      }
    }
  };

  onMounted(() => {
    initializeThemeMode();
  });

  const isDark = computed(() => theme.current.value.dark);
  const isLight = computed(() => !theme.current.value.dark);

  const toggleTheme = () => {
    switch (currentMode.value) {
      case 'light':
        currentMode.value = 'dark';
        theme.global.name.value = 'dark';
        break;
      case 'dark':
        currentMode.value = 'system';
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        theme.global.name.value = prefersDark ? 'dark' : 'light';
        break;
      case 'system':
        currentMode.value = 'light';
        theme.global.name.value = 'light';
        break;
    }
    localStorage.setItem('theme-mode', currentMode.value);
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    currentMode.value = mode;
    if (mode !== 'system') {
      theme.global.name.value = mode;
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      theme.global.name.value = prefersDark ? 'dark' : 'light';
    }
    localStorage.setItem('theme-mode', mode);
  };

  const getThemeIcon = () => {
    switch (currentMode.value) {
      case 'light':
        return 'mdi-weather-sunny';
      case 'dark':
        return 'mdi-weather-night';
      case 'system':
        return 'mdi-theme-light-dark';
      default:
        return 'mdi-theme-light-dark';
    }
  };

  const getThemeLabel = () => {
    switch (currentMode.value) {
      case 'light':
        return 'حالت روشن';
      case 'dark':
        return 'حالت تاریک';
      case 'system':
        return 'حالت سیستم';
      default:
        return 'نامشخص';
    }
  };

  return {
    theme,
    currentMode,
    isDark,
    isLight,
    toggleTheme,
    setThemeMode,
    getThemeIcon,
    getThemeLabel
  };
}
