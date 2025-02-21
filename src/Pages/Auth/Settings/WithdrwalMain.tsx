import React from "react";
import Layout from "../../../Components/Layout";
import { Link } from "react-router-dom";
import { PiHandCoins } from "react-icons/pi"; // Example alternative

function WithdrwalMain() {
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
              <h3 className="text-lg font-medium">Withdrawal</h3>
            </div>
          </div>
        </header>
        <section className="py-20">
          <div className="container">
            <ul className="flex flex-col gap-3 rounded-md  pr-0">
              <li>
                <Link
                  to="/withdrawal-add"
                  className={`flex items-start p-3 sm:p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white `}
                >
                  <div className="-mt-1 w-14">
                   <PiHandCoins/>
                  </div>
                  <div className="w-full flex items-center justify-between pr-2">
                    <span>Withdrawal Add</span>
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
              <li>
                <Link
                  to="/withdrawal-request"
                  className={`flex items-start p-3 sm:p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white `}
                >
                  <div className="-mt-1 w-14">
                    <img src="images/Frame.svg" alt="" />
                  </div>
                  <div className="w-full flex items-center justify-between pr-2">
                    <span>Withdrawal Request</span>
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

export default WithdrwalMain;
