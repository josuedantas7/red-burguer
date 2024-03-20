'use client'
import React, { useState } from 'react'
import { InputPrimary } from '../InputPrimary/InputPrimary'
import { Button } from '../ui/button'
import { Notification } from '../Notifier/Notification'
import { signIn } from 'next-auth/react'
import { UserProps } from '@/@types/UserProps'
import { useRouter } from 'next/navigation'

export function FormLoginUser() {

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const router = useRouter()

    async function handleLoginUser(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsLoading(true)
        const data : UserProps = {
            email,
            password,
        }

        if (!email || !password){
            Notification('error', 'Preencha todos os campos')
        }

        const response = await signIn('credentials', {
            ...data, 
            redirect: false})
        
        if (response?.error){
            Notification('error', 'Email ou senha incorretos!')
            setIsLoading(false)
        } else{
            Notification('success', 'Login realizado com sucesso!')
            setIsLoading(false)
            router.replace('/')
            router.refresh()
        }
    }

  return (
    <form className='w-full flex flex-col gap-2' onSubmit={(e) => handleLoginUser(e)}>
        <InputPrimary value={email} onChange={setEmail} placeholder='Seu email' type='email' />
        <InputPrimary value={password} onChange={setPassword} placeholder='Sua senha...' type='password' />
        <Button onClick={(e) => handleLoginUser(e)}>{!isLoading ? 'Logar' : 'Logando...'}</Button>
    </form>
  )
}
