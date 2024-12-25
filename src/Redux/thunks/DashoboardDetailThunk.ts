

import { Dispatch } from 'redux';
import { AxioInDashboardDetails, } from '../../Utilities/axios';
import { fetchDashboardDetailFailure, fetchDashboardDetailRequest, fetchDashboardDetailSuccess } from '../actions/DashboardDetailAction';

export const fetchBDashboardDetail = () => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchDashboardDetailRequest());
        try {
            const response = await AxioInDashboardDetails.get("");
            dispatch(fetchDashboardDetailSuccess(response.data.data));
        } catch (error: any) {
            dispatch(fetchDashboardDetailFailure(error.message || 'Failed to fetch Dashboard Data data'));
        }
    };
};
