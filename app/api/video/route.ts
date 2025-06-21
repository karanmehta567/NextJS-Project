import { authOptions } from "@/lib/auth";
import { ConnectToDb } from "@/lib/db";
import { Video, VUser } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await ConnectToDb()
        const viedeos=await Video.find({}).sort({createdAt:-1}).lean()
        if(!viedeos|| viedeos.length==0){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(viedeos)
    } catch (error) {
        return NextResponse.json({
            error:'Failed to fetch videos'
        },{status:500})
    }
}
export async function POST(request:NextRequest){
    try {
        const session=await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({
                error:'You cannot upload videos,Unauthorized'
            },{status:400})
        }
        await ConnectToDb()
        const body:VUser=await request.json()
        if(!body.title||!body.description||!body.thumbnailUrl||!body.VideoUrl){
             return NextResponse.json({
                error:'Fields Missing'
            },{status:400})
        }
        const videoData={
            ...body,
            controls:body?.controls??true,
             transformation:{
                height:1920,
                width:1080,
                quality:body.transformation?.quality??100
    }
        }
        const newVideo=await Video.create(videoData)
        return NextResponse.json(newVideo)
    } catch (error) {
         return NextResponse.json({
                error:'Failed request while creating video,try again!!!!!'
            },{status:500})
    }
}