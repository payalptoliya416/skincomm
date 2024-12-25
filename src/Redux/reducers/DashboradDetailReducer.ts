

import { FETCH_DASHBOARD_DETAIL_FAILURE, FETCH_DASHBOARD_DETAIL_REQUEST, FETCH_DASHBOARD_DETAIL_SUCCESS } from '../actions/DashboardDetailAction';

interface DashboardDetailState {
    loading: boolean;
    DashboardDetail: any;
    error: string | null;
}

const initialState: DashboardDetailState = {
    loading: false,
    DashboardDetail: [],
    error: null,
};

export const DashboardDetailReducer = (state = initialState, action: any): DashboardDetailState => {
    switch (action.type) {
        case FETCH_DASHBOARD_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DASHBOARD_DETAIL_SUCCESS:
            return { ...state, loading: false, DashboardDetail: action.payload };
        case FETCH_DASHBOARD_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
