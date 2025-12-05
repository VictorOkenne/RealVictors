# Migration Guide: Old Architecture → New Architecture

**Status:** Currently using MOCK DATA - Ready for Supabase migration
**Timeline:** Gradual migration (can do one feature at a time)
**Breaking Changes:** None (new code works alongside old code)

---

## Overview

This guide shows you how to migrate from the old architecture to the new TanStack Query + Zustand architecture.

**Good News:**
- ✅ No breaking changes - new and old code work together
- ✅ Migrate one feature at a time
- ✅ All new code uses mock data until Supabase is ready
- ✅ When Supabase is ready, just uncomment real queries

---

## Quick Migration Checklist

- [ ] 1. Setup complete (QueryClient provider added to app/_layout.tsx) ✅
- [ ] 2. Migrate one component to new hooks (start with games list)
- [ ] 3. Test with mock data
- [ ] 4. Migrate auth to new hooks
- [ ] 5. Migrate remaining features
- [ ] 6. When Supabase ready: uncomment real queries in `src/api/*/queries.ts`
- [ ] 7. Clean up old code (remove services/supabase.ts, simplify contexts)

---

## Step-by-Step Migration

### Step 1: Migrate Games List (Example)

#### OLD CODE (Current)
```typescript
// src/components/screens/HomePage/MainHomePage.tsx

import { upcomingGames } from './mockData';  // ❌ Mock data imported
import { useSport } from '../../../contexts/SportContext';  // ❌ Context

const MainHomePage = () => {
  const { currentSport } = useSport();  // ❌ From context
  const games = upcomingGames;  // ❌ Hardcoded mock data

  return (
    <ScrollView>
      {games.map(game => <GameCard key={game.id} game={game} />)}
    </ScrollView>
  );
};
```

#### NEW CODE (Target)
```typescript
// src/components/screens/HomePage/MainHomePage.tsx

import { useGames } from '../../../api/games/queries';  // ✅ TanStack Query hook
import { useSportStore } from '../../../stores/sportStore';  // ✅ Zustand store

const MainHomePage = () => {
  // ✅ Get sport from Zustand (replaces useSport context)
  const currentSport = useSportStore(state => state.currentSport);

  // ✅ Fetch games with TanStack Query (replaces mock data)
  const { data: games, isLoading, error, refetch } = useGames({
    sport: [currentSport],
    status: 'open',
  });

  // ✅ Handle loading state
  if (isLoading) return <LoadingSpinner />;

  // ✅ Handle error state
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  // ✅ Handle empty state
  if (!games || games.length === 0) {
    return <EmptyState message="No games found" />;
  }

  return (
    <ScrollView>
      {games.map(game => <GameCard key={game.id} game={game} />)}
    </ScrollView>
  );
};
```

#### What Changed?
1. Import `useGames()` hook instead of mock data
2. Import `useSportStore` instead of `useSport` context
3. Use `const { data: games, isLoading } = useGames(filters)`
4. Add loading/error/empty states
5. Remove mock data import

---

### Step 2: Migrate Auth

#### OLD CODE
```typescript
// Using AuthContext
import { useAuth } from '../../../contexts/AuthContext';

const Header = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return <Text>{user?.display_name}</Text>;
};
```

#### NEW CODE
```typescript
// Using TanStack Query hooks
import { useUser } from '../../../api/auth/queries';

const Header = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Loading />;

  return <Text>{user?.display_name}</Text>;
};
```

---

### Step 3: Migrate Create Game Form

#### OLD CODE
```typescript
import { dbService } from '../../../services/supabase';

const CreateGameForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await dbService.createGame(formData);
      Alert.alert('Success!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return <Button onPress={handleSubmit} loading={loading}>Create</Button>;
};
```

#### NEW CODE
```typescript
import { useCreateGame } from '../../../api/games/mutations';

const CreateGameForm = () => {
  const createGame = useCreateGame();

  const handleSubmit = async (formData) => {
    try {
      await createGame.mutateAsync(formData);
      Alert.alert('Success!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Button
      onPress={handleSubmit}
      loading={createGame.isPending}  // ✅ Built-in loading state
    >
      Create
    </Button>
  );
};
```

---

## When Supabase is Ready

### Current: Mock Data
```typescript
// src/api/games/queries.ts

export const useGames = (filters) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: async () => {
      // Currently using mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGames.filter(/* ... */);
    },
  });
};
```

### Future: Real Data (Just Uncomment!)
```typescript
// src/api/games/queries.ts

export const useGames = (filters) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: async () => {
      // Simply uncomment this:
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', filters.status);

      if (error) throw error;
      return data;

      // And delete the mock data above
    },
  });
};
```

**That's it!** Your entire app automatically switches to real data.

---

## Common Migration Patterns

### Pattern 1: Replace Context with Zustand

```typescript
// OLD: contexts/SportContext.tsx
export const useSport = () => useContext(SportContext);

// NEW: stores/sportStore.ts
export const useSportStore = create((set) => ({
  currentSport: 'soccer',
  setCurrentSport: (sport) => set({ currentSport: sport }),
}));

// In components:
// OLD:
const { currentSport, setCurrentSport } = useSport();

// NEW:
const currentSport = useSportStore(state => state.currentSport);
const setCurrentSport = useSportStore(state => state.setCurrentSport);
```

### Pattern 2: Replace Manual State with TanStack Query

```typescript
// OLD: Manual state management
const [games, setGames] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchGames = async () => {
    setLoading(true);
    try {
      const data = await dbService.getGames();
      setGames(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  fetchGames();
}, []);

// NEW: TanStack Query (one line!)
const { data: games, isLoading, error } = useGames();
```

---

## Troubleshooting

### Issue: "queryClient is not defined"

**Solution:** Make sure QueryClientProvider is in app/_layout.tsx:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/api/queryClient';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### Issue: "Mock data not updating when I change it"

**Solution:** TanStack Query caches data. Clear cache:

```typescript
import { queryClient } from '../api/queryClient';

// Clear all caches
queryClient.clear();

// Or invalidate specific query
queryClient.invalidateQueries({ queryKey: ['games'] });
```

### Issue: "How do I debug what's in the cache?"

**Solution:** Use React Query DevTools (optional):

```bash
npm install @tanstack/react-query-devtools
```

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <YourApp />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## Best Practices During Migration

1. **Migrate one feature at a time**
   - Don't try to migrate everything at once
   - Start with read-only features (games list, profile view)
   - Then migrate mutations (create game, update profile)

2. **Keep old code working**
   - Don't delete old services/contexts yet
   - New code uses new patterns, old code keeps working
   - Clean up after everything is migrated

3. **Test thoroughly with mock data**
   - Make sure loading/error states work
   - Test edge cases (empty lists, errors)
   - Only move to real data when confident

4. **Document as you go**
   - Add comments to new code
   - Update this guide with any gotchas you find
   - Share learnings with team

---

## Reference: Complete Example

See `src/components/screens/HomePage/MainHomePage.example.tsx` for a complete, working example of the new architecture.
