import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { fetchBankList } from "../../../Redux/thunks/bankListThunk";
import { fetchBankData } from "../../../Redux/thunks/AddBankThunk";
import { useLocation } from "react-router-dom";

  interface FormData {
    id: number;
    userid: string | null;
    bank_id: string;
    bank_acount_no: string;
    tncaggree : string,
    account_name: string
  }

interface Product {
  id: number;
  bank_name: string;
  country_id: number;
}

const AddBankForm = () => {
  const { bankList } = useSelector((state: RootState) => state.bankListData);    

  const loginuserId = localStorage.getItem("loginUserId");
  const [isChecked, setIsChecked] = useState<boolean>(false);
 
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchBankList());
  }, [dispatch]);

  const location = useLocation();
const bankData = location.state?.bankData || '';

const [formData, setFormData] = useState<FormData>({
  id: bankData?.id || 0,
  account_name: bankData.account_name || "",
  userid: loginuserId,
  bank_id: bankData?.bank_id || "",
  bank_acount_no: bankData?.bank_acount_no || "",
  tncaggree: ''
}); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "bank_acount_no" && !/^\d*$/.test(value)) {
      return; 
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? '1' : '0'; 
    setFormData({ ...formData, tncaggree: value }); 
    setIsChecked(!isChecked)
  };
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.account_name) newErrors.account_name = "Account Name is required";
    if (!formData.bank_acount_no) newErrors.bank_acount_no = "Aank Acount No. is required";
    if (!formData.bank_id) newErrors.bank_id = "Please Select Any one Bank";
    return newErrors;
  };

const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(fetchBankData(formData));       
        await dispatch(fetchBankList()); 
        
        navigate('/addbankpage'); 
      } catch (error) {
        console.error("Error updating bank details:", error);
      }
    } else {
      setErrors(validationErrors);
    }
    
  };
  
  return (
    <>
      <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
          <div className="container">
            <div className="relative">
              <Link to="/addbankpage" className="absolute left-0">
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
              <h3 className="text-lg font-medium">Add BankDetails</h3>
            </div>
          </div>
        </header>
        <section className="py-20">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Bank Account Full Name</label>
                  <input
                    type="text"
                    name="account_name"
                    placeholder="Bank Account Name."
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.account_name}
                    onChange={handleChange} 
                  />
                  {errors.account_name && <p className="text-red-500 text-xs">{errors.account_name}</p>}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Select Bank</label>
                  <select
                    name="bank_id"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.bank_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Bank</option>
                    {bankList.map((product: Product) => (
                      <option key={product.id} value={product.id.toString()}>
                        {product.bank_name}
                      </option>
                    ))}
                  </select>
                  {errors.bank_id && <p className="text-red-500 text-xs">{errors.bank_id}</p>}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Bank Account No.</label>
                  <input
                    type="text"
                    name="bank_acount_no"
                    placeholder="Bank Account No"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.bank_acount_no}
                    onChange={handleChange}
                  />
                    {errors.bank_acount_no && <p className="text-red-500 text-xs">{errors.bank_acount_no}</p>}
                </div>
                <div className="mb-3">
                  <div className="flex items-start">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      onChange={handleCheckboxChange}
                      value={formData.tncaggree}
                    />
                    <label htmlFor="checked-checkbox" className={`ms-2 text-sm font-light  ${isChecked ? "text-black":" text-red-500"}`}>
                    Please tick to accept Associate <a 
                    href="https://staging.acp.sgcoders.net/assets/aggreement/aggreement_tnc.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Agreement / T&Cs
                  </a>
                    </label>
                  </div>
                </div>
                <div>
                    <button
                      type="submit"
                      className={`py-2 px-3 rounded-md text-sm ${
                        isChecked ? 'bg-[#178285] text-white' : 'bg-gray-300 text-black cursor-not-allowed'
                      }`}
                      disabled={!isChecked}
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
};

export default AddBankForm;
