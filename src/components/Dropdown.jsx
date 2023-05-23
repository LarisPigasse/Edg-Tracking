import { Fragment } from 'react'
import {  Menu, Transition } from '@headlessui/react'

import {Link} from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown ( { element,options, classDiv }) {
    
  return (
        <Menu as="div" className={classDiv}>
          <div className="">
            <Menu.Button className="flex z-10 max-w-xs items-center rounded-full transition duration-300 hover:rotate-90 hover:shadow-sm text-sm hover:ring-2 hover:ring-fuchsia-400">
                { element }
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-10 right-0 mx-4 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-sky-300 ring-opacity-4 focus:outline-none">
                    {options.map((item, i ) => (
                        <Menu.Item key={i}>
                            {({ active }) => (
                                <Link
                                    {
                                      ...item.props
                                    }
                                    className={classNames(
                                        active ? 'bg-zinc-100' : '',
                                        'block py-2 px-4 text-sm text-zinc-700'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
          </div>
        </Menu>
  )
}