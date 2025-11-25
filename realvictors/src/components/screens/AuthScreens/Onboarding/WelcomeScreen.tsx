import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40; // Container width with padding
const BUTTON_SIZE = 80;
const MAX_TRANSLATE = SLIDER_WIDTH - BUTTON_SIZE - 10; // Max distance button can travel

interface WelcomeScreenProps {
  userName?: string;
  onContinue?: () => void;
}

export const WelcomeScreen = ({ userName = 'User', onContinue }: WelcomeScreenProps) => {
  const offset = useSharedValue(0);
  const iconScale = useSharedValue(1);

  /**
   * Call onContinue when swipe completes
   */
  const handleSwipeComplete = () => {
    console.log('🎬 Swipe complete, calling onContinue');
    if (onContinue) {
      onContinue();
    }
  };

  /**
   * Pan gesture handler
   */
  const pan = Gesture.Pan()
    .onChange((event) => {
      // Only allow right swipes, clamp between 0 and MAX_TRANSLATE
      const newOffset = offset.value + event.changeX;
      if (newOffset >= 0 && newOffset <= MAX_TRANSLATE) {
        offset.value = newOffset;
      } else if (newOffset > MAX_TRANSLATE) {
        offset.value = MAX_TRANSLATE;
      } else {
        offset.value = 0;
      }
    })
    .onEnd(() => {
      console.log('👆 Swipe released - offset:', offset.value, 'max:', MAX_TRANSLATE);
      
      // If swiped more than 70% of the way, complete the swipe
      if (offset.value > MAX_TRANSLATE * 0.7) {
        console.log('✅ Threshold met, completing swipe');
        offset.value = withSpring(MAX_TRANSLATE, {}, () => {
          runOnJS(handleSwipeComplete)();
        });
      } else {
        console.log('↩️ Threshold not met, returning to start');
        offset.value = withSpring(0);
      }
    });

  /**
   * Animate the arrow icon pulse on mount
   */
  useEffect(() => {
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1, // Infinite repeat
      false
    );
  }, []);

  /**
   * Animated style for button translation
   */
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  /**
   * Animated style for icon scale
   */
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  /**
   * Animated style for text opacity (fades out as button moves)
   */
  const textStyle = useAnimatedStyle(() => {
    const opacity = 1 - offset.value / (MAX_TRANSLATE * 0.3);
    return {
      opacity: opacity < 0 ? 0 : opacity,
    };
  });

  /**
   * Animated style for button color (gray to gold)
   */
  const buttonColorStyle = useAnimatedStyle(() => {
    'worklet';
    const progress = offset.value / MAX_TRANSLATE;
    
    // Start transitioning to gold at 15% and complete by 85%
    const colorProgress = Math.min(Math.max((progress - 0.15) / 0.7, 0), 1);
    
    // Interpolate between gray (#827F7F) and gold (#FFC245)
    const r = Math.round(130 + (255 - 130) * colorProgress);
    const g = Math.round(127 + (194 - 127) * colorProgress);
    const b = Math.round(127 + (69 - 127) * colorProgress);
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {/* Background Image */}
        <View style={styles.backgroundContainer}>
          <View style={styles.overlay} />
          <Image
            source={require('../../../../assets/MockData/Onboarding/Messi_Gold.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to Real Victors {userName}</Text>
            <Text style={styles.subtitle}>Are you ready to set up your account?</Text>
          </View>

          {/* Swipe to Continue */}
          <View style={styles.swipeContainer}>
            {/* Text that fades out */}
            <Animated.View style={[styles.swipeTextContainer, textStyle]} pointerEvents="none">
              <Text style={styles.swipeText}>Swipe to continue</Text>
            </Animated.View>

            {/* Swipe Button */}
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.swipeButton, buttonStyle, buttonColorStyle]}>
                <Animated.View style={iconStyle}>
                  <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
                </Animated.View>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 60,
    zIndex: 2,
  },
  textContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 10,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  swipeContainer: {
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 5,
  },
  swipeButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#827F7F', // Will be overridden by animated style
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC245',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    position: 'absolute',
    left: 5,
  },
  swipeTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: -0.3,
  },
});

export default WelcomeScreen;

