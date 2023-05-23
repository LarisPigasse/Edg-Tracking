import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Button = ( props ) => {

    const [isDisabled, setIsDisabled] = useState(false);

    let { children, classes, variant, size, text, customClass, onClick, loading} = props;

    customClass = {
        size: '',
        variant: '',
        ...customClass,
    }

    const jsonVariant = {
        'primary' : ` border border-transparent bg-emerald-700 hover:bg-emerald-800 text-white`,
        'red' : ` border border-transparent bg-red-700 hover:bg-red-800 text-white`,
        'yellow' : ` border border-transparent bg-yellow-500 hover:bg-yellow-600 text-white`,
        'blue' : ` border border-transparent bg-blue-700 hover:bg-blue-800 text-white`,
        'orange' : ` border border-transparent bg-orange-700 hover:bg-orange-800 text-white`,
        'base' : ` border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 `,
        'custom' : customClass.variant
    }
    
    const jsonSize = {
        'xs':` px-2.5 py-1.5 text-xs`,
        'sm':` px-3 py-2 text-sm leading-4`,
        'md':`px-4 py-2 text-sm`,
        'lg':`px-4 py-2 text-base`,
        'xl':`px-6 py-3 text-base`,
        'custom': customClass.size
    }

    let classVariant = jsonVariant[variant];
    let classSize = jsonSize[size];

    const handleClick = async () => {
        if(loading){
            setIsDisabled(true);
        }
        await onClick();
        if(loading){
            setIsDisabled(false);
        }
    }

    return (
            <button
                {...props}
                
                onClick={handleClick}
                className={
                    classNames('inline-flex relative justify-center rounded-md mx-0.5 font-medium drop-shadow-sm hover:drop-shadow-md leading-4 duration-300 disabled:cursor-not-allowed disabled:opacity-75',
                    classVariant,
                    classSize,
                    classes,
                    props.className)}
                disabled={loading}
            >
                {loading && (<CgSpinner size={16} className="animate-spin text-white font-bold p-0 m-0 mr-1" />)}
                {children ?? text }
            </button>

  )
}

Button.defaultProps = {
    variant: 'base',
    size: 'md',
    onClick: () => {}
}

export default Button