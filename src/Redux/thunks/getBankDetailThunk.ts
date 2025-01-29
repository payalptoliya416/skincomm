

import { Dispatch } from 'redux';
import { AxiosGetBankDetail } from '../../Utilities/axios';
import { fetchGetBankFailure, fetchGetBankRequest, fetchGetBankSuccess } from '../actions/GetBankAvtion';

export const fetchGetBankData = () => {
    return async (dispatch: Dispatch) => {
        const id = sessionStorage.getItem("loginUserId");
        if (!id) {
            console.error("No loginUserId found in sessionStorage");
            return;
        }

        dispatch(fetchGetBankRequest());
        try {
            const response = await AxiosGetBankDetail.get(`?id=${id}`);
            dispatch(fetchGetBankSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchGetBankFailure(error.message || 'Failed to fetch getbank data'));
        }
    };
};
