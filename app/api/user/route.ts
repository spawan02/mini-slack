import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    const session = getServerSession(authOptions);
    NextResponse.json({
        session
    })
}