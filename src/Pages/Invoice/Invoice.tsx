import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { fetchInvoiceList } from '../../Redux/thunks/InvoiceListThunk';
import { IoPrint } from "react-icons/io5";
import "datatables.net";
import DataTable from 'datatables.net-dt';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { fetchInvoicePdf } from '../../Redux/thunks/InvoicePdfThunk';
import { ToastContainer } from 'react-toastify';

function Invoice() {
    const { invoiceData} = useSelector((state: RootState) => state.invoicelist);
    const tableRef = useRef<HTMLTableElement | null>(null);
const dispatch = useDispatch<any>();

useEffect(() => {
    if (tableRef.current) {
        const dataTable = new DataTable(tableRef.current, {
            searching: false,
            paging: true,
            pageLength: 10,
            destroy: true, 
        });

        return () => {
            dataTable.destroy(true);
        };
    }
}, []);

    const [searchDate, setSearchDate] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value);
  };

const filteredData = invoiceData?.invoices?.filter((item: any) => {
    const query = searchDate.toLowerCase();
    return (
      item.invoice_no.toLowerCase().includes(query) ||
      item.order_date.toLowerCase().includes(query) ||
      item.product.product_name.toLowerCase().includes(query) ||
      item.product.product_associate_price.toString().includes(query) ||
      item.payment_type.toLowerCase().includes(query)
    );
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);
    const initialReport = {
       search_year : new Date().getFullYear().toString()
    };
    useEffect(() => {        
        dispatch(fetchInvoiceList(initialReport));
    }, [dispatch]);

    const formSubmit = (values: any) => {
        dispatch(fetchInvoiceList(values));
    };

    const formik = useFormik({
        initialValues: initialReport,
        onSubmit: formSubmit,
    }) as any;
    
    // ----pdf download 
    const handleDownloadPdf =async (id: number) => {
        try {
        const pdfData = await   dispatch(fetchInvoicePdf(id));
        const container = document.createElement('div');
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "200mm";
    container.style.padding = "15px";

    const { 
        invoice_no, 
        invoice_date, 
        name, 
        country, 
        gst_percentage,
        co_address,
        mobile, 
        products, 
        payment_type,
        userid,
        sponsorid,
        co_state,
        co_zip,
        grand_total,
        total_amount ,
        co_registration_number,
        address,
        address2,
        zip,
        deliver_status,
        shipment_costs,
        RP,
        PP,
        credit_card,
        status,
        
    } = pdfData;
    const totalQuantity = products.reduce((acc : any, product : any) => acc + product.quantity, 0);
    // const totalDeliveryCharge = products.reduce((acc: number, product: any) => acc * (product.shipment_costs || 1), 1);
const totalDeliveryCharge = products.reduce((acc: number, product: any) => acc + (Number(product.shipment_costs) || 0),0);

        const productRows = products.map((product : any, index :number) => {
            return `
                <tr>
                    <td class='px-1 pt-0 border-t border-solid border-black text-[9px] pb-3'>${product.product_code ? product.product_code : ""}
                    </td>
                    <td class='px-1 pt-0 border-t border-solid border-black text-[9px] pb-3'>${product.product_description ? product.product_description : ""}
                    </td>
                    <td class='px-1 pt-0 border-t border-solid border-black text-[9px] pb-3'>${product.quantity ? product.quantity : ""}</td>
                    <td class='px-1 pt-0 border-t border-solid border-black text-[9px] pb-3'>${(product.amount - product.amount * (gst_percentage / 100)).toFixed(2)}</td>
                    <td class='px-1 pt-0 border-t border-solid border-black text-[9px] pb-3'>${(product.total_amount - product.total_amount * (gst_percentage / 100)).toFixed(2)}</td>
                </tr>
            `;
        }).join('');

        const billContent = document.createElement('div');
        billContent.id = "bill";
        billContent.innerHTML = `
               <div class="container mx-auto">
                    <h3 class='text-end uppercase text-[10px]'>TAX INVOICE/OFFICIAL RECEIPT </h3>
                    <div class="flex justify-between mb-2">
                 <div>
                    <img src="images/pdfimage.jpg" alt="" class='w-28' />
                        <div class='text-[9px] mt-1 px-1'> Address :  ${co_address ? co_address : "" } </div>
                        <div class='text-[9px] mt-1 px-1'> ${country ? country : ""} , ${co_state ? co_state:""} , ${co_zip ? co_zip :""} </div>
                        
                 </div>
                 <div class='flex px-1 '>
                   <ul>
                    <li class='mb-1 text-end text-[9px]'>Co. Registration No.: </li>
                    <li class='mb-1 text-end text-[9px]'>Invoice / Receipt No.: </li>
                    <li class='mb-1 text-end text-[9px]'>Invoice / Receipt Date: </li>
                   </ul>
                   <ul>
                   <li class='mb-1 text-end text-[9px] h-[14px]'>
                  ${co_registration_number ? co_registration_number : ""}
                    </li>
                    <li class='mb-1 text-end text-[9px]'> ${invoice_no} </li>
                    <li class='mb-1 text-end text-[9px]'> ${invoice_date}</li>
                   </ul>
                 </div>
                    </div>
                 <div class=" mb-2">
                        <table class='w-full border border-solid border-black '>
                        <h3 class='font-semibold px-1 pt-0 text-[10px] pb-3'>Invoiced To</h3>
                            <tbody>
                                <tr>
                                    <td class='px-1 pt-0'>
                                    <div class="flex border-right border-solid border-black px-1 ">
                            <ul class='pt-0 pb-5'>
                                <li class='text-[9px] mb-1'>Name: ${name}</li>
                                <li class='text-[9px] mb-1'>Associate Address: ${address ? `${address}` : ""} ${address2 ? `, ${address2}` : ""} ${ zip? `${zip}` : "" } </li>
                                <li class='text-[9px] mb-1'>Contact: ${mobile ? mobile : ""}</li>
                            </ul>
                        </div>
                                    </td>
                                    <td>
                                    <div class="flex px-1 ">
                            <ul class='pt-0 pb-5'>
                                <li class='text-[9px] mb-1'>Associate ID: ${userid}</li>
                                <li class='text-[9px] mb-1'>Sponsor ID: ${sponsorid} </li>
                            </ul>
                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                 </div>
                 <table class='border border-solid border-black mb-2 w-full'>
                    <thead>
                        <tr>
                            <th class='px-1 pt-0 text-start text-[10px] pb-3'>SKU</th>
                            <th class='px-1 pt-0 text-start text-[10px] pb-3'>DESCRIPTION</th>
                            <th class='px-1 pt-0 text-start text-[10px] pb-3'>QTY</th>
                            <th class='px-1 pt-0 text-start text-[10px] pb-3'> UNIT </th>
                            <th class='px-1 pt-0 text-start text-[10px] pb-3'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                          ${productRows}
                    </tbody>
                    
                 </table>
               <table class='border border-solid border-black mb-2 w-full h-32 align-top'>
                <tbody>
                <tr class='flex justify-end me-10'>
                <td class='align-top'></td>
                <td class='align-top'> <span class=' px-1 pt-0 text-[10px] pb-3 '>Total Quantity:</span>
                <span class=' px-1 pt-0 text-[9px]  pb-3 mr-4'> ${totalQuantity} </span>
                </td>
                <td class='align-top'>
                <ul>
                <li>
                  <span class=' px-1 pt-0 text-[10px]  pb-3'>TOTAL : </span>
                <span class=' px-1 pt-0 text-[9px] pb-3'>$${(total_amount - total_amount * (gst_percentage / 100)).toFixed(2)}</span>
                </li>
                 <li>
                <span class='px-1 pt-0 text-[10px] pb-3'>GST: </span>
             <span class='px-1 pt-0 text-[9px] pb-3'>$${(total_amount * (gst_percentage / 100)).toFixed(2)}</span>
            </li>
                 <li>
                <span class='px-1 pt-0 text-[10px] pb-3'>Delivery Change: </span>
      <span class='px-1 pt-0 text-[9px] pb-3'>$${totalDeliveryCharge.toFixed(2)}</span>
            </li>
                
            <li>
                <span class='px-1 pt-0 text-[10px] pb-3'>GRAND TOTAL : </span>
               <span class='px-1 pt-0 text-[9px]'>$${(Number(total_amount) + Number(shipment_costs)).toFixed(2)}</span>
            </li>   
                 ${status === "REFUND" ? `
                <li class="font-[400] text-[10px] leading-[8px] rounded-[10px] text-center text-white bg-[#DC3545] px-[8px] pt-0 inline-block whitespace-nowrap align-baseline pb-[16px] mb-[10px]">
                    Refund
                </li>` : ""}
                </ul>
                </td>
                 </tr>
                 </tr>
                </tbody>
               </table>
               <div class="mb-30">
                <h3 class='font-semibold text-[10px]'>PAYMENT DETAILS </h3>
                <table class=' mb-2 w-full'>
                    <tbody>
                        <tr>
                            <td class='font-semibold px-1 pt-0 text-[9px]  pb-3'>Amount Paid $: </td>
                            <td class='text-[9px] pb-3'> $${grand_total.toFixed(2)} </td>
                            <td class='font-semibold px-1 pt-0 text-[9px]  pb-3'>Balance Payment $0 </td>
                            </tr>
                            <tr>
                            <td class='font-semibold px-1 pt-0 text-[9px]  pb-3'>Payment Mode: </td>
                            <td class='px-1 pt-0 text-[9px]  pb-3'>${payment_type} 
                            ${payment_type === 'E-WALLET' ? `(PP : ${PP} RP: ${RP} Credit Card: ${credit_card})`: ""}
                            ${payment_type === "CREDIT CARD" ? `(Credit Card: ${credit_card})`: "" }
                           </td>
                            <td class='font-semibold px-1 pt-0 text-[9px]  pb-3 gap-2 flex items-center'><span>Deliver Status:</span> <span class='capitalize font-normal pb-1'>${deliver_status ? deliver_status.replace(/_/g, ' ') : ""}</span> </td>
                        </tr>
                    </tbody>
                </table>
                <table class='border border-solid border-black w-full'>
                    <tbody>
                        <tr>
                            <td rowSpan="2" class='border border-solid border-black align-top px-1 pt-0  w-[70%]  pb-3 text-[9px]'>Thank you for your order. Sales are governed by the Company Policies and Procedures</td>
                            <td colSpan="2" class='border border-solid border-black px-1 pt-0 pb-3 mb-3 text-[9px]'>
                            I confirmed this order is accurate and I agreed to the terms and conditions.
                        </tr>
                    </tbody>
                </table>
                <p class='text-[9px]'>Computer generated receipt, no signature required.</p>
               </div>
                </div>
        `;
        
        container.appendChild(billContent);
        
        document.body.appendChild(container);
        
        html2canvas(container)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('invoice.pdf');
            
            document.body.removeChild(container);
          });
        } catch (error) {
            console.error(error);
        }
     
      };
  return (
    <>
             <Layout>
                <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border z-10">
                    <div className="container">
                        <div className="relative">
                            <Link to="/dashboard" className="absolute left-0">
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
                            <h3 className="text-lg font-medium">Invoice List</h3>
                        </div>
                    </div>
                </header>
                <ToastContainer/>
                <section className="py-20">
                    <div className="container">
                    <div className="bg-white p-4 border rounded-md">
                        <form onSubmit={ formik.handleSubmit }>
                           <div className="mb-3">
                           <label className="text-xs text-[#a8a1a7]">From</label>
                            <div className="flex gap-5 md:gap-20">
                            <select  {...formik.getFieldProps('search_year')} className="text-[#5b5968] w-full border-b border-[#a8a1a7] text-xs py-2">  
                            {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            </div>
                           </div>
                           <div className="mt-4">
                            <button type="submit" className="py-2 sm:py-3 w-full bg-[#178285] text-xs text-white rounded-md hover:bg-[#227275]">View</button>
                           </div>
                        </form>
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
                <table ref={tableRef}  style={{ width: "100%" }}   className="display table-auto w-full text-sm text-left rtl:text-right text-black" >
          
                <thead className="text-xs text-black uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">
                                Invoice
                            </th>
                            <th className="px-6 py-3">
                            Date
                            </th>
                            <th className="px-6 py-3">
                                Total Amount
                            </th>
                            <th className="px-6 py-3">
                              Transaction
                            </th>
                            <th  className="px-6 py-3">action</th>
                        </tr>
                    </thead>
                    <tbody>
                   {filteredData   && filteredData.length > 0 ? (
                          filteredData.map((item: any, index: number) => (
                           <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#efeff1]"}>
                           <td className="px-6 py-2">{item.invoice_no}</td>
                        <td className="px-6 py-2 font-medium text-black whitespace-nowrap">
                           {item.order_date}
                             </td>
                             <td className="px-6 py-2">{item.total_amount}</td>
                             <td className="px-6 py-2">{item.payment_type}</td>
                         <td className="px-6 py-2"><IoPrint className='text-xl cursor-pointer' onClick={()=>handleDownloadPdf(item.id)}  /></td>
                           </tr>
                     ))) : "" }
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

export default Invoice
