import FloatingButton from '@/components/FloatingActionButton';
import AddProductModal from '@/components/gallery/AddProductModal';
import Item from '@/components/gallery/Item';
import { useProductos } from '@/hooks/useProductos';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';


const Gallery = () => {
    const [filtro, setFiltro] = useState('')
    const [createModalOpen, setCreateModalOpen] = useState(false)

    const { data: productos, isFetching: loading } = useProductos()

    const handleOpenModal = () => {
        setCreateModalOpen(true)
    }

    const handleCloseModal = () => {
        setCreateModalOpen(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Galería de Productos</Text>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        onChangeText={setFiltro}
                        value={filtro}
                        placeholder='Buscar productos...'
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                    {filtro.length > 0 && (
                        <Text style={styles.clearButton} onPress={() => setFiltro('')}>✕</Text>
                    )}
                </View>
                {filtro.length > 0 && (
                    <Text style={styles.resultText}>
                        {productos.length} resultado{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
                    </Text>
                )}
            </View>
            {createModalOpen && <AddProductModal open={createModalOpen} onClose={handleCloseModal} />}
            {loading && <View style={styles.activityIndicator}>
                <ActivityIndicator />
            </View>}
            {!loading && <FlatList
                data={productos}
                keyExtractor={(item) => item.id}
                renderItem={({ item: producto }) => <Item producto={producto} />}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>😕</Text>
                        <Text style={styles.emptyTitle}>No hay productos</Text>
                        <Text style={styles.emptySubtitle}>
                            No se encontraron productos con &quot;{filtro}&quot;
                        </Text>
                    </View>
                }
            />}
            <FloatingButton onPress={handleOpenModal} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        paddingTop: 60,
        paddingBottom: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 0,
    },
    clearButton: {
        fontSize: 20,
        color: '#999',
        paddingLeft: 8,
    },
    resultText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    listContent: {
        paddingHorizontal: 8,
        paddingTop: 16,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Gallery
