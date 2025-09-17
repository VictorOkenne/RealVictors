// Database type definitions for Supabase

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          display_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          user_id: string;
          bio: string | null;
          height_cm: number | null;
          weight_kg: number | null;
          birth_year: number | null;
          gender: 'male' | 'female' | 'non_binary' | 'prefer_not' | null;
          city: string | null;
          country: string | null;
          coordinates: unknown | null; // PostGIS point
          primary_sports: any; // jsonb
          skill_levels: any; // jsonb
          verified: boolean;
          profile_visibility: 'public' | 'private' | 'followers';
          resume_public: boolean;
          discoverable: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          bio?: string | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          birth_year?: number | null;
          gender?: 'male' | 'female' | 'non_binary' | 'prefer_not' | null;
          city?: string | null;
          country?: string | null;
          coordinates?: unknown | null;
          primary_sports?: any;
          skill_levels?: any;
          verified?: boolean;
          profile_visibility?: 'public' | 'private' | 'followers';
          resume_public?: boolean;
          discoverable?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          bio?: string | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          birth_year?: number | null;
          gender?: 'male' | 'female' | 'non_binary' | 'prefer_not' | null;
          city?: string | null;
          country?: string | null;
          coordinates?: unknown | null;
          primary_sports?: any;
          skill_levels?: any;
          verified?: boolean;
          profile_visibility?: 'public' | 'private' | 'followers';
          resume_public?: boolean;
          discoverable?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          sport: string;
          created_by: string;
          avatar_url: string | null;
          description: string | null;
          privacy: 'public' | 'private';
          join_policy: 'open' | 'approve' | 'invite_only';
          location: string | null;
          coordinates: unknown | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sport: string;
          created_by: string;
          avatar_url?: string | null;
          description?: string | null;
          privacy?: 'public' | 'private';
          join_policy?: 'open' | 'approve' | 'invite_only';
          location?: string | null;
          coordinates?: unknown | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sport?: string;
          created_by?: string;
          avatar_url?: string | null;
          description?: string | null;
          privacy?: 'public' | 'private';
          join_policy?: 'open' | 'approve' | 'invite_only';
          location?: string | null;
          coordinates?: unknown | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'coach' | 'player';
          jersey_number: number | null;
          position: string | null;
          joined_at: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'coach' | 'player';
          jersey_number?: number | null;
          position?: string | null;
          joined_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string;
          user_id?: string;
          role?: 'owner' | 'admin' | 'coach' | 'player';
          jersey_number?: number | null;
          position?: string | null;
          joined_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          title: string;
          sport: string;
          game_type: 'pickup' | 'exhibition' | 'league' | 'tournament';
          host_user_id: string | null;
          host_team_id: string | null;
          start_time: string;
          end_time: string | null;
          location_name: string;
          location_address: string | null;
          coordinates: unknown | null;
          capacity: number | null;
          skill_level: 'beginner' | 'intermediate' | 'competitive' | 'mixed' | null;
          gender: 'male' | 'female' | 'mixed' | null;
          age_min: number | null;
          age_max: number | null;
          price_cents: number;
          currency: string;
          visibility: 'public' | 'unlisted' | 'private';
          passcode: string | null;
          stats_tracking_enabled: boolean;
          referee_required: boolean;
          bet_pool_cents: number;
          status: 'open' | 'closed' | 'in_progress' | 'completed' | 'cancelled';
          description: string | null;
          media_id: string | null;
          game_metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          sport: string;
          game_type: 'pickup' | 'exhibition' | 'league' | 'tournament';
          host_user_id?: string | null;
          host_team_id?: string | null;
          start_time: string;
          end_time?: string | null;
          location_name: string;
          location_address?: string | null;
          coordinates?: unknown | null;
          capacity?: number | null;
          skill_level?: 'beginner' | 'intermediate' | 'competitive' | 'mixed' | null;
          gender?: 'male' | 'female' | 'mixed' | null;
          age_min?: number | null;
          age_max?: number | null;
          price_cents?: number;
          currency?: string;
          visibility?: 'public' | 'unlisted' | 'private';
          passcode?: string | null;
          stats_tracking_enabled?: boolean;
          referee_required?: boolean;
          bet_pool_cents?: number;
          status?: 'open' | 'closed' | 'in_progress' | 'completed' | 'cancelled';
          description?: string | null;
          media_id?: string | null;
          game_metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          sport?: string;
          game_type?: 'pickup' | 'exhibition' | 'league' | 'tournament';
          host_user_id?: string | null;
          host_team_id?: string | null;
          start_time?: string;
          end_time?: string | null;
          location_name?: string;
          location_address?: string | null;
          coordinates?: unknown | null;
          capacity?: number | null;
          skill_level?: 'beginner' | 'intermediate' | 'competitive' | 'mixed' | null;
          gender?: 'male' | 'female' | 'mixed' | null;
          age_min?: number | null;
          age_max?: number | null;
          price_cents?: number;
          currency?: string;
          visibility?: 'public' | 'unlisted' | 'private';
          passcode?: string | null;
          stats_tracking_enabled?: boolean;
          referee_required?: boolean;
          bet_pool_cents?: number;
          status?: 'open' | 'closed' | 'in_progress' | 'completed' | 'cancelled';
          description?: string | null;
          media_id?: string | null;
          game_metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      game_rsvps: {
        Row: {
          id: string;
          game_id: string;
          user_id: string | null;
          team_id: string | null;
          status: 'attending' | 'declined' | 'waitlist' | 'confirmed';
          paid_cents: number;
          payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          user_id?: string | null;
          team_id?: string | null;
          status?: 'attending' | 'declined' | 'waitlist' | 'confirmed';
          paid_cents?: number;
          payment_intent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          user_id?: string | null;
          team_id?: string | null;
          status?: 'attending' | 'declined' | 'waitlist' | 'confirmed';
          paid_cents?: number;
          payment_intent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          owner_id: string;
          url_main: string;
          thumbnail_url: string | null;
          variants: any;
          media_type: 'image' | 'video';
          duration_seconds: number | null;
          file_size_bytes: number | null;
          mime_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          url_main: string;
          thumbnail_url?: string | null;
          variants?: any;
          media_type: 'image' | 'video';
          duration_seconds?: number | null;
          file_size_bytes?: number | null;
          mime_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          url_main?: string;
          thumbnail_url?: string | null;
          variants?: any;
          media_type?: 'image' | 'video';
          duration_seconds?: number | null;
          file_size_bytes?: number | null;
          mime_type?: string | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          media_id: string;
          caption: string | null;
          sport: string | null;
          tags: any;
          game_id: string | null;
          visibility: 'public' | 'followers' | 'team';
          likes_count: number;
          comments_count: number;
          shares_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          media_id: string;
          caption?: string | null;
          sport?: string | null;
          tags?: any;
          game_id?: string | null;
          visibility?: 'public' | 'followers' | 'team';
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          media_id?: string;
          caption?: string | null;
          sport?: string | null;
          tags?: any;
          game_id?: string | null;
          visibility?: 'public' | 'followers' | 'team';
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          parent_id?: string | null;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      player_stats: {
        Row: {
          id: string;
          user_id: string;
          sport: string;
          season: string | null;
          team_id: string | null;
          games_played: number;
          wins: number;
          losses: number;
          draws: number;
          minutes_played: number;
          stats: any;
          rating: number;
          rank_local: number | null;
          rank_global: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          sport: string;
          season?: string | null;
          team_id?: string | null;
          games_played?: number;
          wins?: number;
          losses?: number;
          draws?: number;
          minutes_played?: number;
          stats?: any;
          rating?: number;
          rank_local?: number | null;
          rank_global?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          sport?: string;
          season?: string | null;
          team_id?: string | null;
          games_played?: number;
          wins?: number;
          losses?: number;
          draws?: number;
          minutes_played?: number;
          stats?: any;
          rating?: number;
          rank_local?: number | null;
          rank_global?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      game_events: {
        Row: {
          id: string;
          game_id: string;
          event_time: string;
          game_minute: number | null;
          event_type: string;
          actor_user_id: string;
          target_user_id: string | null;
          details: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          event_time?: string;
          game_minute?: number | null;
          event_type: string;
          actor_user_id: string;
          target_user_id?: string | null;
          details?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          event_time?: string;
          game_minute?: number | null;
          event_type?: string;
          actor_user_id?: string;
          target_user_id?: string | null;
          details?: any;
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          title: string | null;
          is_group: boolean;
          created_by: string;
          avatar_url: string | null;
          last_message_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title?: string | null;
          is_group?: boolean;
          created_by: string;
          avatar_url?: string | null;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string | null;
          is_group?: boolean;
          created_by?: string;
          avatar_url?: string | null;
          last_message_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversation_members: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          role: 'admin' | 'member';
          joined_at: string;
          muted: boolean;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          role?: 'admin' | 'member';
          joined_at?: string;
          muted?: boolean;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          role?: 'admin' | 'member';
          joined_at?: string;
          muted?: boolean;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string | null;
          media_id: string | null;
          reply_to_id: string | null;
          message_type: 'text' | 'media' | 'game_link' | 'location';
          metadata: any;
          edited: boolean;
          deleted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content?: string | null;
          media_id?: string | null;
          reply_to_id?: string | null;
          message_type?: 'text' | 'media' | 'game_link' | 'location';
          metadata?: any;
          edited?: boolean;
          deleted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string | null;
          media_id?: string | null;
          reply_to_id?: string | null;
          message_type?: 'text' | 'media' | 'game_link' | 'location';
          metadata?: any;
          edited?: boolean;
          deleted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string;
          data: any;
          read: boolean;
          push_sent: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          body: string;
          data?: any;
          read?: boolean;
          push_sent?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          body?: string;
          data?: any;
          read?: boolean;
          push_sent?: boolean;
          created_at?: string;
        };
      };
      leagues: {
        Row: {
          id: string;
          name: string;
          sport: string;
          format: 'round_robin' | 'single_elim' | 'double_elim' | 'swiss';
          created_by: string;
          description: string | null;
          max_teams: number | null;
          entry_fee_cents: number;
          prize_pool_cents: number;
          start_date: string | null;
          end_date: string | null;
          status: 'open' | 'in_progress' | 'completed' | 'cancelled';
          rules: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sport: string;
          format: 'round_robin' | 'single_elim' | 'double_elim' | 'swiss';
          created_by: string;
          description?: string | null;
          max_teams?: number | null;
          entry_fee_cents?: number;
          prize_pool_cents?: number;
          start_date?: string | null;
          end_date?: string | null;
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
          rules?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sport?: string;
          format?: 'round_robin' | 'single_elim' | 'double_elim' | 'swiss';
          created_by?: string;
          description?: string | null;
          max_teams?: number | null;
          entry_fee_cents?: number;
          prize_pool_cents?: number;
          start_date?: string | null;
          end_date?: string | null;
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
          rules?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      league_teams: {
        Row: {
          id: string;
          league_id: string;
          team_id: string;
          registered_at: string;
          paid: boolean;
        };
        Insert: {
          id?: string;
          league_id: string;
          team_id: string;
          registered_at?: string;
          paid?: boolean;
        };
        Update: {
          id?: string;
          league_id?: string;
          team_id?: string;
          registered_at?: string;
          paid?: boolean;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'game_fee' | 'tournament_entry' | 'payout' | 'refund';
          amount_cents: number;
          currency: string;
          status: 'pending' | 'completed' | 'failed' | 'cancelled';
          stripe_payment_intent_id: string | null;
          stripe_payout_id: string | null;
          related_game_id: string | null;
          related_league_id: string | null;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'game_fee' | 'tournament_entry' | 'payout' | 'refund';
          amount_cents: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          stripe_payment_intent_id?: string | null;
          stripe_payout_id?: string | null;
          related_game_id?: string | null;
          related_league_id?: string | null;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'game_fee' | 'tournament_entry' | 'payout' | 'refund';
          amount_cents?: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'cancelled';
          stripe_payment_intent_id?: string | null;
          stripe_payout_id?: string | null;
          related_game_id?: string | null;
          related_league_id?: string | null;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
      team_follows: {
        Row: {
          id: string;
          user_id: string;
          team_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          team_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          team_id?: string;
          created_at?: string;
        };
      };
      referees: {
        Row: {
          id: string;
          user_id: string;
          verified: boolean;
          hourly_rate_cents: number | null;
          sports: any;
          availability: any;
          verification_docs: any;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          verified?: boolean;
          hourly_rate_cents?: number | null;
          sports?: any;
          availability?: any;
          verification_docs?: any;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          verified?: boolean;
          hourly_rate_cents?: number | null;
          sports?: any;
          availability?: any;
          verification_docs?: any;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      game_referees: {
        Row: {
          id: string;
          game_id: string;
          referee_id: string;
          assigned_by: string;
          status: 'assigned' | 'accepted' | 'declined' | 'completed';
          assigned_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          referee_id: string;
          assigned_by: string;
          status?: 'assigned' | 'accepted' | 'declined' | 'completed';
          assigned_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          referee_id?: string;
          assigned_by?: string;
          status?: 'assigned' | 'accepted' | 'declined' | 'completed';
          assigned_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      games_within_radius: {
        Args: {
          lat: number;
          lng: number;
          radius_km: number;
        };
        Returns: Array<Database['public']['Tables']['games']['Row']>;
      };
      calculate_user_rating: {
        Args: {
          user_id: string;
          sport: string;
        };
        Returns: number;
      };
      get_leaderboard: {
        Args: {
          sport: string;
          metric: string;
          scope_type: string;
          scope_value?: string;
          limit_count?: number;
        };
        Returns: Array<{
          user_id: string;
          display_name: string;
          avatar_url: string;
          value: number;
          rank: number;
        }>;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
