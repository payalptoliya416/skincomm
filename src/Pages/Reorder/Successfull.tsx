import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Successfull() {
  const location = useLocation();
  const successMsj = location.state?.message || '';
  return (
    <>
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="bg-white px-2 sm:px-12 py-10  md:mx-auto m-2">
              <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                  <path fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                  </path>
              </svg>
              <div className="text-center">
                  <h3 className="md:text-2xl text-base text-black font-semibold text-center mb-5">Payment Done!</h3>
                 {successMsj ? <p className='w-full max-w-[400px] mx-auto text-sm sm:text-base'>{successMsj}</p> : "" }
                  <div className="py-10 text-center">
                      <Link to='/dashboard' className="px-4 sm:px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      Redirect to Main Page
                     </Link>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default Successfull
