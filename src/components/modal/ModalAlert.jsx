import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon, InformationCircleIcon, XCircleIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import Button from '../Button'

export default function ModalAlert(props) {

    const { open, title, message, confirmText, cancelText, onClose, onConfirm,
            onDeny, denyText, ButtonDeny, icona, typeIcona, setShowAlert, showAlert,
            ButtonConfirm, ButtonClose,
            w, children } = props

    const jsonWidth = {
        'xxs':'max-w-xs',
        'xs':'max-w-sm',
        's':'max-w-md',
        'm':'max-w-lg',
        'l':'max-w-2xl',
        'xl':'max-w-4xl',
        'xxl':'max-w-6xl',
        'full':'max-w-full'
    }

   let classWidth = jsonWidth[w]
   
    const jsonIcone = {
        'success': <CheckCircleIcon  className="text-green-500 h-24 w-24" aria-hidden="true" />,
        'warning': <ExclamationTriangleIcon  className="text-yellow-500 h-24 w-24" aria-hidden="true" />,
        'error'  : <XCircleIcon  className="text-red-700 h-24 w-24" aria-hidden="true" />,
        'info'   : <InformationCircleIcon  className="text-blue-500 h-24 w-24" aria-hidden="true" />,
        'question' : <QuestionMarkCircleIcon className="text-blue-300 h-24 w-24" aria-hidden="true" />
    }

    let renderIcona = jsonIcone[typeIcona]
    if(icona){
        renderIcona = icona;
    }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white pt-5 pb-4 text-left shadow-xl transition-all
                                 my-8 w-full ${classWidth} py-6`}>

                <div className="mt-1">
                    <div className="absolute top-0 right-0 hidden mt-2 mx-2 py-2 pr-2 sm:block">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
               </div>

               { children }

               { renderIcona && <div className="flex justify-center mb-2">
                    { renderIcona }
               </div> }

                {
                    title && <div className="text-center py-1 pl-2">
                        <h3 className="text-2xl font-semibold leading-6 text-gray-900" > {title} </h3>
                    </div>
                }

                {
                    message && <div className="mt-2 text-center">
                        <p className="text-xl text-gray-600">{message}</p>
                    </div>
                }

                <div className="mt-4 flex justify-end mx-4">
                  {
                    ButtonClose ? ButtonClose : <Button type="button"
                    variant="base"
                    text={cancelText}
                    onClick={ onClose}
                    className="mr-2"
                  />
                  }

                  {
                        onDeny && !ButtonDeny && <Button type="button"
                            variant="base"
                            onClick={onDeny}
                            text={denyText}
                            className="ml-2"
                        />
                  }

                  { ButtonDeny ?? null}

                  {
                        onConfirm && !ButtonConfirm && <Button type="button"
                            variant="primary"
                            onClick={onConfirm}
                            text={confirmText}
                            className="ml-1"
                        />
                  }

                  { ButtonConfirm ?? null }
                  
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
