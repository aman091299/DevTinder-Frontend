'use client'
import { createSocketConnection } from '@/app/utils/store/socket';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

const  Chat = () => {
  const [message,setMessage]=useState('');
  const [newMessage,setNewMessage]=useState([])
  const params=useParams();
  const targetUserId=params.slug;
  const user=useSelector(store=>store.user)
  
  const userId=user?._id;
  const firstName=user?.firstName;
  const photoUrl=user?.photoUrl;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(()=>{
   
    const socket=createSocketConnection();
  
    socket.emit("joinChat",{targetUserId,userId,firstName});
    //it is recieving message continuously listning for message
    socket.on('messageRecieved',({text,firstName,photoUrl})=>{
     setNewMessage((prev)=>[...prev,{text,firstName,date:Date.now(),photoUrl}]);
    })
     return ()=>{
      console.log("disconnect websocket")
      socket.disconnect();
     }
  },[])

const sendMessage=(message)=>{

  if(message){
    const socket=createSocketConnection();
    socket.emit("sendMessage",{userId,targetUserId,text:message,firstName,photoUrl})
     setMessage('');
  }
  else{
    return;
  }

};
  return (

    <div > 
  

    <div className=" border w-[700px] mx-auto mt-4 mb-7 min-h-[400px] flex flex-col overflow-y-scroll h-[400px]">
    <div className="text-center font-bold text-2xl py-3 border-b-1 ">Chatting</div>

     {
      newMessage?.map((msg)=>(
       
              <div key={msg?.date} className="chat  chat-start">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src={msg?.photoUrl}
        />
      </div>
    </div>
    <div className="chat-header">
      {msg?.firstName}
      <time className="text-xs opacity-50">{
    formatDate(msg.date)
  }</time>
    </div>
    <div className="chat-bubble">{msg?.text}</div>
    <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>)) }
<div className="mt-auto border-t-1">
  <div className="mt-4 flex items-center gap-5 mb-3 ml-4 ">
  <input type='text' placeholder='Send the message' value={message} onChange={(e)=>{
   setMessage(e.target.value);
  }} className="py-2 px-4 border-1 rounded-lg focus:outline-none"/>
  <button className="btn btn-success py-2" onClick={(()=>sendMessage(message))}>Send</button>
  </div>
  </div>
   </div>
   </div>
  )
}

export default Chat;