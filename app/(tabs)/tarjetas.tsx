import Tarjeta from "@/components/Tarjeta";
import { View } from "react-native";

export default function Index() {

  const tarjetas = ["Tarjeta 1", "Tarjeta 2", "Tarjeta 3"]

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tarjetas.map((tarjeta, index) => <Tarjeta title={tarjeta} key={index} />)}
    </View>
  );
}
