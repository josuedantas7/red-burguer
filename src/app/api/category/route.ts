import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name } = await request.json()

    if (!name) {
        return NextResponse.json({ error: "Category is required" }, { status: 400 })
    }

    try{
        const category = await prisma.category.create({
            data: {
                name: name
            }
        })
        return NextResponse.json(category, { status: 201 })
    }catch{
        return NextResponse.json({ error: "Error creating category" }, { status: 500 })
    }
}

export async function GET(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const id = searchParams.get("id")

    try{
        if (!id){
            const categories = await prisma.category.findMany()
            return NextResponse.json(categories, { status: 200 })
        }else{
            const category = await prisma.category.findUnique({
                where: {
                    id: id
                }
            })
            return NextResponse.json(category, { status: 200 })
        }
    }catch{
        return NextResponse.json({ error: "Error getting category" }, { status: 500 })
    }
}