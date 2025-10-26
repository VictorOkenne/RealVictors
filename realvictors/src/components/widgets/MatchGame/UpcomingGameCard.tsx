/**
 * UpcomingGameCard Widget
 * 
 * Displays an upcoming game card with team logos, time, and location
 * Used in horizontal scrollable list on home page
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { LocationIcon } from '../../icons';

interface UpcomingGameCardProps {
  leagueName: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  time: string;
  date: string;
  location: string;
  variant?: 'dark' | 'light';
  onPress?: () => void;
  style?: ViewStyle;
}

export const UpcomingGameCard: React.FC<UpcomingGameCardProps> = ({
  leagueName,
  homeTeam,
  awayTeam,
  time,
  date,
  location,
  variant = 'dark',
  onPress,
  style,
}) => {
  const isDark = variant === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={!onPress}
    >
      {/* Stripe Background Pattern */}
      <View style={styles.stripeBackground}>
        {/* Diagonal stripe bands matching the SVG pattern */}
       

      </View>

      {/* Game Info */}
      <View style={styles.gameInfo}>
        <Text style={[
          styles.leagueName,
          isDark ? styles.textDark : styles.textLight
        ]}>
          {leagueName}
        </Text>
        
        {/* Teams and Time */}
        <View style={styles.teamsContainer}>
          {/* Home Team */}
          <View style={styles.teamSection}>
            <Image source={{ uri: homeTeam.logo }} style={styles.teamLogo} />
            <Text style={[
              styles.teamName,
              isDark ? styles.textDark : styles.textLight
            ]}>
              {homeTeam.name}
            </Text>
          </View>

          {/* Time and Date */}
          <View style={styles.timeSection}>
            <Text style={[
              styles.time,
              isDark ? styles.textDark : styles.textLight
            ]}>
              {time}
            </Text>
            <Text style={[
              styles.date,
              isDark ? styles.textDark : styles.textLight
            ]}>
              {date}
            </Text>
          </View>

          {/* Away Team */}
          <View style={styles.teamSection}>
            <Image source={{ uri: awayTeam.logo }} style={styles.teamLogo} />
            <Text style={[
              styles.teamName,
              isDark ? styles.textDark : styles.textLight
            ]}>
              {awayTeam.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={[
        styles.locationContainer,
        isDark ? styles.locationContainerDark : styles.locationContainerLight
      ]}>
        <LocationIcon width={20} height={20} color={isDark ? "black" : "white"} />
        <Text style={[
          styles.locationText,
          isDark ? styles.locationTextDark : styles.locationTextLight
        ]}>
          {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    gap: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  containerDark: {
    backgroundColor: '#1C1C1C',
    // Enhanced hover effect with stronger shadow
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  containerLight: {
    backgroundColor: '#E8E8E8',
    // Enhanced hover effect with stronger shadow
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  stripeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  stripeBand: {
    position: 'absolute',
    width: 200,
    height: 600,
    transform: [{ rotate: '25deg' }],
  },
  stripeBand1: {
    left: -120,
    top: -150,
  },
  stripeBand2: {
    left: 60,
    top: -150,
  },
  stripeBand3: {
    left: 240,
    top: -150,
  },
  stripeBand4: {
    left: 420,
    top: -150,
  },
  stripeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  stripeLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  gameInfo: {
    gap: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  leagueName: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamSection: {
    alignItems: 'center',
    gap: 10,
  },
  teamLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 18,
    fontWeight: '500',
  },
  timeSection: {
    alignItems: 'center',
    gap: 5,
    minWidth: 80, // Ensure enough space for time text
    paddingHorizontal: 5, // Add some padding to prevent cutoff
  },
  time: {
    fontFamily: TYPOGRAPHY.fontFamily.orbitronBold,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    minWidth: 70, // Ensure enough width for time display
  },
  date: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 18,
    fontWeight: '500',
  },
  textDark: {
    color: COLORS.white,
  },
  textLight: {
    color: COLORS.black,
  },
  locationContainer: {
    borderRadius: 500,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 1,
    borderWidth: 3,
  },
  locationContainerDark: {
    // Light container for dark card theme
    backgroundColor: 'rgb(249, 249, 249)',
    borderColor: COLORS.white,
  },
  locationContainerLight: {
    // Dark container for light card theme
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: COLORS.black,
  },
  locationText: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 18,
    fontWeight: '500',
  },
  locationTextDark: {
    // Black text for light container (dark card theme)
    color: COLORS.black,
  },
  locationTextLight: {
    // White text for dark container (light card theme)
    color: COLORS.white,
  },
});