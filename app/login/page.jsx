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
const router=useRouter();
const dispatch=useDispatch();

async function loginHandler(){

 try {

  const res=await axios.post(BASE_URL + "/login",{
    emailId:email,
    password
  },{ withCredentials: true })


 if(res.data.success){
  dispatch(addUser(res.data.data))
  router.push('/')
 }

 } catch (error) {
  console.error("Error  " + error.message)
 }

 
}


  return loading ?
  ( <>
  <span className="loading loading-xl loading-spinner text-error absolute left-1/2 top-1/2"></span>
  </>)
  :(
   <div className="flex justify-center mt-15 items-center ">
  <fieldset className="fieldset  bg-zinc-50 border-zinc-300  shadow-lg rounded-box w-xs border  p-5">
  <legend className="fieldset-legend ">Login</legend>

  <label className="label my-1">Email</label>
  <input type="email" className="input focus:outline-none" placeholder="Email" value={email} onChange={(e)=>{
  setEmail(e.target.value)
  }} />

  <label className="label  my-1">Password</label>
  <input type="password" className="input focus:outline-none" placeholder="Password" value={password}  onChange={(e)=>{
    setPassword(e.target.value)
  }}/>

  <button className="btn btn-neutral mt-4" onClick={loginHandler}>Login</button>
</fieldset>


</div>

  )
}

export default Login