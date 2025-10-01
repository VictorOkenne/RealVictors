/**
 * Theme Color Hook
 * 
 * A custom hook that provides theme-aware color selection.
 * Automatically returns the appropriate color based on the current
 * color scheme (light or dark mode).
 * 
 * Features:
 * - Automatic theme detection
 * - Fallback to default theme colors
 * - Support for custom color overrides
 * - Type-safe color selection
 * 
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * useThemeColor Hook
 * 
 * Returns the appropriate color based on the current theme.
 * @param props Object with optional light and dark color overrides
 * @param colorName Name of the color from the theme constants
 * @returns The appropriate color string for the current theme
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get current color scheme, defaulting to 'light'
  const theme = useColorScheme() ?? 'light';
  // Check if custom color is provided for current theme
  const colorFromProps = props[theme];

  // Return custom color if provided, otherwise use theme default
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
