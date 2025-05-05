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
    <div className="card bg-base-100 w-[274px] shadow-sm mx-4 my-4">
  <figure>
  { photoUrl && <img
      src={photoUrl}
      alt="user photo"  className="w-[260px] h-[340px] p-2 "/>
      }
  
  </figure>
  <div className="card-body">
    <h2 className="">{firstName && firstName + " " + lastName}</h2>
    
    <h2 className=""> {age&&gender && age + "," +gender}</h2>
    <p> {about}</p>
    {connections &&
    <Link href={"/chat/" +_id}>
<button className="btn btn-accent cursor-pointer">Chat Here</button>
</Link>
 }
  </div>
  {connectionId && sender &&
  <div className="mb-4 flex gap-3  ml-6">
  <button className="btn btn-primary" onClick={()=>handleRequest('accepted',connectionId)}>Accept</button>
  <button className="btn btn-secondary" onClick={()=>handleRequest('rejected',connectionId)}>Reject</button>
  </div>
  }
  {connectionId && !sender &&
  <div className="text-white p-4 w-42 m-4 rounded-lg bg-green-300 border">
    Not Accepted Yet...
  </div>
  }
  {id &&
    <div className="mb-4 flex gap-3  ml-6">
  <button className="btn btn-primary" onClick={()=>handleRequestSend('interested',id)}>Interested</button>
  <button className="btn btn-secondary" onClick={()=>handleRequestSend('ignored',id)}>Ignored</button>
  </div>
  }
</div>
  )
}

export default Card