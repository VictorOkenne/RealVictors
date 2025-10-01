import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MapPin, 
  Bell, 
  Camera,
  User,
  Trophy,
  Target
} from 'lucide-react-native';
import * as Location from 'expo-location';
import { AuthController } from '../../src/controllers/AuthController';
import { Button } from '../../src/components/ui/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SPORTS, SKILL_LEVELS } from '../../src/constants';
import { useAuth } from '../../src/contexts/AuthContext';

const { width } = Dimensions.get('window');

interface OnboardingData {
  primary_sports: string[];
  skill_levels: Record<string, string>;
  height_cm?: number;
  weight_kg?: number;
  birth_year?: number;
  gender?: string;
  city?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
  bio?: string;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not', label: 'Prefer not to say' },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    primary_sports: [],
    skill_levels: {},
  });
  const { user, refreshAuth } = useAuth();

  const totalSteps = 8;

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user]);

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      console.log('🚀 Completing onboarding for user:', user.id);
      await AuthController.completeOnboarding(user.id, onboardingData);
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

  const renderProgressBar = () => (
    <View style={{
      flexDirection: 'row',
      marginBottom: SPACING['2xl'],
    }}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: 4,
            backgroundColor: index <= currentStep ? COLORS.gold : COLORS.gray200,
            marginRight: index < totalSteps - 1 ? SPACING.sm : 0,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: COLORS.gold + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: SPACING['2xl'],
            }}>
              <Trophy size={60} color={COLORS.gold} />
            </View>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['3xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              textAlign: 'center',
              marginBottom: SPACING.lg,
            }}>
              Welcome to RealVictors!
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.lg,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              textAlign: 'center',
              lineHeight: 28,
            }}>
              Let's set up your profile to get you started with the ultimate sports platform.
            </Text>
          </View>
        );

      case 1:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              What sports do you play?
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              Select up to 3 sports you're most interested in
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md }}>
              {Object.entries(SPORTS).map(([key, sport]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    const isSelected = onboardingData.primary_sports.includes(key);
                    if (isSelected) {
                      const newSkillLevels = { ...onboardingData.skill_levels };
                      delete newSkillLevels[key];
                      updateOnboardingData({
                        primary_sports: onboardingData.primary_sports.filter(s => s !== key),
                        skill_levels: newSkillLevels,
                      });
                    } else if (onboardingData.primary_sports.length < 3) {
                      updateOnboardingData({
                        primary_sports: [...onboardingData.primary_sports, key],
                      });
                    }
                  }}
                  style={{
                    paddingHorizontal: SPACING.lg,
                    paddingVertical: SPACING.md,
                    borderRadius: BORDER_RADIUS.full,
                    borderWidth: 2,
                    borderColor: onboardingData.primary_sports.includes(key) ? COLORS.gold : COLORS.gray300,
                    backgroundColor: onboardingData.primary_sports.includes(key) ? COLORS.gold + '20' : COLORS.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.sm,
                    fontFamily: TYPOGRAPHY.fontFamily.semibold,
                    color: onboardingData.primary_sports.includes(key) ? COLORS.gold : COLORS.gray600,
                    marginRight: SPACING.sm,
                  }}>
                    {sport.name}
                  </Text>
                  {onboardingData.primary_sports.includes(key) && (
                    <Check size={16} color={COLORS.gold} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              What's your skill level?
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              Select your skill level for each sport
            </Text>

            {onboardingData.primary_sports.map(sportKey => (
              <View key={sportKey} style={{ marginBottom: SPACING.xl }}>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.lg,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginBottom: SPACING.md,
                }}>
                  {SPORTS[sportKey as keyof typeof SPORTS]?.name}
                </Text>
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
                  {Object.entries(SKILL_LEVELS).map(([key, level]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        updateOnboardingData({
                          skill_levels: {
                            ...onboardingData.skill_levels,
                            [sportKey]: key,
                          },
                        });
                      }}
                      style={{
                        paddingHorizontal: SPACING.lg,
                        paddingVertical: SPACING.sm,
                        borderRadius: BORDER_RADIUS.full,
                        borderWidth: 2,
                        borderColor: onboardingData.skill_levels[sportKey] === key ? COLORS.gold : COLORS.gray300,
                        backgroundColor: onboardingData.skill_levels[sportKey] === key ? COLORS.gold + '20' : COLORS.white,
                      }}
                    >
                      <Text style={{
                        fontSize: TYPOGRAPHY.fontSize.sm,
                        fontFamily: TYPOGRAPHY.fontFamily.medium,
                        color: onboardingData.skill_levels[sportKey] === key ? COLORS.gold : COLORS.gray600,
                      }}>
                        {level.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              Tell us about yourself
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              This helps us match you with the right players and games
            </Text>

            <View style={{ gap: SPACING.lg }}>
              <View>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Gender
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
                  {GENDER_OPTIONS.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => updateOnboardingData({ gender: option.value })}
                      style={{
                        paddingHorizontal: SPACING.lg,
                        paddingVertical: SPACING.sm,
                        borderRadius: BORDER_RADIUS.full,
                        borderWidth: 2,
                        borderColor: onboardingData.gender === option.value ? COLORS.gold : COLORS.gray300,
                        backgroundColor: onboardingData.gender === option.value ? COLORS.gold + '20' : COLORS.white,
                      }}
                    >
                      <Text style={{
                        fontSize: TYPOGRAPHY.fontSize.sm,
                        fontFamily: TYPOGRAPHY.fontFamily.medium,
                        color: onboardingData.gender === option.value ? COLORS.gold : COLORS.gray600,
                      }}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Birth Year (Optional)
                </Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: COLORS.gray300,
                  borderRadius: BORDER_RADIUS.lg,
                  paddingHorizontal: SPACING.lg,
                  paddingVertical: SPACING.md,
                  backgroundColor: COLORS.white,
                }}>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.base,
                    fontFamily: TYPOGRAPHY.fontFamily.medium,
                    color: COLORS.gray600,
                  }}>
                    {onboardingData.birth_year || 'Select your birth year'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              Physical Stats (Optional)
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              Help other players understand your physical profile
            </Text>

            <View style={{ gap: SPACING.lg }}>
              <View>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Height
                </Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: COLORS.gray300,
                  borderRadius: BORDER_RADIUS.lg,
                  paddingHorizontal: SPACING.lg,
                  paddingVertical: SPACING.md,
                  backgroundColor: COLORS.white,
                }}>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.base,
                    fontFamily: TYPOGRAPHY.fontFamily.medium,
                    color: COLORS.gray600,
                  }}>
                    {onboardingData.height_cm ? `${onboardingData.height_cm} cm` : 'Select your height'}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Weight
                </Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: COLORS.gray300,
                  borderRadius: BORDER_RADIUS.lg,
                  paddingHorizontal: SPACING.lg,
                  paddingVertical: SPACING.md,
                  backgroundColor: COLORS.white,
                }}>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.base,
                    fontFamily: TYPOGRAPHY.fontFamily.medium,
                    color: COLORS.gray600,
                  }}>
                    {onboardingData.weight_kg ? `${onboardingData.weight_kg} kg` : 'Select your weight'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              Where are you located?
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              This helps us find games and players near you
            </Text>

            <View style={{
              borderWidth: 1,
              borderColor: COLORS.gray300,
              borderRadius: BORDER_RADIUS.lg,
              paddingHorizontal: SPACING.lg,
              paddingVertical: SPACING.md,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MapPin size={20} color={COLORS.gray500} />
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.base,
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                color: COLORS.gray600,
                marginLeft: SPACING.sm,
                flex: 1,
              }}>
                {onboardingData.city ? `${onboardingData.city}, ${onboardingData.country}` : 'Allow location access or enter manually'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={async () => {
                try {
                  const { status } = await Location.requestForegroundPermissionsAsync();
                  if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    const reverseGeocode = await Location.reverseGeocodeAsync({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    });
                    
                    if (reverseGeocode.length > 0) {
                      const address = reverseGeocode[0];
                      updateOnboardingData({
                        city: address.city || '',
                        country: address.country || '',
                        coordinates: {
                          lat: location.coords.latitude,
                          lng: location.coords.longitude,
                        },
                      });
                    }
                  }
                } catch (error) {
                  Alert.alert('Error', 'Failed to get location');
                }
              }}
              style={{
                marginTop: SPACING.lg,
                paddingVertical: SPACING.md,
                paddingHorizontal: SPACING.lg,
                backgroundColor: COLORS.gold + '20',
                borderRadius: BORDER_RADIUS.lg,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                fontFamily: TYPOGRAPHY.fontFamily.semibold,
                color: COLORS.gold,
              }}>
                Use Current Location
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 6:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              Notification Preferences
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              Stay updated on games, messages, and team activities
            </Text>

            <View style={{
              backgroundColor: COLORS.gray50,
              padding: SPACING.lg,
              borderRadius: BORDER_RADIUS.lg,
              marginBottom: SPACING.lg,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
                <Bell size={20} color={COLORS.gold} />
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.base,
                  fontFamily: TYPOGRAPHY.fontFamily.semibold,
                  color: COLORS.black,
                  marginLeft: SPACING.sm,
                }}>
                  Push Notifications
                </Text>
              </View>
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                color: COLORS.gray600,
                lineHeight: 20,
              }}>
                Get notified about game invites, messages, and team updates
              </Text>
            </View>

            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.sm,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray500,
              textAlign: 'center',
            }}>
              You can change these settings anytime in your profile
            </Text>
          </View>
        );

      case 7:
        return (
          <View>
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontFamily: TYPOGRAPHY.fontFamily.bold,
              color: COLORS.black,
              marginBottom: SPACING.md,
            }}>
              Add a Profile Photo
            </Text>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray600,
              marginBottom: SPACING['2xl'],
            }}>
              Help other players recognize you
            </Text>

            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: COLORS.gray100,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: SPACING.xl,
            }}>
              <Camera size={40} color={COLORS.gray400} />
            </View>

            <TouchableOpacity
              style={{
                paddingVertical: SPACING.md,
                paddingHorizontal: SPACING.lg,
                backgroundColor: COLORS.gold + '20',
                borderRadius: BORDER_RADIUS.lg,
                alignItems: 'center',
                marginBottom: SPACING.lg,
              }}
            >
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                fontFamily: TYPOGRAPHY.fontFamily.semibold,
                color: COLORS.gold,
              }}>
                Choose Photo
              </Text>
            </TouchableOpacity>

            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.sm,
              fontFamily: TYPOGRAPHY.fontFamily.medium,
              color: COLORS.gray500,
              textAlign: 'center',
            }}>
              You can skip this and add a photo later
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.primary_sports.length > 0;
      case 2:
        return onboardingData.primary_sports.every(sport => onboardingData.skill_levels[sport]);
      default:
        return true;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {renderProgressBar()}
            
            <View style={styles.stepContent}>
              {renderStepContent()}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navigationContainer}>
              {currentStep > 0 ? (
                <TouchableOpacity
                  onPress={prevStep}
                  style={styles.backButton}
                >
                  <ArrowLeft size={20} color={COLORS.gray600} />
                  <Text style={styles.backButtonText}>
                    Back
                  </Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}

              {currentStep < totalSteps - 1 ? (
                <Button
                  title="Continue"
                  onPress={nextStep}
                  disabled={!canProceed()}
                  icon={<ArrowRight size={20} color={COLORS.white} />}
                  iconPosition="right"
                />
              ) : (
                <Button
                  title="Complete Setup"
                  onPress={handleCompleteOnboarding}
                  loading={loading}
                  icon={<Check size={20} color={COLORS.white} />}
                  iconPosition="right"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING['4xl'],
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING['2xl'],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    marginLeft: SPACING.sm,
  },
});
