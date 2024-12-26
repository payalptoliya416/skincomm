import React, { ChangeEvent, FormEvent, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { fetchNewSecurityPass } from '../../../Redux/thunks/newSecurityPassThunk';

interface FormData {
    new_password: any;
  }

function SecurityOtpConfirm() {
  const ID = localStorage.getItem("securityMemberId");
    const [formData, setFormData] = useState<FormData>({
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
    
        if (formData.new_password.length !== 6) {
          newErrors.new_password = "Password must be exactly 6 characters long";
        }
    
        if (formData.new_password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
    
        return newErrors;
      };
    
      const dispatch = useDispatch<any>();
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validation();
        const data =  {
            memberid : ID,
            password : formData.new_password
        }
        if (Object.keys(validationErrors).length === 0) {
                const response = await  dispatch(fetchNewSecurityPass(data))
               
                if(response.data.success === true){
                setFormData({
                    new_password: "",
                })
                setConfirmPassword('');
                toast(response.data.message);
            }else{
            toast.error(response.data.message);
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
              <Link to="/email_otp_verification" className="absolute left-0">
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
              <h3 className="text-lg font-medium">Security Confirm Password</h3>
            </div>
          </div>
        </header>
        <ToastContainer/>
        <section className="py-20">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <ul className="flex flex-col gap-5 sm:gap-7 bg-white rounded-lg px-4 py-6">
          
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
                </li>
              </ul>
            </form>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default SecurityOtpConfirm
