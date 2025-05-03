
import { NextResponse } from 'next/server'

const protectedRoutes=['/','/profile','/connections','/request'];

export const middleware=async (req)=>{
    console.log("inside middleware")
    const path = req?.nextUrl?.pathname;
   console.log('path',req?.nextUrl?.pathname);
    const token = req.cookies.get('token')?.value;
    console.log('token',token);
  
    if(protectedRoutes.includes(path) && ! token ){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    
    return NextResponse.next();

}

export const config={
    matcher:["/login", '/feed','/profile','/request']
}
