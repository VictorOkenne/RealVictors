import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface NavigationHeaderProps {
  /** Callback when back button is pressed */
  onBack?: () => void;
  /** Right side content (e.g., progress indicator) */
  rightContent?: React.ReactNode;
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * NavigationHeader - Header with back button
 * 
 * Features:
 * - Back button with chevron icon
 * - Optional right side content
 * - Consistent spacing and styling
 */
export const NavigationHeader = ({ 
  onBack, 
  rightContent,
  containerStyle,
}: NavigationHeaderProps) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity 
        onPress={onBack} 
        style={styles.backButton}
        activeOpacity={0.6}
      >
        <Ionicons name="chevron-back" size={30} color="#000000" />
      </TouchableOpacity>
      {rightContent && (
        <View style={styles.rightContent}>
          {rightContent}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NavigationHeader;

