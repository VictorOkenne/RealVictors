import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, PrimaryButton, ProgressIndicator, TitleSection } from '../../../ui';

interface ProfilePictureProps {
  onContinue?: (imageUri?: string) => void;
  navigation?: {
    goBack: () => void;
  };
}

/**
 * ProfilePicture - Profile picture upload screen
 * 
 * Allows users to take a photo or select from library
 */
export const ProfilePicture = ({
  onContinue,
  navigation,
}: ProfilePictureProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Request camera permissions
   */
  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera access in your device settings to take a photo.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  /**
   * Request media library permissions
   */
  const requestMediaLibraryPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Photo Library Permission Required',
        'Please enable photo library access in your device settings to select a photo.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  /**
   * Handle take photo
   */
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  /**
   * Handle choose from library
   */
  const handleChooseFromLibrary = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    }
  };

  /**
   * Show photo options
   */
  const handleAddPhoto = () => {
    Alert.alert('Add Profile Picture', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: handleTakePhoto,
      },
      {
        text: 'Choose from Library',
        onPress: handleChooseFromLibrary,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    if (onContinue) {
      onContinue(imageUri || undefined);
    }
  };

  /**
   * Handle skip button press
   */
  const handleSkip = () => {
    if (onContinue) {
      onContinue(undefined);
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

      <ProgressIndicator current={4} total={5} variant="linear" />

      <NavigationHeader onBack={handleBack} />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TitleSection
          title="Help Other's recognize you"
          subtitle="Add a clear picture of yourself for easy identification"
          containerStyle={styles.header}
        />

        {/* Photo Upload Area */}
        <View style={styles.photoContainer}>
          <TouchableOpacity
            style={styles.photoCircle}
            onPress={handleAddPhoto}
            activeOpacity={0.8}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderCircle}>
                <Ionicons name="camera" size={48} color="#CCCCCC" />
              </View>
            )}
          </TouchableOpacity>

          {/* Tip Text */}
          <Text style={styles.tipText}>
            💡 <Text style={styles.tipBold}>Tip:</Text> Use a professional photo,
            preferably in your sports kit, showing your face clearly
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <PrimaryButton
          title={imageUri ? 'Change Photo' : 'Add to profile'}
          onPress={handleAddPhoto}
          active={true}
          variant="large"
        />

        <TouchableOpacity
          style={styles.skipButton}
          onPress={imageUri ? handleContinue : handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>
            {imageUri ? 'Continue' : 'Skip'}
          </Text>
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
    alignItems: 'center',
  },
  header: {
    marginBottom: 60,
    width: '100%',
  },
  photoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  photoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: 'hidden',
    marginBottom: 30,
  },
  placeholderCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tipText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.3,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  tipBold: {
    fontWeight: '600',
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

export default ProfilePicture;


