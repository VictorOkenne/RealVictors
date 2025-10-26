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
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressIndicator, TitleSection } from '../../../ui';

const { width } = Dimensions.get('window');

/**
 * Sport option interface
 */
interface Sport {
  id: string;
  name: string;
  emoji: string;
}

/**
 * Available sports
 */
const SPORTS: Sport[] = [
  { id: 'soccer', name: 'Soccer', emoji: '⚽' },
  { id: 'football', name: 'Football', emoji: '🏈' },
  { id: 'tennis', name: 'Tennis', emoji: '🎾' },
  { id: 'basketball', name: 'Basketball', emoji: '🏀' },
  { id: 'baseball', name: 'Baseball', emoji: '⚾' },
  { id: 'hockey', name: 'Hockey', emoji: '🏒' },
];

interface ChooseSportProps {
  onContinue?: (sports: string[]) => void;
  navigation?: {
    goBack: () => void;
  };
}

/**
 * ChooseSport - Sport selection screen
 * 
 * Allows users to select up to 3 sports they're interested in
 */
export const ChooseSport = ({ onContinue, navigation }: ChooseSportProps) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  /**
   * Toggle sport selection
   */
  const toggleSport = (sportId: string) => {
    if (selectedSports.includes(sportId)) {
      // Remove sport if already selected
      setSelectedSports(selectedSports.filter((id) => id !== sportId));
    } else if (selectedSports.length < 3) {
      // Add sport if less than 3 selected
      setSelectedSports([...selectedSports, sportId]);
    }
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    // Validate: At least one sport must be selected
    if (selectedSports.length === 0) {
      Alert.alert('No Sports Selected', 'Please select at least one sport to continue.');
      return;
    }

    if (onContinue) {
      onContinue(selectedSports);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Progress Bar */}
      <ProgressIndicator 
        current={1} 
        total={5} 
        variant="linear"
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TitleSection
          title="What Sports do you play?"
          subtitle="Select up to 3 sports you're most interested in."
          containerStyle={styles.header}
        />

        {/* Sports Grid */}
        <View style={styles.sportsGrid}>
          {SPORTS.map((sport) => {
            const isSelected = selectedSports.includes(sport.id);
            return (
              <TouchableOpacity
                key={sport.id}
                style={[
                  styles.sportButton,
                  isSelected && styles.sportButtonSelected,
                ]}
                onPress={() => toggleSport(sport.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.sportEmoji}>{sport.emoji}</Text>
                <Text
                  style={[
                    styles.sportName,
                    isSelected && styles.sportNameSelected,
                  ]}
                >
                  {sport.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Count Indicator */}
        {selectedSports.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {selectedSports.length} of 3 sports selected
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedSports.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedSports.length === 0}
          activeOpacity={0.8}
        >
          <Ionicons
            name="chevron-forward"
            size={28}
            color={selectedSports.length > 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
          />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 53,
    marginTop: 0,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 23,
    justifyContent: 'space-between',
  },
  sportButton: {
    width: (width - 40 - 23) / 2, // (screenWidth - padding - gap) / 2 columns
    minWidth: 128,
    maxWidth: 170,
    backgroundColor: '#EFEFEF',
    borderRadius: 500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sportButtonSelected: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFC245',
  },
  sportEmoji: {
    fontSize: 20,
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  sportNameSelected: {
    color: '#000000',
  },
  selectionInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#827F7F',
    letterSpacing: -0.3,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
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
  continueButtonDisabled: {
    backgroundColor: '#827F7F',
    shadowColor: '#827F7F',
  },
});

export default ChooseSport;


