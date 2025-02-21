import axios from "axios";
import { ADD_CUSTOMER_GETDATA, ADD_CUSTOMER_POSTDATA, ADD_TRANSFER, ANNOUNCE_PENDING_POPUP, ANNOUNCE_READ_POPUP, ANNOUNCEMENT, ANNOUNCEMENT_EDIT, API_URL, BALANCE_URLL, CHANGE_LOGIN_PASSWORD, CHANGE_SECURITY_PASSWORD, CONCERT_DATA, DASHBOARD_DETAILS, DELIVERY_ORDERS, E_LIBRARY_GET_SUB_CATEGORY, E_LIBRARY_LIST, E_LIBRARY_POST, E_LIBRARY_SHOW_CATEGORY, EARNING_REPORT_URL, EWALATE_REPORT_URL, GET_LPBALANCE_URL, GET_SECURITY_EMAIL, INVOICE_LIST, INVOICE_PDF_LIST, JUMP_START_AJAX, JUMP_START_POST, MATRIX_SIDE, MATRIX_SIDE_GETSIDE, MEMBER_LINE, NEW_SECURITY_PASSWORD, PAYMENT_BY, PAYMENT_POST, PRPFILE_DATA, PRPFILE_DATA_GET, REORDER_CATEGORY,RESET_LOGIN_PASSSWORD, SEARCH_MY_TEAM, SECURITY_OTP, SECURITY_PASSWORD_BOOLEAN, SEND_LOGIN_OTP, SEND_SECURITY_OTP, SINGALEARNING_REPORT_URL, SPONSORED_NETWORK_URL, SPONSORED_TREE_URL, SUB_ACCOUNT_LOGIN_URL, SUB_ACCOUNT_URL, SUB_ADDBANK_URL, SUB_ADDMEMBER_URL, SUB_BANKLIST_URL, SUB_GETBANKDETAIL_URL, SUB_MOBILENUMBER_URL, SUB_PRODUCTLIST_URL, SUB_PRODUCTLIST_URL_SIGN_UP, SUB_USERDETAIL_URL, UPRANK_GETDATA, UPRANK_POST_DATA, VERIFY_LOGIN_OTP, WITHDRAWAL_REQUEST, WITHDRWAL_REQUEST } from './config';
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

// const AxiosEWalletReport = axios.create({
//     baseURL: EWALATE_REPORT_URL,
//     timeout: 24000,
//     headers
// });
// AxiosEWalletReport.interceptors.request.use(
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
// const AxiosEarningReport = axios.create({
//     baseURL: EARNING_REPORT_URL,
//     timeout: 24000,
//     headers
// });
// AxiosEarningReport.interceptors.request.use(
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

// const AxiosSingleEarningReport = axios.create({
//     baseURL: SINGALEARNING_REPORT_URL,
//     timeout: 24000,
//     headers
// });
// AxiosSingleEarningReport.interceptors.request.use(
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
// const AxiosSponsoredTree = axios.create({
//     baseURL: SPONSORED_TREE_URL,
//     timeout: 24000,
//     headers
// });
// AxiosSponsoredTree.interceptors.request.use(
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

// const AxiosSponsoredNetwork = axios.create({
//     baseURL: SPONSORED_NETWORK_URL,
//     timeout: 24000,
//     headers
// });
// AxiosSponsoredNetwork.interceptors.request.use(
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
// const AxiosSubAccountLogin = axios.create({
//     baseURL: SUB_ACCOUNT_URL,
//     timeout: 24000,
//     headers
// });
// AxiosSubAccountLogin.interceptors.request.use(
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
// const AxiosSubAccountUserLogin = axios.create({
//     baseURL: SUB_ACCOUNT_LOGIN_URL,
//     timeout: 24000,
//     headers
// });
// AxiosSubAccountUserLogin.interceptors.request.use(
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
// const AxiosProductList = axios.create({
//     baseURL: SUB_PRODUCTLIST_URL,
//     timeout: 24000,
//     headers
// });
// AxiosProductList.interceptors.request.use(
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
   
// const AxiosUserDetail = axios.create({
//     baseURL: SUB_USERDETAIL_URL,
//     timeout: 24000,
//     headers
// });
// AxiosUserDetail.interceptors.request.use(
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
// const AxiosAddMember = axios.create({
//     baseURL: SUB_ADDMEMBER_URL,
//     timeout: 24000,
//     headers
// });
// AxiosAddMember.interceptors.request.use(
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
// const AxiosMobileNum = axios.create({
//     baseURL: SUB_MOBILENUMBER_URL,
//     timeout: 24000,
//     headers
// });
// AxiosMobileNum.interceptors.request.use(
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
// const AxiosAddBank = axios.create({
//     baseURL: SUB_ADDBANK_URL,
//     timeout: 24000,
//     headers
// });
// AxiosAddBank.interceptors.request.use(
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


// const AxiosGetBankDetail = axios.create({
//     baseURL: SUB_GETBANKDETAIL_URL,
//     timeout: 24000,
//     headers
// });

// AxiosGetBankDetail.interceptors.request.use(
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

// const AxiosBankListDetail = axios.create({
//     baseURL: SUB_BANKLIST_URL ,
//     timeout: 24000,
//     headers
// });

// AxiosBankListDetail.interceptors.request.use(
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
// const AxiosGetLPBalance = axios.create({
//     baseURL: GET_LPBALANCE_URL ,
//     timeout: 24000,
//     headers
// });

// AxiosGetLPBalance.interceptors.request.use(
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
// const AxiosWithdrawal = axios.create({
//     baseURL: WITHDRAWAL_REQUEST ,
//     timeout: 24000,
//     headers
// });

// AxiosWithdrawal.interceptors.request.use(
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
// const AxiosLoginPassword = axios.create({
//     baseURL: CHANGE_LOGIN_PASSWORD ,
//     timeout: 24000,
//     headers
// });

// AxiosLoginPassword.interceptors.request.use(
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
// const AxiosSecurityPassword = axios.create({
//     baseURL: CHANGE_SECURITY_PASSWORD ,
//     timeout: 24000,
//     headers
// });

// AxiosSecurityPassword.interceptors.request.use(
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



// const AxiosGetEmail = axios.create({
//     baseURL: GET_SECURITY_EMAIL ,
//     timeout: 24000,
//     headers
// });

// AxiosGetEmail.interceptors.request.use(
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
// const AxioSendSecurityOtp = axios.create({
//     baseURL: SEND_SECURITY_OTP,
//     timeout: 24000,
//     headers
// });

// AxioSendSecurityOtp.interceptors.request.use(
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
// const AxioSecurityOtp = axios.create({
//     baseURL: SECURITY_OTP,
//     timeout: 24000,
//     headers
// });

// AxioSecurityOtp.interceptors.request.use(
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
// const AxioSecurityNewPassword = axios.create({
//     baseURL: NEW_SECURITY_PASSWORD,
//     timeout: 24000,
//     headers
// });

// AxioSecurityNewPassword.interceptors.request.use(
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
// const AxioAnnouncement= axios.create({
//     baseURL: ANNOUNCEMENT,
//     timeout: 24000,
//     headers
// });

// AxioAnnouncement.interceptors.request.use(
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

// const AxiosAnnouncementEdit = axios.create({
//     baseURL: ANNOUNCEMENT_EDIT,
//     timeout: 24000,
//     headers
// });

// AxiosAnnouncementEdit.interceptors.request.use(
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

// const AxiosReorderCategory = axios.create({
//     baseURL: REORDER_CATEGORY,
//     timeout: 24000,
//     headers
// });

// AxiosReorderCategory.interceptors.request.use(
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
// const AxiosPaymentBy = axios.create({
//     baseURL: PAYMENT_BY,
//     timeout: 24000,
//     headers
// });

// AxiosPaymentBy.interceptors.request.use(
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

// const AxioInvoiceList = axios.create({
//     baseURL: INVOICE_LIST,
//     timeout: 24000,
//     headers
// });

// AxioInvoiceList.interceptors.request.use(
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
// const AxioPaymentByPost = axios.create({
//     baseURL: PAYMENT_POST,
//     timeout: 24000,
//     headers
// });

// AxioPaymentByPost.interceptors.request.use(
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
// const AxioInvoiceListPDF = axios.create({
//     baseURL: INVOICE_PDF_LIST,
//     timeout: 24000,
//     headers
// });

// AxioInvoiceListPDF.interceptors.request.use(
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
// const AxioInMyTeamSearch = axios.create({
//     baseURL: SEARCH_MY_TEAM,
//     timeout: 24000,
//     headers
// });

// AxioInMyTeamSearch.interceptors.request.use(
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
// const AxioInMyAnnouncePending = axios.create({
//     baseURL:ANNOUNCE_PENDING_POPUP,
//     timeout: 24000,
//     headers
// });

// AxioInMyAnnouncePending.interceptors.request.use(
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
// const AxioInMyAnnounceReading = axios.create({
//     baseURL:ANNOUNCE_READ_POPUP,
//     timeout: 24000,
//     headers
// });

// AxioInMyAnnounceReading.interceptors.request.use(
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
// const AxioInProfile = axios.create({
//     baseURL:PRPFILE_DATA,
//     timeout: 24000,
//     headers
// });

// AxioInProfile.interceptors.request.use(
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
// const AxioInProfileGet = axios.create({
//     baseURL:PRPFILE_DATA_GET,
//     timeout: 24000,
//     headers
// });

// AxioInProfileGet.interceptors.request.use(
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
// const AxioInSecurityBoolean = axios.create({
//     baseURL:SECURITY_PASSWORD_BOOLEAN,
//     timeout: 24000,
//     headers
// });

// AxioInSecurityBoolean.interceptors.request.use(
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
// const AxioInDashboardDetails = axios.create({
//     baseURL:DASHBOARD_DETAILS,
//     timeout: 24000,
//     headers
// });

// AxioInDashboardDetails.interceptors.request.use(
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
// const AxioInConverData = axios.create({
//     baseURL:CONCERT_DATA,
//     timeout: 24000,
//     headers
// });

// AxioInConverData.interceptors.request.use(
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
// const AxioInMemberLIne= axios.create({
//     baseURL:MEMBER_LINE,
//     timeout: 24000,
//     headers
// });

// AxioInMemberLIne.interceptors.request.use(
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
// const AxioInTransfer = axios.create({
//     baseURL:ADD_TRANSFER,
//     timeout: 24000,
//     headers
// });

// AxioInTransfer.interceptors.request.use(
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
// const AxioInDeliveryOrder= axios.create({
//     baseURL:DELIVERY_ORDERS,
//     timeout: 24000,
//     headers
// });

// AxioInDeliveryOrder.interceptors.request.use(
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
// const AxiosUPRankGetData= axios.create({
//     baseURL:UPRANK_GETDATA,
//     timeout: 24000,
//     headers
// });

// AxiosUPRankGetData.interceptors.request.use(
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
// const AxiosUPRankPostData= axios.create({
//     baseURL:UPRANK_POST_DATA,
//     timeout: 24000,
//     headers
// });

// AxiosUPRankPostData.interceptors.request.use(
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
// const AxiosGetCutomerProduct= axios.create({
//     baseURL:ADD_CUSTOMER_GETDATA,
//     timeout: 24000,
//     headers
// });

// AxiosGetCutomerProduct.interceptors.request.use(
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
// const AxiosPostCutomerProduct= axios.create({
//     baseURL:ADD_CUSTOMER_POSTDATA,
//     timeout: 24000,
//     headers
// });

// AxiosPostCutomerProduct.interceptors.request.use(
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
// const AxiosJumpStart= axios.create({
//     baseURL:JUMP_START_AJAX,
//     timeout: 24000,
//     headers
// });

// AxiosJumpStart.interceptors.request.use(
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
// const AxiosJumpStartPOST= axios.create({
//     baseURL:JUMP_START_POST,
//     timeout: 24000,
//     headers
// });

// AxiosJumpStartPOST.interceptors.request.use(
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
// const AxiosMatrixside= axios.create({
//     baseURL:MATRIX_SIDE,
//     timeout: 24000,
//     headers
// });

// AxiosMatrixside.interceptors.request.use(
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

// const AxiosMatrixsideGetSide= axios.create({
//     baseURL:MATRIX_SIDE_GETSIDE,
//     timeout: 24000,
//     headers
// });
// AxiosMatrixsideGetSide.interceptors.request.use(
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


export { AxiosWithOutAuthInstance, AxiosAuthInstance, AxiosAuthBalance,AxiosEWalletReport, AxiosEarningReport ,AxiosSponsoredTree , AxiosSingleEarningReport ,AxiosSponsoredNetwork ,AxiosSubAccountLogin ,AxiosSubAccountUserLogin ,AxiosProductList,AxiosMobileNum , AxiosUserDetail,AxiosAddMember ,AxiosAddBank , AxiosGetBankDetail, AxiosBankListDetail,AxiosGetLPBalance,AxiosWithdrawal,AxiosLoginPassword,AxiosSecurityPassword,AxiosSendLoginOtp,AxiosVerifyLogin,AxiosResetLogin,AxiosGetEmail,AxioSendSecurityOtp,AxioSecurityOtp,AxioSecurityNewPassword,AxioAnnouncement,AxiosAnnouncementEdit,AxiosReorderCategory,AxiosPaymentBy,AxioPaymentByPost,AxioInvoiceList,AxioInvoiceListPDF ,AxioInMyTeamSearch ,AxioInMyAnnounceReading,AxioInMyAnnouncePending ,AxioInProfile,AxioInProfileGet ,AxioInSecurityBoolean,AxioInDashboardDetails, AxioInConverData ,AxioInMemberLIne,AxioInTransfer ,AxioInDeliveryOrder,AxiosUPRankGetData,AxiosUPRankPostData ,AxiosGetCutomerProduct ,AxiosPostCutomerProduct , AxiosJumpStart, AxiosJumpStartPOST, AxiosProductListSignup, AxiosMatrixside,AxiosMatrixsideGetSide ,AxiosELibraryList ,AxiosELibraryShowCategory,AxiosELibraryGetSubCategory,AxiosELibraryPost,AxiosWithdrwalRequest};