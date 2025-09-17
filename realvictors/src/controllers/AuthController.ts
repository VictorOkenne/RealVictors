// Authentication Controller - Handles all auth-related operations
import { authService, dbService } from '../services/supabase';
import { User, Profile } from '../types';

export class AuthController {
  // Sign up new user with profile creation
  static async signUp(email: string, password: string, displayName: string): Promise<{ user: User; profile: Profile }> {
    try {
      // Create auth user
      const authResult = await authService.signUp(email, password, displayName);
      
      if (!authResult.user) {
        throw new Error('Failed to create user account');
      }

      // Create initial profile
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

      const profile = await dbService.updateProfile(authResult.user.id, profileData);

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
        profile,
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign in existing user
  static async signIn(email: string, password: string): Promise<{ user: User; profile: Profile }> {
    try {
      const authResult = await authService.signIn(email, password);
      
      if (!authResult.user) {
        throw new Error('Failed to sign in');
      }

      // Get user profile
      const profile = await dbService.getProfile(authResult.user.id);
      
      if (!profile) {
        throw new Error('User profile not found');
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
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign in with Google
  static async signInWithGoogle(): Promise<void> {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign in with Apple
  static async signInWithApple(): Promise<void> {
    try {
      await authService.signInWithApple();
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  }

  // Sign out current user
  static async signOut(): Promise<void> {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
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
        return null;
      }

      const profile = await dbService.getProfile(authUser.id);
      
      if (!profile) {
        return null;
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
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
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
      const profile = await dbService.updateProfile(userId, onboardingData);
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
