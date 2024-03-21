import { FormRegisterProduct } from '@/components/Form/FormRegisterProduct'
import { TableListProducts } from '@/components/Table/TableListProducts'
import React from 'react'

const RegisterProduct = () => {
  return (
    <div>
      <h1 className='my-12 max-[900px]:my-4 text-2xl font-bold text-center'>Cadastre o Produto</h1>
      <div className='w-[800px] mx-auto max-[850px]:w-[95%]'>
        <FormRegisterProduct />
      </div>
      <div className='w-[800px] mx-auto max-[850px]:w-[95%]'>
        <h1 className='text-2xl font-bold text-center my-4'>Lista de produtos</h1>
        <TableListProducts />
      </div>
    </div>
  )
}

export default RegisterProduct
