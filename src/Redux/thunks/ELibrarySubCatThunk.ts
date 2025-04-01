

import { Dispatch } from 'redux';
import {  AxiosELibraryList } from '../../Utilities/axios';
import { fetchELibrarySubCatFailure, fetchELibrarySubCatRequest, fetchELibrarySubCatSuccess, resetELibrarySubCatData } from '../actions/ELibrarySubCatAction';

export const fetchELibrarySubCategory = (action : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchELibrarySubCatRequest());
        try {
            const response = await AxiosELibraryList.post('',action);
            dispatch(fetchELibrarySubCatSuccess(response.data.data));
            return response.data;
        } catch (error: any) {
            dispatch(fetchELibrarySubCatFailure(error.message || 'Failed to fetch e-library sub Category list'));
        }
    };
};
