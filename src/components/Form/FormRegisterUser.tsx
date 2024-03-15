'use client'
import { useState } from 'react'
import { InputPrimary } from '../InputPrimary/InputPrimary'
import { Button } from '../ui/button'
import { UserProps } from '@/@types/UserProps'
import { Notification } from '../Notifier/Notification'
import { api } from '@/lib/api'
import { signIn } from 'next-auth/react'

export function FormRegisterUser() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const [isLoading,setIsLoading] = useState<boolean>(false)

    async function handleRegisterUser(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsLoading(true)
        const data : UserProps = {
            name,
            email,
            password
        }

        if (!email || !password) {
            Notification('error', 'Preencha todos os campos')
        }
        try{
            const response = await api.post('/api/user', {...data})
            const responseLogin = await signIn('credentials', {
                ...data,
                callbackUrl: '/'
            })
            console.log('responseLogin', responseLogin)
            console.log('response post user', response)
            Notification('success', 'Usuário cadastrado com sucesso')
        }catch{
            Notification('error', 'Erro ao cadastrar usuário')
        }
}
  return (
    <form className='w-full flex flex-col gap-2' onSubmit={(e) => handleRegisterUser(e)}>
        <InputPrimary value={name} onChange={setName} placeholder='Digite seu nome' type='text' />
        <InputPrimary value={email} onChange={setEmail} placeholder='Email' type='email' />
        <InputPrimary value={password} onChange={setPassword} placeholder='password' type='password' />
        <Button onClick={(e) => handleRegisterUser(e)}>Cadastrar</Button>
    </form>
  )
}
