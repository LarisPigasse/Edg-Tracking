import React from "react"
import Label from "./Label"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Input = React.forwardRef((props, ref) => {

    return (
      <>
        {
          props.inputLabel && 
           <Label htmlFor={props.id ?? ''} text={props.inputLabel} />
        }
        <input
            {...props}
            ref={ref}
            className={classNames('block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm',
                                    props.className)}
        />
      </>
    )
  }
)

export default Input