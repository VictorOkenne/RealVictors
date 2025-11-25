/**
 * BasketballTimeline Component
 *
 * Displays basketball game timeline in table format
 * Shows scoring plays by quarter (Q4 to Q1, reverse chronological)
 * with player avatars, times, and running scores
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { MatchEvent, Team } from '../../screens/MatchPage/mockData';
import { PlayerAvatar } from '../Player/PlayerAvatar';

interface BasketballTimelineProps {
  events: MatchEvent[];
  homeTeam: Team;
  awayTeam: Team;
}

export const BasketballTimeline: React.FC<BasketballTimelineProps> = ({
  events,
  homeTeam,
  awayTeam,
}) => {
  // Basketball scoring timeline renderer
  const renderBasketballScoreRow = (event: MatchEvent) => {
    if (!event.player || !event.time || !event.scoreType) return null;

    return (
      <View key={event.id} style={styles.basketballScoreRow}>
        {/* Player Avatar */}
        <View style={styles.avatarColumn}>
          <PlayerAvatar
            profileImage={event.player.profileImage}
            size={36}
            circularBackground={true}
          />
        </View>

        {/* Time */}
        <Text style={styles.timeColumn}>{event.time}</Text>

        {/* Score Type + Player Name */}
        <View style={styles.scoreInfoColumn}>
          <Text style={styles.playerName} numberOfLines={1}>
            {event.player.name}
          </Text>
          <Text style={styles.scoreType}>{event.scoreType}</Text>
        </View>

        {/* Scores */}
        <View style={styles.scoresColumn}>
          <Text style={[styles.scoreText, event.team === 'home' && styles.scoreHighlight]}>
            {event.homeScore}
          </Text>
          <Text style={styles.scoreSeparator}>-</Text>
          <Text style={[styles.scoreText, event.team === 'away' && styles.scoreHighlight]}>
            {event.awayScore}
          </Text>
        </View>
      </View>
    );
  };

  // Group events by quarter (Q4, Q3, Q2, Q1)
  const quarters = [
    { number: 4, label: 'Fourth Quarter' },
    { number: 3, label: 'Third Quarter' },
    { number: 2, label: 'Second Quarter' },
    { number: 1, label: 'First Quarter' },
  ];
  const scoringEvents = events.filter(e => e.type === 'score');

  return (
    <View style={styles.basketballContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.avatarColumn} />
        <Text style={styles.headerTimeText}>TIME</Text>
        <Text style={styles.headerScoreInfo}>PLAYER</Text>
        <View style={styles.scoresColumn}>
          <Text style={styles.teamAbbreviation}>{homeTeam.shortName}</Text>
          <Text style={styles.scoreSeparator}>-</Text>
          <Text style={styles.teamAbbreviation}>{awayTeam.shortName}</Text>
        </View>
      </View>

      {/* Quarter Sections */}
      {quarters.map(quarter => {
        const quarterEvents = scoringEvents
          .filter(e => e.quarter === quarter.number)
          .sort((a, b) => b.minute - a.minute);

        if (quarterEvents.length === 0) return null;

        return (
          <View key={`quarter-${quarter.number}`} style={styles.quarterSection}>
            {/* Quarter Label */}
            <View style={styles.quarterHeader}>
              <Text style={styles.quarterLabel}>{quarter.label}</Text>
            </View>

            {/* Scoring Events */}
            {quarterEvents.map(event => renderBasketballScoreRow(event))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  basketballContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  avatarColumn: {
    width: 44,
    marginRight: 8,
  },
  headerTimeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
    width: 50,
    textAlign: 'center',
  },
  timeColumn: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    width: 50,
    textAlign: 'center',
  },
  headerScoreInfo: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
    marginLeft: 8,
  },
  scoreInfoColumn: {
    flex: 1,
    marginLeft: 8,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  scoreType: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    marginTop: 2,
  },
  scoresColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
  },
  teamAbbreviation: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
    width: 30,
    textAlign: 'center',
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    width: 30,
    textAlign: 'center',
  },
  scoreHighlight: {
    color: COLORS.goldAccent,
  },
  scoreSeparator: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray400,
    marginHorizontal: 4,
  },
  quarterSection: {
    marginBottom: 24,
  },
  quarterHeader: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  quarterLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
    letterSpacing: 1,
    textAlign: 'center',
  },
  basketballScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
});
