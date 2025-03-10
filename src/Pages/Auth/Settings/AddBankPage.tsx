import React, { useEffect } from 'react'
import Layout from '../../../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { fetchGetBankData } from '../../../Redux/thunks/getBankDetailThunk';

interface data {
    id: number,
    userid: number,
    user_name: string,
    bank_id: string,
    bank_name: string,
    bank_acount_no: number,
    account_name:string
}

function AddBankPage() {
    const { getBankDetail } = useSelector((state: RootState) => state.getBankDetails);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchGetBankData());
    }, [dispatch]);
    
    const navigate = useNavigate();
    const handleEdit = (item : data)=>{
        navigate('/addbankform', { state: { bankData: item } });
    }

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
                            <h3 className="text-lg font-medium">Add Bank</h3>
                        </div>
                    </div>
                </header>

                <section className="py-20">
                    <div className="container">
                        <div className="border rounded-lg p-6 border-[#DCDCE9] bg-white">
                            <Link to='/addbankform' className={`p-3 text-[13px] text-[#6236ff] ${getBankDetail.length > 0 ? "hidden":""}`}>
                            + Add Bank
                            </Link>
                            {
                                getBankDetail && getBankDetail.length > 0 ? (
                                    <>
                                     { getBankDetail.map((item: data, index: number) => (
                                <div className="p-4 bg-[#eeeef0] mb-2 mt-2" key={index}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className='text-xs text-[#958d9e]'>{item.account_name}</h3>
                                            <h3 className='text-xs text-[#958d9e]'>{item.bank_name}</h3>
                                            <h3 className='text-xs text-[#958d9e]'>{item.bank_acount_no}</h3>
                                        </div>
                                        <div className='me-5 md:me-28' onClick={()=>handleEdit(item)}>
                                            <img src="images/edit.svg" alt="" className='w-[22px] h-[22px]  cursor-pointer' />
                                        </div>
                                    </div>
                                </div>
                            ))}
                                    </>
                                ) :       <div className="p-4 bg-[#eeeef0] mb-2 mt-2"><h3 className='text-red-400 text-sm font-bold'>No Data Found</h3></div>
                            }
                           
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default AddBankPage;
