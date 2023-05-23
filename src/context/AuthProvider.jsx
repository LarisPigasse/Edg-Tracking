import { useState, useEffect, createContext } from 'react'
import clienteTokenAxios from '../config/clienteTokenAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token')
            if(!token){
                 setLoading(false)
                 return
            }

            try {
                const { data } = await clienteTokenAxios('utenti/auth/profilo')

                if(data){
                    setAuth(data)
                }

            } catch (error) {
                setAuth({})
            } 

            setLoading(false)

        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext;