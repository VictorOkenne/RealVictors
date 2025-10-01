/**
 * App Theme Hook
 * 
 * Custom hook that provides theme-aware colors and styling for the RealVictors app.
 * Automatically adapts to light/dark mode and provides a comprehensive color palette
 * optimized for a sports social platform.
 * 
 * Features:
 * - Automatic light/dark mode detection
 * - Brand-consistent color palette
 * - Sport-specific accent colors
 * - High contrast for athletic/minimalist feel
 * - Accessibility-friendly color choices
 */

import { useColorScheme } from "react-native";
import { COLORS } from "../constants";

/**
 * useAppTheme Hook
 * 
 * Returns theme-aware colors and styling properties.
 * @returns Object containing theme colors and dark mode state
 */
export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    isDark,
    colors: {
      // Primary brand colors - black/white with gold accents for athletic feel
      background: isDark ? COLORS.black : COLORS.white,
      surface: isDark ? COLORS.gray900 : COLORS.white,
      surfaceVariant: isDark ? COLORS.gray800 : COLORS.gray50,

      // Text colors - high contrast for athletic/minimalist feel
      primary: isDark ? COLORS.white : COLORS.black,
      secondary: isDark ? COLORS.gray400 : COLORS.gray600,
      tertiary: isDark ? COLORS.gray500 : COLORS.gray500,
      placeholder: isDark ? COLORS.gray600 : COLORS.gray400,

      // Border colors - subtle but defined for clean UI
      border: isDark ? COLORS.gray700 : COLORS.gray200,
      borderLight: isDark ? COLORS.gray800 : COLORS.gray100,

      // Gold accent colors - signature RealVictors brand color
      gold: COLORS.gold,
      goldDark: COLORS.goldLight,
      goldLight: isDark ? COLORS.gray800 : COLORS.goldLight,

      // Athletic status colors for game states and achievements
      success: COLORS.success,
      successLight: isDark ? COLORS.gray800 : COLORS.gray100,
      warning: COLORS.warning,
      warningLight: isDark ? COLORS.gray800 : COLORS.gray100,
      error: COLORS.error,
      errorLight: isDark ? COLORS.gray800 : COLORS.gray100,

      // Sport-specific accent colors for different sports
      basketball: COLORS.basketball,
      basketballLight: COLORS.basketballLight,
      soccer: COLORS.soccer,
      soccerLight: COLORS.soccerLight,
      tennis: COLORS.tennis,
      tennisLight: COLORS.tennisLight,
      volleyball: COLORS.volleyball,
      volleyballLight: COLORS.volleyballLight,
      hockey: COLORS.hockey,
      hockeyLight: COLORS.hockeyLight,
      baseball: COLORS.baseball,
      baseballLight: COLORS.baseballLight,

      // Social/rating colors for interactions
      like: COLORS.error,
      star: COLORS.gold,

      // Legacy colors for compatibility with existing components
      orange: COLORS.basketball,
      orangeLight: COLORS.basketballLight,
      blue: COLORS.tennis,
      blueLight: COLORS.tennisLight,
      green: COLORS.soccer,
      greenLight: COLORS.soccerLight,
      yellow: COLORS.gold,
      yellowLight: COLORS.goldLight,
      yellowStar: COLORS.gold,
      purple: isDark ? COLORS.gray600 : COLORS.gray300,
      pink: COLORS.volleyball,
      pinkVariant: COLORS.volleyball,

      // Profile specific colors for user profiles
      profileGreen: COLORS.soccerLight,
      profileBlue: COLORS.tennisLight,
      profileOrange: COLORS.basketballLight,
    },
  };
};

