import React, { useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const Tarjeta = (props: { title: string }) => {
    const { title } = props
    const [pressed, setPressed] = useState(false)

    const handlePress = () => { setPressed(prev => !prev) }

    return (
        <Pressable onPress={handlePress} style={[styles.container, pressed ? { backgroundColor: 'red' } : { backgroundColor: 'blue' }]}>
            <Text style={[styles.text, pressed ? { color: 'white' } : { color: 'yellow' }]}>{title}</Text>
        </Pressable>
    )
}

export default Tarjeta

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontFamily: "sans-serif"
    },
})