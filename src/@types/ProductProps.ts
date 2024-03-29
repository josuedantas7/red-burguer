import { CategoryProps } from "./CategoryProps";

export interface ProductProps {
    id?: string,
    name: string,
    price: number,
    description?: string,
    image: string,
    quantity?: number,
    idCategory?: string,
    category?: CategoryProps
}