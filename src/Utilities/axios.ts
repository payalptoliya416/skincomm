import axios from "axios";
import { ADD_CUSTOMER_GETDATA, ADD_CUSTOMER_POSTDATA, ADD_TRANSFER, ANNOUNCE_PENDING_POPUP, ANNOUNCE_READ_POPUP, ANNOUNCEMENT, ANNOUNCEMENT_EDIT, API_URL, BALANCE_URLL, CHANGE_LOGIN_PASSWORD, CHANGE_SECURITY_PASSWORD, CONCERT_DATA, DASHBOARD_DETAILS, DELIVERY_ORDERS, E_LIBRARY_GET_SUB_CATEGORY, E_LIBRARY_LIST, E_LIBRARY_POST, E_LIBRARY_SHOW_CATEGORY, EARNING_REPORT_URL, EWALATE_REPORT_URL, GET_LPBALANCE_URL, GET_PAYMENT_LINK, GET_SECURITY_EMAIL, INVOICE_LIST, INVOICE_PDF_LIST, JUMP_START_AJAX, JUMP_START_POST, MATRIX_SIDE, MATRIX_SIDE_GETSIDE, MEMBER_LINE, NEW_SECURITY_PASSWORD, PAYMENT_BY, PAYMENT_POST, PRPFILE_DATA, PRPFILE_DATA_GET, REORDER_CATEGORY,RESET_LOGIN_PASSSWORD, SEARCH_MY_TEAM, SECURITY_OTP, SECURITY_PASSWORD_BOOLEAN, SEND_LOGIN_OTP, SEND_SECURITY_OTP, SINGALEARNING_REPORT_URL, SPONSORED_NETWORK_URL, SPONSORED_TREE_URL, SUB_ACCOUNT_LOGIN_URL, SUB_ACCOUNT_URL, SUB_ADDBANK_URL, SUB_ADDMEMBER_URL, SUB_BANKLIST_URL, SUB_GETBANKDETAIL_URL, SUB_MOBILENUMBER_URL, SUB_PRODUCTLIST_URL, SUB_PRODUCTLIST_URL_SIGN_UP, SUB_USERDETAIL_URL, UPRANK_GETDATA, UPRANK_POST_DATA, VERIFY_LOGIN_OTP, WITHDRAWAL_REQUEST, WITHDRWAL_REQUEST } from './config';
import { store } from "../Redux/store";

// AxiosWithOutAuthInstance
const AxiosWithOutAuthInstance = axios.create({
    baseURL: API_URL,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});

// AxiosAuthInstance
const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token") }`,
    Accept: 'application/json'
};

const AxiosAuthInstance = axios.create({
    baseURL: API_URL,
    timeout: 24000,
    headers
});

AxiosAuthInstance.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("token") }`;
        return config;
    },
    (error) => {
        if (error?.response?.status === 401) {
            store.dispatch({
                type: "LOG_OUT",
            });
        }
        return Promise.reject(error);
    }
);

AxiosAuthInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            store.dispatch({
                type: "LOG_OUT",
            });
        }
        return Promise.reject(error);
    }
);

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        timeout: 24000,
        headers
    });

    instance.interceptors.request.use(
        (config) => {
            config.headers["Accept"] = 'application/json';
            config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
            return config;
        },
        (error) => {
            if (error?.response?.status === 401) {
                store.dispatch({
                    type: "LOG_OUT",
                });
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
const AxiosAuthBalance = createAxiosInstance(BALANCE_URLL);
const AxiosEWalletReport = createAxiosInstance(EWALATE_REPORT_URL);
const AxiosEarningReport = createAxiosInstance(EARNING_REPORT_URL);
const AxiosSingleEarningReport = createAxiosInstance(SINGALEARNING_REPORT_URL);
const AxiosSponsoredTree = createAxiosInstance(SPONSORED_TREE_URL);
const AxiosSponsoredNetwork = createAxiosInstance(SPONSORED_NETWORK_URL);
const AxiosSubAccountLogin = createAxiosInstance(SUB_ACCOUNT_URL);
const AxiosSubAccountUserLogin = createAxiosInstance(SUB_ACCOUNT_LOGIN_URL);
const AxiosProductList = createAxiosInstance(SUB_PRODUCTLIST_URL);
const AxiosUserDetail = createAxiosInstance(SUB_USERDETAIL_URL);
const AxiosAddMember = createAxiosInstance(SUB_ADDMEMBER_URL);
const AxiosMobileNum = createAxiosInstance(SUB_MOBILENUMBER_URL);
const AxiosAddBank = createAxiosInstance(SUB_ADDBANK_URL);
const AxiosGetBankDetail = createAxiosInstance(SUB_GETBANKDETAIL_URL);
const AxiosBankListDetail = createAxiosInstance(SUB_BANKLIST_URL);
const AxiosGetLPBalance = createAxiosInstance(GET_LPBALANCE_URL);
const AxiosWithdrawal = createAxiosInstance(WITHDRAWAL_REQUEST);
const AxiosLoginPassword = createAxiosInstance(CHANGE_LOGIN_PASSWORD);
const AxiosSecurityPassword = createAxiosInstance(CHANGE_SECURITY_PASSWORD);
const AxiosGetEmail = createAxiosInstance(GET_SECURITY_EMAIL);
const AxioSendSecurityOtp = createAxiosInstance(SEND_SECURITY_OTP);
const AxioSecurityOtp = createAxiosInstance(SECURITY_OTP);
const AxioSecurityNewPassword = createAxiosInstance(NEW_SECURITY_PASSWORD);
const AxioAnnouncement = createAxiosInstance(ANNOUNCEMENT);
const AxiosAnnouncementEdit = createAxiosInstance(ANNOUNCEMENT_EDIT);
const AxiosReorderCategory = createAxiosInstance(REORDER_CATEGORY);
const AxiosPaymentBy = createAxiosInstance(PAYMENT_BY);
const AxioInvoiceList = createAxiosInstance(INVOICE_LIST);
const AxioPaymentByPost = createAxiosInstance(PAYMENT_POST);
const AxioInvoiceListPDF = createAxiosInstance(INVOICE_PDF_LIST);
const AxioInMyTeamSearch = createAxiosInstance(SEARCH_MY_TEAM);
const AxioInMyAnnouncePending = createAxiosInstance(ANNOUNCE_PENDING_POPUP);
const AxioInMyAnnounceReading = createAxiosInstance(ANNOUNCE_READ_POPUP);
const AxioInProfile = createAxiosInstance(PRPFILE_DATA);
const AxioInProfileGet = createAxiosInstance(PRPFILE_DATA_GET);
const AxioInSecurityBoolean = createAxiosInstance(SECURITY_PASSWORD_BOOLEAN);
const AxioInDashboardDetails = createAxiosInstance(DASHBOARD_DETAILS);
const AxioInConverData = createAxiosInstance(CONCERT_DATA);
const AxioInMemberLIne = createAxiosInstance(MEMBER_LINE);
const AxioInTransfer = createAxiosInstance(ADD_TRANSFER);
const AxioInDeliveryOrder = createAxiosInstance(DELIVERY_ORDERS);
const AxiosUPRankGetData = createAxiosInstance(UPRANK_GETDATA);
const AxiosUPRankPostData = createAxiosInstance(UPRANK_POST_DATA);
const AxiosGetCutomerProduct = createAxiosInstance(ADD_CUSTOMER_GETDATA);
const AxiosPostCutomerProduct = createAxiosInstance(ADD_CUSTOMER_POSTDATA);
const AxiosJumpStart = createAxiosInstance(JUMP_START_AJAX);
const AxiosJumpStartPOST = createAxiosInstance(JUMP_START_POST);
const AxiosMatrixside = createAxiosInstance(MATRIX_SIDE);
const AxiosMatrixsideGetSide = createAxiosInstance(MATRIX_SIDE_GETSIDE);
const AxiosELibraryList = createAxiosInstance(E_LIBRARY_LIST);
const AxiosELibraryShowCategory = createAxiosInstance(E_LIBRARY_SHOW_CATEGORY);
const AxiosELibraryGetSubCategory = createAxiosInstance(E_LIBRARY_GET_SUB_CATEGORY);
const AxiosELibraryPost = createAxiosInstance(E_LIBRARY_POST);
const AxiosWithdrwalRequest = createAxiosInstance(WITHDRWAL_REQUEST);
const AxiosgetPaymentLink = createAxiosInstance(GET_PAYMENT_LINK);

const AxiosSendLoginOtp = axios.create({
    baseURL: SEND_LOGIN_OTP ,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});
const AxiosVerifyLogin = axios.create({
    baseURL: VERIFY_LOGIN_OTP ,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});
const AxiosResetLogin = axios.create({
    baseURL: RESET_LOGIN_PASSSWORD ,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});
const AxiosProductListSignup = axios.create({
    baseURL: SUB_PRODUCTLIST_URL_SIGN_UP,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});

// const AxiosAuthBalance = axios.create({
//     baseURL: BALANCE_URLL,
//     timeout: 24000,
//     headers
// });
// AxiosAuthBalance.interceptors.request.use(
//     (config) => {
//         config.headers["Accept"] = 'application/json';
//         config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("token") }`;
//         return config;
//     },
//     (error) => {
//         if (error?.response?.status === 401) {
//             store.dispatch({
//                 type: "LOG_OUT",
//             });
//         }
//         return Promise.reject(error);
//     }
// );

export { AxiosWithOutAuthInstance, AxiosAuthInstance, AxiosAuthBalance,AxiosEWalletReport, AxiosEarningReport ,AxiosSponsoredTree , AxiosSingleEarningReport ,AxiosSponsoredNetwork ,AxiosSubAccountLogin ,AxiosSubAccountUserLogin ,AxiosProductList,AxiosMobileNum , AxiosUserDetail,AxiosAddMember ,AxiosAddBank , AxiosGetBankDetail, AxiosBankListDetail,AxiosGetLPBalance,AxiosWithdrawal,AxiosLoginPassword,AxiosSecurityPassword,AxiosSendLoginOtp,AxiosVerifyLogin,AxiosResetLogin,AxiosGetEmail,AxioSendSecurityOtp,AxioSecurityOtp,AxioSecurityNewPassword,AxioAnnouncement,AxiosAnnouncementEdit,AxiosReorderCategory,AxiosPaymentBy,AxioPaymentByPost,AxioInvoiceList,AxioInvoiceListPDF ,AxioInMyTeamSearch ,AxioInMyAnnounceReading,AxioInMyAnnouncePending ,AxioInProfile,AxioInProfileGet ,AxioInSecurityBoolean,AxioInDashboardDetails, AxioInConverData ,AxioInMemberLIne,AxioInTransfer ,AxioInDeliveryOrder,AxiosUPRankGetData,AxiosUPRankPostData ,AxiosGetCutomerProduct ,AxiosPostCutomerProduct , AxiosJumpStart, AxiosJumpStartPOST, AxiosProductListSignup, AxiosMatrixside,AxiosMatrixsideGetSide ,AxiosELibraryList ,AxiosELibraryShowCategory,AxiosELibraryGetSubCategory,AxiosELibraryPost,AxiosWithdrwalRequest,AxiosgetPaymentLink};