
import { FETCH_EWALLETREPORT_FAILURE, FETCH_EWALLETREPORT_REQUEST, FETCH_EWALLETREPORT_SUCCESS } from '../actions/ewalletReportAction';

interface EWalletReportState {
    loading: boolean;
    reportData: any;    
    error: string | null;
}

const initialState: EWalletReportState = {
    loading: false,
    reportData: null,
    error: null,
};

export const eWalletReducer = (state = initialState, action: any): EWalletReportState => {
    switch (action.type) {
        case FETCH_EWALLETREPORT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_EWALLETREPORT_SUCCESS:
            return { ...state, loading: false, reportData: action.payload };
        case FETCH_EWALLETREPORT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
