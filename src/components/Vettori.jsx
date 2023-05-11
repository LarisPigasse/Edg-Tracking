import { useState, useEffect } from "react";
import engine from '../engine'
import VettoriAdd from "../modals/VettoriAdd";
import VettoriSch from "../modals/VettoriSch";
import {Link} from 'react-router-dom'
import Button from "./Button";
import {createColumnHelper} from '@tanstack/react-table';
import MyTable from "./table/MyTable";

function Vettori() {

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("id_vettore", {
            header: () => "id",
            cell: info => info.getValue(),           
          }),
          columnHelper.accessor("vettore", {
            header: () => "vettore",
            cell: info => (<Link to={''} className="text-sky-500" onClick={() => { openModalSch(); setVettore(info.getValue());}}>{info.getValue()} </Link>),
          }),
          columnHelper.accessor("endpoint", {
            header: () => "endpoint",
            cell: info => info.getValue(),
          }),
          columnHelper.accessor("stato", {
            header: () => "stato",
            cell: info => info.getValue(),
          }),                                                
    ]    

    const endpoint = '/carriers';
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)
    const [vettore, setVettore] = useState();    

    const openModal = () => {
        setIsOpen(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }

      
    return (
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Vettori</div>
                    <div className="basis-1/2 text-end">
                        <Button  variant="add" onClick={openModal} text="Add Vettore"/>
                    </div>               
                </div>
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <MyTable columns={columns} endpoint={endpoint}/>
                </div>             
            </div>
            <VettoriAdd isOpen={isOpen}  setIsOpen={(bool) => setIsOpen(bool)}/>
            <VettoriSch isOpenSch={isOpenSch} vettore={vettore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/> 
        </>
    )
}

export default Vettori