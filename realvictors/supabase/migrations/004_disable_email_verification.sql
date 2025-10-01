-- Disable email verification for development
-- This allows users to sign up and sign in without email confirmation

-- Update auth configuration to disable email confirmation
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_email_confirmations = false,
  enable_email_change_confirmations = false,
  enable_phone_confirmations = false
WHERE id = 1;

-- If the above doesn't work, we can also try updating the auth settings directly
-- This is a more direct approach
ALTER TABLE auth.users 
ALTER COLUMN email_confirmed_at SET DEFAULT NOW();

-- Update existing users to have confirmed emails
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;
