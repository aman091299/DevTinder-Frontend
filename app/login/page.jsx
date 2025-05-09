"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useState,useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showtoast, setShowToast] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showtoast]);

  const SignUpHandler = async () => {
    setError('')
     setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId: email, password, firstName, lastName },
        { withCredentials: true }
      );
      if (!res?.data?.success) {
       return  setError(res?.data?.message);
      }
      if (res?.data?.success) {
        setError('')
        dispatch(addUser(res?.data?.data));
        router.push("/profile");
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
      console.error("Error  " + error?.message);
    }finally{
      setLoading(false);
    }
  };
  async function loginHandler() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      if (!res?.data?.success) {
        return setError(res?.data?.message);
      }
      if (res?.data?.success) {
        setError('')
        dispatch(addUser(res.data.data));
        setShowToast(true);
        router.push("/");
       
       
      }
    } catch (error) {
      setError(error?.response?.data?.message);
       console.error("Error  " + error.message);
    }finally{
      setLoading(false);
    }
  }

  return loading ? (
    <>
      <span className="loading loading-xl loading-spinner text-error absolute left-1/2 top-1/2"></span>
    </>
  ) : (
    <>
      <div className="flex justify-center mt-15 items-center mb-23">
        <fieldset className="fieldset  bg-base-200 border-base-300  shadow-lg rounded-box w-xs border  p-5">
          <legend className="fieldset-legend ">
            {isLogin ? "Login" : "Signup"}
          </legend>
          {!isLogin && (
            <>
              <label className="label my-1">FirstName</label>
              <input
                type="text"
                className="input focus:outline-none"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label className="label my-1">LastName</label>
              <input
                type="text"
                className="input focus:outline-none"
                placeholder="LastName"
                value={lastName}
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </>
          )}
          <label className="label my-1">Email</label>
          <input
            type="email"
            className="input focus:outline-none"
            placeholder="Email"
                required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="label  my-1">Password</label>
          <input
            type="password"
            className="input focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isLogin ? (
            <button disabled={loading} className="btn btn-neutral mt-4" onClick={loginHandler}>
              Login
            </button>
          ) : (
            <button disabled={loading} className="btn btn-neutral mt-4" onClick={SignUpHandler}>
              SignUp
            </button>
          )}

          <div
            className="cursor-pointer text-[13px] font-medium"
            onClick={() => {
              setEmail(""),
                setFirstName(""),
                setPassword(""),
                setLastName(""),
                setIsLogin((prev) => !prev);
            }}
          >
            {isLogin
              ? "New User ? SignUp from Here"
              : "Alreardy Have Account ? Login from Here"}
          </div>

          {error && <div className="text-red-700 text-md mt-1">{error}</div>}
        </fieldset>
        {showtoast && (
        <div className="toast toast-top toast-center ">
          <div className="alert alert-success">
            <span>{isLogin?"User Login Sucessfully":"User SignUp Successfully"}</span>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Login;
