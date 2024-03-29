import { ProductProps } from "./ProductProps";

export interface CartContextProps{
    cart : ProductProps[],
    handleAddProduct : (product: ProductProps) => void,
    handleRemoveProduct : (product: ProductProps) => void,
    getTotalItens : () => number
}