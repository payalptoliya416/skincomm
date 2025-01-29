

import { Dispatch } from 'redux';
import { AxiosPostCutomerProduct } from '../../Utilities/axios';
import { fetchBCutomerPostRequest, fetchCutomerPostFailure, fetchCutomerPostSuccess } from '../actions/CustomerPostAction';

export const fetchcustomePostData = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchBCutomerPostRequest());
        try {
            const response = await AxiosPostCutomerProduct.post('',formData);
            dispatch(fetchCutomerPostSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchCutomerPostFailure(error.message || 'Failed to fetch customer post data'));
        }
    };
};
