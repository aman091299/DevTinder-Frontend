"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/store/userFeedSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "./Loader";
import Card from "./Card";

const Feed = () => {
 
  const [loading, setLoading] = useState(true);
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("user inside use effect")
    if (typeof window !== "undefined") {
      const userParse = localStorage.getItem("user");
      const user = JSON.parse(userParse);
    console.log("user",user)
      if (!user) {
        router.push("/login");
      } else {
        getFeed(feed);
      }
    }
  }, []);

  async function getFeed(feed) {
    try {

      setLoading(true);
      console.log("get feedss",feed)
    
        const res = await axios.get(BASE_URL + "/feed?page=1&limit=50", {
          withCredentials: true,
        });
        console.log("res",res);
        dispatch(addFeed(res?.data?.data));
     
    } catch (error) {
       console.log("inside error",error)
      if (error?.status === 401) {
        return router.push("/login");
      }

      console.log("Error in feed page" + error.message);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <>
      <Loader />
    </>
  ) : feed.length === 0 ? (
    <>
      <div className=" text-center mt-40 text-2xl font-bold mb-61">
        NO FEED FOUNDED
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center mb-10">
      <Card {...feed[0]} id={feed[0]?._id} />
    </div>
  );
};

export default Feed;
