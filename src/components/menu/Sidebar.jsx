import React, { useState } from 'react'
import engine from '../../engine'
import {BsArrowLeftShort} from 'react-icons/bs'
import {HiOutlineCog} from 'react-icons/hi'
import {AiOutlineHome, AiOutlineDashboard, AiOutlineEnvironment, AiOutlineTable, AiOutlineFile} from 'react-icons/ai'
import LiMenu from './LiMenu'


const Sidebar = ({ titolo, setTitolo }) => {
  const [open, setOpen] = useState(true);
  return (
    <aside className={`bg-neutral-200 h-screen ${open ? "w-64" : "w-16"} top-0 sticky duration-300 w z-[1]`}>
        <div className='border border-b-white p-1 pl-3 mt-0.5'>
            <BsArrowLeftShort 
                className={`bg-white text-neutral-900 text-2xl rounded-full absolute -right-3 top-4 border border-bg-neutral-700 cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className='inline-flex'>
                <img src={`${engine.img}LogoE.png`} className=' w-10 rounded-full cursor-pointer block mr-6' />
                <span className={`text-2xl mt-1 font-bold text-sky-600 ${!open && "scale-0"}`}>EDG</span>
                <span className={`ml-2 text-2xl mt-1 font-semibold text-cyan-900 ${!open && "scale-0"}`}>ADMIN</span> 
            </div>
        </div>
        <div className='p-2 pl-3'>
            <ul className='pt-2'>
                <LiMenu titolo="Homepage" link="/" icona={<AiOutlineHome />} setTitolo={setTitolo} titoloattuale={titolo} open={open} />
                <LiMenu titolo="Dashboard" link="/dashboard" icona={<AiOutlineDashboard />} setTitolo={setTitolo} titoloattuale={titolo} open={open} />
                <LiMenu titolo="Tracking" link="/tracking" icona={<AiOutlineEnvironment />} setTitolo={setTitolo} titoloattuale={titolo} open={open} />
                <LiMenu titolo="Tables" link="/tables" icona={<AiOutlineTable />} setTitolo={setTitolo} titoloattuale={titolo} open={open} />
                <LiMenu titolo="Docs" link="/docs" icona={<AiOutlineFile />} setTitolo={setTitolo} titoloattuale={titolo} open={open} />
            </ul>
        </div>    
        <div className="absolute bottom-0 left-0 px-1 w-full border border-t-neutral-300 text-2xl block float-left text-gray-600">
            <div className='flex'>
                <div className='hover:text-gray-100 hover:bg-red-500 py-2 px-3 rounded cursor-pointer m-1  hover:drop-shadow-sm duration-300'><HiOutlineCog/></div>
            </div> 
        </div>
    </aside>
  )
}

export default Sidebar