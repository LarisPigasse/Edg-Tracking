import { useState, useEffect } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import OperatoriAdd from "../modals/OperatoriAdd";
import OperatoriSch from "../modals/OperatoriSch";
import {Link} from 'react-router-dom'

function Operatori() {

    const colOperatori = [
        {
            id: 'ID',
            name: 'ID',
            selector: row => row.id_operatore,
            sortable: true,
            maxWidth: '4%',           
        },
        {
            id: 'OPERATORE',
            name: 'OPERATORE',
            selector: row => row.operatore,
            sortable: true,
            cell: (row, index, column, id) => (<><Link to={''} onClick={() => { openModalSch(); setOperatore(row.operatore);}}>{row.operatore}</Link></>),
            style: {
                color: "#0EA5E9",
                fontWeight: "500",
              },
        },
        {
            id: 'EMAIL',
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
            cell: (row, index, column, id) => (<Link to='mailto:renato.casalena@gmail.com'>{row.email}</Link>),
        },
        {
            id: 'PROFILO',
            name: 'PROFILO',
            selector: row => row.profilo,
            sortable: true,
            maxWidth:'16%',
        },
        {
            id: 'STATO',
            name: 'STATO',
            selector: row => row.stato,
            maxWidth: '4%',
        },
    ];
    
    const [users, setUsers] = useState([]);
    const [operatore, setOperatore] = useState(); 
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)

    const openModalAdd = () => {
        setIsOpenAdd(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
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
        getUsers();
    }, []);
      
    return (
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Operatori</div>
                    <div className="basis-1/2 text-end">
                        <button 
                            type="button"
                            onClick={openModalAdd}
                            className="my-button-add">
                            Add Operatore
                        </button>
                    </div>               
                </div>
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <DataTable 
                    columns={colOperatori}
                    data={users}
                    selectableRows
                    />
                </div>               
            </div>
            <OperatoriAdd isOpenAdd={isOpenAdd}  setIsOpenAdd={(bool) => setIsOpenAdd(bool)}/>
            <OperatoriSch isOpenSch={isOpenSch} operatore={operatore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>            
        </>
    )


}

export default Operatori