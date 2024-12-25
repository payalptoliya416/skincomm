

import { Dispatch } from 'redux';
import { AxiosProductList } from '../../Utilities/axios';
import { fetchProductListActionGailure, fetchProductListActionRequest, fetchProductListActionSuccess } from '../actions/ProductPAckageAction';

export const fetchProductPakageList = (UserProductData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchProductListActionRequest());
        try {
            const response = await AxiosProductList.post('' ,UserProductData); 
            dispatch(fetchProductListActionSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchProductListActionGailure(error.message || 'Failed to fetch ProductList data'));
        }
    };
};
