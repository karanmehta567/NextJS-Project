import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const VIDEO_DIMESNIONS={
    height:1920,
    width:1080
} as const

export interface VUser{
    _id?:mongoose.Types.ObjectId
    title:string,
    description:string
    VideoUrl:string,
    thumbnailUrl:string,
    controls?:boolean,
    transformation?:{
        height:number,
        width:number,
        quality?:number
    }
}
const VideoSchema=new mongoose.Schema<VUser>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnailUrl:{
        required:true,
        type:String
    },
    VideoUrl:{
        type:String,
        required:true
    },
    controls:{
        type:Boolean,
        default:true
    },
    transformation:{
        width:{
            type:Number,
            default:VIDEO_DIMESNIONS.width
        },
        height:{
            type:Number,
            default:VIDEO_DIMESNIONS.height
        },
        quality:{
            type:Number,
            min:1,
            max:100
        }
    }
})
export const Video=mongoose.models?.Video || mongoose.model<VUser>('Video',VideoSchema)