import { ProductProps } from "../ProductProps";

export interface CartProductsProps {
    id: string,
    quantity: number,
    product: ProductProps,
}