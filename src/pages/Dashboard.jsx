import React, { useState, useEffect } from "react";

function Dashboard() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);


  console.log(message);
  return (
    <>
      <div className='my-page-title'>
        Dashboard  {message}
      </div>
      <div className="p-2 mt-4">
        {message}
      </div>
    </>
  )
}

export default Dashboard