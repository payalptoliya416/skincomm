

import { Dispatch } from 'redux';
import { AxiosSingapure } from '../../Utilities/axios';
import { fetchSingapurefailure, fetchSingapureRequest, fetchSingapureSuccess } from '../actions/SingapureAction';

export const fetchSingapure = (id : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSingapureRequest());
        try {
            const response = await AxiosSingapure.get(`/${id}`);
            dispatch(fetchSingapureSuccess(response.data));
            return response.data;
        } catch (error: any) {
            dispatch(fetchSingapurefailure(error.message || 'Failed to fetch singapure country'));
            return {error}
        }
    };
};




