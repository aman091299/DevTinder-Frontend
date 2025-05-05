"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import Card from "../components/Card";
import {useRouter} from 'next/navigation';
import Loader from "../components/Loader";


const Profile = () => {

  const [user,setUser]=useState(null);
  const [loader,setLoader]=useState(true);
  const [form, setForm] = useState({
    firstName:"",
    lastName:"",
    age: "",
    gender: "",
    about:"",
    skills: "",
    photoUrl: "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png",
  });
  const [showtoast,setShowToast]=useState(false);
  const [error,setError]=useState('');
  const dispatch = useDispatch();
  const router=useRouter();
  
  useEffect(()=>{
    console.log("inside profile useeffect")
    const userStore=localStorage.getItem('user');
    const parseUser=JSON.parse(userStore);
    console.log("parsseUser",parseUser,userStore)
    if(!parseUser){
      return router.push("/login");
    }
    else{
      setUser(parseUser);
      setForm({
        firstName: parseUser.firstName || "",
        lastName: parseUser.lastName || "",
        age: parseUser.age || "",
        gender: parseUser.gender || "",
        about: parseUser.about || "",
        skills: parseUser.skills || "",
        photoUrl: parseUser.photoUrl || null,
      });
    }
     setLoader(false);
  },[])

  useEffect(()=>{
    const timer= setTimeout(()=>{
      setShowToast(false);
     },3000)
     return ()=>clearTimeout(timer)
  },[showtoast])

  const submitHandler = async (e) => {
    try {
     setError('')
      e.preventDefault();
      const validForm = Object.fromEntries(
        Object.entries(form).filter(([_, value]) => {
          return value !== "" && value != null && value?.length !== 0;
        })
      );
      console.log(validForm);
      const res = await axios.patch(BASE_URL + "/profile/edit", validForm, {
        withCredentials: true,
      });
      if(res?.data?.data){
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
      }
   
      
    } catch (err) {
      setError(err?.response?.data?.message);
      if (err.status === 401) {
       return router.push("/login");
      }
      console.error("Error", err);
    }
  };
 
   if(loader){
    return <Loader/>
   }

  return (
    <div className="flex justify-center gap-10">
      <div className="my-6 ml-8 flex ">
        <form onSubmit={(e) => submitHandler(e)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
            <legend className="fieldset-legend">Profile Edit</legend>
            <label className="label">First Name</label>
            <input
              type="text"
              value={form?.firstName}
              className="input focus:outline-none"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }));
              }}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              value={form?.lastName}
              className="input focus:outline-none"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }));
              }}
            />

            <label className="label">Age</label>
            <input
              type="number"
              className="input focus:outline-none"
              value={form?.age}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  age: e.target.value,
                }));
              }}
            />

            <fieldset className="fieldset">
              <span className="label">Gender</span>
              <select
                className="select focus:outline-none"
                value={form?.gender}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }));
                }}
              >
                <option value="">Pick a gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="others">Others</option>
              </select>
            </fieldset>

            <label className="label">PhotoUrl</label>
            <input
              type="text"
              className="input focus:outline-none"
              value={form?.photoUrl}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  photoUrl: e.target.value,
                }));
              }}
            />
            <textarea
              className="textarea  focus:outline-none"
              placeholder="Bio"
              value={form?.about}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  about: e.target.value,
                }));
              }}
            ></textarea>
            {
              error && <p className=" text-red-700">
                 {error}
              </p>
            }
            <button className="btn bg-black text-white mt-3">
              Save Profile
            </button>
          </fieldset>
        </form>
      </div>
      <div className="my-10 ml-8 ">
        <Card {...form} />
      </div>

      {showtoast &&<div className="toast toast-top toast-center ">
        <div className="alert alert-success">
          <span>Profile Saved Successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default Profile;
