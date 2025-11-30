/**
 * MatchesView Component (Team Profile)
 *
 * Displays team matches with:
 * - Upcoming Matches (horizontal scroll)
 * - Previous Matches (vertical list)
 */

import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { LocationIcon } from '../../icons';
import { TeamMatch } from './mockData';

interface MatchesViewProps {
  upcomingMatches?: TeamMatch[];
  previousMatches?: TeamMatch[];
}

interface UpcomingMatchCardProps {
  match: TeamMatch;
  onPress: () => void;
}

const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({ match, onPress }) => {
  return (
    <TouchableOpacity style={styles.upcomingCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.upcomingCardContent}>
        {/* Competition Name */}
        <Text style={styles.competitionName}>{match.competition}</Text>

        {/* Teams and Time */}
        <View style={styles.matchupContainer}>
          {/* Home Team */}
          <View style={styles.teamContainer}>
            <Image source={match.homeTeam.logo} style={styles.teamLogo} resizeMode="contain" />
            <Text style={styles.teamLabel}>HOME</Text>
          </View>

          {/* Time */}
          <View style={styles.timeContainer}>
            <Text style={styles.matchTime}>{match.matchTime}</Text>
            <Text style={styles.matchDate}>{match.matchDate}</Text>
          </View>

          {/* Away Team */}
          <View style={styles.teamContainer}>
            <Image source={match.awayTeam.logo} style={styles.teamLogo} resizeMode="contain" />
            <Text style={styles.teamLabel}>AWAY</Text>
          </View>
        </View>

        {/* Venue */}
        {match.venue && (
          <View style={styles.venueContainer}>
            <LocationIcon width={14} height={14} color={COLORS.gold} />
            <Text style={styles.venueText}>{match.venue}</Text>
          </View>
        )}

        {/* Group (if applicable) */}
        {match.group && (
          <View style={styles.groupBadge}>
            <Text style={styles.groupText}>{match.group}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

interface PreviousMatchCardProps {
  match: TeamMatch;
  onPress: () => void;
}

const PreviousMatchCard: React.FC<PreviousMatchCardProps> = ({ match, onPress }) => {
  return (
    <TouchableOpacity style={styles.previousCard} onPress={onPress} activeOpacity={0.8}>
      {/* Competition Name */}
      <Text style={styles.competitionNameSmall}>{match.competition}</Text>

      {/* Teams and Score */}
      <View style={styles.previousMatchup}>
        {/* Home Team */}
        <View style={styles.previousTeam}>
          <Image source={match.homeTeam.logo} style={styles.teamLogoSmall} resizeMode="contain" />
          <Text style={styles.teamNameSmall} numberOfLines={1}>{match.homeTeam.name}</Text>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {match.homeTeam.score} - {match.awayTeam.score}
          </Text>
        </View>

        {/* Away Team */}
        <View style={styles.previousTeam}>
          <Image source={match.awayTeam.logo} style={styles.teamLogoSmall} resizeMode="contain" />
          <Text style={styles.teamNameSmall} numberOfLines={1}>{match.awayTeam.name}</Text>
        </View>
      </View>

      {/* Date */}
      <Text style={styles.previousDate}>{match.matchDate}</Text>
    </TouchableOpacity>
  );
};

export const MatchesView: React.FC<MatchesViewProps> = ({
  upcomingMatches = [],
  previousMatches = [],
}) => {
  const router = useRouter();

  const handleMatchPress = (matchId: string) => {
    console.log('Match pressed:', matchId);
    // Navigate to match details
    // router.push(`/match?id=${matchId}`);
  };

  return (
    <View style={styles.container}>
      {/* Upcoming Matches Section */}
      {upcomingMatches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {upcomingMatches.map((match) => (
              <UpcomingMatchCard
                key={match.matchId}
                match={match}
                onPress={() => handleMatchPress(match.matchId)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Previous Matches Section */}
      {previousMatches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Matches</Text>
          <FlatList
            data={previousMatches}
            keyExtractor={(item) => item.matchId}
            renderItem={({ item }) => (
              <PreviousMatchCard match={item} onPress={() => handleMatchPress(item.matchId)} />
            )}
            contentContainerStyle={styles.verticalList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Parent ScrollView handles scrolling
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingRight: 20,
    gap: 16,
  },
  verticalList: {
    gap: 12,
  },

  // Upcoming Match Card
  upcomingCard: {
    width: 320,
    backgroundColor: COLORS.gray900,
    borderRadius: 12,
    overflow: 'hidden',
  },
  upcomingCardContent: {
    padding: 16,
    gap: 12,
  },
  competitionName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  matchupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  teamLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  timeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  matchTime: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.white,
  },
  matchDate: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.gray400,
    textTransform: 'uppercase',
  },
  venueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  venueText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.gold,
    textTransform: 'uppercase',
  },
  groupBadge: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  groupText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.black,
  },

  // Previous Match Card
  previousCard: {
    backgroundColor: COLORS.gray900,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  competitionNameSmall: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previousMatchup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  previousTeam: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamLogoSmall: {
    width: 32,
    height: 32,
  },
  teamNameSmall: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.white,
    flex: 1,
  },
  scoreContainer: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  previousDate: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.gray400,
    textAlign: 'center',
  },
});

export default MatchesView;
