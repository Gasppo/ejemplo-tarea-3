import { BACKEND_URL } from "@/utils/constants";
import { sleep } from "@/utils/sleep";
import { useQuery } from "@tanstack/react-query";

export type Producto = {
    id: string;
    nombre: string;
    precio: number;
    description: string;
    uri: string;
}

const getProductos = async () => {
    await sleep(1000)
    const response = await fetch(`${BACKEND_URL}/productos`)

    if (!response.ok) {
        throw new Error("No encontre productos")
    }

    return await response.json() as Producto[]
}

export const useProductos = () => {

    return useQuery({
        queryKey: ['productos'],
        queryFn: getProductos,
        initialData: []
    })
}