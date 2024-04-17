import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweet = (id)=>{
    const dispatch = useDispatch();
    const {refresh,isActive} = useSelector(store=>store.tweet)

    // fetch my tweet
    const fetchMyTweet = async ()=>{
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getalltweet/${id}`,{
                withCredentials:true
            });
            dispatch(getAllTweets(res.data.tweets));
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };
          // Following Tweet Handler
  const followingTweetHandler =async ()=>{
    // const id = user?._id;
    try {
      const res = await axios.get(`${TWEET_API_ENDPOINT}/getfollowingusertweet/${id}`,{
        withCredentials:true
      });
      console.log(res);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error)
    }
  };

    useEffect(()=>{
        if (isActive) {
            fetchMyTweet();
        } else{
            followingTweetHandler();
        }

    },[refresh,isActive]);
};
export default useGetMyTweet;