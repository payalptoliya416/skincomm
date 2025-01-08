

import { Dispatch } from 'redux';
import { AxiosGetCutomerProduct } from '../../Utilities/axios';
import { fetchBCutomerGetRequest, fetchCutomerGetFailure, fetchCutomerGetSuccess } from '../actions/CustomerGetAction';

export const fetchcustomerGetData = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchBCutomerGetRequest());
        try {
            const response = await AxiosGetCutomerProduct.post('',formData);
            dispatch(fetchCutomerGetSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchCutomerGetFailure(error.message || 'Failed to fetch customer data'));
        }
    };
};
