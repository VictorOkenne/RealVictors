# RealVictors Architecture Documentation

**Last Updated:** 2025-11-29
**Version:** 2.0 (Modern Architecture)

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Data Flow](#data-flow)
5. [State Management Strategy](#state-management-strategy)
6. [Security Model](#security-model)
7. [Migration Path](#migration-path)
8. [Best Practices](#best-practices)

---

## Overview

RealVictors uses a modern, scalable architecture that separates concerns cleanly:

- **TanStack Query** for server state (data from Supabase)
- **Zustand** for client state (UI preferences, selections)
- **Supabase** for backend (database, auth, realtime, storage)
- **React Native + Expo** for mobile app

###  Key Architecture Principles

1. **Separation of Concerns**
   - UI components focus on rendering
   - API layer handles data fetching
   - Business logic in controllers (only when needed)
   - Security in Supabase RLS (not frontend)

2. **Single Source of Truth**
   - TanStack Query cache for server data
   - Zustand stores for client data
   - Supabase as ultimate source

3. **Performance First**
   - Automatic caching (no redundant fetches)
   - Optimistic updates (instant UI feedback)
   - Background refetching (always fresh data)

4. **Developer Experience**
   - TypeScript everywhere
   - Extensive comments in code
   - Clear file organization
   - Easy to find things

---

## Technology Stack

### Frontend

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **React Native 0.81** | Mobile framework | Cross-platform iOS + Android |
| **Expo ~54.0** | Development platform | Simplifies React Native development |
| **TypeScript 5.8** | Type safety | Catch errors at compile time |
| **TanStack Query 5.89** | Server state management | Auto-caching, refetching, optimistic updates |
| **Zustand 5.0** | Client state management | Simpler than Redux, works great with React Query |
| **React Hook Form 7.62** | Form management | Best form library for React |

### Backend

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Supabase** | Backend platform | PostgreSQL + Auth + Realtime + Storage |
| **PostgreSQL** | Database | Powerful, reliable, open-source |
| **Row Level Security (RLS)** | Data security | Server-side security, can't be bypassed |
| **Edge Functions** | Serverless functions | For complex logic, webhooks, integrations |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Expo Router** | File-based routing |
| **React Native Paper** | UI component library |
| **Lucide Icons** | Icon library |
| **date-fns** | Date manipulation |

---

## Folder Structure

```
realvictors/
├── app/                          # Expo Router pages (file-based routing)
│   ├── (auth)/                   # Auth screens (login, signup, onboarding)
│   ├── (tabs)/                   # Main app tabs (home, search, profile, etc.)
│   ├── _layout.tsx               # Root layout with providers
│   └── [other screens]/
│
├── src/
│   ├── api/                      # 🆕 TanStack Query layer
│   │   ├── client.ts             # Supabase client singleton
│   │   ├── queryClient.ts        # TanStack Query configuration
│   │   │
│   │   ├── auth/                 # Auth domain
│   │   │   ├── queries.ts        # useUser, useProfile, useSession
│   │   │   └── mutations.ts      # useLogin, useSignup, useLogout
│   │   │
│   │   ├── games/                # Games domain
│   │   │   ├── queries.ts        # useGames, useGame, useUpcomingGames
│   │   │   └── mutations.ts      # useCreateGame, useUpdateGame, useRSVP
│   │   │
│   │   ├── teams/                # Teams domain
│   │   │   ├── queries.ts
│   │   │   └── mutations.ts
│   │   │
│   │   └── [other domains]/
│   │
│   ├── stores/                   # 🆕 Zustand state stores
│   │   ├── sportStore.ts         # Current sport selection
│   │   └── uiStore.ts            # Theme, modals, loading, toasts
│   │
│   ├── components/               # React components
│   │   ├── screens/              # Full-screen components
│   │   ├── widgets/              # Reusable UI components
│   │   └── AuthGuard.tsx         # Auth navigation guard
│   │
│   ├── controllers/              # Business logic (only complex workflows)
│   │   ├── AuthController.ts     # Complex auth flows
│   │   └── GameController.ts     # Complex game logic
│   │
│   ├── contexts/                 # 📦 Legacy - being phased out
│   │   ├── AuthContext.tsx       # Will be simplified
│   │   └── SportContext.tsx      # Replaced by sportStore
│   │
│   ├── services/                 # 📦 Legacy - being split into api/
│   │   └── supabase.ts           # Being split into domain files
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── database.ts           # Generated from Supabase
│   │   └── index.ts              # App types
│   │
│   ├── constants/                # App constants
│   ├── utils/                    # Pure utility functions
│   └── hooks/                    # Custom React hooks
│
├── docs/                         # 🆕 Documentation
│   ├── ARCHITECTURE.md           # This file
│   ├── DATA_FLOW.md              # How data flows through the app
│   ├── MIGRATION_GUIDE.md        # How to migrate from old to new
│   └── SECURITY.md               # Security best practices
│
├── supabase/                     # Supabase configuration
│   ├── migrations/               # Database migrations
│   └── functions/                # Edge functions
│
└── [config files]
```

### Key Directories Explained

#### `src/api/` - NEW DATA LAYER

This is the heart of the new architecture. All data fetching happens here.

**Structure:**
- `client.ts` - Single Supabase client instance
- `queryClient.ts` - TanStack Query configuration
- `[domain]/queries.ts` - Reading data (SELECT queries)
- `[domain]/mutations.ts` - Modifying data (INSERT, UPDATE, DELETE)

**Example:**
```typescript
// src/api/games/queries.ts
export const useGames = (filters) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: async () => {
      // Fetch from Supabase
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', filters.status);

      if (error) throw error;
      return data;
    },
  });
};

// In component:
const { data: games, isLoading } = useGames({ status: 'open' });
```

#### `src/stores/` - NEW CLIENT STATE

Zustand stores for UI state that doesn't come from the server.

**What goes in stores:**
- ✅ Current sport selection (`sportStore.ts`)
- ✅ Theme (dark/light mode) (`uiStore.ts`)
- ✅ Modal open/closed states (`uiStore.ts`)
- ✅ Filter selections
- ❌ NOT server data (use TanStack Query)

**Example:**
```typescript
// src/stores/sportStore.ts
export const useSportStore = create((set) => ({
  currentSport: 'soccer',
  setCurrentSport: (sport) => set({ currentSport: sport }),
}));

// In component:
const currentSport = useSportStore(state => state.currentSport);
const setCurrentSport = useSportStore(state => state.setCurrentSport);
```

#### `src/controllers/` - BUSINESS LOGIC (Simplified)

Controllers now only handle complex, multi-step workflows.

**When to use controllers:**
- ✅ Multi-step workflows (signup → create profile → upload avatar)
- ✅ Complex business logic (game scoring, stats calculation)
- ✅ Orchestrating multiple API calls
- ❌ Simple CRUD (use TanStack Query directly)

**Example:**
```typescript
// Complex workflow that needs a controller
export class OnboardingController {
  static async completeOnboarding(userId, data) {
    // Step 1: Create profile
    await supabase.from('profiles').insert({ user_id: userId, ...data });

    // Step 2: Upload avatar
    await supabase.storage.from('avatars').upload(`${userId}/avatar.jpg`, file);

    // Step 3: Send welcome email (Edge Function)
    await supabase.functions.invoke('send-welcome-email', { userId });

    // Step 4: Invalidate caches
    queryClient.invalidateQueries(['user', userId]);
  }
}
```

---

## Data Flow

### Reading Data (Queries)

```
┌─────────────┐
│  Component  │
└─────┬───────┘
      │ 1. useGames()
      ▼
┌─────────────────────┐
│  TanStack Query     │
│  (Cache Manager)    │
└─────┬───────────────┘
      │ 2. Check cache
      │    - If fresh: return cached data
      │    - If stale: fetch + return cached, update when done
      │    - If missing: fetch new
      ▼
┌─────────────────────┐
│  src/api/games/     │
│  queries.ts         │
└─────┬───────────────┘
      │ 3. queryFn()
      ▼
┌─────────────────────┐
│  Supabase Client    │
└─────┬───────────────┘
      │ 4. SQL Query
      ▼
┌─────────────────────┐
│  PostgreSQL + RLS   │
│  (Enforces security)│
└─────┬───────────────┘
      │ 5. Return data
      ▼
┌─────────────────────┐
│  Component Updates  │
│  (Auto re-render)   │
└─────────────────────┘
```

### Writing Data (Mutations)

```
┌─────────────┐
│  Component  │  (e.g., Create Game Form)
└─────┬───────┘
      │ 1. createGame.mutate(data)
      ▼
┌─────────────────────┐
│  TanStack Query     │
│  (Mutation Manager) │
└─────┬───────────────┘
      │ 2. mutationFn()
      ▼
┌─────────────────────┐
│  src/api/games/     │
│  mutations.ts       │
└─────┬───────────────┘
      │ 3. Insert query
      ▼
┌─────────────────────┐
│  Supabase Client    │
└─────┬───────────────┘
      │ 4. SQL INSERT
      ▼
┌─────────────────────┐
│  PostgreSQL + RLS   │
│  (Validates:        │
│   - User is authed  │
│   - Has permission) │
└─────┬───────────────┘
      │ 5. onSuccess()
      ▼
┌─────────────────────┐
│  Invalidate Caches  │
│  queryClient        │
│    .invalidate      │
│    Queries(['games'])
└─────┬───────────────┘
      │ 6. Refetch
      ▼
┌─────────────────────┐
│  All Components     │
│  Using useGames()   │
│  Auto-Update        │
└─────────────────────┘
```

---

## State Management Strategy

### Two Types of State

| Server State | Client State |
|-------------|--------------|
| **Source:** Backend (Supabase) | **Source:** Frontend (user interaction) |
| **Examples:** Users, games, teams, posts | **Examples:** Theme, modals, filters, current sport |
| **Tool:** TanStack Query | **Tool:** Zustand |
| **Persistence:** Database | **Persistence:** AsyncStorage (optional) |
| **Sync:** Auto-refetch, realtime | **Sync:** N/A (local only) |

### When to Use What

```typescript
// ✅ TanStack Query - Server data
const { data: games } = useGames();
const { data: user } = useUser();
const { data: profile } = useProfile(userId);

// ✅ Zustand - Client state
const currentSport = useSportStore(state => state.currentSport);
const theme = useUIStore(state => state.theme);
const isModalOpen = useUIStore(state => state.modals['create-game']);

// ✅ React useState - Local component state
const [tabIndex, setTabIndex] = useState(0);
const [isExpanded, setIsExpanded] = useState(false);

// ✅ React Hook Form - Form state
const { register, handleSubmit } = useForm();
```

---

## Security Model

### Three Layers of "Security"

#### Layer 1: UX Checks (Frontend) - NOT REAL SECURITY

**Purpose:** Better user experience
**Location:** Components
**Can be bypassed:** Yes (easily)

```typescript
// ✅ GOOD - UX check to show/hide button
const DeleteButton = ({ game, userId }) => {
  const isOwner = game.host_user_id === userId;

  // Don't show delete button if user isn't owner
  // This is for UX only - doesn't prevent deletion
  if (!isOwner) return null;

  return <Button onPress={handleDelete}>Delete</Button>;
};
```

**Why this isn't security:**
- User can edit React Native bundle
- User can call API directly
- User can bypass UI checks in DevTools

#### Layer 2: API Layer (Frontend) - NOT REAL SECURITY

**Purpose:** Consistency, error handling
**Location:** `src/api/*/mutations.ts`
**Can be bypassed:** Yes (user can call Supabase directly)

```typescript
// ❌ DON'T DO THIS - False security
export const useDeleteGame = () => {
  return useMutation({
    mutationFn: async ({ gameId, userId }) => {
      // This check is useless - user can bypass it
      const game = await getGame(gameId);
      if (game.host_user_id !== userId) {
        throw new Error('Not authorized');
      }

      // User can still call Supabase directly and skip this check
      await supabase.from('games').delete().eq('id', gameId);
    },
  });
};

// ✅ DO THIS INSTEAD - Let RLS handle it
export const useDeleteGame = () => {
  return useMutation({
    mutationFn: async (gameId) => {
      // No auth check - RLS handles it
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId);

      if (error) {
        // RLS returns error if user isn't authorized
        if (error.code === 'PGRST301') {
          throw new Error('You can only delete games you created');
        }
        throw error;
      }
    },
  });
};
```

#### Layer 3: Row Level Security (Backend) - REAL SECURITY

**Purpose:** Actual security
**Location:** Supabase (PostgreSQL)
**Can be bypassed:** No (enforced server-side)

```sql
-- This is REAL security
-- Runs on the server, can't be bypassed

CREATE POLICY "Users can only delete their own games"
ON games
FOR DELETE
USING (auth.uid() = host_user_id);

-- How it works:
-- 1. User tries to delete game with ID = '123'
-- 2. PostgreSQL checks: Is auth.uid() == games.host_user_id?
-- 3. If yes: Allow deletion
-- 4. If no: Deny with error
-- 5. No way to bypass this from frontend
```

### Security Best Practices

1. **All security goes in RLS policies**
   - Frontend checks are for UX only
   - Always assume frontend can be bypassed
   - RLS is your only real security

2. **Document UX checks clearly**
   ```typescript
   /**
    * UX Helper: Check if user can delete game
    *
    * ⚠️ This is for UX only (showing/hiding UI).
    * Real security is in RLS policy.
    * Even if this returns true, RLS may still deny the operation.
    */
   const canDeleteGame = (game, userId) => {
     return game.host_user_id === userId;
   };
   ```

3. **Handle RLS errors gracefully**
   ```typescript
   try {
     await deleteGame(gameId);
   } catch (error) {
     if (error.code === 'PGRST301') {
       Alert.alert('Permission Denied', 'You can only delete your own games');
     } else {
       Alert.alert('Error', error.message);
     }
   }
   ```

---

## Migration Path

### Current State (Old Architecture)

- ✅ `services/supabase.ts` - 850 lines, all queries in one file
- ✅ `controllers/` - Exist but underutilized
- ✅ `contexts/` - AuthContext + SportContext
- ❌ No TanStack Query usage
- ❌ Zustand installed but not used
- ❌ Mock data in components

### Target State (New Architecture)

- ✅ `api/` - Domain-organized queries and mutations
- ✅ `stores/` - Zustand for client state
- ✅ `controllers/` - Only complex workflows
- ✅ TanStack Query everywhere
- ✅ Real data from Supabase
- ✅ Simplified contexts

### Migration Steps

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed steps.

---

## Best Practices

### 1. File Organization

**DO:**
```
src/api/games/
  ├── queries.ts      # All read operations
  ├── mutations.ts    # All write operations
  └── types.ts        # Domain-specific types
```

**DON'T:**
```
src/api/
  ├── getAllGames.ts
  ├── getGame.ts
  ├── createGame.ts
  ├── updateGame.ts
  └── deleteGame.ts   # Too many files!
```

### 2. Query Keys

**DO:**
```typescript
// Hierarchical, filters included
['games']                              // All games
['games', { sport: 'soccer' }]         // Soccer games
['games', { sport: 'soccer', status: 'open' }]  // Open soccer games
['game', gameId]                       // Single game
```

**DON'T:**
```typescript
// Not hierarchical
['all-games']
['soccer-games']
['open-soccer-games']  // Have to invalidate each separately
```

### 3. Comments

**DO:**
```typescript
/**
 * Fetch all games with optional filters
 *
 * Features:
 * - Auto-caching
 * - Auto-refetching
 * - Loading/error states
 *
 * Usage:
 *   const { data, isLoading } = useGames({ sport: 'soccer' });
 *
 * @param filters - Optional filters
 * @returns TanStack Query result
 */
export const useGames = (filters) => { ... }
```

### 4. Error Handling

**DO:**
```typescript
const { data, error } = useGames();

if (error) {
  return <ErrorMessage error={error} />;
}
```

**DON'T:**
```typescript
// Silent failures
const { data } = useGames();
// What if there's an error?
```

### 5. Loading States

**DO:**
```typescript
const { data, isLoading, isFetching } = useGames();

// First load
if (isLoading) return <FullScreenLoader />;

// Background refetch
return (
  <View>
    {isFetching && <SmallSpinner />}
    <GamesList games={data} />
  </View>
);
```

---

## Additional Resources

- [DATA_FLOW.md](./DATA_FLOW.md) - Detailed data flow diagrams
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Step-by-step migration
- [SECURITY.md](./SECURITY.md) - Security best practices
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Supabase Docs](https://supabase.com/docs)
