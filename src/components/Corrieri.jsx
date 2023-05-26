import { useEffect, useState } from "react"
import DataTable from "../components/DataTable"
import Dropdown from "../components/Dropdown"
import ModalCorrieri from "../components/modal/ModalCorrieri"
import { EllipsisVerticalIcon} from '@heroicons/react/24/solid'
import {FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'
import clientAxios from "../config/clientAxios"

function Corrieri() {
    const [open, setOpen] = useState(false);
    const [datiForm, setDatiForm] = useState({})
    const [corrieri, setCorrieri] = useState([])

    const columns = [
        {
          header: "id",
          accessorFn: row => row.id_corriere,
          footer: props => props.column.id,
        },
        {
          header: "corriere",
          accessorFn: row => row.corriere,
          footer: props => props.column.id,
        },
        {
          header: "vettore",
          accessorFn: row => row.vettore,
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
            return (
                <Dropdown
                    element={<EllipsisVerticalIcon className="h-6 w-6 text-emerald-800 font-bold" aria-hidden="true" />}
                    options={[
                        {
                            name: <div className='flex'>
                                <FaRegEdit className="h-5 w-5 text-orange-500 justify-start" />
                                <span className='justify-end ml-2'>Modifica</span>
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
                                <FaRegTrashAlt  className="h-5 w-5 text-red-600 justify-start" />
                                <span className='justify-end ml-2'>Elimina</span>
                            </div>,
                            props: {
                                onClick: () => {
                                    setDatiAlert({
                                        title: `Vuoi eliminare il corriere ${info.row.original.utente}`,
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
                    
                    ]} 
                />
            )
          },
        }
    ]  

    const getCorrieri = async () => {
        const { data } = await clientAxios('/couriers')
        setCorrieri(data)
    }

    useEffect(() => {
        getCorrieri();
    }, [])

    let customProps = {
        classTable: '',
        striped: false,
        rowline: true
    }

    const addProps = {
        text: 'Nuovo',
        onClick: () => setOpen(true)
    }

    return (
        <>
            <div className="my-4">
                <ModalCorrieri open={open} setOpen={setOpen} getRow={getCorrieri} datiForm={datiForm} setDatiForm={setDatiForm} titleModal='Modifica corriere' />   
                <div className='bg-neutral-100 p-4 mt-2'> 
                    <DataTable title="Tabella corrieri" 
                            data={corrieri} 
                            columns={columns} 
                            customProps={customProps} search searchColumns pagination ordering addProps={addProps}/>
                </div>
            </div>    
        </>   
    )
}

export default Corrieri