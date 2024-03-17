'use client'
import { useState } from 'react'
import { InputPrimary } from '../InputPrimary/InputPrimary'
import { Button } from '../ui/button'
import { UserProps } from '@/@types/UserProps'
import { Notification } from '../Notifier/Notification'
import { api } from '@/lib/api'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function FormRegisterUser() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const [isLoading,setIsLoading] = useState<boolean>(false)

    const router = useRouter()

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
            await api.post('/api/user', {...data})
            await signIn('credentials', {
                ...data,
                redirect: false
            })
            router.push('/')
            Notification('success', 'Usuário cadastrado com sucesso')
        }catch{
            Notification('error', 'Erro ao cadastrar usuário')
        }finally{
            setIsLoading(false)
        }
}
  return (
    <form className='w-full flex flex-col gap-2' onSubmit={(e) => handleRegisterUser(e)}>
        <InputPrimary value={name} onChange={setName} placeholder='Digite seu nome' type='text' />
        <InputPrimary value={email} onChange={setEmail} placeholder='Email' type='email' />
        <InputPrimary value={password} onChange={setPassword} placeholder='password' type='password' />
        <Button onClick={(e) => handleRegisterUser(e)}>{!isLoading ? 'Cadastrar' : 'Cadastrando...'}</Button>
    </form>
  )
}
