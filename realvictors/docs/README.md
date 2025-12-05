# RealVictors Documentation

Welcome to the RealVictors architecture documentation! This folder contains everything you need to understand and work with the new modern architecture.

---

## 📚 Documentation Files

### [ARCHITECTURE.md](./ARCHITECTURE.md) - **START HERE**
Complete overview of the app architecture including:
- Technology stack
- Folder structure
- Data flow diagrams
- State management strategy
- Security model
- Best practices

### [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
Step-by-step guide to migrate from old to new architecture:
- Migration checklist
- Code examples (before/after)
- Common patterns
- Troubleshooting
- How to switch from mock to real data

### [SECURITY.md](./SECURITY.md)
Security best practices and RLS setup:
- Row Level Security (RLS) policies
- Authentication security
- Common vulnerabilities
- Security checklist

---

## 🚀 Quick Start

### 1. Understand the New Architecture

Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand:
- Why we use TanStack Query for server state
- Why we use Zustand for client state
- How data flows through the app
- Where security is enforced (hint: Supabase RLS)

### 2. See It in Action

Check out the example implementation:
```
src/components/screens/HomePage/MainHomePage.example.tsx
```

This shows how to:
- Use `useGames()` hook to fetch games
- Use `useSportStore` to get current sport
- Handle loading/error states
- Integrate with existing UI components

### 3. Try It Yourself

Migrate one feature using [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md):
1. Pick a simple component (like games list)
2. Replace mock data with `useGames()` hook
3. Replace `useSport()` context with `useSportStore`
4. Add loading/error states
5. Test with mock data

### 4. When Supabase is Ready

When your Supabase database has data:
1. Open `src/api/games/queries.ts`
2. Find the `// REAL SUPABASE MODE` comments
3. Uncomment the real queries
4. Delete the mock data code
5. Your entire app automatically switches to real data!

---

## 🏗️ What's Been Set Up

### ✅ Completed

1. **Base Infrastructure**
   - `src/api/client.ts` - Supabase client singleton
   - `src/api/queryClient.ts` - TanStack Query configuration
   - `app/_layout.tsx` - Updated with QueryClientProvider

2. **API Layer (with Mock Data)**
   - `src/api/games/queries.ts` - useGames, useGame, useUpcomingGames
   - `src/api/games/mutations.ts` - useCreateGame, useUpdateGame, useDeleteGame
   - `src/api/auth/queries.ts` - useUser, useProfile, useSession
   - `src/api/auth/mutations.ts` - useLogin, useSignup, useLogout

3. **State Management**
   - `src/stores/sportStore.ts` - Current sport selection (replaces SportContext)
   - `src/stores/uiStore.ts` - Theme, modals, loading, toasts

4. **Documentation**
   - Complete architecture guide
   - Migration guide with examples
   - Security best practices
   - Extensive code comments everywhere

5. **Example Implementation**
   - `MainHomePage.example.tsx` - Reference implementation

### 🔄 To Be Migrated (When You're Ready)

- Replace `useSport()` with `useSportStore` in all components
- Replace mock data with API hooks
- Simplify AuthContext to wrap TanStack Query hooks
- Clean up old `services/supabase.ts` file

---

## 📖 Key Concepts

### TanStack Query (React Query)

**What it does:** Manages server state (data from Supabase)

**Why we use it:**
- ✅ Auto-caching (fetch once, use everywhere)
- ✅ Auto-refetching (keeps data fresh)
- ✅ Loading/error states built-in
- ✅ Optimistic updates
- ✅ No manual state management

**Example:**
```typescript
const { data: games, isLoading, error } = useGames({ sport: 'soccer' });
```

### Zustand

**What it does:** Manages client state (UI preferences, selections)

**Why we use it:**
- ✅ Simpler than Redux
- ✅ No provider needed
- ✅ Works great with React Query
- ✅ Can persist to AsyncStorage

**Example:**
```typescript
const currentSport = useSportStore(state => state.currentSport);
const setCurrentSport = useSportStore(state => state.setCurrentSport);
```

### Row Level Security (RLS)

**What it does:** Enforces data security on the server

**Why we use it:**
- ✅ Real security (can't be bypassed from frontend)
- ✅ Simple to understand (SQL policies)
- ✅ Automatic with Supabase

**Example:**
```sql
CREATE POLICY "users_delete_own_games"
ON games FOR DELETE
USING (auth.uid() = host_user_id);
```

---

## 🎯 Current Status

### Using Mock Data ✅

All API hooks currently return mock data:
- Games list (filtered by sport)
- User auth (mock login/logout)
- Profiles

**Why?**
- Your Supabase database doesn't have data yet
- You can develop and test the UI with realistic data
- Easy transition when Supabase is ready

### When Supabase is Ready

Simply uncomment the real queries in `src/api/*/queries.ts`:

**Before:**
```typescript
// Mock data
return mockGames;
```

**After:**
```typescript
// Real data
const { data, error } = await supabase.from('games').select('*');
return data;
```

That's it! No other changes needed.

---

## 🤝 Best Practices

### 1. Keep Mock Data for Now

Don't delete mock data yet! Keep it until Supabase has real data.

### 2. Add Extensive Comments

Every new file has comments explaining:
- What it does
- How to use it
- Example code
- TODO markers for future changes

### 3. Migrate Gradually

Don't try to migrate everything at once:
1. Start with read-only features (games list)
2. Then add mutations (create game)
3. Test thoroughly
4. Repeat for other features

### 4. Security in RLS Only

Frontend checks are for UX only:
- Show/hide buttons based on permissions
- Give friendly error messages
- **Real security is in Supabase RLS policies**

---

## 🆘 Need Help?

### Documentation

- **Architecture questions:** Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Migration questions:** Read [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Security questions:** Read [SECURITY.md](./SECURITY.md)

### External Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Supabase Docs](https://supabase.com/docs)
- [React Native Docs](https://reactnative.dev)

### Common Questions

**Q: Where do I find examples?**
A: Check `src/components/screens/HomePage/MainHomePage.example.tsx`

**Q: How do I switch from mock to real data?**
A: Uncomment the `// REAL SUPABASE MODE` sections in `src/api/*/queries.ts`

**Q: Do I need to delete old code?**
A: No! New and old code work together. Migrate gradually.

**Q: Is frontend security checks enough?**
A: No! Always use Supabase RLS. Frontend checks are for UX only.

---

## 📝 What's Next?

1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. ✅ Look at example: `src/components/screens/HomePage/MainHomePage.example.tsx`
3. ✅ Try migrating one component following [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
4. ✅ Test with mock data
5. ✅ When Supabase ready, uncomment real queries
6. ✅ Enjoy your modern, scalable architecture!

---

**Happy Coding! 🚀**
