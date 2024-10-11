import { addReaction } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse, {params}:{params:{messageId:number}}) {
    try{
        const {messageId} = params;
        const {emoji, userId}= await req.json()
        const reaction = await addReaction(messageId, emoji)
        return NextResponse.json({emoji:reaction.emoji, count: reaction.count })
    }catch(e){
        NextResponse.json({error: "Failed to add reaction"}, {status:500})
    }
}