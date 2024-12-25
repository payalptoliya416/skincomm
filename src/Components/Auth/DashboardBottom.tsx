import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchBDashboardDetail } from "../../Redux/thunks/DashoboardDetailThunk";

const DashboardBottom = () => {
  const dispatch = useDispatch<any>();
  const { DashboardDetail } = useSelector(
    (state: RootState) => state.dashboardDetail
  );
  const [activeTab, setActiveTab] = useState("overview"); 
  const [bizData , setBizData] = useState<any>('');

  useEffect(() => {
    const BizPathdata = localStorage.getItem("user");
    if (BizPathdata) {
      const parsedData = JSON.parse(BizPathdata);
      setBizData(parsedData);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBDashboardDetail());
  }, []);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);

  const formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  function formatDatee(apiDate: string | null | undefined): string {
    if (!apiDate) return "N/A";
    const date = new Date(apiDate);
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }
  
  return (
    <>
      <section className="mt-5 mb-20">
        <div className="container">
          <div className="bg-white shadow-custom-shadow p-2 sm:p-5 rounded-lg">
          <div className="flex items-center justify-between text-center">
        <h4
          className={`text-xs sm:text-sm font-medium pb-2 w-[48%] cursor-pointer ${
            activeTab === "overview"
              ? "text-warning-color border-b-2 border-warning-color"
              : "text-custom-text-color"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          My Account Overview
        </h4>
        <h4
          className={`text-xs sm:text-sm font-medium pb-2 w-[48%] cursor-pointer ${
            activeTab === "bizpath"
              ? "text-warning-color border-b-2 border-warning-color"
              : "text-custom-text-color"
          }`}
          onClick={() => setActiveTab("bizpath")}
        >
          My Biz Path
        </h4>
      </div>

      <div className="mt-5">
        {activeTab === "overview" && (
          <>
            <h5 className="text-xs sm:text-base font-medium text-custom-text-color text-center">
              Current Month {formatDate(startDate)} - Ending {formatDate(endDate)}
            </h5>

            {DashboardDetail ? (
              <div className="p-4 mb-4 text-center">
                <p className="text-sm md:text-lg mb-1 font-semibold">Accumulated LP</p>
                <p className="text-sm mb-4">
                  {DashboardDetail.accu_left_node} | {DashboardDetail.accu_right_node}
                </p>
                <p className="text-sm md:text-lg mb-1 font-semibold">Today Sales</p>
                <p className="text-sm mb-4">
                  {DashboardDetail.addition_left_node} | {DashboardDetail.addition_right_node}
                </p>
                <p className="text-sm md:text-lg mb-1 font-semibold">Today Matching</p>
                <p className="text-sm mb-4">
                  {DashboardDetail.deduction_left_node} | {DashboardDetail.deduction_right_node}
                </p>
                <p className="text-sm md:text-lg mb-1 font-semibold">Today Balance</p>
                <p className="text-sm mb-4">
                  {DashboardDetail.bleft_node} | {DashboardDetail.bright_node}
                </p>
                <p className="text-sm md:text-lg mb-1 font-semibold">
                  Left Sponsored Associates:{" "}
                  <span className="text-sm mb-4">{DashboardDetail.left_side_sponsored}</span>
                </p>
                <p className="text-sm md:text-lg mb-1 font-semibold">
                  Right Sponsored Associates:{" "}
                  <span className="text-sm mb-4">{DashboardDetail.right_side_sponsored}</span>
                </p>
              </div>
            ) : (
              <p className="text-center text-sm font-semibold">No Data Available</p>
            )}
          </>
        )}

        {activeTab === "bizpath" && (
          <div className="mt-5">
            <div className="flex justify-center flex-col items-center py-10">
            <p className="text-sm md:text-lg mb-3 font-semibold flex items-center sm:gap-2 sm:flex-row flex-col">Maintenance Expiry Date: <span className="text-sm font-normal">  {bizData?.expiery_date ? formatDatee(bizData.expiery_date) : "N/A"} </span></p>
            <p className="text-sm md:text-lg mb-3 font-semibold flex items-center sm:gap-2 sm:flex-row flex-col">Status: <span className="text-sm  font-normal">{bizData.account_status}</span></p>
                         
            </div>
          </div>
        )}
      </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardBottom;
