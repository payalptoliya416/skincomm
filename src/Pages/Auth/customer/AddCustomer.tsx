import React, { useEffect, useState } from 'react'
import Layout from '../../../Components/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchUserDetailData } from '../../../Redux/thunks/UserDetailsThunk';
import { fetchSearchTeamData } from '../../../Redux/thunks/teamSearchThunnk';
import { toast, ToastContainer } from 'react-toastify';
import { fetchProductPakageList } from '../../../Redux/thunks/ProductPakageThunk';
import { fetchNumber } from '../../../Redux/thunks/mobileNumThunk';
import { fetchcustomerGetData } from '../../../Redux/thunks/CustomerGetThunk';
import { fetchcustomePostData } from '../../../Redux/thunks/CustomerPostThunk';

interface Product {
    combo_product_name: string,
    combo_product_lp: number,
    combo_product_retail_price: string,
    id: number,
    country_name : string
}
interface FormData {
    sponsor: string,
    placement: string,
    matrix_side: string,
    account_type: number,
    f_name: string,
    e_mail: string,
    mobile: string,
    sponsor_type: number,
    package_id: string,
    country: string,
    isFieldsDisabled?: boolean;
    payment_type : string,
    stripeToken : string,
    deliver_status: string
}


function AddCustomer() {
    const stripe = useStripe(); 
    const elements = useElements();
    const dispatch = useDispatch<any>();
       const location = useLocation();
    const {  upline_id , col } = location.state || {};
    const { cutomerGetData } = useSelector((state: RootState) => state.customerGetData);
    const [userId , setUserId] = useState('');
    const [selectedPackage ,setSelectedPackage] = useState<any>('');
     const [fName ,setFName] = useState<any>([]);
     const [placementName ,setplacementName] = useState<any>([]);
     const [ewalletData , setEwalletData] = useState<any>('');
     const [errors, setErrors] = useState<any>({});
     const [stripInput ,setStripInput] = useState<any>(false);
     const [totalPriceShow ,setTotalPriceShow] = useState<any>('');
    const [formData, setFormData] = useState<FormData>({
        sponsor:   upline_id || "",
        placement:  upline_id || "",
        matrix_side: col || "",
        account_type: 0,
        f_name: "",
        e_mail: "",
        mobile: "",
        sponsor_type: 1,
        package_id: "",
        payment_type:'',
        country: '',
        stripeToken : "",
        deliver_status: "self_collect"
    });
    const [loading, setLoading] = useState(false);
const customerData = {
    action : "GetProducts",
}
    useEffect(() => {
        const userdatad = {
        action : "checkuserdetail",
        userid : userId
    }   

    dispatch(fetchUserDetailData(userdatad)); 
    dispatch(fetchcustomerGetData(customerData)); 
    }, [dispatch,userId]);

    // const handleFnameSearch =async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({ ...prev, [name]: value }));
    //     const userId = value; 
    //     setUserId(userId);
        
    //     if(name === 'sponsor'){
    //         const data = await  dispatch(fetchSearchTeamData( userId )); 
    //             setFName(data);
          
    //     }else if(name === 'placement'){
    //         const placementName = await  dispatch(fetchSearchTeamData( userId ));
    //             setplacementName(placementName);
    //     }
    // };

    const handleFnameSearch = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const userId = value;
    
        if (name === "sponsor") {
          setLoading(true);
          const data = await dispatch(fetchSearchTeamData(userId));
          setFName(data);
          setLoading(false);
        } else if (name === "placement") {
          setLoading(true);
          const placementName = await dispatch(fetchSearchTeamData(userId));
          setplacementName(placementName);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        const fetchInitialData = async () => {
          if (formData.sponsor) {
            setLoading(true);
            const data = await dispatch(fetchSearchTeamData(formData.sponsor));
            setFName(data);
            setLoading(false);
          }
          if (formData.placement) {
            setLoading(true);
            const placementData = await dispatch(fetchSearchTeamData(formData.placement));
            setplacementName(placementData);
            setLoading(false);
          }
        };
        fetchInitialData();
      }, [formData.sponsor, formData.placement, dispatch]);
    
    const WlaletData = {
        action : "walletInfo",
        userid : "",
        }
        
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "radio" && name === "deliver_status") {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } 
        else if (type === "radio") {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
        }else if (name === 'payment_type') {
            if (!formData.package_id) {
                toast.error("Please select a package first.");
                return; 
            }
        
            if (value === 'e-wallet') {
                const ewalletDataValue = await dispatch(fetchProductPakageList(WlaletData));
                const ValuOfBalance = ewalletDataValue.data;
                setEwalletData(ValuOfBalance);
        
                if (ValuOfBalance.balance_rc === 0 && ValuOfBalance.balance_sp === 0) {
                    toast.error(ValuOfBalance.message);
                    return;
                }
        
                if (ValuOfBalance.currency.trim() !== 'USD') {
                    const adjustedBalanceRc = ValuOfBalance.deposite_rate * ValuOfBalance.balance_rc;
                    const adjustedBalanceSp = ValuOfBalance.deposite_rate * ValuOfBalance.balance_sp;
                    setEwalletData({
                        ...ValuOfBalance,
                        balance_rc: adjustedBalanceRc || '',
                        balance_sp: adjustedBalanceSp || '',
                    });
                }
        
                if (selectedPackage) {
                    const retailPrice = parseFloat(selectedPackage.combo_product_retail_price);
                    const currentTotalRcSp =
                        ValuOfBalance.currency.trim() !== 'USD'
                            ? ValuOfBalance.deposite_rate * ValuOfBalance.balance_rc +
                              ValuOfBalance.deposite_rate * ValuOfBalance.balance_sp
                            : ValuOfBalance.balance_rc + ValuOfBalance.balance_sp;
                    if (currentTotalRcSp < retailPrice) { 
                        setStripInput(true);
                    }
                }
            }
        
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
         else if(name === 'package_id'){
            const selectedPackage = cutomerGetData.products.find((product : any ) => parseInt(product.id) === parseInt(value));
            setTotalPriceShow(selectedPackage);
            setSelectedPackage(selectedPackage);
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.sponsor) newErrors.sponsor = "Sponsor ID is required";
            if (!formData.placement) newErrors.placement = "Placement ID is required";
            if (!formData.matrix_side) newErrors.matrix_side = "Matrix Side is required";
            if (!formData.country) newErrors.country = "Country Name is required";
            if (!formData.package_id) newErrors.package_id = "Package is required";
            if (!formData.payment_type) newErrors.payment_type = "Payment Type is required";
           if (!formData.f_name) newErrors.f_name = "Full Name is required";
        if (!fName.member) newErrors.sponsor = `${fName.message}`;
        if (!placementName.member) newErrors.placement = `${placementName.message}`;
        if (!formData.e_mail || !/\S+@\S+\.\S+/.test(formData.e_mail)) newErrors.e_mail = "Valid Email is required";
        if (!formData.mobile || formData.mobile.length < 8) newErrors.mobile = "Mobile number must be at least 8 digits long";
        return newErrors;
    };
 
    const navigate = useNavigate();

  const [bizData, setBizData] = useState<any>({});

  const validateFormBiz = () => {
    const newErrors: any = {};
    if (!bizData.dob) newErrors.dob = "Date of Birth is required.";
    if (!bizData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!bizData.address) newErrors.address = "Address is required.";
    if (!bizData.zip) newErrors.zip = "ZIP code is required.";
    if (!bizData.email) newErrors.email = "Email is required.";
    
    return Object.keys(newErrors).length === 0; 
  };

  useEffect(() => {
    const BizPathdata = sessionStorage.getItem("user");
    if (BizPathdata) {
      const parsedData = JSON.parse(BizPathdata);
      setBizData({
        dob: parsedData.dob,
        mobile: parsedData.mobile,
        address: parsedData.address,
        zip: parsedData.zip,
        email: parsedData.email,
      });
    }
  }, []);

  const [disable , setDisable]= useState(false);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisable(true);

        const isValid = validateFormBiz();
        if (!isValid) {
            toast.error("Please fill up all info under Settings - My Profile before any purchases");
            setDisable(false);
            return;
        }
        const validationErrors = validateForm();
        if(!bizData){
            toast.error("Please fill up your profile info before proceeding with the purchase");
            setDisable(false);
            
        }
        if (Object.keys(validationErrors).length === 0) {
          
          if (!stripe || !elements) {
            toast.error("Stripe or Elements not initialized.");
            setDisable(false);
            return;
          }
          let paymentMethodId = null;
           
          if (formData.payment_type === "credit_card" || formData.payment_type === "e-wallet" && stripInput ) {
            const cardElement = elements.getElement(CardElement);
            
            if (!cardElement) {
              toast.error("Card Element not found."); 
              setDisable(false);
              return;
            }
            try {
            const { error, token } = await stripe.createToken(cardElement);
              if (error) {
                toast.error("Payment error: " + error.message);
                setDisable(false);
                return;
              }
              paymentMethodId = token?.id;

              if (!paymentMethodId) {
                toast.error("Payment method ID not found.");
                setDisable(false);
                return;
              }
            } catch (paymentError) {
              toast.error("Payment processing error. Please try again.");
              setDisable(false);
              return;
            } 
          }
          
          const formDataToSend = {
            ...formData,
            stripeToken: paymentMethodId || "",     
          };
          if (formData.isFieldsDisabled) {
            const successData = await dispatch(fetchcustomePostData(formDataToSend));
            toast.error(successData.error);
            if(successData){
                if(successData.data.data.error === true){
                    toast.error(successData.data.data.message);
                }
                else{
                    toast.success("Member added successfully !");
                    const successnavigate = successData.data.data
                    navigate('/successfullyPayment', { state: {successnavigate},});
                }
            }
          } else {

            const mobileDetail = {
              action: "checkuniquemobile",
              phone_no: formData.mobile,
              account: formData.account_type,
              sponsor: '',
            };
           
            const response = await dispatch(fetchNumber(mobileDetail));
            const numberData = response.data;
            if (numberData.success) {
                const successData =await dispatch(fetchcustomePostData(formDataToSend));
                if(successData){
                    if(successData.data.error === true){
                        toast.error(successData.data.data.message)
                    }
                    else{
                        toast.success("Member added successfully !");
                        const successnavigate = successData.data
                        navigate('/successfullyPayment', { state: {successnavigate},});
                    }
                }
            } else {
              toast.error("Mobile validation failed, form submission aborted.");
              
            }
          }
      
          setFormData({
            sponsor: "",
            placement: "",
            matrix_side: "",
            account_type: 0,
            f_name: "",
            e_mail: "",
            mobile: "",
            sponsor_type: 1,
            package_id: "",
            payment_type: '',
            country: '',
            stripeToken: "",
            deliver_status: 'self_collect'
          });
      
        } else {
          setErrors(validationErrors);
          setDisable(false);
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
                        <h3 className="text-lg font-medium">Add Customer</h3>
                    </div>
                </div>
   </header>
   <ToastContainer/>
   <section className='py-20 pb-24'>
                <div className="container">
                    <div className="p-[20px] bg-white rounded-md">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Sponsor ID</label>
                                <input
                                    type="text"
                                    name="sponsor"
                                    placeholder='Sponsor'
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.sponsor}
                                    onChange={handleFnameSearch}
                                />
                                {errors.sponsor && <p className='text-red-500 text-xs'>{errors.sponsor}</p>}
                                {fName.member && fName.member ? <h4 className='text-sm pt-2'> {fName && fName.member.f_name}
                                 </h4> :""}
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Placement ID</label>
                                <input
                                    type="text"
                                    name="placement"
                                    placeholder='Placement'
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.placement}
                                    onChange={handleFnameSearch}
                                />
                                
                                {errors.placement && <p className='text-red-500 text-xs'>{errors.placement}</p>}
                                {placementName.member && placementName.member ? <h4 className='text-sm pt-2'> {placementName.member && placementName.member.f_name}</h4> :""}
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Matrix Side</label>
                                <select
                                    name="matrix_side"
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.matrix_side}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Auto</option>
                                    <option value="R">Right</option>
                                    <option value="L">Left</option>
                                </select>
                                {errors.matrix_side && <p className='text-red-500 text-xs'>{errors.matrix_side}</p>}
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Full Name</label>
                                <input
                                    type="text"
                                    name="f_name"
                                    placeholder='Full Name'
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.f_name}
                                    onChange={handleChange}
                                    disabled={formData.isFieldsDisabled}
                                />
                                {
                                    formData.isFieldsDisabled ? "" : (   errors.f_name && <p className='text-red-500 text-xs'>{errors.f_name}</p>)
                                }
                             
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Email</label>
                                <input
                                    type="email"
                                    name="e_mail"
                                    placeholder='Email'
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.e_mail}
                                    onChange={handleChange}
                                    disabled={formData.isFieldsDisabled}
                                />
                                {
                                    formData.isFieldsDisabled ? "" : (errors.e_mail && <p className='text-red-500 text-xs'>{errors.e_mail}</p>)
                                }
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Mobile</label>
                                <input
                                    type="number"
                                    name="mobile"
                                    placeholder='Mobile'
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    disabled={formData.isFieldsDisabled}
                                />
                                {
                                    formData.isFieldsDisabled ? "" : (errors.mobile && <p className='text-red-500 text-xs'>{errors.mobile}</p>)
                                }
                            </div>
                     
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Country</label>
                                <select
                                    name="country"
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {cutomerGetData.countries && cutomerGetData.countries.length > 0 ?
                                    (  cutomerGetData.countries.map((country: Product) => (
                                            <option key={country.id} value={country.id}>
                                                {country.country_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No Country available</option>
                                         )}
                                </select>
                                {errors.package_id && <p className='text-red-500 text-xs'>{errors.package_id}</p>}
                            </div>
                            <div className='mb-3'>
                                <label className='text-[#1e293b] text-[14px]'>Package</label>
                                <select 
                                    name="package_id"
                                    className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                    value={formData.package_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Package</option>
                                    {cutomerGetData.products && cutomerGetData.products.length > 0 ? (
                        cutomerGetData.products.map((product: Product) => (
                            <option key={product.id} value={product.id}>
                                {product.combo_product_name} - {product.combo_product_lp}
                            </option>
                        ))
                    ) : (
                        <option disabled>No Package available</option>
                         )}
                                </select>
                                {errors.package_id && <p className='text-red-500 text-xs'>{errors.package_id}</p>}
                            </div>
                            
                            <div className="mb-3">
                            <label className='text-[#1e293b] text-[14px]'>Payment</label>
                          <select
                            name="payment_type"
                            className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                            value={formData.payment_type}
                            onChange={handleChange}>
                            <option defaultValue={''}>Select</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="e-wallet">E-Wallet</option>
                            </select>

                            {  formData.payment_type === 'e-wallet' ? (
                                <>
                                <div className='flex gap-5 items-center mt-3'>
                                    <label className='text-[#1e293b] text-[14px]'>PP</label>
                                     <input type="text"  className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300' value={ewalletData.balance_rc} readOnly/>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <label className='text-[#1e293b] text-[14px]'>RP</label>
                                     <input type="text"  className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black  bg-gray-300' value={ewalletData.balance_sp} readOnly/>
                                </div>
                                </>
                            ) : ''
                         }
                       {formData.payment_type === "credit_card" ? (
                            <div className="mt-4">
                            <CardElement className="border py-2 px-3 rounded-md" options={{ hidePostalCode: true }} />
                            </div>
                        ): ""}
                        {
                            formData.payment_type === 'e-wallet' && stripInput ? (
                                <div className="mt-4">
                                <CardElement className="border py-2 px-3 rounded-md" options={{ hidePostalCode: true }} />
                                </div>
                            ) : ""
                        }
                         {errors.payment_type && <p className='text-red-500 text-xs'>{errors.payment_type}</p>}
                                </div>
                            <div className="mb-3 ">
                                  <div className="mb-3 flex items-center gap-2">
                <h3 className="text-black text-[14px] font-semibold">Total Amount : </h3>
                <h4 className="text-black text-[14px] font-normal">${totalPriceShow.combo_product_retail_price || 0}</h4>
                </div>
                            </div>
                                <div className="mb-3">
                        <label className="text-[#1e293b] text-[14px] mb-1">Deliver Status</label>
                        <div className="mt-3 flex gap-20 justify-around">
                            <div className="flex items-center cursor-pointer">
                            <input
                                id="main-account"
                                type="radio"
                                name="deliver_status"
                                value="self_collect"
                                checked={formData.deliver_status === 'self_collect'}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                onChange={handleChange}
                            />
                            <label htmlFor="main-account" className="ms-2 text-sm font-medium text-black">
                                Self Collect
                            </label>
                            </div>
                            <div className="flex items-center cursor-pointer">
                            <input
                                id="sub-account"
                                type="radio"
                                name="deliver_status"
                                value="delivery"
                                checked={formData.deliver_status === 'delivery'} 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                onChange={handleChange}
                            />
                            <label htmlFor="sub-account" className="ms-2 text-sm font-medium text-black">
                                Delivery
                            </label>
                            </div>
                        </div>
  {/* {error.deliver_status && <p className="text-red-500 text-xs">{error.deliver_status}</p>} */}
                        </div>
                        <div className='text-end flex justify-end mb-3 '>
                                    <button 
                                    type="submit" 
                                    className={`py-2 px-3 rounded-md bg-[#178285] text-white text-sm flex items-center justify-center ${disable ? "cursor-not-allowed pointer-events-none opacity-50" : ""}`} 
                                    disabled={disable}
                                    >
                                    {disable && (
                                        <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                        </svg>
                                    )}
                                    {disable ? "Loading..." : "Submit"}
                                    </button>
                                    </div>
                        </form>
                    </div>
                </div>
            </section>
   </Layout>
</>
  )
}

export default AddCustomer
