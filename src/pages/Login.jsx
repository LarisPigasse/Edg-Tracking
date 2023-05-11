import engine from '../engine'

function Login() {
  return (
    <>
        <div class="h-screen w-full bg-gray-50 flex flex-col justify-center items-center p-2 bg-[url('https://tools.expressdeliverygroup.com/assets/img/bg-abstract.jpg')] bg-no-repeat bg-center">
        
            <div class='max-w-4xl shadow-xl flex flex-row rounded-lg overflow-hidden mx-auto ring-1 ring-sky-400'>
                
                <div class="bg-white p-8 w-1/2 min">
                  <div class="text-3xl font-bold text-center text-sky-500 py-4">Area Riservata</div>

          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900  shadow-sm placeholder:text-gray-400 hover:ring-red-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-sky-500">
                    Hai dimenticato la password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='text-center'>
              <button
                type="submit"
                className="w-1/2 rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                LOGIN
              </button>
            </div>
          </form>


                </div>
                <div class=" bg-sky-400 p-8 w-1/2">
                  <div className='py-2'><img src={`${engine.img}logo-testo-white.png`} /></div>
                  <div className='px-8'><img src={`${engine.img}edg-simbolo.png`} /></div>               
                  <div class=" text-xs text-white font-semibold text-right pt-4">All Rights Reserved by</div>
                  <div class=" text-xs text-white font-semibold text-right">EXPRESS DELIVERY Srl</div>                 
                </div>                
            </div>         
        </div>

             
    </>
  )
}

export default Login