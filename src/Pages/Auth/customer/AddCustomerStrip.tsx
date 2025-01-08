import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import AddCustomer from './AddCustomer'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchUserDetailData } from '../../../Redux/thunks/UserDetailsThunk';
import { loadStripe } from '@stripe/stripe-js';

function AddCustomerStrip() {
    const dispatch = useDispatch<any>();
    const { UserDetailData } = useSelector((state: RootState) => state.userDetail);
    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  
    const ID = localStorage.getItem("UserID");
  
    useEffect(() => {
      const userdatad = {
        action: "checkuserdetail",
        userid: ID,
      };
      dispatch(fetchUserDetailData(userdatad));
    }, [dispatch, ID]);
  
    useEffect(() => {
      if (UserDetailData?.stripe_key) {
        const key = UserDetailData.stripe_key;
        const stripe = loadStripe(key);
        setStripePromise(stripe); 
      }
    }, [UserDetailData]);
  
    if (!stripePromise) {
      return <div className='flex justify-center items-center h-screen w-screen'>Loading...</div>;
    }
  return (
    <>
      <Elements stripe={stripePromise}>
      <AddCustomer/>
         </Elements>
    </>
  )
}

export default AddCustomerStrip
