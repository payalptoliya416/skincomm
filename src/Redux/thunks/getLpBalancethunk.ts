

import { Dispatch } from 'redux';
import { AxiosGetLPBalance } from '../../Utilities/axios';
import { fetchGetLPBalanceFailure, fetchGetLPBalanceRequest, fetchGetLPBalanceSuccess } from '../actions/getLpBalance';

export const fetchLpBalance = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchGetLPBalanceRequest());
        try {
            const response = await AxiosGetLPBalance.get('');
            dispatch(fetchGetLPBalanceSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchGetLPBalanceFailure(error.message || 'Failed to fetch getLpBalance data'));
        }
    };
};
