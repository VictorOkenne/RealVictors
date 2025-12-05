/**
 * Auth API - Mutation Hooks (Modifying Auth State)
 *
 * This file contains TanStack Query hooks for auth operations:
 * - Login
 * - Signup
 * - Logout
 * - Update profile
 * - Password reset
 *
 * Current Status: USING MOCK DATA
 * - All mutations simulate auth operations
 * - No actual authentication happens (mock state only)
 * - When Supabase is ready, uncomment real mutations (marked with TODO)
 *
 * Architecture:
 * - These mutations replace old AuthController methods
 * - Auto-invalidate user/profile queries on success
 * - Auto-update UI across entire app
 * - No manual state management needed
 *
 * Auth Flow Example (Login):
 * 1. User submits login form
 * 2. useLogin() mutation runs
 * 3. Supabase authenticates user
 * 4. onSuccess invalidates ['user'] cache
 * 5. useUser() refetches and gets logged-in user
 * 6. All components using useUser() auto-update
 * 7. AuthGuard redirects to main app
 *
 * Security Note:
 * - Auth mutations are secure by default (Supabase handles it)
 * - No frontend checks needed - Supabase validates credentials
 * - Frontend just calls the API and shows results
 *
 * @see https://supabase.com/docs/guides/auth
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../client';
import { setMockLoginState } from './queries';
import { Profile } from '../../types';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Input type for login
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Input type for signup
 */
export interface SignupInput {
  email: string;
  password: string;
  displayName: string;
}

/**
 * Input type for profile updates
 */
export interface UpdateProfileInput {
  bio?: string;
  height_cm?: number;
  weight_kg?: number;
  birth_year?: number;
  gender?: string;
  city?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
  primary_sports?: string[];
  skill_levels?: Record<string, string>;
}

/**
 * Input type for completing onboarding
 */
export interface CompleteOnboardingInput {
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

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Login user with email and password
 *
 * Features:
 * - Authenticates with Supabase
 * - Auto-invalidates user cache (triggers refetch)
 * - Returns user data on success
 * - Shows loading/error states
 *
 * Usage Example:
 *   ```tsx
 *   const LoginScreen = () => {
 *     const login = useLogin();
 *     const [email, setEmail] = useState('');
 *     const [password, setPassword] = useState('');
 *
 *     const handleLogin = async () => {
 *       try {
 *         await login.mutateAsync({ email, password });
 *         // Login successful - useUser() will auto-update
 *         router.replace('/(tabs)');
 *       } catch (error) {
 *         Alert.alert('Login Failed', error.message);
 *       }
 *     };
 *
 *     return (
 *       <View>
 *         <TextInput value={email} onChangeText={setEmail} />
 *         <TextInput value={password} onChangeText={setPassword} secureTextEntry />
 *         <Button
 *           onPress={handleLogin}
 *           loading={login.isPending}
 *           disabled={login.isPending}
 *         >
 *           {login.isPending ? 'Logging in...' : 'Login'}
 *         </Button>
 *       </View>
 *     );
 *   };
 *   ```
 *
 * What happens:
 * 1. User clicks login
 * 2. isPending = true (button shows loading)
 * 3. Mutation calls Supabase
 * 4. Supabase validates credentials
 * 5. onSuccess invalidates ['user']
 * 6. useUser() refetches and returns logged-in user
 * 7. AuthGuard sees user and redirects to main app
 *
 * @returns TanStack mutation hook
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      console.log('🔐 Login attempt (mock):', email);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate incorrect credentials (for testing error states)
      if (email === 'wrong@example.com') {
        throw new Error('Invalid email or password');
      }

      // Set mock login state to true
      setMockLoginState(true);

      console.log('✅ Login successful (mock)');
      return { email };

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      console.log('🔐 Login attempt:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Login failed:', error.message);

        // User-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email before logging in');
        } else {
          throw new Error(error.message);
        }
      }

      if (!data.user) {
        throw new Error('Login failed - no user returned');
      }

      console.log('✅ Login successful:', data.user.email);
      return data;
      */
    },

    // Success callback: Invalidate user cache to trigger refetch
    onSuccess: () => {
      console.log('🔄 Invalidating user cache after login...');

      // Invalidate user query - this triggers useUser() to refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });

      console.log('✅ User cache invalidated - app will auto-update');
    },

    onError: (error: any) => {
      console.error('❌ Login error:', error.message);
    },
  });
};

/**
 * Signup new user
 *
 * Features:
 * - Creates Supabase auth user
 * - Creates user record in database (via database trigger)
 * - Auto-invalidates user cache
 * - Can create basic profile or redirect to onboarding
 *
 * Usage Example:
 *   ```tsx
 *   const SignupScreen = () => {
 *     const signup = useSignup();
 *
 *     const handleSignup = async (formData) => {
 *       try {
 *         await signup.mutateAsync({
 *           email: formData.email,
 *           password: formData.password,
 *           displayName: formData.displayName,
 *         });
 *         // Signup successful
 *         router.replace('/onboarding');
 *       } catch (error) {
 *         Alert.alert('Signup Failed', error.message);
 *       }
 *     };
 *
 *     return <SignupForm onSubmit={handleSignup} loading={signup.isPending} />;
 *   };
 *   ```
 *
 * @returns TanStack mutation hook
 */
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, displayName }: SignupInput) => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      console.log('📝 Signup attempt (mock):', email);

      await new Promise(resolve => setTimeout(resolve, 1200));

      // Simulate validation
      if (!email || !password || !displayName) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate email already exists (for testing)
      if (email === 'exists@example.com') {
        throw new Error('An account with this email already exists');
      }

      setMockLoginState(true);
      console.log('✅ Signup successful (mock)');
      return { email, displayName };

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      console.log('📝 Signup attempt:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        console.error('❌ Signup failed:', error.message);

        // User-friendly error messages
        if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists');
        } else if (error.message.includes('Password should be at least')) {
          throw new Error('Password must be at least 6 characters');
        } else {
          throw new Error(error.message);
        }
      }

      if (!data.user) {
        throw new Error('Signup failed - no user returned');
      }

      console.log('✅ Signup successful:', data.user.email);

      // Note: User will need to verify email before logging in
      // (depending on Supabase email confirmation settings)

      return data;
      */
    },

    onSuccess: () => {
      console.log('🔄 Invalidating user cache after signup...');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      console.log('✅ Cache invalidated');
    },

    onError: (error: any) => {
      console.error('❌ Signup error:', error.message);
    },
  });
};

/**
 * Logout current user
 *
 * Features:
 * - Signs out from Supabase
 * - Clears ALL caches (user, profile, games, etc.)
 * - Redirects to login screen
 *
 * Usage Example:
 *   ```tsx
 *   const LogoutButton = () => {
 *     const logout = useLogout();
 *
 *     const handleLogout = async () => {
 *       Alert.alert(
 *         'Logout',
 *         'Are you sure?',
 *         [
 *           { text: 'Cancel', style: 'cancel' },
 *           {
 *             text: 'Logout',
 *             onPress: async () => {
 *               await logout.mutateAsync();
 *               router.replace('/login');
 *             }
 *           }
 *         ]
 *       );
 *     };
 *
 *     return (
 *       <Button onPress={handleLogout} loading={logout.isPending}>
 *         Logout
 *       </Button>
 *     );
 *   };
 *   ```
 *
 * @returns TanStack mutation hook
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      console.log('🔐 Logout (mock)');
      await new Promise(resolve => setTimeout(resolve, 500));

      setMockLoginState(false);
      console.log('✅ Logout successful (mock)');

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      console.log('🔐 Logout');

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ Logout error:', error);
        throw error;
      }

      console.log('✅ Logout successful');
      */
    },

    onSuccess: () => {
      console.log('🧹 Clearing all caches after logout...');

      // Clear ALL cached data
      // This ensures no user data persists after logout
      queryClient.clear();

      console.log('✅ All caches cleared');
    },

    onError: (error: any) => {
      console.error('❌ Logout error:', error);
    },
  });
};

/**
 * Update user profile
 *
 * Features:
 * - Updates profile data in database
 * - Auto-invalidates profile cache
 * - Partial updates (only update provided fields)
 *
 * Usage Example:
 *   ```tsx
 *   const EditProfileScreen = () => {
 *     const { data: user } = useUser();
 *     const updateProfile = useUpdateProfile();
 *
 *     const handleUpdate = async (formData) => {
 *       await updateProfile.mutateAsync({
 *         userId: user.id,
 *         updates: {
 *           bio: formData.bio,
 *           city: formData.city,
 *           primary_sports: formData.sports,
 *         }
 *       });
 *       Alert.alert('Success', 'Profile updated!');
 *     };
 *
 *     return <EditProfileForm onSubmit={handleUpdate} />;
 *   };
 *   ```
 *
 * @returns TanStack mutation hook
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: UpdateProfileInput }) => {
      // MOCK DATA MODE
      console.log('👤 Update profile (mock):', userId);
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log('✅ Profile updated (mock)');
      return { userId, ...updates };

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      console.log('👤 Update profile:', userId);

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Update profile error:', error);
        throw error;
      }

      console.log('✅ Profile updated');
      return data;
      */
    },

    onSuccess: (_, variables) => {
      // Invalidate profile cache for this user
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });
      console.log('✅ Profile cache invalidated');
    },
  });
};

/**
 * Complete onboarding (create/update profile with initial data)
 *
 * Features:
 * - Creates or updates profile with onboarding data
 * - Auto-invalidates profile cache
 * - Redirects to main app after completion
 *
 * Usage Example:
 *   ```tsx
 *   const OnboardingScreen = () => {
 *     const { data: user } = useUser();
 *     const completeOnboarding = useCompleteOnboarding();
 *
 *     const handleComplete = async (formData) => {
 *       await completeOnboarding.mutateAsync({
 *         userId: user.id,
 *         data: formData,
 *       });
 *       router.replace('/(tabs)');
 *     };
 *
 *     return <OnboardingForm onSubmit={handleComplete} />;
 *   };
 *   ```
 *
 * @returns TanStack mutation hook
 */
export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: CompleteOnboardingInput }) => {
      // MOCK DATA MODE
      console.log('🎓 Complete onboarding (mock):', userId);
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('✅ Onboarding complete (mock)');
      return { userId, ...data };

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      console.log('🎓 Complete onboarding:', userId);

      // Create or update profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          ...data,
          verified: false,
          profile_visibility: 'public',
          resume_public: true,
          discoverable: true,
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Onboarding error:', error);
        throw error;
      }

      console.log('✅ Onboarding complete');
      return profile;
      */
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });
      console.log('✅ Profile created/updated after onboarding');
    },
  });
};

/**
 * Request password reset email
 *
 * Usage Example:
 *   ```tsx
 *   const ForgotPasswordScreen = () => {
 *     const resetPassword = useRequestPasswordReset();
 *
 *     const handleReset = async (email) => {
 *       await resetPassword.mutateAsync(email);
 *       Alert.alert('Email Sent', 'Check your inbox for reset link');
 *     };
 *
 *     return <ForgotPasswordForm onSubmit={handleReset} />;
 *   };
 *   ```
 */
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      // MOCK DATA MODE
      console.log('🔐 Password reset requested (mock):', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Reset email sent (mock)');

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'realvictors://reset-password',
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        throw error;
      }

      console.log('✅ Reset email sent');
      */
    },
  });
};
