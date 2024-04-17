import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react";
import { getMyProfile } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const useGetProfile = (id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMyProfile = async ()=>{
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`,{
                withCredentials:true
            });
            dispatch(getMyProfile(res.data.user));
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    fetchMyProfile();
    },[id]);
};
export default useGetProfile;