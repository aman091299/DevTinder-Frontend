'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { use } from 'react'
import { useState } from 'react';
import {BASE_URL} from '../utils/constant'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/store/userSlice';

const Login = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const  [loading ,setLoading]=useState(false);
const [error,setError]=useState(false);
const router=useRouter();
const dispatch=useDispatch();
const [isLogin,setIsLogin]=useState(true);
const [firstName,setFirstName]=useState('');
const [lastName,setLastName]=useState('');

const SignUpHandler=async()=>{
  try{
    const res=await axios.post(BASE_URL+'/signup',{emailId:email,password,firstName,lastName},{withCredentials:true});
    console.log(res);
    if(res?.data?.success){
      dispatch(addUser(res?.data?.data))
      router.push('/profile')
     }
  }
  catch(error){
    console.log(error)
    setError(error?.response?.data?.message)
    console.error("Error  " + error?.message)
    
  }
  
}
async function loginHandler(){
setError('')
 try {

  const res=await axios.post(BASE_URL + "/login",{
    emailId:email,
    password
  },{ withCredentials: true })
  console.log('res',res);
  const cookies = document.cookie;
  console.log('cookies',cookies);
  const token1= cookies.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
console.log('token',token1)
  console.log("login token",token1);
 if(res?.data?.success){
  dispatch(addUser(res.data.data))
  console.log("inside this1")
 
   router.push('/')
   console.log("inside this1")
   return ;
 }

 } catch (error) {
  setError(error?.response?.data?.message)
 
  console.error("Error  " + error.message)
 }

 
}


  return loading ?
  ( <>
  <span className="loading loading-xl loading-spinner text-error absolute left-1/2 top-1/2"></span>
  </>)
  :(<>
   <div className="flex justify-center mt-15 items-center mb-23">
  <fieldset className="fieldset  bg-zinc-50 border-zinc-300  shadow-lg rounded-box w-xs border  p-5">
  <legend className="fieldset-legend ">{isLogin?'Login':'Signup'}</legend>

  {!isLogin && <><label className="label my-1">FirstName</label>
  <input type="text" className="input focus:outline-none" placeholder="FirstName" value={firstName} onChange={(e)=>{
  setFirstName(e.target.value)
  }} />
    <label className="label my-1">LastName</label>
  <input type="text" className="input focus:outline-none" placeholder="LastName" value={lastName} onChange={(e)=>{
  setLastName(e.target.value)
  }} />
  </>
  }
  <label className="label my-1">Email</label>
  <input type="email" className="input focus:outline-none" placeholder="Email" value={email} onChange={(e)=>{
  setEmail(e.target.value)
  }} />

  <label className="label  my-1">Password</label>
  <input type="password" className="input focus:outline-none" placeholder="Password" value={password}  onChange={(e)=>{
    setPassword(e.target.value)
  }}/>
{ isLogin ?<button className="btn btn-neutral mt-4" onClick={loginHandler}>Login</button>:
<button className="btn btn-neutral mt-4" onClick={SignUpHandler}>SignUp</button>
}

<div className=" cursor-pointer text-[13px] font-medium" onClick={()=>setIsLogin(prev=>!prev)}>{isLogin?"New User SignUp from Here":"Login from Here"}</div>

  {
    error && 
    <div className="text-red-700 text-md mt-1">
    {error}
    </div>
   }

</fieldset>

</div>
   
   </>
  )
}

export default Login