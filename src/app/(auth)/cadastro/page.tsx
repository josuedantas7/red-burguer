import { FormRegisterUser } from '@/components/Form/FormRegisterUser'
import React from 'react'

const Register = () => {
  return (
    <div className='w-[500px] mx-auto pt-32'>
        <h1 className='text-2xl font-bold text-center mb-8'>Faça seu Cadastro</h1>
        <FormRegisterUser />
    </div>
  )
}

export default Register
