import { ProductProps } from "./ProductProps";

export interface CategoryProps {
    id?: string,
    name: string,
    products?: ProductProps[]
}