import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import BackGroundImage from '@/app/assets/bg.png'

export async function GET(){


    try{
        const response = await prisma.marketinfo.findFirst()

        if (!response) {
            const response = await prisma.marketinfo.create({
                data: {
                    name: 'Red Burguer',
                    address: 'Av. Amazonas QD 118 LT 04',
                    image: 'https://firebasestorage.googleapis.com/v0/b/red-burguer-fb60c.appspot.com/o/products%2F533f5b8d-084c-4293-93a9-06b0286dc4d2?alt=media&token=56dd3c2b-8074-4eb1-9bad-c024aa2002bd',
                    opening_hours: 'Sáb á Dom - 18:00 as 23:30',
                }
            })

            return NextResponse.json(response, {status: 200})
        } else {
            return NextResponse.json(response, {status: 200})
        }
    }catch{
        return NextResponse.json({message:'Erro ao buscar informações da Hamburgueria'}, {status: 500})
    }
}