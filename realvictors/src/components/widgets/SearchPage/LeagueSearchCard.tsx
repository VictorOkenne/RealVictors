/**
 * LeagueSearchCard Component
 *
 * Search result card for leagues/tournaments.
 * Features:
 * - Dark gradient background
 * - League logo on left
 * - League name, sport type, season info
 * - Date range for season
 * - Team count with trophy icon
 * - Gold accent highlights
 */

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPORTS, TYPOGRAPHY } from '../../../constants';

export interface LeagueSearchCardProps {
  id: string;
  leagueName: string;
  leagueLogo: ImageSourcePropType;
  sport: 'soccer' | 'basketball';
  season: string;
  startDate: string;
  endDate: string;
  teamCount: number;
  onCardPress?: (id: string) => void;
}

export const LeagueSearchCard: React.FC<LeagueSearchCardProps> = ({
  id,
  leagueName,
  leagueLogo,
  sport,
  season,
  startDate,
  endDate,
  teamCount,
  onCardPress,
}) => {
  // Get sport-specific color
  const sportColor = SPORTS[sport].color;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCardPress?.(id)}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        {/* League Logo */}
        <View style={styles.logoContainer}>
          <Image source={leagueLogo} style={styles.leagueLogo} resizeMode="contain" />
        </View>

        {/* League Info */}
        <View style={styles.infoContainer}>
          {/* League Name */}
          <Text style={styles.leagueName} numberOfLines={1} ellipsizeMode="tail">
            {leagueName}
          </Text>

          {/* Sport & Season */}
          <View style={styles.sportSeasonRow}>
            <View
              style={[
                styles.sportIndicator,
                { backgroundColor: sportColor || COLORS.goldAccent },
              ]}
            />
            <Text style={styles.sportSeasonText} numberOfLines={1} ellipsizeMode="tail">
              {SPORTS[sport].name} • {season}
            </Text>
          </View>

          {/* Date Range */}
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={12} color={COLORS.gray400} />
            <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
              {startDate} - {endDate}
            </Text>
          </View>
        </View>

        {/* Right Section - Team Count & Trophy */}
        <View style={styles.rightSection}>
          <View style={styles.teamCountContainer}>
            <Ionicons name="trophy" size={16} color={COLORS.goldAccent} />
            <Text style={styles.teamCount}>{teamCount}</Text>
            <Text style={styles.teamsLabel}>teams</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray500} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginRight: 12,
  },
  leagueLogo: {
    width: 44,
    height: 44,
  },
  infoContainer: {
    flex: 1,
    gap: 6,
  },
  leagueName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
  },
  sportSeasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  sportIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sportSeasonText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: '#CCCCCC',
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  dateText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: '#999999',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  teamCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 194, 69, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 194, 69, 0.3)',
  },
  teamCount: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.goldAccent,
  },
  teamsLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.goldAccent,
  },
});

export default LeagueSearchCard;
