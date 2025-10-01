/**
 * Home Screen Component
 * 
 * Main dashboard screen that users see after logging in.
 * Displays personalized content, user stats, and quick actions.
 * 
 * Features:
 * - Personalized welcome message with user's name
 * - Performance stats display (games played, PPG, APG, etc.)
 * - Quick action buttons (search, notifications, create post)
 * - Pull-to-refresh functionality
 * - Location display
 * - Coming soon placeholder for future features
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Search,
  Bell,
  MapPin,
  Plus,
  TrendingUp,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useAppTheme } from '../../src/utils/theme';
import { useAuth } from '../../src/contexts/AuthContext';

/**
 * HomeScreen Component
 * 
 * Main dashboard for authenticated users.
 * Shows personalized content and quick access to key features.
 */
export default function HomeScreen() {
  // Get safe area insets for proper spacing on devices with notches
  const insets = useSafeAreaInsets();
  // Get theme colors and dark mode state
  const { colors, isDark } = useAppTheme();
  // Get current user and profile data
  const { user, profile } = useAuth();
  // State for pull-to-refresh functionality
  const [refreshing, setRefreshing] = useState(false);

  // Load custom fonts for consistent typography
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Fetch user performance statistics using React Query
  // This will be replaced with real API calls in production
  const { data: userStats } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return {
        points: 24.5,        // Points per game
        assists: 8.2,        // Assists per game
        rebounds: 12.1,      // Rebounds per game
        games_played: 58,    // Total games played
      };
    },
    enabled: !!user, // Only fetch when user is available
  });

  // Don't render until fonts are loaded to prevent layout shift
  if (!fontsLoaded) {
    return null;
  }

  // Handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - replace with actual data fetching
    setTimeout(() => setRefreshing(false), 1000);
  };

  /**
   * Render the app header with logo, action buttons, and location
   * @returns JSX element for the header
   */
  const renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.surface,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {/* Top row with logo and action buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* App logo with split styling */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Montserrat_700Bold',
              color: colors.primary,
            }}
          >
            Real
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Montserrat_700Bold',
              color: colors.gold,
            }}
          >
            Victors
          </Text>
        </View>

        {/* Action buttons for search and notifications */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Search button */}
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Search size={18} color={colors.secondary} />
          </TouchableOpacity>

          {/* Notifications button */}
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Bell size={18} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location display */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <MapPin size={14} color={colors.secondary} />
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Montserrat_500Medium',
            color: colors.secondary,
            marginLeft: 4,
          }}
        >
          {profile?.city || 'Location not set'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Status bar that adapts to theme */}
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header with safe area spacing */}
      <View style={{ paddingTop: insets.top }}>
        {renderHeader()}
      </View>

      {/* Main scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }} // Extra padding for tab bar
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />
        }
      >
        {/* Personalized welcome message */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{
            fontSize: 20,
            fontFamily: 'Montserrat_600SemiBold',
            color: colors.primary,
            marginBottom: 8,
          }}>
            Welcome back, {user?.display_name || 'Victor'}! 👋
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Montserrat_500Medium',
            color: colors.secondary,
          }}>
            Ready to dominate today?
          </Text>
        </View>

        {/* Performance statistics card with shadow and rounded corners */}
        <View style={{
          backgroundColor: colors.surface,
          borderRadius: 20,
          padding: 20,
          marginHorizontal: 20,
          marginTop: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4, // Android shadow
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'Montserrat_600SemiBold',
            color: colors.primary,
            marginBottom: 16,
          }}>
            Your Performance
          </Text>
          
          {/* Stats grid with 4 key metrics */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Games played stat */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 18,
                color: colors.gold,
              }}>
                {userStats?.games_played || 0}
              </Text>
              <Text style={{
                fontFamily: 'Montserrat_500Medium',
                fontSize: 11,
                color: colors.secondary,
                marginTop: 2,
              }}>
                Games
              </Text>
            </View>
            {/* Points per game stat */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 18,
                color: colors.gold,
              }}>
                {userStats?.points || 0}
              </Text>
              <Text style={{
                fontFamily: 'Montserrat_500Medium',
                fontSize: 11,
                color: colors.secondary,
                marginTop: 2,
              }}>
                PPG
              </Text>
            </View>
            {/* Assists per game stat */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 18,
                color: colors.gold,
              }}>
                {userStats?.assists || 0}
              </Text>
              <Text style={{
                fontFamily: 'Montserrat_500Medium',
                fontSize: 11,
                color: colors.secondary,
                marginTop: 2,
              }}>
                APG
              </Text>
            </View>
            {/* Trophies/achievements stat */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 18,
                color: colors.gold,
              }}>
                3
              </Text>
              <Text style={{
                fontFamily: 'Montserrat_500Medium',
                fontSize: 11,
                color: colors.secondary,
                marginTop: 2,
              }}>
                Trophies
              </Text>
            </View>
          </View>
        </View>

        {/* Call-to-action button for creating posts */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.gold,
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => router.push('/(tabs)/create')}
        >
          <Plus size={20} color="#000000" />
          <Text style={{
            fontSize: 16,
            fontFamily: 'Montserrat_600SemiBold',
            color: '#000000',
            marginLeft: 8,
          }}>
            Share Your Victory
          </Text>
        </TouchableOpacity>

        {/* Placeholder message for upcoming features */}
        <View style={{
          backgroundColor: colors.surfaceVariant,
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
          borderRadius: 16,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 18,
            fontFamily: 'Montserrat_600SemiBold',
            color: colors.primary,
            marginBottom: 8,
          }}>
            🚧 More Features Coming Soon!
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'Montserrat_500Medium',
            color: colors.secondary,
            textAlign: 'center',
          }}>
            We're building the full feed, game discovery, team management, and more. Stay tuned!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
