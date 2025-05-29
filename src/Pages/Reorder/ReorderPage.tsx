
import React, { ChangeEvent, useEffect, useState } from 'react'
import Layout from '../../Components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import {  HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryList, fetchCategoryListtable } from '../../Redux/thunks/ReorderCategoryThunk';
import { RootState } from '../../Redux/store';
import { fetchPaymentBy } from '../../Redux/thunks/PaymentByThunk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchReorderPost } from '../../Redux/thunks/ReorderPostThunk';
import { fetchProductList } from '../../Redux/thunks/productListReducer';
import imageCompression from 'browser-image-compression';
import { IoIosCloseCircle } from 'react-icons/io';
import { fetchPaymentLink } from '../../Redux/thunks/PaymentLinkThunk';
import { LIVE_URL } from '../../Utilities/config';
import { fetchSingapure } from '../../Redux/thunks/SingapureThunk';
interface Product {
  id : string,
  category_name : string,
}
interface FormData {
    id : string,
    currency :string,
    deliver_status: string
    payment_slip_image: any
}
  interface CartItem {
      id: string;
      count: number;
      price: number;
    }
interface productData {
    product_name :string,
    product_code : string
}

function ReorderPage(props: any) {
  const UserDetailData = props;
    const { categoryData ,productData  } = useSelector((state: RootState) => state.categorylist);
const comboRetailProduct= productData && productData
  ? productData.map((item: any) => ( item.product_code ? "product" : "combo_product"
    ))
  : [];
    const [ewalletData , setEwalletData] = useState<any>('');
    const totalBalanceOfEWallet = (Number(ewalletData.balance_rc || 0) + Number(ewalletData.balance_sp || 0)).toFixed(2);
    const [formData , setFormData] = useState<FormData>({
        id: '',
        currency : "",
        deliver_status: 'self_collect',
        payment_slip_image : null,
    });
    const dispatch = useDispatch<any>();
      const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState<any>('');
    const [stripShow , setSripShow]= useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productData);
    const [customerRankID, setCustomerRankID] = useState<any>(null);
    const [eWallerPPText ,setEWalletPPText] = useState<any>();
    const [eWallerRPText ,setEWalletRPText] = useState<any>();
    const [isOpen, setIsOpen] = useState<any>(null);
    const [disable , setDisable] = useState<any>(false);
     const [cart, setCart] = useState<{ [productId: string]: CartItem }>(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
   });
const [deliverCharge , setDeliveryCharge ] = useState<any>('');
const [minDeliverCharge , setMinDeliveryCharge ] = useState<any>('');
   useEffect(()=>{
    if(UserDetailData?.UserDetailData.delivery_charge_per_order){
      setMinDeliveryCharge(UserDetailData?.UserDetailData.min_amount_to_avoid_delivery_charge)
    }
   },[]);
  
  
    useEffect(()=>{
        dispatch(fetchCategoryList())
    },[dispatch])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
    };

    useEffect(() => {
      if (searchTerm === '') {
        setFilteredProducts(productData);
      } else {
        const filtered = productData.filter((product :productData) =>
          product.product_code.toLowerCase().includes(searchTerm) || 
          product.product_name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
      }
    }, [searchTerm, productData]);

     
        useEffect(() => {
                 const BizPathdata = sessionStorage.getItem("user");
                 if (BizPathdata) {
                     const parsedData = JSON.parse(BizPathdata);
                   setCustomerRankID(parsedData.rank)
                 }
       }, []);
       const comboRetailPrices = productData?.map((item: any) => 
        customerRankID === '1' && item.product_retail_price ? "retail_price" : "associate_price"
      ) || [];
    const updateCart = async (productId: string, price: number, delta: number) => {
      setCart((prevCart) => {
        const existingItem = prevCart[productId] || { count: 0, price: 0 };
        const newCount = existingItem.count + delta;
    
        if (newCount < 0) return prevCart;
    
        const newItemPrice = price * newCount;
    
        const updatedCart = {
          ...prevCart,
          [productId]: {
            id: productId,
            count: newCount,
            price: newItemPrice,
          },
        };
    
        const newTotalPrice = Object.values(updatedCart).reduce(
          (total, item: any) => total + item.price,
          0
        );
        
      //  if(formData.deliver_status === "delivery"){
      //   calculateDeliveryCharge(newTotalPrice ,formData.deliver_status);
      //  }else{
      //   setTotalPrice(Number(newTotalPrice));
      //  }

         setTotalPrice(Number(newTotalPrice));
        if (formData.currency === 'e-wallet') {
          updateEwalletData(newTotalPrice);
        }

        return updatedCart;
      });
    };

        const onHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedId = e.target.value;
          
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: selectedId 
            }));
    
            if (selectedId) {
                dispatch(fetchCategoryListtable(parseInt(selectedId)));
            }
        };

        const UserProductDataa = {
          action : "walletInfo",
          userid : "",
          }

        const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            
            setFormData((prev) => ({
              ...prev,
              [name]: value,  
            }));

            if (value) {
                dispatch(fetchPaymentBy(value));  
            }
            // if (name === "deliver_status") {
            //   calculateDeliveryCharge(totalPrice, value); // Pass the new value (delivery or self-collect)
            // }

            if (name === 'currency') {
              if (value === 'e-wallet') {
                await updateEwalletData(totalPrice);
              }
              setFormData((prev) => ({ ...prev, [name]: value }));
          }
        };    

        const calculateDeliveryCharge = (totalPrice: number, deliverStatus: string) => {
          const deliveryCharge = Number(UserDetailData?.UserDetailData.delivery_charge_per_order) || 0;
          const newTotalPrice = Number(totalPrice);
          const minCharge = Number(minDeliverCharge);
        
          if (deliverStatus === "delivery") {
            if (newTotalPrice === 0) {
              setTotalPrice(deliveryCharge);
              setDeliveryCharge(deliveryCharge);
            } else if (newTotalPrice < minCharge) {
              setTotalPrice(newTotalPrice + deliveryCharge);
              setDeliveryCharge(deliveryCharge);
            } else {
              setTotalPrice(newTotalPrice);
              setDeliveryCharge(0);
            }
          } else if (deliverStatus === "self_collect") {
        
            if (newTotalPrice === deliveryCharge) {
              setTotalPrice(0);
              setDeliveryCharge(0);
            } else if (newTotalPrice > 0 && deliveryCharge > 0) {
              const updatedTotalPrice = newTotalPrice - deliveryCharge;
              setTotalPrice(updatedTotalPrice > 0 ? updatedTotalPrice : 0);
              setDeliveryCharge(0);
            } else {
              setTotalPrice(newTotalPrice);
              setDeliveryCharge(0);
            }
          }
        };
        
        const updateEwalletData = async (newTotalPrice :any) => {
          const ewalletDataValue = await dispatch(fetchProductList(UserProductDataa));
          const ValuOfBalance = ewalletDataValue.data;

          setEwalletData(ValuOfBalance);
          const currentTotalRcSp =
          ValuOfBalance.currency.trim() !== 'USD'
          ? ValuOfBalance.deposite_rate * ValuOfBalance.balance_rc +
            ValuOfBalance.deposite_rate * ValuOfBalance.balance_sp
          : ValuOfBalance.balance_rc + ValuOfBalance.balance_sp;
          const remainingPrice =  newTotalPrice - currentTotalRcSp;
          const formattedRemainingPrice = (Math.round(remainingPrice * 100) / 100).toFixed(2);
          
            if(ValuOfBalance.currency !== 'USD'){
              const depositeRate = ValuOfBalance?.deposite_rate || 0; 
              const formattedValue = parseFloat(depositeRate).toFixed(2);
              setEWalletPPText(`- PP converted to ${ValuOfBalance.currency} base on (${(formattedValue)})`)
              setEWalletRPText(`- RP converted to ${ValuOfBalance.currency} base on (${(formattedValue)})`)

            }
          if (  parseFloat(ValuOfBalance.balance_rc) === 0 && ValuOfBalance.balance_sp === 0) {
            toast.error(ValuOfBalance.message);
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
         
          if(currentTotalRcSp < newTotalPrice ){
            setSripShow(true);
          }else{
            setSripShow(false);
          }
        };

        const handleUploadImage = async (event: any) => {
          const file = event.target.files[0];
          if (!file) return;
        
          const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          const validExtensions = ['jpg', 'jpeg', 'png']; 
          const fileExtension = file.name.split('.').pop().toLowerCase();
        
          // Check if the file is a valid image type and extension
          if (!validImageTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
            toast.error('Please upload a valid image file (jpg, jpeg, png).');
            return;
          }
        
          const options = {
            maxSizeMB: 1, // Max size in MB (adjust as needed)
            maxWidthOrHeight: 1920, // Max dimensions
            useWebWorker: true,
          };

          try {
            // Compress the image
            const compressedFile = await imageCompression(file, options);
            // Convert the compressed image to a Base64 string
            const base64String = await convertBase64(compressedFile);
            const baseImage = `data:${compressedFile.type};base64,${base64String}`;
        
            // Prepare the form data
            const formData = new FormData();
            formData.append('file', compressedFile); // Compressed file
            formData.append('base64Image', baseImage); // Base64 string
            setFormData((prev) => ({
              ...prev,
              payment_slip_image: baseImage, 
            }));
            setError((prev) => ({
              ...prev,
              currency: '', 
            }));
          } catch (error) {
            console.error('Error compressing the image:', error);
            toast.error('Failed to upload the image.');
          }
        };
        
        // Function to convert a file to a Base64 string
        const convertBase64 = (file: any): Promise<string> => {
          return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              // Extract the Base64 string without the metadata prefix
              const result = fileReader.result as string;
              const base64String = result.split(',')[1];
              resolve(base64String);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
        };

  useEffect(() => {
    sessionStorage.removeItem('cart');
  }, [cart, totalPrice]);

  const validationErrors = () => {
    const newErrors: any = {};
    if (!formData.currency) {
        newErrors.currency = "Currency field is required";
    }
    if (formData.currency === 'upload_payment_slip' && !formData.payment_slip_image) {
      newErrors.currency = "Please select an image";
    }
    if (formData.currency === 'e-wallet' && !stripShow) {
      if (totalPrice > totalBalanceOfEWallet) {
        newErrors.test = "Total price cannot be less than the balance!";
        toast.error("Total price cannot be less than the balance!");
      }
    } 
    if (!formData.deliver_status) {
      newErrors.deliver_status = 'Deliver Status field is required';
    }
    return newErrors;
  }

  const [error, setError] = useState<{ [key: string]: string }>({});

  const products_data = Object.values(cart)
  .filter(item => item.count > 0) 
  .map(item => ({
    id: item.id,
    count: item.count
  }));
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
      const fetchData = async () => {
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
    
          try {
            const availableCountry = await dispatch(fetchSingapure(parsedData.userid));
          } catch (error) {
            console.error("Error fetching country data:", error);
          }
        }
      };
    
      fetchData();
    }, []);
    


  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    setDisable(true);
    const isValid = validateFormBiz();
          if (!isValid) {
            toast.error("Please fill up all info under Settings - My Profile before any purchases.");
            setDisable(false);
         return;
    }

    const errors = validationErrors();
    
      const data = {
        "category_name" : formData.id,
        "products_data" : products_data,
        "payment_type" : formData.currency,
        "deliver_status": formData.deliver_status,
        "payment_slip_image":formData.payment_slip_image
      }  
      if (products_data.length === 0) {
        toast.error( "Please select at least one product.")
        setDisable(false);
      }else{
          if (Object.keys(errors).length === 0 ) {
              
              if(formData.currency === "credit_card" || formData.currency === "e-wallet" ){
                            sessionStorage.setItem("reorderpaymentData" ,JSON.stringify(data));
                            const creditcardData = {
                                "payment_type":formData.currency,
                                "amount_type" : comboRetailPrices[0], 
                                "product_type" : comboRetailProduct[0], 
                                "products_data" :products_data,
                                "deliver_status" : formData.deliver_status,
                                "success_url" :`${LIVE_URL}/reorder-payment`,
                                "cancel_url":`${LIVE_URL}/reorder`
                            }
                            const availableUrl = await dispatch(fetchPaymentLink(creditcardData));
                            if (availableUrl?.url) {
                                let storedData = JSON.parse(sessionStorage.getItem("reorderpaymentData") || "{}");
                                storedData.payment_type = availableUrl?.paymentType || storedData.payment_type;
                                sessionStorage.setItem("reorderpaymentData", JSON.stringify(storedData));
                                window.location.href = availableUrl.url;
                            } else {
                                toast.error("Invalid URL received:", availableUrl);}
                            }else{
                              const formDataToSend = {
                                ...data,
                              };
                                   const res =  await dispatch(fetchReorderPost(formDataToSend));
                                   if(res.data.success === true){
                                       toast.success(res.data.message)
                                       sessionStorage.removeItem('cart')
                                       sessionStorage.removeItem('totalPrice')   
                                       setFormData({
                                        id: '',
                                        currency : "",
                                        deliver_status:'self_collect',
                                        payment_slip_image: null
                                       });
                                        navigate('/successfully' , {state : { message: res.data.message } } );
                                        setDisable(false);
                                    }else{
                                       toast.error(res.data.message)
                                       setDisable(false);
                                   }
                            }
          } else {
            setError(errors)
            setDisable(false);
          }
      }
      };

  return (
    <>
      <Layout>
       <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
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
                            <h3 className="text-lg font-medium">Reorder/Maintenance</h3>
                        </div>
        </div>
       </header>
       <ToastContainer/>
        <section className="py-20">
                    <div className="container">
                 <form onSubmit={handleSubmit}>
                    <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white mb-7">
                    <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">Category</label>
                    <select
                        name="id"
                        className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                        value={formData.id}
                        onChange={onHandleChange}
                    >
                        <option value="">Select Category</option>
                        {categoryData && categoryData.map((item: Product) => (
                        <option key={item.id} value={item.id}>
                            {item.category_name}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">Search By(Product Code/Number)</label>
                    <input
                        type="text"
                        name="search"
                        placeholder="Enter Product Code/Number)"
                        className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                        onChange={handleSearch}
                    />
                    </div>
                    <div className="relative overflow-x-auto mt-5 border rounded-md mb-4">
                    <table  id="example" className="display table-auto w-full text-sm text-left rtl:text-right text-black  ">
                        <thead className="text-xs text-white uppercase bg-[#178285]">
                            <tr>
                                <th className="px-6 py-3">
                                Images
                                </th>
                                <th className="px-6 py-3">
                                        Code
                                </th>
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
                    {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map((item: any, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                                      
                                <td className="px-6 py-3">
                                    <img src={item.image} alt="" className='w-[40px] h-[40px] rounded-full cursor-pointer' onClick={() => setIsOpen(item.image)} />
                                    {isOpen && (
                                                                    <>
                                                                    <div className="fixed inset-0 bg-black opacity-5 z-10"></div>
                                                                    <div className="fixed inset-0 z-20 flex items-center justify-center">
                                                                        <section className="flex items-center justify-center relative">
                                                                        <button
                                                                            className="absolute top-[-2px] right-[-2px] z-30 text-white"
                                                                            onClick={() => setIsOpen(null)}
                                                                        >
                                                                            <IoIosCloseCircle className="text-3xl text-white cursor-pointer" />
                                                                        </button>
                                                                        <img
                                                                            src={isOpen}
                                                                            alt="Enlarged"
                                                                            className="max-w-[90vw] max-h-[80vh] rounded-2xl"
                                                                        />
                                                                        </section>
                                                                    </div>
                                                                    </>
                                                                )}
                                </td>
                                <td className="px-6 py-3">
                                    {item.product_code}
                                </td>
                                <td className="px-6 py-3 text-center">
                                       {item.product_name}
                                </td>
                                <td className="px-6 py-3">
                                  { customerRankID === '1' ? item.product_retail_price :  item.product_associate_price}
                                </td>
                                <td className="px-6 py-3">
                                     {item.product_lp}
                                </td>
                                <td className="px-6 py-3">
                                <div className="flex gap-2 items-center">
                                <HiOutlineMinusSmall
                                 onClick={() => updateCart(item.id, customerRankID === '1' ? item.product_retail_price : item.product_associate_price, -1)}
                                  className={`cursor-pointer ${cart[item.id]?.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                <BsCart /> {cart[item.id]?.count || 0}
                                <HiOutlinePlusSmall
                                 onClick={() => updateCart(item.id, customerRankID === '1' ? item.product_retail_price : item.product_associate_price, 1)}
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
                    <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-black text-[14px] font-semibold">Total Amount : </h3>
                    <h4 className="text-black text-[14px] font-normal">
                        ${Number(totalPrice || 0).toFixed(2)}
                      </h4>
                    </div>
                    {deliverCharge ? <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-black text-[14px] font-semibold">Delivery Charge : </h3>
                    <h4 className="text-black text-[14px] font-normal">
                        ${Number(deliverCharge || 0).toFixed(2)}
                      </h4>
                    </div> : ""}
                    
                    </div>
                    <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white">
                    <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">Payment By</label>
                    <select
                        name="currency"
                        className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                        value={formData.currency} 
                        onChange={handleChange} >
                        <option value="">Select</option>
                        <option value="credit_card">CREDIT CARD</option>
                        <option value="e-wallet">E-Wallet</option>
                        <option value="PP2">Old Purchase Point</option>
                        <option value="upload_payment_slip">Upload Payment Slip</option>
                        {/* <option value="RC">PP</option>
                        <option value="PP2">PP2</option>
                        <option value="SP">SP</option> */}
                    </select>
                    {  formData.currency === 'e-wallet' ? (
                                    <>
                                    <div className="mt-3">
                                   {eWallerPPText && <p className='text-sm'>{eWallerPPText}</p>} 
                                    <div className='flex gap-5 items-center '>
                                        <label className='text-[#1e293b] text-[14px]'>PP</label>
                                         <input type="text"  className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300' value={ewalletData.balance_rc > 0 ?  parseFloat(ewalletData.balance_rc).toFixed(2) : 0} readOnly/>
                                    </div>
                                    </div>
                                    <div className="mt-3">
                                 {eWallerRPText &&  <p className='text-sm'>{eWallerRPText}</p>}  
                                    <div className='flex gap-5 items-center'>
                                        <label className='text-[#1e293b] text-[14px]'>RP</label>
                                         <input type="text"  className='mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black  bg-gray-300' value={ewalletData.balance_sp > 0 ? parseFloat(ewalletData.balance_sp).toFixed(2) : 0 } readOnly/>
                                    </div>
                                    </div>
                                    </>
                                ) : ''
                             }
                            { formData.currency === 'e-wallet' ? <input
                          type="text"
                          placeholder="balance"
                                  className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-200"
                          value={(Number(ewalletData.balance_rc || 0) + Number(ewalletData.balance_sp || 0)).toFixed(2)}
                          readOnly
                        /> : ""}
                        {
                          formData.currency === 'upload_payment_slip' ? (
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png" 
                              className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300"
                              onChange={handleUploadImage}
                              name='payment_slip_image'
                            />
                          ) : (
                            ''
                          )
                        }
                   {error?.currency && <p className="text-red-500 text-xs mt-2">{error.currency}</p>}

                    </div>
                    <div className="mb-3">
                <label className="text-[#1e293b] text-[14px] mb-1">Deliver Status</label>
                <div className={` mt-3 flex gap-20 justify-around `}>
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
                    </div>
                 </form>
                    </div>
        </section>
      </Layout>
    </>
  )
}

export default ReorderPage
