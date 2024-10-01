"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/src";
import { getServerSession } from "next-auth";

export const getMessages=async() => {
    const session = await getServerSession(authOptions)
    const messages = await prisma.message.findMany({
        where:{
            userId: session?.user?.id
        },
        select:{
            content:true
        },
        orderBy: {
            timeStamp: 'desc'
        }
    })
    return messages.map(message => message.content)
}