import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from 'react-native-reanimated';

type Props = {
  color: string;
  label: string;
};

const RotatableSquare = ({ color, label }: Props) => {
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const rotationGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd((event) => {
      savedRotation.value = rotation.value;
      // Add decay animation for natural feel
      rotation.value = withDecay({
        velocity: event.velocity / 1000,
        deceleration: 0.998,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}rad` }],
  }));

  return (
    <GestureDetector gesture={rotationGesture}>
      <Animated.View style={[styles.square, { backgroundColor: color }, animatedStyle]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.instruction}>Rota con 2 dedos</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default RotatableSquare;

const styles = StyleSheet.create({
  square: {
    width: 120,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.9,
  },
});
