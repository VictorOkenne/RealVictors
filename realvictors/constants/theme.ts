/**
 * Theme Constants
 * 
 * Defines the color scheme and typography for the RealVictors app.
 * Provides light and dark mode support with platform-specific font configurations.
 * 
 * Color Strategy:
 * - High contrast for accessibility
 * - Athletic/minimalist aesthetic
 * - Gold accent color for brand identity
 * - Sport-specific color coding
 * 
 * Alternative styling solutions:
 * - [Nativewind](https://www.nativewind.dev/) - Tailwind CSS for React Native
 * - [Tamagui](https://tamagui.dev/) - Universal UI system
 * - [unistyles](https://reactnativeunistyles.vercel.app) - Type-safe styling
 */

import { Platform } from 'react-native';

// Tint colors for navigation and interactive elements
const tintColorLight = '#0a7ea4'; // Blue tint for light mode
const tintColorDark = '#fff';     // White tint for dark mode

/**
 * Color palette for light and dark themes
 * Optimized for sports social platform with high contrast and accessibility
 */
export const Colors = {
  light: {
    text: '#11181C',           // Dark text for light backgrounds
    background: '#fff',        // Pure white background
    tint: tintColorLight,      // Blue accent for interactive elements
    icon: '#687076',          // Medium gray for icons
    tabIconDefault: '#687076', // Default tab icon color
    tabIconSelected: tintColorLight, // Selected tab icon color
  },
  dark: {
    text: '#ECEDEE',          // Light text for dark backgrounds
    background: '#151718',    // Dark background
    tint: tintColorDark,      // White accent for interactive elements
    icon: '#9BA1A6',         // Light gray for icons
    tabIconDefault: '#9BA1A6', // Default tab icon color
    tabIconSelected: tintColorDark, // Selected tab icon color
  },
};

/**
 * Platform-specific font configurations
 * Provides optimal typography for each platform while maintaining consistency
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS system fonts using UIFontDescriptorSystemDesign */
    sans: 'system-ui',        // Default system font
    serif: 'ui-serif',        // Serif system font
    rounded: 'ui-rounded',    // Rounded system font
    mono: 'ui-monospace',     // Monospace system font
  },
  default: {
    /** Fallback fonts for Android and other platforms */
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    /** Web font stack with fallbacks for cross-browser compatibility */
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
