import { useRouteError } from "react-router-dom"
import engine from "../engine";

export default function ErrorPage() {
    const error = useRouteError();
  
    return (
      <div id="error-page" className="flex items-center justify-center h-screen bg-gradient-to-l from-zinc-50 to-zinc-100">
        <div className='grid justify-items-center'>
            <div><img src={`${engine.img}simbolo-error.png`} className="max-h-24" /></div>          
            <div className='text-lg text-black font-bold'>Attenzione!</div>
            <div>Si è verificato un errore inaspettato</div>
            <div className='font-medium'>{error.statusText || error.message}</div>
        </div>
      </div>
    );
}
