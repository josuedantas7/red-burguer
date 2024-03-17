import { FormLoginUser } from '@/components/Form/FormLoginUser'
import React from 'react'

const Login = () => {
  return (
    <div className='w-[500px] mx-auto pt-32'>
        <h1 className='text-2xl font-bold text-center mb-8'>Faça seu Login</h1>
        <FormLoginUser />
    </div>
  )
}

export default Login
