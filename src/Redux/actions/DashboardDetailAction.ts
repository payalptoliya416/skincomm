

export const FETCH_DASHBOARD_DETAIL_REQUEST = 'FETCH_DASHBOARD_DETAIL_REQUEST';
export const FETCH_DASHBOARD_DETAIL_SUCCESS = 'FETCH_DASHBOARD_DETAIL_SUCCESS';
export const FETCH_DASHBOARD_DETAIL_FAILURE = 'FETCH_DASHBOARD_DETAIL_FAILURE';

export const fetchDashboardDetailRequest = () => ({
    type: FETCH_DASHBOARD_DETAIL_REQUEST,
});

export const fetchDashboardDetailSuccess = (DashboardDetail: any) => ({
    type: FETCH_DASHBOARD_DETAIL_SUCCESS,
    payload: DashboardDetail,
});

export const fetchDashboardDetailFailure = (error: string) => ({
    type: FETCH_DASHBOARD_DETAIL_FAILURE,
    payload: error,
});
