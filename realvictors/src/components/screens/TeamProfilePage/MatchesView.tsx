/**
 * MatchesView Component (Team Profile)
 *
 * Displays team's match history and upcoming matches
 * Uses the exact same GamesListWithTabs component as UserProfilePage for consistency
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants';
import { FilterIcon } from '../../icons';
import { DateRangePicker, FilterModal, FilterSection, FilterState, GamesListWithTabs } from '../../widgets';
import { previousGames, upcomingGames } from '../AllGamespage/mockData';
import { TeamMatch } from './mockData';

interface MatchesViewProps {
  upcomingMatches?: TeamMatch[];
  previousMatches?: TeamMatch[];
}

type TabType = 'upcoming' | 'previous';

export const MatchesView: React.FC<MatchesViewProps> = ({
  upcomingMatches = [],
  previousMatches = [],
}) => {
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabType>('upcoming');
  const [customStartDate, setCustomStartDate] = React.useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = React.useState<Date | null>(null);

  // Initialize filters
  const [filters, setFilters] = React.useState<FilterState>({
    sortBy: 'recent',
    result: [],
    sport: [],
    team: [],
    tournament: [],
    dateRange: 'allTime',
  });

  // Calculate min and max dates based on active tab
  const dateConstraints = React.useMemo(() => {
    const now = new Date();

    if (activeTab === 'upcoming') {
      // For upcoming games: today to max upcoming game date
      const maxUpcomingDate = upcomingGames.reduce((max, game) => {
        const gameDate = game.sortDate || 0;
        return gameDate > max ? gameDate : max;
      }, 0);

      return {
        minDate: now,
        maxDate: maxUpcomingDate > 0 ? new Date(maxUpcomingDate) : new Date(now.getFullYear() + 1, 11, 31),
      };
    } else {
      // For previous games: any past date to today
      return {
        minDate: new Date(2020, 0, 1), // Reasonable past date
        maxDate: now,
      };
    }
  }, [activeTab]);

  const handleGamePress = (gameId: string) => {
    // Find the game to get its sport
    const game = [...upcomingGames, ...previousGames].find(g => g.id === gameId);
    const sport = game?.sport || 'soccer';

    // Navigate to match details page with sport parameter
    router.push(`/match?sport=${sport}`);
    console.log('Game pressed:', gameId, 'sport:', sport);
  };

  // Get unique teams and tournaments from data
  const allTeams = React.useMemo(() => {
    const teams = new Set<string>();
    [...upcomingGames, ...previousGames].forEach(game => {
      if (game.userTeam) teams.add(game.userTeam);
    });
    return Array.from(teams).sort();
  }, []);

  const allTournaments = React.useMemo(() => {
    const tournaments = new Set<string>();
    [...upcomingGames, ...previousGames].forEach(game => {
      if (game.tournament) tournaments.add(game.tournament);
    });
    return Array.from(tournaments).sort();
  }, []);

  // Filter sections based on active tab
  const filterSections: FilterSection[] = React.useMemo(() => {
    const sections: FilterSection[] = [
      {
        title: 'Sort By',
        key: 'sortBy',
        options: [
          { label: 'Most Recent', value: 'recent' },
          { label: 'Oldest First', value: 'oldest' },
        ],
      },
      {
        title: 'Date Range',
        key: 'dateRange',
        multiSelect: false,
        options: [
          { label: 'All Time', value: 'allTime' },
          { label: 'Today', value: 'today' },
          { label: 'Yesterday', value: 'yesterday' },
          { label: 'Last 7 Days', value: 'last7days' },
          { label: 'Last 30 Days', value: 'last30days' },
          { label: 'This Year', value: 'thisYear' },
          { label: 'Last Year', value: 'lastYear' },
          { label: 'Custom Date Range', value: 'customRange' },
        ],
      },
      {
        title: 'Sport',
        key: 'sport',
        multiSelect: true,
        options: [
          { label: 'Soccer', value: 'soccer' },
          { label: 'Basketball', value: 'basketball' },
        ],
      },
      {
        title: 'Team',
        key: 'team',
        multiSelect: true,
        options: allTeams.map(team => ({ label: team, value: team })),
      },
    ];

    // Add result filter only for previous games
    if (activeTab === 'previous') {
      sections.splice(2, 0, {
        title: 'Result',
        key: 'result',
        multiSelect: true,
        options: [
          { label: 'Wins', value: 'win' },
          { label: 'Losses', value: 'loss' },
          { label: 'Draws', value: 'draw' },
        ],
      });
    }

    // Add tournament filter only for upcoming games
    if (activeTab === 'upcoming') {
      sections.push({
        title: 'Tournament/League',
        key: 'tournament',
        multiSelect: true,
        options: allTournaments.map(tournament => ({ label: tournament, value: tournament })),
      });
    }

    return sections;
  }, [activeTab, allTeams, allTournaments]);

  // Helper function to check if a date matches selected date range
  const isDateInRange = React.useCallback((gameDate: number, dateRange: string) => {
    if (!dateRange) return true;

    // If "All Time" is selected, show all games
    if (dateRange === 'allTime') return true;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 24 * 60 * 60 * 1000;
    const last7Days = today - 7 * 24 * 60 * 60 * 1000;
    const last30Days = today - 30 * 24 * 60 * 60 * 1000;
    const thisYearStart = new Date(now.getFullYear(), 0, 1).getTime();
    const lastYearStart = new Date(now.getFullYear() - 1, 0, 1).getTime();
    const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59).getTime();

    switch (dateRange) {
      case 'allTime':
        return true;
      case 'today':
        return gameDate >= today && gameDate < today + 24 * 60 * 60 * 1000;
      case 'yesterday':
        return gameDate >= yesterday && gameDate < today;
      case 'last7days':
        return gameDate >= last7Days;
      case 'last30days':
        return gameDate >= last30Days;
      case 'thisYear':
        return gameDate >= thisYearStart;
      case 'lastYear':
        return gameDate >= lastYearStart && gameDate <= lastYearEnd;
      case 'customRange':
        // Check if custom dates are set
        if (customStartDate && customEndDate) {
          const startTime = new Date(customStartDate).setHours(0, 0, 0, 0);
          const endTime = new Date(customEndDate).setHours(23, 59, 59, 999);
          return gameDate >= startTime && gameDate <= endTime;
        }
        return true;
      default:
        return true;
    }
  }, [customStartDate, customEndDate]);

  // Apply filters to upcoming games
  const filteredUpcomingGames = React.useMemo(() => {
    let filtered = [...upcomingGames];

    // Filter by date range
    const dateRange = filters.dateRange as string | undefined;
    if (dateRange) {
      filtered = filtered.filter(game => isDateInRange(game.sortDate || 0, dateRange));
    }

    // Filter by sport
    const sports = filters.sport as string[] | undefined;
    if (sports && sports.length > 0) {
      filtered = filtered.filter(game => sports.includes(game.sport));
    }

    // Filter by team
    const teams = filters.team as string[] | undefined;
    if (teams && teams.length > 0) {
      filtered = filtered.filter(game => teams.includes(game.userTeam));
    }

    // Filter by tournament
    const tournaments = filters.tournament as string[] | undefined;
    if (tournaments && tournaments.length > 0) {
      filtered = filtered.filter(game => game.tournament && tournaments.includes(game.tournament));
    }

    // Sort
    if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => (a.sortDate || 0) - (b.sortDate || 0));
    } else {
      filtered.sort((a, b) => (b.sortDate || 0) - (a.sortDate || 0));
    }

    return filtered;
  }, [filters, isDateInRange]);

  // Apply filters to previous games
  const filteredPreviousGames = React.useMemo(() => {
    let filtered = [...previousGames];

    // Filter by date range
    const dateRange = filters.dateRange as string | undefined;
    if (dateRange) {
      filtered = filtered.filter(game => isDateInRange(game.sortDate || 0, dateRange));
    }

    // Filter by result
    const results = filters.result as string[] | undefined;
    if (results && results.length > 0) {
      filtered = filtered.filter(game => results.includes(game.result));
    }

    // Filter by sport
    const sports = filters.sport as string[] | undefined;
    if (sports && sports.length > 0) {
      filtered = filtered.filter(game => sports.includes(game.sport));
    }

    // Filter by team
    const teams = filters.team as string[] | undefined;
    if (teams && teams.length > 0) {
      filtered = filtered.filter(game => teams.includes(game.userTeam));
    }

    // Sort
    if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => (a.sortDate || 0) - (b.sortDate || 0));
    } else {
      filtered.sort((a, b) => (b.sortDate || 0) - (a.sortDate || 0));
    }

    return filtered;
  }, [filters, isDateInRange]);

  // Watch for custom range selection
  React.useEffect(() => {
    const dateRange = filters.dateRange as string | undefined;
    if (dateRange === 'customRange') {
      setShowDateRangePicker(true);
    }
  }, [filters.dateRange]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: 'recent',
      result: [],
      sport: [],
      team: [],
      tournament: [],
      dateRange: 'allTime',
    });
    setCustomStartDate(null);
    setCustomEndDate(null);
  };

  const handleCustomDateRangeApply = (startDate: Date, endDate: Date) => {
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
    setShowDateRangePicker(false);
  };

  const handleCustomDateRangeClose = () => {
    // If closing without applying, reset to allTime
    if (!customStartDate || !customEndDate) {
      setFilters(prev => ({
        ...prev,
        dateRange: 'allTime',
      }));
    }
    setShowDateRangePicker(false);
  };

  return (
    <View style={styles.container}>
      <GamesListWithTabs
        upcomingGames={filteredUpcomingGames}
        previousGames={filteredPreviousGames}
        backgroundColor={COLORS.white}
        tabTextColor={COLORS.gray500}
        tabTextActiveColor={COLORS.black}
        nestedScrollEnabled={true}
        onGamePress={handleGamePress}
        onTabChange={setActiveTab}
        renderFilterButton={() => (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
            activeOpacity={0.7}
          >
            <FilterIcon width={20} height={20} color={COLORS.black} />
          </TouchableOpacity>
        )}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        sections={filterSections}
        selectedFilters={filters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Custom Date Range Picker */}
      <DateRangePicker
        visible={showDateRangePicker}
        onClose={handleCustomDateRangeClose}
        onApply={handleCustomDateRangeApply}
        initialStartDate={customStartDate || undefined}
        initialEndDate={customEndDate || undefined}
        minDate={dateConstraints.minDate}
        maxDate={dateConstraints.maxDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default MatchesView;
