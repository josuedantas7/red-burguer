'use client'
import React from 'react'
import { InputPrimary } from '../InputPrimary/InputPrimary'
import { Button } from '../ui/button'
import { Notification } from '../Notifier/Notification'
import { api } from '@/lib/api'
import { CategoryProps } from '@/@types/CategoryProps'

export function FormRegisterCategory() {

    const [name,setName] = React.useState<string>('')

    const [loading,setLoading] = React.useState<boolean>(false)

    async function handleRegisterCategory(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true)
        const data : CategoryProps = {
            name
        }

        try{
            const response = await api.post('/api/category', {...data})
            Notification('success', 'Categoria cadastrada com sucesso')
        }catch{
            Notification('error', 'Erro ao cadastrar categoria')
        }finally{
            setLoading(false)
        }
    }

  return (
    <form className='w-full flex flex-col gap-2' onSubmit={handleRegisterCategory}>
        <InputPrimary value={name} onChange={setName} type='text' placeholder='Nome da Categoria' />
        <Button className='w-full' onClick={handleRegisterCategory}>{!loading ? 'Cadastrar' : 'Cadastrando...'}</Button>
    </form>
  )
}
