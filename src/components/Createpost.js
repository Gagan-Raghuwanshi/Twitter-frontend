import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getrefresh } from "../redux/tweetSlice";


function Createpost() {
  const [description,setDescreiption] = useState("");
  const {user} = useSelector(store=>store.user);
  const {isActive} = useSelector(store=>store.tweet)
  const dispatch = useDispatch()

// submit Handler 
  const submitHandler =async ()=>{
    try {
      const res = await axios.post(`${TWEET_API_ENDPOINT}/create`,{description,id:user?._id},{
        withCredentials:true
      });
      dispatch(getrefresh())
      if (res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.success(error.response.data.message)
      console.log(error)
    }
    setDescreiption("")
  };

  // forYou Handler
  const forYouHandler = ()=>{
    dispatch(getIsActive(true))
  };

  // following Handler
  const followingHandler = async ()=>{
    dispatch(getIsActive(false))

  };


  return (
    <div className="w-[80%] mt-4 mx-auto">
      <div className="flex justify-between border-b-[1px] border-gray-200">
        <div onClick={forYouHandler} className= {`${isActive?"border-b-4 border-blue-600":"border-b-4 border-transparent"} justify-center flex w-[50%] font-bold text-gray-700 cursor-pointer hover:bg-gray-200`}>
          <span className=" py-2">For You</span>
        </div>
        <div onClick={followingHandler} className={`${isActive?"border-b-4 border-transparent":"border-b-4 border-blue-600"} justify-center flex w-[50%] font-bold text-gray-700 cursor-pointer hover:bg-gray-200`} >
          <span className="py-2">Following</span>
        </div>
      </div>
      <div className="">
        <div className="flex mt-4">
          <div className="">
            <Avatar
              src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
              size="45"
              round={true}
            />
          </div>
          <input
            type="text"
            placeholder="What is happening?"
            className=" border-none outline-none w-full text-lg ml-4"
            value={description}
            onChange={(e)=>setDescreiption(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mt-4 border-b-[1px] cursor-pointer">
          <CiImageOn />
          <button className=" px-4 py-1 bg-sky-400 hover:bg-sky-500 rounded-full font-bold text-white"
          onClick={submitHandler}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createpost;
