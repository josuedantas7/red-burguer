import { ProductProps } from "@/@types/ProductProps";
import prisma from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";


export async function GET(request: Request){

    const { searchParams } = new URL(request.url)

    const cartId = searchParams.get('id')

    if (!cartId){

        try{
            const allCarts = await prisma.cart.findMany({
                include: {
                    cartProducts: {
                        include: {
                            product: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })

            return NextResponse.json(allCarts)
        }catch{
            return NextResponse.json({error: 'Error on get all carts'})
        }
    }

    try{
        const cart = await prisma.cart.findFirst({
            where: {
                id: cartId
            },
            include: {
                cartProducts: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(cart)
    }catch(err){
        return NextResponse.json({error: `Error on get cart, ${err}`})
    }
}

export async function POST(request: Request){
    
    const { Products } = await request.json()

    const createCart = await prisma.cart.create({
        data: {}
    });

    try{
        const productsCart = await Promise.all(Products.map((product: ProductProps) => 
            prisma.cartProduct.create({
                data: {
                    quantity: product.quantity || 1,
                    product: {
                        connect: {
                            id: product.id || ''
                        }

                    },
                    cart: {
                        connect: {
                            id: createCart.id
                        }
                    }
                }
            })
        ));

        const updatedCart = await prisma.cart.findFirst({
            where: {
                id: createCart.id
            },
            include: {
                cartProducts: true
            }
        })

        return NextResponse.json(updatedCart)
        
    }catch(err){
        return NextResponse.json({error: `Error on create cart, ${err}`})
    }

}

export async function DELETE(request: Request){
    
        const { searchParams } = new URL(request.url)
    
        const cartId = searchParams.get('id')
    
        if (!cartId){
            return NextResponse.json({error: 'Cart id not found'})
        }
    
        try{

            const deletedCartProducts = await prisma.cartProduct.deleteMany({
                where: {
                    cartId: cartId
                }
            })

            const deletedCart = await prisma.cart.delete({
                where: {
                    id: cartId
                }
            })
    
            return NextResponse.json(deletedCart)
        }catch(err){
            return NextResponse.json({error: `Error on delete cart, ${err}`})
        }
}