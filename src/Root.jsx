import {useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './components/menu/Sidebar';

import useAuth from './hooks/useAuth'

export default function Root() {
  const [titolo, setTitolo] = useState("Homepage");
 
  const { auth, loading, setAuth } = useAuth();
 
  if(loading) return 'Loading...'
  return (
    <>
      {
        auth._id ? (
         <div className="flex bg-neutral-50">
          <Sidebar titolo={titolo} setTitolo={setTitolo} />

          <div className="flex flex-col flex-grow">

              <header className="flex bg-neutral-100 sticky w-full top-0 p-3 pl-6 pb-3 text-2xl text-cyan-900 font-bold uppercase border-b">
                  {titolo}
              </header>

              <main className="w-full p-8">
                  <Outlet />
              </main>

              {/* <footer className="w-full bottom-0 fixed ">Eventuale footer</footer> */}

          </div>
      </div>
      )
        : <Navigate to="/login" />
      }
    </>
  )
}