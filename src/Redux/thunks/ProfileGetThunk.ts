

import { Dispatch } from 'redux';
import {  AxioInProfileGet } from '../../Utilities/axios';
import { fetchProfileGetFailer, fetchProfileGetRequest, fetchProfileGetSuccess } from '../actions/ProfileGetAction';

export const fetchProfileGet = () => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchProfileGetRequest());
        try {
            const response = await AxioInProfileGet.get(''); 
            
            dispatch(fetchProfileGetSuccess(response.data.member));
        } catch (error: any) {
            dispatch(fetchProfileGetFailer(error.message || 'Failed to fetchprfileget data'));
           return error
            
        }
    };
};
