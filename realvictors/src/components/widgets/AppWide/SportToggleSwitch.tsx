/**
 * SportToggleSwitch Widget
 *
 * Custom animated toggle switch for switching between sports (Soccer/Basketball)
 * Features:
 * - Smooth animation between states
 * - Custom icons for each sport (soccer ball / basketball)
 * - Compact design suitable for header placement
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { COLORS } from '../../../constants';
import { SportType } from '../../screens/UserProfilePage/mockData';

interface SportToggleSwitchProps {
  currentSport: SportType;
  availableSports: SportType[]; // Both sports available
  onSportChange: (sport: SportType) => void;
  disabled?: boolean;
}

// Soccer ball icon (simplified)
const SoccerIcon: React.FC<{ size?: number }> = ({ size = 8 }) => (
  <Text style={{ fontSize: size }}>⚽</Text>
);

// Basketball icon (simplified)
const BasketballIcon: React.FC<{ size?: number }> = ({ size = 10 }) => (
  <Text style={{ fontSize: size }}>🏀</Text>
);

export const SportToggleSwitch: React.FC<SportToggleSwitchProps> = ({
  currentSport,
  availableSports,
  onSportChange,
  disabled = false,
}) => {
  // Only show toggle if user plays multiple sports
  const isMultiSport = availableSports.length > 1;

  if (!isMultiSport) {
    return null; // Don't render if user only plays one sport
  }

  const isSoccer = currentSport === 'soccer';

  // Animation values
  const slideAnim = useRef(new Animated.Value(isSoccer ? 0 : 1)).current;
  const backgroundColorAnim = useRef(new Animated.Value(isSoccer ? 0 : 1)).current;
  const circleColorAnim = useRef(new Animated.Value(isSoccer ? 0 : 1)).current;

  // Animate when sport changes
  useEffect(() => {
    const toValue = isSoccer ? 0 : 1;

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColorAnim, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSoccer, slideAnim, backgroundColorAnim, circleColorAnim]);

  const handleToggle = () => {
    if (disabled) return;

    const newSport: SportType = isSoccer ? 'basketball' : 'soccer';
    onSportChange(newSport);
  };

  // Interpolate background color
  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#e86a33'], // White for soccer, orange for basketball
  });

  // Interpolate circle color
  const circleColor = circleColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1C1C1C', '#FFFFFF'], // Dark for soccer, white for basketball
  });

  // Interpolate circle position (slide from left to right)
  const SWITCH_WIDTH = 48;
  const CIRCLE_SIZE = 18;
  const PADDING = 2.5;
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, SWITCH_WIDTH - CIRCLE_SIZE - PADDING],
  });

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Animated circle with icon - wrapped in two views to separate native and JS animations */}
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: circleColor,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              {isSoccer ? <SoccerIcon size={10} /> : <BasketballIcon size={12} />}
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SportToggleSwitch;
