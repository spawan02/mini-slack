import { currentUser } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const email = (req.nextUrl.searchParams.get('email'));
    try{
        if(email){

            const user = await currentUser(email)
            return NextResponse.json({user}, {status: 200 })    
        }
    }catch(e){
        return NextResponse.json({error: "error retrieving user"})
    }
}