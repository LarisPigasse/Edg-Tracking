import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import VettoriAdd from "../modals/VettoriAdd";
import VettoriSch from "../modals/VettoriSch";
import {Link} from 'react-router-dom'

function Vettori() {
    const colVettori = [
        {
            name: 'ID',
            selector: row => row.id_vettore,
            sortable: true,
            maxWidth: '4%',
        },
        {
            name: 'VETTORE',
            selector: row => row.vettore,
            sortable: true,
            cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalSch(); setVettore(row.vettore);}}>{row.vettore}</Link></>),
            style: {
                color: "#0EA5E9",
                fontWeight: "500",
              },             
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
            maxWidth: '4%',
        },    
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)
    const [vettore, setVettore] = useState();    

    const openModal = () => {
        setIsOpen(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }

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
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Vettori</div>
                    <div className="basis-1/2 text-end">
                        <button
                            type="button"
                            onClick={openModal}
                            className="my-button-add">
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
            <VettoriAdd isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/>
            <VettoriSch isOpenSch={isOpenSch} vettore={vettore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/> 
        </>
    )
}

export default Vettori