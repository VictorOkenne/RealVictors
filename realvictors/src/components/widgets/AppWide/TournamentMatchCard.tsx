/**
 * TournamentMatchCard Component - Clean Bracket Design
 *
 * Simple, clean match card inspired by March Madness and professional tournament brackets
 * - Vertical team stacking
 * - Clear winner indication
 * - Minimal styling for clarity
 * - Big, readable text
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
  TBDTeam,
  TeamInMatch,
  TournamentMatch,
} from '../../screens/TeamProfilePage/mockData';

interface TournamentMatchCardProps {
  match: TournamentMatch;
  highlightedTeam?: string;
  onMatchPress?: (matchId: string) => void;
}

/**
 * Check if a team is TBD
 */
const isTBDTeam = (team: TeamInMatch): team is TBDTeam => {
  return 'isTBD' in team && team.isTBD === true;
};

/**
 * Get match status and teams based on match type
 */
const getMatchInfo = (match: TournamentMatch) => {
  if (match.matchType === 'single') {
    return {
      team1: match.team1,
      team2: match.team2,
      score1: !isTBDTeam(match.team1) ? match.team1.score : undefined,
      score2: !isTBDTeam(match.team2) ? match.team2.score : undefined,
      status: match.status,
    };
  } else if (match.matchType === 'two-leg') {
    return {
      team1: match.team1,
      team2: match.team2,
      score1: match.aggregateScore?.team1,
      score2: match.aggregateScore?.team2,
      status: match.status,
    };
  } else if (match.matchType === 'series') {
    return {
      team1: match.team1,
      team2: match.team2,
      score1: match.currentScore.team1Wins,
      score2: match.currentScore.team2Wins,
      status: match.status,
    };
  }
  return { team1: match.team1, team2: match.team2, status: 'tbd' };
};

/**
 * Simple Team Row Component
 */
interface TeamRowProps {
  team: TeamInMatch;
  score?: number;
  isWinner: boolean;
  isHighlighted: boolean;
}

const TeamRow: React.FC<TeamRowProps> = ({ team, score, isWinner, isHighlighted }) => {
  if (isTBDTeam(team)) {
    return (
      <View style={[styles.teamRow, styles.tbdRow]}>
        <Text style={styles.tbdText}>{team.placeholder}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.teamRow,
        isWinner && styles.teamRowWinner,
        isHighlighted && styles.teamRowHighlighted,
      ]}
    >
      <View style={styles.teamContent}>
        <Image source={team.logo} style={styles.teamLogo} resizeMode="contain" />
        <Text style={[styles.teamName, isWinner && styles.teamNameWinner]} numberOfLines={1}>
          {team.shortName}
        </Text>
      </View>
      {score !== undefined && (
        <View style={[styles.scoreContainer, isWinner && styles.scoreContainerWinner]}>
          <Text style={[styles.scoreText, isWinner && styles.scoreTextWinner]}>{score}</Text>
        </View>
      )}
    </View>
  );
};

/**
 * Main Match Card Component
 */
export const TournamentMatchCard: React.FC<TournamentMatchCardProps> = ({
  match,
  highlightedTeam,
  onMatchPress,
}) => {
  const { team1, team2, score1, score2, status } = getMatchInfo(match);

  // Determine winners
  const isTeam1Winner = score1 !== undefined && score2 !== undefined && score1 > score2;
  const isTeam2Winner = score1 !== undefined && score2 !== undefined && score2 > score1;

  // Determine highlighting
  const isTeam1Highlighted = !isTBDTeam(team1) && team1.shortName === highlightedTeam;
  const isTeam2Highlighted = !isTBDTeam(team2) && team2.shortName === highlightedTeam;

  // Show status indicator - only show FINAL for completed matches
  const showStatus = status === 'completed';
  const statusText = 'FINAL';

  // Check if match has multiple games (two-leg or series)
  const hasDetails = match.matchType === 'two-leg' || match.matchType === 'series';

  const handlePress = () => {
    if (hasDetails && onMatchPress) {
      onMatchPress(match.matchId);
    }
  };

  const CardWrapper = hasDetails ? TouchableOpacity : View;
  const cardProps = hasDetails ? { onPress: handlePress, activeOpacity: 0.8 } : {};

  return (
    <CardWrapper style={styles.matchCard} {...cardProps}>
      {/* Optional Status Badge */}
      {showStatus && statusText && (
        <View style={[styles.statusBadge, status === 'in_progress' && styles.statusLive]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      )}

      {/* Team 1 */}
      <TeamRow
        team={team1}
        score={score1}
        isWinner={isTeam1Winner}
        isHighlighted={isTeam1Highlighted}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Team 2 */}
      <TeamRow
        team={team2}
        score={score2}
        isWinner={isTeam2Winner}
        isHighlighted={isTeam2Highlighted}
      />

      {/* "See Details" indicator for multi-game matches */}
      {hasDetails && (
        <View style={styles.detailsIndicator}>
          <Text style={styles.detailsText}>See details</Text>
        </View>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
    width: 200,
  },

  // Status Badge
  statusBadge: {
    backgroundColor: COLORS.black,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  statusLive: {
    backgroundColor: COLORS.black,
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 8,
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // Team Row
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    minHeight: 44,
  },
  teamRowWinner: {
    backgroundColor: '#FFFBEB',
  },
  teamRowHighlighted: {
    backgroundColor: '#FEF3C7',
  },
  tbdRow: {
    backgroundColor: COLORS.gray50,
    borderStyle: 'dashed',
  },

  // Team Content
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  teamLogo: {
    width: 24,
    height: 24,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.gray700,
    flex: 1,
  },
  teamNameWinner: {
    color: COLORS.black,
  },

  // Score
  scoreContainer: {
    minWidth: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scoreContainerWinner: {
    backgroundColor: COLORS.goldAccent,
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.gray700,
  },
  scoreTextWinner: {
    color: COLORS.black,
  },

  // TBD
  tbdText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.gray400,
    textAlign: 'center',
    flex: 1,
  },

  // Divider
  divider: {
    height: 1.5,
    backgroundColor: COLORS.gray200,
  },

  // Details Indicator
  detailsIndicator: {
    backgroundColor: COLORS.gray50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderTopColor: COLORS.gray200,
  },
  detailsText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
