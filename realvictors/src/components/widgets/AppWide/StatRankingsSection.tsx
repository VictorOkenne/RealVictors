/**
 * StatRankingsSection Component
 *
 * Displays stat rankings with scope filter (league/location).
 * Can be used for both user profiles and team profiles.
 */

import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { FilterIcon } from '../../icons/FilterIcon';
import { FilterModal, FilterSection, FilterState } from './FilterModal';

// Export types for use in other components
export type RankingScope = 'league' | 'city' | 'state' | 'country' | 'worldwide';

export interface StatRanking {
  statName: string;
  rank: number;
  value: string;
  scope: RankingScope;
  scopeLabel: string; // e.g., "Premier League", "New York City", "USA"
}

interface StatRankingsSectionProps {
  rankingsByScope: Record<RankingScope, StatRanking[]>;
  title?: string;
}

export const StatRankingsSection: React.FC<StatRankingsSectionProps> = ({
  rankingsByScope,
  title = 'Player Rank',
}) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    scope: 'league',
  });

  // Get selected scope from filters
  const selectedScope = (filters.scope as RankingScope) || 'league';

  // Get current rankings based on selected scope
  const currentRankings = rankingsByScope[selectedScope] || [];
  const currentScopeLabel = currentRankings.length > 0 ? currentRankings[0].scopeLabel : 'League';

  // Filter configuration
  const filterSections: FilterSection[] = useMemo(() => [
    {
      title: 'League/Competition',
      key: 'scope',
      options: [
        { label: 'My League', value: 'league' },
      ],
    },
    {
      title: 'Location',
      key: 'scope',
      options: [
        { label: 'My City', value: 'city' },
        { label: 'My State/Province', value: 'state' },
        { label: 'My Country', value: 'country' },
        { label: 'Worldwide', value: 'worldwide' },
      ],
    },
  ], []);

  // Handle filter apply
  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setFilters({ scope: 'league' });
  };

  const accentColor = COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Header with Title and Filter Button */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <FilterIcon width={20} height={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Current Scope Label */}
      <Text style={styles.scopeLabel}>{currentScopeLabel}</Text>

      {/* Rankings Cards */}
      <View style={styles.cardsContainer}>
        {currentRankings.map((ranking, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>#{ranking.rank}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text
                style={styles.statLabel}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
              >
                {ranking.statName}
              </Text>
              <Text
                style={styles.statValue}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                {ranking.value}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        sections={filterSections}
        selectedFilters={filters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Spacing controlled by parent
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scopeLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 16,
    color: COLORS.gray600,
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DAD7D7',
    borderRadius: 10,
    padding: 12,
    paddingTop: 15,
    paddingBottom: 12,
    minHeight: 110,
    maxHeight: 120,
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: COLORS.gray850,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 500,
    alignSelf: 'flex-end',
    marginRight: -2,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
  },
  cardContent: {
    gap: 10,
    paddingRight: 4,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default StatRankingsSection;

