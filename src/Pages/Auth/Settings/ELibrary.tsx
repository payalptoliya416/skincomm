import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import DataTable from 'datatables.net-dt';
import { fetchELibraryList } from '../../../Redux/thunks/ELibraryListThunk';

function ELibrary() {
    const dispatch = useDispatch<any>();

    const { eLibraryListData  } = useSelector((state: RootState) => state.elibrary);
      const tableRef = useRef<HTMLTableElement | null>(null);
  const navigate = useNavigate();

    useEffect(() => {
      
    }, [dispatch]);
       useEffect(() => {
            const action = {
                action:'get-category'
        }   
        dispatch(fetchELibraryList(action));
        }, [dispatch]);
      
          const [loading, setLoading] = useState(true);
      let dataTable: any = null;
      useEffect(() => {
        if (tableRef.current && Array.isArray(eLibraryListData) && eLibraryListData.length > 0) {
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
    }, [eLibraryListData]);

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
               
              <div className="relative overflow-x-auto mt-5 border rounded-md">
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
                      <th className="px-6 py-3 ">#</th>
                      <th className="px-6 py-3 ">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eLibraryListData && eLibraryListData.length > 0
                      ? eLibraryListData.map((item: any, index: number) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white cursor-pointer" : "bg-[#efeff1] cursor-pointer" 
                            }
                            onClick={() => navigate('/e-library/sub-category', { state: { ID: item.cat_id } })}
                          >
                            <td className="px-6 py-2 text-black ">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 text-black  ">
                            {item.cat_name}
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
