import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRouter, CheckAuthRouter } from "./PrivateRouter";
import Login from "../Pages/Guest/Login";

import Dashboard from "../Pages/Auth/Dashboard";
import Setting from "../Pages/Auth/Setting";
import Profile from "../Pages/Auth/Settings/Profile";
import PrimaryPassword from "../Pages/Auth/Settings/PrimaryPassword";
import SecondaryPassword from "../Pages/Auth/Settings/SecondaryPassword";
import Share from "../Pages/Auth/Settings/Share";
import Reports from '../Pages/Reports/Reports';
import MyTeam from '../Pages/MyTeam/MyTeam';
import SponseredTree from '../Pages/Reports/ReportsData/SponseredTree';
import SponseredNetwork from '../Pages/Reports/ReportsData/SponseredNetwork';
import SposoredNetwork from '../Pages/MyTeam/SposoredNetwork';
import AddBankPage from '../Pages/Auth/Settings/AddBankPage';
import AddBankForm from '../Pages/Auth/Settings/AddBankForm';
import Withdrawal from '../Pages/Auth/Settings/Withdrawal';
import SecurityOtpConfirm from '../Pages/Auth/Settings/SecurityOtpConfirm';
import ResetLogin from '../Pages/Guest/ResetLogin';
import ResetChangePass from '../Pages/Guest/ResetChangePass';
import SecurityPassEmail from '../Pages/Auth/Settings/SecurityPassEmail';
import Announcement from '../Pages/Auth/Settings/Announcement';
import AnnouncementAdd from '../Pages/Auth/Settings/AnnouncementAdd';
import Invoice from '../Pages/Invoice/Invoice';
import D_SponsoredTree from '../Pages/MyTeam/D_SponsoredTree';
import AnnouncementPopup from '../Pages/Guest/AnnouncementPopup';
import AddMemberFormStript from '../Pages/MyTeam/AddMemberFormStript';
import ReorderStripe from '../Pages/Reorder/ReorderStripe';
import DashboardAdMemStrip from '../Pages/AddMemberDashboard/DashboardAdMemStrip';
import SuccessPayment from '../Pages/successPayment/SuccessPayment';
import ConverPage from '../Pages/Auth/Settings/ConverPage';
import Successfull from '../Pages/Reorder/Successfull';
import TransferFunction from '../Pages/Auth/Settings/TransferFunction';

const BrowserRoute = () => {

    return (
        <Router>
            <Routes>
                {/* Guest Routers */}
                <Route element={<CheckAuthRouter/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/resetpassword" element={<ResetLogin/>}/>
                    <Route path="/changepassword" element={<ResetChangePass/>}/>
                    <Route path="/pending-announcement" element={<AnnouncementPopup/>}/>
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
                    <Route path="/securityotpconfirmation" element={<SecurityOtpConfirm />} />
                    <Route path="/withdrawal" element={<Withdrawal />} />
                    <Route path="/email_otp_verification" element={<SecurityPassEmail />} />
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
                </Route>

                {/* Error 404 */}
                {/* <Route path="*" element={<E404 />} /> */}
            </Routes>
        </Router>
    );
}

export default BrowserRoute;