import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import SpedizioneSch from "../modals/SpedizioneSch";

function Spedizioni() {
  const colSpedizioni = [
    {
        name: 'CLIENTE',
        selector: row => row.id_cliente,
        sortable: true,
    },
    {
        name: 'SPEDIZIONE',
        selector: row => row.id_spedizione,
        sortable: true,
    },
    {
        name: 'DATA_SPEDIZIONE',
        selector: row => row.data_spedizione,
        sortable: true,
    },
    {
        name: 'DESCRIZIONE',
        selector: row => row.descrizione,
        sortable: true,
    },     
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [spedizioni, setSpedizioni] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  } 

  const getSpedizioni = async () => {
    try {
      const response = await fetch(engine.backend+'/spedizioni');
      const data = await response.json();
      setSpedizioni(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpedizioni()
  }, []);  

  return (
    <>
    <div className="my-4">
        <div className='uppercase font-semibold pl-4 flex flex-row'>
            <div className="basis-1/2 pt-3">Corrieri</div>
            <div className="basis-1/2 text-end">
                <button
                    type="button"
                    onClick={openModal}
                    className="my-button-primary">
                    Add Corriere
                </button>
            </div>               
        </div>
        <div className='bg-neutral-100 p-4 mt-2'> 
            <DataTable 
            columns={colSpedizioni}
            data={spedizioni}
            selectableRows
            />
        </div>             
    </div>
    <SpedizioneSch isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/> 
</>
  )
}

export default Spedizioni