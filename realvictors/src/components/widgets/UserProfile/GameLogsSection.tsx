/**
 * GameLogsSection Component
 *
 * Displays game logs and career averages with toggle and filtering
 */

import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { CareerAverage, GameLog, SportType } from '../../screens/UserProfilePage/mockData';
import { FilterIcon } from '../../icons/FilterIcon';
import { FilterModal, FilterSection, FilterState } from '../AppWide/FilterModal';

export type ViewMode = 'gameLogs' | 'careerAverages';
export type StatDisplayMode = 'perGame' | 'total';

interface GameLogsSectionProps {
  gameLogs: GameLog[];
  careerAverages: CareerAverage[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sport?: SportType;
  onGamePress?: (gameId: string, sport: SportType) => void; // Callback for when a game is pressed
}

export const GameLogsSection: React.FC<GameLogsSectionProps> = ({
  gameLogs,
  careerAverages,
  viewMode,
  onViewModeChange,
  sport = 'soccer',
  onGamePress,
}) => {
  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Game Logs filters
  const [gameLogsFilters, setGameLogsFilters] = useState<FilterState>({
    sortOrder: 'recent',
  });

  // Career Averages filters
  const [careerAvgFilters, setCareerAvgFilters] = useState<FilterState>({
    statDisplay: 'perGame',
  });

  // Extract unique teams and leagues from data
  const uniqueGameTeams = useMemo(() => {
    const teams = new Set<string>();
    gameLogs.forEach((log) => {
      teams.add(log.homeTeam.name);
      teams.add(log.awayTeam.name);
    });
    return Array.from(teams).sort();
  }, [gameLogs]);

  const uniqueCareerTeams = useMemo(() => {
    const teams = new Set<string>();
    careerAverages.forEach((avg) => teams.add(avg.team.name));
    return Array.from(teams).sort();
  }, [careerAverages]);

  const uniqueLeagues = useMemo(() => {
    const leagues = new Set<string>();
    careerAverages.forEach((avg) => leagues.add(avg.league));
    return Array.from(leagues).sort();
  }, [careerAverages]);

  const uniqueSeasons = useMemo(() => {
    const seasons = new Set<string>();
    careerAverages.forEach((avg) => seasons.add(avg.season));
    return Array.from(seasons).sort().reverse(); // Most recent first
  }, [careerAverages]);

  // Filter configurations
  const gameLogsFilterSections: FilterSection[] = useMemo(() => [
    {
      title: 'Sort Order',
      key: 'sortOrder',
      options: [
        { label: 'Most Recent First', value: 'recent' },
        { label: 'Oldest First', value: 'oldest' },
      ],
    },
    ...(uniqueGameTeams.length > 1 ? [{
      title: 'Team',
      key: 'team',
      multiSelect: true,
      options: uniqueGameTeams.map(team => ({ label: team, value: team })),
    }] : []),
  ], [uniqueGameTeams]);

  const careerAvgFilterSections: FilterSection[] = useMemo(() => [
    {
      title: 'Stat Display',
      key: 'statDisplay',
      options: [
        { label: 'Per Game', value: 'perGame' },
        { label: 'Season Totals', value: 'total' },
      ],
    },
    ...(uniqueSeasons.length > 1 ? [{
      title: 'Season',
      key: 'season',
      multiSelect: true,
      options: uniqueSeasons.map(season => ({ label: season, value: season })),
    }] : []),
    ...(uniqueCareerTeams.length > 1 ? [{
      title: 'Team',
      key: 'team',
      multiSelect: true,
      options: uniqueCareerTeams.map(team => ({ label: team, value: team })),
    }] : []),
    ...(uniqueLeagues.length > 1 ? [{
      title: 'League',
      key: 'league',
      multiSelect: true,
      options: uniqueLeagues.map(league => ({ label: league, value: league })),
    }] : []),
  ], [uniqueSeasons, uniqueCareerTeams, uniqueLeagues]);

  // Apply filters to data
  const filteredGameLogs = useMemo(() => {
    let filtered = [...gameLogs];

    // Filter by team
    if (gameLogsFilters.team && Array.isArray(gameLogsFilters.team) && gameLogsFilters.team.length > 0) {
      filtered = filtered.filter(log =>
        gameLogsFilters.team.includes(log.homeTeam.name) ||
        gameLogsFilters.team.includes(log.awayTeam.name)
      );
    }

    // Sort by date
    if (gameLogsFilters.sortOrder === 'oldest') {
      filtered = filtered.reverse();
    }

    return filtered;
  }, [gameLogs, gameLogsFilters]);

  const filteredCareerAverages = useMemo(() => {
    let filtered = [...careerAverages];

    // Filter by season
    if (careerAvgFilters.season && Array.isArray(careerAvgFilters.season) && careerAvgFilters.season.length > 0) {
      filtered = filtered.filter(avg => careerAvgFilters.season.includes(avg.season));
    }

    // Filter by team
    if (careerAvgFilters.team && Array.isArray(careerAvgFilters.team) && careerAvgFilters.team.length > 0) {
      filtered = filtered.filter(avg => careerAvgFilters.team.includes(avg.team.name));
    }

    // Filter by league
    if (careerAvgFilters.league && Array.isArray(careerAvgFilters.league) && careerAvgFilters.league.length > 0) {
      filtered = filtered.filter(avg => careerAvgFilters.league.includes(avg.league));
    }

    return filtered;
  }, [careerAverages, careerAvgFilters]);

  // Get current stat display mode from filters
  const statDisplayMode: StatDisplayMode =
    (careerAvgFilters.statDisplay as StatDisplayMode) || 'perGame';

  // Helper function to format stat labels with abbreviations
  const formatStatLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      // Soccer stats
      'Goals': 'GOL',
      'Assists': 'AST',
      'Tackles': 'TKL',
      'Pass Acc.': 'PASS%',
      'Pass Accuracy': 'PASS%',
      'Shots': 'SOT',
      'Shot on Target': 'SOT',
      'Shots on Target': 'SOT',
      'Dribbles': 'DRI',
      'Yellow Card': 'YEL',
      'Yellow Cards': 'YEL',
      'Red Card': 'RED',
      'Red Cards': 'RED',
      // Basketball stats (already abbreviated, but keeping for consistency)
      'PTS': 'PTS',
      'REB': 'REB',
      'AST': 'AST',
      'BLK': 'BLK',
      'STL': 'STL',
      'FG%': 'FG%',
      'FT%': 'FT%',
      '3P%': '3P%',
    };
    return labelMap[key] || key;
  };

  const renderGameLogCard = (game: GameLog) => {
    const isSoccer = sport === 'soccer';

    // Get all stats (excluding yellow/red cards for now)
    const otherStats: Record<string, number | string> = {};
    Object.entries(game.stats).forEach(([key, value]) => {
      if (key !== 'Yellow Cards' && key !== 'Yellow Card' &&
          key !== 'Red Card' && key !== 'Red Cards') {
        otherStats[key] = value;
      }
    });

    // Only add yellow cards and red cards for soccer
    const normalizedStats: Record<string, number | string> = { ...otherStats };

    if (isSoccer) {
      // Get yellow cards and red cards values (handle both singular and plural)
      const yellowCards = game.stats['Yellow Cards'] ?? game.stats['Yellow Card'] ?? 0;
      const redCard = game.stats['Red Card'] ?? game.stats['Red Cards'] ?? 0;

      // Always include yellow cards and red cards at the end for soccer
      normalizedStats['Yellow Cards'] = yellowCards;
      normalizedStats['Red Card'] = redCard;
    }

    const statEntries = Object.entries(normalizedStats);

    // Create 4x4 grid - take first 8 stats (2 rows of 4)
    const firstRow = statEntries.slice(0, 4);
    const secondRow = statEntries.slice(4, 8);

    // Determine if user won based on scores and which team they played for
    const userScore = game.userTeam === 'home' ? game.homeTeam.score : game.awayTeam.score;
    const opponentScore = game.userTeam === 'home' ? game.awayTeam.score : game.homeTeam.score;
    const playerWon = userScore > opponentScore;
    const isTie = userScore === opponentScore;

    // Determine which team won overall (not just user)
    const homeTeamWon = game.homeTeam.score > game.awayTeam.score;
    const awayTeamWon = game.awayTeam.score > game.homeTeam.score;

    return (
      <TouchableOpacity
        key={game.gameId}
        style={styles.card}
        onPress={() => onGamePress?.(game.gameId, sport)}
        activeOpacity={0.7}
      >
        {/* Gold Header with Date */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderCenter}>
            <Text style={styles.cardDate}>{game.date}</Text>
          </View>
        </View>

        {/* Team Matchup - Exact Layout */}
        <View style={styles.matchupContainer}>
          {/* Left Team */}
          <View style={styles.teamSection}>
            <Text style={[
              isTie ? styles.teamNameLarge : (homeTeamWon ? styles.teamNameWinner : styles.teamNameLarge),
              !isTie && !homeTeamWon && styles.teamNameLoser
            ]}>
              {game.homeTeam.name}
            </Text>
            <Text
              style={[
                styles.scoreText,
                !isTie && !homeTeamWon && styles.scoreTextLoser
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
            >
              {game.homeTeam.score}
            </Text>
            <Image
              source={game.homeTeam.logo}
              style={[
                styles.teamLogoLarge,
                !isTie && !homeTeamWon && styles.teamLogoFaded
              ]}
            />
          </View>

          {/* Center - Win/Def/Tie indicator */}
          <View style={styles.resultContainer}>
            {/* Left arrow pointing to home team */}
            <Text style={[
              styles.arrowText,
              isTie
                ? styles.arrowGrayed
                : (game.userTeam === 'home'
                    ? (playerWon ? styles.arrowWin : styles.arrowGrayed)
                    : (playerWon ? styles.arrowGrayed : styles.arrowDefeat))
            ]}>
              ◀
            </Text>
            <Text style={styles.resultText}>
              {isTie ? 'TIE' : (playerWon ? 'WIN' : 'DEF')}
            </Text>
            {/* Right arrow pointing to away team */}
            <Text style={[
              styles.arrowText,
              isTie
                ? styles.arrowGrayed
                : (game.userTeam === 'away'
                    ? (playerWon ? styles.arrowWin : styles.arrowGrayed)
                    : (playerWon ? styles.arrowGrayed : styles.arrowDefeat))
            ]}>
              ▶
            </Text>
          </View>

          {/* Right Team */}
          <View style={styles.teamSection}>
            <Text style={[
              isTie ? styles.teamNameLarge : (awayTeamWon ? styles.teamNameWinner : styles.teamNameLarge),
              !isTie && !awayTeamWon && styles.teamNameLoser
            ]}>
              {game.awayTeam.name}
            </Text>
            <Text
              style={[
                styles.scoreText,
                !isTie && !awayTeamWon && styles.scoreTextLoser
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
            >
              {game.awayTeam.score}
            </Text>
            <Image
              source={game.awayTeam.logo}
              style={[
                styles.teamLogoLarge,
                !isTie && !awayTeamWon && styles.teamLogoFaded
              ]}
            />
          </View>
        </View>

        {/* Stats Grid - 4x4 */}
        <View style={styles.cardStats}>
          <View style={styles.cardStatsRow}>
            {firstRow.map(([key, value]) => (
              <View key={key} style={styles.statBox}>
                <Text
                  style={styles.statBoxValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.5}
                >
                  {value}
                </Text>
                <Text
                  style={styles.statBoxLabel}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                  maxFontSizeMultiplier={1}
                >
                  {formatStatLabel(key)}
                </Text>
              </View>
            ))}
          </View>
          {secondRow.length > 0 && (
            <View style={styles.cardStatsRow}>
              {secondRow.map(([key, value]) => (
                <View key={key} style={styles.statBox}>
                  <Text
                    style={styles.statBoxValue}
                    numberOfLines={1}
                  >
                    {value}
                  </Text>
                  <Text
                    style={styles.statBoxLabel}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                    maxFontSizeMultiplier={1}
                  >
                    {formatStatLabel(key)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCareerAverageCard = (average: CareerAverage) => {
    const isSoccer = sport === 'soccer';

    // Choose the appropriate stats based on statDisplayMode
    const sourceStats = statDisplayMode === 'perGame' ? average.stats : average.totals;

    // Get all stats (excluding yellow/red cards for now)
    const otherStats: Record<string, number | string> = {};
    Object.entries(sourceStats).forEach(([key, value]) => {
      if (key !== 'Yellow Cards' && key !== 'Yellow Card' &&
          key !== 'Red Card' && key !== 'Red Cards') {
        // Format percentage values
        if (typeof value === 'number' && (key.includes('%') || key.includes('Acc') || key === 'Pass Acc.' || key === 'Pass Accuracy')) {
          otherStats[key] = `${value.toFixed(1)}%`;
        } else if (typeof value === 'number' && value % 1 !== 0 && statDisplayMode === 'perGame') {
          // Only show decimals for per-game stats
          otherStats[key] = value.toFixed(1);
        } else {
          otherStats[key] = value;
        }
      }
    });

    // Only add yellow cards and red cards for soccer
    const normalizedStats: Record<string, number | string> = { ...otherStats };

    if (isSoccer) {
      // Get yellow cards and red cards values (handle both singular and plural)
      const yellowCards = sourceStats['Yellow Cards'] ?? sourceStats['Yellow Card'] ?? 0;
      const redCard = sourceStats['Red Card'] ?? sourceStats['Red Cards'] ?? 0;

      // Always include yellow cards and red cards at the end for soccer
      if (statDisplayMode === 'perGame') {
        normalizedStats['Yellow Cards'] = typeof yellowCards === 'number' ? yellowCards.toFixed(1) : yellowCards;
        normalizedStats['Red Card'] = typeof redCard === 'number' ? redCard.toFixed(1) : redCard;
      } else {
        normalizedStats['Yellow Cards'] = yellowCards;
        normalizedStats['Red Card'] = redCard;
      }
    }

    const statEntries = Object.entries(normalizedStats);

    // Create 4x4 grid - take first 8 stats (2 rows of 4)
    const firstRow = statEntries.slice(0, 4);
    const secondRow = statEntries.slice(4, 8);

    return (
      <View key={average.seasonId} style={styles.card}>
        {/* Gold Header with Season */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderCenter}>
            <Text style={styles.cardDate}>{average.season}</Text>
          </View>
        </View>

        {/* Team Info */}
        <View style={styles.matchupContainer}>
          <View style={styles.teamSection}>
            <Text style={styles.teamNameLarge}>{average.team.name}</Text>
            <Text style={styles.cardSeason}>{average.league}</Text>
            <Image source={average.team.logo} style={styles.teamLogoLarge} />
          </View>
        </View>

        {/* Stats Grid - 4x4 */}
        <View style={styles.cardStats}>
          <View style={styles.cardStatsRow}>
            {firstRow.map(([key, value]) => (
              <View key={key} style={styles.statBox}>
                <Text
                  style={styles.statBoxValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.5}
                >
                  {value}
                </Text>
                <Text
                  style={styles.statBoxLabel}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                  maxFontSizeMultiplier={1}
                >
                  {formatStatLabel(key)}
                </Text>
              </View>
            ))}
          </View>
          {secondRow.length > 0 && (
            <View style={styles.cardStatsRow}>
              {secondRow.map(([key, value]) => (
                <View key={key} style={styles.statBox}>
                  <Text
                    style={styles.statBoxValue}
                    numberOfLines={1}
                  >
                    {value}
                  </Text>
                  <Text
                    style={styles.statBoxLabel}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                    maxFontSizeMultiplier={1}
                  >
                    {formatStatLabel(key)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  // Handle filter apply
  const handleApplyFilters = (filters: FilterState) => {
    if (viewMode === 'gameLogs') {
      setGameLogsFilters(filters);
    } else {
      setCareerAvgFilters(filters);
    }
  };

  // Handle filter reset
  const handleResetFilters = () => {
    if (viewMode === 'gameLogs') {
      setGameLogsFilters({ sortOrder: 'recent' });
    } else {
      setCareerAvgFilters({ statDisplay: 'perGame' });
    }
  };

  // Get current filters and sections based on view mode
  const currentFilters = viewMode === 'gameLogs' ? gameLogsFilters : careerAvgFilters;
  const currentFilterSections = viewMode === 'gameLogs' ? gameLogsFilterSections : careerAvgFilterSections;

  const accentColor = COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.sectionTitle}>Game History</Text>
      </View>

      {/* View Mode Toggle with Filter Button */}
      <View style={styles.headerContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'gameLogs' && styles.toggleButtonActive,
            ]}
            onPress={() => onViewModeChange('gameLogs')}
          >
            <Text
              style={[
                styles.toggleButtonText,
                viewMode === 'gameLogs' && styles.toggleButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Game Logs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'careerAverages' && styles.toggleButtonActive,
            ]}
            onPress={() => onViewModeChange('careerAverages')}
          >
            <Text
              style={[
                styles.toggleButtonText,
                viewMode === 'careerAverages' && styles.toggleButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Career Averages
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <FilterIcon width={20} height={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Game Logs or Career Averages List */}
      <View style={styles.logsContainer}>
        {viewMode === 'gameLogs'
          ? filteredGameLogs.map((game) => renderGameLogCard(game))
          : filteredCareerAverages.map((average) => renderCareerAverageCard(average))
        }
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        sections={currentFilterSections}
        selectedFilters={currentFilters}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: COLORS.gray150,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.gray850,
  },
  toggleButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flexShrink: 1,
  },
  toggleButtonTextActive: {
    color: COLORS.white,
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
  logsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  cardHeader: {
    backgroundColor: COLORS.black,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  cardHeaderCenter: {
    alignItems: 'center',
  },
  cardDate: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
  },
  matchupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamNameLarge: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  teamNameWinner: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  teamNameLoser: {
    opacity: 0.5,
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 40,
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 44,
    flexShrink: 0,
  },
  scoreTextLoser: {
    color: '#999',
    opacity: 0.6,
  },
  teamLogoLarge: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  teamLogoFaded: {
    opacity: 0.4,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  resultText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    letterSpacing: 1,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowWin: {
    color: COLORS.goldAccent,
  },
  arrowDefeat: {
    color: COLORS.black,
  },
  arrowGrayed: {
    color: '#D3D3D3',
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
  },
  scoreContainer: {
    paddingHorizontal: 16,
  },
  vsText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: '#999',
    letterSpacing: 1,
  },
  cardTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  cardSeason: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 13,
    color: COLORS.black,
    textAlign: 'center',
    opacity: 0.5,
  },
  cardStats: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderStyle: 'dashed',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 60,
    maxWidth: 100,
    flexShrink: 0,
    paddingHorizontal: 4,
  },
  statBoxLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 9,
    color: '#B3B3B3',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
    width: '100%',
  },
  statBoxValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 28,
    width: '100%',
    flexShrink: 0,
  },
});

export default GameLogsSection;
