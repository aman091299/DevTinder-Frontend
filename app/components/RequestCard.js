import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import {  removeFeedUser} from '../utils/store/userFeedSlice'
import {useState,useRef} from 'react';
import Link from 'next/link';
import ButtonLoader from './ButtonLoader';
import Image from 'next/image'

const RequestCard= ({isPending,id,removeConnections,connectionId,sender,_id
  ,firstName,lastName,age,gender,skills,about,photoUrl,connections}) => {
  

    const [loading,setLoading]=useState('');
  
    const loadHandler=()=>{
      setLoading('chatHere')
    }
const dispatch=useDispatch();
    const handleRequestSend=async(status,id)=>{
     
     try {  
     
      setLoading(status);
      const res=await axios.post(BASE_URL+ "/request/send/" + status + "/"+ id,{},{withCredentials:true});
      dispatch(removeFeedUser(id));
     } catch (error) {
      console.error("Error" + error)
     }finally{
      setLoading('')
     }
    }


  return  (
    <div className="card  bg-base-300 md:bg-base-100 md:w-[calc(100%/4px)] shadow-sm mt-4 py-1 px-1">
  <figure>
  { photoUrl && <Image width={264} height={300}
      src={photoUrl}
      alt={firstName + "profile"}  className="w-[264px] h-[300px] md:w-[268px] md:h-[280px] p-2 object-cover"/>
      }
  
  </figure>
  <div className="card-body w-[264px] px-[8px] py-[12px] ">
  <div className="flex gap-4">
    <span >{firstName && firstName + " " + lastName }</span>
    <span> {age&&gender && age + "," +gender}</span>
    </div>
    <p className="line-clamp-4"> {about&&about}</p>
    {connections &&
    <Link href={"/chat/" +_id}>
<button className="btn  btn-secondary cursor-pointer w-full mt-2"  disabled={loading==='chatHere'} onClick={loadHandler}>Chat Here</button>
</Link>
 }
  </div>
  {sender &&
 <div className="flex gap-6 mb-3 px-2 ">
  <button className="btn btn-primary  btn-outline flex-1" disabled={loading==='accepted'} onClick={()=>handleRequest('accepted',connectionId)}>{loading==='accepted'?
  
   <div className="flex gap-1">
    <span> Proccessing...</span>
     <ButtonLoader/>
   </div>
  :'Accept'}</button>
  <button className="btn btn-secondary btn-outline flex-1 " disabled={loading==='rejected'} onClick={()=>handleRequest('rejected',connectionId)}>{loading==='rejected'?  <div className="flex gap-1">
    <span> Proccessing...</span>
     <ButtonLoader/>
   </div>:'Reject'}</button>
  </div>
  }
  {!sender &&
  <div className="bg-gray-500  text-gray-300 py-2 px-4 rounded-sm text-center mb-3 mx-2">
    Pending
  </div>
  }
  
</div>
  )
}

export default RequestCard;