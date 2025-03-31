import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../../Components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEarnigReport } from '../../../Redux/thunks/singleEraningThunk';
import { RootState } from '../../../Redux/store';
import "datatables.net";
import DataTable from 'datatables.net-dt';

function ViewCommissions() {
        const location = useLocation();
        const {  bonus , period } = location.state || {};
       const tableRef = useRef<HTMLTableElement | null>(null);
        const dispatch = useDispatch<any>();   

     useEffect(() => {
           dispatch(fetchSingleEarnigReport({ bonus, period  }));
      }, [dispatch]);

      const { singleearningData ,loading  } = useSelector((state: RootState) => state.singleEarningData);

           // --search input
            const [searchDate, setSearchDate] = useState("");
          
            const filteredData = singleearningData?.filter((item: any) => {
              const typeName = item.type ? item.type.toString().toLowerCase() : '';
              const searchTerm = searchDate.toLowerCase();
            
              return typeName.includes(searchTerm);
            });
            const [loadingsta, setLoadingSta] = useState(true);
    let dataTable: any = null;

    useEffect(() => {
        if (tableRef.current && Array.isArray(filteredData) && filteredData.length > 0) {
            setLoadingSta(false);
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
          <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
                    <div className="container">
                        <div className="relative">
                            <Link to='/sponsoredtnetwork' className="absolute left-0">
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
                            <h3 className="text-lg font-medium">View Commissions</h3>
                        </div>
                    </div>
                </header>
                <section className="py-20">
                    <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white mb-7">
                <div className="relative overflow-x-auto mt-5 border rounded-md p-2">
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
                            {loadingsta &&  (
                <div className="flex justify-center items-center h-10">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>)}
                            <table ref={tableRef}  style={{ width: "100%" }}  className="display  table-auto  w-full text-sm text-left rtl:text-right text-black ">
                              <thead className="text-xs text-white uppercase bg-[#178285]">
                                    <tr>
                                        <th className="px-6 py-5" >Currency</th>
                                        <th className="px-6 py-5" >Trans No</th>
                                       {bonus === 'Referral Bonus' ? <th className="px-6 py-5" >From</th> : ""} 
                                        <th className="px-6 py-5" >Description</th>
                                        <th className="px-6 py-5" >Debit</th>
                                        <th className="px-6 py-5" >Credit</th>
                                        <th className="px-6 py-5" >Balance</th>
                                        <th className="px-6 py-5" >Insert Time</th>
                                    </tr>
                               </thead>
                            <tbody>
                                {loading ? (
                                    
                                    ''
                                ) : filteredData && filteredData.length > 0 ? (
                                    filteredData.map((item: any, index: number) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                            <td className="px-6 py-4 text-black">{item.currency}</td>
                                            <td className="px-6 py-4 text-black">{item.trans_no}</td>
                                            {bonus === 'Referral Bonus' ?  <td className="px-6 py-4 text-black">{item.from_member_f_name}</td> : ""} 
                                            <td className="px-6 py-4 text-black">{item.description}</td>
                                            <td className="px-6 py-4 text-black">{item.debit}</td>
                                            <td className="px-6 py-4 text-black">{item.credit}</td>
                                            <td className="px-6 py-4 text-black">{item.balance}</td>
                                            <td className="px-6 py-4 text-black">{item.insert_time}</td>
                                        </tr>
                                    ))
                                ) : (
                            ''
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </section>
      </Layout>
    </>
  )
}

export default ViewCommissions
