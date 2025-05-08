import React , { useEffect, useRef, useState }from "react";
import { Link } from "react-router-dom";
import Layout from "../../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchEWalletReport } from "../../../Redux/thunks/ewelletReportThunk";
import { RootState } from "../../../Redux/store";
import { useFormik } from "formik";
import "datatables.net";
import DataTable from 'datatables.net-dt';

const SponseredTree = () => {
    const { reportData } = useSelector((state: RootState) => state.ewalletReport);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [loading, setLoading] = useState(true);
    const dataTableRef = useRef<any>(null);

    useEffect(() => {
        if (Array.isArray(reportData)) {
            setLoading(false);
    
            // Delay DataTable init until DOM is ready
            setTimeout(() => {
                if (tableRef.current) {
                    if (dataTableRef.current) {
                        dataTableRef.current.destroy(); // Remove old instance
                        dataTableRef.current = null;
                    }
    
                    // Re-initialize with new data
                    dataTableRef.current = new DataTable(tableRef.current, {
                        searching: true,
                        paging: true,
                        pageLength: 10, // Can change to 25 or more if needed
                        destroy: true,
                    });
                }
            }, 0);
        }
    
        return () => {
            if (dataTableRef.current) {
                dataTableRef.current.destroy();
                dataTableRef.current = null;
            }
        };
    }, [reportData]);
    const dispatch = useDispatch<any>();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

    const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Make sure it's '01', '02', etc.

const initialReport = {
    currency: "",     
    from_year: currentYear.toString(),
    from_month: currentMonth,
    to_year: currentYear.toString(),
    to_month: currentMonth
};

useEffect(() => {
    dispatch(fetchEWalletReport(initialReport));
}, [dispatch]);

    const formSubmit = (values: any) => {
        setLoading(true);
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
            dataTableRef.current = null;
        }
        dispatch(fetchEWalletReport(values));
    };

    const formik = useFormik({
        initialValues: initialReport,
        onSubmit: formSubmit,
    }) as any;

    return (
        <>
            <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-[99]">
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
                            <h3 className="text-lg font-medium">General Ledger</h3>
                        </div>
                    </div>
                </header>

                <section className="py-20">
                    <div className="container">
                    <div className="bg-white p-4 border rounded-md">
                        <form onSubmit={ formik.handleSubmit }>
                            <div className="mb-3">
                            <label className="text-xs text-[#000]">e-Wallet</label>
                                <select {...formik.getFieldProps('currency')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs">
                                    <option selected value="">e-Wallet</option>
                                    <option value="LP">LP</option>
                                    <option value="PP">PP</option>
                                </select>
                            </div>
                           <div className="mb-3">
                           <label className="text-xs text-[#000]">From</label>
                            <div className="flex gap-4 sm:gap-20">
                            <select  {...formik.getFieldProps('from_year')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs">
                                <option defaultValue={0}>Select Year</option>
                                 {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
                            </select>
                            <span>-</span>
                            <select {...formik.getFieldProps('from_month')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs">
                                <option defaultValue={0}>Select Month</option>
                                <option value="01">Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                            </div>
                           </div>
                           <div className="mb-3">
                           <label className="text-xs text-[#a8a1a7]">Until</label>
                            <div className="flex gap-4 sm:gap-20">
                            <select {...formik.getFieldProps('to_year')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs">
                            <option defaultValue={0}>Select Year</option>
                             {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                            </select>
                            <span>-</span>
                            <select  {...formik.getFieldProps('to_month')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs">
                            <option defaultValue={0}>Select Month</option>
                                <option value="01">Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                            </div>
                           </div>
                           <div className="mt-4">
                            <button type="submit" className="py-2 sm:py-3 w-full bg-[#178285] text-xs text-white rounded-md">View</button>
                           </div>
                        </form>
            <div className="relative overflow-x-auto mt-5 border rounded-md">
          
                {loading &&  (
                <div className="flex justify-center items-center h-10">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>)}
            <table ref={tableRef} style={{ width: "100%" }}  className="display table-auto w-full text-sm text-left rtl:text-right text-black" >
                    <thead className="text-xs text-white uppercase  bg-[#178285]">
                        <tr>
                            <th className="px-6 py-3">
                                Trans No
                            </th>
                            <th className="px-6 py-3">
                            Ledger Date
                            </th>
                            <th className="px-6 py-3">
                            Description
                            </th>
                            <th className="px-6 py-3">
                                Credit
                            </th>
                            <th className="px-6 py-3">
                                Debit
                            </th>
                            <th className="px-6 py-3">
                            Balance
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                   {reportData && reportData.length > 0 ? (
                                            reportData.map((item: any, index: number) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                                                    <td className="px-6 py-2 text-black">{item.trans_no}</td>
                                                    <td className="px-6 py-2 text-black">
                                                        {item.period}
                                                    </td>
                                                    
                                                    <td className="px-6 py-2 text-black">{item.description}</td>
                                                    <td className="px-6 py-2 text-black">{item.credit}</td>
                                                    <td className="px-6 py-2 text-black">{item.debit}</td>
                                                    <td className="px-6 py-2 text-black">{item.balance}</td>
                                                </tr>
                                            ))
                    ):"" }
                   </tbody>
                </table>
            </div>
                    </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default SponseredTree;