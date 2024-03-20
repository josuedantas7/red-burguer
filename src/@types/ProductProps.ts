import { CategoryProps } from "./CategoryProps";

export interface ProductProps {
    id?: string,
    name: string,
    price: number,
    description?: string,
    image: string,
    idCategory?: string,
    category?: CategoryProps
}