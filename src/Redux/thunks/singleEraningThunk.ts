

import { Dispatch } from 'redux';
import { AxiosSingleEarningReport } from '../../Utilities/axios';
import { fetchsingleEarningGailure, fetchsingleEarningGRequest, fetchsingleEarningSuccess } from '../actions/singleEarningAction';

export const fetchSingleEarnigReport = (earningParams: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchsingleEarningGRequest());
        try {
            const response = await AxiosSingleEarningReport.post('', earningParams);
            dispatch(fetchsingleEarningSuccess(response.data.data.records));
        } catch (error: any) {
            dispatch(fetchsingleEarningGailure(error.message || 'Failed to fetch SingleEarningReport data'));
        }
    };
};
