"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import Card from "../components/Card";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import UploadImage from "../components/UploadImage";
const Profile = () => {
  const [user, setUser] = useState(null);
  const userSlice = useSelector((store) => store.user);
  const [loader, setLoader] = useState(true);
  const [isFormButtonDisable,setIsFormButtonDisable]=useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    skills: "",
    photoUrl:
      "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png",
  });
  const [showtoast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStore = localStorage.getItem("user");
      const parseUser = JSON.parse(userStore);

      if (!parseUser) {
         router.push("/login");
      } else {
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
    }
    setLoader(false);
  }, [userSlice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showtoast]);

    const isFormChangehandler=()=>{ 
      return Object.keys(form).some((key)=>{
           return form[key] != user[key];
      })}
  const submitHandler = async (e) => {
    try {
      setError("");
      setIsFormButtonDisable(true);
      e.preventDefault();
      const validForm = Object.fromEntries(
        Object.entries(form).filter(([_, value]) => {
          return value !== "" && value != null && value?.length !== 0;
        })
      );
   
     
      const res = await axios.patch(BASE_URL + "/profile/edit", validForm, {
        withCredentials: true,
      });
      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      if (err.status === 401) {
         router.push("/login");
      }
     
      console.error("Error", err);
    } finally{
        setIsFormButtonDisable(false)
      }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col  mb-4 md:mb-0 items-center md:flex-row md:justify-center md:gap-20">
      <div className="my-2 md:my-6  md:flex">
        <form onSubmit={(e) => submitHandler(e)}>
          <fieldset className="fieldset mx-auto w-[275px] bg-base-200 border-base-300 rounded-box md:w-xs border p-4 ">
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
            <label className="label">Image Upload</label>
            <UploadImage setForm={setForm}/>
            {/* <label className="label">PhotoUrl</label>
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
            /> */}
            <label className="label">Bio</label>
            <textarea
              className="textarea  focus:outline-none"
              placeholder="Bio"
              value={form?.about}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  photoUrl: e.target.value,
                }));
              }}
            ></textarea>
            {error && <p className=" text-red-700">{error}</p>}
            <button disabled={isFormButtonDisable || !isFormChangehandler()} className="btn bg-black text-white mt-3">
               {isFormButtonDisable ? "Saving..." : "Save Profile"}
            </button>
          </fieldset>
        </form>
      </div>
      <div>
        <Card {...form} />
      </div>

      {showtoast && (
        <div className="toast toast-top toast-center ">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
