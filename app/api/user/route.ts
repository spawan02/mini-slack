import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    const session = getServerSession(authOptions);
    return NextResponse.json({
        session
    })
}