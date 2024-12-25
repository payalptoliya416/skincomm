import React, { ChangeEvent, FormEvent , useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchSecurityPassword } from "../../../Redux/thunks/securityPassThunk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../../../Redux/store";
import { fetchSecurityBoolean } from "../../../Redux/thunks/SecurityBooleanThunk";

interface FormData {
  old_password: any;
  new_password: any;
}

const SecondaryPassword = () => {
    const { securityBoolean } = useSelector((state: RootState) => state.securityBooleanData);
    
  const dispatch = useDispatch<any>();

  useEffect(()=>{
  dispatch(fetchSecurityBoolean());
  },[])

  const [formData, setFormData] = useState<FormData>({
    old_password: "",
    new_password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validation = () => {
    const newErrors: any = {};

   
    if (!formData.old_password.length && securityBoolean?.password !== false) {
      newErrors.old_password = "Old Password must be required";
    }
    if (formData.new_password.length !== 6) {
      newErrors.new_password = "Password must be exactly 6 characters long";
    }

    if (formData.new_password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validation();

    if (Object.keys(validationErrors).length === 0) {    
        
        const response = await  dispatch(fetchSecurityPassword(formData))
        
        if(response.data){
            const numberData = response.data.data.message;
            toast(numberData);
            setFormData({
              old_password: "",
              new_password: "",
            })
            setConfirmPassword('');
        }else{
        toast.error(response.error.response.data.error);
      }
    } else {
      setErrors(validationErrors);
      toast.error('Unauthorized');
    }
  };
  const navigate = useNavigate();
  const handleOptGet = ()=>{
    navigate('/email_otp_verification');
  }
 
  return (
    <>
      <Layout>
        <>
        <ToastContainer />
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
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
              <h3 className="text-lg font-medium">Security Password</h3>
            </div>
          </div>
        </header>
         <section className="py-20">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <ul className="flex flex-col gap-7 bg-white rounded-lg px-4 py-6">
                    {securityBoolean?.password !== false && (
                <li className="">
                  <p className="text-xs font-normal text-custom-text-color mb-1">
                    Old Security Password
                  </p>
                  <input
                    type="password"
                    name="old_password"
                    value={formData.old_password}
                    onChange={handleChange}
                    className="border-b border-custom-border focus:border-main-color w-full text-xs font-normal text-custom-text-color py-1 focus:outline-none"
                  />
                {errors.old_password && (
                  <span className="text-xs text-red-500">{errors.old_password}</span>
                )}
                </li>
               )} 

              <li className="">
                <p className="text-xs font-normal text-custom-text-color mb-1">
                  Security Password
                </p>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="border-b border-custom-border focus:border-main-color w-full text-xs font-normal text-custom-text-color py-1 focus:outline-none"
                />
                {errors.new_password && (
                  <span className="text-xs text-red-500">{errors.new_password}</span>
                )}
              </li>

              <li className="">
                <p className="text-xs font-normal text-custom-text-color mb-1">
                  Confirm Password
                </p>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="border-b border-custom-border focus:border-main-color w-full text-xs font-normal text-custom-text-color py-1 focus:outline-none"
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500">{errors.confirmPassword}</span>
                )}
              </li>

              <li>
                <button
                  type="submit"
                  className="bg-[#148585] px-7 py-2 rounded-lg text-sm text-white me-2"
                >
                  Update
                </button>
                <button className="bg-[#148585]  px-7 py-2 rounded-lg mt-3 text-sm text-white" onClick={handleOptGet}>
                  Reset Security Password
                </button>
              </li>
            </ul>
          </form>
        </div>
         </section>
         </>
      </Layout>
    </>
  );
};

export default SecondaryPassword;
