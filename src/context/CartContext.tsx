'use client'
import { CartContextProps } from '@/@types/CartContextProps'
import { ProductProps } from '@/@types/ProductProps'
import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

export const CartContext = createContext<CartContextProps>({cart:[], handleAddProduct: () => {}, handleRemoveProduct: () => {}, getTotalItens: () => 0})

export const CartProvider = ({children} : { children : ReactNode }) => {

    const [cart,setCart] = useState<ProductProps[]>([])

    function handleAddProduct(product : ProductProps){
        const productExists = cart.find(item => item.id === product.id)
        if (productExists){
            setCart(cart.map(item => item.id === product.id ? {...item, quantity: (item.quantity ?? 0) + 1} : item))
        } else {
            setCart([...cart, {...product, quantity: 1}])
        }
    }

    function handleRemoveProduct(product : ProductProps){
        if (product.quantity === 1){
            setCart(cart.filter(item => item.id !== product.id))
        } else {
            setCart(cart.map(item => item.id === product.id && item.quantity ? {...item, quantity: item.quantity - 1} : item))
        }
    }


    useEffect(() => {
        function getTotalItens(){
            const total = cart.reduce((acc, item) => {
                return acc + (item.quantity ?? 0)
            },0)

            return total
        }
        getTotalItens()
    },[cart])
    
    function getTotalItens(){
        const total = cart.reduce((acc, item) => {
            return acc + (item.quantity ?? 0)
        },0)

        return total
    }

    return (
        <CartContext.Provider value={{cart,handleAddProduct, handleRemoveProduct, getTotalItens}}>
            {children}
        </CartContext.Provider>
    )
}

