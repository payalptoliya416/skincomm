import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { fetchSendLoginList } from '../../Redux/thunks/resetLoginOtpThunk';
import { fetchVerifyLogin } from '../../Redux/thunks/verifyLoginThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface emaildata {
    email : string
  }

function ResetLogin() {

    const [emailError , setEmailError] = useState<any>({});
const [email , setEmail] = useState<emaildata>({
  email :""
})
const handleEmail = (e: ChangeEvent<HTMLInputElement>)=>{
  const { name, value } = e.target;
  setEmail((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  const Emailvalidation = ()=>{
    const newErrors: any = {};
    if(!email.email){
      newErrors.email = "Enter email address";
    }else if (!email.email || !/\S+@\S+\.\S+/.test(email.email)) {
      newErrors.email = "Email not valid";
    }
    return newErrors;
  } 
const dispatch = useDispatch<any>();
const [loader ,setLoader] = useState(false);
const [otpEmail ,setOtpEmail] = useState<any>('');
  const handleEmailSubmit = async (e: FormEvent)=>{

    e.preventDefault();
    const validationErrors = Emailvalidation();
    if (Object.keys(validationErrors).length === 0) {
      setLoader(true);
      setOtpEmail(email);
      const response = await dispatch(fetchSendLoginList(email))
        if(response.data.success  === true){
            setOpen(true);
            setLoader(false);
            setEmail({email:''})
        }
        if(response.data.Error === true){
          setLoader(false);
        toast.error(response.data.Message)
        }
    }else{
      setEmailError(validationErrors);
    }
    }
     //  --------------otp verifycation code-----
     const [open ,setOpen] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newOtp = [...otp];
    
    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  const navigate = useNavigate();
  const handleOTPSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    const data = {
        email: otpEmail,
        otp: otpCode
      };
       const response = await dispatch(fetchVerifyLogin(data))
       sessionStorage.setItem("memberIdId", response.res.memberid);
       try {
           if(response.res.success === true){
            navigate('/changepassword')
         } else
         {toast.error(response.res.message)}
         
       } catch (error) {
           toast.error(response.res.message)
       }
  };
  return (
    <>
       <ToastContainer />
        {
            !open && 
            <>
               <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
          <div className="container">
            <div className="relative">
              <Link to="/" className="absolute left-0">
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
              <h3 className="text-lg font-medium">Reset Password</h3>
            </div>
          </div>
        </header>
        <div className="relative flex min-h-screen flex-col justify-center py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl ">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-14">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Verification</p>
              </div>
            </div>
            <div>
              <form action="" method="post">
                <div className="flex flex-col space-y-5">
              <label className="text-[#1e293b] text-[14px]" >Email</label>
              <input className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black" type="email" placeholder="Enter email" onChange={handleEmail} name="email" value={email.email} />
              {emailError.email && (
                  <span className="text-xs text-red-500">{emailError.email}</span>
                )}
                    <div> 
                      <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-[#178285] border-none text-white text-sm shadow-sm"  disabled={loader} onClick={handleEmailSubmit}>
                      {loader ? 'Submitting...' : 'Submit'} 
                      </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {
            loader && <div role="status" className='mt-5 flex justify-center'>
            <svg aria-hidden="true" className="w-8 h-8 text-black animate-spin dark:text-black fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
          }
           
        </div>
           </div>
       </>
        }

           {
            open && 
            <>
                 <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
          <div className="container cursor-pointer" onClick={()=>setOpen(false)}>
            <div className="relative">
              <div className="absolute left-0">
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
              </div>
              <h3 className="text-lg font-medium"> Otp Verification</h3>
            </div>
          </div>
        </header>
              <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-14">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-black">
                <p>We have sent a code to your email</p>
              </div>
            </div>
            <div>
              <form action="" onSubmit={handleOTPSubmit}>
                <div className="flex flex-col space-y-10">
                  <div className="flex flex-row items-center justify-between mx-auto w-full">
                    {otp.map((_, index) => (
                  <div className="w-11 h-11 sm:w-16 sm:h-16" key={index}>
                    <input
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOTPChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#178285]"
                    />
                  </div>
                ))}
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-[#178285] border-none text-white text-sm shadow-sm" >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
           </div>
            </>
           }
    </>
  )
}

export default ResetLogin
