import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRouter, CheckAuthRouter } from "./PrivateRouter";
import Login from "../Pages/Guest/Login";

import Dashboard from "../Pages/Auth/Dashboard";
import Setting from "../Pages/Auth/Setting";
import Profile from "../Pages/Auth/Settings/Profile";
import PrimaryPassword from "../Pages/Auth/Settings/PrimaryPassword";
import SecondaryPassword from "../Pages/Auth/Settings/SecondaryPassword";
import Share from "../Pages/Auth/Settings/Share";
import Reports from "../Pages/Reports/Reports";
import MyTeam from "../Pages/MyTeam/MyTeam";
import SponseredTree from "../Pages/Reports/ReportsData/SponseredTree";
import SponseredNetwork from "../Pages/Reports/ReportsData/SponseredNetwork";
import SposoredNetwork from "../Pages/MyTeam/SposoredNetwork";
import AddBankPage from "../Pages/Auth/Settings/AddBankPage";
import AddBankForm from "../Pages/Auth/Settings/AddBankForm";
import Withdrawal from "../Pages/Auth/Settings/Withdrawal";
import SecurityOtpConfirm from "../Pages/Auth/Settings/SecurityOtpConfirm";
import ResetLogin from "../Pages/Guest/ResetLogin";
import ResetChangePass from "../Pages/Guest/ResetChangePass";
import SecurityPassEmail from "../Pages/Auth/Settings/SecurityPassEmail";
import Announcement from "../Pages/Auth/Settings/Announcement";
import AnnouncementAdd from "../Pages/Auth/Settings/AnnouncementAdd";
import Invoice from "../Pages/Invoice/Invoice";
import D_SponsoredTree from "../Pages/MyTeam/D_SponsoredTree";
import AddMemberFormStript from "../Pages/MyTeam/AddMemberFormStript";
import ReorderStripe from "../Pages/Reorder/ReorderStripe";
import DashboardAdMemStrip from "../Pages/AddMemberDashboard/DashboardAdMemStrip";
import SuccessPayment from "../Pages/successPayment/SuccessPayment";
import ConverPage from "../Pages/Auth/Settings/ConverPage";
import Successfull from "../Pages/Reorder/Successfull";
import TransferFunction from "../Pages/Auth/Settings/TransferFunction";
import DeliveryOrder from "../Pages/DeliveryOrder/DeliveryOrder";
import UprankStrip from "../Pages/Auth/Uprank/UprankStrip";
import AddCustomerStrip from "../Pages/Auth/customer/AddCustomerStrip";
import ViewCommissions from "../Pages/Reports/ReportsData/ViewCommissions";
import JumpStartStipe from "../Pages/Auth/JumpStart/JumpStartStipe";
import RegistrationStrip from "../Pages/Guest/registration/RegistrationStrip";
import MatrixSide from "../Pages/Auth/Settings/MatrixSide";
import ELibrary from "../Pages/Auth/Settings/ELibrary";
import ELIbraryAdd from "../Pages/Auth/Settings/ELIbraryAdd";
import WithdrawalPage from "../Pages/Auth/Settings/WithdrawalPage";
import WithdrwalMain from "../Pages/Auth/Settings/WithdrwalMain";
import { BASE_URL } from "../Utilities/config";
import CraditCardPay from "../Pages/craditcard/CraditCardPay";
import AddmemberCreditCard from "../Pages/AddMemberDashboard/AddmemberCreditCard";
import AddMemCreditCard from "../Pages/MyTeam/AddMemCreditCard";
import ReorderCreditCard from "../Pages/Reorder/ReorderCreditCard";
import UprankCreditCard from "../Pages/Auth/Uprank/UprankCreditCard";
import JumStartCreditCard from "../Pages/Auth/JumpStart/JumStartCreditCard";
import RegistrationCreditCard from "../Pages/Guest/registration/RegistrationCreditCard";

const BrowserRoute = () => {
  const url = new URL(window.location.href);
  const hash = url.hash;

  const refValue :any = hash.startsWith("#/") ? hash.substring(2) : null;

//   if (refValue) {
//     sessionStorage.setItem("refUserID", refValue);
//   }

//   const urlSegments = window.location.pathname.split("/");
//   const refValue = urlSegments[urlSegments.length - 1];

//   if (refValue) {
//     sessionStorage.setItem("refUserID", refValue);
//   }
  const fetchLoginuserId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/check-user/${refValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
  
      if (data.exists) {
        sessionStorage.setItem("refUserID", refValue);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchLoginuserId();
  }, []);
  

  return (
    <Router>
      <Routes>
        {/* Guest Routers */}
        <Route element={<CheckAuthRouter />}>
          <Route path="/" element={<Login />} />
          <Route path="/resetpassword" element={<ResetLogin />} />
          <Route path="/changepassword" element={<ResetChangePass />} />
          <Route path="/signup" element={<RegistrationStrip />} />
          {/* --registration-- */}
          <Route path="/signup-payment" element={<RegistrationCreditCard />} />
        </Route>

        {/* Private Routers */}
        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/myteam" element={<MyTeam />} />
          <Route path="/memberleger" element={<SponseredTree />} />
          <Route path="/sponsoredtnetwork" element={<SponseredNetwork />} />
          <Route path="/sponsored-network" element={<SposoredNetwork />} />
          <Route path="/placement-tree" element={<D_SponsoredTree />} />
          <Route path="/addmember" element={<AddMemberFormStript />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/primary_password" element={<PrimaryPassword />} />
          <Route path="/security_password" element={<SecondaryPassword />} />
          <Route path="/share" element={<Share />} />
          <Route
            path="/securityotpconfirmation"
            element={<SecurityOtpConfirm />}
          />
          <Route path="/withdrawal-add" element={<Withdrawal />} />
          <Route
            path="/email_otp_verification"
            element={<SecurityPassEmail />}
          />
          <Route path="/addbankpage" element={<AddBankPage />} />
          <Route path="/addbankform" element={<AddBankForm />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/announcementaddpage" element={<AnnouncementAdd />} />
          <Route path="/reorder" element={<ReorderStripe />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/addmemberUser" element={<DashboardAdMemStrip />} />
          <Route path="/successfullyPayment" element={<SuccessPayment />} />
          <Route path="/successfully" element={<Successfull />} />
          <Route path="/convert" element={<ConverPage />} />
          <Route path="/transfer" element={<TransferFunction />} />
          <Route path="/deliveryorder" element={<DeliveryOrder />} />
          <Route path="/uprank" element={<UprankStrip />} />
          <Route path="/jumpstart" element={<JumpStartStipe />} />
          {/* <Route path="/addcustomer" element={<AddCustomerStrip />} /> */}
          <Route path="/viewcommission" element={<ViewCommissions />} />
          <Route path="/matrix-side" element={<MatrixSide />} />
          <Route path="/e-library" element={<ELibrary />} />
          <Route  path="/e-library/e-library-content-add"  element={<ELIbraryAdd />} />
          <Route path="/withdrawal-request" element={<WithdrawalPage />} />
          <Route path="/withdrawal" element={<WithdrwalMain />} />
          <Route path="/cradit-card" element={<CraditCardPay />} />
          {/* --add member dashboard */}
          <Route path="/addmemberuser-payment" element={<AddmemberCreditCard />} />
          {/* ---add member my team-- */}
          <Route path="/addmember-payment" element={<AddMemCreditCard />} />
          {/* --reorder  */}
          <Route path="/reorder-payment" element={<ReorderCreditCard />} />
          {/* --uprank */}
          <Route path="/uprank-payment" element={<UprankCreditCard />} />
          {/* ---jumpstart-- */}
          <Route path="/jumpstart-payment" element={<JumStartCreditCard />} />
        </Route>

        {/* Error 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default BrowserRoute;
