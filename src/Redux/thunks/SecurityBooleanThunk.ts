

import { Dispatch } from 'redux';
import { AxioInSecurityBoolean } from '../../Utilities/axios';
import { fetchSecurityBooleanfailure, fetchSecurityBooleanRequest, fetchSecurityBooleantSuccess } from '../actions/SecurityBooleanAction';

export const fetchSecurityBoolean = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSecurityBooleanRequest());
        try {
            const response = await AxioInSecurityBoolean.get('');            
            dispatch(fetchSecurityBooleantSuccess(response.data.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchSecurityBooleanfailure(error.message || 'Failed to fetch security Boolean'));
            return {error}
        }
    };
};




