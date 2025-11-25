/**
 * LineupView Component
 *
 * Displays both teams' lineups with formation positioning
 * Soccer: Shows players on soccer field (11 players)
 * Basketball: Shows players on basketball court (5 players)
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FormationField, UnifiedBench } from '../../widgets';
import { basketballFormations, formations, MatchData, SportType, Team } from './mockData';
import { BasketballCourtLayout } from '../../widgets/AppWide/BasketballCourtLayout';
import { PlayerCard } from '../../widgets/Player/PlayerCard';

interface LineupViewProps {
  sport: SportType;
  homeTeam: Team;
  awayTeam: Team;
  homeSubstitutions: MatchData['homeSubstitutions'];
  awaySubstitutions: MatchData['awaySubstitutions'];
  lineupStatus?: 'confirmed' | 'predicted' | 'unavailable';
  matchStatus?: 'upcoming' | 'live' | 'finished';
}

export const LineupView: React.FC<LineupViewProps> = ({
  sport,
  homeTeam,
  awayTeam,
  homeSubstitutions,
  awaySubstitutions,
  lineupStatus = 'confirmed',
  matchStatus = 'finished',
}) => {
  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';
  const isUpcoming = matchStatus === 'upcoming';
  const hasLineup = lineupStatus !== 'unavailable' && (homeTeam.players.length > 0 || awayTeam.players.length > 0);

  // Basketball court rendering
  const renderBasketballCourt = (team: Team, isAwayTeam: boolean) => {
    const formation = basketballFormations['Starting Five'];
    const displayPlayers = team.players.slice(0, 5); // Only 5 players for basketball

    return (
      <View style={[styles.basketballCourtContainer, isAwayTeam && styles.awayCourtContainer]}>
        {/* Basketball Court */}
        <View style={styles.courtSvg}>
          <BasketballCourtLayout
            style={styles.courtIcon}
            isAwayTeam={isAwayTeam}
          />
        </View>

        {/* Players positioned on court */}
        {formation.positions.map((position, index) => {
          const player = displayPlayers[index];
          if (!player) return null;

          const flippedPosition = isAwayTeam
            ? { x: position.x - 1.5, y: 100 - position.y - 8 }
            : position;

          return (
            <View
              key={player.id}
              style={[
                styles.playerPosition,
                {
                  left: `${flippedPosition.x}%`,
                  top: `${flippedPosition.y}%`,
                },
              ]}
            >
              <PlayerCard
                name={player.name}
                number={player.number}
                profileImage={player.profileImage}
                position={player.position}
                showPosition={false}
                teamColor={team.primaryColor}
                size="small"
                variant="lineup"
              />
            </View>
          );
        })}
      </View>
    );
  };

  // Render "Lineup Coming Soon" placeholder
  const renderLineupUnavailable = () => (
    <View style={styles.lineupUnavailableContainer}>
      <View style={styles.lineupUnavailableCard}>
        <View style={styles.teamLogosRow}>
          <Image source={homeTeam.logo} style={styles.unavailableTeamLogo} />
          <Text style={styles.vsText}>VS</Text>
          <Image source={awayTeam.logo} style={styles.unavailableTeamLogo} />
        </View>
        <Text style={styles.lineupUnavailableTitle}>Lineup Coming Soon</Text>
        <Text style={styles.lineupUnavailableText}>
          Team lineups will be announced closer to match time
        </Text>
      </View>
    </View>
  );

  // If lineup is unavailable, show placeholder
  if (!hasLineup) {
    return renderLineupUnavailable();
  }

  return (
    <View style={styles.container}>
      {/* Predicted Lineup Banner */}
      {isUpcoming && lineupStatus === 'predicted' && (
        <View style={styles.predictedBanner}>
          <Text style={styles.predictedText}>Expected Lineup - Subject to Change</Text>
        </View>
      )}

      {isSoccer && (
        <>
          {/* Home Team Lineup - Soccer */}
          <View style={styles.teamLineupSection}>
            <View style={styles.teamHeader}>
              <Image source={homeTeam.logo} style={styles.teamLogoSmall} />
              <Text style={styles.teamHeaderText}>{homeTeam.name}</Text>
            </View>

            <FormationField
              formation={formations[homeTeam.formation as keyof typeof formations]}
              players={homeTeam.players}
              team={homeTeam}
              isAwayTeam={false}
            />
          </View>

          {/* Away Team Lineup - Soccer */}
          <View style={styles.teamLineupSection}>
            <View style={styles.teamHeader}>
              <Image source={awayTeam.logo} style={styles.teamLogoSmall} />
              <Text style={styles.teamHeaderText}>{awayTeam.name}</Text>
            </View>

            <FormationField
              formation={formations[awayTeam.formation as keyof typeof formations]}
              players={awayTeam.players}
              team={awayTeam}
              isAwayTeam={true}
            />
          </View>
        </>
      )}

      {isBasketball && (
        <>
          {/* Home Team Lineup - Basketball */}
          <View style={styles.teamLineupSection}>
            <View style={styles.teamHeader}>
              <Image source={homeTeam.logo} style={styles.teamLogoSmall} />
              <Text style={styles.teamHeaderText}>{homeTeam.name}</Text>
            </View>

            {renderBasketballCourt(homeTeam, false)}
          </View>

          {/* Away Team Lineup - Basketball */}
          <View style={styles.teamLineupSection}>
            <View style={styles.teamHeader}>
              <Image source={awayTeam.logo} style={styles.teamLogoSmall} />
              <Text style={styles.teamHeaderText}>{awayTeam.name}</Text>
            </View>

            {renderBasketballCourt(awayTeam, true)}
          </View>
        </>
      )}

      {/* Unified Bench */}
      <UnifiedBench
        homeTeam={{
          name: homeTeam.name,
          logo: homeTeam.logo,
          bench: homeTeam.bench,
          primaryColor: homeTeam.primaryColor,
        }}
        awayTeam={{
          name: awayTeam.name,
          logo: awayTeam.logo,
          bench: awayTeam.bench,
          primaryColor: awayTeam.primaryColor,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingBottom: 20,
  },
  teamLineupSection: {
    gap: 20,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  teamLogoSmall: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  teamHeaderText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    textAlign: 'center',
  },
  // Basketball court styles
  basketballCourtContainer: {
    width: '100%',
    height: 380, // Reduced from 500 to match cropped court
    backgroundColor: '#D2691E', // Basketball court color
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  awayCourtContainer: {
    // Any specific styling for away team court
  },
  courtSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  courtIcon: {
    width: '100%',
    height: '100%',
  },
  playerPosition: {
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  // Predicted lineup banner styles
  predictedBanner: {
    backgroundColor: '#FFF4E5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  predictedText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#F57C00',
    textAlign: 'center',
  },
  // Lineup unavailable styles
  lineupUnavailableContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
  lineupUnavailableCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200,
    borderStyle: 'dashed',
    maxWidth: 320,
  },
  teamLogosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 20,
  },
  unavailableTeamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  vsText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.gray400,
  },
  lineupUnavailableTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  lineupUnavailableText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 22,
  },
});

