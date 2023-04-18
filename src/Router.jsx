import {createBrowserRouter} from 'react-router-dom'
import Root from './Root'
import Dashboard from './pages/Dashboard'
import Tracking from './pages/Tracking'
import Tables from './pages/Tables'
import Docs from './pages/Docs'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },            
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "tracking",
                element: <Tracking />,
            },
            {
                path: "tables",
                element: <Tables />,
            },
            {
                path: "docs",
                element: <Docs />,
            },
            {
                path: "*",
                element: <ErrorPage />,
                errorElement: <ErrorPage />,
             },
        ]
    },          
]);

export default Router