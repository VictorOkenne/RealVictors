import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, PrimaryButton, ProgressIndicator, TitleSection } from '../../../ui';

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
   * Handle skill level change by selecting a level
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
   * Handle continue button press
   */
  const handleContinue = () => {
    // Validate: All selected sports must have skill levels set
    const missingSkills = selectedSports.filter(sport => skillLevels[sport] === undefined);
    
    if (missingSkills.length > 0) {
      Alert.alert(
        'Skill Level Required', 
        'Please select a skill level for all your sports before continuing.'
      );
      return;
    }

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

      <ProgressIndicator current={2} total={5} variant="linear" />

      <NavigationHeader onBack={handleBack} />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TitleSection
          title="What's your skill level?"
          subtitle="Select your skill level for each sport you selected."
          containerStyle={styles.header}
        />

        {/* Skill Level Selectors */}
        <View style={styles.skillsContainer}>
          {selectedSports.map((sport) => {
            const skillValue = skillLevels[sport] || 0;

            return (
              <View key={sport} style={styles.sportSkillContainer}>
                {/* Sport Name */}
                <Text style={styles.sportName}>{capitalizeSport(sport)}</Text>

                {/* Skill Level Button Group */}
                <View style={styles.skillButtonGroup}>
                  {/* Beginner */}
                  <TouchableOpacity
                    style={[
                      styles.skillButton,
                      styles.skillButtonLeft,
                      skillValue === 0 && styles.skillButtonActive,
                    ]}
                    onPress={() => handleSkillChange(sport, 0)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.skillButtonContent}>
                      <View style={[
                        styles.iconCircle,
                        skillValue === 0 && styles.iconCircleActive
                      ]}>
                        <Ionicons 
                          name="leaf-outline" 
                          size={20} 
                          color={skillValue === 0 ? '#FFFFFF' : '#827F7F'} 
                        />
                      </View>
                      <Text style={[
                        styles.skillButtonText,
                        skillValue === 0 && styles.skillButtonTextActive
                      ]}>
                        Beginner
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Intermediate */}
                  <TouchableOpacity
                    style={[
                      styles.skillButton,
                      styles.skillButtonCenter,
                      skillValue === 1 && styles.skillButtonActive,
                    ]}
                    onPress={() => handleSkillChange(sport, 1)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.skillButtonContent}>
                      <View style={[
                        styles.iconCircle,
                        skillValue === 1 && styles.iconCircleActive
                      ]}>
                        <Ionicons 
                          name="flame-outline" 
                          size={20} 
                          color={skillValue === 1 ? '#FFFFFF' : '#827F7F'} 
                        />
                      </View>
                      <Text style={[
                        styles.skillButtonText,
                        skillValue === 1 && styles.skillButtonTextActive
                      ]}>
                        Intermediate
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Expert */}
                  <TouchableOpacity
                    style={[
                      styles.skillButton,
                      styles.skillButtonRight,
                      skillValue === 2 && styles.skillButtonActive,
                    ]}
                    onPress={() => handleSkillChange(sport, 2)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.skillButtonContent}>
                      <View style={[
                        styles.iconCircle,
                        skillValue === 2 && styles.iconCircleActive
                      ]}>
                        <Ionicons 
                          name="trophy-outline" 
                          size={20} 
                          color={skillValue === 2 ? '#FFFFFF' : '#827F7F'} 
                        />
                      </View>
                      <Text style={[
                        styles.skillButtonText,
                        skillValue === 2 && styles.skillButtonTextActive
                      ]}>
                        Expert
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <PrimaryButton
          title=""
          onPress={handleContinue}
          active={true}
          variant="circular"
          icon={<Ionicons name="chevron-forward" size={28} color="#FFFFFF" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  skillsContainer: {
    gap: 30,
  },
  sportSkillContainer: {
    gap: 15,
  },
  sportName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.5,
  },
  skillButtonGroup: {
    flexDirection: 'row',
    gap: 0,
    height: 100,
  },
  skillButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  skillButtonLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 1,
  },
  skillButtonCenter: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  skillButtonRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 1,
  },
  skillButtonActive: {
    backgroundColor: '#FFC245',
    borderColor: '#FFC245',
    shadowColor: '#FFC245',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  skillButtonContent: {
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: {
    backgroundColor: '#D7B015',
  },
  skillButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#827F7F',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  skillButtonTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
});

export default ChooseSkillLevel;
