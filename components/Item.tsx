import { Producto } from '@/app/(tabs)/gallery'
import { baseStyles } from '@/constants/base_styles'
import React, { useState } from 'react'
import { Button, Image, ImageResizeMode, Modal, Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
    producto: Producto
}

const Item = (props: Props) => {

    const { producto } = props
    const [isFavorite, setIsFavorite] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [resizeMode, setResizeMode] = useState<ImageResizeMode>('contain')

    const toggleFavorita = () => setIsFavorite(prev => !prev)
    return (
        <View>
            <Pressable onLongPress={toggleFavorita} onPress={() => setOpenModal(true)} style={({ pressed }) => [baseStyles.container, { borderWidth: 4, margin: 4, width: 200, height: 200, borderColor: isFavorite ? 'yellow' : 'black', opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? 'grey' : 'white' }]}>
                <Text>{producto.nombre}</Text>
                <Image source={producto.uri} resizeMode={resizeMode} style={{ width: 150, height: 75 }} />
                <Text>${producto.precio.toFixed(2)}</Text>
            </Pressable>
            <Modal
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
                presentationStyle='fullScreen'

            >
                <View style={baseStyles.container}>
                    <Text>{producto.nombre}</Text>
                    <Text>{producto.description}</Text>
                    <Image source={producto.uri} resizeMode={resizeMode} style={{ width: 200, height: 100 }} />
                    <Text>${producto.precio.toFixed(2)}</Text>
                    <Button title='Close' onPress={() => setOpenModal(false)} />
                    <Button title='Center' onPress={() => setResizeMode('center')} />
                    <Button title='Contain' onPress={() => setResizeMode('contain')} />
                </View>
            </Modal>
        </View>

    )
}

export default Item

const styles = StyleSheet.create({})