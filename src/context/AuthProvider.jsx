import { useState, useEffect, createContext } from 'react'
import clienteTokenAxios from '../config/clientAxiosToken';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const autenticareUtente = async () => {

            const token = localStorage.getItem('token')

            if(!token){
                 setLoading(false)
                 return
            }

            try {
                const { data } = await clienteTokenAxios('auth/profilo')

                if(data){
                    setAuth(data)
                }

            } catch (error) {
                setAuth({})
            }

            setLoading(false)

        }
        autenticareUtente()
    }, [])

    const chiudiSessione = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                chiudiSessione
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