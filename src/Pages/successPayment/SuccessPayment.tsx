import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SuccessPayment() {
    const location = useLocation();
    const { successnavigate } = location.state || {}; 
    const memberDetail = successnavigate?.member_detail;
  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white px-12 py-10  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-black font-semibold text-center mb-5">Payment Done!</h3>
            <div className="flex gap-5 text-start ">
            <ul>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Date :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Invoice Id :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Associate Id :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Full Name :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Email :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Mobile :</li>
                <li className='text-sm xl:text-base font-semibold leading-[18px] mb-1'>Package Name :</li>
            </ul>
            <ul>
               
                {
                    memberDetail &&  (
                        <>
                        
                                <li>{memberDetail.date}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.invoice_id}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.associate_id}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.full_name}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.email}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.mobile}</li>
                                <li className='text-sm xl:text-base font-normal leading-[18px] mb-[5px]'>{memberDetail.package_name}</li> 
                       
                        </>
                    )
                }
            </ul>
            </div>
            <div className="py-10 text-center">
                <Link to='/dashboard' className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                Redirect to Main Page
               </Link>
            </div>
        </div>
    </div>
  </div>
    </>
  )
}

export default SuccessPayment
