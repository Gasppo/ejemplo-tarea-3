import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

const BotonModalLink = (props: { nombre: string }) => {
    return (
        <Link href={{ pathname: '/modal-perfil', params: { nombreInicial: props.nombre } }} style={styles.link}>
            <Text style={styles.text}>Modal Link</Text>
        </Link>
    )
}

export default BotonModalLink

const styles = StyleSheet.create({
    link: { margin: 10 },
    text: { fontSize: 20, color: 'blue', }
})