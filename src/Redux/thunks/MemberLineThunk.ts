

import { Dispatch } from 'redux';
import { AxioInMemberLIne } from '../../Utilities/axios';
import { fetchMemberLinefailure, fetchMemberLineRequest, fetchMemberLinetSuccess } from '../actions/MemberLineAction';

export const fetchMemberLine = (userID: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchMemberLineRequest());
        try {
            const response = await AxioInMemberLIne.post('', {"userid" : userID});
            console.log("response",response)
            dispatch(fetchMemberLinetSuccess(response.data));
            return {data: response.data }; 
        } catch (error: any) {
            dispatch(fetchMemberLinefailure(error.message || 'Failed to fetch memberline data'));
            return { success: false, error: error.message };
        }
    };
};
