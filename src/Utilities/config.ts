const ENV: string = 'Live';

const BASE_URL: string = ENV === 'development' ?  'http://127.0.0.1:8000' : 'http://192.168.29.134:8080';
// const BASE_URL: string = ENV === 'development' ?  'http://192.168.1.19:8080' : 'https://staging.acp.sgcoders.net';
// const BASE_URL: string = ENV === 'development' ?  'http://192.168.1.19:8080' : 'https://acp.skincomm.com';

// export const LIVE_URL: string = 'localhost:3000/#';
export const LIVE_URL: string = 'https://staging.m.sgcoders.net/#';
// export const LIVE_URL: string = 'https://m.skincomm.com/#';

const API_URL: string = BASE_URL + '/api/'; 
const STORAGE_URL: string = BASE_URL + '/storage/';
const BALANCE_URLL :string = BASE_URL + '/api/getbalance'
const EWALATE_REPORT_URL : string = BASE_URL + '/api/e-wallet-report'
const EARNING_REPORT_URL : string = BASE_URL + '/api/earning-report'
const SINGALEARNING_REPORT_URL : string = BASE_URL + '/api/earning-report-detail'   
const SPONSORED_TREE_URL : string = BASE_URL + '/api/placementtree'
const SEARCH_MY_TEAM : string = BASE_URL + '/api/member-search'
const SPONSORED_NETWORK_URL : string = BASE_URL + '/api/sponsorednetwork'
const SUB_ACCOUNT_URL : string = BASE_URL + '/api/sub-accounts'
const SUB_ACCOUNT_LOGIN_URL : string = BASE_URL + '/api/sub-account-login'
const SUB_PRODUCTLIST_URL : string = BASE_URL + '/api/add-member-getdata'
const SUB_PRODUCTLIST_URL_SIGN_UP : string = BASE_URL + '/api/add-member-getdata-public'
const SUB_MOBILENUMBER_URL : string = BASE_URL + '/api/get-member-details'
const SUB_USERDETAIL_URL : string = BASE_URL + '/api/get-member-details'
const SUB_ADDMEMBER_URL : string = BASE_URL + '/api/add-member-post'
const SUB_ADDBANK_URL : string = BASE_URL + '/api/member-bank'
const SUB_GETBANKDETAIL_URL : string = BASE_URL + '/api/get-member-bank-list'
const SUB_BANKLIST_URL : string = BASE_URL + '/api/get-bank-list'
const GET_LPBALANCE_URL : string = BASE_URL + '/api/get-lp-balance'
const WITHDRAWAL_REQUEST: string = BASE_URL + '/api/withdraw-request'
const CHANGE_LOGIN_PASSWORD: string = BASE_URL + '/api/change-login-password'
const CHANGE_SECURITY_PASSWORD: string = BASE_URL + '/api/change-security-password'
const SEND_LOGIN_OTP: string = BASE_URL + '/api/send-login-otp'
const VERIFY_LOGIN_OTP: string = BASE_URL + '/api/verify-login-otp'
const RESET_LOGIN_PASSSWORD: string = BASE_URL + '/api/reset-password'
const GET_SECURITY_EMAIL: string = BASE_URL + '/api/get-member-email'
const SEND_SECURITY_OTP : string = BASE_URL + '/api/send-security-otp'
const SECURITY_OTP : string = BASE_URL + '/api/verify-security-otp'
const NEW_SECURITY_PASSWORD : string = BASE_URL + '/api/reset-security-password'
const ANNOUNCEMENT : string = BASE_URL + '/api/announcement-list'
const ANNOUNCEMENT_EDIT : string = BASE_URL + '/api/announcement-edit/'
const REORDER_CATEGORY : string = BASE_URL + '/api/reorder-data'    
const PAYMENT_BY : string = BASE_URL + '/api/reorder-data'    
const PAYMENT_POST : string = BASE_URL + '/api/reorder-post'    
const INVOICE_LIST : string = BASE_URL + '/api/invoices-list'    
const INVOICE_PDF_LIST : string = BASE_URL + '/api/invoice-generate'    
const ANNOUNCE_PENDING_POPUP : string = BASE_URL + '/api/get-pending-announcement'    
const ANNOUNCE_READ_POPUP : string = BASE_URL + '/api/announcement-read'    
const PRPFILE_DATA : string = BASE_URL + '/api/member-edit'    
const PRPFILE_DATA_GET : string = BASE_URL + '/api/member-detail'    
const SECURITY_PASSWORD_BOOLEAN : string = BASE_URL + '/api/get-security-password'    
const DASHBOARD_DETAILS : string = BASE_URL + '/api/dashboard-details'    
const CONCERT_DATA : string = BASE_URL + '/api/convert-add'    
const MEMBER_LINE : string = BASE_URL + '/api/check-members-line'    
const ADD_TRANSFER : string = BASE_URL + '/api/add-transfer'    
const DELIVERY_ORDERS : string = BASE_URL + '/api/delivery_orders'    
const UPRANK_GETDATA : string = BASE_URL + '/api/uprank-getdata'    
const UPRANK_POST_DATA : string = BASE_URL + '/api/uprank-post'    
const ADD_CUSTOMER_GETDATA : string = BASE_URL + '/api/add-customer-getdata'    
const ADD_CUSTOMER_POSTDATA : string = BASE_URL + '/api/add-customer-post'    
const JUMP_START_AJAX : string = BASE_URL + '/api/jumpstart-ajax'    
const JUMP_START_POST : string = BASE_URL + '/api/jumpstart-post'    
const MATRIX_SIDE : string = BASE_URL + '/api/referral-users-matrix-side'    
const MATRIX_SIDE_GETSIDE : string = BASE_URL + '/api/get-referral-users-matrix-side'    
const E_LIBRARY_LIST : string = BASE_URL + '/api/get-e-library'        
const WITHDRWAL_REQUEST : string = BASE_URL + '/api/get-withdraw-request'    
const GET_PAYMENT_LINK : string = BASE_URL + '/api/get-payment-link'    
const SINGAPURE_COUNTRY : string = BASE_URL + '/api/fetch-country'    

export { BASE_URL, API_URL, STORAGE_URL, ENV ,BALANCE_URLL,EWALATE_REPORT_URL ,EARNING_REPORT_URL , SINGALEARNING_REPORT_URL ,SPONSORED_TREE_URL ,SPONSORED_NETWORK_URL ,SUB_ACCOUNT_URL ,SUB_ACCOUNT_LOGIN_URL,SUB_PRODUCTLIST_URL ,SUB_MOBILENUMBER_URL ,SUB_USERDETAIL_URL,SUB_ADDMEMBER_URL,SUB_ADDBANK_URL ,SUB_GETBANKDETAIL_URL ,SUB_BANKLIST_URL,GET_LPBALANCE_URL,WITHDRAWAL_REQUEST,CHANGE_LOGIN_PASSWORD,CHANGE_SECURITY_PASSWORD,SEND_LOGIN_OTP,VERIFY_LOGIN_OTP,RESET_LOGIN_PASSSWORD,GET_SECURITY_EMAIL,SEND_SECURITY_OTP,SECURITY_OTP,NEW_SECURITY_PASSWORD ,ANNOUNCEMENT,ANNOUNCEMENT_EDIT,REORDER_CATEGORY,PAYMENT_BY,PAYMENT_POST,INVOICE_LIST,INVOICE_PDF_LIST ,SEARCH_MY_TEAM ,ANNOUNCE_PENDING_POPUP,ANNOUNCE_READ_POPUP ,PRPFILE_DATA ,PRPFILE_DATA_GET ,SECURITY_PASSWORD_BOOLEAN,DASHBOARD_DETAILS , CONCERT_DATA, MEMBER_LINE , ADD_TRANSFER ,DELIVERY_ORDERS,UPRANK_GETDATA,UPRANK_POST_DATA,ADD_CUSTOMER_GETDATA ,ADD_CUSTOMER_POSTDATA, JUMP_START_AJAX,JUMP_START_POST , SUB_PRODUCTLIST_URL_SIGN_UP,MATRIX_SIDE,MATRIX_SIDE_GETSIDE ,E_LIBRARY_LIST  ,WITHDRWAL_REQUEST,GET_PAYMENT_LINK,SINGAPURE_COUNTRY};
