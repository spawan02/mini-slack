import { createMessage, getMessages } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params,}:{params:{Idchannel: number}}){
    const channelId = Number(params.Idchannel);
    if (!params) {
        return NextResponse.json({ error: 'Params are missing' }, { status: 400 });
    }
    try{
        const messages = await getMessages(channelId);
        return NextResponse.json(messages)
    }catch(e){
        return NextResponse.json({error: "Failed to fetch messages"}, {status:500})
    }
}

export async function POST(req: NextRequest, {params}:{params: {Idchannel: number}}) {
    try {
        const channelId = Number(params.Idchannel);
        const {content, userId} = await req.json()
        const newMessage = await createMessage(userId, content, channelId);
        return NextResponse.json(newMessage, {status:200})
    }   catch(error){
        return NextResponse.json({error: "Failed to create message"}, {
            status:500
        })

    }
    
}