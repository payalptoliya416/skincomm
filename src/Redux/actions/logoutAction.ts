import { AxiosAuthInstance } from "../../Utilities/axios";

export const logoutAction = () => async (dispatch: any) => {
    await AxiosAuthInstance.post(`/member_logout`).then((response: any) => {
        dispatch({
            type: "LOG_OUT",
        });
    })
};