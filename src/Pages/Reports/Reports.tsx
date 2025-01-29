
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Reports = () => {
    const [customerRankID, setCustomerRankID] = useState<any>(null);
    useEffect(() => {
             const BizPathdata = sessionStorage.getItem("user");
             if (BizPathdata) {
                 const parsedData = JSON.parse(BizPathdata);
               setCustomerRankID(parsedData.rank)
             }
           }, []);
    
          const handleClick = () => {
            if (customerRankID === '1') {
              toast.error("Please upgrade to become an Associate before you can access.")
            }
          };
    return (
        <>
            <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
                    <div className="container">
                        <div className="relative">
                            <Link to="/dashboard" className="absolute left-0">
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m15 19-7-7 7-7"
                                    />
                                </svg>
                            </Link>
                            <h3 className="text-lg font-medium">Reports</h3>
                        </div>
                    </div>
                </header>
                <ToastContainer/>
                <section className="py-20">
                    <div className="container">
                        <ul className="flex flex-col gap-3 rounded-lg  pr-0">
                            <li> 
                                <Link  to={ '/memberleger' } className="flex items-start p-3 sm:p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white "
                                >
                                    <div className="-mt-1 w-14">
                                        <svg
                                            className="w-6 h-6 text-custom-text-color2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="w-full flex items-center justify-between pr-2"
                                    >
                                        <span>General Ledger</span>
                                        <svg
                                            className="w-5 h-5 text-custom-text-color2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </li>

                            <li className={` ${
                                customerRankID === '1' ? "opacity-80 " : " "
                            }`}  onClick={handleClick} >
                                <Link to={ '/sponsoredtnetwork' }  className={`flex items-start w-full p-3 sm:p-4 text-custom-text-color font-normal rounded-md text-xs bg-white ${
                                customerRankID === '1' ? "pointer-events-none" : " "
                            }`}>
                                <div className="-mt-1 w-14">
                                        <svg
                                            className="w-6 h-6 text-custom-text-color2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className="w-full flex items-center justify-between pr-2"
                                    >
                                        <span>Earning Report</span>
                                        <svg
                                            className="w-5 h-5 text-custom-text-color2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Reports;