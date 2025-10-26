# Font Setup Instructions

## Fonts Currently Installed

### ✅ Orbitron (Google Font)
- **Status**: ✅ Installed via `@expo-google-fonts/orbitron`
- **Usage**: Available in constants as `TYPOGRAPHY.fontFamily.orbitron`, `orbitronMedium`, `orbitronBold`
- **Used for**: Time display in UpcomingGameCard

## Fonts To Be Added

### ❌ Satoshi (Commercial Font)
- **Status**: ❌ Not installed (commercial font)
- **Current Fallback**: Using `System` font
- **Usage**: Intended for all other text in UpcomingGameCard

## How to Add Satoshi Font

### Step 1: Obtain Satoshi Font Files
1. Purchase or download Satoshi font from [Indian Type Foundry](https://fontshare.com/fonts/satoshi)
2. You'll need these weight files:
   - `Satoshi-Medium.otf` (500 weight)
   - `Satoshi-Bold.otf` (700 weight)

### Step 2: Add Font Files to Project
1. Create `assets/fonts/` directory in project root
2. Copy the font files into `assets/fonts/`:
   ```
   assets/
     fonts/
       Satoshi-Medium.otf
       Satoshi-Bold.otf
   ```

### Step 3: Update Font Loading
Update `app/_layout.tsx` to include Satoshi fonts:

```typescript
const [fontsLoaded] = useFonts({
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_700Bold,
  // Add these lines after adding font files:
  'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.otf'),
  'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
});
```

### Step 4: Update Constants
Update `src/constants/index.ts`:

```typescript
// Custom fonts for specific components
satoshi: 'Satoshi-Medium', // Update from 'System'
satoshiMedium: 'Satoshi-Medium', // Update from 'System'
satoshiBold: 'Satoshi-Bold', // Update from 'System'
```

## Current State

The app is currently configured to:
- ✅ Use Orbitron for time display (working)
- ⚠️ Use System font for all other text (temporary fallback)

Once Satoshi fonts are added following the steps above, all typography will match the design specifications exactly.

## Alternative Solutions

If Satoshi font is not available, you can:

1. **Use a similar font**: Replace Satoshi references with `TYPOGRAPHY.fontFamily.medium` (Montserrat)
2. **Use Inter font**: Install `@expo-google-fonts/inter` as a close alternative
3. **Use system fonts**: Keep current `System` fallback for native look

## Testing

After adding fonts, test the UpcomingGameCard component to ensure:
- Time displays in Orbitron Bold
- All other text displays in Satoshi Medium
- Fonts load properly on both iOS and Android
