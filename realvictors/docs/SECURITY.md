# Security Guide

**Last Updated:** 2025-11-29

---

## Core Security Principle

**Frontend code cannot be trusted for security.**

- ✅ Use Supabase Row Level Security (RLS) for all security
- ❌ Don't rely on frontend checks for security
- ✅ Frontend checks are for UX only (showing/hiding buttons)

---

## The Three "Layers" of Security

### Layer 1: UX (Not Security)

**Purpose:** Better user experience
**Location:** React components
**Bypassable:** Yes

```typescript
// This is UX, not security
const DeleteButton = ({ game, userId }) => {
  const isOwner = game.host_user_id === userId;

  // Hide button if user isn't owner
  // This DOES NOT prevent deletion!
  if (!isOwner) return null;

  return <Button onPress={handleDelete}>Delete</Button>;
};
```

### Layer 2: API Error Handling (Not Security)

**Purpose:** Consistent error messages
**Location:** `src/api/*/mutations.ts`
**Bypassable:** Yes

```typescript
// This is error handling, not security
export const useDeleteGame = () => {
  return useMutation({
    mutationFn: async (gameId) => {
      const { error } = await supabase.from('games').delete().eq('id', gameId);

      if (error) {
        // Translate RLS error to friendly message
        if (error.code === 'PGRST301') {
          throw new Error('You can only delete games you created');
        }
        throw error;
      }
    },
  });
};
```

### Layer 3: RLS (Real Security)

**Purpose:** Actual data security
**Location:** Supabase (PostgreSQL server)
**Bypassable:** No

```sql
-- This IS real security
CREATE POLICY "delete_own_games"
ON games FOR DELETE
USING (auth.uid() = host_user_id);
```

---

## Row Level Security (RLS) Setup

### 1. Enable RLS on Tables

```sql
-- Enable RLS (must do this first!)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
```

### 2. Create Policies

#### Public Read (Anyone Can View)

```sql
CREATE POLICY "public_read_games"
ON games FOR SELECT
USING (
  status = 'open'  -- Only show open games publicly
  OR auth.uid() = host_user_id  -- Or if user is the host
);
```

#### Authenticated Create

```sql
CREATE POLICY "authenticated_create_games"
ON games FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL  -- Must be logged in
  AND auth.uid() = host_user_id  -- And must be the host
);
```

#### Owner Update

```sql
CREATE POLICY "owner_update_games"
ON games FOR UPDATE
USING (auth.uid() = host_user_id)  -- Can only update own games
WITH CHECK (auth.uid() = host_user_id);  -- Still owner after update
```

#### Owner Delete

```sql
CREATE POLICY "owner_delete_games"
ON games FOR DELETE
USING (auth.uid() = host_user_id);  -- Can only delete own games
```

---

## Common Security Patterns

### Pattern 1: Own Profile Only

```sql
-- Users can only update their own profile
CREATE POLICY "users_update_own_profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### Pattern 2: Team Members Can Read

```sql
-- Only team members can see private team data
CREATE POLICY "team_members_read"
ON teams FOR SELECT
USING (
  privacy = 'public'
  OR auth.uid() IN (
    SELECT user_id FROM team_members WHERE team_id = teams.id
  )
);
```

### Pattern 3: Admins Can Modify

```sql
-- Only team owners/admins can update team
CREATE POLICY "team_admins_update"
ON teams FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM team_members
    WHERE team_id = teams.id
    AND role IN ('owner', 'admin')
  )
);
```

---

## Authentication Security

### Secure Token Storage

```typescript
// ✅ GOOD - Supabase handles this automatically
// Tokens stored in secure storage (iOS Keychain, Android Keystore)
import { supabase } from '../api/client';

const { data } = await supabase.auth.signInWithPassword({
  email,
  password,
});
// Token automatically stored securely
```

### Session Management

```typescript
// ✅ Sessions auto-refresh
// No need to manually manage tokens

// Check session validity
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  router.push('/login');
}
```

---

## API Security Best Practices

### 1. Never Trust User Input

```typescript
// ❌ BAD - Trusts user input
const { gameId, userId } = req.body;  // User provided these!
await supabase.from('games').delete().eq('id', gameId);

// ✅ GOOD - Uses authenticated user
const { data: { user } } = await supabase.auth.getUser();
await supabase.from('games').delete()
  .eq('id', gameId)
  .eq('host_user_id', user.id);  // RLS ensures this
```

### 2. Validate Input

```typescript
// ✅ Validate before sending to database
const createGame = async (data) => {
  // Validate required fields
  if (!data.title || !data.sport) {
    throw new Error('Title and sport are required');
  }

  // Validate types
  if (typeof data.max_participants !== 'number') {
    throw new Error('Max participants must be a number');
  }

  // Validate ranges
  if (data.max_participants < 2 || data.max_participants > 100) {
    throw new Error('Max participants must be between 2 and 100');
  }

  // Now safe to insert
  await supabase.from('games').insert(data);
};
```

### 3. Sanitize Output

```typescript
// ✅ Don't expose sensitive data
const { data: user } = await supabase.from('users').select('*');

// Don't send everything to frontend
return {
  id: user.id,
  display_name: user.display_name,
  avatar_url: user.avatar_url,
  // ❌ Don't include: email, phone, password_hash, etc.
};
```

---

## Environment Variables

### Never Commit Secrets

```bash
# .gitignore (make sure this is included!)
.env
.env.local
.env.*.local
```

### Use Expo Secure Secrets

```javascript
// .env.local (never commit this!)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

// In code
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

---

## Security Checklist

### Before Launch

- [ ] All tables have RLS enabled
- [ ] All tables have policies for SELECT, INSERT, UPDATE, DELETE
- [ ] Sensitive data (emails, phone numbers) protected
- [ ] No secrets in code (use environment variables)
- [ ] API keys not committed to Git
- [ ] Password requirements enforced (min 6 chars)
- [ ] Email verification enabled (if needed)
- [ ] Rate limiting configured (in Supabase dashboard)

### Testing Security

```typescript
// Test: Can user A delete user B's game?
// Should fail with RLS error

const { error } = await supabase
  .from('games')
  .delete()
  .eq('id', 'game-owned-by-user-b');  // Trying to delete someone else's game

expect(error.code).toBe('PGRST301');  // Permission denied
```

---

## Common Vulnerabilities (and How We Prevent Them)

### SQL Injection

**Risk:** Malicious SQL in user input
**Prevention:** Supabase uses parameterized queries automatically

```typescript
// ✅ Safe - Supabase sanitizes input
await supabase.from('games').select('*').eq('title', userInput);
// Even if userInput = "'; DROP TABLE games; --"
// Supabase treats it as literal string, not SQL
```

### XSS (Cross-Site Scripting)

**Risk:** Malicious JavaScript in user content
**Prevention:** React escapes all strings automatically

```typescript
// ✅ Safe - React escapes HTML
<Text>{userInput}</Text>
// Even if userInput = "<script>alert('xss')</script>"
// Renders as text, doesn't execute
```

### Insecure Direct Object Reference (IDOR)

**Risk:** User accesses resources they shouldn't
**Prevention:** RLS policies

```typescript
// User tries to access someone else's profile
await supabase.from('profiles').select('*').eq('id', 'other-user-id');
// RLS policy checks: auth.uid() = user_id
// If not: returns empty, doesn't expose data
```

---

## Reporting Security Issues

If you find a security vulnerability:

1. **Don't** create a public GitHub issue
2. **Do** email security@realvictors.com (or team lead)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact

---

## Additional Resources

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [React Native Security](https://reactnative.dev/docs/security)
