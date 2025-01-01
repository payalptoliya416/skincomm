import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchUserDetailData } from '../../../Redux/thunks/UserDetailsThunk';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Uprank from './Uprank';


function UprankStrip() {
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
      return <div className='flex items-center justify-center h-screen w-screen'>Loading...</div>;
    }
  return (
    <>
         <Elements stripe={stripePromise}>
         <Uprank/>
       </Elements>
    </>
  )
}

export default UprankStrip
