import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, PrimaryButton, ProgressIndicator, TitleSection } from '../../../ui';

interface LocationData {
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationAccessProps {
  onContinue?: (location: LocationData) => void;
  navigation?: {
    goBack: () => void;
  };
}

/**
 * LocationAccess - Location permission and manual input screen
 * 
 * Allows users to grant location access or manually enter their city
 */
export const LocationAccess = ({
  onContinue,
  navigation,
}: LocationAccessProps) => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const [manualCountry, setManualCountry] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Request location permission and get coordinates
   */
  const handleAllowLocation = async () => {
    setIsLoading(true);
    try {
      // Request foreground permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Location access helps us connect you with nearby players. You can still enter your city manually.',
          [
            { text: 'Enter Manually', onPress: () => setShowManualInput(true) },
            { text: 'Try Again', onPress: handleAllowLocation },
          ]
        );
        setIsLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get city and country
      const [geocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocationGranted(true);

      const locationData: LocationData = {
        city: geocode.city || geocode.subregion || undefined,
        country: geocode.country || undefined,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      };

      console.log('📍 Location obtained:', locationData);

      if (onContinue) {
        onContinue(locationData);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your location. Would you like to enter your city manually?',
        [
          { text: 'Enter Manually', onPress: () => setShowManualInput(true) },
          { text: 'Try Again', onPress: handleAllowLocation },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle manual location submission
   */
  const handleManualSubmit = () => {
    if (!manualCity.trim()) {
      Alert.alert('City Required', 'Please enter your city to continue.');
      return;
    }

    const locationData: LocationData = {
      city: manualCity.trim(),
      country: manualCountry.trim() || undefined,
    };

    console.log('📍 Manual location entered:', locationData);

    if (onContinue) {
      onContinue(locationData);
    }
  };

  /**
   * Handle skip
   */
  const handleSkip = () => {
    Alert.alert(
      'Skip Location?',
      'Location helps us provide better recommendations. You can always add it later in settings.',
      [
        { text: 'Go Back', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            if (onContinue) {
              onContinue({});
            }
          },
        },
      ]
    );
  };

  /**
   * Handle back button press
   */
  const handleBack = () => {
    if (showManualInput) {
      setShowManualInput(false);
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ProgressIndicator current={5} total={5} variant="linear" />

      <NavigationHeader onBack={handleBack} />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!showManualInput ? (
          <>
            {/* Location Permission View */}
            <View style={styles.illustrationContainer}>
              <View style={styles.locationIllustration}>
                <Ionicons name="location" size={120} color="#FFC245" />
              </View>
            </View>

            <TitleSection
              title="Allow Location access"
              subtitle="Help us connect you with players and opportunities in your area"
              containerStyle={styles.textContainer}
            />
          </>
        ) : (
          <>
            {/* Manual Input View */}
            <TitleSection
              title="Enter Your Location"
              subtitle="Let us know where you're based to find nearby players"
              containerStyle={styles.header}
            />

            <View style={styles.inputContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>City *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Toronto, Ottawa"
                  placeholderTextColor="#CCCCCC"
                  value={manualCity}
                  onChangeText={setManualCity}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Country (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Canada, United States"
                  placeholderTextColor="#CCCCCC"
                  value={manualCountry}
                  onChangeText={setManualCountry}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {!showManualInput ? (
          <>
            <PrimaryButton
              title={isLoading ? 'Getting Location...' : 'Allow'}
              onPress={handleAllowLocation}
              active={!isLoading}
              isLoading={isLoading}
              variant="large"
            />

            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => setShowManualInput(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.skipButtonText}>Enter Manually</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.8}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </>
        ) : (
          <PrimaryButton
            title="Continue"
            onPress={handleManualSubmit}
            active={true}
            variant="large"
          />
        )}
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
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  locationIllustration: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 15,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    gap: 25,
  },
  inputGroup: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.3,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    gap: 15,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFC245',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFC245',
    letterSpacing: -0.3,
  },
});

export default LocationAccess;


