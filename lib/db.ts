import mongoose from "mongoose";
const MONGODB_URL=process.env.MONGODB_URI
if(!MONGODB_URL){
    throw new Response('Theres no connection link with DB!')
}
let cached=global.mongoose
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}
export async function ConnectToDb(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const options={
            bufferCommands:true,
            maxPoolSize:10
        }
        cached.promise=mongoose.connect(MONGODB_URL as string,options).then(()=>mongoose.connection)
    }
     try {
        cached.conn=await cached.promise
    } catch (error) {
        cached.promise=null
        throw error
    }
    return cached.conn
}