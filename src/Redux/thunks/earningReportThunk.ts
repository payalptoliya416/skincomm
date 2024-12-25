

import { Dispatch } from 'redux';
import { AxiosEarningReport } from '../../Utilities/axios';
import { fetchEarningailure, fetchEarningRequest, fetchEarningSuccess } from '../actions/earningReportAction';

export const fetchEarnigReport = (earningParams: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchEarningRequest());
        try {
            const response = await AxiosEarningReport.post('', earningParams);
            dispatch(fetchEarningSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchEarningailure(error.message || 'Failed to fetch EarningReport data'));
        }
    };
};
