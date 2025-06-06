import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../Components/Auth/LanguageSwitcher";
import { RiFileTransferLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { BsCameraVideo } from "react-icons/bs";

const Setting = () => {
  const [joinDate, setJoinDate] = useState<string>("");
  const [expiredTime, setExpiredTime] = useState<boolean>(false);
  const checkExpiration = (joinDate: string) => {
    const joinDateObj = new Date(joinDate);
    const ninetiethDayObj = new Date(joinDateObj);
    ninetiethDayObj.setDate(joinDateObj.getDate() + 90);

    const now = new Date();
    const difference = ninetiethDayObj.getTime() - now.getTime();

    if (difference <= 0) {
      setExpiredTime(true);
    } else {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = ninetiethDayObj.getTime() - now.getTime();

        if (difference <= 0) {
          setExpiredTime(true);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  };
  const [customerRankID, setCustomerRankID] = useState<any>(null);

  useEffect(() => {
    const BizPathdata = sessionStorage.getItem("user");
    if (BizPathdata) {
      const parsedData = JSON.parse(BizPathdata);
      setJoinDate(parsedData.join_date);
      setCustomerRankID(parsedData.rank);
    }
  }, []);

  useEffect(() => {
    if (joinDate) {
      checkExpiration(joinDate);
    }
  }, [joinDate]);

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
              <h3 className="text-lg font-medium">Settings</h3>
            </div>
          </div>
        </header>
        <section className="py-20">
          <div className="container">
            <ul className="flex flex-col gap-5 sm:gap-7 bg-white rounded-lg py-8 px-4 sm:px-8">
              <li>
                <Link
                  to={"/profile"}
                  className="flex items-start w-full text-custom-text-color font-normal text-xs"
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
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>My Account</span>
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
              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to="/addbankpage"
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Bank Account</span>
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
              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to="/withdrawal"
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
                >
                  <div className="-mt-1 w-14">
                    <img src="images/Frame.svg" alt="" />
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span> Withdrawal</span>
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

              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to="/transfer"
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
                >
                  <div className="-mt-1 w-14">
                    <RiFileTransferLine className="w-[24px] h-[24px] text-custom-text-color2" />
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Transfer</span>
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
              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to="/convert"
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
                >
                  <div className="-mt-1 w-14">
                    {/* <img src="images/Frame.svg" alt="" /> */}
                    <SiConvertio className="w-[20px] h-[20px] text-custom-text-color2 mt-1" />
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Convert</span>
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
             
              {joinDate && (
                <>
                  {expiredTime ? (
                    <li>
                      <Link
                        to="/jumpstart"
                        className="flex items-start w-full text-custom-text-color font-normal text-xs"
                      >
                        <div className="-mt-1 w-14">
                          <RiFileTransferLine className="w-[24px] h-[24px] text-custom-text-color2" />
                        </div>
                        <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                          <span>JumpStart</span>
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
                  ) : (
                    <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                      <Link
                        to="/uprank"
                        className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                          customerRankID === "1" ? "pointer-events-none" : ""
                        }`}
                      >
                        <div className="-mt-1 w-14">
                          <RiFileTransferLine className="w-[24px] h-[24px] text-custom-text-color2" />
                        </div>
                        <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                          <span>Uprank</span>
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
                  )}
                </>
              )}
              <li>
                <Link
                  to="/primary_password"
                  className="flex items-start w-full text-custom-text-color font-normal text-xs"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Login Password</span>
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
                  to="/security_password"
                  className="flex items-start w-full text-custom-text-color font-normal text-xs"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Security Password</span>

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
                  to="/matrix-side"
                  className="flex items-start w-full text-custom-text-color font-normal text-xs"
                >
                  <div className="-mt-1 w-14">
                    <PiArrowsLeftRightBold className="w-[24px] h-[24px] text-custom-text-color2" />
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Placement Setting</span>

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
              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to={`/share`}
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>Share</span>
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

              <li className={`${customerRankID === "1" ? "hidden" : ""}`}>
                <Link
                  to="https://linktr.ee/skincomm.library"
                  target="_blank"
                  className={`flex items-start w-full text-custom-text-color font-normal text-xs ${
                    customerRankID === "1" ? "pointer-events-none" : " "
                  }`}
                >
                  <div className="-mt-1 w-14">
                    <BsCameraVideo className="w-[24px] h-[24px] text-custom-text-color2" />
                  </div>
                  <div className="w-full flex items-center justify-between pb-3 sm:pb-5 pr-2 border-b border-custom-border">
                    <span>e-Library</span>
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

              <LanguageSwitcher />
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Setting;
