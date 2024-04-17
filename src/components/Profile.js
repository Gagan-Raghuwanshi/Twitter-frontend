import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar";
import useGetProfile from '../hooks/useGetProfile'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getrefresh } from '../redux/tweetSlice';


function Profile() {

  const {user,profile} = useSelector(store=>store.user)
  const {id} = useParams();
  useGetProfile(id);
  const dispatch = useDispatch()

  // follow And Unfollow Handler
  const followAndUnfollowHandler =async ()=>{
    if (user.following.includes(id)) {
      // Unfollow
      try {
        axios.defaults.withCredentials = true
        const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`,{id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getrefresh());
        toast.success(res.data.message)
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error)
      }
      
    }else{
      // follow
      try {
        axios.defaults.withCredentials = true
        const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`,{id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getrefresh());
        toast.success(res.data.message)
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error)
      }


    }
  }
  return (
    <div className='w-[50%] mt-4'>
      <div className="flex items-center">
        <div className=""><IoMdArrowBack size={'24px'}/></div>
        <div className="flex flex-col items-center justify-center ml-2">
          <div className=" font-bold">{profile?.name}</div>
          <div className=" -mt-1 text-sm">10 post</div>
        </div>
      </div>
      <div className=" mt-3">
        <img src="https://i.pinimg.com/originals/53/8b/13/538b133e248fb100567ebb696fffb0c2.jpg" alt='logo' className=' h-44 w-full' />
      </div>
      <div className="flex justify-between">
        <div className=" -mt-11 ml-3">
        <Avatar
              src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
              size="85"
              round={true}
            />
        </div>
        {
            profile?._id === user?._id? (<div className=" flex mt-2 mr-2 px-4 py-1 rounded-full border border-1 border-gray-700 cursor-pointer">
            <button>Edit Profile</button>
          </div>
  ):(<div className=" flex mt-2 mr-2 px-4 py-1 rounded-full border border-1 border-gray-700 bg-black text-white cursor-pointer">
  <button onClick={followAndUnfollowHandler} > {user.following.includes(id)?"Following":"Follow"}</button>
</div>
)
        }

      </div>
      <div className="m-4">
        <div className="font-bold text-lg">{profile?.name}</div>
        <div className="text-sm -mt-1">@{profile?.username}</div>
      </div>
      <div className=" ml-4">
        Exploring the web's endless possibilities with MERN Stack | Problem solver by day. coder by night | Coffee lover | Join me on this coding journy.
      </div>
    </div>
  )
}

export default Profile