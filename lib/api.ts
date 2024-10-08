import prisma from "@/prisma/src";


export async function getChannels(userId:number) {
    return await prisma.channel.findMany({
        where:{
            creatorId:userId
        },
        select: {
            id: true,
            name: true,
            _count:{
                select:{
                    messages:true
                }
            }
        }
    })
}

export async function getMessages(channelId:number, userId?: number) {
    if(userId){
        return await prisma.message.findMany({
            where:{
                userId
            }, 
            include:{
                user:true,
                reactions:true    
            },
            orderBy:{timeStamp: "asc"}
        })
    }
    return await prisma.message.findMany({
        where:{channelId:channelId}, 
        include:{
            user:true,
            reactions:true,
            replies:{
                include:{
                    user: true,
                    reactions:true
                }
            }
        }
    })
}

export async function createMessage(
    userId: number, 
    content: string,
    channelId?: number | null,
    parentId?: number, 
    ) {
    return await prisma.message.create({
        data:{
            content,
            userId,
            channelId,
            parentId
        },
        include:{
            user:true,
            reactions: true

        }
    })
}

export async function addReaction(messageId:number, emoji:string) {
    return await prisma.reaction.upsert({
        where: {
            messageId_emoji: {
              messageId,
              emoji
            }
          },
          update:{
            count:{increment:1}
          },
          create:{
            messageId,
            emoji,
            count:1
          }
    })
}


export async function currentUser(userId:number){
    return await prisma.user.findFirst({
        where:{
            id:userId
        }, 
       
    })
}

export async function createChannel(name:string, creatorId: number) {
    return await prisma.channel.create({
        data:{
            name,
            creatorId,
            
        },
        include:{
            users:{
                select: {
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    })
}

