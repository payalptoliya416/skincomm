import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { fetchSponsoredTree } from '../../Redux/thunks/sponsoredTree';
import { LuUser } from "react-icons/lu";
import {  FaRegPlusSquare } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import { GrUploadOption } from 'react-icons/gr';
import { MdError } from 'react-icons/md';
import { AiOutlineInfoCircle } from "react-icons/ai";
// Updated interfaces to reflect the API response structure
interface TreeDataItem {
    accu_left_node: string;
    accu_right_node: string;
    addition_left_node: string;
    addition_right_node: string;
    deduction_left_node: string;
    deduction_right_node: string;
    bleft_node: string;
    bright_node: string;
    f_name: string;
    username: string;
    userid: string;
    rank: string;
    package: string;
    member_id: number;
    side: string,
    upline_id: string
}

interface SponsoredTreeItem {
    userid: string;
    rank: string;
    package: string;
    data: TreeDataItem;
    type: string;
    col:string,
    upline_id: number,
    sponser_id: any,
    referral_user_matrix_side: string
}
  
  interface LevelGridProps {
    levelData: SponsoredTreeItem[];
    gridClass: string;
    handlePersonCall: (userid: string) => void; 
    data : any
  }

  const LevelGrid: React.FC<LevelGridProps> = ({ levelData =[], gridClass ,handlePersonCall , data}) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const handleNavigate = (path : string, col : string,  upline_id:  number) => {
        navigate(path, { state: { col, upline_id } });
      }
      const popupRef = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            popupRef.current &&
            !popupRef.current.contains(event.target as Node)
          ) {
            setSelectedIndex(null);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        // Cleanup event listener
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      const userID = sessionStorage.getItem("UserID");
    return (
     <>
        <div className={gridClass}>
          {levelData.length > 0 ? (
            levelData.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'person' ? (
                  <div  className={`py-7 cursor-pointer text-center  flex ${data === '5' ? "" : "border-after"} justify-center ${item.col === "L" ? "left-after" : item.col === "R" ? "right-after" : ""  }`} >
                  {/* <div  className={`py-7 cursor-pointer text-center  flex ${data === '5' ? "" : "border-after"} justify-center ${ item.sponser_id === userID ? item.referral_user_matrix_side === "L" ? "left-after" : item.referral_user_matrix_side === "R" ? "right-after" : "" :
                    item.col === "L" ? "left-after" : item.col === "R" ? "right-after" : ""
                  }`} > */}
                   <div className='transition-all duration-500 relative w-full max-w-[140px] bg-gray-200 flex justify-center flex-col items-center py-2 px-2 rounded-md mx-2' onClick={() =>handlePersonCall(item.userid)}>
                    <LuUser className='mb-2 inline' />
                   <h3 className='text-[10px] text-black'>
                      {item.data.f_name} (
                      {item.data ? (
                        <>
                          {item.data.rank}
                        </>
                      ) : ""}
                      )
                    </h3>
                    <h3 className='text-[10px] text-black'>{item.userid}</h3>
                    <h3 className='text-[10px] text-black'>
                      L : {item.data.accu_left_node || 0} | R : {item.data.accu_right_node || 0}</h3>
                    <h3 className='text-[10px] text-black'>Today Balance</h3>
                    <h3 className='text-[10px] text-black'>{item.data.bleft_node || 0} | {item.data.bright_node || 0}</h3>
                   </div>
                   <div className='group relative max-h-max'>
                   <AiOutlineInfoCircle className='' />
                   <div className='hidden group-hover:block text-[11px] leading-[14px] w-[150px] rounded-md bg-black text-white p-1 absolute -top-[100%] left-0] z-10 py-[5px]'>
                    <div className="text-center mb-1">
                       <h3 className='border-b border-dashed w-max mx-auto'>{item.userid}</h3>
                    </div>
                       <ul className='flex flex-col gap-1'>
                        <li>
                       <h3>Accumulated Pts</h3>
                       <h3>{item.data.accu_left_node || 0} | {item.data.accu_right_node || 0}</h3>
                        </li>
                        <li>
                          <h3>Today Sales</h3>
                          <h3>{item.data.addition_left_node || 0} | {item.data.addition_right_node || 0}</h3>
                        </li>
                        <li>
                          <h3>Today Matching</h3>
                          <h3>{item.data.deduction_left_node || 0} | {item.data.deduction_right_node || 0}</h3>
                        </li>
                        <li>
                          <h3>Today Balance</h3>
                          <h3>{item.data.bleft_node || 0} | {item.data.bright_node || 0}</h3>
                        </li>
                       </ul>
                    </div>
                   </div>
                  </div>
                ) : item.type === 'blank' ? (
                    <div className={`py-7 ${
                        item.col === "L" ? "left-after" : item.col === "R" ? "right-after" : ""
                      }`}>
                 <div className='mx-auto py-2 px-10 rounded-md group' >
                    <div onClick={() => setSelectedIndex(index)}>
                        <FaRegPlusSquare className="cursor-pointer mx-auto" />
                      </div>
                      {selectedIndex === index && (
            <div >
               <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
               <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div    ref={popupRef} className="flex flex-col gap-1 items-center bg-gray-200 mx-auto w-full max-w-[200px] sm:max-w-[260px] py-10 px-3 rounded-md" >
              <button
                className="w-full text-[16px] sm:text-[18px] mb-[2px]"
                onClick={() => handleNavigate('/addmember', item.col, item.upline_id)}
              >
                Add Member
              </button>
              </div>
               </div>
            </div>
          )}
                 </div>
                    </div>
                  ) : item.type === 'empty' ?(
                 <div>
                 </div>
                ) : ""}
              </React.Fragment>
            ))
          ) :  (
       ''
          )}
        </div>
     </>
      );
    };
    
function D_SponsoredTree() {
    const dispatch = useDispatch<any>();
    const { sponsoredTreeData } = useSelector((state: RootState) => state.sponsoreTree);
    const [errorMsj , setErrorMsj] = useState('')
    const [loading, setLoading] = useState(true);
   const location = useLocation();
   const { SearchUserID } = location.state || {};  
    const uplineID = sponsoredTreeData.upline_id;
    
    useEffect(() => {
    dispatch(fetchSponsoredTree({ userid: SearchUserID }));
    const timer = setTimeout(() => {
      setLoading(false);  
    },1600);

      return () => clearTimeout(timer);
    }, [dispatch]);

 const handleUpToData = async ()=>{
  const UplineError = await  dispatch(fetchSponsoredTree({ userid: uplineID }));
  const Upline = UplineError.data
  setErrorMsj(Upline.message)
  if(Upline.error === true){
   toast.error(Upline.message)
  }
   }

    const handlePersonCall = (userid : string)=>{
        dispatch(fetchSponsoredTree({ userid: userid }));  
    }

    const [searchDate, setSearchDate] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value);
  };

  const handleSearch =async () => {
    if (searchDate.trim() !== "") { 
      const data = await  dispatch(fetchSponsoredTree({ userid: searchDate }));
      const errormsj = data.data.message
      setErrorMsj(errormsj)
      if(errormsj){
       toast.error(errormsj)
      }
    } else {
      dispatch(fetchSponsoredTree({ userid : SearchUserID }));      
    }
  };

    return (
        <>
        <ToastContainer/>
            <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-30">
                    <div className="container">
                        <div className="relative">
                            <Link to="/myteam" className="absolute left-0">
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
                            <h3 className="text-lg font-medium">3D Placement Tree</h3>
                        </div>
                    </div>
                </header>
                <section className="py-20 pb-24">
                    <div className="container">
                        <div className="p-[20px] bg-white overflow-x-auto">
                        <div className="flex justify-end items-center gap-2 z-20 relative">
                      <label className="mt-1 text-sm">Search :</label>
                   <div>
                   <input
                type="text"
                placeholder="Search"
                value={searchDate}
                onChange={handleSearchChange}
                className=" py-2 px-2 border rounded text-xs placeholder:text-sm relative"
              />
              <button onClick={handleSearch} className='py-2 px-2 rounded absolute right-0 top-0 bg-blue-500 '><FiSearch  className='text-white text-base mb-[1px]'/></button>
                   </div>
                        </div>
                        
                {loading ? (
                        <div className="flex items-center justify-center p-4 w-full bg-white rounded-md">
                        <svg
                            className="w-6 h-6 animate-spin text-custom-text-color2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 0116 0h2a10 10 0 00-20 0h2z"
                            ></path>
                        </svg>
                        <span className="ml-2 text-sm text-custom-text-color">Loading...</span>
                    </div>
                    ) : (
                         <>
                   {
                    errorMsj ? (
                      <>
                       <div onClick={handleUpToData} className='cursor-pointer w-max'>
                        <GrUploadOption className='text-2xl  hover:text-green-500' />
                        <h3 className='text-base leading-[20px] mt-2'>Back</h3>
                        </div>
                    <h3 className='text-red-400 text-base mt-4 ps-7 flex gap-3 items-center'>-<MdError className='text-red-400' /> {errorMsj}</h3>
                    </>
                    ) : (
                      <>
               <div className="min-w-[2300px]">
                     <div onClick={handleUpToData} className='cursor-pointer w-max'>
                        <GrUploadOption className='text-2xl cursor-pointer hover:text-green-500' />
                       <h3 className='text-base leading-[20px] mt-2'>Back</h3>
                        </div>
                    <LevelGrid levelData={sponsoredTreeData.level1} gridClass="grid grid-cols-1 text-center" handlePersonCall={handlePersonCall} data='' />
                    <LevelGrid levelData={sponsoredTreeData.level2} gridClass="grid grid-cols-2 text-center" handlePersonCall={handlePersonCall}  data='' />
                    <LevelGrid levelData={sponsoredTreeData.level3} gridClass="grid grid-cols-4 text-center"  handlePersonCall={handlePersonCall}  data=''/>
                    <LevelGrid levelData={sponsoredTreeData.level4} gridClass="grid grid-cols-8 text-center"  handlePersonCall={handlePersonCall}  data=''/>
                    <LevelGrid levelData={sponsoredTreeData.level5} gridClass="custom-grid text-center" handlePersonCall={handlePersonCall} data= '5' />
                    </div>
                      </>
                    )
                   }
                   
                                 </>
                         )}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default D_SponsoredTree
