/**
 * TanStack Query Client Configuration
 *
 * This file configures the global TanStack Query client with optimal settings
 * for a React Native app.
 *
 * What is TanStack Query?
 * - Manages server state (data from your backend/Supabase)
 * - Automatic caching: Fetches data once, reuses it everywhere
 * - Automatic refetching: Keeps data fresh in the background
 * - Loading/error states: Built-in, no manual useState needed
 * - Optimistic updates: Update UI instantly, rollback if fails
 *
 * Why separate from client.ts?
 * - Separates Supabase config from React Query config
 * - Can use React Query with any backend (not just Supabase)
 * - Easier to test and modify settings
 *
 * Architecture:
 * - This client is provided at the app root (app/_layout.tsx)
 * - All useQuery/useMutation hooks use this config
 * - Settings here apply globally (can override per-hook)
 *
 * @see https://tanstack.com/query/latest/docs/react/reference/QueryClient
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Global Query Client Instance
 *
 * Default Options Explained:
 *
 * QUERIES (Fetching Data):
 * - staleTime: How long data is considered "fresh"
 *   - Set to 5 minutes: Don't refetch if data is less than 5 min old
 *   - Example: User opens game list, navigates away, comes back within 5 min
 *     → Uses cached data (instant load), no refetch
 *
 * - gcTime: How long to keep unused data in memory (garbage collection time)
 *   - Set to 10 minutes: Keep data for 10 min after last use
 *   - Example: User views a game, goes back, data stays in cache for 10 min
 *     → If they view it again within 10 min, instant load
 *
 * - retry: How many times to retry failed requests
 *   - Set to 1: Try once more if request fails
 *   - Prevents excessive retries on bad network
 *
 * - refetchOnWindowFocus: Refetch when app comes to foreground
 *   - Set to false: Don't refetch when user switches back to app
 *   - Mobile users switch apps frequently, this prevents excessive fetches
 *   - Can enable per-query for critical data (e.g., notifications)
 *
 * MUTATIONS (Creating/Updating Data):
 * - retry: Don't retry mutations by default
 *   - Mutations change data, retrying could cause duplicates
 *   - Example: Creating a game - don't want to create it twice
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data freshness: 5 minutes
      // After 5 minutes, data is "stale" and will refetch in background
      staleTime: 5 * 60 * 1000,

      // Cache duration: 10 minutes
      // Data removed from cache 10 minutes after last component unmounts
      gcTime: 10 * 60 * 1000,

      // Retry failed requests once
      // Good balance: catches temporary network issues, doesn't spam
      retry: 1,

      // Don't refetch on window focus (mobile optimization)
      // Mobile users switch apps frequently
      // Can enable per-query for important data
      refetchOnWindowFocus: false,

      // Refetch on reconnect (if user loses/regains internet)
      // Ensures data is fresh after connection issues
      refetchOnReconnect: true,

      // Don't refetch on mount if data is fresh
      // Uses cached data if within staleTime
      refetchOnMount: false,
    },
    mutations: {
      // Don't retry mutations
      // Mutations change data - retrying could cause duplicates
      retry: 0,
    },
  },
});

/**
 * Custom Query Client Utilities
 *
 * Helper functions for common operations
 */

/**
 * Clear all cached data
 *
 * Usage:
 * - Call when user logs out
 * - Call when switching accounts
 * - Call to force fresh data fetch
 *
 * Example:
 *   await clearAllCache();
 *   router.replace('/login');
 */
export const clearAllCache = async () => {
  await queryClient.clear();
  console.log('✅ All query cache cleared');
};

/**
 * Invalidate specific queries (force refetch)
 *
 * Usage:
 * - After creating/updating data
 * - To manually refresh data
 *
 * Example:
 *   // After creating a game, refresh the games list
 *   await invalidateQueries(['games']);
 *
 * @param queryKey - The query key to invalidate (e.g., ['games'], ['user'])
 */
export const invalidateQueries = async (queryKey: any[]) => {
  await queryClient.invalidateQueries({ queryKey });
  console.log(`✅ Invalidated queries: ${JSON.stringify(queryKey)}`);
};

/**
 * Prefetch data before it's needed
 *
 * Usage:
 * - Prefetch next page while user views current page
 * - Prefetch likely next screen
 * - Improves perceived performance
 *
 * Example:
 *   // Prefetch game details when user hovers on game card
 *   await prefetchQuery(['game', gameId], () => fetchGame(gameId));
 *
 * @param queryKey - The query key
 * @param queryFn - The function to fetch data
 */
export const prefetchQuery = async (queryKey: any[], queryFn: () => Promise<any>) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
  console.log(`✅ Prefetched: ${JSON.stringify(queryKey)}`);
};
