import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../Redux/thunks/ProfileThunk";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../../../Redux/store";
import { fetchProfileGet } from "../../../Redux/thunks/ProfileGetThunk";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormData {
    id:string | null,
    f_name: string;
    l_name: string;
    email: string;
    mobile: string;
    dob: string; 
    address: string;
    zip: string;
    joinDate: string; 
  }

const Profile = () => {
    const dispatch = useDispatch<any>();
    const userID = localStorage.getItem("loginUserId"); 
    const { ProfileGetData } = useSelector((state: RootState) => state.profileDataUpdated);

      useEffect(()=>{
        dispatch(fetchProfileGet());
      },[]);
      
      const [formData, setFormData] = useState<FormData>({
        id: null,
        f_name: '',
        l_name: '',
        email: '',
        mobile: '',
        dob: '',
        address: '',
        zip: '',
        joinDate: '',
      });
      
      useEffect(() => {
        if (ProfileGetData) {
          setFormData({
            id: ProfileGetData.id,
            f_name: ProfileGetData.f_name || '',
            l_name: ProfileGetData.l_name || '',
            email: ProfileGetData.email || '',
            mobile: ProfileGetData.mobile || '',
            dob: ProfileGetData.dob || '',
            address: ProfileGetData.address || '',
            zip: ProfileGetData.zip || '',
            joinDate: ProfileGetData.join_date?.split(' ')[0] || '',
          });
        }
      }, [ProfileGetData]);
const [errors, setErrors] = useState<any>({});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile ="Mobile Number is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.zip) newErrors.zip = "Postal code is required";
    return newErrors;
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const mobileWithPlus = formData.mobile 
      ? formData.mobile 
      : `+${ProfileGetData && ProfileGetData.sort_code}${formData.mobile || ''}`;  
    dispatch(fetchProfile({ ...formData, mobile: mobileWithPlus, id: userID }));
      toast.success("Form submitted successfully")
      
      localStorage.setItem('user', JSON.stringify({
        f_name: formData.f_name,
        l_name: formData.l_name,
        email: formData.email,
        mobile: formData.mobile,
        dob: formData.dob,
        address: formData.address,
        zip: formData.zip,
      }));
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
                            <h3 className="text-lg font-medium">Profile</h3>
                        </div>
                    </div>
                </header>
               <ToastContainer/>
                <section className="py-20">
                    <div className="container">
                         <div className="p-[20px] bg-white rounded-md">
                         <form onSubmit={handleSubmit}>
        <label className="text-[#1e293b] text-[14px]">Full Name</label>
        <input
          type="text"
          name="f_name"
          placeholder="Full Name"
                   className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-200"
          value={`${formData.f_name}  ${formData.l_name}`}
          readOnly
        />
        
      <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Mobile No.</label>
      <div className="relative flex ">
      <span className="bg-gray-100 px-3 py-[6px] rounded-s-md w-ma text-sm mt-2 flex justify-center items-center"> 
        <div className="flex">
        <span>+</span>
        {ProfileGetData && ProfileGetData.sort_code}
        </div>
        </span>
          <input
      type="tel"
      name="mobile"
      placeholder="Mobile No."
      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-e-md relative "
      value={formData.mobile}
      onChange={handleInputChange}
    />
                    {/* <PhoneInput
                  inputProps={{
                      name: "phone",
                      className: `border w-full py-2 rounded-lg pe-2 ps-11 ${errors.phone && 'border-red-500'}`,
                  }}
                  country={"in"} 
                  value={formData.mobile}
                  onChange={(mobile) => setFormData({ ...formData, mobile })}
              /> */}
    
    {/* <span className="absolute top-[10px] left-[2px] bg-gray-100 px-3 py-[6px] rounded-md w-ma text-sm">{ProfileGetData.sort_code}</span> */}
      </div>
        {errors.mobile && (
          <p className="text-red-500 text-xs">{errors.mobile}</p>
        )}
      </div>
      <div className="grid grid-cols-12 gap-5">
 <div className="col-span-12 sm:col-span-6">
 <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Date of Birth</label>
        <input
          type="date"
          name="dob"
          placeholder="DD/MM/YYYY"
          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
          value={formData.dob}
          onChange={handleInputChange}
        />
        {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
      </div>
 </div>
 <div className="col-span-12 sm:col-span-6">
 <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Join Date</label>
        <input
          type="text"
          name="joinDate"
          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-200"
          value={formData.joinDate}
          readOnly
        />
      </div>
 </div>
      </div>
      <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Address</label>
        <textarea
  name="address"
  placeholder="Address"
  className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
  value={formData.address}
  onChange={handleInputChange}
/>

        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
      </div>

      <div className="mb-3">
        <label className="text-[#1e293b] text-[14px]">Postal Code</label>
        <input
          type="text"
          name="zip"
          placeholder="Postal Code"
          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
          value={formData.zip}
          onChange={handleInputChange}
        />
        {errors.zip && (
          <p className="text-red-500 text-xs">{errors.zip}</p>
        )}
      </div>
     
    
      <button
        type="submit"
        className="bg-[#178285] text-white py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
                         </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Profile;