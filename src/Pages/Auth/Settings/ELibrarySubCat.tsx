
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import DataTable from 'datatables.net-dt';
import Layout from '../../../Components/Layout';
import { fetchELibrarySubCategory } from '../../../Redux/thunks/ELibrarySubCatThunk';

function ELibrarySubCat() {
    const location = useLocation();
    const ID = location.state?.ID; 
    const [loadingg, setLoading] = useState(true);
    const dispatch = useDispatch<any>();
    const { eLibrarySubCatData ,loading} = useSelector((state: RootState) => state.elibrarySubCategory);
    const tableRef = useRef<HTMLTableElement | null>(null);

    // Refresh page once when navigation happens
    useEffect(() => {
        const hasRefreshed = sessionStorage.getItem("hasRefreshed");
        if (!hasRefreshed) {
            sessionStorage.setItem("hasRefreshed", "true");
            window.location.reload();
        } else {
            sessionStorage.removeItem("hasRefreshed");
        }
    }, []);
        useEffect(() => {
            if (ID) {
                const action = {
                    "action": "get-sub-category",
                    "cat_id": ID
                };
                dispatch(fetchELibrarySubCategory(action));
            }
        }, [dispatch, ID]);

      let dataTable: any = null;
      useEffect(() => {
        if (tableRef.current && Array.isArray(eLibrarySubCatData)) {
            if (eLibrarySubCatData.length > 0) {
                // setLoading(false);
                dataTable = new DataTable(tableRef.current, {
                    searching: true,
                    paging: true,
                    pageLength: 10,
                    destroy: true,
                });
            } else {
                setLoading(true); 
            }
        }
    
        return () => {
            if (dataTable) {
                dataTable.destroy();
            }
        };
    }, [eLibrarySubCatData]);
    
  return (
    <>
           <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-20">
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
                      <h3 className="text-lg font-medium">
                      E-Library SubCategory List
                      </h3>
                    </div>
                  </div>
        </header>
        <section className="py-20 pb-20">
          <div className="container">
            <div className="bg-white p-4 border rounded-md">
               
              <div className="relative overflow-x-auto mt-5 border rounded-md">
                  {loadingg && loading &&  (
                <div className="flex justify-center items-center h-10">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>)}
                <table
                  ref={tableRef}
                  style={{ width: "100%" }}
                  className="display table-auto w-full text-sm text-left rtl:text-right text-black z-1"
                >
                  <thead className="text-xs text-white uppercase  bg-[#178285]">
                    <tr>
                      <th className="px-6 py-3 custom-thead">#</th>
                      <th className="px-6 py-3 custom-thead">Category</th>
                      <th className="px-6 py-3 custom-thead">Sub Category</th>
                      <th className="px-6 py-3 custom-thead">Content Type</th>
                      <th className="px-6 py-3 custom-thead">Content Title</th>
                      <th className="px-6 py-3 custom-thead">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eLibrarySubCatData && eLibrarySubCatData.length > 0 ? (
                        eLibrarySubCatData.map((item: any, index: number) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-white cursor-pointer" : "bg-[#efeff1] cursor-pointer"}
                            onClick={() => {
                            if (item.content) {
                                window.open(item.content, "_blank");
                            }
                            }}
                        >
                            <td className="px-6 py-2 text-black custom-thead">{index + 1}</td>
                            <td className="px-6 py-2 text-black custom-thead">{item.cat_name}</td>
                            <td className="px-6 py-2 text-black custom-thead">{item.subcat_name}</td>
                            <td className="px-6 py-2 text-black custom-thead">{item.content_type}</td>
                            <td className="px-6 py-2 text-black custom-thead">{item.content_title}</td>
                            <td className="px-6 py-2 text-black custom-thead">{item.language}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No data available
                        </td>
                        </tr>
                    )}
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

export default ELibrarySubCat
