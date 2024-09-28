import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const session = await getServerSession(authOptions)
        if (session.user){
            return NextResponse.json({
                user: session.user
            })
        }
    }catch{
        redirect("/ ")
    }
}