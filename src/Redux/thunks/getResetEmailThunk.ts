

import { Dispatch } from 'redux';
import { AxiosGetEmail } from '../../Utilities/axios';
import { fetchGetEmailFailure, fetchGetEmailRequest, fetchGetEmailSuccess } from '../actions/getresetEmailAction';

export const fetchGetEmail = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchGetEmailRequest());
        try {
            const response = await AxiosGetEmail.get('');
            dispatch(fetchGetEmailSuccess(response.data.data.member));
        } catch (error: any) {
            dispatch(fetchGetEmailFailure(error.message || 'Failed to fetch getResetEmail'));
        }
    };
};
