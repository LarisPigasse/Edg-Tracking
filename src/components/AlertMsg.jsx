import { ExclamationTriangleIcon, InformationCircleIcon,XCircleIcon,CheckCircleIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react';

export default function AlertMsg({ msg, children, variant }) {
  let classDiv, classText, classIcona, Icona;
  switch (variant) {
    case 'success':
      classDiv = ` border-green-400 bg-green-50 `;
      classText = `text-green-800 `;
      classIcona = `text-green-500 `;
      Icona = CheckCircleIcon
      break;
    case 'danger':
      classDiv = ` border-red-400 bg-red-50 `;
      classText = `text-red-800 `;
      classIcona = `text-red-500 `;
      Icona = XCircleIcon
      break;
    case 'warning':
      classDiv = ` border-yellow-400 bg-yellow-50 `;
      classText = `text-yellow-800 `;
      classIcona = `text-yellow-500 `;
      Icona =ExclamationTriangleIcon
      break;
    case 'info':
      classDiv = ` border-blue-400 bg-blue-50 `;
      classIcona = `text-blue-500 `;
      classIcona = `text-blue-500 `;
      Icona =  InformationCircleIcon
      break;
  
    default:
      classDiv = ` border-emerald-400 bg-emerald-50 `;
      classText = `text-emerald-800 `;
      classIcona = `text-emerald-500 `;
      Icona =  Fragment
      break;
  }


  return (
    <div className={`border-l-4 ${classDiv} p-3 my-2`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icona className={` h-5 w-5 ${classIcona}`}/>
        </div>
        <div className="ml-3">
          <p className={`text-sm ${classText}`}>
            {children }
          </p>
        </div>
      </div>
    </div>
  )
}
