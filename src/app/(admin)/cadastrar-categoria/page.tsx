import { FormRegisterCategory } from '@/components/Form/FormRegisterCategory'
import React from 'react'

const RegisterCategory = () => {
  return (
    <div>
      <h1 className='my-12 max-[900px]:my-4 text-2xl font-bold text-center'>Cadastre o Produto</h1>
      <div className='w-[800px] mx-auto max-[850px]:w-[95%]'>
        <FormRegisterCategory />
      </div>
    </div>
  )
}

export default RegisterCategory
