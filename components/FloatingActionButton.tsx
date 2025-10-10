import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    onPress: () => void
}

const FloatingButton = ({ onPress }: Props) => {
    return (
        <Pressable style={({ pressed }) => ([styles.fab, pressed && styles.fabPressed])} onPress={onPress}>
            <Text style={styles.fabText}>+</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#007bff',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabPressed: {
        backgroundColor: '#70aff2ff'
    },
    fabText: {
        fontSize: 24,
        color: 'white',
    },
});

export default FloatingButton;