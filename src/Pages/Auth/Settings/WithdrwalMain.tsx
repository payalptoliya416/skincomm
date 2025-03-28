import React, { useEffect } from "react";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { fetchGetBankData } from "../../../Redux/thunks/getBankDetailThunk";
import { toast, ToastContainer } from "react-toastify";

function WithdrwalMain() {
  const { getBankDetail ,loading} = useSelector((state: RootState) => state.getBankDetails);
  const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchGetBankData());
    }, [dispatch]);
   const navigate = useNavigate();

    const handleNavigation = () => {
      if (loading) {
        toast.info("Fetching bank details, please wait...");
        return;
      }
  
      if (!getBankDetail || getBankDetail.length === 0) {
        toast.error("Please enter bank details before proceeding.");
        return;
      }
  
      navigate("/withdrawal-add");
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
              <h3 className="text-lg font-medium">Withdrawal</h3>
            </div>
          </div>
        </header>
        <ToastContainer/>
        <section className="py-20">
          <div className="container">
            <ul className="flex flex-col gap-3 rounded-md  pr-0">
            <li>
      <button
        onClick={handleNavigation}
        className="flex items-start p-3 sm:p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white"
      >
        <div className="-mt-1 w-14">
          <MdOutlineLibraryAdd className="w-[24px] h-[24px] text-custom-text-color2" />
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
      </button>
    </li>
              <li>
                <Link
                  to="/withdrawal-request"
                  className={`flex items-start p-3 sm:p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white `}
                >
                 <div className="-mt-1 w-14">
                   <IoIosList className="w-[24px] h-[24px] text-custom-text-color2"/>
                  </div>
                  <div className="w-full flex items-center justify-between pr-2">
                    <span> Request</span>
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
