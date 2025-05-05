'use client'
import {useEffect,useState} from 'react';
import axios from 'axios'
import {BASE_URL} from '../utils/constant'
import Card from '../components/Card';
import Loader from '../components/Loader'
import {useRouter} from 'next/navigation';
const Connections = () => {

  const [connections,setConnections]=useState(null);
  const [loader,setLoader]=useState(false);
 
 const router=useRouter();

  useEffect(()=>{
    fetchConnections();
},[])

  const fetchConnections=async()=>{
    try {
      setLoader(true);
      //connection request accepted
    const res=await axios.get(BASE_URL+'/user/connections',{withCredentials:true});
    console.log(res)
    if(res?.data?.data){
      setConnections(res?.data?.data);
    }
   
    } catch (error) {
      if(error?.status===401){
        return router.push('/login');
      }

      console.log("Error in Connection Page" +error.message)
    }
    finally{
      setLoader(false);
    }
    
  }


  if(loader || !connections){
    return(<div><Loader/></div>);
  }

 // Clean up the connections array by filtering out null values
 const validConnections = connections?.filter(conn => conn !== null);
 if (!validConnections || validConnections?.length === 0) {
   return <div className="text-center mt-40 text-2xl font-bold mb-61">NO CONNECTIONS FOUND</div>;
 }
  return (
    <div >
    <div className="text-center my-2 text-2xl font-bold">
    Connections
    </div>
    <div>
    <div className="flex flex-row flex-wrap mx-4 my-4">
    {
      validConnections?.map((conn)=>{
          return   ( <Card {...conn} key={conn?._id} connections={true} />) 
      }
     
      )
    }
    </div>
  
    </div>
    </div>
  )
}

export default Connections