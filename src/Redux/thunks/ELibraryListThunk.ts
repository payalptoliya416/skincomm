

import { Dispatch } from 'redux';
import {  AxiosELibraryList } from '../../Utilities/axios';
import { fetchELibraryListFailure, fetchELibraryListRequest, fetchELibraryListSuccess } from '../actions/ELibraryListAction';

export const fetchELibraryList = (action : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchELibraryListRequest());
        try {
            const response = await AxiosELibraryList.post('',action);
            dispatch(fetchELibraryListSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchELibraryListFailure(error.message || 'Failed to fetch e-library data'));
        }
    };
};
