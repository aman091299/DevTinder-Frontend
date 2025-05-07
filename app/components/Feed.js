'use client'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { BASE_URL } from '../utils/constant';
import { addFeed } from '../utils/store/userFeedSlice';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Loader from './Loader';
import Card from './Card'
const Feed = () => {
  console.log("hey feed page")
  const userFeed=useSelector(store=>store.feed);
  const dispatch=useDispatch();
  const router=useRouter();
  const [loading,setLoading]=useState(true);
   const feed=useSelector(store=>store.feed);
  console.log(feed);
  
  async function  getFeed(){
    console.log("hey feed page3")
    try {
      setLoading(true);
      if(userFeed?.length===0){
  
        const res =await  axios.get(BASE_URL+'/feed?page=1&limit=50' ,{withCredentials:true});
        dispatch(addFeed(res.data.data))

         }
    } catch (error) {
      if(error?.status===401){
        return router.push('/login')
      }

      console.log("Error in feed page" +error.message)
    }
    finally{
      setLoading(false);
    }    
  } 
  useEffect(()=>{  
    console.log("hey feed page2")
    getFeed();
 },[])


 console.log("hey feed page1")
  
  return loading ? 
    (
      <>
      <Loader/>
      </>
    )
   :feed.length === 0?<><div className=" text-center mt-40 text-2xl font-bold mb-61">NO FEED FOUNDED</div></>
   : (<div className="flex justify-center items-center mb-10">
     <Card {...feed[0]}  id={feed[0]?._id}/>
  </div>)
}

export default Feed;