

import { Dispatch } from 'redux';
import { AxiosAddMember } from '../../Utilities/axios';
import { fetchAddMemberFailure, fetchAddMemberRequest, fetchAddMemberSuccess } from '../actions/AddMemberAction';

export const fetchAddMember = (formData : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchAddMemberRequest());
        try {
            const response = await AxiosAddMember.post('',formData);  
            console.log("response",response)
            dispatch(fetchAddMemberSuccess(response.data));
             return {data: response.data };
        } catch (error: any) {
            dispatch(fetchAddMemberFailure(error.message || 'Failed to fetch addmember data'));
        }
    };
};
