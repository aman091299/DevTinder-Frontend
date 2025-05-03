
import { NextResponse } from 'next/server'

const protectedRoutes=['/','/profile','/connections','/request'];

export const middleware= (req)=>{

    const path = req?.nextUrl?.pathname;
    const token = req.cookies.get('token')?.value;
    console.log('token',token);
  
    if(protectedRoutes.includes(path) && ! token ){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    
    return NextResponse.next();

}

export const config={
    matcher:['/','/profile','/connections','/request']
}
