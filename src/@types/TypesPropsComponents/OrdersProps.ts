import { CartProductsProps } from "./CartProductsProps";

export interface OrdersProps {
    id: string,
    createdAt: string,
    updatedAt: string,
    cartProducts: CartProductsProps[]
    address: string,
    phone: string,
}