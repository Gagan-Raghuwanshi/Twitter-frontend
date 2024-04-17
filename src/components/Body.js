import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Feed from './Feed'
import Profile from './Profile'
import Explore from './Explore'
import Notification from './Notification'
import Bookmarks from './Bookmarks'
import Logout from './Logout'



function Body() {
  const Router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
      children:[
        {
          path:"/",
          element:<Feed/>
        },
        {
          path:"profile/:id",
          element:<Profile/>
        },
        {
          path:"explore",
          element:<Explore/>
        },
        {
          path:"notification",
          element:<Notification/>
        },
        {
          path:"bookmarks",
          element:<Bookmarks/>
        },
        {
          path:"logout",
          element:<Logout/>
        }

      ]
    },
    {
      path: "/login",
      element:<Login/>
    }
  ])
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  )
}

export default Body