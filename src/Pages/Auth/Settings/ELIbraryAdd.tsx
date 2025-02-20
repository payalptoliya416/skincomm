import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { fetchELibraryList } from "../../../Redux/thunks/ELibraryListThunk";
import { fetchGetSubCategory } from "../../../Redux/thunks/GetSubCatthunk";
import { SlCloudUpload } from "react-icons/sl";
import { fetchELibraryPost } from "../../../Redux/thunks/ELibraryPostThunk";
import imageCompression from 'browser-image-compression';

interface FormData {
  cat_id: number | string;
  sub_cat_id: string;
  content_type: string;
  content_title: string;
  language: string;
  content: string;
  video_url: string;
}

function ELIbraryAdd() {
  const dispatch = useDispatch<any>();
  const { eLibraryListData } = useSelector(
    (state: RootState) => state.elibrary
  );
  const [subCat ,setSubCat] = useState<any>([]);
  const [formData, setFormData] = useState<FormData>({
    cat_id: "",
    sub_cat_id: "",
    content_type: "",
    content_title: "",
    language: "",
    content: "",
    video_url: "",
  });
  const [error, setError] = useState<any>("");
    const [disable , setDisable]= useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
  
    if (name === "sub_cat_id" && !formData.cat_id) {
      toast.error("First Select Category");
      return;
    }
  
    if (name === "cat_id") {
      const action = {
        action: "getsubcategories",
        cat_id: value,
      };
      const data = await dispatch(fetchGetSubCategory(action));
      setSubCat(data);
      setFormData((prev) => ({
        ...prev,
        cat_id: Number(value) || "",
        sub_cat_id: "",
      }));
    } else if (type === "file" && files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0].name, 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const [uploadedImage , setUploadedImage] = useState('');
  const handleUploadImage = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const validExtensions = ["jpg", "jpeg", "png", "pdf"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
  
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Please upload a valid file (jpg, jpeg, png, pdf).");
      return;
    }

    try {
      if (file.type === "application/pdf") {
        // ✅ Convert PDF to Base64
        const base64String = await convertBase64(file);
        const basePDF = `data:application/pdf;base64,${base64String}`;
  
        setFormData((prev) => ({
          ...prev,
          content: basePDF, // ✅ Store Base64 PDF
        }));
        setUploadedImage(file.name);
      } else if (validImageTypes.includes(file.type)) {
        // ✅ Convert Image to Base64
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
  
        const compressedFile = await imageCompression(file, options);
        const base64String = await convertBase64(compressedFile);
        const baseImage = `data:${compressedFile.type};base64,${base64String}`;
  
        setFormData((prev) => ({
          ...prev,
          content: baseImage,
        })); 
        setUploadedImage(file.name);
      } else {
        toast.error("Invalid file type.");
      }
    } catch (error) {
      console.error("Error processing the file:", error);
      toast.error("Failed to upload the file.");
    }
  };
 
  const convertBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const result = fileReader.result as string;
        const base64String = result.split(",")[1];
        resolve(base64String);
      };
      fileReader.onerror = (error) => reject(error);
    });
  };
  
  useEffect(() => {
    const action = {
      action: "get-category ",
    };
    dispatch(fetchELibraryList(action));
  }, [dispatch]);

  const isValidURL = (url: string) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?"+ 
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" + 
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" + 
        "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" + 
        "(\\#[-a-zA-Z\\d_]*)?$", "i"
    );
    return !!pattern.test(url);
};

const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.cat_id) newErrors.cat_id = "Category is required";
  if (!formData.sub_cat_id) newErrors.sub_cat_id = "Sub-category is required";
  if (!formData.content_type) newErrors.content_type = "Content type is required";
  if (!formData.content_title) newErrors.content_title = "Content title is required";
  if (!formData.language) newErrors.language = "Language is required";

  if (formData.content_type === "e_brochure" || formData.content_type === "file") {
    if (!formData.content) {
      newErrors.content = "File upload is required";
    }   
  }

  if (formData.content_type === "video") {
    if (!formData.video_url) {
      newErrors.video_url = "Video URL is required";
    } else if (!isValidURL(formData.video_url)) {
      newErrors.video_url = "Enter a valid URL";
    }
  }

  return newErrors;
};
const navigate = useNavigate();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setDisable(true);
  setError({});

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    
    setError(validationErrors);
    setDisable(false);
    return; // ✅ Stop execution if validation fails
  }

  try {
    
    const submitData = await dispatch(fetchELibraryPost(formData));
    

    if (submitData?.success) {
      toast.success(submitData.message || "Submitted successfully!");
      setFormData({
        cat_id: "",
        sub_cat_id: "",
        content_type: "",
        content_title: "",
        language: "",
        content: "",
        video_url: "",
      })
        const action = {
            action:'get-e-library'
              }   
              dispatch(fetchELibraryList(action));
              navigate("/e-library");
    } else {
      throw new Error(submitData?.message || "Something went wrong!");
    }
  } catch (error: any) {
    console.error("Submission error:", error);
    toast.error(error?.message || "Submission failed!");
  } finally {
    setDisable(false); 
  }
};

  return (
    <>
      <Layout>
        <header className="fixed z-10 w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
          <div className="container">
            <div className="relative">
              <Link to="/e-library" className="absolute left-0">
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
              <h3 className="text-lg font-medium">E-Library Add Content</h3>
            </div>
          </div>
        </header>
        <ToastContainer />
        <section className="py-20 pb-24">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Category:
                  </label>
                  <select
                    name="cat_id"
                    className="mt-2 w-full text-[14px] border py-2 px-3 rounded-md"
                    value={formData.cat_id || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {eLibraryListData?.length > 0 ? (
                      eLibraryListData.map((item: any) => (
                        <option key={item.cat_id} value={item.cat_id}>
                          {item.cat_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Category available</option>
                    )}
                  </select>
                  {error.cat_id && (
                    <p className="text-red-500 text-xs">{error.cat_id}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Sub Category:
                  </label>
                  <select
                    name="sub_cat_id"
                    className="mt-2 w-full text-[14px] border py-2 px-3 rounded-md"
                    value={formData.sub_cat_id || ""}
                    onChange={handleChange}
                    disabled={!formData.cat_id} 
                  >
                    <option value="">First Select Category</option>
                    {subCat?.length > 0 ? (
                      subCat.map((item: any) => (
                        <option key={item.sub_id} value={item.sub_id}>
                          {item.subcat_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Sub Category available</option>
                    )}
                  </select>
                  {error.sub_cat_id && (
                    <p className="text-red-500 text-xs">{error.sub_cat_id}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Content Type:
                  </label>
                  <select
                    name="content_type"
                    className="mt-2 w-full text-[14px] border py-2 px-3 rounded-md"
                    value={formData.content_type || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Content Type</option>
                    <option value="video">Video</option>
                    <option value="e_brochure">E-Brochure</option>
                    <option value="file">File</option>
                  </select>
                  {error.content_type && (
                    <p className="text-red-500 text-xs">{error.content_type}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Content Title:
                  </label>
                  <input
                    type="text"
                    name="content_title"
                    placeholder="Enter Content Title"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.content_title}
                    onChange={handleChange}
                  />
                  {error.content_title && (
                    <p className="text-red-500 text-xs">
                      {error.content_title}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Language:
                  </label>
                  <select
                    name="language"
                    className="mt-2 w-full text-[14px] border py-2 px-3 rounded-md"
                    value={formData.language || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Language</option>
                    <option value="chinese">Chinese</option>
                    <option value="english ">English </option>
                  </select>
                  {error.language && (
                    <p className="text-red-500 text-xs">{error.language}</p>
                  )}
                </div>

                {formData.content_type === "video" && (
                  <div className="mb-3">
                    <label className="text-[#1e293b] text-[14px]">
                      Video URL:
                    </label>
                    <input
                      type="text"
                      name="video_url"
                      className="mt-2 w-full text-[14px] border py-2 px-3 rounded-md"
                      value={formData.video_url || ""}
                      onChange={handleChange}
                      placeholder="Enter Video URL"
                    />
                      {error.video_url && (
                    <p className="text-red-500 text-xs">{error.video_url}</p>
                  )}
                  </div>
                )}

                 {(formData.content_type === "e_brochure" ||
                  formData.content_type === "file" ||
                    !formData.content_type) && (
                    <div className="mb-3">
                      <label className="text-[#1e293b] text-[14px]">Upload Content:</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-[120px] flex items-center justify-center bg-gray-100 relative mt-2 overflow-hidden">
                        <input
                          type="file"
                          name="content"
                          className="absolute opacity-0 w-full h-full cursor-pointer"
                          onChange={handleUploadImage}
                        />
                        {uploadedImage ? (
            <h3>{uploadedImage}</h3>
          ) : (
            <p className="text-gray-500 text-sm flex flex-col items-center">
              <SlCloudUpload className="text-4xl" />
              Drop File Here or Click to Upload
            </p>
          )}
                      </div>
                    </div>
                  )}
  {error.content && (
                    <p className="text-red-500 text-xs">{error.content}</p>
                  )}
                   <div className='text-end'>
                                <div className='text-end flex justify-end'>
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
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ELIbraryAdd;
