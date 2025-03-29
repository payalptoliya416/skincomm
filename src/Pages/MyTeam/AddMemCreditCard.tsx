import React, { useEffect, useState } from 'react'
import { fetchNumber } from '../../Redux/thunks/mobileNumThunk';
import { fetchAddMember } from '../../Redux/thunks/AddMemberThunk';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function AddMemCreditCard() {
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');
     const dispatch = useDispatch<any>();
     const navigate = useNavigate();
   
     useEffect(() => {
       const submitPayment = async () => {
         const data = sessionStorage.getItem('myTeamAddmemberCredit');
         const submittedData = data ? JSON.parse(data) : null;
         if (!submittedData) {
           setError('No data available for submission.');
           setLoading(false);
           return;
         }
   
         try {
           const mobileDetail = {
             action: 'checkuniquemobile',
             phone_no: submittedData.mobile,
             account: submittedData.account_type,
             sponsor: '',
           };
   
           const response = await dispatch(fetchNumber(mobileDetail));
           const numberData = response.data;
           if (!numberData.success) {
             setError('Mobile validation failed, form submission aborted.');
             setLoading(false);
             return;
           }
   
           const successData = await dispatch(fetchAddMember(submittedData));
           console.log("successData",successData)
           console.log("successData?.data?.data?.success',",successData?.data?.data?.success)
           if (successData?.data?.data?.success === true) {
            toast.success(successData.message);
            navigate('/successfullyPayment', { state: { successnavigate: successData.data.data } });
            sessionStorage.removeItem('myTeamAddmemberCredit');
          } else if (successData?.data?.data?.error) {
            console.log("successData?.data?.data?.error',",successData?.data?.data?.error)
            console.log("successData?.data?.data?.message',",successData?.data?.data?.message)
            setError(successData.data.data.message);
            sessionStorage.removeItem('myTeamAddmemberCredit');
          } else {
            setError(successData.data.data.message || 'An error occurred while processing the request.');
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
           <div className="bg-white shadow-lg rounded-lg p-2 sm:p-6 w-96 text-center">
             <ToastContainer />
             {loading ? (
               <p className="text-base sm:text-lg font-semibold text-blue-500 animate-pulse">Processing your request...</p>
             ) : error ? (
               <>
               <p className="text-base sm:text-lg font-semibold text-red-500">{error}</p>
               <Link to='/placement-tree' className='text-blue-500  underline'>Back</Link>
               </>
             ) : null}
           </div>
         </div>   
    </>
  )
}

export default AddMemCreditCard
