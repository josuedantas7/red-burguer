'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CardProductProps } from '@/@types/TypesPropsComponents/CardProductProps';
import { CartContext } from '@/context/CartContext';

export function CardProduct({product} : { product : CardProductProps }) {

  const { handleAddProduct } = useContext(CartContext)


  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className='flex w-[612px] h-[144px] max-[660px]:w-[500px] max-[550px]:w-[400px] rounded-xl relative'>
        <Image className='rounded-l-xl' src={product.image} width={144} height={144} alt='Burguer' />
        <div className='pl-4 relative flex flex-col gap-2'>
          <h2 className='font-semibold'>{product.name}</h2>
          <p className='text-sm'>{product?.description}</p>
          <h2 className='font-semibold absolute bottom-6 max-[550px]:bottom-2'>{formatPrice(product.price)}</h2>
        </div>
        <button onClick={() => handleAddProduct(product)}>
          <MdOutlineAddShoppingCart className='absolute bg-black text-white rounded w-[60px] h-[30px] py-1 right-0 bottom-3' />
        </button>
    </div>
  )
}
