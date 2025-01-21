    import React, { useEffect, useRef, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import Layout from "../../../Components/Layout";
    import { useDispatch, useSelector } from "react-redux";
    import { RootState } from "../../../Redux/store";
    import { fetchEarnigReport } from "../../../Redux/thunks/earningReportThunk";
    import { useFormik } from "formik";
    import { fetchSingleEarnigReport } from "../../../Redux/thunks/singleEraningThunk";
    import "datatables.net";
    import DataTable from 'datatables.net-dt';

    const SponseredNetwork = () => {
        const { earningData } = useSelector((state: RootState) => state.earningReport);
        const tableRef = useRef(null);
        const dispatch = useDispatch<any>();
            const currentDate = new Date();
            const months = Array.from({ length: 12 }, (_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                return {
                    value: `${year}-${month}`,
                    label: `${date.toLocaleString('default', { month: 'short' })} ${year}`,
                };
            });
            useEffect(() => {
                if (tableRef.current ) {
                  const dataTable = new DataTable(tableRef.current,{
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
            dispatch(fetchEarnigReport({}));
        }, [dispatch]);

        const formSubmit = (values: any) => {
            const params = values.period ? { period: values.period } : {};
            dispatch(fetchEarnigReport(params));
        };

        const formik = useFormik({
            initialValues: {
                period: months[0].value, 
            },
            onSubmit: formSubmit,
        });

        const formattedData = earningData ? [
            { type: "Referral Bonus", balance: earningData.referral_bonus.balance || "0.00" },
            { type: "Binary Bonus", balance: earningData.binary_bonus.balance || "0.00" },
            { type: "Leadership Income", balance: earningData.leadership_income.balance || "0.00" },
            { type: "Repeat Sale Income", balance: earningData.repeat_sale_income.balance || "0.00" },
            { type: "Roll Up Bonus", balance: earningData.roll_up_bonus.balance || "0.00" },
        ] : [];
              const navigate = useNavigate();  
        const handleOpen = (bonus: string, period: string) => {            
            dispatch(fetchSingleEarnigReport({ bonus, period  }));
            navigate('/viewcommission', { state: { bonus, period } })
        };  

        return (
            <Layout>
                     <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
                    <div className="container">
                        <div className="relative">
                            <Link to="/reports" className="absolute left-0">
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
                            <h3 className="text-lg font-medium">Member Commissions</h3>
                        </div>
                    </div>
                </header>
                    <section className="py-24">
                    <div className="container">
                        <div className="bg-white py-10 px-3">
                            <form onSubmit={formik.handleSubmit}>
                                <label className="text-xs text-[#000] font-medium">Select Period</label>
                                <select
                                    {...formik.getFieldProps('period')}
                                    className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs border rounded-md px-2 py-1"
                                >
                                    {months.map((month) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                ))}
                                </select>
                                <div className="mt-4">
                                    <button type="submit" className="py-2 sm:py-3 w-full bg-[#178285] text-xs text-white rounded-md">Search</button>
                                </div>
                            </form>
                            <div className="pt-8">
                             <h3 className="mb-2 text-sm sm:text-lg font-semibold">Total : $ {earningData && earningData.total_commission}  </h3>
                                <h3 className="text-sm sm:text-lg">Commission List</h3>
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-black ">
                                    <tbody>
                                        {formattedData.length > 0 ? (
                                            formattedData.map((item, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                        {item.type}
                                                    </th>
                                                    <td className="px-6 py-4 text-black">
                                                        ${item.balance || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        <button className="px-4 bg-[#178285] text-xs text-white rounded-md py-2" onClick={() => handleOpen(item.type, formik.values.period)}>View</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-2 text-center">
                                            <div role="status" className="flex justify-center">
                                                <svg aria-hidden="true" className="w-8 h-8 text-black animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
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
        );
    };

    export default SponseredNetwork;
