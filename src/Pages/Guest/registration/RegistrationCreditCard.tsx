import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../Utilities/config';

function RegistrationCreditCard() {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const navigate = useNavigate();
    
      useEffect(() => {
        const submitPayment = async () => {
          setLoading(true);
          setError('');
    
          const data = sessionStorage.getItem("signupcredit");
          if (!data) {
            setError("No data available for submission.");
            setLoading(false);
            return;
          }
    
          const submittedData = JSON.parse(data);
    
          try {
            const response = await fetch(`${BASE_URL}/api/signup-public`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(submittedData),
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch Registartion Submit Data");
            }
    
            const result = await response.json();
    
            if (result?.error) {
              setError(result.message);
              sessionStorage.removeItem("signupcredit");
            } else {
              sessionStorage.removeItem("signupcredit");
              navigate("/");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while processing the request.");
          } finally {
            setLoading(false);
          }
        };
    
        submitPayment();
      }, [navigate]);
  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-2 sm:p-6 w-96 text-center mx-3">
              {loading ? (
                <p className="text-base sm:text-lg font-semibold text-blue-500 animate-pulse">Processing your request...</p>
              ) : error ? (
                <>
                <p className="text-sm sm:text-lg font-semibold text-red-500">{error}</p>
                <Link to='/signup' className='text-blue-500  underline'>Back</Link>
                </>
              ) : null}
            </div>
          </div>
    </>
  )
}

export default RegistrationCreditCard
