import React from 'react'
import { Input } from '../ui/input'
import { InputPrimaryProps } from '@/@types/TypesPropsComponents/InputPrimaryProps'

export function InputPrimary({ type, placeholder, onChange, value } : InputPrimaryProps) {
  return (
    <Input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        type={type} 
        placeholder={placeholder} 
    />
    )
}
