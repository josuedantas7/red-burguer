import TableListOrders from '@/components/Table/TableListOrders'
import React from 'react'

export default function Orders() {
  return (
    <div>
      <h1 className='text-2xl my-4 font-extrabold text-center'>Lista de pedidos</h1>
      <div className="w-[80%] mx-auto">
        <TableListOrders />
      </div>
    </div>
  )
}
