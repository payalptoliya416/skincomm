import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchSubAccounData } from "../../Redux/thunks/subAcoThunks";
import { fetchSubAccounLoginData } from "../../Redux/thunks/SubAccountLoginThunk";
import { Link } from "react-router-dom";

interface SunAccount {
    f_name : string
    userid : string
} 
const DashboardRightBar = () => {

    const [overlayVisible, setOverlayVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleUserSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOverlayVisible(!overlayVisible);
    };

    const closeUserSidebar = () => {
        setOverlayVisible(false);
    };

    const handleClickOutside = (event: any) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            closeUserSidebar();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const { SubAccountData } = useSelector((state: RootState) => state.subaccountData);
    const { SubAccountLoginData } = useSelector((state: RootState) => state.SubAccountLogin);

        const dispatch = useDispatch<any>();
        useEffect(() => {
            dispatch(fetchSubAccounData());
        }, [dispatch]);
        
        useEffect(() => {
            if (SubAccountLoginData && SubAccountLoginData.data?.token) {
                sessionStorage.removeItem("token");
    
                sessionStorage.setItem("token", SubAccountLoginData.data.token);
    
                window.location.href = '/';
            }
        }, [SubAccountLoginData]);

        const handleLogin = async (userid : string)=>{
             dispatch(fetchSubAccounLoginData(userid));
        }

    return (
        <>
            <div className="flex items-start gap-4">
            <div className="text-white">
                    <svg
                        className="w-7 h-7"
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
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                        />
                    </svg>
                </div>
               
                <Link to='/announcement' className="text-white">
                    <svg
                        className="w-7 h-7"
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
                            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                        />
                    </svg>
                    </Link>

                {/* <div className="text-white">
                    <div className="">
                        <button id="toggleUser" onClick={toggleUserSidebar} className="text-white">
                            <svg
                                className="w-7 h-7"
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
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </button>

                        <div className="">
                            <div ref={sidebarRef} id="sidebarBottom"
                                 className={`fixed bottom-0 left-0 min-h-40 w-full bg-white shadow-xl text-white z-[99] ${overlayVisible ? '' : 'hidden'}`}>
                                <button
                                    id="closeButtonUser" onClick={closeUserSidebar}
                                    className="text-danger-color hidden"
                                ></button>
                                <div className="">
                                    <h3 className="text-base font-medium text-center text-custom-text-color border-b border-custom-border p-3 mb-3">
                                        Switch Account
                                    </h3>
                                    <ul className="mt-5 flex flex-col gap-2.5 px-5 pb-5">
                                        { SubAccountData  ? (
                                           SubAccountData.map((item : SunAccount, index : number)=>{ return(
                                          <>
                                            <li onClick={()=>handleLogin(item.userid)} key={index}
                                            className="cursor-pointer flex items-center gap-5 text-custom-text-color2 text-sm font-normal" >
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
                                                    strokeWidth="2"
                                                    d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                            <span>{item.f_name}</span>
                                            </li>
                                                </>
                                          )})
                                            ) : "not any account found"
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div id="overlayUser"
                                 className={`${overlayVisible ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10`}></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default DashboardRightBar;