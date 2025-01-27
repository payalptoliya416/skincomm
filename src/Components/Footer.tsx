import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosAuthInstance } from "../Utilities/axios";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

const Footer = () => {
    const location = useLocation();
      
    useEffect(() => {
        AxiosAuthInstance.post(`/me`).then(response => {
            const userData = response?.data?.data;
            localStorage.setItem("user_data", JSON.stringify(userData))
        }).catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);


    return (
        <>
            <section className="bg-white fixed bottom-0 left-0 w-full border-t border-custom-border">
                <div className="container">
                    <div className="">
                        <ul className="flex items-center justify-around">
                            <li>
                                <Link to={ '/dashboard' } className={ classNames('text-center inline-block py-2', { 'text-main-color border-t-2 border-main-color': location.pathname === '/dashboard', 'text-custom-text-color': location.pathname !== '/dashboard' }) }>
                                    <svg className="w-6 h-6 m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                                    </svg>
                                    <span className={ classNames('text-xs font-normal', { 'text-custom-text-color': location.pathname !== '/dashboard' }) }> Overview </span>
                                </Link>
                            </li>
                            <li >
                                 <Link to={'/myteam'} className={ classNames('text-center inline-block py-2', { 'text-main-color border-t-2 border-main-color': location.pathname === '/myteam' || location.pathname === '/placement-tree' || location.pathname === '/sponsored-network', 'text-custom-text-color': location.pathname !== '/myteam' &&  location.pathname !== '/sponsored-network' && location.pathname !== '/placement-tree'}) }>
                                    <svg
                                        className="w-6 h-6 m-auto"
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
                                            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                        />
                                    </svg>

                                    <span className="text-xs font-normal"> My Team </span>
                                 </Link>
                            </li>
                            <li className="-mt-10">
                                <Link
                                    to="/dashboard"
                                    className="text-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#178285] text-white flex items-center justify-center py-2"
                                >
                                    <span className="text-lg sm:text-3xl font-normal"> S </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/reorder'}
                                    className={ classNames('text-center inline-block py-2', { 'text-main-color border-t-2 border-main-color': location.pathname === '/reorder', 'text-custom-text-color': location.pathname !== '/reorder' }) }
                                >
                                    <svg
                                        className="w-6 h-6 m-auto"
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

                                    <span className="text-xs font-normal"> Reorder </span>
                                </Link>
                            </li>

                            {/* Settings */}
                            <li className="">
                                <Link
                                    to={ '/settings' }
                                    className={ classNames('text-center inline-block py-2', { 'text-main-color border-t-2 border-main-color': location.pathname === '/settings' || location.pathname === '/profile'|| location.pathname === '/uprank' || location.pathname === '/primary_password' || location.pathname === '/security_password' || location.pathname === '/share'|| location.pathname === '/addbankpage' || location.pathname === '/addbankform' || location.pathname === '/withdrawal' || location.pathname === '/transfer' || location.pathname === '/convert', 'text-custom-text-color': location.pathname !== '/settings' && location.pathname !== '/profile' && location.pathname !== '/primary_password'&& location.pathname !== '/uprank'  && location.pathname !== '/security_password' && location.pathname !== '/share' && location.pathname !== '/addbankpage' && location.pathname !== '/withdrawal'  && location.pathname !== '/transfer'  && location.pathname !== '/convert'  && location.pathname === '/addbankform'
                                        }) }
                                >
                                    <svg
                                        className="w-6 h-6 m-auto"
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
                                            d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                        />
                                    </svg>

                                    <span className="text-xs font-normal">
                                      Settings
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;