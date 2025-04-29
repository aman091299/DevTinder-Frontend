'use client'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { BASE_URL } from '../utils/constant';
import { addFeed } from '../utils/store/userFeedSlice';
import {useRouter} from 'next/navigation';
import axios from 'axios';
const Body = () => {

  const user=useSelector(store=>store.user)
  const userFeed=useSelector(store=>store.feed);
  const dispatch=useDispatch();
  const router=useRouter();
  const [loading,setLoading]=useState(false);

  async function  getFeed(){
 
    try {
      setLoading(true);
      if(userFeed?.length===0){
  
        const res =await  axios.get(BASE_URL+'/feed?page=1&limit=4' ,{withCredentials:true});
        dispatch(addFeed(res.data.data))

         }
    } catch (error) {
      if(error?.status===401){
        router.push('/login')
      }

      console.log("Error in feed page" +error.message)
    }
    finally{
      setLoading(false);
    }    
  } 
  useEffect(()=>{  
      getFeed();
  },[])


  
  return loading ? 
    (
      <>
      <span className="loading loading-xl loading-spinner text-error absolute left-1/2 top-1/2"></span>
      </>
    )
   : (<div>
  feed
  </div>)
}

export default Body;