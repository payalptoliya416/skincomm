

import { Dispatch } from 'redux';
import {  AxioPaymentByPost } from '../../Utilities/axios';
import { fetchReorderfailure, fetchReorderRequest, fetchReorderSuccess } from '../actions/ReorderPostAction';

export const fetchReorderPost = (data :any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReorderRequest());
        try {
            const response = await AxioPaymentByPost.post('',data);
            dispatch(fetchReorderSuccess(response.data.data));
            return {data : response.data.data}
            
        } catch (error: any) {
            dispatch(fetchReorderfailure(error.message || 'Failed to fetch ProductList data'));
        }
    };
};
