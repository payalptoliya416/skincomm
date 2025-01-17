import { combineReducers } from "redux";

import storage from 'redux-persist/lib/storage';

import loginReducer from "./reducers/loginReducer";
import { persistReducer } from "redux-persist";
import { balanceReducer } from "./reducers/balanceReducer";
import { eWalletReducer } from "./reducers/ewalletReducer";
import { earningReducer } from "./reducers/earningReport";
import { singleEarningReducer } from "./reducers/singleearningReducer";
import { sponsoredNetworkReducer } from "./reducers/sponsNetworkReducer";
import { sponsoredTree } from "./reducers/sponsoredTreeReducer";
import { subAccountReducer } from "./reducers/subAcoReducer";
import { subAccountLoginReducer } from "./reducers/SubAccountLoginReducer";
import { productListReducer } from "./reducers/productListReducer";
import { userDetailReducer } from "./reducers/UserDetailReducer";
import { addMemberReducer } from "./reducers/AddMemberReducer";
import { numberReducer } from "./reducers/MobileNumReducer";
import { addBankReducer } from "./reducers/AddBankreducer";
import { getBankReducer } from "./reducers/getBankDetailReducer";
import { bankListReducer } from "./reducers/bankListReducer";
import { getLpBalanceReducer } from "./reducers/getLpBalanceReducer";
import { getLoginPasswordReducer } from "./reducers/loginPasswordReducer";
import { getSecurityPasswordReducer } from "./reducers/securityPasswordReducer";
import { resetLoginOtpReducer } from "./reducers/sendLoginOtpReducer";
import { verifyLoginReducer } from "./reducers/VerifyLoginReducer";
import { getEmailReducer } from "./reducers/getResetEmailReducer";
import { AnnouncementReducer } from "./reducers/AnnouncementReducer";
import { AnnounceEditReducer } from "./reducers/AnnounceEditReducer";
import { categoryListReducer } from "./reducers/ReorderCategoryReducer";
import { paymentByReducer } from "./reducers/PaymentReducer";
import { invoiceListReducer } from "./reducers/InvoiceListReducer";
import { TeamSearchReducer } from "./reducers/myTearmReducer";
import { AnnouncePendingReducer } from "./reducers/AnnouncPendingReducer";
import { ProfileGetReducer } from "./reducers/ProdileGetReducer";
import { securityBooleanReducer } from "./reducers/SecurityBooleanReducer";
import { DashboardDetailReducer } from "./reducers/DashboradDetailReducer";
import { DeliveryOrderReducer } from "./reducers/DeliveryOrderReducer";
import { uprankReducer } from "./reducers/UpRankGetReducer";
import { cutomerGetDataReducer } from "./reducers/CustomerGetReducer";

const userPersistConfig = {
    key: 'user_root',
    storage,
}

const appReducer = combineReducers({
    loginState: persistReducer(userPersistConfig, loginReducer),
    balance: balanceReducer,
    ewalletReport: eWalletReducer,
    earningReport: earningReducer,
    singleEarningData : singleEarningReducer ,
    sponsoorednetwork : sponsoredNetworkReducer ,
    sponsoreTree : sponsoredTree,
    subaccountData: subAccountReducer,
    SubAccountLogin : subAccountLoginReducer,
    product : productListReducer,
    mobileNumber : numberReducer,
    userDetail : userDetailReducer,
    addMember : addMemberReducer,
    addBank : addBankReducer,
    getBankDetails : getBankReducer,
    bankListData : bankListReducer,
    lpbalance : getLpBalanceReducer,
    loginpassword :getLoginPasswordReducer,
    securitypassword : getSecurityPasswordReducer,
    sendOtpPassword : resetLoginOtpReducer,
    verifyLogin : verifyLoginReducer,
    resetemail : getEmailReducer,
    announcelist : AnnouncementReducer,
    announceEdit : AnnounceEditReducer,
    categorylist :categoryListReducer,
    paymentby: paymentByReducer,
    invoicelist : invoiceListReducer,
    myTeamSearch : TeamSearchReducer,
    pendingAnnounce : AnnouncePendingReducer,
    profileDataUpdated : ProfileGetReducer,
    securityBooleanData :securityBooleanReducer,
    dashboardDetail :DashboardDetailReducer,
    diliveryorder : DeliveryOrderReducer,
    uprankGetData : uprankReducer,
    customerGetData : cutomerGetDataReducer

});

const rootReducer = (state: any, action: any) => {
    if (action.type === "LOG_OUT") {
        storage.removeItem("persist:user_root")
            .then(() => {
                storage.removeItem("token")
                    .then(() => {
                        state.loginState = undefined;
                        window.location.href = '/';
                    }) as any;
            }) as any;
    }

    return appReducer(state, action);
}

export default rootReducer;