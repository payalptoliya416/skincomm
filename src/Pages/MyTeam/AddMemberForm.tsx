import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../../Redux/thunks/productListReducer';
import { useLocation } from 'react-router-dom';
import { fetchUserDetailData } from '../../Redux/thunks/UserDetailsThunk';
import { fetchAddMember } from '../../Redux/thunks/AddMemberThunk';
import { fetchNumber } from '../../Redux/thunks/mobileNumThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSearchTeamData } from '../../Redux/thunks/teamSearchThunnk';
import { fetchProductPakageList } from '../../Redux/thunks/ProductPakageThunk';


interface Product {
    combo_product_name: string,
    combo_product_lp: number,
    combo_product_retail_price: string,
    id: number,
    full_name : string
}
interface FormData {
    sponsor: string,
    placement: string,
    matrix_side: string,
    account_type: number,
    f_name: string,
    l_name: string,
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

const AddMemberForm = () => {
    const stripe = useStripe(); 
    const elements = useElements();
    const location = useLocation();
    const {  upline_id , col } = location.state || {};
    const [fName ,setFName] = useState<any>([]);
    const [placementName ,setplacementName] = useState<any>([]);
    const dispatch = useDispatch<any>();
    const { productListData } = useSelector((state: RootState) => state.product);
     const { UserDetailData } = useSelector((state: RootState) => state.userDetail);
     const [ewalletData , setEwalletData] = useState<any>('');
     const [selectedPackage ,setSelectedPackage] = useState<any>('');
     const [errors, setErrors] = useState<any>({});
      const [totalPriceShow ,setTotalPriceShow] = useState<any>('');
     const [stripInput ,setStripInput] = useState<any>(false);
    const [formData, setFormData] = useState<FormData>({
        sponsor:  upline_id || '' ,
        placement:  upline_id || '' ,
        matrix_side: col || '',
        account_type: 0,
        f_name: "",
        l_name: "",
        e_mail: "",
        mobile: "",
        sponsor_type: 1,
        package_id: "",
        payment_type:'',
        country: '',
        stripeToken : "",
        deliver_status:'self_collect'
    });

    const UserProductData = {
        action : "GetProducts",
        userid : "",
    }
    useEffect(() => {
        const userdatad = {
        action : "checkuserdetail",
        userid : upline_id
    }   

    dispatch(fetchProductList(UserProductData));
    dispatch(fetchUserDetailData(userdatad)); 
    }, [dispatch]);
    
    const handleFnameSearch = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    
        if (name === 'sponsor') {
            try {
                const data = await dispatch(fetchSearchTeamData( value ));
                setFName(data?.member || null); 
            } catch (error) {
                console.error("Error fetching sponsor data:", error);
            }
        } else if (name === 'placement') {
            try {
                const placementData = await dispatch(fetchSearchTeamData( value ));
                setplacementName(placementData?.member || null); 
            } catch (error) {
                console.error("Error fetching placement data:", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await dispatch(fetchSearchTeamData( upline_id ));
            setFName(data.member); 
            const placementName = await dispatch(fetchSearchTeamData( upline_id ));
            setplacementName(placementName.member); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData(); 
      }, [dispatch]); 
  
      const WlaletData = {
        action : "walletInfo",
        userid : "",
        }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "radio" && name === "deliver_status") {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } 
        else  if (type === "radio" && name === "account_type") {
            const newAccountType = Number(value);
            setFormData((prev) => {
                const updatedFormData = { ...prev, [name]: newAccountType };
    
                if (newAccountType === 1) {
                    return {
                        ...updatedFormData,
                        f_name: UserDetailData.member_detail?.f_name || '',
                        l_name: UserDetailData.member_detail?.l_name || '',
                        e_mail: UserDetailData.member_detail?.email || '',
                        mobile: UserDetailData.member_detail?.mobile || '',
                        isFieldsDisabled: true,
                    };
                } else {
                    return {
                        ...updatedFormData,
                        f_name: '',
                        l_name: '',
                        e_mail: '',
                        mobile: '',
                        isFieldsDisabled: false,
                    };
                }
            });
        } else if (type === "radio") {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }));
        }else  if (name === 'payment_type') {
            if (value === 'credit_card') {
                if (UserDetailData.stripe === false) {
                    toast.error("Admin Has Not Turned On Stripe Option");
                }
                if (UserDetailData.stripe_key === '') {
                    toast.error("Admin Has Not Set Stripe Payment Option");
                }
            }
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
                    const retailPrice = parseFloat(selectedPackage.combo_product_associate_price);
                    // const retailPrice = parseFloat(selectedPackage.combo_product_retail_price);

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
        } else if(name === 'package_id'){
            const selectedPackage = productListData.products.find((product : any ) => parseInt(product.id) === parseInt(value));
            setTotalPriceShow(selectedPackage);
            setSelectedPackage(selectedPackage);
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const validateForm = () => {
        const newErrors: any = {};
        if(formData.isFieldsDisabled){
        if (!formData.sponsor) newErrors.sponsor = "Sponsor ID is required";
            if (!formData.placement) newErrors.placement = "Placement ID is required";
            if (!formData.matrix_side) newErrors.matrix_side = "Matrix Side is required";
            if (!formData.country) newErrors.country = "Country Name is required";
            if (!formData.package_id) newErrors.package_id = "Package is required";
            // if (!formData.account_type && formData.account_type !== 0) newErrors.account_type = "Account Type is required";
            if (!formData.payment_type) newErrors.payment_type = "Payment Type is required";
        }else{  
             if (!formData.f_name) newErrors.f_name = "First Name is required";
        if (!formData.l_name) newErrors.l_name = "Last Name is required";
        if (!formData.country) newErrors.country = "Country Name is required";
        if (!formData.e_mail || !/\S+@\S+\.\S+/.test(formData.e_mail)) newErrors.e_mail = "Valid Email is required";
        if (!formData.mobile || formData.mobile.length < 8) newErrors.mobile = "Mobile number must be at least 8 digits long";
        if (!formData.package_id) newErrors.package_id = "Package is required";
        // if (!formData.account_type && formData.account_type !== 0) newErrors.account_type = "Account Type is required";
        if (!formData.payment_type) newErrors.payment_type = "Payment Type is required";
        }
        return newErrors;
    };

    const navigate = useNavigate();
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
          
          if (!stripe || !elements) {
            toast.error("Stripe or Elements not initialized."); 
            return;
          }
          let paymentMethodId = null;
          
          if (formData.payment_type === "credit_card" || formData.payment_type === "e-wallet" && stripInput  ) {
            const cardElement = elements.getElement(CardElement);
            
            if (!cardElement) {
              toast.error("Card Element not found."); 
              return;
            }
            try {
            const { error, token } = await stripe.createToken(cardElement);
              if (error) {
                toast.error("Payment error: " + error.message);  
                return;
              }
              paymentMethodId = token?.id;

              if (!paymentMethodId) {
                toast.error("Payment method ID not found.");
                return;
              }
            } catch (paymentError) {
              toast.error("Payment processing error. Please try again.");
              return;
            } 
          }

          const formDataToSend = {
            ...formData,
            stripeToken: paymentMethodId || "", 
          };
      
          if (formData.isFieldsDisabled) {      
         const successData =await dispatch(fetchAddMember(formDataToSend));
             if(successData){
                if(successData.data.data.error === true){
                    toast.error(successData.data.data.message)
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
                const successData = await dispatch(fetchAddMember(formDataToSend));
                if(successData){
                    if(successData.data.data.error === true){
                        toast.error(successData.data.data.message)
                    }else{
                        toast.success("Member added successfully !");
                        const successnavigate = successData.data.data
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
            l_name: "",
            e_mail: "",
            mobile: "",
            sponsor_type: 1,
            package_id: "",
            payment_type: '',
            country: '',
            stripeToken: "",
            deliver_status:'self_collect'
          });
      
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
                            <Link to="/placement-tree" className="absolute left-0">
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
                            <h3 className="text-lg font-medium">Add Member</h3>
                        </div>
                    </div>
                </header>
                <ToastContainer />
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
                                    {/* {fName && fName ? <h4 className='text-sm pt-2'> {fName && fName.f_name}  {fName && fName.l_name}
                                     </h4> :""} */}
                                     {fName && (
                                    <h4 className='text-sm pt-2'>
                                        {fName.f_name} {fName.l_name}
                                    </h4>
                                )}
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
                                    {/* {placementName && placementName ? <h4 className='text-sm pt-2'> {placementName && placementName.f_name}  {placementName && placementName.l_name} </h4> :""} */}

                                    {placementName && (
        <h4 className='text-sm pt-2'>
            {placementName.f_name} {placementName.l_name}
        </h4>)}
                                    
                                </div>
                                <div className='mb-3'>
                                    <label className='text-[#1e293b] text-[14px]'>Matrix Side</label>
                                    <select
                                        name="matrix_side"
                                        className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                        value={formData.matrix_side}
                                        onChange={handleChange}
                                    >
                                        <option value="">Auto</option>
                                        <option value="R">Right</option>
                                        <option value="L">Left</option>
                                    </select>
                                    {errors.matrix_side && <p className='text-red-500 text-xs'>{errors.matrix_side}</p>}
                                </div>
                                {/* <div className="mb-3">
                                    <label  className='text-[#1e293b] text-[14px] mb-1'>Account Type</label>
                                    <div className='mt-3'>
                                        <div className="flex items-center">
                                            <input
                                                id="main-account"
                                                type="radio"
                                                name="account_type"
                                                value="0"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                checked={formData.account_type === 0}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="main-account" className="ms-2 text-sm font-medium text-black ">Main Account</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="sub-account"
                                                type="radio"
                                                name="account_type"
                                                value="1"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                checked={formData.account_type === 1}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="sub-account" className="ms-2 text-sm font-medium text-black">Sub Account</label>
                                        </div>
                                    </div>
                                    {errors.account_type && <p className='text-red-500 text-xs'>{errors.account_type}</p>}
                                </div> */}
                                <div className='mb-3'>
                                    <label className='text-[#1e293b] text-[14px]'>First Name</label>
                                    <input
                                        type="text"
                                        name="f_name"
                                        placeholder='First Name'
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
                                    <label className='text-[#1e293b] text-[14px]'>Last Name</label>
                                    <input
                                        type="text"
                                        name="l_name"
                                        placeholder='Last Name'
                                        className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black'
                                        value={formData.l_name}
                                        onChange={handleChange}
                                        disabled={formData.isFieldsDisabled}
                                    />
                                    {
                                        formData.isFieldsDisabled ? "" : (errors.l_name && <p className='text-red-500 text-xs'>{errors.l_name}</p>)
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
                                        {productListData.countries && productListData.countries.length > 0 ?
                                        (  productListData.countries.map((country: Product) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.full_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No products available</option>
                                             )}
                                    </select>
                                    {errors.country && <p className='text-red-500 text-xs'>{errors.country}</p>}
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
                                        {productListData.products && productListData.products.length > 0 ? (
                            productListData.products.map((product: Product) => (
                                <option key={product.id} value={product.id}>
                                    {product.combo_product_name} - {product.combo_product_lp}
                                </option>
                            ))
                        ) : (
                            <option disabled>No products available</option>
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
                                {/* <option value="paynow">PAYNOW</option>
                                <option value="RC">Purchase Point</option>
                                <option value="PP2">Purchase Point 2</option>
                                <option value="SP">Reward Point</option> */}
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
                    <h4 className="text-black text-[14px] font-normal">${totalPriceShow.combo_product_associate_price || 0}</h4>
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
                            </div>
                                <div className='text-end'>
                                        <button type='submit' className={`py-2 px-3 rounded-md bg-[#178285] text-white text-sm  `}>Submit</button>
                                    </div>
                            </form>
                            
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default AddMemberForm;
