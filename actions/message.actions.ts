"use server"
import prisma from "@/prisma/src"

export const createMessage = async (value: string) => {
                     
    try {
        await prisma.message.create({
            data: {
                content: value.trim(),
                userId: 1
            },
            include: {
                user: true
            }
        })
        // return new NextResponse(JSON.stringify(result))
    } catch (e) {
        console.error(e)
    }
}

