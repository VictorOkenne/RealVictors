import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressIndicatorProps {
  /** Current step */
  current: number;
  /** Total steps */
  total: number;
  /** Style variant */
  variant?: 'circular' | 'linear';
  /** Container style */
  containerStyle?: ViewStyle;
}

/**
 * ProgressIndicator - Progress indicator component
 * 
 * Variants:
 * - circular: Shows progress in a circular indicator with text (e.g., "1/4")
 * - linear: Shows progress as a horizontal bar
 */
export const ProgressIndicator = ({ 
  current, 
  total, 
  variant = 'circular',
  containerStyle,
}: ProgressIndicatorProps) => {
  const progress = current / total;

  if (variant === 'linear') {
    return (
      <View style={[styles.linearContainer, containerStyle]}>
        <View style={styles.linearBackground}>
          <View 
            style={[
              styles.linearFill, 
              { width: `${progress * 100}%` }
            ]} 
          />
        </View>
      </View>
    );
  }

  // Circular variant with actual pie chart
  const size = 30;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <View style={[styles.circularContainer, containerStyle]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle (pie chart effect) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFC245"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.progressText}>{current}/{total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Circular variant
  circularContainer: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  progressText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
    zIndex: 1,
  },
  // Linear variant
  linearContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  linearBackground: {
    width: '100%',
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 500,
    overflow: 'hidden',
  },
  linearFill: {
    height: '100%',
    backgroundColor: '#FFC245',
    borderRadius: 500,
  },
});

export default ProgressIndicator;

