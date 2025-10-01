import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type Props = { onOpenModal: () => void }

const BotonModalState = (props: Props) => {
    return (
        <Pressable onPress={props.onOpenModal} style={styles.pressable}>
            <Text style={styles.text}>Modal state</Text>
        </Pressable>
    )
}

export default BotonModalState

const styles = StyleSheet.create({
    pressable: { margin: 10 },
    text: { fontSize: 20, color: 'blue', }
})