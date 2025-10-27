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
        return (
          <View style={styles.goalIcon}>
            <Text style={styles.goalEmoji}>⚽</Text>
          </View>
        );
      case 'yellow_card':
        return <View style={styles.yellowCard} />;
      case 'red_card':
        return <View style={styles.redCard} />;
      case 'substitution':
        return (
          <View style={styles.substitutionIcons}>
            <View style={styles.subIconContainer}>
              <Text style={styles.subIconText}>↓</Text>
            </View>
            <View style={styles.subIconContainer}>
              <Text style={styles.subIconText}>↑</Text>
            </View>
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
    // Handle match start, halftime and fulltime as dividers
    if (event.type === 'halftime') {
      // Calculate halftime score by counting goals before halftime
      let homeHalftimeScore = 0;
      let awayHalftimeScore = 0;
      matchData.events.forEach(e => {
        if (e.minute <= 45 && e.type === 'goal') {
          if (e.team === 'home') homeHalftimeScore++;
          else if (e.team === 'away') awayHalftimeScore++;
        }
      });
      return (
        <View key={event.id} style={styles.timelineDivider}>
          <Text style={styles.dividerText}>HALF TIME {homeHalftimeScore}-{awayHalftimeScore}</Text>
        </View>
      );
    }

    if (event.type === 'fulltime') {
      return (
        <View key={event.id} style={styles.timelineDivider}>
          <Text style={styles.dividerText}>FINAL TIME {matchData.homeScore}-{matchData.awayScore}</Text>
        </View>
      );
    }

    const isHomeTeam = event.team === 'home';
    const jerseyImage = isHomeTeam
      ? matchData.homeTeam.jerseys.home
      : matchData.awayTeam.jerseys.away;

    // For substitutions, render differently
    if (event.type === 'substitution' && event.substitution) {
      return (
        <View key={event.id} style={[styles.timelineEvent, isHomeTeam ? styles.homeEvent : styles.awayEvent]}>
          {isHomeTeam ? (
            <>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{event.minute}</Text>
              </View>
              <View style={styles.playerInfoContainer}>
                <View style={styles.jerseyContainer}>
                  <Image source={{ uri: jerseyImage }} style={styles.jerseyImage} />
                  <View style={styles.playerBadge}>
                    <Text style={styles.playerName}>{event.substitution.playerIn.name}</Text>
                    {renderEventIcon(event)}
                    <Text style={styles.playerName}>{event.substitution.playerOut.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.spacer} />
            </>
          ) : (
            <>
              <View style={styles.spacer} />
              <View style={styles.playerInfoContainer}>
                <View style={styles.jerseyContainer}>
                  <Image source={{ uri: jerseyImage }} style={styles.jerseyImage} />
                  <View style={styles.playerBadge}>
                    {renderEventIcon(event)}
                    <Text style={styles.playerName}>{event.substitution.playerIn.name}</Text>
                    <Text style={styles.playerName}>{event.substitution.playerOut.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{event.minute}</Text>
              </View>
            </>
          )}
        </View>
      );
    }

    // Regular events (goals, cards)
    return (
      <View key={event.id} style={[styles.timelineEvent, isHomeTeam ? styles.homeEvent : styles.awayEvent]}>
        {isHomeTeam ? (
          <>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{event.minute}</Text>
            </View>
            <View style={styles.playerInfoContainer}>
              <View style={styles.jerseyContainer}>
                <Image source={{ uri: jerseyImage }} style={styles.jerseyImage} />
                <View style={styles.playerBadge}>
                  <Text style={styles.playerName}>{event.player?.name}</Text>
                  {renderEventIcon(event)}
                  {event.assistPlayer && (
                    <Text style={styles.assistName}>{event.assistPlayer.name}</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.spacer} />
          </>
        ) : (
          <>
            <View style={styles.spacer} />
            <View style={styles.playerInfoContainer}>
              <View style={styles.jerseyContainer}>
                <Image source={{ uri: jerseyImage }} style={styles.jerseyImage} />
                <View style={styles.playerBadge}>
                  {renderEventIcon(event)}
                  <Text style={styles.playerName}>{event.player?.name}</Text>
                  {event.assistPlayer && (
                    <Text style={styles.assistName}>{event.assistPlayer.name}</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{event.minute}</Text>
            </View>
          </>
        )}
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

      {/* Timeline */}
      <View style={styles.timeline}>
        {/* Timeline line */}
        <View style={styles.timelineLine} />

        {sortedEvents.map(renderEvent)}

        {/* Match starts divider */}
        <View style={styles.timelineDivider}>
          <Text style={styles.dividerText}>MATCH STARTS</Text>
        </View>
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
    paddingBottom: 60,
  },

  // Score Header
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    marginHorizontal: 16,
    marginTop: 16,
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

  // Timeline
  timeline: {
    position: 'relative',
    paddingBottom: 60,
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.gray200,
    marginLeft: -0.5,
  },

  // Timeline Event
  timelineEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 21,
    gap: 20,
  },
  homeEvent: {
    justifyContent: 'flex-start',
  },
  awayEvent: {
    justifyContent: 'flex-end',
  },

  // Time Badge
  timeBadge: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
  },

  // Player Info
  playerInfoContainer: {
    flex: 0,
  },
  jerseyContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  jerseyImage: {
    width: 89,
    height: 67,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  playerBadge: {
    position: 'absolute',
    bottom: -5,
    backgroundColor: 'rgba(216, 216, 216, 0.5)',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 334,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
  },
  assistName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#827f7f',
  },

  // Event Icons
  goalIcon: {
    width: 23,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalEmoji: {
    fontSize: 16,
  },
  yellowCard: {
    width: 15,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  redCard: {
    width: 15,
    height: 20,
    backgroundColor: '#FF5757',
    borderRadius: 2,
  },
  substitutionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  subIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subIconText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },

  // Spacer
  spacer: {
    flex: 1,
  },

  // Timeline Divider
  timelineDivider: {
    backgroundColor: COLORS.gray200,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
    position: 'relative',
    zIndex: 1,
  },
  dividerText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
    letterSpacing: 0.5,
  },
});

