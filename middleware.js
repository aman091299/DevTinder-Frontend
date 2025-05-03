
import { NextResponse } from 'next/server'

const protectedRoutes=['/','/profile','/connections','/request'];

export const middleware= (request)=>{
 try{
    // console.log('inside middlewarre',request);
    const path = request?.nextUrl?.pathname;
   const token = request.headers.get("authorization")?.split(" ")[1] || request.cookies.get("token")?.value||1
    console.log('token',token)
    if(protectedRoutes.includes(path) && ! token ){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
    return NextResponse.next();

 }catch(error){
    console.log("ERROR ",error);
 }
   

}

export const config={
    matcher:['/','/profile','/connections','/request']
}
