import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchTeamData } from "../../Redux/thunks/teamSearchThunnk";
import { toast, ToastContainer } from "react-toastify";
import { MdError } from "react-icons/md";

const MyTeam = () => {
    const { teamsearchData } = useSelector((state: RootState) => state.myTeamSearch);
    const [errorMsj , setErrorMsj] = useState('')
    const dispatch = useDispatch<any>();    
   const ID =  localStorage.getItem('UserID')
    useEffect(() => {
        dispatch(fetchSearchTeamData(ID));
     }, [dispatch]);
        
     const [searchDate, setSearchDate] = useState("");
     const SearchUserID = searchDate
     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setSearchDate(e.target.value);
     };
   
     const handleSearch = async () => {
       if (searchDate.trim() !== "") { 
         const data = await  dispatch(fetchSearchTeamData(searchDate));
         setSearchDate(data.member.userid);
         if(data.success === true){
          toast.success("Search Successfully")
         }
         if(data.error === true){
            setErrorMsj(data.message)
         }
       } else {
         dispatch(fetchSearchTeamData(ID));      
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
                            <h3 className="text-lg font-medium">My Team</h3>
                        </div>
                    </div>
                </header>
                <ToastContainer/>
                <section className="py-20">
                    <div className="container">
                        <ul className="flex flex-col gap-3 rounded-md  pr-0">
                            <li>
                            <div className="flex justify-end items-center gap-2 z-20 relative">
                                <label className="mt-1 text-sm">Search :</label>
                            <div>
                            <input
                            type="text"
                            placeholder="Search"
                            value={searchDate}
                            onChange={handleSearchChange}
                            className=" py-3 px-2 w-full border rounded-md text-xs placeholder:text-sm relative"
                        />
                        <button onClick={handleSearch} className='py-3 px-3 rounded absolute right-0 top-0 bg-blue-500 '><FiSearch  className='text-white text-base mb-[1px]'/></button>
                            </div>
                        </div>
                            </li>
                {
                    teamsearchData  ? (
                        <>
                        <li> 
                            <Link  to='/placement-tree' state={{SearchUserID}}  className="flex items-start p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white "
                            >
                                <div className="-mt-1 w-14">
                                    <svg
                                        className="w-6 h-6 text-custom-text-color2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="w-full flex items-center justify-between pr-2"
                                >
                                    <span> Placement Tree</span>
                                    <svg
                                        className="w-5 h-5 text-custom-text-color2"
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
                                            d="m9 5 7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/sponsored-network' state={{SearchUserID}}  className="flex items-start w-full p-4 text-custom-text-color font-normal rounded-md text-xs bg-white ">
                            <div className="-mt-1 w-14">
                                    <svg
                                        className="w-6 h-6 text-custom-text-color2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="w-full flex items-center justify-between pr-2"
                                >
                                    <span> Referral Tree</span>
                                    <svg
                                        className="w-5 h-5 text-custom-text-color2"
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
                                            d="m9 5 7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                   </>  
                    ) : (
                        <>
                         <li> 
                        <div  className="flex items-start p-4 w-full text-custom-text-color rounded-md font-normal text-xs bg-white "
                        >
                            <div className="-mt-1 w-14">
                            </div>
                            <div
                                className="w-full flex items-center justify-between pr-2"
                            >
                                {errorMsj &&  <span className="text-base text-red-400 flex gap-3 items-center"> -<MdError className="text-red-400" /> {errorMsj}</span>}
                               
                            </div>
                        </div>
                    </li>
                        </>
                   
                    )
                }
                           
                        </ul>
                    </div>
                </section>
                
            </Layout>
        </>
    );
}

export default MyTeam;