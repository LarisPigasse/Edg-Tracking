import { useState} from "react";
import OperatoriAdd from "../modals/OperatoriAdd";
import OperatoriSch from "../modals/OperatoriSch";
import {Link} from 'react-router-dom';
import Button from '../components/Button';
import {createColumnHelper} from '@tanstack/react-table';
import MyTable from "./table/MyTable";

function Operatori() {

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("id_operatore", {
            header: () => "id",
            cell: info => info.getValue(),           
          }),
          columnHelper.accessor("operatore", {
            header: () => "operatore",
            cell: info => (<Link to={''} className="text-sky-500" onClick={() => { openModalSch(); setOperatore(info.getValue());}}>{info.getValue()} </Link>),
          }),
          columnHelper.accessor("email", {
            header: () => "email",
            cell: info => info.getValue(),
          }),
          columnHelper.accessor("profilo", {
            header: () => "profilo",
            cell: info => info.getValue(),
          }),
          columnHelper.accessor("stato", {
            header: () => "stato",
            cell: info => info.getValue(),
          }),                                                
    ]  

    const endpoint = '/users';
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)
    const [operatore, setOperatore] = useState(); 

    const openModalAdd = () => {
        setIsOpenAdd(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }

    return (
        <>
            <div className="my-4">

                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Operatori</div>
                    <div className="basis-1/2 text-end">
                        <Button variant="add" text="Add Operatore" onClick={openModalAdd}/>
                    </div>               
                </div>

                <div className='bg-neutral-100 p-4 mt-2'> 
                    <MyTable columns={columns} endpoint={endpoint}/>
                </div>               
            </div>
            <OperatoriAdd isOpenAdd={isOpenAdd}  setIsOpenAdd={(bool) => setIsOpenAdd(bool)}/>
            <OperatoriSch isOpenSch={isOpenSch} operatore={operatore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>          
        </>
    )

}

export default Operatori