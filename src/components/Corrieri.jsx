import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import CorrieriAdd from "../modals/CorrieriAdd";
import CorrieriSch from "../modals/CorrieriSch";
import {Link} from 'react-router-dom'

function Corrieri() {
    const colCorrieri = [
        {
            name: 'ID',
            selector: row => row.id_corriere,
            sortable: true,
            maxWidth: '4%',
        },
        {
            name: 'CORRIERE',
            selector: row => row.corriere,
            sortable: true,
            cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalSch(); setCorriere(row.corriere);}}>{row.corriere}</Link></>),
            style: {
                color: "#0EA5E9",
                fontWeight: "500",
              },            
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
            maxWidth: '4%',
        },     
    ]
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)
    const [corriere, setCorriere] = useState();     

    const openModal = () => {
        setIsOpen(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }    
        
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
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Corrieri</div>
                    <div className="basis-1/2 text-end">
                        <button
                            type="button"
                            onClick={openModal}
                            className="my-btn my-btn-add">
                            Add Corriere
                        </button>
                    </div>               
                </div>
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <DataTable 
                    columns={colCorrieri}
                    data={couriers}
                    selectableRows
                    />
                </div>             
            </div>
            <CorrieriAdd isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/>
            <CorrieriSch isOpenSch={isOpenSch} corriere={corriere}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>  
        </>    
    )
}

export default Corrieri