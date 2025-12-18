/**
 * Zero-Boilerplate Color Theming System
 * 
 * This module provides automatic light/dark mode support without:
 * - React Context
 * - Provider components
 * - Hooks in consuming components
 * 
 * Uses Proxy pattern to dynamically return colors based on system appearance.
 */

import { Appearance, AppState, type ColorSchemeName } from 'react-native';
import themeConfig, { type ThemeColors } from './theme.config';

type ThemeConfig = ThemeColors | {
  light: Partial<ThemeColors>;
  dark?: Partial<ThemeColors>;
};

/**
 * Converts hex color to RGB components
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate relative luminance
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Auto-generate dark theme color from light color
 */
function generateDarkColor(lightColor: string, colorKey: string): string {
  const rgb = hexToRgb(lightColor);
  if (!rgb) return lightColor;

  const luminance = getLuminance(lightColor);

  // Background colors: darken significantly
  if (colorKey.includes('background') || colorKey === 'surface') {
    return rgbToHex(
      Math.max(0, rgb.r * 0.08),
      Math.max(0, rgb.g * 0.08),
      Math.max(0, rgb.b * 0.08)
    );
  }

  // Text colors: lighten significantly
  if (colorKey.includes('text') || colorKey.includes('Text')) {
    return rgbToHex(
      Math.min(255, rgb.r + (255 - rgb.r) * 0.9),
      Math.min(255, rgb.g + (255 - rgb.g) * 0.9),
      Math.min(255, rgb.b + (255 - rgb.b) * 0.9)
    );
  }

  // Border colors: adjust based on luminance
  if (colorKey.includes('border')) {
    return rgbToHex(
      Math.min(255, rgb.r * 0.3),
      Math.min(255, rgb.g * 0.3),
      Math.min(255, rgb.b * 0.3)
    );
  }

  // Accent colors (primary, secondary, error, etc.): slightly adjust
  if (luminance > 0.5) {
    // Light color: darken slightly
    return rgbToHex(
      Math.max(0, rgb.r * 0.85),
      Math.max(0, rgb.g * 0.85),
      Math.max(0, rgb.b * 0.85)
    );
  } else {
    // Dark color: lighten slightly
    return rgbToHex(
      Math.min(255, rgb.r + (255 - rgb.r) * 0.15),
      Math.min(255, rgb.g + (255 - rgb.g) * 0.15),
      Math.min(255, rgb.b + (255 - rgb.b) * 0.15)
    );
  }
}

/**
 * Parse theme configuration and generate light/dark themes
 */
function parseThemeConfig(config: ThemeConfig): {
  light: ThemeColors;
  dark: ThemeColors;
} {
  // Check if config has light/dark structure
  const hasLightDarkStructure = 'light' in config;

  let lightTheme: ThemeColors;
  let darkTheme: Partial<ThemeColors>;

  if (hasLightDarkStructure) {
    lightTheme = config.light as ThemeColors;
    darkTheme = config.dark || {};
  } else {
    lightTheme = config as ThemeColors;
    darkTheme = {};
  }

  // Auto-generate missing dark colors
  const generatedDarkTheme: ThemeColors = {} as ThemeColors;
  
  for (const key in lightTheme) {
    const colorKey = key as keyof ThemeColors;
    generatedDarkTheme[colorKey] = 
      darkTheme[colorKey] || 
      generateDarkColor(lightTheme[colorKey], colorKey);
  }

  return {
    light: lightTheme,
    dark: generatedDarkTheme,
  };
}

/**
 * Color scheme manager
 */
class ColorSchemeManager {
  private currentScheme: ColorSchemeName = 'light';
  private themes: { light: ThemeColors; dark: ThemeColors };
  private listeners: Set<() => void> = new Set();

  constructor(config: ThemeConfig) {
    this.themes = parseThemeConfig(config);
    this.currentScheme = Appearance.getColorScheme();

    // Listen to appearance changes
    Appearance.addChangeListener(this.handleAppearanceChange);
    
    // Listen to app state changes (for when app comes to foreground)
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppearanceChange = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    if (this.currentScheme !== colorScheme) {
      this.currentScheme = colorScheme;
      this.notifyListeners();
    }
  };

  private handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      const newScheme = Appearance.getColorScheme();
      if (this.currentScheme !== newScheme) {
        this.currentScheme = newScheme;
        this.notifyListeners();
      }
    }
  };

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  getColors(): ThemeColors {
    const scheme = this.currentScheme || 'light';
    return this.themes[scheme];
  }

  getCurrentScheme(): ColorSchemeName {
    return this.currentScheme;
  }

  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// Create singleton instance
const manager = new ColorSchemeManager(themeConfig);

/**
 * Reactive colors object using Proxy
 * 
 * This Proxy intercepts property access and returns the current theme color.
 * When the system appearance changes, components using these colors will
 * need to re-render (handled by React Native's internal mechanisms).
 */
export const colors = new Proxy({} as ThemeColors, {
  get(_target, prop: string) {
    const currentColors = manager.getColors();
    return currentColors[prop as keyof ThemeColors];
  },
  
  // Prevent modification
  set() {
    if (__DEV__) {
      console.warn('Theme colors are read-only. Modify theme.config.ts instead.');
    }
    return false;
  },
  
  // Make properties enumerable for debugging
  ownKeys() {
    return Object.keys(manager.getColors());
  },
  
  getOwnPropertyDescriptor(_target, prop) {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

/**
 * Get current color scheme
 * Useful for conditional logic outside of styles
 */
export function getColorScheme(): ColorSchemeName {
  return manager.getCurrentScheme();
}

/**
 * Subscribe to theme changes
 * Returns unsubscribe function
 * 
 * Note: Most components won't need this as React Native
 * automatically re-renders on appearance changes.
 */
export function subscribeToThemeChanges(callback: () => void): () => void {
  return manager.addListener(callback);
}
