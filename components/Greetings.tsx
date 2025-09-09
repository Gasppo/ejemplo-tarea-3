import { Text, View } from "react-native"

export const Greetings1 = (props: { children: React.ReactNode }) => {

    return <View>
       <Text>{props.children}</Text>
    </View>
}

export function Greetings2(props: { name: string }) {
    return <View>
        <Text>Hola {props.name}</Text>
    </View>
}