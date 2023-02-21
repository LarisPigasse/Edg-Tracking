import {React, useState} from 'react'
import {BsArrowLeftShort} from 'react-icons/bs'
import {HiOutlineCog} from 'react-icons/hi'
import {AiOutlineHome, AiOutlineDashboard, AiOutlineEnvironment, AiOutlineTable, AiOutlineFile, AiOutlineCopyrightCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'

function Sidebar() {
    const [open, setOpen] = useState(true)    
    return (
        <div className={`bg-neutral-200 h-screen ${open ? "w-72" : "w-16"} relative duration-300 w`}>
            <div className='border border-b-white p-1 pl-3 mt-0.5'>
                <BsArrowLeftShort 
                className={`bg-white text-neutral-900 text-2xl rounded-full absolute -right-3 top-arrow
                            border border-bg-neutral-700 cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
                />
                <div className='inline-flex'>
                    <img src="https://tools.expressdeliverygroup.com/assets/img/iniziale-white.png" className=' w-10 p-2 bg-cyan-900 rounded-full cursor-pointer block mr-6' />
                    <span className={`text-2xl mt-1 font-bold text-sky-600 ${!open && "scale-0"}`}>EDG</span>
                    <span className={`ml-2 text-2xl mt-1 font-semibold text-cyan-900 ${!open && "scale-0"}`}>ADMIN</span> 
                </div>
            </div>
            <div className='p-2 pl-3'>
                <ul className='pt-2'>

                    <li className='my-sidebar-item'>
                            <span className='my-sidebar-icon'><Link to={'/'}><AiOutlineHome /></Link></span>
                            <span className={`text-base flex-1 ${!open && "scale-0"}`}><Link to={'/'}>Homepage</Link></span>  
                    </li>
                    <li className='my-sidebar-item'>
                        <span className='my-sidebar-icon'><Link to={'dashboard'}><AiOutlineDashboard /></Link></span>
                        <span className={`text-base flex-1 ${!open && "scale-0"}`}><Link to={'dashboard'}>Dashboard</Link></span>
                    </li>
                    <li className='my-sidebar-item'>
                        <span className='my-sidebar-icon'><Link to={'tracking'}><AiOutlineEnvironment /></Link></span>
                        <span className={`text-base flex-1 ${!open && "scale-0"}`}><Link to={'tracking'}>Tracking</Link></span>
                    </li>
                    <li className='my-sidebar-item'>
                        <span className='my-sidebar-icon'><Link to={'tables'}><AiOutlineTable /></Link></span>
                        <span className={`text-base flex-1 ${!open && "scale-0"}`}><Link to={'tables'}>Tables</Link></span>
                    </li>
                    <li className='my-sidebar-item'>
                        <span className='my-sidebar-icon'><Link to={'docs'}><AiOutlineFile /></Link></span>
                        <span className={`text-base flex-1 ${!open && "scale-0"}`}><Link to={'docs'}>Docs</Link></span>
                    </li>
                </ul>
            </div>    
            <div class="absolute bottom-0 left-0 px-1 w-full border border-t-neutral-300 text-2xl block float-left text-gray-600">
               <div className='flex'>
                    <div className='hover:text-cyan-600 hover:bg-gray-100 py-2 px-3 rounded cursor-pointer m-1'><HiOutlineCog/></div>
                </div> 
            </div>                    
        </div>    
    )
}

export default Sidebar