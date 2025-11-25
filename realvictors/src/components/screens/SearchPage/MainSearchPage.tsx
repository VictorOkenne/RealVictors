/**
 * MainSearchPage Component
 *
 * Main search page for finding teams, leagues, and players.
 *
 * Features:
 * - Unified search across all entity types
 * - Category filter chips (All, Teams, Leagues, Players)
 * - Advanced filters (Sport, Position, Verification)
 * - Recent searches and trending section (empty state)
 * - Categorized results with "See All" functionality
 * - Sport-aware position filtering
 */

import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FilterIcon } from '../../icons';
import {
  FilterModal,
  LeagueSearchCard,
  PlayerSearchCard,
  SearchBar,
  TeamSearchCard,
  type FilterState,
} from '../../widgets';
import {
  mockLeagues,
  mockPlayers,
  mockRecentSearches,
  mockTeams,
  mockTrendingSearches,
} from './mockData';

type Category = 'All' | 'Players' | 'Teams' | 'Leagues';

interface MainSearchPageProps {}

export const MainSearchPage: React.FC<MainSearchPageProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    sport: ['soccer', 'basketball'], // Both selected by default
    position: [],
    verification: [],
  });
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  // Category chips
  const categories: Category[] = ['All', 'Players', 'Teams', 'Leagues'];

  // Initialize tempFilters when modal opens
  useEffect(() => {
    if (showFilterModal) {
      setTempFilters(filters);
    }
  }, [showFilterModal, filters]);

  // Filter sections for FilterModal - uses tempFilters for real-time updates
  const filterSections = useMemo(() => {
    const selectedSports = tempFilters.sport as string[] || [];
    const sections = [];

    // Sport filter - always show
    sections.push({
      title: 'Sport',
      key: 'sport',
      multiSelect: true,
      options: [
        { label: 'Soccer', value: 'soccer' },
        { label: 'Basketball', value: 'basketball' },
      ],
    });

    // Position filter - only show if filtering Players or All
    // Position options based on selected sport(s)
    if (activeCategory === 'All' || activeCategory === 'Players') {
      let positionOptions: { label: string; value: string }[] = [];

      const hasSoccer = selectedSports.length === 0 ||
        (selectedSports.length === 2) ||
        (selectedSports.length === 1 && selectedSports.includes('soccer'));
      const hasBasketball = selectedSports.length === 0 ||
        (selectedSports.length === 2) ||
        (selectedSports.length === 1 && selectedSports.includes('basketball'));

      // If no sports selected OR both selected, show all positions
      if (selectedSports.length === 0 || selectedSports.length === 2) {
        positionOptions.push(
          { label: 'Goalkeeper', value: 'goalkeeper' },
          { label: 'Defender', value: 'defender' },
          { label: 'Midfielder', value: 'midfielder' },
          { label: 'Forward', value: 'forward' },
          { label: 'Point Guard', value: 'point_guard' },
          { label: 'Shooting Guard', value: 'shooting_guard' },
          { label: 'Small Forward', value: 'small_forward' },
          { label: 'Power Forward', value: 'power_forward' },
          { label: 'Center', value: 'center' }
        );
      }
      // If ONLY soccer selected, show soccer positions
      else if (selectedSports.length === 1 && selectedSports.includes('soccer')) {
        positionOptions.push(
          { label: 'Goalkeeper', value: 'goalkeeper' },
          { label: 'Defender', value: 'defender' },
          { label: 'Midfielder', value: 'midfielder' },
          { label: 'Forward', value: 'forward' }
        );
      }
      // If ONLY basketball selected, show basketball positions
      else if (selectedSports.length === 1 && selectedSports.includes('basketball')) {
        positionOptions.push(
          { label: 'Point Guard', value: 'point_guard' },
          { label: 'Shooting Guard', value: 'shooting_guard' },
          { label: 'Small Forward', value: 'small_forward' },
          { label: 'Power Forward', value: 'power_forward' },
          { label: 'Center', value: 'center' }
        );
      }

      sections.push({
        title: 'Position',
        key: 'position',
        multiSelect: true,
        options: positionOptions,
      });
    }

    // Verification filter - show for All, Players, and Teams (not Leagues)
    if (activeCategory === 'All' || activeCategory === 'Players' || activeCategory === 'Teams') {
      sections.push({
        title: 'Verification',
        key: 'verification',
        multiSelect: false,
        options: [
          { label: 'Verified Only', value: 'verified' },
        ],
      });
    }

    return sections;
  }, [tempFilters.sport, activeCategory]);

  // Filter logic
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const selectedSports = filters.sport as string[] || [];
    const selectedPositions = filters.position as string[] || [];
    const verifiedOnly = filters.verification === 'verified';

    // Filter players
    let players = mockPlayers.filter(player => {
      const matchesQuery = query === '' ||
        player.fullName.toLowerCase().includes(query) ||
        player.username.toLowerCase().includes(query) ||
        player.teamName.toLowerCase().includes(query);

      const matchesSport = selectedSports.length === 0 || selectedSports.includes(player.sport);
      const matchesPosition = selectedPositions.length === 0 ||
        selectedPositions.includes(player.position.toLowerCase().replace(' ', '_'));
      const matchesVerification = !verifiedOnly || player.isVerified;

      return matchesQuery && matchesSport && matchesPosition && matchesVerification;
    });

    // Filter teams
    let teams = mockTeams.filter(team => {
      const matchesQuery = query === '' ||
        team.teamName.toLowerCase().includes(query) ||
        team.location.toLowerCase().includes(query);

      const matchesSport = selectedSports.length === 0 || selectedSports.includes(team.sport);
      const matchesVerification = !verifiedOnly || team.isVerified;

      return matchesQuery && matchesSport && matchesVerification;
    });

    // Filter leagues
    let leagues = mockLeagues.filter(league => {
      const matchesQuery = query === '' ||
        league.leagueName.toLowerCase().includes(query) ||
        league.season.toLowerCase().includes(query);

      const matchesSport = selectedSports.length === 0 || selectedSports.includes(league.sport);

      return matchesQuery && matchesSport;
    });

    // Apply category filter
    if (activeCategory === 'Players') {
      teams = [];
      leagues = [];
    } else if (activeCategory === 'Teams') {
      players = [];
      leagues = [];
    } else if (activeCategory === 'Leagues') {
      players = [];
      teams = [];
    }

    return { players, teams, leagues };
  }, [searchQuery, activeCategory, filters]);

  const hasResults = filteredResults.players.length > 0 ||
    filteredResults.teams.length > 0 ||
    filteredResults.leagues.length > 0;

  const handleBackPress = () => {
    router.back();
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    // Clean up position selections if they're incompatible with the selected sport
    const selectedSports = newFilters.sport as string[] || [];
    const selectedPositions = newFilters.position as string[] || [];

    if (selectedPositions.length > 0 && selectedSports.length === 1) {
      const soccerPositions = ['goalkeeper', 'defender', 'midfielder', 'forward'];
      const basketballPositions = ['point_guard', 'shooting_guard', 'small_forward', 'power_forward', 'center'];

      let validPositions = selectedPositions;

      if (selectedSports.includes('soccer') && !selectedSports.includes('basketball')) {
        // Only soccer selected - remove basketball positions
        validPositions = selectedPositions.filter(pos => soccerPositions.includes(pos));
      } else if (selectedSports.includes('basketball') && !selectedSports.includes('soccer')) {
        // Only basketball selected - remove soccer positions
        validPositions = selectedPositions.filter(pos => basketballPositions.includes(pos));
      }

      newFilters.position = validPositions;
    }

    setFilters(newFilters);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setFilters({
      sport: ['soccer', 'basketball'], // Reset to both sports selected
      position: [],
      verification: [],
    });
  };

  const handlePlayerPress = (id: string) => {
    console.log('Player pressed:', id);
    // Navigate to player profile page
  };

  const handleTeamPress = (id: string) => {
    console.log('Team pressed:', id);
    // Navigate to team page
  };

  const handleLeaguePress = (id: string) => {
    console.log('League pressed:', id);
    // Navigate to league page
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
  };

  const handleTrendingSearchPress = (query: string, category: string) => {
    setSearchQuery(query);
    if (category === 'player') setActiveCategory('Players');
    else if (category === 'team') setActiveCategory('Teams');
    else if (category === 'league') setActiveCategory('Leagues');
  };

  // Render empty state (recent searches + trending)
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      {/* Recent Searches */}
      {mockRecentSearches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentSearchesContainer}>
            {mockRecentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchChip}
                onPress={() => handleRecentSearchPress(search)}
                activeOpacity={0.7}
              >
                <Ionicons name="time-outline" size={16} color={COLORS.gray600} />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Trending */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending</Text>
        <View style={styles.trendingContainer}>
          {mockTrendingSearches.map((trending) => (
            <TouchableOpacity
              key={trending.id}
              style={styles.trendingItem}
              onPress={() => handleTrendingSearchPress(trending.query, trending.category)}
              activeOpacity={0.9}
            >
              <Ionicons name="trending-up" size={20} color={COLORS.goldAccent} />
              <Text style={styles.trendingText}>{trending.query}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  // Render no results state
  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Ionicons name="search-outline" size={64} color={COLORS.gray300} />
      <Text style={styles.noResultsTitle}>No results found</Text>
      <Text style={styles.noResultsSubtitle}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  // Render results sections
  const renderResults = () => {
    const maxPreviewItems = 3;
    const isSearching = searchQuery.trim() !== '';

    // Only show "See All" if NOT actively searching
    const showPlayersSeeAll = !isSearching && filteredResults.players.length > maxPreviewItems && expandedSection !== 'players';
    const showTeamsSeeAll = !isSearching && filteredResults.teams.length > maxPreviewItems && expandedSection !== 'teams';
    const showLeaguesSeeAll = !isSearching && filteredResults.leagues.length > maxPreviewItems && expandedSection !== 'leagues';

    // When searching, show all results; otherwise show preview with expand functionality
    const playersToShow = isSearching
      ? filteredResults.players
      : expandedSection === 'players'
      ? filteredResults.players
      : filteredResults.players.slice(0, maxPreviewItems);
    const teamsToShow = isSearching
      ? filteredResults.teams
      : expandedSection === 'teams'
      ? filteredResults.teams
      : filteredResults.teams.slice(0, maxPreviewItems);
    const leaguesToShow = isSearching
      ? filteredResults.leagues
      : expandedSection === 'leagues'
      ? filteredResults.leagues
      : filteredResults.leagues.slice(0, maxPreviewItems);

    return (
      <View style={styles.resultsContainer}>
        {/* Players Section */}
        {filteredResults.players.length > 0 && (
          <View style={styles.resultSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Players ({filteredResults.players.length})
              </Text>
              {showPlayersSeeAll && (
                <TouchableOpacity
                  onPress={() => setExpandedSection('players')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              )}
              {expandedSection === 'players' && (
                <TouchableOpacity
                  onPress={() => setExpandedSection(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
            {playersToShow.map((player) => (
              <PlayerSearchCard
                key={player.id}
                {...player}
                onCardPress={handlePlayerPress}
              />
            ))}
          </View>
        )}

        {/* Teams Section */}
        {filteredResults.teams.length > 0 && (
          <View style={styles.resultSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Teams ({filteredResults.teams.length})
              </Text>
              {showTeamsSeeAll && (
                <TouchableOpacity
                  onPress={() => setExpandedSection('teams')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              )}
              {expandedSection === 'teams' && (
                <TouchableOpacity
                  onPress={() => setExpandedSection(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
            {teamsToShow.map((team) => (
              <TeamSearchCard
                key={team.id}
                {...team}
                onCardPress={handleTeamPress}
              />
            ))}
          </View>
        )}

        {/* Leagues Section */}
        {filteredResults.leagues.length > 0 && (
          <View style={styles.resultSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Leagues ({filteredResults.leagues.length})
              </Text>
              {showLeaguesSeeAll && (
                <TouchableOpacity
                  onPress={() => setExpandedSection('leagues')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              )}
              {expandedSection === 'leagues' && (
                <TouchableOpacity
                  onPress={() => setExpandedSection(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
            {leaguesToShow.map((league) => (
              <LeagueSearchCard
                key={league.id}
                {...league}
                onCardPress={handleLeaguePress}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={styles.filterButton}
          >
            <FilterIcon width={20} height={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search players, teams, leagues..."
        />
      </View>

      {/* Category Chips */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.trim() === '' && !hasResults
          ? renderEmptyState()
          : hasResults
          ? renderResults()
          : renderNoResults()}

        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        sections={filterSections}
        selectedFilters={filters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onChange={(newFilters) => setTempFilters(newFilters)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  safeArea: {
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  categoryChip: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  categoryChipText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 13,
    color: COLORS.black,
  },
  categoryChipTextActive: {
    color: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 16,
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recentSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.gray100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  recentSearchText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.gray700,
  },
  trendingContainer: {
    gap: 12,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  trendingText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 15,
    color: COLORS.black,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  noResultsTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
  },
});

export default MainSearchPage;
