import {BsArrowLeftShort} from 'react-icons/bs'
import {RouterProvider} from 'react-router-dom'
import Router from './Router'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

export default function App() {
  return (
    <div className="flex bg-neutral-50">
      <RouterProvider router={Router} />
    </div>
  )
}


