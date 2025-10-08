import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';

type Props = {
    color: string;
};

const DoubleTapHeart = ({ color }: Props) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            // Animate the heart scaling up and fading out
            scale.value = withSequence(
                withSpring(1.5, { duration: 300 }),
                withSpring(1),
            );
            opacity.value = withSequence(
                withSpring(1),
                withSpring(0, { duration: 300 })
            );
        });

    const animatedHeartStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const animatedBoxStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
            <Animated.View style={[styles.box, { backgroundColor: color }, animatedBoxStyle]}>
                <Text style={styles.label}>Doble Tap</Text>
                <Text style={styles.emoji}>❤️</Text>
                <Text style={styles.instruction}>¡Tocá dos veces!</Text>
                <Animated.View style={[styles.heart, animatedHeartStyle]}>
                    <Text style={styles.bigEmoji}>❤️</Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
};

export default DoubleTapHeart;

const styles = StyleSheet.create({
    box: {
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
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    emoji: {
        fontSize: 30,
        marginVertical: 4,
    },
    instruction: {
        color: 'white',
        fontSize: 10,
        opacity: 0.9,
    },
    heart: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -40,
        marginTop: -40,
    },
    bigEmoji: {
        fontSize: 80,
    },
});
