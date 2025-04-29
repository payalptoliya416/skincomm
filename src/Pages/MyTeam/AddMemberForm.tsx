import { useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../Redux/thunks/productListReducer";
import { useLocation } from "react-router-dom";
import { fetchUserDetailData } from "../../Redux/thunks/UserDetailsThunk";
import { fetchAddMember } from "../../Redux/thunks/AddMemberThunk";
import { fetchNumber } from "../../Redux/thunks/mobileNumThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSearchTeamData } from "../../Redux/thunks/teamSearchThunnk";
import { fetchProductPakageList } from "../../Redux/thunks/ProductPakageThunk";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { BsCart } from "react-icons/bs";
import imageCompression from "browser-image-compression";
import { IoIosCloseCircle } from "react-icons/io";
import { LIVE_URL } from "../../Utilities/config";
import { fetchPaymentLink } from "../../Redux/thunks/PaymentLinkThunk";
interface Product {
  combo_product_name: string;
  combo_product_lp: number;
  combo_product_retail_price: string;
  id: number;
  country_name: string;
}
interface FormData {
  sponsor: string;
  placement: string;
  matrix_side: string;
  account_type: number;
  f_name: string;
  e_mail: string;
  mobile: string;
  sponsor_type: number;
  products_data:  any[] | string;
  country: string;
  payment_type: string;
  deliver_status: string;
  payment_slip_image: any;
}

const AddMemberForm = () => {
  const location = useLocation();
  const { upline_id, col } = location.state || {};
  const [fName, setFName] = useState<any>([]);
  const [placementName, setplacementName] = useState<any>([]);
  const dispatch = useDispatch<any>();
  const { productListData } = useSelector((state: RootState) => state.product);
  const comboRetailPrices = productListData && productListData.products
  ? productListData.products.map((item: any) => (item.combo_product_retail_price ? "retail_price" : "associate_price"
    ))
  : [];
const comboRetailProduct= productListData && productListData.products
  ? productListData.products.map((item: any) => ( item.combo_product_code ? "combo_product" : "product"
    ))
  : [];
  const { UserDetailData } = useSelector(
    (state: RootState) => state.userDetail
  );
  const [ewalletData, setEwalletData] = useState<any>("");
  const [errors, setErrors] = useState<any>({});
  const [stripInput, setStripInput] = useState<any>(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countrysinga , setCountrySinga] = useState<any>(false);
  const [formData, setFormData] = useState<FormData>({
    sponsor: upline_id || "", 
    placement: upline_id || "",
    matrix_side: col || "",
    account_type: 0,
    f_name: "",
    e_mail: "",
    mobile: "",
    sponsor_type: 1,
    products_data: [],
    payment_type: "",
    country: "",
    deliver_status: "self_collect",
    payment_slip_image: null,
  });

  const UserProductData = {
    action: "GetProducts",
    userid: "",
  };
  useEffect(() => {
    const userdatad = {
      action: "checkuserdetail",
      userid: upline_id,
    };

    dispatch(fetchProductList(UserProductData));
    dispatch(fetchUserDetailData(userdatad));
  }, [dispatch]);


  const handleFnameSearch = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "sponsor") {
      try {
        const data = await dispatch(fetchSearchTeamData(value));
        if (data?.error) {
          setFName({ error: true, message: data.message });
        } else {
          setFName({ member: data.member });
        }
      } catch (error) {
        setFName({ error: true, message: "Error fetching sponsor data." });
        console.error("Error fetching sponsor data:", error);
      }
    }
  
    if (name === "placement") {
      try {
        const placementData = await dispatch(fetchSearchTeamData(value));
  
        if (placementData?.error) {
          setplacementName({ error: true, message: placementData.message });
        } else {
          setplacementName({ member: placementData.member });
        }
      } catch (error) {
        setplacementName({ error: true, message: "Error fetching placement data." });
        console.error("Error fetching placement data:", error);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchSearchTeamData(upline_id));
        setFName({ member: data.member });
        const placementName = await dispatch(fetchSearchTeamData(upline_id));
        setplacementName({ member: placementName.member });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const WlaletData = {
    action: "walletInfo",
    userid: "",
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "deliver_status") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "payment_type") {
      if (value === "credit_card") {
        if (UserDetailData.stripe === false) {
          toast.error("Admin Has Not Turned On Stripe Option");
        }
        if (UserDetailData.stripe_key === "") {
          toast.error("Admin Has Not Set Stripe Payment Option");
        }
      }
      if (!formData.products_data || formData.products_data.length === 0) {
        toast.error("Please select a package first.");
        return;
      }

      if (value === "e-wallet") {
        const ewalletDataValue = await dispatch(
          fetchProductPakageList(WlaletData)
        );
        const ValuOfBalance = ewalletDataValue.data;
        setEwalletData(ValuOfBalance);

        if (ValuOfBalance.balance_rc === 0 && ValuOfBalance.balance_sp === 0) {
          toast.error(ValuOfBalance.message);
          return;
        }

        if (ValuOfBalance.currency.trim() !== "USD") {
          const adjustedBalanceRc =
            ValuOfBalance.deposite_rate * ValuOfBalance.balance_rc;
          const adjustedBalanceSp =
            ValuOfBalance.deposite_rate * ValuOfBalance.balance_sp;
          setEwalletData({
            ...ValuOfBalance,
            balance_rc: adjustedBalanceRc || "",
            balance_sp: adjustedBalanceSp || "",
          });
        }
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if(name === "country" ){      
      const selectedCountry = productListData.countries.find((country: any) => Number(country.id) === Number(value));
      if (selectedCountry.country_name === "Singapore") {
        setCountrySinga(true)
      } else {
        setCountrySinga(false);
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    }else{
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateCart = async (
    productId: string,
    price: number,
    delta: number
  ) => {
    const ewalletDataValue = await dispatch(fetchProductPakageList(WlaletData));
    const ValuOfBalance = ewalletDataValue.data;
    setCart((prevCart) => {

      const currentCart = Array.isArray(prevCart) ? prevCart : [];
      const existingProductIndex = currentCart.findIndex((item) => item.id === productId);
    
      let updatedCart = [...currentCart];
      let newCount = 0;
      if (existingProductIndex !== -1) {
        newCount = currentCart[existingProductIndex].count + delta;
    
        if (newCount <= 0) {
          updatedCart.splice(existingProductIndex, 1);
        } else {
          updatedCart[existingProductIndex] = { ...currentCart[existingProductIndex], count: newCount };
        }
      } else {
        if (delta > 0) {
          updatedCart.push({ id: productId, count: delta, price: price }); 
          newCount = delta;
        } else {
          return currentCart;
        }
      }
    
      const total = updatedCart.reduce((acc, item) => acc + item.count * item.price, 0);
      setTotalPrice(total);
      const simplifiedCart = updatedCart.map((item) => ({ id: item.id, count: item.count }));
      const currentTotalRcSp =
        ValuOfBalance.currency.trim() !== "USD"
          ? ValuOfBalance.deposite_rate * ValuOfBalance.balance_rc +
            ValuOfBalance.deposite_rate * ValuOfBalance.balance_sp
          : ValuOfBalance.balance_rc + ValuOfBalance.balance_sp;
      if (currentTotalRcSp < total) {
        setStripInput(true);
      } else {
        setStripInput(false);
      }
      setFormData((prev: FormData) => ({
        ...prev,
        products_data: JSON.stringify(simplifiedCart),
      }));
      return updatedCart;
    });
  };

  const handleUploadImage = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const validExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the file is a valid image type and extension
    if (
      !validImageTypes.includes(file.type) ||
      !validExtensions.includes(fileExtension)
    ) {
      toast.error("Please upload a valid image file (jpg, jpeg, png).");
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
      formData.append("file", compressedFile); // Compressed file
      formData.append("base64Image", baseImage); // Base64 string
      setFormData((prev) => ({
        ...prev,
        payment_slip_image: baseImage,
      }));

      setErrors((prev : any) => ({
        ...prev,
        upload: "", // Clear the error
      }));
    } catch (error) {
      console.error("Error compressing the image:", error);
      toast.error("Failed to upload the image.");
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
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validateForm = () => {
    const newErrors: any = {};
   
      if (!formData.sponsor) newErrors.sponsor = "Sponsor ID is required";
      if (!formData.placement) newErrors.placement = "Placement ID is required";
      if (!formData.matrix_side)
        newErrors.matrix_side = "Matrix Side is required";
      if (!formData.f_name) newErrors.f_name = "Full Name is required";
      if (!formData.country) newErrors.country = "Country Name is required";
      if (!fName.member) newErrors.sponsor = `${fName.message}`;
      if (!placementName.member)
        newErrors.placement = `${placementName.message}`;
      if (!formData.e_mail || !/\S+@\S+\.\S+/.test(formData.e_mail))
        newErrors.e_mail = "Valid Email is required";
      if (!formData.mobile || formData.mobile.length < 8)
        newErrors.mobile = "Mobile number must be at least 8 digits long";
      if (!formData.products_data || formData.products_data.length === 0) {
        newErrors.products_data = "Package is required";
      }
      if (!formData.payment_type)
        newErrors.payment_type = "Payment Type is required";
      if (
        formData.payment_type === "upload_payment_slip" &&
        !formData.payment_slip_image
      ) {
        newErrors.upload = "Please select an image";
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
  const [disable, setDisable] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    const isValid = validateFormBiz();
    if (!isValid) {
      toast.error(
        "Please fill up all info under Settings - My Profile before any purchases"
      );
      setDisable(false);
      return;
    }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
     
    if(formData.payment_type === "credit_card" || formData.payment_type === "e-wallet" && stripInput || formData.payment_type === "e-wallet" ){
                sessionStorage.setItem("myTeamAddmemberCredit" ,JSON.stringify(formData));
                const mobileDetail = {
                  action: "checkuniquemobile",
                  phone_no: formData.mobile,
                  account: formData.account_type,
                  sponsor: "",
                };
   
           const response = await dispatch(fetchNumber(mobileDetail));
           const numberData = response.data;
           if (!numberData.success) {
            toast.error("Mobile validation failed, form submission aborted.");
            setDisable(false);
             return;
           }
                const creditcardData = {
                                    "payment_type":formData.payment_type,
                                    "amount_type" : comboRetailPrices[0], 
                                    "product_type" : comboRetailProduct[0], 
                                    "products_data" :formData.products_data,
                                    "deliver_status" : formData.deliver_status,
                                    "success_url" :`${LIVE_URL}/addmember-payment`,
                                    "cancel_url":`${LIVE_URL}/placement-tree`
                                }
                              
                const availableUrl = await dispatch(fetchPaymentLink(creditcardData));
                 if (availableUrl?.url) {
                        let storedData = JSON.parse(sessionStorage.getItem("myTeamAddmemberCredit") || "{}");
                       storedData.payment_type = availableUrl?.paymentType || storedData.payment_type;
                       sessionStorage.setItem("myTeamAddmemberCredit", JSON.stringify(storedData));
                        window.location.href = availableUrl.url;
                    } else {
                       toast.error("Invalid URL received:", availableUrl);
                    }
     }else{
       const formDataToSend = {
         ...formData
       };
     
         const mobileDetail = {
           action: "checkuniquemobile",
           phone_no: formData.mobile,
           account: formData.account_type,
           sponsor: "",
         };
  
         const response = await dispatch(fetchNumber(mobileDetail));
         const numberData = response.data;
         if (numberData.success) {
           const successData = await dispatch(fetchAddMember(formDataToSend));
        
           if (successData) {
            const successnavigate = successData.data.data;
          
            if (successnavigate.success === true) {
              toast.success(successnavigate.message || "Member added successfully!");
          
              if (formData.payment_type === "upload_payment_slip") {
                navigate("/successfully", { state: { message: successnavigate.message } });
              } else {
                navigate("/successfullyPayment", { state: { successnavigate } });
              }
          
              setDisable(false);
            } else if (successnavigate.error === true) { 
              toast.error(successnavigate.message);
              setDisable(false);
            }
          }
         } else {
           toast.error("Mobile validation failed, form submission aborted.");
           setDisable(false);
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
        payment_type: "",
        country: "",
        deliver_status: "self_collect",
        payment_slip_image: null,
      });
    } else {
      setErrors(validationErrors);
      setDisable(false);
    }
  };
  return (
    <>
      <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
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
        <section className="py-20 pb-24">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Sponsor ID
                  </label>
                  <input
                    type="text"
                    name="sponsor"
                    placeholder="Sponsor"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.sponsor}
                    onChange={handleFnameSearch}
                  />
                 {errors.sponsor ? (
                <p className="text-red-500 text-xs pt-2">{errors.sponsor}</p>
              ) : fName?.error ? (
                <p className="text-red-500 text-xs pt-2">{fName.message || "Sponsor not found."}</p>
              ) : null}
                {fName?.member && (
                  <h4 className="text-sm pt-2">{fName.member.f_name}</h4>
                )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Placement ID
                  </label>
                  <input
                    type="text"
                    name="placement"
                    placeholder="Placement"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.placement}
                    onChange={handleFnameSearch}
                  />
                  {errors.placement ? (
                <p className="text-red-500 text-xs pt-2">{errors.placement}</p>
              ) : placementName?.error ? (
                <p className="text-red-500 text-xs pt-2">
                  {placementName.message || "Placement not found."}
                </p>
              ) : null}


                {placementName?.member && (
                  <h4 className="text-sm pt-2">{placementName.member.f_name}</h4>
                )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Matrix Side
                  </label>
                  <select
                    name="matrix_side"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.matrix_side}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Auto
                    </option>
                    <option value="R">Right</option>
                    <option value="L">Left</option>
                  </select>
                  {errors.matrix_side && (
                    <p className="text-red-500 text-xs">{errors.matrix_side}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="f_name"
                    placeholder="Full Name"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.f_name}
                    onChange={handleChange}
                  />
                  { errors.f_name && (
                        <p className="text-red-500 text-xs">{errors.f_name}</p>
                      )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Email</label>
                  <input
                    type="email"
                    name="e_mail"
                    placeholder="Email"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.e_mail}
                    onChange={handleChange}
                  />
                  { errors.e_mail && (
                        <p className="text-red-500 text-xs">{errors.e_mail}</p>
                      )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Mobile</label>
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  { errors.mobile && (
                        <p className="text-red-500 text-xs">{errors.mobile}</p>
                      )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Country</label>
                  <select
                    name="country"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.country}
                    onChange={handleChange}
                  > 
                    <option value="">Select Country</option>
                    {productListData.countries &&
                    productListData.countries.length > 0 ? (
                      productListData.countries.map((country: Product) => (
                        <option key={country.id} value={country.id}>
                          {country.country_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No products available</option>
                    )}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs">{errors.country}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Package</label>
                  <div className="relative overflow-x-auto mt-5 border rounded-md mb-4">
                    <table
                      id="example"
                      className="display table-auto w-full text-sm text-left rtl:text-right text-black  "
                    >
                      <thead className="text-xs text-white uppercase bg-[#178285]">
                        <tr>
                          <th className="px-6 py-3 text-center">Image</th>
                          <th className="px-6 py-3 text-center">Code</th>
                          <th className="px-6 py-3 text-center">Name</th>
                          <th className="px-6 py-3">Price</th>
                          <th className="px-6 py-3">RLP</th>
                          <th className="px-6 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productListData.products &&
                        productListData.products.length > 0 ? (
                          productListData.products.map(
                            (item: any, index: number) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"
                                }
                              >
                                <td className="px-6 py-3 text-center">
                                  <img
                                    src={item.combo_product_image}
                                    alt=""
                                    className="mx-auto w-[40px] h-[40px] rounded-full cursor-pointer"
                                    onClick={() =>
                                      setIsOpen(item.combo_product_image)
                                    }
                                  />
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
                                <td className="px-6 py-3 text-center">
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
                                      onClick={() =>
                                        updateCart(
                                          item.id,
                                          item.combo_product_retail_price,
                                          -1
                                        )
                                      }
                                      className={`cursor-pointer ${
                                        cart[item.id]?.count === 0
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                    />
                                    <BsCart />{" "}
                                    {cart.find(
                                      (cartItem) => cartItem.id === item.id
                                    )?.count || 0}
                                    <HiOutlinePlusSmall
                                      onClick={() =>
                                        updateCart(
                                          item.id,
                                          item.combo_product_retail_price,
                                          1
                                        )
                                      }
                                      className="cursor-pointer"
                                    />
                                  </div>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-2 text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {errors.package_id && (
                    <p className="text-red-500 text-xs">{errors.package_id}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">Payment</label>
                  <select
                    name="payment_type"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.payment_type}
                    onChange={handleChange}
                  >
                    <option defaultValue={""}>Select</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="e-wallet">E-Wallet</option>
                    <option value="upload_payment_slip">
                      Upload Payment Slip
                    </option>
                  </select>
                  {formData.payment_type === "e-wallet" ? (
                    <>
                      <div className="flex gap-5 items-center mt-3">
                        <label className="text-[#1e293b] text-[14px]">PP</label>
                        <input
                          type="text"
                          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300"
                          value={ewalletData.balance_rc}
                          readOnly
                        />
                      </div>
                      <div className="flex gap-5 items-center">
                        <label className="text-[#1e293b] text-[14px]">RP</label>
                        <input
                          type="text"
                          className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black  bg-gray-300"
                          value={ewalletData.balance_sp}
                          readOnly
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {/* {formData.payment_type === "credit_card" ? (
                    <div className="mt-4">
                      <CardElement
                        className="border py-2 px-3 rounded-md"
                        options={{ hidePostalCode: true }}
                      />
                    </div>
                  ) : (
                    ""
                  )} */}
                  {/* {formData.payment_type === "e-wallet" && stripInput ? (
                    <div className="mt-4">
                      <CardElement
                        className="border py-2 px-3 rounded-md"
                        options={{ hidePostalCode: true }}
                      />
                    </div>
                  ) : (
                    ""
                  )} */}
                  {formData.payment_type === "upload_payment_slip" ? (
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300"
                      onChange={handleUploadImage}
                      name="payment_slip_image"
                    />
                  ) : (
                    ""
                  )}
                  {errors?.upload && (
                    <p className="text-red-500 text-xs mt-2">{errors.upload}</p>
                  )}
                  {errors.payment_type && (
                    <p className="text-red-500 text-xs">
                      {errors.payment_type}
                    </p>
                  )}
                </div>
                <div className="mb-3 ">
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-black text-[14px] font-semibold">
                      Total Amount :{" "}
                    </h3>
                    <h4 className="text-black text-[14px] font-normal">
                      ${totalPrice}
                    </h4>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px] mb-1">
                    Deliver Status
                  </label>
                  <div className={` mt-3 flex gap-20  ${countrysinga ? "justify-around":"justify-start ps-1 md:ps-5"}`}>
                    <div className="flex items-center cursor-pointer">
                      <input
                        id="main-account"
                        type="radio"
                        name="deliver_status"
                        value="self_collect"
                        checked={formData.deliver_status === "self_collect"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="main-account"
                        className="ms-2 text-sm font-medium text-black"
                      >
                        Self Collect
                      </label>
                    </div>
                    {
                      countrysinga &&
                    <div className="flex items-center cursor-pointer">
                      <input
                        id="sub-account"
                        type="radio"
                        name="deliver_status"
                        value="delivery"
                        checked={formData.deliver_status === "delivery"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="sub-account"
                        className="ms-2 text-sm font-medium text-black"
                      >
                        Delivery
                      </label>
                    </div>
                    }
                  </div>
                </div>
                <div className="text-end flex justify-end">
                  <button
                    type="submit"
                    className={`py-2 px-3 rounded-md bg-[#178285] text-white text-sm flex items-center justify-center ${
                      disable
                        ? "cursor-not-allowed pointer-events-none opacity-50"
                        : ""
                    }`}
                    disabled={disable}
                  >
                    {disable && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline mr-2 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
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
  );
};

export default AddMemberForm;
