

import { Dispatch } from 'redux';
import { AxiosResetLogin } from '../../Utilities/axios';
import { fetchProductListGailure, fetchProductListRequest, fetchProductListSuccess } from '../actions/resetLoginPassAction';

export const resetLoginThunk = (data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchProductListRequest());
        try {
            const response = await AxiosResetLogin.post('',data);
            dispatch(fetchProductListSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchProductListGailure(error.message || 'Failed to fetch reset login data'));
        }
    };
};
