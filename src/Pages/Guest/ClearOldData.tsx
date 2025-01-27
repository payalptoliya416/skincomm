import storage from 'redux-persist/lib/storage';
// export const  clearStorage =async () => {
//     const keysToRemove = [
//       "persist:user_root",
//       "token",
//       "user_data",
//       "securityMemberId",
//       "loginUser",
//       "loginUserId",
//       "contryid",
//       "memberIdId",
//       "cart",
//       "UserID",
//       "totalPrice",
//       "customerrank",
//       'rankNameofMember',
//       "joiningDate",
//       "user",
//     ];
  
//     keysToRemove.forEach((key) => localStorage.removeItem(key));
//     await storage.removeItem("persist:user_root");
//   await storage.removeItem("token");
//   };
// Assuming this function is located in "../Pages/Guest/ClearOldData"
export const clearStorage = () => {
  // Clear local storage if needed
  localStorage.clear();

  // Clear session storage if needed
  sessionStorage.clear();

  // Clear persisted Redux state from redux-persist storage
  storage.removeItem("persist:user_root");
  storage.removeItem("token"); // Clear other relevant storage data like token
};
