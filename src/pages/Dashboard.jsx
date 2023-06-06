import { useState, useEffect } from "react";
import clientAxios from "../config/clientAxios"

function Dashboard() {

  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const { data } = await clientAxios('/message')
    setMessage(data)
  }

   useEffect(() => {
        getMessage();
   }, [])

  return (
    <>
      <div className='my-page-title'>
        Dashboard
      </div>
      <div className="p-2 mt-4">
        {message.message}
      </div>
    </>
  )
}

export default Dashboard