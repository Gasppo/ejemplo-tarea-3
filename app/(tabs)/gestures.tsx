import DoubleTapHeart from '@/components/gestures/DoubleTapHeart';
import DraggableBox from '@/components/gestures/DraggableBox';
import LongPressButton from '@/components/gestures/LongPressButton';
import PinchableImage from '@/components/gestures/PinchableImage';
import RotatableSquare from '@/components/gestures/RotatableSquare';
import SwipeableCard from '@/components/gestures/SwipeableCard';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function GesturesScreen() {
  const handleSwipeLeft = () => {
    console.log('Swiped left!');
  };

  const handleSwipeRight = () => {
    console.log('Swiped right!');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Gestos Interactivos</Text>
          <Text style={styles.subtitle}>Ejemplos interactivos para que pruebes</Text>
        </View>

        {/* Dragging Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Pan / Arrastrar</Text>
          <Text style={styles.sectionDescription}>
            Arrastrá estas cajas por la pantalla con un dedo
          </Text>
          <View style={styles.dragContainer}>
            <DraggableBox color="#FF6B6B" label="Caja 1" />
            <DraggableBox color="#4ECDC4" label="Caja 2" />
            <DraggableBox color="#45B7D1" label="Caja 3" />
          </View>
        </View>

        {/* Swiping Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👆 Deslizar</Text>
          <Text style={styles.sectionDescription}>
            Deslizá las tarjetas a la izquierda o derecha - se van a ocultar cuando las deslices lo suficiente
          </Text>
          <View style={styles.swipeContainer}>
            <SwipeableCard
              color="#9B59B6"
              title="Tarjeta 1"
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
            <SwipeableCard
              color="#E74C3C"
              title="Tarjeta 2"
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
            <SwipeableCard
              color="#F39C12"
              title="Tarjeta 3"
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </View>
        </View>

        {/* Rotation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Rotación</Text>
          <Text style={styles.sectionDescription}>
            Usá dos dedos para rotar estos cuadrados
          </Text>
          <View style={styles.rotateContainer}>
            <RotatableSquare color="#16A085" label="Rotar 1" />
            <RotatableSquare color="#C0392B" label="Rotar 2" />
          </View>
        </View>

        {/* Pinch Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤏 Pellizcar para Zoom</Text>
          <Text style={styles.sectionDescription}>
            Pellizca con dos dedos para hacer zoom, o tocá dos veces para cambiar el zoom
          </Text>
          <View style={styles.pinchContainer}>
            <PinchableImage imageUri="https://picsum.photos/400/400?random=10" />
          </View>
        </View>

        {/* Double Tap Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💝 Doble Toque</Text>
          <Text style={styles.sectionDescription}>
            Tocá una vez para un pulso, tocá dos veces para una animación de corazón
          </Text>
          <View style={styles.tapContainer}>
            <DoubleTapHeart color="#E91E63" />
          </View>
        </View>

        {/* Long Press Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Presión Larga</Text>
          <Text style={styles.sectionDescription}>
            Presioná y mantené por 0.8 segundos para activar (con vibración)
          </Text>
          <View style={styles.longPressContainer}>
            <LongPressButton color="#673AB7" label="Manteneme" />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Todos los ejemplos usan react-native-gesture-handler y react-native-reanimated
          </Text>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  dragContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    minHeight: 200,
  },
  swipeContainer: {
    alignItems: 'center',
    gap: 16,
  },
  rotateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  pinchContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  tapContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  longPressContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
