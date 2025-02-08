

import { Dispatch } from 'redux';
import { AxiosJumpStartPOST } from '../../Utilities/axios';
import { fetchJumpstartPostFailure, fetchJumpstartPostRequest, fetchJumpstartPostSuccess } from '../actions/JumpStartPost';

export const fetchJumpstartPostData = (formData : number) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchJumpstartPostRequest());
        try {
            const response = await AxiosJumpStartPOST.post('',formData);
            dispatch(fetchJumpstartPostSuccess(response.data));
            const pdfresponse = response.data
            return pdfresponse;
        } catch (error: any) {
            dispatch(fetchJumpstartPostFailure(error.message || 'Failed to fetch jumpstart Post data'));
            return error
        }
    };
};
