import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/custom.css'
import {RouterProvider} from 'react-router-dom'
import Router from './Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="flex bg-neutral-50">
      <RouterProvider router={Router} />
    </div>
  </React.StrictMode>,
)
