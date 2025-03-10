import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { fetchLpBalance } from "../../../Redux/thunks/getLpBalancethunk";
import { fetchWithDrawallData } from "../../../Redux/thunks/widthdrawalThunk";
import { toast, ToastContainer } from "react-toastify";

interface FormData {
  lp_amount: number;
}

function Withdrawal() {
  const dispatch = useDispatch<any>();
  const { getLPBalanceDetail } = useSelector(
    (state: RootState) => state.lpbalance
  );
  
  const [calculatedRate, setCalculatedRate] = useState<string | number>("");
  const [formData, setFormData] = useState<FormData>({
     lp_amount: 0,
    });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    dispatch(fetchLpBalance());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "lp_amount") {
      const amount = parseFloat(value);
      const updatedFormData = {
        ...formData,
        lp_amount: amount,
      };
  
      setFormData(updatedFormData);
  
      const rate = amount * (parseFloat(getLPBalanceDetail.withdrawal_rate) || 0);
      setCalculatedRate(rate.toFixed(2));
  
      const validationErrors = validation(updatedFormData);
      setErrors(validationErrors);
    }
  };
  const lpminimumvalue = getLPBalanceDetail.min_limit
  const availableLp = getLPBalanceDetail.available_lp

  const validation = (updatedFormData = formData) => {
    const newErrors: any = {};
  
    if (!updatedFormData.lp_amount) {
      newErrors.lp_amount = "Write some Withdrawal Amount";
    }
    if (updatedFormData.lp_amount < lpminimumvalue) {
      newErrors.lp_amount = `Withdrawal amount should be greater than the minimum limit of ${lpminimumvalue}`;
    }
    if (updatedFormData.lp_amount > availableLp) {
      newErrors.lp_amount = `Withdrawal amount exceeds the available balance of ${availableLp}`;
    }
  
    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validation();
  
    if (Object.keys(validationErrors).length === 0) {
      setIsConfirmationOpen(true);
    } else {
      setErrors(validationErrors);
    }
  };
  
  const isButtonDisabled = Object.keys(errors).length > 0;

  const handleConfirmSubmit = async () => {
    try {
      const data = await dispatch(fetchWithDrawallData(formData));
  
      if (data.success) {
        toast.success(data.message);
        setFormData({ lp_amount: 0 });
      } else if (data.Error) {
        toast.error(data.Message);
      }
      setIsConfirmationOpen(false);
      
    } catch (error) {
      console.error("Error submitting withdrawal:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <>
      <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
          <div className="container">
            <div className="relative">
              <Link to="/withdrawal" className="absolute left-0">
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
              <h3 className="text-lg font-medium">Withdrawal Add</h3>
            </div>
          </div>
        </header>
        <ToastContainer/>
        <section className="py-20">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <h5 className="text-base text-custom-text-color font-medium">
                Loyalty Point - LP :{" "}
                {getLPBalanceDetail && (
                  <span>${getLPBalanceDetail.available_lp}</span>
                )}
              </h5>

              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">
                    Withdrawal Rate
                    </label>
                    <input
                      type="number"
                      name=""
                      placeholder="Amount"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-200"
                      value={getLPBalanceDetail.withdrawal_rate}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">
                      Withdrawal Amount
                    </label>
                    <input
                      type="number"
                      name="lp_amount"
                      placeholder="Amount"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                      value={formData.lp_amount}
                      onChange={handleInputChange}
                    />
                     {errors.lp_amount && <p className='text-red-500 text-xs'>{errors.lp_amount}</p>}
                  </div>
                <div className="mb-3">
                  {
                     calculatedRate === 'NaN' ? " ": calculatedRate
                  }
                </div>
                  <div>
                  <button
                  type="submit"
                  className={`py-2 px-3 rounded-md text-white text-sm ${
                    isButtonDisabled ? "bg-gray-400 cursor-not-allowed pointer-events-none" : "bg-[#178285]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Submit
                </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Confirmation Popup */}
        {isConfirmationOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            <div className="fixed inset-0 z-20 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-lg max-w-[500px] w-full">
                <h3 className="mb-7 text-lg font-bold text-center">Confirm Submission</h3>
                <h3 className="mb-3 text-sm font-semibold">Member Name: {getLPBalanceDetail.member_name}</h3>
                <h3 className="mb-3 text-sm font-semibold">Available Lp : ${getLPBalanceDetail.available_lp}</h3>
                <p className="mb-7">Are you sure you want to withdraw {formData.lp_amount} LP?</p>
                <div className="flex justify-end">
                  <button
                    className="py-2 px-4 mr-2 rounded-md bg-gray-300"
                    onClick={() => setIsConfirmationOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-2 px-4 rounded-md bg-[#178285] text-white"
                    onClick={handleConfirmSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}

export default Withdrawal;
