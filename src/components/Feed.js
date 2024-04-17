import React from 'react'
import Createpost from './Createpost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

function Feed() {
  const {tweets} = useSelector(store=>store.tweet)
  return (
    <div className='w-[60%]'>
      <div className=" ">
        <Createpost/>
        {
          tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet = {tweet} />
        )
        }
    

      </div>
    </div>
  )
}

export default Feed