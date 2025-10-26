import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CreateEmail } from './CreateEmail';
import { CreateName } from './CreateName';
import { CreatePassword } from './CreatePassword';

/**
 * Signup step configuration
 */
type SignupStep = 'email' | 'password' | 'name' | 'verification';

interface SignupData {
  email?: string;
  password?: string;
  fullName?: string;
  username?: string;
  gender?: string;
  dateOfBirth?: string;
  displayName?: string;
  phoneNumber?: string;
}

interface MainSignupPageProps {
  onComplete?: (data: SignupData) => void;
  initialStep?: SignupStep;
}

/**
 * MainSignupPage - Manages the entire signup flow
 * 
 * This component orchestrates all signup screens and handles:
 * - Forward/backward navigation between steps
 * - Data collection and passing between screens
 * - Completion callback when signup is done
 * 
 * No external navigation needed - fully self-contained.
 */
export const MainSignupPage = ({ onComplete, initialStep = 'email' }: MainSignupPageProps) => {
  const [currentStep, setCurrentStep] = useState<SignupStep>(initialStep);
  const [signupData, setSignupData] = useState<SignupData>({});

  /**
   * Move to next step in the signup flow
   */
  const goToNextStep = () => {
    const stepOrder: SignupStep[] = ['email', 'password', 'name', 'verification'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  /**
   * Move to previous step in the signup flow
   */
  const goToPreviousStep = () => {
    const stepOrder: SignupStep[] = ['email', 'password', 'name', 'verification'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      // If on first step, go back to login
      router.push('/(auth)/login');
    }
  };

  /**
   * Handle email step completion
   */
  const handleEmailContinue = (email: string) => {
    setSignupData({ ...signupData, email });
    goToNextStep();
  };

  /**
   * Handle password step completion
   */
  const handlePasswordContinue = (password: string) => {
    setSignupData({ ...signupData, password });
    goToNextStep();
  };

  /**
   * Handle name step completion
   */
  const handleNameContinue = (data: { fullName: string; username: string; gender: string; dateOfBirth: string }) => {
    const updatedData = {
      ...signupData,
      fullName: data.fullName,
      username: data.username,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      displayName: data.fullName, // Use full name as display name
    };
    setSignupData(updatedData);
    
    // This is the last step for now, call onComplete
    if (onComplete) {
      onComplete(updatedData);
    }
    
    // When you add more steps (like verification), call goToNextStep() instead
  };

  /**
   * Render the current step
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <CreateEmail
            onContinue={handleEmailContinue}
            // Custom navigation object to handle back
            navigation={{
              goBack: goToPreviousStep,
            }}
          />
        );

      case 'password':
        return (
          <CreatePassword
            onContinue={handlePasswordContinue}
            // Pass the navigation and route to handle back and access email
            navigation={{
              goBack: goToPreviousStep,
            }}
            route={{
              params: {
                email: signupData.email,
              },
            }}
          />
        );

      case 'name':
        return (
          <CreateName
            onContinue={handleNameContinue}
            navigation={{
              goBack: goToPreviousStep,
            }}
            route={{
              params: {
                email: signupData.email,
                password: signupData.password,
              },
            }}
          />
        );

      // Add more cases here as you create more signup steps
      // case 'verification':
      //   return <PhoneVerification onContinue={handleVerificationContinue} ... />;

      default:
        return (
          <CreateEmail
            onContinue={handleEmailContinue}
            navigation={{
              goBack: goToPreviousStep,
            }}
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

export default MainSignupPage;

