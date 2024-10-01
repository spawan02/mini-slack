"use server"
import { authOptions } from "@/lib/auth"
import prisma from "@/prisma/src"
import { getServerSession } from "next-auth"

export const createMessage = async (value: string) => {
    const session = await getServerSession(authOptions)  
    const userId = session?.user?.id 
    try {
        await prisma.message.create({
            data: {
                content: value.trim(),
                user:{
                    connect:{
                        id: userId
                    }
                }
            },
            include: {
                user: true
            }
        })
        // return new NextResponse(JSON.stringify(result))
    } catch (e) {
        console.error(e)
    }
    return true
}

