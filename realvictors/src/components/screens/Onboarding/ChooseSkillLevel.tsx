import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * Skill level labels
 */
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Expert'] as const;

/**
 * Sport skill level mapping
 */
type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';

interface ChooseSkillLevelProps {
  selectedSports: string[];
  onContinue?: (skillLevels: Record<string, string>) => void;
  navigation?: {
    goBack: () => void;
  };
}

/**
 * ChooseSkillLevel - Skill level selection screen
 * 
 * Allows users to set their skill level for each selected sport using sliders
 */
export const ChooseSkillLevel = ({
  selectedSports = [],
  onContinue,
  navigation,
}: ChooseSkillLevelProps) => {
  // Initialize skill levels for all selected sports (default to Beginner = 0)
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(
    selectedSports.reduce((acc, sport) => ({ ...acc, [sport]: 0 }), {})
  );

  /**
   * Handle skill level change by tapping on position
   */
  const handleSkillChange = (sport: string, level: number) => {
    setSkillLevels({
      ...skillLevels,
      [sport]: level,
    });
  };

  /**
   * Convert numeric skill level to label
   */
  const getSkillLabel = (value: number): SkillLevel => {
    return SKILL_LEVELS[Math.min(Math.max(Math.round(value), 0), 2)];
  };

  /**
   * Get color for slider based on value
   */
  const getSliderColor = (value: number): string => {
    if (value < 0.5) return '#FFC245'; // Beginner - Yellow
    if (value < 1.5) return '#FF8C00'; // Intermediate - Orange
    return '#FF4500'; // Expert - Red
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    if (onContinue) {
      // Convert numeric values to string labels
      const skillLabels = Object.entries(skillLevels).reduce(
        (acc, [sport, value]) => ({
          ...acc,
          [sport]: getSkillLabel(value),
        }),
        {}
      );
      onContinue(skillLabels);
    }
  };

  /**
   * Handle back button press
   */
  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  /**
   * Capitalize sport name
   */
  const capitalizeSport = (sport: string): string => {
    return sport.charAt(0).toUpperCase() + sport.slice(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your skill level?</Text>
          <Text style={styles.subtitle}>
            Select up to 3 sports you're most interested in.
          </Text>
        </View>

        {/* Skill Level Sliders */}
        <View style={styles.skillsContainer}>
          {selectedSports.map((sport) => {
            const skillValue = skillLevels[sport] || 0;
            const currentSkill = getSkillLabel(skillValue);

            return (
              <View key={sport} style={styles.sportSkillContainer}>
                {/* Sport Name */}
                <Text style={styles.sportName}>{capitalizeSport(sport)}</Text>

                {/* Visual Skill Bar with tap interaction */}
                <View style={styles.skillBarContainer}>
                  <TouchableOpacity
                    style={styles.skillBarsRow}
                    activeOpacity={1}
                    onPress={(event) => {
                      const { locationX } = event.nativeEvent;
                      const barWidth = width - 80; // Accounting for padding
                      const percentage = locationX / barWidth;
                      let level = 0;
                      if (percentage > 0.66) level = 2;
                      else if (percentage > 0.33) level = 1;
                      handleSkillChange(sport, level);
                    }}
                  >
                    {Array.from({ length: 30 }).map((_, index) => {
                      const position = index / 30;
                      let barColor = '#FFC245'; // Yellow for beginner
                      if (position > 0.33 && position <= 0.66) {
                        barColor = '#FF8C00'; // Orange for intermediate
                      } else if (position > 0.66) {
                        barColor = '#FF4500'; // Red for expert
                      }

                      const isHighlighted = index < (skillValue + 1) * 10;

                      return (
                        <View
                          key={index}
                          style={[
                            styles.skillBar,
                            {
                              backgroundColor: isHighlighted ? barColor : '#E0E0E0',
                              height: 10 + (index % 5) * 12, // Varying heights for visual effect
                            },
                          ]}
                        />
                      );
                    })}
                  </TouchableOpacity>
                </View>

                {/* Skill Level Labels */}
                <View style={styles.skillLabels}>
                  <TouchableOpacity
                    onPress={() => handleSkillChange(sport, 0)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.skillLabelText,
                        skillValue === 0 && styles.skillLabelActive,
                      ]}
                    >
                      Beginner
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSkillChange(sport, 1)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.skillLabelText,
                        skillValue === 1 && styles.skillLabelActive,
                      ]}
                    >
                      Intermediate
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSkillChange(sport, 2)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.skillLabelText,
                        skillValue === 2 && styles.skillLabelActive,
                      ]}
                    >
                      Expert
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 500,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '40%', // 40% for step 3
    height: '100%',
    backgroundColor: '#FFC245',
    borderRadius: 500,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  skillsContainer: {
    gap: 40,
  },
  sportSkillContainer: {
    gap: 15,
  },
  sportName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5,
  },
  skillBarContainer: {
    height: 70,
    paddingHorizontal: 5,
  },
  skillBarsRow: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'flex-end',
    gap: 2,
  },
  skillBar: {
    flex: 1,
    borderRadius: 2,
  },
  skillLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  skillLabelText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
  },
  skillLabelActive: {
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'flex-end',
  },
  continueButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFC245',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC245',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ChooseSkillLevel;
