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
                            <div role="status" className='flex justify-center mt-2'>
                                <svg aria-hidden="true" className="w-8 h-8 text-black animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
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
