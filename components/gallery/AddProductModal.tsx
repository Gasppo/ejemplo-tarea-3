import { useCreateProducto } from '@/hooks/useCreateProducto'
import React, { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

type Props = {
    open: boolean
    onClose: () => void
}

const AddProductModal = ({ open, onClose }: Props) => {

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [description, setDescription] = useState('')
    const [uri, setUri] = useState('')

    const { mutate, isPending } = useCreateProducto()

    const handleSubmit = () => {
        const idRandomFoto = Math.floor(Math.random() * 100)
        mutate({
            nombre,
            description,
            precio: Number(precio),
            uri: `https://picsum.photos/seed/${idRandomFoto}/400/300`
        }, {
            onSuccess: () => onClose(),
            onError: (error) => { console.log(error.message) }
        })
    }

    const handleCancel = () => {
        setNombre('')
        setPrecio('')
        setDescription('')
        setUri('')
        onClose()
    }

    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}>
                <Pressable style={styles.backdrop} onPress={handleCancel} />
                <View style={styles.modalCard}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Agregar Producto</Text>
                        <Pressable onPress={handleCancel} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>
                    <ScrollView
                        style={styles.formContainer}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre del producto</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ej: iPhone 14 Pro"
                                value={nombre}
                                onChangeText={setNombre}
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Precio</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ej: 999.99"
                                keyboardType="decimal-pad"
                                value={precio}
                                onChangeText={setPrecio}
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Descripción</Text>
                            <TextInput
                                style={[styles.textInput, styles.textArea]}
                                placeholder="Describe el producto..."
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>URL de la imagen</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="https://ejemplo.com/imagen.jpg"
                                value={uri}
                                onChangeText={setUri}
                                keyboardType="url"
                                autoCapitalize="none"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.actionButtons}>
                        <Pressable
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancel}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.submitButton, isPending ? styles.submitButtonPending : undefined]}
                            disabled={isPending}
                            onPress={handleSubmit}>
                            {isPending ? <ActivityIndicator /> : <Text style={styles.submitButtonText}>Agregar</Text>}
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AddProductModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        width: '90%',
        maxWidth: 500,
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    closeButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '500',
    },
    formContainer: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1a1a1a',
    },
    textArea: {
        minHeight: 100,
        paddingTop: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    submitButtonPending: {
        backgroundColor: '#5a5f65ff',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
})