import {RouterProvider} from 'react-router-dom'
import Router from './Router'

export default function App() {
  return (
    <div className="flex bg-neutral-50">
      <RouterProvider router={Router} />
    </div>
  )
}


