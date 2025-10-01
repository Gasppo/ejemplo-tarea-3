import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';

type Props = {
    open: boolean;
    onCloseModal: () => void;
    onSave: (newName: string) => void;
    name: string;
}

const ModalUpdatePerfil = ({ onCloseModal, onSave, open, name }: Props) => {
    const [tempNameState, setTempNameState] = useState(name)

    const guardarNombre = () => onSave(tempNameState)

    return (
        <Modal
            visible={open}
            onRequestClose={onCloseModal}
            presentationStyle='formSheet'
            animationType='slide'
        >
            <View style={styles.container}>
                <TextInput style={styles.textInput} value={tempNameState} onChangeText={setTempNameState} />
                <Button onPress={guardarNombre} title="Guardar" />
            </View>
        </Modal>
    )
}

export default ModalUpdatePerfil

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#cbd5e1'
    },
    textInput: { width: 200, backgroundColor: 'white', padding: 10, marginBottom: 10 },

})