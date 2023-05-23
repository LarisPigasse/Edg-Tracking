import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {  XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({ children, open, setOpen, title, w = 'm', classHeader }) {

    const jsonWidth = {
        'xxs':'max-w-xs',
        'xs':'max-w-sm',
        's':'max-w-md',
        'm':'max-w-lg',
        'l':'max-w-2xl',
        'xl':'max-w-4xl',
        'xxl':'max-w-6xl',
        'xxxl':'max-w-8xl',
        'full':'max-w-full'
    }

   let classWidth = jsonWidth[w]

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

               <div className="mt-6 border-b-2 py-1">
                    <div className="absolute top-0 text-left hidden mx-3 py-4 pl-2 sm:block ">
                        <h3 className="text-2xl font-medium leading-6 text-gray-900" > { title } </h3>
                    </div>

                    <div className="absolute top-0 right-0 hidden mx-3 py-4 pr-3 sm:block">
                        <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
               </div>

               { children }

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
