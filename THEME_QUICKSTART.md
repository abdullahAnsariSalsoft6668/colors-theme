# 🎨 Zero-Boilerplate Theme System - Quick Start

## ✨ What You Got

A production-ready theming system that requires **ZERO setup** in your components. No Context, no Provider, no hooks!

## 🚀 Usage (It's This Simple)

```tsx
import { colors } from './src/theme';

function MyComponent() {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello World</Text>
    </View>
  );
}
```

That's it! No setup, no providers, no hooks. Just import and use.

## 🎯 Features

- ✅ Automatic Light/Dark mode (follows system)
- ✅ Auto-generated dark theme
- ✅ TypeScript support
- ✅ Zero boilerplate
- ✅ Production ready

## 📝 Customize Your Colors

Edit `src/theme/theme.config.ts`:

```typescript
export default {
  primary: '#4F46E5',      // Your brand color
  secondary: '#EC4899',    // Your secondary color
  background: '#FFFFFF',   // Background color
  text: '#111827',         // Text color
  // ... more colors
};
```

Dark theme is **automatically generated**! But you can override:

```typescript
export default {
  light: {
    primary: '#4F46E5',
    background: '#FFFFFF',
  },
  dark: {
    primary: '#6366F1',    // Custom dark primary
    background: '#000000', // Custom dark background
  },
};
```

## 🧪 Test It

1. Run your app
2. Toggle system dark mode (Settings → Display)
3. Watch colors change automatically!

## 📚 Documentation

- **Full Guide:** `src/theme/README.md`
- **Examples:** `src/theme/example.tsx`
- **Testing:** `src/theme/TESTING.md`
- **Implementation:** `src/theme/IMPLEMENTATION.md`

## 🎨 Available Colors

```typescript
colors.primary
colors.secondary
colors.background
colors.surface
colors.text
colors.textSecondary
colors.border
colors.error
colors.success
colors.warning
colors.info
```

## 💡 Pro Tips

### Get Current Theme

```tsx
import { getColorScheme } from './src/theme';

const isDark = getColorScheme() === 'dark';
```

### Subscribe to Changes

```tsx
import { subscribeToThemeChanges } from './src/theme';

useEffect(() => {
  const unsubscribe = subscribeToThemeChanges(() => {
    console.log('Theme changed!');
  });
  return unsubscribe;
}, []);
```

## 🚫 What You DON'T Need

- ❌ No `<ThemeProvider>`
- ❌ No `useTheme()` hook
- ❌ No `useColorScheme()` hook
- ❌ No wrapper components
- ❌ No context setup

## 📦 File Structure

```
/src/theme/
 ├─ theme.config.ts   ← Edit colors here
 ├─ colors.ts         ← Internal logic (don't touch)
 ├─ index.ts          ← Public exports
 ├─ example.tsx       ← Usage examples
 └─ *.md              ← Documentation
```

## 🎉 That's It!

You now have a professional theming system that "just works". 

**Import once. Use everywhere. Zero boilerplate.**

---

**Questions?** Check `src/theme/README.md` for detailed documentation.

**Issues?** Check `src/theme/TESTING.md` for troubleshooting.

**Examples?** Check `src/theme/example.tsx` for patterns.
