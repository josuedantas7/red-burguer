'use client'
import { CartContext } from '@/context/CartContext';
import React, { useContext } from 'react'
import { PiShoppingCartDuotone } from "react-icons/pi";
import { ModalCartManagement } from '../Modal/ModalCartManagement';

export function FooterCart() {

    const { getTotalItens } = useContext(CartContext)

  return (
    <ModalCartManagement>
        <div className='h-[45px] w-full gap-3 flex justify-center items-center bg-red-800 text-white font-bold'>
            <span>
                ( {getTotalItens()} )
            </span>
            <span>
                Veja seu carrinho
            </span>
            <span>
                <PiShoppingCartDuotone size={25} />    
            </span>
        </div>
    </ModalCartManagement>
  )
}
