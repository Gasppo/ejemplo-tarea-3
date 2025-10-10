
import { BACKEND_URL } from "@/utils/constants"
import { sleep } from "@/utils/sleep"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Producto } from "./useProductos"


const createProducto = async (producto: Omit<Producto, 'id'>) => {
    await sleep(1000)
    const response = await fetch(`${BACKEND_URL}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })

    if (!response.ok) {
        throw new Error("No se pudo crear el producto")
    }

    return await response.json() as { message: string, producto: Producto }
}

export const useCreateProducto = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProducto,
        mutationKey: ['create-producto'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productos'] })
        }
    })

}