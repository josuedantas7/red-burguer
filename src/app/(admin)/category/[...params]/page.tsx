import { Input } from '@/components/ui/input'
import prisma from '@/lib/db'
import React from 'react'
import { ButtonUpdateProduct } from '@/components/Button/ButtonUpdateProduct'
import { ModalDeleteCategory } from '@/components/Modal/ModalDeleteCategory'

const CategoryId = async ({params} : {params : {params : string}}) => {
    
    const id = params.params[0]

    const categoryId = await prisma.category.findUnique({
        where: {
            id: id
        }
    })

    console.log(categoryId)

    async function updateItem(FormData : FormData){
        "use server"
        const name = FormData.get('name')

        const data = {
            name: name || categoryId?.name,
        }

        try{
            await prisma.category.update({
                where: {
                    id: id
                },
                data: data as any
            })
        }catch(err){
            console.log('Erro ao atualizar produto',err)
        }
    }

    return (
    <div>
        <h1 className='text-2xl font-bold my-8 text-center'>{categoryId?.name}</h1>
        <form className='flex flex-col mx-auto gap-1.5 w-[800px] max-[900px]:w-[95%]' action={updateItem}>
            <Input name='name' placeholder={categoryId?.name} />
            <ButtonUpdateProduct/>
        </form>
        <ModalDeleteCategory id={categoryId?.id}/>
    </div>
  )
}

export default CategoryId
