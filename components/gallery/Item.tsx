import { Producto } from '@/app/(tabs)/gallery'
import React, { useState } from 'react'
import { Image, ImageResizeMode, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

type Props = {
    producto: Producto
}

const Item = (props: Props) => {
    const { producto } = props
    const [isFavorite, setIsFavorite] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [resizeMode, setResizeMode] = useState<ImageResizeMode>('cover')

    const toggleFavorita = () => setIsFavorite(prev => !prev)

    const resizeModes: ImageResizeMode[] = ['cover', 'contain', 'stretch'];

    return (
        <View style={styles.itemWrapper}>
            <Pressable
                onLongPress={toggleFavorita}
                onPress={() => setOpenModal(true)}
                style={({ pressed }) => [
                    styles.card,
                    isFavorite && styles.favoriteCard,
                    pressed && styles.cardPressed
                ]}
            >
                {isFavorite && (
                    <View style={styles.favoriteBadge}>
                        <Text style={styles.favoriteIcon}>⭐</Text>
                    </View>
                )}
                <Image
                    source={{ uri: producto.uri }}
                    resizeMode="cover"
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                        {producto.nombre}
                    </Text>
                    <Text style={styles.cardPrice}>${producto.precio.toFixed(2)}</Text>
                </View>
            </Pressable>

            <Modal
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
                animationType="slide"
                presentationStyle='pageSheet'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Detalle del Producto</Text>
                        <Pressable
                            onPress={() => setOpenModal(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.modalContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: producto.uri }}
                                resizeMode={resizeMode}
                                style={styles.modalImage}
                            />
                            <Text style={styles.sectionTitle}>Modo de ajuste de imagen</Text>
                            <View style={styles.resizeModeContainer}>
                                {resizeModes.map((mode) => (
                                    <Pressable
                                        key={mode}
                                        onPress={() => setResizeMode(mode)}
                                        style={[
                                            styles.resizeModeButton,
                                            resizeMode === mode && styles.resizeModeButtonActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.resizeModeText,
                                            resizeMode === mode && styles.resizeModeTextActive
                                        ]}>
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.productName}>{producto.nombre}</Text>
                            <Text style={styles.productPrice}>${producto.precio.toFixed(2)}</Text>

                            <View style={styles.divider} />

                            <Text style={styles.sectionTitle}>Descripción</Text>
                            <Text style={styles.productDescription}>
                                {producto.description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

export default Item

const styles = StyleSheet.create({
    itemWrapper: {
        flex: 1,
        margin: 8,
        maxWidth: '46%',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    favoriteCard: {
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    cardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    favoriteBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    favoriteIcon: {
        fontSize: 18,
    },
    cardImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#f0f0f0',
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        minHeight: 36,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
        fontWeight: '300',
    },
    modalContent: {
        paddingBottom: 40,
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        marginBottom: 16,
    },
    modalImage: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        marginBottom: 16,
    },
    detailsContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    resizeModeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
        justifyContent: 'center',
        width: '100%',
    },
    resizeModeButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    resizeModeButtonActive: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    resizeModeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    resizeModeTextActive: {
        color: 'white',
    },
})