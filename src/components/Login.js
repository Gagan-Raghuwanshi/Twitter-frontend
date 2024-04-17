import React, { useState } from 'react';
import { USER_API_ENDPOINT } from "../utils/constant";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice';

function Login() {
  const [islogin,setIslogin] = useState(true);
  const loginhandler = ()=>{
    setIslogin(!islogin);
  }
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  
  const submithandler = async (e)=>{
    e.preventDefault();
    if (islogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, {email,password}, {
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          toast.success(res.data.message)
          Navigate("/")
        }
      } catch (error) {
        toast.success(error.res.data.message)
        console.log(error)
      }
    } else {
      // sign up
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, {name,username,email,password}, {
          headers:{
            "Content-Type":'application/json'
          },
          withCredentials:true
        });

        if (res.data.success) {
          setIslogin(true)
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.success(error.res.data.message)
        console.log(error)
      }
    }
    // console.log(name, username,email,password)
  }


  return (
    <div className=''>
        <div className="flex h-screen w-[60%] mx-auto  items-center justify-evenly ">
            <div className="flex ">
                <img src="https://1000logos.net/wp-content/uploads/2017/06/Twitter-Log%D0%BE.png" alt='logo' className=' w-96 ml-' />
            </div>
            <div className="flex flex-col">
              <div className=" font-bold text-6xl my-5 border-black">Happening now</div>
              <div className="font-bold text-lg">{islogin ? "Login":"SignUp"}</div>
              <form action="" onSubmit={submithandler}>
              <div className="flex flex-col mt-2" >
                
                {
                  !islogin && (<>

                    <input type="text" value={name} onChange={(e)=>{ setName(e.target.value)}} placeholder='Name' className='outline-blue-500 border-2 border-black  w-[50%] rounded-full px-4 text-lg my-1'  />
                    <input type="text" value={username} onChange={(e)=>{ setUsername(e.target.value)}} placeholder='Username' className='outline-blue-500 border-2 border-black  w-[50%] rounded-full px-4 text-lg my-1' />
                  </>)
                }

                <input type="text" value={email} onChange={(e)=>{ setEmail(e.target.value)}} placeholder='Email' className='outline-blue-500 border-2 border-black  w-[50%] rounded-full px-4 text-lg my-1' />
                <input type="password" onChange={(e)=>{ setPassword(e.target.value)}} placeholder='Password' className='outline-blue-500 border-2 border-black  w-[50%] rounded-full px-4 text-lg my-1' value={password}  />
              <button className='bg-sky-400 hover:bg-sky-500 text-white font-bold text-center w-[50%] rounded-full px-4 py-1 text-lg my-1'>{islogin ? "Login":"SignUp"}</button>
              </div>
              </form>
              <div className="mt-2">{islogin ? "Don't have an account?":"Already have an account?"} <span className='cursor-pointer font-bold text-blue-600' onClick={loginhandler}>{islogin ? "Create Account" : "Login"}</span> </div>
            </div>
        </div>
    </div>
  )
}

export default Login