import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Registration from "./Registration";
import { BASE_URL } from "../../../Utilities/config";
import { toast, ToastContainer } from "react-toastify";

function RegistrationStrip() {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [stripeKey, setStripeKey] = useState<any>("");
  const ID = sessionStorage.getItem("refUserID")
  const fetchData = async (ID: any) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/get-member-details-public`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "checkuserdetail",
            userid: ID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setStripeKey(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (stripeKey?.stripe_key) {
      const key = stripeKey.stripe_key;
      const stripe = loadStripe(key);
      setStripePromise(stripe);
    }
  }, [stripeKey]);

  useEffect(() => {
    if (!ID) {
      toast.error("You do not have authorization to access this page.");
    } else {
      fetchData(ID);
    }
  }, [ID]);

  if(!ID){
    toast.error("You do not have authorization to access this page.");
    return(
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-800 mb-4">Access Denied</p>
      <button 
        onClick={() => window.history.back()} 
        className="px-4 py-2 bg-[#148585] text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Go Back
      </button>
      <ToastContainer />
    </div>
    )
  }
  if (!stripePromise) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Loading...
        <ToastContainer />
      </div>
    );
  }
  
  return (
    <>
      <Elements stripe={stripePromise}>
        <Registration/>
      </Elements>
    </>
  );
}

export default RegistrationStrip;
