
import { NextResponse } from 'next/server'

const protectedRoutes=['/','/profile','/connections','/request','/membership'];

export const middleware= (request)=>{
 try{
    const path = request?.nextUrl?.pathname;
   const token = request.headers.get("authorization")?.split(" ")[1] || request.cookies.get("token")?.value||1;
    if(protectedRoutes.includes(path) && ! token ){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
    return NextResponse.next();

 }catch(error){
    console.log("ERROR ",error);
 }
   

}

export const config={
    matcher:['/','/profile','/connections','/request','/membership']
}
