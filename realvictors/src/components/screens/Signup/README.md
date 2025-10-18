# Signup Screen Components

This directory contains the signup flow components that match the Figma designs 100%.

## Components

### MainSignupPage (Orchestrator)
The main component that manages the entire signup flow internally using state-based navigation.

**Features:**
- Self-contained navigation (no external router needed)
- Forward/backward step management
- Data collection and passing between steps
- Easy to add new signup steps
- Clean separation of concerns

**Props:**
```typescript
interface MainSignupPageProps {
  onComplete?: (data: SignupData) => void;
  initialStep?: 'email' | 'password' | 'profile' | 'verification';
}
```

**Usage:**
```typescript
import { MainSignupPage } from '@/components/screens/Signup';

<MainSignupPage 
  onComplete={(data) => {
    // Handle signup completion
    console.log('Email:', data.email);
    console.log('Password:', data.password);
  }}
/>
```

### CreateEmail
The first screen in the signup flow where users enter their email address.

**Features:**
- Email input with focus state and animations
- Active border glow when focused (yellow #FFC245)
- Social login buttons (Google, Apple)
- Progress indicator showing 1/4
- Dynamic button state (gray when empty, yellow when filled)
- "I have an account" link

**Props:**
```typescript
interface CreateEmailProps {
  onContinue?: (email: string) => void;
  navigation?: any;
}
```

### CreatePassword
The password creation screen where users set their account password.

**Features:**
- Password input with show/hide toggle (eye icon)
- Real-time password validation with animated checkmarks
- Three requirements tracked:
  - At least 5 characters
  - 1 uppercase letter
  - 1 special character
- Progress indicator showing 2/4
- Dynamic button (gray when invalid, yellow when all requirements met)
- Smooth animations for checkmarks using React Native Animated API

**Props:**
```typescript
interface CreatePasswordProps {
  onContinue?: (password: string) => void;
  navigation?: any;
  route?: any; // Contains email from previous screen
}
```

### CreateName
The profile creation screen where users enter their personal information.

**Features:**
- Full name input with validation (min 2 characters)
- Username input with validation (min 3 characters, alphanumeric + underscore only)
- Gender dropdown selector (Male, Female, Other) with modal picker
- Date of birth input with auto-formatting (MM/DD/YYYY)
- Calendar icon for date field
- Progress indicator showing 3/4
- Error handling with red borders and error messages
- Dynamic button (gray when incomplete, yellow when all fields filled)
- Real-time validation feedback
- Smooth modal animation for gender selection

**Props:**
```typescript
interface CreateNameProps {
  onContinue?: (data: { fullName: string; username: string; gender: string; dateOfBirth: string }) => void;
  navigation?: any;
  route?: any; // Contains email and password from previous screens
}
```

## Usage

### Recommended: Use MainSignupPage
This is the easiest and cleanest approach:

```typescript
import { MainSignupPage } from '@/components/screens/Signup';

export default function SignupScreen() {
  const { signUp } = useAuth();

  const handleSignupComplete = async (data) => {
    const result = await signUp(data.email, data.password);
    // Handle result
  };

  return <MainSignupPage onComplete={handleSignupComplete} />;
}
```

### Adding New Steps to MainSignupPage
To add more signup steps (e.g., phone verification):

1. Create your new component (e.g., `CreateVerification.tsx`)
2. Add the step type to `MainSignupPage.tsx`:
```typescript
type SignupStep = 'email' | 'password' | 'name' | 'verification';
```
3. Add the case to the switch statement:
```typescript
case 'verification':
  return (
    <CreateVerification
      onContinue={handleVerificationContinue}
      navigation={{ goBack: goToPreviousStep }}
      route={{ params: { phoneNumber: signupData.phoneNumber } }}
    />
  );
```
4. Create the handler:
```typescript
const handleVerificationContinue = (code: string) => {
  const updatedData = { ...signupData, verificationCode: code };
  setSignupData(updatedData);
  if (onComplete) {
    onComplete(updatedData); // Last step
  }
};
```

### Alternative: Standalone Usage
If you need individual components outside the signup flow:

```typescript
import { CreateEmail, CreatePassword, CreateName } from '@/components/screens/Signup';

<CreateEmail 
  onContinue={(email) => console.log('Email:', email)}
  navigation={{ goBack: () => router.back() }}
/>

<CreateName
  onContinue={(data) => console.log('Name data:', data)}
  navigation={{ goBack: () => router.back() }}
/>
```

## Design Specifications

### Colors
- Primary Yellow: `#FFC245`
- Background: `#FFFFFF`
- Text Primary: `#000000`
- Text Secondary: `#827F7F`
- Input Background: `#EFEFEF`
- Border Active: `#FFC245`
- Button Inactive: `#827F7F`
- Button Active: `#FFC245`

### Typography
- Title: 30px, Bold, Letter spacing -0.5
- Subtitle: 18px, Regular, Letter spacing -0.5
- Input: 18px, Medium, Letter spacing -0.5
- Button: 18px, Bold, Letter spacing -0.5
- Progress: 10px, Bold, Letter spacing -0.5

### Spacing
- Padding Horizontal: 20px
- Input Padding: 25px
- Section Gap: 40-50px
- Button Border Radius: 500px
- Input Border Radius: 10px

## Animations

### Password Checkmarks
Each checkmark uses `Animated.spring` with:
- Tension: 50
- Friction: 7
- Scale interpolation: 0.3 → 1.1 → 1.0 (bounce effect)

### Input Focus
Smooth shadow transition when input is focused using:
- Shadow Color: `#D7B015`
- Shadow Opacity: 0.5
- Shadow Radius: 6
- Elevation: 5 (Android)

## State Management

Both components maintain their own state and can work independently or as part of a navigation flow. They support:
- Local state management for inputs
- Callback props for parent control
- Navigation integration for screen flow
- Route params for data passing

## Figma Designs
- CreateEmail: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--Copy-?node-id=4574-7012)
- CreatePassword: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--Copy-?node-id=4574-8183)
- CreateName: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--Copy-?node-id=4577-9012)

