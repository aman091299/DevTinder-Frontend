'use client'
import {useEffect,useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/constant';
import Card from '../components/Card';
import Loader from '../components/Loader';
import {useRouter} from 'next/navigation';

const  Request = () => {
  const [connectionsRequest,setConnectionsRequest]=useState(null);
  const router=useRouter();
 
  useEffect(()=>{
    fetchConnectionsRequest();
},[])
   
  const removeConnections=(excludeConnectionId)=>{
   
    const newConnections= connectionsRequest.filter(con=>{
         return con.connectionId !== excludeConnectionId; 
     })
  
     setConnectionsRequest(newConnections);
  }
  const fetchConnectionsRequest=async()=>{
    try {
      //connection request which status are interest
    const res=await axios.get(BASE_URL+'/user/requests/recieved',{withCredentials:true});
    console.log(res?.data)
    setConnectionsRequest(res?.data?.data);
    } catch (error) {
      if(error?.status===401){
        router.push('/login');
      }

      console.log("Error in Connection Page" +error.message)
    }
    
  }
  if(!connectionsRequest){
    return(<div><Loader/></div>);
  }
  console.log(connectionsRequest);
  const validConnections=connectionsRequest.filter((conn)=>{
          return conn !== null;
  });
  console.log(validConnections)
  if(validConnections?.length===0 ){
    return (<div className=" text-center mt-40 text-2xl font-bold mb-61">NO REQUESTS FOUNDED</div>)
  }


  return (
    <div >
    <div className="text-center my-2 text-2xl font-bold">
    Request
    </div>
    <div>
    <div className="mx-8 flex flex-row justify-center md:justify-normal flex-wrap gap-4 md:gap-11 mb-5 ">
    {
      validConnections.map((conn)=>
        ( <Card {...conn}  key={conn.connectionId} removeConnections={removeConnections}/>)
      )
    }
    </div>
  
    </div>
    </div>
  )
}

export default Request