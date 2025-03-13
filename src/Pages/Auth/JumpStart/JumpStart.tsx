import { useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import imageCompression from "browser-image-compression";
import { fetchJumpstartPackage } from "../../../Redux/thunks/JumpStartThunk";
import { fetchJumpstartPostData } from "../../../Redux/thunks/JumpStartPostThunk";
import { IoIosCloseCircle } from "react-icons/io";
import { fetchPaymentLink } from "../../../Redux/thunks/PaymentLinkThunk";
import { LIVE_URL } from "../../../Utilities/config";

interface FormData {
  userId: string;
  package: string;
  payment_type: string;
  deliver_status: string;
  upload_image: any;
}
interface Package {
  id: string;
  combo_product_name: string;
  combo_product_retail_price: string;
  combo_product_lp: string;
}

function JumpStart() {
  const LoginUserID = sessionStorage.getItem("UserID");
  const dispatch = useDispatch<any>();
  const [errors, setErrors] = useState<any>({});
  const [disable, setDisable] = useState(false);
  const [highRankPopup, setHighRankPopup] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const comboRetailPrices = packages && packages
  ? packages.map((item: any) => (item.combo_product_retail_price ? "retail_price" : "associate_price"
    ))
  : [];
const comboRetailProduct= packages && packages
  ? packages.map((item: any) => ( item.combo_product_name ? "combo_product" : "product"
    ))
  : []; 
  const navigate = useNavigate();
  const [packageRank, setPackageRank] = useState<any>("");
  const [formData, setFormData] = useState<FormData>({
    userId: LoginUserID || "",
    package: "",
    payment_type: "",
    deliver_status: "self_collect",
    upload_image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestData: any = {
        userId: LoginUserID,
        action: "getuserdetails",
      };

      try {
        const successData = await dispatch(fetchJumpstartPackage(requestData));
        setPackages(successData.products || []);
        if (!successData.products || successData.products.length === 0) {
          setHighRankPopup(true);
          setPackageRank(successData.message);
        }
      } catch (error) {
        console.error("Error fetching Package", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "deliver_status") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "payment_type") {
      if (!formData.package || formData.package.length === 0) {
        toast.error("Please select a package first.");
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        upload_image: baseImage,
      }));
    } catch (error) {
      console.error("Error compressing the image:", error);
      toast.error("Failed to upload the image.");
    }
  };

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

    if (!formData.userId) newErrors.userid = "User ID is required";
    if (!formData.package) newErrors.package = "Please select any One Package ";
    if (!formData.payment_type)
      newErrors.payment_type = "Payment Type is required";
    if (
      formData.payment_type === "upload_payment_slip" &&
      !formData.upload_image
    ) {
      newErrors.upload = "Please select an image";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setDisable(false);
      return;
    }

    const formDataToSend: any = {
      ...formData,
    };

    try {
      if (formData.payment_type === "credit_card") {
        sessionStorage.setItem("jumpstartCredit" ,JSON.stringify(formData));
                                            const creditcardData = {
                                                "payment_type":formData.payment_type,
                                                "amount_type" : comboRetailPrices[0], 
                                                "product_type" : comboRetailProduct[0], 
                                                "products_data" :[{"id": formData.package ,"count": 1 }],
                                                "deliver_status" : formData.deliver_status,
                                                "success_url" :`${LIVE_URL}/jumpstart-payment`,
                                                "cancel_url":`${LIVE_URL}/jumpstart`
                                            }
                                            const availableUrl = await dispatch(fetchPaymentLink(creditcardData));
                                            if (availableUrl?.url) {
                                                let storedData = JSON.parse(sessionStorage.getItem("jumpstartCredit") || "{}");
                                                storedData.payment_type = availableUrl?.paymentType || storedData.payment_type;
                                                sessionStorage.setItem("jumpstartCredit", JSON.stringify(storedData));
                                                window.location.href = availableUrl.url;
                                            } else {
                                                toast.error("Invalid URL received:", availableUrl);
                                            }
    }else{
       const successData = await dispatch(
        fetchJumpstartPostData(formDataToSend)
      );

      if (successData.success) {
        toast.success(successData.message || "Form submitted successfully.");
        sessionStorage.removeItem("cart");

        setFormData({
          userId: LoginUserID || "",
          package: "",
          payment_type: "",
          deliver_status: "self_collect",
          upload_image: null,
        });

        navigate("/successfully", { state: { message: successData.message } });
      } else {
        toast.error(successData.message || "Submission failed. Try again.");
      }
    }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setDisable(false);
    }
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
              <h3 className="text-lg font-medium">JumpStart</h3>
            </div>
          </div>
        </header>
        <ToastContainer />
        <section className="py-20">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              {highRankPopup && packages.length === 0 && (
                <>
                  <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
                  <div className="fixed inset-0 z-20 flex items-center justify-center ">
                    <section className="flex items-center justify-center relative w-full max-w-[500px]">
                      <div className="bg-white px-10 py-8 rounded-2xl sm:mx-auto w-full max-w-lg mx-2">
                        <h3 className="mb-7 text-lg font-bold text-center">
                          JumpStart Validation
                        </h3>
                        <p className="mb-3 text-sm font-semibold text-center">
                          {packageRank}
                        </p>
                        <div className="absolute top-0 right-0">
                          <IoIosCloseCircle
                            className="text-3xl text-[#178285] cursor-pointer"
                            onClick={() => setHighRankPopup(false)}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px] mb-1">
                    Package
                  </label>
                  <select
                    name="package"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.package}
                    onChange={(e) => {
                      handleChange(e);
                      const selectedPackage = packages.find(
                        (pkg) => pkg.id === e.target.value
                      );
                      const packageInfoDiv =
                        document.getElementById("package-info");

                      if (selectedPackage && packageInfoDiv) {
                        packageInfoDiv.classList.remove("hidden");
                        document.getElementById(
                          "package-name"
                        )!.innerText = `Name: ${selectedPackage.combo_product_name}`;
                        document.getElementById(
                          "package-price"
                        )!.innerText = `Price: ${selectedPackage.combo_product_retail_price}`;
                        document.getElementById(
                          "package-lp"
                        )!.innerText = `LP: ${selectedPackage.combo_product_lp}`;
                      } else {
                        packageInfoDiv?.classList.add("hidden");
                      }
                    }}
                  >
                    <option value="">Select Package</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.combo_product_name} (
                        {pkg.combo_product_retail_price})
                      </option>
                    ))}
                  </select>
                  <div id="package-info" className="hidden">
                    <div className="flex justify-start">
                      <div className="mx-2" id="package-name"></div> |
                      <div id="package-price" className="mx-2"></div> |
                      <div id="package-lp" className="mx-2"></div>
                    </div>
                  </div>
                  {errors.package && (
                    <p className="text-red-500 text-xs">{errors.package}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Payment Type
                  </label>
                  <select
                    name="payment_type"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.payment_type}
                    onChange={handleChange}
                  >
                    <option defaultValue={""}>Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="upload_payment_slip">
                      Upload Payment Slip
                    </option>
                  </select>
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

                  {formData.payment_type === "upload_payment_slip" ? (
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black bg-gray-300"
                      onChange={handleUploadImage}
                      name="upload_image"
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

                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px] mb-1">
                    Deliver Status
                  </label>
                  <div className="mt-3 flex gap-20 justify-around">
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
}

export default JumpStart;
