# Login Flow Components

This directory contains all the components for the multi-step login flow.

## Flow Overview

```
EmailEntry → PasswordEntry → LoginSuccess → Home
```

## Components

### MainLoginPage.tsx
**Main orchestrator component that manages the entire login flow**

- Handles screen transitions with animations
- Manages form state (email, password)
- Handles error state and display
- Coordinates with AuthContext for authentication
- Props:
  - `onComplete`: Callback function that handles login authentication
  - `isLoading`: Boolean indicating loading state

### EmailEntry.tsx
**Step 1: Email input screen**

- Email input with validation
- "I can't access this email" link
- "I'm new here" link (navigates to signup)
- Social login buttons (Google, Apple)
- Clear button for email input
- Error display
- Props:
  - `onContinue`: Callback when user submits email
  - `hasError`: Boolean for error state
  - `errorMessage`: Error message to display
  - `onGoogleLogin`: Google OAuth callback
  - `onAppleLogin`: Apple OAuth callback
  - `isLoading`: Loading state

### PasswordEntry.tsx
**Step 2: Password input screen**

- Password input with show/hide toggle
- "Forgot password?" link
- Social login buttons (Google, Apple)
- Props:
  - `onSubmit`: Callback when user submits password
  - `onForgotPassword`: Forgot password link callback
  - `onGoogleLogin`: Google OAuth callback
  - `onAppleLogin`: Apple OAuth callback
  - `isLoading`: Loading state

### LoginSuccess.tsx
**Step 3: Success screen**

- Checkmark animation
- Success message
- Auto-redirects to home after 1.5 seconds

## Design System

### Colors
- **Primary Yellow**: `#FFC245` - Active states, progress indicator, buttons
- **Dark Gray**: `#827F7F` - Inactive buttons, placeholder text
- **Black**: `#000000` - Text, borders
- **Light Gray**: `#EFEFEF` - Input backgrounds
- **Red**: `#FF3B30` - Error states
- **White**: `#FFFFFF` - Background

### Typography
- **Title**: 30px, Bold (700)
- **Subtitle**: 18px, Regular (400)
- **Input**: 18px, Medium (500)
- **Button**: 18px, Bold (700)
- **Link**: 18px, Regular (400)

### Spacing
- **Screen padding**: 20px horizontal
- **Top padding**: 138px (accounts for header)
- **Section gap**: 50px
- **Form element gap**: 20px
- **Button margin top**: 30px

### Components
- **Input fields**: 
  - Padding: 25px
  - Border radius: 10px
  - Active border: Yellow with shadow
  - Error border: Red with shadow
- **Buttons**: 
  - Padding: 20px vertical
  - Border radius: 500px (fully rounded)
  - Active: Yellow background
  - Inactive: Gray background
- **Social buttons**:
  - Size: 65x65px
  - Border radius: 32.5px
  - Border: 1px black

## Usage Example

```tsx
import { MainLoginPage } from '@/components/screens/Login';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();

  const handleLoginComplete = async (email: string, password: string) => {
    const result = await signIn(email, password);
    return result;
  };

  return (
    <MainLoginPage 
      onComplete={handleLoginComplete}
      isLoading={isLoading}
    />
  );
}
```

## Flow Logic

1. **Email Entry**
   - User enters email
   - Validates email format
   - On success: Slides to Password Entry
   - On error: Shows error message

2. **Password Entry**
   - User enters password
   - On submit: Calls authentication
   - On success: Shows success screen, redirects to home
   - On error: Returns to Email Entry with error message

3. **Login Success**
   - Shows success message
   - Auto-redirects after 1.5 seconds

## Navigation

- Back button on header navigates to previous screen
- Progress indicator shows current step (1/2 or 2/2)
- Screen 3 (success) has no back button (auto-redirects)

## Error Handling

Errors are displayed on the Email Entry screen:
- Email field gets red border
- Error message appears below email field
- "I can't access this email" link turns red

## Social Authentication

Social login buttons are available on both Email and Password screens:
- Google OAuth (coming soon)
- Apple Sign In (coming soon)

## Animations

- **Screen transitions**: 400ms slide animation
- **Progress indicator**: Fills from half-circle to full circle
- Uses React Native's Animated API with native driver

