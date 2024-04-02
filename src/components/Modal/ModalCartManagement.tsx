'use client'

import React, { ReactNode, useContext, useState } from 'react'

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

    const [address, setAddress] = useState<string>('')
    const [phone,setPhone] = useState<string>('')


    async function handleFinishOrder() {

        if (!phone && !address){
            return Notification('error', 'Telefone e endereço não podem ser vazios!')
        }

        if (!phone){
            return Notification('error', 'Telefone não pode ser vazio!')
        }

        if (!address){
            return Notification('error', 'Endereço não pode ser vazio!')
        }

        const data = {
            Products: cart,
            address,
            phone
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
                            <div>
                                <Label>Endereço</Label>
                                <Input onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Digite seu endereço completo...' />
                            </div>
                            <div>
                                <Label>Telefone</Label>
                                <Input onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Digite seu telefone...' />
                            </div>
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
