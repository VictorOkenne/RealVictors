/**
 * PlayerRatings Component (Redesigned)
 *
 * Displays skill-based player ratings out of 100
 * - Soccer: Pace, Shooting, Passing, Dribbling, Defending, Physical
 * - Basketball: Inside Shooting, Mid-Range, 3-Point, Playmaking, Defense, Rebounding
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASKETBALL_SKILLS, BasketballSkill, BORDER_RADIUS, COLORS, SHADOWS, SOCCER_SKILLS, SoccerSkill, TYPOGRAPHY } from '../../../constants';
import { CardType } from '../../backgrounds';
import { SpecialPlayerCard } from '../Player/SpecialPlayerCard';

export interface SkillRating {
  skill: SoccerSkill | BasketballSkill;
  rating: number; // 0-100
}

interface PlayerRatingsProps {
  overallRating: number; // Calculated average (0-100)
  skillRatings: SkillRating[]; // 6 skill ratings
  totalReviews?: number;
  sportType?: 'soccer' | 'basketball';
  accentColor?: string;
  onSeeMore?: () => void;
  // Player card props
  playerName?: string;
  position?: string;
  countryFlag?: ImageSourcePropType;
  teamLogo?: ImageSourcePropType;
  playerImage?: ImageSourcePropType;
  cardType?: CardType; // Badge color type: gold, silver, bronze, rare, common
}

export const PlayerRatings: React.FC<PlayerRatingsProps> = ({
  overallRating,
  skillRatings,
  totalReviews,
  sportType = 'soccer',
  accentColor = COLORS.goldAccent,
  onSeeMore,
  playerName = 'PLAYER',
  position = 'N/A',
  countryFlag,
  teamLogo,
  playerImage,
  cardType,
}) => {
  const skills = sportType === 'soccer' ? SOCCER_SKILLS : BASKETBALL_SKILLS;

  // Automatically determine card type based on overall rating if not provided
  const getCardType = (rating: number): CardType => {
    if (rating >= 95) return 'blackGold'; // 95-100: Black with gold
    if (rating >= 90) return 'eliteGold'; // 90-94: Off-white with gold
    if (rating >= 80) return 'gold'; // 80-89: Gold
    if (rating >= 70) return 'silver'; // 70-79: Silver
    if (rating >= 60) return 'bronze'; // 60-69: Bronze
    return 'common'; // Below 60: Dark grayish
  };

  const finalCardType = cardType ?? getCardType(overallRating);

  // Prepare stats for SpecialPlayerCard
  const cardStats = skillRatings.map(sr => {
    // Get abbreviated label based on skill type
    const label = sr.skill === 'insideShooting' ? 'INS'
      : sr.skill === 'midRangeShooting' ? 'MID'
      : sr.skill === 'threePointShooting' ? '3PT'
      : sr.skill === 'playmaking' ? 'PLY'
      : sr.skill === 'defense' ? 'DEF'
      : sr.skill === 'rebounding' ? 'REB'
      : sr.skill === 'pace' ? 'PAC'
      : sr.skill === 'shooting' ? 'SHO'
      : sr.skill === 'passing' ? 'PAS'
      : sr.skill === 'dribbling' ? 'DRI'
      : sr.skill === 'defending' ? 'DEF'
      : sr.skill === 'physical' ? 'PHY'
      : 'N/A';

    return {
      label,
      value: sr.rating,
    };
  });

  // Get rating color based on value
  const getRatingColor = (rating: number): string => {
    if(rating >= 90) return COLORS.goldAccent; // Excellent - Green
    if (rating >= 80) return '#00C851'; // Excellent - Green
    if (rating >= 70) return '#2196F3'; // Good - Blue
    if (rating >= 60) return "#1C1C1C"; // Average - Yellow/Gold
    if (rating >= 50) return '#FF9800'; // Below Average - Orange
    return '#FF4444'; // Poor - Red
  };

  // Render skill rating bar
  const renderSkillBar = (skillRating: SkillRating, index: number) => {
    const skillKey = skillRating.skill as keyof typeof skills;
    const skillInfo = skills[skillKey];
    const ratingColor = getRatingColor(skillRating.rating);

    return (
      <View key={index} style={styles.skillRow}>
        {/* Skill name and rating */}
        <View style={styles.skillInfo}>
          <Text style={styles.skillName}>{skillInfo.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingNumber}>{skillRating.rating}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.barContainer}>
          <View style={styles.barBackground}>
            <LinearGradient
              colors={[ratingColor, `${ratingColor}CC`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: `${skillRating.rating}%` }]}
            />
          </View>
          {/* Percentage text */}
          <Text style={styles.percentageText}>{skillRating.rating}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Player Ratings</Text>
          {totalReviews !== undefined && (
            <Text style={styles.subtitle}>Based on {totalReviews} reviews</Text>
          )}
        </View>
      </View>

      {/* Special Player Card */}
      <SpecialPlayerCard
        overallRating={overallRating}
        position={position}
        playerName={playerName}
        countryFlag={countryFlag}
        teamLogo={teamLogo}
        playerImage={playerImage}
        stats={cardStats}
        sportType={sportType}
        accentColor={accentColor}
        cardType={finalCardType}
      />

      

      {/* See More Button */}
      {onSeeMore && (
        <TouchableOpacity onPress={onSeeMore} style={styles.seeMoreButton}>
         
            <Text style={styles.seeMoreText}>View All Reviews</Text>
          
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: 2,
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 4,
  },
  skillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: 20,
    ...SHADOWS.lg,
  },
  skillsTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  skillsList: {
    gap: 14,
  },
  skillRow: {
    gap: 8,
  },
  skillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillName: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 15,
    color: COLORS.black,
    letterSpacing: -0.2,
  },
  ratingBadge: {
    backgroundColor: COLORS.gray150,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 40,
    alignItems: 'center',
  },
  ratingNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  percentageText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 12,
    color: COLORS.gray600,
    width: 42,
    textAlign: 'right',
  },
  seeMoreButton: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  seeMoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});

export default PlayerRatings;
