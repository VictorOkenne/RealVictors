import {
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    useFonts,
} from '@expo-google-fonts/montserrat';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { MainSignupPage } from '../../src/components/screens/AuthScreens/Signup';
import { useAuth } from '../../src/contexts/AuthContext';
import { useAppTheme } from '../../src/utils/theme';


export default function SignupScreen() {
  const { colors } = useAppTheme();
  const { signUp, isLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  /**
   * Handle signup completion from MainSignupPage
   */
  const handleSignupComplete = async (data: {
    email?: string;
    password?: string;
    fullName?: string;
    username?: string;
    gender?: string;
    dateOfBirth?: string;
    displayName?: string;
  }) => {
    const { email, password, fullName, username, gender, dateOfBirth, displayName } = data;

    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    console.log('📝 Attempting signup with data:', {
      email,
      fullName,
      username,
      gender,
      dateOfBirth,
    });
    
    // Use fullName as displayName if available, otherwise use the displayName field
    const finalDisplayName = fullName?.trim() || displayName?.trim() || '';
    
    const result = await signUp(email.trim(), password, finalDisplayName);
    
    if (!result.success) {
      console.log('❌ Signup failed:', result.error);
      Alert.alert('Sign Up Failed', result.error || 'An error occurred during sign up');
    } else {
      console.log('✅ Signup successful, AuthGuard should handle routing');
      // TODO: Store additional user data (username, gender, dateOfBirth) to database/profile
      // This can be done in a separate profile update after auth is complete
      // Let AuthGuard handle the routing - it will redirect to the app
    }
  };

  return <MainSignupPage onComplete={handleSignupComplete} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
