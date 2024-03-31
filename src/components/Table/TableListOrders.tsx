'use client'
import { api } from '@/lib/api'
import React, { useEffect, useState } from 'react'
import { Notification } from '../Notifier/Notification'
import Link from 'next/link'
import { OrdersProps } from '@/@types/TypesPropsComponents/OrdersProps'
import ModalOrderId from '../Modal/ModalOrderId'

export default function TableListOrders() {

    const [orders, setOrders] = useState<OrdersProps[]>([])

    useEffect(() => {
        async function getOrders(){
            try{
                const response = await api.get('/api/cart')
                setOrders(response.data)
                console.log(response.data)
            }catch{
                Notification('error', 'Erro ao buscar pedidos!')
            }
        }
        getOrders()
    },[])

    function formatDate(date: string){
        const newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

  return (
    <div className='bg-zinc-200 p-5 rounded-lg border border-gray-900'>
        <div className='font-bold px-3 flex justify-between'>
            <p className='w-1/3'>ID:</p>
            <p className='w-1/3 text-center'>Data:</p>
            <p className='text-end w-1/3'>Qtd:</p>
        </div>
        <div className='flex flex-col gap-1.5'>
            {orders.map((product,index) => (
                <ModalOrderId key={product.id} id={product.id}>
                    <div className='flex bg-gray-500 border border-green-500 py-1 rounded-md px-3 justify-between'>
                        <p className='w-1/3 text-start'>{index+1}</p>
                        <p className='text-center w-1/3'>{formatDate(product.createdAt)}</p>
                        <p className='text-end w-1/3'>{product.cartProducts.length}</p>
                    </div>
                </ModalOrderId>
            ))}
        </div>
    </div>
  )
}
