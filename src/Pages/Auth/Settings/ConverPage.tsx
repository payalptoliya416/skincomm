import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchLpBalance } from '../../../Redux/thunks/getLpBalancethunk';
import { fetchConvertDetail } from '../../../Redux/thunks/ConvertThunk';
import { toast, ToastContainer } from 'react-toastify';

interface FormData{
    amount : number,
    security_password: string
}
function ConverPage() {
    const dispatch = useDispatch<any>();
    const { getLPBalanceDetail } = useSelector((state: RootState) => state.lpbalance);
    useEffect(() => {
        dispatch(fetchLpBalance());
      }, [dispatch]);
    
      const [errors, setErrors] = useState<any>({});
      const [formData, setFormData] = useState<FormData>({
        amount: 0,
        security_password:""
       });
       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: parseFloat(e.target.value),
        });
      };
       const availableLp = getLPBalanceDetail.available_lp;
      const validation = () => {
        
        const newErrors: any = {};
        if(!formData.amount){
          newErrors.amount = "write some Convert  Amount";
        }
        if (formData.amount > availableLp) {
          newErrors.amount = `Convert amount exceeds the available balance of ${availableLp}`;
        }
        if(!formData.security_password && getLPBalanceDetail?.withdrawalVal === true){
          newErrors.security_password = `Security Password is required when transfer is enabled.`;
        }
        
        return newErrors;
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validation();
      
        if (Object.keys(validationErrors).length === 0) {
        const resData = await  dispatch(fetchConvertDetail(formData));
        if (resData?.data?.success) {
          const message = resData?.data?.message || 'Success';
          toast.success(message);
          window.location.reload();
      } else if (resData?.data?.error) {
          const message = resData?.data?.message || 'Something went wrong';
          toast.error(message);
      } else if (resData?.error) {
          const message = resData?.message || 'Request failed';
          toast.error(message);
      }
      } else {
        setErrors(validationErrors)
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
              <h3 className="text-lg font-medium">Convert</h3>
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
                    Convert to PP amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                      value={formData.amount}
                      onChange={handleInputChange}
                    />
                     {errors.amount && <p className='text-red-500 text-xs'>{errors.amount}</p>}
                  </div>
                  {getLPBalanceDetail?.convertVal === true && (
                  <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">Security Password</label>
                    <input
                      type="text"
                      name="security_password"
                      step="0.01"
                      placeholder="Security Password"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                      value={formData.security_password}
                      onChange={handleInputChange}
                    />
                    {errors.security_password && (
                      <p className="text-red-500 text-xs">{errors.security_password}</p>
                    )}
                  </div>
                )}
                  <div>
                    <button
                      type="submit"
                      className="py-2 px-3 rounded-md bg-[#178285] text-white text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              </div>
              </div>
              </section>
        </Layout>
    </>
  )
}

export default ConverPage
