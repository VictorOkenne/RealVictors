import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { MainOnboardingPage } from '../../src/components/screens/Onboarding';
import { useAuth } from '../../src/contexts/AuthContext';
import { AuthController } from '../../src/controllers/AuthController';

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
}

export default function OnboardingScreen() {
  const [loading, setLoading] = useState(false);
  const { user, refreshAuth } = useAuth();

  /**
   * Redirect to login if no user
   */
  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user]);

  /**
   * Get user's display name from auth context
   */
  const userName = user?.display_name || user?.email?.split('@')[0] || 'User';

  /**
   * Handle onboarding completion from MainOnboardingPage
   */
  const handleOnboardingComplete = async (data: OnboardingData) => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('🚀 Completing onboarding for user:', user.id);
      console.log('📝 Onboarding data:', data);
      
      // Prepare data with required fields
      const onboardingPayload = {
        primary_sports: data.primary_sports || [],
        skill_levels: data.skill_levels || {},
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        birth_year: data.birth_year,
        gender: data.gender,
        city: data.city,
        country: data.country,
        coordinates: data.coordinates,
        bio: data.bio,
      };
      
      await AuthController.completeOnboarding(user.id, onboardingPayload);
      
      console.log('✅ Onboarding completed, refreshing auth state');
      await refreshAuth();
      console.log('✅ Auth state refreshed, AuthGuard should handle navigation');
      // Let AuthGuard handle the navigation to tabs
    } catch (error: any) {
      console.error('❌ Onboarding completion failed:', error);
      Alert.alert('Error', error.message || 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Show loading state while completing onboarding
   */
  if (loading) {
        return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC245" />
          </View>
        );
  }

  /**
   * Return null if no user (redirect will happen in useEffect)
   */
  if (!user) {
    return null;
  }

  return (
    <MainOnboardingPage 
      userName={userName}
      onComplete={handleOnboardingComplete}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
