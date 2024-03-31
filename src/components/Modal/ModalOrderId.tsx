'use client'
import React, { useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { ModalOrderIdProps } from '@/@types/TypesPropsComponents/ModalOrderIdProps'
import { Notification } from '../Notifier/Notification'
import { api } from '@/lib/api'
import { CartProductsProps } from '@/@types/TypesPropsComponents/CartProductsProps'
import { OrdersProps } from '@/@types/TypesPropsComponents/OrdersProps'

export default function ModalOrderId({children, id} : ModalOrderIdProps) {

    const [order, setOrder] = useState<OrdersProps>()

    async function handleFinishOrderId(id: string | undefined){
        try{
            const response = await api.delete('/api/cart', {
                params: {
                    id: id
                }
            })
            console.log(response.data)
            Notification('success', 'Pedido finalizado com sucesso!')
        }catch{
            Notification('error', 'Erro ao finalizar pedido!')
        }
    }

    useEffect(() => {
        async function getOrder(){
            try{
                const response = await api.get('/api/cart', {
                    params: {
                        id: id
                    }
                })
                setOrder(response.data)
                console.log(response.data)
            }catch(err){
                console.log(err)
                Notification('error', `Erro ao buscar pedido!`)
            }
        }
        getOrder()
    },[id])

    function formatPrice(price : number) : string{
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger className='w-full'>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className='text-center font-bold text-2xl'>Sem pedido</AlertDialogTitle>
                <div>
                    <h1 className='text-2xl font-bold text-center mb-5'>Pedido:</h1>
                    {order && order?.cartProducts.length > 0 ? order?.cartProducts.map(item => (
                            <div className='flex flex-col my-2 gap-1' key={item.id}>
                                <span className='text-lg font-bold'>{item.product.name}</span>
                                <span>Quantidade: {item.quantity}</span>
                                <span>{item.quantity !== undefined ? formatPrice(item.product.price * item.quantity) : ''}</span>
                            </div>
                        
                    )) : <p className='text-center font-bold text-2xl'>Pedido não tem item</p>}
                    <div className='flex justify-between mt-5'>
                        <span className='text-lg font-bold'>Total:</span>
                        <span className='text-lg font-bold'>{order ? formatPrice(order.cartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0)) : ''}</span>
                    </div>
                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleFinishOrderId(order?.id)}>Finalizar Pedido</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
