import React from "react";
import Layout from "../../../Components/Layout";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

const Share = () => {

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

                <section className="h-screen flex items-center justify-center">
                    {/* <div className="container"> */}
                        <div className="max-w-lg sm:mx-auto w-full mx-3">
                        <ul className="flex flex-col gap-7 bg-white rounded-2xl px-6 py-6 ">
                            <li className="mx-auto">
                                <div style={{height: "auto", margin: "0 auto", maxWidth: 400, width: "100%"}} >
                                    <QRCode
                                        size={200}
                                        style={{height: "auto", maxWidth: "200", width: "100%"}}
                                        value={'hello'}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                            </li>
                            <li className="flex flex-col gap-4">
                                <button className="bg-[#148585] py-2 rounded-lg w-full text-sm text-white">
                                    Copy
                                </button>
                                <button className="bg-[#148585] py-2 rounded-lg w-full text-sm text-white">
                                    Download
                                </button>
                            </li>
                        </ul>
                        </div>
                    {/* </div> */}
                </section>

            </Layout>
        </>
    );
}

export default Share;