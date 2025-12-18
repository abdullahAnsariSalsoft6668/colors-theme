/**
 * Theme Module - Public API
 * 
 * Usage:
 * import { colors } from '@/theme';
 * 
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.text }}>Hello World</Text>
 * </View>
 */

export { colors, getColorScheme, subscribeToThemeChanges } from './colors';
export type { ThemeColors } from './theme.config';
