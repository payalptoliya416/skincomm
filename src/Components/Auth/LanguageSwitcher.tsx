import React, { useState, useEffect, useRef } from "react";

const LanguageSwitcher = () => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        setSidebarVisible(!sidebarVisible);
    };

    const closeLanguageBar = () => {
        setSidebarVisible(false);
    };

    const handleClickOutside = (event: any) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            closeLanguageBar();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <li>
                <button onClick={toggleSidebar} id="toggleUser" className="flex items-start w-full text-custom-text-color font-normal text-xs">
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                            />
                        </svg>
                    </div>
                    <div className="w-full flex items-center justify-between pr-2">
                        <span>Select Language</span>
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
                </button>

                <div className="">
                    <div ref={sidebarRef} id="sidebarBottom" className={`${sidebarVisible ? '' : 'hidden'} fixed bottom-0 left-0 min-h-40 w-full bg-white shadow-xl text-white z-[99]`}>
                        <button id="closeButtonUser" className="text-danger-color hidden"></button>

                        <div className="">
                            <h3 className="text-base font-medium text-center text-custom-text-color border-b border-custom-border p-3 mb-3">
                                Select Language
                            </h3>

                            <ul className="mt-5 flex flex-col gap-4 m-5 p-5 shadow-lg rounded-lg">
                                <li className="border-b border-custom-border pb-3 flex items-center justify-between">
                                    <span className="text-main-color text-xs font-normal">
                                        English
                                    </span>
                                    <svg
                                        className="w-3 h-3 text-custom-text-color"
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
                                </li>

                                <li className="flex items-center justify-between">
                                    <span className="text-main-color text-xs font-normal">
                                        简体中文
                                    </span>
                                    <svg
                                        className="w-3 h-3 text-custom-text-color"
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
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="overlayUser" className={`${sidebarVisible ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10`}></div>
                </div>
            </li>
        </>
    );
}

export default LanguageSwitcher;