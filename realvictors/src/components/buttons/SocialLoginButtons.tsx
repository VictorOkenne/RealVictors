import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SocialLoginButtonsProps {
  /** Google login callback */
  onGooglePress?: () => void;
  /** Apple login callback */
  onApplePress?: () => void;
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * Google Icon SVG
 */
const GoogleIcon = () => (
  <Svg width={25} height={25} viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </Svg>
);

/**
 * Apple Icon SVG
 */
const AppleIcon = () => (
  <Svg width={25} height={25} viewBox="0 0 24 24" fill="#000000">
    <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.55-2.08-.56-3.24 0-1.44.71-2.2.55-3.06-.36C1.44 14.05 2.3 6.18 9.04 5.86c1.65.08 2.8.87 3.78.86 1.44-.21 2.82-1.05 4.33-.95 1.83.14 3.2.84 4.05 2.15-3.72 2.22-2.83 7.12.79 8.48-.48 1.25-.98 2.48-2.94 3.88zM12.05 5.73c-.18-2.61 1.91-4.68 4.38-4.86.41 3.05-2.77 5.32-4.38 4.86z"/>
  </Svg>
);

/**
 * SocialLoginButtons - Google and Apple login buttons
 * 
 * Features:
 * - Circular button design
 * - Brand-accurate icons
 * - Consistent styling
 */
export const SocialLoginButtons = ({ 
  onGooglePress, 
  onApplePress,
  containerStyle,
}: SocialLoginButtonsProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.7}
        onPress={onGooglePress}
      >
        <GoogleIcon />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.7}
        onPress={onApplePress}
      >
        <AppleIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 26,
    paddingVertical: 20,
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialLoginButtons;

