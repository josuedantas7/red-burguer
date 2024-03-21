'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

export function ButtonUpdateProduct() {

    const { pending } = useFormStatus()

  return <Button className='w-full' type='submit'>{pending ? 'Atualizando...' : 'Atualizar'}</Button>
}
