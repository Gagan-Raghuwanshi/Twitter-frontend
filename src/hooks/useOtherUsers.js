import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant"
import { useEffect } from "react";
import { getOtherUsers } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const useOtherUsers = (id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/otheruser/${id}`,{
                withCredentials:true
            });
            dispatch(getOtherUsers(res.data.otheruser));
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    fetchOtherUsers();
    },[]);
};
export default useOtherUsers;