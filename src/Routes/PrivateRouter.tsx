import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../Redux/actions/loginAction";
import { clearStorage } from "../Pages/Guest/ClearOldData";

const PrivateRouter = () => {
  const loginState = useSelector((state: any) => state.loginState);
  const isAuthenticated = loginState?.data?.token !== undefined;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const CheckAuthRouter = () => {
    const loginState = useSelector((state: any) => state.loginState);
    const isAuthenticated = loginState?.data?.token !== undefined;
    
    const dispatch = useDispatch() as any;
  const url = window.location.href;
  const params = new URLSearchParams(new URL(url).search);
  const userIdFromUrl = params.get("userid");
console.log("userIdFromUrl")
  useEffect(() => {
    const handleLoginWithUserId = async () => {
      if (userIdFromUrl) {
        setTimeout(() => {
          const submit = {
            userid: userIdFromUrl,
            login_type: "admin",
          };
          dispatch(loginAction(submit));
        }, 1000);
      }
    };

    handleLoginWithUserId();
  }, [dispatch]);

  if (isAuthenticated) {
    const newUrl = `${window.location.origin}/#/dashboard`;
    window.history.replaceState(null, "", newUrl);
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default CheckAuthRouter;
export { PrivateRouter, CheckAuthRouter };
