# Zero-Boilerplate Color Theming System

A production-ready, library-like theming system for React Native with **zero boilerplate** in your components.

## ✨ Features

- ✅ **No React Context** - Direct object access
- ✅ **No Provider** - No wrapper components needed
- ✅ **No Hooks** - Works with plain styles
- ✅ **Automatic Light/Dark Mode** - Uses React Native Appearance API
- ✅ **Auto-Generated Dark Theme** - Smart color inversion
- ✅ **TypeScript Support** - Full type safety
- ✅ **Production Ready** - Clean, maintainable code

## 🚀 Quick Start

### 1. Define Your Colors (Once)

Edit `src/theme/theme.config.ts`:

```typescript
export default {
  primary: '#4F46E5',
  secondary: '#EC4899',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};
```

### 2. Use Anywhere (No Setup Required)

```tsx
import { colors } from '@/theme';

function MyComponent() {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello World</Text>
    </View>
  );
}
```

That's it! No providers, no hooks, no context.

## 📖 Usage Examples

### Basic Usage

```tsx
import { colors } from '@/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
  },
});
```

### Inline Styles

```tsx
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.text }}>Themed Text</Text>
</View>
```

### Dynamic Styles

```tsx
const buttonStyle = {
  backgroundColor: isActive ? colors.primary : colors.surface,
  borderColor: colors.border,
};
```

## 🎨 Advanced Configuration

### Custom Dark Theme

You can override specific colors for dark mode:

```typescript
// theme.config.ts
export default {
  light: {
    primary: '#4F46E5',
    background: '#FFFFFF',
    text: '#111827',
  },
  dark: {
    primary: '#6366F1',      // Custom dark primary
    background: '#000000',   // Custom dark background
    text: '#F9FAFB',        // Custom dark text
  },
};
```

### Adding Custom Colors

Simply add new properties to your theme config:

```typescript
export type ThemeColors = {
  primary: string;
  background: string;
  text: string;
  // Add your custom colors
  accent: string;
  cardBackground: string;
  highlight: string;
};

export default {
  primary: '#4F46E5',
  background: '#FFFFFF',
  text: '#111827',
  accent: '#8B5CF6',
  cardBackground: '#F3F4F6',
  highlight: '#FEF3C7',
};
```

## 🔧 Utility Functions

### Get Current Color Scheme

```tsx
import { getColorScheme } from '@/theme';

const isDark = getColorScheme() === 'dark';
```

### Subscribe to Theme Changes

```tsx
import { subscribeToThemeChanges } from '@/theme';

useEffect(() => {
  const unsubscribe = subscribeToThemeChanges(() => {
    console.log('Theme changed!');
    // Force re-render or update state
  });
  
  return unsubscribe;
}, []);
```

> **Note:** Most components don't need this as React Native automatically re-renders on appearance changes.

## 🧠 How It Works

### 1. Proxy Pattern

The `colors` object uses JavaScript Proxy to dynamically return colors based on the current system appearance:

```typescript
export const colors = new Proxy({} as ThemeColors, {
  get(_target, prop: string) {
    const currentColors = manager.getColors();
    return currentColors[prop as keyof ThemeColors];
  },
});
```

### 2. Appearance API

Listens to system appearance changes:

```typescript
Appearance.addChangeListener(({ colorScheme }) => {
  // Update internal state
  // Notify subscribers
});
```

### 3. Auto-Generated Dark Colors

Smart algorithms generate dark theme colors:

- **Backgrounds**: Darkened significantly (92% darker)
- **Text**: Lightened significantly (90% lighter)
- **Borders**: Adjusted to 30% brightness
- **Accent Colors**: Slightly adjusted based on luminance

## 📁 File Structure

```
/src/theme/
 ├─ theme.config.ts   # USER DEFINES COLORS HERE
 ├─ colors.ts         # Internal logic (library-like)
 ├─ index.ts          # Public exports
 └─ README.md         # Documentation
```

## 🎯 Design Principles

1. **Zero Boilerplate** - No setup in consuming components
2. **Library-Like** - Behaves like a third-party package
3. **Type Safe** - Full TypeScript support
4. **Performance** - No unnecessary re-renders
5. **Developer Experience** - Simple, intuitive API

## 🚫 What This System Does NOT Use

- ❌ React Context
- ❌ Provider components
- ❌ Hooks in consuming components
- ❌ Theme wrappers
- ❌ Complex setup

## 🔄 Comparison with Traditional Approaches

### Traditional (Context-Based)

```tsx
// Setup required
<ThemeProvider>
  <App />
</ThemeProvider>

// Every component needs hook
function MyComponent() {
  const theme = useTheme(); // Hook required!
  return <View style={{ backgroundColor: theme.colors.background }} />;
}
```

### This System (Zero-Boilerplate)

```tsx
// No setup required!
<App />

// Direct usage
function MyComponent() {
  return <View style={{ backgroundColor: colors.background }} />;
}
```

## 🐛 Troubleshooting

### Colors not updating on theme change?

React Native automatically re-renders components when appearance changes. If you're experiencing issues:

1. Make sure you're using React Native 0.62+
2. Test on a physical device (simulators can be buggy)
3. Try toggling dark mode in system settings

### TypeScript errors?

Make sure your custom colors are added to the `ThemeColors` type in `theme.config.ts`.

### Want to force a re-render?

```tsx
const [, forceUpdate] = useReducer(x => x + 1, 0);

useEffect(() => {
  return subscribeToThemeChanges(forceUpdate);
}, []);
```

## 📝 License

This theming system is part of your React Native application.

## 🤝 Contributing

To modify the theming system:

1. Edit color generation logic in `colors.ts`
2. Add new colors in `theme.config.ts`
3. Export utilities in `index.ts`

---

**Built with ❤️ for React Native developers who hate boilerplate.**
