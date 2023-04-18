import {Link} from 'react-router-dom'

const LiMenu = ( { open, link, icona,titolo, setTitolo, titoloattuale } ) => {

  return (
    <Link to={link} onClick={() => setTitolo(titolo)}>

        <li className={` text-gray-600 text-sm gap-x-4 cursor-pointer p-2 mt-2 hover:bg-zinc-500
                         hover:text-gray-100 rounded-md flex hover:drop-shadow-sm duration-300 
                        ${titoloattuale == titolo && " shadow-2xl text-stone-100 bg-red-600 drop-shadow-sm hover:bg-red-600"}
                      `}>
            <span className="text-2xl block float-left">
                { icona }
            </span>
            <span className={`text-base flex-1 ${!open && "scale-0"}`}>{titolo}</span>
        </li>
    </Link>
  )
}

export default LiMenu