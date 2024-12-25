

import { Dispatch } from 'redux';
import { AxiosReorderCategory } from '../../Utilities/axios';
import { fetchReorderCategoryfailure, fetchReorderCategoryRequest, fetchReorderCategorySuccess, fetchReorderProductSuccess } from '../actions/ReorderCategoryAction';

export const fetchCategoryList = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReorderCategoryRequest());
        try {
            const response = await AxiosReorderCategory.post('',{
                "action" : "getcategories",
            });
            dispatch(fetchReorderCategorySuccess(response.data.data.categories));
        } catch (error: any) {
            dispatch(fetchReorderCategoryfailure(error.message || 'Failed to fetch category data'));
        }
    };
};

export const fetchCategoryListtable = (id : number) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReorderCategoryRequest());
        try {
            const response = await AxiosReorderCategory.post('',{
                "action" : "getProducts",
                "category" : id
            });
            
            dispatch(fetchReorderProductSuccess(response.data.data.products));
        } catch (error: any) {
            dispatch(fetchReorderCategoryfailure(error.message || 'Failed to fetch table product data'));
        }
    };
};
