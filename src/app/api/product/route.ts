import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    
    const { searchParams } = new URL(request.url)

    const idCategory = searchParams.get('idCategory')


    try{
        if (idCategory){
            const products = await prisma.product.findMany({
                where: {
                    idCategory: idCategory
                }
            })
            return NextResponse.json(products)
        }else{
            const products = await prisma.product.findMany()
            return NextResponse.json(products)
        }
    }catch{
        return NextResponse.json({error: 'Error fetching products'}, {status: 500})
    }
}

export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const { name, description, price, image, idCategory } = await request.json()

    if (!name || !price || !image || !idCategory){
        return NextResponse.json({error: 'All fields are required'}, {status: 400})
    
    }

    try{
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                idCategory
            },
        })
        return NextResponse.json(product, {status: 201})
    }catch{
        return NextResponse.json({error: 'Error creating product'}, {status: 500})
    }
}