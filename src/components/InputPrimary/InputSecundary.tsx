import React from 'react'
import { Input } from '../ui/input'
import { InputSecundaryProps } from '@/@types/TypesPropsComponents/InputSecundaryProps'

export function InputSecundary({ placeholder, onChange } : InputSecundaryProps) {
  return (
    <Input
        onChange={onChange} 
        type='text' 
        placeholder={placeholder}
    />
    )
}
