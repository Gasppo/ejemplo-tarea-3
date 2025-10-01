# Aplicación Expo - Tareas PAM �

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) que implementa una serie de tareas prácticas de React Native.

## Inicio Rápido

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo Go app en tu dispositivo móvil (opcional)
- Android Studio o Xcode para emuladores (opcional)

### Instalación y Ejecución

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Iniciar la aplicación**

   ```bash
   npx expo start
   ```

3. **Opciones para visualizar la app:**
   - Escanea el código QR con la app [Expo Go](https://expo.dev/go)
   - Presiona `a` para abrir en el [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - Presiona `i` para abrir en el [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
   - Presiona `w` para abrir en el navegador web

### Estructura del Proyecto

El proyecto utiliza [enrutamiento basado en archivos](https://docs.expo.dev/router/introduction) con Expo Router. Los archivos principales están en el directorio **app**.

```
app/
├── _layout.tsx          # Layout principal
├── modal-perfil.tsx     # Modal para editar perfil
└── (tabs)/              # Navegación por pestañas
    ├── _layout.tsx      # Layout de tabs
    ├── index.tsx        # Tab Contador
    ├── tarjetas.tsx     # Tab Tarjetas
    ├── perfil.tsx       # Tab Perfil
    └── gallery.tsx      # Tab Galería
```

## Tareas Implementadas

### Tarea 1: Lista de Tarjetas Interactivas

**Conceptos aplicados:** Estilos, props, useState, `<Text>`, `<View>`, `<Pressable>`

**Características implementadas:**
- ✅ Lista de tarjetas que reciben texto mediante props
- ✅ Al tocar una tarjeta, cambia el color de fondo
- ✅ Al tocar una tarjeta, cambia el color del texto
- ✅ Texto centrado en ambos ejes dentro de cada tarjeta
- ✅ Componente `Tarjeta.tsx` reutilizable

**Ubicación:** `app/(tabs)/tarjetas.tsx` y `components/Tarjeta.tsx`

---

### Tarea 2: Navegación por Tabs y Modal de Perfil

**Conceptos aplicados:** expo-router (Tabs, Stack, _layout), `<TextInput>`, `<Modal>`

**Características implementadas:**
- ✅ **Tab Contador:** Botón que incrementa un contador y muestra su valor
  - Ubicación: `app/(tabs)/index.tsx`
  - Componente: `components/Counter.tsx`

- ✅ **Tab Tarjetas:** Lista de tarjetas de la Tarea 1
  - Ubicación: `app/(tabs)/tarjetas.tsx`

- ✅ **Tab Perfil:** Muestra nombre y apellido con opción de editar
  - Ubicación: `app/(tabs)/perfil.tsx`
  - Botón "Cambiar nombre" que abre un modal
  - Modal con input para cambiar el nombre
  - Botón "Guardar" que actualiza el perfil y cierra el modal
  - Componente modal: `components/ModalUpdatePerfil.tsx`

---

### Tarea 3: Galería de Productos con FlatList

**Conceptos aplicados:** `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<Pressable>`, `<Modal>`, `<FlatList>`

**Características implementadas:**
- ✅ **Pantalla Galería** con navegación por tabs
  - Ubicación: `app/(tabs)/gallery.tsx`

- ✅ **Lista de productos** usando `<FlatList>`
  - Cada ítem muestra: imagen, título y precio
  - Imágenes locales con `require(...)` e imágenes por URI

- ✅ **Búsqueda en tiempo real**
  - `<TextInput>` arriba para filtrar productos por título
  - Filtrado instantáneo mientras escribes

- ✅ **Modal de detalle de producto**
  - Se abre al presionar un producto
  - Muestra imagen grande, título y descripción completa
  - Botones para cambiar `resizeMode` de la imagen (cover, contain, stretch)

- ✅ **Sistema de favoritos**
  - Al mantener presionado un producto, se marca como favorito
  - Cambio visual para indicar productos favoritos
  - Persistencia del estado de favoritos

## Componentes Personalizados

- **`Counter.tsx`** - Componente contador con estado
- **`Tarjeta.tsx`** - Tarjeta interactiva con cambio de color
- **`Item.tsx`** - Ítem de lista para la galería
- **`ModalUpdatePerfil.tsx`** - Modal para editar perfil
- **`Greetings.tsx`** - Componente de saludo personalizado
- **`BotonModalLink.tsx`** y **`BotonModalState.tsx`** - Botones para modales

## Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma y herramientas para React Native
- **Expo Router** - Enrutamiento basado en archivos
- **TypeScript** - Tipado estático para JavaScript
- **React Hooks** - useState para manejo de estado

## Recursos Adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/)
- [Documentación de React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

