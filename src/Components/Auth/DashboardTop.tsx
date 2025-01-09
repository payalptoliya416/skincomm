import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBalance } from "../../Redux/thunks/balanceThunks";
import { RootState } from "../../Redux/store";

const DashboardTop = () => {

    const dispatch = useDispatch<any>(); // Initialize useDispatch hook
    const { balanceData } = useSelector((state: RootState) => state.balance);

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);
    return (
        <>
            <section className="px-4 pt-16 relative">
                <div className="absolute top-0 left-0 w-full h-[180px] bg-[#178285] p-5"></div>

                <div className="bg-white shadow-custom-shadow p-2 sm:p-5 pt-8 rounded-lg relative z-10">
                    <h5 className="text-sm text-custom-text-color font-medium">
                    Loyalty Point - LP
                    </h5>
                    {balanceData && (
                    <h3 className="font-semibold text-sm md:text-3xl text-custom-text-color mt-2">
                        USD {balanceData.available_lp.toFixed(2)}
                    </h3> 
                   )}
                    <ul className="mt-5 border-t border-custom-border pt-5 flex items-center justify-between">
                        <li className="text-center w-1/4">
                            <Link to='/addmemberUser' className="inline-block">
                                <div
                                    className="bg-main-color w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-white flex items-center justify-center m-auto mb-1">
                                    <svg
                                        className="w-5 h-5 sm:w-7 sm:h-7"
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
                                            d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-custom-text-color"
                                >Add Member</span>
                            </Link>
                        </li>

                        <li className="text-center w-1/4">
                            <Link to='/reports'>
                                <div
                                    className="bg-success-color w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-white flex items-center justify-center m-auto mb-1"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-7 sm:h-7"
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
                                            d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                                        />
                                    </svg>
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-custom-text-color"
                                >Reports</span>
                            </Link>
                        </li>

                        <li className="text-center w-1/4">
                            <Link to='/invoice' className="inline-block">
                                <div
                                    className="bg-danger-color w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-white flex items-center justify-center m-auto mb-1"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-7 sm:h-7"
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
                                            d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-custom-text-color"
                                >Invoice</span>
                            </Link>
                        </li>

                        <li className="text-center w-1/4">
                            <Link to='/deliveryorder' className="inline-block">
                                <div
                                    className="bg-warning-color w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-white flex items-center justify-center m-auto mb-1"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-7 sm:h-7"
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
                                            strokeWidth="2"
                                            d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-custom-text-color"
                                > Order Status</span >
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default DashboardTop;