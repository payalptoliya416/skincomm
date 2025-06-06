import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { toast, ToastContainer } from "react-toastify";
import { fetchMemberLine } from "../../../Redux/thunks/MemberLineThunk";
import { fetchAddTransfer } from "../../../Redux/thunks/AddTransferThunk";
import { fetchBalance } from "../../../Redux/thunks/balanceThunks";

interface FormData {
  to_user: string;
  amount: string;
  currency: string;
  security_password: string
}
function TransferFunction() {
  const dispatch = useDispatch<any>();

  const { balanceData  } = useSelector((state: RootState) => state.balance);
  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const [formData, setFormData] = useState<FormData>({
    to_user: "",
    amount: "",
    currency: "",
    security_password:""
  });
  const [errors, setErrors] = useState<any>({});
const [fName ,setFName] = useState<any>("");

const validateForm = () => {
  const newErrors: any = {};

  if (!formData.to_user) {
    newErrors.to_user = "User ID is required";
  }
  if (!formData.security_password && balanceData?.transferVal === true) {
    newErrors.security_password = "Security Password is required when transfer is enabled.";
  }  

  if (!formData.amount) {
    newErrors.amount = "Amount is required";
  } else if (isNaN(parseFloat(formData.amount))) {
    newErrors.amount = "Amount must be a valid number";
  } else {
    let availableBalance = 0;
    switch (formData.currency) {
      case "CC":
        availableBalance = balanceData?.available_lp || 0;
        break;
      case "RC":
        availableBalance = balanceData?.available_pp || 0;
        break;
      default:
        availableBalance = 0;
    }

    if (parseFloat(formData.amount) > availableBalance) {
      newErrors.amount = `Transfer amount exceeds the available balance of ${availableBalance}`;
    }
  }

  if (!formData.currency) {
    newErrors.currency = "Please select a currency";
  }

  return newErrors;
};

const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  if (name === "to_user") {
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));

    if (value) {
      try {
        const memberlineID = await dispatch(fetchMemberLine(value));
        setFName(memberlineID.data); 
      } catch (error) {
        console.error("Error fetching member line:", error);
      }
    }
  } else if (name === "amount") {
    const sanitizedValue = value.replace(/[^0-9.]/g, ""); 
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  } else{
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if (fName.error) {
        toast.error(fName.message);
        return; 
      }
    } catch (error) {
      toast.error("An error occurred while validating userId.");
      return;
    }
    try {
     const successTransfer = await dispatch(fetchAddTransfer(formData));
     if (successTransfer?.data?.error) {
      toast.error(successTransfer.data.message);
    } else if (successTransfer?.data?.success) {
      toast.success(successTransfer.data.message);
      await dispatch(fetchBalance());
    
      setFormData({
        to_user: "",
        amount: "",
        currency: "",
        security_password: ""
      });
      setFName("");
    }
    
    } catch (error) {
      console.error("Error Transfer details:", error);
      toast.error("An error occurred during the transfer.");
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
              <h3 className="text-lg font-medium">Transfer</h3>
            </div>
          </div>
        </header>
        <ToastContainer />
        <section className="py-20">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <h5 className="text-base text-custom-text-color font-medium mb-5">
               
                {balanceData && (
                  <>
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <h3 className="text-sm sm:text-base font-semibold text-black">LP : <span className="font-normal "> ${(+balanceData.available_lp || 0).toFixed(2)}</span></h3>
                  <h3 className="text-sm sm:text-base font-semibold text-black">PP : <span className="font-normal ">${(+balanceData.available_pp || 0).toFixed(2)}</span> </h3>
                  </div>
                  </>
                )}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Associate ID</label>
                  <input
                    type="text"
                    name="to_user"
                    placeholder="Associate ID"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.to_user}
                    onChange={handleChange}
                  />
                  <p className="text-[#1e293b] text-[14px] mt-1">{fName && fName ? fName.f_name : ""}</p>
                  <p  className="text-red-500 text-xs">{fName && fName.error ? fName.message : ""}</p>
                  {errors.to_user && (
                    <p className="text-red-500 text-xs">{errors.to_user}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Select Currency
                  </label>
                  <select
                    name="currency"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="">Select Currency</option>
                    <option value="CC">LP</option>
                    <option value="RC">PP</option>
                  </select>
                  {errors.currency && (
                    <p className="text-red-500 text-xs">{errors.currency}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Amount</label>
                  <input
                    type="text"
                    name="amount"
                     step="0.01"
                    placeholder="Amount"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs">{errors.amount}</p>
                  )}
                </div>
                {balanceData?.transferVal === true &&(<div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">Security Password</label>
                    <input
                      type="password"
                      name="security_password"
                      step="0.01"
                      placeholder="Security Password"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                      value={formData.security_password}
                      onChange={handleChange}
                    />
                    {errors.security_password && (
                      <p className="text-red-500 text-xs">{errors.security_password}</p>
                    )}
                  </div>)}
                <div>
                  <button
                    type="submit"
                    className={`py-2 px-3 rounded-md text-sm  bg-[#178285] text-white`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default TransferFunction;
