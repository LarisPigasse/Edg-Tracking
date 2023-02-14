import React from 'react'
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className='flex flex-col w-full'>
        <div className='mx-auto py-2 px-4 w-full'>
          <Outlet />
        </div>
    </div>
  )
}

export default Content