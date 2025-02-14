import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatrixThunk } from "../../../Redux/thunks/MatrixThunk";
import { toast, ToastContainer } from "react-toastify";
import { fetchMatrixGetThunk } from "../../../Redux/thunks/MatrixSideGetThunk";
import { RootState } from "../../../Redux/store";
import { BASE_URL } from "../../../Utilities/config";

interface FormData {
  userid: string;
  referral_user_matrix_side: string;
}
function MatrixSide() {
  const dispatch = useDispatch<any>();
  const userID = sessionStorage.getItem("UserID");
  const [errors, setErrors] = useState<any>({});
  const { matrixSideGetData } = useSelector((state: RootState) => state.metrixsidegetRed);

  const [formData, setFormData] = useState<FormData>({
    userid: userID || "",
    referral_user_matrix_side:  '', 
  });

  useEffect(() => {
    if (matrixSideGetData?.referral_user_matrix_side) {
      setFormData((prev) => ({
        ...prev,
        referral_user_matrix_side: matrixSideGetData.referral_user_matrix_side,
      }));
    }
  }, [matrixSideGetData]);
  useEffect(() => {
    if (userID) {
      dispatch(fetchMatrixGetThunk(userID));
    }
  }, [dispatch, userID])
      
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.referral_user_matrix_side)
      newErrors.referral_user_matrix_side = "Matrix Side is required";
    return newErrors;
  };
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = {
        ...formData,
      };
      const successData = await dispatch(
        fetchMatrixThunk(formDataToSend) as any
      );
      const successFullyADD = successData.data;
      if (successFullyADD.success === true) {
        toast.success(successFullyADD.message);
        setDisable(false);
        dispatch(fetchMatrixGetThunk(userID));
      }else{
        toast.error(successFullyADD.message);
        setDisable(false);
      }

      setFormData({
        userid: userID || "",
        referral_user_matrix_side: '',
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
              <h3 className="text-lg font-medium">
                Referral Member Matrix side{" "}
              </h3>
            </div>
          </div>
        </header>
        <ToastContainer />
        <section className="py-20">
          <div className="container">
            <div className="p-[20px] bg-white rounded-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="text-[#1e293b] text-[14px]">
                    Matrix Side
                  </label>
                  <select
                    name="referral_user_matrix_side"
                    className="mt-2 w-full text-[14px] placeholder:text-[14px] border py-2 px-3 rounded-md placeholder:text-black"
                    value={formData.referral_user_matrix_side}
                    onChange={handleChange}
                  >
                    <option value="">Auto</option>
                    <option value="R">Right</option>
                    <option value="L">Left</option>
                  </select>
                  {errors.referral_user_matrix_side && (
                    <p className="text-red-500 text-xs">{errors.referral_user_matrix_side}</p>
                  )}
                </div>
                <div className="text-end">
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
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default MatrixSide;
