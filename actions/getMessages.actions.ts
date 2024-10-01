"use server"
import prisma from "@/prisma/src";

export const getMessages=async() => {
    const messages = await prisma.message.findMany({
        select:{
            content:true
        },
        orderBy: {
            timeStamp: 'desc'
        }
    })
    return messages.map(message => message.content)
}