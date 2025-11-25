/**
 * PlayerCardBadge Component
 *
 * FIFA-style badge SVG background for player cards
 * Supports different card types: gold, silver, bronze, rare (purple)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop, Mask, Rect, FeFlood, FeBlend, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, Filter } from 'react-native-svg';

export type CardType = 'gold' | 'silver' | 'bronze' | 'common' | 'blackGold' | 'eliteGold';

interface PlayerCardBadgeProps {
  cardType?: CardType;
  width?: number;
  height?: number;
}

const CARD_COLORS = {
  // 80-89: Gold
  gold: {
    primary: '#FEF095',
    secondary: '#D9C875',
    accent: '#DFCE7A',
  },
  // 70-79: Silver
  silver: {
    primary: '#E8E8E8',
    secondary: '#B8B8B8',
    accent: '#C5C5C5',
  },
  // 60-69: Bronze
  bronze: {
    primary: '#CD7F32',
    secondary: '#8B5A2B',
    accent: '#A0642D',
  },
  // Below 60: Dark Gray/Blackish
  common: {
    primary: '#C1C1C1',
    secondary: '#8A8A8A',
    accent: '#A0A0A0',
  },
  // 90-94: Black with Gold accents
  blackGold: {
    primary: '#1C1C1C',
    secondary: '#0A0A0A',
    accent: '#141414',
  },
  // 95-100: Off-White with Gold accents
  eliteGold: {
    primary: '#F5F5F5',
    secondary: '#E0E0E0',
    accent: '#EBEBEB',
  },
};

export const PlayerCardBadge: React.FC<PlayerCardBadgeProps> = ({
  cardType = 'gold',
  width,
  height,
}) => {
  const colors = CARD_COLORS[cardType];

  // Determine if this is a special card that needs gold outline
  const isSpecialCard = cardType === 'blackGold' || cardType === 'eliteGold';
  const goldColor = '#D4AF37'; // Rich gold color

  return (
    <View style={[styles.container, width && height && { width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 544 867" fill="none" preserveAspectRatio="xMidYMid slice">
        <Defs>
          {/* Main gradient */}
          <LinearGradient id="mainGradient" x1="0" y1="0" x2="544" y2="433.5" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={colors.primary} />
            <Stop offset="1" stopColor={colors.secondary} />
          </LinearGradient>

          {/* Bottom gradient */}
          <LinearGradient id="bottomGradient" x1="0" y1="459" x2="272" y2="867" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={colors.accent} />
            <Stop offset="0.389423" stopColor={colors.primary} />
            <Stop offset="0.677083" stopColor={colors.accent} />
            <Stop offset="1" stopColor={colors.secondary} />
          </LinearGradient>

          {/* Filters for depth */}
          <Filter id="badgeFilter" x="-4.25" y="0" width="552.5" height="871.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="4.25"/>
            <FeGaussianBlur stdDeviation="2.125"/>
            <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
            <FeBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </Filter>
        </Defs>

        {/* Main badge shape */}
        <G filter="url(#badgeFilter)">
          <Path
            d="M473.495 45.1126C473.218 42.2358 473.08 40.7973 472.363 39.842C471.646 38.8868 470.43 38.4021 467.997 37.4329C407.372 13.2804 341.237 0 272 0C202.763 0 136.628 13.2804 76.0031 37.4329C73.5702 38.4021 72.3537 38.8868 71.6369 39.8421C70.92 40.7973 70.7817 42.2358 70.5052 45.1126C67.323 78.212 41.3616 104.656 8.4847 108.58C4.25714 109.085 2.14336 109.337 1.07168 110.545C0 111.752 0 113.696 0 117.583V675.558C0 712.883 0 731.546 9.94037 745.038C19.8807 758.53 38.2267 764.223 74.9185 775.607C153.833 800.093 267.395 839.832 272 867C276.605 839.832 390.167 800.093 469.082 775.607C505.773 764.223 524.119 758.53 534.06 745.038C544 731.546 544 712.883 544 675.558V117.583C544 113.696 544 111.752 542.928 110.545C541.857 109.337 539.743 109.085 535.515 108.58C502.638 104.656 476.677 78.212 473.495 45.1126Z"
            fill="url(#mainGradient)"
            stroke={isSpecialCard ? goldColor : 'none'}
            strokeWidth={isSpecialCard ? 6 : 0}
          />
        </G>

        {/* Bottom section */}
        <Path
          d="M0 459V675.558C0 712.883 0 731.546 9.94053 745.038C19.8807 758.53 38.2265 764.223 74.9184 775.607C153.832 800.093 267.395 839.832 272 867C276.605 839.832 390.167 800.093 469.082 775.607C505.774 764.223 524.119 758.53 534.06 745.038C544 731.546 544 712.883 544 675.558V459H0Z"
          fill="url(#bottomGradient)"
          opacity="0.9"
        />

        {/* Decorative patterns - lightning bolt shapes (simplified) */}
        <Mask id="badgeMask">
          <Path
            d="M473.495 45.1126C473.218 42.2358 473.08 40.7973 472.363 39.842C471.646 38.8868 470.43 38.4021 467.997 37.4329C407.372 13.2804 341.237 0 272 0C202.763 0 136.628 13.2804 76.0031 37.4329C73.5702 38.4021 72.3537 38.8868 71.6369 39.8421C70.92 40.7973 70.7817 42.2358 70.5052 45.1126C67.323 78.212 41.3616 104.656 8.4847 108.58C4.25714 109.085 2.14336 109.337 1.07168 110.545C0 111.752 0 113.696 0 117.583V675.558C0 712.883 0 731.546 9.94037 745.038C19.8807 758.53 38.2267 764.223 74.9185 775.607C153.833 800.093 267.395 839.832 272 867C276.605 839.832 390.167 800.093 469.082 775.607C505.773 764.223 524.119 758.53 534.06 745.038C544 731.546 544 712.883 544 675.558V117.583C544 113.696 544 111.752 542.928 110.545C541.857 109.337 539.743 109.085 535.515 108.58C502.638 104.656 476.677 78.212 473.495 45.1126Z"
            fill="white"
          />
        </Mask>

        {/* Subtle shine/gloss on right edge */}
        <G mask="url(#badgeMask)" opacity="0.5">
          <Rect x="539.75" y="110.5" width="5.67" height="348.5" rx="2.83" fill="white" opacity="0.3" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PlayerCardBadge;
