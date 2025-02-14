

import { Dispatch } from 'redux';
import { AxiosProductList, AxiosProductListSignup } from '../../Utilities/axios';
import { fetchProductListGailure, fetchProductListRequest, fetchProductListSuccess, fetchSignUpProductListFailure, fetchSignUpProductListRequest, fetchSignUpProductListSuccess } from '../actions/productListAction';

export const fetchProductList = (UserProductData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchProductListRequest());
        try {
            const response = await AxiosProductList.post('' ,UserProductData); 
            dispatch(fetchProductListSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchProductListGailure(error.message || 'Failed to fetch ProductList data'));
        }
    };
};

export const fetchSignUpProductList = (UserProductData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSignUpProductListRequest());
        try {
            const response = await AxiosProductListSignup.post('' ,UserProductData); 
            dispatch(fetchSignUpProductListSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchSignUpProductListFailure(error.message || 'Failed to fetch ProductList SignUp data'));
        }
    };
};
