

import { Dispatch } from 'redux';
import { AxiosJumpStart } from '../../Utilities/axios';
import { fetchJumpstartPackageFailure, fetchJumpstartPackageRequest, fetchJumpstartPackageSuccess } from '../actions/JumpStartPackageAction';

export const fetchJumpstartPackage = (action : number) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchJumpstartPackageRequest());
        try {
            const response = await AxiosJumpStart.post('',action);
            dispatch(fetchJumpstartPackageSuccess(response.data));
            const pdfresponse = response.data
            return pdfresponse;
        } catch (error: any) {
            dispatch(fetchJumpstartPackageFailure(error.message || 'Failed to fetch jumpstart Package'));
            return error
        }
    };
};
