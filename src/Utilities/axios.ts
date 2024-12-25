import axios from "axios";
import { ADD_TRANSFER, ANNOUNCE_PENDING_POPUP, ANNOUNCE_READ_POPUP, ANNOUNCEMENT, ANNOUNCEMENT_EDIT, API_URL, BALANCE_URLL, CHANGE_LOGIN_PASSWORD, CHANGE_SECURITY_PASSWORD, CONCERT_DATA, DASHBOARD_DETAILS, EARNING_REPORT_URL, EWALATE_REPORT_URL, GET_LPBALANCE_URL, GET_SECURITY_EMAIL, INVOICE_LIST, INVOICE_PDF_LIST, MEMBER_LINE, NEW_SECURITY_PASSWORD, PAYMENT_BY, PAYMENT_POST, PRPFILE_DATA, PRPFILE_DATA_GET, REORDER_CATEGORY,RESET_LOGIN_PASSSWORD, SEARCH_MY_TEAM, SECURITY_OTP, SECURITY_PASSWORD_BOOLEAN, SEND_LOGIN_OTP, SEND_SECURITY_OTP, SINGALEARNING_REPORT_URL, SPONSORED_NETWORK_URL, SPONSORED_TREE_URL, SUB_ACCOUNT_LOGIN_URL, SUB_ACCOUNT_URL, SUB_ADDBANK_URL, SUB_ADDMEMBER_URL, SUB_BANKLIST_URL, SUB_GETBANKDETAIL_URL, SUB_MOBILENUMBER_URL, SUB_PRODUCTLIST_URL, SUB_USERDETAIL_URL, VERIFY_LOGIN_OTP, WITHDRAWAL_REQUEST } from './config';
import { store } from "../Redux/store";

// AxiosWithOutAuthInstance
const AxiosWithOutAuthInstance = axios.create({
    baseURL: API_URL,
    timeout: 24000,
    headers: {'Accept': 'application/json'}
});

// AxiosAuthInstance
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token") }`,
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
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosAuthBalance = axios.create({
    baseURL: BALANCE_URLL,
    timeout: 24000,
    headers
});
AxiosAuthBalance.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosEWalletReport = axios.create({
    baseURL: EWALATE_REPORT_URL,
    timeout: 24000,
    headers
});
AxiosEWalletReport.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosEarningReport = axios.create({
    baseURL: EARNING_REPORT_URL,
    timeout: 24000,
    headers
});
AxiosEarningReport.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSingleEarningReport = axios.create({
    baseURL: SINGALEARNING_REPORT_URL,
    timeout: 24000,
    headers
});
AxiosSingleEarningReport.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSponsoredTree = axios.create({
    baseURL: SPONSORED_TREE_URL,
    timeout: 24000,
    headers
});
AxiosSponsoredTree.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSponsoredNetwork = axios.create({
    baseURL: SPONSORED_NETWORK_URL,
    timeout: 24000,
    headers
});
AxiosSponsoredNetwork.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSubAccountLogin = axios.create({
    baseURL: SUB_ACCOUNT_URL,
    timeout: 24000,
    headers
});
AxiosSubAccountLogin.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSubAccountUserLogin = axios.create({
    baseURL: SUB_ACCOUNT_LOGIN_URL,
    timeout: 24000,
    headers
});
AxiosSubAccountUserLogin.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosProductList = axios.create({
    baseURL: SUB_PRODUCTLIST_URL,
    timeout: 24000,
    headers
});
AxiosProductList.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosUserDetail = axios.create({
    baseURL: SUB_USERDETAIL_URL,
    timeout: 24000,
    headers
});
AxiosUserDetail.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosAddMember = axios.create({
    baseURL: SUB_ADDMEMBER_URL,
    timeout: 24000,
    headers
});
AxiosAddMember.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosMobileNum = axios.create({
    baseURL: SUB_MOBILENUMBER_URL,
    timeout: 24000,
    headers
});
AxiosMobileNum.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosAddBank = axios.create({
    baseURL: SUB_ADDBANK_URL,
    timeout: 24000,
    headers
});
AxiosAddBank.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

// const id = localStorage.getItem("loginUserId")

const AxiosGetBankDetail = axios.create({
    baseURL: SUB_GETBANKDETAIL_URL,
    timeout: 24000,
    headers
});

AxiosGetBankDetail.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosBankListDetail = axios.create({
    baseURL: SUB_BANKLIST_URL ,
    timeout: 24000,
    headers
});

AxiosBankListDetail.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosGetLPBalance = axios.create({
    baseURL: GET_LPBALANCE_URL ,
    timeout: 24000,
    headers
});

AxiosGetLPBalance.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosWithdrawal = axios.create({
    baseURL: WITHDRAWAL_REQUEST ,
    timeout: 24000,
    headers
});

AxiosWithdrawal.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosLoginPassword = axios.create({
    baseURL: CHANGE_LOGIN_PASSWORD ,
    timeout: 24000,
    headers
});

AxiosLoginPassword.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosSecurityPassword = axios.create({
    baseURL: CHANGE_SECURITY_PASSWORD ,
    timeout: 24000,
    headers
});

AxiosSecurityPassword.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosGetEmail = axios.create({
    baseURL: GET_SECURITY_EMAIL ,
    timeout: 24000,
    headers
});

AxiosGetEmail.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioSendSecurityOtp = axios.create({
    baseURL: SEND_SECURITY_OTP,
    timeout: 24000,
    headers
});

AxioSendSecurityOtp.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioSecurityOtp = axios.create({
    baseURL: SECURITY_OTP,
    timeout: 24000,
    headers
});

AxioSecurityOtp.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioSecurityNewPassword = axios.create({
    baseURL: NEW_SECURITY_PASSWORD,
    timeout: 24000,
    headers
});

AxioSecurityNewPassword.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioAnnouncement= axios.create({
    baseURL: ANNOUNCEMENT,
    timeout: 24000,
    headers
});

AxioAnnouncement.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosAnnouncementEdit = axios.create({
    baseURL: ANNOUNCEMENT_EDIT,
    timeout: 24000,
    headers
});

AxiosAnnouncementEdit.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxiosReorderCategory = axios.create({
    baseURL: REORDER_CATEGORY,
    timeout: 24000,
    headers
});

AxiosReorderCategory.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxiosPaymentBy = axios.create({
    baseURL: PAYMENT_BY,
    timeout: 24000,
    headers
});

AxiosPaymentBy.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

const AxioInvoiceList = axios.create({
    baseURL: INVOICE_LIST,
    timeout: 24000,
    headers
});

AxioInvoiceList.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioPaymentByPost = axios.create({
    baseURL: PAYMENT_POST,
    timeout: 24000,
    headers
});

AxioPaymentByPost.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInvoiceListPDF = axios.create({
    baseURL: INVOICE_PDF_LIST,
    timeout: 24000,
    headers
});

AxioInvoiceListPDF.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInMyTeamSearch = axios.create({
    baseURL: SEARCH_MY_TEAM,
    timeout: 24000,
    headers
});

AxioInMyTeamSearch.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInMyAnnouncePending = axios.create({
    baseURL:ANNOUNCE_PENDING_POPUP,
    timeout: 24000,
    headers
});

AxioInMyAnnouncePending.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInMyAnnounceReading = axios.create({
    baseURL:ANNOUNCE_READ_POPUP,
    timeout: 24000,
    headers
});

AxioInMyAnnounceReading.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInProfile = axios.create({
    baseURL:PRPFILE_DATA,
    timeout: 24000,
    headers
});

AxioInProfile.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInProfileGet = axios.create({
    baseURL:PRPFILE_DATA_GET,
    timeout: 24000,
    headers
});

AxioInProfileGet.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInSecurityBoolean = axios.create({
    baseURL:SECURITY_PASSWORD_BOOLEAN,
    timeout: 24000,
    headers
});

AxioInSecurityBoolean.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInDashboardDetails = axios.create({
    baseURL:DASHBOARD_DETAILS,
    timeout: 24000,
    headers
});

AxioInDashboardDetails.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInConverData = axios.create({
    baseURL:CONCERT_DATA,
    timeout: 24000,
    headers
});

AxioInConverData.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInMemberLIne= axios.create({
    baseURL:MEMBER_LINE,
    timeout: 24000,
    headers
});

AxioInMemberLIne.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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
const AxioInTransfer = axios.create({
    baseURL:ADD_TRANSFER,
    timeout: 24000,
    headers
});

AxioInTransfer.interceptors.request.use(
    (config) => {
        config.headers["Accept"] = 'application/json';
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") }`;
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

export { AxiosWithOutAuthInstance, AxiosAuthInstance, AxiosAuthBalance,AxiosEWalletReport, AxiosEarningReport ,AxiosSponsoredTree , AxiosSingleEarningReport ,AxiosSponsoredNetwork ,AxiosSubAccountLogin ,AxiosSubAccountUserLogin ,AxiosProductList,AxiosMobileNum , AxiosUserDetail,AxiosAddMember ,AxiosAddBank , AxiosGetBankDetail, AxiosBankListDetail,AxiosGetLPBalance,AxiosWithdrawal,AxiosLoginPassword,AxiosSecurityPassword,AxiosSendLoginOtp,AxiosVerifyLogin,AxiosResetLogin,AxiosGetEmail,AxioSendSecurityOtp,AxioSecurityOtp,AxioSecurityNewPassword,AxioAnnouncement,AxiosAnnouncementEdit,AxiosReorderCategory,AxiosPaymentBy,AxioPaymentByPost,AxioInvoiceList,AxioInvoiceListPDF ,AxioInMyTeamSearch ,AxioInMyAnnounceReading,AxioInMyAnnouncePending ,AxioInProfile,AxioInProfileGet ,AxioInSecurityBoolean,AxioInDashboardDetails, AxioInConverData ,AxioInMemberLIne,AxioInTransfer};