/**
 * Theme Configuration
 * 
 * Define your light theme colors here.
 * Dark theme will be auto-generated if not provided.
 * 
 * You can optionally provide dark overrides:
 * 
 * export default {
 *   light: {
 *     primary: "#4F46E5",
 *     background: "#FFFFFF",
 *   },
 *   dark: {
 *     primary: "#6366F1",
 *     background: "#000000",
 *   }
 * };
 */

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
};

const themeConfig = {
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

export default themeConfig;
