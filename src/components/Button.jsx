import React from 'react'

const Button = ( props ) => {

    let { children, classes, variant, text } = props;
    let titolo = ""

    switch (variant) {
        case 'add':
            variant = ` bg-sky-500 hover:bg-sky-600 text-white `
            titolo = ` Aggiungi `
            break;
        case 'mod':
            variant = ` bg-yellow-400 hover:bg-yellow-500 text-zinc-900 `
            titolo = ` Modifica `
            break;
        case 'open':
            variant = ` bg-fuchsia-500 hover:bg-fuchsia-600 text-white `
            titolo = ` Apri `
            break;
        case 'del':
            variant = ` bg-red-600 hover:bg-red-700 text-white `
            titolo = ` Elimina `
            break;
        case 'save':
            variant = ` bg-green-500 hover:bg-green-600 text-white  `
            titolo = ` Salva `
            break;
        case 'close':
            variant = `  bg-sky-200 hover:bg-sky-300 text-zinc-900  `
            titolo = ` Chiudi `
            break;
        case 'light':
            variant = ` bg-gray-100 hover:bg-gray-200 text-zinc-900 hover:drop-shadow-sm `
            titolo = ` Action `
            break;
        case 'dark':
            variant = ` bg-zinc-900 hover:bg-zinc-800 text-white  `
            titolo = ` Action `
            break;
        default: 
            variant = ` bg-sky-500 hover:bg-sky-600 text-white `
            titolo = ` Action `
            break;
    }

    return (
        <button
            className={`inline-flex relative justify-center mx-1 rounded-md border border-transparent px-4 py-2 text-sm font-medium drop-shadow-sm hover:drop-shadow-md duration-300 ${variant} ${classes}`}
            {...props}
        >
            {children ?? text ?? titolo}
        </button>
  )
}

export default Button