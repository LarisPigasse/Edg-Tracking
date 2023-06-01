import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/custom.css'
import {RouterProvider} from 'react-router-dom'
import Router from './Router'

import {AuthProvider} from './context/AuthProvider' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>
)
