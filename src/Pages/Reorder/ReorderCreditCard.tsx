import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { fetchReorderPost } from '../../Redux/thunks/ReorderPostThunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ReorderCreditCard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
  
    useEffect(() => {
      const submitPayment = async () => {
        const data = sessionStorage.getItem('reorderpaymentData');
        const submittedData = data ? JSON.parse(data) : null;
        if (!submittedData) {
          setError('No data available for submission.');
          setLoading(false);
          return;
        }
  
        try {
          const successData = await dispatch(fetchReorderPost(submittedData));
          console.log("successData",successData)
          console.log("successDatasasas",successData.data.message)
          if (successData?.data?.success) {
            navigate('/successfully', { state: { message: successData.data.message } });
            sessionStorage.removeItem('reorderpaymentData');
          } else {
            setError(successData.data.data.message);
            sessionStorage.removeItem('reorderpaymentData');
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
                     <p className="text-sm sm:text-lg font-semibold text-blue-500 animate-pulse">Processing your request...</p>
                   ) : error ? (
                     <>
                     <p className="text-base sm:text-lg font-semibold text-red-500">{error}</p>
                     <Link to='/reorder' className='text-blue-500  underline'>Back</Link>
                     </>
                   ) : null}
                 </div>
               </div>   
    </>
  )
}

export default ReorderCreditCard
