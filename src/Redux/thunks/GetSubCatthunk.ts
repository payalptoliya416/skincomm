

import { Dispatch } from 'redux';
import { AxiosELibraryGetSubCategory } from '../../Utilities/axios';
import { fetchGetSubcategoryFailure, fetchGetSubcategoryRequest, fetchGetSubcategorySuccess } from '../actions/GetSubCatAction';

export const fetchGetSubCategory = (data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchGetSubcategoryRequest());
        try {
            const response = await AxiosELibraryGetSubCategory.post('',data);
            dispatch(fetchGetSubcategorySuccess(response.data.data));
            return response.data.data;
        } catch (error: any) {
            dispatch(fetchGetSubcategoryFailure(error.message || 'Failed to fetch get sub Category data'));
        }
    };
};
