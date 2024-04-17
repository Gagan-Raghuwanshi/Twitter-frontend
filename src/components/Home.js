import React, { useEffect } from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet'

function Home() {
  // custom hooks
  const {user,otherUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
    navigate("/login")
    }
  
  },[])

  useOtherUsers(user?._id);
  useGetMyTweet(user?._id)
  return (
    <div className='flex justify-between w-[80%] m-auto'>
        <Leftsidebar/>
        <Outlet/>
        <Rightsidebar otherUsers ={otherUsers} />
    </div>
  )
}

export default Home;