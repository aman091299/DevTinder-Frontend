"use client";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/store/userSlice";
import { removeFeed } from "../utils/store/userFeedSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
const NavBar = () => {

  const [user, setUser] = useState(null);
  const userInSliceStore = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const removeFocusHandler=()=>{
    document.activeElement.blur();
  }
  useEffect(() => {

    if (typeof window !== "undefined" && !user) {
      const useStore = localStorage.getItem("user");
      const user = JSON.parse(useStore);
      setUser(user);
    }
  }, [userInSliceStore]);

  const logoutHandler = async () => {
   
    removeFocusHandler();
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      localStorage.removeItem("user");
      setUser(null);
      
      router.push("/login");
    } catch (error) {
      return console.log("Error" + error.message);
    }
  };

  return (
    <div className="navbar  p-[8px] md:p-1 min-h-0 md:min-h-16 flex justify-between  gap-2 md:gap-0 bg-base-100 shadow-sm">
      <div className="flex:0   md:flex-1">
        <Link href="/" className="btn btn-ghost text-[24px] md:text-xl">
          DevTinder 👨‍💻
        </Link>
      </div>
      <div className="flex  gap-2  text-[16px] md:text-xl">
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
        {user && (
          <div className=" hidden md:flex items-center">
            Welcome , {user?.firstName} {user?.lastName}
          </div>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user ? (
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link href="/profile">
              <li>
                <div className="justify-between" onClick={removeFocusHandler}>Profile</div>
              </li>
            </Link>
            <li>
              <Link href="/connections"  onClick={removeFocusHandler}>Connections</Link>
            </li>
            <li>
              <Link href="/request"  onClick={removeFocusHandler}>Request</Link>
            </li>
            <li>
              <Link href="/membership"  onClick={removeFocusHandler}>Membership</Link>
            </li>
            <li>
              <a onClick={logoutHandler
              } >Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
