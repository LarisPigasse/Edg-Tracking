import React, { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import { colOperatori} from "../data/tables";

function Tracking() {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(engine.backend+'/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers()
  }, []);

  const listaOperatori = () => {
    return users.map(user => <div>{user.operatore}</div>)
  }

  const rowOperatori = () => {
    return users.map(user => <div>{user.operatore}</div>)
  }

  const righeOperatori =[
    {
        id: 1,
        operatore: 'Renato Casalena',
        email: 'renato.casalena@gmail.com',
        profilo:'ROOT',
        stato:'ATTIVO'
    },
    {
        id: 2,
        operatore: 'Renzo Scroppo',
        email: 'renzo@tradesystem.it',
        profilo:'ROOT',
        stato:'ATTIVO'
    },              
  ]

  return (
    <>
      <div className='text-red-600 font-semibold text-2xl'>
        Operatori:
      </div>
      <div className="my-2 p-2">
        {listaOperatori()}
      </div>
      <div className='bg-neutral-100 p-2 mt-2'> 
        <DataTable 
          columns={colOperatori}
          data={users}
          selectableRows
        />
      </div>
    </>    
  )
}

export default Tracking