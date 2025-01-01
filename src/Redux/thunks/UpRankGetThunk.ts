

import { Dispatch } from 'redux';
import { AxiosUPRankGetData, } from '../../Utilities/axios';
import { fetchUprankGetFailure, fetchUprankGetRequest, fetchUprankGetSuccess } from '../actions/UprankGetAction';

export const fetchUprankGet = () => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchUprankGetRequest());
        try {
            const response = await AxiosUPRankGetData.post("");
            dispatch(fetchUprankGetSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchUprankGetFailure(error.message || 'Failed to fetch Uprank get data'));
        }
    };
};
