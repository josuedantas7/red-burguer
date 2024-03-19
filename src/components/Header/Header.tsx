import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { HiLogout } from "react-icons/hi";
import { ButtonSignOut } from '../Button/ButtonSignOut';


export async function Header() {

    const session = await getServerSession(authOptions)


    if (!session || !session.user) {
        return 
    }

    return (
        <div className='flex justify-center py-2 items-centerrelative'>
            <div className='flex max-[480px]:flex-col justify-center gap-8 max-[480px]:gap-1 items-center'>
                <Link className='font-semibold hover:scale-110 duration-300' href={'/'}>Home</Link>
                <Link className='font-semibold hover:scale-110 duration-300' href={'/cadastrar-produto'}>Cadastrar Produto</Link>
                <Link className='font-semibold hover:scale-110 duration-300' href={'/cadastrar-categoria'}>Cadastrar Categoria</Link>
            </div>
            <ButtonSignOut/>
        </div>
    )
}
