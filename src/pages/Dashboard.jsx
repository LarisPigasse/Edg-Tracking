import { useState, useEffect } from "react";
import engine from '../engine'

function Dashboard() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(engine.backend+"/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  console.log(message);
  return (
    <>
      <div className='my-page-title'>
        Dashboard
      </div>
      <div className="p-2 mt-4">
        {message}
      </div>
    </>
  )
}

export default Dashboard