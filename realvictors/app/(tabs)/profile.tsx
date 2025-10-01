import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '../../src/utils/theme';
import { useAuth } from '../../src/contexts/AuthContext';
import { Button } from '../../src/components/ui/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '../../src/constants';

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🚪 Profile screen - Starting logout process...');
              await signOut();
              console.log('✅ Profile screen - User signed out successfully');
              
              // Fallback: Force redirect to login if AuthGuard doesn't work
              setTimeout(() => {
                console.log('🚀 Profile screen - Force redirecting to login as fallback');
                router.replace('/(auth)/login');
              }, 500);
              
            } catch (error) {
              console.error('❌ Profile screen - Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Profile</Text>
        <Text style={[styles.subtitle, { color: colors.secondary }]}>
          Welcome, {user?.display_name || 'User'}!
        </Text>
        <Text style={[styles.email, { color: colors.secondary }]}>
          {user?.email}
        </Text>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="outline"
          fullWidth
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING['2xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  email: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    textAlign: 'center',
    opacity: 0.7,
  },
  actions: {
    paddingTop: SPACING['2xl'],
  },
  logoutButton: {
    borderColor: COLORS.error,
  },
});

