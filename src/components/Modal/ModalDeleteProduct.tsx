import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import prisma from '@/lib/db'
import { redirect } from 'next/navigation'

export async function ModalDeleteProduct({id} : { id : string | undefined}) {

    async function deleteProduct(){
        "use server"
        if (!id) return console.log('Id não encontrado')
        try{
            await prisma.product.delete({
                where: {
                    id: id
                }
            })
            console.log('Produto deletado com sucesso')
            redirect('/cadastrar-produto')
        }catch(err){
            console.log('Erro ao deletar produto',err)
        }
    }

  return (
      <AlertDialog>
            <AlertDialogTrigger className='flex flex-col mx-auto gap-1.5 w-[800px] max-[900px]:w-[95%] bg-red-800 hover:bg-red-300 duration-300 py-1.5 rounded-lg mt-8 text-center items-center text-white font-bold'>Excluir Produto</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Deseja excluir esse Produto?</AlertDialogTitle>
                <AlertDialogDescription>
                    Ao excluir o produto, ele será removido permanentemente.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={deleteProduct}>
                    <AlertDialogAction type='submit'>Excluir</AlertDialogAction>
                </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}
