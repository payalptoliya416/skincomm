

import { Dispatch } from 'redux';
import { AxiosSubAccountLogin } from '../../Utilities/axios';
import { fetchSubAccountFailure, fetchSubAccountRequest, fetchSubAccountSuccess } from '../actions/subAcoAction';

export const fetchSubAccounData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSubAccountRequest());
        try {
            const response = await AxiosSubAccountLogin.post('');
            dispatch(fetchSubAccountSuccess(response.data.data.members));
        } catch (error: any) {
            dispatch(fetchSubAccountFailure(error.message || 'Failed to fetch SubAccount data'));
        }
    };
};
