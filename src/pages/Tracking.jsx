import React, { useState, useEffect } from "react";

function Tracking() {

  const [users, setUsers] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <>
      <div className='my-page-title'>
        Tracking
      </div>
        <div className="p-2 mt-4">
          {users}
      </div>
    </>    
  )
}

export default Tracking