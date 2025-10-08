import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type Props = {
  color: string;
  label: string;
};

const LongPressButton = ({ color, label }: Props) => {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);
  const activated = useSharedValue(0);

  const longPress = Gesture.LongPress()
    .minDuration(800)
    .onStart(() => {
      scale.value = withSpring(0.95);
      progress.value = withTiming(1, {
        duration: 800,
        easing: Easing.linear,
      });
    })
    .onEnd(() => {
      scale.value = withSpring(1.1);
      activated.value = 1;
      
      // Reset después de 300ms
      scale.value = withDelay(300, withSpring(1));
      progress.value = withDelay(300, withTiming(0));
      activated.value = withDelay(300, withTiming(0));
    })
    .onFinalize(() => {
      if (progress.value < 1) {
        scale.value = withSpring(1);
        progress.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const activatedStyle = useAnimatedStyle(() => ({
    opacity: activated.value,
    transform: [{ scale: activated.value }],
  }));

  return (
    <GestureDetector gesture={longPress}>
      <Animated.View style={[styles.button, { backgroundColor: color }, animatedStyle]}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.instruction}>Mantené 0.8s</Text>
        <Animated.Text style={[styles.activated, activatedStyle]}>
          ✓ ¡Activado!
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default LongPressButton;

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instruction: {
    color: 'white',
    fontSize: 10,
    opacity: 0.9,
  },
  activated: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    top: 8,
    right: 8,
  },
});
