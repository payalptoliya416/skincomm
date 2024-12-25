

import { Dispatch } from 'redux';
import { AxiosBankListDetail } from '../../Utilities/axios';
import { fetchBankListFailure, fetchBankListRequest, fetchBankListSuccess } from '../actions/bankListAction';

export const fetchBankList = () => {
    const ID = localStorage.getItem("contryid")?.trim(); 
    if (!ID) {
        console.error("No country ID found in localStorage");
        return;
    }

    return async (dispatch: Dispatch) => {
        dispatch(fetchBankListRequest());
        try {
            const response = await AxiosBankListDetail.get(`?country_id=${ID}`,);
            dispatch(fetchBankListSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchBankListFailure(error.message || 'Failed to fetch banklist data'));
        }
    };
};
