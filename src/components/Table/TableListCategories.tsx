import prisma from '@/lib/db'
import Link from 'next/link'
import React from 'react'

export async function TableListCategories() {

    const categories = await prisma.category.findMany()

  return (
    <div className='bg-zinc-200 p-5 rounded-lg border border-gray-900'>
        <div className='font-bold px-3 flex justify-between'>
            <p className='w-1/3'>Nome:</p>
        </div>
        <div className='flex flex-col gap-1.5'>
            {categories.map((category) => (
                <Link href={`/category/${category.id}`} key={category.id} className='flex bg-gray-500 border border-green-500 py-1 rounded-md px-3 justify-between'>
                    <p className='w-1/3'>{category.name}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}
