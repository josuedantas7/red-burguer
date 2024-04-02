'use client'
import { api } from '@/lib/api'
import React, { useEffect } from 'react'
import { Notification } from '../Notifier/Notification'
import { ProductProps } from '@/@types/ProductProps'
import { CardProduct } from '../Card/CardProduct'
import { CategoryProps } from '@/@types/CategoryProps'

export function ListItens() {

    const [allProducts,setAllProducts] = React.useState<CategoryProps[] | null>()

    useEffect(() => {
        async function getAllProducts(){
            try{
                const response = await api.get('/api/category')
                setAllProducts(response.data)
                console.log(response.data)
            }catch{
                Notification('error', 'Erro ao buscar produtos')
            }
        }
        getAllProducts()
    },[])

    return (
        <div className='flex flex-col gap-8'>
            {allProducts &&  allProducts.length > 0 ? (
                allProducts.map((category) => (
                    category.products && category.products.length > 0 && (
                        <div className='flex flex-col gap-2' key={category.id}>
                            <h1 className='text-2xl font-bold text-start min-[860px]:text-center max-[860px]:pl-8 max-[480px]:pl-1.5'>{category.name}</h1>
                            {category.products && category.products?.length > 0 && (
                                <div className='flex flex-col gap-5 justify-center max-[860px]:justify-start max-[860px]:pl-8 max-[480px]:pl-1.5 max-[425px]:pl-0 max-[860px]:w-full mx-auto'>
                                    {
                                        category.products.map((product: ProductProps) => (
                                            <CardProduct key={product.id} product={product} />
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    )
                ))
            ) : allProducts && allProducts.length === 0 ? (
                <p>Nenhum produto cadastrado</p>
            ) : (
                <p>Carregando produtos...</p>
            )}
        </div>
    )
}
