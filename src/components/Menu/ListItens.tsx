'use client'
import { api } from '@/lib/api'
import React, { useEffect } from 'react'
import { Notification } from '../Notifier/Notification'
import { ProductProps } from '@/@types/ProductProps'
import { CardProduct } from '../Card/CardProduct'

export function ListItens() {

    const [allProducts,setAllProducts] = React.useState<ProductProps[] | null>()

    useEffect(() => {
        async function getAllProducts(){
            try{
                const response = await api.get('/api/product')
                setAllProducts(response.data)
            }catch{
                Notification('error', 'Erro ao buscar produtos')
            }
        }
        getAllProducts()
    },[])

  return (
    <div className="flex justify-center flex-wrap gap-[26px]">
        {allProducts && allProducts.length > 0 ? (allProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
        ))) : allProducts && allProducts.length === 0 ? (
            <p>Nenhum produto cadastrado</p>
        ) : (
            <p>Carregando produtos...</p> 
        )}
    </div>
  )
}
