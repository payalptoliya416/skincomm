

export const FETCH_EWALLETREPORT_REQUEST = 'FETCH_EWALLETREPORT_REQUEST';
export const FETCH_EWALLETREPORT_SUCCESS = 'FETCH_EWALLETREPORT_SUCCESS';
export const FETCH_EWALLETREPORT_FAILURE = 'FETCH_EWALLETREPORT_FAILURE';

export const fetchewalletreportRequest = () => ({
    type: FETCH_EWALLETREPORT_REQUEST,
});

export const fetchewalletreportSuccess = (reportData: any) => ({
    type: FETCH_EWALLETREPORT_SUCCESS,
    payload: reportData,
});

export const fetchewalletreportFailure = (error: string) => ({
    type: FETCH_EWALLETREPORT_FAILURE,
    payload: error,
});
