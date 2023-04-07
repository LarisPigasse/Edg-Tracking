import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import SpedizioniSch from "../modals/SpedizioniSch";
import SpedizioniAdd from "../modals/SpedizioniAdd";
import SpedizioniTrk from "../modals/SpedizioniTrk";
import {Link} from 'react-router-dom'


function Spedizioni() {
  const colSpedizioni = [
    {
        name: 'CLIENTE',
        selector: row => row.cliente,
        sortable: true,
    },
    {
      name: 'SPEDIZIONE',
      selector: row => row.id_spedizione,
      sortable: true,
      cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalSch(); setSpedizione(row.id_spedizione);}}>{row.id_spedizione}</Link></>),
      style: {
          color: "#0EA5E9",
          fontWeight: "500",
        },            
    }, 
    {
      name: 'ALTRO_NUMERO',
      selector: row => row.altro_numero,
      sortable: true,
      cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalTrk(); setSpedizione(row.id_spedizione);}}>{row.altro_numero}</Link></>),
      style: {
          color: "#0EA5E9",
          fontWeight: "500",
        },            
    },    
    {
        name: 'DATA_SPEDIZIONE',
        selector: row => row.data_spedizione_format,
        sortable: true,
    },
    {
        name: 'DESTINAZIONE',
        selector: row => row.destinazione,
        sortable: true,
    },
    {
      name: 'CORRIERE',
      selector: row => row.corriere,
      sortable: true,
    },         
  ]

  const [spedizioni, setSpedizioni] = useState([]);
  const [spedizione, setSpedizione] = useState();
  const [isOpenSch, setIsOpenSch] = useState(false)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [isOpenTrk, setIsOpenTrk] = useState(false)  

  const openModalAdd = () => {
    setIsOpenAdd(true);
  }

  const openModalSch = () => {
    setIsOpenSch(true);
  }

  const openModalTrk = () => {
    setIsOpenTrk(true);
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
            <div className="basis-1/2 pt-3">Spedizioni</div>
            <div className="basis-1/2 text-end">
                <button
                    type="button"
                    onClick={openModalAdd}
                    className="my-btn my-btn-add">
                    Add spedizione
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
    <SpedizioniAdd isOpenAdd={isOpenAdd}  setIsOpenAdd={(bool) => setIsOpenAdd(bool)}/>
    <SpedizioniSch isOpenSch={isOpenSch} spedizione={spedizione}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>
    <SpedizioniTrk isOpenTrk={isOpenTrk} spedizione={spedizione}  setIsOpenTrk={(bool) => setIsOpenTrk(bool)}/>
</>
  )
}

export default Spedizioni