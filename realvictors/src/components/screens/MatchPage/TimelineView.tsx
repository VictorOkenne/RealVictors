/**
 * TimelineView Component
 *
 * Displays match timeline with centered timeline using widget-based architecture
 * Soccer: Halftime, fulltime, goals, cards, substitutions
 * Basketball: Quarters, scoring runs, 3-pointers, timeouts, substitutions
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { BasketballTimeline } from '../../widgets/MatchGame/BasketballTimeline';
import { MatchScoreHeader } from '../../widgets/MatchGame/MatchScoreHeader';
import { TimelineEvent } from '../../widgets/MatchGame/TimelineEvent';
import { MatchData, MatchEvent } from './mockData';

interface TimelineViewProps {
  matchData: MatchData;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ matchData }) => {
  const isSoccer = matchData.sport === 'soccer';
  const isBasketball = matchData.sport === 'basketball';

  // Sort events from latest to earliest
  const sortedEvents = [...matchData.events].sort((a, b) => b.minute - a.minute);


  const renderEvent = (event: MatchEvent) => {
    // Handle basketball quarter events
    if (isBasketball && event.type === 'quarter_start') {
      return (
        <View key={event.id} style={styles.divider}>
          <Text style={styles.dividerText}>{event.description}</Text>
        </View>
      );
    }

    if (isBasketball && event.type === 'quarter_end') {
      return (
        <View key={event.id} style={styles.divider}>
          <Text style={styles.dividerText}>{event.description}</Text>
        </View>
      );
    }

    // Handle soccer halftime
    if (isSoccer && event.type === 'halftime') {
      // Calculate halftime score
      let homeHalftimeScore = 0;
      let awayHalftimeScore = 0;
      matchData.events.forEach(e => {
        if (e.minute <= 45 && e.type === 'goal') {
          if (e.team === 'home') homeHalftimeScore++;
          else if (e.team === 'away') awayHalftimeScore++;
        }
      });

      return (
        <View key={event.id} style={styles.divider}>
          <Text style={styles.dividerText}>HALF TIME {homeHalftimeScore}-{awayHalftimeScore}</Text>
        </View>
      );
    }

    if (event.type === 'fulltime') {
      const label = isBasketball ? 'FINAL' : 'FINAL TIME';
      return (
        <View key={event.id} style={styles.divider}>
          <Text style={styles.dividerText}>{label} {matchData.homeScore}-{matchData.awayScore}</Text>
        </View>
      );
    }

    if (event.type === 'match_start') {
      const label = isBasketball ? 'TIP-OFF' : 'MATCH STARTS';
      return (
        <View key={event.id} style={styles.divider}>
          <Text style={styles.dividerText}>{label}</Text>
        </View>
      );
    }

    // Handle basketball scoring runs
    if (isBasketball && event.type === 'scoring_run') {
      return (
        <View key={event.id} style={styles.scoringRunDivider}>
          <Text style={styles.scoringRunText}>
            {event.points}-0 RUN by {event.team === 'home' ? matchData.homeTeam.shortName : matchData.awayTeam.shortName}
          </Text>
        </View>
      );
    }

    // Render regular events
    return (
      <TimelineEvent
        key={event.id}
        event={event}
        homeTeam={matchData.homeTeam}
        awayTeam={matchData.awayTeam}
      />
    );
  };

  // Basketball uses table timeline, Soccer uses traditional timeline
  if (isBasketball) {
    return (
      <View style={styles.container}>
        <BasketballTimeline
          events={matchData.events}
          homeTeam={matchData.homeTeam}
          awayTeam={matchData.awayTeam}
        />
      </View>
    );
  }

  // Soccer timeline (original)
  return (
    <View style={styles.container}>
      {/* Match Score Header */}
      <MatchScoreHeader
        homeTeam={{
          name: matchData.homeTeam.name,
          shortName: matchData.homeTeam.shortName,
          logo: matchData.homeTeam.logo,
          primaryColor: matchData.homeTeam.primaryColor,
        }}
        awayTeam={{
          name: matchData.awayTeam.name,
          shortName: matchData.awayTeam.shortName,
          logo: matchData.awayTeam.logo,
          primaryColor: matchData.awayTeam.primaryColor,
        }}
        homeScore={matchData.homeScore}
        awayScore={matchData.awayScore}
      />

      {/* Timeline Container */}
      <View style={styles.timelineContainer}>
        {/* Central Timeline Line */}
        <View style={styles.timelineLine} />

        {/* Events */}
        {sortedEvents.map(renderEvent)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  // Soccer timeline styles
  timelineContainer: {
    position: 'relative',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.gray200,
    zIndex: 50,
  },
  divider: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
    position: 'relative',
    zIndex: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  dividerText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  scoringRunDivider: {
    backgroundColor: COLORS.goldAccentLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
    zIndex: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  scoringRunText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    letterSpacing: 0.5,
  },
});

