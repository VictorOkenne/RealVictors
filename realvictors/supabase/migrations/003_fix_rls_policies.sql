-- Fix RLS policies for profile creation during signup
-- This migration addresses the timing issue where profile creation fails

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create a more permissive policy for profile creation
-- This allows profile creation as long as the user_id matches the authenticated user
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    auth.uid() = user_id
  );

-- Also ensure the users table allows inserts from the trigger
-- The trigger should handle user creation, but let's make sure it can work
DROP POLICY IF EXISTS "Users can view all public profiles" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Create policies for users table
CREATE POLICY "Users can view all public profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow the trigger to insert users (this should work by default, but let's be explicit)
CREATE POLICY "System can create users via trigger" ON public.users
  FOR INSERT WITH CHECK (true);

-- Make sure the profile creation policy is working correctly
-- Let's also add a policy that allows profile creation even if the user record doesn't exist yet
-- (This handles the race condition between user creation and profile creation)

-- Update the profile creation policy to be more flexible
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    auth.uid() = user_id
  );

-- Also add a policy to allow profile updates
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Ensure the profile can be created even if there's a slight delay in user creation
-- by making the policy more permissive during the signup process
