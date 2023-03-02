import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'

function Corrieri() {
    const colCorrieri = [
        {
            name: 'ID',
            selector: row => row.id_corriere,
            sortable: true,
        },
        {
            name: 'CORRIERE',
            selector: row => row.corriere,
            sortable: true,
        },
        {
            name: 'VETTORE',
            selector: row => row.vettore,
            sortable: true,
        },
        {
            name: 'STATO',
            selector: row => row.stato,
            sortable: true,
        },     
    ]
    
    const [couriers, setCouriers] = useState([]);
 
    const getCouriers = async () => {
      try {
        const response = await fetch(engine.backend+'/couriers');
        const data = await response.json();
        setCouriers(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getCouriers()
    }, []);

    return (
        <div className="my-4">
            <div className=' uppercase font-semibold pl-4'>
                Corrieri
            </div>
            <div className='bg-neutral-100 p-4 mt-2'> 
                <DataTable 
                columns={colCorrieri}
                data={couriers}
                selectableRows
                />
            </div>             
        </div>
    )
}

export default Corrieri