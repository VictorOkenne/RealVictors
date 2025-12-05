/**
 * Home Screen
 * 
 * Main home screen that users see after logging in.
 * Displays the full HomePage with stats, upcoming games, and social feed.
 */

import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MainHomePage } from '@/components/screens/HomePage';
import { useAppTheme } from '@/utils/theme';

export default function HomeScreen() {
  const { colors } = useAppTheme();

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

  return <MainHomePage />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
