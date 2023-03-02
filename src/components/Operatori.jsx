import { useState, useEffect, Fragment } from "react";
import DataTable from '../data/MyDataTables';
import engine from '../engine'
import { Dialog, Transition } from '@headlessui/react'

function Operatori() {

    const colOperatori = [
        {
            name: 'ID',
            selector: row => row.id_operatore,
            sortable: true,
        },
        {
            name: 'OPERATORE',
            selector: row => row.operatore,
            sortable: true,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'PROFILO',
            selector: row => row.profilo,
            sortable: true,
        },
        {
            name: 'STATO',
            selector: row => row.stato,
        },
    ]

    const [users, setUsers] = useState([]); 
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
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
                    columns={colOperatori}
                    data={users}
                    selectableRows
                    />
                </div>               
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Payment successful
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            Your payment has been successfully submitted. We’ve sent
                            you an email with all of the details of your order.
                            </p>
                        </div>

                        <div className="mt-4">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                            >
                            Got it, thanks!
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>            
        </>
    )


}

export default Operatori