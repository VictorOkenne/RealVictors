/**
 * MedalStatsDisplay Component
 *
 * Displays user's medal statistics (podium finishes):
 * - Gold medals (1st place)
 * - Silver medals (2nd place)
 * - Bronze medals (3rd place)
 */

import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface MedalStatsDisplayProps {
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
}

export const MedalStatsDisplay: React.FC<MedalStatsDisplayProps> = ({
  goldMedals,
  silverMedals,
  bronzeMedals,
}) => {
  return (
    <View style={styles.container}>
      {/* Gold Medal */}
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.medalCard}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.medalIcon}>🏆</Text>
        </View>
        <Text style={styles.medalCount}>{goldMedals}</Text>
        <Text style={styles.medalLabel}>Champion</Text>
      </LinearGradient>

      {/* Silver Medal */}
      <LinearGradient
        colors={['#C0C0C0', '#A8A8A8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.medalCard}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.medalIcon}>🥈</Text>
        </View>
        <Text style={styles.medalCount}>{silverMedals}</Text>
        <Text style={styles.medalLabel}>Runner Up</Text>
      </LinearGradient>

      {/* Bronze Medal */}
      <LinearGradient
        colors={['#CD7F32', '#A0522D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.medalCard}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.medalIcon}>🥉</Text>
        </View>
        <Text style={styles.medalCount}>{bronzeMedals}</Text>
        <Text style={styles.medalLabel}>3rd Place</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  medalCard: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 70,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  medalIcon: {
    fontSize: 18,
  },
  medalCount: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  medalLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 8,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.95,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

export default MedalStatsDisplay;
