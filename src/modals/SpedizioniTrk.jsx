import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function SpedizioniTrk({isOpenTrk, setIsOpenTrk, spedizione}) {
    
    function closeModal() {
        setIsOpenTrk(false)
    }
    
    return (
    <Transition appear show={isOpenTrk} as={Fragment}>
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
                <Dialog.Panel className="my-modal-xl bg-white">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Tracking spedizione {spedizione}
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    Questa è la modal per visualizzare lo stato della spedizione
                    </p>
                </div>

                <div className="mt-4">
                    <button
                    type="button"
                    className="my-button-close"
                    onClick={closeModal}
                    >
                    Chiudi
                    </button>
                </div>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition>            

    )
}

export default SpedizioniTrk