import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface TitleSectionProps {
  /** Main title text */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * TitleSection - Title and subtitle header component
 * 
 * Features:
 * - Large bold title
 * - Smaller subtitle
 * - Consistent typography and spacing
 */
export const TitleSection = ({ 
  title, 
  subtitle,
  containerStyle,
}: TitleSectionProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
});

export default TitleSection;

