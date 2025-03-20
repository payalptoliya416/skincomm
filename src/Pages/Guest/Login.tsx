import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginAction } from "../../Redux/actions/loginAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {
    
    const loginState = useSelector((state: any) => state?.loginState?.error?.response?.data);
    const dispatch = useDispatch() as any;
  
    const initialValues = {
      userid: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      userid: Yup.string().required("This field is required"),
      password: Yup.string().min(6, "Password should be 6 characters minimum.").required("This field is required"),
    });   
  
    const formSubmit = (values: any) => {
      const submit = {
        userid: values.userid,
        password: values.password,
        login_type: "member",
      };
  
      dispatch(loginAction(submit));
    };
  
    const formik = useFormik({
      initialValues: initialValues,
      onSubmit: formSubmit,
      validationSchema,
    }) as any;
  
    useEffect(() => {
      if (loginState?.error) {
        toast.error(loginState.error);
      }
    }, [loginState]);

    return (
        <>
            <section className="h-screen flex items-center justify-center">
           <ToastContainer />
             <div className="bg-white px-6 py-6 rounded-2xl sm:mx-auto w-full max-w-lg mx-2">
                        <div className="mt-5">
                            <div className="text-center flex justify-center mb-6">
                                <img src="images/logo-skincomm.png" alt="" className="w-full max-w-[200px]"/>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl text-black font-semibold">Member Login</h2>
                                <h2 className="text-danger-color m-0">{ loginState?.message }</h2>
                            </div>
                        </div>
 
                        <form onSubmit={ formik.handleSubmit } autoComplete={'off'}>
                        <div className="mt-5 flex flex-col gap-4">
                                <input
                                    type="text"
                                    {...formik.getFieldProps('userid')}
                                    placeholder="Userid"
                                    className="border-b border-custom-border focus:border-main-color w-full text-base font-normal text-custom-text-color py-2 focus:outline-none"
                                />
                                { formik.touched.userid && formik.errors.userid ? (
                                    <span
                                        className="text-danger-color">{ formik.errors.userid as React.ReactNode }</span>
                                ) : null }
                                <input
                                    type="password"
                                    { ...formik.getFieldProps('password') }
                                    placeholder="Password"
                                    className="border-b border-custom-border w-full text-base font-normal text-custom-text-color py-2 focus:outline-none"
                                />
                                { formik.touched.password && formik.errors.password ? (
                                    <span
                                        className="text-danger-color">{ formik.errors.password as React.ReactNode }</span>
                                ) : null }

                              <div className="flex flex-col gap-2 ">
                              <button type="submit"  className="bg-[#148585]  px-10 py-2 rounded-lg mt-3 text-sm text-white" >
                                    Login
                                </button>
                              <div className="text-center mt-2">  <Link to='/resetpassword' className="underline text-blue-500">Reset Password?</Link></div>
                              {/* <div className="text-center">  <Link to='/signup' className="underline text-blue-500">Create an account</Link></div> */}
                              </div>
                            </div>
                        </form>
              </div>
            </section>
        </>
    );
}

export default Login;