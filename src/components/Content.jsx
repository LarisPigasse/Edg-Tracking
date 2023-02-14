import React from 'react'
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div>
        <div className='mx-auto py-2 px-4'>
          <Outlet />
        </div>
    </div>
  )
}

export default Content