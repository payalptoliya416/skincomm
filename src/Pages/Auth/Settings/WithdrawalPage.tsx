import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import DataTable from 'datatables.net-dt';
import { fetchWithDrawalPageData } from '../../../Redux/thunks/WithDThunk';

function WithdrawalPage() {
    const dispatch = useDispatch<any>();

    const { WhithdrawalPageData  } = useSelector((state: RootState) => state.withdrwalrequest);
        const tableRef = useRef<HTMLTableElement | null>(null);
  
    // useEffect(() => {
    //   if (tableRef.current) {
    //     const dataTable = new DataTable(tableRef.current, {
    //       searching: false,
    //     });
  
    //     return () => {
    //       if (dataTable) {
    //         dataTable.destroy(true);
    //       }
    //     };
    //   }
    // }, []);

    useEffect(() => {
      
    }, [dispatch]);
       useEffect(() => {
        dispatch(fetchWithDrawalPageData());
        }, [dispatch]);
          // --search input
          const [searchDate, setSearchDate] = useState("");
        
          const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchDate(e.target.value);
          };  
          const filteredData = WhithdrawalPageData?.withdrawals?.filter((item: any) => {
            const searchTerm = searchDate.toLowerCase();
          
            return (
              item.lp_amount?.toLowerCase().includes(searchTerm) ||
              item.status?.toLowerCase().includes(searchTerm) ||
              item.member_bank?.bank_acount_no?.toLowerCase().includes(searchTerm) ||
              item.bank?.bank_name?.toLowerCase().includes(searchTerm) ||
              item.created_at?.toLowerCase().includes(searchTerm)
            );
          });          
          const [loading, setLoading] = useState(true);
          let dataTable: any = null;
      useEffect(() => {
        if (tableRef.current && Array.isArray(filteredData) && filteredData.length > 0) {
            setLoading(false);
            dataTable = new DataTable(tableRef.current, {
                searching: true,
                paging: true,
                pageLength: 10,
                destroy: true,
            });
        }
    
        return () => {
            if (dataTable) {
                dataTable.destroy();
            }
        };
    }, [filteredData]);
  return (
    <>
        <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
          <div className="container">
            <div className="relative">
              <Link to="/withdrawal" className="absolute left-0">
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
              <h3 className="text-lg font-medium">Withdrawal Request</h3>
            </div>
          </div>
        </header>
          <section className="py-20 pb-20">
                  <div className="container">
                    <div className="bg-white p-4 border rounded-md">
                        {/* <div className="text-end">
                    <button className="px-4 bg-[#178285] text-xs text-white rounded-md py-2" onClick={()=>handleNavigate()}>Add Content</button>
                        </div> */}
                      <div className="relative overflow-x-auto mt-5 border rounded-md">
                      {/* <div className="flex justify-center tablet:justify-end tablet:mb-[-50px] items-center gap-2 z-[1] relative sm:absolute right-0 top-[3px]">
                            <label className="mt-1 text-sm ms:text-base ">Search :</label>
                    <input
                    type="text"
                    placeholder="Search"
                    value={searchDate}
                    onChange={handleSearchChange}
                    className="py-1 sm:py-2 px-2 border rounded mt-2 sm:me-2 text-xs placeholder:text-sm"
                  />
                        </div> */}
                         {loading &&  (
                <div className="flex justify-center items-center h-10">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>)}
                        <table
                          ref={tableRef}
                          style={{ width: "100%" }}
                          className="display table-auto w-full text-sm text-left rtl:text-right text-black"
                        >
                          <thead className="text-xs text-white uppercase  bg-[#178285]">
                            <tr>
                              <th className="px-6 py-3">Associate</th>
                              <th className="px-6 py-3">Amount</th>
                              <th className="px-6 py-3">Bank Details</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                          {filteredData?.length > 0 ? (
                    filteredData.map((item: any, index: number) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                            <td className="px-6 py-2 text-black">
                              {WhithdrawalPageData.associate_data.f_name}
                            </td>
                            <td className="px-6 py-2 text-black">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(item.lp_amount)}
                        </td>

                            <td className="px-6 py-2 text-black">
                              {item.member_bank.bank_acount_no} - {item.bank.bank_name}
                            </td>
                            <td className="px-6 py-2 text-black">
                                  {new Intl.DateTimeFormat("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }).format(new Date(item.created_at))}
                                </td>
                            <td className="px-6 py-2 text-black">
                            <button
                              className={`text-white py-2 px-4 rounded-md 
                                ${item.status === "PENDING" ? "bg-[#007bff]" : 
                                  item.status === "APPROVED" ? "bg-[#28a745]" : 
                                  item.status === "REJECTED" ? "bg-red-600" : "bg-gray-400"}`}
                            >
                              {item.status}
                            </button>

                            </td>
                          </tr>
                        ))
                      ) :''}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
        </Layout>
    </>
  )
}

export default WithdrawalPage
