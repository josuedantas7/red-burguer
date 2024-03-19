'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { HiLogout } from 'react-icons/hi'
import { Notification } from '../Notifier/Notification'

export function ButtonSignOut() {

    async function handleSignOut(){
        try{
            await signOut()
            Notification('success', 'Deslogado com sucesso')
        }catch{
            Notification('error', 'Erro ao deslogar')
        }
    }

  return (
    <HiLogout onClick={handleSignOut} className='text-red-900 cursor-pointer duration-300 hover:scale-110 text-2xl absolute right-6' />
  )
}
