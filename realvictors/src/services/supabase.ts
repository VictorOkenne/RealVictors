/**
 * Supabase Service
 * 
 * Centralized service for all Supabase operations including authentication,
 * database queries, and real-time subscriptions.
 * 
 * Features:
 * - Authentication (sign up, sign in, sign out, OAuth)
 * - Database operations (CRUD for all entities)
 * - Real-time subscriptions
 * - File uploads and media management
 * - Search functionality
 * - Notification management
 * 
 * Configuration:
 * - Uses AsyncStorage for session persistence
 * - Auto-refreshes tokens
 * - Graceful fallback when environment variables are missing
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/database';

// Get Supabase configuration from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Create a placeholder client if environment variables are missing
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not configured. Authentication will not work until you set up your .env.local file.');
  // Create a mock client that won't throw errors during development
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
  };
} else {
  // Create real Supabase client with AsyncStorage for session persistence
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage, // Use AsyncStorage for session persistence
      autoRefreshToken: true, // Automatically refresh expired tokens
      persistSession: false, // Persist session across app restarts
      detectSessionInUrl: false, // Don't detect session in URL (not needed for mobile)
    },
  });
}

export { supabase };

/**
 * Authentication Service
 * 
 * Handles all authentication-related operations including
 * email/password auth and OAuth providers.
 */
export const authService = {
  /**
   * Sign up new user with email and password
   * @param email User's email address
   * @param password User's password
   * @param displayName User's display name
   * @returns Promise with user data or error
   */
  async signUp(email: string, password: string, displayName: string) {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in existing user with email and password
   * @param email User's email address
   * @param password User's password
   * @returns Promise with user data or error
   */
  async signIn(email: string, password: string) {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { data: null, error: { message: 'Supabase not configured' } };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in with Google OAuth
   * @returns Promise with OAuth data or error
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'realvictors://auth',
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign in with Apple OAuth
   * @returns Promise with OAuth data or error
   */
  async signInWithApple() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'realvictors://auth',
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   * Clears the current session
   */
  async signOut() {
    console.log('🔐 authService.signOut() called');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('❌ authService.signOut() error:', error);
      throw error;
    }
    console.log('✅ authService.signOut() completed successfully');
  },

  /**
   * Clear local session without server call
   * Useful for clearing cached session data
   */
  async clearSession() {
    console.log('🧹 authService.clearSession() called');
    try {
      // Force clear the session locally
      await supabase.auth.signOut({ scope: 'local' });
      console.log('✅ authService.clearSession() completed');
    } catch (error) {
      console.log('⚠️ authService.clearSession() error (non-critical):', error);
      // Don't throw error for clearSession as it's not critical
    }
  },

  /**
   * Send password reset email
   * @param email User's email address
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'realvictors://reset-password',
    });

    if (error) throw error;
  },

  /**
   * Get current session
   * @returns Promise with current session or null
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get current authenticated user
   * @returns Promise with user data or null
   */
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  /**
   * Update user metadata
   * @param updates User data to update
   * @returns Promise with updated user data
   */
  async updateUser(updates: any) {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (error) throw error;
    return data;
  },
};

/**
 * Database Service
 * 
 * Handles all database operations including CRUD operations
 * for users, profiles, games, teams, posts, and more.
 * 
 * Features:
 * - User and profile management
 * - Game CRUD operations
 * - Team management
 * - Post and media handling
 * - Search functionality
 * - Statistics tracking
 * - Notification management
 */
export const dbService = {
  // Users and profiles
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: userId, ...updates })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserWithProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        profiles (*)
      `)
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Games
  async getGames(filters?: any) {
    let query = supabase
      .from('games')
      .select(`
        *,
        host_user:users!host_user_id(*),
        host_team:teams!host_team_id(*),
        media:media(*)
      `)
      .order('start_time', { ascending: true });

    // Apply filters
    if (filters?.sport) {
      query = query.in('sport', filters.sport);
    }
    if (filters?.game_type) {
      query = query.in('game_type', filters.game_type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.location) {
      // Add location-based filtering using PostGIS
      const { center, radius } = filters.location;
      query = query.rpc('games_within_radius', {
        lat: center[0],
        lng: center[1],
        radius_km: radius,
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getGame(gameId: string) {
    const { data, error } = await supabase
      .from('games')
      .select(`
        *,
        host_user:users!host_user_id(*),
        host_team:teams!host_team_id(*),
        media:media(*),
        rsvps:game_rsvps(
          *,
          user:users(*),
          team:teams(*)
        )
      `)
      .eq('id', gameId)
      .single();

    if (error) throw error;
    return data;
  },

  async createGame(gameData: any) {
    const { data, error } = await supabase
      .from('games')
      .insert(gameData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateGame(gameId: string, updates: any) {
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      .eq('id', gameId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteGame(gameId: string) {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', gameId);

    if (error) throw error;
  },

  // Game RSVPs
  async createRSVP(rsvpData: any) {
    const { data, error } = await supabase
      .from('game_rsvps')
      .insert(rsvpData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateRSVP(rsvpId: string, updates: any) {
    const { data, error } = await supabase
      .from('game_rsvps')
      .update(updates)
      .eq('id', rsvpId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserRSVP(gameId: string, userId: string) {
    const { data, error } = await supabase
      .from('game_rsvps')
      .select('*')
      .eq('game_id', gameId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Teams
  async getTeams(filters?: any) {
    let query = supabase
      .from('teams')
      .select(`
        *,
        created_by_user:users!created_by(*),
        members:team_members(
          *,
          user:users(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (filters?.sport) {
      query = query.in('sport', filters.sport);
    }
    if (filters?.privacy) {
      query = query.eq('privacy', filters.privacy);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getTeam(teamId: string) {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        created_by_user:users!created_by(*),
        members:team_members(
          *,
          user:users(*)
        )
      `)
      .eq('id', teamId)
      .single();

    if (error) throw error;
    return data;
  },

  async createTeam(teamData: any) {
    const { data, error } = await supabase
      .from('teams')
      .insert(teamData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTeam(teamId: string, updates: any) {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', teamId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTeam(teamId: string) {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', teamId);

    if (error) throw error;
  },

  // Team members
  async addTeamMember(memberData: any) {
    const { data, error } = await supabase
      .from('team_members')
      .insert(memberData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTeamMember(memberId: string, updates: any) {
    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeTeamMember(memberId: string) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;
  },

  // Posts
  async getPosts(filters?: any) {
    let query = supabase
      .from('posts')
      .select(`
        *,
        user:users(*),
        media:media(*),
        game:games(*)
      `)
      .order('created_at', { ascending: false });

    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id);
    }
    if (filters?.sport) {
      query = query.in('sport', filters.sport);
    }
    if (filters?.visibility) {
      query = query.eq('visibility', filters.visibility);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getPost(postId: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users(*),
        media:media(*),
        game:games(*),
        comments:post_comments(
          *,
          user:users(*)
        )
      `)
      .eq('id', postId)
      .single();

    if (error) throw error;
    return data;
  },

  async createPost(postData: any) {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(postId: string, updates: any) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(postId: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
  },

  // Post interactions
  async likePost(postId: string, userId: string) {
    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });

    if (error) throw error;
  },

  async unlikePost(postId: string, userId: string) {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  async addComment(commentData: any) {
    const { data, error } = await supabase
      .from('post_comments')
      .insert(commentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Media
  async uploadMedia(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    // Create media record
    const mediaData = {
      owner_id: userId,
      url_main: publicUrl,
      media_type: file.type.startsWith('image/') ? 'image' : 'video',
      file_size_bytes: file.size,
      mime_type: file.type,
    };

    const { data: media, error: mediaError } = await supabase
      .from('media')
      .insert(mediaData)
      .select()
      .single();

    if (mediaError) throw mediaError;
    return media;
  },

  // Statistics
  async getPlayerStats(userId: string, sport?: string, season?: string) {
    let query = supabase
      .from('player_stats')
      .select('*')
      .eq('user_id', userId);

    if (sport) query = query.eq('sport', sport);
    if (season) query = query.eq('season', season);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updatePlayerStats(userId: string, sport: string, season: string, stats: any) {
    const { data, error } = await supabase
      .from('player_stats')
      .upsert({
        user_id: userId,
        sport,
        season,
        ...stats,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Search
  async searchUsers(query: string, filters?: any) {
    let dbQuery = supabase
      .from('users')
      .select(`
        *,
        profiles (*)
      `)
      .ilike('display_name', `%${query}%`)
      .limit(20);

    const { data, error } = await dbQuery;
    if (error) throw error;
    return data;
  },

  async searchTeams(query: string, filters?: any) {
    let dbQuery = supabase
      .from('teams')
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(20);

    if (filters?.sport) {
      dbQuery = dbQuery.in('sport', filters.sport);
    }

    const { data, error } = await dbQuery;
    if (error) throw error;
    return data;
  },

  async searchGames(query: string, filters?: any) {
    let dbQuery = supabase
      .from('games')
      .select(`
        *,
        host_user:users!host_user_id(*),
        host_team:teams!host_team_id(*)
      `)
      .ilike('title', `%${query}%`)
      .limit(20);

    if (filters?.sport) {
      dbQuery = dbQuery.in('sport', filters.sport);
    }
    if (filters?.game_type) {
      dbQuery = dbQuery.in('game_type', filters.game_type);
    }

    const { data, error } = await dbQuery;
    if (error) throw error;
    return data;
  },

  // Notifications
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data;
  },

  async createNotification(notificationData: any) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markNotificationAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  async markAllNotificationsAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
  },
};

// Real-time helpers
export const realtimeService = {
  // Subscribe to game updates
  subscribeToGame(gameId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`game:${gameId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameId}` },
        callback
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'game_rsvps', filter: `game_id=eq.${gameId}` },
        callback
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'game_events', filter: `game_id=eq.${gameId}` },
        callback
      )
      .subscribe();
  },

  // Subscribe to conversation messages
  subscribeToConversation(conversationId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        callback
      )
      .subscribe();
  },

  // Subscribe to user notifications
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe();
  },

  // Subscribe to team updates
  subscribeToTeam(teamId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`team:${teamId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'teams', filter: `id=eq.${teamId}` },
        callback
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'team_members', filter: `team_id=eq.${teamId}` },
        callback
      )
      .subscribe();
  },
};
