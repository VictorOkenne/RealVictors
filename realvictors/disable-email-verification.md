# Disable Email Verification in Supabase

## Manual Steps to Fix Email Verification Issue

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Click on "VictorOkenne's Project"

2. **Navigate to Authentication Settings:**
   - In the left sidebar, click "Authentication"
   - Click "Settings" (or "Configuration")

3. **Disable Email Confirmation:**
   - Find "Email Confirmation" section
   - **Uncheck** "Enable email confirmations"
   - **Uncheck** "Enable email change confirmations" 
   - **Uncheck** "Enable phone confirmations"

4. **Save Changes:**
   - Click "Save" or "Update" button

5. **Alternative: Update Existing Users:**
   - Go to "Authentication" → "Users"
   - For each user that shows "Unconfirmed", click on them
   - Manually set their email as confirmed

## Quick SQL Fix (if you have database access):

```sql
-- Update all users to have confirmed emails
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- Disable email confirmation requirement
UPDATE auth.config 
SET 
  enable_email_confirmations = false,
  enable_email_change_confirmations = false
WHERE id = 1;
```

## Test After Changes:

1. Try signing up with a new email
2. Try signing in with existing emails
3. Check that no "Email not confirmed" errors appear

This should resolve both the "Email not confirmed" and "JWT user does not exist" errors.
