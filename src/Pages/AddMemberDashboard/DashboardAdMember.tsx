import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../../Redux/thunks/productListReducer';
import { fetchUserDetailData } from '../../Redux/thunks/UserDetailsThunk';
import { fetchAddMember } from '../../Redux/thunks/AddMemberThunk';
import { fetchNumber } from '../../Redux/thunks/mobileNumThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSearchTeamData } from '../../Redux/thunks/teamSearchThunnk';
import { fetchProductPakageList } from '../../Redux/thunks/ProductPakageThunk';
import Select from 'react-select'
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from 'react-icons/hi2';
import { BsCart } from 'react-icons/bs';

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
    e_mail: string,
    mobile: string,
    sponsor_type: number,
    products_data: any[];
    country: string,
    isFieldsDisabled?: boolean;
    payment_type : string,
    stripeToken : string,
    deliver_status: string
}

const DashboardAdMember = () => {    
    const stripe = useStripe(); 
    const elements = useElements();
    const dispatch = useDispatch<any>();
    const { productListData } = useSelector((state: RootState) => state.product);
    const [userId , setUserId] = useState('');
    const [selectedPackage ,setSelectedPackage] = useState<any>('');
     const [fName ,setFName] = useState<any>([]);
     const [placementName ,setplacementName] = useState<any>([]);
     const [ewalletData , setEwalletData] = useState<any>('');
     const [errors, setErrors] = useState<any>({});
     const [stripInput ,setStripInput] = useState<any>(false);
     const [totalPriceShow ,setTotalPriceShow] = useState<any>('');
     const [cart, setCart] = useState<any[]>([]); 
     const [totalPrice, setTotalPrice] = useState(0); 

    const [formData, setFormData] = useState<FormData>({
        sponsor:  "",
        placement:  "",
        matrix_side: "",
        account_type: 0,
        f_name: "",
        e_mail: "",
        mobile: "",
        sponsor_type: 1,
        products_data: [],
        payment_type:'',
        country: '',
        stripeToken : "",
        deliver_status: "self_collect"
    });

    const UserProductData = {
    action : "GetProducts",
    userid : "",
    }

    useEffect(() => {
        const userdatad = {
        action : "checkuserdetail",
        userid : userId
    }   

    dispatch(fetchProductList(UserProductData));
    dispatch(fetchUserDetailData(userdatad)); 
    }, [dispatch,userId]);

    const handleFnameSearch =async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const userId = value; 
        setUserId(userId);
        
        if(name === 'sponsor'){
            const data = await  dispatch(fetchSearchTeamData( userId )); 
                setFName(data);
        }else if(name === 'placement'){
            const placementName = await  dispatch(fetchSearchTeamData( userId ));
                setplacementName(placementName);
        }
    };
 
    const WlaletData = {
        action : "walletInfo",
        userid : "",
        }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        const { name, value, type } = e.target;
        if (type === "radio" && name === "deliver_status") {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } 
        else  if (type === "radio") {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
        }else if (name === 'payment_type') {
            if (!formData.products_data) {
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
         else if(name === 'products_data'){
             const selectedPackage = productListData.products.find((product : any ) => parseInt(product.id) === parseInt(value));
            setSelectedPackage(selectedPackage);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
 
const updateCart = async (productId: string, price: number, delta: number) => {
        setCart((prevCart) => {
          const currentCart = Array.isArray(prevCart) ? prevCart : [];
    
          const existingProduct = currentCart.find((item) => item.id === productId) || { id: productId, count: 0 };
          const newCount = existingProduct.count + delta;
    
          if (newCount < 0) return currentCart;
    
          const updatedCart = currentCart.map((item) =>
            item.id === productId ? { ...item, count: newCount } : item
          );
    
          if (!currentCart.some((item) => item.id === productId)) {
            updatedCart.push({ id: productId, count: newCount });
          }
          const total = updatedCart.reduce((acc, item) => acc + item.count * price, 0);
          setTotalPrice(total);
    
          setFormData((prev: FormData) => ({
            ...prev,
            products_data: updatedCart,
          }));
    
          return updatedCart;
        });
      };

    const validateForm = () => {
        const newErrors: any = {};
        if(formData.isFieldsDisabled){
        if (!formData.sponsor) newErrors.sponsor = "Sponsor ID is required";
            if (!formData.placement) newErrors.placement = "Placement ID is required";
            if (!formData.matrix_side) newErrors.matrix_side = "Matrix Side is required";
            if (!formData.country) newErrors.country = "Country Name is required";
            if (!formData.products_data) newErrors.products_data = "Package is required";
                if (!formData.payment_type) newErrors.payment_type = "Paymen    t Type is required";
        }else{
            if (!formData.sponsor) newErrors.sponsor = "Sponsor ID is required";
            if (!formData.placement) newErrors.placement = "Placement ID is required";
            if (!formData.matrix_side) newErrors.matrix_side = "Matrix Side is required";
             if (!formData.f_name) newErrors.f_name = "Full Name is required";
        if (!formData.country) newErrors.country = "Country Name is required";
        if (!fName.member) newErrors.sponsor = `${fName.message}`;
        if (!placementName.member) newErrors.placement = `${placementName.message}`;
        if (!formData.e_mail || !/\S+@\S+\.\S+/.test(formData.e_mail)) newErrors.e_mail = "Valid Email is required";
        if (!formData.mobile || formData.mobile.length < 8) newErrors.mobile = "Mobile number must be at least 8 digits long";
        if (!formData.products_data) newErrors.products_data = "Package is required";
        if (!formData.payment_type) newErrors.payment_type = "Payment Type is required";
        }
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
    const BizPathdata = localStorage.getItem("user");
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
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFormBiz();
        if (!isValid) {
            toast.error("Please fill up all info under Settings - My Profile before any purchases");
            return;
        }
        const validationErrors = validateForm();
        if(!bizData){
            toast.error("Please fill up your profile info before proceeding with the purchase")
        }
        if (Object.keys(validationErrors).length === 0) {
          
          if (!stripe || !elements) {
            toast.error("Stripe or Elements not initialized."); 
            return;
          }
          let paymentMethodId = null;
           
          if (formData.payment_type === "credit_card" || formData.payment_type === "e-wallet" && stripInput ) {
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
            const successData = await dispatch(fetchAddMember(formDataToSend));
            toast.error(successData.error);
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
            products_data: [],
            payment_type: '',
            country: '',
            stripeToken: "",
            deliver_status: 'self_collect'
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
                            <Link to="/dashboard" className="absolute left-0">
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
                                        <option value="">Auto</option>
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
                                        {productListData.countries && productListData.countries.length > 0 ?
                                        (  productListData.countries.map((country: Product) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.full_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Country available</option>
                                             )}
                                    </select>
                                    {errors.country && <p className='text-red-500 text-xs'>{errors.country}</p>}
                                </div>
                                <div className='mb-3'>
                                    <label className='text-[#1e293b] text-[14px]'>Package</label>
                                    {/* <Select
                                options={options}
                                isMulti 
                                onChange={selectHanldeChange} 
                                placeholder="Select packages..."
                                isOptionDisabled={(option) => option.isDisabled} 
                                   /> */}
                                    <div className="relative overflow-x-auto mt-5 border rounded-md mb-4">
                                                       <table  id="example" className="display table-auto w-full text-sm text-left rtl:text-right text-black  ">
                                                           <thead className="text-xs text-white uppercase bg-[#178285]">
                                                               <tr>
                                                                   <th className="px-6 py-3 text-center">
                                                                   Name
                                                                   </th>
                                                                   <th className="px-6 py-3">
                                                                  Price
                                                                   </th>
                                                                   <th className="px-6 py-3">
                                                                     LP
                                                                   </th>
                                                                   <th className="px-6 py-3">
                                                                       Action
                                                                   </th>
                                                               </tr>
                                                           </thead>
                                                           <tbody>
                                                       {productListData.products && productListData.products.length > 0 ? (
                                                                   productListData.products.map((item: any, index: number) => (
                                                                   <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                                                           
                                                                   <td className="px-6 py-3 text-center">
                                                                          {item.combo_product_name}
                                                                   </td>
                                                                   <td className="px-6 py-3">
                                                                    {item.combo_product_retail_price}
                                                                   </td>
                                                                   <td className="px-6 py-3">
                                                                        {item.combo_product_lp}
                                                                   </td>
                                                                   <td className="px-6 py-3">
                                                                <div className="flex gap-2 items-center">
                                                                <HiOutlineMinusSmall
                                                                    onClick={() => updateCart(item.id, item.combo_product_retail_price, -1)}
                                                                    className={`cursor-pointer ${cart[item.id]?.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                />
                                                                <BsCart /> {cart.find(cartItem => cartItem.id === item.id)?.count || 0}
                                                                <HiOutlinePlusSmall
                                                                    onClick={() => updateCart(item.id, item.combo_product_retail_price, 1)}
                                                                    className="cursor-pointer"
                                                                />
                                                                </div>
                                                                   </td>
                                                               </tr>
                                                              ))
                                                           ) : (
                                                       <tr>
                                                       <td colSpan={6} className="px-6 py-2 text-center">No data available</td>
                                                       </tr>
                                                           )}
                                                           </tbody>
                                                       </table>
                                                       </div>
                                    {errors.products_data && <p className='text-red-500 text-xs'>{errors.products_data}</p>}
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
                    {/* <h4 className="text-black text-[14px] font-normal">${totalPriceShow.combo_product_retail_price || 0}</h4> */}${totalPrice}
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
                                        <button type='submit' className='py-2 px-3 rounded-md bg-[#178285] text-white text-sm '>Submit</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default DashboardAdMember;
