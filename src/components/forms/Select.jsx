import React from "react"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Select = React.forwardRef((props, ref) => {
    return (
          <select
              {...props}
              ref={ref}
              className={classNames( 'block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm',
                                      props.className)}
          >
          { props.children }
          </select>

    )
  }
)

export default Select