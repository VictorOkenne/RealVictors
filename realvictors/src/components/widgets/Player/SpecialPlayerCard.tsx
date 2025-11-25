/**
 * SpecialPlayerCard Component
 *
 * FIFA-style player card displaying overall rating, position, stats, and player image
 * Works for both Soccer and Basketball
 */

import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { CardType, PlayerCardBadge } from '../../backgrounds';
import { DefaultSilhouetteSVG } from '../../icons';

interface StatItem {
  label: string;
  value: number;
}

interface SpecialPlayerCardProps {
  overallRating: number; // 0-100
  position: string; // e.g., "ST", "PG"
  playerName: string; // e.g., "LUKAKU"
  countryFlag?: ImageSourcePropType; // Optional country flag
  teamLogo?: ImageSourcePropType; // Optional team logo
  playerImage?: ImageSourcePropType; // Player photo
  stats: StatItem[]; // 6 stats to display
  sportType?: 'soccer' | 'basketball';
  accentColor?: string;
  cardType?: CardType; // Badge color type: gold, silver, bronze, rare, common
}

export const SpecialPlayerCard: React.FC<SpecialPlayerCardProps> = ({
  overallRating,
  position,
  playerName,
  countryFlag,
  teamLogo,
  playerImage,
  stats,
  sportType = 'soccer',
  accentColor = COLORS.goldAccent,
  cardType = 'gold',
}) => {
  // Split stats into two columns (3 each)
  const leftStats = stats.slice(0, 3);
  const rightStats = stats.slice(3, 6);

  // Determine text color based on card type
  const isSpecialCard = cardType === 'blackGold' || cardType === 'eliteGold';
  const textColor = cardType === 'blackGold'
    ? COLORS.goldAccentLight
    : cardType === 'eliteGold'
    ? COLORS.goldAccent
    : COLORS.black;
  const borderColor = cardType === 'blackGold'
    ? COLORS.goldAccentLight
    : cardType === 'eliteGold'
    ? COLORS.goldAccent
    : 'rgb(0, 0, 0)';

  // Calculate dynamic font size based on name length
  // Base font size is 28, scales down for longer names
  // Assuming average card width of ~300px (accounting for padding)
  // Each character in uppercase with letter spacing takes approximately 18-20px at 28px font
  const calculateFontSize = (name: string): number => {
    const baseFontSize = 28;
    const minFontSize = 16;
    const maxNameLength = 12; // Names longer than this will scale down
    const nameLength = name.length;
    
    if (nameLength <= maxNameLength) {
      return baseFontSize;
    }
    
    // Scale down proportionally for longer names
    // Formula: baseFontSize * (maxNameLength / nameLength)
    // But ensure we don't go below minFontSize
    const calculatedSize = baseFontSize * (maxNameLength / nameLength);
    return Math.max(calculatedSize, minFontSize);
  };

  const nameFontSize = calculateFontSize(playerName.toUpperCase());

  return (
    <View style={styles.container}>
      {/* FIFA-style Badge Background */}
      <PlayerCardBadge cardType={cardType} />

      {/* Card Content - Layered on top */}
      <View style={styles.cardContent}>

          {/* Top Section: Rating, Position, Flag, Player Image */}
          <View style={styles.topSection}>
            {/* Left Side: Rating, Position, Flag */}
            <View style={styles.leftInfo}>
              <Text style={[styles.overallRating, { color: textColor }]}>{overallRating}</Text>
              <Text style={[styles.position, { color: textColor }]}>{position}</Text>
              {countryFlag && (
                <Image source={countryFlag} style={styles.countryFlag} resizeMode="cover" />
              )}
              {teamLogo && (
                <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
              )}
            </View>

            {/* Right Side: Player Image */}
            <View style={styles.playerImageContainer}>
              {playerImage ? (
                <Image source={playerImage} style={styles.playerImage} resizeMode="contain" />
              ) : (
                <View style={styles.placeholderImage}>
                  <DefaultSilhouetteSVG width={150} height={190} />
                </View>
              )}
            </View>
          </View>

          {/* Player Name */}
          <View style={[styles.nameSection, { borderColor }]}>
            <Text 
              style={[
                styles.playerName, 
                { 
                  color: textColor,
                  fontSize: nameFontSize,
                  lineHeight: nameFontSize * 1.15, // Scale line height with font size
                }
              ]}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.6}
              numberOfLines={2}
            >
              {playerName.toUpperCase()}
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            {/* Left Column */}
            <View style={styles.statsColumn}>
              {leftStats.map((stat, index) => (
                <View key={index} style={styles.statRow}>
                  <Text style={[styles.statValue, { color: textColor }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: textColor }]}>{stat.label.toUpperCase()}</Text>
                </View>
              ))}
            </View>

            {/* Divider */}
            <View style={[styles.statsDivider, { backgroundColor: textColor }]} />

            {/* Right Column */}
            <View style={styles.statsColumn}>
              {rightStats.map((stat, index) => (
                <View key={index} style={styles.statRow}>
                  <Text style={[styles.statValue, { color: textColor }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: textColor }]}>{stat.label.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 544 / 867, // Maintain FIFA card proportions
    maxHeight: 500,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 20,
  },
  topSection: {
    flexDirection: 'row',
    height: '52%',
    marginBottom: 0,
  },
  leftInfo: {
    width: 80,
    paddingTop: 40,
    gap: 2,
    zIndex: 10,
  },
  overallRating: {
    fontFamily: COLORS.black,
    fontSize: 52,
    color: '#493D0E',
    lineHeight: 50,
    textAlign: 'center',
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 22,
    color: COLORS.black,
    lineHeight: 24,
    textAlign: 'center',
  },
  countryFlag: {
    width: 50,
    height: 32,
    marginTop: 6,
    alignSelf: 'center',
    borderRadius: 2,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 8,
    alignSelf: 'center',
  },
  playerImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
    marginTop: -5,
  },
  playerImage: {
    width: '120%',
    height: '95%',
    position: 'absolute',
    bottom: 0,
  },
  placeholderImage: {
    width: 150,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.3,
  },
  nameSection: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
    marginBottom: 8,
    minHeight: 50, // Ensure enough space for 2 lines if needed
    justifyContent: 'center',
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 28, // Base size, will be overridden by dynamic calculation
    color: '#493D0E',
    textAlign: 'center',
    letterSpacing: 1.5,
    // lineHeight is calculated dynamically based on fontSize
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  statsColumn: {
    flex: 1,
    gap: 6,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 20,
    color: '#493D0E',
    width: 32,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: '#493D0E',
    letterSpacing: 0.5,
  },
  statsDivider: {
    width: 2,
    backgroundColor: '#493D0E',
    opacity: 0.3,
  },
});

export default SpecialPlayerCard;
