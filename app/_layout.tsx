import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false
                    }} />

                <Stack.Screen
                    name="modal-perfil"
                    options={{
                        title: 'Modal Perfil',
                        presentation: 'modal'
                    }} />
            </Stack>
        </QueryClientProvider>)
}