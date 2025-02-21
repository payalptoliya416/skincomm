import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import DataTable from 'datatables.net-dt';
import { fetchELibraryList } from '../../../Redux/thunks/ELibraryListThunk';
import { FaEye } from "react-icons/fa6";

function ELibrary() {
    const dispatch = useDispatch<any>();

    const { eLibraryListData  } = useSelector((state: RootState) => state.elibrary);
    const tableRef = useRef(null);
  
    useEffect(() => {
      if (tableRef.current) {
        const dataTable = new DataTable(tableRef.current, {
          searching: false,
        });
  
        return () => {
          if (dataTable) {
            dataTable.destroy(true);
          }
        };
      }
    }, []);

    useEffect(() => {
      
    }, [dispatch]);
       useEffect(() => {
            const action = {
                action:'get-e-library'
        }   
        dispatch(fetchELibraryList(action));
        }, [dispatch]);
          // --search input
          const [searchDate, setSearchDate] = useState("");
        
          const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchDate(e.target.value);
          };
          
          const filteredData = eLibraryListData?.filter((item: any) => {
            const searchTerm = searchDate.toLowerCase();
          
            return (
              item.cat_name?.toLowerCase().includes(searchTerm) ||
              item.subcat_name?.toLowerCase().includes(searchTerm) ||
              item.content_type?.toLowerCase().includes(searchTerm) ||
              item.content_title?.toLowerCase().includes(searchTerm) ||
              item.language?.toLowerCase().includes(searchTerm)
            );
          });
          
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
                      E-Library Category List
                      </h3>
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
              <div className="flex justify-center tablet:justify-end tablet:mb-[-50px] items-center gap-2 z-[1] relative sm:absolute right-0 top-[3px]">
                    <label className="mt-1 text-sm ms:text-base ">Search :</label>
            <input
            type="text"
            placeholder="Search"
            value={searchDate}
            onChange={handleSearchChange}
            className="py-1 sm:py-2 px-2 border rounded mt-2 sm:me-2 text-xs placeholder:text-sm"
          />
                </div>
                <table
                  ref={tableRef}
                  style={{ width: "100%" }}
                  className="display table-auto w-full text-sm text-left rtl:text-right text-black"
                >
                  <thead className="text-xs text-white uppercase  bg-[#178285]">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Sub Category</th>
                      <th className="px-6 py-3">Contect Type</th>
                      <th className="px-6 py-3">Contect Title</th>
                      <th className="px-6 py-3">Language</th>
                      <th className="px-6 py-3">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData && filteredData.length > 0
                      ? filteredData.map((item: any, index: number) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"
                            }
                          >
                            <td className="px-6 py-2 text-black">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 text-black">
                            {item.cat_name}
                            </td>
                            <td className="px-6 py-2 text-black">
                           {item.subcat_name}
                            </td>
                            <td className="px-6 py-2 text-black">
                                {item.content_type}
                            </td>
                            <td className="px-6 py-2 text-black">
                                {item.content_title}
                            </td>
                            <td className="px-6 py-2 text-black">
                                {item.language}
                            </td>
                            <td className="px-6 py-2 text-black">
                                <a href={item.content} target='_blank'><FaEye /></a>
                            </td>
                          </tr>
                        ))
                      : ""}
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

export default ELibrary
