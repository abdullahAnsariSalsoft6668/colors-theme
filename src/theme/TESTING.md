# Testing Guide for Zero-Boilerplate Theme System

This guide helps you verify that the theme system works correctly in your React Native app.

## 🧪 Manual Testing Checklist

### 1. Light Mode Testing

**iOS:**
1. Open Settings → Display & Brightness
2. Select "Light"
3. Open your app
4. Verify all colors match your light theme configuration

**Android:**
1. Open Settings → Display → Dark theme
2. Turn OFF dark theme
3. Open your app
4. Verify all colors match your light theme configuration

### 2. Dark Mode Testing

**iOS:**
1. Open Settings → Display & Brightness
2. Select "Dark"
3. Open your app
4. Verify all colors are inverted/darkened appropriately

**Android:**
1. Open Settings → Display → Dark theme
2. Turn ON dark theme
3. Open your app
4. Verify all colors are inverted/darkened appropriately

### 3. Dynamic Theme Switching

**iOS:**
1. With your app open and visible
2. Swipe down Control Center
3. Long-press the brightness slider
4. Toggle between Light and Dark appearance
5. **Expected:** App colors should update immediately without restart

**Android:**
1. With your app open and visible
2. Pull down notification shade
3. Toggle Dark theme quick setting
4. **Expected:** App colors should update immediately without restart

### 4. Automatic Theme (System Default)

**iOS:**
1. Settings → Display & Brightness → Automatic
2. Set schedule or use Light Sensor
3. Wait for automatic switch
4. **Expected:** App follows system theme automatically

**Android:**
1. Settings → Display → Dark theme → Schedule
2. Set schedule (e.g., Sunset to Sunrise)
3. Wait for automatic switch
4. **Expected:** App follows system theme automatically

## 🔍 Visual Inspection Checklist

When testing, verify these elements update correctly:

- [ ] Background colors (should darken in dark mode)
- [ ] Text colors (should lighten in dark mode)
- [ ] Border colors (should adjust contrast)
- [ ] Card/Surface backgrounds (should be darker than main background in dark mode)
- [ ] Primary/Secondary colors (should remain vibrant but adjusted)
- [ ] Status colors (success, error, warning, info)
- [ ] Shadows (should be visible in light mode, subtle in dark mode)

## 🐛 Common Issues & Solutions

### Issue: Colors don't update when switching themes

**Possible Causes:**
1. App needs to be restarted
2. React Native version too old (< 0.62)
3. Simulator/Emulator bug

**Solutions:**
1. Test on physical device
2. Force close and reopen app
3. Update React Native to latest version
4. Check if `Appearance` API is available:
   ```tsx
   import { Appearance } from 'react-native';
   console.log('Current scheme:', Appearance.getColorScheme());
   ```

### Issue: Some colors look wrong in dark mode

**Solution:**
Override specific colors in `theme.config.ts`:

```typescript
export default {
  light: {
    primary: '#4F46E5',
    background: '#FFFFFF',
    text: '#111827',
  },
  dark: {
    primary: '#6366F1',      // Custom override
    background: '#000000',   // Custom override
    text: '#F9FAFB',        // Custom override
  },
};
```

### Issue: TypeScript errors when accessing colors

**Solution:**
Make sure your color names are defined in the `ThemeColors` type:

```typescript
export type ThemeColors = {
  primary: string;
  background: string;
  text: string;
  // Add your custom colors here
  myCustomColor: string;
};
```

## 📱 Device-Specific Testing

### iOS Simulator
```bash
# Toggle appearance via command line
xcrun simctl ui booted appearance dark
xcrun simctl ui booted appearance light
```

### Android Emulator
```bash
# Toggle dark mode via adb
adb shell "cmd uimode night yes"
adb shell "cmd uimode night no"
```

## 🧩 Integration Testing

### Test 1: Basic Color Access

```tsx
import { colors } from '@/theme';

// Should not throw errors
console.log('Primary:', colors.primary);
console.log('Background:', colors.background);
console.log('Text:', colors.text);
```

### Test 2: Theme Change Detection

```tsx
import { subscribeToThemeChanges, getColorScheme } from '@/theme';

useEffect(() => {
  console.log('Initial scheme:', getColorScheme());
  
  const unsubscribe = subscribeToThemeChanges(() => {
    console.log('Theme changed to:', getColorScheme());
  });
  
  return unsubscribe;
}, []);
```

### Test 3: Style Application

```tsx
import { colors } from '@/theme';

const TestComponent = () => (
  <View style={{ backgroundColor: colors.background }}>
    <Text style={{ color: colors.text }}>
      If you can read this, styles are working!
    </Text>
  </View>
);
```

## 📊 Performance Testing

### Memory Leaks Check

1. Open React Native Debugger
2. Take heap snapshot
3. Toggle theme 10 times
4. Take another heap snapshot
5. Compare - should not show significant memory increase

### Re-render Performance

```tsx
import { useEffect, useRef } from 'react';

function PerformanceTest() {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log('Render count:', renderCount.current);
  });
  
  return <Text style={{ color: colors.text }}>Renders: {renderCount.current}</Text>;
}
```

**Expected:** Component should only re-render when theme actually changes, not on every access to `colors`.

## ✅ Acceptance Criteria

Your theme system is working correctly if:

1. ✅ Colors display correctly in light mode
2. ✅ Colors display correctly in dark mode
3. ✅ Theme switches instantly when system appearance changes
4. ✅ No console errors or warnings
5. ✅ No TypeScript errors
6. ✅ No unnecessary re-renders
7. ✅ Works without any Provider or Context setup
8. ✅ Works without hooks in consuming components
9. ✅ All custom colors are accessible via `colors` object
10. ✅ `getColorScheme()` returns correct value

## 🎯 Edge Cases to Test

### 1. App Backgrounding
- Switch theme while app is in background
- Bring app to foreground
- **Expected:** Theme should be updated

### 2. App State Changes
- Minimize app
- Change system theme
- Restore app
- **Expected:** Theme should reflect new system setting

### 3. Multiple Rapid Switches
- Toggle theme 5-10 times quickly
- **Expected:** No crashes, no memory leaks, final state is correct

### 4. Cold Start
- Force quit app
- Change system theme
- Launch app
- **Expected:** App starts with correct theme

## 📝 Test Report Template

```
Date: ___________
Device: ___________
OS Version: ___________
App Version: ___________

Light Mode: ☐ Pass ☐ Fail
Dark Mode: ☐ Pass ☐ Fail
Dynamic Switching: ☐ Pass ☐ Fail
Auto Theme: ☐ Pass ☐ Fail
Performance: ☐ Pass ☐ Fail

Issues Found:
- 
- 

Notes:
- 
- 
```

## 🚀 Automated Testing (Optional)

If you want to add automated tests:

```typescript
// __tests__/theme.test.ts
import { Appearance } from 'react-native';
import { colors, getColorScheme } from '@/theme';

jest.mock('react-native/Libraries/Utilities/Appearance');

describe('Theme System', () => {
  it('should return light colors in light mode', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    expect(colors.background).toBe('#FFFFFF');
  });

  it('should return dark colors in dark mode', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');
    // Colors should be different from light mode
    expect(colors.background).not.toBe('#FFFFFF');
  });

  it('should detect current color scheme', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');
    expect(getColorScheme()).toBe('dark');
  });
});
```

---

**Happy Testing! 🎉**

If you find any issues, check the troubleshooting section or review the implementation in `colors.ts`.
