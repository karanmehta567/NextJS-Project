import { ConnectToDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {email,password}=await request.json()
        if(!email ||!password){
            return NextResponse.json(
                {error:'Email and Password are required'},
                {status:400}
            )
        }
        await ConnectToDb()
        const exisitingUser=await User.findOne({email})
        if(exisitingUser){
            return NextResponse.json(
                {error:'User already registered'},
                {status:402}
            )
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message:'User registered'},
            {status:200}
        )
    } catch (error) {
        console.log('Reg error',error)
        return NextResponse.json(
            {error:'Failed to register'},
            {status:400}
        )
    }
}