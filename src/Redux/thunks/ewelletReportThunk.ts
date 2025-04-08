

import { Dispatch } from 'redux';
import { AxiosEWalletReport } from '../../Utilities/axios';
import { fetchewalletreportFailure, fetchewalletreportRequest, fetchewalletreportSuccess } from '../actions/ewalletReportAction';

export const fetchEWalletReport = (reportParams: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchewalletreportRequest());
        try {
            const response = await AxiosEWalletReport.post('', reportParams);
            dispatch(fetchewalletreportSuccess(response.data.data.records));
        } catch (error: any) {
            dispatch(fetchewalletreportFailure(error.message || 'Failed to fetch EwalletReport data'));
        }
    };
};
