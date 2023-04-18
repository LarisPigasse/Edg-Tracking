import { useState, useEffect} from "react";
import engine from '../engine'
import OperatoriAdd from "../modals/OperatoriAdd";
import OperatoriSch from "../modals/OperatoriSch";
import {Link} from 'react-router-dom';
import Button from '../components/Button';

import { 
    useReactTable, 
    createColumnHelper, 
    flexRender, 
    getCoreRowModel, 
    getSortedRowModel,
    getPaginationRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,} 
from '@tanstack/react-table';
import {FaSortUp, FaSortDown, FaMinus} from 'react-icons/fa'

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [value])
  
    return (
      <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

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
    
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),      
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFacetedMinMaxValues: getFacetedMinMaxValues(),
      debugTable: true,
      debugHeaders: true,
      debugColumns: false      
    })  

    useEffect(() => {
        getUsers();
    }, [])  

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
                    <table className=" w-full bg-white">
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr className="bg-gray-50" key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} className="px-2 py-4 text-start uppercase text-xs text-zinc-800 font-semibold border-b border-zinc-300">
                                    {header.isPlaceholder ? null : (
                                        <div className="flex flex-row">
                                            <div className="basis-1/2"
                                                {...{
                                                    className: header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                    onClick: header.column.getToggleSortingHandler()
                                                }}
                                                >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                            <div className="basis-1/2 ml-1 text-red-600 text-base">    
                                                {{
                                                    asc: <FaSortUp/>,
                                                    desc: <FaSortDown/>
                                                }[header.column.getIsSorted()] ?? <span className="invisible"><FaMinus/></span>}
                                            </div>
                                        </div>
                                    )}
                                    </th>
                                )
                            })}
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
                    <div className="grid text-sm mt-2 justify-items-end">
                        <div className="flex gap-1">
                        <button
                            className="border rounded p-1 hover:bg-white min-w-[24px]"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            >
                            {"<<"}
                        </button>
                        <button
                            className="border rounded p-1  hover:bg-white min-w-[24px]"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            >
                            {"<"}
                        </button>
                        <button
                            className="border rounded p-1  hover:bg-white min-w-[24px]"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            >
                            {">"}
                        </button>
                        <button
                            className="border rounded p-1  hover:bg-white min-w-[24px]"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            >
                            {">>"}
                        </button>
                        <span className="flex items-center gap-1 ml-2">
                            <div>Pagine</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} di{" "}
                                {table.getPageCount()}
                            </strong>
                        </span>
                        <span className="flex items-center gap-1">
                            | Vai a pagina:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                        <select
                            className="px-2"
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            >
                            {[8, 16, 32, 64].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                Vedi {pageSize}
                                </option>
                            ))}
                        </select>
                        </div>                                                                        
                    </div>
                </div>               
            </div>
            <OperatoriAdd isOpenAdd={isOpenAdd}  setIsOpenAdd={(bool) => setIsOpenAdd(bool)}/>
            <OperatoriSch isOpenSch={isOpenSch} operatore={operatore}  setIsOpenSch={(bool) => setIsOpenSch(bool)}/>          
        </>
    )

}

export default Operatori