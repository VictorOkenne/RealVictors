/**
 * GamesListWithTabs Component
 *
 * Reusable component for displaying upcoming and previous games with tabs
 * Used in AllGamesPage and UserProfile MatchesView
 *
 * Features:
 * - Tabs for Upcoming and Previous games
 * - Sorted game lists
 * - Swipeable game cards
 * - Customizable styling
 */

import React, { ReactNode, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { GameCard } from '../MatchGame/GameCard';

type TabType = 'upcoming' | 'previous';

interface Game {
  id: string;
  leagueName: string;
  tournament?: string;
  homeTeam: {
    name: string;
    logo: any;
  };
  awayTeam: {
    name: string;
    logo: any;
  };
  time: string;
  date: string;
  location: string;
  matchStage?: string;
  leagueLogo?: any;
  score?: {
    home: number;
    away: number;
  };
  sortDate?: number;
}

interface GamesListWithTabsProps {
  upcomingGames: Game[];
  previousGames: Game[];
  backgroundColor?: string;
  tabBackgroundColor?: string;
  tabTextColor?: string;
  tabTextActiveColor?: string;
  showScrollIndicator?: boolean;
  nestedScrollEnabled?: boolean;
  contentContainerStyle?: ViewStyle;
  onGamePress?: (gameId: string) => void;
  onTabChange?: (tab: TabType) => void;
  renderFilterButton?: () => ReactNode;
}

export const GamesListWithTabs: React.FC<GamesListWithTabsProps> = ({
  upcomingGames,
  previousGames,
  backgroundColor = COLORS.white,
  tabBackgroundColor,
  tabTextColor = COLORS.gray500,
  tabTextActiveColor = COLORS.black,
  showScrollIndicator = false,
  nestedScrollEnabled = false,
  contentContainerStyle,
  onGamePress,
  onTabChange,
  renderFilterButton,
}) => {
  // Use tabBackgroundColor if provided, otherwise use backgroundColor
  const effectiveTabBackgroundColor = tabBackgroundColor ?? backgroundColor;
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [upcomingTextWidth, setUpcomingTextWidth] = useState<number>(0);
  const [previousTextWidth, setPreviousTextWidth] = useState<number>(0);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Sort upcoming games by soonest first (earliest date first)
  const sortedUpcomingGames = useMemo(() => {
    return [...upcomingGames].sort((a, b) => {
      const dateA = a.sortDate || 0;
      const dateB = b.sortDate || 0;
      return dateA - dateB; // Ascending order (soonest first)
    });
  }, [upcomingGames]);

  // Sort previous games by most recent first (latest date first)
  const sortedPreviousGames = useMemo(() => {
    return [...previousGames].sort((a, b) => {
      const dateA = a.sortDate || 0;
      const dateB = b.sortDate || 0;
      return dateB - dateA; // Descending order (most recent first)
    });
  }, [previousGames]);

  const currentGames = activeTab === 'upcoming' ? sortedUpcomingGames : sortedPreviousGames;

  const handleGamePress = (gameId: string) => {
    if (onGamePress) {
      onGamePress(gameId);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Tabs with optional filter button */}
      <View style={[styles.tabsContainer, { backgroundColor: effectiveTabBackgroundColor }]}>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabChange('upcoming')}
          >
            <Text 
              style={[
                styles.tabText,
                { color: tabTextColor },
                activeTab === 'upcoming' && [styles.tabTextActive, { color: tabTextActiveColor }]
              ]}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setUpcomingTextWidth(width);
              }}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabChange('previous')}
          >
            <Text 
              style={[
                styles.tabText,
                { color: tabTextColor },
                activeTab === 'previous' && [styles.tabTextActive, { color: tabTextActiveColor }]
              ]}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setPreviousTextWidth(width);
              }}
            >
              Previous
            </Text>
          </TouchableOpacity>
        </View>
        
        {renderFilterButton && (
          <View style={styles.filterButtonContainer}>
            {renderFilterButton()}
          </View>
        )}
      </View>

      {/* Tab Underline Indicators */}
      <View style={[styles.tabIndicatorsContainer, { backgroundColor: effectiveTabBackgroundColor }]}>
        <View style={styles.tabsRow}>
          <View style={styles.tabIndicatorWrapper}>
            <View style={[
              styles.tabIndicator,
              activeTab === 'upcoming' && styles.activeTabIndicator,
              upcomingTextWidth > 0 && { width: upcomingTextWidth }
            ]} />
          </View>
          <View style={styles.tabIndicatorWrapper}>
            <View style={[
              styles.tabIndicator,
              activeTab === 'previous' && styles.activeTabIndicator,
              previousTextWidth > 0 && { width: previousTextWidth }
            ]} />
          </View>
        </View>
        {renderFilterButton && <View style={styles.filterButtonSpacer} />}
      </View>

      <ScrollView
        style={[styles.scrollView, { backgroundColor }]}
        showsVerticalScrollIndicator={showScrollIndicator}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        nestedScrollEnabled={nestedScrollEnabled}
        directionalLockEnabled={true}
        horizontal={false}
        scrollEventThrottle={16}
      >
        {/* Games List */}
        <View style={styles.gamesListContainer}>
          {currentGames.map((game) => {
            return (
              <GameCard
                key={game.id}
                leagueName={game.leagueName}
                tournament={game.tournament}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                time={game.time}
                date={game.date}
                location={game.location}
                matchStage={game.matchStage}
                leagueLogo={game.leagueLogo}
                score={game.score}
                style={styles.gameCard}
                enableSwipe={true}
                onPress={() => handleGamePress(game.id)}
              />
            );
          })}
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    gap: 10,
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonContainer: {
    paddingRight: 2,
  },
  tabText: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 18,
  },
  tabTextActive: {
    fontWeight: '600',
  },
  tabIndicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingBottom: 10,
    gap: 10,
  },
  tabIndicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIndicator: {
    height: 3,
    backgroundColor: 'transparent',
  },
  activeTabIndicator: {
    backgroundColor: COLORS.goldAccent,
  },
  filterButtonSpacer: {
    width: 44,
    paddingRight: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  gamesListContainer: {
    paddingHorizontal: 0,
    gap: 20,
    alignItems: 'center',
  },
  gameCard: {
    // Width handled by GameCard component
  },
});

export default GamesListWithTabs;
