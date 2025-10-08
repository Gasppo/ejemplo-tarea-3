import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
  color: string;
  title: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

const SwipeableCard = ({ color, title, onSwipeLeft, onSwipeRight }: Props) => {
  const translateX = useSharedValue(0);
  const [dismissed, setDismissed] = React.useState(false);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe right
        translateX.value = withSpring(SCREEN_WIDTH);
        if (onSwipeRight) {
          runOnJS(onSwipeRight)();
        }
        runOnJS(setDismissed)(true);
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe left
        translateX.value = withSpring(-SCREEN_WIDTH);
        if (onSwipeLeft) {
          runOnJS(onSwipeLeft)();
        }
        runOnJS(setDismissed)(true);
      } else {
        // Return to center
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate}deg` },
      ],
      opacity,
    };
  });

  const leftActionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const rightActionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  if (dismissed) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionIcon, styles.leftAction, leftActionStyle]}>
        <Text style={styles.actionText}>✓</Text>
      </Animated.View>
      <Animated.View style={[styles.actionIcon, styles.rightAction, rightActionStyle]}>
        <Text style={styles.actionText}>✗</Text>
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, { backgroundColor: color }, animatedStyle]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.instruction}>Deslizá a la izquierda o derecha</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.arrow}>←</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 120,
    marginVertical: 10,
    position: 'relative',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instruction: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  arrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    zIndex: -1,
  },
  leftAction: {
    left: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
  },
  rightAction: {
    right: 20,
    backgroundColor: '#F44336',
    borderRadius: 30,
  },
  actionText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
