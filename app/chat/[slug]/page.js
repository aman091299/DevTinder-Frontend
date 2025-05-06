"use client";
import { createSocketConnection } from "@/app/utils/store/socket";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";

const Chat = () => {

  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const params = useParams();
  const targetUserId = params.slug;
  const user = useSelector((store) => store.user);

  const userId = user?._id;
  const firstName = user?.firstName;
  const photoUrl = user?.photoUrl;
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const fetchGetChat = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      if (!chat?.data?.data) {
        return setNewMessage("");
      }

      const messages = chat?.data?.data?.messages;

      const chatDetails = messages?.map((mes) => {
        return {
          text: mes.text,
          firstName: mes.senderId.firstName,
          lastName: mes.senderId.lastName,
          photoUrl: mes.senderId.photoUrl,
          date: mes.createdAt,
          _id: mes._id,
          senderId:mes.senderId._id
        };
      });

      setNewMessage((prev) => [...chatDetails]);
    } catch (error) {
      console.log("Error in fetch chat data", error);
    }
  };
  useEffect(() => {
    console.log("inside socket useffecct11");
    fetchGetChat();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.emit("joinChat", { targetUserId, userId, firstName });
    //it is recieving message continuously listning for message
    socket.on("messageRecieved", ({ text, firstName, photoUrl,userId }) => {
      setNewMessage((prev) => [
        ...prev,
        {
          text,
          firstName,
          date: Date.now(),
          photoUrl,
          _id: Date.now().toString(),
          senderId:userId
        },
      ]);
    });
    return () => {
      console.log("disconnect websocket");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = (message) => {
    if (message) {
      const socket = createSocketConnection();
      socket.emit("sendMessage", {
        userId,
        targetUserId,
        text: message,
        firstName,
        photoUrl,
        
      });
      return setMessage("");
    } else {
      return;
    }
  };

  return (
    <div>
      <div className=" border w-[700px] mx-auto mt-4 mb-7 min-h-[400px] flex flex-col overflow-y-scroll h-[400px]">
        <div className="text-center font-bold text-2xl py-3 border-b-1 ">
          Chatting
        </div>

        {newMessage.length !== 0 &&
          newMessage?.map((msg) => (
      
            <div key={msg?._id} className={"chat " + (msg?.senderId===userId? "chat-end":"chat-start") }>
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
                <time className="text-xs opacity-50">
                  {formatDate(msg?.date)}
                </time>
              </div>
              <div className="chat-bubble">{msg?.text}</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          ))}

        <div className="mt-auto border-t-1">
          <div className="mt-4 flex items-center gap-5 mb-3 ml-4 ">
            <input
              type="text"
              placeholder="Send the message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="py-2 px-4 border-1 rounded-lg focus:outline-none"
            />
            <button
              className="btn btn-success py-2"
              onClick={() => sendMessage(message)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
