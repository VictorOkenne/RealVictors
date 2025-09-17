-- Row Level Security (RLS) Policies for RealVictors
-- This file sets up comprehensive security policies for all tables

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.league_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_referees ENABLE ROW LEVEL SECURITY;

-- USERS table policies
CREATE POLICY "Users can view all public profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- PROFILES table policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (
    profile_visibility = 'public' OR 
    user_id = auth.uid() OR
    (profile_visibility = 'followers' AND EXISTS (
      SELECT 1 FROM public.user_follows 
      WHERE following_id = user_id AND follower_id = auth.uid()
    ))
  );

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- TEAMS table policies
CREATE POLICY "Public teams are viewable by everyone" ON public.teams
  FOR SELECT USING (privacy = 'public' OR created_by = auth.uid());

CREATE POLICY "Users can create teams" ON public.teams
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team owners and admins can update teams" ON public.teams
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Team owners can delete teams" ON public.teams
  FOR DELETE USING (created_by = auth.uid());

-- TEAM_MEMBERS table policies
CREATE POLICY "Team members are viewable by team members and public team viewers" ON public.team_members
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_members.team_id AND user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND privacy = 'public')
  );

CREATE POLICY "Team owners and admins can manage members" ON public.team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid() AND tm.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can leave teams" ON public.team_members
  FOR DELETE USING (user_id = auth.uid());

-- GAMES table policies
CREATE POLICY "Public and unlisted games are viewable by everyone" ON public.games
  FOR SELECT USING (
    visibility IN ('public', 'unlisted') OR
    host_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    ) OR
    EXISTS (
      SELECT 1 FROM public.game_rsvps 
      WHERE game_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create games" ON public.games
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    (host_user_id = auth.uid() OR 
     (host_team_id IS NOT NULL AND EXISTS (
       SELECT 1 FROM public.team_members 
       WHERE team_id = host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
     )))
  );

CREATE POLICY "Game hosts can update their games" ON public.games
  FOR UPDATE USING (
    host_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Game hosts can delete their games" ON public.games
  FOR DELETE USING (
    host_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- GAME_RSVPS table policies
CREATE POLICY "Users can view RSVPs for games they can see" ON public.game_rsvps
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.games 
      WHERE id = game_id AND (
        visibility IN ('public', 'unlisted') OR
        host_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members 
          WHERE team_id = host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
      )
    )
  );

CREATE POLICY "Users can create their own RSVPs" ON public.game_rsvps
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    (user_id = auth.uid() OR 
     (team_id IS NOT NULL AND EXISTS (
       SELECT 1 FROM public.team_members 
       WHERE team_id = game_rsvps.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
     )))
  );

CREATE POLICY "Users can update their own RSVPs" ON public.game_rsvps
  FOR UPDATE USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = game_rsvps.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can delete their own RSVPs" ON public.game_rsvps
  FOR DELETE USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = game_rsvps.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- MEDIA table policies
CREATE POLICY "Media is viewable by everyone" ON public.media
  FOR SELECT USING (true);

CREATE POLICY "Users can upload their own media" ON public.media
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own media" ON public.media
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own media" ON public.media
  FOR DELETE USING (auth.uid() = owner_id);

-- POSTS table policies
CREATE POLICY "Public posts are viewable by everyone" ON public.posts
  FOR SELECT USING (
    visibility = 'public' OR
    user_id = auth.uid() OR
    (visibility = 'followers' AND EXISTS (
      SELECT 1 FROM public.user_follows 
      WHERE following_id = user_id AND follower_id = auth.uid()
    )) OR
    (visibility = 'team' AND EXISTS (
      SELECT 1 FROM public.team_members tm1
      JOIN public.team_members tm2 ON tm1.team_id = tm2.team_id
      WHERE tm1.user_id = posts.user_id AND tm2.user_id = auth.uid()
    ))
  );

CREATE POLICY "Users can create their own posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- POST_LIKES table policies
CREATE POLICY "Post likes are viewable by everyone" ON public.post_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like posts" ON public.post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes" ON public.post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- POST_COMMENTS table policies
CREATE POLICY "Post comments are viewable by everyone" ON public.post_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON public.post_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.post_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.post_comments
  FOR DELETE USING (auth.uid() = user_id);

-- PLAYER_STATS table policies
CREATE POLICY "Player stats are viewable based on profile privacy" ON public.player_stats
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = player_stats.user_id AND 
      (profile_visibility = 'public' OR 
       (profile_visibility = 'followers' AND EXISTS (
         SELECT 1 FROM public.user_follows 
         WHERE following_id = player_stats.user_id AND follower_id = auth.uid()
       )))
    )
  );

CREATE POLICY "Users can insert their own stats" ON public.player_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.player_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- GAME_EVENTS table policies
CREATE POLICY "Game events are viewable by game participants and hosts" ON public.game_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.games g
      WHERE g.id = game_id AND (
        g.host_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members 
          WHERE team_id = g.host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        ) OR
        EXISTS (
          SELECT 1 FROM public.game_rsvps 
          WHERE game_id = g.id AND user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Game hosts and referees can create events" ON public.game_events
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.games g
      WHERE g.id = game_id AND (
        g.host_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members 
          WHERE team_id = g.host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        ) OR
        EXISTS (
          SELECT 1 FROM public.game_referees gr
          JOIN public.referees r ON gr.referee_id = r.id
          WHERE gr.game_id = g.id AND r.user_id = auth.uid()
        )
      )
    )
  );

-- CONVERSATIONS table policies
CREATE POLICY "Users can view conversations they're part of" ON public.conversations
  FOR SELECT USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.conversation_members 
      WHERE conversation_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Conversation creators and admins can update conversations" ON public.conversations
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.conversation_members 
      WHERE conversation_id = id AND user_id = auth.uid() AND role = 'admin'
    )
  );

-- CONVERSATION_MEMBERS table policies
CREATE POLICY "Users can view members of conversations they're part of" ON public.conversation_members
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.conversation_members 
      WHERE conversation_id = conversation_members.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Conversation admins can manage members" ON public.conversation_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = conversation_id AND created_by = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.conversation_members cm
      WHERE cm.conversation_id = conversation_members.conversation_id AND cm.user_id = auth.uid() AND cm.role = 'admin'
    )
  );

-- MESSAGES table policies
CREATE POLICY "Users can view messages in conversations they're part of" ON public.messages
  FOR SELECT USING (
    sender_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.conversation_members 
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Conversation members can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversation_members 
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own messages" ON public.messages
  FOR DELETE USING (auth.uid() = sender_id);

-- NOTIFICATIONS table policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true); -- This will be restricted by app logic

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- LEAGUES table policies
CREATE POLICY "Leagues are viewable by everyone" ON public.leagues
  FOR SELECT USING (true);

CREATE POLICY "Users can create leagues" ON public.leagues
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "League creators can update their leagues" ON public.leagues
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "League creators can delete their leagues" ON public.leagues
  FOR DELETE USING (auth.uid() = created_by);

-- LEAGUE_TEAMS table policies
CREATE POLICY "League team registrations are viewable by everyone" ON public.league_teams
  FOR SELECT USING (true);

CREATE POLICY "Team admins can register their teams" ON public.league_teams
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = league_teams.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Team admins can update their registrations" ON public.league_teams
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = league_teams.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Team admins can withdraw their teams" ON public.league_teams
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = league_teams.team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- TRANSACTIONS table policies
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create transactions" ON public.transactions
  FOR INSERT WITH CHECK (true); -- This will be restricted by app logic

CREATE POLICY "Users can view their transaction updates" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

-- USER_FOLLOWS table policies
CREATE POLICY "User follows are viewable by everyone" ON public.user_follows
  FOR SELECT USING (true);

CREATE POLICY "Users can follow others" ON public.user_follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others" ON public.user_follows
  FOR DELETE USING (auth.uid() = follower_id);

-- TEAM_FOLLOWS table policies
CREATE POLICY "Team follows are viewable by everyone" ON public.team_follows
  FOR SELECT USING (true);

CREATE POLICY "Users can follow teams" ON public.team_follows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow teams" ON public.team_follows
  FOR DELETE USING (auth.uid() = user_id);

-- REFEREES table policies
CREATE POLICY "Verified referees are viewable by everyone" ON public.referees
  FOR SELECT USING (verified = true);

CREATE POLICY "Users can view their own referee profile" ON public.referees
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their referee profile" ON public.referees
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their referee profile" ON public.referees
  FOR UPDATE USING (auth.uid() = user_id);

-- GAME_REFEREES table policies
CREATE POLICY "Game referee assignments are viewable by relevant parties" ON public.game_referees
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.referees r
      WHERE r.id = referee_id AND r.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.games g
      WHERE g.id = game_id AND (
        g.host_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members 
          WHERE team_id = g.host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
      )
    )
  );

CREATE POLICY "Game hosts can assign referees" ON public.game_referees
  FOR INSERT WITH CHECK (
    auth.uid() = assigned_by AND
    EXISTS (
      SELECT 1 FROM public.games g
      WHERE g.id = game_id AND (
        g.host_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members 
          WHERE team_id = g.host_team_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
      )
    )
  );

CREATE POLICY "Referees can update their assignment status" ON public.game_referees
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.referees r
      WHERE r.id = referee_id AND r.user_id = auth.uid()
    ) OR
    auth.uid() = assigned_by
  );
