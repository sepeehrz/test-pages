# 🎨 سیستم تم Vuetify

این سیستم تم بر اساس Vuetify's built-in theme system ساخته شده و استفاده از آن بسیار ساده است.

## 🚀 نحوه استفاده

### در هر کامپوننت:

```vue
<template>
  <div>
    <v-card :color="isDark ? 'grey-darken-3' : 'grey-lighten-4'">
      <v-card-text>
        <h3>{{ isDark ? 'حالت تاریک' : 'حالت روشن' }}</h3>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import {useVuetifyTheme} from '../composables/useVuetifyTheme';

  // فقط یک خط کد!
  const {isDark, isLight, currentMode, toggleTheme, setThemeMode} =
    useVuetifyTheme();
</script>
```

## 📋 متغیرهای در دسترس

### Computed Values:

- `isDark` - boolean: آیا تم تاریک فعال است؟
- `isLight` - boolean: آیا تم روشن فعال است؟
- `currentMode` - 'light' | 'dark' | 'system': حالت فعلی تم

### Methods:

- `toggleTheme()` - تغییر تم (چرخه: light → dark → system → light)
- `setThemeMode(mode)` - تنظیم مستقیم حالت تم
- `getThemeIcon()` - آیکون مناسب برای حالت فعلی
- `getThemeLabel()` - برچسب فارسی برای حالت فعلی

## 🎯 مثال‌های کاربردی

### 1. تغییر رنگ بر اساس تم:

```vue
<v-card :color="isDark ? 'grey-darken-3' : 'grey-lighten-4'">
```

### 2. نمایش محتوای مختلف:

```vue
<v-icon :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'">
```

### 3. تغییر استایل CSS:

```vue
<div :class="{ 'dark-style': isDark, 'light-style': isLight }">
```

### 4. دکمه تغییر تم:

```vue
<v-btn @click="toggleTheme" :icon="getThemeIcon()">
  {{ getThemeLabel() }}
</v-btn>
```

## 🔧 تنظیمات پیش‌فرض

- **حالت پیش‌فرض**: `system` (پیروی از تنظیمات سیستم)
- **ذخیره‌سازی**: انتخاب کاربر در `localStorage` ذخیره می‌شود
- **پشتیبانی از RTL**: کاملاً سازگار با زبان فارسی

## 🎨 رنگ‌های تم

تم‌ها در فایل `src/app/ui/vuetify/theme.ts` تعریف شده‌اند و شامل:

- **Light Theme**: رنگ‌های روشن و مناسب برای روز
- **Dark Theme**: رنگ‌های تاریک و مناسب برای شب
- **System Theme**: پیروی از تنظیمات سیستم عامل

## 📱 ویژگی‌های خاص

- ✅ **Reactive**: تغییرات فوری در تمام کامپوننت‌ها
- ✅ **Persistent**: ذخیره انتخاب کاربر
- ✅ **System Detection**: تشخیص خودکار تم سیستم
- ✅ **TypeScript Support**: پشتیبانی کامل از TypeScript
- ✅ **RTL Support**: سازگار با زبان فارسی
