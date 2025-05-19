import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { fetchJumpstartPostData } from '../../../Redux/thunks/JumpStartPostThunk';
import { useDispatch } from 'react-redux';

function JumStartCreditCard() {
     const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        const dispatch = useDispatch<any>();
        const navigate = useNavigate();
      
        useEffect(() => {
          const submitPayment = async () => {
            const data = sessionStorage.getItem('jumpstartCredit');
            const submittedData = data ? JSON.parse(data) : null;
            if (!submittedData) {
              setError('No data available for submission.');
              setLoading(false);
              return;
            }
      
            try {
      
              const successData = await dispatch(fetchJumpstartPostData(submittedData));
              if (successData?.data?.data?.error) {
                setError(successData.data.data.message);
                sessionStorage.removeItem('jumpstartCredit');
              } else {
                navigate('/successfully', { state: { message : successData.message } });
                sessionStorage.removeItem('jumpstartCredit');
              }
            } catch (error) {
              setError('An error occurred while processing the request.');
            } finally {
              setLoading(false);
            }
          };
      
          submitPayment();
        }, [dispatch, navigate]);
  return (
    <>
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
                 <div className="bg-white shadow-lg rounded-lg p-2 sm:p-6 w-96 text-center mx-3">
                   <ToastContainer />
                   {loading ? (
                     <p className="text-base sm:text-lg font-semibold text-blue-500 animate-pulse">Processing your request...</p>
                   ) : error ? (
                     <>
                     <p className="text-sm sm:text-lg font-semibold text-red-500">{error}</p>
                     <Link to='/jumpstart' className='text-blue-500  underline'>Back</Link>
                     </>
                   ) : null}
                 </div>
               </div>
    </>
  )
}

export default JumStartCreditCard
