/**
 * MatchDetailsModal Component
 *
 * Modal that shows detailed game-by-game breakdown for:
 * - Two-leg matches (1st leg, 2nd leg)
 * - Series matches (Game 1, Game 2, etc.)
 *
 * Uses GameCard component to display each individual game
 */

import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { TournamentMatch, TBDTeam } from '../../screens/TeamProfilePage/mockData';
import { GameCard } from '../MatchGame/GameCard';

/**
 * Check if a team is TBD
 */
const isTBDTeam = (team: any): team is TBDTeam => {
  return 'isTBD' in team && team.isTBD === true;
};

interface MatchDetailsModalProps {
  visible: boolean;
  match: TournamentMatch | null;
  onClose: () => void;
  onGamePress?: (matchId: string, gameId?: string) => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({
  visible,
  match,
  onClose,
  onGamePress,
}) => {
  if (!match) return null;

  // Get team information
  const getTeamInfo = () => {
    if (match.matchType === 'two-leg') {
      return {
        team1: match.team1,
        team2: match.team2,
      };
    } else if (match.matchType === 'series') {
      return {
        team1: match.team1,
        team2: match.team2,
      };
    }
    return null;
  };

  const teams = getTeamInfo();

  // Render two-leg match details using GameCard
  const renderTwoLegDetails = () => {
    if (match.matchType !== 'two-leg') return null;
    if (!teams || isTBDTeam(teams.team1) || isTBDTeam(teams.team2)) return null;

    return (
      <View style={styles.gamesContainer}>
        {/* First Leg */}
        {match.firstLeg && (
          <View style={styles.gameCardContainer}>
            <View style={styles.gameCardScaler}>
              <GameCard
                homeTeam={{
                  name: teams.team1.name,
                  logo: teams.team1.logo,
                }}
                awayTeam={{
                  name: teams.team2.name,
                  logo: teams.team2.logo,
                }}
                time={match.firstLeg.completed ? '' : 'TBD'}
                date={match.firstLeg.date}
                location={match.firstLeg.venue}
                leagueName="UEFA Champions League"
                matchStage="1st Leg"
                score={match.firstLeg.completed ? {
                  home: match.firstLeg.score1,
                  away: match.firstLeg.score2,
                } : undefined}
                onPress={() => onGamePress?.(match.matchId, 'first-leg')}
                enableSwipe={false}
              />
            </View>
          </View>
        )}

        {/* Second Leg */}
        {match.secondLeg && (
          <View style={styles.gameCardContainer}>
            <View style={styles.gameCardScaler}>
              <GameCard
                homeTeam={{
                  name: teams.team1.name,
                  logo: teams.team1.logo,
                }}
                awayTeam={{
                  name: teams.team2.name,
                  logo: teams.team2.logo,
                }}
                time={match.secondLeg.completed ? '' : 'TBD'}
                date={match.secondLeg.date}
                location={match.secondLeg.venue}
                leagueName="UEFA Champions League"
                matchStage="2nd Leg"
                score={match.secondLeg.completed ? {
                  home: match.secondLeg.score1,
                  away: match.secondLeg.score2,
                } : undefined}
                onPress={() => onGamePress?.(match.matchId, 'second-leg')}
                enableSwipe={false}
              />
            </View>
          </View>
        )}

        {/* Aggregate Score */}
        {match.aggregateScore && (
          <View style={styles.aggregateCard}>
            <Text style={styles.aggregateLabel}>AGGREGATE</Text>
            <View style={styles.aggregateScoreRow}>
              <Text style={styles.aggregateScore}>
                {match.aggregateScore.team1} - {match.aggregateScore.team2}
              </Text>
            </View>
            {match.winner && (
              <Text style={styles.winnerText}>🏆 {match.winner} advances</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  // Render series match details using GameCard
  const renderSeriesDetails = () => {
    if (match.matchType !== 'series') return null;
    if (!teams || isTBDTeam(teams.team1) || isTBDTeam(teams.team2)) return null;

    return (
      <View style={styles.gamesContainer}>
        {/* Series Status */}
        <View style={styles.seriesStatusCard}>
          <Text style={styles.seriesStatusLabel}>Series Status</Text>
          <Text style={styles.seriesStatusText}>{match.seriesStatus}</Text>
          <View style={styles.seriesScoreRow}>
            <Text style={styles.seriesScore}>
              {match.currentScore.team1Wins} - {match.currentScore.team2Wins}
            </Text>
          </View>
          <Text style={styles.seriesLength}>Best of {match.seriesLength}</Text>
        </View>

        {/* Individual Games using GameCard */}
        {match.games.map((game) => (
          <View key={game.gameNumber} >
            <View style={styles.gameCardScaler}>
              <GameCard
                homeTeam={{
                  name: teams.team1.name,
                  logo: teams.team1.logo,
                }}
                awayTeam={{
                  name: teams.team2.name,
                  logo: teams.team2.logo,
                }}
                time=""
                date={game.date}
                location={game.venue}
                leagueName="NBA Playoffs"
                matchStage={`Game ${game.gameNumber}`}
                score={{
                  home: game.score1,
                  away: game.score2,
                }}
                onPress={() => onGamePress?.(match.matchId, `game-${game.gameNumber}`)}
                enableSwipe={false}
                sport="basketball"
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const getMatchTitle = () => {
    if (match.matchType === 'two-leg') {
      return 'Two-Leg Match Details';
    } else if (match.matchType === 'series') {
      return 'Series Details';
    }
    return 'Match Details';
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{getMatchTitle()}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {match.matchType === 'two-leg' && renderTwoLegDetails()}
            {match.matchType === 'series' && renderSeriesDetails()}

            <Text style={styles.tapHint}>Tap any game to view full details</Text>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: '98%',
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.gray600,
  },

  // Content
  content: {
    paddingVertical: 20,
    paddingHorizontal: 8,
  },

  gamesContainer: {
    gap: 16,
  },

  // Game Card Container
  gameCardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameCardScaler: {
    // No scaling - show GameCard at full size
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Aggregate Card
  aggregateCard: {
    backgroundColor: COLORS.goldAccent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  aggregateLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aggregateScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aggregateScore: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 36,
    color: COLORS.black,
  },
  winnerText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
  },

  // Series Status Card
  seriesStatusCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.goldAccent,
  },
  seriesStatusLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  seriesStatusText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.goldAccent,
  },
  seriesScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seriesScore: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 32,
    color: COLORS.black,
  },
  seriesLength: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
  },

  // Tap Hint
  tapHint: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray500,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
