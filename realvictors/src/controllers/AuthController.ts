/**
 * Authentication Controller
 * 
 * High-level controller that handles all authentication operations.
 * Provides a clean interface between the UI and the Supabase auth service.
 * 
 * Features:
 * - User registration with profile creation
 * - User authentication (email/password and OAuth)
 * - Profile management and onboarding
 * - Error handling and user-friendly messages
 * - Session management
 * 
 * All methods are static for easy access throughout the app.
 */

import { authService, dbService } from '../services/supabase';
import { User, Profile } from '../types';

export class AuthController {
  /**
   * Sign up new user with profile creation
   * @param email User's email address
   * @param password User's password
   * @param displayName User's display name
   * @returns Promise with user and profile data
   */
  static async signUp(email: string, password: string, displayName: string): Promise<{ user: User; profile: Profile }> {
    try {
      // Create auth user
      const authResult = await authService.signUp(email, password, displayName);
      
      if (!authResult.user) {
        throw new Error('Failed to create user account');
      }

      // Wait for user record to be created by trigger
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to create initial profile, but don't fail if it doesn't work
      let profile: Profile | null = null;
      try {
        const profileData = {
          user_id: authResult.user.id,
          bio: null,
          primary_sports: [],
          skill_levels: {},
          verified: false,
          profile_visibility: 'public' as const,
          resume_public: true,
          discoverable: true,
        };

        profile = await dbService.updateProfile(authResult.user.id, profileData);
        console.log('✅ Profile created successfully during signup');
      } catch (profileError) {
        console.log('⚠️ Profile creation failed, will be created during onboarding:', profileError);
        // Profile will be created during onboarding
        profile = null;
      }

      return {
        user: {
          id: authResult.user.id,
          email: authResult.user.email!,
          display_name: displayName,
          avatar_url: authResult.user.user_metadata?.avatar_url || null,
          phone: authResult.user.phone || null,
          created_at: authResult.user.created_at!,
          updated_at: authResult.user.updated_at!,
        },
        profile: profile as any,
      };
    } catch (error: any) {
      console.error('❌ Sign up error:', error);
      
      // Handle specific Supabase errors gracefully
      if (error.message?.includes('Email not confirmed')) {
        throw new Error('Please check your email and click the confirmation link before signing in.');
      } else if (error.message?.includes('User already registered')) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      } else if (error.message?.includes('Password should be at least')) {
        throw new Error('Password must be at least 6 characters long.');
      } else if (error.message?.includes('Invalid email')) {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(error.message || 'Failed to create account. Please try again.');
      }
    }
  }

  /**
   * Sign in existing user
   * @param email User's email address
   * @param password User's password
   * @returns Promise with user and profile data
   */
  static async signIn(email: string, password: string): Promise<{ user: User; profile: Profile }> {
    try {
      const authResult = await authService.signIn(email, password);
      
      if (!authResult.user) {
        throw new Error('Failed to sign in');
      }

      console.log('✅ User signed in successfully:', authResult.user.email);

      // Get user profile, but don't fail if it doesn't exist
      let profile: Profile | null = null;
      try {
        profile = await dbService.getProfile(authResult.user.id);
        console.log('✅ Profile found for user');
      } catch (profileError) {
        console.log('⚠️ Profile not found, user needs to complete onboarding:', profileError);
      }

      if (!profile) {
        // Return user without profile - they need to complete onboarding
        console.log('📝 User needs to complete onboarding');
        return {
          user: {
            id: authResult.user.id,
            email: authResult.user.email!,
            display_name: authResult.user.user_metadata?.display_name || 'User',
            avatar_url: authResult.user.user_metadata?.avatar_url || null,
            phone: authResult.user.phone || null,
            created_at: authResult.user.created_at!,
            updated_at: authResult.user.updated_at!,
          },
          profile: null as any, // Will be created during onboarding
        };
      }

      return {
        user: {
          id: authResult.user.id,
          email: authResult.user.email!,
          display_name: authResult.user.user_metadata?.display_name || 'User',
          avatar_url: authResult.user.user_metadata?.avatar_url || null,
          phone: authResult.user.phone || null,
          created_at: authResult.user.created_at!,
          updated_at: authResult.user.updated_at!,
        },
        profile,
      };
    } catch (error: any) {
      console.error('❌ Sign in error:', error);
      
      // Handle specific Supabase errors gracefully
      if (error.message?.includes('Email not confirmed')) {
        throw new Error('Please check your email and click the confirmation link before signing in.');
      } else if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message?.includes('Too many requests')) {
        throw new Error('Too many login attempts. Please wait a moment and try again.');
      } else if (error.message?.includes('User from sub claim in JWT does not exist')) {
        throw new Error('Account not found. Please sign up first or contact support.');
      } else {
        throw new Error(error.message || 'Failed to sign in. Please try again.');
      }
    }
  }

  /**
   * Sign in with Google OAuth
   * @returns Promise that resolves when OAuth flow completes
   */
  static async signInWithGoogle(): Promise<void> {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign in with Apple OAuth
   * @returns Promise that resolves when OAuth flow completes
   */
  static async signInWithApple(): Promise<void> {
    try {
      await authService.signInWithApple();
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out current user
   * Clears session and local state
   * @returns Promise that resolves when sign out completes
   */
  static async signOut(): Promise<void> {
    try {
      console.log('🔐 AuthController.signOut() - Starting sign out...');
      await authService.signOut();
      console.log('✅ AuthController.signOut() - Supabase sign out completed');
      
      // Clear any cached session data
      await authService.clearSession();
      console.log('✅ AuthController.signOut() - Session cleared');
      
    } catch (error) {
      console.error('❌ AuthController.signOut() error:', error);
      throw error;
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<void> {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Get current session
  static async getCurrentSession() {
    try {
      return await authService.getSession();
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Get current user with profile
  static async getCurrentUser(): Promise<{ user: User; profile: Profile } | null> {
    try {
      const authUser = await authService.getUser();
      
      if (!authUser) {
        console.log('🔍 No authenticated user found');
        return null;
      }

      console.log('🔍 Found authenticated user:', authUser.email);

      // Try to get profile, but don't fail if it doesn't exist yet
      let profile: Profile | null = null;
      try {
        profile = await dbService.getProfile(authUser.id);
        if (profile) {
          console.log('✅ Profile found for current user:', { user_id: profile.user_id });
        } else {
          console.log('⚠️ Profile query returned null/empty');
        }
      } catch (profileError) {
        console.log('⚠️ Profile not found for user, will be created during onboarding:', profileError);
        // Profile doesn't exist yet - this is normal for new users
        // They'll be redirected to onboarding
        profile = null;
      }
      
      if (!profile) {
        // Return user without profile - they need to complete onboarding
        console.log('📝 Current user needs to complete onboarding');
        return {
          user: {
            id: authUser.id,
            email: authUser.email!,
            display_name: authUser.user_metadata?.display_name || 'User',
            avatar_url: authUser.user_metadata?.avatar_url || null,
            phone: authUser.phone || null,
            created_at: authUser.created_at!,
            updated_at: authUser.updated_at!,
          },
          profile: null as any, // Will be created during onboarding
        };
      }

      return {
        user: {
          id: authUser.id,
          email: authUser.email!,
          display_name: authUser.user_metadata?.display_name || 'User',
          avatar_url: authUser.user_metadata?.avatar_url || null,
          phone: authUser.phone || null,
          created_at: authUser.created_at!,
          updated_at: authUser.updated_at!,
        },
        profile,
      };
    } catch (error: any) {
      // Handle specific errors gracefully - these are normal states, not errors
      if (error.message?.includes('User from sub claim in JWT does not exist')) {
        // This is normal for new users - don't log as error
        return null;
      } else if (error.message?.includes('Auth session missing')) {
        // This is normal when not signed in - don't log as error
        return null;
      } else {
        // Only log unexpected errors
        console.log('⚠️ Unexpected auth error:', error.message);
        return null;
      }
    }
  }

  // Update user profile during onboarding
  static async completeOnboarding(userId: string, onboardingData: {
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
  }): Promise<Profile> {
    try {
      // First, ensure the user record exists
      const userExists = await dbService.getUser(userId);
      if (!userExists) {
        throw new Error('User not found');
      }

      // Create or update the profile
      const profileData = {
        user_id: userId,
        bio: onboardingData.bio || null,
        height_cm: onboardingData.height_cm || null,
        weight_kg: onboardingData.weight_kg || null,
        birth_year: onboardingData.birth_year || null,
        gender: onboardingData.gender || null,
        city: onboardingData.city || null,
        country: onboardingData.country || null,
        coordinates: onboardingData.coordinates ? 
          `POINT(${onboardingData.coordinates.lng} ${onboardingData.coordinates.lat})` : null,
        primary_sports: onboardingData.primary_sports,
        skill_levels: onboardingData.skill_levels,
        verified: false,
        profile_visibility: 'public' as const,
        resume_public: true,
        discoverable: true,
      };

      const profile = await dbService.updateProfile(userId, profileData);
      return profile;
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  }

  // Update user avatar
  static async updateAvatar(userId: string, avatarFile: File): Promise<string> {
    try {
      // Upload avatar to media storage
      const media = await dbService.uploadMedia(avatarFile, userId);
      
      // Update user metadata with avatar URL
      await authService.updateUser({
        data: { avatar_url: media.url_main }
      });

      return media.url_main;
    } catch (error) {
      console.error('Update avatar error:', error);
      throw error;
    }
  }

  // Update user display name
  static async updateDisplayName(displayName: string): Promise<void> {
    try {
      await authService.updateUser({
        data: { display_name: displayName }
      });
    } catch (error) {
      console.error('Update display name error:', error);
      throw error;
    }
  }

  // Update user email
  static async updateEmail(email: string): Promise<void> {
    try {
      await authService.updateUser({ email });
    } catch (error) {
      console.error('Update email error:', error);
      throw error;
    }
  }

  // Update user password
  static async updatePassword(password: string): Promise<void> {
    try {
      await authService.updateUser({ password });
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  // Delete user account
  static async deleteAccount(userId: string): Promise<void> {
    try {
      // This would need to be implemented as an edge function
      // since Supabase doesn't allow direct user deletion from client
      throw new Error('Account deletion not implemented - contact support');
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  }

  // Validate user session and refresh if needed
  static async validateSession(): Promise<boolean> {
    try {
      const session = await authService.getSession();
      return !!session?.user;
    } catch (error) {
      console.error('Validate session error:', error);
      return false;
    }
  }
}
