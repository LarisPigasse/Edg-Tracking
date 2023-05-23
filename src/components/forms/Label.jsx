
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Label = (props) => {

  return (
    <label { ...props } className={classNames('block text-sm mt-2 font-medium text-gray-700', props.className)}>
        { props.children ?? props.text }
    </label>
  )
}

export default Label