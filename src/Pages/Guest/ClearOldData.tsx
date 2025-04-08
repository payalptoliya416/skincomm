
import storageSession from 'redux-persist/lib/storage/session';
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
      'userLoginstate'
    ];
  
    keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    await storageSession.removeItem("persist:user_root");
  await storageSession.removeItem("token");
  };