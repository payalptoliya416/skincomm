

import { Dispatch } from 'redux';
import {   AxiosELibraryPost } from '../../Utilities/axios';
import { fetchELibraryPostFailure, fetchELibraryPostRequest, fetchELibraryPostSuccess } from '../actions/ELibraryPostAction';

export const fetchELibraryPost = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchELibraryPostRequest());
        try {
            const response = await AxiosELibraryPost.post('',formData);
            dispatch(fetchELibraryPostSuccess(response.data));
            return response.data
        } catch (error: any) {
            dispatch(fetchELibraryPostFailure(error.message || 'Failed to fetch ELibrary post Data'));
        }
    };
};
