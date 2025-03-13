import React, { ChangeEvent, useEffect, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchUprankGet } from '../../../Redux/thunks/UpRankGetThunk';
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from 'react-icons/hi2';
import { BsCart } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { fetchProductList } from '../../../Redux/thunks/productListReducer';
import { fetchUpRankPost } from '../../../Redux/thunks/UpRankPostThunk';
import { fetchPaymentLink } from '../../../Redux/thunks/PaymentLinkThunk';
import { LIVE_URL } from '../../../Utilities/config';

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
    const dispatch = useDispatch<any>();
    const { UprankGetData } = useSelector((state: RootState) => state.uprankGetData);
    const comboRetailPrices = UprankGetData && UprankGetData.packages
  ? UprankGetData.packages.map((item: any) => (item.combo_product_retail_price ? "retail_price" : "associate_price"
    ))
  : [];
const comboRetailProduct= UprankGetData && UprankGetData.packages
  ? UprankGetData.packages.map((item: any) => ( item.combo_product_code ? "combo_product" : "product"
    ))
  : [];
    const currentRank = UprankGetData?.current_rank_id;
    const [formData , setFormData] = useState<FormData>({
            id: '',
            currency : "",
            deliver_status: 'self_collect'
        });
            const [totalPrice, setTotalPrice] = useState<any>('');
            const [stripShow , setSripShow]= useState(false);
             const [cart, setCart] = useState<{ [productId: string]: CartItem }>(() => {
            const savedCart = sessionStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : {};
          });
        const [eWallerPPText ,setEWalletPPText] = useState<any>();
        const [eWallerRPText ,setEWalletRPText] = useState<any>();
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
        sessionStorage.removeItem('cart');
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

          useEffect(() => {
            const BizPathdata = sessionStorage.getItem("user");
           
            if (BizPathdata) {
              const parsedData = JSON.parse(BizPathdata);
              setJoinDate(parsedData.join_date);
            }
          }, []);
          
          // const rankValidation = () => {
      
          //   const numericCurrentRank = Number(currentRank);
          //   const maxLPitems = Object.values(maxLP);
          //   const maximumTotalLP = maxLPitems.reduce((total: number, item: any) => total + item.price, 0);
          //   const matchingItem = UprankGetData.rank_data.find((i: any) => i.rank_id === numericCurrentRank);

          //    if(currentRank > 3 ){
          //   toast.error(`You cannot Up Rank anymore`);
          //    }else if (matchingItem) {
          //     if (matchingItem.max_lp > maximumTotalLP) {
          //       toast.error(`max_lp should be greater than current LP : ${matchingItem.max_lp}`);
          //       return false; 
          //     }
          //   } else {
          //     toast.error("You Cannot UpRank");
          //     return false; 
          //   }
          
          //   return true; 
          // };
          const rankValidation = () => {
            const numericCurrentRank = Number(currentRank);
            const maxLPitems = Object.values(maxLP);
            const maximumTotalLP = maxLPitems.reduce((total: number, item: any) => total + item.price, 0);
            const matchingItem = UprankGetData.rank_data.find((i: any) => i.rank_id === numericCurrentRank);
            if (currentRank > 3) {
              toast.error("You cannot Up Rank anymore");
              return false; 
            } 
            
            if (matchingItem) {
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
           const [disable , setDisable]= useState(false);
            // const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=> {
            //   e.preventDefault();
            //    setDisable(true);
              
            //   const data = {
            //     "package_ids": products_data,
            //       "payment_type" : formData.currency,
            //       "deliver_status": formData.deliver_status
            //     }  

            //     if (products_data.length === 0) {
            //         toast.error("Please select at least one product.");
            //         setDisable(false);
            //         return;
            //       }
                
            //       const isRankValid = rankValidation();
            //       if (!isRankValid) {
            //         setDisable(false);
            //         return; 
            //       }

            //   const errors = validationErrors();
            //         if (Object.keys(errors).length === 0 ) {
                        
            //           if (!stripe || !elements) {
            //             toast.error("Stripe or Elements not initialized."); 
            //             setDisable(false);
            //             return;
            //           }
            //           if(formData.currency === "credit_card" || formData.currency === "e-wallet" ){
            //                           sessionStorage.setItem("uprankCredit" ,JSON.stringify(formData));
            //                           const creditcardData = {
            //                               "payment_type":formData.currency,
            //                               "amount_type" : comboRetailPrices[0], 
            //                               "product_type" : comboRetailProduct[0], 
            //                               "products_data" :products_data,
            //                               "deliver_status" : formData.deliver_status,
            //                               "success_url" :`${LIVE_URL}/uprank-payment`,
            //                               "cancel_url":`${LIVE_URL}/uprank`
            //                           }
            //                           const availableUrl = await dispatch(fetchPaymentLink(creditcardData));
            //                           if (availableUrl?.url) {
            //                               let storedData = JSON.parse(sessionStorage.getItem("uprankCredit") || "{}");
            //                               storedData.payment_type = availableUrl?.paymentType || storedData.payment_type;
            //                               sessionStorage.setItem("uprankCredit", JSON.stringify(storedData));
            //                               window.location.href = availableUrl.url;
            //                           } else {
            //                               toast.error("Invalid URL received:", availableUrl);
            //                           }
                                      
            //           }else{
            //                            const formDataToSend = {
            //                              ...data,
            //                            };
            //                                 const res =  await dispatch(fetchUpRankPost(formDataToSend));
            //                                 if(res.data.success === true){
            //                                     toast.success(res.data.message)
            //                                     sessionStorage.removeItem('cart')
            //                                     sessionStorage.removeItem('totalPrice')   
            //                                     setFormData({
            //                                      id: '',
            //                                      currency : "",
            //                                      deliver_status:'self_collect'
            //                                     })
            //                                     navigate('/successfully', {state : { message: res.data.message } } );
            //                                     setDisable(false);
            //                                  }else{
            //                                     toast.error(res.data.message)
            //                                     setDisable(false); 
            //                                 }
            //           }
            //         } else {
            //           setError(errors)
            //           setDisable(false);
            //         }
                
            // }
            const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setDisable(true);
            
              if (!products_data.length) {
                toast.error("Please select at least one product.");
                setDisable(false);
                return;
              }
            
              if (!rankValidation()) { 
                setDisable(false); 
                return;
              }
            
              const errors = validationErrors();
              if (Object.keys(errors).length > 0) {
                setError(errors);
                setDisable(false);
                return;
              }

              const data = {
                package_ids: products_data,
                payment_type: formData.currency,
                deliver_status: formData.deliver_status,
              };
            
              try {
                sessionStorage.setItem("uprankCredit", JSON.stringify(data));
                const creditcardData = {
                  payment_type: formData.currency,
                  amount_type: comboRetailPrices[0],
                  product_type: comboRetailProduct[0],
                  products_data: products_data,
                  deliver_status: formData.deliver_status,
                  success_url: `${LIVE_URL}/uprank-payment`,
                  cancel_url: `${LIVE_URL}/uprank`,
                };
            
                try {
                  const availableUrl = await dispatch(fetchPaymentLink(creditcardData));
                  if (availableUrl?.url) {
                    const storedData = JSON.parse(sessionStorage.getItem("uprankCredit") || "{}");
                    storedData.payment_type = availableUrl?.paymentType || storedData.payment_type;
                    sessionStorage.setItem("uprankCredit", JSON.stringify(storedData));
                    window.location.href = availableUrl.url;
                  } else {
                    toast.error("Invalid URL received.");
                    setDisable(false);
                  }
                } catch (error) {
                  toast.error("Payment link request failed.");
                  setDisable(false);
                }
              } catch (error) {
                toast.error("An error occurred while processing your request.");
              }
            
              setDisable(false);
            };
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
                                   {/* {formData.currency === "credit_card" && (
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
                                       } */}
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

export default Uprank
