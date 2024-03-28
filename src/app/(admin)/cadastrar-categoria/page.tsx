import { FormRegisterCategory } from '@/components/Form/FormRegisterCategory'
import { TableListCategories } from '@/components/Table/TableListCategories'
import React from 'react'

const RegisterCategory = () => {
  return (
    <div>
      <h1 className='my-12 max-[900px]:my-4 text-2xl font-bold text-center'>Cadastre a Categoria</h1>
      <div className='w-[800px] mx-auto max-[850px]:w-[95%]'>
        <FormRegisterCategory />
      </div>
      <div className='w-[800px] mx-auto max-[850px]:w-[95%]'>
        <h1 className='text-2xl font-bold text-center my-4'>Lista de categories</h1>
        <TableListCategories />
      </div>
    </div>
  )
}

export default RegisterCategory
