import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import ModalOperatori from "../modals/ModalOperatori";

function Operatori() {

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    const colOperatori = [
        {
            id: 'ID',
            name: 'ID',
            selector: row => row.id_operatore,
            sortable: true,
        },
        {
            id: 'OPERATORE',
            name: 'OPERATORE',
            selector: row => row.operatore,
            sortable: true,
            style: {
                background: "orange",
                color: "white"
              },
        },
        {
            id: 'EMAIL',
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
            cell: (row, index, column, id) => {return `CIAO`}
        },
        {
            id: 'PROFILO',
            name: 'PROFILO',
            selector: row => row.profilo,
            sortable: true,
        },
        {
            id: 'STATO',
            name: 'STATO',
            selector: row => row.stato,
        },
    ];
    
    const [users, setUsers] = useState([]); 
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    }

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
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Operatori</div>
                    <div className="basis-1/2 text-end">
                        <button 
                            type="button"
                            onClick={openModal}
                            className="my-button-primary">
                            Add Operatore
                        </button>
                    </div>               
                </div>
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <DataTable 
                    customStyles={customStyles}
                    columns={colOperatori}
                    data={users}
                    selectableRows
                    />
                </div>               
            </div>
            <ModalOperatori isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/>            
        </>
    )


}

export default Operatori