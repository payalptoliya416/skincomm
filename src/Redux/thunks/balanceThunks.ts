

import { Dispatch } from 'redux';
import { fetchBalanceRequest, fetchBalanceSuccess, fetchBalanceFailure } from '../actions/balanceActions';
import { AxiosAuthBalance } from '../../Utilities/axios';

export const fetchBalance = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchBalanceRequest());
        try {
            const response = await AxiosAuthBalance.post('');
            dispatch(fetchBalanceSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchBalanceFailure(error.message || 'Failed to fetch balance data'));
        }
    };
};
