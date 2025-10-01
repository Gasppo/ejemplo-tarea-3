import Item from '@/components/Item';
import { baseStyles } from '@/constants/base_styles';
import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, TextInput, View } from 'react-native';

export type Producto = {
    id: string;
    nombre: string;
    precio: number;
    description: string;
    uri: ImageSourcePropType;
}

type BaseProducto = Omit<Producto, 'uri'>;

const baseProductos: BaseProducto[] = [
    { id: '1', nombre: 'Café en grano', precio: 10.99, description: 'Descripción de Café en grano' },
    { id: '2', nombre: 'Té verde', precio: 20.99, description: 'Descripción de Té verde' },
    { id: '3', nombre: 'Chocolate amargo', precio: 30.99, description: 'Descripción de Chocolate amargo' },
    { id: '4', nombre: 'Galletas de avena', precio: 40.99, description: 'Descripción de Galletas de avena' },
    { id: '5', nombre: 'Mermelada de fresa', precio: 50.99, description: 'Descripción de Mermelada de fresa' },
    { id: '6', nombre: 'Aceite de oliva', precio: 60.99, description: 'Descripción de Aceite de oliva' },
    { id: '7', nombre: 'Vinagre balsámico', precio: 70.99, description: 'Descripción de Vinagre balsámico' },
    { id: '8', nombre: 'Pasta fusilli', precio: 80.99, description: 'Descripción de Pasta fusilli' },
    { id: '9', nombre: 'Arroz basmati', precio: 90.99, description: 'Descripción de Arroz basmati' },
    { id: '10', nombre: 'Quinoa', precio: 100.99, description: 'Descripción de Quinoa' },
    { id: '11', nombre: 'Miel de abeja', precio: 110.99, description: 'Descripción de Miel de abeja' },
    { id: '12', nombre: 'Nueces mixtas', precio: 120.99, description: 'Descripción de Nueces mixtas' },
    { id: '13', nombre: 'Almendras', precio: 130.99, description: 'Descripción de Almendras' },
    { id: '14', nombre: 'Avellanas', precio: 140.99, description: 'Descripción de Avellanas' },
    { id: '15', nombre: 'Lentejas', precio: 150.99, description: 'Descripción de Lentejas' },
    { id: '16', nombre: 'Garbanzos', precio: 160.99, description: 'Descripción de Garbanzos' },
    { id: '17', nombre: 'Harina integral', precio: 170.99, description: 'Descripción de Harina integral' },
    { id: '18', nombre: 'Azúcar morena', precio: 180.99, description: 'Descripción de Azúcar morena' },
    { id: '19', nombre: 'Sal marina', precio: 190.99, description: 'Descripción de Sal marina' },
    { id: '20', nombre: 'Pimienta negra', precio: 200.99, description: 'Descripción de Pimienta negra' },
];

const listadoProductos: Producto[] = baseProductos.map(p => ({
    ...p,
    uri: { uri: `https://picsum.photos/seed/${encodeURIComponent(p.id)}/400/200` },
}));



const Gallery = () => {

    const [filtro, setFiltro] = useState('')

    return (
        <View style={baseStyles.container}>
            <TextInput onChangeText={setFiltro} placeholder='Hola' style={{ width: 200, height: 50, padding: 4, backgroundColor: 'white', marginVertical: 14, borderWidth: 4, }} />
            <FlatList
                data={listadoProductos.filter(el => el.nombre.toLowerCase().includes(filtro.toLowerCase()))}
                keyExtractor={(item) => item.id}
                renderItem={({ item: producto }) => <Item producto={producto} />}
            />

        </View>
    )
}

export default Gallery
