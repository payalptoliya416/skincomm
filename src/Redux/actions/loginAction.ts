import { CommonTypes, LoginTypes } from "../types";
import { AxiosWithOutAuthInstance } from "../../Utilities/axios";

export const loginAction = (formData: any) => async (dispatch: any) => {
    dispatch({
        type: CommonTypes.ACTION_START,
    });

    try {
        const response = await AxiosWithOutAuthInstance.post(`/member_login`, formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rankNameofMember", response.data.member_rank);
        localStorage.setItem("loginUser", response.data.user.username);
        localStorage.setItem("loginUserId", response.data.user.id);
        localStorage.setItem("UserID", response.data.user.userid);
        localStorage.setItem("contryid", response.data.user.country);
        localStorage.setItem("joiningDate", response.data.user.join_date);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("customerrank", JSON.stringify(response.data.user.rank));

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
