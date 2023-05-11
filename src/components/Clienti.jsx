import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import ClientiAdd from "../modals/ClientiAdd";
import ClientiSch from "../modals/ClientiSch";
import {Link} from 'react-router-dom'
import Button from '../components/Button'

function Clienti() {

    const colClienti = [
        {
            name: 'ID',
            selector: row => row.id_cliente,
            sortable: true,
            maxWidth: '4%',
        },
        {
            name: 'CLIENTE',
            selector: row => row.cliente,
            sortable: true,
            cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalSch(); setCliente(row.cliente);}}>{row.cliente}</Link></>),
            style: {
                color: "#0EA5E9",
                fontWeight: "500",
              },            
        },
        {
            name: 'PARTITA IVA',
            selector: row => row.partita_iva,
            sortable: true,
            maxWidth: '16%',
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
    const [cliente, setCliente] = useState(); 

    const openModal = () => {
        setIsOpen(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }

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
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Clienti</div>
                    <div className="basis-1/2 text-end">
                        <Button variant="add" text="Add cliente" onClick={openModal}/>
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
            <ClientiAdd isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/>
            <ClientiSch isOpenSch={isOpenSch} titolo={cliente}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>
        </>    
    )
}

export default Clienti