import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import {  removeFeedUser} from '../utils/store/userFeedSlice'
import Link from 'next/link';

const Card = ({id,removeConnections,connectionId,sender,_id
  ,firstName,lastName,age,gender,skills,about,photoUrl,connections}) => {

const dispatch=useDispatch();
    const handleRequestSend=async(status,id)=>{
     try {
      const res=await axios.post(BASE_URL+ "/request/send/" + status + "/"+ id,{},{withCredentials:true});
      dispatch(removeFeedUser(id));
     } catch (error) {
      console.error("Error" + error)
     }
    }
  const handleRequest=async(status,requestId)=>{
        try{
        
          const res=await axios.post(BASE_URL+"/request/review/"+status+"/" + requestId,{},{withCredentials:true});
          removeConnections(requestId);
        }
        catch(err){
          console.error("Failed to handle request" +err);
        }
  }

  return  (
    <div className="card bg-base-100 w-[265px] shadow-sm mt-4 py-2 px-4">
  <figure>
  { photoUrl && <img
      src={photoUrl}
      alt="user photo"  className="w-[220px] h-[240px] md:w-[260px] md:h-[340px] p-2 "/>
      }
  
  </figure>
  <div className="card-body gap-1 px-[11px] py-[16px]">
  <div className="flex gap-4">
    <span >{firstName && firstName + " " + lastName }</span>
    <span> {age&&gender && age + "," +gender}</span>
    </div>
    <p> {about}</p>
    {connections &&
    <Link href={"/chat/" +_id}>
<button className="btn  btn-secondary cursor-pointer w-full mt-2">Chat Here</button>
</Link>
 }
  </div>
  {connectionId && sender &&
 <div className="flex gap-6 m-4">
  <button className="btn btn-primary  w-5/11" onClick={()=>handleRequest('accepted',connectionId)}>Accept</button>
  <button className="btn btn-secondary w-5/11" onClick={()=>handleRequest('rejected',connectionId)}>Reject</button>
  </div>
  }
  {connectionId && !sender &&
  <div className="btn btn-secondary m-4">
    Requested
  </div>
  }
  {id &&
    <div className="flex gap-6 m-4">
  <button className="btn btn-primary w-5/11" onClick={()=>handleRequestSend('interested',id)}>Interested</button>
  <button className="btn btn-secondary w-5/11" onClick={()=>handleRequestSend('ignored',id)}>Ignored</button>
  </div>
  }
</div>
  )
}

export default Card