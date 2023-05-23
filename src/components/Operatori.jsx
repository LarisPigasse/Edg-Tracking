import { useEffect, useState } from "react"
import DataTable from "../components/DataTable"
import Dropdown from "../components/Dropdown"
import ModalOperatori from "../components/modal/ModalOperatori"
import { EllipsisVerticalIcon} from '@heroicons/react/24/solid'
import {FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'
import clientAxios from "../config/clientAxios"
import Button from "./Button";

function Operatori() {

    const [open, setOpen] = useState(false);
    const [datiForm, setDatiForm] = useState({})
    const [operatori, setOperatori] = useState([])

    const optionsDropdown = [
        {
            name: <div className='flex'>
                <FaRegEdit className="h-5 w-5 text-orange-500 justify-start" aria-hidden="true" />
                <span className='justify-end ml-3 mt-0.5'>Modifica</span>
            </div>,
            props: {
                onClick: () => {
                    setOpen(true);
                    setDatiForm(info.row.original)
                },
                to: '#'
            }
        },
        {
            name: <div className='flex'>
                <FaRegTrashAlt className="h-5 w-5 text-red-600 justify-start" aria-hidden="true" />
                <span className='justify-end ml-3 mt-0.5'>Elimina</span>
            </div>,
            props: {
                onClick: () => {

                    setDatiAlert({
                        title: `Vuoi eliminare l'utente ${info.row.original.utente}`,
                        open: true,
                        typeIcona:'question',
                        onConfirm: () => onConfirmDelete(info.row.original.uuid_utente),
                        buttonVariantConfirm: 'red',
                        confirmText: 'Elimina'
                    })

                },
                to: '#'
            }
        },
    
    ]

    const columns = [
        {
          header: "id",
          accessorFn: row => row.id_operatore,
          footer: props => props.column.id,
        },
        {
          header: "operatore",
          accessorFn: row => row.operatore,
          footer: props => props.column.id,
        },
        {
          header: "email",
          accessorFn: row => row.email,
          footer: props => props.column.id,
        },
        {
          header: "stato",
          accessorFn: row => row.stato,
          footer: props => props.column.id,
        },
        {
          header: " ",
          footer: props => props.column.profilo,
          cell: (info) => {
            console.log(info)
            return (
                <Dropdown
                    element={<EllipsisVerticalIcon className="h-6 w-6 text-emerald-800 font-bold" aria-hidden="true" />}
                    options={ optionsDropdown }
                />
            )
          },
        }
    ]  

    const getOperatori = async () => {
        const { data } = await clientAxios('/users')
        setOperatori(data)
    }

    useEffect(() => {
        getOperatori();
    }, [])

    let customProps = {
        classTable: '',
        striped: false,
        rowline: true
    }

    const addProps = {
        text: 'Genera',
        onClick: () => setOpen(true)
    }

    return (

        <>
            <div className="my-4">
                <ModalOperatori open={open} setOpen={setOpen} getRow={getOperatori} datiForm={datiForm} setDatiForm={setDatiForm} titleModal='Modifica operatore' />   
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <DataTable title="Tabella operatori" 
                            data={operatori} 
                            columns={columns} 
                            customProps={customProps} search searchColumns pagination ordering addProps={addProps}/>
                </div>
            </div>    
        </>
      )

}

export default Operatori