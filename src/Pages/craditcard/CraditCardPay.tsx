import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function CraditCardPay() {
     const location = useLocation();
      const formData = (location.state?.formData as Record<string, any>) || {};
  return (
    <>
       <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="bg-white px-4 sm:px-12 py-10 md:mx-auto m-2 w-full max-w-lg shadow-lg rounded-lg">
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-black font-semibold text-center mb-5">
                  Payment Details
                </h3>
      
                <div className="text-left">
                  {formData &&
                    Object.entries(formData).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <span className="font-semibold capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>{' '}
                        {Array.isArray(value)
                          ? JSON.stringify(value) 
                          : value || ''}
                      </div>
                    ))}
                </div>
      
                <div className="py-10 text-center">
                  <Link
                    to="https://checkout.stripe.com/c/pay/cs_test_a14UTf1Z4sJLADtW2JDpkuyL6DIQ3dYmMNi3l4XNwdk6T9KDPZwYesvjEI#fidkdWxOYHwnPyd1blpxYHZxWjA0SU5tZENHdWpsdGB2QkdOZ259YWZHN39BblVgMnA0cUxJT3F9VEhyRzM0U0dfMFNAVGlCMWRnanY3U09dQzM3XGdgMWt2N2lxMl9Ccn1DSTxOT2tgdzBXNTVWTEhjUUxwVCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"  target='_blank'
                    className="px-4 sm:px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md"
                  >
                    checkOut
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default CraditCardPay
