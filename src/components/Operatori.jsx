import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'

function Operatori() {

    const colOperatori = [
        {
            name: 'ID',
            selector: row => row.id_operatore,
            sortable: true,
        },
        {
            name: 'OPERATORE',
            selector: row => row.operatore,
            sortable: true,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'PROFILO',
            selector: row => row.profilo,
            sortable: true,
        },
        {
            name: 'STATO',
            selector: row => row.stato,
        },
    ]

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
      
    return (
        <div className="my-4">
            <div className=' uppercase font-semibold pl-4'>
                Operatori
            </div>
            <div className='bg-neutral-100 p-4 mt-2'> 
                <DataTable 
                columns={colOperatori}
                data={users}
                selectableRows
                />
            </div>               
        </div>
    )


}

export default Operatori