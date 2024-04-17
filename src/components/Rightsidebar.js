import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';


function Rightsidebar({otherUsers}) {
  return (
    <div className='w-[20%] '>
      <div className="flex mt-4 bg-gray-200  items-center rounded-full">
        <div className="ml-2"><CiSearch size={'20px'}/></div>
        <div className=" "><input type="text" placeholder='Search' className='w-full outline-none py-2 px-1 bg-transparent text-lg text-gray-700 '/></div>
      </div>
      <div className=" bg-gray-200 my-4 rounded-md px-1">
        <div className=" font-bold text-lg py-3">Who to follow</div>

         {/* here i am using map for fetching multiple user */}


        { 
          otherUsers?.map((user) => {
            return(
              <div key={user?._id} className="flex justify-between">
              <div className="flex">
                <div className=""><Avatar
                src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
                size="40"
                round={true}
              /></div>
              <div className="ml-1 justify-center flex flex-col py-2">
                <div className=" font-bold text-sm ">{user.name}</div>
                <div className=" -mt-1 text-xs"><p> @{user?.username}</p></div>
              </div>
              </div>
              <Link to={`/profile/${user?._id}`} >
              <div className=" my-auto">
                <button className=' bg-slate-800 hover:bg-slate-950 text-white px-3 py-1 rounded-full font-semibold'>Profile</button>
              </div>
              </Link> 
            </div>
            )
           
          })
          
        }

        {/* <div className="flex justify-between">
          <div className="flex">
            <div className=""><Avatar
            src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
            size="40"
            round={true}
          /></div>
          <div className="ml-1 justify-center flex flex-col py-2">
            <div className=" font-bold text-sm ">Gagan</div>
            <div className=" -mt-1 text-xs"><p> @gaganTwitter</p></div>
          </div>
          </div>
          <div className=" my-auto">
            <button className='bg-slate-800 hover:bg-slate-950 text-white px-3 py-1 rounded-full font-semibold'>Follow</button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <div className=""><Avatar
            src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-wearing-glasses-it-developer-engineer-programmer_277909-144.jpg?w=2000"
            size="40"
            round={true}
          /></div>
          <div className="ml-1 justify-center flex flex-col py-2">
            <div className=" font-bold text-sm ">Gagan</div>
            <div className=" -mt-1 text-xs"><p> @gaganTwitter</p></div>
          </div>
          </div>
          <div className=" my-auto">
            <button className='bg-slate-800 hover:bg-slate-950 text-white px-3 py-1 rounded-full font-semibold'>Follow</button>
          </div>
        </div>
 */}
      </div>
    </div>
  )
}

export default Rightsidebar