import { CommonTypes, LoginTypes } from "../types";
import { AxiosWithOutAuthInstance } from "../../Utilities/axios";
export const setLoginToken = (token: string) => ({
    type: "SET_LOGIN_TOKEN",
    payload: token,
  });
export const loginAction = (formData: any) => async (dispatch: any) => {
    dispatch({
        type: CommonTypes.ACTION_START,
    });

    try {
        const response = await AxiosWithOutAuthInstance.post(`/member_login`, formData);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("rankNameofMember", response.data.member_rank);
        sessionStorage.setItem("loginUser", response.data.user.username);
        sessionStorage.setItem("loginUserId", response.data.user.id);
        sessionStorage.setItem("UserID", response.data.user.userid);
        sessionStorage.setItem("contryid", response.data.user.country);
        sessionStorage.setItem("joiningDate", response.data.user.join_date);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("customerrank", JSON.stringify(response.data.user.rank));
        
        sessionStorage.setItem("userLoginstate",JSON.stringify(response.data.user));
        dispatch({
            type: LoginTypes.LOGIN_SUCCESS,
            payload: response.data,
            token: response.data.token,
        });
    } catch (error: any) {
        dispatch({
            type: LoginTypes.LOGIN_FAILED,
            payload: error,
        });
    } finally {
        dispatch({
            type: CommonTypes.ACTION_END,
        });
    }
};
