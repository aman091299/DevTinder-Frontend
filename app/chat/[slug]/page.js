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
  const userSlice = useSelector((store) => store.user);
  const [user,setUser]=useState(userSlice);
  const params = useParams();
  const targetUserId = params.slug;

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
          senderId: mes.senderId._id,
        };
      });

      setNewMessage([...chatDetails]);
    } catch (error) {
      console.log("Error in fetch chat data", error);
    }
  };

  useEffect(() => {
    fetchGetChat();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userParse = localStorage.getItem("user");
      const user = JSON.parse(userParse);
      if (!user) {
        setUser(user);
      }
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", { targetUserId, userId, firstName });
    //it is recieving message continuously listning for message
    socket.on("messageRecieved", ({ text, firstName, photoUrl, userId }) => {
      setNewMessage((prev) => [
        ...prev,
        {
          text,
          firstName,
          date: Date.now(),
          photoUrl,
          _id: Date.now().toString(),
          senderId: userId,
        },
      ]);
    });
    return () => {
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
      <div className=" border md:w-[740px] mx-4 md:mx-auto mt-10 md:mt-4 mb-7  flex flex-col h-[500px] md:h-[440px]">
        <div className="text-center font-bold  md:text-2xl py-2 md:py-3 border-b-1 ">
          Chatting
        </div>
        <div className="overflow-y-scroll py-2 md:py-3 px-2 md:px-4">
          {newMessage.length !== 0 &&
            newMessage?.map((msg) => (
              <div
                key={msg?._id}
                className={
                  "chat " +
                  (msg?.senderId === userId ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-image avatar">
                  <div className=" w-8 md:w-10 rounded-full">
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
                <div className="chat-bubble min-h-4 py-.7 px-1 md:min-h-6 md:py-3 md:px-4">
                  {msg?.text}
                </div>
                <div className="chat-footer opacity-50">Seen at 10:46</div>
              </div>
            ))}
        </div>
        <div className="mt-auto border-t-1">
          <div className="flex items-center gap-6 m-4 ">
            <input
              type="text"
              placeholder="Send the message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className=" placeholder:text-xs md:placeholder:text-lg  pl-2 md:pl-6 md:py-3 py-1.5 w-8/10 md:w-8/10 border-1 rounded-lg focus:outline-none"
            />
            <button
              className="btn  btn-secondary py-1.5 md:py-6 px-6 md:px-10"
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
