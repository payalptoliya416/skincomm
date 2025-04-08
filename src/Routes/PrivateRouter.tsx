
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, setLoginToken } from "../Redux/actions/loginAction";

const PrivateRouter = () => {
  const loginState = useSelector((state: any) => state.loginState);
  const isAuthenticated = loginState?.data?.token !== undefined;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const CheckAuthRouter = () => {
  const loginState = useSelector((state: any) => state.loginState);
  const isAuthenticated = loginState?.data?.token !== undefined;

  const dispatch = useDispatch() as any;
  const url = new URL(window.location.href);
  
  // const pathname = url.pathname;
  // const refValue = pathname.includes("=") ? pathname.split("=")[1] : null;
  
  // if (refValue) {
  //   sessionStorage.setItem("refUserID", refValue);
  // }

  const params = new URLSearchParams(new URL(url).search);
  const userIdFromUrl = params.get("userid");
  const syncTokenFromsessionStorage = () => {
    const token = sessionStorage.getItem("token");
    if (token && token !== loginState?.data?.token) {
      dispatch(setLoginToken(token)); 
    }
  };

  useEffect(() => {
    syncTokenFromsessionStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        syncTokenFromsessionStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, loginState?.data?.token]);

  useEffect(() => {
    const handleLoginWithUserId = async () => {
      if (userIdFromUrl) {
        const existingToken = loginState?.data?.token; 
        if (existingToken) {
          dispatch({ type: "CLEAR_OLD_STORAGE" });
        }

        setTimeout(() => {
          const submit = {
            userid: userIdFromUrl,
            login_type: "admin",
          };
          dispatch(loginAction(submit)); 
        }, 500);
      }
    };

    handleLoginWithUserId();
  }, [dispatch, userIdFromUrl, loginState?.data?.token]); 

  if (isAuthenticated) {
    const newUrl = `${window.location.origin}/#/dashboard`;
    window.history.replaceState(null, "", newUrl);
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export { PrivateRouter, CheckAuthRouter };
