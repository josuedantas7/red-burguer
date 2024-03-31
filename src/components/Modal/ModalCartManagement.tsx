'use client'

import React, { ReactNode, useContext } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { CartContext } from '@/context/CartContext'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ButtonRemoveItem } from '../Button/ButtonRemoveItem'
import { api } from '@/lib/api'
import { Notification } from '../Notifier/Notification'

export function ModalCartManagement({children} : { children : ReactNode }) {

    const { cart } = useContext(CartContext)


    async function handleFinishOrder() {

        const data = {
            Products: cart
        }

        try{
            const response = await api.post('/api/cart', {...data})
            console.log(response.data)
            Notification('success', 'Pedido finalizado com sucesso!')
        }catch{
            Notification('error', 'Erro ao finalizar pedido!')
        }
    }


    function formatPrice(price: number) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger className='w-full'>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className='text-center font-bold text-2xl'>Seu carrinho</AlertDialogTitle>
                <div>
                    {cart.length > 0 ? cart.map(item => {
                        return (
                            <div className='flex flex-col gap-1' key={item.id}>
                                <span className='text-lg font-bold'>{item.name}</span>
                                <div className='flex justify-between'>
                                    <span>Quantidade: {item.quantity}</span>
                                    <ButtonRemoveItem product={item} />
                                </div>
                                <span>{item.quantity !== undefined ? formatPrice(item.price * item.quantity) : ''}</span>
                            </div>
                        )
                    }) : <p className='text-center font-bold text-2xl'>Seu carrinho está vazio</p>}

                    <div className='mt-5'>

                        <form>
                            <Label>Endereço</Label>
                            <Input type='text' placeholder='Digite seu endereço completo...' />
                        </form>
                    </div>
                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleFinishOrder()}>Finalizar Pedido</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
