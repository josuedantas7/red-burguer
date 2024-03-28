import prisma from '@/lib/db'
import Link from 'next/link'
import React from 'react'

export async function TableListProducts() {

    const products = await prisma.product.findMany({
        include: {
            category: true
        }
    })

    console.log(products)


    function formatPrice(price : number) : string{
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

  return (
    <div className='bg-zinc-200 p-5 rounded-lg border border-gray-900'>
        <div className='font-bold px-3 flex justify-between'>
            <p className='w-1/3'>Nome:</p>
            <p className='text-center w-1/3'>Categoria:</p>
            <p className='text-end w-1/3'>Preço:</p>
        </div>
        <div className='flex flex-col gap-1.5'>
            {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className='flex bg-gray-500 border border-green-500 py-1 rounded-md px-3 justify-between'>
                    <p className='w-1/3'>{product.name}</p>
                    <p className='text-center w-1/3'>{product.category.name}</p>
                    <p className='text-end w-1/3'>{formatPrice(product.price)}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}
