'use client'
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios'
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/store/userSlice';
import {removeFeed} from '../utils/store/userFeedSlice';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
const NavBar = () => {
const user=useSelector(store=>store.user);
const dispatch=useDispatch();
const router=useRouter();

const logoutHandler=async()=>{
  try {
   const res=await axios.post(BASE_URL+ '/logout',{},{withCredentials:true});
   dispatch(removeUser());
   dispatch(removeFeed());
   router.push('/login');
  } catch (error) {
    console.log("Error" + error.message)
  }
}
  return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className=" flex items-center">{user?.firstName} {user?.lastName}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        {user ?
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl} />
            
       :<img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> }
          
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <Link href='/profile'>
        <li>
          <div className="justify-between">
            Profile
          </div>
        </li>
        </Link>
        <li><a>Settings</a></li>
        <li><a onClick={logoutHandler}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar