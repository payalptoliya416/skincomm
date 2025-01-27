import storage from 'redux-persist/lib/storage';
export const  clearStorage =async () => {
    const keysToRemove = [
      "persist:user_root",
      "token",
      "user_data",
      "securityMemberId",
      "loginUser",
      "loginUserId",
      "contryid",
      "memberIdId",
      "cart",
      "UserID",
      "totalPrice",
      "customerrank",
      'rankNameofMember',
      "joiningDate",
      "user",
    ];
  
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    await storage.removeItem("persist:user_root");
  await storage.removeItem("token");
  };