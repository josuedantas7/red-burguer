import { Input } from '@/components/ui/input'
import prisma from '@/lib/db'
import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { ButtonUpdateProduct } from '@/components/Button/ButtonUpdateProduct'

const ProductId = async ({params} : {params : {params : string}}) => {
    
    const id = params.params[0]

    const productId = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    const categories = await prisma.category.findMany()

    async function updateItem(FormData : FormData){
        "use server"
        const name = FormData.get('name')
        const description = FormData.get('description')
        const price = FormData.get('price')
        const idCategory = FormData.get('idCategory')

        const data = {
            name: name || productId?.name,
            price: price || productId?.price,
            description: description || productId?.description,
            idCategory: idCategory || productId?.idCategory
        }

        try{
            await prisma.product.update({
                where: {
                    id: id
                },
                data: data as any
            })
        }catch{
            console.log('Erro ao atualizar produto')
        }
    }

    return (
    <div>
        <h1 className='text-2xl font-bold my-8 text-center'>{productId?.name}</h1>
        <form className='flex flex-col mx-auto gap-1.5 w-[800px] max-[900px]:w-[95%]' action={updateItem}>
            <Input name='name' placeholder={productId?.name} />
            <Input name='description' placeholder={productId?.description as string} />
            <Input name='price' placeholder={productId?.price as unknown as string} />
            <Select name='idCategory'>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        category.id === productId?.idCategory ? (
                            <SelectItem key={category.id} value={category.id} defaultChecked>{category.name}</SelectItem>
                        ) : (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        )
                    ))}
                </SelectContent>
            </Select>
            <ButtonUpdateProduct/>
        </form>
    </div>
  )
}

export default ProductId
