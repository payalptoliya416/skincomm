

import { Dispatch } from 'redux';
import { AxioInProfile } from '../../Utilities/axios';
import { fetchProfileFailer, fetchProfileRequest, fetchProfileSuccess } from '../actions/ProfileAction';

export const fetchProfile = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchProfileRequest());
        try {
            const response = await AxioInProfile.post('' ,formData);             
            dispatch(fetchProfileSuccess(response));
        } catch (error: any) {
            dispatch(fetchProfileFailer(error.message || 'Failed to fetchprfile data'));
           return error;
            
        }
    };
};
