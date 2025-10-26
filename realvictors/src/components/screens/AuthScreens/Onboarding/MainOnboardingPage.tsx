import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChooseSkillLevel } from './ChooseSkillLevel';
import { ChooseSport } from './ChooseSport';
import { LocationAccess } from './LocationAccess';
import { PhysicalStats } from './PhysicalStats';
import { ProfilePicture } from './ProfilePicture';
import { WelcomeScreen } from './WelcomeScreen';

/**
 * Onboarding step configuration
 */
type OnboardingStep = 'welcome' | 'sports' | 'skills' | 'stats' | 'picture' | 'location';

interface OnboardingData {
  userName?: string;
  primary_sports?: string[];
  skill_levels?: Record<string, string>;
  height_cm?: number;
  weight_kg?: number;
  birth_year?: number;
  gender?: string;
  city?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
  bio?: string;
  profile_picture_uri?: string;
}

interface MainOnboardingPageProps {
  userName?: string;
  onComplete?: (data: OnboardingData) => void;
  initialStep?: OnboardingStep;
}

/**
 * MainOnboardingPage - Manages the entire onboarding flow
 * 
 * This component orchestrates all onboarding screens and handles:
 * - Forward/backward navigation between steps
 * - Data collection and passing between screens
 * - Completion callback when onboarding is done
 * 
 * No external navigation needed - fully self-contained.
 */
export const MainOnboardingPage = ({
  userName = 'User',
  onComplete,
  initialStep = 'welcome',
}: MainOnboardingPageProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userName,
  });

  /**
   * Move to next step in the onboarding flow
   */
  const goToNextStep = () => {
    const stepOrder: OnboardingStep[] = ['welcome', 'sports', 'skills', 'stats', 'picture', 'location'];
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      // Last step - complete onboarding
      if (onComplete) {
        onComplete(onboardingData);
      }
    }
  };

  /**
   * Move to previous step in the onboarding flow
   */
  const goToPreviousStep = () => {
    const stepOrder: OnboardingStep[] = ['welcome', 'sports', 'skills', 'stats', 'picture', 'location'];
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  /**
   * Handle welcome screen completion
   */
  const handleWelcomeContinue = () => {
    console.log('🎯 Welcome screen completed, moving to sports selection');
    goToNextStep();
  };

  /**
   * Handle sports selection completion
   */
  const handleSportsContinue = (sports: string[]) => {
    console.log('🏀 Sports selected:', sports);
    setOnboardingData({ ...onboardingData, primary_sports: sports });
    goToNextStep();
  };

  /**
   * Handle skill level selection completion
   */
  const handleSkillsContinue = (skillLevels: Record<string, string>) => {
    console.log('⚡ Skill levels set:', skillLevels);
    setOnboardingData({ ...onboardingData, skill_levels: skillLevels });
    goToNextStep();
  };

  /**
   * Handle physical stats completion
   */
  const handleStatsContinue = (stats: { height_cm?: number; weight_kg?: number }) => {
    console.log('📏 Physical stats entered:', stats);
    setOnboardingData({
      ...onboardingData,
      height_cm: stats.height_cm,
      weight_kg: stats.weight_kg,
    });
    goToNextStep();
  };

  /**
   * Handle profile picture completion
   */
  const handlePictureContinue = (imageUri?: string) => {
    console.log('📸 Profile picture:', imageUri ? 'Added' : 'Skipped');
    setOnboardingData({
      ...onboardingData,
      profile_picture_uri: imageUri,
    });
    goToNextStep();
  };

  /**
   * Handle location access completion
   */
  const handleLocationContinue = (location: {
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  }) => {
    console.log('📍 Location set:', location);
    const updatedData = {
      ...onboardingData,
      city: location.city,
      country: location.country,
      coordinates: location.coordinates,
    };
    setOnboardingData(updatedData);

    // This is the final step, complete onboarding
    if (onComplete) {
      console.log('✅ Onboarding complete! Final data:', updatedData);
      onComplete(updatedData);
    }
  };

  /**
   * Render the current step
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <WelcomeScreen
            userName={userName}
            onContinue={handleWelcomeContinue}
          />
        );

      case 'sports':
        return (
          <ChooseSport
            onContinue={handleSportsContinue}
            navigation={{ goBack: goToPreviousStep }}
          />
        );

      case 'skills':
        return (
          <ChooseSkillLevel
            selectedSports={onboardingData.primary_sports || []}
            onContinue={handleSkillsContinue}
            navigation={{ goBack: goToPreviousStep }}
          />
        );

      case 'stats':
        return (
          <PhysicalStats
            onContinue={handleStatsContinue}
            navigation={{ goBack: goToPreviousStep }}
          />
        );

      case 'picture':
        return (
          <ProfilePicture
            onContinue={handlePictureContinue}
            navigation={{ goBack: goToPreviousStep }}
          />
        );

      case 'location':
        return (
          <LocationAccess
            onContinue={handleLocationContinue}
            navigation={{ goBack: goToPreviousStep }}
          />
        );

      default:
        return (
          <WelcomeScreen
            userName={userName}
            onContinue={handleWelcomeContinue}
          />
        );
    }
  };

  return <View style={styles.container}>{renderCurrentStep()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainOnboardingPage;

