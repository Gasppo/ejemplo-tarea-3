import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type Props = {
  imageUri: string;
};

const PinchableImage = ({ imageUri }: Props) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      // Reset if scaled too small or too large
      if (scale.value < 0.8) {
        scale.value = withSpring(1);
        savedScale.value = 1;
      } else if (scale.value > 3) {
        scale.value = withSpring(3);
        savedScale.value = 3;
      }
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
      } else {
        scale.value = withSpring(2);
        savedScale.value = 2;
      }
    });

  const composed = Gesture.Race(doubleTap, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.imageWrapper, animatedStyle]}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default PinchableImage;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
