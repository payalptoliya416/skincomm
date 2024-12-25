import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
    const loginState = useSelector((state: any) => state.loginState);
    const isAuthenticated = loginState?.data?.token !== undefined;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const CheckAuthRouter = () => {
    const loginState = useSelector((state: any) => state.loginState);
    const isAuthenticated = loginState?.data?.token !== undefined;
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export { PrivateRouter, CheckAuthRouter };

