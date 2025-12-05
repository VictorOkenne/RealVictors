/**
 * Sport Store - Zustand State Management
 *
 * Manages the currently selected sport across the app.
 *
 * What is Zustand?
 * - Lightweight state management library (simpler than Redux)
 * - Perfect for client-side UI state (not server data)
 * - No providers needed - just import and use
 * - Works great with TanStack Query
 *
 * What goes in Zustand?
 * ✅ Current sport selection
 * ✅ UI preferences (theme, layout mode)
 * ✅ Filter states
 * ✅ Modal open/closed
 * ❌ Server data (use TanStack Query instead)
 * ❌ Auth state (use TanStack Query instead)
 *
 * Why separate from TanStack Query?
 * - TanStack Query = Server state (data from backend/Supabase)
 * - Zustand = Client state (UI preferences, selections)
 * - Keeps concerns separated and code clean
 *
 * Architecture:
 * - This replaces the old SportContext
 * - No provider wrapper needed
 * - Components can read/write directly
 * - Auto re-renders components when state changes
 * - Persists to AsyncStorage (survives app restarts)
 *
 * @see https://github.com/pmndrs/zustand
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Available sports in the app
 */
export type Sport =
  | 'soccer'
  | 'basketball'
  | 'football'
  | 'baseball'
  | 'volleyball'
  | 'tennis'
  | 'hockey'
  | 'rugby'
  | 'cricket'
  | 'golf';

/**
 * Sport store state
 */
interface SportState {
  /**
   * Currently selected sport
   * This affects what data is shown throughout the app
   */
  currentSport: Sport;

  /**
   * List of user's favorite sports
   * Shown in quick-select menu
   */
  favoriteSports: Sport[];

  /**
   * Action: Set the current sport
   * @param sport - The sport to switch to
   */
  setCurrentSport: (sport: Sport) => void;

  /**
   * Action: Add a sport to favorites
   * @param sport - The sport to add
   */
  addFavoriteSport: (sport: Sport) => void;

  /**
   * Action: Remove a sport from favorites
   * @param sport - The sport to remove
   */
  removeFavoriteSport: (sport: Sport) => void;

  /**
   * Action: Reset to default state
   */
  reset: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

/**
 * Default state values
 */
const initialState = {
  currentSport: 'soccer' as Sport,
  favoriteSports: ['soccer', 'basketball', 'football'] as Sport[],
};

// ============================================================================
// STORE DEFINITION
// ============================================================================

/**
 * Sport Store
 *
 * Usage Example:
 *   ```tsx
 *   // In any component - no provider needed!
 *   import { useSportStore } from '../stores/sportStore';
 *
 *   const SportSelector = () => {
 *     // Get current sport (component re-renders when it changes)
 *     const currentSport = useSportStore(state => state.currentSport);
 *
 *     // Get the action to change sport
 *     const setCurrentSport = useSportStore(state => state.setCurrentSport);
 *
 *     return (
 *       <View>
 *         <Text>Current Sport: {currentSport}</Text>
 *         <Button onPress={() => setCurrentSport('basketball')}>
 *           Switch to Basketball
 *         </Button>
 *       </View>
 *     );
 *   };
 *   ```
 *
 * Integration with TanStack Query:
 *   ```tsx
 *   const GamesList = () => {
 *     // Get current sport from Zustand
 *     const currentSport = useSportStore(state => state.currentSport);
 *
 *     // Use it to filter games from TanStack Query
 *     const { data: games } = useGames({ sport: [currentSport] });
 *
 *     // When sport changes, games auto-refetch!
 *     return <GameCards games={games} />;
 *   };
 *   ```
 *
 * Persistence:
 * - State is automatically saved to AsyncStorage
 * - Survives app restarts
 * - User's sport preference is remembered
 */
export const useSportStore = create<SportState>()(
  // Persist middleware: Saves state to AsyncStorage
  persist(
    (set, get) => ({
      // ========================================================================
      // STATE
      // ========================================================================

      ...initialState,

      // ========================================================================
      // ACTIONS
      // ========================================================================

      /**
       * Set the current sport
       *
       * What happens:
       * 1. Updates currentSport in store
       * 2. All components using currentSport re-render
       * 3. If used with TanStack Query, games list refetches for new sport
       * 4. State persists to AsyncStorage
       *
       * Example:
       *   ```tsx
       *   const SportPicker = () => {
       *     const setCurrentSport = useSportStore(state => state.setCurrentSport);
       *
       *     return (
       *       <Picker onValueChange={setCurrentSport}>
       *         <Picker.Item label="Soccer" value="soccer" />
       *         <Picker.Item label="Basketball" value="basketball" />
       *       </Picker>
       *     );
       *   };
       *   ```
       */
      setCurrentSport: (sport) => {
        console.log(`⚽ Switching to sport: ${sport}`);
        set({ currentSport: sport });
      },

      /**
       * Add a sport to favorites
       *
       * - Won't add duplicates
       * - Useful for quick sport switcher
       *
       * Example:
       *   ```tsx
       *   const addFav = useSportStore(state => state.addFavoriteSport);
       *   <Button onPress={() => addFav('tennis')}>
       *     Add Tennis to Favorites
       *   </Button>
       *   ```
       */
      addFavoriteSport: (sport) => {
        const { favoriteSports } = get();

        // Don't add if already in favorites
        if (favoriteSports.includes(sport)) {
          console.log(`⚽ ${sport} already in favorites`);
          return;
        }

        console.log(`⭐ Adding ${sport} to favorites`);
        set({ favoriteSports: [...favoriteSports, sport] });
      },

      /**
       * Remove a sport from favorites
       *
       * Example:
       *   ```tsx
       *   const removeFav = useSportStore(state => state.removeFavoriteSport);
       *   <Button onPress={() => removeFav('tennis')}>
       *     Remove from Favorites
       *   </Button>
       *   ```
       */
      removeFavoriteSport: (sport) => {
        const { favoriteSports } = get();

        console.log(`❌ Removing ${sport} from favorites`);
        set({
          favoriteSports: favoriteSports.filter((s) => s !== sport),
        });
      },

      /**
       * Reset to default state
       *
       * Useful for:
       * - Logout (reset user preferences)
       * - Testing
       * - "Reset to defaults" button in settings
       *
       * Example:
       *   ```tsx
       *   const reset = useSportStore(state => state.reset);
       *   <Button onPress={reset}>Reset Preferences</Button>
       *   ```
       */
      reset: () => {
        console.log('🔄 Resetting sport store to defaults');
        set(initialState);
      },
    }),

    // Persistence configuration
    {
      // Name: Used as AsyncStorage key
      name: 'sport-storage',

      // Storage: Use AsyncStorage for React Native
      storage: createJSONStorage(() => AsyncStorage),

      // Partialize: Choose which parts of state to persist
      // In this case, persist everything
      partialize: (state) => ({
        currentSport: state.currentSport,
        favoriteSports: state.favoriteSports,
        // Don't persist actions (they're not state)
      }),
    }
  )
);

// ============================================================================
// SELECTORS (Performance Optimization)
// ============================================================================

/**
 * Selectors: Pre-defined ways to read from store
 *
 * Why use selectors?
 * - Components only re-render when the specific data they use changes
 * - Without selectors: Component re-renders on ANY store change
 * - With selectors: Component only re-renders when selected data changes
 *
 * Performance Example:
 *   ```tsx
 *   // ❌ BAD - Re-renders on ANY sport store change
 *   const Component1 = () => {
 *     const store = useSportStore();
 *     return <Text>{store.currentSport}</Text>;
 *   };
 *
 *   // ✅ GOOD - Only re-renders when currentSport changes
 *   const Component2 = () => {
 *     const currentSport = useSportStore(state => state.currentSport);
 *     return <Text>{currentSport}</Text>;
 *   };
 *
 *   // ✅ BETTER - Use pre-defined selector
 *   const Component3 = () => {
 *     const currentSport = useSportStore(selectCurrentSport);
 *     return <Text>{currentSport}</Text>;
 *   };
 *   ```
 */

/**
 * Select current sport only
 */
export const selectCurrentSport = (state: SportState) => state.currentSport;

/**
 * Select favorite sports only
 */
export const selectFavoriteSports = (state: SportState) => state.favoriteSports;

/**
 * Select if a specific sport is favorited
 */
export const selectIsFavorite = (sport: Sport) => (state: SportState) =>
  state.favoriteSports.includes(sport);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get current sport value outside of React components
 *
 * Usage (in non-React code):
 *   ```ts
 *   import { getCurrentSport } from '../stores/sportStore';
 *
 *   const logCurrentSport = () => {
 *     const sport = getCurrentSport();
 *     console.log('Current sport:', sport);
 *   };
 *   ```
 *
 * Note: For React components, use the hook instead:
 *   const currentSport = useSportStore(state => state.currentSport);
 */
export const getCurrentSport = () => useSportStore.getState().currentSport;

/**
 * Set current sport outside of React components
 *
 * Usage (in non-React code):
 *   ```ts
 *   import { setCurrentSport } from '../stores/sportStore';
 *
 *   setCurrentSport('basketball');
 *   ```
 */
export const setCurrentSport = (sport: Sport) =>
  useSportStore.getState().setCurrentSport(sport);
