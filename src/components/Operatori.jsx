import { useState, useReducer, useEffect} from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import OperatoriAdd from "../modals/OperatoriAdd";
import OperatoriSch from "../modals/OperatoriSch";
import {Link} from 'react-router-dom'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel} from '@tanstack/react-table'
import TanTable from '../components/TanTable'

function Operatori() {

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("id_operatore", {
            cell: info => info.getValue(),
            header: () => <span>ID</span>,
          }),
          columnHelper.accessor("operatore", {
            cell: info => (<Link to={''} className="text-sky-500" onClick={() => { openModalSch(); setOperatore(info.getValue());}}>{info.getValue()} </Link>),
          }),
          columnHelper.accessor("email", {
            cell: info => info.getValue(),
          }),
          columnHelper.accessor("profilo", {
            cell: info => info.getValue(),
          }),
          columnHelper.accessor("stato", {
            cell: info => info.getValue(),
          }),                                                
    ]  

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenSch, setIsOpenSch] = useState(false)
    const [operatore, setOperatore] = useState(); 

    const openModalAdd = () => {
        setIsOpenAdd(true);
    }

    const openModalSch = () => {
        setIsOpenSch(true);
    }

    const [data, setData] = useState([]);
    const getUsers = async () => {
        try {
          const response = await fetch(engine.backend+'/users');
          const datajson = await response.json();
          setData(datajson);
        } catch (err) {
          console.log(err);
        }
      };    
    
    useEffect(() => {
        getUsers();
    }, []);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),      
    })
    
    return (
        <>
            <div className="my-4">
                <div className='uppercase font-semibold pl-4 flex flex-row'>
                    <div className="basis-1/2 pt-3">Operatori</div>
                    <div className="basis-1/2 text-end">
                        <button 
                            type="button"
                            onClick={openModalAdd}
                            className="my-btn my-btn-add">
                            Add Operatore
                        </button>
                    </div>               
                </div>
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <table className=" w-full bg-white">
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr className="bg-gray-50" key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="px-2 py-4 text-start uppercase text-xs text-zinc-800 font-semibold border-b border-zinc-300" key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header.className,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className=" hover:bg-stone-50">
                            {row.getVisibleCells().map(cell => (
                                <td className="px-2 text-sm text-zinc-700 py-2 border-b" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>               
            </div>
            <OperatoriAdd isOpenAdd={isOpenAdd}  setIsOpenAdd={(bool) => setIsOpenAdd(bool)}/>
            <OperatoriSch isOpenSch={isOpenSch} operatore={operatore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>          
        </>
    )


}

export default Operatori