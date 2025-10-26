# Onboarding Screen Components

This directory contains the onboarding flow components that match the Figma designs 100%.

## Components

### MainOnboardingPage (Orchestrator)
The main component that manages the entire onboarding flow internally using state-based navigation.

**Features:**
- Self-contained navigation (no external router needed)
- Forward/backward step management
- Data collection and passing between steps
- Easy to add new onboarding steps
- Clean separation of concerns

**Props:**
```typescript
interface MainOnboardingPageProps {
  userName?: string;
  onComplete?: (data: OnboardingData) => void;
  initialStep?: 'welcome' | 'sports' | 'skills' | 'profile' | 'location';
}
```

**Usage:**
```typescript
import { MainOnboardingPage } from '@/components/screens/Onboarding';

<MainOnboardingPage 
  userName="John Doe"
  onComplete={(data) => {
    // Handle onboarding completion
    console.log('Onboarding data:', data);
  }}
/>
```

### WelcomeScreen
The first screen in the onboarding flow that welcomes the user with their name.

**Features:**
- Dynamic user name display
- Background image with overlay
- Swipe-to-continue gesture with animations
- Animated arrow icon with pulse effect
- Visual feedback during swipe
- Smooth spring animations
- Progress indicator as swipe extends

**Props:**
```typescript
interface WelcomeScreenProps {
  userName?: string;
  onContinue?: () => void;
}
```

**Animations:**
- **Swipe Gesture**: PanResponder for touch handling
- **Arrow Pulse**: Continuous loop animation (scale 1.0 → 1.2 → 1.0)
- **Swipe Progress**: Real-time visual feedback
- **Spring Return**: Smooth return if swipe doesn't reach threshold
- **Completion**: Full-width animation on successful swipe

### ChooseSport
The second screen in the onboarding flow that allows users to select their sports.

**Features:**
- Multi-select grid of sport options (max 3 selections)
- Visual feedback for selected sports
- Progress bar indicating step completion
- Emoji icons for each sport
- Selection counter
- Continue button enabled only when at least one sport is selected
- Back navigation support

**Props:**
```typescript
interface ChooseSportProps {
  onContinue?: (sports: string[]) => void;
  navigation?: {
    goBack: () => void;
  };
}
```

**Available Sports:**
- Soccer ⚽
- Football 🏈
- Tennis 🎾
- Basketball 🏀
- Baseball ⚾
- Hockey 🏒

**Validation:**
- At least 1 sport must be selected to continue
- Maximum of 3 sports can be selected

### ChooseSkillLevel
The third screen in the onboarding flow that allows users to set their skill level for each selected sport.

**Features:**
- Dynamic skill level selection for each previously selected sport
- Visual skill bar with gradient colors (yellow → orange → red)
- Button-based selection (Beginner/Intermediate/Expert)
- Visual feedback for current selection
- Animated skill bars that fill based on selection
- Progress bar at 40%

**Props:**
```typescript
interface ChooseSkillLevelProps {
  selectedSports: string[];
  onContinue?: (skillLevels: Record<string, string>) => void;
  navigation?: {
    goBack: () => void;
  };
}
```

**Skill Levels:**
- **Beginner** (0): Yellow bars - Just starting out
- **Intermediate** (1): Orange bars - Comfortable with basics
- **Expert** (2): Red bars - Highly skilled

### PhysicalStats
The fourth screen in the onboarding flow for optional physical stats input.

**Features:**
- Height input (feet and inches)
- Weight input (pounds)
- Optional fields (can skip)
- Real-time validation
- Error messages for invalid inputs
- Automatic unit conversion (imperial → metric)
- Progress bar at 60%

**Props:**
```typescript
interface PhysicalStatsProps {
  onContinue?: (stats: { height_cm?: number; weight_kg?: number }) => void;
  navigation?: {
    goBack: () => void;
  };
}
```

**Validation:**
- Height: 3-8 feet
- Inches: 0-11
- Weight: 50-800 lbs
- Both fields are optional

**Conversions:**
- Height: Feet/inches → Centimeters
- Weight: Pounds → Kilograms (1 decimal place)

### ProfilePicture
The fifth screen in the onboarding flow for profile picture upload.

**Features:**
- Camera photo capture
- Photo library selection
- Permission handling for camera and photos
- Image preview
- Cropping to square aspect ratio (1:1)
- Skip option
- Professional photo tip
- Progress bar at 80%

**Props:**
```typescript
interface ProfilePictureProps {
  onContinue?: (imageUri?: string) => void;
  navigation?: {
    goBack: () => void;
  };
}
```

**Permissions:**
- Camera access for taking photos
- Photo library access for selecting existing photos
- Graceful handling if permissions denied

**Tips:**
- Suggests using professional photo
- Recommends sports kit photo
- Emphasizes clear face visibility

### LocationAccess
The final screen in the onboarding flow for location permission and manual input.

**Features:**
- Location permission request
- Automatic location detection
- Reverse geocoding (coordinates → city/country)
- Manual city/country input fallback
- Skip option with confirmation
- Progress bar at 100%

**Props:**
```typescript
interface LocationAccessProps {
  onContinue?: (location: LocationData) => void;
  navigation?: {
    goBack: () => void;
  };
}

interface LocationData {
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

**Location Flow:**
1. User taps "Allow" → Requests permission
2. If granted → Gets GPS coordinates + reverse geocodes to city
3. If denied → Shows manual input option
4. Manual input → User enters city (required) and country (optional)
5. Skip → Continues without location (with confirmation)

## Usage

### Recommended: Use MainOnboardingPage
This is the easiest and cleanest approach:

```typescript
import { MainOnboardingPage } from '@/components/screens/Onboarding';

export default function OnboardingScreen() {
  const { user, refreshAuth } = useAuth();

  const handleOnboardingComplete = async (data) => {
    await AuthController.completeOnboarding(user.id, data);
    await refreshAuth();
  };

  return (
    <MainOnboardingPage 
      userName={user?.displayName || 'User'}
      onComplete={handleOnboardingComplete} 
    />
  );
}
```

### Adding New Steps to MainOnboardingPage
To add more onboarding steps (e.g., skills, profile):

1. Create your new component (e.g., `SkillsSelection.tsx`)
2. The step type is already defined in `MainOnboardingPage.tsx`:
```typescript
type OnboardingStep = 'welcome' | 'sports' | 'skills' | 'profile' | 'location';
```
3. Add the case to the switch statement:
```typescript
case 'skills':
  return (
    <SkillsSelection
      selectedSports={onboardingData.primary_sports}
      onContinue={handleSkillsContinue}
      navigation={{ goBack: goToPreviousStep }}
    />
  );
```
4. Create the handler:
```typescript
const handleSkillsContinue = (skillLevels: Record<string, string>) => {
  setOnboardingData({ ...onboardingData, skill_levels: skillLevels });
  goToNextStep();
};
```

### Current Flow
1. **WelcomeScreen** → User is welcomed by name with swipe gesture
2. **ChooseSport** → User selects up to 3 sports (min 1, max 3)
3. **ChooseSkillLevel** → User sets skill level for each selected sport
4. **PhysicalStats** → User optionally enters height and weight
5. **ProfilePicture** → User optionally uploads a profile picture
6. **LocationAccess** → User grants location access or enters city manually
7. **Complete** → Data submitted and user navigated to main app

### Alternative: Standalone Usage
If you need individual components outside the onboarding flow:

**WelcomeScreen:**
```typescript
import { WelcomeScreen } from '@/components/screens/Onboarding';

<WelcomeScreen 
  userName="John Doe"
  onContinue={() => console.log('Continue pressed')}
/>
```

**ChooseSport:**
```typescript
import { ChooseSport } from '@/components/screens/Onboarding';

<ChooseSport 
  onContinue={(sports) => console.log('Selected sports:', sports)}
  navigation={{ goBack: () => console.log('Go back') }}
/>
```

**ChooseSkillLevel:**
```typescript
import { ChooseSkillLevel } from '@/components/screens/Onboarding';

<ChooseSkillLevel
  selectedSports={['soccer', 'basketball']}
  onContinue={(levels) => console.log('Skill levels:', levels)}
  navigation={{ goBack: () => console.log('Go back') }}
/>
```

**PhysicalStats:**
```typescript
import { PhysicalStats } from '@/components/screens/Onboarding';

<PhysicalStats
  onContinue={(stats) => console.log('Stats:', stats)}
  navigation={{ goBack: () => console.log('Go back') }}
/>
```

**ProfilePicture:**
```typescript
import { ProfilePicture } from '@/components/screens/Onboarding';

<ProfilePicture
  onContinue={(uri) => console.log('Image URI:', uri)}
  navigation={{ goBack: () => console.log('Go back') }}
/>
```

**LocationAccess:**
```typescript
import { LocationAccess } from '@/components/screens/Onboarding';

<LocationAccess
  onContinue={(location) => console.log('Location:', location)}
  navigation={{ goBack: () => console.log('Go back') }}
/>
```

## Design Specifications

### Colors
- Background Overlay: `rgba(0, 0, 0, 0.4)`
- Primary Yellow: `#FFC245`
- White Text: `#FFFFFF`
- Secondary Text: `rgba(255, 255, 255, 0.8)`
- Swipe Track Background: `rgba(255, 255, 255, 0.1)`

### Typography
- Title: 28px, Bold, Letter spacing -0.5
- Subtitle: 16px, Regular, Letter spacing -0.3
- Swipe Text: 16px, SemiBold, Letter spacing -0.3

### Spacing
- Container Padding: 20px horizontal
- Bottom Padding: 60px
- Text Container Gap: 10px
- Swipe Height: 80px
- Swipe Button Size: 80x80px

### Animations

#### Swipe Gesture
- **Threshold**: 30% of screen width
- **Spring Config**: Tension: 50, Friction: 7
- **Shadow**: Yellow glow on swipe button

#### Arrow Pulse
- **Duration**: 1000ms per cycle
- **Scale Range**: 1.0 → 1.2 → 1.0
- **Loop**: Continuous

#### Progress Feedback
- Swipe button translates with gesture
- Background expands as user swipes
- Text fades out during swipe
- Icon translates faster than button (parallax effect)

## State Management

The MainOnboardingPage maintains its own state and can work independently. It supports:
- Local state management for the flow
- Callback props for parent control
- Data collection across steps
- Completion callback when done

## Figma Designs
- WelcomeScreen: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4582-4465)
- ChooseSport: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4585-5891)
- ChooseSkillLevel: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4585-6968)
- PhysicalStats: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4631-6480)
- ProfilePicture: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4638-7287)
- LocationAccess: [Design Link](https://www.figma.com/design/eVsD6bkqjxlNECMphWggi6/Real-Victors-App--dev-?node-id=4652-6517)

## Integration with Signup

The onboarding flow receives the user's name from the signup process:

```typescript
// In onboarding.tsx
const userName = user?.displayName || signupData?.fullName || 'User';

<MainOnboardingPage 
  userName={userName}
  onComplete={handleOnboardingComplete}
/>
```

This ensures the welcome message is personalized with the name the user entered during signup.

