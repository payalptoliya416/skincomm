import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import storage from 'redux-persist/lib/storage';
import { fetchBalance } from "../../Redux/thunks/balanceThunks";
import { RootState } from "../../Redux/store";

const DashboardSidebar = ({ loginState }: any) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const userFromLocalStorage = JSON.parse(sessionStorage.getItem("userLoginstate") || "{}");

    const dispatch = useDispatch<any>(); 

    const toggleSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setSidebarVisible(!sidebarVisible);
    };
    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    const handleLogout = async () => {
        await storage.removeItem("persist:user_root");
        await storage.removeItem("token");
        sessionStorage.removeItem("user_data")
        sessionStorage.removeItem("securityMemberId");
        sessionStorage.removeItem('loginUser')
        sessionStorage.removeItem('loginUserId')
        sessionStorage.removeItem('contryid')
        sessionStorage.removeItem('memberIdId')
        sessionStorage.removeItem('cart')
        sessionStorage.removeItem('UserID')
        sessionStorage.removeItem('totalPrice')   
        sessionStorage.removeItem('joiningDate')   
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('rankNameofMember');
        sessionStorage.removeItem('customerrank');
        sessionStorage.removeItem('userLoginstate');
        sessionStorage.removeItem('refUserID');
        
        window.location.href = '/';
    };
    

    const handleClickOutside = (event: any) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            closeSidebar();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const { balanceData } = useSelector((state: RootState) => state.balance);

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    return (
        <>
            <div className="">
                <div className="flex gap-5">
                <button id="toggleButton" onClick={toggleSidebar} className="text-white">
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M5 7h14M5 12h14M5 17h14"
                        />
                    </svg>
                </button>
                <img src="images/logo-white.png" alt="" className="w-full max-w-[150px] h-6 object-contain" />
                </div>

                <div className="">
                    <div
                        ref={sidebarRef}
                        id="sidebar"
                        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl text-white z-[99] ${sidebarVisible ? '' : 'hidden'}`}
                    >
                        <div className="flex items-center justify-between py-2.5 px-4">
                            <div>
                            <div className="flex gap-[3px]">
                            <h5 className="text-xs text-black font-medium">
                                {userFromLocalStorage.f_name || loginState?.f_name}
                            </h5>
                          
                            </div>
                            <h5 className="text-xs text-black font-medium mt-2">
                            Associate ID:  {userFromLocalStorage.userid || loginState?.userid}
                            </h5>
                            </div>

                            <button id="closeButton" onClick={closeSidebar} className="text-danger-color">
                                <svg
                                    className="w-7 h-7"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-[#178285] p-5 flex flex-col gap-5 sm:gap-7">
                        {balanceData && (
                        <>
                            <div className="text-black">
                                <h6 className="text-xs font-medium text-white">Purchase Point - PP</h6>
                                <h4 className="text-sm sm:text-3xl font-semibold mt-1 text-white">
                                  USD {balanceData.available_pp.toFixed(2)}
                                </h4>
                            </div>
                            <div className="text-black">
                                <h6 className="text-xs font-medium text-white">Loyalty Point - LP</h6>
                                <h4 className="text-sm sm:text-3xl font-semibold mt-1 text-white">
                                  USD {balanceData.available_lp.toFixed(2)}
                                </h4>
                            </div>

                            <div className="text-black">
                                <h6 className="text-xs font-medium text-white">Old Purchase Point - O PP</h6>
                                <h4 className="text-sm sm:text-3xl font-semibold mt-1 text-white">
                                  USD {balanceData.available_pp2.toFixed(2)}
                                </h4>
                            </div>
                            <div className="text-black">
                                <h6 className="text-xs font-medium text-white">Reward Point - RP</h6>
                                <h4 className="text-sm sm:text-3xl font-semibold mt-1 text-white">
                                  USD {balanceData.available_sp.toFixed(2)}
                                </h4>
                            </div>
                        </>
                    )}
                        </div>

                        <button
                            className="p-7 pr-3 text-custom-text-color text-sm font-normal flex items-center justify-between w-full"
                            onClick={() => handleLogout()}>
                            <div className="flex items-center justify-between gap-5">
                                <svg
                                    className="w-6 h-6 text-danger-color"
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
                                        d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                                    />
                                </svg>
                                Logout
                            </div>
                            <svg
                                className="w-4 h-4 text-custom-text-color3"
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
                        </button>
                    </div>

                    <div
                        id="overlay"
                        className={`${sidebarVisible ? 'block' : 'hidden'}  fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10`}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default DashboardSidebar;

