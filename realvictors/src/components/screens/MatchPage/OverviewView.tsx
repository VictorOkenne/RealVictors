/**
 * OverviewView Component
 *
 * Displays match overview including:
 * - Match timeline
 * - Key events (goals, cards, substitutions)
 * - Match summary
 */

import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { MatchData, MatchEvent } from './mockData';

interface OverviewViewProps {
  matchData: MatchData;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ matchData }) => {
  // Sort events from latest to earliest
  const sortedEvents = [...matchData.events].sort((a, b) => b.minute - a.minute);

  const renderEventIcon = (event: MatchEvent) => {
    switch (event.type) {
      case 'goal':
        return <Text style={styles.eventIcon}>⚽</Text>;
      case 'yellow_card':
        return <View style={styles.yellowCard} />;
      case 'red_card':
        return <View style={styles.redCard} />;
      case 'substitution':
        return (
          <View style={styles.substitutionIcons}>
            <Text style={styles.subIconOut}>↓</Text>
            <Text style={styles.subIconIn}>↑</Text>
          </View>
        );
      case 'halftime':
        return null;
      case 'fulltime':
        return null;
      default:
        return null;
    }
  };

  const renderEvent = (event: MatchEvent) => {
    // Handle halftime and fulltime differently
    if (event.type === 'halftime' || event.type === 'fulltime') {
      return (
        <View key={event.id} style={styles.halftimeContainer}>
          <View style={styles.halftimeLine} />
          <Text style={styles.halftimeText}>{event.description}</Text>
          <View style={styles.halftimeLine} />
        </View>
      );
    }

    const isHomeTeam = event.team === 'home';
    const teamColor = isHomeTeam ? matchData.homeTeam.primaryColor : matchData.awayTeam.primaryColor;

    return (
      <View key={event.id} style={styles.eventRow}>
        {/* Left side - Home team events */}
        <View style={[styles.eventSide, styles.eventSideLeft]}>
          {isHomeTeam && event.type !== 'substitution' && (
            <View style={styles.eventContent}>
              <Text style={styles.playerName}>{event.player?.name}</Text>
              {event.type === 'goal' && event.assistPlayer && (
                <Text style={styles.assistText}>Assist: {event.assistPlayer.name}</Text>
              )}
            </View>
          )}
          {isHomeTeam && event.type === 'substitution' && event.substitution && (
            <View style={styles.eventContent}>
              <View style={styles.substitutionContent}>
                <Text style={styles.playerNameSub}>{event.substitution.playerIn.name}</Text>
                <Text style={styles.playerNameSub}>{event.substitution.playerOut.name}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Center - Time and Icon */}
        <View style={styles.eventCenter}>
          <View style={[styles.timeCircle, { borderColor: teamColor }]}>
            <Text style={[styles.timeText, { color: teamColor }]}>{event.minute}'</Text>
          </View>
          <View style={styles.iconContainer}>
            {renderEventIcon(event)}
          </View>
        </View>

        {/* Right side - Away team events */}
        <View style={[styles.eventSide, styles.eventSideRight]}>
          {!isHomeTeam && event.type !== 'substitution' && (
            <View style={styles.eventContent}>
              <Text style={styles.playerName}>{event.player?.name}</Text>
              {event.type === 'goal' && event.assistPlayer && (
                <Text style={styles.assistText}>Assist: {event.assistPlayer.name}</Text>
              )}
            </View>
          )}
          {!isHomeTeam && event.type === 'substitution' && event.substitution && (
            <View style={styles.eventContent}>
              <View style={styles.substitutionContent}>
                <Text style={styles.playerNameSub}>{event.substitution.playerIn.name}</Text>
                <Text style={styles.playerNameSub}>{event.substitution.playerOut.name}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Score Header */}
      <View style={styles.scoreHeader}>
        {/* Home Team */}
        <View style={styles.teamSection}>
          <Image source={{ uri: matchData.homeTeam.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName} numberOfLines={1}>{matchData.homeTeam.shortName}</Text>
          <View style={[styles.scoreBox, { backgroundColor: matchData.homeTeam.primaryColor }]}>
            <Text style={styles.scoreText}>{matchData.homeScore}</Text>
          </View>
        </View>

        {/* Divider */}
        <Text style={styles.scoreDivider}>-</Text>

        {/* Away Team */}
        <View style={styles.teamSection}>
          <View style={[styles.scoreBox, { backgroundColor: matchData.awayTeam.primaryColor }]}>
            <Text style={styles.scoreText}>{matchData.awayScore}</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={1}>{matchData.awayTeam.shortName}</Text>
          <Image source={{ uri: matchData.awayTeam.logo }} style={styles.teamLogo} />
        </View>
      </View>

      {/* Match Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Full Time</Text>
      </View>

      {/* Timeline */}
      <View style={styles.timeline}>
        {sortedEvents.map(renderEvent)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  // Score Header
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  teamSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    flex: 1,
  },
  scoreBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.white,
  },
  scoreDivider: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.gray400,
    marginHorizontal: 8,
  },

  // Status
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Timeline
  timeline: {
    gap: 12,
  },

  // Event Row
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 60,
  },
  eventSide: {
    flex: 1,
    justifyContent: 'center',
  },
  eventSideLeft: {
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  eventSideRight: {
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  eventContent: {
    maxWidth: '90%',
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  assistText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    marginTop: 2,
  },
  substitutionContent: {
    gap: 4,
  },
  playerNameSub: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },

  // Event Center
  eventCenter: {
    alignItems: 'center',
    gap: 8,
  },
  timeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
  },
  eventIcon: {
    fontSize: 20,
  },
  yellowCard: {
    width: 14,
    height: 20,
    backgroundColor: '#FFEB3B',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#FDD835',
  },
  redCard: {
    width: 14,
    height: 20,
    backgroundColor: '#F44336',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  substitutionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  subIconOut: {
    fontSize: 16,
    color: COLORS.error,
  },
  subIconIn: {
    fontSize: 16,
    color: COLORS.success,
  },

  // Halftime
  halftimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  halftimeLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  halftimeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginHorizontal: 12,
  },
});

