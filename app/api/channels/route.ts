import { createChannel, getChannels } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    // const {userId} = req.query;
    const userId = req.nextUrl.searchParams.get('userId');
    if(userId){
        try{
            const channels = await getChannels(Number(userId));
            return NextResponse.json(channels)
        }catch(e){
            return NextResponse.json({error: "failed to fetch channels"}, {status:500})
        } 
    }else{
        return NextResponse.json({
            mess:"Invalid userID"
        })
    }
}   

export async function POST(req:NextRequest) {
    try{
        const {name, creatorId} = await req.json()
        const newChannel = await createChannel(name, creatorId);
        return NextResponse.json(newChannel,{status:201})
    }
    catch(e){
        return NextResponse.json({error: "Failed to create a channel"}, {status: 501})
    }
}