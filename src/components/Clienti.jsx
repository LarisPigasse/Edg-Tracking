import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'

function Clienti() {

    const colClienti = [
        {
            name: 'ID',
            selector: row => row.id_cliente,
            sortable: true,
        },
        {
            name: 'CLIENTE',
            selector: row => row.cliente,
            sortable: true,
        },
        {
            name: 'PARTITA IVA',
            selector: row => row.partita_iva,
            sortable: true,
        },
        {
            name: 'STATO',
            selector: row => row.stato,
            sortable: true,
        },     
    ]

    const [customers, setCustomers] = useState([]);
 
    const getCustomers = async () => {
      try {
        const response = await fetch(engine.backend+'/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getCustomers()
    }, []);

    return (
        <div className="my-4">
            <div className='uppercase font-semibold pl-4 flex flex-row'>
                <div className="basis-1/2 pt-3">Clienti</div>
                <div className="basis-1/2 text-end">
                    <button
                        className="my-button-primary">
                        Add Cliente
                    </button>
                </div>               
            </div>
            <div className='bg-neutral-100 p-4 mt-2'> 
                <DataTable 
                columns={colClienti}
                data={customers}
                selectableRows
                />
            </div>             
        </div>
    )
}

export default Clienti