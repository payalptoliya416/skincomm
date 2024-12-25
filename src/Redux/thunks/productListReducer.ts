

import { Dispatch } from 'redux';
import { AxiosProductList } from '../../Utilities/axios';
import { fetchProductListGailure, fetchProductListRequest, fetchProductListSuccess } from '../actions/productListAction';

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
