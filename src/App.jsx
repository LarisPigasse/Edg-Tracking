import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/custom.css'
import {RouterProvider} from 'react-router-dom'
import Router from './Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router} />
)
