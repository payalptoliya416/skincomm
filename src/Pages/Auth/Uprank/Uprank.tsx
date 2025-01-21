import React, { ChangeEvent, useEffect, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchUprankGet } from '../../../Redux/thunks/UpRankGetThunk';
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from 'react-icons/hi2';
import { BsCart } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { fetchPaymentBy } from '../../../Redux/thunks/PaymentByThunk';
import { fetchProductList } from '../../../Redux/thunks/productListReducer';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { fetchUpRankPost } from '../../../Redux/thunks/UpRankPostThunk';

interface FormData {
    id : string,
    currency :string,
    deliver_status: string
}
interface CartItem {
    id: string;
    count: number;
    price: number;
  }
function Uprank() {
    const stripe = useStripe(); 
    const elements = useElements();
    const dispatch = useDispatch<any>();
    const { UprankGetData } = useSelector((state: RootState) => state.uprankGetData);
    const currentRank = UprankGetData?.current_rank_id;
    const [formData , setFormData] = useState<FormData>({
            id: '',
            currency : "",
            deliver_status: 'self_collect'
        });
        const navigate = useNavigate();
            const [totalPrice, setTotalPrice] = useState<any>('');
            const [stripShow , setSripShow]= useState(false);
             const [cart, setCart] = useState<{ [productId: string]: CartItem }>(() => {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : {};
          });
        const [bizData, setBizData] = useState<any>({});
        const [eWallerPPText ,setEWalletPPText] = useState<any>();
        const [eWallerRPText ,setEWalletRPText] = useState<any>();
        const [eWallerCreditText ,setEWalletCreditText] = useState<any>();
        const [ewalletData , setEwalletData] = useState<any>('');
        const [error,setError]= useState<any>();
        const [maxLP ,setMaxLP] = useState<any>(0);
        const [joinDate, setJoinDate] = useState<string>(""); 
        const [ninetiethDay, setNinetiethDay] = useState<string>("");
        const [timer, setTimer] = useState<string>("");
         const [expiredTime ,setExpiredTime] = useState<any>("");
          const [totalLP ,setTotalLP] = useState<any>("");
          const [nextRank ,setNextRank]  = useState<any>(null);
          const [nextError,setNextError] = useState<any>('');

    useEffect(()=>{
        dispatch(fetchUprankGet());
    },[]);

    const NextRankFun = (newTotalPrice : any) => {
      const matchedRank = UprankGetData.rank_data.find(
        (rank: any) => newTotalPrice >= rank.min_lp && newTotalPrice <= rank.max_lp 
      );
    
      if (matchedRank) {
        setNextRank(matchedRank);  
        setNextError(""); 
      } else {
        setNextRank(null); 
        setNextError("NOT AVAILABLE");
      }
    };
    
    const updateCart = async (productId: string, price: number, delta: number ,combo_product_lp: any) => {
        
        setMaxLP((prev: any) => {
            const existingItem = prev[productId] || { count: 0, price: 0 };
            const newCount = existingItem.count + delta;
        
            if (newCount < 0) return prev;
        
            const newComboPrice = combo_product_lp * newCount;
            const updatedLPcard = {
              ...prev,
              [productId]: {
                  ...existingItem,
                  count: newCount,
                  price: newComboPrice,
              },
          };
          const newTotalPrice = Object.values(updatedLPcard).reduce(
              (total, item: any) => total + item.price,
              0
          );
         NextRankFun(newTotalPrice);
         setTotalLP(newTotalPrice);
      
          return updatedLPcard;
        });

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
          setTotalPrice(newTotalPrice);
          
          if (formData.currency === 'e-wallet') {
            updateEwalletData(newTotalPrice);
          }
  
          return updatedCart;
        });
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
    
                if (name === 'currency') {
                  if (value === 'e-wallet') {
                    await updateEwalletData(totalPrice);
                  }

                  setFormData((prev) => ({ ...prev, [name]: value }));
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
    
                  setEWalletCreditText(`- Amount Payable: ${ValuOfBalance.currency } ${ formattedRemainingPrice}`)
                }
              if (ValuOfBalance.balance_rc === 0 && ValuOfBalance.balance_sp === 0) {
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
      const availableTotalBalance =  (Number(ewalletData.balance_rc || 0) + Number(ewalletData.balance_sp || 0));
      useEffect(() => {
        localStorage.removeItem('cart');
      }, [cart, totalPrice]);

      const validationErrors = () => {
        const newErrors: any = {};
        if (!formData.currency) {
            newErrors.currency = "Currency field is required";
        }
          if (formData.currency === 'e-wallet' && !stripShow) {
              if (totalPrice > availableTotalBalance) {
                newErrors.test = "Total price cannot be less than the balance!";
                toast.error("Total price cannot be less than the balance!");
              }
            } 
        if (!formData.deliver_status) {
          newErrors.deliver_status = 'Deliver Status field is required';
        }
        return newErrors;
      }
  
     const products_data = Object.values(cart)
      .filter(item => item.count > 0) 
      .map(item => ({
        id: item.id,
        count: item.count
      }));

      useEffect(() => {
          if (joinDate) {
              const joinDateObj = new Date(joinDate);
              const ninetiethDayObj = new Date(joinDateObj);
              ninetiethDayObj.setDate(joinDateObj.getDate() + 90);
  
              const formatDate = (date: Date) =>
                  new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                  }).format(date);
  
              setNinetiethDay(formatDate(ninetiethDayObj));
  
              const interval = setInterval(() => {
                  const now = new Date();
                  const difference = ninetiethDayObj.getTime() - now.getTime(); // Difference in milliseconds
  
                  if (difference > 0) {
                      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                      const hours = Math.floor(
                          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                      );
                      const minutes = Math.floor(
                          (difference % (1000 * 60 * 60)) / (1000 * 60)
                      );
                      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
                      setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                  } else {
                    setExpiredTime(`Till  ${ninetiethDay} You can access the uprank function`);
                      clearInterval(interval);
                  }
              }, 1000);
  
              return () => clearInterval(interval); 
          }
      }, [joinDate]);
  
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
              
              setJoinDate(parsedData.join_date);
              setBizData({
                dob: parsedData.dob,
                mobile: parsedData.mobile,
                address: parsedData.address,
                zip: parsedData.zip,
                email: parsedData.email,
              });
            }
          }, []);
          
          const rankValidation = () => {
      
            const numericCurrentRank = Number(currentRank);
            const maxLPitems = Object.values(maxLP);
            const maximumTotalLP = maxLPitems.reduce((total: number, item: any) => total + item.price, 0);
            const matchingItem = UprankGetData.rank_data.find((i: any) => i.rank_id === numericCurrentRank);

             if(currentRank > 3 ){
            toast.error(`You cannot Up Rank anymore`);
             }else if (matchingItem) {
              if (matchingItem.max_lp > maximumTotalLP) {
                toast.error(`max_lp should be greater than current LP : ${matchingItem.max_lp}`);
                return false; 
              }
            } else {
              toast.error("You Cannot UpRank");
              return false; 
            }
          
            return true; 
          };
          
            const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=> {
              e.preventDefault();
              // const isValid = validateFormBiz();
              //       if (!isValid) {
              //       toast.error("Please fill up all info under Settings - My Profile before any purchases.");
              //      return;
              // }
              const data = {
                "package_ids": products_data,
                  "payment_type" : formData.currency,
                  "deliver_status": formData.deliver_status
                }  

                if (products_data.length === 0) {
                    toast.error("Please select at least one product.");
                    return;
                  }
                
                  const isRankValid = rankValidation();
                  if (!isRankValid) {
                    return; 
                  }

              const errors = validationErrors();

                    if (Object.keys(errors).length === 0 ) {
                        
                      if (!stripe || !elements) {
                        toast.error("Stripe or Elements not initialized."); 
                        return;
                      }
                      let paymentMethodId = null;
                      if (formData.currency === "credit_card" ||  (formData.currency === "e-wallet" && stripShow)) {
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
                        ...data,
                        stripeToken: paymentMethodId || "", 
                      };
                           const res =  await dispatch(fetchUpRankPost(formDataToSend));
                           if(res.data.success === true){
                               toast.success(res.data.message)
                               localStorage.removeItem('cart')
                               localStorage.removeItem('totalPrice')   
                               setFormData({
                                id: '',
                                currency : "",
                                deliver_status:'self_collect'
                               })
                               navigate('/successfully');
                            }else{
                               toast.error(res.data.message)
                           }
                    } else {
                      setError(errors)
                    }
                
            }
        
  return (
    <>
      <Layout>
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
                            <h3 className="text-lg font-medium">UpRank</h3>
                        </div>
        </div>
       </header>
       <ToastContainer/>
       <section className="py-20">
       <div className="container">
       {expiredTime &&  <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white mb-7">
        <h3 className='text-center text-red-500'>{expiredTime}</h3>
        </div> }
           <form onSubmit={handleSubmit}>
          <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white mb-7">
            
          {joinDate && (
           <>
           <div className="flex justify-center items-center flex-wrap gap-3">
              <h3><span className='font-semibold'>Expire</span> : {new Intl.DateTimeFormat("en-US", {
                           day: "2-digit",
                           month: "short",
                           year: "numeric", 
                       }).format(new Date(joinDate))} - {ninetiethDay} </h3>
                       <h3 ><span className='font-semibold'>Remaining</span > : {timer}</h3>
           </div>
           </>
         )}
            <div className="relative overflow-x-auto mt-5 border rounded-md mb-4">
                 <table  id="example" className="display table-auto w-full text-sm text-left rtl:text-right text-black  ">
                                   <thead className="text-xs text-white uppercase bg-[#178285]">
                                       <tr>
                                           <th className="px-6 py-3">
                                                   Code
                                           </th>
                                           <th className="px-6 py-3 text-center">
                                           Name
                                           </th>
                                           <th className="px-6 py-3">
                                           Retail Price
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
                                   {UprankGetData && UprankGetData.packages && UprankGetData.packages.length > 0 ? (
                                 UprankGetData.packages.map((item: any, index: number) => (
                                           <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                                                 
                                           <td className="px-6 py-3">
                                               {item.combo_product_code}
                                           </td>
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
                                             onClick={() => updateCart(item.id, item.combo_product_retail_price, -1 ,item.combo_product_lp)}
                                             className={`cursor-pointer ${cart[item.id]?.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                           />
                                           <BsCart /> 
                                           {cart[item.id]?.count || 0}
                                           <HiOutlinePlusSmall
                                             onClick={() => updateCart(item.id, item.combo_product_retail_price, 1 ,item.combo_product_lp)}
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
                               <h3 className="text-black text-[14px] font-semibold">Current Rank : </h3>
                               <h4 className="text-black text-[14px] font-normal">{UprankGetData && UprankGetData?.current_rank_id} , {UprankGetData && UprankGetData?.current_rank}</h4>
                       </div>
                       <div className="mb-3 flex items-center gap-2">
                               <h3 className="text-black text-[14px] font-semibold">Total LP : </h3>
                               <h4 className="text-black text-[14px] font-normal">${totalLP || 0}</h4>
                       </div>
                       <div className="mb-3 flex items-center gap-2">
                               <h3 className="text-black text-[14px] font-semibold">Total Amount : </h3>
                               <h4 className="text-black text-[14px] font-normal">${totalPrice || 0}</h4>
                       </div>
                       <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-black text-[14px] font-semibold">Next Rank :</h3>
                      {nextRank ? (
                          <h4 className="text-black text-[14px] font-normal">
                            {`${nextRank.rank_id}, ${nextRank.name}`}
                          </h4>
                        ) : nextError ? (
                          <h4 className="text-red-400 text-[14px] font-normal">
                            {nextError}
                          </h4>
                        ) : (
                          <h4 className="text-red-400 text-[14px] font-normal">
                            NOT AVAILABLE
                          </h4>
                        )}
                    </div>
                   </div>
                   <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white">
                               <div className="mb-3">
                               <label className="text-[#1e293b] text-[14px]">Payment By</label>
                               <select
                                   name="currency"
                                   className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                                   value={formData.currency}
                                   onChange={handleChange}
                               >
                                   <option value="">Select</option>
                                   <option value="credit_card">CREDIT CARD</option>
                                   <option value="e-wallet">E-Wallet</option>
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
                                   {formData.currency === "credit_card" && (
                                           <div className="mt-4">
                                           <CardElement className="border py-2 px-3 rounded-md" options={{ hidePostalCode: true }} />
                                           </div>
                                       )} 
                                       {
                                           formData.currency === 'e-wallet' && stripShow? (
                                               <div className="mt-4">
                                           {eWallerCreditText &&  <p className='text-sm mb-1'>{eWallerCreditText}</p>}   
                                               <CardElement className="border py-2 px-3 rounded-md" options={{ hidePostalCode: true }} />
                                               </div>
                                           ) : ""
                                       }
                                   {error && <p className='text-red-500 text-xs mt-2'>{error.currency}</p>}
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
                               <div className="mb-3 text-end">
                               <button className='py-2 px-3 rounded-md bg-[#178285] text-white text-sm' type='submit'>Submit</button>
                               </div>
                   </div>
            </form>
                </div>
                </section>
       </Layout>
    </>
  )
}

export default Uprank
