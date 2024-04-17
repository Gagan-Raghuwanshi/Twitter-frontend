import axios from "axios";
import React from "react";
import Avatar from "react-avatar";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getrefresh } from "../redux/tweetSlice";


function Tweet({tweet}) {

  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch();
  // delete handler
  const deleteTweerHandler =async (id)=>{
    try {
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`,{
        withCredentials:true
      });
      dispatch(getrefresh());
      toast.success(res.data.message);

    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error)
    }

  };
// like dislike handler
  const likeOrDislikeHandler = async (id)=>{
    try {
      const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`,{id:user?._id} ,{
        withCredentials:true
      });
      console.log(res)
      dispatch(getrefresh());
        toast.success(res.data.message)
    } catch (error) {
      toast.success(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex border-b-[1px] border-gray-200 mt-4">
        <div className="">
          <Avatar
            src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
            size="45"
            round={true}
          />
        </div>
        <div className="ml-2 w-full">
          <div className=" flex">
            <div className=" font-bold text-lg">{tweet?.userDetails[0]?.name}</div>
            <div className="ml-1 "><p> @{tweet?.userDetails[0]?.username}</p></div>
          </div>
          <div className="">
            {tweet?.description}
          </div>
          <div className="flex mt-6 justify-between">
            <div className=" flex cursor-pointer" onClick={()=>likeOrDislikeHandler(tweet?._id)} ><FaRegHeart/><p>{tweet?.like?.length}</p></div>
            <div className="flex cursor-pointer"><FaRegComment/><p>0</p></div>
            <div className="flex cursor-pointer"><FaRegBookmark/><p>0</p></div>
            {
                            user?._id === tweet?.userId &&(
                              <div className="flex cursor-pointer" onClick={()=>deleteTweerHandler(tweet?._id)}><RiDeleteBinLine size={"20px"}/></div>
                            )
            }
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Tweet;
