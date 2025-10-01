import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";

export default function Index() {
    const { nombreInicial } = useLocalSearchParams<{ nombreInicial: string }>()
    const [nombre, setNombre] = useState(nombreInicial)

    const guardarNombre = () => {
        router.replace({
            pathname: '/perfil',
            params: { nombre }
        })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#cbd5e1'
            }}
        >
            <TextInput style={{width: 200, backgroundColor: 'white', padding: 10, marginBottom: 10}} value={nombre} onChangeText={setNombre} />
            <Button onPress={guardarNombre} title="Guardar" />
        </SafeAreaView>
    );
}
