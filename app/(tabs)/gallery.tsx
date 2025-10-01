import Item from '@/components/Item';
import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native';

export type Producto = {
    id: string;
    nombre: string;
    precio: number;
    description: string;
    uri: ImageSourcePropType;
}

type BaseProducto = Omit<Producto, 'uri'>;

const baseProductos: BaseProducto[] = [
    { id: '1', nombre: 'Café en grano', precio: 10.99, description: 'Café de alta calidad procedente de Colombia. Notas a chocolate y nueces con un toque dulce.' },
    { id: '2', nombre: 'Té verde', precio: 20.99, description: 'Té verde orgánico con antioxidantes naturales. Perfecto para comenzar el día con energía.' },
    { id: '3', nombre: 'Chocolate amargo', precio: 30.99, description: 'Chocolate belga 85% cacao. Intenso sabor y beneficios para la salud.' },
    { id: '4', nombre: 'Galletas de avena', precio: 40.99, description: 'Galletas caseras con avena integral, pasas y miel. Sin conservantes artificiales.' },
    { id: '5', nombre: 'Mermelada de fresa', precio: 50.99, description: 'Mermelada artesanal con fresas frescas y azúcar natural. Ideal para tus desayunos.' },
    { id: '6', nombre: 'Aceite de oliva', precio: 60.99, description: 'Aceite de oliva extra virgen de la región mediterránea. Primera prensada en frío.' },
    { id: '7', nombre: 'Vinagre balsámico', precio: 70.99, description: 'Vinagre balsámico de Módena envejecido 12 años. Sabor complejo y dulce.' },
    { id: '8', nombre: 'Pasta fusilli', precio: 80.99, description: 'Pasta italiana de sémola de trigo duro. Textura perfecta al dente.' },
    { id: '9', nombre: 'Arroz basmati', precio: 90.99, description: 'Arroz basmati aromático de grano largo. Importado de la India.' },
    { id: '10', nombre: 'Quinoa', precio: 100.99, description: 'Quinoa orgánica rica en proteínas. Superalimento andino sin gluten.' },
    { id: '11', nombre: 'Miel de abeja', precio: 110.99, description: 'Miel pura de flores silvestres. Producida por abejas locales sin procesar.' },
    { id: '12', nombre: 'Nueces mixtas', precio: 120.99, description: 'Mezcla premium de nueces, almendras y avellanas tostadas ligeramente.' },
    { id: '13', nombre: 'Almendras', precio: 130.99, description: 'Almendras crudas de California. Ricas en vitamina E y fibra natural.' },
    { id: '14', nombre: 'Avellanas', precio: 140.99, description: 'Avellanas tostadas con un sabor dulce y mantecoso. Perfectas para snack.' },
    { id: '15', nombre: 'Lentejas', precio: 150.99, description: 'Lentejas orgánicas de cocción rápida. Alta fuente de proteína vegetal.' },
    { id: '16', nombre: 'Garbanzos', precio: 160.99, description: 'Garbanzos secos de tamaño grande. Ideales para hummus y guisos.' },
    { id: '17', nombre: 'Harina integral', precio: 170.99, description: 'Harina de trigo integral molida en piedra. Conserva todos los nutrientes.' },
    { id: '18', nombre: 'Azúcar morena', precio: 180.99, description: 'Azúcar de caña sin refinar con melaza natural. Sabor caramelo único.' },
    { id: '19', nombre: 'Sal marina', precio: 190.99, description: 'Sal marina del Atlántico cristalizada naturalmente. Rica en minerales.' },
    { id: '20', nombre: 'Pimienta negra', precio: 200.99, description: 'Pimienta negra en grano de Malabar. Aroma intenso y sabor picante.' },
];

const listadoProductos: Producto[] = baseProductos.map(p => ({
    ...p,
    uri: { uri: `https://picsum.photos/seed/${encodeURIComponent(p.id)}/400/300` },
}));

const Gallery = () => {
    const [filtro, setFiltro] = useState('')
    const productosFiltrados = listadoProductos.filter(el => 
        el.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

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
                        {productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
                    </Text>
                )}
            </View>
            <FlatList
                data={productosFiltrados}
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
            />
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
});

export default Gallery
