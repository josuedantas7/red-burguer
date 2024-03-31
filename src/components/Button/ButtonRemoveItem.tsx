'use client'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { ProductProps } from '@/@types/ProductProps'
import { CartContext } from '@/context/CartContext'

export function ButtonRemoveItem({product} : { product : ProductProps }) {
    
    const { handleRemoveProduct } = useContext(CartContext)
    
    return (
    <div>
        <Button onClick={() => handleRemoveProduct(product)} variant={'destructive'} >Remover</Button>
    </div>
  )
}
