import engine from '../engine'

function Login() {
  return (
    <>
        <div class="h-screen w-full bg-gray-50 flex flex-col justify-center items-center p-2 bg-[url('https://tools.expressdeliverygroup.com/assets/img/bg-abstract.jpg')] bg-no-repeat bg-center">       
            <div class='max-w-4xl shadow-xl flex flex-row rounded-lg overflow-hidden mx-auto ring-1 ring-sky-400'>
                
                <div class="bg-white p-8 w-1/2 min">
                  <div class="text-3xl font-bold text-center text-sky-500 py-4">Area Riservata</div>
                  <div class="text-base text-center text-zinc-500 py-4">Inserisci email e password per accedere alla tua area riservata</div>
                  <form className="space-y-6" action="#" method="POST">                 
                    <div>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder='Email'
                          required
                          className="block w-full p-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-zinc-300
                                     placeholder:text-gray-400 sm:text-sm hover:ring-zinc-400"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder='Password'
                          required
                          className="block w-full p-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-zinc-300
                                    placeholder:text-gray-400 sm:text-sm hover:ring-zinc-400"
                        />
                      </div>
                    </div>

                    <div className='text-center'>
                      <button
                        type="submit"
                        className="rounded-md bg-sky-400 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
                      >
                        LOGIN
                      </button>
                    </div>

                    <div className='text-center pt-4 border-t border-sky-300  pb-4 border-b'>
                      <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-sky-500">
                          reset password / password dimenticata?
                        </a>
                      </div>
                    </div>

                  </form>


                </div>

                <div class=" bg-sky-400 p-8 w-1/2">
                  <div className='py-2'><img src={`${engine.img}logo-testo-white.png`} /></div>
                  <div className='px-8'><img src={`${engine.img}edg-simbolo.png`} /></div>
                  <div className=''>
                    <div class=" text-xs text-white font-semibold text-right pt-4">All Rights Reserved by</div>
                    <div class=" text-xs text-white font-semibold text-right">EXPRESS DELIVERY Srl</div>                 
                  </div>               
                </div>

            </div>         
        </div>

             
    </>
  )
}

export default Login