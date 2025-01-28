
// const CheckAuthRouter = () => {
//   const loginState = useSelector((state: any) => state.loginState);
//   const isAuthenticated = loginState?.data?.token !== undefined;

//   const dispatch = useDispatch() as any;
//   const url = window.location.href;
//   const params = new URLSearchParams(new URL(url).search);
//   const userIdFromUrl = params.get("userid");

//   useEffect(() => {
//       const handleLoginWithUserId = async () => {
//           if (userIdFromUrl) {
//             const token = localStorage.getItem("token");
//             if(token){
//               dispatch({ type: "CLEAR_OLD_STORAGE" });
//             }
//               setTimeout(() => {
//                   const submit = {
//                       userid: userIdFromUrl,
//                       login_type: "admin",
//                   };
//                   dispatch(loginAction(submit));
//               }, 500);
//           }
//       };

//       handleLoginWithUserId();

//   }, [dispatch, userIdFromUrl]);

//   if (isAuthenticated) {
//       const newUrl = `${window.location.origin}/#/dashboard`;
//       window.history.replaceState(null, "", newUrl);
//       return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, setLoginToken } from "../Redux/actions/loginAction";

const PrivateRouter = () => {
  const loginState = useSelector((state: any) => state.loginState);
  const isAuthenticated = loginState?.data?.token !== undefined;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

// const CheckAuthRouter = () => {
//   const loginState = useSelector((state: any) => state.loginState);
//   const isAuthenticated = loginState?.data?.token !== undefined;
//   const dispatch = useDispatch() as any;
//   const url = window.location.href;
//   const params = new URLSearchParams(new URL(url).search);
//   const userIdFromUrl = params.get("userid");

//   useEffect(() => {
//     const handleLoginWithUserId = async () => {
//       if (userIdFromUrl) {
//         const existingToken = loginState?.data?.token;
//         if (existingToken) {
//           dispatch({ type: "CLEAR_OLD_STORAGE" });
//         }
        
//         setTimeout(() => {
//           const submit = {
//             userid: userIdFromUrl,
//             login_type: "admin",
//           };
//           dispatch(loginAction(submit));
//         }, 500);
//       }
//     };

//     handleLoginWithUserId();

//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === "token") {
//         window.location.reload();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, [dispatch, userIdFromUrl]);

//   if (isAuthenticated) {
//     const newUrl = `${window.location.origin}/#/dashboard`;
//     window.history.replaceState(null, "", newUrl);
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

const CheckAuthRouter = () => {
  const loginState = useSelector((state: any) => state.loginState);
  const isAuthenticated = loginState?.data?.token !== undefined;
  const dispatch = useDispatch() as any;
  const url = window.location.href;
  const params = new URLSearchParams(new URL(url).search);
  const userIdFromUrl = params.get("userid");

  const syncTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token && token !== loginState?.data?.token) {
      dispatch(setLoginToken(token)); 
    }
  };

  useEffect(() => {
    syncTokenFromLocalStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        syncTokenFromLocalStorage();
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
        const existingToken = loginState?.data?.token;  // Check token from Redux, not localStorage
        if (existingToken) {
          dispatch({ type: "CLEAR_OLD_STORAGE" });
        }

        setTimeout(() => {
          const submit = {
            userid: userIdFromUrl,
            login_type: "admin",
          };
          dispatch(loginAction(submit));  // Trigger login action
        }, 500);
      }
    };

    handleLoginWithUserId();
  }, [dispatch, userIdFromUrl, loginState?.data?.token]);  // Dependency on token

  if (isAuthenticated) {
    const newUrl = `${window.location.origin}/#/dashboard`;
    window.history.replaceState(null, "", newUrl);  // Replace the current URL without reloading
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export { PrivateRouter, CheckAuthRouter };
