import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Registration from "./Registration";
import { BASE_URL } from "../../../Utilities/config";
import { useParams } from "react-router-dom";

function RegistrationStrip() {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [stripeKey, setStripeKey] = useState<any>("");
  // const params = useParams();
  // const ID = params.id;
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
    if (ID) {
      fetchData(ID);
    }
  }, [ID]);

  useEffect(() => {
    if (stripeKey?.stripe_key) {
      const key = stripeKey.stripe_key;
      const stripe = loadStripe(key);
      setStripePromise(stripe);
    }
  }, [stripeKey]);

  if (!stripePromise) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Loading...
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
