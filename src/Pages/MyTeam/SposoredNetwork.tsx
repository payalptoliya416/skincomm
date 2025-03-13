import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { fetchSponsredNetwork } from '../../Redux/thunks/sponsNewtworkThunk';
import { FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

interface SponsoredNetworkItem {
    userid: string;
    rank_name: string;
    joining_date: string;
    sponsored: SponsoredNetworkItem[]; 
    matrix_side: string;
    id: number;
    account_status: string;
    expiery_date: string;
    f_name : string,
    sponsorid: number;
    data: any
} 

const SponsoredNetworkItem: React.FC<{
    item: SponsoredNetworkItem;
    openStates: Record<number, boolean>;
    handleOpen: (id: number) => void;
    
}> = ({ item, openStates, handleOpen }) => {
    return (
        <div className='py-[12px] px-[20px] shadow-lg rounded-md mb-4'>
            <h2 className='text-[1e293b] text-sm font-semibold'>{item.userid} : {item.f_name} - {item.rank_name} - {item.matrix_side === "L" ? "Left" : item.matrix_side === "R" ? "Right" : ""}</h2>
            <h3 className='text-[1e293b] text-sm mb-1'>Date Join : {item.joining_date} </h3>
            <h3 className='text-[1e293b] text-sm mb-1'>Expiery Date : {item.expiery_date}</h3>
            <h3 className='text-[1e293b] text-sm mb-1'>Status : {item.account_status}</h3>
            <h3 className='text-[1e293b] text-sm mb-4'>Sponsored : {item.sponsored.length}</h3>
            <button type='button' className='px-[8px] py-[5px] rounded-md border text-xs text-[1e293b]' onClick={() => handleOpen(item.id)}>Check Sponsored Tree</button>
        </div>
    );
}

const SponsoredNetworkList: React.FC<{
    items: SponsoredNetworkItem[];
    openStates: Record<number, boolean>;
    handleOpen: (id: number) => void;
    subOpenStates: Record<number, boolean>;
    handleSub: (id: number) => void;
    subSubOpenStates: Record<number, boolean>;
    handleSubSub: (id: number) => void;
}> = ({ items, openStates, handleOpen, subOpenStates, handleSub, subSubOpenStates, handleSubSub }) => {
    return (
        <>
            {items.map(item =>{
             
                return(
                    (
                        <React.Fragment key={item.id}>
                            <SponsoredNetworkItem item={item} openStates={openStates} handleOpen={handleOpen} />
                            {openStates[item.id] && item.sponsored && (
                                <div className='ml-6'>
                                    <SponsoredNetworkList
                                        items={item.sponsored.filter(sponsor => Number(sponsor.sponsorid) === item.id)}
                                        openStates={subOpenStates}
                                        handleOpen={handleSub}
                                        subOpenStates={subOpenStates}
                                        handleSub={handleSub}
                                        subSubOpenStates={subSubOpenStates}
                                        handleSubSub={handleSubSub}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    )
                )
            })}
        </>
    );
}

function SposoredNetwork() {
    const location = useLocation();
    const { SearchUserID } = location.state || {};  
    const dispatch = useDispatch<any>();
    const { sponsoredNetworkData } = useSelector((state: RootState) => state.sponsoorednetwork);
    useEffect(() => {
        dispatch(fetchSponsredNetwork({ userid: SearchUserID }));
    }, [dispatch]);

    const [openStates, setOpenStates] = useState<Record<number, boolean>>({}); 
    const [subOpenStates, setSubOpenStates] = useState<Record<number, boolean>>({});
    const [subSubOpenStates, setSubSubOpenStates] = useState<Record<number, boolean>>({}); 

    const handleOpen = (id: number) => {
        setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSub = (id: number) => {
        setSubOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSubSub = (id: number) => {
        setSubSubOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
    };
    const [searchDate, setSearchDate] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchDate(e.target.value);
    };
    const handleSearch =async () => {
      if (searchDate.trim() !== "") { 
      const data = await  dispatch(fetchSponsredNetwork({ userid: searchDate }));
  
      const errorrmsg = data.data.message
        if(data.data === null || data.data === undefined || errorrmsg){
            toast.error(errorrmsg)
        }
      } else {
        dispatch(fetchSponsredNetwork({ userid : SearchUserID}));
      }
    };

    return (
        <>
            <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center z-20 shadow-md border-b border-custom-border">
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
                            <h3 className="text-lg font-medium">Referral Tree</h3>
                        </div>
                    </div>
                </header>
               <ToastContainer/>
                <section className="py-20 pb-20">
                    <div className="container">
                        <div className="p-[20px] bg-white">
                        <div className="flex justify-center tablet:justify-end items-center gap-2 z-10 relative mb-2">
                      <label className="mt-1 text-sm">Search :</label>
                   <div>
                   <input
                type="text"
                placeholder="Search"
                value={searchDate}
                onChange={handleSearchChange}
                className=" py-2 px-2 border rounded text-xs placeholder:text-sm relative"
              />
              <button onClick={handleSearch} className='py-2 px-2 rounded absolute right-0 top-0 bg-blue-500'><FiSearch  className='text-white text-base mb-[1px]'/></button>
                   </div>
                </div>
                            {sponsoredNetworkData && Array.isArray(sponsoredNetworkData) ? (
                                <SponsoredNetworkList
                                    items={sponsoredNetworkData}
                                    openStates={openStates}
                                    handleOpen={handleOpen}
                                    subOpenStates={subOpenStates}
                                    handleSub={handleSub}
                                    subSubOpenStates={subSubOpenStates}
                                    handleSubSub={handleSubSub}
                                />
                            ) : 
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
                            }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default SposoredNetwork;
