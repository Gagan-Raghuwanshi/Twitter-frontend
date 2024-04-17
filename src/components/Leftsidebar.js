import React from 'react'
import { MdHome } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

function Leftsidebar() {
  const {user} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout Handler
  const logoutHandler = async ()=>{
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
      dispatch(getUser(null));
      dispatch(getMyProfile(null));
      dispatch(getOtherUsers(null));

      navigate("/login")
      toast.success(res.data.message);

    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error)
    }
  }

  return (
    <div className='w-[20%] mt-2'>
      <div className="">
        <div className="mt-2">
          <img src="https://1000logos.net/wp-content/uploads/2017/06/Twitter-Log%D0%BE.png" className=' w-16 ml-4' />
        </div>
        <div className="my-4">
        <Link to={'/'}>
          <div className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><MdHome size={"24px"}/></div>
            <div className=" font-bold text-lg">Home</div>
          </div>
          </Link>
          <Link to={'/explore'}>
          <div className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><MdOutlineExplore size={"24px"}/></div>
            <div className="font-bold text-lg">Explore</div>
          </div>
          </Link>
          <Link to={'/notification'}>
          <div className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><IoMdNotifications size={"24px"}/></div>
            <div className="font-bold text-lg">Notification</div>
          </div>
          </Link>
          <Link to={`/profile/${user?._id}`}>
          <div className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><CgProfile size={"20px"}/></div>
            <div className="font-bold text-lg">Profile</div>
          </div>
          </Link>
          <Link to={'/bookmarks'}>
          <div className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><FaRegBookmark size={"20px"}/></div>
            <div className="font-bold text-lg">Bookmarks</div>
          </div>
          </Link>
          <Link to={'/logout'}>
          <div onClick={logoutHandler} className="mt-2 flex items-center hover:bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
            <div className="mr-2"><AiOutlineLogout size={"20px"}/></div>
            <div className="font-bold text-lg">Logout</div>
          </div>
          </Link>
        </div>
        <div className="mt-2  text-center">
          <button className=' bg-sky-400 hover:bg-sky-500 text-white font-bold text-lg text-center w-full px-4 py-2 border-none outline-none rounded-full'>Post</button>
        </div>
      </div>    
    </div>
  )
}

export default Leftsidebar