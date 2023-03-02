import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'

function Vettori() {
    const colVettori = [
        {
            name: 'ID',
            selector: row => row.id_vettore,
            sortable: true,
        },
        {
            name: 'VETTORE',
            selector: row => row.vettore,
            sortable: true,
        },
        {
            name: 'ENDPOINT',
            selector: row => row.endpoint,
            sortable: true,
        },
        {
            name: 'STATO',
            selector: row => row.stato,
            sortable: true,
        },    
    ]

    const [carriers, setCarriers] = useState([]);
 
    const getCarriers = async () => {
      try {
        const response = await fetch(engine.backend+'/carriers');
        const data = await response.json();
        setCarriers(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getCarriers()
    }, []);
      
    return (
        <div className="my-4">
            <div className='uppercase font-semibold pl-4 flex flex-row'>
                <div className="basis-1/2 pt-3">Vettori</div>
                <div className="basis-1/2 text-end">
                    <button
                        className="my-button-primary">
                        Add Vettore
                    </button>
                </div>               
            </div>
            <div className='bg-neutral-100 p-4 mt-2'> 
                <DataTable 
                columns={colVettori}
                data={carriers}
                selectableRows
                />
            </div>             
        </div>
    )
}

export default Vettori