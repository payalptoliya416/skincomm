import React, { useRef } from "react";
import Layout from "../../../Components/Layout";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import {   LIVE_URL } from "../../../Utilities/config";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const Share = () => {
        const userid = sessionStorage.getItem("UserID");
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleCopyClick = () => {
          if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value)
              .then(() => {
                toast.success("Text copied to clipboard!");
              })
              .catch((err) => {
                toast.error("Failed to copy text:", err);
              });
          }
        };

    return (
        <>
       
            <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
                    <div className="container">
                        <div className="relative">
                            <Link to="/settings" className="absolute left-0">
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
                            <h3 className="text-lg font-medium">Share</h3>
                        </div>
                    </div>
                </header>
               <ToastContainer/>
                <section className="h-screen flex items-center justify-center">
                        <div className="max-w-lg sm:mx-auto w-full mx-3">
                        <ul className="flex flex-col gap-7 bg-white rounded-2xl px-6 py-6 ">
                            {/* <li className="mx-auto">
                                <div style={{height: "auto", margin: "0 auto", maxWidth: 400, width: "100%"}} >
                                    <QRCode
                                        size={200}
                                        style={{height: "auto", maxWidth: "200", width: "100%"}}
                                        value={'hello'}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                            </li> */}
                            <li className="flex flex-col gap-4">
                            <div className="relative mt-2 w-full">
                        <input
                            type="text"
                            ref={inputRef}
                            value={`${LIVE_URL}/${userid}`}
                            className="w-full text-[14px] placeholder:text-[14px] border py-2 pr-10 pl-3 rounded-md placeholder:text-black cursor-pointer"
                            disabled
                            onClick={handleCopyClick}
                        />
                        <MdOutlineContentCopy
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={handleCopyClick}
                        />
                        </div>
                                <button className="bg-[#148585] py-2 rounded-lg w-full text-sm text-white">
                                    Download
                                </button>
                            </li>
                        </ul>
                        </div>
                </section>

            </Layout>
        </>
    );
}

export default Share;