"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import RequestCard from "../components/RequestCard";

const Request = () => {
  const [connectionsRequest, setConnectionsRequest] = useState(null);
  const [isPending,setIsPending]=useState(true);
  const router = useRouter();

  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const useStore = localStorage.getItem("user");
      const user = JSON.parse(useStore);
      if (!user) {
        router.push("/");
      } else {
        fetchConnectionsRequest();
      }
    }
  }, []);

  const removeConnections = (excludeConnectionId) => {
    const newConnections = connectionsRequest.filter((con) => {
      return con.connectionId !== excludeConnectionId;
    });

    setConnectionsRequest(newConnections);
  };
  const fetchConnectionsRequest = async () => {
    try {
      //connection request which status are interest
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
     
      setConnectionsRequest(res?.data?.data);
    } catch (error) {
      if (error?.status === 401) {
        router.push("/login");
      }

      console.log("Error in Connection Page" + error.message);
    }
  };
  if (!connectionsRequest) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
 
  const validConnections = connectionsRequest.filter((conn) => {
    return conn !== null;
  });
  console.log('validConnection',validConnections)

  if (validConnections?.length === 0) {
    return (
      <div className=" text-center mt-40 text-2xl font-bold mb-61">
        NO REQUESTS FOUNDED
      </div>
    );
  }

  return (
    <div>
    <div className=" flex justify-between">
    <div></div>
      <div className=" text-center my-1 md:my-5 ml-40 md:ml-40 text-2xl font-bold" >Request</div>
    <div className="tabs tabs-box  w-43 my-1 md:my-3 mr-8 md:mr-8">
  <input type="radio" name="my_tabs_1" className="tab" aria-label="Request" defaultChecked
  onClick={()=>setIsPending(true)}
  />
  <input type="radio" name="my_tabs_1" className="tab" aria-label="Pending"
   onClick={()=>setIsPending(false)}
  />
  </div>
  </div>
      <div>
        <div className="mx-4 md:ml-11  flex flex-row justify-center md:justify-normal flex-wrap gap-4 md:gap-7 mb-5 ">
          {validConnections.map((conn) => (
            <div key={conn.connectionId}>
            {(isPending === conn.sender)&&
            <RequestCard
              {...conn}
              key={conn.connectionId}
              removeConnections={removeConnections}

            />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
