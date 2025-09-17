import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with AsyncStorage for session persistence
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Auth helpers
export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string) {
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

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign in with Google
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

  // Sign in with Apple
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

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'realvictors://reset-password',
    });

    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Update user
  async updateUser(updates: any) {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (error) throw error;
    return data;
  },
};

// Database helpers
export const dbService = {
  // Users and profiles
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
