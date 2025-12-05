/**
 * Games API - Query Hooks (Data Fetching)
 *
 * This file contains all TanStack Query hooks for READING game data.
 * Mutations (creating, updating, deleting) are in mutations.ts.
 *
 * Current Status: USING MOCK DATA
 * - All hooks return mock data to simulate real API calls
 * - Includes simulated network delays for realistic UX during development
 * - When Supabase is ready, just uncomment the real queries (marked with TODO)
 *
 * Architecture Flow:
 * 1. Component calls useGames() or useGame(id)
 * 2. TanStack Query checks cache first
 * 3. If not cached or stale, calls queryFn
 * 4. queryFn returns mock data (will be Supabase later)
 * 5. TanStack Query caches result
 * 6. Component re-renders with data
 *
 * Key Concepts:
 * - queryKey: Unique identifier for caching
 *   - ['games'] = all games
 *   - ['games', filters] = filtered games
 *   - ['game', id] = single game
 *   - Different keys = different cache entries
 *
 * - queryFn: Function that fetches data
 *   - Currently returns mock data
 *   - Will call Supabase when ready
 *
 * - staleTime: How long data stays "fresh"
 *   - Fresh data = don't refetch
 *   - Stale data = refetch in background
 *
 * @see https://tanstack.com/query/latest/docs/react/guides/queries
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';
import { Game, GameFilters } from '../../types';

// ============================================================================
// MOCK DATA (Temporary - remove when Supabase is ready)
// ============================================================================

/**
 * Mock games data for development
 *
 * TODO: Remove this when Supabase database is populated
 * This simulates what will come from the database
 */
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Pickup Basketball',
    sport: 'basketball',
    game_type: 'pickup',
    status: 'open',
    start_time: '2025-12-01T18:00:00Z',
    end_time: '2025-12-01T20:00:00Z',
    location_name: 'Venice Beach Courts',
    location_address: 'Venice Beach, CA',
    coordinates: { lat: 33.9850, lng: -118.4695 },
    max_participants: 10,
    current_participants: 6,
    host_user_id: 'user1',
    host_team_id: null,
    entry_fee_cents: 0,
    description: 'Friendly pickup game, all skill levels welcome!',
    rules: 'Full court, 5v5',
    privacy: 'public',
    game_metadata: {},
    created_at: '2025-11-20T10:00:00Z',
    updated_at: '2025-11-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Soccer Tournament Finals',
    sport: 'soccer',
    game_type: 'tournament',
    status: 'open',
    start_time: '2025-12-05T14:00:00Z',
    end_time: '2025-12-05T16:00:00Z',
    location_name: 'Rose Bowl Stadium',
    location_address: 'Pasadena, CA',
    coordinates: { lat: 34.1611, lng: -118.1676 },
    max_participants: 22,
    current_participants: 18,
    host_user_id: null,
    host_team_id: 'team1',
    entry_fee_cents: 2000, // $20.00
    description: 'Championship match - bring your A game!',
    rules: '90 minutes, FIFA rules',
    privacy: 'public',
    game_metadata: { tournament_id: 'tournament1' },
    created_at: '2025-11-15T10:00:00Z',
    updated_at: '2025-11-15T10:00:00Z',
  },
  // Add more mock games as needed
];

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Fetch all games with optional filters
 *
 * Features:
 * - Auto-caching: Returns cached data instantly on subsequent calls
 * - Auto-refetching: Updates data in background when stale
 * - Loading/error states: Built-in, no manual useState needed
 * - Filter support: Sport, status, game type, location
 *
 * Usage Example:
 *   ```tsx
 *   const MyComponent = () => {
 *     const { data: games, isLoading, error } = useGames({
 *       sport: 'soccer',
 *       status: 'open'
 *     });
 *
 *     if (isLoading) return <LoadingSpinner />;
 *     if (error) return <ErrorMessage error={error} />;
 *
 *     return <GameList games={games} />;
 *   };
 *   ```
 *
 * Query Key Strategy:
 * - ['games'] = all games
 * - ['games', { sport: 'soccer' }] = soccer games only
 * - Different filters = different cache entries = no conflicts
 *
 * @param filters - Optional filters (sport, status, game_type, location)
 * @returns TanStack Query result with games array
 */
export const useGames = (filters?: GameFilters) => {
  return useQuery({
    // Query key: Include filters so different filter combinations
    // are cached separately
    queryKey: ['games', filters],

    // Query function: Fetches the data
    queryFn: async () => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      // Simulate network delay (300-800ms) for realistic UX
      const delay = 300 + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Start with all mock games
      let results = [...mockGames];

      // Apply filters (simulates database WHERE clauses)
      if (filters?.sport && filters.sport.length > 0) {
        results = results.filter(game => filters.sport!.includes(game.sport));
      }

      if (filters?.game_type && filters.game_type.length > 0) {
        results = results.filter(game => filters.game_type!.includes(game.game_type));
      }

      if (filters?.status) {
        results = results.filter(game => game.status === filters.status);
      }

      // Location filter (within radius)
      if (filters?.location) {
        const { center, radius } = filters.location;
        results = results.filter(game => {
          if (!game.coordinates) return false;

          // Simple distance calculation (Haversine formula)
          const R = 6371; // Earth's radius in km
          const dLat = (game.coordinates.lat - center[0]) * Math.PI / 180;
          const dLng = (game.coordinates.lng - center[1]) * Math.PI / 180;
          const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(center[0] * Math.PI / 180) * Math.cos(game.coordinates.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c;

          return distance <= radius;
        });
      }

      console.log(`📊 Fetched ${results.length} games (mock data)`);
      return results;

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      // Build Supabase query
      let query = supabase
        .from('games')
        .select(`
          *,
          host_user:users!host_user_id(
            id,
            display_name,
            avatar_url
          ),
          host_team:teams!host_team_id(
            id,
            name,
            logo_url
          )
        `)
        .order('start_time', { ascending: true });

      // Apply filters
      if (filters?.sport && filters.sport.length > 0) {
        query = query.in('sport', filters.sport);
      }

      if (filters?.game_type && filters.game_type.length > 0) {
        query = query.in('game_type', filters.game_type);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      // Location filter using PostGIS
      if (filters?.location) {
        const { center, radius } = filters.location;
        query = query.rpc('games_within_radius', {
          lat: center[0],
          lng: center[1],
          radius_km: radius,
        });
      }

      // Execute query
      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching games:', error);
        throw error;
      }

      console.log(`📊 Fetched ${data.length} games from Supabase`);
      return data;
      */
    },

    // Data stays fresh for 5 minutes
    // Won't refetch if data is less than 5 min old
    staleTime: 5 * 60 * 1000,

    // Keep in cache for 10 minutes after last use
    cacheTime: 10 * 60 * 1000,

    // Enable this query (can be disabled conditionally)
    enabled: true,
  });
};

/**
 * Fetch a single game by ID
 *
 * Features:
 * - Loads game with full details (host, participants, RSVPs)
 * - Auto-caches: Subsequent views of same game load instantly
 * - Auto-updates: If game is updated, cache invalidates
 *
 * Usage Example:
 *   ```tsx
 *   const GameDetails = ({ gameId }) => {
 *     const { data: game, isLoading } = useGame(gameId);
 *
 *     if (isLoading) return <LoadingSkeleton />;
 *     if (!game) return <NotFound />;
 *
 *     return <GameCard game={game} />;
 *   };
 *   ```
 *
 * @param gameId - The game ID to fetch
 * @returns TanStack Query result with single game
 */
export const useGame = (gameId: string) => {
  return useQuery({
    // Query key: ['game', id] for single game
    // This is different from ['games'] so they cache separately
    queryKey: ['game', gameId],

    queryFn: async () => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));

      // Find game in mock data
      const game = mockGames.find(g => g.id === gameId);

      if (!game) {
        throw new Error('Game not found');
      }

      console.log(`📊 Fetched game ${gameId} (mock data)`);
      return game;

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          host_user:users!host_user_id(*),
          host_team:teams!host_team_id(*),
          rsvps:game_rsvps(
            *,
            user:users(*),
            team:teams(*)
          ),
          events:game_events(*)
        `)
        .eq('id', gameId)
        .single();

      if (error) {
        console.error(`❌ Error fetching game ${gameId}:`, error);
        throw error;
      }

      if (!data) {
        throw new Error('Game not found');
      }

      console.log(`📊 Fetched game ${gameId} from Supabase`);
      return data;
      */
    },

    // Data stays fresh for 3 minutes (less than games list)
    // Game details change more frequently (RSVPs, etc.)
    staleTime: 3 * 60 * 1000,

    // Only run this query if we have a gameId
    // Prevents errors when gameId is undefined
    enabled: !!gameId,
  });
};

/**
 * Fetch games by sport
 *
 * Convenience hook - same as useGames({ sport: ['soccer'] })
 * but more semantic and easier to use.
 *
 * Usage Example:
 *   ```tsx
 *   const { data: soccerGames } = useGamesBySport('soccer');
 *   ```
 *
 * @param sport - The sport to filter by
 * @returns TanStack Query result with filtered games
 */
export const useGamesBySport = (sport: string) => {
  return useGames({ sport: [sport] });
};

/**
 * Fetch upcoming games (status = 'open' and future start time)
 *
 * Usage Example:
 *   ```tsx
 *   const { data: upcomingGames } = useUpcomingGames();
 *   ```
 *
 * @returns TanStack Query result with upcoming games
 */
export const useUpcomingGames = () => {
  return useQuery({
    queryKey: ['games', 'upcoming'],
    queryFn: async () => {
      // MOCK DATA MODE
      await new Promise(resolve => setTimeout(resolve, 400));

      const now = new Date();
      const upcoming = mockGames.filter(game =>
        game.status === 'open' &&
        new Date(game.start_time) > now
      );

      return upcoming.sort((a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', 'open')
        .gt('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data;
      */
    },
    staleTime: 2 * 60 * 1000, // Fresher data for upcoming games
  });
};

/**
 * Fetch user's games (games they've RSVP'd to or are hosting)
 *
 * Usage Example:
 *   ```tsx
 *   const { data: myGames } = useUserGames(userId);
 *   ```
 *
 * @param userId - The user ID
 * @returns TanStack Query result with user's games
 */
export const useUserGames = (userId: string) => {
  return useQuery({
    queryKey: ['games', 'user', userId],
    queryFn: async () => {
      // MOCK DATA MODE
      await new Promise(resolve => setTimeout(resolve, 400));

      // Return games where user is host
      // In real app, would also check RSVPs
      return mockGames.filter(game => game.host_user_id === userId);

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          rsvps:game_rsvps(*)
        `)
        .or(`host_user_id.eq.${userId},rsvps.user_id.eq.${userId}`);

      if (error) throw error;
      return data;
      */
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000,
  });
};
