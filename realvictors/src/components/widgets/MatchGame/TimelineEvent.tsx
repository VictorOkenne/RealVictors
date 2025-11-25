/**
 * TimelineEvent Widget
 * 
 * Displays individual match events using PlayerCard component
 * Shows event icons (goal, cards, substitutions) with centered timeline
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { RedCardIcon, SoccerBallIcon, SubstitutionIcon, YellowCardIcon } from '../../icons';
import { MatchEvent, Team } from '../../screens/MatchPage/mockData';
import { PlayerCard } from '../Player/PlayerCard';

interface TimelineEventProps {
  event: MatchEvent;
  homeTeam: Team;
  awayTeam: Team;
  style?: ViewStyle;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  homeTeam,
  awayTeam,
  style,
}) => {
  const isHomeTeam = event.team === 'home';
  const team = isHomeTeam ? homeTeam : awayTeam;
  const iconPosition = isHomeTeam ? 'left' : 'right';

  const getEventIcon = () => {
    switch (event.type) {
      case 'goal':
        return <SoccerBallIcon size={19} />;
      case 'yellow_card':
        return <YellowCardIcon size={15} />;
      case 'red_card':
        return <RedCardIcon size={15} />;
      case 'substitution':
        return null; // Substitutions show both players
      default:
        return null;
    }
  };

  const getIconBackgroundShape = (): 'circle' | 'square' | undefined => {
    switch (event.type) {
      case 'goal':
        return 'circle'; // Soccer ball stays circular
      case 'yellow_card':
      case 'red_card':
        return 'square'; // Cards use square background
      default:
        return undefined;
    }
  };

  const getPlayerName = () => {
    if (event.type === 'substitution' && event.substitution) {
      return event.substitution.playerOut.name;
    }
    return event.player?.name || '';
  };

  const getPlayerProfileImage = () => {
    if (event.type === 'substitution' && event.substitution) {
      return event.substitution.playerOut.profileImage;
    }
    return event.player?.profileImage;
  };

  const getPlayerNumber = () => {
    if (event.type === 'substitution' && event.substitution) {
      return event.substitution.playerOut.number;
    }
    return event.player?.number;
  };

  // Render substitution - vertically stacked for minimal space
  if (event.type === 'substitution' && event.substitution) {
    return (
      <View style={[styles.container, style]}>
        {/* Home Team Side - LEFT */}
        <View style={styles.homeTeamSide}>
          {isHomeTeam && (
            <View style={styles.substitutionStack}>
              {/* Player IN - top */}
              <View style={styles.playerIn}>
                <PlayerCard
                  name={event.substitution.playerIn.name}
                  number={event.substitution.playerIn.number}
                  profileImage={event.substitution.playerIn.profileImage}
                  teamColor={team.primaryColor}
                  size="small"
                  iconPosition={iconPosition}
                  variant="timeline"
                />
                <View style={[styles.subLabel, styles.subLabelIn]}>
                  <Text style={styles.subLabelText}>IN</Text>
                </View>
              </View>

              {/* Substitution Icon - centered between players */}
              <View style={[styles.subIconContainer, iconPosition === 'left' ? styles.subIconLeft : styles.subIconRight]}>
                <SubstitutionIcon size={11} />
              </View>

              {/* Player OUT - bottom, slightly faded */}
              <View style={styles.playerOut}>
                <PlayerCard
                  name={event.substitution.playerOut.name}
                  number={event.substitution.playerOut.number}
                  profileImage={event.substitution.playerOut.profileImage}
                  teamColor={team.primaryColor}
                  size="small"
                  iconPosition={iconPosition}
                  variant="timeline"
                />
                <View style={[styles.subLabel, styles.subLabelOut]}>
                  <Text style={styles.subLabelText}>OUT</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Minute Badge - Always centered */}
        <View style={styles.minuteBadge}>
          <Text style={styles.minuteText}>{event.minute}'</Text>
        </View>

        {/* Away Team Side - RIGHT */}
        <View style={styles.awayTeamSide}>
          {!isHomeTeam && (
            <View style={styles.substitutionStack}>
              {/* Player IN - top */}
              <View style={styles.playerIn}>
                <PlayerCard
                  name={event.substitution.playerIn.name}
                  number={event.substitution.playerIn.number}
                  profileImage={event.substitution.playerIn.profileImage}
                  teamColor={team.primaryColor}
                  size="small"
                  iconPosition={iconPosition}
                  variant="timeline"
                />
                <View style={[styles.subLabel, styles.subLabelIn]}>
                  <Text style={styles.subLabelText}>IN</Text>
                </View>
              </View>

              {/* Substitution Icon - centered between players */}
              <View style={[styles.subIconContainer, iconPosition === 'left' ? styles.subIconLeft : styles.subIconRight]}>
                <SubstitutionIcon size={11} />
              </View>

              {/* Player OUT - bottom, slightly faded */}
              <View style={styles.playerOut}>
                <PlayerCard
                  name={event.substitution.playerOut.name}
                  number={event.substitution.playerOut.number}
                  profileImage={event.substitution.playerOut.profileImage}
                  teamColor={team.primaryColor}
                  size="small"
                  iconPosition={iconPosition}
                  variant="timeline"
                />
                <View style={[styles.subLabel, styles.subLabelOut]}>
                  <Text style={styles.subLabelText}>OUT</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  // Render regular event (goal, card, etc.)
  return (
    <View style={[styles.container, style]}>
      {/* Home Team Side - LEFT */}
      <View style={styles.homeTeamSide}>
        {isHomeTeam && (
          <PlayerCard
            name={getPlayerName()}
            number={getPlayerNumber()}
            profileImage={getPlayerProfileImage()}
            teamColor={team.primaryColor}
            size="medium"
            eventIcon={getEventIcon()}
            iconPosition={iconPosition}
            iconBackgroundShape={getIconBackgroundShape()}
            variant="timeline"
          />
        )}
      </View>

      {/* Minute Badge - Always centered */}
      <View style={styles.minuteBadge}>
        <Text style={styles.minuteText}>{event.minute}'</Text>
      </View>

      {/* Away Team Side - RIGHT */}
      <View style={styles.awayTeamSide}>
        {!isHomeTeam && (
          <PlayerCard
            name={getPlayerName()}
            number={getPlayerNumber()}
            profileImage={getPlayerProfileImage()}
            teamColor={team.primaryColor}
            size="medium"
            eventIcon={getEventIcon()}
            iconPosition={iconPosition}
            iconBackgroundShape={getIconBackgroundShape()}
            variant="timeline"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    minHeight: 82,
    position: 'relative',
  },
  homeTeamSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    zIndex: 1,
  },
  awayTeamSide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    zIndex: 1,
  },
  substitutionStack: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    position: 'relative',
  },
  playerOut: {
    opacity: 0.7,
    position: 'relative',
  },
  playerIn: {
    position: 'relative',
  },
  subLabel: {
    position: 'absolute',
    top: -10, // Higher up to avoid overlap
    right: 0, // Outside the avatar circle (55px avatar, so position at edge)
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    zIndex: 10,
  },
  subLabelOut: {
    backgroundColor: '#FF3B3B',
  },
  subLabelIn: {
    backgroundColor: '#4285F4',
  },
  subLabelText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 7,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  subIconContainer: {
    backgroundColor: COLORS.white,
    padding: 4,
    borderRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'center',
  },
  subIconLeft: {
    // Icon is now inline between the two cards
  },
  subIconRight: {
    // Icon is now inline between the two cards
  },
  minuteBadge: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -24.5 }, { translateY: -24.5 }],
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  minuteText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
});

