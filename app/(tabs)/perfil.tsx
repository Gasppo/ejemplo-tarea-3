import BotonModalLink from "@/components/BotonModalLink";
import BotonModalState from "@/components/BotonModalState";
import ModalUpdatePerfil from "@/components/ModalUpdatePerfil";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

    const { nombre: nombreParam = "" } = useLocalSearchParams<{ nombre?: string }>()
    const [nombreState, setNombreState] = useState(nombreParam)
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => setModalOpen(false)

    const guardarNombre = (nuevoNombre: string) => {
        setNombreState(nuevoNombre)
        closeModal()
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 40 }}>Hola {nombreState}</Text>
            <BotonModalLink nombre={nombreState} />
            <BotonModalState onOpenModal={openModal} />
            <ModalUpdatePerfil
                name={nombreState}
                open={modalOpen}
                onCloseModal={closeModal}
                onSave={guardarNombre}
            />
        </View>
    );
}
