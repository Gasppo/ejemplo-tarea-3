import React, { useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

const Counter = () => {

    const [contador, setContador] = useState(0)
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 40, }}>
            <Text style={{ fontSize: 64 }}>Valor {contador}</Text>
            <View style={{ margin: 10 }}>
                <Button title={`Sumar`} onPress={() => {
                    setContador(prev => prev + 1)
                }} />
            </View>
            <View style={{ backgroundColor: 'blue', margin: 10 }}>
                <Pressable onPress={() => setContador(prev => prev - 1)} style={styles.pressable}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>Restar</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default Counter


const styles = StyleSheet.create({
    pressable: {
    }
})