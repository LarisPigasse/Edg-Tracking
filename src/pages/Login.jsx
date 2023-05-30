import TextField from '@mui/material/TextField';

function Login() {

  return (
    <>
      <div className='h-screen w-full flex flex-col md:justify-center items-center bg-[url(https://tools.expressdeliverygroup.com/assets/img/gradiente.jpg)]'>       
        <div className="md:flex gap-0 xl:w-[50%] lg:w-[80%] w-[90%] md:shadow-lg border-sky-300 md:border md:rounded-lg my-2">
          <div className="md:basis-1/2 relative flex flex-col py-4 bg-sky-400 md:rounded-l-md">
            <div className='p-4'><img src={`${import.meta.env.VITE_IMG_URL}logo-testo-white.png`} /></div>
            <div className='px-8'><img src={`${import.meta.env.VITE_IMG_URL}edg-simbolo.png`} /></div>
            <div className='px-4 text-xs w-full text-white text-center absolute bottom-1'>Express Delivery srl - all rights reserved </div>
          </div>
          <div className="md:basis-1/2 md:border xl:p-8 lg:p-6 p-4 bg-neutral-100 md:rounded-r-md md:mb-0 mb-4">
            <div className="text-3xl font-bold text-center text-stone-600 py-4">Area Riservata</div>
            <div className="text-sm text-center">Inserisci email e password per accedere alla tua area riservata</div>
            <form className="space-y-6  lg:mt-6 mt-4" action="#" method="POST">                 

              <div className='shadow-sm bg-white/[.2]'>
                <TextField
                  fullWidth
                  id="outlined-email-input"
                  label="Email"
                  type="text"
                  autoComplete="current-text"
                />
              </div>

              <div className="shadow-sm bg-white/[.4]">
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>


              <div className=' lg:pt-4 pt-2 text-center'>
                <button
                  type="submit"
                  className="rounded-md px-10 py-3 text-sm font-semibold text-white shadow-md bg-red-500 hover:bg-red-600"
                >
                  LOGIN
                </button>
              </div>

              <div className='text-center pt-2 border-t border-sky-200  pb-2 border-b'>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-sky-600 hover:text-red-600">
                    reset password / password dimenticata?
                  </a>
                </div>
              </div>

            </form>           
          </div>
        </div>
      </div>            
    </>
  )
}

export default Login